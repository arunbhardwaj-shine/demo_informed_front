import { color } from 'highcharts'
import React, { useState, useEffect, useRef } from 'react'
import { Button } from 'react-bootstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Slider from 'react-slick'
import { postData } from '../../../../../axios/apiHelper';
import { ENDPOINT } from '../../../../../axios/apiConfig';
import QuestionPollsPieChart from './QuestionPollsPieChart';
import { useSidebar } from '../../../../CommonComponent/LoginLayout';
const settings = {
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    centerMode: true,
    centerPadding: "0px",
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
const LivePollsQuestion = ({ questionData }) => {
    const localStorageEvent=JSON.parse(localStorage.getItem("EventIdContext"))
    const {eventIdContext,handleEventId}=useSidebar()
    const [question, setQuestion] = useState()
    const slickRef = useRef("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [questionIdIndex, setQuestionIdIndex] = useState([])
    const [pieChartData, setPieChartData] = useState({})
    let path_image = "../" + process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
   

    useEffect(() => {
        
        // if(!eventIdContext){
        //     handleEventId(localStorageEvent)
        // }
        slickRef.current.slickGoTo(0);
        setQuestion(questionData?.data?.data)
        let updateQuestionId = []
        updateQuestionId?.push(questionData?.data?.data?.[0]?.questionId)
        setQuestionIdIndex(updateQuestionId)
        setPieChartData({graphType:questionData?.data?.data?.[0]?.graphType
            ,pollAnswers:questionData?.data?.data?.[0]?.pollAnswers})
    }, [questionData])
    const handleAfterChange = async (current) => {
        try {
            let questionId = question[current]?.questionId
            let chartData={graphType:question[current]?.graphType,pollAnswers:question[current]?.pollAnswers}
            setCurrentIndex(Math.abs(current));
            setPieChartData(chartData)
            let updateQuestionId = questionIdIndex
            if (!updateQuestionId?.includes(questionId)) {
                updateQuestionId?.push(questionId)
                setQuestionIdIndex(updateQuestionId)
            }
           

        } catch (err) {
            console.log("--err", err)
        }
    };

    const questionClicked = (e, id) => {
        console.log("question clicked--->", id)
    }
    const answerClicked = (e, id) => {
        console.log("answer clicked--->", id)
    }

    const closedClicked = (e, id) => {
        console.log("closed clicked--->", id)
    }
    return (<>
        <div className='outer-layout'>
            <div className='question-outer-layout'>
                <div className='question-outer-inset'>
                    <Slider
                        {...settings}
                        ref={slickRef}
                        afterChange={(e) => handleAfterChange(e)}
                    >
                        {question?.length ?
                            question?.map((item, index) => {

                                return (<>
                                    <div className='question-boxed'>
                                        <div className='question-listing'
                                            key={index}
                                        >
                                            <div className='d-flex justify-content-between question-list-number align-items-center'>
                                                <h4>Q{index + 1}</h4>
                                                <div className='question-status not-display'>
                                                    <span>Not displayed yet</span>
                                                </div>
                                            </div>
                                            <div className='question-display'>
                                                <div className='question'>
                                                    Question
                                                    <h4 dangerouslySetInnerHTML={{__html:item?.question}}>
                                                        
                                                         </h4>
                                                </div>
                                                <div className='answer-options'>
                                                    Answers

                                                    {item?.pollAnswers?.length ?
                                                        item?.pollAnswers?.map((answer, i) => {
                                                            return (<>
                                                                <div className='answer' key={i}>
                                                                    <div><span>{String.fromCharCode(65 + i)}.</span>{answer?.name}</div>

                                                                </div>
                                                            </>)
                                                        })
                                                        : ""}
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
                                                        <p>-</p>
                                                    </div>
                                                    <div className='question-answered'>
                                                        <label>Answered</label>
                                                        <p>0</p>
                                                    </div>
                                                </div>
                                                <div className='btn-group'>
                                                    <label>Display:</label>
                                                    <div className='btn-group-add'>
                                                        <Button className='quest' onClick={(e) => questionClicked(e, item?.questionId)}>Question</Button>
                                                        <Button className='answer' onClick={(e) => answerClicked(e, item?.questionId)}>Answer</Button>
                                                        <Button className='close active' onClick={(e) => closedClicked(e, item?.questionId)}>Closed</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>)
                            })
                            : (<>
                            <div class="no_found"><p>No Data Found</p></div>
                            </>)}
                    </Slider>
                </div>
                {question?.length?
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
                                    <div className='question-links-number'>
                                        Q{index + 1}
                                    </div>
                                    <div className='question-links-screen'>
                                        
                                        <img src={path_image + `${currentIndex == index ? "screen-active.svg" : "screen-options.svg"} `} alt="" />
                                    </div>
                                    <div className='question-links-status'>
                                        {questionIdIndex?.includes(item?.questionId) ? <img src={path_image + "status-approved.svg"} alt="" /> : ""}
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
                :""}
            </div>

            <div className='pie-chart-outer-layout' >                
                <QuestionPollsPieChart data={pieChartData} />
                
            </div>
        </div>

    </>)

}
export default LivePollsQuestion