import React, { useState, useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const PreviewGraphModal = ({ graphType, answerOption }) => {
  const [chartPieOptions, setPieChartOptions] = useState();
  const [chartBarOptions, setBarChartOptions] = useState();

 
  useEffect(() => {
    // console.log(answerOption,'answerOption')
    // let filteredAnswerOption = answerOption.filter(item => item?.answer !== "");
    // console.log(filteredAnswerOption,'filteredAnswerOption')
    // let percentage = filteredAnswerOption?.length > 0 ? parseInt(100 / filteredAnswerOption?.length) : 0;
    
    let percentage = parseInt(100 / answerOption?.length);
  
    let pieSeriesData = answerOption.map((item, index) => ({
      name: item?.answer,
      y: percentage,
      color: item?.color,
      // colors: ["#ff5366","#0053a0","#ff8649","#89A550","#4098B7","#DB843D","#FFBE3C","#3cff79","#b58cca","#8c95ca"]
    }));
  
    let barSeriesData = answerOption.map((item, index) => ({
      name: item?.answer,
      y: percentage,
      color: item?.color,
      // colors: ["#ff5366","#0053a0","#ff8649","#89A550","#4098B7","#DB843D","#FFBE3C","#3cff79","#b58cca","#8c95ca"]
    }));
  
    setPieChartOptions({
      chart: {
        type: "pie", 
      },
      title: null,
      tooltip: {
        valueSuffix: "%",
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
        pie: {
          showInLegend: true,
      //   size:"60%",
      //   dataLabels: {
      //     enabled: false, // Disable data labels for the pie chart
      // },
      }
      },
      series: [
        {
          name: "Percentage",
          colorByPoint: true,
          data: pieSeriesData,
        },
      ],
      
      exporting: {
        enabled: false,
      },

    });

    setBarChartOptions({
      chart: {
        // type: "bar",
        type: "column",
      },
      title: null,
      tooltip: {
        valueSuffix: "%",
      },
      legend: {
        enabled:true,
        verticalAlign: "bottom",
        // labelFormat: '{name} ({percentage:.2f}%) ',
       
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
        bar: {
          showInLegend: true,
      //   size:"60%",
      //   dataLabels: {
      //     enabled: false, // Disable data labels for the pie chart
      // },
      }
      },
      xAxis: {
        categories: answerOption.map(item => item?.answer),
      },
      yAxis: {
                min: 0,
                title: {
                    text: "", // Customize the y-axis label
                },
                stackLabels: {
                    enabled: true,
                  },
            },
      series: [
        {
          name: "Percentage",
          colorByPoint: true,
          data: barSeriesData,
        },
      ],
      
      exporting: {
        enabled: false,
      },

    });
  }, [answerOption]);
  
  return (
    <>
      <div className="pie-chart-outer-layout">
        <HighchartsReact
          highcharts={Highcharts}
          options={graphType === "pie" ? chartPieOptions : chartBarOptions}
        />
      </div>

          {/* {answerOption.length > 0 ? (
            answerOption.map((item, index) => (
              item?.answer !== "" ? (
                <div key={index} className="pie-chart-outer-layout">
                  <HighchartsReact
                    key={index}
                    highcharts={Highcharts}
                    options={graphType === "pie" ? chartPieOptions : chartBarOptions}
                  />
                </div>
              ) : <div className="email_box_block no_found">No graph found</div>
            ))
          ) : (
            <div className="email_box_block no_found">No graph found</div>
          )} */}


    </>
  );
};

export default PreviewGraphModal;
