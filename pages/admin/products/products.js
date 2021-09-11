let selectedOrderTab = "active";

const setSelectedOrderTab = (orderTab) => {
  selectedOrderTab = orderTab;
  if (orderTab == "active") {
    document.getElementById("activeTab").style.backgroundColor = "#2e62ff";
    document.getElementById("completedTab").style.backgroundColor = "#333333";
  } else {
    document.getElementById("completedTab").style.backgroundColor = "#2e62ff";
    document.getElementById("activeTab").style.backgroundColor = "#333333";
  }
};

let modalOpen = false;
let headerImage;

const toggleModal = () => {
  modalOpen = !modalOpen;
  renderModal();
};

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = {
    name: e.target.name.value,
    description: e.target.description.value,
    price: e.target.price.value,
    category: e.target.category.value,
    photo: headerImage,
  };
  console.log(formData);
  toggleModal();
};

const encodeImage = (e) => {
  console.log(e);
  if (e && e[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = () => {
        const imgBase64Path = e.target.result;
        headerImage = imgBase64Path.split(",")[1];
        renderModal();
      };
    };
    reader.readAsDataURL(e[0]);
  }
};

const renderModal = () => {
  const element = document.getElementById("productModal");
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
          <h2 class="modalTitle">Add Product</h2>
        </div>
        <button class="btnImageUpload">
        <input
          type="file"
          id="photo"
          class="imageUploadInput"
          onChange="encodeImage(this.files)"
        ></input>
        ${
          headerImage
            ? `<img
                src=${
                  headerImage.includes("https://firebasestorage.googleapis.com")
                    ? headerImage
                    : `data:image/jpeg;base64,${headerImage}`
                }
                alt="headerImage"
                class="w-full productFormImageDisplay"
              ></img>`
            : `<div class="column justify-center">
                <img src="/Online-Pharmacy-Portal/assets/images/admin/products/cam.png" class="camImage" />
              <div style="margin-top:25px">Upload Image</div>
            </div>`
        }
      </button>
        <input
          class="inputField"
          placeholder="Product name"
          type="text"
          id="name"
          required
        />
        <textarea
        class="inputField"
        placeholder="Product description"
        rows=5
        id="description"
        required
      ></textarea>
        <input
          class="inputField"
          placeholder="Product price"
          type="number"
          id="price"
          required
        />
        <select
          class="inputField"
          id="category"
          required
        >
          <option value="" disabled selected>Product Category</option>
          <option value="Category 1">Category 1</option>
          <option value="Category 2">Category 2</option>
          <option value="Category 3">Category 3</option>
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
          Add Product
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
  setSelectedOrderTab("active");
  renderModal();
};

if (document.readyState !== "loading") {
  initialize();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initialize();
  });
}
