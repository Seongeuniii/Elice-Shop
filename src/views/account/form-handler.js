import * as Api from '/api.js';
import { patchUserInfo } from './update-info.js';

/*
 사용자의 정보 수정하는 함수
*/

const nameForm = document.querySelector('#name_form');
const passwordForm = document.querySelector('#password_form');
const addressForm = document.querySelector('#address_form');
const numberForm = document.querySelector('#number_form');
const withdrawForm = document.querySelector('#withdraw_form');

nameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    new FormData(e.target);
});

nameForm.addEventListener('formdata', async (e) => {
    const formData = e.formData;
    const nameInput = formData.get('nameInput');
    const passwordInput = formData.get('passwordCheck');

    const data = {
        fullName: nameInput,
        currentPassword: passwordInput,
    };

    const resetInput = await patchUserInfo(passwordInput, data);

    if (!resetInput) {
        e.target.reset();
    }
});

passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    new FormData(e.target);
});

passwordForm.addEventListener('formdata', async (e) => {
    const formData = e.formData;

    const currentPassword = formData.get('currentPwd');
    const newPassword = formData.get('newPwd');
    const checkPassword = formData.get('checkNewPwd');

    if (newPassword !== checkPassword) {
        alert('새로 입력하신 패스워드가 다릅니다. 다시입력하세요!');
        return false;
    }

    const data = {
        password: newPassword,
        currentPassword: currentPassword,
    };

    const resetInput = await patchUserInfo(currentPassword, data);

    if (!resetInput) {
        e.target.reset();
    }
});

addressForm.addEventListener('submit', (e) => {
    e.preventDefault();
    new FormData(e.target);
});

addressForm.addEventListener('formdata', async (e) => {
    const formData = e.formData;
    const addressInput = formData.get('address');
    const postalInput = formData.get('post');
    const passwordInput = formData.get('passwordCheck');

    const data = {
        address: {
            postalCode: postalInput,
            address1: addressInput,
        },
        currentPassword: passwordInput,
    };

    const resetInput = await patchUserInfo(passwordInput, data);
    if (!resetInput) {
        e.target.reset();
    }
});

numberForm.addEventListener('submit', (e) => {
    e.preventDefault();
    new FormData(e.target);
});

numberForm.addEventListener('formdata', async (e) => {
    const formData = e.formData;
    const numberInput = formData.get('number');
    const passwordInput = formData.get('passwordCheck');

    const data = {
        phoneNumber: numberInput,
        currentPassword: passwordInput,
    };

    const resetInput = await patchUserInfo(passwordInput, data);
    if (!resetInput) {
        e.target.reset();
    }
});

withdrawForm.addEventListener('submit', (e) => {
    e.preventDefault();
    new FormData(e.target);
});

withdrawForm.addEventListener('formdata', async (e) => {
    const formData = e.formData;
    const passwordInput = formData.get('passwordCheck');
    const data = { currentPassword: passwordInput };

    const resetInput = await patchUserInfo(passwordInput, data, true);
    if (!resetInput) {
        e.target.reset();
    }
});

const fetchUserData = async () => {
    const ref = {
        email: document.querySelector('#email_area div div'),
        name: document.querySelector('#name_area div div'),
        password: document.querySelector('#password_area div div'),
        number: document.querySelector('#number_area div div'),
        address: document.querySelector('#address_area div div'),
    };
    const userId = sessionStorage.getItem('userId');

    const data = await Api.get('/api/auth/', userId);

    ref.email.textContent = data.email;
    ref.name.textContent = data.fullName;
    ref.password.textContent = '변경하시려면 클릭하세요';
    ref.number.textContent = data.phoneNumber ? data.phoneNumber : '저장된 번호가 없습니다.';
    ref.address.textContent = `
        우편변호: ${data?.address?.postalCode ? String(data?.address?.postalCode) : '저장된 우편번호가 없습니다'}
        주소: ${data?.address?.address1 ? String(data?.address?.address1) : '저장된 주소가 없습니다'}`;
};

export { fetchUserData, patchUserInfo };
