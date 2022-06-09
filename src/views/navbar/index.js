import { checkLogin } from '../check-login.js';

const navContainer = document.querySelector('#navSelect');

const linkTag = {
    login: '<li><a href="/login" style="color: black">LogIn</a></li>',
    logout: '<li><a href="/" id="logout" style="color: black">LogOut</a></li>',
    register: '<li class="register_btn"><a href="/register" style="color: black">Register</a></li>',
    account: '<li><a href="/account" style="color: black">Manage Account</a></li>',
    admin: '<li><a href="/admin" style="color: black">Edit Page</a></li>',
};

const userNav = {
    all: linkTag.logout + linkTag.account,
    account: linkTag.logout,
    cart: linkTag.logout + linkTag.account,
};

const adminNav = {
    all: linkTag.logout + linkTag.account + linkTag.admin,
    account: linkTag.logout + linkTag.admin,
    cart: linkTag.logout + linkTag.account + linkTag.admin,
    admin: linkTag.login + linkTag.admin,
};

const insertDOM = (dom) => {
    navContainer.insertAdjacentHTML('afterbegin', dom);
};

const drawNavbar = async (page) => {
    const { isAdmin, isLogined } = await checkLogin();

    if (isLogined) {
        if (isAdmin) {
            switch (page) {
                case 'adminPage':
                    insertDOM(adminNav.admin);
                    break;
                case 'account':
                    insertDOM(adminNav.account);
                    break;
                case 'cart':
                    insertDOM(adminNav.cart);
                    break;
                default:
                    insertDOM(adminNav.all);
            }
        } else {
            switch (page) {
                case 'account':
                    insertDOM(userNav.account);
                    break;
                case 'cart':
                    insertDOM(userNav.cart);
                    break;
                default:
                    insertDOM(userNav.all);
            }
        }
        document.querySelector('#logout').addEventListener('click', () => {
            sessionStorage.clear();
        });
    } else {
        switch (page) {
            case 'login':
                insertDOM(linkTag.register);
                break;
            case 'register':
                insertDOM(linkTag.login);
                break;
            default:
                insertDOM(linkTag.login + linkTag.register);
        }
    }
    // return checkData;
};

export default drawNavbar;
