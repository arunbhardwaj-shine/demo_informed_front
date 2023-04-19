import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Tab, Tabs, Image, Button } from "react-bootstrap";

import Highcharts from "highcharts";
import { loader } from "../../loader";

import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";
import { ENDPOINT } from "../../axios/apiConfig";
import { postData } from "../../axios/apiHelper";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
// import DocintelAccount from "./DocintelAccount";
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
const TrendingContent = () => {
  const [data, setData] = useState({});
  const [isDataFound, setIsDataFound] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isTabClicked, setIsTabClicked] = useState(false);
 <Col className="right-sidebar">
   {isLoaded ? (
     <div className="custom-container">
       <Row>
         <div className="delivery-trends">
           <div className="custom-container">
             <Tabs
               defaultActiveKey={activeTab.current}
               onSelect={handleTabChange}
             >
               <Tab eventKey="1" title="All Business Units">
                 <Row>
                   {isDataFound && activeTab.current == 1 ? (
                     <DocintelAccount
                       data={activeTab.current == 1 ? data : null}
                     />
                   ) : isTabClicked ? (
                     <h4>No Data Found</h4>
                   ) : null}
                 </Row>
               </Tab>
               <Tab eventKey="2" title="Haematology">
                 <Row>
                   {isDataFound && activeTab.current == 2 ? (
                     <DocintelAccount
                       data={activeTab.current == 2 ? data : null}
                     />
                   ) : isTabClicked ? (
                     <h4>No Data Found</h4>
                   ) : null}
                 </Row>
               </Tab>
               <Tab eventKey="3" title="Critical Care">
                 <Row>
                   {isDataFound && activeTab.current == 3 ? (
                     <DocintelAccount
                       data={activeTab.current == 3 ? data : null}
                     />
                   ) : isTabClicked ? (
                     <h4>No Data Found</h4>
                   ) : null}
                 </Row>
               </Tab>
               <Tab eventKey="4" title="Immunotherapy">
                 <Row>
                   {isDataFound && activeTab.current == 4 ? (
                     <DocintelAccount
                       data={activeTab.current == 4 ? data : null}
                     />
                   ) : isTabClicked ? (
                     <h4>No Data Found</h4>
                   ) : null}
                 </Row>
               </Tab>
               <Tab eventKey="5" title="IBU">
                 <Row>
                   <DocintelAccount
                     data={activeTab.current == 5 ? data : null}
                   />
                 </Row>{" "}
                 <Row>
                   {isDataFound && activeTab.current == 5 ? (
                     <DocintelAccount
                       data={activeTab.current == 5 ? data : null}
                     />
                   ) : isTabClicked ? (
                     <h4>No Data Found</h4>
                   ) : null}
                 </Row>
               </Tab>
             </Tabs>
           </div>
         </div>
       </Row>
     </div>
   ) : null}
 </Col>;
  const activeTab = useRef(1);

  const [contentTypeOptions, setContentTypeOptions] = useState({
    chart: {
      marginTop: 100,
      type: "bar",
      events: {
        load: function () {
          let categoryHeight = 35;
          this.update({
            chart: {
              height:
                categoryHeight * this.pointCount +
                (this.chartHeight - this.plotHeight),
            },
          });
        },
      },
    },
    title: {
      text: " ",
    },
    xAxis: {
      categories: [],
    },
    credits: {
      enabled: false,
    },
    exporting: {
      showHighchart: true,
      showTable: false,
      tableCaption: "",
    },

    legend: {
      reversed: true,
      align: "center",
      verticalAlign: "top",
      floating: true,
      x: 0,
      y: 50,
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: "bold",
          color:
            (Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color) ||
            "gray",
        },
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },

    series: [],
  });

  useEffect(() => {
    getDataFromApi();
  }, []);

  const getDataFromApi = async (type = "all") => {
    loader("show");

    try {
      const requestBody = {
        type: type,
      };
      const response = await postData(ENDPOINT.CONTENT, requestBody);
      const hadData = response?.data?.data;
      if (hadData.length <= 0) {
        setIsDataFound(false);
      }

      setData(hadData);
      setIsDataFound(true);
      setIsLoaded(true);
      setIsTabClicked(true);

      loader("hide");
    } catch (err) {
      setIsDataFound(false);
      // console.log(err);
      loader("hide");
    }
    // console.log(chart.current)
  };

  const handleTabChange = (event) => {
    setIsDataFound(false);
    // setIsLoaded(false);
    setIsTabClicked(false);
    loader("show");

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
    // loader("hide");
  };

  return (
    <>
      <Col className="right-sidebar">
        {isLoaded ? (
          <div className="custom-container">
            <Row>
              <div className="delivery-trends">
                <div className="custom-container">
                  <Tabs
                    defaultActiveKey={activeTab.current}
                    onSelect={handleTabChange}
                  >
                    <Tab eventKey="1" title="All Business Units">
                      <Row>
                        {isDataFound && activeTab.current == 1 ? (
                          <DocintelAccount
                            data={activeTab.current == 1 ? data : null}
                          />
                        ) : isTabClicked ? (
                          <h4>No Data Found</h4>
                        ) : null}
                      </Row>
                    </Tab>
                    <Tab eventKey="2" title="Haematology">
                      <Row>
                        {isDataFound && activeTab.current == 2 ? (
                          <DocintelAccount
                            data={activeTab.current == 2 ? data : null}
                          />
                        ) : isTabClicked ? (
                          <h4>No Data Found</h4>
                        ) : null}
                      </Row>
                    </Tab>
                    <Tab eventKey="3" title="Critical Care">
                      <Row>
                        {isDataFound && activeTab.current == 3 ? (
                          <DocintelAccount
                            data={activeTab.current == 3 ? data : null}
                          />
                        ) : isTabClicked ? (
                          <h4>No Data Found</h4>
                        ) : null}
                      </Row>
                    </Tab>
                    <Tab eventKey="4" title="Immunotherapy">
                      <Row>
                        {isDataFound && activeTab.current == 4 ? (
                          <DocintelAccount
                            data={activeTab.current == 4 ? data : null}
                          />
                        ) : isTabClicked ? (
                          <h4>No Data Found</h4>
                        ) : null}
                      </Row>
                    </Tab>
                    <Tab eventKey="5" title="IBU">
                      <Row>
                        <DocintelAccount
                          data={activeTab.current == 5 ? data : null}
                        />
                      </Row>{" "}
                      <Row>
                        {isDataFound && activeTab.current == 5 ? (
                          <DocintelAccount
                            data={activeTab.current == 5 ? data : null}
                          />
                        ) : isTabClicked ? (
                          <h4>No Data Found</h4>
                        ) : null}
                      </Row>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </Row>
          </div>
        ) : null}
      </Col>
    </>
  );
};
export default TrendingContent;
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
