let renderAllProduct = () => {
  var data = new FormData();
  data.append("function", "getAllProducts");
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.readyState == 200) {
      const product = JSON.parse(this.responseText);
      const productElement = document.getElementById("product1");
      productElement.innerHTML="";
      product.forEach((Product) => {
        const productComponent = buildProduct(Product);
        productelement.insertAdjacentHTML("beforeend", productComponent);
      });
    }
  };
  xmlhttp.open("POST", "allProduct.php", true);
  xmlhttp.send(data);
};
