async function LoadAllProducts(isStock) {
    try {
        const nullData = {
            isStock: isStock,
            minPrice: 0,
            maxPrice: 0
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
