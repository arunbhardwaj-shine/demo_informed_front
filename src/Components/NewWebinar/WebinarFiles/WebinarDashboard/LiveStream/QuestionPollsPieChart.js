import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Spinner } from 'react-activity';
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const QuestionPollsPieChart = ({ data,show }) => {
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
            text: "Polls Results",
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
            // labelFormat: '{name} ({percentage:.2f}%) ',
            labelFormat: '{name} ({percentage:.0f}%)',
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
            type: "column",
        },
        title: {
            text: "Polls Results",
        },
        
        xAxis: {
            categories: [], // Add your options/categories here
           
        },
        yAxis: {
            min: 0,
            tickInterval: 1,
            allowDecimals: false,
            title: {
                text: "", // Customize the y-axis label
            },
            stackLabels: {
                enabled: true,
              },
        },
        exporting: {
            enabled: false,
          },
        legend: {
            enabled:false,
            verticalAlign: "bottom",
            // labelFormat: '{name} ({percentage:.2f}%) ',
           
        },
        plotOptions: {
           
            series: {
                stacking: "normal",
                pointWidth: 30,
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: [
                   
                    {
                        // enabled: true,
                        distance: -40,
                        // format: "{point.percentage:.1f}%",
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
                name: "",
                colorByPoint: true,
                data: [],
            },
        ],
    });


    useEffect(() => {
        const options = data?.pollAnswers?.map((item) => item?.name) || [];
        const seriesData = data?.pollAnswers?.map((item, index) => ({
            name: item?.name,
            y: item?.y,
            color: item?.color

        }))
       
        if(data?.graphType=="pie"){
            setPieChartOptions({ ...pieChartOptions, series: [{ ...pieChartOptions?.series[0], data: seriesData }] })
        } else if(data?.graphType=="bar"){
            setBarChartOptions({ ...barChartOptions,xAxis: {
                ...barChartOptions.xAxis,
                categories: options,
            }, series: [{ ...barChartOptions?.series[0], data: seriesData }] })
           
        }
        
    }, [data?.pollAnswers],show)

    return (<>
  
        <div className="graph-box">
            {(data?.graphType=="pie"&&data?.pollAnswers?.length&&show)?
            <HighchartsReact
                key={"pie"}
                highcharts={Highcharts}
                options={ pieChartOptions }
            />
            :(data?.graphType=="bar" && data?.pollAnswers?.length&&show)?
            <HighchartsReact
                key={"bar"}
                highcharts={Highcharts}
                options={ barChartOptions }
            />:
            <div className="no_found">
                <img src={path_image + "default-bar-chart.png"} alt="" />
            </div>
            }
        </div>

    </>)

}
export default QuestionPollsPieChart