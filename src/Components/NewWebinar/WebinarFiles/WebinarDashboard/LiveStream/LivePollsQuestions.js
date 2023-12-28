import { color } from 'highcharts'
import React, { useState, useEffect } from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const LivePollsQuestion = () => {
    const [questionData, setQuestionData] = useState()
    const [chartOptions, setChartOptions] = useState();

    let data = [{
        question: "Which one is your favorite city", answerOption: [{ id: 1, answer: "Chandigarh" },
        { id: 2, answer: "Mohali" }], speakerName: "Gagan"
    }]
    useEffect(() => {
        setQuestionData(data)
        setChartOptions((prevOptions) => ({
            ...prevOptions,
            chart_data: {
                chart: {
                    type: "pie",
                    height: 300,
                },
                title: {
                    text: "",
                },
                subtitle: {
                    text: `<p>Device</p></br></br></br><span >${5}</span>`,

                    verticalAlign: "middle",

                    y: 15,
                },

                exporting: {
                    enabled: false,
                },

                plotOptions: {
                    pie: {
                        innerSize: "70%",

                        dataLabels: {
                            enabled: true,

                            format: "{point.y}",

                            style: {
                                fontWeight: "bold",

                                color: "white",

                                textOutline: "none",

                                fontSize: "12px",
                            },

                            distance: -20, // Adjust the distance of the data labels from the center
                        },

                        animation: {
                            duration: 1000,
                        },

                        enableMouseTracking: false, // Disable hover functionality
                    },
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
                    },
                ],


            }
        }));
    }, [])
    return (<>
        <div className='outer-layout'>
            <div className='question-outer-layout' style={{ margin: "20px", backgroundColor: "lightblue" }}>
                {questionData?.length ?
                    questionData?.map((item, index) => {
                        return (<>
                            <div className='question-listing' style={{ backgroundColor: "white" }} key={index} >

                                <h4>Q{index + 1}</h4>
                                <div className='question' style={{ marginTop: "20px" }}>
                                    Question
                                    <h4 style={{ marginTop: "10px" }}> {item?.question}</h4>
                                </div>
                                <div className='answer-options' style={{ marginTop: "20px" }}>
                                    Answers
                                    {item?.answerOption?.length ?
                                        item?.answerOption?.map((answer, i) => {
                                            return (<>
                                                <div className='answer' key={i} style={{ marginTop: "10px" }}>{answer?.answer}</div>
                                            </>)
                                        })
                                        : ""}
                                </div>
                                <div className='speaker' style={{ marginTop: "20px" }}>
                                    Speaker
                                    <h6>{item?.speakerName}</h6>
                                </div>
                            </div>

                        </>)
                    })
                    : ""}
            </div>
            <div className='pie-chart-outer-layout'>
                {console.log("options--->", chartOptions)}
                <HighchartsReact
                    highcharts={Highcharts}
                    options={
                        chartOptions
                    }
                />
            </div>
        </div>

    </>)

}
export default LivePollsQuestion