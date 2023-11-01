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
        question: "Whats Your Name ?",
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
    },
    {
      key: 1,

      questionData: {
        question: "Whats Your Name buddy ?",
        speakerName: "",
        answerOption: [{ answer: "", color: "#000000" }],
        answerType: "MULTIPLE",
        isRequired: 0,
        graph_type: "pie",
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
    console.log(questions);
  };
  const handleDisplayResultChange = (e, key) => {
    const updatedQuestions = [...questions];
    if (e.target.checked) {
      updatedQuestions[key].questionData.speakerName = "pie";
    } else {
      updatedQuestions[key].questionData.speakerName = "bar";
    }

    setQuestions(updatedQuestions);
    console.log(questions);
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

          {questions.map((questionObj, index) => (
            <div key={questionObj.key}>
              <Question
                index={index}
                questionData={questionObj.questionData}
                questionDataErrors={questionObj.questionDataErrors}
                onQuestionChange={(e) => handleQuestionChange(e, index)}
                // onHandleIsRequiredChange={(e) =>
                //   handleIsRequiredChange(e, index)
                // }
                onHandleSpeakerNameChange={(e) =>
                  handleSpeakerNameChange(e, index)
                }
                // onChoiceChange={(e, choiceIndex) =>
                //   handleChoiceChange(e, index, choiceIndex)
                // }
                // onChoiceColorChange={(e, choiceIndex) =>
                //   handleChoiceColorChange(e, index, choiceIndex)
                // }
                onTypeChange={(e) => handleTypeChange(e, index)}
                onHandleDisplayResultChange={(e) =>
                  handleDisplayResultChange(e, index)
                }
                // onAddChoice={() => handleAddChoice(index)}
                // onDelete={() => handleDelete(index)}
                // onDeleteChoice={(choiceIndex) =>
                //   handleDeleteChoice(index, choiceIndex)
                // }
              />
            </div>
          ))}
        </div>
      </div>
    </Col>
  );
}
