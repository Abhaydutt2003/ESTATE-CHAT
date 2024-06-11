import postRouter from './post.route.js';
import authRouter from './auth.route.js';
import express from 'express';


const router = express.Router();


router.use('/post',postRouter);
router.use('/auth',authRouter);


export default router;





