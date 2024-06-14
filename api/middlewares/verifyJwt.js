import jwt from 'jsonwebtoken';


//use this middleware for all the routes we want to protect


export const verifyJwt = (req,res,next)=>{
    console.log(req.cookies);
    const token = req.cookies.jwt;
    if(!token){
        console.log('There is no JWT cookie');
        return res.status(401).json({status:'error',message:"Not Authenticated!"});
    }

    jwt.verify(token,process.env.JWT_SECRET_KEY,async(err,payload)=>{
        if(err)return res.status(403).json({status:"error",message:"Please login again"});
        req.userId = payload.id;
        next();
    });
}
