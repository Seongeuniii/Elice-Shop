const login = '<li><a href="/login" style="color: black">Login</a></li>';
const logout = '<li><a href="/" id="logout" style="color: black">Logout</a></li>';
const register = '<li class="register_btn"><a href="/register" style="color: black">Register</a></li>';
const account = '<li><a href="/account" style="color: black">Manage Account</a></li>';
const admin = '<li><a href="/admin" style="color: black">Edit Page</a></li>';

const guestNav = {
    login: register,
    register: login,
    common: login + register,
};

const userNav = {
    account: logout,
    cart: logout + account,
    common: logout + account,
};

const adminNav = {
    account: logout + admin,
    cart: logout + account + admin,
    admin: login + admin,
    common: logout + account + admin,
};

const getAuthMap = (isLogined, isAdmin) => {
    if (!isLogined) return guestNav;
    else {
        if (isAdmin) return adminNav;
        return userNav;
    }
};

const makeDOM = (page, isLogined, isAdmin) => {
    const auth = getAuthMap(isLogined, isAdmin);
    return auth[page] ?? auth.common;
};

const setEvents = (target) => {
    const logoutHandler = (() => {
        const logoutBtn = target.querySelector('#logout');
        logoutBtn &&
            logoutBtn.addEventListener('click', () => {
                sessionStorage.clear();
            });
    })();
};

const insertDOM = (target, dom) => {
    target.insertAdjacentHTML('afterbegin', dom);
};

const drawNavbar = (page, isLogined, isAdmin) => {
    console.log(page, isLogined, isAdmin);
    const navContainer = document.querySelector('#navSelect');
    const navDom = makeDOM(page, isLogined, isAdmin);
    insertDOM(navContainer, navDom);
    setEvents(navContainer);
};

export default drawNavbar;

// 파일 정리
// 각 파일에서 계정 처리하여 drawNavbar 연결할 것
//
// nav_user;
// const pageName = document.querySelector('script.nav_trans').id;
// // 로그인된 유저만 접속 가능한 페이지
// drawNavbar(pageName).then((checkData) => {
//     if (!checkData.isLogined) {
//         alert('로그인이 필요한 페이지 입니다...');
//         window.location.href = '/';
//     }
// });

// nav_admin;
// const pageName = document.querySelector('script.nav_trans').id;
// // 관리자만 접속 가능한 페이지 인증
// drawNavbar(pageName).then((checkData) => {
//     if (!checkData.isLogined || !checkData.isAdmin) {
//         alert('관리자 로그인이 필요한 페이지 입니다...');
//         window.location.href = '/';
//     }
// });
