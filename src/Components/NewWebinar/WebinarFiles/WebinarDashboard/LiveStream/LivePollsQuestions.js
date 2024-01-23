import Slider from "react-slick";
import { Button } from "react-bootstrap";
import { postData, getData } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import { db } from "../../../../../config/firebaseConfig";
import React, { useState, useEffect, useRef } from "react";
import QuestionPollsPieChart from "./QuestionPollsPieChart";
import CommonConfirmModel from "../../../../../Model/CommonConfirmModel";
import { loader } from "../../../../../loader";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const settings = {
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: false,
  arrows: false,
  centerMode: true,
  centerPadding: "0",
  speed: 500,
  vertical: true,
  verticalScrolling: true,
  swipe: false,
  debug: true,
  touchMove: false,
  responsive: [
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        vertical: false,
  verticalScrolling: false,
      },
    },
  ],
};
const LivePollsQuestion = ({ questionData, eventData, getQuestions }) => {
  const [question, setQuestion] = useState([]);
  const currentQuestion = useRef();
  const slickRef = useRef("");
  const currentSnapShot = useRef(null);
  const [count, setCount] = useState(0);
  const [currentTab, setCurrentTab] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionIdIndex, setQuestionIdIndex] = useState([]);
  const [pieChartData, setPieChartData] = useState({});
  const [apiCallStatus, setApiCallStatus] = useState(false);
  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [commonConfirmModelFun, setCommonConfirmModelFun] = useState(() => {});
  const [show, setShow] = useState(false);
  const firstTime = useRef(true);
  const [popupMessage, setPopupMessage] = useState({
    message1: "",
    message2: "",
    footerButton: "",
  });
  const [closedIndex, setClosedIndex] = useState();
  useEffect(() => {
    setShow(false);
    let currentIndex = 0;
    const index = questionData.findIndex((item) => item?.triggered === 1);
    if (index !== -1) {
      currentIndex = index;
    } else {
      const showAnswerIndex = questionData.findIndex(
        (item) => item?.showAnswerToUser === 1
      );
      if (showAnswerIndex !== -1) {
        currentIndex = showAnswerIndex;
      } else if (closedIndex >= 0) {
        currentIndex = closedIndex;
      } else {
        const showQuestionIndex = questionData.findIndex(
          (item) => item?.showQuestionToUser === 0
        );
        currentIndex =
          showQuestionIndex !== -1
            ? showQuestionIndex
            : questionData?.length - 1;
      }
    }

    const checkAnsExist = questionData?.some(
      (obj) => obj?.pollAnswers && obj?.pollAnswers?.length > 0
    );

    setCurrentIndex(currentIndex);
    setQuestion(questionData);
    let updateQuestionId = [];
    updateQuestionId?.push(questionData?.[0]?.questionId);
    setQuestionIdIndex(updateQuestionId);
    // if (questionData?.length == 1) {
    //   setPieChartData({
    //     questionId: questionData?.[0]?.questionId,
    //     graphType: questionData?.[0]?.graphType,
    //     pollAnswers: questionData?.[0]?.pollAnswers,
    //   });
    // }

    if (currentIndex == 0 || questionData?.length == 0) {
      loader("hide");
      setShow(true);
      setApiCallStatus(false);
    }

    setClosedIndex();

    //}
  }, [questionData]);

  useEffect(() => {
    if (slickRef.current && currentIndex != 0) {
      slickRef.current.slickGoTo(currentIndex, true);
      if (firstTime.current) {
        currentQuestion.current = question[currentIndex]?.questionId;
        setCurrentTab(currentIndex + 1);
      }
      firstTime.current = false;
    }
  }, [question]);
  useEffect(() => {
    const apiCall = async () => {
      let data = await firebaseev();
    };
    apiCall();
  }, [currentTab]);

  const handleAfterChange = async (current) => {
    try {
      let questionId = question[current]?.questionId;
      // currentQuestion.current = questionId;
      let chartData = {
        questionId: question[current]?.questionId,
        graphType: question[current]?.graphType,
        pollAnswers: question[current]?.pollAnswers,
      };
      setCurrentIndex(Math.abs(current));
      setPieChartData(chartData);
      let updateQuestionId = questionIdIndex;
      if (!updateQuestionId?.includes(questionId)) {
        updateQuestionId?.push(questionId);
        setQuestionIdIndex(updateQuestionId);
      }
    } catch (err) {
      console.log("--err", err);
    } finally {
      loader("hide");
      setShow(true);
      // setApiCallStatus(false);
    }
  };

  const firebaseev = async () => {
    const q = query(
      collection(db, "chat"),
      where("event_id", "==", eventData?.id),
      where("question_id", "==", currentQuestion.current)
    );

    if (currentSnapShot.current) {
      currentSnapShot.current();
    }

    currentSnapShot.current = onSnapshot(q, async (querySnapshot) => {
      for (const doc of querySnapshot.docs) {
        if (doc.data()) {
          const result = await postData(ENDPOINT.WEBINAR_QUESTION_ONLY, {
            companyId: eventData?.companyId,
            eventId: eventData?.id,
            questionId: currentQuestion.current,
          });

          const tempData = result?.data?.data;

          if (tempData?.length) {
            const tempQuestion = question.map((item) => {
              item.triggered = 0;

              if (item.showQuestionToUser === 1) {
                item.showQuestionToUser = 2;
              }

              if (item.showAnswerToUser === 1) {
                item.showAnswerToUser = 2;
              }

              return item;
            });

            tempQuestion[currentIndex] = tempData[0];

            setQuestion(tempQuestion);

            setPieChartData({
              questionId: tempData[0]?.questionId,
              graphType: tempData[0]?.graphType,
              pollAnswers: tempData[0]?.pollAnswers,
            });
          }
        }
      }
      setApiCallStatus(false);
    });
  };

  const submitQuestionAnswer = async (e, question_id, type) => {
    try {
      setApiCallStatus(true);
      let body = {
        eventId: eventData?.id,
        questionId: question_id,
        type: type,
      };
      currentQuestion.current = question_id;

      let data = await postData(ENDPOINT.EVENT_SUBMIT, body);
      setCurrentTab(currentTab + 1);
    } catch (err) {
      setApiCallStatus(false);
      console.log("-err", err);
    }
    // finally {
    //   setApiCallStatus(false);
    // }
  };

  const closedClicked = async (e, question_id, index) => {
    try {
      setApiCallStatus(true);
      setClosedIndex(index);
      currentQuestion.current = question_id;
      let data = await postData(ENDPOINT.EVENT_CLOSE, {
        eventId: eventData?.id,
      });

      setCurrentTab(currentTab + 1);
    } catch (err) {
      setApiCallStatus(false);
    } finally {
    }
  };

  const showConfirmationPopup = () => {
    try {
      setCommonConfirmModelFun(() => resetPolls);
      setPopupMessage({
        message1: "You are about to reset this poll.",
        message2: "Are you sure you want to do this?",
        footerButton: "Yes please!",
      });
      if (confirmationpopup) {
        setConfirmationPopup(false);
      } else {
        setConfirmationPopup(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const resetPolls = async () => {
    hideConfirmationModal();
    try {
      const resetData = await getData(ENDPOINT.RESETPOLL + "/" + eventData?.id);
      // await getQuestions();
      window.location.reload();
    } catch (err) {
      loader("hide");
      console.log(err);
    }
  };

  const hideConfirmationModal = () => {
    setConfirmationPopup(false);
  };

  useEffect(() => {
    if (count) {
      getQuestions();
    }
  }, [count]);

  return (
    <>
      <div className="outer-layout">
        <div className="question-outer-layout">
          {question?.length ? (
            <Button className="reset" onClick={showConfirmationPopup}>
              Reset All
            </Button>
          ) : (
            ""
          )}
          <div className="question-outer-inset">
            <Slider
              {...settings}
              ref={slickRef}
              afterChange={(e) => handleAfterChange(e)}
            >
              {question?.length ? (
                question?.map((item, index) => {
                  return (
                    <>
                      <div className="slider-space" key={item?.questionId}>
                        <div className="question-boxed">
                          <div className="question-listing">
                            <div className="d-flex justify-content-between question-list-number align-items-center">
                              <h4>Q{index + 1}</h4>
                              <div
                                className={
                                  item?.showQuestionToUser == 1 ||
                                  item?.showQuestionToUser == 2
                                    ? "question-status display"
                                    : "question-status not-display"
                                }
                              >
                                <span>
                                  {item?.showQuestionToUser == 1 ||
                                  item?.showQuestionToUser == 2
                                    ? "Done"
                                    : "Not displayed yet"}
                                </span>
                              </div>
                            </div>
                            <div className="question-display">
                              <div className="question">
                                Question
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: item?.question,
                                  }}
                                ></p>
                              </div>
                              <div className="answer-options">
                                Answers
                                {item?.canCustomAnswer == 1 ? (
                                  <div>Not have any possible answers</div>
                                ) : (
                                  <>
                                    {
                                      // item?.pollAnswers?.length ?
                                      //     item?.pollAnswers?.map((answer, i) => {
                                      //         return (<>
                                      //             <div className='answer' key={i}>
                                      //                 <span>{String.fromCharCode(65 + i)}.</span>
                                      //                 <div dangerouslySetInnerHTML={{ __html: answer?.name }}></div>

                                      //             </div>
                                      //         </>)
                                      //     })
                                      // :
                                      item?.allUserAnswers?.length
                                        ? item?.allUserAnswers?.map(
                                            (answer, i) => {
                                              return (
                                                <>
                                                  <div
                                                    className="answer"
                                                    key={i}
                                                  >
                                                    <span>
                                                      {String.fromCharCode(
                                                        65 + i
                                                      )}
                                                      .
                                                    </span>
                                                    <div
                                                      dangerouslySetInnerHTML={{
                                                        __html: answer,
                                                      }}
                                                    ></div>
                                                  </div>
                                                </>
                                              );
                                            }
                                          )
                                        : null
                                    }
                                  </>
                                )}
                              </div>
                              <div className="speaker">
                                Speaker
                                <h6>{item?.speakerName}</h6>
                              </div>
                            </div>

                            <div className="question-status d-flex justify-content-between">
                              <div className="question-status-live">
                                <div className="question-live">
                                  <label>Total (Live)</label>
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: item?.totalUser,
                                    }}
                                  ></p>
                                </div>
                                <div className="question-answered">
                                  <label>Answered</label>
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: item?.totalUser,
                                    }}
                                  ></p>
                                </div>
                              </div>
                              {apiCallStatus ? (
                                <div class="inner-loader" id="custom_loader">
                                  <div class="loader_show">
                                    <span class="loader-view"> </span>
                                  </div>
                                </div>
                              ) : (
                                // <div class="inner-loader" id="custom_loader"><div class="loader_show"><span class="loader-view"> </span></div></div>
                                <div className="btn-group">
                                  <label>Display:</label>
                                  <div className="btn-group-add">
                                    <Button
                                      className={
                                        item?.showQuestionToUser == 1
                                          ? "active quest disabled"
                                          : item?.showQuestionToUser == 2
                                          ? "visited quest"
                                          : "quest"
                                      }
                                      onClick={(e) =>
                                        submitQuestionAnswer(
                                          e,
                                          item?.questionId,
                                          "submit",
                                          index
                                        )
                                      }
                                    >
                                      Question
                                    </Button>
                                    <Button
                                      className={
                                        item?.showAnswerToUser == 1
                                          ? "active answer disabled"
                                          : item?.showAnswerToUser == 2
                                          ? "visited answer"
                                          : "answer"
                                      }
                                      onClick={(e) =>
                                        submitQuestionAnswer(
                                          e,
                                          item?.questionId,
                                          "answer",
                                          index
                                        )
                                      }
                                    >
                                      Answers
                                    </Button>
                                    <Button
                                      className={
                                        item?.triggered == 1 ||
                                        item?.showAnswerToUser == 1
                                          ? "close"
                                          : "close active disabled"
                                      }
                                      onClick={(e) =>
                                        closedClicked(
                                          e,
                                          item?.questionId,
                                          index
                                        )
                                      }
                                    >
                                      Closed
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <>
                  <div className="no_polls">
                    <h3>No Polls Created yet!</h3>
                  </div>
                </>
              )}
            </Slider>
          </div>
          {question?.length ? (
            <div className="question-action">
              <Button
                className={`btn-bordered question-prev ${
                  currentIndex == 0 ? "disabled" : ""
                } `}
                disabled={currentIndex == 0 ? true : false}
                onClick={() => slickRef.current.slickPrev()}
              >
                <svg width="19" height="11" viewBox="0 0 19 11" fill="none">
                  <path
                    d="M9.27902 3.61976L2.56094 10.3378C1.97509 10.9236 1.02524 10.9236 0.439388 10.3378C-0.146462 9.75196 -0.146463 8.80211 0.439387 8.21626L8.21496 0.440724C8.41288 0.242814 8.65233 0.111762 8.90525 0.0475674C9.4024 -0.0805243 9.95244 0.0500824 10.3417 0.439387L18.1173 8.21496C18.7031 8.80081 18.7031 9.75066 18.1173 10.3365C17.5314 10.9224 16.5816 10.9224 15.9957 10.3365L9.27902 3.61976Z"
                    fill="#0066BE"
                  />
                </svg>
              </Button>
              <div className="question-listing-link-box">
                {question?.length
                  ? question?.map((item, index) => (
                      <div className="question-listing-links">
                        <div
                          className={
                            currentIndex == index
                              ? "question-links-number active"
                              : "question-links-number"
                          }
                        >
                          Q{index + 1}
                        </div>
                        <div className="question-links-screen">
                          {/* <img src={path_image + `${(item?.showQuestionToUser == 0 || item?.showAnswerToUser == 0) ? "screen-options.svg" : "screen-active.svg"} `} alt="" /> */}
                          <img
                            src={
                              path_image +
                              `${
                                item?.showQuestionToUser == 1
                                  ? "screen-active.svg"
                                  : "screen-options.svg"
                              } `
                            }
                            alt=""
                          />
                          {/* </div> */}
                        </div>
                        <div className="question-links-status">
                          {item?.showQuestionToUser == 2 ||
                          item?.showQuestionToUser == 1 ? (
                            <img
                              src={path_image + "status-approved.svg"}
                              alt=""
                            />
                          ) : null}
                        </div>
                      </div>
                    ))
                  : ""}
              </div>
              <Button
                className={`btn-bordered question-next 
                        ${
                          currentIndex == question?.length - 1 ? "disabled" : ""
                        }
                            `}
                disabled={currentIndex == question?.length - 1 ? true : false}
                onClick={() => {
                  slickRef.current.slickNext();
                }}
              >
                <svg width="19" height="11" viewBox="0 0 19 11" fill="none">
                  <path
                    d="M9.27853 7.15662L2.56206 0.442137C1.97595 -0.143796 1.02569 -0.143796 0.43958 0.442137C-0.146527 1.02807 -0.146527 1.97806 0.43958 2.56399L8.21954 10.3416C8.80565 10.9276 9.75591 10.9276 10.342 10.3416C10.3643 10.3194 10.3858 10.2965 10.4064 10.2732L18.1204 2.56155C18.7065 1.97556 18.7065 1.02548 18.1204 0.439493C17.5342 -0.146497 16.5838 -0.146498 15.9977 0.439493L9.27853 7.15662Z"
                    fill="#0066BE"
                  />
                </svg>
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="pie-chart-outer-layout">
          <QuestionPollsPieChart data={pieChartData} show={show} />
        </div>
      </div>

      <CommonConfirmModel
        show={confirmationpopup}
        onClose={hideConfirmationModal}
        fun={commonConfirmModelFun}
        popupMessage={popupMessage}
        path_image={path_image}
        resetDataId=""
        onCloseCross={() => {
          hideConfirmationModal();
        }}
      />
    </>
  );
};
export default LivePollsQuestion;
