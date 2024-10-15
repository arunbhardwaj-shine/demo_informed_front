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
 
  const navigate = useNavigate();

  const menuRef = useRef(null);
  const surveyRef = useRef(null);

  const nextHandler = async (e) => {
    e.preventDefault();
    try {


      //Romove the text from the keys for corresponding  if (description,alloftheabove,other and isOptional ) any of them false 
      const filteredSuvryQuestion = await elements.map((item) => {
        if (item.accordionType === "questionTypes") {
            // Ensure item.extra is defined
            item.extra = item.extra || {};
    
            // Clear labels if conditions are met 
            if ((item.type === "multiple" || item.type === "checkbox")) {

              if(!item.addOtherChoice){
                item.extra.otherChoiceLabel = "";
                item.extra.otherChoicePlaceholderText = "";

              }
              //clear alloftheabove label
                if (item.type === "checkbox" && !(item.extra.addAllOfTheAbove)) {
                  console.log("inside all of the above")
                  item.extra.allOfTheAboveLabel = "";
              }
            }
    
            return {
                ...item,
                optionalLabel: item.isOptional ? item.optionalLabel : "",
                questionDescription: item.questionDescriptionEnabled
                    ? item.questionDescription
                    : "",
            }; //return after removing labels 
        }
        return item; //return if item do no contain accordion as questiontypes
    });
    

      const updatedSurveyData = {
        ...surveyValues,
        question_data: filteredSuvryQuestion,
      }; //preparing the final paylaod to store in localStorage

      props.getSurveyData(updatedSurveyData); //insert questiondata into loaclStorage
    } catch (error) {
      loader("hide");
      toast.error("Something went wrong");
    }
  };

  const navigateFunction = () => {
    const result = elements.filter((item) => {
      return item.type === "consent";
    });
    if (
      consentOption !== "No consent needed (anonymous)" &&
      result.length <= 0
    ) {
      toast.warning("Please add consent in the survey");
      return;
    }
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
