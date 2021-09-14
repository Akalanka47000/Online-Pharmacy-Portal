let modalOpen = false;

const toggleModal = () => {
  modalOpen = !modalOpen;
  renderModal();
};

const handleSubmit = (e) => {
  e.preventDefault();
  var data = new FormData();
  data.append("function","addUser");
  data.append("email", e.target.email.value);
  data.append("username", e.target.username.value);
  data.append("password", e.target.password.value);
  data.append("userRole", e.target.userRole.value);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const result = JSON.parse(this.responseText);
      if (result.success == true) {
        toggleModal();
        let timerInterval
        Swal.fire({
          icon: "success",
          heightAuto: false,
          background: "#f5fdff",
          title: `<div style="font-size:23px">${result.message}</div>`,
          showConfirmButton: false,
          timer: 1500,
          willClose: () => {
            clearInterval(timerInterval)
          },
        }).then(() => {
          window.location.reload();
        })
      } else {
        let errorMessage;
        if (result.message.includes("Duplicate entry")) {
          errorMessage = "A user with that email already exists";
        } else {
          errorMessage = result.message;
        }

        Swal.fire({
          icon: "warning",
          heightAuto: false,
          background: "#f5fdff",
          title: `<div style="font-size:23px">${errorMessage}</div>`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  xmlhttp.open("POST", "users.php", true);
  xmlhttp.send(data);
};

const deleteUser = (email) => {
  var data = new FormData();
  data.append("function","deleteUser");
  data.append("email", email);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const result = JSON.parse(this.responseText);
      if (result.success == true) {
        let timerInterval
        Swal.fire({
          icon: "success",
          heightAuto: false,
          background: "#f5fdff",
          title: `<div style="font-size:23px">${result.message}</div>`,
          showConfirmButton: false,
          timer: 1500,
          willClose: () => {
            clearInterval(timerInterval)
          },
        }).then(() => {
          window.location.reload();
        })
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
  xmlhttp.open("POST", "users.php", true);
  xmlhttp.send(data);
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
        action="users.php"
        target="dummyframe"
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
          name="username"
          required
        />
        <input
          class="inputField"
          placeholder="Email"
          type="email"
          id="email"
          name="email"
          required
        />
        <input
          class="inputField"
          placeholder="Password"
          type="password"
          id="password"
          name="password"
          required
        />
        <select
          class="inputField"
          id="userRole"
          name="userRole"
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

const renderUserList = () =>{
  var data = new FormData();
  data.append("function","getUsers");
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const users = JSON.parse(this.responseText);
      const userElement = document.getElementById("userList");
      userElement.innerHTML='';
      users.forEach((user,index) => {
        const userComponent = `
            <div class="row userTableRow" data-aos="${index%2==0?"fade-right":"fade-left"}">
              <div class="tableCell emailCell row justify-start"><img
              src="/Online-Pharmacy-Portal/assets/images/admin/users/email.svg"
              class="emailIcon"
            /><div>${user.email}</div></div>
              <div class="tableCell usernameCell row justify-start"><img
              src="/Online-Pharmacy-Portal/assets/images/admin/users/user.png"
              class="userIcon"
            /><div>${user.username}</div></div>
              <div class="tableCell userRoleCell row justify-start"><img
              src="/Online-Pharmacy-Portal/assets/images/admin/users/userRole.png"
              class="roleIcon"
            /><div>${user.userRole}</div></div>
              <div class="tableCell deleteCell row justify-center"><div onclick="deleteUser('${user.email}')"><img
              src="/Online-Pharmacy-Portal/assets/images/admin/bin.png"
              class="binImage"
            /></div></div>
            </div>`;
          userElement.insertAdjacentHTML('beforeend', userComponent);
      });
    }
  };
  xmlhttp.open("POST", "users.php", true);
  xmlhttp.send(data);
}

const initialize = () => {
  AOS.init({ offset: 0, duration: 1000 });
  renderUserList();
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
