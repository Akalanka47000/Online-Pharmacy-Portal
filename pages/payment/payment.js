const handlePaymentSubmit = (e) => {
  e.preventDefault();
  if (!selectedPaymentMethod) {
    Swal.fire({
      icon: "warning",
      heightAuto: false,
      background: "#f5fdff",
      title: `<div style="font-size:23px">Please select a payment method!</div>`,
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    const formData = {
      cardNo: e.target.cardNo.value,
      expDate: e.target.expDate.value,
      code: e.target.code.value,
      owner: e.target.owner.value,
      paymentMethod: selectedPaymentMethod,
    };

    console.log(formData);
    const email = window.localStorage.getItem("email");
    var data = new FormData();
    data.append("function", "processPayment");
    data.append("email", email);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const result = JSON.parse(this.responseText)
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
          }).then(() => {
            window.location.href = "/Online-Pharmacy-Portal/pages/orders/orders.html";
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
    xmlhttp.open("POST", "payment.php", true);
    xmlhttp.send(data);
  }
};

const submitPaymentForm = () => {
  const paymentForm = document.getElementById("paymentForm");
  paymentForm.submit();
};

const paymentMethods = [
  "/Online-Pharmacy-Portal/assets/images/payment/paymentMethods/visa.png",
  "/Online-Pharmacy-Portal/assets/images/payment/paymentMethods/mastercard.png",
  "/Online-Pharmacy-Portal/assets/images/payment/paymentMethods/paypal.png",
  "/Online-Pharmacy-Portal/assets/images/payment/paymentMethods/discover.png",
];

let selectedPaymentMethod;

const setSelectedPaymentMethod = (method) => {
  if (method == selectedPaymentMethod) {
    selectedPaymentMethod = "";
  } else {
    selectedPaymentMethod = method;
  }
  renderPaymentMethods();
};

const renderPaymentMethods = () => {
  const paymentMethodContainer = document.getElementById("paymentMethods");
  paymentMethodContainer.innerHTML = "";
  paymentMethods.forEach((method, index) => {
    const currentPaymentMethod = method
      .split("/")
      [method.split("/").length - 1].replaceAll(".png", "");
    const methodElement = `<div ${
      firstRender ? `data-aos=${index % 2 == 0 ? "fade-down" : "fade-up"}` : ``
    } onclick='setSelectedPaymentMethod("${currentPaymentMethod}")'>
      <img
        src=${method}
        class="paymentMethodImage ${
          selectedPaymentMethod === currentPaymentMethod ? "PM_SelectedCSS" : ""
        }"
      />
    </div>`;
    paymentMethodContainer.insertAdjacentHTML("beforeend", methodElement);
  });
  firstRender = false;
};

let firstRender = true;

const initialize = () => {
  AOS.init({ offset: 0, duration: 1000 });
  const form = document.getElementById("paymentForm");
  renderPaymentMethods();
  form.addEventListener("submit", handlePaymentSubmit);
};

if (document.readyState !== "loading") {
  initialize();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initialize();
  });
}
