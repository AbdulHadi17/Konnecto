import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({

   messages:[{type:String,ref:'Message'}],
   contributers:[{type:String,ref:'User'}]
   

});

export const Conversation = mongoose.model('Conversation',conversationSchema);