import React, { useState, useRef } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import Highcharts from "highcharts";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import { loader } from "../../loader";
import domtoimage from "dom-to-image";

import HighchartsReact from "highcharts-react-official";
import { Spinner } from "react-activity";

exporting(Highcharts);
exportData(Highcharts);

export default function RegistrationTypeLayout({ data }) {
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
  const [numItemsToShow, setNumItemsToShow] = useState(15);
  const [allItemsToShow, setAllItemsToShow] = useState([]);
  const [pageAll, setPageAll] = useState(false);

  //   const [resgistrationTypeOptions, setResgistrationTypeOptions] = useSta
  const handleLoadMore = () => {
    // loader("show")
    setPageAll(true);
    setTimeout(function () {
      // setAllItemsToShow(data?.slice(numItemsToShow, data.length));
      setNumItemsToShow(numItemsToShow + data.length);
      setPageAll(false);
    }, 300);
  };
  const displayData = data?.slice(0, numItemsToShow);
  return (
    <>
      {allItemsToShow?.length ? (
        <RenderLayout data={allItemsToShow} />
      ) : (
        <RenderLayout data={displayData} />
      )}
      {pageAll == false &&
        allItemsToShow?.length + numItemsToShow < data?.length && (
          <>
            <div className="text-center load_more">
              <button className="btn btn-primary" onClick={handleLoadMore}>
                Load More
              </button>
            </div>
          </>
        )}

      {pageAll == true ? (
        <div
          className="load_more"
          style={{
            margin: "0 auto",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Spinner color="#53aff4" size={32} speed={1} animating={true} />
        </div>
      ) : null}
    </>
  );
}

const RenderLayout = ({ data }) => {
  const downloadRef = useRef(null);
  const handleDownloadClick = async (pdf_id) => {
    try {
      loader("show");

      const element = document.getElementById(pdf_id);
      // add padding to the element
      element.style.backgroundColor = "white";

      const dataUrl = await domtoimage.toPng(element, { cacheBust: true });

      const link = document.createElement("a");
      link.download = `${Math.random()}.png`;
      link.href = dataUrl;
      link.click();
      element.style.backgroundColor = "";

      loader("hide");
    } catch (err) {
      loader("hide");
      console.log(err);
    }
  };

  return (
    <>
      <div ref={downloadRef}>
        {typeof data !== "undefined" && Object.keys(data).length > 0 ? (
          data?.map((element, index) => {
            const currentDate = new Date();
            let status = element.status;
            if (new Date(element.exp_datetime) < currentDate) {
              status = "expired";
            } else if (new Date(element.exp_datetime) > currentDate) {
              status = "active";
            }
            return (
              <div
                key={element.pdf_id}
                id={element.pdf_id}
                className="kpi-graph-inside custom_sarch"
              >
                <Row>
                  <Col sm={2} md={2} className="img-box justify-content-center">
                    <div className="content-listed-shorting">
                      <span>{index + 1}</span>
                    </div>
                    <Image src={element?.image} alt="Image Not Available" />
                  </Col>
                  <Col sm={5} md={5} className="content-listed">
                    <div className="content-listed-content">
                      <h3 className="remove_bg">
                        <i>{element.pdf_title.toUpperCase()}</i>
                      </h3>
                      <h5 className="sub_title">
                        {element.pdf_sub_title.toUpperCase()}
                      </h5>
                      <div className="content-listed-content-inside">
                        <h5 className="created">
                          <strong>Created:</strong> {element.created}
                        </h5>
                        <h5 className="expire">
                          <strong>Expire:</strong>{" "}
                          {new Date(element.exp_datetime).toLocaleDateString()}
                        </h5>
                        <h5 className="country">
                          <strong>Country:</strong> {element.country}
                        </h5>
                        <h5 className="company">
                          <strong>Company:</strong> {element.company}
                        </h5>
                        <h5 className="status">
                          <strong>Status:</strong> <span>{status}</span>
                        </h5>
                        <h5 className="author_by">
                          <strong>Url code:</strong> {element.code}
                        </h5>
                        <h5 className="author_by">
                          <strong>Limit:</strong> {element.pdf_limit}
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
                          width: 200,
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
                                y: 100,
                                z: element.over_all_opening_readers,
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
                                y: Math.round(
                                  (element.over_all_unique_readers * 100) /
                                    element.over_all_opening_readers
                                ),
                                z: element.over_all_unique_readers,
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
                                y: Math.round(
                                  (element.over_all_rtr * 100) /
                                    element.over_all_opening_readers
                                ),
                                z: element.over_all_rtr,
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
                        Openings:{" "}
                        <span>{element.over_all_opening_readers}</span>
                      </p>
                      <p className="unique_readers">
                        Unique Readers:{" "}
                        <span>{element.over_all_unique_readers}</span>
                      </p>
                      <p className="read_rate">
                        Actual Readers: <span>{element.over_all_rtr}</span>
                      </p>
                    </div>
                  </Col>
                  <Row className="mt-5 d-flex justify-content-between">
                    <Col>
                      <h5 className="author_by">
                        <strong>
                          View AVG based on limits:{" "}
                          <span>
                            {element.pdf_limit != 0
                              ? Math.round(
                                  (element.over_all_opening_readers * 100) /
                                    element.pdf_limit
                                ) + " %"
                              : 0}
                          </span>
                        </strong>
                      </h5>
                    </Col>
                    <Col className="d-flex justify-content-end">
                      <a
                        className="btn next-content btn-filled"
                        href={element?.pdfLink ? element.pdfLink : "#"}
                        target="_blank"
                      >
                        Preview Article
                      </a>
                      <Button
                        className="btn next-content btn-bordered"
                        onClick={() => handleDownloadClick(element.pdf_id)}
                      >
                        Download Stats
                      </Button>
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
                          categories: JSON.parse(element.month),
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
                            name: "Total Registrations",
                            data: element.series.total_r,
                            color: Highcharts.getOptions().colors[2],
                          },
                          {
                            name: "Unique Openings",
                            data: element.series.unique_r,
                            color: Highcharts.getOptions().colors[1],
                          },

                          {
                            name: "Openings",
                            data: element.series.opening_r,
                            color: Highcharts.getOptions().colors[3],
                          },
                        ],
                      }}
                    />
                  </Col>
                </Row>
              </div>
            );
          })
        ) : (
          <div className="no_found">
            <p>No Data Found</p>
          </div>
        )}
      </div>
    </>
  );
};
