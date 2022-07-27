import React, {useState,useEffect } from "react";
import "./assets/css/dashboard.css";
import ExportApi from "../../Api/ExportApi";
import { loader } from "../../loader";

const Dashboard = () => {
    const [EventData, setEventData] = useState();
    const handleGetEvents = (event_id) => {
        ExportApi.GetEventListData(event_id).then((resp) => {
            if (resp.ok) {
                console.log(resp.data.data);
                //setModalShow(true);
                //setSpDataSingle(resp.data.data.speaker_data);
                setEventData(resp.data.data);
            }
        }).catch((err) => {
            console.log(err);
            loader("hide");
        });
    }
    useEffect(() => {
        handleGetEvents(localStorage.getItem("EventIdHeader"));
    },[]);
    
  return (
    <div className="col right-sidebar col event-details">
        <div>Top Bar</div>
        <div className="event-details-left">
            <div className="event-details-left-inner">
                <div className="event-details-left-event">Event Details
                {EventData
                  ? EventData?.map((val,i)=>(
                        <p>{i}</p>
                    ))
                  : null}
                </div>
                <div className="event-details-left-rehearsal">Rehearsal</div>
            </div>
            <div className="clearfix"></div>
            <div className="event-details-left-emails">Emails</div>
        </div>
        <div className="event-details-right">
            <div className="event-details-right-portal">Portal Preparation</div>
            <div className="event-details-right-reg">Registered Info</div>
            <div className="event-details-right-type">Type</div>
        </div>
        
      {/* <div className="coming-soon">
        <h2>
          {"\u2734"} Coming Soon{"\u2734"}
        </h2>
      </div> */}
    </div>
  );
};

export default Dashboard;
