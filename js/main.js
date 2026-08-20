document.getElementById("year").textContent = new Date().getFullYear();

const modal = document.getElementById("product-modal");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalTagline = document.getElementById("modal-tagline");
const modalDescription = document.getElementById("modal-description");

function openModal(slug) {
  const product = products.find((p) => p.slug === slug);
  if (!product || !product.images.length) return;

  modalTitle.textContent = product.name;
  modalTagline.textContent = product.tagline;
  modalDescription.textContent = product.description;
  modalImage.src = product.images[0];
  modalImage.alt = product.name;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".card[data-product]").forEach((card) => {
  card.addEventListener("click", () => openModal(card.dataset.product));
});

modal.querySelectorAll("[data-close]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    closeModal();
  });
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("is-open")) {
    closeModal();
  }
});
