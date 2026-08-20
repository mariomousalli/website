(function () {
  const products = window.products || [],
    grid = document.getElementById("product-grid"),
    modal = document.getElementById("product-modal"),
    closeButton = document.getElementById("modal-close"),
    backdrop = document.getElementById("modal-backdrop"),
    gallery = document.getElementById("gallery-scroll"),
    hint = document.getElementById("gallery-hint"),
    title = document.getElementById("modal-title"),
    tagline = document.getElementById("modal-tagline"),
    description = document.getElementById("modal-description"),
    selector = document.getElementById("scent-selector"),
    options = document.getElementById("scent-options"),
    order = document.getElementById("modal-order");
  let product = null,
    scent = null,
    previousFocus = null;
  document.getElementById("year").textContent = new Date().getFullYear();
  function updateOrder() {
    const choice = scent ? " — " + scent : "",
      message = product
        ? "Hi Satine Beauté, I would like to order " +
          product.name +
          choice +
          "."
        : "Hi Satine Beauté, I would like to place an order.";
    order.href = "https://wa.me/?text=" + encodeURIComponent(message);
  }
  function closeModal() {
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (previousFocus) previousFocus.focus();
    product = null;
    scent = null;
  }
  function renderScents(item) {
    options.innerHTML = "";
    if (!item.scents || !item.scents.length) {
      selector.hidden = true;
      return;
    }
    selector.hidden = false;
    scent = item.scents[0];
    item.scents.forEach(function (name, index) {
      const label = document.createElement("label"),
        input = document.createElement("input"),
        text = document.createElement("span");
      label.className = "scent-option";
      input.type = "radio";
      input.name = "scent-choice";
      input.value = name;
      input.checked = index === 0;
      input.addEventListener("change", function () {
        scent = name;
        updateOrder();
      });
      text.textContent = name;
      label.append(input, text);
      options.appendChild(label);
    });
  }
  function openProduct(item, trigger) {
    previousFocus = trigger;
    product = item;
    scent = null;
    title.textContent = item.name;
    tagline.textContent = item.tagline;
    description.textContent = item.description;
    gallery.innerHTML = "";
    item.images.forEach(function (path, index) {
      const image = document.createElement("img");
      image.src = path;
      image.alt =
        item.name + ", view " + (index + 1) + " of " + item.images.length;
      gallery.appendChild(image);
    });
    gallery.scrollLeft = 0;
    gallery.setAttribute(
      "aria-label",
      "Scroll through " + item.images.length + " photos of " + item.name,
    );
    hint.hidden = item.images.length < 2;
    hint.textContent = "Scroll to see " + item.images.length + " photos →";
    renderScents(item);
    updateOrder();
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    closeButton.focus();
  }
  products.forEach(function (item) {
    const card = document.createElement("button"),
      media = document.createElement("div"),
      image = document.createElement("img"),
      heading = document.createElement("h3"),
      detail = document.createElement("p"),
      price = document.createElement("span");
    card.type = "button";
    card.className = "card";
    card.setAttribute("aria-label", "Open " + item.name + " details");
    media.className = "card-media";
    image.src = item.images[0];
    image.alt = item.name;
    image.loading = "lazy";
    heading.textContent = item.name;
    detail.textContent = item.tagline;
    price.className = "price";
    price.textContent = "—";
    media.appendChild(image);
    card.append(media, heading, detail, price);
    card.addEventListener("click", function () {
      openProduct(item, card);
    });
    grid.appendChild(card);
  });
  closeButton.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });
})();
