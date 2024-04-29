import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Select from "react-select";
import { postData } from "../../../../../axios/apiHelper";
import { loader } from "../../../../../loader";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import domtoimage from "dom-to-image";

const AnalyticsEmailView = () => {
  const colorArray = [
    "#0E9B8E",
    "#00003C",
    "#FFBE2C",
    "#FFBE2C",
    "#F58289",
    "#D61975",
    "#0066BE",
  ];
  const commonPieOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      height: 400,
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
            fontWeight: "400",
            color: "black",
            textOutline: "none",
            fontSize: "15px",
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
  
  const [pieOptionsRegion, setPieOptionsRegion] = useState({
    ...commonPieOptions,
  });
  const regionPieRef = useRef(null);

  const [optionsHighchart, setOptionsHighhart] = useState({
    chart: {
      type: "bar",
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
    xAxis: {
      categories: [],
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    exporting: {
      enabled: true,
    },
    tooltip: {
      formatter: function () {
        return (
          "<span ><div className=" +
          this.series.name +
          ">" +
          // <span style="font-weight: bold">'
          this.x +
          " <strong >" +
          ":" +
          Highcharts.numberFormat(this.y, 0) +
          "</strong></div></span>"
        );
      },
    },
    plotOptions: {
      series: {
        dataLabels: {
          allowOverlap: false,
          distance: 40,
          enabled: false,
          inside: false,
          overflow: "justify",
          crop: true,
          shape: "callout",
          size: "100%",
          // backgroundColor: "rgba(255,255,255)",
          // borderColor: "rgba(0,0,0,0.9)",
          // borderColor:this.point.color,
          // color: "rgba(0,0,0)",
          // borderWidth: 0.5,
          // borderRadius: 5,
          style: {
            // fontSize: "13px",
            fontWeight: "normal",
            textShadow: "none",
          },
          formatter: function () {
            return (
              "<span ><div className=" +
              this.series.name +
              // '><span style="font-weight: 400">' +
              this.x +
              " <strong >" +
              Highcharts.numberFormat(this.y, 0) +
              "</strong></div></span>"
            );
          },
        },
      },
    },

    series: [
      {
        name: "Email campaign",
        data: [],
      },
    ],
  });
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [viewEmailData, setviewEmailData] = useState(null);
  const { eventIdContext, handleEventId } = useSidebar();
  const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"));
  const [campaignId, setCampaignId] = useState("");
  const [ctrName, setCTRName] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [dropdownData, setDropdownData] = useState(null);
  const [isPieChart, setIsPieChart] = useState(true);

  const [eventId, setEventId] = useState(
    eventIdContext?.eventId
      ? eventIdContext?.eventId
      : localStorageEvent?.eventId
  );
  useEffect(() => {
    if (regionPieRef?.current) {
      regionPieRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [dropdownData]);

  useEffect(() => {
    const getDropdownData = async () => {
      loader("show");
      const body = {
        eventId: eventId,
      };
      const response = await postData(ENDPOINT.GET_DROPDOWN_DATA, body);
      setOptions(response?.data?.data);
      handleSelectChange(response?.data?.data[0]);
    };
    getDropdownData();
  }, []);

  const getReaderData = async (
    type = "",
    dynamic_name = "",
    popup_name = "",
    loadAll = 1
  ) => {
    try {
      loader("show");
      const body = {
        eventId: eventId,
        autoId: campaignId?.auto_id,
        campaign_id: campaignId?.id || 0,
        type: type,
        name: dynamic_name,
        loadAll: loadAll,
      };
      const response = await postData(
        ENDPOINT.ANALYTIC_EMAIL_LIST_DROPDOWN,
        body
      );

      const newValueRegion = [
        {
          name: "",
          colorByPoint: true,
          data: response?.data?.data?.regionSeriesData || [],
          drilldown: true, // enable drilldown for this series
        },
      ];

      setPieOptionsRegion({
        ...commonPieOptions,
        series: newValueRegion,
        drilldown: {
          series: response?.data?.data?.drilldownData, // set the drilldown data
        },
      });

      setDropdownData(response?.data?.data);
      //   setviewEmailModal(false);
      //   setFunctionParameter({
      //     type, dynamic_name, popup_name, loadAll
      //   })
      //   let temporaryUsers = [...readerDetailsData, ...response?.data?.data];
      //   setReaderDetailsData(temporaryUsers);
      //   setDetailPopupName(popup_name)
      //   setReaderDetailsPopupStatus(true);
      loader("hide");
    } catch (err) {
      loader("hide");
      console.log("--err", err);
    }
  };

  const handleSelectChange = (selectedOption) => {
    setviewEmailData(null);
    setSelectedOption(selectedOption);
    if (selectedOption) {
      getEmailCount(selectedOption.id, selectedOption.status);
    }
  };

  const getEmailCount = async (id, status) => {
    loader("show");

    try {
      const body = {
        eventId: eventId,
        id,
        status,
      };
      const response = await postData(ENDPOINT.GET_EMAIL_COUNT, body);

      await showViewEmailModal(response?.data?.data[0]);
    } catch (error) {
      console.error("Error fetching email count:", error);
    }
  };

  const showViewEmailModal = async (data) => {
    let id = data?.auto_id;
    if (typeof data !== "undefined") {
      // let valueupdate =JSON.parse(JSON.stringify(options)) ;
      let valueupdate = { ...optionsHighchart };
      valueupdate.xAxis.categories = ["Emails sent", "Emails opened"];
      valueupdate.series[0].data = [
        { y: data?.email_sent, color: "#8a4e9c" },
        { y: data?.email_read, color: "#ffbe2c" },
      ];

      Object.keys(data?.labels_value)?.map((item, index) => {
        valueupdate?.xAxis?.categories?.push(data?.labels[item]);

        let obj = {
          y: data?.labels_value[item],
          color: colorArray?.[index],
        };
        valueupdate.series[0].data.push(obj);
      });

      setCTRName(data?.labels_value);
      setOptionsHighhart(valueupdate);
      setviewEmailData(data);
    }
    setCampaignId(data);
    loader("hide");
  };
  const handleParent = async () => {
    try {
      const buttonsContainer = document.querySelector(
        ".rd-training-block-right"
      );
      buttonsContainer.classList.add("hide");

      loader("show");
      const element = document.getElementById("chart-description");

      const dataUrl = await domtoimage.toPng(element, { cacheBust: true });
      let fileName = (
        viewEmailData?.campaign
          ? viewEmailData?.campaign
          : viewEmailData?.subject
      ).replaceAll(" ", "_");
      const link = document.createElement("a");
      // link.download = `${Math.random()}.png`;
      link.download = `${fileName}.png`;
      link.href = dataUrl;
      link.click();

      setTimeout(() => {
        buttonsContainer.classList.remove("hide");
      }, 100);

      loader("hide");
    } catch (err) {
      loader("hide");
      console.log(err);
    }
  };

  const toggleChartType = () => {
    setIsPieChart(!isPieChart);
  };
  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="top-header">
              <div className="page-title d-flex flex-column align-items-start">
                <h2>Emails</h2>
              </div>
            </div>
            <div className="webinar-emails-details">
              <p>Select the email to see the stats:</p>
              <Form>
                <Select
                  options={options}
                  className="dropdown-basic-button split-button-dropup mr-2 btn-bigger"
                  onChange={handleSelectChange}
                  value={selectedOption}
                />
              </Form>
            </div>
            {viewEmailData && (
              <>
                {" "}
                <div
                  className="rd-full-explain webinar-emails-statss">
                  <div className="rd-training-block">
                    <div className="d-flex align-items-start justify-content-between">
                      <div className="rd-training-block-left">
                        <h5>
                          {viewEmailData?.campaign
                            ? viewEmailData?.campaign
                            : viewEmailData?.subject}{" "}
                        </h5>
                        <p className="email-date">
                          {viewEmailData?.created_at}
                        </p>
                      </div>
                      <div className="rd-training-block-right d-flex clear-search.top-right-action">
                        <Button
                          className="print"
                          title="Print Stats"
                          onClick={handleParent}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M2 4C2 2.89543 2.89543 2 4 2H7.41667C7.96895 2 8.41667 1.55228 8.41667 1C8.41667 0.447715 7.96895 0 7.41667 0H4C1.79086 0 0 1.79086 0 4V7.41667C0 7.96895 0.447715 8.41667 1 8.41667C1.55228 8.41667 2 7.96895 2 7.41667V4Z"
                              fill="#0066BE"
                            ></path>
                            <path
                              d="M16.5833 0C16.031 0 15.5833 0.447715 15.5833 1C15.5833 1.55228 16.031 2 16.5833 2H20C21.1046 2 22 2.89543 22 4V7.41667C22 7.96895 22.4477 8.41667 23 8.41667C23.5523 8.41667 24 7.96895 24 7.41667V4C24 1.79086 22.2091 0 20 0H16.5833Z"
                              fill="#0066BE"
                            ></path>
                            <path
                              d="M2 16.5833C2 16.031 1.55228 15.5833 1 15.5833C0.447715 15.5833 0 16.031 0 16.5833V20C0 22.2091 1.79086 24 4 24H8.33333C8.88562 24 9.33333 23.5523 9.33333 23C9.33333 22.4477 8.88562 22 8.33333 22H4C2.89543 22 2 21.1046 2 20V16.5833Z"
                              fill="#0066BE"
                            ></path>
                            <path
                              d="M24 16.5833C24 16.031 23.5523 15.5833 23 15.5833C22.4477 15.5833 22 16.031 22 16.5833V20C22 21.1046 21.1046 22 20 22H16.5833C16.031 22 15.5833 22.4477 15.5833 23C15.5833 23.5523 16.031 24 16.5833 24H20C22.2091 24 24 22.2091 24 20V16.5833Z"
                              fill="#0066BE"
                            ></path>
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M9 12.5004C9 10.8449 10.344 9.5 11.9996 9.5C13.6551 9.5 15 10.8449 15 12.5004C15 14.156 13.6551 15.5 11.9996 15.5C10.344 15.5 9 14.156 9 12.5004ZM13.7991 12.5004C13.7991 11.5073 12.9927 10.7 11.9996 10.7C11.0064 10.7 10.2 11.5073 10.2 12.5004C10.2 13.4936 11.0064 14.3 11.9996 14.3C12.9927 14.3 13.7991 13.4936 13.7991 12.5004Z"
                              fill="#0066BE"
                            ></path>
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M16.5963 8.3H18.4615C18.8952 8.3 19.3118 8.46771 19.6194 8.7676C19.927 9.06757 20.1 9.47489 20.1 9.9V16.5C20.1 17.3862 19.3642 18.1 18.4615 18.1H5.53846C4.63579 18.1 3.9 17.3862 3.9 16.5V9.9C3.9 9.47489 4.07298 9.06757 4.38065 8.7676C4.68823 8.46771 5.10478 8.3 5.53846 8.3H7.4037C7.47384 8.3 7.53879 8.26556 7.57717 8.2097L8.67004 6.61137C8.97401 6.16652 9.48587 5.9 10.0326 5.9H13.9674C14.5141 5.9 15.026 6.1665 15.33 6.61137L16.4228 8.20961C16.4611 8.26552 16.5261 8.3 16.5963 8.3ZM9.85906 7.3904L8.76624 8.98866C8.46169 9.43342 7.94989 9.7 7.4037 9.7H5.53846C5.48265 9.7 5.42956 9.72164 5.39042 9.7592C5.35199 9.79727 5.33077 9.84786 5.33077 9.9V16.5C5.33077 16.608 5.42144 16.7 5.53846 16.7H18.4615C18.5786 16.7 18.6692 16.608 18.6692 16.5V9.9C18.6692 9.84787 18.648 9.79729 18.6096 9.75923C18.5705 9.72165 18.5174 9.7 18.4615 9.7H16.5963C16.0501 9.7 15.5383 9.43347 15.2338 8.98871L14.1409 7.3904C14.1026 7.33449 14.0376 7.3 13.9674 7.3H10.0326C9.96249 7.3 9.89744 7.33457 9.85906 7.3904Z"
                              fill="#0066BE"
                            ></path>
                          </svg>
                        </Button>
                      </div>
                    </div>
                    <div className="analytics_email_stats">
                      <div className="d-flex align-items-start email_stats_gap flex-wrap">
                        <div className="email-stats-send">
                          <div className="email-box">
                            <p>Emails send</p>
                            <div className="email_stats_list d-flex align-items-end justify-content-between">
                              <div className="d-flex align-items-center">
                                <img
                                  src={path_image + "mailes_send.svg"}
                                  alt="Export"
                                />{" "}
                                <p>{viewEmailData?.email_sent}</p>
                              </div>
                              <div
                                className="rd-box-export"
                                onClick={() => {
                                  getReaderData("sent", "", "Email sent");
                                }}
                              >
                                <img
                                  src={path_image + "arrow-export.svg"}
                                  alt="Export"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="email-stats-send">
                          <div className="email-box opened">
                            <p>Emails opened</p>
                            <div className="email_stats_list d-flex align-items-end justify-content-between">
                              <div className="d-flex align-items-center">
                                <img
                                  src={path_image + "mail-opened-icon.svg"}
                                  alt="Export"
                                />{" "}
                                <p>
                                  {viewEmailData?.read_percentage &&
                                  viewEmailData?.read_percentage != "0.00%"
                                    ? viewEmailData?.read_percentage
                                    : "0%"}
                                </p>
                              </div>
                              <div
                                className="rd-box-export"
                                onClick={() => {
                                  getReaderData("open", "", "Email open");
                                }}
                              >
                                <img
                                  src={path_image + "arrow-export.svg"}
                                  alt="Export"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="email-stats-details">
                          <div className="email-box d-flex">
                            {Object.keys(ctrName)?.length > 0 ? (
                              Object.keys(ctrName)?.map((item, index) => (
                                <Col className="video-click ">
                                  <p>{viewEmailData?.labels[item]}</p>
                                  <div className="email_stats_list d-flex align-items-end justify-content-between">
                                    <div className="d-flex align-items-center">
                                      <img
                                        src={
                                          path_image + "video-click-banner.svg"
                                        }
                                        alt="Export"
                                      />{" "}
                                      <p>
                                        {(
                                          (ctrName[item] /
                                            viewEmailData?.email_sent) *
                                          100
                                        )?.toFixed(0) + "%"}
                                      </p>
                                    </div>
                                    <div
                                      className="rd-box-export"
                                      onClick={() => {
                                        getReaderData(
                                          "ctr",
                                          item,
                                          viewEmailData?.labels[item]
                                        );
                                      }}
                                    >
                                      <img
                                        src={path_image + "arrow-export.svg"}
                                        alt="Export"
                                      />
                                    </div>
                                  </div>
                                </Col>
                              ))
                            ) : (
                              <>
                                {/* Your default column */}
                                <Col className="dynamic-column">
                                  <p>Link clicked (CTR 1)</p>
                                  <div className="email_stats_list d-flex align-items-end justify-content-between">
                                    <div className="d-flex align-items-center">
                                      <img
                                        src={
                                          path_image + "video-click-banner.svg"
                                        }
                                        alt="Export"
                                      />{" "}
                                      <p>0%</p>
                                    </div>
                                    <div className="rd-box-export">
                                      <img
                                        src={path_image + "arrow-export.svg"}
                                        alt="Export"
                                      />
                                    </div>
                                  </div>
                                </Col>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="graph-view">
                      <HighchartsReact
                        key={campaignId?.auto_id}
                        highcharts={Highcharts}
                        options={optionsHighchart}
                      />{" "}
                    </div>
                    {dropdownData && (
  <div className="rd-training-block">
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
      </div>
    </div>
    <div className="graph-view" ref={regionPieRef}>
      {isPieChart ? (
        <HighchartsReact
          highcharts={Highcharts}
          options={pieOptionsRegion}
        />
      ) : (
        <>
          <HighchartsReact
            key={`bar-region`}
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
                categories: dropdownData?.regionBarData?.map((data) => data.name) || [],
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
              tooltip: {},
              plotOptions: {
                series: {
                  groupPadding: 0,
                  // pointWidth: 20,
                  dataLabels: {
                    allowOverlap: false,
                    distance: 80,
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
              series: dropdownData?.regionBarData?.map((data, index) => {
                return {
                  name: data.name,
                  data: [data.y],
                  color: data.color
                };
              }) || [],
            }}
          />
        </>
      )}
    </div>
  </div>
)}

                  </div>
                </div>
              </>
            )}
          </Row>
          
        </div>
      </Col>
    </>
  );
};

export default AnalyticsEmailView;
