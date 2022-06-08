const state = {
    cartList: {},
    productInfo: {},
    selectedProduct: [],
    quantity: 0,
    total: 0,
};

const selectProduct = () => {};

const selectAllProduct = () => {};

const updateQty = (productId, newQty) => {};

const deleteProduct = (ref, productId) => {
    const input = document
        .getElementById(productId)
        .querySelector('.select-btn');

    if (input.checked) {
        quantity.innerText =
            parseInt(quantity.innerText) - this.userSelectInfo.quantity;
        total.innerText =
            parseInt(total.innerText) -
            this.userSelectInfo.quantity * this.product.price;
    }

    const cart = JSON.parse(localStorage.getItem('cart'));
    delete cart[productId];
    localStorage.setItem('cart', JSON.stringify(cart));
    ref.cartContainer.removeChild(document.getElementById(productId));
};

const deleteAllProduct = () => {};

const requestProductInfo = async () => {
    const res = await fetch(`/api/products/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productIds: Object.keys(state.cartList).map((id) => id),
        }),
    });
    return await res.json();
};

const createMap = (arr) => {
    return arr.reduce((prev, curr) => {
        prev[curr._id] = curr;
        return prev;
    }, {});
};

const init = async () => {
    const cartListFromLocalStorage = JSON.parse(localStorage.getItem('cart'));

    if (cartListFromLocalStorage) {
        state.cartList = cartListFromLocalStorage;

        const productInfo = await requestProductInfo();
        state.productInfo = createMap(productInfo);
    }
};

export { state, updateQty, deleteProduct, deleteAllProduct, init };
