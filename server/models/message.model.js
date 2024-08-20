import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({

    message:{type:String,required:true},
    Sender:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'User'},
    Reciever:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'User'}
   

},{timestamps:true});

export default Message = mongoose.model('Message',messageSchema);