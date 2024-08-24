import sharp from 'sharp';
import cloudinary from '../utils/cloudinary';
import {Post} from '../models/post.model.js'
import { User } from '../models/user.model.js';

export const addAPost = async(req,res)=>{
    try {
        
        const {caption} = req.body;
        const image = req.file;
        const authorID = req.id;

        if(!image){
            return res.status(401).json({
                messsage:"Image is Required",
                success:true
        })
        }

        const optimizedImageBuffer = await sharp(image.buffer).resize({width:800 , height:800 ,fit:'inside'}).toFormat('jpeg' , {quality:80}).toBuffer();

        const fileURI = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;

        const cloudResponse = await cloudinary.uploader.upload(fileURI);
        const post = await Post.create({
            caption,
            image:cloudResponse.secure_url,
            author:authorID
        })

        const user = await User.findById(authorID);
        if(user){
            user.posts.push(post._id);
            await user.save();
        }

        await post.populate({path:'author' , select:"-password"});

        return res.status(201).json({
            message:'Post Created Succesfully',
            post,
            success:true
        })

    } catch (error) {
        console.log(error);
        
    }
}

export const getAllPosts = async(req,res)=>{
    try {
        
        const posts = await Post.find().sort({createdAt:-1}).populate({
        path:'author' , select:'username , profilePicture'    
        }).populate({
            path:'comments' , sort:{createdAt:-1} , populate:{path:'author' , select:'username , profilePicture'}
        })

        if(!posts){
            return res.status(401).json({
                message:"No Posts Found",
                success:false
            })
        }


        return res.status(200).json({
            posts,
            success:true
        })

    } catch (error) {
        console.log(error);
        
    }
}


export const getUserposts = async(res,res)=>{
    try {
        
        const authorID = req.id;
        const posts = await Post.find({author:authorID}).sort({createdAt:-1})
        .populate({path:'author' , select:'username,profilePicture'})
        .populate({path:'comments' , sort:{createdAt:-1} , populate:{path:'author' , select:'username,profilePicture'}})

        if(!posts){
            return res.status(401).json({
                message:'No Posts To show',
                success:false
        })
        }

        return res.status(200).json({
            posts,
            success:true
        })

    } catch (error) {
        console.log(error);
        
    }
}

export const likeAPost = async(req,res)=>{
    try {
        
        const postID = req.params.id;
        const userID = req.id;

        const post = await Post.findById(postID);

        if(!post){
            return res.status(401).json({
                message:'Post Doesnt exists',
                success:false
            })
        }

        await post.updateOne({$addToSet:{likes:userID}});
        await post.save();

        return res.status(201).json({
            message:'Post Liked Succesfully',
            success:true
        })

    } catch (error) {
        console.log(error);
        
    }
}

export const unlikeAPost = async(req,res)=>{
    try {
        
        const postID = req.params.id;
        const userID = req.id;

        const post = await Post.findById(postID);

        if(!post){
            return res.status(401).json({
                message:'Post Doesnt exists',
                success:false
            })
        }

        await post.updateOne({$pull:{likes:userID}});
        await post.save();

        return res.status(201).json({
            message:'Post Unliked Succesfully',
            success:true
        })

    } catch (error) {
        console.log(error);
        
    }
}

export const addAComment = async(req,res)=>{
    try {
        
        const postID = req.params.id;
        const userID = req.id;
        const {text} = req.body;

        if(!text){
            return res.status(401).json({
                message:'text is mandatory',
                success:false
            })
        }

        const post = await Post.findById(postID);

        if(!post){
            return res.status(401).json({
                message:'No Post Found',
                success:false
            })
        }
        const comment = await Comment.create({
            text,
            author:userID,
            post:postID
        }).populate({
            path:'author' , select:'username , profilePicture'
        })

        await post.comments.push(comment._id);
        await post.save();

        return res.status(201).json({
            message:'Comment added Succesfully',
            success:true,
            comment
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const getPostComments = async(req,res)=>{
    try {
        
        const postId = req.params.id;
        const userID = req.id;

        const comments = await Comment.find({post:postId}).populate({
            path:'author' , select:'username , profilePicture'
        });

        if(!comments){
            return res.status(401).json({
                message:'No Comments currently on this post',
                success:false
            })
        }
        return res.status(200).json({
            comments,
            success:true
        })

    } catch (error) {
        console.log(error);
        
    }
}

export const deleteAPost = async(req,res)=>{
    try {
        
        const userID = req.id;
        const postID = req.params.id;
        const user = await User.findById(userID);
        const post = await Post.findById(postID);

        if(!post){
            return res.status(401).json({
                message:'No post to delete',
                success:false
            })
        }


        if(!user){
            return res.status(401).json({
                message:'User Doesnt exist',
                success:false
            })
        }


        if(post.author.toString()!==userID){
            return res.status(401).json({
                message:'You cant Delete the post',
                success:false
            })
        }

        await Post.findByIdAndDelete(postID);
        await Comment.deleteMany({post:postID})

        
        
        user.posts = user.posts.filter(id=>id.toString()!=postID);
        await user.save();

        return res.status(200).json({
            message:'Post Deleted successfully',
            success:true
        })

    } catch (error) {
        console.log(error);
        
    }
}

export const saveAPost = async(req,res)=>{
    try {
        
        const postID = req.params.id;
        const userID = req.id;

        const post = await Post.findById(postID);

        if(!post){
            return res.status(401).json({
                message:'No post to delete',
                success:false
            })
        }

        const user = await User.findById(userID);

        if(user.saved.includes(post._id)){
            await user.updateOne({$pull:{saved:postID}})
            await user.save();
            return res.status(201).json({
                type:'unsaved',
                message:'Post unsaved',
                success:true
            })
        }
        else{
            await user.updateOne({$addToSet:{saved:postID}})
            await user.save();
            return res.status(201).json({
                type:'saved',
                message:'Post Add to saved',
                success:true
            })
        }


        

    } catch (error) {
        console.log(error);
        
    }
}