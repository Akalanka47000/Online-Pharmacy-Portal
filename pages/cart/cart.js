const initialize = () => {
  AOS.init({ offset: 0, duration: 1000 });
  const cartItems = getCartItems();
  const element = document.getElementById("cartItemTable");
  if (cartItems.length == 0) {
    element.innerHTML = displayNoItems();
  }
};

const getCartItems = () => {
  return [];
};

const displayNoItems = () => {
  return ` <div class="emptyCartBG">
    <div class="w-full row justify-center emptyCartRow">
      <img
        src="/Online-Pharmacy-Portal/assets/images/cart/emptyCart.png"
        class="emptyCartImage"
      />

      <div class="row justify-center emptyCart blink">
        Your cart is empty
      </div>
    </div>
  </div>`;
};

if (document.readyState !== "loading") {
  initialize();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initialize();
  });
}
