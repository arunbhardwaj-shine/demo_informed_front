import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { surveyAxiosInstance } from "../CommonFunctions/CommonFunction";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { SidebarItems } from "../surveyObjects/SidebarItems";
import { SidebarCommonItems } from "../surveyObjects/SidebarCommonItems";
import { saveAsDraft } from "../CommonFunctions/CommonFunction";
import {
  emptySurveyReduxStates,
  addElement,
  copyElement,
  setCurrentElementIndex,
  toggleAddClicked,
  deleteElement,
  swapElements,
  addResQuestions,
  addElementAtPosition,
} from "../../../actions/surveyActions";
import { getSurveyData } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import RenderOptions from "./RenderOptions";
import { connect } from "react-redux";
import { loader } from "../../../loader";
import { useNavigate } from "react-router-dom";
import { color } from "highcharts";
import { updateLiveFlag } from "../CommonFunctions/CommonFunction";

var surveyValues = {};
const SurveyPreview = (props) => {
  const { currentElementIndex, elements, isAddClicked } = useSelector(
    (state) => state.surveyData
  );

  const [isChecked, setIsChecked] = useState(false);
  const [specificIndex, setSpecificIndex] = useState("");

  const handleView = () => {
    setIsChecked(!isChecked);
  };
  

  let { surveyRef, isEdit, nextHandler, navigateFunction } = props;

  const custom_html = surveyValues?.formBuilderData?.custom_html?.[0];


  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const survey_id = surveyValues?.survey_id;


  const [templateData, setTemplateData] = useState({
    headerBackground:
      custom_html?.header_background_type == "color"
        ? {
            backgroundColor: custom_html?.header_background_color,
          }
        : {
            backgroundImage: `url(${custom_html?.header_background_image})`,
            backgroundSize: "cover",
          },
    heading: custom_html?.main_heading,
    logo: custom_html?.logo,
    button_color: custom_html?.button_color,
    button_text: custom_html?.button_text,
    bodyTextColor: custom_html?.bodyTextColor,
    question_answer_color: custom_html?.question_answer_color,
    title_color: custom_html?.title_color,
    page_background_color: custom_html?.page_background_color,
    main_footer: custom_html?.main_footer,
    bodyText: custom_html?.bodyText,
    logoWidth:custom_html?.logoWidth
  });

  const [draggedElementIndex, setDraggedElementIndex] = useState(null);
  const handleAddElement = (type) => {
    dispatch(addElement(type));
  };

  const fetchQuestiondetails = async () => {
    try {
      loader("show");
      const fetchResponse = await surveyAxiosInstance.post(
        "/survey/fetch-question",
        { survey_id }
      );

      dispatch(addResQuestions(fetchResponse.data.data));
      const updatedSurveyData = {
        ...surveyValues,
        question_data: fetchResponse.data.data,
      };
      props.getSurveyData(updatedSurveyData);
      loader("hide");
    } catch (error) {
      loader("hide");
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const shouldFetchQuestions =
      survey_id &&
      (surveyValues?.question_data === undefined ||
        surveyValues?.question_data === "" ||
        elements.length === 0);

    if (shouldFetchQuestions) {
      fetchQuestiondetails();
    } else if (surveyValues?.question_data) {
      dispatch(addResQuestions(surveyValues.question_data));
    }
  }, [survey_id, dispatch]);

  const handlePreviewDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    if (type.trim()) {
      handleAddElement(type);
    }
  };

  const handleAddResQuestion = (e, elements) => {
    e.preventDefault();
    dispatch(addResQuestions(elements));
  };

  const handlePreviewDragOver = (e) => e.preventDefault();

  const handleQuestionDragStart = (e, index) => {
    e.stopPropagation();
    setDraggedElementIndex(index);
  };
  const handleQuestionDragOver = (e) => e.preventDefault();

  const handleQuestionDrop = (e, index) => {
    e.preventDefault();
    setSpecificIndex(index);
    if (draggedElementIndex !== null) {
      e.stopPropagation();
      if (draggedElementIndex !== index) {
        dispatch(swapElements(draggedElementIndex, index));
        setDraggedElementIndex(null);
      }
    } else {
      setTimeout(() => {
        dispatch(addElementAtPosition(index));
      });
    }
  };

  const UpdateQuestion = async (questionId) => {
    try {
      loader("show");
      if (questionId != 0) {
        const response = surveyAxiosInstance.post(
          "/survey/delete-survey-question",
          {
            questionId,
          }
        );
 
      }
      loader("hide");
    } catch (error) {
      loader("hide");
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className="top-right-action preview"
      onDrop={handlePreviewDrop}
      onDragOver={handlePreviewDragOver}
    >
      <div className="d-flex flex-column w-100">
        <div className="page-top-nav sticky">
          {isEdit == true ? (
            <Row className="justify-content-end align-items-center">
              <Col md={1}>
                <div className="header-btn-left">
                  <Link
                    className="btn btn-primary btn-bordered back"
                    to={
                      isEdit ? "/survey/survey-configure" : "/survey/thank-you"
                    }
                  >
                    Back
                  </Link>
                </div>
              </Col>
              <Col md={8}>
                <ul className="tabnav-link">
                  <li className="active ">
                    <Link to="/survey/survey-builder">Set-up</Link>
                  </li>
                  <li className="active ">
                    <Link to="/survey/survey-configure">Survey config</Link>
                  </li>
                  <li className={isEdit ? "active active-main" : "active"}>
                    <Link to={isEdit ? "" : "/survey/form-builder"}>
                      Build survey
                    </Link>
                  </li>
                  <li className={isEdit ? "" : "active"}>
                    <Link to={isEdit ? "" : "/survey/thank-you"}>
                      Thank you
                    </Link>
                  </li>
                  <li className={isEdit ? "" : "active active-main"}>
                    <Link to="">Preview</Link>
                  </li>
                </ul>
              </Col>
              <Col md={3}>
                <div className="header-btn">
                  <Link
                    className="btn btn-primary btn-bordered move-draft"
                    to="/survey/survey-list"
                  >
                    Cancel
                  </Link>
                  <button
                    className="btn btn-primary btn-bordered next"
                    onClick={async (e) => {
                      await nextHandler(e);
                      await saveAsDraft(e, 0, location.pathname, navigate);
                    }}
                  >
                    Save As Draft
                  </button>
                  <button
                    className={
                      isEdit
                        ? "btn btn-primary btn-filled next"
                        : "btn btn-primary btn-filled next send_btn"
                    }
                    onClick={async (e) => {
                      await nextHandler(e);
                      await navigateFunction(e);
                    }}
                  >
                    {" "}
                    {isEdit ? "Next" : "Publish"}
                  </button>
                </div>
              </Col>
            </Row>
          ) : (
            <Row className="justify-content-end align-items-center">
              <Col md={3}>
                <div className="header-btn-left">
                  <Link
                    className="btn btn-primary btn-bordered back"
                    to={
                      isEdit ? "/survey/survey-configure" : "/survey/thank-you"
                    }
                  >
                    Back
                  </Link>
                </div>
              </Col>
              <Col md={6}>
                <ul className="tabnav-link">
                  <li className="active ">
                    <Link to="/survey/survey-builder">Set-up</Link>
                  </li>
                  <li className="active ">
                    <Link to="/survey/survey-configure">Survey config</Link>
                  </li>
                  <li className={isEdit ? "active active-main" : "active"}>
                    <Link to={isEdit ? "" : "/survey/form-builder"}>
                      Build survey
                    </Link>
                  </li>
                  <li className={isEdit ? "" : "active"}>
                    <Link to={isEdit ? "" : "/survey/thank-you"}>
                      Thank you
                    </Link>
                  </li>
                  <li className={isEdit ? "" : "active active-main"}>
                    <Link to="">Preview</Link>
                  </li>
                </ul>
              </Col>
              <Col md={3}>
                <div className="header-btn">
                  <Link
                    className="btn btn-primary btn-bordered move-draft"
                    to="/survey/survey-list"
                  >
                    Cancel
                  </Link>
                  <button
                    className="btn btn-primary btn-bordered next"
                    onClick={async (e) => {
                      await nextHandler(e);
                      await saveAsDraft(e, 0, location.pathname, navigate);
                    }}
                  >
                    Save As Draft
                  </button>
                  <button
                    className={
                      isEdit
                        ? "btn btn-primary btn-filled next"
                        : "btn btn-primary btn-filled next send_btn"
                    }
                    onClick={async (e) => {
                      await nextHandler(e);
                      await navigateFunction(e);
                    }}
                  >
                    {" "}
                    {isEdit ? "Next" : "Publish"}
                  </button>
                </div>
              </Col>
            </Row>
          )}
        </div>
        <div className="preview-survey">
          <div
            className={
              isChecked
                ? `informed-survey mobile-view`
                : "informed-survey"
            }
          >
            {isEdit == true ? (
              ""
            ) : (
              <div class="d-flex align-items-center justify-content-start">
                <div className="switch6">
                  <label className="switch6-light">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleView}
                    />
                    <span>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="14"
                          viewBox="0 0 16 14"
                          fill="none"
                        >
                          {" "}
                          <path
                            d="M1 0C0.447715 0 0 0.447715 0 1V10C0 10.5523 0.447715 11 1 11H15C15.5523 11 16 10.5523 16 10V1C16 0.447715 15.5523 0 15 0H1Z"
                            fill="#0066BE"
                            fill-opacity="0.4"
                          />{" "}
                          <path
                            d="M4.52712 12C4.35473 12 4.19449 12.0888 4.10313 12.235L3.47812 13.235C3.26998 13.568 3.50941 14 3.90212 14H12.0979C12.4906 14 12.73 13.568 12.5219 13.235L11.8969 12.235C11.8055 12.0888 11.6453 12 11.4729 12H4.52712Z"
                            fill="#0066BE"
                            fill-opacity="0.4"
                          />{" "}
                        </svg>
                      </span>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          {" "}
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M4 0C3.44772 0 3 0.447715 3 1V15C3 15.5523 3.44772 16 4 16H12C12.5523 16 13 15.5523 13 15V1C13 0.447715 12.5523 0 12 0H4ZM7.5 1C7.22386 1 7 1.22386 7 1.5C7 1.77614 7.22386 2 7.5 2H8.5C8.77614 2 9 1.77614 9 1.5C9 1.22386 8.77614 1 8.5 1H7.5Z"
                            fill="#0066BE"
                            fill-opacity="0.4"
                          />
                        </svg>
                      </span>
                    </span>
                    <a className="btn"></a>
                  </label>
                </div>
              </div>
            )}
            <div
            
              className={isEdit ? "informed-survey-header" :"informed-survey-header no-click"}
              style={templateData.headerBackground}
            >
              {templateData.logo ? (
                <img
                src={templateData.logo}
                alt="Informed Logo"
                style={{ width: `${templateData.logoWidth}%` }}
              />
              
              ) : (
                ""
              )}
              {templateData.heading && (
                <h2
                  style={{
                    color: templateData.title_color,
                  }}
                  dangerouslySetInnerHTML={{ __html: templateData.heading }}
                ></h2>
              )}
            </div>
            <div
              className={isEdit ? "informed-survey-body" : "informed-survey-body no-click"}
              style={
                isEdit
                  ? {}
                  : { backgroundColor: templateData.page_background_color }
              }
            >
              <div className="informed-survey-text">
                <p
                  style={{ color: templateData.bodyTextColor }}
                  dangerouslySetInnerHTML={{
                    __html: templateData.bodyText,
                  }}
                />
              </div>
              <div className="informed-survey-question" ref={surveyRef}>
                <Form>
                  <div className="d-flex flex-column"  >
                    {elements?.map((item, index) => (
                      <div
                
                        className={`dragable-box ${
                          index === currentElementIndex ? "active" : ""
                        }`}
                        style={
                          isEdit
                            ? { padding: "60px 20px 4px 5px"}
                            : {
                                backgroundColor:
                                  templateData.page_background_color,
                                  padding: "25px 20px 4px 5px"
                        
                              }
                        }
                        draggable={isEdit} // Only make it draggable if isEdit is true
                        key={index}
                        onClick={(e) => {
                          if (isEdit) {
                            e.stopPropagation();
                            dispatch(setCurrentElementIndex(index));
                          }
                        }}
                        onDragStart={(e) => {
                          if (isEdit) {
                            handleQuestionDragStart(e, index);
                          }
                        }}
                        onDragOver={(e) => {
                          if (isEdit) {
                            handleQuestionDragOver(e);
                          }
                        }}
                        onDrop={(e) => {
                          if (isEdit) {
                            handleQuestionDrop(e, index);
                          }
                        }}
                      >
                        {index === currentElementIndex && (
                          <div className="active-drag">
                            {" "}
                            <img
                              src={path_image + "drag-drop.png"}
                              alt="Drag"
                            />{" "}
                          </div>
                        )}
                        <div>
                          {item.accordionType === "questionTypes" ? (
                            <div
                              style={
                                isEdit
                                  ? {}
                                  : {
                                      backgroundColor:
                                        templateData.page_background_color,
                                    }
                              }
                            >
                              <div className="d-flex question-title">
                                <p
                                  style={{
                                    color: templateData.question_answer_color,
                                  }}
                                  dangerouslySetInnerHTML={{
                                    __html: item.question,
                                  }}
                                />
                                <span
                                  style={{ color: templateData.bodyTextColor }}
                                >
                                  {" "}
                                  {item.isOptional
                                    ? item.optionalLabel
                                    : ""}{" "}
                                </span>
                              </div>
                              {item.questionDescriptionEnabled && (
                                <span
                                  className="helper-text"
                                  style={{ color: templateData.bodyTextColor }}
                                >
                                  {" "}
                                  {item.questionDescription}{" "}
                                </span>
                              )}
                              <RenderOptions
                                {...{
                                  item,
                                  index,
                                  optionColor:
                                    templateData.question_answer_color,
                                  isEdit,
                                  page_background_color:
                                    templateData.page_background_color,
                                }}
                              />
                            </div>
                          ) : (
                            <>
                              {<RenderOptions {...{ item, index }} />}{" "}
                              {item.questionDescriptionEnabled && (
                                <span
                                  style={{ color: templateData.bodyTextColor }}
                                  className="helper-text"
                                >
                                  {item.questionDescription}
                                </span>
                              )}
                            </>
                          )}
                        </div>
                        {index === currentElementIndex && (
                          <>
                            <div className="drag-actions">
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dispatch(deleteElement(index));
                                  UpdateQuestion(item.questionId);
                                }}
                              >
                                {" "}
                                <img
                                  src={`${path_image}delete-survey.svg`}
                                  alt="Delete"
                                />{" "}
                              </Button>
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dispatch(copyElement(index));
                                }}
                              >
                                {" "}
                                <img
                                  src={`${path_image}copy-survey.svg`}
                                  alt="Copy"
                                />{" "}
                              </Button>
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dispatch(toggleAddClicked());
                                }}
                              >
                                {" "}
                                <img
                                  src={`${path_image}add-survey.svg`}
                                  alt="Add"
                                />{" "}
                              </Button>
                            </div>
                            {isAddClicked && (
                              <div className="preview-menu">
                                <span>Questions Types</span>
                                <div className="preview-menu-bunch">
                                  {SidebarItems.map((item, index) => (
                                    <div
                                      key={index}
                                      className="sidebar-item"
                                      onClick={() =>
                                        handleAddElement(item.type)
                                      }
                                    >
                                      {item.icon && (
                                        <div className="options-svg">
                                          {item.svg}
                                        </div>
                                      )}
                                      {item.label}
                                    </div>
                                  ))}
                                </div>
                                <span>Common Elements</span>
                                <div className="preview-menu-bunch">
                                  {SidebarCommonItems.map((item, index) => (
                                    <div
                                      key={index}
                                      className="sidebar-item"
                                      onClick={() =>
                                        handleAddElement(item.type)
                                      }
                                    >
                                      {item.icon && (
                                        <div className="options-svg">
                                          {item.svg}
                                        </div>
                                      )}
                                      {item.label}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="form-footer">
                    <button
                      type="button"
                      style={{
                        background: templateData.button_color,
                      }}
                    >
                      {templateData.button_text}
                    </button>

                    <span
                      style={{ color: templateData.bodyTextColor }}
                      dangerouslySetInnerHTML={{
                        __html: templateData.main_footer,
                      }}
                    />
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  surveyValues = state?.getSurveyData;
  return state;
};

export default connect(mapStateToProps, { getSurveyData: getSurveyData })(
  SurveyPreview
);
