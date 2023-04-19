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
              <Row key={index}>
                <Col sm={2} md={2} className="img-box justify-content-center">
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
                  <h3> {element?.pdf_data?.Pdf?.title}</h3>
                  <h5>{element?.pdf_data?.Pdf?.pdf_sub_title}</h5>
                  <Button className="btn next-content btn-bordered">
                    Preview Article
                  </Button>
                  {element?.pdf_data?.Pdf?.product != undefined ? (
                    <span>{element?.pdf_data?.Pdf?.product}</span>
                  ) : null}
                </Col>

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
                          '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.z}</span>',
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
                                (element.opened / 100) * element.distribute
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
                                (element.rtr * 100) / element.distribute
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
                      series: [
                        {
                          name: "",
                          data: dataForGraph.map((c) => parseInt(c.y)),
                          showInLegend: false,
                          dataLabels: {
                            enabled: true,
                            inside: true,
                            color: "#FFFFFF",
                            align: "center",
                            verticalAlign: "top",
                            format: "{y}", // this will display the y value on top of the column
                            style: {
                              textOutline: "none", // to remove the border around the text
                              fontSize: "12px",
                            },
                          },
                        },
                      ],
                    }}
                  />
                </Col>
              </Row>
            );
          })
        : null}
    </>
  );
};

export default DocintelAccount;
