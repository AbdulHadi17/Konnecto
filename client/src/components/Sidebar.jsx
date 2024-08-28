import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React from 'react'

const sideBaritems = [
    {comp:<Home/> , text:'Home'},
    {comp:<Search/> , text:'Search'},
    {comp:<TrendingUp/> , text:'Explore'},
    {comp:<MessageCircle/> , text:'Messages'},
    {comp:<Heart/> , text:'Notifications'},
    {comp:<PlusSquare/> , text:'Post'},
    {comp:(<Avatar>
        <AvatarImage className=' w-6' src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      ) , text:'Profile'},
    {comp:<LogOut/> , text:'Logout'},
]

const Sidebar = () => {
  return (
    <>
    <div className="bg-slate-700 flex flex-col gap-y-4 justify-center items-start">
        {sideBaritems.map((item,index)=>{
            return (
                <div key={index} className="flex gap-3 items-start justify-center">
                    {item.comp}
                    <p>{item.text}</p>
                </div>
            )
        })}
    </div>
    </>
  )
}

export default Sidebar