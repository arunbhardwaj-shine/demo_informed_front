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
  const [siteCountry, setSiteCountry] = useState([]);
  const [siteNumber, setSiteNumber] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getData = async () => {
      loader("show");
      try {
        let body = {
          user_id: "56Ek4feL/1A8mZgIKQWEqg==",
        };
        await axios
          .post(ENDPOINT.FILTERLIST, body)
          .then((response) => {
            let site_number = response?.data?.response?.data?.site_number;
            let country = response?.data?.response?.data?.country;

            let siteNumber = [], siteCountries = [];
            Object.entries(site_number).map(([index, item]) => {
              let label = item;
              siteNumber.push({
                value: item,
                label: label,
              });
            });

            Object.entries(country).map(([index, item]) => {
              let label = item;
              if (index == "B&H") {
                label = "Bosnia and Herzegovina";
              }
              siteCountries.push({
                value: item,
                label: label,
              });
            });

              setSiteCountry(siteCountries);
              setSiteNumber(siteNumber);
              loader("hide");
          });
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
                <div className="header-sec d-flex">
                    <div className="header-left">
                        <span>Welcome to </span>
                        <h1>LEX-210 <span>Study</span></h1>
                    </div>
                    <div className="header-right">
                        <p>Study of <img className="text-img" src={path_image + "text-img.png"} alt="text-img"/>
                          in Patients With Acute Major Bleeding on DOAC Therapy With Factor Xa Inhibitor</p>
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
                            <Col md={6} className='d-flex justify-content-end'>
                                <div className="form-group">
                                    <label>Email <span>*</span></label>
                                    <input type="email" placeholder="Enter your email"/>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="form-group">
                                  <label>Country <span>*</span></label>
                                  {
                                    typeof siteCountry !== "undefined" && siteCountry.length > 0 ?
                                    <Select
                                      options={siteCountry}
                                      placeholder="Select country"
                                      className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                    />
                                    : null
                                  }
                                </div>
                            </Col>
                            <Col md={6} className='d-flex justify-content-end'>
                                <div className="form-group">
                                    <label>Site number <span>*</span></label>
                                    {
                                      typeof siteNumber !== "undefined" && siteNumber.length > 0 ?
                                      <Select
                                        options={siteNumber}
                                        placeholder="Select site number"
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                      />
                                      : null
                                    }
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
        <Modal show={show} onHide={handleClose} className='success_modal' centered>
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
