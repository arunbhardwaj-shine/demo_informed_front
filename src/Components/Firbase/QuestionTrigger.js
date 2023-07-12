import React,{useState,useEffect} from "react"
import {
    Col,
    Container,
    Row,
    Button,
  } from "react-bootstrap";
  import { postData } from "../../axios/apiHelper";
  import { ENDPOINT } from "../../axios/apiConfig";
  import {db} from "../../config/firebaseConfig"
  import { collection, query, where, onSnapshot } from "firebase/firestore";

const QuestionTrigger = () =>{
    const q = query(collection(db, "chat"),where("event_id","==",136))
    const [data,setData] = useState({
        question:[],
        answer:[],
        ignre:[]
    })
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
                "eventId":136
             })
             setData({
                question:result?.data?.data?.question,
                answer:result?.data?.data?.answer,
                ignre:result?.data?.data?.ignore 
             })
        }catch(err){

        }
    }
    useEffect(()=>{
        initialFun()
    },[count])

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
                            <Button>Ignore</Button>
                            <Button>Answer</Button>
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
                            <Button>Ignore</Button>
                            <Button>Answer</Button>
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
                            <Button>Ignore</Button>
                            <Button>Answer</Button>
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