import React, { useEffect } from 'react'
import { Navigate, Outlet, } from 'react-router-dom'
const Proctected = () => {

// console.log(<Outlet/>)
let Token = localStorage.getItem("Token")
return Token? (
<>
<Outlet/>
</>
): <Navigate to="/webinar"/> 


}

export default Proctected