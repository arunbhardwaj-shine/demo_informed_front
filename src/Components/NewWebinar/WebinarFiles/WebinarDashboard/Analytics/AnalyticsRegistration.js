import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { postData } from "../../../../../axios/apiHelper";
import { loader } from "../../../../../loader";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { height } from "@amcharts/amcharts4/.internal/core/utils/Utils";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const AnalyticsRegistration = ({ dropdownClicked, setEventData }) => {
  const { eventIdContext, handleEventId } = useSidebar();
  const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"));
  const [eventId, setEventId] = useState(
    eventIdContext?.eventId || localStorageEvent?.eventId
  );
  const [apiStatus, setApiStatus] = useState(false);

  const [pieChartData, setPieChartData] = useState([]);
  const [data, setData] = useState([]);
  const colors = ["#f5c64a", "#fde3a1", "#ed8188", "#fac5c8", "#004A89"];
  const commonPieOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      height: 270,
    },
    title: {
      text: "Click on the double arrows to see more details",
      align: "left",
      style: {
        fontSize: "12px",
        color: "#97B6CF",
      },
    },

    exporting: {
      sourceWidth: 1600,
      sourceHeight: 1200,
      enabled: true,
      chartOptions: {
        title: {
          text: "", // Remove title from exported image
        },
      },
      filename: "Total_Registration", // Set filename for exported image
      menuItemDefinitions: {
        downloadPNG: {
          text: "Download PNG",
          onclick: function () {
            this.exportChart({
              type: "image/png",
            });
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
            "url(https://docintel.app/img/octa/e-templates/options-btn.svg)",
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
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    legend: {
      verticalAlign: "bottom",
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
            textOutline: "none",
            fontSize: "20px",
          },
          distance: -40,
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

  const [pieOptions, setPieOptions] = useState({ ...commonPieOptions });
  const [pieOptionsHcps, setPieOptionsHcps] = useState({ ...commonPieOptions });

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        loader("show");
        const body = { eventId };
        const response = await postData(
          ENDPOINT.GET_TOTAL_EMAIL_REGISTRATION_COUNT,
          body
        );
        const result = response?.data?.data;
        setData(result);
        setPieChartData(result);
        setEventData(result?.eventData);

        const newValue = [
          {
            name: "",
            colorByPoint: true,
            data: [
              {
                name: "HCP",
                y: result?.totalRegistrations?.hcpUsers || 0,
                color: "#F58289",
              },
              {
                name: "Staff",
                y: result?.totalRegistrations?.staffUsers || 0,
                color: "#FFC5C8",
              },
            ],
          },
        ];
        setPieOptions({ ...commonPieOptions, series: newValue });

        const newValueHcps = [
          {
            name: "",
            colorByPoint: true,
            data: [
              {
                name: "Internal List",
                y: result?.registeredHcpData?.internalHcps || 0,
                color: "#FAC755",
              },
              {
                name: "External List",
                y: result?.registeredHcpData?.externalHcps || 0,
                color: "#FFE3A4",
              },
            ],
          },
        ];
        setPieOptionsHcps({ ...commonPieOptions, series: newValueHcps });

        loader("hide");
      } catch (error) {
        loader("hide");
        console.error("Error fetching analytics data:", error);
      } finally {
        setApiStatus(true);
      }
    };

    fetchAnalyticsData();
  }, [eventId]);

  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

  return (
    <>
      <div className="rd-analytics-box">
        <p className="rd-box-small-title">Registration</p>
        <div className="rd-analytics-box-layout d-flex justify-content-between align-items-start">
          {!apiStatus ? (
            <Col md={3}>
              <div className="rd-analytics-top d-flex justify-content-between align-items-center">
                <h6 className="regi-title">
                  <Skeleton width={130} height={20} />
                </h6>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="count-number">
                    <Skeleton width={20} height={20} />
                  </div>
                  <Skeleton height={20} width={20} />
                </div>
              </div>
              <div className="graph-box">
                <div className="d-flex align-items-center mb-2 justify-content-between">
                  <Skeleton width={130} height={20} />
                  <Skeleton width={25} height={20} />
                </div>
                <div className="highchart-chart">
                  <Skeleton circle={true} height={200} width={200} />
                </div>
                <div className="rd-box-export d-flex align-items-center justify-content-between">
                  {/* <Skeleton width={80} height={20} />
                  <Skeleton width={80} height={20} /> */}
                  <Skeleton width={20} height={20} />
                </div>
              </div>
            </Col>
          ) : (
            <Col md={3}>
              <div className="rd-analytics-top d-flex justify-content-between align-items-center">
                <h6 className="regi-title">Total Registrations</h6>
                <div className="d-flex">
                  <div className="count-number">
                    {pieChartData?.totalRegistrations?.totalUsers}
                  </div>
                  <img src={path_image + "crm.svg"} alt="CRM" className="CRM" />
                </div>
              </div>
              <div className="graph-box">
                {data?.totalRegistrations?.hcpUsers ||
                data?.totalRegistrations?.staffUsers ? (
                  <>
                    <div className="highchart-chart">
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={pieOptions}
                      />
                    </div>
                    <div className="rd-box-export">
                      <img
                        src={path_image + "arrow-export.svg"}
                        alt=""
                        onClick={() => dropdownClicked("totalRegistrations")}
                      />
                    </div>
                  </>
                ) : (
                  //      <div className="no_found">
                  //      <img src={path_image + "default-bar-chart.png"} alt="" />

                  //  </div>
                  //   apiStatus && (
                  <div className="no_found">
                    <p>No Data Found</p>
                  </div>
                  //   )
                )}
              </div>
            </Col>
          )}

          {!apiStatus ? (
            <>
              <Col md={9}>
                <div className="rd-analytics-top d-flex justify-content-between align-items-center">
                  <h6 className="regi-hcp">
                    <Skeleton width={130} height={20} />
                  </h6>
                  <div className="d-flex align-items-center">
                    <div className="count-number">
                      <Skeleton width={20} height={20} />
                    </div>
                    <Skeleton  height={20} width={20} />
                  </div>
                </div>
                <div className="d-flex align-items-center mb-0 justify-content-between">
                 
                </div>
                <div className="graph-box d-flex justify-content-between">
                  
                  <div className="highchart-chart left-side">
                    <div className="d-flex align-items-center mb-2 justify-content-between" style={{ paddingRight: '10px' }}>
                      <Skeleton width={130} height={20} />
                      <Skeleton width={25} height={20} />
                    </div>
                    {/* <Skeleton width={130} height={20} /> */}
                    <Skeleton circle={true} height={200} width={200} />
                    <div className="rd-box-export d-flex align-items-center justify-content-between">
                      {/* <Skeleton width={80} height={20} />
                      <Skeleton width={80} height={20} /> */}
                      <Skeleton width={20} height={20} />
                    </div>
                  </div>

                  <div className="highchart-chart right-side">
                    <div className="d-flex justify-content-between">
                      <Skeleton width={130} height={20} />
                      <Skeleton width={20} height={20} />
                    </div>
                    <Skeleton width="100%" height={200} />
                  </div>
                </div>
              </Col>
            </>
          ) : (
            <Col md={9}>
              <div className="rd-analytics-top d-flex justify-content-between align-items-center">
                <h6 className="regi-hcp">Registered HCPs</h6>
                <div className="d-flex">
                  <div className="count-number">
                    {data?.registeredHcpData?.totalHcps }
                  </div>
                  <img src={path_image + "irt.svg"} alt="" className="doctor" />
                </div>
              </div>
              <div className="graph-box d-flex justify-content-between">
                <div className="highchart-chart left-side">
                  {data?.registeredHcpData?.internalHcps ||
                   data?.registeredHcpData?.externalHcps ? (
                    <>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={pieOptionsHcps}
                      />
                      <div className="rd-box-export">
                        <img
                          src={path_image + "arrow-export.svg"}
                          alt=""
                          onClick={() => dropdownClicked("registeredHcps")}
                        />
                      </div>
                    </>
                  ) : (
                    //      <div className="no_found">
                    //      <img src={path_image + "default-bar-chart.png"} alt="" />

                    <div className="no_found">
                      <p>No Data Found</p>
                    </div>
                  )}
                </div>
                <div className="highchart-chart right-side">
                  {data?.registeredOverTime?.seriesData?.length ? (
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={{
                        chart: {
                          plotBackgroundColor: null,
                          plotBorderWidth: null,
                          plotShadow: false,
                          type: "line",
                          //maxWidth: 500,
                          //size: '100%',
                          height: 248,
                        },

                        title: {
                          text: "Registration Over Time",
                          style: {
                            fontWeight:"500",
                            color: "#70899E",
                            fontSize: "14px",
                          },
                        },
                        xAxis: {
                          categories:
                            pieChartData?.registeredOverTime?.categoriesData,
                          labels: {
                            rotation: -45,
                            style: {
                              fontSize: "12px",
                              color: "#555555",
                            },
                          },
                          lineColor: "rgba(151, 182, 207, 0.30)",
                          lineWidth: 2,
                          pointInterval: 5,
                        },
                        yAxis: {
                          title: {
                            text: "",
                          },
                          lineColor: "rgba(151, 182, 207, 0.30)",
                          lineWidth: 2,
                          endOnTick: false, // Ensure yAxis ends at the last tick
                        },
                        plotOptions: {
                          series: {
                            marker: {
                              symbol: "square",
                              symbolWidth: 6,
                              symbolHeight: 6,
                              style:{
                                width: "6px",
                                height: "6px",
                              },
                            },
                            dataLabels: {
                              enabled: true,
                              format: "{point.y}",
                              style: {
                                fontSize: "10px",
                                color: "#555555",
                              },
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
                            fontWeight: "normal",
                            color: "#555555",
                            fontSize: "12px",
                          },
                          itemHoverStyle: {
                            color: "#000000",
                          },
                          itemHiddenStyle: {
                            color: "#C0C0C0",
                          },
                          symbolWidth: 10,
                          symbolHeight: 10,
                          itemDistance: 20,
                          lineWidth: 0,
                          itemMarginBottom: -23, // Add itemMarginBottom to provide space between legend items
                        },

                        tooltip: {
                          formatter: function () {
                            return (
                              "<b>" +
                              this.y +
                              " " +
                              this.series.name +
                              " | " +
                              this.point.category +
                              "</b>"
                            );
                          },
                        },
                        series: [
                          {
                            name: "Emails",
                            data: pieChartData?.registeredOverTime?.seriesData,
                            color: "#874e9e",
                            marker: {
                              symbol: "square",
                            },
                          },
                        ],

                        exporting: {
                          sourceWidth: 1600,
                          sourceHeight: 1200,
                          enabled: true,
                          chartOptions: {
                            title: {
                              text: "", // Remove title from exported image
                            },
                          },
                          filename: "AVG_Spend_Time", // Set filename for exported image
                          menuItemDefinitions: {
                            downloadPNG: {
                              text: "Download PNG",
                              onclick: function () {
                                this.exportChart({
                                  type: "image/png",
                                });
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
                                "url(https://docintel.app/img/octa/e-templates/options-btn.svg)",
                              menuItems: [
                                "downloadPNG",
                                "downloadJPEG",
                                "downloadPDF",
                                "downloadSVG",
                              ],
                            },
                          },
                        },
                      }}
                      style={{ width: "100%" }}
                    />
                  ) : (
                    apiStatus && (
                      <div className="no_found">
                        <p>No Data Found</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </Col>
          )}
        </div>
      </div>
    </>
  );
};

export default AnalyticsRegistration;
