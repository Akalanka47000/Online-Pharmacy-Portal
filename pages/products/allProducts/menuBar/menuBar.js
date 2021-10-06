let showFilters = false;

const toggleFilters = () => {
  showFilters = !showFilters;
  renderFilters();
};

const renderFilters = () => {
  const filtersColumn = document.getElementById("filtersColumn");
  const filterText = document.getElementById("showFilterText");

  if (showFilters) {
    filtersColumn.style.display = "flex";
    filterText.innerHTML = "Hide filters";
  } else {
    filterText.innerHTML = "Click to show Filters";
    if (window.matchMedia("(max-width:960px)").matches) {
      filtersColumn.style.display = "none";
    }
  }
};

const categories = ["All", "Liquid", "Tablet"];
const brands = ["All", "Brand1", "Brand2"];

let selectedCategoryFilter = "All";
let selectedBrandFilter = "All";

const setSelectedCategoryFilter = (filterOption) => {
  selectedCategoryFilter = filterOption;
  renderCategoryItems();
  renderAllProducts();
};

const setSelectedBrandFilter = (filterOption) => {
  selectedBrandFilter = filterOption;
  renderBrandItems();
  renderAllProducts();
};

const renderCategoryItems = () => {
  const categoryElement = document.getElementById("categories");
  categoryElement.innerHTML = "";
  categories.forEach((category) => {
    const categoryComponenet = `<div class="w-full filterOption" onClick="setSelectedCategoryFilter('${category}')" style="background-color:${
      selectedCategoryFilter == category ? "#0055e6" : "#2e7bff"
    }">${category}</div>`;
    categoryElement.insertAdjacentHTML("beforeend", categoryComponenet);
  });
};

const renderBrandItems = () => {
  const brandElement = document.getElementById("brands");
  brandElement.innerHTML = "";
  brands.forEach((brand) => {
    const brandComponent = `<div class="w-full filterOption" onClick="setSelectedBrandFilter('${brand}')" style="background-color:${
      selectedBrandFilter == brand ? "#0055e6" : "#2e7bff"
    }">${brand}</div>`;
    brandElement.insertAdjacentHTML("beforeend", brandComponent);
  });
};

const initSideNav = () => {
  renderCategoryItems();
  renderBrandItems();
  renderFilters();
};

if (document.readyState !== "loading") {
  initSideNav();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initSideNav();
  });
}
