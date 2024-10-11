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