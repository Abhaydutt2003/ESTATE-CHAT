import postRouter from './post.route.js';
import authRouter from './auth.route.js';
import testRouter from './test.route.js';
import userRouter from './user.route.js';
import {verifyJwt} from '../middlewares/verifyJwt.js';

import express from 'express';


const router = express.Router();


router.use('/auth',authRouter);
router.use('/user',userRouter);

router.use(verifyJwt);
//below routes can only be accessed if there is a valid JWT token
router.use('/test',testRouter);
router.use('/post',postRouter);



export default router;





