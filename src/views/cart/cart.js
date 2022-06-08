// import { navTransition } from '../../../shopping-mall-cart/src/views/nav-transition/nav-transition.js';
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
    const productDom = Object.keys(state.cartList).reduce(
        (prev, productId) =>
            prev +
            productLayout(state.productInfo[productId], state.cartList[productId]),
        '',
    );
    ref.cartContainer.innerHTML = productDom;
};

const drawCheckoutInfo = () => {
    ref.quantity.innerText = state.quantity;
    ref.total.innerText = state.total;
};

const setEvents = () => {
    // 이벤트 위임 : 삭제 버튼
    ref.cartContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove')) {
            const productId = e.target.dataset.id;

            deleteProduct(productId);
            drawCartList();
            drawCheckoutInfo();
        }
    });

    // 이벤트 위임 : 수량 변경
    ref.cartContainer.addEventListener('input', (e) => {
        if (e.target.classList.contains('qty')) {
            const productId = e.target.dataset.id;
            const newQty = parseInt(e.target.value) || 0;
            e.target.placeholder = newQty;

            updateQty(productId, newQty);
            drawCartList();
            drawCheckoutInfo();
        } else if (e.target.classList.contains('select-btn')) {
            const productId = e.target.dataset.id;

            selectProduct(productId);
            drawCartList();
            drawCheckoutInfo();
        }
    });

    // 전체 선택
    ref.selectAllBtn.addEventListener('input', (e) => {
        const checkState = e.target.checked;

        selectAllProduct(checkState);
        drawCartList();
        drawCheckoutInfo();
    });

    // 선택 삭제
    ref.deleteSelectedBtn.addEventListener('click', () => {
        deleteSelectedProduct();
        drawCartList();
        drawCheckoutInfo();
    });

    // 결제 버튼
    ref.checkoutBtn.addEventListener('click', () => {
        const selectedProduct = Object.keys(state.cartList).reduce(
            (prev, productId) => {
                if (state.cartList[productId].checked) {
                    prev[productId] = state.cartList[productId];
                    return prev;
                }
            },
            {},
        );
        if (!Object.keys(selectedProduct).length) {
            e.preventDefault();
            alert('장바구니에 담긴 상품이 없습니다.');
        } else {
            localStorage.setItem('payment', JSON.stringify(selectedProduct));
        }
    });
};

const render = () => {
    // navTransition('cart');
    drawCartList();
    drawCheckoutInfo();
};

initState()
    .then(() => render())
    .then(() => setEvents());
