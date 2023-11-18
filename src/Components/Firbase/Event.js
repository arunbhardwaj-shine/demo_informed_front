import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { postData } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import EventModel from "../../Model/EventModel";
import SessionModel from "../../Model/SessionModel";
import Cookies from 'js-cookie';
import DisplayAnswer from "../../Model/DisplayAnswer";
import "./custom.css"
import { loader } from "../../loader";
import "./style.css"
import { v4 as uuid } from 'uuid';


import axios from "axios"
import {db} from "../../config/firebaseConfig"
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const Event = () =>{
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);   
    const [eventId,setEvent] = useState({
        id:0,
        companyId:0
    })
    const [error,setError] = useState({})

    
    const q = query(collection(db, "chat"), where("triggered", '!=', 0),where("event_id","==",eventId?.id));
    const [data,setData] = useState(0)
    const [user,setUser] = useState({})
    const [value,setValue] = useState({})

    const [show,setShow] = useState(false)
    const [sessionShow,setSessionShow] = useState(false)

    const [apiData,setApiData] = useState([])
    const [answerPop,setAnswerPopup] = useState(false)
    const [totalReaders,setTotalReaders] = useState(0)
    const [customAnswer,setCustomAnswer] = useState(0)

    useEffect(()=>{
        EventDataFun()
    },[])
    const EventDataFun = async() =>{
        try{
            loader("show")
            const result = await postData(ENDPOINT.EVENT_ID,{
                 eventCode :queryParams.get("evnt")
            })
            setEvent(result.data.data)
            loader("hide")
        }catch(err){
            loader("hide")
            console.log("-err",err)
        }
    }

    const handleChange = (e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    const handleSubmit = async(e) =>{
        try{
            e.preventDefault();
            if(!user.question.trim()){
              setError({"question": "Please enter your question"})
              return
            }else{
                setError({})  
            }
            loader("show")
            let events =  Cookies.get('events');

            let body = {
                "company_id" : eventId?.companyId,
                "event_id"   : eventId?.id,
                "user_id"    :  2147533104,
                "question"   : user?.question,
                "portal"     : "web",
                "name": user?.name
             };
             await postData(ENDPOINT.ADD_WEBINAR_QUESTION,body)
              if(data){
                setData(0)
              }
              if(show){
                  setShow(false)
               }
               if(Object.keys(value)?.length){
                  setValue({})
               }
               setUser({'question':'','name':''})
             loader("hide")
        }catch(err){
            loader("hide")
            console.log("-err",err)
        }
    }
  
       onSnapshot(q, (querySnapshot) => {
         let newData ={}
        querySnapshot.forEach((doc) => {
            if(doc.data()){
                newData = doc.data()
            }
        });
      if(Object.keys(newData)?.length){

        /* Check already submit question  */
        const eventQuestion = Cookies.get('eventQuestion');
        if(eventQuestion?.includes(newData?.question_id) && newData?.triggered == 1){
            if(data){
                setData(0)
            }
            if(show){
                  setShow(false)
             }
             if(answerPop){
                setAnswerPopup(false)
             }
             if(sessionShow){
                setSessionShow(false)
             }
         
             if(Object.keys(value)?.length){
                  setValue({})
            }
            return 
        }else if(!eventQuestion?.includes(newData?.question_id) && newData?.triggered == 2){
            if(data){
              setData(0)
            }
            if(show){
                setShow(false)
             }
             if(answerPop){
                setAnswerPopup(false)
             }
             if(sessionShow){
                setSessionShow(false)
             }
             if(Object.keys(value)?.length){
                setValue({})
             }
            return 
        }

        if(newData?.triggered == 1 ){
            if(Object.keys(value)?.length){
                if((newData?.question_id != value?.question_id && newData?.event_id != value?.event_id) || newData?.triggered != value?.triggered ){
                    setValue(newData)
                    setData(newData?.triggered)
                }
             }else {
                setValue(newData)
                setData(newData?.triggered)
             }
           
        }else if(newData?.triggered == 2){
            if(Object.keys(value)?.length){
                if((newData?.question_id != value?.question_id && newData?.event_id != value?.event_id) || newData?.triggered != value?.triggered ){
                    setValue(newData)
                    setData(newData?.triggered)
                }
             }else {
                setValue(newData)
                setData(newData?.triggered)
             }
        }else if(newData?.triggered == 3){
            if(Object.keys(value)?.length){
                if((newData?.question_id != value?.question_id && newData?.event_id != value?.event_id) || newData?.triggered != value?.triggered ){
                    setValue(newData)
                    setData(newData?.triggered)
                }
             }else {
                setValue(newData)
                setData(newData?.triggered)
             }
        }
        
        else{
            if(show){
                setShow(false)
             }
             if(answerPop){
                setAnswerPopup(false)
             }
             setValue({})
             setData(0)
             setSessionShow(false)
        }
       
      }else{
        if(show){
            setValue({})
            setData(0)
            setShow(false)
        }
        if(answerPop){
            setAnswerPopup(false)
         }
         setSessionShow(false)

      }
    })
    const handleEvent = async() =>{
        try{
            if(data == 1){
                  if(Object.keys(value)?.length){
                    const result =  await postData(ENDPOINT.SESSION_LIST,{
                        id: value?.question_id
                    })
                  setApiData(result?.data?.data)
                  setAnswerPopup(false)
                   setShow(true)
                //   setSessionShow(true)
                  setData(0)

                    // const result = await postData(ENDPOINT.WEBINAR_QUESTION,{
                    //       eventId:value?.event_id,
                    //       companyId:value?.question_id
                    //   })
                    //   setApiData(result?.data?.data)
                    //   setShow(true)
                    //   setAnswerPopup(false)
                    //   setData(0)
                    //   setSessionShow(false)
      
                  }
            }else if(data == 2){
                    const result = await postData(ENDPOINT.POLL_ANSWER,{
                          eventId:value?.event_id,
                          companyId:value?.question_id
                      })
                      setApiData(result?.data?.data)
                      setTotalReaders(result?.data?.totalReader)
                      setCustomAnswer(result?.data?.custom_answer)
                      setAnswerPopup(true)
                      setShow(false)
                      setData(0)
                      setSessionShow(false)
            }else if(data == 3){
                const result =  await postData(ENDPOINT.SESSION_LIST,{
                        id: value?.question_id
                    })
                  setApiData(result?.data?.data)
                  setAnswerPopup(false)
                  setShow(false)
                  setSessionShow(true)
                  setData(0)
        }
           
       
        }catch(err){
            console.log("-er",err)
        }
    }
    useEffect(()=>{

    let events =  Cookies.get('events');
        if(!events){
            const unique_id = uuid();
            const expirationDate = new Date();
            expirationDate.setFullYear(expirationDate.getFullYear() + 1);
            Cookies.set('events', `${unique_id}`, { expires: expirationDate  });
        }
        if(data){
            handleEvent()
        }
   
    },[data])

    return (
        <>
        <div className="loader" id="custom_loader">
                <div className="loader_show">
                <span className="loader-view"> </span>
                </div>
       </div>
 <meta name="viewport" content="width=device-width, initial-scale=1" />
 <div className="octa_events">
      <div className="container">

<div className="question-block">
    <div className="header-logo">
       
        <div>
            {/* <img src="https://webinar.docintel.app/EAHAD2022/images/Octapharma_blue.png" /> */}
            <img src={path_image+'FVIII_logo.png'} alt="Logo" />
        </div>
       
    </div>
    <div className="question-block-form">

        <div className="log-inner">
        <div className="head-sec">
         <h2 className="top-title">Write your question here!</h2>
                {/*<div className="under-spotlight"><img src={path_image+'FVIII_logo.png'} alt="Logo" /></div> 
             <div className="head_desc">
           </div> */}
            </div>

        </div>
        <form onSubmit={handleSubmit} >
            <input type="hidden" className="form-control" id="guest_id" name="guest_id" value="lji3sjpsdc21tux2st" />
                                    
            <div className="row">
                <div className="col-md-12">
                    <label htmlFor="fname" className="form-label">Name <i><small>(Optional)</small></i></label>
                    <input type="text" id="name" onChange={handleChange} className="form-control" placeholder='Write your name' name="name" value={user?.name} />
                    <input type="hidden" className="form-control" value = "Question submitted successfully" name="succ_message" />
                    <input type="hidden" className="form-control" value = "Please enter message" name="err_message" />
                    <input type="hidden" className="form-control" value = "index.php?evnt=octa-academy-2023" name="page" />
                  </div>
                     <div className="col-md-12">
                    <label htmlFor="question" className="form-label">Your question<sup>*</sup></label>
                     <textarea name="question" id="question" onChange={handleChange} className="form-control" placeholder="Write your question"  cols="40" rows="4" value={user?.question}></textarea>
                     {error?.question?<span className="event-validation">{error?.question}</span>:""}

                      </div>

                <div className="col-md-12">
                    <input type="submit" className="btn btn-success" value="SEND" />
                </div>
            </div>
        </form> 
        <div className="copy-right-bottom-text">
            <p>Preparation date: 7-8 December 2023</p>
        </div>
    </div>
</div>
</div>
<div className="modal fade" id="pollModel" role="dialog" >
<div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
        <div className="modal-header">
            <img src="../webinar-assets/images/octa-logo.svg" className="modal-title" width="210" />
            <button type="button" className="close" data-dismiss="modal">&times;</button>
        </div>
        <div className="modal-body" id='poll-content'>
        </div>
        <div className="modal-footer">
            {/* <!--<button type="button" id="submitPollAnswer" className="submit_btn btn-primary" >Submit</button>--> */}
            <button type="submit" name="cpd_tab" id="submitPollAnswerGuest"  className="submit_btn btn-primary" title="Submit">Submit</button>
            {/* <!-- <button type="button" className="btn btn-default"  onclick="closePollPopup()">Close</button>--> */}
        </div>
    </div>
</div>
</div> 

<div className="modal fade" id="pollAnswerModel" role="dialog" >
<div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
        <div className="modal-header">
            <img src="../webinar-assets/images/octa-logo.svg" className="modal-title" width="210" />
            <button type="button" className="close" onclick="closeAnswerModel()">&times;</button>
        </div>
        <div className="modal-body" id='poll-answer-content'>
            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <div className="detail-box form_box">
                        <p id="questionText"></p>  
                        <div id="container1"></div>
                        <p id="totalCountText"></p>  
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>  
{/* <EventModel 
 show={show}
 onClose={setShow}
 data={apiData}
 eventId={eventId}
/> */}
{
    show &&
    <SessionModel 
    show={show}
    onClose={setShow}
    data={apiData}
    eventData={value}
    />
}

{answerPop && 
<DisplayAnswer
show={answerPop}
data={apiData}
readerCount={totalReaders}
customAnswer = {customAnswer}
 onClose={()=>setAnswerPopup(false)}
/>}
</div>
        </>
    )
}
export default Event