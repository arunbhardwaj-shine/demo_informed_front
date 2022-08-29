import React, {useState,useEffect } from "react";
import "./assets/css/dashboard.css";
import ExportApi from "../../Api/ExportApi";
import { loader } from "../../loader";
import { Link } from "react-router-dom";
const Dashboard = () => {
    const [eventData, setEventData] = useState();
    const [eventDataStats, setEventDataStats] = useState();
    const [registrationPageList, setRegistrationPageList] = useState([]);
    const [registrationPageListJson, setRegistrationPageListJson] = useState();
    const [templateList, setTemplateList] = useState([]);
    const [count, setCount] = useState(1);
    const [ horse, sethour] = useState();
    const [ minutes, setMinutes ] = useState();
    const [seconds, setSeconds ] =  useState(0);
    const handleGetEvents = (event_id) => {
        ExportApi.GetEventListData(event_id).then((resp) => {
            if (resp.ok) {
                setEventData(resp.data.data);
                console.log(resp.data.data)
                sethour(resp.data.data.hour_left)
                setMinutes(resp.data.data.min_left)
                // setNewTime()
            }
        }).catch((err) => {
            console.log(err);
            loader("hide");
        });
    };
    // console.log(countdownDate)
    
    const handleGetRegistrationPagesList = (event_id) => {
        ExportApi.RegistrationPageList(event_id).then((resp) => {
            if (resp.ok) {
                if(resp.data.code === 200){
                    console.log(resp.data.data)
                    setRegistrationPageList(resp.data.data);
                    setRegistrationPageListJson(JSON.parse(resp.data.data[0].json_data))
                    // handleGetRegistrationPageSingleData()
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
    const handleGetDashboardDataStats = (event_id) => {
        ExportApi.DashboardDataStats(event_id).then((resp) => {
            if (resp.ok) {
                // alert()
               console.log(resp.data.data);
               setEventDataStats(resp.data.data);
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
                handleGetDashboardDataStats(resp.data.data.event_id)
                handleGetEvents(resp.data.data.event_id)
                handleGetRegistrationPagesList(resp.data.data.event_id)
                handleGetTemplateList(resp.data.data.event_id)
            } 
        });
    }
    
    useEffect(() => {
        window.addEventListener("EventId", () => {
            handleGetEvents(localStorage.getItem("EventIdHeader"));
            handleGetRegistrationPagesList(localStorage.getItem("EventIdHeader"));
            handleGetTemplateList(localStorage.getItem("EventIdHeader"));
            handleGetDashboardDataStats(localStorage.getItem("EventIdHeader"))
        });
        handleGetEvents(localStorage.getItem("EventIdHeader"));
        handleGetRegistrationPagesList(localStorage.getItem("EventIdHeader"));
        handleGetTemplateList(localStorage.getItem("EventIdHeader"));
        handleGetDashboardDataStats(localStorage.getItem("EventIdHeader"))
        if (!localStorage.getItem("EventIdHeader")) {
          loader("hide");
        }
    }, []);
    useEffect(() => {
        setTimeout(() => {
            handleGetFirstEventId()
        }, 1000);
    }, [])
   

    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } if(minutes==0){
                clearInterval(myInterval)
                if (minutes === 0) {
                    sethour(horse-1)
                    setMinutes(59)
                    setSeconds(59);
                }
            }
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });
    const handleGetRegistrationPageSingleData = (id) => {
        ExportApi.RegistrationPageSingleData(id).then((resp) => {
          if (resp.ok&&resp.data.code==200) {
             console.log(resp.data.data)
            //   setMode(resp.data.data)
            //   setRender(render+2)
            }
        });
      };
  return (
    <>            
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
                            <div className="titlelogo">
                <Link style={{float:"right"}}to="/webinar/events">
                                        Edit 
                                        </Link>
                                        </div>
                                <div className="titlelogo">
                                   <img src={registrationPageListJson?.titleLogo}/>
                                   {eventData?.days_left==0?<>                                  { minutes === 0 && seconds === 0&&horse===0
                    ? null
                    : <h1>{horse}:{minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> } </>:null}
  
                                      <span>{eventData?.mod_date}</span> 
                                      <br/>
                                      <span>{eventData?.event_start_time} - {eventData?.event_end_time} ({eventData?.timezone})</span>               
                                         <span style={{float:"right"}}> <strong>Speaker Name:</strong>
                                   {eventData?.speaker_data?.map((val)=>{
                                                  return  <p > {val.name}</p>

                                                })}</span>
                                </div>
                  
                                {/* {state.days > 0 || state.hours > 0 || state.minutes > 0 || state.seconds > 0 ?
                   <span>{state.hours || '0'}:{state.minutes || '0'}:{state.seconds || '0'}</span> : ""}
                    <span>{eventData?.event_date}</span> */}
                  
                    {/* <span><strong>Start Time:</strong> {eventData?.event_start_time} ({eventData?.timezone})</span> */}
                                <div class="mail-box-content-top">
                                        <div class="webinar_time">
                                            {registrationPageListJson?.Address?<span><strong>Location:</strong>  {registrationPageListJson?.Address}</span>:null}
                                        </div>
                
                                     
                                    <div class="mail-box-content-top-view">
                                        <div class="webinar_time">
                                            <span><strong>Country:</strong>  {eventData?.country}</span>
                                        </div>
                                        <div class="webinar_time">
                                          
                                            <div class="webinar-end-time">
                                                <span><strong>End Time:</strong> {eventData?.event_end_time}</span>
                                            </div>
                                        </div>
                                        <div class="webinar_time">
                                            <span><strong>Timezone:</strong> {eventData?.country_timezone} </span>
                                        </div>
                                      
                                        <div class="mailbox-description">
                                            <p>{eventData?.description}</p>
                                        </div>
                                        <div class="mail-stats">
                                            <ul>
                                         
   
  
                                              
                                                
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="event-details-left-rehearsal">Rehearsal</div>*/}
                        </div> 
                        <div className="clearfix"></div>
                        <div className="event-details-left-emails">Email Templates
                        <Link to="/webinar/email/template">Edit</Link>
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
                        {/* <div className="event-details-right-portal">Portal Preparation</div> */}
                        <div className="event-details-right-reg">
                        <Link to="/webinar/portal/Registrations">Edit </Link>
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
                        <div className="event-details-right-type">
                        <h6><strong>Total Register :</strong>{eventDataStats?.total_register}</h6>
                        <h6><strong>HCP :</strong>{eventDataStats?.hcp}</h6>
                        <h6><strong>Test user :</strong>{eventDataStats?.test_user}</h6>
                        <h6><strong>Staff User :</strong>{eventDataStats?.staff_user}</h6>
                   
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    </div>
    </>        
  );
};

export default Dashboard;
