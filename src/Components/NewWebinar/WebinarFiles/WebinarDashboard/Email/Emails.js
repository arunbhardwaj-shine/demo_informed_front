import React,{useEffect} from "react";
import { Col } from "react-bootstrap";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";

const Emails = () => {
  const {eventIdContext,handleEventId}=useSidebar()
   const localStorageEvent=JSON.parse(localStorage.getItem("EventIdContext"))
   useEffect(()=>{
    // if(!eventIdContext){
    //   handleEventId(localStorageEvent)
    // }
   },[])
  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <div className="row">
            <div className="top-header regi-web sticky">
              <div className="page-title">
                <h2>Coming Soon</h2>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};

export default Emails;