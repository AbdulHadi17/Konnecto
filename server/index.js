import express, {urlencoded} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import connectDB from './utils/db.js';
import userRouter from './routes/userRoute.js'
import postRouter from './routes/postRoute.js'
import messageRouter from './routes/messageRoute.js'

dotenv.config({});


const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
origin:"http://localhost:5173",
credentials:true
}

//MiddleWare

app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cors(corsOptions));
app.use(cookieParser())
app.use('/api/v1/user' , userRouter)
app.use('/api/v1/post' , postRouter)
app.use('/api/v1/message' , messageRouter)


app.get('/' , (req,res)=>{
    res.status(200).json({success:true , data:"none"})
})


connectDB().then(()=>{
    app.listen(PORT , ()=>{
        console.log(`Server listening on port ${PORT}`);
    })
})
