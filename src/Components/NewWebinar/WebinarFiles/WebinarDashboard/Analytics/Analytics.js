import React,{useEffect, useState} from "react";
import { Col,Button } from "react-bootstrap";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
import { postFormData } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";

const Analytics = () => {
  const {eventIdContext,handleEventId}=useSidebar()
  const localStorageEvent=JSON.parse(localStorage.getItem("EventIdContext"))
  const [eventId, setEventId] = useState(
    eventIdContext?.eventId
      ? eventIdContext?.eventId
      : localStorageEvent?.eventId
  );

  useEffect(()=>{
    // if(!eventIdContext){
    //   handleEventId(localStorageEvent)  
    // }
  },[])

  const downloadStats = async(e) => {
    try {
      // loader("show");
      let payload = {
        'eventId' : eventId
      }        
     
      const res = await postFormData(`${ENDPOINT.WEBINAR_EVENT_STATS}`, payload,{
          responseType: "blob",
        });
      const link = document.createElement("a");
      const url = URL.createObjectURL(res?.data);
      link.href = url;
      link.download = `Registered_Users.xlsx`;
      link.click();
     
      // loader("hide");
    } catch (err) {
      // loader("hide");
      console.log("-err", err);
    }
  }

  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <div className="row">
            <div className="top-header regi-web sticky">
              <div className="page-title">
                <h2>Coming Soon</h2>
                <Button
                onClick={(e)=>downloadStats(e)}
                >Import File
 
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};

export default Analytics;