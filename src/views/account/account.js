import checkAccount from '../check-account.js';
import drawNavbar from '../navbar/index.js';

const ref = {
    cartCount: document.getElementById('cart-count'),
};

const drawCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart) {
        ref.cartCount.innerText = 0;
    } else {
        ref.cartCount.innerText = Object.keys(cart).length;
    }
};

const App = async () => {
    const { isLogined, isAdmin } = await checkAccount();

    if (!isLogined) {
        alert('로그인이 필요한 페이지 입니다...');
        window.location.href = '/';
    }

    drawNavbar('account', isLogined, isAdmin);
    drawCartCount();
};

App();
