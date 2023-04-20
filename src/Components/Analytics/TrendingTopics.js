import React, { useState, useEffect, useRef } from "react";
import { Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import Select from "react-select";
import { Link } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsSankey from "highcharts/modules/sankey";
import HighchartsDependencyWheel from "highcharts/modules/dependency-wheel";
import { postData } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";
HighchartsExporting(Highcharts);
HighchartsAccessibility(Highcharts);
HighchartsSankey(Highcharts);
HighchartsDependencyWheel(Highcharts);


Highcharts.setOptions({
  colors: ['#00D4C0','#FFBE2C','#F58289', '#D61975', '#00D4C0', '#FFBE2C', '#F58289','#FFBE2C']
 });

const TrendingTopics = () => {
  const [isDataFound, setIsDataFound] = useState(false);
  const activeTab = useRef(1);
  const [sectionLoader, setSectionLoader] = useState(false);
  const [apiCallStatus, setApiCallStatus] = useState(false);
  const [options, setOptions] = useState({
    chart: {
      marginTop: 100,
      type: "dependencywheel",
      height:600,
    },

    title: {
      text: "Trending Topics",
    },
    accessibility: {
      point: {
        valueDescriptionFormat:
          "{index}. From {point.from} to {point.to}: {point.weight}.",
      },
    },
    exporting: {
      showTable: true,
      tableCaption: ""
    },
    series: [
      {
        keys: ["from", "to", "weight"],
        data: [],
        type: "dependencywheel",
        name: "Dependency wheel series",
        dataLabels: {
          color: "#333",
          style: {
            textOutline: "none",
          },
          distance: 10,
        },
        size: "95%",
      },
    ],
    credits: {
      enabled: false,
    },

  });

  const getDataFromApi = async (type ="all") => {
    setSectionLoader(true);
    setApiCallStatus(false);
    try {
      const requestBody = {
        type: type,
      };
      const response = await postData(ENDPOINT.TRENDING_TOPIC,requestBody);
      const data = response.data;
      const graphData = JSON.parse(data.data[0].graph_data);
      setOptions((prevOptions) => ({
        ...prevOptions,
        series: [
          {
            ...prevOptions.series[0],
            data: graphData,
          },
        ],

      })
      );
     setIsDataFound(true)
     setSectionLoader(false);
    } catch (error) {
      setSectionLoader(false);
      console.log(error);
    }
    setApiCallStatus(true);
  };


  useEffect(() => {

    getDataFromApi();
  }, []);

   const handleTabChange = (event) => {
    setIsDataFound(false);
    activeTab.current=event
    setSectionLoader(true);
    if (event == 1) {
      getDataFromApi("all");
    } else if (event == 2) {
      getDataFromApi("haematology");
    } else if (event == 3) {
      getDataFromApi("critcal_care");
    } else if (event == 4) {
      getDataFromApi("immunology");
    }else if (event == 5) {
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
                    <h2>Trending Topics</h2>
              </div>
            </div>
            <div className="create-change-content spc-content analytic-charts">
              <Row>
                <div className="delivery-trends">
                  <div className="tabs_content_load">
                    <Tabs defaultActiveKey={activeTab.current} onSelect={handleTabChange}>
                      <Tab eventKey="1" title="All Business Units">
                      </Tab>
                      <Tab eventKey="2" title="Haematology">
                      </Tab>
                      <Tab eventKey="3" title="Critical Care">
                      </Tab>
                      <Tab eventKey="4" title="Immunotherapy">
                      </Tab>
                      <Tab eventKey="5" title="IBU">
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
              </Row>
              <div className="high_charts trending-topics">
                <HighchartsReact highcharts={Highcharts} options={options} />
              </div>
            </div>
          </Row>
        </div>
      </Col>
    </>
  );
};

export default TrendingTopics;
