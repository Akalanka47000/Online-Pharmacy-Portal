let index = 0;
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
    title: "Lorem ipsum dolor sit amet",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat.",
  },
  {
    title: "Nunc maximus, magna at ultricies elementum",

    body: "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.",
  },
  {
    title: "Curabitur laoreet, mauris vel blandit fringilla",

    body: "Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncusnunc, ac sagittis leo elit vel lorem.",
  },
  {
    title: "risus turpis vulputate quam, vitae convallis.",

    body: "current version is 1.2.1",
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
  faqs.innerHTML='';
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
    faqs.insertAdjacentHTML('beforeend', QAComponent);
  });
};

let chatModalOpen = false;
const toggleChatModal = () => {
  chatModalOpen = !chatModalOpen;
  const userRole=localStorage.getItem('UserRole');
  if(userRole=="Admin"){
    renderAdminChatModal();
  }else{
    renderUserChatModal();
  }

};

const initialize = () => {
  AOS.init({ offset: 0, duration: 1000 });
  setTimeout(showSlides, 4000);
  particlesJS.load(
    "particles-js",
    "/Online-Pharmacy-Portal/assets/packages/particles/particles.json"
  );
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
