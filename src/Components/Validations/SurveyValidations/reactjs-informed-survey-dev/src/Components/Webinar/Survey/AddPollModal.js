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
import { getData, postData } from "../../../axios/apiHelper";
import { Link } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Question from "./Question";
import { useLocation } from "react-router-dom";
export default function PollListing() {
  const [showUploadMenu, setShowUploadMenu] = useState(false);

  const [dropDownData, setDropDownData] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [data, setData] = useState([
    {
      question: "What is the capital of Italy?",
      speakerName: "Ammir",
      answerOption: [
        {
          answer: "Rome",
          color: "#ff2e2e",
        },
        {
          answer: "Madrid",
          color: "#3e3737",
        },
        {
          answer: "Athens",
          color: "#4dfd0d",
        },
      ],
      answerType: "single",
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      speakerName: "Saleem",
      answerOption: [
        {
          answer: "Charles Dickens",
          color: "#ff2e2e",
        },
        {
          answer: "William Shakespeare",
          color: "#3e3737",
        },
        {
          answer: "Jane Austen",
          color: "#4dfd0d",
        },
      ],
      answerType: "single",
    },
    {
      question: "What is the largest planet in our solar system?",
      speakerName: "Lone",
      answerOption: [
        {
          answer: "Earth",
          color: "#ff2e2e",
        },
        {
          answer: "Mars",
          color: "#3e3737",
        },
        {
          answer: "Jupiter",
          color: "#4dfd0d",
        },
      ],
      answerType: "single",
    },
  ]);

  useEffect(() => {
    getApiData();
  }, []);

  const getApiData = async () => {
    try {
      const response = await getData(ENDPOINT.EVENT_LIST);
      setDropDownData(response.data.data);
      setSelectedItem(response.data.data[0] ? response.data.data[0] : "");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedItem(event.target.value);
  };

  const handleEditClick = (itemId) => {
    setEditingItemId(itemId);
  };

  const handleDeleteClick = async (itemId) => {
    try {
      // await deleteData(`${ENDPOINT.EVENT_LIST}/${itemId}`);
      // After successful deletion, you can refresh the data by fetching it again
      getApiData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  const handleCloseUploadMenu = () => {
    setShowUploadMenu(false);
    resetPoll();
  };
  const { state } = useLocation();
  console.log(state);
  const answerOptionError = (
    state?.data?.answerOption || [
      {
        answerError: "",
        colorError: "",
      },
    ]
  ).map((data) => {
    return {
      answerError: "",
      colorError: "",
    };
  });
  const [questions, setQuestions] = useState([
    {
      key: 0,

      questionData: state?.data || {
        question: "What is your name?",
        speakerName: "",
        answerOption: [{ answer: "", color: "#000" }],
        answerType: "",
      },
      questionDataErrors: {
        questionError: "",
        speakerNameError: "",
        answerOptionError: answerOptionError,
        answerTypeError: "",
      },
    },
  ]);
  const [surveyData, setSurveyData] = useState([]);
  const [eventId, setEventid] = useState(state?.eventId?.event_code);
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
          answerOption: [{ answer: "", color: "#000" }],
          answerType: "",
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
  const handleSpeakerNameChange = (e, key) => {
    const updatedQuestions = [...questions];
    updatedQuestions[key].questionData.speakerName = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleTypeChange = (e, key) => {
    const updatedQuestions = [...questions];
    updatedQuestions[key].questionData.answerType = e.target.value;
    updatedQuestions[key].questionData.answerOption = [
      { answer: "", color: "" },
    ];
    updatedQuestions[key].questionDataErrors.answerOptionError = [
      { answerError: "", colorError: "" },
    ];

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
    // const isValid = validateQuestions();

    // if (!isValid) {
    //   return;
    // }

    const updatedQuestions = [...questions];
    updatedQuestions[key].questionData.answerOption.push({
      answer: "",
      color: "",
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
          questionObj.questionData.answerType != "input"
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
          choice.color.trim() === "" &&
          questionObj.questionData.answerType != "input"
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
    console.log({
      eventId: selectedItem,
      data: questions.map((questionObj) => questionObj.questionData),
    });

    const isValid = validateQuestions();

    if (!isValid) {
      return;
    }

    const surveyData = questions.map((questionObj) => questionObj.questionData);

    setSurveyData(surveyData);
    let response = await postData(ENDPOINT.ADD_QUESTION, {
      eventId: selectedItem.id,
      data: surveyData,
    });
    resetPoll();
    handleCloseUploadMenu();
  };

  const resetPoll = () => {
    setQuestions([
      {
        key: 0,

        questionData: state?.data || {
          question: "",
          speakerName: "",
          answerOption: [{ answer: "", color: "" }],
          answerType: "",
        },
        questionDataErrors: {
          questionError: "",
          speakerNameError: "",
          answerOptionError: answerOptionError,
          answerTypeError: "",
        },
      },
    ]);
  };
 
    

  return (
    <Col className="col right-sidebar">
     
      <Row>
        <Modal show={showUploadMenu} onHide={handleCloseUploadMenu}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Poll</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <div className="card">
              <div className="card-body">
                <>
                  <Col>
                    <Row>
                      {/* <Col md={3}>
    <Form.Group>
      <Form.Control as="select" value={eventId} onChange={onEventChange}>
        <option value="">Select Event</option>
        <option value="255">255</option>
        <option value="522">522</option>
        <option value="111">111</option>
      </Form.Control>
      <p className="text-danger">{eventError}</p>
    </Form.Group>
  </Col> */}
                    </Row>
                    <Row>
                      <div>
                        <div>
                          {questions.map((questionObj, index) => (
                            <div key={questionObj.key}>
                              <Container>
                                <h6>Question no {index + 1}</h6>
                                <Question
                                  questionData={questionObj.questionData}
                                  questionDataErrors={
                                    questionObj.questionDataErrors
                                  }
                                  onQuestionChange={(e) =>
                                    handleQuestionChange(e, index)
                                  }
                                  onHandleSpeakerNameChange={(e) =>
                                    handleSpeakerNameChange(e, index)
                                  }
                                  onChoiceChange={(e, choiceIndex) =>
                                    handleChoiceChange(e, index, choiceIndex)
                                  }
                                  onChoiceColorChange={(e, choiceIndex) =>
                                    handleChoiceColorChange(
                                      e,
                                      index,
                                      choiceIndex
                                    )
                                  }
                                  onTypeChange={(e) =>
                                    handleTypeChange(e, index)
                                  }
                                  onAddChoice={() => handleAddChoice(index)}
                                  onDelete={() => handleDelete(index)}
                                  onDeleteChoice={(choiceIndex) =>
                                    handleDeleteChoice(index, choiceIndex)
                                  }
                                />
                              </Container>
                            </div>
                          ))}
                        </div>
                        {/* <Button variant="primary" onClick={handleAddQuestion}>
                            Add Question
                          </Button> */}
                      </div>
                    </Row>
                  </Col>
                </>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {" "}
            <Button variant="success" onClick={handleSubmit}>
              Save
            </Button>
            <Button variant="danger" onClick={handleCloseUploadMenu}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </Col>
  );
}
