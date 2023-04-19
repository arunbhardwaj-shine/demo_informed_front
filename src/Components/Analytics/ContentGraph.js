import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import Highcharts from "highcharts";
import { ENDPOINT } from "../../axios/apiConfig";
import { postData } from "../../axios/apiHelper";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import HighchartsReact from "highcharts-react-official";
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
      // setIsDataFound(true);
      setData(hadData);
      // setSectionLoader(false);

      if(type = "all"){
        getDataContentGraph();
      }else if(type = "haematology"){
        getDataContentGraph("Haematology");
      }else if(type = "critcal_care"){
        getDataContentGraph("Critcal_care");
      }else if(type = "immunology"){
        getDataContentGraph("imu");
      }else{
        getDataContentGraph(type);
      }

    } catch (err) {
      setIsDataFound(false);
      // setSectionLoader(false);
    }
    // setApiCallStatus(true);
    // console.log(chart.current)
  };


  const getDataContentGraph = async (type = "") => {
    // setSectionLoader(true);
    // setApiCallStatus(false);
    try {

      let requestBody = {type: type};
      const response = await postData(ENDPOINT.CONTENT_TYPE_GRAPH, requestBody);

      const hadData = response?.data?.data?.data;
      const months = response?.data?.data?.month;
      setIsDataFound(true);
      const newLineData = [
        {
          name: "",
          data: "",
          color: "",
        },
      ];
      Object.keys(hadData).map((item, index) => {
        newLineData.push({
          name: item + "(" + JSON.parse(hadData[item]?.total) + ")",
          data: hadData[item]?.data,
          color: Highcharts?.getOptions()?.colors[index],
        });
      });
      const newLineOptions = {
        ...lineOption,
        xAxis: {
          categories: months,
        },
        series: newLineData.slice(1),
      };

      setLineOption(newLineOptions);
      setSectionLoader(false);
    } catch (err) {
      console.log(err);
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
      // getDataContentGraph("");
    } else if (event == 2) {
      getDataFromApi("haematology");
      // getDataContentGraph("Haematology");
    } else if (event == 3) {
      getDataFromApi("critcal_care");
      // getDataContentGraph("Critcal_care");
    } else if (event == 4) {
      getDataFromApi("immunology");
      // getDataContentGraph("imu");
    } else if (event == 5) {
      getDataFromApi("ibu");
      // getDataContentGraph("ibu");
    }
  };

  const [lineOption, setLineOption] = useState({
    chart: {
      type: "line",
      height: 500,
    },
    title: {
      text: "Registered HCP's",
    },
    xAxis: {
      categories: [],
    },
    yAxis: {
      min: 0,
      title: {
        text: "IBU",
      },
    },
    legend: {
      align: "center",
      verticalAlign: "bottom",
      layout: "horizontal",
      x: 0,
      y: 0,
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
              if (this == sr[i]) sr[i].setVisible(true);
              else sr[i].setVisible(false);
            }
            return false;
          },
        },
      },
    },

    series: [],
  });

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
                      <Tab eventKey="1" title="All Business Units"></Tab>
                      <Tab eventKey="2" title="Haematology"></Tab>
                      <Tab eventKey="3" title="Critical Care"></Tab>
                      <Tab eventKey="4" title="Immunotherapy"></Tab>
                      <Tab eventKey="5" title="IBU">  </Tab>
                    </Tabs>


                    <Row>
                      {isDataFound && data.length > 0 ? (
                        <>
                        <div className="high_charts">
                          <HighchartsReact
                            highcharts={Highcharts}
                            options={lineOption}
                          />
                        </div>
                        <div className="con_title">
                          Content in activated HCP Docintel accounts
                        </div>
                        <DocintelAccount data={activeTab.current ? data:null} />
                        </>
                      ) :
                      apiCallStatus ?
                      <div className="no_found">
                             <p>No Data Found</p>
                       </div>
                       : null
                     }
                    </Row>

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
