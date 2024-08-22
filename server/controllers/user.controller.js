import {User} from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cloudinary from '../utils/cloudinary.js';
import getDataUri from '../utils/datauri.js';


export const Register = async (req, res) => {

    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(401).json({ message: "Please Fill in the empty Fields", success: false });
        }

        const user = await User.findOne({email});

        if (user) {
            return res.status(401).json({ message: "Email Already in Use", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            email,
            password: hashedPassword
        });

        return res.status(201).json({ message: "Account created succesfully", success: true });


    } catch (error) {
        console.log(error);
    }

}

export const Login = async (req,res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({ message: "Please Fill in the empty Fields", success: false });
        }

        let user = await User.findOne({email});

        if (!user) {
            return res.status(401).json({ message: "User doesnt exist", success: false });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(401).json({ message: "Username or password is invalid", success: false });
        }

        const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

        user = {
            username: user.username,
            profilePic: user.profilePic,
            bio: user.bio,
            gender: user.gender,
            followers: user.followers,
            following: user.following,
            posts: user.posts,
            saved: user.saved
        }

        return res.cookie("token", token, { httpOnly: true, sameSite: "strict", maxAge: 1 * 24 * 60 * 60 * 1000 }).json({
            message: `Welcome Back ${user.username}`,
            success: true,
            user
        })

    } catch (error) {
        console.log(error);
    }
}


export const Logout = async(req,res)=>{

    try {
        
        return res.cookie("token" , "" , {maxAge:0}).json({
            message:"Logged out Succesfully",
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}

export const getProfile = async(req,res)=>{

try {
    
const userID = req.params.id;
const user = await User.findById(userID).select("-password");

return res.status(201).json({
    user,
    success:true
})


} catch (error) {
    console.log(error);
    
}

}

export const editProfile = async(req,res)=>{
 
    try {
        
        const userID = req.id;
        const {bio,gender} = req.body;
        const profilePicture = req.file;
        let cloudResponse;
        
      
        
        if(profilePicture){
            const fileURI = getDataUri(profilePicture);
            cloudResponse = await cloudinary.uploader.upload(fileURI)
        }
        const user = await User.findById(userID).select("-password");


        if(!user){
            return res.status(401).json({
                message:"User doesn't exist",
                success:false
            })
        }

        if(bio) user.bio = bio;
        if(gender) user.gender = gender;
        if(profilePicture) user.profilePic = cloudResponse.secure_url;

        await user.save();

        return res.status(201).json({
            message:"Profile Updated Sucesfully",
            success:true,
            user
        })



    } catch (error) {
        console.log(error);
    }

}

export const getSuggestedProfiles = async(req,res)=>{


    try {
        

        const suggestedUsers = await User.find({_id:{$ne:req.id}}).select("-password");
        if(!suggestedUsers){
            return res.status(401).json({
                message:"No users to show currently",
                success:false
            })
        }

        return res.status(201).json({
            success:true,
            users:suggestedUsers
        })

    } catch (error) {
        console.log(error);
        
    }
}


export const followOrUnfollow = async(req,res)=>{

try {
    

    const src = req.id;
    const target = req.params.id;

    const srcUser = await User.findById(src);
    const targetUser = await User.findById(target);

    if(src == target){
        return res.status(401).json({
            message:"You cannot follow/unfollow yourself",
            success:false
        })
    }

    if(!srcUser || !targetUser){
        return res.status(401).json({
            message:"User not found",
            success:false
        })
    }


    const isFollowing = srcUser.following.includes(targetUser);

    if(isFollowing){


        await Promise.all([
            User.updateOne({_id:srcUser._id},{$pull: {following:targetUser}}),
            User.updateOne({_id:targetUser._id},{$pull: {followers:srcUser}})
        ])
        return res.status(201).json({
            message:`You followed ${targetUser.username}`,
            success:true
        })

    }
    else {

        await Promise.all([
            User.updateOne({_id:srcUser._id},{$push:{following:targetUser}}),
            User.updateOne({_id:targetUser._id},{$push:{followers:srcUser}})
        ])
        return res.status(201).json({
            message:`You followed ${targetUser.username}`,
            success:true
        })
    }


} catch (error) {
    console.log(error);
    
}

}