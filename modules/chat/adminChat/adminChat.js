const renderAdminChatModal = () => {
  const element = document.getElementById("chatModal");
  if (chatModalOpen) {
    console.log("Hellow");
  } else {
    element.innerHTML = "<div></div>";
  }
};
