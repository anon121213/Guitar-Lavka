﻿async function GetMaxPrice(minPrice, maxPrice, isStockValue, type, searchText) {
    try {
        minPrice = minPrice == '' ? 0 : minPrice;
        maxPrice = maxPrice == '' ? 9999999 : maxPrice;

        let search = searchText ? searchText : '';
        let isStock = isStockValue;
        let priceType = 0;

        const data = { isStock, priceType, search, minPrice, maxPrice, type}

        const response = await fetch(`http://localhost:5144/api/eventservice/payload-event/${GetMaxPriceId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok)
            console.log('Network response was not ok');

        const products = await response.json();

        return products.price;
    }
    catch (error) {
        console.error('Error:', error);
    }
}