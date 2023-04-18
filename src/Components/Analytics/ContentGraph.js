import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import Highcharts from "highcharts";
import { ENDPOINT } from "../../axios/apiConfig";
import { postData } from "../../axios/apiHelper";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";

import DocintelAccount from "./DocintelAccount";
const ContentGraph = () => {
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
    setSectionLoader(true);
    setApiCallStatus(false);
    try {
      let requestBody
      if(localStorage.getItem("user_id")=="iSnEsKu5gB/DRlycxB6G4g=="){
         requestBody = {
          type: "octa",
        };
      }
      else{
        requestBody = {
          type: type,
        };
      }

      const response = await postData(ENDPOINT.CONTENTTYPE, requestBody);
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
    // console.log(chart.current)
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
    }
    else if (event == 5) {
      getDataFromApi("ibu");
    }
  };

  return (
    <>
      <Col className="right-sidebar">
          <div className="custom-container">
            <Row>
              <div className="delivery-trends">
                <div className="custom-container">
                  <h3>Content in activated HCP Docintel accounts</h3>
                  <div className="tabs_content_load">
                    <Tabs
                      defaultActiveKey={activeTab.current}
                      onSelect={handleTabChange}
                    >
                      <Tab eventKey="1" title="All Business Units">
                        <Row>
                          {isDataFound && data.length > 0 ? (
                            <DocintelAccount data={activeTab.current==1?data:null} />
                          ) :
                          apiCallStatus ?
                          <div className="no_found">
                                 <p>No Data Found</p>
                           </div>
                           : null
                         }
                        </Row>
                      </Tab>
                      <Tab eventKey="2" title="Haematology">
                        <Row>
                          {isDataFound && data.length > 0 ? (
                            <DocintelAccount data={activeTab.current==2?data:null} />
                          ) :
                          apiCallStatus ?
                          <div className="no_found">
                                 <p>No Data Found</p>
                           </div>
                           : null
                         }
                        </Row>
                      </Tab>
                      <Tab eventKey="3" title="Critical Care">
                        <Row>
                          {isDataFound && data.length > 0 ? (
                            <DocintelAccount data={activeTab.current==3?data:null} />
                          ) :
                          apiCallStatus ?
                          <div className="no_found">
                                 <p>No Data Found</p>
                           </div>
                           : null
                         }
                        </Row>
                      </Tab>
                      <Tab eventKey="4" title="Immunotherapy">
                        <Row>
                          {isDataFound && data.length > 0 ? (
                            <DocintelAccount data={activeTab.current==4?data:null} />
                          ) :
                          apiCallStatus ?
                          <div className="no_found">
                                 <p>No Data Found</p>
                           </div>
                           : null
                         }
                        </Row>

                      </Tab>
                      <Tab eventKey="5" title="IBU">
                        <Row>
                        {isDataFound && data.length > 0 ? (
                          <DocintelAccount data={activeTab.current==5?data:null} />
                          ) :
                          apiCallStatus ?
                          <div className="no_found">
                                 <p>No Data Found</p>
                           </div>
                           : null
                         }
                        </Row>
                      </Tab>
                    </Tabs>
                    {
                      sectionLoader ?

                      <div className={"loader tab-inside "+ (sectionLoader ? 'show' : '')} id="custom_loader">
                        <div className="loader_show"><span className="loader-view"> </span></div>
                      </div>
                      : ''
                    }
                  </div>
                </div>
              </div>
            </Row>
          </div>
      </Col>
    </>
  );
};
export default ContentGraph;
