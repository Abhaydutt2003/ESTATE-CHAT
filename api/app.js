import express from 'express';

import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';

import cors from 'cors';
import corsOptions from './lib/corsConfig.js';


dotenv.config();

//no need to specify the index.js here, but just for the sake of it.
import router from './routes/index.js'; 

const app = express();
app.use(cookieParser());
app.use(cors(corsOptions));


app.use(express.json({ limit: "10kb", extended: true }));
//TODO change the limit in production
app.use(express.urlencoded({ limit: "30mb", extended: true }));


app.use('/api',router);







app.listen(8800,()=>{
    console.log('Server is running');
});


