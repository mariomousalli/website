export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return new Response("Invalid JSON", { status: 400 });
    }

    const name = data.name || "Unknown";
    const phone = data.phone || "Not provided";
    const order = data.order || "No items";
    const total = data.total || "0";

    const html = `
      <h2>New Order from Satine Beauté Website</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Total:</strong> $${escapeHtml(total)}</p>
      <h3>Order Details:</h3>
      <p style="white-space: pre-line;">${escapeHtml(order)}</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: env.FROM_EMAIL || "Satine Beauté <orders@satinebeaute.com>",
        to: "orders@satinebeaute.com",
        subject: `New Order from ${escapeHtml(name)} — $${escapeHtml(total)}`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return new Response("Failed to send order", { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  },
};

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
