const setSelectedProduct = (productId) => {
  window.localStorage.setItem("selectedProductID", productId);
  window.location.href =
    "/Online-Pharmacy-Portal/pages/products/singleProduct/singleProduct.html";
};

const buildProduct = (product) => {
  return `<div class="column TSP_Content">
    <img src="${product.productImage}" class="TSP_Img" />
    <div class="row justify-between TSP_Details" style="margin-top: 40px">
      <div class="column">
        <div class="detailText" style="margin-bottom: 20px">${product.productName}</div>
        <div class="detailText">Rs.${product.productPrice}</div>
      </div>
      <div
        class="button btnViewTSP_Details"
        style="margin-right: 0px; padding-left: 50px; padding-right: 50px"
        onClick="setSelectedProduct('${product.productID}')"
      >
        View
      </div>
    </div>
  </div>`;
};
