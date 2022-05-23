import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Col, Row } from "react-bootstrap";
import ExportApi from "../../../Api/ExportApi";
const EmailStatsChart = (props) => {
  const [render, setRender] = useState(0);
  const [data, setData] = useState();
  const [options_ch, setOptions_ch] = useState({
    chart: {
      type: "column",
      options3d: {
        enabled: true,
        alpha: 10,
        beta: 25,
        depth: 70,
      },
    },
    title: {
      text: "EMail Stats",
    },
    plotOptions: {
      column: {
        depth: 25,
      },
    },
    xAxis: {
      categories: [],
      labels: {
        skew3d: true,
        style: {
          fontSize: "16px",
        },
      },
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    series: [
      {
        name: "Email Stats",
        data: [],
      },
    ],
  });
  let valueupdate = options_ch;
  const handleGetEventlist = () => {
    if (props.eventid && props.templateId) {
      if (options_ch.xAxis.categories.length > 0) {
        valueupdate.series[0].data = [];
        valueupdate.xAxis.categories = [];
        setOptions_ch(valueupdate);
      
          ExportApi.getEmailStatsChart(props.eventid, props.templateId).then(
            (resp) => {
              if (resp.ok) {
                console.log(resp.data.data);
                setData(resp.data.data);
                Object.entries(resp.data.data)?.map(([key, value]) => {
                  console.log(valueupdate.xAxis.categories);
                  valueupdate.xAxis.categories.push(key);
                  valueupdate.series[0].data.push(value);
                });
              }
              setOptions_ch(valueupdate);
              setRender(render + 3);
            }
          );
       
      } else {
        ExportApi.getEmailStatsChart(props.eventid, props.templateId).then(
          (resp) => {
            if (resp.ok) {
              console.log(resp.data.data);
              setData(resp.data.data);
              Object.entries(resp.data.data)?.map(([key, value]) => {
                console.log(valueupdate.xAxis.categories);
                valueupdate.xAxis.categories.push(key);
                valueupdate.series[0].data.push(value);
              });
            }
            setOptions_ch(valueupdate);
            setRender(render + 3);
          }
        );
      }
    }
  };
  console.log(options_ch);

  useEffect(() => {
    handleGetEventlist();
  }, [props.templateId]);
  return (
    <div>
      {data ? (
        <div className="chart-description" style={{ paddingTop: "70px" }}>
          <Row style={{ backgroundColor: "#ffffff", marginBlock: "30px" }}>
            {Object.entries(data)?.map(([key, value]) => {
              return (
                <Col>
                  <h5>{key && key}</h5>
                  <p>{value}</p>
                </Col>
              );
            })}
          </Row>

          {options_ch.xAxis.categories.length > 0 ? (
            <div className="chart-description-view">
              <HighchartsReact highcharts={Highcharts} options={options_ch} />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default EmailStatsChart;
