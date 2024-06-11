import express from 'express';


//no need to specify the index.js here, but just for the sake of it.
import router from './routes/index.js'; 

const app = express();


app.use(express.json({ limit: "10kb", extended: true }));
//TODO change the limit in production
app.use(express.urlencoded({ limit: "30mb", extended: true }));


app.use('/api',router);







app.listen(8800,()=>{
    console.log('Server is running');
});


