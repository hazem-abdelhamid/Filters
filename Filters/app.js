// Selecting elements
console.log(products);
let filteredProducts = [...products];
const productsContainer = document.querySelector(".products-container");

const displayProducts = () => {
  // if statement for empty array
  if (filteredProducts.length < 1) {
    return (productsContainer.innerHTML = `<h6>Sorry, No products match your search</h6>`);
  }
  productsContainer.innerHTML = filteredProducts
    .map(({ id, title, image, price }) => {
      return `<article class="product" data-id='${id}'>
<img
  src="${image}"
  alt=""
  class="product-img img"
/>
<footer>
  <h5 class="product-name">${title}</h5>
  <span class="product-price">$${price}</span>
</footer>
</article>`;
    })
    .join(" ");
};
displayProducts();

// Text filter

const form = document.querySelector(".input-form");
const searchInput = document.querySelector(".search-input");

form.addEventListener("keyup", () => {
  const inputValue = searchInput.value;
  filteredProducts = products.filter((product) => {
    return product.title.toLocaleLowerCase().includes(inputValue);
  });
  displayProducts();
});

// display buttons
const companiesDOM = document.querySelector(".companies");

const btns = [
  "all",
  ...new Set(filteredProducts.map((product) => product.company)),
];
const displayBtns = btns
  .map((btn) => {
    return `<button class="company-btn" data-id ="${btn}">${btn}</button>`;
  })
  .join(" ");
companiesDOM.innerHTML = displayBtns;

// Display filter buttons
companiesDOM.addEventListener("click", (e) => {
  const el = e.target;
  if (el.dataset.id === "all") {
    filteredProducts = [...products];
  } else {
    filteredProducts = products.filter((product) => {
      return product.company === el.dataset.id;
    });
  }
  displayProducts();
  searchInput.value = "";
});
