import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Dropdown, Row, Tab, Tabs } from "react-bootstrap";
import { loader } from "../../../../../loader";
import { postData } from "../../../../../axios/apiHelper";
import { toast } from "react-toastify";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
import Highcharts from "highcharts";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import HighchartsReact from "highcharts-react-official";
import drilldown from "highcharts/modules/drilldown.js";

exporting(Highcharts);
exportData(Highcharts);
drilldown(Highcharts);

const AnalyticsRegions = () => {
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const { eventIdContext, handleEventId } = useSidebar();
  const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"));
  const [eventId, setEventId] = useState(eventIdContext || localStorageEvent);
  const [regionData, setRegionData] = useState(null);
  const [activeRegion, setActiveRegion] = useState(null);
  const [isPieChart, setIsPieChart] = useState(true);
  const [flag, setFlag] = useState(1);
  const pieRef = useRef(null);
  const barRef = useRef(null);

  const commonPieOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      height: 450,
    },
    title: null,

    exporting: {
      enabled: false,
      menuItemDefinitions: {
        downloadPNG: {
          text: "Download PNG",
          onclick: function () {
            this.exportChart();
          },
        },
        downloadJPEG: {
          text: "Download JPEG",
          onclick: function () {
            this.exportChart({
              type: "image/jpeg",
            });
          },
        },
        downloadPDF: {
          text: "Download PDF",
          onclick: function () {
            this.exportChart({
              type: "application/pdf",
            });
          },
        },
        downloadSVG: {
          text: "Download SVG",
          onclick: function () {
            this.exportChart({
              type: "image/svg+xml",
            });
          },
        },
      },
      buttons: {
        contextButton: {
          symbol:
            "url(https://cdn3.iconfinder.com/data/icons/slicons-line-essentials/24/more_vertical-512.png)",
          menuItems: [
            "downloadPNG",
            "downloadJPEG",
            "downloadPDF",
            "downloadSVG",
          ],
        },
      },
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.y}</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "",
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        size: "90%",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y}",
          style: {
            fontWeight: "bold",
            color: "white",
            textOutline: "none",
            fontSize: "24px",
          },
          distance: 30,
          connectorPadding: 0,
        },
        animation: {
          duration: 1000,
        },
        enableMouseTracking: true,
        showInLegend: true,
        borderWidth: 0,
      },
    },

    series: [],
  };

  useEffect(() => {
    loader("show");
    getEventQuestion();
  }, [flag]);

  const getEventQuestion = async () => {
    try {
      const result = await postData(ENDPOINT.GET_REGION_STATS, {
        companyId: eventId?.companyId,
        eventId: eventId?.eventId,
      });

      if (result?.data?.data?.length === 0) {
        throw new Error("Please create the polls first");
      }

      setRegionData(result?.data?.data);
      setActiveRegion(Object.keys(result?.data?.data)[0]);
      loader("hide");
    } catch (err) {
      loader("hide");
      console.error("--err", err.message);
      toast.error(err.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleTabChange = (regionName) => {
    setIsPieChart(true);

    setActiveRegion(regionName);
  };

  const toggleChartType = () => {
    setIsPieChart(!isPieChart);
  };
  const renderTabsAndCharts = (region, regionData) => {
    const countries = regionData.map((item) => item.country);
    const registeredUsers = regionData.map((item) => item.registeredUsers);
    const attendedUsers = regionData.map((item) => item.attendedUsers);

    return (
      // <Tab key={region} eventKey={region.toLowerCase()} title={region}>
      <HighchartsReact
        ref={barRef}
        key={`bar-${activeRegion}`}
        highcharts={Highcharts}
        options={{
          chart: {
            marginTop: 50,
            type: "bar",
            // width:"100%",
            events: {
              load: function () {
                let categoryHeight = 50;
                this.update({
                  chart: {
                    // width:'800',
                    height:
                      categoryHeight * countries.length +
                      (this.chartHeight - this.plotHeight),
                  },
                });
              },
            },
          },
          exporting: {
            enabled: false,
          },
          plotOptions: {
            series: {
              groupPadding: 0.1,
              pointWidth: 18, // Adjust the width of the bars
              dataLabels: {
                allowOverlap: false,
                distance: 90,
                enabled: true,
                inside: false,
                // overflow: "justify",
                // crop: true,
                // shape: "callout",
                size: "100%",
                style: {
                  fontWeight: "normal",
                  textShadow: "none",
                },
              },
            },
          },
          title: {
            text: "",
          },
          xAxis: {
            categories: countries,
            labels: {
              rotation: 0,
              style: {
                fontSize: "12px",
              },
            },
          },
          credits: {
            enabled: false,
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
                color: "gray",
              },
            },
          },
          legend: {
            align: "center",
            verticalAlign: "bottom",
            layout: "horizontal",
            x: 0,
            y: 0,
            itemStyle: {
              fontWeight: "500",
              color: "#70899E",
              fontSize: "12px",
            },
            symbolWidth: 10,
            symbolHeight: 10,
          },

          // plotOptions: {
          //   bar: {
          //     pointWidth: 30, // Adjust the width of the bars
          //     dataLabels: {
          //       enabled: true,
          //     },
          //   },
          // },
          series: [
            {
              name: "Registered",
              data: registeredUsers,
              color: "#f5c64a",
            },
            {
              name: "Attended",
              data: attendedUsers,
              color: "#56cabc",
            },
          ],
        }}
      />

      // </Tab>
    );
    // });
  };
  const handleDownload = (format, ref) => {
    // Accessing Highcharts chart object using ref
    let chart = ref.current && ref.current.chart;
    let defaultName = "region_stats";

    if (chart) {
      switch (format) {
        case "PNG":
          chart.exportChart({
            type: "image/png",
            filename: defaultName + ".png",
          });
          break;
        case "JPEG":
          chart.exportChart({
            type: "image/jpeg",
            filename: defaultName + ".jpeg",
          });
          break;
        case "PDF":
          chart.exportChart({
            type: "application/pdf",
            filename: defaultName + ".pdf",
          });
          break;
        case "SVG":
          chart.exportChart({
            type: "image/svg+xml",
            filename: defaultName + ".svg",
          });
          break;
        default:
          break;
      }
    }
  };

  return (
    <Col className="right-sidebar">
      <div className="custom-container">
        <Row>
          <div className="rd-full-explain analytics-region">
            <div className="rd-training-block">
              <div className="d-flex align-items-center justify-content-between"></div>
              <div className="country_tabs">
                <Tabs
                  defaultActiveKey="Other"
                  className=""
                  fill
                  onSelect={handleTabChange}
                >
                  {regionData &&
                    Object.keys(regionData).map((regionName) => (
                      <Tab
                        key={regionName}
                        eventKey={regionName}
                        title={regionName.toUpperCase()}
                      >
                        <div className="tabs-data">
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="rd-training-block-left">
                              <h4>Total registered & Attended HCPs</h4>
                            </div>
                            <div className="rd-training-block-right d-flex">
                              <div className="switch6">
                                <label className="switch6-light">
                                  <input
                                    type="checkbox"
                                    onChange={toggleChartType}
                                    checked={isPieChart} // Invert the checked value to show the current state
                                  />
                                  <span>
                                    <span>
                                      <img
                                        src={path_image + "bar-graph-img.png"}
                                        style={{ transform: "rotate(90deg)" }}
                                      />
                                    </span>
                                    <span>
                                      <img src={path_image + "pie-img.png"} />
                                    </span>
                                  </span>
                                  <a className="btn"></a>
                                </label>
                              </div>
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="success"
                                  id="dropdown-basic"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="6"
                                    height="24"
                                    viewBox="0 0 6 24"
                                    fill="none"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3ZM6 12C6 13.6569 4.65685 15 3 15C1.34315 15 0 13.6569 0 12C0 10.3431 1.34315 9 3 9C4.65685 9 6 10.3431 6 12ZM3 24C4.65685 24 6 22.6569 6 21C6 19.3431 4.65685 18 3 18C1.34315 18 0 19.3431 0 21C0 22.6569 1.34315 24 3 24Z"
                                      fill="#0066BE"
                                    />
                                  </svg>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    onClick={() =>
                                      handleDownload(
                                        "PNG",
                                        isPieChart ? pieRef : barRef
                                      )
                                    }
                                  >
                                    Download PNG
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() =>
                                      handleDownload(
                                        "JPEG",
                                        isPieChart ? pieRef : barRef
                                      )
                                    }
                                  >
                                    Download JPEG
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() =>
                                      handleDownload(
                                        "PDF",
                                        isPieChart ? pieRef : barRef
                                      )
                                    }
                                  >
                                    Download PDF
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() =>
                                      handleDownload(
                                        "SVG",
                                        isPieChart ? pieRef : barRef
                                      )
                                    }
                                  >
                                    Download SVG
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                          <div className="graph-view">
                            <div className="graph-view-smaller">
                              {activeRegion && (
                                <>
                                  {isPieChart ? (
                                    <HighchartsReact
                                      key={`pie-${activeRegion}`}
                                      ref={pieRef}
                                      highcharts={Highcharts}
                                      options={{
                                        ...commonPieOptions,
                                        series: [
                                          {
                                            name: "",
                                            colorByPoint: true,
                                            data: regionData[activeRegion]
                                              .seriesData,
                                          },
                                        ],

                                        title: {
                                          text: "",
                                        },
                                        drilldown: {
                                          series:
                                            regionData[activeRegion]
                                              .drilldownData,
                                          colors:
                                            regionData[activeRegion].colors,
                                        },

                                        legend: {
                                          align: "center",
                                          verticalAlign: "bottom",
                                          layout: "horizontal",
                                          x: 0,
                                          y: 0,
                                          itemStyle: {
                                            fontWeight: "500",
                                            color: "#70899E",
                                            fontSize: "12px",
                                          },
                                          symbolWidth: 10,
                                          symbolHeight: 10,
                                        },
                                        plotOptions: {
                                          pie: {
                                            size: "100%",
                                            dataLabels: {
                                              enabled: true,
                                              format: "{point.y}",
                                              style: {
                                                fontWeight: "500",
                                                color: "white",
                                                textOutline: "none", // Removed underline
                                                fontSize: "20px",
                                              },
                                              distance: -70,
                                            },
                                            animation: {
                                              duration: 1000,
                                            },
                                            enableMouseTracking: true,
                                            showInLegend: true,
                                            borderWidth: 0,
                                          },
                                        },
                                      }}
                                    />
                                  ) : (
                                    <>
                                      <HighchartsReact
                                        key={`bar-region-${activeRegion}`}
                                        highcharts={Highcharts}
                                        options={{
                                          chart: {
                                            type: "bar",
                                            height: 310,
                                            options3d: {
                                              enabled: true,
                                              alpha: 10,
                                              beta: 25,
                                              depth: 70,
                                            },
                                          },
                                          title: {
                                            text: "",
                                          },
                                          exporting: {
                                            enabled: false,
                                          },
                                          xAxis: {
                                            // This section defines categories (X-axis labels)
                                            categories:
                                              regionData[
                                                activeRegion
                                              ]?.seriesData?.map(
                                                (data) => data.name
                                              ) || [],
                                            labels: {
                                              rotation: 0,
                                              style: {
                                                fontSize: "12px",
                                                fontFamily: "Arial, sans-serif",
                                              },
                                            },
                                          },
                                          credits: {
                                            enabled: false,
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
                                                color: "gray",
                                              },
                                            },
                                          },
                                          legend: {
                                            // This section defines legends
                                            align: "center",
                                            verticalAlign: "bottom",
                                            layout: "horizontal",
                                            x: 0,
                                            y: 0,
                                            itemStyle: {
                                              fontWeight: "500",
                                              color: "#70899E",
                                              fontSize: "12px",
                                            },
                                            symbolWidth: 10,
                                            symbolHeight: 10,
                                          },
                                          tooltip: {},
                                          plotOptions: {
                                            series: {
                                              groupPadding: 0.1,
                                              pointWidth: 35,
                                              dataLabels: {
                                                allowOverlap: false,
                                                distance: 90,
                                                enabled: true,
                                                inside: false,
                                                size: "100%",
                                                style: {
                                                  fontWeight: "normal",
                                                  textShadow: "none",
                                                },
                                              },
                                            },
                                          },
                                          series:
                                            regionData[
                                              activeRegion
                                            ]?.seriesData?.map(
                                              (data, index) => {
                                                // This section defines series data and assigns colors based on index
                                                return {
                                                  name: data.name,
                                                  data: [data.y],
                                                  color:data.color
                                                };
                                              }
                                            ) || [],
                                        }}
                                      />

                                      {renderTabsAndCharts(
                                        activeRegion,
                                        regionData[activeRegion].barChartData
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </Tab>
                    ))}
                </Tabs>
              </div>
            </div>
          </div>
        </Row>
      </div>
    </Col>
  );
};

export default AnalyticsRegions;
