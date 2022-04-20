import React, { useEffect } from 'react'
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
const Proctected = () => {

console.log(<Outlet/>)
let Token = localStorage.getItem("Token")
return Token? (
<>
<Outlet/>
</>
): <Navigate to="/"/> 


}

export default Proctected