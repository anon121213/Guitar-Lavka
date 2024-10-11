const GetAllProdictsId = "GetAllProducts"
const GetyDiapasonePrice = "GetProductsByDiapasonePrice"
const ReduseID = "GetReduseProducts";
const IncreaseID = "GetIncreseProducts";
const GetDataById = "GetDataById";
const GetStringsCountId = "GetStringsCount";

const nullData = {
    minPrice: 0,
    maxPrice: 0
}

function createProductHTML(product) {
    return `
        <div class="product">   
            <form action="#" class="product">
                <div class="product__imgContainer">
                    <a href="product.html"><img class="product__imgContainer__img" src="../img/catalogImg/section2/${product.imageLink}" alt="${product.name}"></a>
                </div>
                <div class="content">
                    <a href="#"><p class="type">${product.type}</p></a>
                    <a href="product.html"><h2 class="name">${product.name}</h2></a>
                    <div class="content__bottom">
                        <div class="count">
                            <p class="price">₽${product.price}</p>
                            <p class="sale-price">₽${product.salePrice}</p>
                        </div>
                        <div class="score">
                            <img src="../img/indexImg/section4/Score.svg" alt="score.svg">
                            <a href="#"><p class="score">${product.ratingCount} <span>отзывов</span></p></a>
                        </div>
                    </div>
                </div> 
            </form>                                                      
        </div>
    `;
}

async function LoadAllProducts() {
    try {
        const data = {
            minPrice: 0,
            maxPrice: 200000
        }
        
        const response = await fetch(`http://localhost:5144/api/eventservice/payload-event/${GetAllProdictsId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nullData)
        });

        if (!response.ok) 
            console.log('Network response was not ok');

        const products = await response.json();
        const gridDiv = document.getElementById('grid');
        
        products.allProducts.forEach(product => {
            gridDiv.innerHTML += createProductHTML(product);
        })

    } catch (error) {
        console.error('Error:', error);
    }
}

async function LoadAllProductByPrice() {
    try {
        const data = {
            minPrice: 0,
            maxPrice: 200000
        }

        const response = await fetch(`http://localhost:5144/api/eventservice/payload-event/${IncreaseID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) 
            console.log('Network response was not ok');

        const products = await response.json();
        const gridDiv = document.getElementById('grid');

        products.allProducts.forEach(product => {
            gridDiv.innerHTML += createProductHTML(product);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

window.onload = async function() {
    await LoadAllProducts();
};
