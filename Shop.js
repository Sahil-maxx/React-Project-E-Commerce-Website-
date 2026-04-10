const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const products = document.querySelectorAll(".product-card");

function filterProducts() {
  const searchText = searchInput.value.toLowerCase();
  const category = categoryFilter.value;
  const price = priceFilter.value;

  products.forEach((product) => {
    const name = product.querySelector("h3").textContent.toLowerCase();
    const productCategory = product.dataset.category;
    const productPrice = product.dataset.price;

    const matchSearch = name.includes(searchText);
    const matchCategory = category === "all" || productCategory === category;
    const matchPrice = price === "all" || productPrice === price;

    if (matchSearch && matchCategory && matchPrice) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);
priceFilter.addEventListener("change", filterProducts);
