const buildNoOrderComponent = (orderType) => {
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
