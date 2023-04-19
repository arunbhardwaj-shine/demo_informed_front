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
    setSectionLoader(true)
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
      // console.log(hadData);

      // const categories = hadData?.name;

      // const newSeries = [
      //   {
      //     name: `Readers (${hadData.readerTotal})`,
      //     data: hadData.reader,
      //     color: Highcharts.getOptions().colors[1],
      //   },
      //   {
      //     name: `Views (${hadData.viewTotal})`,
      //     data: hadData.view,
      //     color: Highcharts.getOptions().colors[2],
      //   },
      //   {
      //     name: `Quantity Sold (${hadData.soldTotal})`,
      //     data: hadData.sold,
      //     color: Highcharts.getOptions().colors[0],
      //   },
      // ];

      // const newClientOptions = {
      //   ...contentTypeOptions,
      //   xAxis: { categories: categories },
      //   series: newSeries,
      //   exporting: { showTable: true },
      // };

      // setContentTypeOptions(newClientOptions);

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
              <div className="top-header">
                <div className="page-title d-flex">
                      <h2>Trending content based on Read Through Rate</h2>
                </div>
              </div>
              <div className="create-change-content spc-content analytic-charts">
                  <div className="delivery-trends">
                    <div className="custom-container">
                      <div className="tabs_content_load">
                        <Tabs
                          defaultActiveKey={activeTab.current}
                          onSelect={handleTabChange}
                        >
                          <Tab eventKey="1" title="All Business Units">
                            {isDataFound && data.length > 0 ? (
                              <DocintelAccount data={activeTab.current==1?data:null} />
                            ) :
                              apiCallStatus ?
                              <div className="no_found">
                                     <p>No Data Found</p>
                               </div>
                               : null
                             }
                          </Tab>
                          <Tab eventKey="2" title="Haematology">
                            {isDataFound && data.length > 0 ? (
                              <DocintelAccount data={activeTab.current==2?data:null} />
                            ) :
                              apiCallStatus ?
                              <div className="no_found">
                                     <p>No Data Found</p>
                               </div>
                               : null
                             }
                          </Tab>
                          <Tab eventKey="3" title="Critical Care">
                              {isDataFound && data.length > 0 ? (
                                <DocintelAccount data={activeTab.current==3?data:null} />
                              ) :
                                apiCallStatus ?
                                <div className="no_found">
                                       <p>No Data Found</p>
                                 </div>
                                 : null
                               }
                          </Tab>
                          <Tab eventKey="4" title="Immunotherapy">
                              {isDataFound && data.length > 0 ? (
                                <DocintelAccount data={activeTab.current==4?data:null} />
                              ) :
                                apiCallStatus ?
                                <div className="no_found">
                                       <p>No Data Found</p>
                                 </div>
                                 : null
                               }
                          </Tab>
                          <Tab eventKey="5" title="IBU">
                            {isDataFound && data.length > 0 ? (
                              <DocintelAccount data={activeTab.current==5?data:null} />
                            ) :
                              apiCallStatus ?
                              <div className="no_found">
                                     <p>No Data Found</p>
                               </div>
                               : null
                             }
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
              </div>    
            </Row>
          </div>
      </Col>
    </>
  );
};
export default TrendingContent;
