const initialize = () => {
  AOS.init({ offset: 0, duration: 1000 });
  renderCartItems();
};

let cartEmpty = true;

const navigate = () => {
  if (!cartEmpty) {
    window.location.href = "/Online-Pharmacy-Portal/pages/payment/payment.html";
  } else {
    Swal.fire({
      icon: "warning",
      heightAuto: false,
      background: "#f5fdff",
      title: `<div style="font-size:23px">No items to checkout!</div>`,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

const renderCartItems = () => {
  const email = localStorage.getItem("email");
  var data = new FormData();
  data.append("function", "getCartItems");
  data.append("email", email);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const cartItems = JSON.parse(this.responseText);
      const element = document.getElementById("cartItemTable");
      if (cartItems.length > 0) {
        cartEmpty = false;
        element.innerHTML = getHeadings();
        displayCartItems(cartItems);
      } else {
        cartEmpty = true;
        element.innerHTML = displayNoItems();
      }
    }
  };
  xmlhttp.open("POST", "cart.php", true);
  xmlhttp.send(data);
};

const getHeadings = () => {
  return `
  <div class="column justify-center headings" data-aos="fade-left">
    <div class="row tableHeadings">
      <div class="tableCell wideCell row justify-start headingCell">Product Name</div>
      <div class="tableCell wideCell row justify-start headingCell">Product Description</div>
      <div class="tableCell narrowCell row justify-start headingCell">Price ($)</div>
      <div class="tableCell narrowCell row justify-start headingCell">Category</div>
      <div class="tableCell narrowCell row justify-start headingCell">Brand</div>
    </div>
  </div>
  <div id="itemList" class="column justify-start itemList">
  `;
};

const displayCartItems = (items) => {
  const orderElement = document.getElementById("itemList");
  orderElement.innerHTML = "";
  items.forEach((cartItem, index) => {
    const component = `
    <div style="width:100%;" data-aos="${index % 2 == 0 ? "fade-right" : "fade-left"
      }">
        <div class="row tableRow">
          <div class="tableCell wideCell row justify-start"><img
          src="/Online-Pharmacy-Portal/assets/images/admin/products/id.png"
          class="productInfoIcon" style="width:30px;height:20px;"
        /><div>${cartItem.productName}</div></div>
          <div class="tableCell wideCell row justify-start"><img
          src="/Online-Pharmacy-Portal/assets/images/admin/products/descrip.png"
          class="productInfoIcon" style="width:30px;height:30px;"
        /><div>${cartItem.productDescription.substring(
        0,
        cartItem.productDescription.length > 70
          ? 70
          : cartItem.productDescription.length
      )}${cartItem.productDescription.length > 70?"...":""}</div></div>
          <div class="tableCell narrowCell row justify-start"><img
          src="/Online-Pharmacy-Portal/assets/images/admin/products/price.png"
          class="productInfoIcon" style="width:30px;height:30px;"
        /><div>${cartItem.productPrice}</div></div>
        <div class="tableCell narrowCell row justify-start"><img
        src="/Online-Pharmacy-Portal/assets/images/admin/products/category.png"
        class="productInfoIcon" style="width:30px;height:30px;"
      /><div>${cartItem.productCategory}</div></div>
      <div class="tableCell narrowCell row justify-start"><img
      src="/Online-Pharmacy-Portal/assets/images/admin/products/brand.png"
      class="productInfoIcon" style="width:30px;height:30px;"
    /><div>${cartItem.productBrand}</div></div>
        </div></div>`;
    orderElement.insertAdjacentHTML("beforeend", component);
  });
};

const displayNoItems = () => {
  return `<div data-aos="fade-left"><div class="emptyCartBG" >
  <div class="w-full row justify-center emptyCartRow">
    <img
      src="/Online-Pharmacy-Portal/assets/images/cart/emptyCart.png"
      class="emptyCartImage"
    />

    <div class="row justify-center emptyCart blink">
      Your cart is empty
    </div>
  </div>
</div></div>`;
};

if (document.readyState !== "loading") {
  initialize();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initialize();
  });
}
