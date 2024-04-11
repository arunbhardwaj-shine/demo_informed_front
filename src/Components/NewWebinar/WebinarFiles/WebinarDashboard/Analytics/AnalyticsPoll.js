import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Row} from 'react-bootstrap';
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
import Slider from "react-slick";
import QuestionPollsPieChart from "../LiveStream/QuestionPollsPieChart";
import { loader } from "../../../../../loader";

const AnalyticsPoll = () => {
    const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    const [flag, setFlag] = useState(1);
    const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"))
    const { eventIdContext, handleEventId } = useSidebar();
    
    useEffect(() => {
        if (!eventIdContext) {
            handleEventId(localStorageEvent)
        }
    }, [])
    const [question, setQuestion] = useState([]);
    const [pieChartData, setPieChartData] = useState({});
    const slickRef = useRef("");
    const currentSnapShot = useRef(null);
    const currentQuestion = useRef();
    const [apiCallStatus, setApiCallStatus] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
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
    const [questionIdIndex, setQuestionIdIndex] = useState([]);
    const [currentTab, setCurrentTab] = useState(0);
    const [show, setShow] = useState(false);
    const handleBeforeChange = async (current) => {
        try {
            setApiCallStatus(true);
            if (currentSnapShot.current) {
                currentSnapShot.current();
            }
            setPieChartData({});
        } catch (err) {
            console.log("--err", err);
        } finally {
            loader("hide");
            setShow(true);
            // setApiCallStatus(false);
        }
    };
    const handleAfterChange = async (current) => {
        try {
            let questionId = question[current]?.questionId;
            currentQuestion.current = questionId;

            // currentQuestion.current = questionId;
            // let chartData = {
            //   questionId: question[current]?.questionId,
            //   graphType: question[current]?.graphType,
            //   pollAnswers: question[current]?.pollAnswers,
            // };
            setCurrentIndex(Math.abs(current));
            // setPieChartData(chartData);
            let updateQuestionId = questionIdIndex;
            if (!updateQuestionId?.includes(questionId)) {
                updateQuestionId?.push(questionId);
                setQuestionIdIndex(updateQuestionId);
            }
            setCurrentTab(currentTab + 1);
        } catch (err) {
            console.log("--err", err);
        } finally {
            loader("hide");
            setShow(true);
            // setApiCallStatus(false);
        }
    };
  return (
    <>
        <Col className="right-sidebar">
            <div className="custom-container">
                <Row>
                    <div className="top-header">
                        <div className="page-title d-flex flex-column align-items-start">
                            <h2>Polls</h2>
                        </div>
                        <Button title="Download Site Engagements" className="download filled">Summary (Excel)
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M18.3335 13.125C18.1125 13.125 17.9005 13.2128 17.7442 13.3691C17.588 13.5254 17.5002 13.7373 17.5002 13.9583V15.1775C17.4995 15.7933 17.2546 16.3836 16.8192 16.819C16.3838 17.2544 15.7934 17.4993 15.1777 17.5H4.82266C4.2069 17.4993 3.61655 17.2544 3.18114 16.819C2.74573 16.3836 2.50082 15.7933 2.50016 15.1775V13.9583C2.50016 13.7373 2.41237 13.5254 2.25609 13.3691C2.0998 13.2128 1.88784 13.125 1.66683 13.125C1.44582 13.125 1.23385 13.2128 1.07757 13.3691C0.921293 13.5254 0.833496 13.7373 0.833496 13.9583V15.1775C0.834599 16.2351 1.25524 17.2492 2.00311 17.997C2.75099 18.7449 3.76501 19.1656 4.82266 19.1667H15.1777C16.2353 19.1656 17.2493 18.7449 17.9972 17.997C18.7451 17.2492 19.1657 16.2351 19.1668 15.1775V13.9583C19.1668 13.7373 19.079 13.5254 18.9228 13.3691C18.7665 13.2128 18.5545 13.125 18.3335 13.125Z"
                                    fill="#0066BE"
                                ></path>
                                <path
                                    d="M14.7456 9.20249C14.5893 9.04626 14.3774 8.9585 14.1564 8.9585C13.9355 8.9585 13.7235 9.04626 13.5673 9.20249L10.8231 11.9467L10.8333 1.77108C10.8333 1.55006 10.7455 1.3381 10.5893 1.18182C10.433 1.02554 10.221 0.937744 10 0.937744C9.77899 0.937744 9.56702 1.02554 9.41074 1.18182C9.25446 1.3381 9.16667 1.55006 9.16667 1.77108L9.15643 11.9467L6.41226 9.20249C6.25509 9.05069 6.04459 8.96669 5.82609 8.96859C5.60759 8.97049 5.39858 9.05813 5.24408 9.21264C5.08957 9.36715 5.00193 9.57615 5.00003 9.79465C4.99813 10.0131 5.08213 10.2236 5.23393 10.3808L9.40059 14.5475C9.478 14.6251 9.56996 14.6867 9.6712 14.7287C9.77245 14.7707 9.88098 14.7923 9.99059 14.7923C10.1002 14.7923 10.2087 14.7707 10.31 14.7287C10.4112 14.6867 10.5032 14.6251 10.5806 14.5475L14.7473 10.3808C14.9033 10.2243 14.9907 10.0123 14.9904 9.79131C14.9901 9.57034 14.902 9.35854 14.7456 9.20249Z"
                                    fill="#0066BE"
                                ></path>
                            </svg>
                        </Button>
                    </div>
                    <div className="analytics-poll">
                            <div className="analytics-poll-questions">
                              <div className="analytics-questions-graph">
                                  <h4>All Questions</h4>
                                  <img src={path_image + "all-questions.png"} alt=""/>
                                </div>
                            </div>
                          <div className="poll-creation">
                              {/* <div className="outer-layout">
                                <LivePolls eventIdContext={eventIdContext ? eventIdContext : localStorageEvent} flag={flag} />

                            </div> */}
                              <div className="outer-layout">
                                  <div className="question-outer-layout">
                                      {/* {question?.length ? (
                                          <Button className="reset" onClick={showConfirmationPopup}>
                                              Reset All
                                          </Button>
                                      ) : (
                                          ""
                                      )} */}
                                      <div className="question-outer-inset">
                                          <Slider
                                              {...settings}
                                              ref={slickRef}
                                              afterChange={(e) => handleAfterChange(e)}
                                              beforeChange={(e) => handleBeforeChange(e)}
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
                                                                                  {item?.totalSubquestion &&
                                                                                      item?.totalSubquestion?.length > 0
                                                                                      ? "Heading"
                                                                                      : "Question"}
                                                                                  <p
                                                                                      dangerouslySetInnerHTML={{
                                                                                          __html: item?.question,
                                                                                      }}
                                                                                  ></p>
                                                                              </div>

                                                                              {item?.totalSubquestion &&
                                                                                  item?.totalSubquestion?.length > 0 ? (
                                                                                  <div className="answer-options">
                                                                                      Questions
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
                                                                                              item?.totalSubquestion?.map(
                                                                                                  (answer, i) => {
                                                                                                      return (
                                                                                                          <>
                                                                                                              <div
                                                                                                                  className="answer sub-question"
                                                                                                                  key={i}
                                                                                                              >
                                                                                                                  <span>
                                                                                                                      {String.fromCharCode(65 + i)}.
                                                                                                                  </span>
                                                                                                                  <div
                                                                                                                      dangerouslySetInnerHTML={{
                                                                                                                          __html:
                                                                                                                              answer?.pollquestion
                                                                                                                                  ?.question,
                                                                                                                      }}
                                                                                                                  ></div>
                                                                                                              </div>
                                                                                                          </>
                                                                                                      );
                                                                                                  }
                                                                                              )
                                                                                          }
                                                                                      </>
                                                                                  </div>
                                                                              ) : (
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
                                                                              )}
                                                                              {/* {item?.totalSubquestion &&
                                item?.totalSubquestion?.length > 0 && (
                                  <button
                                    type="button"
                                    className="btn btn-info answermodel"
                                    onClick={(e) =>
                                      displayPopup(item?.questionId, e)
                                    }
                                  >
                                    See Comments
                                  </button>
                                )} */}
                                                                              {/* {
                                                                                  item?.userComments?.every(
                                                                                      (obj) => obj.comments == ""
                                                                                  ) ? (
                                                                                      ""
                                                                                  ) : (
                                                                                      // item?.userComments?.length > 0 && (
                                                                                      <button
                                                                                          type="button"
                                                                                          className="btn btn-info answermodel"
                                                                                          onClick={(e) =>
                                                                                              displayPopup(item?.questionId, e)
                                                                                          }
                                                                                      >
                                                                                          See Comments
                                                                                      </button>
                                                                                  )
                                                                                  // )
                                                                              } */}

                                                                              <div className="speaker">
                                                                                  Speaker
                                                                                  <h6
                                                                                      dangerouslySetInnerHTML={{
                                                                                          __html: item?.speakerName,
                                                                                      }}
                                                                                  />
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
                                                  className={`btn-bordered question-prev ${currentIndex == 0 ? "disabled" : ""
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
                                                          <div
                                                              className="question-listing-links"
                                                              onClick={() => {
                                                                  if (index >= 0 && currentIndex != index) {
                                                                      setCurrentIndex(index);
                                                                      slickRef.current.slickGoTo(index);
                                                                  }
                                                              }}
                                                          >
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
                                                                          `${item?.showQuestionToUser == 1
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
                                              {/* <Button
                                                  className={`btn-bordered question-next 
                        ${currentIndex == question?.length - 1 ? "disabled" : ""
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
                                              </Button> */}
                                          </div>
                                      ) : (
                                          ""
                                      )}
                                  </div>

                                  <div className="pie-chart-outer-layout">
                                      <QuestionPollsPieChart data={pieChartData} show={show} />
                                  </div>
                              </div>
                        </div>

                    </div>
                </Row>
            </div>
        </Col>
    </>
  )
}

export default AnalyticsPoll