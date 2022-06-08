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

const createProductInfoMap = (productList) => {
    return productList.reduce((prev, curr) => {
        prev[curr._id] = curr;
    }, {});
};

const init = () => {
    const cartListFromLocalStorage = JSON.parse(localStorage.getItem('cart'));

    if (cartListFromLocalStorage) {
        state.cartList = cartListFromLocalStorage;
        state.productInfo = createProductInfoMap(requestProductInfo());
    }
};

export default {
    state,
    updateQty,
    deleteProduct,
    deleteAllProduct,
    init,
};
