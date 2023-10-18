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
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

export default function PollListing() {
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [commonConfirmModelFun, setCommonConfirmModelFun] = useState(() => {});
  const [apiStatus, setApiStatus] = useState(true);
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
  const [questions, setQuestions] = useState([
    {
      key: 0,

      questionData: {
        question: "",
        speakerName: "",
        answerOption: [{ answer: "", color: "#000000" }],
        answerType: "",
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

      const response = await getData(ENDPOINT.EVENT_LIST);
      setDropDownData(response.data.data);
      let selectedData = response.data.data[0] ? response.data.data[0] : "";
      setSelectedItem(selectedData?.id);
      if (selectedData) {
        let apiData = await getListingData(selectedData.id);
        setData(apiData.data.data);
      }
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
    loader("show");
    setApiStatus(false)
    setData(()=>{
      let data=[]
      return data
    })
    let apiData = await getListingData(event.target.value);
    setData(apiData.data.data);
    setSelectedItem(event.target.value);
    setApiStatus(true)

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
      // console.log(itemId);
      loader("show");
      let res = await deleteData(`/webinar/delete-question`, itemId);
      let apiData = await getListingData(selectedItem);
      setData(apiData.data.data);
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setConfirmationPopup(false);
    }
  };
  const handleCloseUploadMenu = () => {
    setShowUploadMenu(()=> false);
    setQuestions([
      {
        key: 0,

        questionData: {
          question: "",
          speakerName: "",
          answerOption: [{ answer: "", color: "" }],
          answerType: "",
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
    if (method != "edit" || (method == "edit" && e.target.value == "input")) {
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
          questionObj?.questionData?.answerType != "input"
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
    const isValid = validateQuestions();
  
    if (!isValid) {
      return;
    }
  
    loader("show");
  
    const surveyData = questions.map((questionObj) => questionObj.questionData);
    setSurveyData(surveyData);
  
    try {
      if (method === "add") {
        const payLoadData = {
          eventId: selectedItem,
          data: surveyData,
        };
  
        let response = await postData(ENDPOINT.ADD_QUESTION, payLoadData);
      } else if (method === "edit") {
        const payLoadData = {
          data: surveyData,
        };
  
        let response = await updateConsent(
          `${ENDPOINT.EDIT_QUESTION}/${surveyData[0]?.id}`,
          payLoadData
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      handleCloseUploadMenu();
      let apiData = await getListingData(selectedItem);
      setData(apiData?.data?.data);
    }
  };
  


  const onEventChange = (e, key) => {
    setEventid(e.target.value);
  };

  const hideConfirmationModal = () => {
    setConfirmationPopup(false);
  };
  return (
    <Col className="col right-sidebar">
      <div className="custom-container">
         <div className="row">

          <Container>
            <h1>Poll Listing</h1>
            {/* <Link
              className="btn btn-primary btn-bordered back-btn"
              to="/add-poll"
              state={{ eventId: selectedItem }}
            > */}
            <Button
              className="align-right"
              variant="primary"
              onClick={() => {
                setShowUploadMenu(true);
                setMethod("add");
              }}
            >
              Add New Question
            </Button>{" "}
            {/* </Link> */}
            <div className="col-12 col-md-6">
                                  <div className="form-group">
              <Form.Select
                value={selectedItem?.event_code}
                className="dropdown-basic-button split-button-dropup"

                onChange={handleSelectChange}
              >
                {dropDownData.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.event_code}
                  </option>
                ))}
              </Form.Select>
              </div>
              </div>
            {data.length == 0 && apiStatus ? (
             <table >
             <tbody>
               <tr>
                 <td colSpan="3"><h4>
                   No Data Found</h4>
                 </td>
               </tr>
             </tbody>
           </table>
            ) :  apiStatus && (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Question</th>
                    <th>Answer Type</th>
                    <th>Actions</th>
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
                          variant="primary"
                          onClick={() => handleEditClick(item)}
                        >
                          Edit
                        </Button>{" "}
                        <Button
                          variant="danger"
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
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Container>
         </div >

      </div>
       <div className="row">

        <Modal show={showUploadMenu} onHide={handleCloseUploadMenu}>
          <Modal.Header closeButton>
            <Modal.Title>
              {method == "add" ? "Add New Question" : "Update Question"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <div className="card">
              <div className="card-body">
                <>
                  <Col>
                     <div className="row">

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
                     </div >

                     <div className="row">

                      <div>
                        <div>
                          {questions.map((questionObj, index) => (
                            <div key={questionObj.key}>
                              <Container>
                                {/* <h6>Question no {index + 1}</h6> */}
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
                     </div >

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
        <CommonConfirmModel
          show={confirmationpopup}
          onClose={hideConfirmationModal}
          fun={handleDeleteClick}
          popupMessage={popupMessage}
          path_image={path_image}
          resetDataId={resetDataId}
        />
       </div >

    </Col>
  );
}
