import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Spinner } from 'react-activity';
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const SurveyAnalyticsQuestionPieChart = ({key, data,show,type }) => {
    console.log("graph type-->",data?.graphType)
    const colors = [
        "#39CABC",
        "#FAC755",
        "#F58289",
        "#8A4E9C",
        "#0442A2",
        "#00D4C0",
        "#BCA9F5",
        "#D61975",
        "#9af5b2",
        "#0066BE",
        "#FFBE2C",
        "#7cb0dd",
        "#7c00ad",
        "#ACB5F5",
        "#009739",
        "#db6f2c",
        "#9C9CA2",
        "#00003C",
      ];
    const baseOptions = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            height: 225,
            type: 'pie',
            animation: {
                duration: 0 // Set the animation duration to 0
            },
        },
        title: {
            text: "",
        },
        tooltip: {
            formatter: function () {
                // Calculate the total sum of all points in the series
                var total = 0;
                this.series.data.forEach(function(point) {
                    total += point.y;
                });
                
                // Calculate the percentage for the current point
                var percentage = ((this.point.y / total) * 100).toFixed(0);
        
                // Return the tooltip string with both the name and percentage of this.point.y
                return this.point.name + ' : <b>' + this.point.y + '</b> (' + percentage + '%)';
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
            labelFormat: '{name} ({percentage:.0f}%)',
            enabled:false
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
                size: "100%",
                dataLabels: {
                    enabled: false,
                },
                borderWidth: 0,
            }  
        },
        series: [],
    };
    
    const [pieChartOptions, setPieChartOptions] = useState(type === "analytics" ? {
        ...baseOptions,
        exporting: {
            enabled: true,
            chartOptions: {
                title: {
                    text: ''
                }
            },
            filename: 'Survey_Questions',
            menuItemDefinitions: {
                downloadPNG: {
                    text: 'Download PNG',
                    onclick: function() {
                        this.exportChart({ type: 'image/png' });
                    }
                },
                downloadJPEG: {
                    text: 'Download JPEG',
                    onclick: function() {
                        this.exportChart({ type: 'image/jpeg' });
                    }
                },
                downloadPDF: {
                    text: 'Download PDF',
                    onclick: function() {
                        this.exportChart({ type: 'application/pdf' });
                    }
                },
                downloadSVG: {
                    text: 'Download SVG',
                    onclick: function() {
                        this.exportChart({ type: 'image/svg+xml' });
                    }
                }
            },
            buttons: {
                contextButton: {
                    symbol: 'url(https://docintel.app/img/octa/e-templates/options-btn.svg)',
                    menuItems: [
                        "downloadPNG",
                        "downloadJPEG",
                        "downloadPDF",
                        "downloadSVG"
                    ]
                }
            }
        }
    } : {
        ...baseOptions,
        exporting: {
            enabled: true,
        }
    });
    
    const baseBarChartOptions = {
        chart: {
            type: "bar",
            height:225
        },
        title: {
            text: "",
        },
        xAxis: {
            categories: [],
            visible: false,
        },
        yAxis: {
            min: 0,
            tickInterval: 1,
            allowDecimals: false,
            title: {
                text: "",
            },
            stackLabels: {
                enabled: true,
            },
        },
        exporting: {
            enabled: false,
        },
        legend: {
            // enabled: true,
            enabled: false,
            verticalAlign: "bottom",
        },
        tooltip: {
            formatter: function() {
                var pcnt = this.point.p.toFixed(0);
                return '<b>' + this.series.name + ":" + '</b><br/>' + pcnt+"%";
            },
        },
        plotOptions: {
            series: {
                pointWidth: 15,
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: [
                    {
                        enabled: true,
                        formatter: function() {
                            var pcnt = this.point.p.toFixed(0);
                            return '<tspan >' + pcnt + "%" + '</tspan>';
                        },
                        style: {
                            fontSize: "1.2em",
                            textOutline: "none",
                            opacity: 0.7,
                        },
                    },
                ],
            },
            bar: {
                showInLegend: true,
              }
        },
        series: [],
    };
    
    const [barChartOptions, setBarChartOptions] = useState(type === "analytics" ? {
        ...baseBarChartOptions,
        exporting: {
            enabled: true,
            chartOptions: {
                title: {
                    text: ''
                }
            },
            filename: 'Survey_Questions',
            menuItemDefinitions: {
                downloadPNG: {
                    text: 'Download PNG',
                    onclick: function() {
                        this.exportChart({ type: 'image/png' });
                    }
                },
                downloadJPEG: {
                    text: 'Download JPEG',
                    onclick: function() {
                        this.exportChart({ type: 'image/jpeg' });
                    }
                },
                downloadPDF: {
                    text: 'Download PDF',
                    onclick: function() {
                        this.exportChart({ type: 'application/pdf' });
                    }
                },
                downloadSVG: {
                    text: 'Download SVG',
                    onclick: function() {
                        this.exportChart({ type: 'image/svg+xml' });
                    }
                }
            },
            buttons: {
                contextButton: {
                    symbol: 'url(https://docintel.app/img/octa/e-templates/options-btn.svg)',
                    menuItems: [
                        "downloadPNG",
                        "downloadJPEG",
                        "downloadPDF",
                        "downloadSVG"
                    ]
                }
            }
        }
    } : {
        ...baseBarChartOptions,
        exporting: {
            enabled: false,
        }
    });
    


    useEffect(() => {
        const options = data?.ans?.map((item) => item?.name) || [];
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
        
        if(data?.graphType=="pie"){
             data?.ans?.map((item, index) => {
                seriesData.push({
                    name: item?.name,
                    y: item?.y,
                    color: colors[index],
                    drilldown: item?.drilldown,
                })
               
            })
            const drilldownData = data?.ans?.filter(question => question?.drillDownData?.length > 0).map(question => ({
                id: question.drilldown,
                name: question.name,
                data: question.drillDownData.map(answer => [answer.name, answer.total]),
                colors: question.drillDownData.map(answer => answer.color)
              }));
            setPieChartOptions({ ...pieChartOptions, 
                series: [{ ...pieChartOptions?.series[0], data: seriesData?.slice(1) }], 
                drilldown : {"series": drilldownData} })
        } else if(data?.graphType=="bar"){
            let totalAnswer = data?.ans?.map(item => item.y) // Extracting the 'y' values
            .reduce((total, yValue) => total + yValue, 0);
          data?.ans?.map((item, index) => {            
            barSeriesData.push({
                name: item?.name,
                data: [{p:(item?.y/totalAnswer)*100,y:item?.y}],
                color: colors[index],
                answer:item?.y
            })              
                
            })
            setBarChartOptions({ ...barChartOptions,xAxis: {
                ...barChartOptions.xAxis,
                categories: options,
            }, 
            series:barSeriesData?.slice(1)})
           
        }
        
    }, data?.graphType,show)


    return (<>  
        <div className="graph-box">
            {(data?.graphType=="pie"&&data?.ans?.length)?           
            <HighchartsReact
                key={"pie"}
                highcharts={Highcharts}
                options={ pieChartOptions }
            />          
            :(data?.graphType=="bar" && data?.ans?.length)?           
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
export default SurveyAnalyticsQuestionPieChart