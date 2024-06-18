import express from 'express';
import {getChat,getChats,addChat,readChat} from '../controllers/chat.controller.js';
import {verifyJwt} from '../middlewares/verifyJwt.js';




const router = express.Router();
router.get('/',verifyJwt,getChats);;
router.get('/:id',verifyJwt,getChat);
router.post('/',verifyJwt,addChat);
router.put('/read/:id',verifyJwt,readChat);
