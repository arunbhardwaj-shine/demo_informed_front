import React,{useState} from "react"
import { Col, Row, Button, Modal, Form } from "react-bootstrap";
import {Validation} from "./Validation"
import { useNavigate } from "react-router-dom";
import { loader } from "../loader";
import { postData } from "../axios/apiHelper";
import { ENDPOINT } from "../axios/apiConfig";
const ChangePassword = () =>{
    const [user,setUser] = useState({})
    const [error,setError] = useState({})
    const [enable,setEnable] = useState({})
    const navigate = useNavigate()


    const handleChange = (setState)=>(e) =>{
        setState((previousData) =>({
           ...previousData, [e.target.name]:e.target.value
        }))
    }
    const handleSubmit = async()=>{
          try{
            const errorResult = Validation(user)
            if(Object.keys(errorResult)?.length){
                setError(errorResult)
                return
            }
           loader("show")
           await postData(ENDPOINT.CHANGE_PASSWORD,user)
           loader("hide")
           navigate("/home")
          }catch(err){
            loader("hide")
            console.log("- imher",err)
          }
         
    }
    const handleDisplay = (data)=>{
      let newObj = {...enable}
       if(newObj[data]){
          delete newObj[data]
          setEnable(newObj)
       }
       else{
        setEnable({...newObj,[data]:1})
       }
    }
    return (
        <Col className="right-sidebar custom-change">
        <div className="custom-container">
          {/* <Row> */}
            <div className="create-reader create-change-content reader_added">
              <div className="form_action">
                <div className="row">
                  <Col md="7">
                    <Form.Group className="form-group">
                      <Form.Label htmlFor="">
                        Old Password<span>*</span>
                      </Form.Label>
                      <input
                        type={enable["oldPassword"]?"text":"password"}
                        placeholder="Old Password"
                        className={
                            error?.oldPassword
                              ? "form-control error"
                              : "form-control"
                          }
                        onChange={handleChange(setUser)}
                        name="oldPassword"
                      />
                      <button onClick={()=>handleDisplay("oldPassword")}>
                       show
                      </button>
                        {error?.oldPassword ? (
                        <div className="login-validation">
                          {error?.oldPassword}
                        </div>
                        ):""}
                    </Form.Group>

                    <Form.Group className="form-group">
                      <Form.Label htmlFor="">New Password <span>*</span></Form.Label>
                      <input
                        type={enable["newPassword"]?"text":"password"}
                        placeholder="New Password"
                        className={
                            error?.newPassword
                              ? "form-control error"
                              : "form-control"
                          }
                        onChange={handleChange(setUser)}
                        name="newPassword"
                      />
                       <button onClick={()=>handleDisplay("newPassword")}>
                       show
                      </button>
                       {error?.newPassword ? (
                        <div className="login-validation">
                          {error?.newPassword}
                        </div>
                        ):""}
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label htmlFor="">Confirm Password<span>*</span></Form.Label>
                      <input
                        type={enable["confirmPassword"]?"text":"password"}
                        placeholder="Confirm Password"
                        className={
                            error?.confirmPassword
                              ? "form-control error"
                              : "form-control"
                          }
                        onChange={handleChange(setUser)}
                        name="confirmPassword"
                      />
                      <button onClick={()=>handleDisplay("confirmPassword")}>
                       show
                      </button>
                      {error?.confirmPassword ? (
                        <div className="login-validation">
                          {error?.confirmPassword}
                        </div>
                        ):""}
                    </Form.Group>
                    <button
                      className="btn btn-primary btn-filled"
                      onClick={handleSubmit}
                       >
                      Submit
                    </button>
                  </Col>
                </div>
              </div>
            </div>
          {/* </Row> */}
        </div>
        </Col>
    )
  
}
export default ChangePassword