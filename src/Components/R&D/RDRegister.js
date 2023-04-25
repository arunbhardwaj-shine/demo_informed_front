import React, { useState, useRef, useEffect } from 'react'
import { Button, Col, Container, Form, ModalTitle, Row, Modal } from 'react-bootstrap'
import { ENDPOINT } from "../../axios/apiConfig";
import { postData } from "../../axios/apiHelper";
import { loader } from "../../loader";
import Select from "react-select";
import axios from "axios";

const RDRegister = () => {
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getData();
  });

  const getData = async () => {
      loader("show");
      try {
        let body = {
          user_id: "56Ek4feL/1A8mZgIKQWEqg==",
        };
        await axios
          .post(ENDPOINT.FILTERLIST)
          .then((response) => {
            console.log(response?.data?.response?.data);
          });
          loader("hide");
      }catch(err){
        console.log(err);
        loader("hide");
      }
  };

  return (
    <>
    <div className="rd-main-wrapper">
        <Container>
            <div className="container-sm">
                <div className="header-sec">
                    <div className="header-left">
                        <span>Welcome to </span>
                        <h1>LEX-210 <span>Study</span></h1>
                    </div>
                    <div className="header-right">
                        <p>Study of in <img className="text-img" src={path_image + "text-img.png"} alt="text-img"/>
                          Patients With Acute Major Bleeding on DOAC Therapy With Factor Xa Inhibitor</p>
                    </div>
                </div>
                <div className="form-wrapper">
                    <div className="form-head-sec">
                        <h3>
                            Access is only for Study participants. Please check your details and give your consent for
                            Octapharma to track your engagement with the content provided.
                        </h3>
                    </div>
                    <Form className="form">
                        <Row>
                            <Col md={6}>
                                <div className="form-group">
                                    <label>Name <span>*</span></label>
                                    <input type="text" placeholder="Enter your name"/>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="form-group">
                                    <label>Email <span>*</span></label>
                                    <input type="email" placeholder="Enter your email"/>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="form-group">
                                    <label>Country <span>*</span></label>
                                    {/* <div className="select">
                                        <div className="selectBtn" data-type="firstOption">Select country
                                        </div>
                                        <div className="selectDropdown" style={{zIndex:"1"}}>
                                            <div className="scrollbar" id="style-1">
                                                <div className="force-overflow">
                                                    <div className="option" data-type="firstOption">India</div>
                                                    <div className="option" data-type="secondOption">Canada</div>
                                                    <div className="option" data-type="thirdOption">USA</div>
                                                    <div className="option" data-type="thirdOption">UK</div>
                                                    <div className="option" data-type="thirdOption">New Zealand</div>
                                                    <div className="option" data-type="thirdOption">Australia</div>
                                                    <div className="option" data-type="thirdOption">Russia</div>
                                                    <div className="option" data-type="thirdOption">New York</div>
                                                    <div className="option" data-type="firstOption">India</div>
                                                    <div className="option" data-type="secondOption">Canada</div>
                                                    <div className="option" data-type="thirdOption">USA</div>
                                                    <div className="option" data-type="thirdOption">UK</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    <Form.Select aria-label="Default select example">
                                      <option>Open this select menu</option>
                                      <option value="1">One</option>
                                      <option value="2">Two</option>
                                      <option value="3">Three</option>
                                      <option value="firstOption">India</option>
                                      <option value="secondOption">Canada</option>
                                      <option value="thirdOption">USA</option>
                                      <option value="thirdOption">UK</option>
                                      <option value="thirdOption">New Zealand</option>
                                      <option value="thirdOption">Australia</option>
                                      <option value="thirdOption">Russia</option>
                                      <option value="thirdOption">New York</option>
                                      <option value="firstOption">India</option>
                                      <option value="secondOption">Canada</option>
                                      <option value="thirdOption">USA</option>
                                      <option value="thirdOption">UK</option>
                                    </Form.Select>

                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="form-group">
                                    <label>Site number <span>*</span></label>
                                    <input type="text" placeholder="Enter your site number"/>
                                </div>
                            </Col>
                        </Row>
                        <div className="submit-btn">
                            <Button className='btn btn-filled' onClick={handleShow} role="button">Submit</Button>
                        </div>
                    </Form>
                </div>
                <div className="footer-content">
                    <p>This content is for invited healthcare professionals only. Please do not share this link with
                        anybody else.</p>
                    <div className="footer-logo">
                        <img src={path_image + "octapharma-footer-logo.png"} alt="footer-logo"/>
                    </div>
                </div>
            </div>
        </Container>
        <Modal show={show} onHide={handleClose} className='success_modal'>
          <div className='modal-wrapper'>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
              <img alt="popup-img" src={path_image + "popup-img.png"}/>
                <h3 className="popup-title" id="exampleModalCenterTitle">Thank You For Register Here.</h3>
            </Modal.Body>
          </div>
        </Modal>
        {/* <div className="modal fade" id="exampleModalToggle" aria-labelledby="exampleModalToggleLabel" tabindex="-1"
            style={{display: "none"}} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-wrapper">
                    <div className="modal-content">
                        <div className="modal-header">
                            <img alt="popup-img" src={path_image + "popup-img.png"}/>
                            <h3 className="popup-title" id="exampleModalCenterTitle">Thank You </h3>
                        </div>
                        <div className="modal-body">
                        </div>
                        <div className="modal-footer">
                            <button className="popup-btn" data-bs-target="#exampleModalToggle2"
                                data-bs-toggle="modal">Continue</button>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}
    </div>
    </>
  )
}

export default RDRegister
