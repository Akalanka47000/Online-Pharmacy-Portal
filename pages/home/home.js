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
  renderUserChatModal();
};

const chats = [{
  message: "messsdaffage",
  userId: "1232",
  username: "test username",
  time: Date.now(),
},{
  message: "messagsdfsdafe",
  userId: "123",
  username: "test username",
  time: Date.now(),
},{
  message: "messsdafffffffffffffage",
  userId: "123",
  username: "test username",
  time: Date.now(),
},{
  message: "messsdafffffffffffffage",
  userId: "123",
  username: "test username",
  time: Date.now(),
},{
  message: "messsdafffffffffffffage",
  userId: "1232",
  username: "test username",
  time: Date.now(),
},{
  message: "messsdafffffffffffffage",
  userId: "1232",
  username: "test username",
  time: Date.now(),
},{
  message: "messsdafffffffffffffage",
  userId: "1232",
  username: "test username",
  time: Date.now(),
},{
  message: "messsdafffffffffffffage",
  userId: "123",
  username: "test username",
  time: Date.now(),
},{
  message: "messsdafffffffffffffage",
  userId: "1232",
  username: "test username",
  time: Date.now(),
}];
const userId="123";

const addToChat = () => {
  const message = document.getElementById("chatText").value;
  if (message) {
    chats.push({
      message: message,
      userId: "123",
      username: "test username",
      time: Date.now(),
    });
    document.getElementById("chatText").value = "";
    renderChatList();
  }
};
const renderChatList = () => {
  const chatBody = document.getElementById("chatBody");
  chatBody.innerHTML='';
  chats.forEach((chat) => {
    const chatTile = `
    <div class="w-full row ${chat.userId == userId ? "justify-end" : "justify-start"}">
    <div class="column justify-end" style="${chat.userId == userId ? "text-align:right; margin-left:25%;" : "text-align:left; margin-right:25%;"}">
      <div class="w-full row ${chat.userId == userId ?"justify-end":"justify-start"}" style="margin-top:20px;margin-bottom:8px; ${chat.userId == userId ?"margin-right:30px;":"margin-left:30px;"}">
        ${chat.username}
      </div>
      <div class="w-full row ${chat.userId == userId ?"justify-end":"justify-start"}">
        <div class="chatTile ${chat.userId == userId ?"sendTile":"receiveTile"}">
          ${chat.message}
        </div>
      </div>  
      <div class="w-full row ${chat.userId == userId ?"justify-end":"justify-start"}" style="font-size:15px; margin-top:8px; ${chat.userId == userId ?"margin-right:30px;":"margin-left:30px;"}">
      ${new Date(chat.time)
        .toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })
        .replaceAll(',', ' ')}  
      </div>
    </div>

    </div>
    `;
    chatBody.insertAdjacentHTML('beforeend', chatTile);
  });
  chatBody.scrollTop = chatBody.scrollHeight - chatBody.clientHeight;
};

const renderUserChatModal = () => {
  const element = document.getElementById("userChatModal");
  if (chatModalOpen) {
    element.innerHTML = ` <div>
    <div class="bgOverlay" onclick="toggleChatModal()"></div>
    <div class="chatModalContainer">
      <div class="chatModal column">
        <div
          class="row items-center justify-center w-full"
          style="margin-bottom: 4px"
        >
          <div class="modalHeader">Drop Us A Message</div>
        </div>
        <div class="chatBody column" id="chatBody"></div>
        <div
          class="w-full row justify-between"
          style="height: 70px; margin-top:20px;"
        >
          <input
            class="chatInput"
            placeholder="Type your message here"
            type="text"
            id="chatText"
          />
          <div class="chatButtons row justify-center">
            <div class="iconCircle row justify-center">
              <img
                src="/Online-Pharmacy-Portal/assets/images/chat/attachment.png"
                class="attachmentIcon"
              />
            </div>
            <div class="iconCircle row justify-center" onclick="addToChat()">
              <img
                src="/Online-Pharmacy-Portal/assets/images/chat/send.png"
                class="sendIcon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>`;
    renderChatList()
  } else {
    element.innerHTML = "<div></div>";
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
