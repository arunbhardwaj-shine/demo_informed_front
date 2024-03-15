import React, { useState } from "react";
import { Col, Image, Row, Button } from "react-bootstrap";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";

highchartsMore(Highcharts);
solidGauge(Highcharts);

const DocintelAccount = ({ data }) => {
  Highcharts.setOptions({
    colors: [
      "#0066BE",
      "#F58289",
      "#FFBE2C",
      "#00D4C0",
      "#0066BE",
      "#FFBE2C",
      "#F0EEE4",
      "#00003C",
    ],
  });

  return (
    <>
      {data?.length
        ? data.map((element, index) => {
            const dataForGraph =
              element.country == 0 || element.country.length == 0
                ? [{}]
                : JSON.parse(element.country);

            return (
              <Row key={index} className="no-margin d-flex highchart-listed">
                <div className="high_charts-leftside col-sm-6 align-items-center d-flex">
                  <Row>
                  <Col className="img-box justify-content-center">
                    <span>{index + 1}</span>
                    <div style={{ width: "100px", height: "100px" }}>
                      <Image
                        src={
                          element?.pdf_data?.Pdf?.image ||
                          "https://docintel.s3-eu-west-1.amazonaws.com/cover/default/docintel_new_pdf.png"
                        }
                        alt="Image not available"
                        fluid
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src =
                            "https://docintel.s3-eu-west-1.amazonaws.com/cover/default/docintel_new_pdf.png";
                        }}
                      />
                    </div>
                  </Col>
                  <Col>
                    <h3> {element?.pdf_data?.Pdf?.title.toUpperCase()}</h3>
                    <h5>{element?.pdf_data?.Pdf?.pdf_sub_title}</h5>
                    <a
                      className="btn next-content btn-filled"
                      href={element?.pdf_data?.Pdf?.pdfLink}
                      target="_blank"
                    >
                      Preview Article
                    </a>
                    {element?.pdf_data?.Pdf?.product != undefined ? (
                      <span>{element?.pdf_data?.Pdf?.product}</span>
                    ) : null}
                  </Col>
                  </Row>
                </div>
                <div className="high_charts-rightside col-sm-6">
                  <div class="distribute-page-reader"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_5707_4953)">
                      <path d="M6 0C2.6916 0 0 2.6916 0 6C0 9.3084 2.6916 12 6 12C9.3084 12 12 9.3084 12 6C12 2.6916 9.3084 0 6 0ZM6.426 8.826C6.198 9.048 5.802 9.048 5.574 8.826C5.4654 8.712 5.4 8.556 5.4 8.4C5.4 8.244 5.4654 8.088 5.574 7.974C5.688 7.866 5.844 7.8 6 7.8C6.156 7.8 6.312 7.866 6.426 7.974C6.534 8.088 6.6 8.244 6.6 8.4C6.6 8.556 6.534 8.712 6.426 8.826ZM6.6 6.6C6.6 6.9312 6.3318 7.2 6 7.2C5.6682 7.2 5.4 6.9312 5.4 6.6V3.6C5.4 3.2688 5.6682 3 6 3C6.3318 3 6.6 3.2688 6.6 3.6V6.6Z" fill="#0066BE" />
                    </g>
                    <defs>
                      <clipPath id="clip0_5707_4953">
                        <rect width="12" height="12" fill="white" />
                      </clipPath>
                    </defs>
                  </svg><p>The numbers are based on Read-Through-Rate (RTR), indicating how many HCPs have read this content.</p></div>
                  <Row>
                  <Col>
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={{
                        chart: {
                          type: "solidgauge",
                          height: "60%",
                        },
                        title: {
                          text: "",
                          style: {
                            fontSize: "11px",
                          },
                        },
                        exporting: {
                          enabled: false,
                        },
                        tooltip: {
                          borderWidth: 0,
                          backgroundColor: "none",
                          shadow: false,
                          style: {
                            fontSize: "10px",
                          },
                          valueSuffix: "%",
                          pointFormat:
                            '{series.name}<br><span style="font-size:2em; font-weight: bold">{point.z}</span>',
                          positioner: function (labelWidth) {
                            return {
                              x: (this.chart.chartWidth - labelWidth) / 2,
                              y: this.chart.plotHeight / 2 + 15,
                            };
                          },
                        },
                        pane: {
                          startAngle: 0,
                          endAngle: 360,
                          background: [
                            {
                              outerRadius: "95%",
                              innerRadius: "70%",
                              backgroundColor: Highcharts.color(
                                Highcharts.getOptions().colors[1]
                              )
                                .setOpacity(0.3)
                                .get(),
                              borderWidth: 0,
                            },
                            {
                              outerRadius: "71%",
                              innerRadius: "47%",
                              backgroundColor: Highcharts.color(
                                Highcharts.getOptions().colors[2]
                              )
                                .setOpacity(0.3)
                                .get(),
                              borderWidth: 0,
                            },
                            {
                              outerRadius: "43%",
                              innerRadius: "18%",
                              backgroundColor: Highcharts.color(
                                Highcharts.getOptions().colors[3]
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
                            name: "Registration",
                            data: [
                              {
                                color: Highcharts.getOptions().colors[1],
                                radius: "95%",
                                innerRadius: "70%",
                                y: element.distribute,
                                z: element.distribute,
                              },
                            ],
                          },
                          {
                            name: "Openings",
                            data: [
                              {
                                color: Highcharts.getOptions().colors[2],
                                radius: "69%",
                                innerRadius: "44%",
                                y: Math.round(
                                  (element.opened * 100) / element.distribute
                                ),
                                z: element.opened,
                              },
                            ],
                          },
                          {
                            name: "Actual Readers",
                            data: [
                              {
                                color: Highcharts.getOptions().colors[3],
                                radius: "44%",
                                innerRadius: "18%",
                                y: Math.round(
                                  (element.rtr * 100) / element.opened
                                ),
                                z: element.rtr,
                              },
                            ],
                          },
                        ],
                      }}
                    />
                  </Col>
                  <Col>
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={{
                        chart: {
                          type: "column",
                          height: "80%",
                        },
                        title: {
                          text: "",
                        },
                        exporting: {
                          enabled: false,
                        },
                        xAxis: {
                          categories: dataForGraph.map((c) => c.name),
                        },
                        yAxis: {
                          title: {
                            text: "",
                          },
                        },
                        plotOptions: {
                          column: {
                            colorByPoint: true,
                            colors: [
                              "#0066BE",
                              "#00D4C0",
                              "#FFBE2C",
                              "#F58289",
                              "#00003C",
                              "#F0EEE4",
                              "#D61975",
                            ],
                          },
                        },
                        series: [
                          {
                            name: "",
                            data: dataForGraph.map((c) => parseInt(c.y)),
                            showInLegend: false,
                            dataLabels: {
                              enabled: true,
                              inside: false,
                              format: "{y}", // this will display the y value on top of the column
                              style: {
                                textOutline: "none", // to remove the border around the text
                                fontSize: "12px",
                              },
                            },
                            pointWidth: 35,
                          },
                        ],
                      }}
                    />
                  </Col>
                  </Row>
                </div>
              </Row>
            );
          })
        : null}
    </>
  );
};

export default DocintelAccount;
