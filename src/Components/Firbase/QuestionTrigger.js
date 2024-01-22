import React,{useState,useEffect} from "react"
import {
    Col,
    Container,
    Row,
    Button,
  } from "react-bootstrap";
  import { useLocation } from 'react-router-dom';
  import { postData } from "../../axios/apiHelper";
  import { ENDPOINT } from "../../axios/apiConfig";
  import {db} from "../../config/firebaseConfig"
  import { collection, query, where, onSnapshot,orderBy,limit } from "firebase/firestore";
  import moment from "moment"
  import { loader } from "../../loader";

const QuestionTrigger = () =>{
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);  
    const [eventId,setEvent] = useState({
        id:0,
        companyId:0
    })
    const [count,setCount] = useState(0)

    const q = query(collection(db, "chat"),where("event_id","==",eventId?.id),where("company_id","==",eventId?.companyId),where("webinar","!=",0))
    const [data,setData] = useState({
        question:[],
        answer:[],
        ignre:[]
    })

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
    useEffect(()=>{
        EventDataFun()
    },[])
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
        //    loader("show")
          const result = await postData(ENDPOINT.QUESTION_ANSWER,{
                "companyId":eventId?.companyId,
                "eventId":eventId?.id
             })
             setData({
                question:result?.data?.data?.question,
                answer:result?.data?.data?.answer,
                ignre:result?.data?.data?.ignore 
             })
            //  loader("hide")
        }catch(err){
            // loader("hide")
            console.log("-er",err)
        }
    }
    const submitFun = async(data,id) =>{
        try{
            loader("show")
            await postData(ENDPOINT.QUESTION_UPDATE,{
                "userAnswer":data,
                "id":id,
                "eventId":eventId?.id,
                "companyId":eventId?.companyId
             })
             loader("hide")
        }catch(err){
            loader("hide")
            console.log("-err",err)
        }

    }
    useEffect(()=>{
        if(count>0){
            initialFun()
        }
           
        
    },[count])

    return (
        <div className="webinar-question-box">
            <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
        <Container>
            <div className="webinar-question-results webinar_tabs_show">
        <Row>
          <Col md={4}>
            <div class="webinar-top-sec d-flex justify-content-between align-items-center">
                    <div class="top-heading">
                        <h4>Questions:</h4>
                    </div>
                    <div class="webinar-top-btn question">
                        <span class="btn default-side-buttons">{data?.question?.length}</span>                                                             
                    </div>
            </div>
            {
                data?.question.length?data.question.map((item,index) =>{
                                        return (
                    <div className="reader_list" key={index}>
                        <div className="detail-box">  
                            <p className="user_name">Name: {item?.send_by == 1 ? "Octapharma" : item?.name ? item?.name : "Anonymous"}</p>
                            <div className="user-question">
                                <p>{item?.question}</p>
                            </div>
                            <div className="reader_list_footer d-flex justify-content-between align-items-center" >
                                <div className="question-post-time">
                                    <small>{moment(item?.created).format("YYYY-MM-DD")}</small><br />
                                    <small>{moment(item?.created).format("HH:mm a")}</small>
                                </div>
                                <div className="reader_list_footer_btns">
                                    <Button className="ignored" onClick={()=>submitFun(0,item?.id)}>Ignore</Button>
                                    <Button className="answer" onClick={()=>submitFun(2,item?.id)}>Answer</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                        
                    )
                }):<h6 className="no-found">No Records Found</h6>
            }
          </Col>
          <Col md={4}>
                <div class="webinar-top-sec d-flex justify-content-between align-center">
                    <div class="top-heading">
                        <h4>Answered:</h4>
                    </div>
                    <div class="webinar-top-btn answered">
                        <span class="btn default-side-buttons">{data?.answer?.length}</span>                                                             
                    </div>
            </div>
            {
                data?.answer.length?data?.answer.map((item,index) =>{
                    return (
                        <div className="reader_list" key={index}>
                            <div className="detail-box">  
                                <p className="user_name">Name: {item?.send_by == 1 ? "Octapharma" : item?.name ? item?.name : "Anonymous"}</p>
                                <div className="user-question">
                                    <p>{item?.question}</p>
                                </div>
                                <div className="reader_list_footer d-flex justify-content-between align-items-center answer-footer" >
                                    <div className="question-post-time">
                                       <small>{moment(item?.updated).format("YYYY-MM-DD")}</small><br/>
                                        <small>{moment(item?.updated).format("HH:mm a")}</small>
                                    </div>
                                    <div className="reader_list_footer_btns">
                                        <Button onClick={()=>submitFun(1,item?.id)}>Undo</Button>
                                    </div>
                                </div>
                            </div>
                    </div>
                    )
                }):<h6 className="no-found">No Records Found</h6>
            }</Col>
          <Col md={4}>
            <div class="webinar-top-sec d-flex justify-content-between align-center">
                    <div class="top-heading">
                        <h4>Ignored:</h4>
                    </div>
                    <div class="webinar-top-btn ignored">
                        <span class="btn default-side-buttons">{data?.ignre?.length}</span>                                                             
                    </div>
            </div>
            {
                data?.ignre.length?data?.ignre.map((item,index) =>{
                    return (
                        <div className="reader_list"  key={index}>
                            <div className="detail-box">  
                                <p className="user_name">Name: {item?.send_by == 1 ? "Octapharma" : item?.name ? item?.name : "Anonymous"}</p>
                                <div className="user-question">
                                <p>{item?.question}</p>
                                </div>
                                <div className="reader_list_footer d-flex justify-content-between align-items-center ignore-footer" >
                                    <div className="question-post-time">
                                      <small>{moment(item?.updated).format("YYYY-MM-DD")}</small><br/>
                                      <small>{moment(item?.updated).format("HH:mm a")}</small>
                                    </div>
                                    <div className="reader_list_footer_btns">
                                        <Button onClick={()=>submitFun(1,item?.id)}>Undo</Button>
                                    </div>
                                </div>
                            </div>
                    </div>
                    )
                }):<h6 className="no-found">No Records Found</h6>
            }</Col>
        </Row>
        </div>
      </Container>
      </div>
    )
}
export default QuestionTrigger