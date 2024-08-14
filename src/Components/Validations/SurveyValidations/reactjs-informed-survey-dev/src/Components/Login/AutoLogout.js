import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";

const AutoLogout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        logout();
      }, []);

    const logout = () => {
    // localStorage.clear();
    const keysToKeep = ['uname', 'pass', 'acceptedCookies']; 
    for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
        }
    }
    navigate("/");
    };  
}
export default AutoLogout;