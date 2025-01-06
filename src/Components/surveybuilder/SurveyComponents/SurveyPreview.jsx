import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { surveyAxiosInstance } from "../CommonFunctions/CommonFunction";
import { Button, Col, Form, Row, ToastHeader } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { SidebarItems } from "../surveyObjects/SidebarItems";
import { SidebarCommonItems } from "../surveyObjects/SidebarCommonItems";
import { saveAsDraft } from "../CommonFunctions/CommonFunction";
import { Modal } from "react-bootstrap";
import { surveyEndpoints } from "../SurveyEndpoints/SurveyEndpoints";
import {
  emptySurveyReduxStates,
  toggleEditMode,
  updateCurrentElementIndex,
  addElement,
  copyElement,
  setCurrentElementIndex,
  toggleAddClicked,
  deleteElement,
  swapElements,
  addResQuestions,
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

const throttle = (func, delay) => {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

let hoveredIndex = null;

const SurveyPreview = (props) => {
  const { currentStep } = useSelector((state) => state.surveyStepReducer);
  const { FETCH_QUESTION, DELETE_SURVEY_QUESTION } = surveyEndpoints;
  let path = import.meta.env.VITE_APP_ASSETS_PATH_INFORMED_DESIGN;
  let path_image = import.meta.env.VITE_APP_ASSETS_PATH_INFORMED_DESIGN;
  const { currentElementIndex, elements, isAddClicked } = useSelector(
    (state) => state.surveyData
  );
  const [placeholderIndex, setPlaceholderIndex] = useState(null);
  const [localElements, setLocalElements] = useState([]);
  const [questionDeleteCount, setQuestionDeleteCount] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  let { surveyRef, isEdit, nextHandler, navigateFunction, consentOption } =
  props;
const custom_html = surveyValues?.formBuilderData?.custom_html?.[0];
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
  logoWidth: custom_html?.logoWidth,
});
const [confirmationpopup, setConfirmationPopup] = useState(false);
const [draggedElementIndex, setDraggedElementIndex] = useState(null);

 

  const updatedSurveyData = {
    ...surveyValues,
    question_data: elements,
  };

  const updateQuestioData = async () => {
    if (questionDeleteCount > 0) {
      await props.getSurveyData(updatedSurveyData);
    }
  };

  useEffect(() => {
    updateQuestioData();
  }, [questionDeleteCount]);

 
  const handleView = () => {
    setIsChecked(!isChecked);
  };





  const handleAddElement = (type, index) => {
    if (type === "consent") {
      const result = elements.filter((item) => {
        return item.type === "consent";
      });

      if (result.length > 0) {
        toast.warning("Consent already added");
        return;
      }
    }

    dispatch(addElement(type, index));
  };

  const fetchQuestiondetails = async () => {
    try {
      loader("show");
      const fetchResponse = await surveyAxiosInstance.post(FETCH_QUESTION, {
        survey_id,
      });

      if (fetchResponse.status === 200) {
        dispatch(addResQuestions(fetchResponse.data.data));
        const updatedSurveyData = {
          ...surveyValues,
          question_data: fetchResponse.data.data,
        };
        props.getSurveyData(updatedSurveyData);
      }

      loader("hide");
    } catch (error) {
      loader("hide");
      toast.error("Something went wrong");
    }
  };

  const hideConfirmationModal = () => {
    setConfirmationPopup(false);
  };

  useEffect(() => {
    setLocalElements(elements);
  }, [elements]);

  useEffect(() => {
    const shouldFetchQuestions =
      survey_id &&
      survey_id != 0 &&
      (surveyValues?.question_data === undefined ||
        surveyValues?.question_data === "" ||
        elements.length === 0);

    if (shouldFetchQuestions) {
      fetchQuestiondetails();
    } else if (surveyValues?.question_data) {
      dispatch(addResQuestions(surveyValues.question_data));
    } else {
      dispatch(updateCurrentElementIndex());
    }
  }, [survey_id, dispatch]);

  

  const handlePreviewDrop = (e) => {
    e.preventDefault();
    hoveredIndex = null;
    setPlaceholderIndex(null);
    const type = e.dataTransfer.getData("type");

    if (type === "consent") {
      const result = elements.filter((item) => {
        return item.type === "consent";
      });

      if (result.length > 0) {
        toast.warning("Consent already added");
        return;
      }
    }
    console.log("handle preview drop");

    if (type.trim()) {
      handleAddElement(type);
    }
  };


  const handlePreviewDragOver = (e) => e.preventDefault();

  const handleQuestionDragStart = (e, index) => {
   
    e.stopPropagation();
    // dispatch(updateCurrentElementIndex())

    setDraggedElementIndex(index);
  };

  // const handleQuestionDragOver = (e, index) => {
  //   e.preventDefault();

  //   if (draggedElementIndex != null && hoveredIndex !== index) {
  //     console.log("inside hovered =====> ",index,hoveredIndex,draggedElementIndex)

  //     const newItems = [...elements];

  //     const draggedItem = newItems.splice(draggedElementIndex, 1);

  //     newItems.splice(index, 0, draggedItem[0]);

  //     setLocalElements(newItems);
  //     setHoveredIndex(index); // Set the hovered index
  //   }
  //   if (draggedItemIndex === null) {
  //     console.log("dropped ====?")
  //     const bounding = e.currentTarget.getBoundingClientRect();
  //     const offset = e.clientY - bounding.top;
  //     if (index === elements.length - 1 && offset >= bounding.height / 2) {
  //       setPlaceholderIndex(elements.length);
  //     } else {
  //       handlePlaceholderPosition(e, index);
  //     }
  //   }
  // };

  const handleQuestionDragOver = throttle((e, index) => {
    e.preventDefault();

  

    // Calculate bounding box of the target element
    const bounding = e.currentTarget.getBoundingClientRect();
    const offset = e.clientY - bounding.top; // In above two lines we are calculation current position of mouse to check if mouse is above half of quetion then change the dragged element position

    // in the below coindition we are replacing dragged elemnt position in real time abd show on ui so that user wll able to know where he is going to drop the element
    if (draggedElementIndex != null && offset < bounding.height / 2) {
      const newItems = [...elements];
      const draggedItem = newItems.splice(draggedElementIndex, 1);
      newItems.splice(index, 0, draggedItem[0]);
    
      // Update question numbers after reordering
      newItems.forEach((item, i) => {
        item.questionNo = i + 1;
      });
    
      // Set state only after all operations are complete
      setLocalElements(newItems);
      // dispatch(setCurrentElementIndex(index));
      hoveredIndex = index;
      return;
    }
    

    //in the bolew consityion we are also doing checking the same position of mouse if the mouse is below or above the question(element) then set index acoordingly to show the drop placeholder on ui
    if (draggedElementIndex === null) {
      // this condition helps if user try to drop the question at the very last so ity helps tos how drop placeholder at last of the survey
      if (index === elements.length - 1 && offset >= bounding.height / 2) {
        setPlaceholderIndex(elements.length);
      } else {
        handlePlaceholderPosition(e, index);
      }
      return;
    }
  }, 100); // Adjusted throttle delay to reduce rapid flickering

  // this is the funtion where we are setting the index for drop placeholder
  const handlePlaceholderPosition = (e, index) => {
    const bounding = e.currentTarget.getBoundingClientRect();
    const offset = e.clientY - bounding.top;
    const newPlaceholderIndex =
      offset < bounding.height / 2 ? index : index + 1;

    // Update the placeholder index only if it has changed
    if (newPlaceholderIndex !== placeholderIndex) {
      setPlaceholderIndex(newPlaceholderIndex);
    }
  };


  // this funtion excecuste when we drop question on question drop 
  const handleQuestionDrop = (e, index) => {
    e.stopPropagation();
    e.preventDefault();
    setPlaceholderIndex(null);
 

    // in below these condition first one will execute when we are dragging already added question in the survey and second one will execute when we try to add new question

    if (draggedElementIndex !== null) {
      dispatch(addResQuestions(localElements, hoveredIndex)); // Update Redux state with final order
      setDraggedElementIndex(null);
      hoveredIndex = null;
    } else {
      const type = e.dataTransfer.getData("type");
      if (type === "consent") {
        const result = elements.filter((item) => {
          return item.type === "consent";
        });

        if (result.length > 0) {
          // toast.warning("Consent already added");
          return;
        }
      }
      handleAddElement(type, placeholderIndex);
    }
  };

  const UpdateQuestion = async (e, questionId) => {
    try {
      loader("show");

      if (questionId != 0) {
        const response = surveyAxiosInstance.post(DELETE_SURVEY_QUESTION, {
          questionId,
        });

        if (response.status === 200) {
          setQuestionDeleteCount(questionDeleteCount + 1);
        }
      }
      setConfirmationPopup(false);

      loader("hide");
    } catch (error) {
      loader("hide");
      toast.error("Something went wrong");
    }
  };
  const handleDragLeave = (e) => {
    e.preventDefault();

    if (e.target === e.currentTarget) {
      // Only trigger if the mouse leaves the container, not individual items
      console.log("DragLeave");
      setPlaceholderIndex(null);
      hoveredIndex=null
    }
  };

  return (
    <div
      className="top-right-action preview"
      onDrop={handlePreviewDrop}
      // onDragEnter={handleDragEnter}
      onDragOver={handlePreviewDragOver}
      onDragLeave={handleDragLeave} // Only trigger clear when truly leaving
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
                  <li className={currentStep > 3 ? "active" : ""}>
                    <Link to={currentStep > 3 ? "/survey/thank-you" : ""}>
                      Thank you
                    </Link>
                  </li>
                  <li className={currentStep > 4 ? "active" : ""}>
                    <Link to={currentStep > 4 ? "/survey/survey-preview" : ""}>
                      Preview
                    </Link>
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
                        : elements.length > 0
                        ? "btn btn-primary btn-filled next send_btn"
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
              isChecked ? `informed-survey mobile-view` : "informed-survey"
            }
          >
            {isEdit == true ? (
              ""
            ) : (
              <div className="d-flex align-items-center justify-content-start">
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
              className={
                isEdit
                  ? "informed-survey-header"
                  : "informed-survey-header no-click"
              }
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
              className={
                isEdit
                  ? "informed-survey-body"
                  : "informed-survey-body no-click"
              }
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
                  <div className="d-flex flex-column">
                    {localElements?.map((item, index) => {
                      let questionIndex = index;

                      if (
                        consentOption === "No consent needed (anonymous)" &&
                        item.type === "consent"
                      ) {
                        return;
                      } else {
                        return (
                          <div
                            className={`dragable-box ${  
                              draggedElementIndex != null ? hoveredIndex == index ? "active" : "": index == currentElementIndex ? "active" : ""
                              
                            }`}
                            style={
                              isEdit
                                ? {
                                    padding: "60px 6px 4px 6px",
                                    filter:
                                      hoveredIndex === index
                                        ? "opacity:0"
                                        : "none",
                                  }
                                : {
                                    backgroundColor:
                                      templateData.page_background_color,
                                    padding: "50px 6px 4px 6px",
                                  }
                            }
                            draggable={isEdit} // Only make it draggable if isEdit is true
                            key={index}
                            onMouseDown={(e) => {
                              if (isEdit) {
                                e.stopPropagation();
                                dispatch(setCurrentElementIndex(index));
                                hoveredIndex=index
                              }
                            }}
                            onClick={(e) => {
                              if (isEdit) {
                                e.stopPropagation();
                                hoveredIndex=null;
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
                                handleQuestionDragOver(e, index);
                              }
                            }}
                            onDrop={(e) => {
                              e.stopPropagation();
                              if (isEdit) {
                                handleQuestionDrop(e, index);
                              }
                            }}
                          >
                            {" "}
                            {placeholderIndex === index && (
                              <div className="dropArea"></div>
                            )}
                            {  
                              draggedElementIndex != null ? hoveredIndex == index ? (
                                <div className="active-drag">
                                  {" "}
                                  <img
                                    src={path_image + "drag-drop.png"}
                                    alt="Drag"
                                  />{" "}
                                </div>
                              ):"" : index == currentElementIndex ? (
                                <div className="active-drag">
                                  {" "}
                                  <img
                                    src={path_image + "drag-drop.png"}
                                    alt="Drag"
                                  />{" "}
                                </div>
                              ) : ""
                              
                             }
                            <div>
                              {item.accordionType == "questionTypes" ? (
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
                                    {item.question.length > 0 && (
                                      <p
                                        style={{
                                          color:
                                            templateData.question_answer_color,
                                        }}
                                        dangerouslySetInnerHTML={{
                                          __html: item.question,
                                        }}
                                      />
                                    )}
                                    <span
                                      style={{
                                        color: templateData.bodyTextColor,
                                      }}
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
                                      style={{
                                        color:
                                          templateData.question_answer_color,
                                      }}
                                    >
                                      {" "}
                                      {item.questionDescription}{" "}
                                    </span>
                                  )}
                                  <RenderOptions
                                    {...{
                                      item,
                                      index,
                                      optionColor: templateData.bodyTextColor,
                                      isEdit,
                                      inputColor:
                                        templateData.question_answer_color,
                                      page_background_color:
                                        templateData.page_background_color,
                                    }}
                                  />
                                </div>
                              ) : (
                                <>
                                  {
                                    <RenderOptions
                                      {...{
                                        item,
                                        index,
                                        optionColor: templateData.bodyTextColor,
                                        isEdit,
                                        inputColor:
                                          templateData.question_answer_color,
                                        page_background_color:
                                          templateData.page_background_color,
                                        consentOption: consentOption,
                                      }}
                                    />
                                  }{" "}
                                  {item.questionDescriptionEnabled && (
                                    <span
                                      style={{
                                        color:
                                          templateData.question_answer_color,
                                      }}
                                      className="helper-text"
                                    >
                                      {item.questionDescription}
                                    </span>
                                  )}
                                </>
                              )}
                            </div>
                            {    draggedElementIndex != null ? hoveredIndex == index ? (
                              <>
                                <div className="drag-actions">
                                  <Button
                                    onClick={(e) => {
                                      setConfirmationPopup(true);
                                    }}
                                  >
                                    {" "}
                                    <img
                                      src={`${path_image}delete-survey.svg`}
                                      alt="Delete"
                                      title="Delete"
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
                                      title="Duplicate"
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
                                      title="Add"
                                    />{" "}
                                  </Button>

                                  <div className="delete">
                                    <Modal
                                      className="modal send-confirm"
                                      id="delete-confirm"
                                      show={confirmationpopup}
                                    >
                                      <Modal.Header>
                                        {/* <Modal.Title>Heading Text</Modal.Title>*/}
                                        <button
                                          type="button"
                                          className="btn-close"
                                          data-bs-dismiss="modal"
                                          onClick={(e) =>
                                            hideConfirmationModal()
                                          }
                                        ></button>
                                      </Modal.Header>

                                      <Modal.Body>
                                        <img src={path + "alert.png"} alt="" />
                                        <h4>
                                          This question will be deleted.
                                          <br />
                                          Are you sure you wish to go ahead?
                                        </h4>
                                        <div className="modal-buttons">
                                          <button
                                            type="button"
                                            className="btn btn-primary btn-filled"
                                            onClick={async (e) => {
                                              e.stopPropagation();
                                              dispatch(deleteElement(index));
                                              UpdateQuestion(
                                                e,
                                                item.questionId
                                              );
                                            }}
                                          >
                                            Yes Please!
                                          </button>
                                          <button
                                            type="button"
                                            className="btn btn-primary btn-bordered light"
                                            onClick={(e) =>
                                              hideConfirmationModal()
                                            }
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      </Modal.Body>
                                    </Modal>
                                  </div>
                                </div>
                                {isAddClicked && (
                                  <div className="preview-menu">
                                    <span>Questions Types</span>
                                    <div className="preview-menu-bunch">
                                      {SidebarItems.map((item, index) => (
                                        <div
                                          key={index}
                                          className="sidebar-item"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddElement(
                                              item.type,
                                              questionIndex + 1
                                            );
                                          }}
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
                                      {SidebarCommonItems.map((item, index) => {
                                        if (
                                          item.type === "consent" &&
                                          consentOption ==
                                            "No consent needed (anonymous)"
                                        ) {
                                          return;
                                        } else {
                                          return (
                                            <div
                                              key={index}
                                              className="sidebar-item"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleAddElement(
                                                  item.type,
                                                  questionIndex + 1
                                                );
                                              }}
                                            >
                                              {item.icon && (
                                                <div className="options-svg">
                                                  {item.svg}
                                                </div>
                                              )}
                                              {item.label}
                                            </div>
                                          );
                                        }
                                      })}
                                    </div>
                                  </div>
                                )}
                              </>
                            ):"" : index == currentElementIndex ? (
                              <>
                                <div className="drag-actions">
                                  <Button
                                    onClick={(e) => {
                                      setConfirmationPopup(true);
                                    }}
                                  >
                                    {" "}
                                    <img
                                      src={`${path_image}delete-survey.svg`}
                                      alt="Delete"
                                      title="Delete"
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
                                      title="Duplicate"
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
                                      title="Add"
                                    />{" "}
                                  </Button>

                                  <div className="delete">
                                    <Modal
                                      className="modal send-confirm"
                                      id="delete-confirm"
                                      show={confirmationpopup}
                                    >
                                      <Modal.Header>
                                        {/* <Modal.Title>Heading Text</Modal.Title>*/}
                                        <button
                                          type="button"
                                          className="btn-close"
                                          data-bs-dismiss="modal"
                                          onClick={(e) =>
                                            hideConfirmationModal()
                                          }
                                        ></button>
                                      </Modal.Header>

                                      <Modal.Body>
                                        <img src={path + "alert.png"} alt="" />
                                        <h4>
                                          This question will be deleted.
                                          <br />
                                          Are you sure you wish to go ahead?
                                        </h4>
                                        <div className="modal-buttons">
                                          <button
                                            type="button"
                                            className="btn btn-primary btn-filled"
                                            onClick={async (e) => {
                                              e.stopPropagation();
                                              dispatch(deleteElement(index));
                                              UpdateQuestion(
                                                e,
                                                item.questionId
                                              );
                                            }}
                                          >
                                            Yes Please!
                                          </button>
                                          <button
                                            type="button"
                                            className="btn btn-primary btn-bordered light"
                                            onClick={(e) =>
                                              hideConfirmationModal()
                                            }
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      </Modal.Body>
                                    </Modal>
                                  </div>
                                </div>
                                {isAddClicked && (
                                  <div className="preview-menu">
                                    <span>Questions Types</span>
                                    <div className="preview-menu-bunch">
                                      {SidebarItems.map((item, index) => (
                                        <div
                                          key={index}
                                          className="sidebar-item"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddElement(
                                              item.type,
                                              questionIndex + 1
                                            );
                                          }}
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
                                      {SidebarCommonItems.map((item, index) => {
                                        if (
                                          item.type === "consent" &&
                                          consentOption ==
                                            "No consent needed (anonymous)"
                                        ) {
                                          return;
                                        } else {
                                          return (
                                            <div
                                              key={index}
                                              className="sidebar-item"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleAddElement(
                                                  item.type,
                                                  questionIndex + 1
                                                );
                                              }}
                                            >
                                              {item.icon && (
                                                <div className="options-svg">
                                                  {item.svg}
                                                </div>
                                              )}
                                              {item.label}
                                            </div>
                                          );
                                        }
                                      })}
                                    </div>
                                  </div>
                                )}
                              </>
                            ):""}
                          </div>
                        );
                      }
                    })}
                    {placeholderIndex === localElements.length && (
                      <div className="dropArea last"></div>
                    )}

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
