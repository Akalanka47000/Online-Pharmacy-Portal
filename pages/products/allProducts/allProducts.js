const renderAllProducts = () => {
  var data = new FormData();
  data.append("function", "getAllProducts");
  data.append("categoryFilter", selectedCategoryFilter);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const products = JSON.parse(this.responseText);
      const productElement = document.getElementById("productList");
      productElement.innerHTML = "";
      products.forEach((product) => {
        const productComponent = `<div style="margin:10px; margin-top:30px;margin-bottom:30px;">${buildProduct(
          product
        )}</div>`;
        productElement.insertAdjacentHTML("beforeend", productComponent);
      });
    }
  };
  xmlhttp.open("POST", "allProducts.php", true);
  xmlhttp.send(data);
};

const renderSearchProducts = () => {
  console.log("hll")
  const searchWord = document.getElementById("search-input").value;
  if (searchWord.length > 0) {
    var data = new FormData();
    data.append("function", "getSearchProducts");
    data.append("userInput", searchWord);
    var XMLHttp = new XMLHttpRequest();
    XMLHttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const products = JSON.parse(this.responseText);
        const productElement = document.getElementById("productList");
        productElement.innerHTML = "";
        products.forEach((product) => {
          const productComponent = `<div style="margin:10px; margin-top:30px;margin-bottom:30px;">${buildProduct(
            product
          )}</div>`;
          productElement.insertAdjacentHTML("beforeend", productComponent);
        });
      }
    };
    XMLHttp.open("POST", "allProducts.php", true);
    XMLHttp.send(data);
  }else{
    renderAllProducts();
  }
};

const initialize = () => {
  AOS.init({ offset: 0, duration: 1000 });
  renderAllProducts();
};

if (document.readyState !== "loading") {
  initialize();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initialize();
  });
}
