import postRouter from './post.route.js';
import authRouter from './auth.route.js';
import testRouter from './test.route.js';
import {verifyJwt} from '../middlewares/verifyJwt.js';
import express from 'express';


const router = express.Router();


router.use('/auth',authRouter);

router.use(verifyJwt);
router.use('/test',testRouter);
router.use('/post',postRouter);


export default router;





