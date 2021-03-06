import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { userService } from '../services';
import { registerJoiSchema } from '../db/schemas/joi-schemas/user-joi-schema';
const userRouter = Router();

// 회원가입 api (아래는 /register이지만, 실제로는 /api/register로 요청해야 함.)
userRouter.post('/register', async (req, res, next) => {
    try {
        // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
        // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요',
            );
        }
        // req (request)의 body 에서 데이터 가져오기
        const { fullName, email, password } = req.body;
        const isValid = await registerJoiSchema.validateAsync({
            email,
            fullName,
            password,
        });
        // 위 데이터를 유저 db에 추가하기
        const newUser = await userService.addUser({
            fullName,
            email,
            password,
        });

        // 추가된 유저의 db 데이터를 프론트에 다시 보내줌
        // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

// 로그인 api (아래는 /login 이지만, 실제로는 /api/login로 요청해야 함.)
userRouter.post('/login', async (req, res, next) => {
    try {
        // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요',
            );
        }
        passport.authenticate(
            'local',
            { session: false },
            (error, user, info) => {
                // 성공적으로 유저가 있어야 유저 객체가 생기고,
                //유저 인증 실패시 유저는 자동으로 false;

                if (error || !user) {
                    //인증 성공을 해야 유저 객체가 생겨서 JOI로 검증하기 어려움...
                    // passport 인증 실패 or 유저가 없으면 error
                    res.status(400).json({
                        result: 'error',
                        reason: info.message,
                    });
                    return; // throw로 여러개를 시도해 보았는데, throw로는 에러 해결이 잘 안됨.
                }
                req.login(user, { session: false }, (loginError) => {
                    // login을 하면
                    if (loginError) {
                        res.status(400).send(loginError);
                        return;
                    }
                    const secretKey =
                        process.env.JWT_SECRET_KEY || 'secret-key'; // login 성공시 key값을 써서 토큰 생성
                    const token = jwt.sign(
                        { userId: user._id, role: user.role },
                        secretKey,
                        {
                            expiresIn: '7d',
                        },
                    );
                    res.status(200).json({
                        token,
                        userId: user._id,
                        role: user.role,
                    });
                });
            },
        )(req, res); // 이 부분은 수업 때나 지금이나 이해가 잘 안되지만 필요함.
    } catch (error) {
        next(error);
    }
});

// 전체 유저 목록을 가져옴 (배열 형태임)
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)

//Kakao login 용 userRouter get 요청 두가지
userRouter.get(
    '/kakao',
    passport.authenticate('kakao-login', { session: false }),
);
userRouter.get(
    '/kakao/cb',
    passport.authenticate('kakao-login', {
        session: false,
        failureRedirect: '/login',
    }),
    (req, res) => {
        if (req.user) {
            const secretKey = process.env.JWT_SECRET_KEY || 'secret-key'; // login 성공시 key값을 써서 토큰 생성
            const user = req.user;
            const userId = user._id;
            const role = user.role;
            const token = jwt.sign({ userId, role }, secretKey, {
                expiresIn: '7d',
            });
            res.status(200).redirect(
                `/login/success?token=${token}&userId=${userId}&role=${role}`,
            );
        }
    },
);

export { userRouter };
