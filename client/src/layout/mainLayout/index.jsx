import React from 'react'
import './index.scss'
import Navbar from '../navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../footer'
function MainLayout() {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default MainLayout