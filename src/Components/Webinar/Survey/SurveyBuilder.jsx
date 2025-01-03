import React from "react";
import { Col, Row, Button, Container, Form } from "react-bootstrap";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Question from "./Question";
import { ENDPOINT } from "../../../axios/apiConfig";
import { getData, postData } from "../../../axios/apiHelper";
import { useLocation } from "react-router-dom";

const SurveyBuilder = () => {
  const { state } = useLocation();
  const answerOptionError = (state?.data?.answerOption || [{
    answerError: "",
    colorError: "",
  }] ).map((data) => {
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
        answerOption: [{answer:"",color:"#000"}],
        answerType: "",
      },
      questionDataErrors: {
        questionError: "",
        speakerNameError: "",
        answerOptionError:answerOptionError,
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
          answerOption: [{answer:"",color:"#000"}],
          answerType: "",
        },
          questionDataErrors: {
        questionError: "",
        speakerNameError: "",
        answerOptionError: [{answerError:"",colorError:""}],
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
    updatedQuestions[key].questionData.answerOption = [{answer:"",color:""}];
    updatedQuestions[key].questionDataErrors.answerOptionError= [{answerError:"",colorError:""}];

    setQuestions(updatedQuestions);
  };

  const handleChoiceChange = (e, questionKey, choiceIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionKey].questionData.answerOption[choiceIndex].answer =
      e.target.value;

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
    updatedQuestions[key].questionData.answerOption.push({answer:"",color:""});
    updatedQuestions[key].questionDataErrors.answerOptionError.push({answerError:"",colorError:""})

    setQuestions(updatedQuestions);
  };

  const handleDelete = (key) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(key, 1);
    setQuestions(updatedQuestions);
  };

  const handleDeleteChoice = (questionKey, choiceIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionKey].questionData.answerOption.splice(choiceIndex, 1);
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
        questionObj.questionDataErrors.speakerNameError = "Speaker Name is required.";
        isValid = false;
      } else {
        questionObj.questionDataErrors.speakerNameError = "";
      } 
      if (answerType.trim() === "") {
        questionObj.questionDataErrors.answerTypeError = "Please Select Answer Type";
        isValid = false;
      } else {
        questionObj.questionDataErrors.answerTypeError = "";
      }
      questionObj.questionData.answerOption.forEach((choice, choiceIndex) => {
        if (choice.answer.trim() === "" && questionObj.questionData.answerType !="input") {
          questionObj.questionDataErrors.answerOptionError[choiceIndex].answerError =
            "Answer is required.";
          isValid = false;
        } else {
          questionObj.questionDataErrors.answerOptionError[choiceIndex].answerError =
            "";
        }

        if (choice.color.trim() === "" && questionObj.questionData.answerType !="input") {
          questionObj.questionDataErrors.answerOptionError[choiceIndex].colorError =
            "Color is required.";
          isValid = false;
        } else {
          questionObj.questionDataErrors.answerOptionError[choiceIndex].colorError =
            "";
        }
      });

      updatedQuestions[index] = questionObj;
    });

    setQuestions(updatedQuestions);
    return isValid;
  };

  const handleSubmit = async () => {
    console.log({
      eventId:eventId,
      data:questions.map((questionObj) => questionObj.questionData)
   
    });

    const isValid = validateQuestions();

    if (!isValid) {
      return;
    }

    const surveyData = questions.map((questionObj) => questionObj.questionData);
   
    setSurveyData(surveyData);
   let response = await postData(ENDPOINT.ADD_QUESTION, {
    eventId:eventId,
    data:surveyData
  });
  };
  const onEventChange = (e, key) => {
 setEventid(e.target.value)
  
  };

  return (
    <>
      <Col className="col right-sidebar">
        <div className="custom-container">
        <Row>
          
        <div className="d-flex justify-content-center mb-5">
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
</div>
      </Row>
          <Row>
            <div>
              <div>
         
                {questions.map((questionObj, index) => (
                  <div key={questionObj.key}>
                    <Container
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        borderRadius: "8px",
                        width: "600px",
                        margin: "0 auto",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#fff",
                        marginBottom: "10px",
                      }}
                    >
                      <h6>Question no {index + 1}</h6>
                      <Question
                        questionData={questionObj.questionData}
                        questionDataErrors={questionObj.questionDataErrors}
                        onQuestionChange={(e) => handleQuestionChange(e, index)}
                        onHandleSpeakerNameChange={(e) =>
                          handleSpeakerNameChange(e, index)
                        }
                        onChoiceChange={(e, choiceIndex) =>
                          handleChoiceChange(e, index, choiceIndex)
                        }  onChoiceColorChange={(e, choiceIndex) =>
                          handleChoiceColorChange(e, index, choiceIndex)
                        }
                        onTypeChange={(e) => handleTypeChange(e, index)}
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
              <Button variant="primary" onClick={handleAddQuestion}>
                Add Question
              </Button>
              <Button variant="success" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </Row>
        </div>
      </Col>
    </>
  );
};

export default SurveyBuilder;
