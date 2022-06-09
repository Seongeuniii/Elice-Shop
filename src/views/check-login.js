import * as Api from '/api.js';

async function checkLogin() {
    const hasTokenCheck = sessionStorage.getItem('token');
    const checkRole = sessionStorage.getItem('role');
    const userId = sessionStorage.getItem('userId');

    if (hasTokenCheck && checkRole === 'admin') {
        try {
            await Api.get(`/api/admin/users/${userId}/orders`);
            return { isLogined: true, isAdmin: true };
        } catch (error) {
            alert('관리자 접속에 실패했습니다.. 다시 로그인 해주세요.');
            sessionStorage.clear();
            window.location.href = '/';
        }
    } else if (hasTokenCheck) {
        try {
            await Api.get('/api/auth');

            return { isLogined: true, isAdmin: false };
        } catch (error) {
            alert('유저 접속에 실패했습니다.. 다시 로그인 해주세요.');
            sessionStorage.clear();
            window.location.href = '/';
        }
    } else {
        sessionStorage.clear();
    }

    return { isLogined: false, isAdmin: false };
}

export { checkLogin };
