import React, { createContext, useContext, useEffect, useState } from "react";
import Header from "./HeaderComponent/Header";
import Sidebar from "./SidebarComponent/Sidebar";
import { Route, Navigate,useLocation, useNavigate } from "react-router-dom";

const SidebarContext = createContext();


const LoginLayout = ({ component: Component, ...rest }) => {
  // Check if the user is authenticated (e.g. via a token stored in localStorage)
  const isAuthenticated = localStorage.getItem("user_id") !== null;
  const location=useLocation()
  const currentPath = location.pathname;
  const pathParts = currentPath.split('/');
  const routeName =pathParts[1];
  const localStorageEvent=JSON.parse(localStorage.getItem("EventIdContext"))
  const [selectedItem, setSelectedItem] = useState(null);

  const setSelectedPDF = (pdfId) => {
    setSelectedItem(pdfId);
  };
  const [eventIdContext, setEventIdContext] = useState(null );
  const navigate=useNavigate()

  const handleEventId = (pdfId) => {
    if(routeName=="webinar"){
      setEventIdContext(pdfId);
      localStorage.setItem("EventIdContext",JSON.stringify(pdfId))
     
    }else{
      setEventIdContext(null);
      localStorage.removeItem("EventIdContext")
      
    }
  };
  
 
  useEffect(()=>{
  if(routeName!="webinar"){
    setEventIdContext(null);
    localStorage.removeItem("EventIdContext")
    localStorage.removeItem("switch_account_detail")
  }
 
 if(!localStorageEvent&&routeName=="webinar"){
  navigate("/webinar/event-listing")
  }
  },[routeName])
  return (
    <>
      {isAuthenticated ? (
        <>
          <SidebarContext.Provider value={{ selectedItem, setSelectedPDF,eventIdContext,handleEventId }}>
            <Header />
            <div className="warpper">
              <div className="container-fluid">
                <div className="row">
                  <Sidebar />
                  <Component key={location.pathname} {...rest} />
                </div>
              </div>
            </div>
          </SidebarContext.Provider>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export const useSidebar = () => {
  return useContext(SidebarContext);
};

export default LoginLayout;
