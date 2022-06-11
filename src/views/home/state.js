const state = {
    categoryList: ['All', 'Shoes', 'Clothes', 'Others'],
    setCategory: '',
    cartList: {},
    setPage: 0,
    perPage: 20,
};

const resetCategory = (category) => {
    state.setCategory = category;
    state.setPage = 0;
    state.productList = [];
};

const requestProduct = async () => {
    state.setPage++;
    const res = await fetch(
        `/api/products?category=${state.setCategory}&perPage=${state.perPage}&page=${state.setPage}`,
    );
    const data = await res.json();
    return data.productList;
};

const initState = async () => {
    const cartListFromLocalStorage = JSON.parse(localStorage.getItem('cart'));

    if (cartListFromLocalStorage) {
        state.cartList = cartListFromLocalStorage;
    }
};

export { state, resetCategory, requestProduct, initState };
