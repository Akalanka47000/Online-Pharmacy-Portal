let index = -1;
function showSlides() {
  index++;
  document.getElementsByClassName(
    "slideshow"
  )[0].style.transform = `translateX(${index * -100}vw)`;
  if (index > 1) {
    index = -1;
  }
  setTimeout(showSlides, 4000);
}

const FAQData = [
  {
    title: "How long does a delivery normally take?",
    body: "Between 30 minutes to 1 hour depending on your location and the availability of our staff",
  },
  {
    title: "Is it possible to cancel orders once placed?",

    body: "Yes it's possible",
  },
  {
    title: "Do we recieve a full refund on a cancelled order",

    body: "Almost, we will be deducting a minor fee if our delivery staff has already departed",
  },
  {
    title: "Do you store our payment details?",

    body: "No, we do not store anything related to that. Everything is discarded once processed",
  },
];

let visibilities = [];

const initVisibilities = () => {
  FAQData.forEach(() => {
    visibilities.push(false);
  });
};

const toggleVisibility = (index) => {
  visibilities[index] = !visibilities[index];
  renderFAQ();
};

const renderFAQ = () => {
  const faqs = document.getElementById("faqs");
  faqs.innerHTML = "";
  FAQData.forEach((faq, index) => {
    const QAComponent = `<div id="component${index}" class="w-full column QA_Content">
        <div
          class="QA_Header"
          onClick={toggleVisibility(${index})}
        >
          <div class="row justify-between">
            <div class="QA_TitleText">
              ${faq.title}
            </div>
            <div
            class="${visibilities[index] ? "bottomArrowUp" : "bottomArrowDown"}"
            > <img src="./assets/images/home/bottomArrow.svg" class="bottomArrow"   />
            </div>
          </div>
        </div>
        <div class= "ans ${
          visibilities[index] ? "visibleAns" : "inVisibleAns"
        }">
          <div
            class="
              ${visibilities[index] ? "visibleAnsText" : `invisibleAnsText`}
            "
          >
            ${faq.body}
          </div>
        </div>
      </div>`;
    faqs.insertAdjacentHTML("beforeend", QAComponent);
  });
};

let chatModalOpen = false;
const toggleChatModal = () => {
  chatModalOpen = !chatModalOpen;
  const userRole = localStorage.getItem("userRole");
  if (userRole == "Admin") {
    //renderAdminChatModal();
    renderUserChatModal();
  } else {
    renderUserChatModal();
  }
};

const renderTopSellingProducts = () => {
  var data = new FormData();
  data.append("function", "getTopSellingProducts");
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const products = JSON.parse(this.responseText);
      const productElement = document.getElementById("TSP");
      productElement.innerHTML = "";
      products.forEach((product) => {
        const productComponent = buildProduct(product);
        productElement.insertAdjacentHTML("beforeend", productComponent);
      });
    }
  };
  xmlhttp.open("POST", "pages/home/home.php", true);
  xmlhttp.send(data);
};

const initialize = () => {
  AOS.init({ offset: 0, duration: 1000 });
  showSlides()
  particlesJS.load(
    "particles-js",
    "/Online-Pharmacy-Portal/assets/packages/particles/particles.json"
  );
  renderTopSellingProducts();
  initVisibilities();
  renderFAQ();
};

if (document.readyState !== "loading") {
  initialize();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initialize();
  });
}
