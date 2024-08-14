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
import { toast } from "react-toastify";

const AnalyticsEmailView = () => {
  let menuItemDefinitions = {
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
  };
  const colorArray = [
    "#349b8e",
    "#4184cc",
    "#ed8188",
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
      marginTop: 50,
      marginBottom: 50,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      height: 400,
      paddingBottom: 10,
    },
    title: null,
    exporting: {
      sourceWidth: 1600,
      sourceHeight: 1200,
      enabled: false,
      ...menuItemDefinitions,
     
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
        borderWidth: 0,
        size: "100%",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y}",
          style: {
            fontWeight: "400",
            color: "black",
            textOutline: "none",
            fontSize: "14px",
          },
          distance: 30,
          connectorPadding: 0,
        },
        animation: {
          duration: 1000,
        },
        enableMouseTracking: true,
        showInLegend: true,
      },
    },
    series: [],
  };

  const [pieOptionsRegion, setPieOptionsRegion] = useState({
    ...commonPieOptions,
  });
  const regionPieRef = useRef(null);

  const [optionsHighChart, setOptionsHighChart] = useState({
    chart: {
      type: "bar",
      options3d: {
        enabled: true,
        alpha: 10,
        beta: 25,
        depth: 70,
      },
      events: {
        load: function() {
          let categoryHeight = 50;
          this.update({
            chart: {
              height: categoryHeight * this.pointCount + (this.chartHeight - this.plotHeight)
            }
          })
        }
      }
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
      enabled: false,
    },
    xAxis: {
      categories: [],
      labels: {
        align: "right",
        reserveSpace: true,
        y: 7,
      style: {
        color: '#97B6CF',
        fontSize: '13',
        fontWeight: 400,
      },
    },
    },
    yAxis: {
      title: {
        text: null,
      },
      labels: {
        style: {
          color: '#97B6CF',
          fontSize: '11',
          fontWeight: 400,
        },
      },
    },
    exporting: {
      sourceWidth: 1600,
      sourceHeight: 1200,
      enabled: true,
      chartOptions: {
        title: {
          text: "", 
        },
      },
      filename: "Total_Registration", 
      ...menuItemDefinitions,
    
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
        groupPadding: 0.2,
        pointPadding: 0,
        borderWidth: 0,
        pointWidth: 30,
        dataLabels: {
          allowOverlap: false,
          distance: 30,
          enabled: true,
          inside: false,
          overflow: "justify",
          crop: true,
          shape: "callout",
          size: "100%",
          style: {
            textShadow: "none",
            fontSize: "14px",
            color: "#004A89",
            fontWeight: "500",
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
  const [viewEmailData, setViewEmailData] = useState(null);
  const { eventIdContext } = useSidebar();
  const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"));
  const [campaignId, setCampaignId] = useState("");
  const [ctrName, setCTRName] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [dropdownData, setDropdownData] = useState(null);
  const [isPieChart, setIsPieChart] = useState(true);
  const [apiStatus, setApiStatus] = useState(false);
  const [dynamicName, setDynamicName] = useState("");

  const eventId = eventIdContext?.eventId
      ? eventIdContext?.eventId
      : localStorageEvent?.eventId
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
      let data = response?.data?.data;
      setOptions(data);
      if (data?.length > 0) {
        handleSelectChange(data[0]);
      } else {
        loader("hide");
      }
      setApiStatus(true);
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
      setPieOptionsRegion(null);
      setDropdownData(null);
      setDynamicName(popup_name)
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
          activeAxisLabelStyle: {
            textDecoration: "none",
            color: "#000000",
          },
          activeDataLabelStyle: {
            textDecoration: "none",
            color: "#000000",
          },
          series: response?.data?.data?.drilldownData, 
        },
      });

      setDropdownData(response?.data?.data);

      loader("hide");
    } catch (err) {
      loader("hide");
      console.log("--err", err);
    }
  };

  const handleSelectChange = (selectedOption) => {
    setPieOptionsRegion(null);

      setDropdownData(null);
    setViewEmailData(null);
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
    if (typeof data !== "undefined") {
      let valueUpdate = { ...optionsHighChart };
      valueUpdate.xAxis.categories = ["Emails sent", "Emails opened"];
      valueUpdate.series[0].data = [
        { y: data?.email_sent, color: "#8a4e9c" },
        { y: data?.email_read, color: "#ffbe2c" },
      ];

      Object.keys(data?.labels_value)?.map((item, index) => {
        valueUpdate?.xAxis?.categories?.push(data?.labels[item]);

        let obj = {
          y: data?.labels_value[item],
          color: colorArray?.[index],
        };
        valueUpdate.series[0].data.push(obj);
      });

      setCTRName(data?.labels_value);
      setOptionsHighChart(valueUpdate);
      setViewEmailData(data);
    }
    setCampaignId(data);
    loader("hide");
  };
  const handleParent = async () => {
    try {
      // const buttonsContainer = document.querySelector(
      //   ".rd-training-block-right"
      // );  
      
      const buttonsContainer = document.getElementById("print");
      buttonsContainer.style.display="none";

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
        // buttonsContainer.classList.remove("hide");
        buttonsContainer.style.display="block";

      }, 100);

      loader("hide");
    } catch (err) {
      loader("hide");
      console.log(err);
    }
  };

  const toggleChartType = () => {
    loader("show");
    setTimeout(() => {
      setIsPieChart(!isPieChart);
      loader("hide");
    }, 500);
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
            {apiStatus && options?.length > 0 ? (
              <>
                {" "}
                <div className="webinar-emails-details">
                  <p>Select the email to see the stats:</p>
                  <Form>
                    <Select
                      classNamePrefix="react-select"
                      options={options}
                      className="dropdown-basic-button split-button-dropup mr-2 btn-bigger"
                      onChange={handleSelectChange}
                      value={selectedOption}
                      // isMenuOpen={true}
//                       onMenuOpen={(e)=>{
// setTimeout(()=>{
//   console.log( document.querySelector(".react-select__option--is-focused").style.color="white"
// );
// },1)
//                       }} 

                      />
                  </Form>
                </div>
                {viewEmailData && (
                  <>
                    {" "}
                    <div className="rd-full-explain webinar-emails-statss" id="chart-description">
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
                            <Button className="print" id="print" title="Print Stats" onClick={handleParent} > <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" > <path d="M2 4C2 2.89543 2.89543 2 4 2H7.41667C7.96895 2 8.41667 1.55228 8.41667 1C8.41667 0.447715 7.96895 0 7.41667 0H4C1.79086 0 0 1.79086 0 4V7.41667C0 7.96895 0.447715 8.41667 1 8.41667C1.55228 8.41667 2 7.96895 2 7.41667V4Z" fill="#0066BE" ></path> <path d="M16.5833 0C16.031 0 15.5833 0.447715 15.5833 1C15.5833 1.55228 16.031 2 16.5833 2H20C21.1046 2 22 2.89543 22 4V7.41667C22 7.96895 22.4477 8.41667 23 8.41667C23.5523 8.41667 24 7.96895 24 7.41667V4C24 1.79086 22.2091 0 20 0H16.5833Z" fill="#0066BE" ></path> <path d="M2 16.5833C2 16.031 1.55228 15.5833 1 15.5833C0.447715 15.5833 0 16.031 0 16.5833V20C0 22.2091 1.79086 24 4 24H8.33333C8.88562 24 9.33333 23.5523 9.33333 23C9.33333 22.4477 8.88562 22 8.33333 22H4C2.89543 22 2 21.1046 2 20V16.5833Z" fill="#0066BE" ></path> <path d="M24 16.5833C24 16.031 23.5523 15.5833 23 15.5833C22.4477 15.5833 22 16.031 22 16.5833V20C22 21.1046 21.1046 22 20 22H16.5833C16.031 22 15.5833 22.4477 15.5833 23C15.5833 23.5523 16.031 24 16.5833 24H20C22.2091 24 24 22.2091 24 20V16.5833Z" fill="#0066BE" ></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M9 12.5004C9 10.8449 10.344 9.5 11.9996 9.5C13.6551 9.5 15 10.8449 15 12.5004C15 14.156 13.6551 15.5 11.9996 15.5C10.344 15.5 9 14.156 9 12.5004ZM13.7991 12.5004C13.7991 11.5073 12.9927 10.7 11.9996 10.7C11.0064 10.7 10.2 11.5073 10.2 12.5004C10.2 13.4936 11.0064 14.3 11.9996 14.3C12.9927 14.3 13.7991 13.4936 13.7991 12.5004Z" fill="#0066BE" ></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5963 8.3H18.4615C18.8952 8.3 19.3118 8.46771 19.6194 8.7676C19.927 9.06757 20.1 9.47489 20.1 9.9V16.5C20.1 17.3862 19.3642 18.1 18.4615 18.1H5.53846C4.63579 18.1 3.9 17.3862 3.9 16.5V9.9C3.9 9.47489 4.07298 9.06757 4.38065 8.7676C4.68823 8.46771 5.10478 8.3 5.53846 8.3H7.4037C7.47384 8.3 7.53879 8.26556 7.57717 8.2097L8.67004 6.61137C8.97401 6.16652 9.48587 5.9 10.0326 5.9H13.9674C14.5141 5.9 15.026 6.1665 15.33 6.61137L16.4228 8.20961C16.4611 8.26552 16.5261 8.3 16.5963 8.3ZM9.85906 7.3904L8.76624 8.98866C8.46169 9.43342 7.94989 9.7 7.4037 9.7H5.53846C5.48265 9.7 5.42956 9.72164 5.39042 9.7592C5.35199 9.79727 5.33077 9.84786 5.33077 9.9V16.5C5.33077 16.608 5.42144 16.7 5.53846 16.7H18.4615C18.5786 16.7 18.6692 16.608 18.6692 16.5V9.9C18.6692 9.84787 18.648 9.79729 18.6096 9.75923C18.5705 9.72165 18.5174 9.7 18.4615 9.7H16.5963C16.0501 9.7 15.5383 9.43347 15.2338 8.98871L14.1409 7.3904C14.1026 7.33449 14.0376 7.3 13.9674 7.3H10.0326C9.96249 7.3 9.89744 7.33457 9.85906 7.3904Z" fill="#0066BE" ></path> </svg> </Button>
                          </div>
                        </div>
                        <div className="analytics_email_stats">
                          <div className="d-flex email_stats_gap flex-wrap">
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
                                      if(viewEmailData?.email_sent==0) {
                                        toast.warning("No Data Found!");
                                        return 

                                      }
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
                                        ? viewEmailData?.read_percentage + " "
                                        : "0% "}
                                      ({viewEmailData?.email_read || 0})
                                    </p>
                                  </div>
                                  <div
                                    className="rd-box-export"
                                    onClick={() => {
                                      if(viewEmailData?.email_read==0) {
                                        toast.warning("No Data Found!");
                                        return 

                                      }
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
                                    <Col className="video-click">
                                      <p
                                        style={{
                                          color:
                                            colorArray?.[
                                              index % colorArray.length
                                            ],
                                        }}
                                      >
                                        {viewEmailData?.labels[item]}
                                      </p>
                                      <div className="email_stats_list d-flex align-items-end justify-content-between">
                                        <div className="d-flex align-items-center">

                                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" > <circle cx="16" cy="16" r="14.5" stroke={colorArray?.[index % colorArray.length]} strokeWidth="3" strokeLinejoin="round" /> <path d="M11.9634 13.3063C11.8537 12.9347 11.7483 12.5624 11.6691 12.2058C11.1485 11.8977 10.7943 11.3372 10.7943 10.6893C10.7943 9.71473 11.5868 8.92284 12.5608 8.92284C13.5347 8.92284 14.3273 9.71535 14.3273 10.6893C14.3273 10.8234 14.3092 10.9525 14.2811 11.0778C14.4501 11.45 14.5866 11.8691 14.7064 12.2949C15.0431 11.846 15.2501 11.2942 15.2501 10.6893C15.2501 9.20343 14.0467 8 12.5608 8C11.0749 8 9.87207 9.20343 9.87207 10.6893C9.87207 11.9688 10.7668 13.0345 11.9634 13.3063Z" fill={colorArray?.[index % colorArray.length]} /> <path d="M10.1062 19.673C10.769 18.9566 11.5129 19.2372 12.5087 19.3887C13.3641 19.5203 14.2066 19.2802 14.1504 18.8182C14.0619 18.0705 13.9372 17.7363 13.6535 16.768C13.4271 15.9979 12.9975 14.6099 12.6065 13.283C12.0828 11.5078 11.9313 10.6835 12.6284 10.4777C13.3797 10.2588 13.8106 11.3263 14.2009 12.8066C14.6455 14.4914 14.8793 15.2353 15.0103 15.196C15.241 15.1299 14.9255 14.4091 15.5291 14.2314C16.2836 14.0119 16.4295 14.6018 16.6408 14.5426C16.8522 14.479 16.7805 13.8816 17.3822 13.7058C17.9871 13.5312 18.2907 14.2757 18.5401 14.2015C18.7871 14.1285 18.7815 13.8598 19.1543 13.7532C19.5278 13.6422 20.9333 14.2713 21.7376 17.0193C22.7472 20.4743 21.6098 21.1165 21.9546 22.2863L17.4483 23.9998C17.0836 23.1224 15.9537 23.0576 14.9542 22.4983C13.9472 21.9315 13.2631 20.8272 10.6387 20.8808C9.6516 20.9008 9.69837 20.1139 10.1062 19.673Z" fill={colorArray?.[index % colorArray.length]} /> </svg>
                                          <p>
                                            {
                                              // (
                                              //   (ctrName[item] /
                                              //     viewEmailData?.email_sent) *
                                              //   100
                                              // )
                                              (
                                                (ctrName[item] * 100) /
                                                viewEmailData?.email_read
                                              )?.toFixed(0) +
                                                `% (${ctrName[item] || 0})`
                                            }
                                          </p>
                                        </div>
                                        <div
                                          className="rd-box-export"
                                          onClick={() => {
                                            if(ctrName[item]==0) {
                                              toast.warning("No Data Found!");
                                              return 

                                            }
                                            getReaderData(
                                              "ctr",
                                              item,
                                              viewEmailData?.labels[item]
                                            );
                                          }}
                                        >
                                          <img
                                            src={
                                              path_image + "arrow-export.svg"
                                            }
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
                                              path_image +
                                              "video-click-banner.svg"
                                            }
                                            alt="Export"
                                          />{" "}
                                          <p>0%</p>
                                        </div>
                                        <div className="rd-box-export"  onClick={() =>{
                                              toast.warning("No Data Found!");

                                        }}>
                                          <img
                                            src={
                                              path_image + "arrow-export.svg"
                                            }
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
                            options={optionsHighChart}
                          />{" "}
                        </div>
                        {dropdownData && (
                          <div className="rd-training-block">
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="rd-training-block-left">
                                <h4>{dynamicName.replace(/-/g, ' ')} by country</h4>
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
                                        borderWidth: "0",
                                        options3d: {
                                          enabled: true,
                                          alpha: 10,
                                          beta: 25,
                                          depth: 70,
                                        },
                                          events: {
                                            load: function () {
                                              let categoryHeight = 30;
                                              console.log( categoryHeight * this.pointCount +
                                                (this.chartHeight -
                                                  this.plotHeight),"ygefkjbekj");
                                              this.update({
                                                chart: {
                                                  height:
                                                    categoryHeight * this.pointCount +
                                                    (this.chartHeight -
                                                      this.plotHeight),
                                                },
                                              });
                                            },
                                            drillup: function (event) {
                                              this.update({
                                                chart: {
                                                  height: 556,
                                                },
                                              });
                                            },
        
                                            drilldown: function (event) {
                                              let categoryHeight =  event.seriesOptions.data.length<=1 ?130:55;
                                              console.log(categoryHeight);
  
                                              this.update({
                                                chart: {
                                                  height:
                                                    categoryHeight *
                                                      event.seriesOptions.data.length ||
                                                    1 +
                                                      (this.chartHeight -
                                                        this.plotHeight),
                                                },
                                              });
                                            },
                                          },
                                      },
                                      title: {
                                        align: "left",
                                        text: "",
                                      },
                                      accessibility: {
                                        announceNewData: {
                                          enabled: true,
                                        },
                                      },
                                      xAxis: {
                                        type: "category",
                                        
                                      },
                                      yAxis: {
                                        title: {
                                          text: "Total Count",
                                          style: {
                                            color: '#70899E',
                                            fontSize: '13',
                                            fontWeight: 400,
                                          },
                                        },
                                        labels: {
                                          style: {
                                            color: '#97B6CF',
                                            fontSize: '11',
                                            fontWeight: 400,
                                          },
                                        },
                                        allowDecimals: false,

                                      },
                                      legend: {
                                        enabled: false,
                                      },
                                      plotOptions: {
                                        series: {
                                          // pointWidth: 30,
                                          groupPadding: 0.2,
                                 
                                          pointWidth: 18,


                                          pointPadding: 0,
                                          borderWidth: 0,
                                          dataLabels: {
                                            enabled: true,
                                            format: "{point.y}",
                                            //   style: {
                                            //   fontWeight: "600",
                                            //   textShadow: "none",
                                            //   fontSize: "14px",
                                            //   color: "#000000",
                                            //   TextDecoder:"none",
                                            // },
                                          },
                                          borderRadius: {
                                            radius: 10,
                                          },
                                        },
                                        bar: {
                                          colorByPoint: true, // Ensure each bar has a unique color
                                        },
                                      },
                                      tooltip: {
                                        headerFormat:
                                          '<span style="font-size:11px">{series.name}</span><br>',
                                        pointFormat:
                                          '<span style="color:{point.color}">{point.name}</span>: ' +
                                          "<b>{point.y}</b> total<br/>",
                                      },
                                      exporting: {
                                        sourceWidth: 1600,
                                        sourceHeight: 1200,
                                        enabled: false, // Disable exporting
                                      },
                                      series: [
                                        {
                                          name: "",
                                          colorByPoint: true,
                                          data:
                                            dropdownData?.regionBarData?.map(
                                              (data) => ({
                                                y: data.y,
                                                color: data.color,
                                                drilldown: data?.name,
                                                name: data?.name,
                                              })
                                            ) || [],
                                        },
                                      ],
                                      drilldown: {
                                        activeAxisLabelStyle: {
                                          textDecoration: "none",
                                          color: "#000000",
                                        },
                                        activeDataLabelStyle: {
                                          textDecoration: "none",
                                          color: "#000000",
                                        },
                                        series:
                                          dropdownData?.drilldownData?.map(
                                            (drilldownItem) => ({
                                              id: drilldownItem.id,
                                              data: drilldownItem.data.map(
                                                (item) => ({
                                                  name: item[0], // Country name
                                                  y: item[1], // Count
                                                  // pointWidth: 30,
                                                })
                                              ),
                                            })
                                          ) || [],
                                      },
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
                )}{" "}
              </>
            ) : (
              <>
                {apiStatus && (
                  <div className="no_found">
                    <p>No Emails had been sent.</p>
                  </div>
                )}
              </>
            )}
          </Row>
        </div>
      </Col>
    </>
  );
};

export default AnalyticsEmailView;
