import { HighchartsReact } from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Highcharts from "highcharts";
import {
  ref,
  query,
  orderByChild,
  equalTo,
  onValue,
  off,
} from "firebase/database";
import { database } from "../../../../../config/firebaseConfigOnesource";
import { postData } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";

const AnalyticsLiveStream = ({handleAttendedUserCountryWise}) => {
  const [chartHeight, setChartHeight] = useState(270);
  const [refreshAttendeesFlag, setRefreshAttendeesFlag] = useState("");
  const [attendeesApiCallStatus, setAttendeesApiCallStatus] = useState(true);
  const [userIds, setUserIds] = useState([]);
  const [firstTimeStatus, setFirstTimeStatus] = useState(false);
  const [firstTime, setFirstTime] = useState(true);
  const { eventIdContext, handleEventId } = useSidebar();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("new");
  const [tempSlotsCategory, setTempSlotsCategory] = useState([]);
  const [topCountries, setTopCountries] = useState([]);

  const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"));
  const [eventId, setEventId] = useState(
    eventIdContext?.eventId
      ? eventIdContext?.eventId
      : localStorageEvent?.eventId
  );
  const commonPieOptions = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
        height: 290, // Increased height to prevent overlapping
    },
    title: {
        // text: "AVG spend time |",
        align: "center",
        style: {
            fontWeight: "500",
            fontSize: "14px",
            color: "#70899E",
        },
    },
    exporting: {
      enabled: true,
      chartOptions: {
          title: {
              text: '' // Remove title from exported image
          }
      },
      filename: 'AVG_Spend_Time', // Set filename for exported image
      menuItemDefinitions: {
          downloadPNG: {
              text: 'Download PNG',
              onclick: function() {
                  this.exportChart({
                      type: 'image/png'
                  });
              }
          },
          downloadJPEG: {
              text: 'Download JPEG',
              onclick: function() {
                  this.exportChart({
                      type: 'image/jpeg'
                  });
              }
          },
          downloadPDF: {
              text: 'Download PDF',
              onclick: function() {
                  this.exportChart({
                      type: 'application/pdf'
                  });
              }
          },
          downloadSVG: {
              text: 'Download SVG',
              onclick: function() {
                  this.exportChart({
                      type: 'image/svg+xml'
                  });
              }
          }
      },
      buttons: {
          contextButton: {
              symbol: 'url(https://docintel.app/img/octa/e-templates/options-btn.svg)',
              menuItems: [
                  "downloadPNG",
                  "downloadJPEG",
                  "downloadPDF",
                  "downloadSVG"
              ]
          }
      }
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
        reversed: false,
        align: "center",
        verticalAlign: "bottom",
        layout: "horizontal",
        x: 0,
        y: 0,
        itemStyle: {
            fontSize: "12px", // Reduced font size
            fontWeight: "normal",
            color: "#555555",
        },
        itemHoverStyle: {
            color: "#000000",
        },
        itemHiddenStyle: {
            color: "#C0C0C0",
        },
        symbolWidth: 8,
        symbolHeight: 8,
        itemDistance: 20,
        borderWidth: 0,
    },
   
    series: [],
};

  const [pieOptions, setPieOptions] = useState({ ...commonPieOptions });

  const [lineChartOptions, setLineChartOptions] = useState({
    chart: {
      type: "spline",
      height: 300,
    },
    title: {
      text: "Live HCPs Tracking",
      align: "center",
        style: {
          fontWeight: "500",
          color: "#70899E",
          fontSize: "14px",
        },
    },
    xAxis: {
      categories: [],
      tickInterval: 1,
      labels: {
        enabled: true,
      },
      lineColor: 'rgba(151, 182, 207, 0.30)', // X-axis line color
      lineWidth: 2, // X-axis line width
    },
    yAxis: {
      title: {
        text: "",
      },
      lineColor: 'rgba(151, 182, 207, 0.30)', // Y-axis line color
      lineWidth: 2, // Y-axis line width
      allowDecimals: false, // Ensure y-axis labels are integers
    },

  //   legend: {
  //     enabled: true,
  // },
  legend: {
    align: "center",
    verticalAlign: "bottom",
    layout: "vertical",
    x: 0,
    y: 0,
    itemStyle: {
        fontWeight: "normal",
        color: "#70899E",
        fontSize: "12px"
    },
   
    // itemHoverStyle: {
    //     color: "#000000"
    // },
    // itemHiddenStyle: {
    //     color: "#C0C0C0"
    // },
    symbolWidth: 10,
    symbolHeight: 10,
    itemDistance: 20,
    lineWidth: 0, // Remove the line cutting through the marker
},

    tooltip: {
      formatter: function() {
          return '<b>' + this.y + ' ' + 'HCPs' + ' | ' + this.point.category + '</b>';
      }
  },
    exporting: {
      enabled: false,
    },
    plotOptions: {
      series: {
        marker: {
          symbol: 'circle',
          fillColor: "#56cabc",
          color: "#56cabc",
        },
        fillColor: "#56cabc",
        color: "#56cabc",
      },
    },
    series: [
      {
        name: "HCPs online",
      
        data: [],
      },
    ],
  });
  const [fixSlotsCategory, setFixSlotsCategory] = useState([]);
  const [fixSlotsValue, setFixSlotsValue] = useState([]);
  const [insertFlag, setInsertFlag] = useState(false);
  const [tempSlotsValue, setTempSlotsValue] = useState([]);
  const [maxDataPoints, setMaxDataPoints] = useState(10); // Maximum number of data points to display

  useEffect(() => {
    setLineChartOptions((prevOptions) => ({
      ...prevOptions,
      chart: {
        ...prevOptions.chart,
        height: chartHeight,
      },
      xAxis: {
        ...prevOptions.xAxis,
        categories: prevOptions.xAxis.categories.slice(-maxDataPoints),
      },
      series: [
        {
          ...prevOptions.series[0],
          data: prevOptions.series[0].data.slice(-maxDataPoints),
        },
      ],
    }));
  }, [chartHeight, maxDataPoints]);
  useEffect(() => {
    const usersRef = ref(database, "users");
    const onlineUsersQuery = query(usersRef, orderByChild("status"));

    const handleChange = (snapshot) => {
      const onlineUserIds = [];
      snapshot.forEach((userSnapshot) => {
        const user = userSnapshot.val();
        if (user.user_id == null) {
          return;
        }
        if (user) {
          if (user?.status === "online") {
            onlineUserIds.push(user.user_id);
          }
        }
      });
      setUserIds(onlineUserIds);
    };
    if (onValue) {
      onValue(onlineUsersQuery, handleChange);
    }

    return () => {
      if (off) {
        off(onlineUsersQuery, "value", handleChange);
      }
    };
  }, []);

  useEffect(() => {
    if (firstTimeStatus) {
      getEventRegisterReadersGraph("", userIds);
    } else {
      setFirstTimeStatus(true);
    }
  }, [userIds, insertFlag]);

  const getEventRegisterReadersGraph = async (searchVal = "", userids = []) => {
    try {
      console.log(insertFlag, "insertFlag");
      let body = {
        eventId: eventId,
        type: "graph",
        search: "",
        user_ids: userids,
        flag: firstTime ? true : insertFlag,
      };
      const response = await postData(
        ENDPOINT?.WEBINAR_GET_EVENT_ATTENDEES,
        body
      );

      if (insertFlag) {
        setInsertFlag(false);
      }
      // console.log(response);
      let data = response?.data?.data;
      // console.log(data)
      if (firstTime && data?.count > 0) {
        // getEventRegisterReaders(search, userids);
        setFirstTime(false);
      }
      if (data?.count != undefined) {
        setLineChartOptions((prevOptions) => {
          const newOptions = { ...prevOptions };
          const newDataLength = data?.count ? data?.count : 0;
          const prevCategory = tempSlotsCategory;
          const prevValue = tempSlotsValue;
          let seriesData = prevOptions.series[0]?.data || [];
          let obj = {
            y: newDataLength,
            // marker: { enabled: true, radius: 5, fillColor: "#8a4e9c" },
            marker: { enabled: true, radius: 5, fillColor: "#56cabc" },
          };
          prevCategory.push("");
          let lastElement = prevValue.pop();
          if (lastElement) {
            prevValue.push(lastElement.y);
          }
          prevValue.push(obj);
          if (prevCategory.length > 2) {
            prevCategory.shift();
            prevValue.shift();
          }
          setTempSlotsCategory(prevCategory);
          setTempSlotsValue(prevValue);
          const newCategory = [...fixSlotsCategory, ...prevCategory];
          const newValues = [...fixSlotsValue, ...prevValue];
          newOptions.xAxis.categories = newCategory;
          seriesData = newValues;
          newOptions.series = [{ ...prevOptions.series[0], data: seriesData }];
          newOptions.plotOptions.series.tooltip = {
            headerFormat:
              '<span style="font-size: 10px">Online users</span><br/>',
            pointFormat: "<b>{point.y} </b>",
          };

          // console.log(newOptions,"newOptions");
          return newOptions;
        });
      }

      // if (attendeesTab == "online" || attendeesTab == "offline") {
      //   setAttendees(data);
      // }
      setAttendeesApiCallStatus(false);
      setRefreshAttendeesFlag("");
    } catch (err) {
      setRefreshAttendeesFlag("");
      setAttendeesApiCallStatus(false);
      console.log(err);
    }
  };
  const getEventRegisterReaders = async (searchVal = "", userids = []) => {
    try {
      let body = {
        eventId: eventId,
        type: "live",
        search: searchVal,
        user_ids: userIds,
      };
      const response = await postData(
        ENDPOINT?.WEBINAR_GET_EVENT_ATTENDEES,
        body
      );
      // setAttendees(response?.data?.data);
      setAttendeesApiCallStatus(false);
      setRefreshAttendeesFlag("");
    } catch (err) {
      setRefreshAttendeesFlag("");
      setAttendeesApiCallStatus(false);
      console.log(err);
    }
  };
  useEffect(() => {
    // Initial API call
    getLiveStreamData();

    getOnlineReadersGraph();
    // Set up interval to call API every 5 minutes (300,000 milliseconds)
    const intervalId = setInterval(() => {
      getOnlineReadersGraph();
    }, 300000);
    // 300000
    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const getLiveStreamData = async () => {
    try {
      // Prepare request body
      const body = {
        eventId: eventId,
      };

      // Make API call to fetch data
      const response = await postData(ENDPOINT?.GET_LIVESTREAM_DATA, body);
      let data = response?.data?.data;
      const averageTimeText = `AVG spend time | <span>${data?.averageTime?.averageTime}</span>`;
      const newValue = [
        {
            name: "",
            colorByPoint: true,
            data: data?.averageTime?.pieChartData,
        },
    ];
    // setPieOptions({ ...commonPieOptions, series: newValue });
    setPieOptions({
      ...commonPieOptions,
      title: {
          ...commonPieOptions.title,
          text: averageTimeText
      },
      series: newValue
  });
      console.log(pieOptions, "responseresponse");
      setTopCountries(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  // Assuming postData and ENDPOINT are defined elsewhere in your code

  const getOnlineReadersGraph = async () => {
    console.log("Function call for interval");
    try {
      let body = {
        eventId: eventId,
      };
      const response = await postData(
        ENDPOINT?.WEBINAR_GET_EVENT_ATTENDEES_GRAPH_DATA,
        body
      );
      let data = response?.data?.data;
      if (data?.slotCount != undefined) {
        setLineChartOptions((prevOptions) => {
          setFixSlotsCategory(data?.timeSlots);
          setFixSlotsValue(data?.slotCount);
          setTempSlotsCategory([]);
          setTempSlotsValue([]);
          const newOptions = { ...prevOptions };
          newOptions.xAxis.categories = data?.timeSlots;
          let seriesData = data?.slotCount;
          newOptions.series = [{ ...prevOptions.series[0], data: seriesData }];
          return newOptions;
        });
      }
      setAttendeesApiCallStatus(false);
      setRefreshAttendeesFlag("");
    } catch (err) {
      console.log("--err", err);
      setAttendeesApiCallStatus(false);
      setRefreshAttendeesFlag("");
    }
  };

  useEffect(() => {
    const updateFlag = () => {
      setInsertFlag(true);
    };
    const intervalId = setInterval(updateFlag, 60000);
    return () => clearInterval(intervalId);
  }, []);
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  return (
    <>
      <div className="rd-analytics-box">
        <p class="rd-box-small-title">Live stream</p>
        <div className="rd-analytics-box-layout">
          <div className="rd-analytics-top align-items-center d-flex justify-content-between">
            <h6 className="mr-auto" style={{ color: "#39CABC" }}>
              Attended HCPs
            </h6>
            <div className="d-flex">
              <div className="count-number" style={{ color: "#39CABC" }}>
                {topCountries?.averageTime?.totalUsers || 0}
              </div>
              <img
                src={path_image + "doctor-svg.svg"}
                alt="CRM"
                className="CRM"
              />

            </div>
          </div>
          <div className="attended_hcp">
            <div className="avg-speed">
            <HighchartsReact highcharts={Highcharts} options={pieOptions} />
            </div>
            <div className="hcp-tracking">
              <div className="live-hcp-tracking-img">
                {/* <Image src={path_image + "live-hcp-tracking.png"} alt="" /> */}
                <HighchartsReact
                  key={"line_bar"}
                  highcharts={Highcharts}
                  options={lineChartOptions}
                />
                <div id="hcp_tracking"></div>
              </div>{" "}
            </div>
            <div className="top-country-data">
              <h6>The Top 5 Countries</h6>
              <Table>
                {topCountries?.topCounties?.map((item, index) => (
                  <tr key={index}>
                    <td>{`${index + 1}. ${item.country}`}</td>
                    <td>{item.user_count}</td>
                  </tr>
                ))}
              </Table>
              <div className="rd-box-export">
                <img src={path_image + "arrow-export.svg"} alt="" onClick={handleAttendedUserCountryWise} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalyticsLiveStream;
