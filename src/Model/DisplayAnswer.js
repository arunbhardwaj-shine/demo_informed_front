import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
function DisplayAnswer({ show, data, onClose }) {
  const [highchartData, setHighChartData] = useState({});
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
    setHighChartData(chart);
  }, [data]);

  Highcharts.setOptions({
    colors: ["#FFCACD", "#39CABC"],
  });

  return (
    <>
      <Modal show={show} backdrop="static" keyboard={false}>
        <Modal.Body>
          <p>{data?.question}</p>
          <HighchartsReact highcharts={Highcharts} options={highchartData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DisplayAnswer;
