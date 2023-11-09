import React, { useEffect, useRef, useState } from "react";
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
import Slider from "react-slick";
import { toast, ToastContainer } from "react-toastify";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLocation, useNavigate } from "react-router-dom";

let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const settings = {
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: false,
  arrows: false,
  centerMode: false,
  // centerPadding: "5%",
  speed: 1500,
  vertical: true,
  verticalScrolling: true,
  swipe: false,
  touchMove: false,
  responsive: [
    {
      breakpoint: 558,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
      },
    },
  ],
};
export default function PollListing() {
  let navigate = useNavigate();

  const location = useLocation();
  const event_code = location?.state?.event_id ? location?.state?.event_id : "";
  const slickRef = useRef("");
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
  const [selectedItem, setSelectedItem] = useState({});
  const [method, setMethod] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [originalQuestions, setOriginalQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionFlag, setQuestionFlag] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState(
    questions[currentIndex]
  );

  useEffect(() => {
    // if (!event_code) {
        getAllEvents();
        //get all events listing

      // toast.warning("Event Not Found", {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
      // navigate("/event-listing");
    // }else{
    //   getApiData(event_code);
    // }
  }, []);

  const getApiData = async (event_code) => {
    try {
      loader("show");

      let apiData = await getListingData(event_code);

      // Create a deep copy of apiData
      const deepCopyApiData = JSON.parse(JSON.stringify(apiData));

      setQuestions(apiData);
      setOriginalQuestions(deepCopyApiData);

      slickRef.current.slickGoTo(0);
      setCurrentIndex(0);

      setApiStatus(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      loader("hide");
    }
  };

  const getAllEvents = async () => {
    try{
      loader("show");
      const response = await getData(`${ENDPOINT.WEBINAR_GET_EVENT_LISTING}?limit=50`);
      const allevents = response?.data?.data?.data;
      if(allevents?.length > 0){
          let dropDownDataTemp = allevents?.map((item) => ({
            value: item?.id,
            label: item?.title,
          }));
          setDropDownData(dropDownDataTemp);
          let index = 0;
          if (event_code != '') {
             index = dropDownDataTemp.findIndex(obj => obj.value === event_code);
          }
          console.log(index,"Selected index");
          let selectedData = dropDownDataTemp.length
              ? dropDownDataTemp?.[index]
              : { value: "", label: "" };
            setSelectedItem(selectedData);
            if (selectedData) {
              getApiData(selectedData.value);
            }
      }
    }catch(err){
      loader("hide");
      console.log(err);
    }
  }

  const handleSelectChange = async (event) => {
    loader("show");
    setApiStatus(() => false);
    setQuestions(() => {
      let data = [];
      return data;
    });
    let apiData = await getListingData(event.value);
    setQuestions(apiData);
    slickRef.current.slickGoTo(0);
    setCurrentIndex(0);

    setSelectedItem(event);
    setApiStatus(true);
  };
  const getListingData = async (id) => {
    try {
      loader("show");
      const apiData = await getData(`/webinar/getQuestionByEventId/${id}`);
      let data = apiData.data.data;

      data = data.map((d) => {
        const answerOptionError = d?.answerOption?.map((data) => {
          return {
            answerError: "",
            colorError: "",
          };
        });
        return {
          questionData: d,
          questionDataErrors: {
            questionError: "",
            speakerNameError: "",
            answerOptionError: answerOptionError,
            answerTypeError: "",
          },
        };
      });
      // console.log(data);
      // setQuestions(data)
      console.log(data,'');
      setQuestionFlag(data?.length<=0?true:false)
      data = data?.length
        ? data
        : [
            {
              questionData: {
                question: "",
                speakerName: "",
                answerOption: [{ answer: "", color: "#000000" }],
                answerType: "MULTIPLE",

                graphType: "bar",
              },
              questionDataErrors: {
                questionError: "",
                speakerNameError: "",
                answerOptionError: [{ answerError: "", colorError: "#000000" }],
                answerTypeError: "",
              },
            },
          ];
      loader("hide");
      const deepCopyApiData = JSON.parse(JSON.stringify(data));

      setOriginalQuestions(deepCopyApiData);
      return data;
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
      if (
        originalQuestions[key] &&
        originalQuestions[key].questionData.answerOption?.length &&
        originalQuestions[key]?.questionData.answerType == e.target.id
      ) {
        updatedQuestions[key].questionData.answerOption =
          originalQuestions[key].questionData.answerOption;
        updatedQuestions[key].questionDataErrors.answerOptionError =
          originalQuestions[key].questionData.answerOption.map((data) => {
            return {
              answerError: "",
              colorError: "",
            };
          });
      } else {
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
      }
    } else {
      if (
        originalQuestions[key] &&
        originalQuestions[key].questionData.answerOption?.length &&
        originalQuestions[key]?.questionData.answerType == e.target.id
      ) {
        updatedQuestions[key].questionData.answerOption =
          originalQuestions[key].questionData.answerOption;
        updatedQuestions[key].questionDataErrors.answerOptionError =
          originalQuestions[key].questionData.answerOption.map((data) => {
            return {
              answerError: "",
              colorError: "",
            };
          });
      } else {
        updatedQuestions[key].questionData.answerOption = [
          { answer: "", color: "#000000" },
        ];
        updatedQuestions[key].questionDataErrors.answerOptionError.push({
          answerError: "",
          colorError: "",
        });
      }
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
    const isValid = validateQuestions(key, "addChoice");

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
    // console.log(questions);
    // return;
    const isValid = validateQuestions(currentIndex);

    if (!isValid) {
      return;
    }

    loader("show");

    const surveyData = questions[currentIndex].questionData;
    // setSurveyData(surveyData);

    try {
      let response;
      const payLoadData = {
        data: [surveyData],
      };
      if (!surveyData?.id) {
        payLoadData.eventId = selectedItem?.value;
        response = await postData(ENDPOINT.ADD_QUESTION, payLoadData);
        loader("hide");
        toast.success("Question Inserted Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // slickRef.current.slickGoTo(0);
        // setCurrentIndex(0);
      } else {
        const id = surveyData?.id;
        response = await updateConsent(
          `${ENDPOINT.EDIT_QUESTION}/${id}`,
          payLoadData
        );
        toast.success("Question Updated Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setShowUploadMenu(false);
      const apiData = await getListingData(selectedItem?.value);
      slickRef.current.slickGoTo(apiData.length);
      // setCurrentIndex(0);
      setQuestionFlag(false);
      loader("hide");

      setQuestions(apiData);
    }
  };
  const validateQuestions = (index, key) => {
    let isValid = true;
    const updatedQuestions = [...questions];
    let questionObj = updatedQuestions[index];
if(!questionObj){
 setCurrentIndex(Math.abs(currentIndex-1))
 return
}
    const question = questionObj.questionData.question;
    const speakerName = questionObj.questionData.speakerName;
    const answerType = questionObj.questionData.answerType;
    // if (eventId.trim() === "") {
    //   setEventError( "Please Select Event");
    //   isValid = false;
    // } else {
    //   setEventError( "");

    // }

    if (question.trim() === "" && key != "addChoice") {
      questionObj.questionDataErrors.questionError = "Question is required.";
      isValid = false;
    } else {
      questionObj.questionDataErrors.questionError = "";
    }
    if (speakerName.trim() === "" && key != "addChoice") {
      questionObj.questionDataErrors.speakerNameError =
        "Speaker Name is required.";
      isValid = false;
    } else {
      questionObj.questionDataErrors.speakerNameError = "";
    }
    if (answerType.trim() === "" && key != "addChoice") {
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
    updatedQuestions[index] = questionObj;
    // console.log(questionObj);
    setQuestions(updatedQuestions);
    setSelectedQuestion(questionObj);
    return isValid;
  };
  const handleAddQuestion = () => {

    const isValid = validateQuestions(currentIndex);

    if (!isValid) {
      return;
    }
    setQuestionFlag(true);
    const key = questions.length;
    let newQuestion = {
      questionData: {
        question: "",
        speakerName: "",
        answerOption: [{ answer: "", color: "#000000" }],
        answerType: "MULTIPLE",

        graphType: "bar",
      },
      questionDataErrors: {
        questionError: "",
        speakerNameError: "",
        answerOptionError: [{ answerError: "", colorError: "#000000" }],
        answerTypeError: "",
      },
    };
    setCurrentIndex(Math.abs(questions?.length));
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    slickRef.current.slickGoTo(questions?.length);
    setSelectedQuestion(newQuestion);
    // setQuestionFlag(false);
  };
  const handleDelete = (key) => {
    setPopupMessage({
      message1: "You are about to remove this question.",
      message2: "Are you sure you want to do this?",
      footerButton: "Yes please!",
    });
    setConfirmationPopup(true);
    setResetDataId(key);
  };
  const finalHandleDelete = async (key) => {
    try {
      loader("show");
      if (key == questions?.length - 1) {
        setQuestionFlag(false);
      }
      const updatedQuestions = [...questions];
      let deletedQuestionId = updatedQuestions[key].questionData.id;
      if (deletedQuestionId) {
        let res = await deleteData(
          `/webinar/delete-question`,
          deletedQuestionId
        );
        let apiData = await getListingData(selectedItem?.value);
        setQuestions(apiData);
      }

      updatedQuestions.splice(key, 1);
      if (questions.length <= 1) {
        updatedQuestions[0] = {
          questionData: {
            question: "",
            speakerName: "",
            answerOption: [{ answer: "", color: "#000000" }],
            answerType: "MULTIPLE",

            graphType: "bar",
          },
          questionDataErrors: {
            questionError: "",
            speakerNameError: "",
            answerOptionError: [{ answerError: "", colorError: "#000000" }],
            answerTypeError: "",
          },
        };
        setCurrentIndex(0);
        setQuestionFlag(true)
        setSelectedQuestion(updatedQuestions[0]);
      } else if (questions.length == 2) {
        setCurrentIndex(0);
      }
      else if(currentIndex>=questions?.length-1){
        setCurrentIndex(Math.abs(currentIndex-1));

      }

      setQuestions(updatedQuestions);
      toast.success("Question Deleted Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setConfirmationPopup(false);
      loader("hide");
    }
  };

  const handleIncrementChange = (key) => {
    // const isValid = validateQuestions();

    // if (!isValid) {
    //   return;
    // }

    let newIndex = currentIndex;

    if (key === "prev" && newIndex > 0) {
      newIndex = newIndex - 1;
    } else if (key === "next" && newIndex < questions.length - 1) {
      newIndex = newIndex + 1;
    }

    setSelectedQuestion(questions[newIndex]);

    setCurrentIndex(Math.abs(newIndex));
  };
  const hideConfirmationModal = () => {
    setConfirmationPopup(false);
  };
  const handleAfterChange = (current) => {
    setCurrentIndex(Math.abs(current));
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
            <div className="poll-question">
              {apiStatus && (
                <div className="poll-question-selection">
                  <div className="question-number">
                    <span>
                      Q{currentIndex + 1}/{questions.length}
                    </span>
                  </div>
                  <div className="question-action">
                    <Button
                      className={`btn-bordered question-prev ${
                        currentIndex == 0 ? "disabled" : ""
                      } `}
                      // disabled={index == 0 ? true : false}
                      onClick={() => slickRef.current.slickPrev()}
                    >
                      <svg
                        width="19"
                        height="11"
                        viewBox="0 0 19 11"
                        fill="none"
                      >
                        <path
                          d="M9.27902 3.61976L2.56094 10.3378C1.97509 10.9236 1.02524 10.9236 0.439388 10.3378C-0.146462 9.75196 -0.146463 8.80211 0.439387 8.21626L8.21496 0.440724C8.41288 0.242814 8.65233 0.111762 8.90525 0.0475674C9.4024 -0.0805243 9.95244 0.0500824 10.3417 0.439387L18.1173 8.21496C18.7031 8.80081 18.7031 9.75066 18.1173 10.3365C17.5314 10.9224 16.5816 10.9224 15.9957 10.3365L9.27902 3.61976Z"
                          fill="#0066BE"
                        />
                      </svg>
                    </Button>
                    <Button
                      className={`btn-bordered question-next ${
                        currentIndex == questions.length - 1 ? "disabled" : ""
                      }`}
                      onClick={() => {
                        slickRef.current.slickNext();
                        // console.log(slickRef.current);
                      }}
                    >
                      <svg
                        width="19"
                        height="11"
                        viewBox="0 0 19 11"
                        fill="none"
                      >
                        <path
                          d="M9.27853 7.15662L2.56206 0.442137C1.97595 -0.143796 1.02569 -0.143796 0.43958 0.442137C-0.146527 1.02807 -0.146527 1.97806 0.43958 2.56399L8.21954 10.3416C8.80565 10.9276 9.75591 10.9276 10.342 10.3416C10.3643 10.3194 10.3858 10.2965 10.4064 10.2732L18.1204 2.56155C18.7065 1.97556 18.7065 1.02548 18.1204 0.439493C17.5342 -0.146497 16.5838 -0.146498 15.9977 0.439493L9.27853 7.15662Z"
                          fill="#0066BE"
                        />
                      </svg>
                    </Button>
                    <Button
                      className="dl_btn btn-bordered"
                      onClick={() => {
                        setPopupMessage({
                          message1: "You are about to remove this question.",
                          message2: "Are you sure you want to do this?",
                          footerButton: "Yes please!",
                        });
                        setConfirmationPopup(true);
                        setResetDataId(currentIndex);
                      }}
                      // onClick={handleDelete}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.84 22.25H8.15989C7.3915 22.2389 6.65562 21.9381 6.09941 21.4079C5.5432 20.8776 5.20765 20.157 5.15985 19.39L4.24984 5.55C4.24518 5.44966 4.26045 5.34938 4.29478 5.25498C4.32911 5.16057 4.38181 5.07391 4.44985 5C4.51993 4.9234 4.60479 4.86177 4.69931 4.81881C4.79382 4.77584 4.89606 4.75244 4.99985 4.75H19C19.1029 4.74977 19.2046 4.7707 19.2991 4.81148C19.3935 4.85226 19.4785 4.91202 19.5488 4.98704C19.6192 5.06207 19.6733 5.15077 19.7079 5.24761C19.7426 5.34446 19.7569 5.44739 19.75 5.55L18.88 19.39C18.8317 20.1638 18.4905 20.8902 17.9258 21.4214C17.3611 21.9527 16.6153 22.249 15.84 22.25ZM5.83986 6.25L6.60987 19.3C6.63531 19.6935 6.80978 20.0625 7.09775 20.3319C7.38573 20.6013 7.76555 20.7508 8.15989 20.75H15.84C16.2336 20.7485 16.6121 20.5982 16.8996 20.3292C17.1871 20.0603 17.3622 19.6927 17.39 19.3L18.2 6.3L5.83986 6.25Z"
                          fill="#0066be"
                        ></path>
                        <path
                          d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z"
                          fill="#0066be"
                        ></path>
                        <path
                          d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z"
                          fill="#0066be"
                        ></path>
                        <path
                          d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z"
                          fill="#0066be"
                        ></path>
                        <path
                          d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z"
                          fill="#0066be"
                        ></path>
                        <path
                          d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z"
                          fill="#0066be"
                        ></path>
                      </svg>
                    </Button>
                    <Button
                      className={`add-question btn-bordered ${
                        questionFlag ? "disabled" : ""
                      }`}
                      onClick={handleAddQuestion}
                    >
                      Add Question +
                    </Button>

                    <Button
                      className="save btn-bordered"
                      onClick={handleSubmit}
                    >
                      {questions[currentIndex]?.questionData?.id
                        ? "Update"
                        : "Save"}
                    </Button>
                  </div>
                </div>
              )}
              <Slider
                {...settings}
                ref={slickRef}
                afterChange={handleAfterChange}
              >
                {questions.map((questionObj, index) => (
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
                    onHandleAddQuestion={() => handleAddQuestion(index)}
                    onHandleDelete={handleDelete}
                    onHandleIncrementChange={handleIncrementChange}
                    lastQuestionIndex={questions.length}
                  />
                ))}
              </Slider>
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
