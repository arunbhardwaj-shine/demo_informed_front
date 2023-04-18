import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";

import Highcharts from "highcharts";
import { loader } from "../../loader";

import { ENDPOINT } from "../../axios/apiConfig";
import { postData } from "../../axios/apiHelper";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import DocintelAccount from "./DocintelAccount";
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
                  <h3>Content in activated HCP Docintel accounts</h3>
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
