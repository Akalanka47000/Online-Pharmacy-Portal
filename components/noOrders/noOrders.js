const buildNoOrderComponent = (orderType, page) => {
  return `<div class="w-full row justify-center noOrderRow" data-aos=${orderType == "active" ? "fade-left" : "fade-right"
    }>
        <img
            src="/Online-Pharmacy-Portal/assets/images/orders/bino.gif"
            class="binoImage"
        />
        <div class="w-full row justify-center emptyOrders blink">${page == "ordersPage" ? "You have no" : "There are no"} ${orderType} orders</div>
    </div>`;
};
