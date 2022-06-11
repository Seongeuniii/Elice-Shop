const state = {
    categoryList: [],
    setCategory: '',
    cartList: {},
    productList: [],
    setPage: 0,
    perPage: 20,
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
    state.categoryList = ['All', 'Shoes', 'Clothes', 'Others'];
    state.productList = await requestProduct();

    console.log(state);
};

export { state, initState };
