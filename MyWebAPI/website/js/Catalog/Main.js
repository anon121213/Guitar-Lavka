const GetAllProductsId = "GetAllProducts";
const GetProductsByPriceID = "GetProductsByPrice";
const GetDataById = "GetDataById";
const GetStringsCountId = "GetStringsCount";
const GetSearchProductsId = "GetProductsBySearch";
const GetProductByTypeId = "GetProductByType";
const GetProductsCountId = "GetProductsCount";
const GetMaxPriceId = "GetMaxPrice";

const descendingPriceButton = document.getElementById("RedusePriceButton");
const ascendingPriceButton = document.getElementById("IncreasePriceButton");
const defaultSortButton = document.getElementById("DefaultSortButton");
const applyPriceButton = document.getElementById("apply-price-range");
const productsCount = document.getElementById("products-count");
const minPriceInput = document.getElementById("min-price");
const maxPriceInput = document.getElementById("max-price");
const isStock = document.getElementById("isStock");
const searchButton = document.getElementById("Search_button");
const searchInput = document.getElementById("Search_input");
const electricGuitarFilter = document.getElementById("ElectricGuitar");
const acusticGuitarFilter = document.getElementById("AcusticGuitar");

const Default = 0;
const Ascending = 1;
const Descending = 2;
const ElectricGuitar = 1;
const AcusticGuitar = 2;

let lastEvent = GetAllProductsId;
let currentProductType = ElectricGuitar;
let currentPriceType = Default;

electricGuitarFilter.onclick = async () =>
    loadProducts(GetProductByTypeId, ElectricGuitar);

acusticGuitarFilter.onclick = async () =>
    loadProducts(GetProductByTypeId, AcusticGuitar);

searchButton.onclick = async () =>
    loadProducts(GetSearchProductsId, currentProductType);

isStock.onclick = async () =>
    loadProducts(lastEvent, currentProductType);

applyPriceButton.onclick = async () =>
    loadProducts(GetProductsByPriceID, currentProductType);

descendingPriceButton.onclick = async () =>
    loadProducts(GetProductsByPriceID, currentProductType, Descending);

ascendingPriceButton.onclick = async () => 
    loadProducts(GetProductsByPriceID, currentProductType, Ascending);

defaultSortButton.onclick = async () =>
    loadProducts(lastEvent, currentProductType, Default);

window.onload = async function() {
    CreateAll();
    await GetPrice(maxPriceInput.value);
    await LoadAllProducts(isStock.checked, searchInput.value, 1);
    await GetCount();
};

function CreateAll() {
    CreateFiltersLogic("listButton", "list_name", "Arrow");
    CreateScrollButton("BackToStartPageButton");
    CreateFinderLogic("loop", "input", "logo");
    CreateBurgerLogic("burgerButton", "burger", "content", "hideBurgerButton");
    CreateMobileFilters("mobileSort", "filtersButton");
    CreateNumsLogic("nums", "last", "first", "start", "finish");
    CreateGridLogic("grid_Active", "grid_nonActive", "list_Active", "list_nonActive", "list", "grid");
    CreateBasketButton("nonActiveBuscket", "ActiveBuscket", '', "", false);
    CreateFavoritesLogic("ActiveHeart", "nonActiveHeart");
    CreatePlayer("https://www.youtube.com/iframe_api");
}

async function loadProducts(eventId, type, priceType = currentPriceType) {
    lastEvent = eventId;
    currentProductType = type;
    currentPriceType = priceType;
    
    if(eventId != GetProductByTypeId && eventId != GetProductsByPriceID)
        await GetPrice(maxPriceInput.value);
    else if(eventId != GetProductsByPriceID)
        await GetPrice(9999999);
    
    await LoadAllProductPayLoad(minPriceInput.value,
        maxPriceInput.value,
        currentPriceType,
        isStock.checked,
        lastEvent,
        searchInput.value,
        currentProductType);

    await GetCount();
}

async function GetCount(){
    productsCount.innerText = `${await GetProductsCount(minPriceInput.value,
        maxPriceInput.value, isStock.checked, currentProductType, searchInput.value)} товаров`;
}

async function GetPrice(maxPrice){
    maxPriceInput.value = await GetMaxPrice(minPriceInput.value,
        maxPrice, isStock.checked, currentProductType, searchInput.value);
}