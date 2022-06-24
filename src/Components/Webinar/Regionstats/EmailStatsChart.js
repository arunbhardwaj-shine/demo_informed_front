import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Col, Form, Row } from "react-bootstrap";
import ExportApi from "../../../Api/ExportApi";
const EmailStatsChart = (props) => {
  const [render, setRender] = useState(0);
  const [data, setData] = useState();
  const [templateList, setTemplateList] = useState();
  const [TemplateId, setTemplateId] = useState();
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
  const handleGetEventlist = (id) => {
    if (props.eventid ) {
      if (options_ch.xAxis.categories.length > 0) {
        valueupdate.series[0].data = [];
        valueupdate.xAxis.categories = [];
        setOptions_ch(valueupdate);
        ExportApi.getEmailStatsChart(props.eventid, id).then(
          (resp) => {
            if (resp.ok) {
              setData(resp.data.data);
              Object.entries(resp.data.data)?.map(([key, value]) => {
                valueupdate.xAxis.categories.push(key);
                valueupdate.series[0].data.push(value);
              });
            }
            setOptions_ch(valueupdate);
            setRender(render + 3);
          }
        );
      } else {
        ExportApi.getEmailStatsChart(props.eventid,id).then(
          (resp) => {
            if (resp.ok) {
              setData(resp.data.data);
              Object.entries(resp.data.data)?.map(([key, value]) => {
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
  const handleGetTemplateList = () => {
    ExportApi.UserTemplateList(props.eventid).then((resp) => {
      if (resp.ok) {
        // console.log("first", resp.data.code);
        if (resp.data.code == 404) {
          setTemplateList()
        }else{
          if(TemplateId==null||TemplateId==undefined){
          setTemplateId(resp.data.data[0].id)
          handleGetEventlist(resp.data.data[0].id)
          }
          setTemplateList(resp.data.data);
        }
      }
    });
  };

  useEffect(() => {
    handleGetTemplateList();
  }, [props.eventid]);
  return (
    <div class="right-sidebar">
            <Row>
            <Col>
              <Form.Label>Select Template </Form.Label>
              <Form.Select
                name="type"
                value={TemplateId}
                onChange={(e) => {
                  handleGetEventlist(e.target.value)
                  setTemplateId(e.target.value);
                }}
              >
                <option value="null"> Select Template</option>
                {templateList
                  ? templateList?.map((val, i) => (
                      <React.Fragment key={i}>
                        <option value={val.id}>{val.name}</option>
                      </React.Fragment>
                    ))
                  : null}
              </Form.Select>
            </Col>
          </Row>
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
