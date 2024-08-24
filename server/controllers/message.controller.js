import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

export const sendMessage = async(req,res)=>{
    try {
        
        const senderID = req.id;
        const receiverID = req.params.id;

        const {message} = req.body;
        if(!message){
            return res.status(401).json({
                message:'Text cant be empty',
                success:false
            })
        }

        let conversation = await Conversation.findOne({contributers:{$all:[senderID,receiverID]}});

        if(!conversation){
            conversation = await Conversation.create({
                contributers:[senderID,receiverID]
            })
        }

        const newMessage = await Message.create({
            message,
            Sender:senderID,
            Reciever:receiverID
        })

        if(newMessage){
            conversation.messages.addToSet(newMessage._id);
            await Promise.all([newMessage.save() ,conversation.save()])
        }

    

        return res.status(200).json({
            message,
            success:true
        })

    } catch (error) {
        console.log(error);
        
    }
}

export const getMessage = async(req,res)=>{
    try {
        const senderID = req.id;
        const receiverID = req.params.id;

        let conversation = await Conversation.findOne({
            contributers:{$all:[senderID,receiverID]}
        }).populate({
            path:'messages'
        })


        if(!conversation) return res.status(401).json({messages:[] ,success:false})

            return res.status(200).json({
                messages:conversation?.messages,
                success:true
            })
    } catch (error) {
    console.log(error);
           
    }
}