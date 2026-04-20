const saveBtn = document.getElementById("saveBtn");
const productContainer = document.getElementById("productContainer");

let products = JSON.parse(localStorage.getItem("products")) || [];

saveBtn.addEventListener("click", createProduct);

function createProduct() {
function updateCounter() {
const count = document.querySelectorAll(".card").length;
document.getElementById("productCount").textContent = "Productos: " + count;
}

  const image = document.getElementById("image").value;
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const priceInput = document.getElementById("price").value;
  const coupon = document.getElementById("coupon").value;

  let price = parseFloat(priceInput);

  const COUPON_CODE = "DESC50";

  // VALIDACIÓN
  if (!image || !title || !description || !priceInput) {
    alert("Completa todos los campos");
    return;
  }

  if (isNaN(price)) {
    alert("Precio inválido");
    return;
  }

  // DESCUENTO
  if (coupon === COUPON_CODE) {
    price = price * 0.5;
  }

  // GUARDAR EN ARRAY
  const product = {
    image,
    title,
    description,
    price
  };

  products.push(product);

  // GUARDAR EN LOCALSTORAGE
  localStorage.setItem("products", JSON.stringify(products));

  // RENDERIZAR
  renderProducts();

  // LIMPIAR
  document.getElementById("image").value = "";
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("price").value = "";
  document.getElementById("coupon").value = "";
}

// RENDERIZAR PRODUCTOS
function renderProducts() {
  productContainer.innerHTML = "";

  products.forEach((product, index) => {

    let priceFormateado = product.price.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP"
    });

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${product.image}" alt="producto">
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <p class="price">${priceFormateado}</p>
      <button class="delete-btn">Eliminar</button>
    `;

    // ELIMINAR CON LOCALSTORAGE
    card.querySelector(".delete-btn").addEventListener("click", () => {
      products.splice(index, 1);
      localStorage.setItem("products", JSON.stringify(products));
      renderProducts();
    });

    productContainer.appendChild(card);
  });

  updateCounter();
}

// CARGAR AL INICIAR
renderProducts();
