const initialize = () => {
  AOS.init({ offset: 0, duration: 1000 });
  renderOrders('active');
  renderOrders('completed');
};

const getActiveOrders = () => {
  return [];
};

const renderOrders = (orderType) => {
  const email = localStorage.getItem("Email");
  var data = new FormData();
  data.append("function", orderType=='active'?"getActiveOrders":"getCompletedOrders");
  data.append("email", email);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const orders = JSON.parse(this.responseText);
      const element = document.getElementById( orderType=='active'?"activeOrdersTable":"completedOrdersTable");
      const orderCountText= document.getElementById( orderType=='active'?"activeOrderText":"completedOrderText");
      orderCountText.innerText=orders.length;
      if (orders.length > 0) {
        if( orderType=='active'){
          element.innerHTML = getHeadings('active');
          displayOrderItems(orders,'active');
        }else{
          element.innerHTML = getHeadings('completed');
          displayOrderItems(orders,'completed');
        }
        
      } else {
        if(orderType=='active'){
          element.innerHTML = displayNoOrders("active");
        }else{
          element.innerHTML = displayNoOrders("completed");
        }       
      }
    }
  };
  xmlhttp.open("POST", "orders.php", true);
  xmlhttp.send(data);
};

const getHeadings = (orderType) => {
  return `
  <div class="column justify-center headings" data-aos="fade-left">
    <div class="row tableHeadings">
      <div class="tableCell narrowCell row justify-start headingCell">Order ID</div>
      <div class="tableCell wideCell row justify-start headingCell">Customer Email</div>
      <div class="tableCell wideCell row justify-start headingCell">Product Name</div>
      <div class="tableCell wideCell row justify-start headingCell">Order Date</div>
      <div class="tableCell narrowCell row justify-start headingCell">Order Status</div>
    </div>
  </div>
  <div id="${ orderType == "active" ?"activeItemList" : "completedItemList"}" class="column justify-start itemList">
  `;
};

const displayOrderItems = (items, orderType) => {
  const orderElement = document.getElementById(
    orderType == "active" ? "activeItemList" : "completedItemList"
  );
  orderElement.innerHTML = "";
  items.forEach((order, index) => {
    const orderComponent = `
  <div style="width:100%;" data-aos="${
    index % 2 == 0 ? "fade-right" : "fade-left"
  }">
      <div class="row tableRow">
        <div class="tableCell narrowCell row justify-start"><img
        src="/Online-Pharmacy-Portal/assets/images/admin/products/id.png"
        class="productInfoIcon" style="width:30px;height:20px;"
      /><div>${order.orderID}</div></div>
        <div class="tableCell wideCell row justify-start"><img
        src="/Online-Pharmacy-Portal/assets/images/admin/users/email.svg"
        class="productInfoIcon" style="width:30px;height:30px;"
      /><div>${order.email}</div></div>
        <div class="tableCell wideCell row justify-start"><img
        src="/Online-Pharmacy-Portal/assets/images/admin/products/tag.png"
        class="productInfoIcon" style="width:30px;height:20px;"
      /><div>${order.productName}</div></div>
      <div class="tableCell wideCell row justify-start"><img
        src="/Online-Pharmacy-Portal/assets/images/admin/products/date.png"
        class="productInfoIcon" style="width:30px;height:30px;"
      /><div>${order.placedDate}</div></div>
      <div class="tableCell narrowCell row justify-start"><img
        src="/Online-Pharmacy-Portal/assets/images/admin/products/status.png"
        class="productInfoIcon" style="width:30px;height:30px;"
      /><div>${order.orderStatus}</div></div>
      </div></div>`;
    orderElement.insertAdjacentHTML("beforeend", orderComponent);
  });
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
