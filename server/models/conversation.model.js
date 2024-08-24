import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({

   messages:[{type:mongoose.Schema.Types.ObjectId , ref:'Message'}],
   contributers:[{type:mongoose.Schema.Types.ObjectId , ref:'User'}]
   

});

export const Conversation = mongoose.model('Conversation',conversationSchema);