const state = {
    cartList: {},
    productInfo: {},
    quantity: 0,
    total: 0,
};

const selectProduct = () => {};

const selectAllProduct = () => {};

const updateQty = (productId, newQty) => {};

const deleteProduct = (productId) => {
    if (cartList[productId][checked]) {
        quantity -= cartList[productId].quantity;
        total -= cartList[productId].total * cartList[productId].quantity;
    }
    delete cartList[productId];
    localStorage.setItem('cart', JSON.stringify(cart));
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

const createMap = (arr, key) => {
    return arr.reduce((prev, curr) => {
        prev[curr[key]] = curr;
        return prev;
    }, {});
};

const initState = async () => {
    const cartListFromLocalStorage = JSON.parse(localStorage.getItem('cart'));

    if (cartListFromLocalStorage) {
        state.cartList = cartListFromLocalStorage;
        const productInfo = await requestProductInfo();
        state.productInfo = createMap(productInfo, '_id');
        Object.keys(state.cartList).forEach((id) => {
            if (state.cartList[id].checked) {
                state.quantity += state.cartList[id].quantity;
                state.total +=
                    state.cartList[id].quantity * state.cartList[id].price;
            }
        });
    }
};

export { state, updateQty, deleteProduct, deleteAllProduct, initState };
