import React, { useState,  } from "react";
import { Button, Col,  Image, Row } from "react-bootstrap";
import Highcharts from "highcharts";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";


import HighchartsReact from "highcharts-react-official";


exporting(Highcharts);
exportData(Highcharts);
const dummyData = {
  pdf_title: "Lorem ipsum dolor sit amet",
  pdf_sub_title: "Consectetur adipiscing elit",
  created: "2022-03-01",
  exp_datetime: "2022-04-01",
  country: "Lorem",
  company: "Ipsum Inc.",
  status: "active",
  code: "ABC123",
  pdf_limit: "10",
};
export default function RegistrationTypeLayout() {
  Highcharts.setOptions({
    colors: [
      "#F58289",
      "#FFBE2C",
      "#00D4C0",
      "#0066BE",
      "#0b3a81",
      "#D61975",
      "#FFBE2C",
      "#F0EEE4",
      "#00003C",
    ],
  });

//   const [resgistrationTypeOptions, setResgistrationTypeOptions] = useState();
  const {
    pdf_title,
    pdf_sub_title,
    created,
    exp_datetime,
    country,
    company,
    status,
    code,
    pdf_limit,
  } = dummyData;
  return (
    <div className="kpi-graph-inside custom_sarch">
      <Row>
          <Col sm={2} md={2} className="img-box justify-content-center">
            <div className="content-listed-shorting">
              <span>1</span>
            </div>
            <Image
              src="https://imagecolorpicker.com/imagecolorpicker.png"
              alt="Hell"
            />
          </Col>
          <Col sm={5} md={5} className="content-listed">
            <div className="content-listed-content">
              <h3 className="remove_bg">
                <i>{pdf_title}</i>
              </h3>
              <h5 className="sub_title">{pdf_sub_title}</h5>
              <div className="content-listed-content-inside">
                      <h5 className="created">
                        <strong>Created:</strong>{" "}
                        {new Date(created).toLocaleDateString()}
                      </h5>
                      <h5 className="expire">
                        <strong>Expire:</strong>{" "}
                        {new Date(exp_datetime).toLocaleDateString()}
                      </h5>
                      <h5 className="country">
                        <strong>Country:</strong> {country}
                      </h5>
                      <h5 className="company">
                        <strong>Company:</strong> {company}
                      </h5>
                      <h5 className="status">
                        <strong>Status:</strong>{" "}
                        <span className={status}>{status}</span>
                      </h5>
                      <h5 className="author_by">
                        <strong>Url code:</strong> {code}
                      </h5>
                     <h5 className="author_by">
                      <strong>Limit:</strong> {pdf_limit}
                     </h5>
              </div>
            </div>
          </Col>
          <Col>
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                chart: {
                  type: "solidgauge",
                   height: 200,
                   width:200,
                 
                },
                exporting: false,
                title: {
                  text: "",
                  style: {
                    fontSize: "16px",
                  },
                },
                credits: {
                  enabled: false,
                },
                tooltip: {
                  borderWidth: 0,
                  backgroundColor: "none",
                  shadow: false,
                  style: {
                    fontSize: "12px",
                  },
                  valueSuffix: "",
                  pointFormat:
                    '{series.name}<br><span style="font-size:2em; font-weight: bold">{point.z}</span>',
                  positioner: function (labelWidth) {
                    return {
                      x: (this.chart.chartWidth - labelWidth) / 2,
                      y: this.chart.plotHeight / 2 - 10,
                    };
                  },
                },
                pane: {
                  startAngle: 0,
                  endAngle: 360,
                  background: [
                    {
                      // Track for Move
                      outerRadius: "112%",
                      innerRadius: "88%",
                      backgroundColor: Highcharts.color(
                        Highcharts.getOptions().colors[3]
                      )
                        .setOpacity(0.3)
                        .get(),
                      borderWidth: 0,
                    },
                    {
                      // Track for Exercise
                      outerRadius: "87%",
                      innerRadius: "63%",
                      backgroundColor: Highcharts.color(
                        Highcharts.getOptions().colors[1]
                      )
                        .setOpacity(0.3)
                        .get(),
                      borderWidth: 0,
                    },
                    {
                      // Track for Stand
                      outerRadius: "62%",
                      innerRadius: "38%",
                      backgroundColor: Highcharts.color(
                        Highcharts.getOptions().colors[2]
                      )
                        .setOpacity(0.3)
                        .get(),
                      borderWidth: 0,
                    },
                  ],
                },
                yAxis: {
                  min: 0,
                  max: 100,
                  lineWidth: 0,
                  tickPositions: [],
                },
                plotOptions: {
                  solidgauge: {
                    dataLabels: {
                      enabled: false,
                    },
                    linecap: "round",
                    stickyTracking: false,
                    rounded: true,
                  },
                },
                series: [
                  {
                    name: "Openings",
                    data: [
                      {
                        color: Highcharts.getOptions().colors[3],
                        radius: "112%",
                        innerRadius: "88%",
                        y: 45,
                        z: 650,
                      },
                    ],
                  },
                  {
                    name: "Unique Openings",
                    data: [
                      {
                        color: Highcharts.getOptions().colors[1],
                        radius: "87%",
                        innerRadius: "63%",
                        y: 62,
                        z: 320,
                      },
                    ],
                  },
                  {
                    name: "Actual Readers",
                    data: [
                      {
                        color: Highcharts.getOptions().colors[2],
                        radius: "62%",
                        innerRadius: "38%",
                        y: 78,
                        z: 410,
                      },
                    ],
                  },
                ],
              }}
            />
          </Col>
          <Col>
            <div className="kpi-graph-inside-box count_display">
              <p className="total_opening">
                Openings: <span>126</span>
              </p>
              <p className="unique_readers">
                Unique Readers: <span>11</span>
              </p>
              <p className="read_rate">
                Actual Readers: <span>33</span>
              </p>
            </div>
          </Col>
          <Row className="mt-5 d-flex justify-content-between">
            <Col>
              <h5 className="author_by">
                <strong>View AVG based on limits: 25%</strong>
              </h5>
            </Col>
            <Col className="d-flex justify-content-end">
              <Button className="btn next-content btn-bordered">Preview Article</Button>
              <Button className="btn next-content btn-bordered">Download Stats</Button>
            </Col>
          </Row>
      </Row>

        <Row>
          <Col>
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                chart: {
                  type: "line",
                  height: "36%",
                },
                title: {
                  text: "",
                },
                exporting: {
                  tableCaption: "",
                },
                credits: {
                  enabled: false,
                },
                subtitle: {
                  text: "",
                },
                xAxis: {
                  categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ],
                },
                yAxis: {
                  title: {
                    text: "",
                  },
                },
                plotOptions: {
                  line: {
                    dataLabels: {
                      enabled: true,
                    },
                    enableMouseTracking: true,
                  },
                  series: {
                    events: {
                      legendItemClick: function (event) {
                        var sr = this.chart.series;
                        for (let i = 0; i < sr.length; i++) {
                          if (this === sr[i]) sr[i].setVisible(true);
                          else sr[i].setVisible(false);
                        }
                        return false;
                      },
                    },
                  },
                },
                series: [
                  {
                    name: "Registerationss",
                    data: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8],
                    color: Highcharts.getOptions().colors[2],
                  },
                  {
                    name: "Unique Openings",
                    data: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 135],
                    color: Highcharts.getOptions().colors[1],
                  },

                  {
                    name: "Openings",
                    data: [1, 2, 7, 12, 17, 27, 127, 124, 127, 127, 127, 127],
                    color: Highcharts.getOptions().colors[3],
                  },
                ],
              }}
            />
          </Col>
        </Row>
    </div>
  );
}
