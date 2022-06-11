const categoryLayout = (categoryList) => {
    const categoryBtnList = categoryList.reduce(
        (prev, curr) =>
            prev +
            `<a href="#scroll-top"><button class="category-btn" id=${curr}>${curr}</button></a>`,
        '',
    );
    return `
        <div id="category">
            ${categoryBtnList}
        </div>
    `;
};

const productLayout = (product) => {
    const a = document.createElement('div');
    a.classList.add('product');
    a.href = '/products/${product._id}';
    a.innerHTML = `
        <div class="product-img-container">
            <button class="cart-btn">Add to Cart</button>
            <img
                src=${product.img}
                alt="product-img">
        </div>
        <div class="product-info-container">
            <div class="brand">${product.brand}</div>
            <div class="product-name">${product.productName}</div>
            <div class="price">${product.price}원</div>
        </div>
    `;
    return a;
};

const modalLayout = () => {
    const sizeBtnList = this.product.size.reduce((prev, curr) => {
        return prev + `<button class="size-btn" id=${curr}>${curr}</button>`;
    }, '');

    return `
        <div class="modal-background">   
            <div class="modal-box">
                ${sizeBtnList}
            </div>
        </div>
    `;
};

export { categoryLayout, productLayout, modalLayout };
