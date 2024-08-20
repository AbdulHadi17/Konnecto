import mongoose from 'mongoose';

const connectDB = async()=>{
try {
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Database Connected Succesfully")
    })    
} catch (error) {
    console.log(error);
}


}

export default connectDB;