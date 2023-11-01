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
      questionData: {
        question: "Whats Your Name ?",
        speakerName: "Aamir",
        answerOption: [{ answer: "", color: "#000000" }],
        answerType: "MULTIPLE",
        isRequired: 0,
        graphType: "bar",
      },
      questionDataErrors: {
        questionError: "",
        speakerNameError: "",
        answerOptionError: [{ answerError: "", colorError: "#000000" }],
        answerTypeError: "",
      },
    },
    {
      questionData: {
        question: "Whats going on ?",
        speakerName: "Admin",
        answerOption: [{ answer: "", color: "#000000" }],
        answerType: "RADIO",
        isRequired: 0,
        graphType: "pie",
      },
      questionDataErrors: {
        questionError: "",
        speakerNameError: "",
        answerOptionError: [{ answerError: "", colorError: "#000000" }],
        answerTypeError: "",
      },
    },
    {
      questionData: {
        question: "Where are you from ?",
        speakerName: "Saleem",
        answerOption: [
          { answer: "Yes", colorError: "#000000" },
          { answer: "No", colorError: "#000000" },
        ],
        answerType: "YesNo",
        isRequired: 0,
        graphType: "bar",
      },
      questionDataErrors: {
        questionError: "",
        speakerNameError: "",
        answerOptionError: [
          { answerError: "", colorError: "#000000" },
          { answerError: "", colorError: "#000000" },
        ],
        answerTypeError: "",
      },
    },
  ]);
  const [index, setIndex] = useState(0);

  const [selectedQuestion, setSelectedQuestion] = useState(questions[index]);

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
  const handleSelectChange = async (event) => {
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
  const handleQuestionChange = (e, key) => {
    const updatedQuestions = [...questions];
    updatedQuestions[key].questionData.question = e.target.value;
    setQuestions(updatedQuestions);
  };
  const handleTypeChange = (e, key) => {
    const updatedQuestions = [...questions];
    updatedQuestions[key].questionData.answerType = e.target.id;

    if (e.target.id == "YesNo") {
      updatedQuestions[key].questionData.answerOption = [
        {
          answer: "Yes",
          color: "#000000",
        },
        {
          answer: "No",
          color: "#000000",
        },
      ];
      updatedQuestions[key].questionDataErrors.answerOptionError.push(
        {
          answerError: "",
          colorError: "",
        },
        {
          answerError: "",
          colorError: "",
        }
      );
    } else {
      updatedQuestions[key].questionData.answerOption = [
        { answer: "", color: "#000000" },
      ];
      updatedQuestions[key].questionDataErrors.answerOptionError.push({
        answerError: "",
        colorError: "",
      });
    }
    // if (e == "INPUT") {
    //   updatedQuestions[key].questionData.answerOption = [];

    //   updatedQuestions[key].questionDataErrors.answerOptionError = [
    //     { answerError: "", colorError: "" },
    //   ];
    // } else {
    //   updatedQuestions[key].questionData.answerOption = [
    //     { answer: "", color: "#000000" },
    //   ];
    //   updatedQuestions[key].questionDataErrors.answerOptionError = [
    //     { answerError: "", colorError: "" },
    //   ];
    // }
    setQuestions(updatedQuestions);
  };
  const handleSpeakerNameChange = (e, key) => {
    const updatedQuestions = [...questions];
    updatedQuestions[key].questionData.speakerName = e.target.value;
    setQuestions(updatedQuestions);
  };
  const handleDisplayResultChange = (e, key) => {
    const updatedQuestions = [...questions];
    if (e.target.checked) {
      updatedQuestions[key].questionData.graphType = "pie";
    } else {
      updatedQuestions[key].questionData.graphType = "bar";
    }

    setQuestions(updatedQuestions);
  };
  const handleAddChoice = (key) => {
    const isValid = validateQuestions();

    if (!isValid) {
      return;
    }

    const updatedQuestions = [...questions];
    if (updatedQuestions[key].answerType != "YesNo") {
      updatedQuestions[key].questionData.answerOption.push({
        answer: "",
        color: "#000000",
      });
      updatedQuestions[key].questionDataErrors.answerOptionError.push({
        answerError: "",
        colorError: "",
      });
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
  const handleDeleteChoice = (questionKey, choiceIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionKey].questionData.answerOption.splice(
      choiceIndex,
      1
    );
    setQuestions(updatedQuestions);
  };
  const handleSubmit = async () => {
    const isValid = validateQuestions();

    if (!isValid) {
      return;
    }

    loader("show");

    const surveyData = questions.map(({ questionData }) => questionData);
    // setSurveyData(surveyData);

    try {
      let response;
      const payLoadData = {
        data: surveyData,
      };
      // console.log(payLoadData);

      // if (method === "add") {
      //   payLoadData.eventId = selectedItem.value;
      //   response = await postData(ENDPOINT.ADD_QUESTION, payLoadData);
      // } else if (method === "edit") {
      //   const id = surveyData[0]?.id;
      //   response = await updateConsent(
      //     `${ENDPOINT.EDIT_QUESTION}/${id}`,
      //     payLoadData
      //   );
      // }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      // setShowUploadMenu(false);
      // const apiData = await getListingData(selectedItem.value);
      // setData(apiData.data.data);
    }
  };
  const validateQuestions = () => {
    let isValid = true;
    // const updatedQuestions = [...questions];
    // console.log(updatedQuestions);
    let questionObj = { ...selectedQuestion };
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

    // updatedQuestions = questionObj;

    console.log(questionObj);
    setSelectedQuestion(questionObj);
    return isValid;
  };
  const handleAddQuestion = () => {
    const isValid = validateQuestions();

    if (!isValid) {
      return;
    }
    const key = questions.length;
    let newQuestion = {
      key: 0,

      questionData: {
        question: "",
        speakerName: "",
        answerOption: [{ answer: "", color: "#000000" }],
        answerType: "MULTIPLE",
        isRequired: 0,
        graphType: "bar",
      },
      questionDataErrors: {
        questionError: "",
        speakerNameError: "",
        answerOptionError: [{ answerError: "", colorError: "#000000" }],
        answerTypeError: "",
      },
    };
    setIndex(questions?.length);
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    setSelectedQuestion(newQuestion);
  };
  const handleDelete = (key) => {
    setPopupMessage({
            message1:
              "You are about to remove this question.",
            message2: "Are you sure you want to do this?",
            footerButton: "Yes please!",
          }); setConfirmationPopup(true); setResetDataId(key)
  }; 
   const finalHandleDelete = (key) => {
    console.log(key, "key");
    const updatedQuestions = [...questions];
    updatedQuestions.splice(key, 1);
    if (key < questions.length - 1) {
      setSelectedQuestion(updatedQuestions[key]);
      // setIndex(key)
    }
    setQuestions(updatedQuestions);
    setConfirmationPopup(false);
  };
  const handleIncrementChange = (key) => {
    const isValid = validateQuestions();

    if (!isValid) {
      return;
    }

    let newIndex = index;

    if (key === "prev" && newIndex > 0) {
      newIndex = newIndex - 1;
    } else if (key === "next" && newIndex < questions.length - 1) {
      newIndex = newIndex + 1;
    }

    setSelectedQuestion(questions[newIndex]);

    setIndex(newIndex);
  };
  const hideConfirmationModal = () => {
    setConfirmationPopup(false);
  };
  return (
    <>
    <Col className="col right-sidebar">
      <div className="custom-container">
        <div className="row">
          <div className="form_action sticky-view">
            <div className="d-flex justify-content-between align-items-center">
              <div className="create-change-content question-listing">
                <div className="top-header reader_list">
                  <div className="page-title">
                    <h4>Polls</h4>
                  </div>
                </div>

                <form className="product-unit d-flex justify-content-between align-items-center">
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

          <div>
            <Question
              index={index}
              questionData={selectedQuestion.questionData}
              questionDataErrors={selectedQuestion.questionDataErrors}
              onQuestionChange={(e) => handleQuestionChange(e, index)}
              // onHandleIsRequiredChange={(e) =>
              //   handleIsRequiredChange(e, index)
              // }
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
              onHandleDisplayResultChange={(e) =>
                handleDisplayResultChange(e, index)
              }
              onAddChoice={() => handleAddChoice(index)}
              onDelete={() => handleDelete(index)}
              onDeleteChoice={(choiceIndex) =>
                handleDeleteChoice(index, choiceIndex)
              }
              onHandleSubmit={handleSubmit}
              onHandleAddQuestion={handleAddQuestion}
              onHandleDelete={handleDelete}
              onHandleIncrementChange={handleIncrementChange}
              lastQuestionIndex={questions.length}
            />
          </div>
        </div>
      </div>
    </Col>
    <CommonConfirmModel
        show={confirmationpopup}
        onClose={hideConfirmationModal}
        fun={finalHandleDelete}
        popupMessage={popupMessage}
        path_image={path_image}
        resetDataId={resetDataId}
      />
    </>
  );
}
