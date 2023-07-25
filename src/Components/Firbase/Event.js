import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { postData } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import EventModel from "../../Model/EventModel";
import Cookies from 'js-cookie';
import DisplayAnswer from "../../Model/DisplayAnswer";
import "./custom.css"
import { loader } from "../../loader";
import "./style.css"
import {db} from "../../config/firebaseConfig"
const Event = () =>{
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);   
    const [eventId,setEvent] = useState({
        id:0
    })
    const q = query(collection(db, "chat"), where("triggered", '!=', 0),where("event_id","==",eventId?.id));
    const [data,setData] = useState(0)
    const [show,setShow] = useState(false)
    const [apiData,setApiData] = useState([])
    const [answerPop,setAnswerPopup] = useState(false)

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
  
    const [value,setValue] = useState({})
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
            return 
        }else if(!eventQuestion?.includes(newData?.question_id) && newData?.triggered == 2){
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
        }else{
            if(show){
                setShow(false)
             }
             if(answerPop){
                setAnswerPopup(false)
             }
             setValue({})
             setData(0)
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
      }
    })
    const handleEvent = async() =>{
        try{
            if(data == 1){
                if(Object.keys(value)?.length){
                    const result = await postData(ENDPOINT.WEBINAR_QUESTION,{
                          eventId:value?.event_id,
                          companyId:value?.question_id
                      })
                      setApiData(result?.data?.data)
                      setShow(true)
                      setAnswerPopup(false)
      
                  }
            }else if(data == 2){
                    const result = await postData(ENDPOINT.POLL_ANSWER,{
                          eventId:value?.event_id,
                          companyId:value?.question_id
                      })
                      setApiData(result?.data?.data)
                      setAnswerPopup(true)
                      setShow(false)
            }
           
       
        }catch(err){
            console.log("-er",err)
        }
    }
    useEffect(()=>{
    let events =  Cookies.get('events');
        if(!events){
            const random = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
            const timestamp = new Date().getTime();
            const expirationDate = new Date();
            expirationDate.setFullYear(expirationDate.getFullYear() + 1);
            Cookies.set('events', `${timestamp}${random}`, { expires: expirationDate  });
        }
      handleEvent()
    },[data])

    return (
        <>
 <meta name="viewport" content="width=device-width, initial-scale=1" />
 <div className="octa_events">
      <div class="container">

<div class="question-block">
    <div class="header-logo">
       
        <div><img src="https://webinar.docintel.app/EAHAD2022/images/Octapharma_blue.png" /></div>
       
    </div>
    <div class="question-block-form">

        <div class="log-inner">
        <div class="head-sec">
         <h2 class="top-title">Escribe tu pregunta aqui!</h2>
                <div class="under-spotlight"><img src="https://webinar.docintel.app/Event/chat/image/octa-academy-register.png" alt="Logo" /></div>
            <div class="head_desc">
           </div>
            </div>

        </div>
        <form >
            <input type="hidden" class="form-control" id="guest_id" name="guest_id" value="lji3sjpsdc21tux2st" />
                                    
            <div class="row">
                <div class="col-md-12">
                    <label for="fname" class="form-label">Nombre <i><small>(Opcional)</small></i></label>
                    <input type="text" id="name" class="form-control" placeholder='Escriba su nombre' name="name" />
                    <input type="hidden" class="form-control" value = "387" name="eventId" />
                    <input type="hidden" class="form-control" value = "2147494217" name="companyId" />
                    <input type="hidden" class="form-control" value = "Pregunta enviada con éxito" name="succ_message" />
                    <input type="hidden" class="form-control" value = "Por favor ingrese el mensaje" name="err_message" />
                    <input type="hidden" class="form-control" value = "index.php?evnt=octa-academy-2023" name="page" />
                </div>
                     <div class="col-md-12">
                    <label for="question" class="form-label">Tu pregunta<sup>*</sup></label>
                    <textarea name="question" id="question" class="form-control" placeholder="Escriba su pregunta"  cols="40" rows="4"></textarea>
                      </div>
                <div class="col-md-12">
                    <input type="submit" class="btn btn-success" value="ENVIAR" />
                </div>
            </div>
        </form> 
        <div class="copy-right-bottom-text">
            <p>Fecha de preparación: el julio 2023</p>
        </div>
    </div>
</div>
</div>
<div class="modal fade" id="pollModel" role="dialog" >
<div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
        <div class="modal-header">
            <img src="../webinar-assets/images/octa-logo.svg" class="modal-title" width="210" />
            <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body" id='poll-content'>
        </div>
        <div class="modal-footer">
            {/* <!--<button type="button" id="submitPollAnswer" class="submit_btn btn-primary" >Submit</button>--> */}
            <button type="submit" name="cpd_tab" id="submitPollAnswerGuest"  class="submit_btn btn-primary" title="Submit">Submit</button>
            {/* <!-- <button type="button" class="btn btn-default"  onclick="closePollPopup()">Close</button>--> */}
        </div>
    </div>
</div>
</div> 

<div class="modal fade" id="pollAnswerModel" role="dialog" >
<div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
        <div class="modal-header">
            <img src="../webinar-assets/images/octa-logo.svg" class="modal-title" width="210" />
            <button type="button" class="close" onclick="closeAnswerModel()">&times;</button>
        </div>
        <div class="modal-body" id='poll-answer-content'>
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="detail-box form_box">
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
<EventModel 
 show={show}
 onClose={setShow}
 data={apiData}
/>

<DisplayAnswer
show={answerPop}
data={apiData}
 onClose={()=>setAnswerPopup(false)}

/>
</div>
        </>
    )
}
export default Event