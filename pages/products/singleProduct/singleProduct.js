const addToCart = (productID) => {
  const email = window.localStorage.getItem("email");
  var data = new FormData();
  data.append("function", "addToCart");
  data.append("email", email);
  data.append("productID", productID);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const result = JSON.parse(this.responseText);
      if (result.success == true) {
        let timerInterval;
        Swal.fire({
          icon: "success",
          heightAuto: false,
          background: "#f5fdff",
          title: `<div style="font-size:23px">${result.message}</div>`,
          showConfirmButton: false,
          timer: 1500,
          willClose: () => {
            clearInterval(timerInterval);
          },
        });
      } else {
        Swal.fire({
          icon: "warning",
          heightAuto: false,
          background: "#f5fdff",
          title: `<div style="font-size:23px">${result.message}</div>`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  xmlhttp.open("POST", "singleProduct.php", true);
  xmlhttp.send(data);
};

const renderProduct = () => {
  const productID = window.localStorage.getItem("selectedProductID");
  var data = new FormData();
  data.append("function", "getSingleProduct");
  data.append("productId", productID);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const products = JSON.parse(this.responseText);
      document.title=`${products[0].productName} | Simple Meds`;
      const productElement = document.getElementById("productContainer");
      productElement.innerHTML = "";
      const productComponent = `<div class="product_row">
          <div class="product">
            <div class="product-figure"></div>
            <img
            class="product-img"
            src="${products[0].productImage}"
            alt="product vitamin c"
          />
          </div>
          <div class="info">
            <div class="column items-start product-info">
              <div class="info-title">${products[0].productName}</div>
              <p class="info-description">
               ${products[0].productDescription}
              </p>
              <span class="price-title">Rs. ${products[0].productPrice}</span>
              <div class="price-button button" onClick="addToCart('${products[0].productID}')">Add to Cart</div>
            </div>
          </div>
        </div>`;
      productElement.insertAdjacentHTML("beforeend", productComponent);
    }
  };
  xmlhttp.open("POST", "singleProduct.php", true);
  xmlhttp.send(data);
};

const initialize = () => {
  AOS.init({ offset: 0, duration: 1000 });
  renderProduct();
};

if (document.readyState !== "loading") {
  initialize();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initialize();
  });
}
