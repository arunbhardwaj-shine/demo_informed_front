import React,{useState,useEffect} from "react"
import {
    Col,
    Container,
    Row,
    Button,
  } from "react-bootstrap";
  import { postData } from "../../axios/apiHelper";
  import { ENDPOINT } from "../../axios/apiConfig";
const QuestionTrigger = () =>{
    const [data,setData] = useState({
        question:[],
        answer:[],
        ignre:[]
    })
    const initialFun = async() =>{
        try{
  
            //  await postData(ENDPOINT.)
        }catch(err){

        }
    }
    useEffect(()=>{

    },[])

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