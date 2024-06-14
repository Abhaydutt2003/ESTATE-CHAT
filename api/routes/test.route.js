import express from 'express';


const router = express.Router();



router.get('/',(req,res)=>{
    console.log('on test endpoint');
    return res.sendStatus(200);
});



export default router;