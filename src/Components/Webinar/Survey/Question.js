import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import Select from "react-select";
import CommonConfirmModel from "../../../Model/CommonConfirmModel";
import PreviewGraphModal from "./PreviewGraphModal";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
let path_image = "../"+process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

let dropdownData = {
  INPUT: "User Input",
  RADIO: "Multiple Choices(One Answer)",
  CHECKBOX: "Multiple Choices(Multiple Answer)",
};
function Question(props) {
  const [dropDownOptions, setDropDownOptions] = useState([
    { label: "User Input", value: "INPUT" },
    { label: "Multiple Choices(One Answer)", value: "RADIO" },
    { label: "Multiple Choices(Multiple Answer)", value: "CHECKBOX" },
  ]);
  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [commonConfirmModelFun, setCommonConfirmModelFun] = useState(() => {});
  const [resetDataId, setResetDataId] = useState();

  const [popupMessage, setPopupMessage] = useState({
    message1: "",
    message2: "",
    footerButton: "",
  });
  const {
    index,
    questionData,
    onQuestionChange,
    onChoiceChange,
    onChoiceColorChange,
    onTypeChange,
    onAddChoice,
    onDelete,
    onDeleteChoice,
    onHandleSpeakerNameChange,
    questionDataErrors,
    onHandleIsRequiredChange,
    onHandleDisplayResultChange,
    onHandleSubmit,
    onHandleAddQuestion,
    onHandleDelete,
    onHandleIncrementChange,
    lastQuestionIndex,
  } = props;
  const checkBoxOptions = [
    // { id: "YesNo", label: "Yes OR No" },
    { id: "RADIO", label: "Multiple Choices(One Answer)" },
    { id: "MULTIPLE", label: "Multiple Choices(Multiple Answer)" },
    { id: "INPUT", label: "Free Text" },
  ];
  const {
    question,
    answerOption,
    answerType,
    speakerName,
    isRequired,
    graphType,
  } = questionData;

  const [questionDataSample,setquestionDataSample]=useState(questionData)
  // console.log(questionData,'===>question')
  const [selectedItem, setSelectedItem] = useState(
    answerType ? { value: answerType, label: dropdownData[answerType] } : ""
  );
  const [confirmOptionDelete, setConfirmOptionDelete] = useState({});
  const [isPrevClicked, setIsPrevClicked] = useState(false);
  const handleDelete = () => {
    onDelete();
  };

  const hideConfirmationModal = () => {
    setConfirmationPopup(false);
  };
  const handleDeleteClick = async (index) => {
    try {
      onDeleteChoice(index);
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setConfirmationPopup(false);
    }
  };
  //   const settings = {
  //   infinite: false,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   dots: false,
  //   arrows: true,
  //   centerMode: true,
  //   centerPadding: "0%",
  //   speed: 2000,
  //   vertical: true,
  //   verticalScrolling: true,
  //   swipe: false,
  //   touchMove: false,
  //   responsive: [
  //     {
  //       breakpoint: 558,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         dots: true,
  //         arrows: true,
  //       },
  //     },
  //   ],
  // };
  const handlePreview = (e, index) => {
    setIsPrevClicked(true);
  }

  const handleClose = () => {
    setIsPrevClicked(false);
  };
  return (
    <>
    
        {/* <Slider {...settings}> */}
        <div className="poll-question-option">
          <div className="poll-question-create">
            <Form>
              <Form.Group className="mb-4 name_added">
                <Form.Label className="h5">Enter your question:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={question}
                  onChange={(e) => onQuestionChange(e)}
                />
                  <div className="login-validation">
                  {" "}
                  {questionDataErrors?.questionError}
                </div>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="h5">
                  Select the type of your answer:
                </Form.Label>
                {checkBoxOptions.map((option,key) => (
                  <Form.Check
                    key={key}
                    id={option.id}
                    inline
                    label={option.label}
                    name="answerType"
                    type="radio"
                    htmlFor={`option-${option.id}`}
                    checked={answerType === option.id}
                    onChange={(e) => onTypeChange(e, option.id)}
                  />
                ))}


                {(answerType === "INPUT") && (
                  <div className="answer-option">
                    
                      {answerOption.map((choice, index) => (
                        <>
                        <div className="options" key={index}>
                          <Form.Group as={Row} className="mb-3">
                            <Form.Label>Free Text</Form.Label>
                            <Form.Control
                              type="text"
                              value={choice.answer}
                              onChange={(e) => onChoiceChange(e, index)}
                              disabled
                            />
                          </Form.Group>
                          </div>
                           <div className="login-validation">
                          {
                            questionDataErrors?.answerOptionError[index]
                              ?.answerError
                          }
                        </div>
                        </>
                      ))}
                  </div>
                )}

                {(answerType === "RADIO" ||
                  answerType === "MULTIPLE"
                  // answerType === "YesNo"
                  ) && (
                  <div className="answer-option">
                    
                      {answerOption.map((choice, index) => (
                        <>
                        <div className="options" key={index}>
                          <Form.Group as={Row} className="mb-3">
                            <Form.Label>Choice {index + 1}</Form.Label>
                            <Form.Control
                              type="text"
                              value={choice.answer}
                              onChange={(e) => onChoiceChange(e, index)}
                            />
                            
                            <div className="option-action">
                              {answerOption?.length > 1 &&
                                // answerType != "YesNo" &&
                                 (
                                  <Button
                                    className="dl_btn"
                                    onClick={() => {
                                      setPopupMessage({
                                        message1:
                                          "You are about to remove this option.",
                                        message2:
                                          "Are you sure you want to do this?",
                                        footerButton: "Yes please!",
                                      });
                                      setConfirmationPopup(true);
                                      setResetDataId(index);
                                    }}
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
                                        fill="#ffffff"
                                      ></path>
                                      <path
                                        d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z"
                                        fill="#ffffff"
                                      ></path>
                                      <path
                                        d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z"
                                        fill="#ffffff"
                                      ></path>
                                      <path
                                        d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z"
                                        fill="#ffffff"
                                      ></path>
                                      <path
                                        d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z"
                                        fill="#ffffff"
                                      ></path>
                                      <path
                                        d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z"
                                        fill="#ffffff"
                                      ></path>
                                    </svg>
                                  </Button>
                                )}
                              <div className="color-pick" >
                                <img
                                  src={path_image + "color-picker.svg"}
                                  alt=""
                                />
                                <input
                                  type="color"
                                  title="This is the answer's color in the graph result"
                                  onChange={(e) =>
                                    onChoiceColorChange(e, index)
                                  }
                                  defaultValue={choice.color}
                                />
                              </div>
                            </div>
                          </Form.Group>
                          </div>
                           <div className="login-validation">
                          {
                            questionDataErrors?.answerOptionError[index]
                              ?.answerError
                          }
                        </div>
                        </>
                      ))}
                  
                    {/* {answerType != "YesNo" && ( */}
                      <Button className="add-choice" onClick={onAddChoice}>
                        Add Choice{" "}
                        <img src={path_image + "add-choice.svg"} alt="" />
                      </Button>
                    {/* )} */}
                  </div>
                )}
              </Form.Group>
              <div className="speaker-detail d-flex align-items-center">
                <div className="speaker-name">
                  <Form.Group>
                    <Form.Label>Asked by who?</Form.Label>
                    <Form.Control
                      type="text"
                      value={speakerName}
                      onChange={onHandleSpeakerNameChange}
                    />
                  </Form.Group>
                  <div className="login-validation">
                  {" "}
                  {questionDataErrors?.speakerNameError}
                </div>
                </div>
                <div className="display-result">
                  <Form.Group>
                    <Form.Label>Display the result in :</Form.Label>
                    <div className="switch6">
                      <label className="switch6-light">
                        <input
                          type="checkbox"
                          checked={graphType == "pie" ? true : false}
                          onChange={onHandleDisplayResultChange}
                        />
                        <span>
                          <span>
                            <img src={path_image + "bar-graph-img.png"} />
                          </span>
                          <span>
                            <img src={path_image + "pie-img.png"} />
                          </span>
                        </span>
                        <a className="btn"></a>
                      </label>
                    </div>
                    <Button  onClick={handlePreview}>Preview</Button>
                  </Form.Group>
                </div>
              </div>
            </Form>
          </div>
        </div>
        
        {/* </Slider> */}

        {isPrevClicked && (
        <Modal
          show={isPrevClicked}
          onHide={handleClose}
          id="preview-poll"
          className="event_edit"
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Preview{' '}
              </h5>
              <button
                type="button"
                onClick={handleClose}
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <>
              <div className="webinar-popup polls-preview">
                <PreviewGraphModal  onClose={handleClose} graphType={graphType} answerOption={answerOption}/>
              </div>
            </>
          </Modal.Body>
        </Modal>
      )}
      
      <CommonConfirmModel
        show={confirmationpopup}
        onClose={hideConfirmationModal}
        fun={handleDeleteClick}
        popupMessage={popupMessage}
        path_image={path_image}
        resetDataId={resetDataId}
      />
    </>
  );
}

export default Question;
