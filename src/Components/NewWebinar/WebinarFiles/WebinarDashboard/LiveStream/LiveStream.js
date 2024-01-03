import React, { useState, useEffect } from 'react'
import { Col, Tabs, Tab, Button, Form } from 'react-bootstrap';
import { postData, deleteData, deleteMethod } from '../../../../../axios/apiHelper';
import { ENDPOINT } from '../../../../../axios/apiConfig';
import CommonConfirmModel from '../../../../../Model/CommonConfirmModel';
import { popup_alert } from '../../../../../popup_alert';
import { Spinner } from 'react-activity';
import { toast } from "react-toastify";
let path_image = "../"+process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const LiveStream = () => {
  const [questions, setQuestions] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [attendeesDetails, setAttendeesDetails] = useState();
  const [resetDataId, setResetDataId] = useState();
  const [refreshFlag, setrefreshFlag] = useState("");
  const [popupMessage, setPopupMessage] = useState({
    message1: "",
    message2: "",
    footerButton: "",
  });
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState('new');
  const [moreDetailsStatus, setMoreDetailsStatus] = useState(false);
  const [adminMessage, setAdminMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [apiCallStatus, setApiCallStatus] = useState(true);
  const [accordionOpen, setAccordionOpen] = useState("");
  const [attendeesTab, setAttendeesTab] = useState('online');
  const [messageSendStatus, setMessageSendStatus] = useState(false);
  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [attendeesApiCallStatus, setAttendeesApiCallStatus] = useState(true);
  const [commonConfirmModelFun, setCommonConfirmModelFun] = useState(() => {});

  useEffect(() => {
      getQuestions();
  }, []);

  useEffect(() => {
    getEventRegisterReaders();
}, [attendeesTab]);


  const getQuestions = async() => {    
    try{
      let body = {
        "eventId": 401
      };
      const response = await postData(ENDPOINT.WEBINAR_EVENT_QUESTION_ANSWER,body);
      setQuestions(response?.data?.data);
      setrefreshFlag("");
      setApiCallStatus(false);
    }catch(err){
      setApiCallStatus(false);
      console.log(err);
    }
  };

  const getEventRegisterReaders = async() => {
    try{
      let body = {
        "eventId": 401,
        "type" : attendeesTab,
        "search" : search
      };
      const response = await postData(ENDPOINT.WEBINAR_GET_EVENT_ATTENDEES,body);
      setAttendees(response?.data?.data);
      setAttendeesApiCallStatus(false);
    }catch(err){
      setAttendeesApiCallStatus(false);
      console.log(err);
    }
  }

  const refreshQuestion = async(type) => {
    try{
      setrefreshFlag(type);
      setApiCallStatus(true);
      getQuestions();
    }catch(err){
      console.log(err);
    }
  }

  const changeStatus = async(status,question_id,e,current_state) => {
    try{
      e.preventDefault();
      setApiCallStatus(true);
      let body = {
        "eventId" : 401,
        "questionId" : question_id,
        "status" : status
      };

      if(current_state === "new" && status === 2){
        let question = questions?.[current_state].find(item => item.id === question_id);
        if(question?.reply && question.reply.trim() !== ""){
          Object.assign(body, { reply: question?.reply });
        }
      }

      const response = await postData(ENDPOINT.WEBINAR_CHANGE_QUESTION_STATUS,body);
      const sourceIndex = questions?.[current_state].findIndex(item => item.id === question_id);
      if (sourceIndex !== -1) {
        const updatedQuestions = { ...questions };
        const removedItem = updatedQuestions?.[current_state].splice(sourceIndex, 1)[0];
        if (status === 0) {
          // Move to ignore
          removedItem.reply = '';
          updatedQuestions.ignore.unshift(removedItem);
        } else if (status === 2) {
          // Move to sent
          updatedQuestions.sent.unshift(removedItem);
        }
        toast.success("Question moved successfully.");
        setQuestions(updatedQuestions);
        setApiCallStatus(false);
      }
    }catch(err){
      setApiCallStatus(false);
      console.log(err);
    }
  }

  const replyQuestion = (question_id,comment) => {
    try{
      const updatedQuestions = { ...questions };
      updatedQuestions.new.find((c) => c.id === question_id).reply = comment;
      setQuestions(updatedQuestions);
    }catch(err){
      console.log(err);
    }
  }

  const showConfirmationPopup = (e, id) => {
    try{
      setResetDataId(id);
      setCommonConfirmModelFun(() => deleteUser);
      setPopupMessage({
        message1: "You are about to remove this question.",
        message2: "Are you sure you want to do this?",
        footerButton: "Yes please!",
      });
      if (confirmationpopup) {
        setConfirmationPopup(false);
      } else {
        setConfirmationPopup(true);
      }
    }catch(err){
      console.log(err);
    }
  };

  const showAttendeesConfirmationPopup = (e, id) => {
    try{
      setResetDataId(id);
      setCommonConfirmModelFun(() => deleteRegisterUser);
      setPopupMessage({
        message1: "You are about to remove this user.",
        message2: "Are you sure you want to do this?",
        footerButton: "Yes please!",
      });
      if (confirmationpopup) {
        setConfirmationPopup(false);
      } else {
        setConfirmationPopup(true);
      }
    }catch(err){
      console.log(err);
    }
  }

  const deleteUser = async (id) => {
    setApiCallStatus(true);
    try {
      await deleteData(ENDPOINT.WEBINAR_DELETE_QUESTION_ANSWER, id);
      popup_alert({
        visible: "show",
        message: "Question has been deleted <br />successfully !",
        type: "success",
        redirect: "",
      });
      setApiCallStatus(false);
    } catch (err) {
      setApiCallStatus(false);
    }

    const updatedObj = Object.fromEntries(
      Object.entries(questions).map(([key, array]) => [
        key,
        array.filter(item => item.id !== id),
      ])
    );
    setQuestions(updatedObj);

    hideConfirmationModal();
  }

  const deleteRegisterUser = async (id) => {
    setAttendeesApiCallStatus(true);
    try {
      let eventId = 401;
      const res = await deleteMethod(`${ENDPOINT.WEBINAR_DELETE_USER}/${id}/${eventId}`);
      let updatedUserData = attendees.filter((item) => item?.userId !== id);
      setAttendees(updatedUserData);
      popup_alert({
        visible: "show",
        message: "User has been deleted <br />successfully !",
        type: "success",
        redirect: "",
      });
      setAttendeesApiCallStatus(false);
    } catch (err) {
      setAttendeesApiCallStatus(false);
      console.log(err);
    }
    hideConfirmationModal();
  }

  const hideConfirmationModal = () => {
    setConfirmationPopup(false);
  };

  const handleInputChange = (e) => {
    setAdminMessage(e.target.value);
    setErrorMessage("");
  }

  const handleSendMessage = async() => {
    try{
      if (adminMessage.trim() === '') {
        setErrorMessage('Message is required.');
      } else {
        setMessageSendStatus(true);
        let body = {
          "eventId"  : 401,
          "question" : adminMessage
        };
        const response = await postData(ENDPOINT.WEBINAR_SEND_ADMIN_QUESTION,body);
        setAdminMessage('');
        setErrorMessage('');
        setMessageSendStatus(false);
        setActiveTab("sent");
        toast.success("Message send successfully.");
        getQuestions();
      }
    }catch(err){
      setMessageSendStatus(false);
      console.log(err);
    }
  };

  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  const changeAttendeesTab = (selectedTab) => {
    setSearch('');
    setDeleteStatus(false);
    setAttendeesApiCallStatus(true);
    setAccordionOpen(false);
    setAttendeesTab(selectedTab);
  }

  const refreshAttendees = async(e) => {
    try{
      setDeleteStatus(false);
      setAccordionOpen(false);
      setAttendeesApiCallStatus(true);
      getEventRegisterReaders();
    }catch(err){
      console.log(err);
    }
  }

  const toggleAccordion = async(id) => {
    try{
      if(accordionOpen !== id){
        setMoreDetailsStatus(true);
        let body = {
            "eventId": 401,
            "userId": id
        };
        const response = await postData(ENDPOINT.WEBINAR_GET_EVENT_ATTENDEES_DETAILS,body);
        setAttendeesDetails(response?.data?.data);
      }
      setAccordionOpen((prevIndex) => (prevIndex === id ? null : id));
      setMoreDetailsStatus(false);
    }catch(err){
      setMoreDetailsStatus(false);
      console.log(err);
    }
  };

  const searchChange = (e) => {
    setSearch(e?.target?.value);
    if (e?.target?.value === "") {
      setAttendees([]);
    }
  };

  const submitHandler = (event) => {
    setAttendees([]);
    setDeleteStatus(false);
    setAccordionOpen(false);
    setAttendeesApiCallStatus(true);
    getEventRegisterReaders();
    event.preventDefault();
    return false;
  };
  

  return (
    <>

      <Col className="right-sidebar custom-change live-stream">
        <div className="custom-container">
          <div className="row">
            <Col className="col-4" >
              <h6>Engagements</h6>
              
              <div className="doc-content-main-box col">
                <div className="live-stream-tabs-data">
                  <Tabs
                    activeKey={activeTab}
                    onSelect={handleTabSelect}
                    fill
                  >
                    < Tab
                      eventKey="new"
                      title="New "
                      className="flex-column"
                    >
                      {
                        apiCallStatus ? 
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            <Spinner
                              color="#53aff4"
                              size={32}
                              speed={1}
                              animating={true}
                            />
                          </div>
                        : 
                        <>
                            <div className="doc-content-header">
                              <div className="doc-content d-flex justify-content-between align-items-center">
                                <h4>Question | <span>{questions?.new?.length ? questions?.new?.length : 0}</span></h4>
                                <div className='btn-refresh'>
                                  <img className= {refreshFlag === "new" ?  "refresh-rotate" : ""} src={path_image + "refresh-btn.svg"} alt="" onClick={(e) =>refreshQuestion("new",e)}/>
                                </div>
                              </div>
                            </div>
                            <div className="tab-panel d-flex flex-column justify-content-between">
                              {questions?.new?.length > 0 ?
                                questions?.new?.map((item, index) => {
                                  return (<>
                                    <div className="live-stream-ques" key={item.id}>
                                      <div className="live-stream-ques-header d-flex justify-content-between">
                                        <div className="live-stream-hcp">
                                          <h4>{item?.name ? item?.name : "Anonymous"}</h4>
                                        </div>
                                        <div className="speaker-specialty">
                                          {item?.question_date}
                                        </div>
                                      </div>
                                      <div className='reader-message'>
                                        <div className='reader-msg-show' dangerouslySetInnerHTML={{ __html: item?.question }}></div>
                                        <div className='user-comment'>
                                          <Form.Control size="lg" 
                                            type="text" 
                                            placeholder="Type your comment for the speaker here... " 
                                            value={item?.reply} 
                                            onChange={(e) => replyQuestion(item.id,e.target.value)} />
                                        </div>
                                      </div>
                                      <div className='live-stream-action d-flex justify-content-end align-items-center'>
                                        <Button className="send-speaker" onClick={(e) =>changeStatus(2,item.id,e,"new")}>
                                          Send To Speaker
                                        </Button>
                                        <div className='clear-search'>
                                          <button  onClick={(e) => showConfirmationPopup(e,item?.id)}> 
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.84 22.25H8.15989C7.3915 22.2389 6.65562 21.9381 6.09941 21.4079C5.5432 20.8776 5.20765 20.157 5.15985 19.39L4.24984 5.55C4.24518 5.44966 4.26045 5.34938 4.29478 5.25498C4.32911 5.16057 4.38181 5.07391 4.44985 5C4.51993 4.9234 4.60479 4.86177 4.69931 4.81881C4.79382 4.77584 4.89606 4.75244 4.99985 4.75H19C19.1029 4.74977 19.2046 4.7707 19.2991 4.81148C19.3935 4.85226 19.4785 4.91202 19.5488 4.98704C19.6192 5.06207 19.6733 5.15077 19.7079 5.24761C19.7426 5.34446 19.7569 5.44739 19.75 5.55L18.88 19.39C18.8317 20.1638 18.4905 20.8902 17.9258 21.4214C17.3611 21.9527 16.6153 22.249 15.84 22.25ZM5.83986 6.25L6.60987 19.3C6.63531 19.6935 6.80978 20.0625 7.09775 20.3319C7.38573 20.6013 7.76555 20.7508 8.15989 20.75H15.84C16.2336 20.7485 16.6121 20.5982 16.8996 20.3292C17.1871 20.0603 17.3622 19.6927 17.39 19.3L18.2 6.3L5.83986 6.25Z" fill="#0066BE"></path><path d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z" fill="#0066BE"></path><path d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z" fill="#0066BE"></path><path d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z" fill="#0066BE"></path><path d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z" fill="#0066BE"></path><path d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z" fill="#0066BE"></path></svg>
                                          </button>
                                        </div>
                                        <Button className="ignored" onClick={(e) =>changeStatus(0,item.id,e,"new")}>
                                          Ignore
                                        </Button>
                                      </div>
                                    </div>
                                  </>)
                                })
                                : <div className='no_found'><p>No Data found</p></div>}
                            </div>
                        </>
                      }
                    </Tab>
                    <Tab
                      eventKey="sent"
                      title="Sent "
                      className="flex-column speaker-send"
                    >
                      {
                        apiCallStatus ? 
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            <Spinner
                              color="#53aff4"
                              size={32}
                              speed={1}
                              animating={true}
                            />
                          </div>
                        : 
                        <>
                          <div className="doc-content-header">
                            <div className="doc-content d-flex justify-content-between align-items-center">
                              <h4>Question | <span>{questions?.sent?.length ? questions?.sent?.length : 0}</span></h4>
                              <div className='btn-refresh'>
                                <img className= {refreshFlag === "sent" ?  "refresh-rotate" : ""} src={path_image + "refresh-btn.svg"} alt="" onClick={(e) =>refreshQuestion("sent",e)}/>
                              </div>
                            </div>
                          </div>
                          <div className="tab-panel d-flex flex-column justify-content-between">
                            {questions?.sent?.length > 0?
                              questions?.sent?.map((item, index) => {
                                return (<>
                                  <div className="live-stream-ques" key={item.id}>
                                    <div className="live-stream-ques-header d-flex justify-content-between">
                                      <div className="live-stream-hcp">
                                      <h4>{item?.name ? item?.name : "Anonymous"}</h4>
                                      </div>
                                      <div className="speaker-specialty">
                                        {item?.question_date}
                                      </div>
                                    </div>
                                    <div className='reader-message'>
                                      <div className='reader-msg-show' dangerouslySetInnerHTML={{ __html: item?.question }}></div>
                                      {
                                        item?.reply ? 
                                        <div className='user-comment'>
                                            <Form.Control size="lg" 
                                              type="text" 
                                              placeholder="Type your comment for the speaker here... " 
                                              value={"Reply to speaker : "+item?.reply} 
                                              disabled
                                            />
                                          </div>
                                        : null  
                                      }
                                    </div>
                                    <div className='live-stream-action d-flex justify-content-end align-items-center'>
                                      <Button className="send-speaker">
                                        Send To Speaker
                                      </Button>
                                      <div className='clear-search'>
                                        <button  onClick={(e) => showConfirmationPopup(e,item?.id)}> 
                                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.84 22.25H8.15989C7.3915 22.2389 6.65562 21.9381 6.09941 21.4079C5.5432 20.8776 5.20765 20.157 5.15985 19.39L4.24984 5.55C4.24518 5.44966 4.26045 5.34938 4.29478 5.25498C4.32911 5.16057 4.38181 5.07391 4.44985 5C4.51993 4.9234 4.60479 4.86177 4.69931 4.81881C4.79382 4.77584 4.89606 4.75244 4.99985 4.75H19C19.1029 4.74977 19.2046 4.7707 19.2991 4.81148C19.3935 4.85226 19.4785 4.91202 19.5488 4.98704C19.6192 5.06207 19.6733 5.15077 19.7079 5.24761C19.7426 5.34446 19.7569 5.44739 19.75 5.55L18.88 19.39C18.8317 20.1638 18.4905 20.8902 17.9258 21.4214C17.3611 21.9527 16.6153 22.249 15.84 22.25ZM5.83986 6.25L6.60987 19.3C6.63531 19.6935 6.80978 20.0625 7.09775 20.3319C7.38573 20.6013 7.76555 20.7508 8.15989 20.75H15.84C16.2336 20.7485 16.6121 20.5982 16.8996 20.3292C17.1871 20.0603 17.3622 19.6927 17.39 19.3L18.2 6.3L5.83986 6.25Z" fill="#0066BE"></path><path d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z" fill="#0066BE"></path><path d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z" fill="#0066BE"></path><path d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z" fill="#0066BE"></path><path d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z" fill="#0066BE"></path><path d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z" fill="#0066BE"></path></svg>
                                        </button>
                                      </div>
                                      <Button className="ignored" onClick={(e) =>changeStatus(0,item.id,e,"sent")}>
                                        Ignore
                                      </Button>
                                    </div>
                                  </div>
                                </>)
                              })
                              : <div className='no_found'><p>No Data found</p></div>}
                          </div>
                        </>
                      }
                    </Tab>

                    <Tab
                      eventKey="ignored"
                      title="Ignored "
                      className="flex-column question-ignored"
                    >
                      {
                        apiCallStatus ? 
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <Spinner
                            color="#53aff4"
                            size={32}
                            speed={1}
                            animating={true}
                          />
                        </div>
                      : 
                        <>
                          <div className="doc-content-header">
                            <div className="doc-content d-flex justify-content-between align-items-center">
                              <h4>Question | <span>{questions?.ignore?.length ? questions?.ignore?.length : 0}</span></h4>
                              <div className='btn-refresh'>
                              <img className= {refreshFlag === "ignore" ?  "refresh-rotate" : ""} src={path_image + "refresh-btn.svg"} alt="" onClick={(e) =>refreshQuestion("ignore",e)}/>
                              </div>
                            </div>
                          </div>
                          <div className="tab-panel d-flex flex-column justify-content-between">
                            {questions?.ignore?.length > 0?
                              questions?.ignore?.map((item, index) => {
                                return (<>
                                  <div className="live-stream-ques" key={item.id}>
                                    <div className="live-stream-ques-header d-flex justify-content-between">
                                      <div className="live-stream-hcp">
                                      <h4>{item?.name ? item?.name : "Anonymous"}</h4>
                                      </div>
                                      <div className="speaker-specialty">
                                        {item?.question_date}
                                      </div>
                                    </div>
                                    <div className='reader-message'>
                                      <div className='reader-msg-show' dangerouslySetInnerHTML={{ __html: item?.question }}>
                                      </div>
                                    </div>
                                    <div className='live-stream-action d-flex justify-content-end align-items-center'>
                                      <Button className="send-speaker" onClick={(e) =>changeStatus(2,item.id,e,"ignore")}>
                                        Send To Speaker
                                      </Button>
                                      <div className='clear-search'>
                                        <button  onClick={(e) => showConfirmationPopup(e,item?.id)}>
                                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.84 22.25H8.15989C7.3915 22.2389 6.65562 21.9381 6.09941 21.4079C5.5432 20.8776 5.20765 20.157 5.15985 19.39L4.24984 5.55C4.24518 5.44966 4.26045 5.34938 4.29478 5.25498C4.32911 5.16057 4.38181 5.07391 4.44985 5C4.51993 4.9234 4.60479 4.86177 4.69931 4.81881C4.79382 4.77584 4.89606 4.75244 4.99985 4.75H19C19.1029 4.74977 19.2046 4.7707 19.2991 4.81148C19.3935 4.85226 19.4785 4.91202 19.5488 4.98704C19.6192 5.06207 19.6733 5.15077 19.7079 5.24761C19.7426 5.34446 19.7569 5.44739 19.75 5.55L18.88 19.39C18.8317 20.1638 18.4905 20.8902 17.9258 21.4214C17.3611 21.9527 16.6153 22.249 15.84 22.25ZM5.83986 6.25L6.60987 19.3C6.63531 19.6935 6.80978 20.0625 7.09775 20.3319C7.38573 20.6013 7.76555 20.7508 8.15989 20.75H15.84C16.2336 20.7485 16.6121 20.5982 16.8996 20.3292C17.1871 20.0603 17.3622 19.6927 17.39 19.3L18.2 6.3L5.83986 6.25Z" fill="#0066BE"></path><path d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z" fill="#0066BE"></path><path d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z" fill="#0066BE"></path><path d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z" fill="#0066BE"></path><path d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z" fill="#0066BE"></path><path d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z" fill="#0066BE"></path></svg>
                                        </button>
                                      </div>
                                      <Button className="ignored">
                                        Ignore
                                      </Button>
                                    </div>
                                  </div>
                                </>)
                              })
                              : <div className='no_found'><p>No Data found</p></div>}
                          </div>
                        </>
                      }
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </Col>
            <Col className="col-4">
              <h6>Live HCP's Tracking</h6>
              <div className='dm-speaker'>
                <h6>Direct Messaging To The Speaker</h6>
                <div className='dm-speaker-txt'>
                  <Form.Group className="mb-3">
                    <Form.Control as="textarea" 
                      className={errorMessage ? "error" : ""}
                      value={adminMessage}
                      placeholder="Type your message for the speaker here... " 
                      onChange={handleInputChange}
                      rows={3}
                     />
                  </Form.Group>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    {
                      messageSendStatus ? 
                        <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <Spinner
                          color="#53aff4"
                          size={32}
                          speed={1}
                          animating={true}
                        />
                      </div>
                      : null
                    }
                   <Button variant="primary" type="submit" onClick={handleSendMessage} disabled= {messageSendStatus ? "disabled" : false}>
                      Send
                    </Button>
                </div>
              </div>
            </Col>
            <Col className="col-4">
              <h6>Attendees</h6>
              <div className="live-stream-tabs-data">
              <Tabs
                id="attendees_tabs"
                activeKey={attendeesTab}
                onSelect={changeAttendeesTab}
                className="mb-3"
                fill
              >
                <Tab eventKey="online" title="online">
                  {
                    attendeesApiCallStatus ?
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Spinner
                        color="#53aff4"
                        size={32}
                        speed={1}
                        animating={true}
                      />
                    </div>
                    :
                    <>
                      <div className="doc-content-header">
                          <div className="doc-content d-flex justify-content-between align-items-center">
                            <h4>HCPs | <span>{attendees.length}</span></h4>
                            <div className="clear-search">
                              <div className='btn-refresh'>
                                <img className= {attendeesTab === "online" ?  "refresh-rotate" : ""} src={path_image + "refresh-btn.svg"} alt="" onClick={(e) =>refreshAttendees(e)}/>
                              </div>
                              {
                                attendees.length > 0
                                ?
                                  <button
                                    className={deleteStatus ? "btn btn-outline-primary active" : "btn btn-outline-primary"}
                                    title="Delete"
                                    onClick={(e) => setDeleteStatus(!deleteStatus)}
                                  >
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M15.84 22.25H8.15989C7.3915 22.2389 6.65562 21.9381 6.09941 21.4079C5.5432 20.8776 5.20765 20.157 5.15985 19.39L4.24984 5.55C4.24518 5.44966 4.26045 5.34938 4.29478 5.25498C4.32911 5.16057 4.38181 5.07391 4.44985 5C4.51993 4.9234 4.60479 4.86177 4.69931 4.81881C4.79382 4.77584 4.89606 4.75244 4.99985 4.75H19C19.1029 4.74977 19.2046 4.7707 19.2991 4.81148C19.3935 4.85226 19.4785 4.91202 19.5488 4.98704C19.6192 5.06207 19.6733 5.15077 19.7079 5.24761C19.7426 5.34446 19.7569 5.44739 19.75 5.55L18.88 19.39C18.8317 20.1638 18.4905 20.8902 17.9258 21.4214C17.3611 21.9527 16.6153 22.249 15.84 22.25ZM5.83986 6.25L6.60987 19.3C6.63531 19.6935 6.80978 20.0625 7.09775 20.3319C7.38573 20.6013 7.76555 20.7508 8.15989 20.75H15.84C16.2336 20.7485 16.6121 20.5982 16.8996 20.3292C17.1871 20.0603 17.3622 19.6927 17.39 19.3L18.2 6.3L5.83986 6.25Z"
                                        fill="#0066BE"
                                      />
                                      <path
                                        d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z"
                                        fill="#0066BE"
                                      />
                                      <path
                                        d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z"
                                        fill="#0066BE"
                                      />
                                      <path
                                        d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z"
                                        fill="#0066BE"
                                      />
                                      <path
                                        d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z"
                                        fill="#0066BE"
                                      />
                                      <path
                                        d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z"
                                        fill="#0066BE"
                                      />
                                    </svg>
                                  </button>
                                : null
                              }
                            </div>
                          </div>
                      </div>
                      {
                        attendees.length > 0 ?
                        attendees?.map((item, index) => {
                          return (
                          <>
                            <div className="live-stream-ques">
                              <div className="live-stream-ques-header">
                                <div className="live-stream-hcp">
                                  <h4>{item?.name ? item?.name : item?.username}</h4>
                                </div>
                                <div className='d-flex hcp-detail'>
                                  <div className='hcp-detail-list'>
                                      <ul>
                                        <li><span>Email</span>{item?.email}</li>
                                        <li><span>Specialty</span>{item?.hcp_status}</li>
                                        <li><span>Country</span>{item?.country ? item?.country : item?.province}</li>
                                      </ul>
                                  </div>
                                  {
                                    deleteStatus ?   
                                    <div className='clear-search'>
                                      <button  onClick={(e) => showAttendeesConfirmationPopup(e,item?.userId)}> 
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.84 22.25H8.15989C7.3915 22.2389 6.65562 21.9381 6.09941 21.4079C5.5432 20.8776 5.20765 20.157 5.15985 19.39L4.24984 5.55C4.24518 5.44966 4.26045 5.34938 4.29478 5.25498C4.32911 5.16057 4.38181 5.07391 4.44985 5C4.51993 4.9234 4.60479 4.86177 4.69931 4.81881C4.79382 4.77584 4.89606 4.75244 4.99985 4.75H19C19.1029 4.74977 19.2046 4.7707 19.2991 4.81148C19.3935 4.85226 19.4785 4.91202 19.5488 4.98704C19.6192 5.06207 19.6733 5.15077 19.7079 5.24761C19.7426 5.34446 19.7569 5.44739 19.75 5.55L18.88 19.39C18.8317 20.1638 18.4905 20.8902 17.9258 21.4214C17.3611 21.9527 16.6153 22.249 15.84 22.25ZM5.83986 6.25L6.60987 19.3C6.63531 19.6935 6.80978 20.0625 7.09775 20.3319C7.38573 20.6013 7.76555 20.7508 8.15989 20.75H15.84C16.2336 20.7485 16.6121 20.5982 16.8996 20.3292C17.1871 20.0603 17.3622 19.6927 17.39 19.3L18.2 6.3L5.83986 6.25Z" fill="#0066BE"></path><path d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z" fill="#0066BE"></path><path d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z" fill="#0066BE"></path><path d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z" fill="#0066BE"></path><path d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z" fill="#0066BE"></path><path d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z" fill="#0066BE"></path></svg>
                                      </button>
                                    </div>
                                    : null
                                  }
                                  <div className='hcp-activity-status'>
                                      <div className='activity-status online'>
                                        <span>&nbsp;</span> {item?.is_online ? "Online" : "offline"}
                                      </div>
                                  </div>
                                </div>
                                <div className=''>
                                  
                                </div>
                              </div>

                              <div className='preview-answers'>
                                    <div className={item?.id === accordionOpen ? "answer-section active" : "answer-section"} onClick={() => toggleAccordion(item?.id)}>
                                    <div className="answer-section-heading">
                                      <p>
                                        {item?.id === accordionOpen ? "Less Details" : "More Details"} 
                                        <img src={path_image + "down-arrow.png"} alt="arrow_img" />
                                      </p>
                                    </div>
                                    {
                                      item?.id === accordionOpen ?
                                        moreDetailsStatus ?
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: "100%",
                                            height: "100%",
                                          }}
                                        >
                                          <Spinner
                                            color="#53aff4"
                                            size={32}
                                            speed={1}
                                            animating={true}
                                          />
                                        </div>
                                        :
                                        <div className="details-content">
                                          <ul>
                                          {
                                            Object.keys(attendeesDetails)?.length > 0
                                            ?
                                            <ul>
                                              <li><span>Login Time</span>{attendeesDetails?.login_time} | {attendeesDetails?.active_time}</li>
                                              <li><span>Network speed</span>{attendeesDetails?.speed}</li>
                                              <li><span>Browser </span>{attendeesDetails?.browser}</li>
                                              <li><span>Device</span>{attendeesDetails?.device}</li>
                                            </ul>
                                            : <p>No Details Found</p>
                                          }
                                          </ul>
                                        </div>
                                      : null
                                    }
                                    </div>
                              </div>
                            </div>
                          </>
                          )
                        })
                        : <div className='no_found'><p>No Data found</p></div>
                      }
                    </>
                  }
                </Tab>
                <Tab eventKey="left" title="Left">
                {
                    attendeesApiCallStatus ?
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Spinner
                        color="#53aff4"
                        size={32}
                        speed={1}
                        animating={true}
                      />
                    </div>
                    :
                    <>
                      <div className="doc-content-header">
                          <div className="doc-content d-flex justify-content-between align-items-center">
                            <h4>HCPs | <span>{attendees.length}</span></h4>
                            <div className="clear-search">
                              <div className='btn-refresh'>
                                <img className= {attendeesTab === "online" ?  "refresh-rotate" : ""} src={path_image + "refresh-btn.svg"} alt="" onClick={(e) =>refreshAttendees(e)}/>
                              </div>
                              {
                                attendees.length > 0
                                ? 
                                  <button
                                      className={deleteStatus ? "btn btn-outline-primary active" : "btn btn-outline-primary"}
                                      title="Delete"
                                      onClick={(e) => setDeleteStatus(!deleteStatus)}
                                    >
                                      <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M15.84 22.25H8.15989C7.3915 22.2389 6.65562 21.9381 6.09941 21.4079C5.5432 20.8776 5.20765 20.157 5.15985 19.39L4.24984 5.55C4.24518 5.44966 4.26045 5.34938 4.29478 5.25498C4.32911 5.16057 4.38181 5.07391 4.44985 5C4.51993 4.9234 4.60479 4.86177 4.69931 4.81881C4.79382 4.77584 4.89606 4.75244 4.99985 4.75H19C19.1029 4.74977 19.2046 4.7707 19.2991 4.81148C19.3935 4.85226 19.4785 4.91202 19.5488 4.98704C19.6192 5.06207 19.6733 5.15077 19.7079 5.24761C19.7426 5.34446 19.7569 5.44739 19.75 5.55L18.88 19.39C18.8317 20.1638 18.4905 20.8902 17.9258 21.4214C17.3611 21.9527 16.6153 22.249 15.84 22.25ZM5.83986 6.25L6.60987 19.3C6.63531 19.6935 6.80978 20.0625 7.09775 20.3319C7.38573 20.6013 7.76555 20.7508 8.15989 20.75H15.84C16.2336 20.7485 16.6121 20.5982 16.8996 20.3292C17.1871 20.0603 17.3622 19.6927 17.39 19.3L18.2 6.3L5.83986 6.25Z"
                                          fill="#0066BE"
                                        />
                                        <path
                                          d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z"
                                          fill="#0066BE"
                                        />
                                        <path
                                          d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z"
                                          fill="#0066BE"
                                        />
                                        <path
                                          d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z"
                                          fill="#0066BE"
                                        />
                                        <path
                                          d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z"
                                          fill="#0066BE"
                                        />
                                        <path
                                          d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z"
                                          fill="#0066BE"
                                        />
                                      </svg>
                                  </button>
                                : null
                              }
                            </div>
                          </div>
                      </div>
                      {
                        attendees.length > 0 ?
                        attendees?.map((item, index) => {
                          return (
                          <>
                            <div className="live-stream-ques">
                              <div className="live-stream-ques-header">
                                <div className="live-stream-hcp">
                                  <h4>{item?.name ? item?.name : item?.username}</h4>
                                </div>
                                <div className='d-flex hcp-detail'>
                                  <div className='hcp-detail-list'>
                                      <ul>
                                        <li><span>Email</span>{item?.email}</li>
                                        <li><span>Specialty</span>{item?.hcp_status}</li>
                                        <li><span>Country</span>{item?.country ? item?.country : item?.province}</li>
                                      </ul>
                                  </div>
                                  {
                                    deleteStatus ?   
                                    <div className='clear-search'>
                                      <button  onClick={(e) => showAttendeesConfirmationPopup(e,item?.userId)}> 
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.84 22.25H8.15989C7.3915 22.2389 6.65562 21.9381 6.09941 21.4079C5.5432 20.8776 5.20765 20.157 5.15985 19.39L4.24984 5.55C4.24518 5.44966 4.26045 5.34938 4.29478 5.25498C4.32911 5.16057 4.38181 5.07391 4.44985 5C4.51993 4.9234 4.60479 4.86177 4.69931 4.81881C4.79382 4.77584 4.89606 4.75244 4.99985 4.75H19C19.1029 4.74977 19.2046 4.7707 19.2991 4.81148C19.3935 4.85226 19.4785 4.91202 19.5488 4.98704C19.6192 5.06207 19.6733 5.15077 19.7079 5.24761C19.7426 5.34446 19.7569 5.44739 19.75 5.55L18.88 19.39C18.8317 20.1638 18.4905 20.8902 17.9258 21.4214C17.3611 21.9527 16.6153 22.249 15.84 22.25ZM5.83986 6.25L6.60987 19.3C6.63531 19.6935 6.80978 20.0625 7.09775 20.3319C7.38573 20.6013 7.76555 20.7508 8.15989 20.75H15.84C16.2336 20.7485 16.6121 20.5982 16.8996 20.3292C17.1871 20.0603 17.3622 19.6927 17.39 19.3L18.2 6.3L5.83986 6.25Z" fill="#0066BE"></path><path d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z" fill="#0066BE"></path><path d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z" fill="#0066BE"></path><path d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z" fill="#0066BE"></path><path d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z" fill="#0066BE"></path><path d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z" fill="#0066BE"></path></svg>
                                      </button>
                                    </div>
                                    : null
                                  }
                                  <div className='hcp-activity-status'>
                                      <div className='activity-status online'>
                                        <span>&nbsp;</span> {item?.is_online ? "Online" : "offline"}
                                      </div>
                                  </div>
                                </div>
                              </div>
                              <div className='preview-answers'>
                                    <div className={item?.id === accordionOpen ? "answer-section active" : "answer-section"} onClick={() => toggleAccordion(item?.id)}>
                                    <div className="answer-section-heading">
                                      <p>
                                        {item?.id === accordionOpen ? "Less Details" : "More Details"} 
                                        <img src={path_image + "down-arrow.png"} alt="arrow_img" />
                                      </p>
                                    </div>
                                    {
                                      item?.id === accordionOpen ?
                                        moreDetailsStatus ?
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: "100%",
                                            height: "100%",
                                          }}
                                        >
                                          <Spinner
                                            color="#53aff4"
                                            size={32}
                                            speed={1}
                                            animating={true}
                                          />
                                        </div>
                                        :
                                        <div className="details-content">
                                          <ul>
                                          {
                                            Object.keys(attendeesDetails)?.length > 0
                                            ?
                                            <ul>
                                              <li><span>Login Time</span>{attendeesDetails?.login_time} | {attendeesDetails?.active_time}</li>
                                              <li><span>Network speed</span>{attendeesDetails?.speed}</li>
                                              <li><span>Browser </span>{attendeesDetails?.browser}</li>
                                              <li><span>Device</span>{attendeesDetails?.device}</li>
                                            </ul>
                                            : <p>No Details Found</p>
                                          }
                                          </ul>
                                        </div>
                                      : null
                                    }
                                    </div>
                              </div>
                            </div>
                          </>
                          )
                        })
                        : <div className='no_found'><p>No Data found</p></div>
                      }
                    </>
                  }
                </Tab>
                <Tab eventKey="question_ask" title="Asked Q">
                {
                    attendeesApiCallStatus ?
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Spinner
                        color="#53aff4"
                        size={32}
                        speed={1}
                        animating={true}
                      />
                    </div>
                    :
                    <>
                      <div className="doc-content-header">
                          <div className="doc-content d-flex justify-content-between align-items-center">
                            <h4>HCPs | <span>{attendees.length}</span></h4>
                            <div className='clear-search'>
                              <div className='btn-refresh'>
                                <img className= {attendeesTab === "online" ?  "refresh-rotate" : ""} src={path_image + "refresh-btn.svg"} alt="" onClick={(e) =>refreshAttendees(e)}/>
                              </div>
                              {
                                attendees.length > 0 ?
                                <button
                                  className={deleteStatus ? "btn btn-outline-primary active" : "btn btn-outline-primary"}
                                  title="Delete"
                                  onClick={(e) => setDeleteStatus(!deleteStatus)}
                                  >
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                    d="M15.84 22.25H8.15989C7.3915 22.2389 6.65562 21.9381 6.09941 21.4079C5.5432 20.8776 5.20765 20.157 5.15985 19.39L4.24984 5.55C4.24518 5.44966 4.26045 5.34938 4.29478 5.25498C4.32911 5.16057 4.38181 5.07391 4.44985 5C4.51993 4.9234 4.60479 4.86177 4.69931 4.81881C4.79382 4.77584 4.89606 4.75244 4.99985 4.75H19C19.1029 4.74977 19.2046 4.7707 19.2991 4.81148C19.3935 4.85226 19.4785 4.91202 19.5488 4.98704C19.6192 5.06207 19.6733 5.15077 19.7079 5.24761C19.7426 5.34446 19.7569 5.44739 19.75 5.55L18.88 19.39C18.8317 20.1638 18.4905 20.8902 17.9258 21.4214C17.3611 21.9527 16.6153 22.249 15.84 22.25ZM5.83986 6.25L6.60987 19.3C6.63531 19.6935 6.80978 20.0625 7.09775 20.3319C7.38573 20.6013 7.76555 20.7508 8.15989 20.75H15.84C16.2336 20.7485 16.6121 20.5982 16.8996 20.3292C17.1871 20.0603 17.3622 19.6927 17.39 19.3L18.2 6.3L5.83986 6.25Z"
                                    fill="#0066BE"
                                    />
                                    <path
                                    d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z"
                                    fill="#0066BE"
                                    />
                                    <path
                                    d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z"
                                    fill="#0066BE"
                                    />
                                    <path
                                    d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z"
                                    fill="#0066BE"
                                    />
                                    <path
                                    d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z"
                                    fill="#0066BE"
                                    />
                                    <path
                                    d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z"
                                    fill="#0066BE"
                                    />
                                  </svg>
                                </button>
                                : null
                              }
                            </div>
                          </div>
                      </div>
                      {
                        attendees.length > 0 ?
                        attendees?.map((item, index) => {
                          return (
                          <>
                            <div className="live-stream-ques">
                              <div className="live-stream-ques-header">
                                <div className="live-stream-hcp">
                                  <h4>{item?.name ? item?.name : item?.username}</h4>
                                </div>
                                <div className='d-flex hcp-detail'>
                                  <div className='hcp-detail-list'>
                                      <ul>
                                        <li><span>Email</span>{item?.email}</li>
                                        <li><span>Specialty</span>{item?.hcp_status}</li>
                                        <li><span>Country</span>{item?.country ? item?.country : item?.province}</li>
                                        <li>
                                          <span>Question</span>
                                          <div className='reader-msg-show' dangerouslySetInnerHTML={{ __html: item?.question }}>
                                          </div>
                                        </li>
                                      </ul>
                                  </div>
                                  {
                                    deleteStatus ?   
                                    <div className='clear-search'>
                                      <button  onClick={(e) => showAttendeesConfirmationPopup(e,item?.userId)}> 
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.84 22.25H8.15989C7.3915 22.2389 6.65562 21.9381 6.09941 21.4079C5.5432 20.8776 5.20765 20.157 5.15985 19.39L4.24984 5.55C4.24518 5.44966 4.26045 5.34938 4.29478 5.25498C4.32911 5.16057 4.38181 5.07391 4.44985 5C4.51993 4.9234 4.60479 4.86177 4.69931 4.81881C4.79382 4.77584 4.89606 4.75244 4.99985 4.75H19C19.1029 4.74977 19.2046 4.7707 19.2991 4.81148C19.3935 4.85226 19.4785 4.91202 19.5488 4.98704C19.6192 5.06207 19.6733 5.15077 19.7079 5.24761C19.7426 5.34446 19.7569 5.44739 19.75 5.55L18.88 19.39C18.8317 20.1638 18.4905 20.8902 17.9258 21.4214C17.3611 21.9527 16.6153 22.249 15.84 22.25ZM5.83986 6.25L6.60987 19.3C6.63531 19.6935 6.80978 20.0625 7.09775 20.3319C7.38573 20.6013 7.76555 20.7508 8.15989 20.75H15.84C16.2336 20.7485 16.6121 20.5982 16.8996 20.3292C17.1871 20.0603 17.3622 19.6927 17.39 19.3L18.2 6.3L5.83986 6.25Z" fill="#0066BE"></path><path d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z" fill="#0066BE"></path><path d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z" fill="#0066BE"></path><path d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z" fill="#0066BE"></path><path d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z" fill="#0066BE"></path><path d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z" fill="#0066BE"></path></svg>
                                      </button>
                                    </div>
                                    : null
                                  }
                                  <div className='hcp-activity-status'>
                                      <div className='activity-status online'>
                                        <span>&nbsp;</span> {item?.is_online ? "Online" : "offline"}
                                      </div>
                                  </div>
                                </div>
                              </div>
                              <div className='preview-answers'>
                                    <div className={item?.id === accordionOpen ? "answer-section active" : "answer-section"} onClick={() => toggleAccordion(item?.id)}>
                                    <div className="answer-section-heading">
                                      <p>
                                        {item?.id === accordionOpen ? "Less Details" : "More Details"} 
                                        <img src={path_image + "down-arrow.png"} alt="arrow_img" />
                                      </p>
                                    </div>
                                    {
                                      item?.id === accordionOpen ?
                                        moreDetailsStatus ?
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: "100%",
                                            height: "100%",
                                          }}
                                        >
                                          <Spinner
                                            color="#53aff4"
                                            size={32}
                                            speed={1}
                                            animating={true}
                                          />
                                        </div>
                                        :
                                        <div className="details-content">
                                          <ul>
                                          {
                                            Object.keys(attendeesDetails)?.length > 0
                                            ?
                                            <ul>
                                              <li><span>Login Time</span>{attendeesDetails?.login_time} | {attendeesDetails?.active_time}</li>
                                              <li><span>Network speed</span>{attendeesDetails?.speed}</li>
                                              <li><span>Browser </span>{attendeesDetails?.browser}</li>
                                              <li><span>Device</span>{attendeesDetails?.device}</li>
                                            </ul>
                                            : <p>No Details Found</p>
                                          }
                                          </ul>
                                        </div>
                                      : null
                                    }
                                    </div>
                              </div>   
                            </div>
                          </>
                          )
                        })
                        : <div className='no_found'><p>No Data found</p></div>
                      }
                    </>
                  }
                </Tab>
                <Tab eventKey="all" title="All">
                {
                    attendeesApiCallStatus ?
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Spinner
                        color="#53aff4"
                        size={32}
                        speed={1}
                        animating={true}
                      />
                    </div>
                    :
                    <>
                      <div className="doc-content-header">
                          <div className="doc-content d-flex justify-content-between align-items-center">
                            <h4>HCPs | <span>{attendees.length}</span></h4>
                            <div className='clear-seach'>
                              {
                                attendees.length > 0
                                ?
                                <div className="search-bar">
                                    <form className="d-flex" onSubmit={(e) => submitHandler(e)}>
                                      <input
                                        className="form-control me-2"
                                        type="text"
                                        placeholder="Search by email or name"
                                        aria-label="Search"
                                        id="email_search"
                                        onChange={(e) => searchChange(e)}
                                      />
                                      <button className="btn-outline-success" type="submit">
                                        <svg
                                          width="16"
                                          height="16"
                                          viewBox="0 0 16 16"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M15.8045 14.862L11.2545 10.312C12.1359 9.22334 12.6665 7.84 12.6665 6.33334C12.6665
                                          2.84134 9.82522 0 6.33325 0C2.84128 0 0 2.84131 0 6.33331C0 9.82531 2.84132 12.6667 6.33328
                                          12.6667C7.83992 12.6667 9.22325 12.136 10.3119 11.2547L14.8619 15.8047C14.9919 15.9347 15.1625
                                          16 15.3332 16C15.5039 16 15.6745 15.9347 15.8045 15.8047C16.0652 15.544 16.0652 15.1227 15.8045
                                          14.862ZM6.33328 11.3333C3.57597 11.3333 1.33333 9.09066 1.33333 6.33331C1.33333 3.57597 3.57597
                                          1.33331 6.33328 1.33331C9.0906 1.33331 11.3332 3.57597 11.3332 6.33331C11.3332 9.09066 9.09057
                                          11.3333 6.33328 11.3333Z"
                                            fill="#97B6CF"
                                          />
                                        </svg>
                                      </button>
                                    </form>
                                </div>
                                  : null
                              }
                              <div className='btn-refresh'>
                                <img className= {attendeesTab === "online" ?  "refresh-rotate" : ""} src={path_image + "refresh-btn.svg"} alt="" onClick={(e) =>refreshAttendees(e)}/>
                              </div>
                              {
                                attendees.length > 0
                                ? 
                                  <button
                                      className={deleteStatus ? "btn btn-outline-primary active" : "btn btn-outline-primary"}
                                      title="Delete"
                                      onClick={(e) => setDeleteStatus(!deleteStatus)}
                                      >
                                      <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                        d="M15.84 22.25H8.15989C7.3915 22.2389 6.65562 21.9381 6.09941 21.4079C5.5432 20.8776 5.20765 20.157 5.15985 19.39L4.24984 5.55C4.24518 5.44966 4.26045 5.34938 4.29478 5.25498C4.32911 5.16057 4.38181 5.07391 4.44985 5C4.51993 4.9234 4.60479 4.86177 4.69931 4.81881C4.79382 4.77584 4.89606 4.75244 4.99985 4.75H19C19.1029 4.74977 19.2046 4.7707 19.2991 4.81148C19.3935 4.85226 19.4785 4.91202 19.5488 4.98704C19.6192 5.06207 19.6733 5.15077 19.7079 5.24761C19.7426 5.34446 19.7569 5.44739 19.75 5.55L18.88 19.39C18.8317 20.1638 18.4905 20.8902 17.9258 21.4214C17.3611 21.9527 16.6153 22.249 15.84 22.25ZM5.83986 6.25L6.60987 19.3C6.63531 19.6935 6.80978 20.0625 7.09775 20.3319C7.38573 20.6013 7.76555 20.7508 8.15989 20.75H15.84C16.2336 20.7485 16.6121 20.5982 16.8996 20.3292C17.1871 20.0603 17.3622 19.6927 17.39 19.3L18.2 6.3L5.83986 6.25Z"
                                        fill="#0066BE"
                                        />
                                        <path
                                        d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z"
                                        fill="#0066BE"
                                        />
                                        <path
                                        d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z"
                                        fill="#0066BE"
                                        />
                                        <path
                                        d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z"
                                        fill="#0066BE"
                                        />
                                        <path
                                        d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z"
                                        fill="#0066BE"
                                        />
                                        <path
                                        d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z"
                                        fill="#0066BE"
                                        />
                                      </svg>
                                  </button>
                                : null
                              }
                            </div>
                          </div>
                      </div>
                      {
                        attendees.length > 0 ?
                        attendees?.map((item, index) => {
                          return (
                          <>
                            <div className="live-stream-ques">
                              <div className="live-stream-ques-header">
                                <div className="live-stream-hcp">
                                  <h4>{item?.name ? item?.name : item?.username}</h4>
                                </div>
                                <div className='d-flex hcp-detail'>
                                  <div className='hcp-detail-list'>
                                      <ul>
                                        <li><span>Email</span>{item?.email}</li>
                                        <li><span>Specialty</span>{item?.hcp_status}</li>
                                        <li><span>Country</span>{item?.country ? item?.country : item?.province}</li>
                                      </ul>
                                  </div>
                                  {
                                    deleteStatus ?   
                                    <div className='clear-search'>
                                      <button  onClick={(e) => showAttendeesConfirmationPopup(e,item?.userId)}> 
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.84 22.25H8.15989C7.3915 22.2389 6.65562 21.9381 6.09941 21.4079C5.5432 20.8776 5.20765 20.157 5.15985 19.39L4.24984 5.55C4.24518 5.44966 4.26045 5.34938 4.29478 5.25498C4.32911 5.16057 4.38181 5.07391 4.44985 5C4.51993 4.9234 4.60479 4.86177 4.69931 4.81881C4.79382 4.77584 4.89606 4.75244 4.99985 4.75H19C19.1029 4.74977 19.2046 4.7707 19.2991 4.81148C19.3935 4.85226 19.4785 4.91202 19.5488 4.98704C19.6192 5.06207 19.6733 5.15077 19.7079 5.24761C19.7426 5.34446 19.7569 5.44739 19.75 5.55L18.88 19.39C18.8317 20.1638 18.4905 20.8902 17.9258 21.4214C17.3611 21.9527 16.6153 22.249 15.84 22.25ZM5.83986 6.25L6.60987 19.3C6.63531 19.6935 6.80978 20.0625 7.09775 20.3319C7.38573 20.6013 7.76555 20.7508 8.15989 20.75H15.84C16.2336 20.7485 16.6121 20.5982 16.8996 20.3292C17.1871 20.0603 17.3622 19.6927 17.39 19.3L18.2 6.3L5.83986 6.25Z" fill="#0066BE"></path><path d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z" fill="#0066BE"></path><path d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z" fill="#0066BE"></path><path d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z" fill="#0066BE"></path><path d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z" fill="#0066BE"></path><path d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z" fill="#0066BE"></path></svg>
                                      </button>
                                    </div>
                                    : null
                                  }
                                  <div className='hcp-activity-status'>
                                      <div className='activity-status online'>
                                        <span>&nbsp;</span> {item?.is_online ? "Online" : "offline"}
                                      </div>
                                  </div>
                                </div>
                              </div>
                              <div className='preview-answers'>
                                    <div className={item?.id === accordionOpen ? "answer-section active" : "answer-section"} onClick={() => toggleAccordion(item?.id)}>
                                    <div className="answer-section-heading">
                                      <p>
                                        {item?.id === accordionOpen ? "Less Details" : "More Details"} 
                                        <img src={path_image + "down-arrow.png"} alt="arrow_img" />
                                      </p>
                                    </div>
                                    {
                                      item?.id === accordionOpen ?
                                        moreDetailsStatus ?
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: "100%",
                                            height: "100%",
                                          }}
                                        >
                                          <Spinner
                                            color="#53aff4"
                                            size={32}
                                            speed={1}
                                            animating={true}
                                          />
                                        </div>
                                        :
                                        <div className="details-content">
                                          <ul>
                                          {
                                            Object.keys(attendeesDetails)?.length > 0
                                            ?
                                            <ul>
                                              <li><span>Login Time</span>{attendeesDetails?.login_time} | {attendeesDetails?.active_time}</li>
                                              <li><span>Network speed</span>{attendeesDetails?.speed}</li>
                                              <li><span>Browser </span>{attendeesDetails?.browser}</li>
                                              <li><span>Device</span>{attendeesDetails?.device}</li>
                                            </ul>
                                            : <p>No Details Found</p>
                                          }
                                          </ul>
                                        </div>
                                      : null
                                    }
                                    </div>
                              </div>
                            </div>
                          </>
                          )
                        })
                        : <div className='no_found'><p>No Data found</p></div>
                      }
                    </>
                  }
                </Tab>
              </Tabs>
              </div>
            </Col>
          </div>
        </div>
      </Col>

      <CommonConfirmModel
        show={confirmationpopup}
        onClose={hideConfirmationModal}
        fun={commonConfirmModelFun}
        popupMessage={popupMessage}
        path_image={path_image}
        resetDataId={resetDataId}
        onCloseCross={() => {
          hideConfirmationModal();
        }}
      />
    </>
  );
}

export default LiveStream