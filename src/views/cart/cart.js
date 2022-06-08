// import { navTransition } from '../../../shopping-mall-cart/src/views/nav-transition/nav-transition.js';
import { productLayout } from './component.js';

import {
    state,
    selectProduct,
    selectAllProduct,
    updateQty,
    deleteProduct,
    deleteAllProduct,
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

            // const prodTotal = document
            //     .getElementById(productId)
            //     .querySelector('.prod-total-text');
            // prodTotal.innerText =
            //     state.cartList[productId].price * state.cartList[productId].quantity;
        } else if (e.target.classList.contains('select-btn')) {
            const productId = e.target.dataset.id;
            console.log(productId);
            selectProduct(productId);
            drawCartList();
            drawCheckoutInfo();
        }
    });

    // 전체 선택
    ref.selectAllBtn.addEventListener('input', () => {
        const selectBtns = document.querySelectorAll('.select-btn');
        if (ref.selectAllBtn.checked) {
            selectBtns.forEach(
                (selectBtn) => !selectBtn.checked && selectBtn.click(),
            );
        } else {
            selectBtns.forEach(
                (selectBtn) => selectBtn.checked && selectBtn.click(),
            );
        }
    });

    // 선택 삭제
    ref.deleteSelectedBtn.addEventListener('click', () => {
        const productDomList = document.querySelectorAll('.items');
        productDomList.forEach((productDom) => {
            const selectBtn = productDom.querySelector('.select-btn');
            const removeBtn = productDom.querySelector('.remove-btn');
            if (selectBtn.checked) {
                removeBtn.click();
            }
        });
    });

    // 결제 버튼
    ref.checkoutBtn.addEventListener('click', (e) => {
        const allProductUI = Array.from(document.querySelectorAll('.items'));
        const cart = JSON.parse(localStorage.getItem('cart'));
        const selectedProduct = allProductUI.reduce((prev, productUI) => {
            const selectBtn = productUI.querySelector('.select-btn');
            if (selectBtn.checked) {
                prev[productUI.id] = cart[productUI.id];
            }
            return prev;
        }, {});
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
