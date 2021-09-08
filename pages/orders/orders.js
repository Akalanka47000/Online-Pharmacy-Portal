const initialize = () => {
  AOS.init({ offset: 0, duration: 1000 });
  const activeOrders = getActiveOrders();
  const element_active = document.getElementById("activeOrdersTable");
  if (activeOrders.length == 0) {
    element_active.innerHTML = displayNoOrders("active");
  }

  const completedOrders = getCompletedOrders();
  const element_completed = document.getElementById("completedOrdersTable");
  if (completedOrders.length == 0) {
    element_completed.innerHTML = displayNoOrders("completed");
  }
};

const getActiveOrders = () => {
  return [];
};

const getCompletedOrders = () => {
  return [];
};

const displayNoOrders = (orderType) => {
  return `<div class="w-full row justify-center noOrderRow" data-aos=${
    orderType == "active" ? "fade-left" : "fade-right"
  }>
      <img
      src="/Online-Pharmacy-Portal/assets/images/orders/bino.gif"
      class="binoImage"
      />
      <div class="w-full row justify-center emptyOrders blink">You have no ${orderType} orders</div>
      
      </div>`;
};

if (document.readyState !== "loading") {
  initialize();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initialize();
  });
}
