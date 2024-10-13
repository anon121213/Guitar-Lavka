const GetAllProdictsId = "GetAllProducts"
const GetDiapasonePrice = "GetProductsByRangePrice"
const ReduseID = "GetReduseProducts";
const IncreaseID = "GetIncreseProducts";
const GetDataById = "GetDataById";
const GetStringsCountId = "GetStringsCount";

const reducePriceButton = document.getElementById("RedusePriceButton");
const increasePriceButton = document.getElementById("IncreasePriceButton");
const defaultSortButton = document.getElementById("DefaultSortButton");
const applyPriceButton = document.getElementById("apply-price-range");
const productsCount = document.getElementById("products-count");

const minPriceInput = document.getElementById("min-price");
const maxPriceInput = document.getElementById("max-price");
const isStock = document.getElementById("isStock");

let lastEvent = GetAllProdictsId;

isStock.onclick = async () => {
    await LoadAllProductByPrice(minPriceInput.value, maxPriceInput.value, isStock.checked, lastEvent)
}

applyPriceButton.onclick = async () => {
    lastEvent = GetDiapasonePrice
    await LoadAllProductByPrice(minPriceInput.value, maxPriceInput.value, isStock.checked, GetDiapasonePrice)
}

reducePriceButton.onclick = async () => {
    lastEvent = ReduseID;
    await LoadAllProductByPrice(minPriceInput.value, maxPriceInput.value, isStock.checked, ReduseID);
}

increasePriceButton.onclick = async () => {
    lastEvent = IncreaseID;
    await LoadAllProductByPrice(minPriceInput.value, maxPriceInput.value, isStock.checked, IncreaseID);
}

defaultSortButton.onclick = async () => {
    await LoadAllProducts(isStock.checked);
}

window.onload = async function() {
    CreateFiltersLogic("listButton", "list_name", "Arrow");
    CreateScrollButton("BackToStartPageButton");
    CreateFinderLogic("loop", "input", "logo");
    CreateBurgerLogic("burgerButton", "burger",
        "content", "hideBurgerButton");
    CreateMobileFilters("mobileSort", "filtersButton");
    CreateNumsLogic("numsClass", "lastClass", "firstClass",
        "startClass", "finishClass");
    CreateGridLogic("gridActive", "gridNonActive",
        "listActives", "listNonActive", "list", "grid");
    CreateBasketButton("nonActiveBuscket", "ActiveBuscket",
        "", "", false);
    CreateFavoritesLogic( "ActiveHeart", "nonActiveHeart");
    CreatePlayer("https://www.youtube.com/iframe_api");
    await LoadAllProducts(isStock.checked);
};