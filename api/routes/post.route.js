import express from 'express';
import { verifyJwt } from '../middlewares/verifyJwt.js';
import {getPost,getPosts,addPost,updatePost,deletePost} from '../controllers/post.controller.js';


const router = express.Router();


router.get('/',getPosts);
router.get('/:id',getPost);
router.post('/',verifyJwt,addPost);
router.post('/;id',verifyJwt,updatePost);
router.delete('/:id',verifyJwt,deletePost);


export default router;
