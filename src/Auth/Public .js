import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Header from '../Components/CommonComponent/HeaderComponent/Header'
import Sidebar from '../Components/CommonComponent/SidebarComponent/Sidebar'

const Public = () => {
const active = localStorage.getItem("Tokan")
return active? (
<>
<Header/>
<Sidebar/>
<Navigate to="/"/>
</>
):
<Outlet/>

}

export default Public