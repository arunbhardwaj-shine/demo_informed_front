import React, { useState, useRef } from "react";
import SurveyPreview from "./SurveyComponents/SurveyPreview";
import { useLocation, useNavigate } from "react-router-dom";
import { Col } from "react-bootstrap";
import { saveAsDraft } from "./CommonFunctions/CommonFunction";
import { useSelector, useDispatch, connect } from "react-redux";
import { getSurveyData } from "../../actions";
import { updateLiveFlag } from "./CommonFunctions/CommonFunction";
var surveyValues = {};

const SurveyFinalPreview = () => {

  const consentOption = surveyValues?.surveyConfigData?.survey_consent;
  console.log(consentOption,"from survey final preview")
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
               consentOption={consentOption}
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


const mapStateToProps = (state) => {
  surveyValues = state?.getSurveyData;
  return state;
};

export default connect(mapStateToProps, { getSurveyData: getSurveyData })(
  SurveyFinalPreview
);



