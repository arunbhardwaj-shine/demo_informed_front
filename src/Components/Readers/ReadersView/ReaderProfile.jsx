import React, { useEffect, useRef, useState } from "react";
import { surveyAxiosInstance } from "../../surveybuilder/CommonFunctions/CommonFunction";
import { loader } from "../../../loader";
import { Button, Col, Row, Table } from "react-bootstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Link, useLocation } from "react-router-dom";
import html2canvas from "html2canvas";

const ReaderProfile = () => {
  const [userProfileData, setUserProfileData] = useState({});
  const { state } = useLocation();
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

  const colors = {
    live_events: {
      lastYear: "#F58289",
      overAll: "#FFC5C8",
    },
    survey: {
      lastYear: "#EBAC20",
      overAll: "#FAC755",
      Exposure: "#FFE3A4",
    },
    portal: {
      lastYear: "#39CABC",
      overAll: "#88EBE2",
    },
    docintel: {
      lastYear: "#0066BE",
      overAll: "#C2E3FF",
    },
  };

  const getChartOptions = (categories, type,barWidth,groupPadding) => ({
    chart: {
      type: type,
      height: 220,
    },
    title: {
      text: null,
    },
    xAxis: {
      categories,
      lineColor: "#97B6CF",
      labels: {
        enabled: true,
        style: {
          color: "#004a89",
          fontWeight: "400",
          fontSize: "13px",
        },
      },
    },
    legend: {
      layout: 'horizontal',
      reversed: true,
      itemStyle: {
        color: "#70899E",
        fontSize: '11px'
        
      },
      symbolRadius: 5,

      labelFormatter() {
      if (this.chart.plotWidth < 230) {
        return ''
      }
      if (this.chart.plotWidth < 300) {
        return [...this.name].splice(0, 5).join('') + '...'
      }

      return this.name
    },
    },
    yAxis: [
      {
        title: {
          text: null,
        },
        labels: {
          style: {
            color: "#97B6CF",
            fontSize: "10px",
            fontWeight: "400",
          },
        },
        lineWidth: 2,
        lineColor: "rgba(151, 182, 207, 0.3)",
        tickLength: 0,
      },
      {
        // Right Y-axis
        opposite: true, // Place on the right side
        labels: {
          enabled: false,
        },
        title: {
          text: null,
        },
        lineWidth: 2, // Right line
        lineColor: "rgba(151, 182, 207, 0.3)", // Right line color
        tickLength: 0,
      },
    ],
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: false,
        },
        groupPadding:groupPadding,
        pointPadding: 0,
        borderWidth:0,
        pointWidth : barWidth, 
      },
    },
    tooltip: {
      enabled: true,
    },
    exporting: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    series: [],
  });

  let year = [];

  const getOverviewChartOptions = () => {
    const now = new Date();

    const last12Months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date(
        now.getUTCFullYear(),
        now.getUTCMonth() - (11 - i),
        1
      );
      const month = date.toLocaleString("default", { month: "short" });
      const year = date.getUTCFullYear();
      return `${month}<br>${year}`;
    });

    year = last12Months;

    return getChartOptions(last12Months, "line");
  };

  const handleParent = async () => {
    try {
      loader("show");

      // Select the element to capture
      const element = document.getElementById("user-details");

      // Ensure the element exists
      if (!element) {
        console.error("Parent element not found.");
        loader("hide");
        return;
      }

      // Apply necessary styles to avoid layout issues (for highcharts, etc.)
      const originalStyles = {
        boxShadow: element.style.boxShadow,
        padding: element.style.padding,
        backgroundColor: element.style.backgroundColor,
      };
      element.style.boxShadow = "none"; // Disable box-shadow for cleaner capture
      element.style.padding = "0"; // Reset padding if needed
      element.style.backgroundColor = 'transparent'; // Make background transparent

      // Use html2canvas to capture the element as a canvas
      const canvas = await html2canvas(element, {
        useCORS: true, // Allow cross-origin requests
        logging: true, // Useful for debugging
        // backgroundColor: 'transparent', // Make sure background is transparent
        scale: 2, // Adjust scale for better quality
      });

      // Convert the canvas to image data URL
      const dataUrl = canvas.toDataURL("image/png");

      // Revert the styles to their original state
      element.style.boxShadow = originalStyles.boxShadow;
      element.style.padding = originalStyles.padding;
      element.style.backgroundColor = originalStyles.backgroundColor;

      // Create download link and trigger download
      const link = document.createElement("a");
      link.download = userProfileData?.user_detail?.name;
      link.href = dataUrl;
      link.click();

      loader("hide");
    } catch (err) {
      loader("hide");
      console.error(err);
    }
  };

  const [lineOption, setLineOption] = useState(
    getChartOptions(
      [
        "Highlights",
        "Expert opinions",
        "Event",
        "Most-popular-content",
        "Library",
      ],
      "bar",6,0.26
    )
  );

  const [engagemnetOverView, setEngagemnetOverView] = useState(
    getOverviewChartOptions() || {}
  );

  const [docintelLineOption, setDocintelLineOption] = useState(
    getChartOptions(["Symposia", "Article", "eBrochure"], "bar",12,0.23)
  );
  const [liveEventsOption, setLiveEventsOption] = useState(
    getChartOptions(["Symposium", "Webinar", "Conference"], "bar",12,0.23)
  );
  const [surveyOption, setSurveyOption] = useState(
    getChartOptions(["Portal", "Webinar", "Email", "Poll"], "bar",6,0.23)
  );

  // Fetch data
  const getData = async () => {

    try {
      loader("show");

      const res = await surveyAxiosInstance.post(
        "/analytics/get-reader-profile",
        {
          user_id: state?.id,
        }
      );

      if (res.data.status) {
        setUserProfileData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      loader("hide");
    }
  };

  // Reusable function to update chart data
  const updateChartData = (sectionKey, setOption) => {
    const sectionData = userProfileData?.[sectionKey];
    if (sectionData && Object.keys(sectionData).length > 0) {
      const overall = [];
      const pastYear = [];
      const exposure = [];

      Object.keys(sectionData).forEach((key) => {
        const item = sectionData[key];
        if (
          item &&
          typeof item.overAll === "number" &&
          typeof item.lastYear === "number"
        ) {
          overall.push(item.overAll);
          pastYear.push(item.lastYear);
          if (sectionKey === "survey") {
            exposure.push(item.Exposure);
          }
        }
      });

      if (sectionKey === "survey") {
        setOption((prev) => ({
          ...prev,
          
          series: [
            {
              ...prev.series[1],
              name: "Exposure",
              color: colors?.[sectionKey].Exposure,
              data: exposure,
            },
            {
              ...prev.series[1],
              name: "All-Time",
              color: colors?.[sectionKey].overAll,
              data: overall,
            },
            {
              ...prev.series[0],
              name: "Last 12 months",
              color: colors?.[sectionKey].lastYear,
              data: pastYear,
            },
          ],
        }));
      } else {
        setOption((prev) => ({
          ...prev,
          series: [
            {
              ...prev.series[1],
              name: "All-Time",
              color: colors?.[sectionKey].overAll,
              data: overall,
            },
            {
              ...prev.series[0],
              name: "Last 12 months",
              color: colors?.[sectionKey].lastYear,
              data: pastYear,
            },
          ],
        }));
      }
    }
  };

  const updateEngagementOverview = (key, setOption) => {
    const sectionData = userProfileData?.[key];
    if (!sectionData) {
      return;
    }

    const colors = {
      docintel: "#0066BE",
      Email: "#8A4E9C",
      "Live Events": "#F58289",
      survey: "#FAC755",
      portal: "#39CABC",
    };
    const tempData = ["portal", "survey", "Live Events", "Email", "docintel"];

    const series = tempData?.map((identifier) => ({
      name:
        identifier.charAt(0).toUpperCase() + identifier.slice(1).toLowerCase(),
      marker: {
        symbol: "circle",
        radius: 5,
        lineWidth: 2,
      },
      color: colors[identifier],
      data: Object?.values(sectionData?.[identifier])?.reverse(),
    }));

    setOption((prev) => ({
      ...prev,
      tooltip: {
        enabled: true,
        formatter: function () {
          return (
            `<div style="display: flex; align-items: center;">` +
            `<span>` +
            ` ${this.y} Freq ` +
            `</span>` +
            ` | ` +
            `<span>` +
            `${year[this.x]} ` +
            `</span>` +
            `</div>`
          );
        },
      },
      xAxis: {
        ...prev.xAxis,
        labels: {
          enabled: true,
          style: {
            color: "#97B6CF",
            fontWeight: "400",
            fontSize: "10px",
          },
        },
      },
      legend: {
        ...prev.legend,
        symbolWidth: 5,
      },
      series,
    }));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (Object.keys(userProfileData).length !== 0) {
      updateChartData("portal", setLineOption);
      updateChartData("docintel", setDocintelLineOption);
      updateChartData("live_events", setLiveEventsOption);
      updateChartData("survey", setSurveyOption);
      updateEngagementOverview("engagement_overview", setEngagemnetOverView);
    }
  }, [userProfileData]);

  return (
    <>
      <Col className="right-sidebar custom-change">
        {Object.keys(userProfileData).length > 0 ? (
          <div className="custom-container">
            <div className="top-header profile_header sticky">
              <div className="page-title d-flex align-items-start">
                <div className="back-link">
                  <Link
                      to="/readers-view"
                      className="btn btn-primary btn-bordered back-btn me-2"
                    >
                      <svg
                        width="14"
                        height="24"
                        viewBox="0 0 14 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.159662 12.0019C0.159662 11.5718 0.323895 11.1417 0.65167 10.8138L10.9712 0.494292C11.6277 -0.16216 12.692 -0.16216 13.3482 0.494292C14.0044 1.15048 14.0044 2.21459 13.3482 2.8711L4.21687 12.0019L13.3479 21.1327C14.0041 21.7892 14.0041 22.8532 13.3479 23.5093C12.6917 24.1661 11.6274 24.1661 10.9709 23.5093L0.65135 13.19C0.323523 12.8619 0.159662 12.4319 0.159662 12.0019Z"
                          fill="#97B6CF"
                        />
                      </svg>
                    </Link>
                </div>
                <div className="d-flex flex-column">
                  <h2 className="d-flex align-items-center gap-2">
                  Profile
                </h2>
                <p style={{paddingLeft:"0"}}>{userProfileData?.user_detail?.joiningDate || "N/A"}</p>
                </div>
              </div>

              <Button
                title="Download Site Engagements"
                className="download filled"
                onClick={(e) => handleParent(e)}
              >
                Summary (Excel)
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {" "}
                  <path
                    d="M18.3335 13.125C18.1125 13.125 17.9005 13.2128 17.7442 13.3691C17.588 13.5254 17.5002 13.7373 17.5002 13.9583V15.1775C17.4995 15.7933 17.2546 16.3836 16.8192 16.819C16.3838 17.2544 15.7934 17.4993 15.1777 17.5H4.82266C4.2069 17.4993 3.61655 17.2544 3.18114 16.819C2.74573 16.3836 2.50082 15.7933 2.50016 15.1775V13.9583C2.50016 13.7373 2.41237 13.5254 2.25609 13.3691C2.0998 13.2128 1.88784 13.125 1.66683 13.125C1.44582 13.125 1.23385 13.2128 1.07757 13.3691C0.921293 13.5254 0.833496 13.7373 0.833496 13.9583V15.1775C0.834599 16.2351 1.25524 17.2492 2.00311 17.997C2.75099 18.7449 3.76501 19.1656 4.82266 19.1667H15.1777C16.2353 19.1656 17.2493 18.7449 17.9972 17.997C18.7451 17.2492 19.1657 16.2351 19.1668 15.1775V13.9583C19.1668 13.7373 19.079 13.5254 18.9228 13.3691C18.7665 13.2128 18.5545 13.125 18.3335 13.125Z"
                    fill="#0066BE"
                  ></path>{" "}
                  <path
                    d="M14.7456 9.20249C14.5893 9.04626 14.3774 8.9585 14.1564 8.9585C13.9355 8.9585 13.7235 9.04626 13.5673 9.20249L10.8231 11.9467L10.8333 1.77108C10.8333 1.55006 10.7455 1.3381 10.5893 1.18182C10.433 1.02554 10.221 0.937744 10 0.937744C9.77899 0.937744 9.56702 1.02554 9.41074 1.18182C9.25446 1.3381 9.16667 1.55006 9.16667 1.77108L9.15643 11.9467L6.41226 9.20249C6.25509 9.05069 6.04459 8.96669 5.82609 8.96859C5.60759 8.97049 5.39858 9.05813 5.24408 9.21264C5.08957 9.36715 5.00193 9.57615 5.00003 9.79465C4.99813 10.0131 5.08213 10.2236 5.23393 10.3808L9.40059 14.5475C9.478 14.6251 9.56996 14.6867 9.6712 14.7287C9.77245 14.7707 9.88098 14.7923 9.99059 14.7923C10.1002 14.7923 10.2087 14.7707 10.31 14.7287C10.4112 14.6867 10.5032 14.6251 10.5806 14.5475L14.7473 10.3808C14.9033 10.2243 14.9907 10.0123 14.9904 9.79131C14.9901 9.57034 14.902 9.35854 14.7456 9.20249Z"
                    fill="#0066BE"
                  ></path>
                </svg>
              </Button>
            </div>
            <div className="profile-general-info" id="user-details">
              <Row>
                <Col className="hcp-info">
                  <div className="general-info">
                    <div className="profile-box-title">
                      <p>General info</p>
                    </div>
                    <div className="hcp-profile-view">
                      <div className="hcp-general-info">
                        <p>{userProfileData?.user_detail?.name || "N/A"}</p>
                        <Table>
                          <tbody>
                            <tr>
                              <th>Email</th>
                              <td>
                                {userProfileData?.user_detail?.email || "N/A"}
                              </td>
                            </tr>
                            <tr>
                              <th>Country</th>
                              <td>
                                {userProfileData?.user_detail?.country || "N/A"}
                              </td>
                            </tr>
                            <tr>
                              <th>Consent country</th>
                              <td>
                                {userProfileData?.user_detail?.consentCountry ||
                                  "N/A"}
                              </td>
                            </tr>
                            <tr>
                              <th>Join Date</th>
                              <td>
                                {userProfileData?.user_detail?.joiningDate ||
                                  "N/A"}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                      <div className="hcp-local-intraction d-flex align-items-center justify-content-center">
                        <div className="local-intraction d-flex flex-column justify-content-center align-items-center">
                          <div>
                            <img src={path_image + "location-pin.svg"} alt="" />
                          </div>
                          <div>
                            <p>Local interaction</p>
                          </div>
                          <div>
                            <h5>{userProfileData?.user_detail?.local || 0}</h5>
                          </div>
                        </div>
                        <div className="local-vs">
                          <div>
                            <p>VS</p>
                          </div>
                        </div>
                        <div className="global-intraction d-flex flex-column justify-content-center align-items-center">
                          <div>
                            <img src={path_image + "globe-img.svg"} alt="" />
                          </div>
                          <div>
                            <p>Global interaction</p>
                          </div>
                          <div>
                            <h5>{userProfileData?.user_detail?.global || 0}</h5>
                          </div>
                        </div>
                      </div>
                      <div className="hcp-last-contract d-flex align-items-center justify-content-between">
                        <div className="d-flex">
                          <img
                            src={path_image + "profile-calendar.svg"}
                            alt=""
                          />{" "}
                          Days since last contact
                        </div>
                        <div className="d-flex">
                          <h5>
                            {userProfileData?.user_detail?.last_contact || 0}
                            <span>Days</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="overview">
                  <div className="general-info">
                    <div className="profile-box-title">
                      <p>Overview</p>
                    </div>
                    <div className="hcp-profile-view box engagement-overview">
                      <div className="profile-title">
                        <p>Engagement overview</p>
                      </div>
                      <div className="hcp-profile-content">
                        <p>Engagement in last 12 months</p>
                        <div className="profile-view-graph">
                          {/* <img src={path_image + "engagement-overview.png"} alt="" /> */}
                          <HighchartsReact
                            highcharts={Highcharts}
                            options={engagemnetOverView}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="emails">
                  <div className="general-info">
                    <div className="profile-box-title">
                      <p>Email</p>
                    </div>
                    <div className="hcp-profile-view box engagement">
                      <div className="profile-title d-flex align-items-center justify-content-between">
                        <p>Email engagement</p>
                        <img src={path_image + "email-analytics.svg"} alt="" />
                      </div>
                      <div className="hcp-profile-content">
                        <p>Engagement in last 12 months</p>
                        <div className="d-flex events-boxes-shadow live-streaming-box">
                          <div className="box col">
                            <p>Emails sent</p>
                            <div className="email_stats_list d-flex">
                              <div className="d-flex align-items-center">
                                <img
                                  src={path_image + "email-sent-engagement.svg"}
                                  alt="Export"
                                />
                                <p>
                                  {userProfileData?.email_engagement?.pastYear
                                    ?.delivered || 0}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="box col">
                            <p>Emails opened</p>
                            <div className="email_stats_list d-flex">
                              <div className="d-flex align-items-center">
                                <img
                                  src={path_image + "email-open-engagement.svg"}
                                  alt="Export"
                                />
                                <p>
                                  {userProfileData?.email_engagement?.pastYear
                                    ?.openRate || 0}
                                  %
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="box col">
                            <p>CTR</p>
                            <div className="email_stats_list d-flex">
                              <div className="d-flex align-items-center">
                                <img
                                  src={path_image + "ctr-engagement.svg"}
                                  alt="Export"
                                />
                                <p>
                                  {userProfileData?.email_engagement
                                    ?.pastYearCtrClicked || 0}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="hcp-profile-content">
                        <p>Engagement in All-Time</p>
                        <div className="d-flex events-boxes-shadow live-streaming-box">
                          <div className="box col">
                            <p>Emails sent</p>
                            <div className="email_stats_list d-flex">
                              <div className="d-flex align-items-center">
                                <img
                                  src={path_image + "email-sent-engagement.svg"}
                                  alt="Export"
                                />
                                <p>
                                  {userProfileData?.email_engagement?.overall
                                    ?.delivered || 0}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="box col">
                            <p>Emails opened</p>
                            <div className="email_stats_list d-flex">
                              <div className="d-flex align-items-center">
                                <img
                                  src={path_image + "email-open-engagement.svg"}
                                  alt="Export"
                                />
                                <p>
                                  {userProfileData?.email_engagement?.overall
                                    ?.openRate || 0}
                                  %
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="box col">
                            <p>CTR</p>
                            <div className="email_stats_list d-flex">
                              <div className="d-flex align-items-center">
                                <img
                                  src={path_image + "ctr-engagement.svg"}
                                  alt="Export"
                                />
                                <p>
                                  {userProfileData?.email_engagement
                                    ?.overAllCtrClicked || 0}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="topics">
                  <div className="general-info">
                    <div className="profile-box-title">
                      <p>Topics</p>
                    </div>
                    <div className="hcp-profile-view box  topic">
                      <div className="profile-title d-flex align-items-center justify-content-between">
                        <p>Top 5 topics</p>
                        <img src={path_image + "topics-icon.svg"} alt="" />
                      </div>
                      <div className="hcp-profile-content">
                        <p>Engagement in last 12 months</p>
                        <div className="profile-top-topics">
                          <Table>
                            <thead>
                              <tr>
                                <th>Topics</th>
                                <th>Freq</th>
                                <th>Avg</th>
                              </tr>
                            </thead>
                            <tbody>
                              {userProfileData.topics.length > 0
                                ? userProfileData.topics.map((item, index) => (
                                    <tr key={index}>
                                      <td>
                                        <div className="topics">
                                          <span>{index + 1}.</span>
                                          <div className="topics-name">
                                            {item[0] || "N/A"}
                                          </div>
                                        </div>
                                      </td>
                                      <td className="freq">
                                        {item[1] || index + 1}
                                      </td>
                                      <td>{item[2] || index + 1}</td>
                                    </tr>
                                  ))
                                : null}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <div className="profile-box-title">
                    <p>Engagements</p>
                  </div>
                  <div className="profile-engagement">
                    <div className="profile-engagement-block">
                      <Row>
                        <Col>
                          <div className="general-info">
                            <div className="hcp-profile-view live">
                              <div className="profile-title d-flex align-items-center justify-content-between">
                                <p>Live events</p>
                                <img
                                  src={path_image + "live-event-profile.svg"}
                                  alt=""
                                />
                              </div>
                              <div className="hcp-profile-content">
                                <p>Last 12 months vs all-time engagement</p>
                                <div className="profile-view-graph">
                                  {/* <img src={path_image + "live-event.png"} alt="" /> */}
                                  {liveEventsOption && (
                                    <HighchartsReact
                                      highcharts={Highcharts}
                                      options={liveEventsOption}
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col>
                          <div className="general-info">
                            <div className="hcp-profile-view survey">
                              <div className="profile-title d-flex align-items-center justify-content-between">
                                <p>Survey</p>
                                <img
                                  src={path_image + "survey-profile.svg"}
                                  alt=""
                                />
                              </div>
                              <div className="hcp-profile-content">
                                <p>Last 12 months vs all-time engagement</p>
                                <div className="profile-view-graph">
                                  {/* <img src={path_image + "survey-event.png"} alt="" /> */}
                                  {surveyOption && (
                                    <HighchartsReact
                                      highcharts={Highcharts}
                                      options={surveyOption}
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col>
                          <div className="general-info">
                            <div className="hcp-profile-view portal">
                              <div className="profile-title d-flex align-items-center justify-content-between">
                                <p>Portal</p>
                                <img
                                  src={path_image + "portal-profile.svg"}
                                  alt=""
                                />
                              </div>
                              <div className="hcp-profile-content">
                                <p>Last 12 months vs all-time engagement</p>
                                <div className="profile-view-graph">
                                  {/* <img src={path_image + "portal-view.png"} alt="" /> */}
                                  {lineOption && (
                                    <HighchartsReact
                                      highcharts={Highcharts}
                                      options={lineOption}
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col>
                          <div className="general-info">
                            <div className="hcp-profile-view docintel">
                              <div className="profile-title d-flex align-items-center justify-content-between">
                                <p>Docintel</p>
                                <img
                                  src={path_image + "docintel-profile.svg"}
                                  alt=""
                                />
                              </div>
                              <div className="hcp-profile-content">
                                <p>Last 12 months vs all-time engagement</p>
                                <div className="profile-view-graph">
                                  {/* <img src={path_image + "docintel-overview.png"} alt="" /> */}

                                  {docintelLineOption && (
                                    <HighchartsReact
                                      highcharts={Highcharts}
                                      options={docintelLineOption}
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        ) : (
          <div className="no_found">
            <p>No Data Found</p>
          </div>
        )}
      </Col>
    </>
  );
};

export default ReaderProfile;
