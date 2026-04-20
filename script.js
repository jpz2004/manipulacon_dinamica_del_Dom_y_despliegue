const saveBtn = document.getElementById("saveBtn");
const productContainer = document.getElementById("productContainer");

let products = JSON.parse(localStorage.getItem("products")) || [];

saveBtn.addEventListener("click", createProduct);

function createProduct() {

  const image = document.getElementById("image").value;
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const priceInput = document.getElementById("price").value;
  const coupon = document.getElementById("coupon").value;

  let price = parseFloat(priceInput);

  const COUPON_CODE = "DESC50";

  if (!image || !title || !description || !priceInput) {
    alert("Completa todos los campos");
    return;
  }

  if (isNaN(price)) {
    alert("Precio inválido");
    return;
  }

  let discounted = false;

  if (coupon === COUPON_CODE) {
    price = price * 0.5;
    discounted = true;
  }

  const product = {
    image,
    title,
    description,
    price,
    discounted
  };

  products.push(product);

  localStorage.setItem("products", JSON.stringify(products));

  renderProducts();

  document.getElementById("image").value = "";
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("price").value = "";
  document.getElementById("coupon").value = "";
}

function renderProducts() {
  productContainer.innerHTML = "";

  products.forEach((product, index) => {

    let priceHTML = "";

    if (product.discounted) {
      const originalPrice = (product.price * 2).toLocaleString("es-CO", {
        style: "currency",
        currency: "COP"
      });

      const finalPrice = product.price.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP"
      });

      priceHTML = `
        <p style="text-decoration: line-through; color: gray;">${originalPrice}</p>
        <p class="price">${finalPrice}</p>
      `;
    } else {
      const priceFormateado = product.price.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP"
      });

      priceHTML = `<p class="price">${priceFormateado}</p>`;
    }

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${product.image}" alt="producto">
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      ${priceHTML}
      <button class="delete-btn">Eliminar</button>
    `;

    card.querySelector(".delete-btn").addEventListener("click", () => {
      products.splice(index, 1);
      localStorage.setItem("products", JSON.stringify(products));
      renderProducts();
    });

    productContainer.appendChild(card);
  });

  updateCounter();
}

function updateCounter() {
  const count = document.querySelectorAll(".card").length;
  document.getElementById("productCount").textContent = "Productos: " + count;
}

renderProducts();