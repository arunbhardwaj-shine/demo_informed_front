import React from "react";
import {
  Col,
  Row
} from "react-bootstrap";
import RenderPdf from "./CreateChange/RenderPdf";

const SpcRender = () => {
  // const { state } = useLocation();
  const state = JSON.parse(localStorage.getItem('spc_state'));
 
  const handleNext =(obj) => {
    console.log(obj);
  }
  return (
    <>
    <Col className="right-sidebar">
      <div className="custom-container">
      <Row>
        <div className="page-top-nav">
           <Row className="justify-content-end align-items-center">
              <Col sm={12}>
                 <div className="header-btn-left page-title d-flex">
                   
                  <h2>
                    {
                      state?.title && typeof state?.title !== "undefined"
                      ?  state?.title
                      : null
                    }
                  </h2>
                </div>
              </Col>
           </Row>
        </div>
      <div className="create-change-content spc-content">
        <div className="form_action">
          <Row>
            <Col className="sublink_right preview-content d-flex flex-column">
                {
                  state?.file && typeof state?.file !== "undefined"
                  ?
                  <RenderPdf
                    next = "0"
                    url= {state?.file}
                    handleNext ={handleNext}
                    hidePopup = "1"
                  />
                  : null
                }
            </Col>
          </Row>
        </div>
      </div>
    </Row>
  </div>
  </Col>
    </>
  )}

export default SpcRender
