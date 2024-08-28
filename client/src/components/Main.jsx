import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Main = () => {
  return (
    <>
    <Sidebar/>
    <Outlet></Outlet>
    </>
  )
}

export default Main