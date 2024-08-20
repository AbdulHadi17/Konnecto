import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import connectDB from './utils/db.js';

dotenv.config({});


const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
origin:"https://localhost:5173",
credentials:true
}

//MiddleWare

app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cors(corsOptions));
app.use(cookieParser())



app.get('/' , (req,res)=>{
    res.status(200).json({success:true , data:"none"})
})


connectDB().then(()=>{
    app.listen(PORT , ()=>{
        console.log(`Server listening on port ${PORT}`);
    })
})
