import React, { useState, useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const PreviewGraphModal = ({ graphType, answerOption }) => {
  const [chartPieOptions, setPieChartOptions] = useState();
  const [chartBarOptions, setBarChartOptions] = useState();

//   useEffect(() => {
//     console.log(answerOption, "====>questionData");
//     let percentage = parseInt(100 / answerOption?.length);
//     let colors = [];
//     let seriesData = answerOption.map((item, index) => {
//       colors.push(item?.color);
//       return {
//         name: item?.answer,
//         y: percentage,
//         color: item?.color,
//       };
//     });
//     console.log(seriesData, "seriesData");
//     setPieChartOptions({
//       chart: {
//         type: "pie",
//       },
//       tooltip: {
//         valueSuffix: "%",
//       },

//       plotOptions: {
//         series: {
//           allowPointSelect: true,
//           cursor: "pointer",
//           dataLabels: [
//             {
//               enabled: true,
//               distance: 20,
//             },
//             {
//               enabled: true,
//               distance: -40,
//               format: "{point.percentage:.1f}%",
//               style: {
//                 fontSize: "1.2em",
//                 textOutline: "none",
//                 opacity: 0.7,
//               },
//               // filter: {
//               //     operator: '>',
//               //     property: 'percentage',
//               //     value: 10
//               // }
//             },
//           ],
//         },
//       },
//       series: [
//         {
//           name: "Percentage",
//           colorByPoint: true,
//           data: seriesData,
//           colors,
//         },
//       ],
//     });

//     setBarChartOptions({
//       chart: {
//         type: "bar",
//       },
//       tooltip: {
//         valueSuffix: "%",
//       },

//       plotOptions: {
//         series: {
//           allowPointSelect: true,
//           cursor: "pointer",
//           dataLabels: [
//             {
//               enabled: true,
//               distance: 20,
//             },
//             {
//               enabled: true,
//               distance: -40,
//               format: "{point.percentage:.1f}%",
//               style: {
//                 fontSize: "1.2em",
//                 textOutline: "none",
//                 opacity: 0.7,
//               },
//               // filter: {
//               //     operator: '>',
//               //     property: 'percentage',
//               //     value: 10
//               // }
//             },
//           ],
//         },
//       },
//       series: [
//         {
//           name: "Percentage",
//           colorByPoint: true,
//           data: [
//             {
//               name: "Water",
//               y: 55.02,
//             },
//             {
//               name: "Fat",
//               sliced: true,
//               selected: true,
//               y: 26.71,
//             },
//             {
//               name: "Carbohydrates",
//               y: 1.09,
//             },
//             {
//               name: "Protein",
//               y: 15.5,
//             },
//             {
//               name: "Ash",
//               y: 1.68,
//             },
//           ],
//         },
//       ],
//     });
//   }, []);

// useEffect(() => {
//     console.log(answerOption, "====>questionData");
//     let percentage = parseInt(100 / answerOption?.length);
//     let seriesData = answerOption.map((item, index) => ({
//       name: item?.answer,
//       y: percentage,
//       color: item?.color,
//     }));
  
//     console.log(seriesData, "seriesData");
  
//     setPieChartOptions({
//       chart: {
//         type: "pie",
//       },
//       tooltip: {
//         valueSuffix: "%",
//       },
//       plotOptions: {
//         series: {
//           allowPointSelect: true,
//           cursor: "pointer",
//           dataLabels: [
//             {
//               enabled: true,
//               distance: 20,
//             },
//             {
//               enabled: true,
//               distance: -40,
//               format: "{point.percentage:.1f}%",
//               style: {
//                 fontSize: "1.2em",
//                 textOutline: "none",
//                 opacity: 0.7,
//               },
//             },
//           ],
//         },
//       },
//       series: [
//         {
//           name: "Percentage",
//           colorByPoint: true,
//           data: seriesData,
//         },
//       ],
//     });

//     setBarChartOptions({
//         chart: {
//           type: "bar",
//         },
//         tooltip: {
//           valueSuffix: "%",
//         },
//         plotOptions: {
//           series: {
//             allowPointSelect: true,
//             cursor: "pointer",
//             dataLabels: [
//               {
//                 enabled: true,
//                 distance: 20,
//               },
//               {
//                 enabled: true,
//                 distance: -40,
//                 format: "{point.percentage:.1f}%",
//                 style: {
//                   fontSize: "1.2em",
//                   textOutline: "none",
//                   opacity: 0.7,
//                 },
//               },
//             ],
//           },
//         },
//         series: [
//           {
//             name: "Percentage",
//             colorByPoint: true,
//             data: seriesData,
//           },
//         ],
//       });
//   }, [answerOption]);
  
  useEffect(() => {
    console.log(answerOption, "====>questionData");
    let percentage = parseInt(100 / answerOption?.length);
  
    // Create seriesData for Pie Chart
    let pieSeriesData = answerOption.map((item, index) => ({
      name: item?.answer,
      y: percentage,
      color: item?.color,
    }));
  
    // Create seriesData for Bar Chart
    let barSeriesData = answerOption.map((item, index) => ({
      name: item?.answer,
      y: percentage,
      color: item?.color,
    }));
  
    console.log(pieSeriesData, "pieSeriesData");
    console.log(barSeriesData, "barSeriesData");
  
    setPieChartOptions({
      chart: {
        type: "pie",
      },
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
          name: "Percentage",
          colorByPoint: true,
          data: pieSeriesData,
        },
      ],
    });
  
    setBarChartOptions({
      chart: {
        type: "bar",
      },
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
          name: "Percentage",
          colorByPoint: true,
          data: barSeriesData,
        },
      ],
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
