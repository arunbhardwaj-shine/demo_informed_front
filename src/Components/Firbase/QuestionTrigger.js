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
  import { collection, query, where, onSnapshot } from "firebase/firestore";
import { loader } from "../../loader";

const QuestionTrigger = () =>{
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);  
    const [eventId,setEvent] = useState(0)
    const q = query(collection(db, "chat"),where("event_id","==",eventId))
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
    const [count,setCount] = useState(0)
    onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(doc.data()){
              if(count != doc.data()?.questionTrigger){
                setCount(doc.data()?.questionTrigger)
              }
            }
        });  
     })
    const initialFun = async() =>{
        try{
          const result = await postData(ENDPOINT.QUESTION_ANSWER,{
                "companyId":1506,
                "eventId":eventId
             })
             setData({
                question:result?.data?.data?.question,
                answer:result?.data?.data?.answer,
                ignre:result?.data?.data?.ignore 
             })
        }catch(err){

        }
    }
    const submitFun = async(data,id) =>{
        try{
            loader("show")
            const result = await postData(ENDPOINT.QUESTION_UPDATE,{
                "userAnswer":data,
                "id":id,
                "eventId":eventId
             })
             console.log("->",result)
             loader("hide")
        }catch(err){
            loader("hide")
            console.log("-err",err)
        }

    }
    useEffect(()=>{
        initialFun()
    },[count,eventId])

    return (
        <Container>
        <Row>
          <Col md={4}>
            {
                data?.question.length?data.question.map(item =>{
                    return (
                        <div>
                         <input type="text" />
                            <div>
                            <Button onClick={()=>submitFun(0,item?.id)}>Ignore</Button>
                            <Button onClick={()=>submitFun(2,item?.id)}>Answer</Button>
                            </div>
                        </div>
                    )
                }):<h1>No Records Found</h1>
            }
          </Col>
          <Col md={4}>{
                data?.answer.length?data?.answer.map(item =>{
                    return (
                        <div>
                         <input type="text" />
                            <div>
                            <Button onClick={()=>submitFun(1,item?.id)}>Undo</Button>
                            </div>
                        </div>
                    )
                }):<h1>No Records Found</h1>
            }</Col>
          <Col md={4}>{
                data?.ignre.length?data?.ignre.map(item =>{
                    return (
                        <div>
                         <input type="text" />
                            <div>
                            <Button onClick={()=>submitFun(1,item?.id)}>Undo</Button>
                            </div>
                        </div>
                    )
                }):<h1>No Records Found</h1>
            }</Col>
        </Row>
      </Container>
    )
}
export default QuestionTrigger