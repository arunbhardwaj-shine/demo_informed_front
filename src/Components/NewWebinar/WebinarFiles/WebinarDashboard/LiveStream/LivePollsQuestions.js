import { color } from 'highcharts'
import React, { useState, useEffect, useRef } from 'react'
import { Button } from 'react-bootstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Slider from 'react-slick'
import { postData } from '../../../../../axios/apiHelper';
import { ENDPOINT } from '../../../../../axios/apiConfig';
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
const LivePollsQuestion = ({ questionData, eventId }) => {
    const [question, setQuestion] = useState()
    const [chartOptions, setChartOptions] = useState();
    const slickRef = useRef("");
    const [currentIndex, setCurrentIndex] = useState(0);


    useEffect(() => {
        // slickRef.current.slickGoTo(0);
        console.log("question data--->", questionData)
        setQuestion(questionData?.data?.data)

        setChartOptions(
            {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: 'Egg Yolk Composition'
                },
                tooltip: {
                    valueSuffix: '%'
                },

                plotOptions: {
                    series: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: [{
                            enabled: true,
                            distance: 20
                        }, {
                            enabled: true,
                            distance: -40,
                            format: '{point.percentage:.1f}%',
                            style: {
                                fontSize: '1.2em',
                                textOutline: 'none',
                                opacity: 0.7
                            },
                            // filter: {
                            //     operator: '>',
                            //     property: 'percentage',
                            //     value: 10
                            // }
                        }]
                    }
                },
                series: [
                    {
                        name: 'Percentage',
                        colorByPoint: true,
                        data: [
                            {
                                name: 'Water',
                                y: 55.02
                            },
                            {
                                name: 'Fat',
                                sliced: true,
                                selected: true,
                                y: 26.71
                            },
                            {
                                name: 'Carbohydrates',
                                y: 1.09
                            },
                            {
                                name: 'Protein',
                                y: 15.5
                            },
                            {
                                name: 'Ash',
                                y: 1.68
                            }
                        ]
                    }
                ]
            })
    }, [questionData])
    const handleAfterChange = async (current) => {
        try {
            let questionId = question[current]?.questionId

            console.log("current id-->", questionId)
            setCurrentIndex(Math.abs(current));

            const result = await postData(ENDPOINT.POLL_ANSWER, {
                companyId: questionId,
                eventId: eventId?.id,
            });

            console.log("")

        } catch (err) {
            console.log("--err", err)
        }

    };
    return (<>
        <div className='outer-layout'>
            <div className='question-outer-layout'>
                <div className='question-outer-inset'>
                {/* <Slider
                    {...settings}
                    ref={slickRef}
                    afterChange={(e) => handleAfterChange(e)}
                >
                    {question?.length ?
                        question?.map((item, index) => { */}
                        <div className=''>
                            {question?.length ?
                             question?.map((item, index) => {
                            return (<>
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
                                            <h4> {item?.question}</h4>
                                        </div>
                                        <div className='answer-options'>
                                            Answers
                                             <div className='answer'>
                                                <div>
                                                 <span>A.</span> masuismod phartra donec faucibus quisque nuneque mote condi ment zcsum nudolor nibhcudol
                                                </div>
                                                <div><span>B.</span> masuismod phartra donec faucibus quisque nuneque mote condi ment</div> 
                                                <div><span>C.</span> masuismod phartra donec faucibus quisque nuneque mote condi ment zcsum nudolor nibhcu</div>
                                                <div><span>D.</span> masuismod phartra donec faucibus </div>
                                            </div>
                                            {/* {item?.answerOption?.length ?
                                                item?.answerOption?.map((answer, i) => {
                                                    return (<>
                                                        <div className='answer' key={i}>{answer?.answer}
                                                            <span>A.</span> masuismod phartra donec faucibus quisque nuneque mote condi ment zcsum nudolor nibhcudol
                                                            <span>B.</span> masuismod phartra donec faucibus quisque nuneque mote condi ment 
                                                            <span>C.</span> masuismod phartra donec faucibus quisque nuneque mote condi ment zcsum nudolor nibhcu
                                                            <span>D.</span> masuismod phartra donec faucibus 
                                                        </div>
                                                    </>)
                                                })
                                                : ""} */}
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
                                            <Button className='quest'>Question</Button>
                                            <Button className='answer'>Answer</Button>
                                            <Button className='close active'>Closed</Button>
                                           </div>
                                        </div>
                                    </div>
                                </div>

                            </>)
                        {/* })
                        : ""}
                </Slider> */}
                })
                : ""}
                </div>
            </div>
            <div className="question-action">
                <Button
                    className={`btn-bordered question-prev ${currentIndex == 0 ? "disabled" : ""
                        } `}
                    // disabled={index == 0 ? true : false}
                    // onClick={() => slickRef.current.slickPrev()}
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
                    className={`btn-bordered question-next 
                    ${currentIndex == question?.length - 1 ? "disabled" : ""
                        }
                        `}
                    onClick={() => {
                        // slickRef.current.slickNext();
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
            </div>
            </div>
            <div className='pie-chart-outer-layout' >

                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                />
            </div>
        </div>

    </>)

}
export default LivePollsQuestion