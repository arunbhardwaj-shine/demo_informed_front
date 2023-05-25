import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import Highcharts from "highcharts";
import { ENDPOINT } from "../../axios/apiConfig";
import { postData } from "../../axios/apiHelper";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";

import DocintelAccount from "./DocintelAccount";
const TrendingContent = () => {
  const [data, setData] = useState({});
  const [isDataFound, setIsDataFound] = useState(false);
  const [sectionLoader, setSectionLoader] = useState(false);
  const [apiCallStatus, setApiCallStatus] = useState(false);

  Highcharts.setOptions({
    colors: [
      "#FFBE2C",
      "#F58289",
      "#00D4C0",
      "#D61975",
      "#0066BE",
      "#FFBE2C",
      "#F0EEE4",
      "#00003C",
    ],
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const activeTab = useRef(1);

  useEffect(() => {
    getDataFromApi();
     window.scrollTo(0, 0);
  }, []);

  const getDataFromApi = async (type = "all") => {
    setSectionLoader(true);
    setApiCallStatus(false);
    try {
      const requestBody = {
        type: type,
      };
      const response = await postData(ENDPOINT.CONTENT, requestBody);
      const hadData = response?.data?.data;
      if (hadData.length <= 0) {
        setIsDataFound(false);
      }

      setIsDataFound(true);

      setData(hadData);

      setSectionLoader(false);
    } catch (err) {
      setIsDataFound(false);
      setSectionLoader(false);
    }
    setApiCallStatus(true);
  };

  const handleTabChange = (event) => {
    setIsDataFound(false);
    setSectionLoader(true);

    activeTab.current = event;
    if (event == 1) {
      getDataFromApi("all");
    } else if (event == 2) {
      getDataFromApi("haematology");
    } else if (event == 3) {
      getDataFromApi("critcal_care");
    } else if (event == 4) {
      getDataFromApi("immunology");
    } else if (event == 5) {
      getDataFromApi("ibu");
    }
  };

  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="top-header">
              {/* <div className="page-title d-flex">
                <h2>Trending content based on Read Through Rate</h2>
              </div> */}
            </div>
            <div className="distribute-page-reader">
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="512.000000pt"
                height="512.000000pt"
                viewBox="0 0 512.000000 512.000000"
              >
                {" "}
                <g
                  transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                  fill="#0066be"
                  stroke="none"
                >
                  {" "}
                  <path d="M3455 4786 c-94 -41 -124 -169 -58 -247 46 -55 69 -59 320 -59 l228 -1 -175 -172 c-736 -724 -1646 -1247 -2689 -1547 -210 -61 -237 -74 -267 -132 -18 -35 -18 -101 1 -137 21 -41 70 -79 113 -87 44 -9 133 13 392 92 361 111 670 235 1020 410 636 317 1162 691 1683 1194 l136 131 3 -225 c3 -209 4 -227 24 -252 39 -53 71 -69 134 -69 63 0 95 16 134 69 21 27 21 38 21 486 0 448 0 459 -21 486 -11 15 -33 37 -48 48 -27 20 -40 21 -474 23 -356 2 -453 0 -477 -11z"></path>{" "}
                  <path d="M3740 3024 c-100 -36 -172 -110 -204 -210 -15 -44 -16 -161 -14 -1154 l3 -1105 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 1125 0 1125 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z"></path>{" "}
                  <path d="M2140 2224 c-100 -36 -172 -110 -204 -210 -15 -43 -16 -128 -14 -754 l3 -705 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 725 0 725 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z"></path>{" "}
                  <path d="M540 1744 c-100 -36 -172 -110 -205 -210 -14 -43 -15 -107 -13 -514 l3 -465 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 485 0 485 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z"></path>{" "}
                </g>{" "}
              </svg>
              <p>
                Trends are based on Read-Through-Rate quantity, meaning which
                content have had any kind of reading by individual HCPs.
              </p>
            </div>
            <div className="create-change-content spc-content analytic-charts">
              <div className="delivery-trends">
                <div className="tabs_content_load">
                  <Tabs
                    defaultActiveKey={activeTab.current}
                    onSelect={handleTabChange}
                  >
                    <Tab eventKey="1" title="All Business Units">
                      {isDataFound && data.length > 0 ? (
                        <DocintelAccount
                          data={activeTab.current == 1 ? data : null}
                        />
                      ) : apiCallStatus ? (
                        <div className="no_found">
                          <p>No Data Found</p>
                        </div>
                      ) : null}
                    </Tab>
                    <Tab eventKey="2" title="Haematology">
                      {isDataFound && data.length > 0 ? (
                        <DocintelAccount
                          data={activeTab.current == 2 ? data : null}
                        />
                      ) : apiCallStatus ? (
                        <div className="no_found">
                          <p>No Data Found</p>
                        </div>
                      ) : null}
                    </Tab>
                    <Tab eventKey="3" title="Critical Care">
                      {isDataFound && data.length > 0 ? (
                        <DocintelAccount
                          data={activeTab.current == 3 ? data : null}
                        />
                      ) : apiCallStatus ? (
                        <div className="no_found">
                          <p>No Data Found</p>
                        </div>
                      ) : null}
                    </Tab>
                    <Tab eventKey="4" title="Immunotherapy">
                      {isDataFound && data.length > 0 ? (
                        <DocintelAccount
                          data={activeTab.current == 4 ? data : null}
                        />
                      ) : apiCallStatus ? (
                        <div className="no_found">
                          <p>No Data Found</p>
                        </div>
                      ) : null}
                    </Tab>
                    <Tab eventKey="5" title="IBU">
                      {isDataFound && data.length > 0 ? (
                        <DocintelAccount
                          data={activeTab.current == 5 ? data : null}
                        />
                      ) : apiCallStatus ? (
                        <div className="no_found">
                          <p>No Data Found</p>
                        </div>
                      ) : null}
                    </Tab>
                  </Tabs>
                  {sectionLoader ? (
                    <div
                      className={
                        "loader tab-inside " + (sectionLoader ? "show" : "")
                      }
                      id="custom_loader"
                    >
                      <div className="loader_show">
                        <span className="loader-view"> </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </Row>
        </div>
      </Col>
    </>
  );
};
export default TrendingContent;

{
  /* const DocintelAccount = ({ data }) => {
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
      {data != null
        ? data.map((element, index) => {
            const dataForGraph =
              element.country == 0 || element.country.length == 0
                ? [{}]
                : JSON.parse(element.country);

            // alert(element.pdf_data.Pdf.code)
            // alert(index)

            return (
              <Row key={index}>
                {index == 0 ? (
                  <Row>
                    <h3>Trending content based on Read Through Rates</h3>{" "}
                  </Row>
                ) : null}
                <Col sm={2} md={2} className="img-box justify-content-center">
                  <div style={{ width: "100px", height: "100px" }}>
                    <Image
                      src={
                        element?.pdf_data?.Pdf?.image ||
                        "https://docintel.s3-eu-west-1.amazonaws.com/cover/default/docintel_new_pdf.png"
                      }
                      alt="Image not available"
                      fluid
                    />
                  </div>
                </Col>
                <Col>
                  <span>{index + 1}</span>
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
                            inside: false,
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
*/
}
