import Slider from 'react-slick';
import { Button } from 'react-bootstrap';
import { Spinner } from 'react-activity';
import { postData, getData } from '../../../../../axios/apiHelper';
import { ENDPOINT } from '../../../../../axios/apiConfig';
import { db } from '../../../../../config/firebaseConfig';
import React, { useState, useEffect, useRef } from 'react';
import QuestionPollsPieChart from './QuestionPollsPieChart';
import { useSidebar } from '../../../../CommonComponent/LoginLayout';
import CommonConfirmModel from '../../../../../Model/CommonConfirmModel';
import { loader } from '../../../../../loader';

import {
    collection,
    query,
    where,
    onSnapshot,
    orderBy,
    limit,
} from "firebase/firestore";


const settings = {
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    speed: 500,
    vertical: true,
    verticalScrolling: true,
    swipe: false,
    touchMove: false,
    centerMode: true,
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
const LivePollsQuestion = ({ questionData, eventData, getQuestions, isdataLoaded }) => {
    const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"))
    const { eventIdContext, handleEventId } = useSidebar()
    const [question, setQuestion] = useState()
    const slickRef = useRef("");
    const [count, setCount] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [pollAnsExist, setPollAnsExist] = useState(0);
    const [questionIdIndex, setQuestionIdIndex] = useState([])
    const [pieChartData, setPieChartData] = useState({})
    const [apiCallStatus, setApiCallStatus] = useState(false);
    const [confirmationpopup, setConfirmationPopup] = useState(false);
    const [commonConfirmModelFun, setCommonConfirmModelFun] = useState(() => { });
    const [show, setShow] = useState(false)
    const [popupMessage, setPopupMessage] = useState({
        message1: "",
        message2: "",
        footerButton: "",
    });


    let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

    const q = query(
        collection(db, "chat"),
        where("event_id", "==", eventData?.id),
        orderBy("date", "desc"),
        limit(1)
    );

    useEffect(() => {
        setApiCallStatus(isdataLoaded);
    }, [isdataLoaded]);

    useEffect(() => {
       setShow(false)
       loader("show")
        let currentIndex = 0;
        const index = questionData?.data?.data.findIndex(item => item?.triggered === 1);
        
        if (index !== -1) {
            currentIndex = index;
        } else {
            const showAnswerIndex = questionData?.data?.data.findIndex(item => item?.showQuestionToUser === 0);
            currentIndex = showAnswerIndex !== -1 ? showAnswerIndex : questionData?.data?.data?.length - 1;
           
        }
        if (slickRef.current) {
            slickRef.current.slickGoTo(currentIndex);
        }
      

        const checkAnsExist = questionData?.data?.data?.some(obj => obj?.pollAnswers && obj?.pollAnswers?.length > 0);
        setPollAnsExist(checkAnsExist);

        setCurrentIndex(currentIndex);
        setQuestion(questionData?.data?.data)
        let updateQuestionId = []
        updateQuestionId?.push(questionData?.data?.data?.[0]?.questionId)
        setQuestionIdIndex(updateQuestionId)
        setPieChartData({
            graphType: questionData?.data?.data?.[0]?.graphType
            , pollAnswers: questionData?.data?.data?.[0]?.pollAnswers
        })
     
        if(questionData?.data?.data?.length==1){
            loader("hide")
            setShow(true)
        }
       
    }, [questionData])

    const handleAfterChange = async (current) => {
      
        try {
            loader("show")
            let questionId = question[current]?.questionId
            let chartData = { graphType: question[current]?.graphType, pollAnswers: question[current]?.pollAnswers }
            setCurrentIndex(Math.abs(current));
            setPieChartData(chartData)
            let updateQuestionId = questionIdIndex
            if (!updateQuestionId?.includes(questionId)) {
                updateQuestionId?.push(questionId)
                setQuestionIdIndex(updateQuestionId)
            }          

        } catch (err) {
           
            console.log("--err", err)
        }finally{
            loader("hide")
            setShow(true)
        }
    };

    const submitQuestionAnswer = async (e, question_id, type) => {
        try {
            setApiCallStatus(true);
            let body = {
                eventId: eventData?.id,
                questionId: question_id,
                type: type,
            };
            await postData(ENDPOINT.EVENT_SUBMIT, body);
        } catch (err) {
            setApiCallStatus(false);
            console.log("-err", err);
        } finally {
            setTimeout(() => {
                setApiCallStatus(false);
            }, 3000);
        }
    }

    const closedClicked = async (e, id) => {
        try {
            setApiCallStatus(true);
            await postData(ENDPOINT.EVENT_CLOSE, {
                eventId: eventData?.id,
            });
        } catch (err) {
            setApiCallStatus(false);
        }
        finally {
            setTimeout(() => {
                setApiCallStatus(false);
            }, 3000);
        }
    }

    onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.data()) {
                if (count != doc.data()?.webinar) {
                    setCount(doc.data()?.webinar);
                }
            }
        });
    });

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
            // setApiCallStatus(true);
            loader("show");
            setPollAnsExist(false);
            const resetData = getData(ENDPOINT.RESETPOLL + "/" + eventData?.id);
        } catch (err) {
            loader("hide");
            console.log(err);
        }
    }

    const hideConfirmationModal = () => {
        setConfirmationPopup(false);
    };

    useEffect(() => {
        if (count) {
            getQuestions();
        }
    }, [count]);

    return (<>
        

            <div className='outer-layout'>
                <div className='question-outer-layout'>
                    <Button className="reset"
                    // className={pollAnsExist ? 'reset' : 'disabled reset'} 
                    onClick={showConfirmationPopup}>Reset All</Button>
                    <div className='question-outer-inset'>
                        {question?.length ?
                            <Slider
                                {...settings}
                                ref={slickRef}
                                afterChange={(e) => handleAfterChange(e)}
                            >
                                {
                                    question?.map((item, index) => {

                                        return (<>
                                            <div className='question-boxed'>
                                                <div className='question-listing'
                                                    key={index}
                                                >
                                                    <div className='d-flex justify-content-between question-list-number align-items-center'>
                                                        <h4>Q{index + 1}</h4>
                                                        <div className={item?.showQuestionToUser == 1 || item?.showQuestionToUser == 2 ? 'question-status display' : 'question-status not-display'}>
                                                            <span>{item?.showQuestionToUser == 1 || item?.showQuestionToUser == 2 ? "Done" : "Not displayed yet"}</span>
                                                        </div>
                                                    </div>
                                                    <div className='question-display'>
                                                        <div className='question'>
                                                            Question
                                                            <h4 dangerouslySetInnerHTML={{ __html: item?.question }}>

                                                            </h4>
                                                        </div>
                                                        <div className='answer-options'>
                                                            Answers
                                                            {
                                                                item?.canCustomAnswer == 1
                                                                    ?
                                                                    <div>Not have any possible answers</div>
                                                                    :
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
                                                                            item?.allUserAnswers?.length ?
                                                                                item?.allUserAnswers?.map((answer, i) => {
                                                                                    return (<>
                                                                                        <div className='answer' key={i}>
                                                                                            <span>{String.fromCharCode(65 + i)}.</span>
                                                                                            <div dangerouslySetInnerHTML={{ __html: answer }}></div>

                                                                                        </div>
                                                                                    </>)
                                                                                })
                                                                                :
                                                                                null
                                                                        }
                                                                    </>
                                                            }
                                                        </div>
                                                        <div className='speaker'>
                                                            Speaker
                                                            <h6>{item?.speakerName}</h6>
                                                        </div>
                                                    </div>

                                                    <div className='question-status d-flex justify-content-between'>
                                                        <div className='question-status-live'>
                                                            <div className='question-live'>
                                                                <label>Total (Live)</label>
                                                                <p dangerouslySetInnerHTML={{ __html: item?.totalUser }}></p>
                                                            </div>
                                                            <div className='question-answered'>
                                                                <label>Answered</label>
                                                                <p dangerouslySetInnerHTML={{ __html: item?.totalUser }}></p>
                                                            </div>
                                                        </div>
                                                        {
                                                            apiCallStatus ?
                                                                <div class="inner-loader" id="custom_loader"><div class="loader_show"><span class="loader-view"> </span></div></div>
                                                                :
                                                                // <div class="inner-loader" id="custom_loader"><div class="loader_show"><span class="loader-view"> </span></div></div>
                                                                <div className='btn-group'>
                                                                    <label>Display:</label>
                                                                    <div className='btn-group-add'>

                                                                        <Button className={item?.showQuestionToUser == 1 ? 'active quest' : item?.showQuestionToUser == 2 ? "visited quest" : "quest"} onClick={(e) => submitQuestionAnswer(e, item?.questionId, "submit")}>Question</Button>
                                                                        <Button className={item?.showAnswerToUser == 1 ? 'active answer' : item?.showAnswerToUser == 2 ? 'visited answer' : 'answer'} onClick={(e) => submitQuestionAnswer(e, item?.questionId, "answer")}>Answers</Button>
                                                                        <Button className={(item?.triggered == 1 || item?.showAnswerToUser == 1) ? 'close' : 'close active'} onClick={(e) => closedClicked(e)}>Closed</Button>
                                                                    </div>
                                                                </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </>)
                                    })
                                }
                            </Slider>
                            : (<>
                                <div className="no_polls"><h3>No Polls Created yet!</h3></div>
                            </>)}
                    </div>
                    {question?.length ?
                        <div className="question-action">
                            <Button
                                className={`btn-bordered question-prev ${currentIndex == 0 ? "disabled" : ""
                                    } `}
                                disabled={currentIndex == 0 ? true : false}
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
                            <div className="question-listing-link-box">
                                {question?.length ?
                                    question?.map((item, index) => (
                                        <div className="question-listing-links">
                                            <div className={currentIndex == index ? 'question-links-number active' : 'question-links-number'}>
                                                Q{index + 1}
                                            </div>
                                            <div className='question-links-screen'>
                                                {/* <img src={path_image + `${(item?.showQuestionToUser == 0 || item?.showAnswerToUser == 0) ? "screen-options.svg" : "screen-active.svg"} `} alt="" /> */}
                                                <img src={path_image + `${(item?.showQuestionToUser == 1) ? "screen-active.svg" : "screen-options.svg"} `} alt="" />
                                                {/* </div> */}
                                            </div>
                                            <div className='question-links-status'>
                                                {
                                                    (item?.showQuestionToUser == 2 || item?.showQuestionToUser == 1) ? <img src={path_image + "status-approved.svg"} alt="" /> : null
                                                }
                                            </div>
                                        </div>
                                    )) : ""}


                            </div>
                            <Button
                                className={`btn-bordered question-next 
                        ${currentIndex == question?.length - 1 ? "disabled" : ""
                                    }
                            `}
                                disabled={currentIndex == question?.length - 1 ? true : false}
                                onClick={() => {
                                    slickRef.current.slickNext();
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
                        </div>
                        : ""}
                </div>

                <div className='pie-chart-outer-layout' >
                    <QuestionPollsPieChart data={pieChartData} show={show}/>
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
        
    </>)

}
export default LivePollsQuestion