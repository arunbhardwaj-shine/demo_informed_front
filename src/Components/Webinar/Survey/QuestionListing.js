import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Form,
  Table,
  Button,
  Modal,
} from "react-bootstrap";
import { ENDPOINT } from "../../../axios/apiConfig";
import {
  getData,
  postData,
  deleteData,
  updateConsent,
} from "../../../axios/apiHelper";
import "react-confirm-alert/src/react-confirm-alert.css";
import Question from "./Question";
import { loader } from "../../../loader";
import CommonConfirmModel from "../../../Model/CommonConfirmModel";
import Select from "react-select";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

export default function QuestionListing() {
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [commonConfirmModelFun, setCommonConfirmModelFun] = useState(() => {});
  const [apiStatus, setApiStatus] = useState(false);
  const [resetDataId, setResetDataId] = useState();

  const [popupMessage, setPopupMessage] = useState({
    message1: "",
    message2: "",
    footerButton: "",
  });
  const [dropDownData, setDropDownData] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [method, setMethod] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [questions, setQuestions] = useState([
    {
      key: 0,

      questionData: {
        question: "",
        speakerName: "",
        answerOption: [{ answer: "", color: "#000000" }],
        answerType: "",
        isRequired:0,
    
      },
      questionDataErrors: {
        questionError: "",
        speakerNameError: "",
        answerOptionError: [{ answerError: "", colorError: "#000000" }],
        answerTypeError: "",
      },
    },
  ]);
  useEffect(() => {
    getApiData();
  }, []);

  const getApiData = async () => {
    try {
      loader("show");

      const response = await getData(`${ENDPOINT.EVENT_LIST}?type=${page}`);
      let dropDownDataTemp = response.data.data.map((item) => ({
        value: item.id,
        label: item.event_code,
      }));
      setDropDownData(dropDownDataTemp);
      let selectedData = dropDownDataTemp.length
        ? dropDownDataTemp[0]
        : { value: "", label: "" };
      setSelectedItem(selectedData);
      if (selectedData) {
        let apiData = await getListingData(selectedData.value);
        setData(apiData.data.data);
      }
      setApiStatus(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      loader("hide");
    }
  };

  const getListingData = async (id) => {
    try {
      loader("show");
      const apiData = await getData(`/webinar/getQuestionByEventId/${id}`);
      loader("hide");
      return apiData;
    } catch (error) {
      loader("hide");
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const handleSelectChange = async (event) => {
    console.log(event);
    console.log(selectedItem, "selectedItem");
    loader("show");
    setApiStatus(() => false);
    setData(() => {
      let data = [];
      return data;
    });
    let apiData = await getListingData(event.value);
    setData(apiData.data.data);
    setSelectedItem(event);
    setApiStatus(true);
  };

  const handleEditClick = (item) => {
    setMethod("edit");
    let answerArray = item?.answerOption || [
      {
        answer: "",
        color: "",
      },
    ];

    const answerOptionError = answerArray.map((data) => {
      return {
        answerError: "",
        colorError: "",
      };
    });
    const answerOption = answerArray.map((data) => {
      return {
        answer: data.answer,
        color: data.color,
      };
    });

    let newData = [
      {
        key: 0,

        questionData: {
          ...item,
          answerOption: answerOption,
          answerType: item.answerType,
        } || {
          question: "",
          speakerName: "",
          answerOption: [{ answer: "", color: "#000000" }],
          answerType: "",
        isRequired:0,

       
        },
        questionDataErrors: {
          questionError: "",
          speakerNameError: "",
          answerOptionError: answerOptionError,
          answerTypeError: "",
        },
      },
    ];
    setShowUploadMenu(true);
    setQuestions(newData);
  };

  const handleDeleteClick = async (itemId) => {
    try {
      loader("show");
      let res = await deleteData(`/webinar/delete-question`, itemId);
      let apiData = await getListingData(selectedItem.value);
      setData(apiData.data.data);
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setConfirmationPopup(false);
    }
  };
  const handleCloseUploadMenu = () => {
    setQuestions([
      {
        key: 0,

        questionData: {
          question: "",
          speakerName: "",
          answerOption: [{ answer: "", color: "" }],
          answerType: "",
        isRequired:0,

         
        },
        questionDataErrors: {
          questionError: "",
          speakerNameError: "",
          answerOptionError: [{ answerError: "", colorError: "#000000" }],
          answerTypeError: "",
        },
      },
    ]);
  };
  const [surveyData, setSurveyData] = useState([]);
  const [eventId, setEventid] = useState({});
  const [eventError, setEventError] = useState("");

  const handleAddQuestion = () => {
    const isValid = validateQuestions();

    if (!isValid) {
      return;
    }
    const key = questions.length;
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        key,
        questionData: {
          question: "",
          speakerName: "",
          answerOption: [{ answer: "", color: "#00000" }],
          answerType: "",
        isRequired:0,

    
        },
        questionDataErrors: {
          questionError: "",
          speakerNameError: "",
          answerOptionError: [{ answerError: "", colorError: "" }],
          answerTypeError: "",
        },
      },
    ]);
  };

  const handleQuestionChange = (e, key) => {
  
    const updatedQuestions = [...questions];
    updatedQuestions[key].questionData.question = e.target.value;
    setQuestions(updatedQuestions);
  };
  const handleIsRequiredChange = (e, key) => {
    
    const { name, checked, value } = e.target;
    const updatedQuestions = [...questions];

    const questionData = updatedQuestions[key].questionData;
        
        questionData.isRequired=checked
 
    setQuestions(updatedQuestions);
  };

  const handleSpeakerNameChange = (e, key) => {
    const updatedQuestions = [...questions];
    updatedQuestions[key].questionData.speakerName = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleTypeChange = (e, key) => {
    const updatedQuestions = [...questions];
    updatedQuestions[key].questionData.answerType = e;
    if(  e == "INPUT"){
      updatedQuestions[key].questionData.answerOption = [
       
      ];
    
      updatedQuestions[key].questionDataErrors.answerOptionError = [
        { answerError: "", colorError: "" },
      ];
    }
   else  {
      updatedQuestions[key].questionData.answerOption = [
        { answer: "", color: "#000000" },
      ];
      updatedQuestions[key].questionDataErrors.answerOptionError = [
        { answerError: "", colorError: "" },
      ];
    }
    setQuestions(updatedQuestions);
  };

  const handleChoiceChange = (e, questionKey, choiceIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionKey].questionData.answerOption[
      choiceIndex
    ].answer = e.target.value;

    setQuestions(updatedQuestions);
  };
  const handleChoiceColorChange = (e, questionKey, choiceIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionKey].questionData.answerOption[choiceIndex].color =
      e.target.value;

    setQuestions(updatedQuestions);
  };

  const handleAddChoice = (key) => {
    const isValid = validateQuestions();

    if (!isValid) {
      return;
    }

    const updatedQuestions = [...questions];
    updatedQuestions[key].questionData.answerOption.push({
      answer: "",
      color: "#000000",
    });
    updatedQuestions[key].questionDataErrors.answerOptionError.push({
      answerError: "",
      colorError: "",
    });

    setQuestions(updatedQuestions);
  };

  const handleDelete = (key) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(key, 1);
    setQuestions(updatedQuestions);
  };

  const handleDeleteChoice = (questionKey, choiceIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionKey].questionData.answerOption.splice(
      choiceIndex,
      1
    );
    setQuestions(updatedQuestions);
  };

  const validateQuestions = () => {
    let isValid = true;
    const updatedQuestions = [...questions];
    console.log(updatedQuestions);
    updatedQuestions.forEach((questionObj, index) => {
      const question = questionObj.questionData.question;
      const speakerName = questionObj.questionData.speakerName;
      const answerType = questionObj.questionData.answerType;
      // if (eventId.trim() === "") {
      //   setEventError( "Please Select Event");
      //   isValid = false;
      // } else {
      //   setEventError( "");

      // }

      if (question.trim() === "") {
        questionObj.questionDataErrors.questionError = "Question is required.";
        isValid = false;
      } else {
        questionObj.questionDataErrors.questionError = "";
      }
      if (speakerName.trim() === "") {
        questionObj.questionDataErrors.speakerNameError =
          "Speaker Name is required.";
        isValid = false;
      } else {
        questionObj.questionDataErrors.speakerNameError = "";
      }
      if (answerType.trim() === "") {
        questionObj.questionDataErrors.answerTypeError =
          "Please Select Answer Type";
        isValid = false;
      } else {
        questionObj.questionDataErrors.answerTypeError = "";
      }
      questionObj.questionData.answerOption.forEach((choice, choiceIndex) => {
        if (
          choice.answer.trim() === "" &&
          questionObj?.questionData?.answerType != "INPUT"
        ) {
          questionObj.questionDataErrors.answerOptionError[
            choiceIndex
          ].answerError = "Answer is required.";
          isValid = false;
        } else {
          questionObj.questionDataErrors.answerOptionError[
            choiceIndex
          ].answerError = "";
        }

        if (
          choice?.color?.trim() === "" &&
          questionObj.questionData.answerType != "INPUT"
        ) {
          questionObj.questionDataErrors.answerOptionError[
            choiceIndex
          ].colorError = "Color is required.";
          isValid = false;
        } else {
          questionObj.questionDataErrors.answerOptionError[
            choiceIndex
          ].colorError = "";
        }
      });

      updatedQuestions[index] = questionObj;
    });

    setQuestions(updatedQuestions);
    return isValid;
  };

  const handleSubmit = async () => {
    const isValid = validateQuestions();

    if (!isValid) {
      return;
    }

    loader("show");

    const surveyData = questions.map(({ questionData }) => questionData);
    setSurveyData(surveyData);

    try {
      let response;
      const payLoadData = {
        data: surveyData,
      };

      if (method === "add") {
        payLoadData.eventId = selectedItem.value;
        response = await postData(ENDPOINT.ADD_QUESTION, payLoadData);
      } else if (method === "edit") {
        const id = surveyData[0]?.id;
        response = await updateConsent(
          `${ENDPOINT.EDIT_QUESTION}/${id}`,
          payLoadData
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setShowUploadMenu(false);
      const apiData = await getListingData(selectedItem.value);
      setData(apiData.data.data);
    }
  };

  const onEventChange = (e, key) => {
    setEventid(e.target.value);
  };

  const hideConfirmationModal = () => {
    setConfirmationPopup(false);
  };
  const loadMoreClicked = () => {
    let sp = page + 1;
    setPage(sp);
    getApiData();
  };
  return (
    <Col className="col right-sidebar">
      <div className="custom-container">
        <div className="row">
          <div className="form_action sticky-view">
          <div class="d-flex justify-content-between align-items-center">
            <div className="create-change-content question-listing">
              <div className="top-header reader_list">
                <div className="page-title">
                  <h4>Polls</h4>
                </div>
              </div>
              
                <form class="product-unit d-flex justify-content-between align-items-center">           
                <div className="form-group">
                  <label htmlFor="">Select Event</label>
                  <Select
                    options={dropDownData}
                    placeholder="Select Event"
                    name="province"
                    className="dropdown-basic-button split-button-dropup"
                    isClearable
                    onChange={handleSelectChange}
                    value={selectedItem}
                  />
                </div>
                {/* <Button
                  className="align-right btn-bordered btn-voilet"
                  onClick={() => {
                    setShowUploadMenu(true);
                    setMethod("add");
                  }}
                >
                  Add New Question +
                </Button> */}
              </form>
          </div>
          </div>
          </div>
          
          <div className="poll-question">
                <div className="poll-question-selection">
                    <div className="question-number"><span>Q1</span></div>
                    <div className="question-action">
                      <Button className="save btn-bordered">Save</Button>
                      <Button className="add-question btn-bordered">Add Question +</Button>
                      <Button className="dl_btn btn-bordered" 
                                        // onClick={() => {
                                        //     setPopupMessage({
                                        //       message1:
                                        //         "You are about to remove this question.",
                                        //       message2: "Are you sure you want to do this?",
                                        //       footerButton: "Yes please!",
                                        //     }); setConfirmationPopup(true); setResetDataId(item.id);}}
                                            >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.84 22.25H8.15989C7.3915 22.2389 6.65562 21.9381 6.09941 21.4079C5.5432 20.8776 5.20765 20.157 5.15985 19.39L4.24984 5.55C4.24518 5.44966 4.26045 5.34938 4.29478 5.25498C4.32911 5.16057 4.38181 5.07391 4.44985 5C4.51993 4.9234 4.60479 4.86177 4.69931 4.81881C4.79382 4.77584 4.89606 4.75244 4.99985 4.75H19C19.1029 4.74977 19.2046 4.7707 19.2991 4.81148C19.3935 4.85226 19.4785 4.91202 19.5488 4.98704C19.6192 5.06207 19.6733 5.15077 19.7079 5.24761C19.7426 5.34446 19.7569 5.44739 19.75 5.55L18.88 19.39C18.8317 20.1638 18.4905 20.8902 17.9258 21.4214C17.3611 21.9527 16.6153 22.249 15.84 22.25ZM5.83986 6.25L6.60987 19.3C6.63531 19.6935 6.80978 20.0625 7.09775 20.3319C7.38573 20.6013 7.76555 20.7508 8.15989 20.75H15.84C16.2336 20.7485 16.6121 20.5982 16.8996 20.3292C17.1871 20.0603 17.3622 19.6927 17.39 19.3L18.2 6.3L5.83986 6.25Z" fill="#0066be"></path><path d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z" fill="#0066be"></path><path d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z" fill="#0066be"></path><path d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z" fill="#0066be"></path><path d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z" fill="#0066be"></path><path d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z" fill="#0066be"></path></svg>
                      </Button>
                      <Button className="btn-bordered question-next">
                        <svg width="19" height="11" viewBox="0 0 19 11" fill="none">
                        <path d="M9.27853 7.15662L2.56206 0.442137C1.97595 -0.143796 1.02569 -0.143796 0.43958 0.442137C-0.146527 1.02807 -0.146527 1.97806 0.43958 2.56399L8.21954 10.3416C8.80565 10.9276 9.75591 10.9276 10.342 10.3416C10.3643 10.3194 10.3858 10.2965 10.4064 10.2732L18.1204 2.56155C18.7065 1.97556 18.7065 1.02548 18.1204 0.439493C17.5342 -0.146497 16.5838 -0.146498 15.9977 0.439493L9.27853 7.15662Z" fill="#0066BE"/>
                        </svg>
                      </Button>
                      <Button className="btn-bordered question-prev">
                        <svg width="19" height="11" viewBox="0 0 19 11" fill="none">
                        <path d="M9.27902 3.61976L2.56094 10.3378C1.97509 10.9236 1.02524 10.9236 0.439388 10.3378C-0.146462 9.75196 -0.146463 8.80211 0.439387 8.21626L8.21496 0.440724C8.41288 0.242814 8.65233 0.111762 8.90525 0.0475674C9.4024 -0.0805243 9.95244 0.0500824 10.3417 0.439387L18.1173 8.21496C18.7031 8.80081 18.7031 9.75066 18.1173 10.3365C17.5314 10.9224 16.5816 10.9224 15.9957 10.3365L9.27902 3.61976Z" fill="#0066BE"/>
                        </svg>
                      </Button>
                    </div>
                </div>
                <div className="poll-question-option">
                  <div className="poll-question-create">
                      <Form>
                          <Form.Group className="mb-4">
                            <Form.Label className="h5">Enter your question:</Form.Label>
                             <Form.Control as="textarea" rows={3} />
                          </Form.Group>
                          <Form.Group className="mb-4">
                            <Form.Label className="h5">Select the type of your answer:</Form.Label>
                              <Form.Check
                                id="option1"
                                inline
                                label="Yes OR No"
                                name="group1"
                                type="radio"
                                for="option1"
                              />
                              <Form.Check
                                id="option2"
                                inline
                                label="Multiple choices"
                                name="group1"
                                type="radio"
                                for="option2"
                              />
                              <Form.Check
                                id="option3"
                                inline
                                label="Free Text"
                                name="group1"
                                type="radio"
                                for="option3"
                              />
                              <div className="answer-option">
                                <div className="options">
                                  {/* {data.map((item, index) => ( */}
                                  <Form.Group as={Row} className="mb-3">
                                    <Form.Label>
                                     Choice 1
                                    </Form.Label>
                                    <Form.Control type="text" />
                                    <div className="option-action">
                                      <Button className="dl_btn" 
                                        // onClick={() => {
                                        //     setPopupMessage({
                                        //       message1:
                                        //         "You are about to remove this question.",
                                        //       message2: "Are you sure you want to do this?",
                                        //       footerButton: "Yes please!",
                                        //     }); setConfirmationPopup(true); setResetDataId(item.id);}}
                                            >
                                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.84 22.25H8.15989C7.3915 22.2389 6.65562 21.9381 6.09941 21.4079C5.5432 20.8776 5.20765 20.157 5.15985 19.39L4.24984 5.55C4.24518 5.44966 4.26045 5.34938 4.29478 5.25498C4.32911 5.16057 4.38181 5.07391 4.44985 5C4.51993 4.9234 4.60479 4.86177 4.69931 4.81881C4.79382 4.77584 4.89606 4.75244 4.99985 4.75H19C19.1029 4.74977 19.2046 4.7707 19.2991 4.81148C19.3935 4.85226 19.4785 4.91202 19.5488 4.98704C19.6192 5.06207 19.6733 5.15077 19.7079 5.24761C19.7426 5.34446 19.7569 5.44739 19.75 5.55L18.88 19.39C18.8317 20.1638 18.4905 20.8902 17.9258 21.4214C17.3611 21.9527 16.6153 22.249 15.84 22.25ZM5.83986 6.25L6.60987 19.3C6.63531 19.6935 6.80978 20.0625 7.09775 20.3319C7.38573 20.6013 7.76555 20.7508 8.15989 20.75H15.84C16.2336 20.7485 16.6121 20.5982 16.8996 20.3292C17.1871 20.0603 17.3622 19.6927 17.39 19.3L18.2 6.3L5.83986 6.25Z" fill="#ffffff"></path><path d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z" fill="#ffffff"></path><path d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z" fill="#ffffff"></path><path d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z" fill="#ffffff"></path><path d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z" fill="#ffffff"></path><path d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z" fill="#ffffff"></path></svg>
                                        </Button>
                                        <div className="color-pick">
                                          <img src={path_image+ "color-picker.svg"} alt="" />
                                          <input type="color" title="Choose your color"/>
                                        </div>
                                        
                                    </div>
                                  </Form.Group>
                                  {/* ))} */}
                                </div>
                                  <Button className="add-choice">Add Choice <img src={path_image+ "add-choice.svg"} alt=""/></Button>
                              </div>
                          </Form.Group>
                          <div className="speaker-detail d-flex align-items-center">
                            <div className="speaker-name">
                              <Form.Group>
                              <Form.Label>Asked by who?</Form.Label>
                              <Form.Control type="text"/>
                            </Form.Group>
                            </div>
                            <div className="display-result">
                               <Form.Group>
                                <Form.Label>Display the result in :</Form.Label>
                                <div className="switch6">
                                  <label className="switch6-light">
                                    <input type="checkbox"/>
                                    <span>
                                      <span><img src={path_image + "bar-graph-img.png"} /></span>
                                      <span><img src={path_image + "pie-img.png"} /></span>
                                    </span>
                                    <a className="btn"></a>
                                  </label>
                                </div>
                               </Form.Group>
                              
                            </div>
                          </div>
                      </Form>
                  </div>
                </div>
              </div>


          {data.length == 0 && apiStatus ? (
            <table>
              <tbody>
                <tr>
                  <td colSpan="3">
                    <h4>No Data Found</h4>
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            apiStatus && (
              <div className="webinar-question-results">
                <Table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Question</th>
                      <th>Answer Type</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.question}</td>
                        <td>{item.answerType}</td>
                        <td>
                          <Button
                          className="btn-edit"
                            variant="primary"
                            onClick={() => handleEditClick(item)}
                          >
                       <img src="componentAssets/images/edit-white.svg" alt="Delete "/>
                          </Button>{" "}
                          <Button
                          className="dl_btn"
                            onClick={() => {
                              setPopupMessage({
                                message1:
                                  "You are about to remove this question.",
                                message2: "Are you sure you want to do this?",
                                footerButton: "Yes please!",
                              });
                              setConfirmationPopup(true);
                              setResetDataId(item.id);
                            }}
                          >
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.84 22.25H8.15989C7.3915 22.2389 6.65562 21.9381 6.09941 21.4079C5.5432 20.8776 5.20765 20.157 5.15985 19.39L4.24984 5.55C4.24518 5.44966 4.26045 5.34938 4.29478 5.25498C4.32911 5.16057 4.38181 5.07391 4.44985 5C4.51993 4.9234 4.60479 4.86177 4.69931 4.81881C4.79382 4.77584 4.89606 4.75244 4.99985 4.75H19C19.1029 4.74977 19.2046 4.7707 19.2991 4.81148C19.3935 4.85226 19.4785 4.91202 19.5488 4.98704C19.6192 5.06207 19.6733 5.15077 19.7079 5.24761C19.7426 5.34446 19.7569 5.44739 19.75 5.55L18.88 19.39C18.8317 20.1638 18.4905 20.8902 17.9258 21.4214C17.3611 21.9527 16.6153 22.249 15.84 22.25ZM5.83986 6.25L6.60987 19.3C6.63531 19.6935 6.80978 20.0625 7.09775 20.3319C7.38573 20.6013 7.76555 20.7508 8.15989 20.75H15.84C16.2336 20.7485 16.6121 20.5982 16.8996 20.3292C17.1871 20.0603 17.3622 19.6927 17.39 19.3L18.2 6.3L5.83986 6.25Z" fill="#0066BE"></path><path d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z" fill="#0066BE"></path><path d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z" fill="#0066BE"></path><path d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z" fill="#0066BE"></path><path d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z" fill="#0066BE"></path><path d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z" fill="#0066BE"></path></svg>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )
          )}
          {/* <div className="load_more">
              {isLoaded == true ? (
                <Button
                  className="btn btn-primary btn-filled"
                  onClick={loadMoreClicked}
                >
                  Load More
                </Button>
              ) : null}
            </div> */}
        </div>
      </div>
      <div className="modal">
        <Modal
          id="add_hcp"
          className="update_quest"
          show={showUploadMenu}
          onHide={() => setShowUploadMenu(false)}
          backdrop="static"
          keyboard={false}
          onExited={handleCloseUploadMenu}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <div
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-hidden="true"
          >
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {method === "add" ? "Add New Question" : "Update Question"}
              </h5>
            </div>
            <div className="modal-body">
              <div className="hcp-add-box">
                <div className="hcp-add-form tab-content" id="upload-confirm">
                  {questions.map((questionObj, index) => (
                    <div key={questionObj.key}>
                      <Question
                        questionData={questionObj.questionData}
                        questionDataErrors={questionObj.questionDataErrors}
                        onQuestionChange={(e) => handleQuestionChange(e, index)}
                        onHandleIsRequiredChange={(e) =>
                          handleIsRequiredChange(e, index)
                        }
                        onHandleSpeakerNameChange={(e) =>
                          handleSpeakerNameChange(e, index)
                        }
                        onChoiceChange={(e, choiceIndex) =>
                          handleChoiceChange(e, index, choiceIndex)
                        }
                        onChoiceColorChange={(e, choiceIndex) =>
                          handleChoiceColorChange(e, index, choiceIndex)
                        }
                        onTypeChange={(e) => handleTypeChange(e, index)}
                        onAddChoice={() => handleAddChoice(index)}
                        onDelete={() => handleDelete(index)}
                        onDeleteChoice={(choiceIndex) =>
                          handleDeleteChoice(index, choiceIndex)
                        }
                      />
                    </div>
                  ))}
                </div>
                {/* <Button variant="primary" onClick={handleAddQuestion}>
                            Add Question
                          </Button> */}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary save btn-filled"
                onClick={handleSubmit}
              >
                Save
              </button>
              <Button
                type="button"
                className="btn btn-danger save btn-bordered"
                onClick={() => setShowUploadMenu(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
        <CommonConfirmModel
          show={confirmationpopup}
          onClose={hideConfirmationModal}
          fun={handleDeleteClick}
          popupMessage={popupMessage}
          path_image={path_image}
          resetDataId={resetDataId}
        />
      </div>
    </Col>
  );
}
