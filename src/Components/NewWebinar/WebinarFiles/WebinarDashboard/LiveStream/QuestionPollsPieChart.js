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

            // {
            //     name: 'Questions',
            //     colorByPoint: true,
            //     data: []

            // }
        ],
    }
    );

    const [barChartOptions, setBarChartOptions] = useState({
        chart: {
            type: "bar",
            // height: 250,
        },
        title: {
            text: "Polls Results",
        },
        
        xAxis: {
            categories: [], // Add your options/categories here
            visible:false
           
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
            enabled:true,
            verticalAlign: "bottom",
            // labelFormat: '{name} ({percentage:.0f}%)',
        //     x: 0,
        // y: 0,
        },
        tooltip: {
            formatter: function() {
              return '<b>' + this.series.name +":"+ '</b><br/>' +
                this.point.y ;
            }
          },
        plotOptions: {
           
            series: {
                // stacking: "normal",
                pointWidth: 30,
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: [                  
                    {
                        enabled: true,                       
                        formatter:function() {
                            var pcnt = this.point.p.toFixed(0);
                            return '<tspan >' + pcnt +"%" +'</tspan>';
                        },
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
            // {
            //     name: "",
            //     colorByPoint: true,
            //     data: [],
            // },
        ],
    });


    useEffect(() => {
        const options = data?.pollAnswers?.map((item) => item?.name) || [];
        const seriesData=[{
            name: "",
            y: "",
            color: "",
            drilldown: "",
        }]
        const barSeriesData=[{
            name: "",
            data: "",
            color: "",
            y:""
            
        }]
        
        // const seriesData = data?.pollAnswers?.map((item, index) => ({
        //     name: item?.name,
        //     y: item?.y,
        //     color: item?.color,
        //     drilldown: item?.drilldown,
        // }))

        // const barSeriesData=data?.pollAnswers?.map((item, index) => ({
        //     name: item?.name,
        //     data: [item?.y],
        //     color: item?.color,
        //     drilldown: item?.drilldown,
        // }))

        // const drilldownData = data?.pollAnswers?.filter(question => question?.drillDownData?.length > 0).map(question => ({
        //     id: question.drilldown,
        //     name: question.name,
        //     data: question.drillDownData.map(answer => [answer.name, answer.total]),
        //     colors: question.drillDownData.map(answer => answer.color)
        //   }));
        if(data?.graphType=="pie"){
             data?.pollAnswers?.map((item, index) => {
                seriesData.push({
                    name: item?.name,
                    y: item?.y,
                    color: item?.color,
                    drilldown: item?.drilldown,
                })
               
            })
            const drilldownData = data?.pollAnswers?.filter(question => question?.drillDownData?.length > 0).map(question => ({
                id: question.drilldown,
                name: question.name,
                data: question.drillDownData.map(answer => [answer.name, answer.total]),
                colors: question.drillDownData.map(answer => answer.color)
              }));
            // setPieChartOptions({ ...pieChartOptions, series: [{ ...pieChartOptions?.series[0], data: seriesData?.slice(1) }], drilldown : {"series": drilldownData} })
            setPieChartOptions({ ...pieChartOptions, 
                series: [{ ...pieChartOptions?.series[0], data: seriesData?.slice(1) }], 
                drilldown : {"series": drilldownData} })
        } else if(data?.graphType=="bar"){
            let totalAnswer = data?.pollAnswers?.map(item => item.y) // Extracting the 'y' values
            .reduce((total, yValue) => total + yValue, 0);
          data?.pollAnswers?.map((item, index) => {
            barSeriesData.push({
                name: item?.name,
                data: [{p:(item?.y/totalAnswer)*100,y:item?.y}],
                color: item?.color,
                answer:item?.y
            })               
                
            })
            setBarChartOptions({ ...barChartOptions,xAxis: {
                ...barChartOptions.xAxis,
                categories: options,
            }, 
            // series: [{ ...barChartOptions?.series[0], data: seriesData }] })
            series:barSeriesData?.slice(1)})
           
        }
        
    }, [data?.pollAnswers],show)


    return (<>
  
        <div className="graph-box">
            {(data?.graphType=="pie"&&data?.pollAnswers?.length)?
           
            <HighchartsReact
                key={"pie"}
                highcharts={Highcharts}
                options={ pieChartOptions }
            />
          
            :(data?.graphType=="bar" && data?.pollAnswers?.length)?
           
            <HighchartsReact
                key={"bar"}
                highcharts={Highcharts}
                options={ barChartOptions }
            />
            
            :
            <div className="no_found">
                <img src={path_image + "default-bar-chart.png"} alt="" />
                
            </div>
            }
        </div>

    </>)

}
export default QuestionPollsPieChart