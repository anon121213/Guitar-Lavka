async function LoadAllProducts(isStock, searchText, type) {
    try {
        const nullData = {
            isStock: isStock,
            priceType: 0,
            search: searchText ? searchText : '',
            minPrice: 0,
            maxPrice: 0,
            type: type
        }
        
        const response = await fetch(`http://localhost:5144/api/eventservice/payload-event/${GetAllProductsId}`, {
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

        if (products.allProducts == null)
            return;

        gridDiv.innerHTML = '';
        
        products.allProducts.forEach(product => {
            gridDiv.innerHTML += createProductHTML(product);
        })

    } catch (error) {
        console.error('Error:', error);
    }
}
