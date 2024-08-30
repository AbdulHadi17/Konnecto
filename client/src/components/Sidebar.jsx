import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'

const sideBaritems = [
    {comp:<Home/> , text:'Home'},
    {comp:<Search/> , text:'Search'},
    {comp:<TrendingUp/> , text:'Explore'},
    {comp:<MessageCircle/> , text:'Messages'},
    {comp:<Heart/> , text:'Notifications'},
    {comp:<PlusSquare/> , text:'Create'},
    {comp:(<Avatar>
        <AvatarImage className=' w-6 rounded-full' src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      ) , text:'Profile'},
    {comp:<LogOut/> , text:'Logout'},
]

const Sidebar = () => {

const navigate = useNavigate();


const logOutHandler = async()=>{
  try {
    
    const response = await axios.get('http://localhost:3000/api/v1/user/logout' , {withCredentials:true});

    if(response.data.success){
      toast.success(response.data.message);
      navigate('/login')
    }
    


  } catch (error) {
    console.log(error);
    
  }
}

const handleClick = (sideText)=>{

  if(sideText.toString() == 'Logout' ){
    logOutHandler();
  }
  else
  alert(sideText);

}


  return (
    <>
    {/* if you change the w-280px change it on Home Component as well*/}
   <div className="w-[280px] border border-r-2 p-5 z-10 shadow-xl h-screen fixed top-0 left-0">
   
   
   <h1 className="font-semibold text-3xl py-4"><span className='text-blue-700'>{"<"}</span>Konnecto<span className='text-blue-700'>{"/>"}</span></h1>
   <div className="border w-full my-3"></div>

    <div className="others mt-5 flex flex-col">

    {sideBaritems.map((item,index)=>{
      return (
        <div key={index} onClick={()=>handleClick(item.text)} className="hover:scale-[1.015] cursor-pointer flex items-center gap-3 p-4 hover:shadow-xl">
          {item.comp}
          <p>{item.text}</p>
        </div>
      )
    })}
    </div>


   </div>
    </>
  )
}

export default Sidebar