const GetAllProdictsId = "GetAllProducts"
const GetDiapasonePrice = "GetProductsByRangePrice"
const ReduseID = "GetReduseProducts";
const IncreaseID = "GetIncreseProducts";
const GetDataById = "GetDataById";
const GetStringsCountId = "GetStringsCount";
const GetSearchProducts = "GetProductsBySearch";
const GetAcusticGuitarsId = "GetAcusticGuitars";
const GetElectricGuitarsId = "GetElectricGuitars";

const reducePriceButton = document.getElementById("RedusePriceButton");
const increasePriceButton = document.getElementById("IncreasePriceButton");
const defaultSortButton = document.getElementById("DefaultSortButton");
const applyPriceButton = document.getElementById("apply-price-range");
const productsCount = document.getElementById("products-count");

const minPriceInput = document.getElementById("min-price");
const maxPriceInput = document.getElementById("max-price");
const isStock = document.getElementById("isStock");
const searchButton = document.getElementById("Search_button");
const serchInput = document.getElementById("Search_input");

const electricGuitarFilter = document.getElementById("ElectricGuitar");
const acusticGuitarFilter = document.getElementById("AcusticGuitar");

let lastEvent = GetAllProdictsId;

electricGuitarFilter.onclick = async () => {
    lastEvent = GetElectricGuitarsId;
    await LoadAllProductByPrice(minPriceInput.value, maxPriceInput.value,
        isStock.checked, GetElectricGuitarsId, serchInput.value);
}

acusticGuitarFilter.onclick = async () => {
    lastEvent = GetAcusticGuitarsId;
    await LoadAllProductByPrice(minPriceInput.value, maxPriceInput.value,
        isStock.checked, GetAcusticGuitarsId, serchInput.value);
}

searchButton.onclick = async () => {
    lastEvent = GetSearchProducts;
    await LoadAllProductByPrice(minPriceInput.value, maxPriceInput.value,
        isStock.checked, GetSearchProducts, serchInput.value);
}

isStock.onclick = async () => {
    await LoadAllProductByPrice(minPriceInput.value, maxPriceInput.value,
        isStock.checked, lastEvent, serchInput.value)
}

applyPriceButton.onclick = async () => {
    lastEvent = GetDiapasonePrice
    await LoadAllProductByPrice(minPriceInput.value, maxPriceInput.value, 
        isStock.checked, GetDiapasonePrice, serchInput.value)
}

reducePriceButton.onclick = async () => {
    lastEvent = ReduseID;
    await LoadAllProductByPrice(minPriceInput.value, maxPriceInput.value, 
        isStock.checked, ReduseID, serchInput.value);
}

increasePriceButton.onclick = async () => {
    lastEvent = IncreaseID;
    await LoadAllProductByPrice(minPriceInput.value, maxPriceInput.value, 
        isStock.checked, IncreaseID, serchInput.value);
}

defaultSortButton.onclick = async () => {
    await LoadAllProducts(isStock.checked, serchInput.value);
}

window.onload = async function() {
    CreateAll();
    await LoadAllProducts(isStock.checked);
};

function CreateAll(){
    CreateFiltersLogic("listButton", "list_name", "Arrow");
    CreateScrollButton("BackToStartPageButton");
    CreateFinderLogic("loop", "input", "logo");
  /*  CreateBurgerLogic("burgerButton", "burger",
        "content", "hideBurgerButton");*/
    CreateMobileFilters("mobileSort", "filtersButton");
    CreateNumsLogic("nums", "last", "first",
        "start", "finish");
    /*CreateGridLogic("gridActive", "gridNonActive",
        "listActives", "listNonActive", "list", "grid");*/
    CreateBasketButton("nonActiveBuscket", "ActiveBuscket",
        "", "", false);
    CreateFavoritesLogic( "ActiveHeart", "nonActiveHeart");
    CreatePlayer("https://www.youtube.com/iframe_api");
}