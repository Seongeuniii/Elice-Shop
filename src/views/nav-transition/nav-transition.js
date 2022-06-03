import { loginCheck } from '../login-check.js';

/*

  nav가 변하는 부분   =>    로그인  /  회원가입  /  카트
  
  관리자 계정으로 로그인 했을 때 =>  페이지 관리 / 계정 관리 / 로그아웃 / 카트

*/

async function navTransition(pageName) {
    const checkData = await loginCheck();
    const isAdmin = checkData.isAdmin;
    const isLogined = checkData.isLogined;
    const navSelect = document.querySelector('#navSelect');

    const loginTag = '<li><a href="/login" style="color: black">Login</a></li>';
    const logOutTag =
        '<li><a href="/" id="logout" style="color: black">Logout</a></li>';
    const registerTag =
        '<li class="register_btn"><a href="/register" style="color: black">Register</a></li>';
    const accountManageTag =
        '<li><a href="/account" style="color: black">Manage Account</a></li>';
    const adminPageTag =
        '<li><a href="/admin" style="color: black">Edit Page</a></li>';

    if (isLogined && isAdmin) {
        if (pageName === 'adminPage') {
            const navContent = logOutTag + accountManageTag;
            navSelect.insertAdjacentHTML('afterbegin', navContent);
        } else if (pageName === 'account') {
            const navContent = logOutTag + adminPageTag;
            navSelect.insertAdjacentHTML('afterbegin', navContent);
        } else if (pageName === 'cart') {
            const navContent = logOutTag + adminPageTag + accountManageTag;
            navSelect.insertAdjacentHTML('afterbegin', navContent);
        } else {
            const navContent = logOutTag + adminPageTag + accountManageTag;
            navSelect.insertAdjacentHTML('afterbegin', navContent);
        }
    } else if (isLogined && !isAdmin) {
        if (pageName === 'account') {
            const navContent = logOutTag;
            navSelect.insertAdjacentHTML('afterbegin', navContent);
        } else if (pageName === 'cart') {
            const navContent = logOutTag + accountManageTag;
            navSelect.insertAdjacentHTML('afterbegin', navContent);
        } else {
            const navContent = logOutTag + accountManageTag;
            navSelect.insertAdjacentHTML('afterbegin', navContent);
        }
    } else {
        if (pageName === 'login') {
            const navContent = registerTag;
            navSelect.insertAdjacentHTML('afterbegin', navContent);
        } else if (pageName === 'register') {
            const navContent = loginTag;
            navSelect.insertAdjacentHTML('afterbegin', navContent);
        } else if (pageName === 'cart') {
            const navContent = loginTag + registerTag;
            navSelect.insertAdjacentHTML('afterbegin', navContent);
        } else {
            const navContent = loginTag + registerTag;
            navSelect.insertAdjacentHTML('afterbegin', navContent);
        }
    }

    if (isLogined) {
        document.querySelector('#logout').addEventListener('click', () => {
            sessionStorage.clear();
        });
    }

    return checkData;
}

export { navTransition };