const GetAllProdictsId = "GetAllProducts"
const GetyDiapasonePrice = "GetProductsByDiapasonePrice"
const ReduseID = "GetReduseProducts";
const IncreaseID = "GetIncreseProducts";
const GetDataById = "GetDataById";
const GetStringsCountId = "GetStringsCount";

const reducePriceButton = document.getElementById("RedusePriceButton");
const increasePriceButton = document.getElementById("IncreasePriceButton");
const defaultSortButton = document.getElementById("DefaultSortButton");
const applyPriceButton = document.getElementById("apply-price-range");

const minPriceInput = document.getElementById("min-price");
const maxPriceInput = document.getElementById("max-price");

let lastEvent = IncreaseID;

applyPriceButton.onclick = async () => {
    await LoadAllProductByPrice(minPriceInput.value, maxPriceInput.value, GetyDiapasonePrice)
}

reducePriceButton.onclick = async () => {
    lastEvent = ReduseID;
    await LoadAllProductByPrice(minPriceInput.value, maxPriceInput.value, ReduseID);
}

increasePriceButton.onclick = async () => {
    lastEvent = IncreaseID;
    await LoadAllProductByPrice(minPriceInput.value, maxPriceInput.value, IncreaseID);
}

defaultSortButton.onclick = async () => {
    await LoadAllProducts();
}

window.onload = async function() {
    await LoadAllProducts();
};