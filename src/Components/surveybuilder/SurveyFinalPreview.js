import React, { useState, useRef } from "react";
import SurveyPreview from "./SurveyComponents/SurveyPreview";
import { useLocation, useNavigate } from "react-router-dom";
import { Col } from "react-bootstrap";
import { saveAsDraft } from "./CommonFunctions/CommonFunction";
import { updateLiveFlag } from "./CommonFunctions/CommonFunction";


const SurveyFinalPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const surveyRef = useRef(null);
  const nextHandler =async (e) => {
      e.preventDefault();
      // navigate("/survey/survey-list");
     
  };
  const navigateFunction=async(e)=>{
    e.preventDefault()
    await saveAsDraft(e, 1, location.pathname, navigate);
    navigate("/survey/survey-list");
  }
  return (
    <Col className="right-sidebar custom-change survey-builder">
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="survey-engine d-flex w-100">
              <SurveyPreview
                surveyRef={surveyRef}
                isEdit={false}
                nextHandler={nextHandler}
                navigateFunction={navigateFunction}
              />
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default SurveyFinalPreview;
