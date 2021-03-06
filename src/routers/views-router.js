import express from 'express';
import path from 'path';

const viewsRouter = express.Router();

// 페이지별로 html, css, js 파일들을 라우팅함
// 아래와 같이 하면, http://localhost:5000/ 에서는 views/home/home.html 파일을,
// http://localhost:5000/register 에서는 views/register/register.html 파일을 화면에 띄움
viewsRouter.use('/', serveStatic('home'));
viewsRouter.use('/register', serveStatic('register'));
viewsRouter.use('/login', serveStatic('login'));
viewsRouter.use('/login/success', serveStatic('kakao-login')); //카카오 용..
/*  계정 관리 페이지 라우팅 (임시)  */
viewsRouter.use('/account', serveStatic('account'));
viewsRouter.get('/account/update', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/account/update.html'));
});

viewsRouter.get('/account/order-view', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/account/order-view.html'));
});
// viewsRouter.get('/account/delete', (req, res) => {
//     res.sendFile(path.join(__dirname, '../views/account/delete.html'));
// });

/* 관리자 페이지 라우팅 */
viewsRouter.use('/admin', serveStatic('admin'));

viewsRouter.use('/admin/product', serveStatic('admin-product'));
viewsRouter.use('/admin/product/add', serveStatic('admin-product-add'));

viewsRouter.use('/admin/category', serveStatic('admin-category'));
viewsRouter.use('/admin/category/add', serveStatic('admin-category-add'));
// viewsRouter.get('/admin/category/add', (req, res) => {
//   res.sendFile(path.join(__dirname, '../views/category/category-add.html'));
// });

//임시
viewsRouter.use('/admin/users', serveStatic('admin-user'));
viewsRouter.use('/admin/orders', serveStatic('admin-order'));

/*  결제 페이지 라우팅 (임시)  */
viewsRouter.use('/order', serveStatic('order'));

viewsRouter.use('/cart', serveStatic('cart'));

viewsRouter.use('/admin', serveStatic('admin'));

// viewsRouter.get('/admin/users', (req, res) => {
//   res.sendFile(path.join(__dirname, '../views/account/update.html'));
// });
// viewsRouter.get('/admin/orders', (req, res) => {
//   res.sendFile(path.join(__dirname, '../views/account/delete.html'));
// } );

//상품 디테일 페이지
viewsRouter.use('/products/:id', serveStatic('product-detail'));

//임시의 404 페이지
viewsRouter.use('/notfound', serveStatic('not-found'));

// views 폴더의 최상단 파일인 rabbit.png, api.js 등을 쓸 수 있게 함
viewsRouter.use('/', serveStatic(''));

// views폴더 내의 ${resource} 폴더 내의 모든 파일을 웹에 띄우며,
// 이 때 ${resource}.html 을 기본 파일로 설정함.
function serveStatic(resource) {
    const resourcePath = path.join(__dirname, `../views/${resource}`);
    const option = { index: `${resource}.html` };

    // express.static 은 express 가 기본으로 제공하는 함수임
    return express.static(resourcePath, option);
}

export { viewsRouter };
