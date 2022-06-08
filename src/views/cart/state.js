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

const deleteProduct = (productId) => {};

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
