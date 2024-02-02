import { loader } from "../../../../../loader";
import React, {useState,useEffect} from "react";
import { useLocation } from 'react-router-dom';
import { postData } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import { db } from "../../../../../config/firebaseConfig";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
import { Spinner } from "react-activity";
import { toast } from "react-toastify";
import moment from "moment"
import { collection, query, where, onSnapshot,orderBy,limit } from "firebase/firestore";
import {Col,
    Container,
    Row,
    Button,
  } from "react-bootstrap";

const SpeakerZone = () => {
    const { eventIdContext,handleEventId } = useSidebar();
    const localStorageEvent=JSON.parse(localStorage.getItem("EventIdContext"))
    const location = useLocation();
    const [apiCallStatus, setApiCallStatus] = useState({
      "question": false,
      "answer": false,
      "ignored": false,
    });
    const queryParams = new URLSearchParams(location.search);  
    const [eventId,setEvent] = useState({
        id:eventIdContext?.eventId?eventIdContext?.eventId:localStorageEvent?.eventId,
        companyId:eventIdContext?.companyId?eventIdContext?.companyId:localStorageEvent?.companyId,
        eventCode:eventIdContext?.eventCode?eventIdContext?.eventCode:localStorageEvent?.eventCode
    })
    const [count,setCount] = useState(0)

    const q = query(collection(db, "chat"),where("event_id","==",eventId?.id),where("company_id","==",eventId?.companyId),where("webinar","!=",0))
    const [data,setData] = useState({
        question:[],
        answer:[],
        ignre:[]
    })

    // const EventDataFun = async() =>{
    //     try{
    //         loader("show")
    //         const result = await postData(ENDPOINT.EVENT_ID,{
    //              eventCode :queryParams.get("evnt")
    //         })
    //         setEvent(result.data.data)
    //         loader("hide")

    //     }catch(err){
    //         loader("hide")
    //         console.log("-err",err)
    //     }
    // }
    // useEffect(()=>{
    //     EventDataFun()
    // },[])
    onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(doc.data()){
              if(count != doc.data()?.webinar){
                setCount(doc.data()?.webinar)
              }
            }
        });  
     })
    const initialFun = async() =>{
        try{
          setApiCallStatus({
            "question": true,
            "answer": true,
            "ignored": true,
          });
          const result = await postData(ENDPOINT.QUESTION_ANSWER,{
                "companyId":eventId?.companyId,
                "eventId":eventId?.id
             })
             setData({
                question:result?.data?.data?.question,
                answer:result?.data?.data?.answer,
                ignre:result?.data?.data?.ignore 
             })
             setApiCallStatus({
              "question": false,
              "answer": false,
              "ignored": false,
            });
            
        }catch(err){
          setApiCallStatus({
            "question": false,
            "answer": false,
            "ignored": false,
          });
            console.log("-er",err)
        }
    }
    const submitFun = async(data,id,type) =>{
        try{
            setApiCallStatus({
              "question": true,
              "answer": true,
              "ignored": true,
            });
            // if(data == 0){
            //   setApiCallStatus({
            //     "question": true,
            //     "answer": false,
            //     "ignored": true,
            //   });
            // }else if(data == 2){
            //   setApiCallStatus({
            //     "question": true,
            //     "answer": true,
            //     "ignored": false,
            //   });
            // }else{
            //   if(type == "answer"){
            //     setApiCallStatus({
            //       "question": true,
            //       "answer": true,
            //       "ignored": false,
            //     });
            //   }else{
            //     setApiCallStatus({
            //       "question": true,
            //       "answer": false,
            //       "ignored": true,
            //     });
            //   }
            // }
            await postData(ENDPOINT.QUESTION_UPDATE,{
                "userAnswer":data,
                "id":id,
                "eventId":eventId?.id,
                "companyId":eventId?.companyId
             })

            //  setApiCallStatus({
            //   "question": false,
            //   "answer": false,
            //   "ignored": false,
            // });
        }catch(err){
            setApiCallStatus({
              "question": false,
              "answer": false,
              "ignored": false,
            });
            console.log("-err",err)
        }
    }
    useEffect(()=>{
      // if(!eventIdContext){
      //   handleEventId(localStorageEvent)
      // }
        if(count>0){
            initialFun()
        }
    },[count])

    const copyToClipboard = () => {
      let content = eventId?.id> 402 ? "https://events.docintel.app/Webinar/question-list?evnt="+eventId?.eventCode :"https://informed.pro/Webinar/question-list?evnt="+eventId?.eventCode
      if (window.isSecureContext && navigator.clipboard) {
        navigator.clipboard.writeText(content);
        toast.success("content copied to the clipboard!");
      } else {
        unsecuredCopyToClipboard(content);
      }
    }

    const unsecuredCopyToClipboard = (text) => {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        toast.success("content copied to the clipboard!");
      } catch (err) {
        console.error("Unable to copy to clipboard", err);
      }
      document.body.removeChild(textArea);
    };


  return (
    <>
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <div className="row">
            <div className="top-header regi-web sticky speaker_zone">
              <div className="page-title">
                <h2>Speaker Zone</h2>
              </div>
              <div className="top-right-action">
                <Button className="btn-filled" onClick={() => {copyToClipboard()}}>Copy Link
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                  <g clip-path="url(#clip0_3765_757)">
                    <path d="M9.59862 1.59837L6.34653 4.85044C6.34025 4.85669 6.33634 4.86428 6.33009 4.87059C7.13125 4.75391 7.95428 4.83391 8.71722 5.13141L10.9244 2.92422C11.6556 2.193 12.8448 2.193 13.5761 2.92422C14.3073 3.65537 14.3073 4.84466 13.5761 5.57581C13.4514 5.70056 10.136 9.01597 10.324 8.82787C9.587 9.56494 8.37787 9.5334 7.67234 8.82787C7.30694 8.46247 6.712 8.46247 6.34653 8.82787L5.77734 9.39706C5.93522 9.66531 6.11622 9.92344 6.34653 10.1537C7.73528 11.5425 10.1257 11.6534 11.6297 10.1702C11.636 10.1639 11.6435 10.16 11.6498 10.1537L14.9019 6.90169C16.3663 5.43719 16.3663 3.06287 14.9019 1.59837C13.4374 0.133875 11.0631 0.133875 9.59862 1.59837Z" fill="white"/>
                    <path d="M7.29013 11.8617L5.07582 14.076C4.34466 14.8073 3.15538 14.8073 2.42423 14.076C1.69301 13.3448 1.69301 12.1556 2.42423 11.4244C2.54891 11.2997 5.87141 7.9772 5.68338 8.16523C6.42038 7.42823 7.62951 7.4597 8.33504 8.16523C8.70044 8.5307 9.29541 8.5307 9.66085 8.16523L10.23 7.59605C10.0722 7.3278 9.89116 7.06967 9.66085 6.83942C8.27476 5.45326 5.88607 5.33533 4.3777 6.82295C4.37141 6.8292 4.36385 6.83314 4.35754 6.83942L1.09835 10.0986C-0.366086 11.563 -0.366148 13.9374 1.09835 15.4019C2.56285 16.8664 4.93723 16.8664 6.40166 15.4019L9.66082 12.1427C9.6671 12.1365 9.67101 12.1289 9.67726 12.1225C8.8761 12.2392 8.0531 12.1592 7.29013 11.8617Z" fill="white"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_3765_757">
                      <rect width="16" height="16" fill="white" transform="translate(0 0.5)"/>
                    </clipPath>
                  </defs>
                </svg>
                </Button>
                {/* <Button className="btn-filled">Resend To The Speaker
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 16 13" fill="none">
                  <path d="M15.9467 2.30957L8.56381 6.69814C8.3933 6.7957 8.20026 6.84702 8.00381 6.84702C7.80736 6.84702 7.61432 6.7957 7.44381 6.69814L0.0533333 2.30957C0.0180061 2.46197 0.000113557 2.61789 0 2.77433V10.2258C0 10.7532 0.20951 11.259 0.582439 11.6319C0.955369 12.0048 1.46117 12.2143 1.98857 12.2143H14.0114C14.5388 12.2143 15.0446 12.0048 15.4176 11.6319C15.7905 11.259 16 10.7532 16 10.2258V2.77433C15.9999 2.61789 15.982 2.46197 15.9467 2.30957Z" fill="white"/>
                  <path d="M8.18238 6.06613L15.6338 1.63185C15.4508 1.37124 15.2079 1.15839 14.9254 1.01122C14.643 0.864048 14.3294 0.786854 14.011 0.786133H1.98809C1.66964 0.786854 1.35601 0.864048 1.0736 1.01122C0.791189 1.15839 0.548255 1.37124 0.365234 1.63185L7.82428 6.06613C7.87919 6.09614 7.94076 6.11187 8.00333 6.11187C8.0659 6.11187 8.12747 6.09614 8.18238 6.06613Z" fill="white"/>
                </svg>
                </Button> */}
              </div>
            </div>
            <div className="speaker_zone deteail">
                <div className="speaker_zone_left_div">
                  <div class="webinar-top-sec d-flex justify-content-between align-items-center">
                      <div class="top-heading">
                          <h4>Questions | <span>{data?.question?.length}</span></h4>
                      </div>
                  </div>
                  <div className="speaker-zone-listed">
                    {
                      apiCallStatus?.question ?
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
                          {
                            data?.question.length?data.question.map((item,index) =>{
                                                    return (
                                <div className="reader_list" key={index}>
                                    <div className="detail-box">  
                                    <div class="d-flex justify-content-between align-items-center">
                                        <p className="user_name">{item?.send_by == 1 ? "Octapharma" : item?.name ? item?.name : "Anonymous"}</p>
                                        {/* <div className="specialty">Specialty</div> */}
                                      </div>
                                        <div className="user-question">
                                            <p dangerouslySetInnerHTML={{__html: item?.question}}></p>
                                            {
                                                item?.reply && item?.reply != "" ?
                                                <div className="speaker_reply"><p dangerouslySetInnerHTML={{__html: "Reply by Octapharma: " + item?.reply}}></p></div>
                                                : null
                                            }
                                        </div>
                                        <div className="reader_list_footer d-flex justify-content-between align-items-center" >
                                            <div className="question-post-time">
                                                {/* <small>{moment(item?.created).format("YYYY-MM-DD")}</small><br /> */}
                                                <small>{moment(item?.created, "YYYY-MM-DD hh:mm:A").format("hh:mm A")}</small>
                                            </div>
                                            <div className="reader_list_footer_btns">
                                                <Button className="ignored" onClick={()=>submitFun(0,item?.id,"question")}>Ignore</Button>
                                                <Button className="answer" onClick={()=>submitFun(2,item?.id,"question")}>Answer</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    
                                )
                            }):<div className="no_found"><p>No Records Found</p></div>
                          }
                      </>
                    }
                  </div>
                </div>
                <div className="speaker_zone_right_div">
                  <div className="answered">
                    <div class="webinar-top-sec d-flex justify-content-between align-center">
                      <div class="top-heading">
                          <h4>Answered | <span>{data?.answer?.length}</span> </h4>
                      </div>
                      {/* <div class="webinar-top-btn answered">
                          <span class="btn default-side-buttons">{data?.answer?.length}</span>                                                             
                      </div> */}
                    </div>
                     <div className="speaker-zone-listed">
                      {
                        apiCallStatus?.answer ?
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
                          {
                            data?.answer.length?data?.answer.map((item,index) =>{
                                return (
                                    <div className="reader_list" key={index}>
                                        <div className="detail-box">  
                                          <div class="d-flex justify-content-between align-items-center">
                                            <p className="user_name">{item?.send_by == 1 ? "Octapharma" : item?.name ? item?.name : "Anonymous"}</p>
                                            {/* <div className="specialty">Specialty</div> */}
                                            </div>
                                            <div className="user-question">
                                              <p dangerouslySetInnerHTML={{__html: item?.question}}></p>
                                              {
                                                  item?.reply && item?.reply != "" ?
                                                  <div className="speaker_reply"><p dangerouslySetInnerHTML={{__html: "Reply by Octapharma: " + item?.reply}}></p></div>
                                                  : null
                                              }
                                            </div>
                                            <div className="reader_list_footer d-flex justify-content-between align-items-center answer-footer" >
                                                <div className="question-post-time">
                                                  {/* <small>{moment(item?.updated).format("YYYY-MM-DD")}</small><br/> */}
                                                    <small>{moment(item?.updated, "YYYY-MM-DD hh:mm:A").format("hh:mm A")}</small>
                                                </div>
                                                <div className="reader_list_footer_btns">
                                                    <Button onClick={()=>submitFun(1,item?.id,"answer")}>Undo</Button>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                )
                            }):<div className="no_found"><p>No Records Found</p></div>
                          }
                        </>
                      }
                    </div>
                  </div>
                  <div className="ignored">
                    <div class="webinar-top-sec d-flex justify-content-between align-center">
                        <div class="top-heading">
                            <h4>Ignored | <span>{data?.ignre?.length}</span></h4>
                        </div>
                        {/* <div class="webinar-top-btn ignored">
                            <span class="btn default-side-buttons">{data?.ignre?.length}</span>                                                             
                        </div> */}
                    </div>
                     <div className="speaker-zone-listed">
                      {
                        apiCallStatus?.ignored ?
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
                          {
                            data?.ignre.length?data?.ignre.map((item,index) =>{
                                return (
                                    <div className="reader_list"  key={index}>
                                        <div className="detail-box">  
                                            <div class="d-flex justify-content-between align-items-center">
                                              <p className="user_name">{item?.send_by == 1 ? "Octapharma" : item?.name ? item?.name : "Anonymous"}</p>
                                              {/* <div className="specialty">Specialty</div> */}
                                              </div>
                                            <div className="user-question">
                                            <p dangerouslySetInnerHTML={{__html: item?.question}}></p>
                                            {
                                                item?.reply && item?.reply != "" ?
                                                <div className="speaker_reply"><p dangerouslySetInnerHTML={{__html: "Reply by Octapharma: " + item?.reply}}></p></div>
                                                : null
                                            }
                                            </div>
                                            <div className="reader_list_footer d-flex justify-content-between align-items-center ignore-footer" >
                                                <div className="question-post-time">
                                                  {/* <small>{moment(item?.updated).format("YYYY-MM-DD")}</small><br/> */}
                                                  <small>{moment(item?.updated, "YYYY-MM-DD hh:mm:A").format("hh:mm A")}</small>
                                                </div>
                                                <div className="reader_list_footer_btns">
                                                    <Button onClick={()=>submitFun(1,item?.id,"ignore")}>Undo</Button>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                )
                            }):<div className="no_found"><p>No Records Found</p></div>
                          }
                        </>
                      }
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};

export default SpeakerZone;
