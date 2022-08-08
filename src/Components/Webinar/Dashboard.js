import React, {useState,useEffect } from "react";
import "./assets/css/dashboard.css";
import ExportApi from "../../Api/ExportApi";
import { loader } from "../../loader";
import { Link } from "react-router-dom";
const Dashboard = () => {
    const [eventData, setEventData] = useState();
    const [registrationPageList, setRegistrationPageList] = useState([]);
    const [templateList, setTemplateList] = useState([]);
    const [countdownDate, setCountdownDate] = useState(new Date('08/09/2022 , 12:00 PM PST').getTime());
    const [state, setState] = useState({days: 0, hours: 0,minutes: 0,seconds: 0,});

    useEffect(() => {
      setInterval(() => setNewTime(), 1000);
    }, []);
    const setNewTime = () => {
      if (countdownDate) {
        const currentTime = new Date().getTime();
        const distanceToDate = countdownDate - currentTime;
        let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
          (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),);
        let minutes = Math.floor(
          (distanceToDate % (1000 * 60 * 60)) / (1000 * 60),);
        let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);
        const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        if (numbersToAddZeroTo.includes(days)) {
          days = `0${days}`;
        } 
        if (numbersToAddZeroTo.includes(hours)) {
          hours = `0${hours}`;
        } 
        if (numbersToAddZeroTo.includes(minutes)) {
          minutes = `0${minutes}`;
        } 
         if (numbersToAddZeroTo.includes(seconds)) {
          seconds = `0${seconds}`;
        }
        setState({ days: days, hours: hours, minutes, seconds });
      }
    }
    const handleGetEvents = (event_id) => {
        ExportApi.GetEventListData(event_id).then((resp) => {
            if (resp.ok) {
                console.log(resp.data.data)
                setEventData(resp.data.data);
                // let date=resp.data.data+" , "+
            }
        }).catch((err) => {
            console.log(err);
            loader("hide");
        });
    };
    
    const handleGetRegistrationPagesList = (event_id) => {
        ExportApi.RegistrationPageList(event_id).then((resp) => {
            if (resp.ok) {
                if(resp.data.code === 200){
                    setRegistrationPageList(resp.data.data);
                }
            }
        });
    };
    
    const handleGetTemplateList = (event_id) => {
        ExportApi.UserTemplateList(event_id).then((resp) => {
            if (resp.ok) {
                setTemplateList(resp.data.data);
            } 
        });
    }
    useEffect(() => {
        handleGetFirstEventId()
    }, [])
    const handleGetFirstEventId = () => {
        ExportApi.DashboardData().then((resp) => {
            if (resp.ok) {
            // alert(resp.data.data.event_id)
                console.log(resp.data.data.event_id)
                handleGetEvents(resp.data.data.event_id)
                handleGetRegistrationPagesList(resp.data.data.event_id)
                handleGetTemplateList(resp.data.data.event_id)
            } 
        });
    }
    
    useEffect(() => {
        window.addEventListener("EventId", () =>
            handleGetEvents(localStorage.getItem("EventIdHeader")),
            handleGetRegistrationPagesList(localStorage.getItem("EventIdHeader")),
            handleGetTemplateList(localStorage.getItem("EventIdHeader"))
        );
        handleGetEvents(localStorage.getItem("EventIdHeader"));
        handleGetRegistrationPagesList(localStorage.getItem("EventIdHeader"));
        handleGetTemplateList(localStorage.getItem("EventIdHeader"));
        if (!localStorage.getItem("EventIdHeader")) {
          loader("hide");
        }
    }, []);
    useEffect(() => {
        setTimeout(() => {
          
            handleGetFirstEventId()
        }, 1000);
    }, [])
  return (
    <>      
    <div className="loader" id="custom_loader">
        <span className="loader-view"> </span>
    </div>      
    <div className="col right-sidebar col event-details">
        <div className="custom-container">
            <div className="row">
                <div className="top-header">
                    <div className="page-title"><h3>{eventData?.title} Event</h3></div>
                </div>
                <div className="email-result">
                    <div className="event-details-left">
                        <div className="event-details-left-inner">
                            <div className="event-details-left-event">
                                <div class="mail-box-content-top">
                                    <div class="mail-box-content-top-view">
                    <Link to="/webinar/events"><button className="btn btn-primary btn-filled send">Edit </button></Link>
                                        <div class="webinar_time">
                                            <div class="webinar-start-time">
                                                {eventData?.speaker_data?.map((val)=>{
                                                  return  <span><strong>Speaker Name:</strong> {val.name}</span>

                                                })}
                                            </div>
                                            <div class="webinar-start-time">
                                                <span><strong>Start Time:</strong> {eventData?.event_start_time}</span>
                                            </div>
                                            <div class="webinar-end-time">
                                                <span><strong>End Time:</strong> {eventData?.event_end_time}</span>
                                            </div>
                                        </div>
                                        <div class="webinar_time">
                                            <span><strong>Timezone:</strong> {eventData?.country_timezone} </span>
                                        </div>
                                        <div class="webinar_time">
                                            <span><strong>Country:</strong>  {eventData?.location}</span>
                                        </div>
                                        <div class="mailbox-description">
                                            <p>{eventData?.description}</p>
                                        </div>
                                        <div class="mail-stats">
                                            <ul>
                                         
                {state.days > 0 || state.hours > 0 || state.minutes > 0 || state.seconds > 0 ?
                    <li><span>{state.days || '0'}:{state.hours || '0'}:{state.minutes || '0'}:{state.seconds || '0'} Time Left</span></li>  : ""}
  
                                                {/* // <li><span>15:35 Time Left</span></li>  */}
                                                <li><span>{eventData?.event_date} ({eventData?.timezone})</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="event-details-left-rehearsal">Rehearsal</div>
                        </div>
                        <div className="clearfix"></div>
                        <div className="event-details-left-emails">Email Templates
                        <Link to="/webinar/email/template"><button className="btn btn-primary btn-filled send">Edit </button></Link>
                            {templateList? <> {templateList?.map((val, i) => (
                                    <>
                                        <div className="registration-page">
                                            <div> {val?.name} </div>
                                        </div>
                                    </>
                            ))} </> : <div className="hcp-table-content">Email Templates not created yet.</div>}
                        
                        </div>
                    </div>
                    <div className="event-details-right">
                        <div className="event-details-right-portal">Portal Preparation</div>
                        <div className="event-details-right-reg">
                        <Link to="/webinar/portal/Registrations"><button className="btn btn-primary btn-filled send">Edit </button></Link>
                            {registrationPageList? <> {registrationPageList?.map((val, i) => (
                                    <>
                                        <div className="registration-page"><strong>Registration Page: {i+1}</strong>
                                            <div> {JSON.parse(val?.json_data)?.page_title} </div>
                                            <div> {JSON.parse(val?.json_data)?.Title1} </div>
                                            <div> {JSON.parse(val?.json_data)?.Title2} </div>
                                        </div>
                                    </>
                            ))} </> : <div className="hcp-table-content">Registration Page not created yet.</div>}
                        </div>
                        <div className="event-details-right-type">Type</div>
                    </div>
                </div>    
            </div>
        </div>
    </div>
    </>        
  );
};

export default Dashboard;
