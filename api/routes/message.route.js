import express from 'express';


import {addMessage} from '../controllers/message.controller.js';
import {verifyJwt} from '../middlewares/verifyJwt.js';



const router = express.Router();

router.post('/:chatId',verifyJwt,addMessage);

export default router;