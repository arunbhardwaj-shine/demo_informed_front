import React, { createContext, useContext, useState } from "react";
import Header from "./HeaderComponent/Header";
import Sidebar from "./SidebarComponent/Sidebar";
import { Route, Navigate,useLocation } from "react-router-dom";

const SidebarContext = createContext();


const LoginLayout = ({ component: Component, ...rest }) => {
  // Check if the user is authenticated (e.g. via a token stored in localStorage)
  const isAuthenticated = localStorage.getItem("user_id") !== null;
  const location=useLocation()
  const currentPath = location.pathname;
  const pathParts = currentPath.split('/');
  const routeName = pathParts[pathParts.length - 1];
  console.log("login layout pathParts--->",pathParts)
  console.log("login layout routeName--->",routeName)

  const [selectedItem, setSelectedItem] = useState(null);

  const setSelectedPDF = (pdfId) => {
    setSelectedItem(pdfId);
  };
  const [eventIdContext, setEventIdContext] = useState(null);

  const handleEventId = (pdfId) => {
    setEventIdContext(pdfId);
    // if(pathParts?.include==="webinar"){
    //   setEventIdContext(pdfId);
    // }else{
    //   setEventIdContext(null);
    // }
   

  };
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
                  <Component {...rest} />
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
