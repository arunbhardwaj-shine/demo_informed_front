import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
function DisplayAnswer({ show, data, onClose }) {
  const [highchartData, setHighChartData] = useState({});
  const [userCount,setUserCount] = useState(0) 
  useEffect(() => {
    let line_v = [],line_h=[],totalAnswer=0,graphData=[];
    data?.answers?.forEach((value, index)=>{
      line_v.push(value.answer);
      line_h.push(value.count_answer);
      totalAnswer = totalAnswer + value.count_answer;
      const foundObj = {
        y: value.count_answer,
        name: value.answer,
        color: value.color_code,
      };
      graphData.push(foundObj);
    });

    const chart = {
      chart: {
        type: "column",
      },
      yAxis: {
        min: 0,
        tickInterval: 1,
      },
      xAxis: {
        categories: line_v,
      },
      title: {
        text: "",
      },
      plotOptions: {
        series: {
          pointWidth: 20,
        },
      },
      column: {
        colorByPoint: true,
      },
      exporting: {
        enabled: false,
      },

      series: [
        {
          data: graphData,
          showInLegend: false,
        },
      ],
    };
    setUserCount(totalAnswer)
    setHighChartData(chart);
  }, [data]);

  Highcharts.setOptions({
    colors: ["#FFCACD", "#39CABC"],
  });

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
          <HighchartsReact highcharts={Highcharts} options={highchartData} />
          <h5>Total Answer:{userCount}</h5>
        </Modal.Body>
      
      </Modal>
    </>
  );
}

export default DisplayAnswer;
