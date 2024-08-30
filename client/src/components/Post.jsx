import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'


const Post = () => {
  return (
    <>
      <div className="post p-4 my-5 bg-red-200 flex flex-col">


        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="nopic" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h5>username</h5>
          </div>
          <div className="dial">

            <Dialog>
              <DialogTrigger>
                <MoreHorizontal className='cursor-pointer' /> </DialogTrigger>
              <DialogContent className='text-sm font-medium'>

                <Button variant='ghost' className='hover:focus-visible:ring-transparent' >Unfollow</Button>
                <Button variant='ghost' className='hover:focus-visible:ring-transparent' >Delete</Button>
                <Button variant='ghost' className='hover:focus-visible:ring-transparent text-red-600 hover:text-red-700' >Cancel</Button>

              </DialogContent>
            </Dialog>

          </div>

        </div>

      <div className="rounded-sm my-2 aspect-square object-cover w-full">
        <img src="https://images.unsplash.com/photo-1724757090342-59922ed19e39?q=80&w=1500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      </div>


      </div>
    </>
  )
}

export default Post