import React, { useState, useRef } from "react";
import SurveyPreview from "./SurveyComponents/SurveyPreview";
import { useLocation, useNavigate } from "react-router-dom";
import { Col } from "react-bootstrap";
import { saveAsDraft } from "./CommonFunctions/CommonFunction";
import { useSelector, useDispatch, connect } from "react-redux";
import { getSurveyData } from "../../actions";
import { updateLiveFlag } from "./CommonFunctions/CommonFunction";
import { toast } from "react-toastify";

var surveyValues = {};

const SurveyFinalPreview = () => {
  const { elements } = useSelector((state) => state.surveyData);
  const consentOption = surveyValues?.surveyConfigData?.survey_consent;
 
  const navigate = useNavigate();
  const location = useLocation();
  const surveyRef = useRef(null);
  const nextHandler =async (e) => {
      e.preventDefault();
      // navigate("/survey/survey-list");
  };
  const navigateFunction=async(e)=>{
    e.preventDefault()

    const result = elements.filter((item) => {
      return item.accordionType === "questionTypes";
    });
    if (result.length <= 0) {
      toast.warning("Please add at least one question");
      return;
    }
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



