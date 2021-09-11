let modalOpen = false;

const toggleModal = () => {
  modalOpen = !modalOpen;
  renderModal();
};

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = {
    username:e.target.username.value,
    email:e.target.email.value,
    userRole:e.target.userRole.value,
  }
  console.log(formData)
  toggleModal();
};

const renderModal = () => {
  const element = document.getElementById("userModal");
  if (modalOpen) {
    element.innerHTML = `<div>
    <div class="bgOverlay"></div>
    <div class="modalContainer">
      <form
        id="userForm"
        method="post"
        class="modalForm column"
      >
        <div class="w-full row justify-end" style="height: 70px">
          <div class="btnIcon" onclick="toggleModal()">
            <img
              src="/Online-Pharmacy-Portal/assets/images/navbar/cross.svg"
              alt="Close"
              class="cross icon"
              style="height: 40px; width: 40px"
            />
          </div>
        </div>
        <div
          class="row items-center justify-center w-full"
          style="margin-bottom: 4px"
        >
          <h2 class="modalTitle">Add User</h2>
        </div>
        <input
          class="inputField"
          placeholder="Username"
          type="text"
          id="username"
          required
        />
        <input
          class="inputField"
          placeholder="Email"
          type="email"
          id="email"
          required
        />
        <select
          class="inputField"
          id="userRole"
          required
        >
          <option value="" disabled selected>User Role</option>
          <option value="Admin">Admin</option>
          <option value="Pharmacist">Pharmacist</option>
        </select>
        <button
          type="submit"
          class="button modalBtnAdd"
          style="
            width: auto;
            padding-left: 50px;
            padding-right: 50px;
            margin-right: 0px;
            margin-left: 0px;
          "
        >
          Add User
        </button>
      </form>
    </div>
  </div>`;

    const form = document.getElementById("userForm");
    form.addEventListener("submit", handleSubmit);
  } else {
    element.innerHTML = "<div></div>";
  }
};

const initialize = () => {
  AOS.init({ offset: 0, duration: 1000 });
  renderModal();
  document
    .getElementById("productTab")
    .addEventListener("mouseenter", function () {
      document.getElementById("userTab").style.backgroundColor = "#333333";
    });

  document
    .getElementById("productTab")
    .addEventListener("mouseout", function () {
      document.getElementById("userTab").style.backgroundColor = "#2e62ff";
    });
};

if (document.readyState !== "loading") {
  initialize();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initialize();
  });
}
