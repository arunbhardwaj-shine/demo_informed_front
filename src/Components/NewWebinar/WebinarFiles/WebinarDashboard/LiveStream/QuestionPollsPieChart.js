import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const QuestionPollsPieChart = ({ data }) => {
    console.log("pie data-->",data)
    const [pieChartOptions, setPieChartOptions] = useState({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
             animation: {
                duration: 0 // Set the animation duration to 0
            },
        },
        title: {
            text: "User Answers",
        },
        exporting: {
            enabled: false,
          },
        tooltip: {
            formatter: function () {
                return this.point.name + ' : <b>' + this.point.y + '</b>';
            },
            valueSuffix: '%'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        legend: {
            verticalAlign: "bottom",
            labelFormat: '{name} ({percentage:.2f}%) ',
        },

        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: [
                    
                    {
                        enabled: true,
                        distance: -40,
                        format: "{point.percentage:.1f}%",
                        style: {
                            fontSize: "1.2em",
                            textOutline: "none",
                            opacity: 0.7,
                        },
                    },
                ],
            },
            pie: {
                showInLegend: true,
              size:"60%",
              dataLabels: {
                enabled: false, // Disable data labels for the pie chart
            },
            }

        },
        series: [

            {
                name: 'Questions',
                colorByPoint: true,
                data: []

            }
        ],

    }
    );


    const [barChartOptions, setBarChartOptions] = useState({
        chart: {
            type: "bar",
        },
        title: null,
        tooltip: {
            valueSuffix: "%",
        },
        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: [
                    {
                        enabled: true,
                        distance: 20,
                    },
                    {
                        enabled: true,
                        distance: -40,
                        format: "{point.percentage:.1f}%",
                        style: {
                            fontSize: "1.2em",
                            textOutline: "none",
                            opacity: 0.7,
                        },
                    },
                ],
            },
        },
        series: [
            {
                name: "Questions",
                colorByPoint: true,
                data: [],
            },
        ],
    });


    useEffect(() => {
        const seriesData = data?.pollAnswers?.map((item, index) => ({
            name: item?.name,
            y: item?.y,
            // color: item?.color

        }))
        if(data?.graphType=="pie"){
            setPieChartOptions({ ...pieChartOptions, series: [{ ...pieChartOptions?.series[0], data: seriesData }] })
            setBarChartOptions({ ...barChartOptions,chart:{type:"pie"} ,series: [{ ...barChartOptions?.series[0], data: [] }] })
        } else if(data?.graphType=="bar"){
            setBarChartOptions({ ...barChartOptions,chart:{type:"bar"}, series: [{ ...barChartOptions?.series[0], data: seriesData }] })
           
        }
        
    }, [data])

    return (<>
        <div className="graph-box">
            {(data?.graphType=="pie"&&data?.pollAnswers)?
            <HighchartsReact
                highcharts={Highcharts}
                options={ pieChartOptions }
            />
            :(data?.graphType=="bar" && data?.pollAnswers)?
            <HighchartsReact
                highcharts={Highcharts}
                options={ barChartOptions }
            />:
            <div>
                No Data Found
            </div>
            }
        </div>

    </>)

}
export default QuestionPollsPieChart