import React, { useState, useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const PreviewGraphModal = ({ graphType, answerOption ,question}) => {
  const [chartPieOptions, setPieChartOptions] = useState();
  const [chartBarOptions, setBarChartOptions] = useState();

 
  useEffect(() => {
    let percentage = parseInt(100 / answerOption?.length);
  
    let pieSeriesData = answerOption.map((item, index) => ({
      name: item?.answer,
      y: percentage,
      color: item?.color,
      title:question,
      // colors: ["#ff5366","#0053a0","#ff8649","#89A550","#4098B7","#DB843D","#FFBE3C","#3cff79","#b58cca","#8c95ca"]
    }));
  
  
    let barSeriesData = answerOption.map((item, index) => ({
      name: item?.answer,
      y: percentage,
      color: item?.color,
      title:question,
      // colors: ["#ff5366","#0053a0","#ff8649","#89A550","#4098B7","#DB843D","#FFBE3C","#3cff79","#b58cca","#8c95ca"]
    }));
  
    setPieChartOptions({
      chart: {
        type: "pie", 
      },
      title: {
        text: question, 
    },
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
        type: "column",
      },

      title: {
        text: question, 
    },

      // tooltip: {
      //   valueSuffix: "%",
      // },

      xAxis: {
        categories: answerOption.map(item => item?.answer),
      },

      yAxis: {
                min: 0,
                tickInterval: 1,
                title: {
                    text: "", 
                },
                stackLabels: {
                    enabled: true,
                  },
            },

      legend: {
        enabled:false,
        verticalAlign: "bottom",
    }, 
      plotOptions: {
        series: {
          stacking: "normal",
          pointWidth: 30,
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: [
            {
              distance: -40,
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
  
      series: [
        {
          name: "",
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
    </>
  );
};

export default PreviewGraphModal;
