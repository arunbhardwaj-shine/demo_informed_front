import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
function DisplayAnswer({ show, data, onClose }) {

  const [userCount,setUserCount] = useState(0) 

 

const seriesData = data.map((question) => ({
  name: question.name,
  y: question.y,
  drilldown: question.drilldown,
  color: question.y === 2 ? "#00FF00" : "#FF0000", 
}));
const drilldownData = data
  .filter(question => question.drillDownData.length > 0) // Exclude questions with empty drillDownData
  .map(question => ({
    id: question.drilldown,
    data: question.drillDownData.map(answer => [answer.name, answer.total]),
    colors: question.drillDownData.map(answer => answer.color)
  }));
;

// console.log(drilldownData);
const chartOptions = {
  chart: {
    type: "pie",
  },
  title: {
    text: "User Answers",
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: true,
        format: "<b>{point.name}</b>: {point.percentage:.1f} %",
      },
      showInLegend: false,
    },
  },
  series: [
    {
      name: "Questions",
      colorByPoint: true,
      data: seriesData,
    },
  ],
  drilldown: {
    series: drilldownData,
  },
};


// const [highchartData, setHighChartData] = useState(chartOptions);
// useEffect(() => {
//   const seriesData = sampleData.data.map((question) => ({
//     name: question.name,
//     y: question.y,
//     drilldown: question.drilldown,
//     color: question.y === 2 ? "#00FF00" : "#FF0000", // Define colors based on your logic
//   }));
//   const drilldownData = sampleData.data.map((question) => ({
//     id: question.drilldown,
//     data: question.drillDownData.map((answer) => [answer.name, answer.total]),
//   }));
//   console.log(seriesData);

//   const chartOptions = {
//     chart: {
//       type: "pie",
//     },
//     title: {
//       text: "Your Chart Title",
//     },
//     plotOptions: {
//       pie: {
//         allowPointSelect: true,
//         cursor: "pointer",
//         dataLabels: {
//           enabled: true,
//           format: "<b>{point.name}</b>: {point.percentage:.1f} %",
//         },
//         showInLegend: true,
//       },
//     },
//     series: [
//       {
//         name: "Questions",
//         colorByPoint: true,
//         data: seriesData,
//       },
//     ],
//     drilldown: {
//       series: drilldownData,
//     },
//   };

 
//   setHighChartData(chartOptions);
// }, [sampleData]);
//  console.log(highchartData);

  Highcharts.setOptions({
    colors: ["#FFCACD", "#39CABC"],
  });
console.log(chartOptions);
  return (
    <>
      <Modal show={show} backdrop="static"      onHide={onClose}
      keyboard={false} id="pollModel1">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <img
            src="https://webinar.docintel.app/Event/webinar-assets/images/octa-logo.svg"
            alt=""
          />
        </Modal.Title>
      </Modal.Header>
        <Modal.Body>
          <p>{data?.question}</p>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          <h5>Total Answer:{userCount}</h5>
        </Modal.Body>
      
      </Modal>
    </>
  );
}

export default DisplayAnswer;
