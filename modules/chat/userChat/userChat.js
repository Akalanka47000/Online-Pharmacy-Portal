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

const encodeImage = (e) => {
    if (e && e[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = () => {
          const imgBase64Path = e.target.result;
          const img = imgBase64Path.split(",")[1];
          chats.push({
            message: "base64EncodedImg/imageUrl"+img,
            userId: "123",
            username: "test username",
            time: Date.now(),
          });
          renderChatList();
        };
      };
      reader.readAsDataURL(e[0]);
    }
  };

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
      <div class="w-full row ${chat.userId == userId ?"justify-end":"justify-start"}" style="margin-top:25px;margin-bottom:8px; ${chat.userId == userId ?"margin-right:30px;":"margin-left:30px;"}">
        ${chat.username}
      </div>
      <div class="w-full row ${chat.userId == userId ?"justify-end":"justify-start"}">
        <div class="chatTile ${chat.userId == userId ?"sendTile":"receiveTile"}" style="${chat.message.includes('base64EncodedImg/imageUrl')?'background-color:#FFFFFF !important; box-shadow:none !important':''}">
          ${!chat.message.includes('base64EncodedImg/imageUrl')?chat.message:`<img src="data:image/jpeg;base64,${chat.message.replaceAll('base64EncodedImg/imageUrl','')}" class="chatMessageImage"/>`}
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
  const element = document.getElementById("chatModal");
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
              <input
                type="file"
                id="photo"
                class="attachmentInput"
                onChange="encodeImage(this.files)"
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