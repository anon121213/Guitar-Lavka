﻿async function LoadAllProductByPrice(minPrice, maxPrice, id) {
    try {
        minPrice = minPrice == '' ? 0 : minPrice;
        maxPrice = maxPrice == '' ? 999999 : maxPrice;

        const data = { minPrice, maxPrice }
        
        const response = await fetch(`http://localhost:5144/api/eventservice/payload-event/${id}`, {
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

        if (products.allProducts == null)
            return;

        gridDiv.innerHTML = '';
        
        products.allProducts.forEach(product => {
            gridDiv.innerHTML += createProductHTML(product);
        });
    } 
    catch (error) {
        console.error('Error:', error);
    }
}