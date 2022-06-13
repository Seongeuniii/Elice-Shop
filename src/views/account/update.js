import checkAccount from '../check-account.js';
import drawNavbar from '../navbar/index.js';
import { fetchUserData } from './form-handler.js';

const ref = {
    cartCount: document.getElementById('cart-count'),
    updateBtns: document.querySelectorAll('.info_box button'),
    changeArea: document.querySelectorAll('.change_area'),
};

const drawCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart) {
        ref.cartCount.innerText = 0;
    } else {
        ref.cartCount.innerText = Object.keys(cart).length;
    }
};

const setEvents = () => {
    // 정보 변경 클릭 시 인풋 박스가 뜨는 화면 구성
    ref.updateBtns.forEach((element) => {
        element.addEventListener('click', (e) => {
            const trElement = e.target.parentNode.parentNode;
            trElement.classList.add('hide');
            const changeTrElment = trElement.nextElementSibling;
            changeTrElment.classList.remove('hide');
        });
    });

    // 정보 변경 완료 버튼 클릭 시 데이터 fetch, 취소 클릭시 원래 화면
    ref.changeArea.forEach((element) => {
        const select = element.getAttribute('id');
        const cancelBtn = element.querySelector(`#cancel_${select}_btn`);

        cancelBtn.addEventListener('click', () => {
            element.classList.add('hide');
            element.previousElementSibling.classList.remove('hide');
        });
    });
};

const App = async () => {
    const { isLogined, isAdmin } = await checkAccount();

    if (!isLogined) {
        alert('로그인이 필요한 페이지 입니다...');
        window.location.href = '/';
    }

    drawNavbar('update', isLogined, isAdmin);
    drawCartCount();
    fetchUserData();
};

App();
