import React from 'react'
import { useNavigate } from 'react-router-dom'

function PrivateRoute(Wrapcom) {
    let navigate=useNavigate()
    if (!localStorage.getItem('Token')) {
        alert("loginout")
        navigate("/webinar")
        return 
    }
    else{
        alert("login") 
    }
  
  return <Wrapcom/>
    
  
}

export default PrivateRoute