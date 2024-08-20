import jwt from 'jsonwebtoken'

const isAuthenticated = async(req,res,next)=>{
    try {
        
        const token = req.cookies.token;
        if(!token){

            return res.status(401).json({message:"User isnt authenticated",success:false})
        }

        const verify = await jwt.verify(token , process.env.SECRET_KEY)
        if(!verify){

            return res.status(401).json({message:"User not authenticated",success:true});

        }

        req.id = verify.userId;

    } catch (error) {
        console.log(error);
        
    }
}

