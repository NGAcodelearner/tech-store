const products = [
  {
    name: "Sony Playstation 5",
    url: "images/playstation_5.png",
    category: "games",
    price: 499.99,
  },
  {
    name: "Samsung Galaxy",
    url: "images/samsung_galaxy.png",
    category: "smartphones",
    price: 399.99,
  },
  {
    name: "Cannon EOS Camera",
    url: "images/cannon_eos_camera.png",
    category: "cameras",
    price: 749.99,
  },
  {
    name: "Sony A7 Camera",
    url: "images/sony_a7_camera.png",
    category: "cameras",
    price: 1999.99,
  },
  {
    name: "LG TV",
    url: "images/lg_tv.png",
    category: "televisions",
    price: 799.99,
  },
  {
    name: "Nintendo Switch",
    url: "images/nintendo_switch.png",
    category: "games",
    price: 299.99,
  },
  {
    name: "Xbox Series X",
    url: "images/xbox_series_x.png",
    category: "games",
    price: 499.99,
  },
  {
    name: "Samsung TV",
    url: "images/samsung_tv.png",
    category: "televisions",
    price: 1099.99,
  },
  {
    name: "Google Pixel",
    url: "images/google_pixel.png",
    category: "smartphones",
    price: 499.99,
  },
  {
    name: "Sony ZV1F Camera",
    url: "images/sony_zv1f_camera.png",
    category: "cameras",
    price: 799.99,
  },
  {
    name: "Toshiba TV",
    url: "images/toshiba_tv.png",
    category: "televisions",
    price: 499.99,
  },
  {
    name: "iPhone 14",
    url: "images/iphone_14.png",
    category: "smartphones",
    price: 999.99,
  },
];

// Get Dom elements
const searchField = document.getElementById("search");
const checkboxes = document.querySelectorAll(".checkbox");
const productContainer = document.getElementById("products");
const filters = document.getElementById("filters");
const cartCount = document.getElementById("cart-count");

// Initialize cart item count
let cartItemCount = 0;

// Initialize products
const productLists = [];

// event listeners
searchField.addEventListener("input", filterProducts);
filters.addEventListener("change", filterProducts);

// Loop over the products and create the product elements
products.forEach((product) => {
  const productElement = createProductElement(product);
  productLists.push(productElement);
  productContainer.appendChild(productElement);
});

// Create product element
function createProductElement(product) {
  const productElement = document.createElement("div");

  productElement.innerHTML = `
  <div class=" cursor-pointer flex flex-col bg-gray-100 rounded-xl p-4 gap-2 justify-center items-center">
  <img src="${product.url}" alt="${product.name}"  class="object-contain"/>
  <div class="bg-white rounded-xl px-3 py-4 w-full">
    <p class="text-lg text-base lg:text-lg">${product.name}</p>
    <strong>$${product.price}</strong>
    </div>
    <button class="cart-button bg-black py-2 text-white text-center w-full">Add to Cart</button>
  </div>
    `;

  productElement
    .querySelector(".cart-button")
    .addEventListener("click", updateCart);

  return productElement;
}

// Toggle add/remove from cart
function updateCart(event) {
  const status = event.target;

  if (status.classList.contains("add")) {
    // remove product
    status.classList.remove("add");
    status.innerText = "Add to Cart";
    status.classList.remove("bg-red-600");
    status.classList.add("bg-black");
    cartItemCount--;
  } else {
    // add product
    status.classList.add("add");
    status.innerText = "Remove from Cart";
    status.classList.remove("bg-black");
    status.classList.add("bg-red-600");
    cartItemCount++;
  }

  // update cart item count
  cartCount.innerText = cartItemCount.toString();
}

// Filter products by search or checkbox
function filterProducts() {
  const searchValue = searchField.value.toLowerCase();
  const checkedProducts = Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkItems) => checkItems.id);

  // loop over products and check for matches
  productLists.forEach((productElement, index) => {
    const product = products[index];

    const matchedSearchValue = product.name.toLowerCase().includes(searchValue);
    const isCheckedProduct = checkedProducts.includes(product.category);

    if (matchedSearchValue || isCheckedProduct) {
      productElement.classList.remove("hidden");
    } else {
      productElement.classList.add("hidden");
    }
  });
}
