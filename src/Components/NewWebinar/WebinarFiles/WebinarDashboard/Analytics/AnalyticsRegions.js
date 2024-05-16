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
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
exporting(Highcharts);
exportData(Highcharts);
drilldown(Highcharts);

const AnalyticsRegions = () => {
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const { eventIdContext, handleEventId } = useSidebar();
  const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"));
  const [eventId, setEventId] = useState(eventIdContext || localStorageEvent);
  const [regionData, setRegionData] = useState(null);
  const [activeRegion, setActiveRegion] = useState("African Group 1");
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
      sourceWidth: 1600,
      sourceHeight: 1200,
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
    loader("show");

    setTimeout(() => {
      setIsPieChart(!isPieChart);
      loader("hide");
    }, 500);
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
            sourceWidth: 1600,
            sourceHeight: 1200,
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
                  color: "#0066BE",
                  fontWeight:"500",
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
                fontWeight: "500",
                color: "gray",
              },
            },
            allowDecimals: false,

          },
          legend: {
            align: "center",
            verticalAlign: "bottom",
            layout: "horizontal",
            x: 0,
            y: 0,
            itemStyle: {
              fontWeight: "400",
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
                  defaultActiveKey={activeRegion}
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
                            <div className="rd-training-block-right d-flex align-items-center">
                              <div className="switch6">
                                <label className="switch6-light">
                                  <input
                                    type="checkbox"
                                    onChange={toggleChartType}
                                    checked={isPieChart} // Invert the checked value to show the current state
                                  />
                                  <span>
                                    <span>
                                      {/* <img
                                        src={path_image + "bar-graph-img.png"}
                                        style={{ transform: "rotate(90deg)" }}
                                      /> */}
                                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="24" width="6" height="24" rx="1" transform="rotate(90 24 0)" fill="#0066BE"/>
                                        <rect x="13.2617" y="9.14258" width="5.71429" height="13.2632" rx="1" transform="rotate(90 13.2617 9.14258)" fill="#8A4E9C"/>
                                        <rect x="19" y="18" width="6" height="19" rx="1" transform="rotate(90 19 18)" fill="#39CABC"/>
                                      </svg>
                                    </span>
                                    <span>
                                      {/* <img src={path_image + "pie-img.png"} /> */}
                                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_5227_2027)">
                                          <path d="M11.2048 1.54687C11.2048 1.27073 10.9808 1.04571 10.7049 1.05803C9.10037 1.12967 7.52788 1.54559 6.095 2.27982C4.51361 3.09016 3.14762 4.26499 2.10978 5.70733C1.07194 7.14967 0.39202 8.81816 0.126141 10.5751C-0.139738 12.332 0.0160486 14.127 0.580642 15.8118C1.14524 17.4966 2.10245 19.023 3.37326 20.265C4.64407 21.507 6.19204 22.4289 7.8894 22.9547C9.58676 23.4805 11.3848 23.595 13.1352 23.2889C14.7211 23.0115 16.2267 22.3959 17.5505 21.4863C17.7781 21.3299 17.8212 21.0154 17.6548 20.795L11.3057 12.3854C11.2402 12.2986 11.2048 12.1928 11.2048 12.0841V1.54687Z" fill="#39CABC" />
                                          <path d="M23.5106 12.7847C23.7868 12.7847 24.0118 13.0087 23.9995 13.2846C23.9293 14.8565 23.5287 16.398 22.8216 17.8078C22.1141 19.2186 21.5564 19.844 20.4209 20.7231C20.2107 20.8858 19.9098 20.8496 19.7397 20.6452L13.8814 13.6045C13.6103 13.2788 13.842 12.7847 14.2657 12.7847H23.5106Z" fill="#0066BE" />
                                          <path d="M22.9765 11.1825C23.2526 11.1825 23.4776 10.9586 23.4653 10.6827C23.4072 9.38195 23.1228 8.09995 22.6236 6.89467C22.0605 5.53524 21.2351 4.30004 20.1947 3.25958C19.1542 2.21912 17.919 1.39378 16.5596 0.830691C15.3595 0.333593 14.4241 0.057651 13.209 -0.000201631C12.9332 -0.0133342 12.709 0.212139 12.709 0.488281V10.6825C12.709 10.9587 12.9328 11.1825 13.209 11.1825H22.9765Z" fill="#8A4E9C" />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_5227_2027">
                                            <rect width="24" height="24" fill="white" />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </span>
                                  </span>
                                  <a className="btn"></a>
                                </label>
                              </div>
                              <Dropdown>
                                <Dropdown.Toggle
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
                                {regionData[activeRegion].seriesData?.some(item=>item.y!=0)?(<>
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
                                          activeAxisLabelStyle: {
                                            textDecoration: 'none',
                                            color: "#fff",
                                
                                        },
                                        activeDataLabelStyle: {
                                            textDecoration: 'none',
                                            color: "#fff",
                                
                                        },
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
                                            sourceWidth: 1600,
                                            sourceHeight: 1200,
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
                                            allowDecimals: false,

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
                                                  color: "#0066BE",
                                                  fontWeight: "500",
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
                                                  color: data.color,
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
                                  )}</>):<div className="no_found"><p>No Data Found</p></div>}
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
