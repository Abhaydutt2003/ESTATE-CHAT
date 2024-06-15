import express from 'express';
import { verifyJwt } from '../middlewares/verifyJwt.js';
import {deleteUser,updateUser} from '../controllers/user.controller.js';

const router = express.Router();



//router.get('/',getUsers);

//below routes will be protected
//router.get('/:id',verifyJwt,getUser);
router.put('/:id',verifyJwt,updateUser);
router.delete('/:id',verifyJwt,deleteUser); 




export default router;