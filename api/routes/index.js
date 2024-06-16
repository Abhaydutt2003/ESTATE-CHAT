import postRouter from './post.route.js';
import authRouter from './auth.route.js';
import userRouter from './user.route.js';

import express from 'express';


const router = express.Router();


router.use('/auth',authRouter);
router.use('/user',userRouter);
router.use('/post',postRouter);




export default router;





