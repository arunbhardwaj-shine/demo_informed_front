import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Sidebar from '../Components/CommonComponent/SidebarComponent/Sidebar'
import SidebarWebinar from './../Components/Webinar/Layout/Sidebar'
const Public = () => {
return window.location.pathname.indexOf("/webinar")>-1? (
<>
<SidebarWebinar/>
</>
):
<Sidebar/>
}

export default Public