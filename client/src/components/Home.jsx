import React from 'react'
import Posts from './Posts'
import RightSideBar from './RightSideBar'

const Home = () => {
  return (
    <>
    {/* if you change the ml-280 change it on SideBar comp as well */}
    <div className="w-full pt-12 flex gap-1 justify-center ml-[280px]">
        <Posts/>
        <RightSideBar/>
    </div>
    </>
  )
}

export default Home