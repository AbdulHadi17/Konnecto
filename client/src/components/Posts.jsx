import React from 'react'
import Post from './Post'

const Posts = () => {
  return (
    <div className="w-full items-center flex flex-col bg-purple-200 py-[2%] px-[20%]">
      {[1,2,3,4].map((item,index)=><Post key={index}/>)}
    </div>
  )
}

export default Posts