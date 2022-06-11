import drawNavbar from '../navbar/index.js';
import { productLayout, categoryLayout, modalLayout } from './component.js';
import { state, resetCategory, requestProduct, initState } from './state.js';

const ref = {
    categoryContainer: document.getElementById('category-container'),
    productContainer: document.getElementById('product-container'),
    cartCount: document.getElementById('cart-count'),
};

const drawCartCount = () => {
    if (!state.cartList) {
        ref.cartCount.innerText = 0;
    } else {
        ref.cartCount.innerText = Object.keys(state.cartList).length;
    }
};

const drawBanner = () => {
    const slider = document.querySelector('#slider');
    const slides = slider.querySelector('.slides');
    const slide = slides.querySelectorAll('.slide');
    let currentSlide = 0;
    setInterval(function () {
        let from = -(100 * currentSlide);
        let to = from - 100;

        slides.animate(
            {
                marginLeft: [from + 'vw', to + 'vw'],
            },
            {
                duration: 500,
                easing: 'ease',
                iterations: 1,
                fill: 'both',
            },
        );
        currentSlide++;
        if (currentSlide === slide.length - 1) {
            currentSlide = 0;
        }
    }, 2500);
};

const drawCategoryList = () => {
    ref.categoryContainer.innerHTML = categoryLayout(state.categoryList);
};

const drawProductList = async () => {
    const productList = await requestProduct();

    if (state.setPage === 1) ref.productContainer.innerHTML = '';

    productList.forEach((product, idx) => {
        const productDom = productLayout(product);

        // infinite scroll target
        if (idx == state.perPage - 1) {
            setTarget(productDom);
        }

        ref.productContainer.appendChild(productDom);
    });
};

const setTarget = (productDom) => {
    const observer = new IntersectionObserver(
        (entries, observer) => {
            if (entries[0].isIntersecting) {
                observer.unobserve(entries[0].target);
                console.log('hi');
                getData();
            }
        },
        {
            root: null,
            rootMargin: '0px 0px 0px 0px',
            thredhold: 1,
        },
    );
    observer.observe(productDom);
};

const setEvents = () => {
    // 이벤트 위임 : 카테고리 선택
    category.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-btn')) {
            resetCategory(e.target.id);
            drawProductList();
        }
    });

    // 뒤로가기 -> 장바구니 카운트 리렌더링
    window.onpageshow = function (event) {
        if (event.persisted || window.performance) {
            drawCartCount(ref.cartCount);
        }
    };
};

const render = () => {
    drawNavbar('home');
    drawCartCount();
    drawBanner();
    drawCategoryList();
    drawProductList();
};

initState()
    .then(() => render())
    .then(() => setEvents());
