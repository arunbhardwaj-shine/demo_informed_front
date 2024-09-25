import React, { useEffect, useRef, useState } from "react";
import { Col } from "react-bootstrap";
import SurveyMenu from "./SurveyComponents/SurveyMenu";
import SurveyPreview from "./SurveyComponents/SurveyPreview";
import { loader } from "../../loader";
import { surveyAxiosInstance } from "./CommonFunctions/CommonFunction";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";
import { getSurveyData } from "../../actions";
import { addResQuestions, toggleEditMode } from "../../actions/surveyActions";
import { toast } from "react-toastify";

var surveyValues = {};

const BuildSurvey = (props) => {
  const { elements } = useSelector((state) => state.surveyData);
  const consentOption = surveyValues?.surveyConfigData?.survey_consent;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuRef = useRef(null);
  const surveyRef = useRef(null);

  const nextHandler = async (e) => {
    e.preventDefault();
    try {
      const updatedSurveyData = {
        ...surveyValues,
        question_data: elements,
      };
      props.getSurveyData(updatedSurveyData);
    } catch (error) {
      loader("hide");
      toast.error("Something went wrong");
    }
  };

  const navigateFunction = () => {
    navigate("/survey/thank-you");
  };

  return (
    <Col className="right-sidebar custom-change survey-builder">
      <div className="container-fluid">
        <div className="row">
          <div className="survey-engine d-flex w-100">
            <div className="left-setup">
              <SurveyMenu menuRef={menuRef} consentOption={consentOption} />
            </div>
            <SurveyPreview
              consentOption={consentOption}
              surveyRef={surveyRef}
              isEdit={true}
              nextHandler={nextHandler}
              navigateFunction={navigateFunction}
            />
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
  BuildSurvey
);
