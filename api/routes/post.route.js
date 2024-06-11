import express from 'express';


const router = express.Router();

router.get('/test',(req,res)=>{
    console.log('on post test');
});


export default router;
