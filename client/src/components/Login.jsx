import React , {useState} from 'react'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { toast } from 'sonner'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const Login = () => {


const navigate = useNavigate();


const [loading, setloading] = useState(false);

const [input, setinput] = useState({
    email:"",
    password:""
})

const handleChange = (e)=>{
setinput({...input,[e.target.name]:e.target.value})
}


const submitForm = async (e)=>{
    setloading(true);
e.preventDefault();

try {
    const res = await axios.post("http://localhost:3000/api/v1/user/login",input , {
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials:true

    })
    
    if(res.data.success){
        toast.success(res.data.message)
  navigate('/');
//        console.log(res.data.message)
        setinput({
            email:"",
            password:""
        })
    }
} catch (error) {
    toast.error(error.response.data.message)
} finally{
    setloading(false);
}

}

    return (
    <>
    <div className="w-full h-screen flex justify-center items-center">

    <form onSubmit={submitForm} className="bg-slate-50 p-8 shadow-xl rounded-xl">

    <div className="upper text-blue-950 gap-2 flex flex-col mb-9">

        <h1 className="font-semibold text-center text-2xl "><span className='text-blue-700'>{"<"}</span>Konnecto<span className='text-blue-700'>{"/>"}</span></h1>
    <p className="text-sm font-normal text-center">Login to see photos & videos shared by your friends!</p>
    </div>

    <div className="inputs">

        <div className="flex justify-center items-start gap-3 flex-col  mt-5">

            <Label>Email</Label>
            <Input type="email" name="email" className="focus-visible:ring-transparent" value={input.email} onChange={handleChange}/>
        </div>
        <div className="flex justify-center items-start gap-3 flex-col mt-5">

            <Label>Password</Label>
            <Input type="password" name="password" className="focus-visible:ring-transparent" value={input.password} onChange={handleChange}/>
        </div>
    </div>
{
    loading?<Button  type="submit" className="w-full mt-8"> <Loader2 className='mr-2 w-4 h-4 animate-spin'/>Please Wait...</Button>:
    <Button type="submit" className="w-full mt-8">Submit</Button>
    }
 
    <Link to={"/signup"}>
    <p className="text-md text-center mt-3 cursor-pointer hover:underline underline-offset-4">Don't have an account? <span className='text-purple-700'>Signup</span></p>
    </Link>
    </form>

    </div>
    </>
  )
}

export default Login