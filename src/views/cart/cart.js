import { checkAccount } from '../check-account.js';
import drawNavbar from '../navbar/index.js';
import { productLayout } from './component.js';

import {
    state,
    selectProduct,
    selectAllProduct,
    updateQty,
    deleteProduct,
    deleteSelectedProduct,
    initState,
} from './state.js';

const ref = {
    cartContainer: document.querySelector('.cart-container'),
    selectAllBtn: document.getElementById('select-all-product'),
    deleteSelectedBtn: document.getElementById('delete-selected-btn'),
    quantity: document.getElementById('quantity'),
    total: document.getElementById('total'),
    checkoutBtn: document.getElementById('checkout-btn'),
};

const drawCartList = () => {
    const productDomList = Object.keys(state.cartList).reduce(
        (prev, productId) =>
            prev + productLayout(state.productInfo[productId], state.cartList[productId]),
        '',
    );
    ref.cartContainer.innerHTML = productDomList;
};

const drawCheckoutInfo = () => {
    ref.quantity.innerText = state.quantity;
    ref.total.innerText = state.total;
};

const setEvents = () => {
    const deleteHandler = (() => {
        ref.cartContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove')) {
                const productId = e.target.dataset.id;
                deleteProduct(productId);
                render();
            }
        });
    })();

    const changeQtyHandler = (() => {
        ref.cartContainer.addEventListener('input', (e) => {
            if (e.target.classList.contains('qty')) {
                const productId = e.target.dataset.id;
                const newQty = parseInt(e.target.value) || 0;
                updateQty(productId, newQty);
                render();
            } else if (e.target.classList.contains('select-btn')) {
                const productId = e.target.dataset.id;
                selectProduct(productId);
                render();
            }
        });
    })();

    const selectAllHandler = (() => {
        ref.selectAllBtn.addEventListener('input', (e) => {
            const checkState = e.target.checked;
            selectAllProduct(checkState);
            render();
        });
    })();

    const deleteSelectedHandler = (() => {
        ref.deleteSelectedBtn.addEventListener('click', () => {
            deleteSelectedProduct();
            render();
        });
    })();

    const checkoutHandler = (() => {
        ref.checkoutBtn.addEventListener('click', (e) => {
            const selectedProduct =
                Object.keys(state.cartList).reduce((prev, productId) => {
                    const targetProduct = state.cartList[productId];
                    if (targetProduct.checked && targetProduct.quantity) {
                        prev[productId] = targetProduct;
                        return prev;
                    }
                }, {}) ?? {};

            if (!Object.keys(selectedProduct).length) {
                e.preventDefault();
                alert('장바구니에 담긴 상품이 없습니다.');
            } else {
                localStorage.setItem('payment', JSON.stringify(selectedProduct));
            }
        });
    })();
};

const render = () => {
    drawCartList();
    drawCheckoutInfo();
};

const App = async () => {
    const { isLogined, isAdmin } = await checkAccount();
    await initState();

    drawNavbar('cart', isLogined, isAdmin);
    render();
    setEvents();
};

App();
