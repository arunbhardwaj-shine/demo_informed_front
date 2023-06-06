import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import Highcharts from "highcharts";
import { ENDPOINT } from "../../axios/apiConfig";
import { postData } from "../../axios/apiHelper";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import HighchartsReact from "highcharts-react-official";
import DocintelAccount from "./DocintelAccount";
const CanadaContentType = () => {
  const [data, setData] = useState({});
  const [isDataFound, setIsDataFound] = useState(false);
  const [sectionLoader, setSectionLoader] = useState(false);
  const [apiCallStatus, setApiCallStatus] = useState(false);
  const [totalLength, setTotalLength] = useState(0);

  Highcharts.setOptions({
    colors: [
      //   "#FFBE2C",
      //   "#F58289",
      //   "#00D4C0",
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

  const getDataFromApi = async (type = "Haematology") => {
    setSectionLoader(true);
    setApiCallStatus(false);
    try {
      let requestBody;
      if (localStorage.getItem("user_id") == "iSnEsKu5gB/DRlycxB6G4g==") {
        requestBody = {
          type: "octa",
        };
      } else {
        requestBody = {
          type: type,
        };
      }

      const response = await postData(ENDPOINT.CIS_CONTENT_TYPE, requestBody);
      if (type == "Haematology") {
        getDataContentGraph("Haematology");
      } else if (type == "ibu") {
        getDataContentGraph("ibu");
      }
      const hadData = response?.data?.data;
  
      if (hadData.length <= 0) {
        setIsDataFound(false);
      }
      // setIsDataFound(true);
      setData(hadData);
      // setSectionLoader(false);
    } catch (err) {
      setIsDataFound(false);
      // setSectionLoader(false);
    }
  };

  const getDataContentGraph = async (type = "") => {
    try {
      let requestBody = { type: type };
      const response = await postData(ENDPOINT.CONTENT_TYPE_GRAPH, requestBody);

      const hadData = response?.data?.data?.data;

   const dataLengths = Object.keys(hadData).map((item, index) => {
    const dataLength = hadData[item]?.data?.length || 0;
    const total = hadData[item]?.total || 0;
  
    return {
      property: item,
      total: total,
      dataLength: dataLength,
    };
  });
  const totalLength = dataLengths.reduce((sum, item) => sum + item.total, 0);
  setTotalLength(totalLength);

  
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
      getDataFromApi("Haematology");
    } else if (event == 2) {
      getDataFromApi("ibu");
    }
  };

  const [lineOption, setLineOption] = useState({
    chart: {
      type: "line",
      height: 800,
    },
    title: {
      text: "Registered HCP's",
    },
    xAxis: {
      categories: [],
    },
    yAxis: {
      min: 0,
      tickPixelInterval: 35,
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
      reversed:true
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
            <div className="top-header">
              {/* <div className="page-title d-flex">
                <h2>Content in activated HCP Docintel accounts</h2>
              </div> */}
            </div>
            <div className="distribute-page-reader">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
                <g clip-path="url(#clip0_301_44)">
                  {" "}
                  <path
                    d="M8.50001 13.5C8.22387 13.5 8.00001 13.2761 8.00001 13V11.5H6.50001C6.22387 11.5 6.00001 11.2761 6.00001 11C6.00001 10.7239 6.22387 10.5 6.50001 10.5H8.00001V9.00001C8.00001 8.72387 8.22387 8.50001 8.50001 8.50001C8.77615 8.50001 9.00001 8.72387 9.00001 9.00001V10.5H10.5C10.7762 10.5 11 10.7239 11 11C11 11.2761 10.7762 11.5 10.5 11.5H9.00001V13C9.00001 13.2761 8.77615 13.5 8.50001 13.5Z"
                    fill="#0066BE"
                  ></path>{" "}
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.000305177 2.00005C0.00027582 0.895463 0.895715 0 2.00031 0H15C16.1046 0 17 0.895429 17 2V15.6654L13.4225 20.9994C13.374 21.0717 13.3452 21.1554 13.339 21.2423L13.2849 22H2.00078C0.896235 22 0.000812916 21.1046 0.000783561 20.0001L0.000305177 2.00005ZM8.50001 15C10.7092 15 12.5 13.2091 12.5 11C12.5 8.79087 10.7092 7.00001 8.50001 7.00001C6.29087 7.00001 4.50001 8.79087 4.50001 11C4.50001 13.2091 6.29087 15 8.50001 15Z"
                    fill="#0066BE"
                  ></path>{" "}
                  <path
                    d="M14.4467 23.9681C14.3081 24.0368 14.1473 23.929 14.1583 23.7747L14.3392 21.2423C14.3454 21.1554 14.3741 21.0717 14.4226 20.9994L20.4074 12.0762L22.8989 13.7473L16.9141 22.6704C16.8656 22.7427 16.7991 22.8011 16.7211 22.8398L14.4467 23.9681Z"
                    fill="#0066BE"
                  ></path>{" "}
                  <path
                    d="M23.1774 13.3321L23.5886 12.7191C23.9757 12.1419 23.8251 11.3583 23.2534 10.9748L22.8381 10.6963C22.2663 10.3128 21.4842 10.4708 21.0971 11.048L20.686 11.661L23.1774 13.3321Z"
                    fill="#0066BE"
                  ></path>{" "}
                </g>{" "}
                <defs>
                  {" "}
                  <clipPath id="clip0_301_44">
                    {" "}
                    <rect width="24" height="24" fill="white"></rect>{" "}
                  </clipPath>{" "}
                </defs>{" "}
              </svg>
              <p>
                This examines which type of content get most registrations in
                total.
              </p>
            </div>
            <div className="create-change-content spc-content analytic-charts">
              <div
                className="delivery-trends space-added"
                style={{ padding: "10px" }}
              >
                <div className="tabs_content_load">
                  <Tabs
                    defaultActiveKey={activeTab.current}
                    onSelect={handleTabChange}
                  >
                    <Tab eventKey="1" title="Own Account"></Tab>
                    <Tab eventKey="2" title="IBU"></Tab>
                  </Tabs>

                  {isDataFound && (data.length > 0 || totalLength > 0) ? (
                    <>
                      <div className="high_charts mb-4">
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={lineOption}
                        />
                      </div>
                      {/*<div className="con_title">
                                Content in activated HCP Docintel accounts
                              </div>*/}

                      <DocintelAccount data={activeTab.current ? data : null} />
                    </>
                  ) : apiCallStatus ? (
                    <div className="no_found">
                      <p>No Data Found</p>
                    </div>
                  ) : null}

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
export default CanadaContentType;
