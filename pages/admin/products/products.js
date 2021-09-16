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
  renderOrderList();
};

let formData = {
  name: "",
  description: "",
  price: "",
  category: "",
  brand: "",
  stocks: "",
  image: "",
};

let modalPurpose = "add";
let modalOpen = false;
let headerImage;
let editingProductID = "";
const openAddModal = () => {
  modalPurpose = "add";
  clearFormData();
  toggleModal();
};

const openEditModal = (
  id,
  name,
  descrip,
  price,
  category,
  brand,
  stocks,
  image
) => {
  modalPurpose = "edit";
  formData = {
    name: name,
    description: descrip,
    price: price,
    category: category,
    brand: brand,
    stocks: stocks,
  };
  headerImage = image;
  editingProductID = id;
  toggleModal();
};

const toggleModal = () => {
  modalOpen = !modalOpen;
  renderModal();
};

const clearFormData = () => {
  headerImage = "";
  formData = {
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stocks: "",
  };
  editingProductID = "";
};

const handleSubmit = (e) => {
  e.preventDefault();

  var data = new FormData();
  if (modalPurpose == "add") {
    data.append("function", "addProduct");
  } else if (modalPurpose == "edit") {
    data.append("function", "editProduct");
    data.append("id", editingProductID);
  }
  data.append("name", e.target.name.value);
  data.append("description", e.target.description.value);
  data.append("price", e.target.price.value);
  data.append("category", e.target.category.value);
  data.append("brand", e.target.brand.value);
  data.append("stocks", e.target.stocks.value);
  data.append("image", headerImage);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const result = JSON.parse(this.responseText);
      if (result.success == true) {
        toggleModal();
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
          window.location.reload();
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
  xmlhttp.open("POST", "products.php", true);
  xmlhttp.send(data);
};

const deleteProduct = (id) => {
  var data = new FormData();
  data.append("function", "deleteProduct");
  data.append("productID", id);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const result = JSON.parse(this.responseText);
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
          window.location.reload();
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
  xmlhttp.open("POST", "products.php", true);
  xmlhttp.send(data);
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
          <h2 class="modalTitle">${
            modalPurpose == "add" ? "Add Product" : "Edit Product"
          }</h2>
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
          value="${formData.name}"
          required
        />
        <textarea
        class="inputField"
        placeholder="Product description"
        rows=5
        id="description"
        required
      >${formData.description}</textarea>
        <input
          class="inputField"
          placeholder="Product price"
          type="number"
          id="price"
          value="${formData.price}"
          required
        />
        <input
        class="inputField"
        placeholder="Product Brand"
        type="text"
        id="brand"
        value="${formData.brand}"
        required
      />
      <input
        class="inputField"
        placeholder="Available Stocks"
        type="number"
        id="stocks"
        value="${formData.stocks}"
        required
      />
        <select
          class="inputField"
          id="category"
          required
        >
          <option value="" disabled selected>Product Category</option>
          <option value="Liquid" ${
            formData.category == "Liquid" ? "selected" : ""
          }>Liquid</option>
          <option value="Tablet" ${
            formData.category == "Tablet" ? "selected" : ""
          }>Tablet</option>
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
          ${modalPurpose == "add" ? "Add Product" : "Edit Product"}
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

const renderProductList = () => {
  var data = new FormData();
  data.append("function", "getAllProducts");
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const products = JSON.parse(this.responseText);
      const productElement = document.getElementById("productList");
      productElement.innerHTML = "";
      products.forEach((product, index) => {
        const productComponent = `
        <div style="width:100%;" data-aos="${
          index % 2 == 0 ? "fade-right" : "fade-left"
        }">
            <div class="row productTableRow">
              <div class="tableCell wideCell row justify-start"><img
              src="/Online-Pharmacy-Portal/assets/images/admin/products/tag.png"
              class="productInfoIcon" style="width:30px;height:20px;"
            /><div>${product.productName}</div></div>
              <div class="tableCell wideCell row justify-start"><img
              src="/Online-Pharmacy-Portal/assets/images/admin/products/descrip.png"
              class="productInfoIcon" style="width:30px;height:30px;"
            /><div>${product.productDescription}</div></div>
              <div class="tableCell narrowCell row justify-start"><img
              src="/Online-Pharmacy-Portal/assets/images/admin/products/category.png"
              class="productInfoIcon" style="width:30px;height:30px;"
            /><div>${product.productCategory}</div></div>
            <div class="tableCell narrowCell row justify-start"><img
              src="/Online-Pharmacy-Portal/assets/images/admin/products/price.png"
              class="productInfoIcon" style="width:30px;height:30px;"
            /><div>${product.productPrice}</div></div>
            <div class="tableCell narrowCell row justify-start"><img
              src="/Online-Pharmacy-Portal/assets/images/admin/products/stocks.png"
              class="productInfoIcon" style="width:30px;height:30px;"
            /><div>${product.availableStocks}</div></div>
            <div class="tableCell narrowCell row justify-start"><img
              src="/Online-Pharmacy-Portal/assets/images/admin/products/sold.png"
              class="productInfoIcon" style="width:30px;height:30px;"
            /><div>${product.itemsSold}</div></div>
              <div class="tableCell narrowCell row justify-center"><div onclick="openEditModal('${
                product.productID
              }','${product.productName}','${product.productDescription}','${
          product.productPrice
        }','${product.productCategory}','${product.productBrand}','${
          product.availableStocks
        }','${product.productImage}',)"><img
              src="/Online-Pharmacy-Portal/assets/images/admin/edit.png"
              class="editImage"
            /></div></div>
            <div class="tableCell narrowCell row justify-center"><div onclick="deleteProduct('${
              product.productID
            }')"><img
            src="/Online-Pharmacy-Portal/assets/images/admin/bin.png"
            class="binImage"
          /></div></div>
            </div></div>`;
        productElement.insertAdjacentHTML("beforeend", productComponent);
      });
    }
  };
  xmlhttp.open("POST", "products.php", true);
  xmlhttp.send(data);
};

const renderOrderList = () => {
  var data = new FormData();
  if (selectedOrderTab == "active") {
    data.append("function", "getActiveOrders");
  } else {
    data.append("function", "getCompletedOrders");
  }
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const orders = JSON.parse(this.responseText);
      const orderElement = document.getElementById("orderList");
      orderElement.innerHTML = "";
      orders.forEach((order, index) => {
        const orderComponent = `
        <div style="width:100%;" data-aos="${
          index % 2 == 0 ? "fade-right" : "fade-left"
        }">
            <div class="row productTableRow">
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
    }
  };
  xmlhttp.open("POST", "products.php", true);
  xmlhttp.send(data);
};

const initialize = () => {
  AOS.init({ offset: 0, duration: 1000 });
  setSelectedOrderTab("active");
  renderProductList();
  renderOrderList();
  renderModal();
};

if (document.readyState !== "loading") {
  initialize();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initialize();
  });
}
