import React, { useEffect, useState, useRef } from "react";
import {
  Accordion,
  Button,
  Col,
  Container,
  Dropdown,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
import AnalyticsRegistration from "./AnalyticsRegistration";
import AnalyticsOverview from "./AnalyticsOverview";
import AnalyticsEmail from "./AnalyticsEmail";
import AnalyticsLiveStream from "./AnalyticsLiveStream";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import JSZip from "jszip";
import domtoimage from "dom-to-image";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import { postData, postFormData } from "../../../../../axios/apiHelper";
import { loader } from "../../../../../loader";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import WebinarAnalyticCommonModal from "../../../../../Model/WebinarAnalyticCommonModal";
import Highcharts from "highcharts";

import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";

import HighchartsReact from "highcharts-react-official";
import HighchartsMap from "highcharts/modules/map";


import axios from "axios";
import drilldown from "highcharts/modules/drilldown.js";
import { useNavigate } from "react-router-dom";

HighchartsMap(Highcharts);

// Load Highcharts modules
require("highcharts/modules/map")(Highcharts);
require("highcharts/modules/exporting")(Highcharts);
exporting(Highcharts);
exportData(Highcharts);
drilldown(Highcharts);
// customWrap(Highcharts);
const customLoader = (functionName, e = null) => {
  if (e != null) {
    e.preventDefault();
  }
  loader("show");
  setTimeout(() => {
    functionName(e);
    loader("hide");
  }, 300);
};
const Analytics = (props) => {
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  let   menuItemDefinitions  ={ menuItemDefinitions: {
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
  }}
  const { eventIdContext, handleEventId } = useSidebar();
  const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"));
  const [eventId, setEventId] = useState(
    eventIdContext?.eventId || localStorageEvent?.eventId
  );
  const [eventTitle, setEventTitle] = useState(
    eventIdContext?.eventTitle
      ? eventIdContext?.eventTitle
      : localStorageEvent?.eventTitle
  );
  const navigate=useNavigate()
  if(!eventTitle){
  
      toast.warning("Please Select Event First!");
   
    navigate("/webinar/event-listing")

  }
  const [downloadPopup, setDownloadPopup] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [usersDataOriginal, setUsersDataOriginal] = useState([]);
  const [overViewData, setOverViewData] = useState([]);
  const [sortedCountries, setSortedCountries] = useState(null);
  const [attendedUsers, setAttendedUsers] = useState(null);
  const [activeTable, setActiveTable] = useState(null);
  const totalRegistrationRef = useRef(null);
  const registeredGraphRef = useRef(null);
  const overviewTableRef = useRef(null);
  const attendedUsersRef = useRef(null);
  const [eventStatus, setEventStatus] = useState(
    localStorageEvent?.eventStatus
  );

  const commonPieOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      height: 600,
    },
    title: {
      // text: "Click on the double arrows to see more details",
      text: "",
      align: "left",
      style: {
        fontSize: "14px",
      },
    },
    exporting: {
      enabled: false,
      sourceWidth: 1600,
      sourceHeight: 1200,
      scale: 1,
     ...menuItemDefinitions,
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
      enabled: false, // Disable the default legend
    },
    plotOptions: {
      pie: {
        size: "90%",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          style: {
            fontWeight: "bold",
            color: "black",
            textOutline: "none",
            fontSize: "14px",
          },
          distance: 30, // Set distance from pie slice
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
  const [pieOptions, setPieOptions] = useState({ ...commonPieOptions });
  const [pieOptionsRegion, setPieOptionsRegion] = useState({
    ...commonPieOptions,
  });
  const [pieOptionsByEmail, setPieOptionsByEmail] = useState({
    ...commonPieOptions,
  });

  const [whichTypeGraph, setWhichTypeGraph] = useState(false);
  const [whichTypeGraphRegion, setWhichTypeGraphRegion] = useState(true);
  const [whichTypeGraphByEmail, setWhichTypeGraphRegionByEmail] = useState(true);

  const buttonRef = useRef(null);
  const filterRef = useRef(null);
  const [apifilterObject, setApifilterObject] = useState({});
  const [showFilter, setShowFilter] = useState(false);
  const [filterdata, setFilterData] = useState({});
  const [appliedFilter, setAppliedFilter] = useState({});
  const [filterObject, setFilterObject] = useState({});
  const [eventData, setEventData] = useState({});
  const countryBarRef = useRef(null);
  const countryPieRef = useRef(null);
  const regionBarRef = useRef(null);
  const regionPieRef = useRef(null);  
  const regionBarEmailRef = useRef(null);
  const regionPieEmailRef = useRef(null);

  const [emailListData, setEmailListData] = useState([]);
  const [localStorageUserId, setLocalStorageUserId] = useState(
    localStorage.getItem("user_id")
  );
  const [newOptions, setNewOptions] = useState([]);
  // const colorArray = [
  //   "#0E9B8E",
  //   "#00003C",
  //   "#FFBE2C",
  //   "#FFBE2C",
  //   "#F58289",
  //   "#D61975",
  //   "#0066BE",
  // ];
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
  const [pieChartData, setPieChartData] = useState({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    exporting: {
      sourceWidth: 1600,
      sourceHeight: 1200,
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "Region Chart",
      align: "center",
      margin: 50,
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      enabled: false,
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        size: "100%",
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format:
            '<span style="font-size: 1.2em"><b>{point.name} {point.percentage:.1f} %</b></span>',
        },
      },
    },
    series: [
      {
        name: "Share",
        data: [],
      },
    ],
  });
  const [splineChartData, setSplineChartData] = useState({
    chart: {
      type: "spline",
      width: "1000",
    },
    credits: {
      enabled: false,
    },
    title: {
      text:  "Online Users Graph",
      align: "center",
      margin: 50,
    },
    exporting: {
      sourceWidth: 1600,
      sourceHeight: 1200,
      enabled: false,
    },
    xAxis: {
      categories: [],
      tickInterval: 1,
      labels: {
        enabled: true,
      },
    },
    yAxis: {
      title: {
        text: "Online Users",
      },
      allowDecimals: false,
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },

    plotOptions: {
      series: {
        color: "#0066be",
        marker: {
          enabled: true,
        },
      },

      spline: {
        marker: {
          enable: true,
        },

        dataLabels: {
          allowOverlap: true,
          inside: false,
          overflow: "justify",
          crop: true,
          shape: "callout",
          backgroundColor: "rgba(255,255,255)",
          borderColor: "rgba(0,0,0,0.9)",
          color: "rgba(0,0,0)",
          borderWidth: 0.5,
          enabled: true,
          borderRadius: 5,
          borderWidth: 1,
          y: -10,
          marker: {
            enabled: true,
          },
          style: {
            fontSize: "11px",
            fontWeight: "normal",
            textShadow: "none",
          },
          formatter: function () {
            return (
              "<span ><div className=" +
              this.series.name +
              '><span style="font-weight: bold;">' +
              "Users" +
              "</span><br/><strong>" +
              Highcharts.numberFormat(this.y, 0) +
              "</strong></div></span>"
            );
          },
        },

        enableMouseTracking: false,
      },
    },
    series: [
      {
        name: "",
        data: [],
      },
    ],
  });

  const [options, setOptions] = useState({
    chart: {
      type: "bar",
      width: 1000,
      options3d: {
        enabled: true,
        alpha: 10,
        beta: 25,
        depth: 70,
      },
    },
    title: {
      text: "Mail campaign stats",
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
      sourceWidth: 1600,
      sourceHeight: 1200,
      enabled: false,
    },
    tooltip: {
      formatter: function () {
        return (
          "<span ><div className=" +
          this.series.name +
          ">" +
          // <span style="font-weight: bold">'
          // this.x +
          " <strong >" +
          ":" +
          Highcharts.numberFormat(this.y, 0) +
          "</strong></div></span>"
        );
      },
    },
    plotOptions: {
      bar: {
        pointWidth: 20,
      },
      series: {
        dataLabels: {
          allowOverlap: false,
          distance: 40,
          enabled: true,
          inside: false,
          overflow: "justify",
          crop: true,
          shape: "callout",
          size: "100%",
          style: {
            fontFamily: "Helvetica, sans-serif",
            fontWeight: "normal",
            textShadow: "none",
          },
          formatter: function () {
            return (
              "<span ><div className=" +
              this.series.name +
              //  +
              // this.x
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
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const clearFilter = () => {
    loader("show");

    setTimeout(() => {
      setAppliedFilter({});
      setApifilterObject({});
      setFilterObject({});
      if (activeTable == "totalRegistrations") {
        setUsersData(usersDataOriginal);
      } else if (activeTable == "overView") {
        setOverViewData(usersDataOriginal);
      }
      setUsersData(usersDataOriginal);
      // setEmailListData([]);
      // setTotalEmailListData([])
      // getWebinarCompaignList()
      setShowFilter(false);
      loader("hide");
    }, 500);
  };
  const applyFilter = (e) => {
  e.preventDefault();

    loader("show");

    setTimeout(() => {
      const filteredData = usersDataOriginal.filter((item) => {
        for (const key in appliedFilter) {
          const filterValues = appliedFilter[key];
          if (filterValues.length === 0) {
            continue;
          }
          let isMatch = false;

          if (filterValues.length > 1) {
            // "or" condition
            isMatch = filterValues.some((value) => {
              if (value == "All") return true;
              return item[key] === value;
            });
          } else {
            // "and" condition
            isMatch =
              filterValues[0] == "All" ? true : item[key] === filterValues[0];
          }

          if (!isMatch) {
            return false; // If any condition fails, immediately return false
          }
        }

        return true; // All conditions passed
      });
      if (activeTable == "totalRegistrations") {
        setUsersData(filteredData);
        setOverViewData(null);
      } else if (activeTable == "overView") {
        setOverViewData(filteredData);
        setUsersData(null);
      }
      // setEmailListData([]);
      setFilterObject(appliedFilter);
      // getWebinarCompaignList(appliedFilter);
      setShowFilter(false);
      loader("hide");
    }, 500);
  };
  const handleOnFilterChange = (e, item, index, key, data = []) => {
    // Clone objects to avoid mutation
    let newObj = { ...appliedFilter };
    let newApiFilterObject = { ...apifilterObject };

    // Initialize arrays if they don't exist
    newObj[key] = newObj[key] || [];
    newApiFilterObject[key] = newApiFilterObject[key] || [];

    // Handle checkbox checked
    if (e?.target?.checked) {
      // Special handling for "Attended" and "Registered"
      if (key === "Attended" || key === "Registered" || key === "Post-event views") {
        newObj[key] = [item];
        newApiFilterObject[key] = e?.target?.value;
      } else {
        newObj[key].push(item);
        newApiFilterObject[key].push(e?.target?.value);
      }
    } else {
      // Handle checkbox unchecked
      // Special handling for "Attended" and "Registered"
      if (key === "Attended" || key === "Post-event views") {
        newObj[key] = [];
        newApiFilterObject[key] = [];
      } else {
        const itemIndex = newObj[key].indexOf(item);
        if (itemIndex > -1) {
          newObj[key].splice(itemIndex, 1);
          if (newObj[key].length === 0) {
            delete newObj[key];
          }
        }
        const valueIndex = newApiFilterObject[key].indexOf(e.target.value);
        if (valueIndex > -1) {
          newApiFilterObject[key].splice(valueIndex, 1);
          if (newApiFilterObject[key].length === 0) {
            delete newApiFilterObject[key];
          }
        }
      }
    }

    // Update state
    setAppliedFilter(newObj);
    setApifilterObject(newApiFilterObject);
  };

  useEffect(() => {
    // props.getWebinarEmailData(null);
    // props.getWebinarDraftData(null);
    // props.getWebinarSelectedSmartListData(null);

    function handleOutsideClick(event) {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        filterRef.current &&
        !filterRef.current.contains(event.target)
      ) {
        setShowFilter(false);
      }
    }

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  useEffect(() => {
    // if(!eventIdContext){
    //   handleEventId(localStorageEvent)
    // }
  }, []);

  useEffect(() => {
  if(eventId){  getRegionPieChartStats();
    getOnlineReadersGraph();
    getWebinarCompaignList();}
  }, []);

  const getRegionPieChartStats = async (e) => {
    try {
      let payload = {
        eventId: eventId,
      };
      const res = await postData(
        `${ENDPOINT.WEBINAR_EVENT_REGION_PIECHART_STATS}`,
        payload
      );
      let data = res?.data?.data;
      const regionCounts = {};
      // Iterate over the data and accumulate counts for each region
      if (Object.keys(data)?.length) {
        data?.forEach((entry) => {
          if (regionCounts[entry.region]) {
            regionCounts[entry.region] += entry.count;
          } else {
            regionCounts[entry.region] = entry.count;
          }
        });

        // Convert the object into an array of objects
        const resultArray = Object.keys(regionCounts).map((region) => ({
          name: region,
          y: regionCounts[region],
        }));

        setPieChartData({
          ...pieChartData,
          series: [
            {
              ...pieChartData.series[0],
              data: resultArray,
            },
          ],
        });
      }
    } catch (err) {
      console.log("-err", err);
    }
  };

  const getOnlineReadersGraph = async () => {
    try {
      let body = {
        eventId: eventId,
      };
      const response = await postData(
        ENDPOINT?.WEBINAR_GET_EVENT_ATTENDEES_GRAPH_DATA,
        body
      );
      let data = response?.data?.data;
      const status = data?.slotCount?.some((item) => item?.y != 0);

      if (status == true) {
        setSplineChartData({
          ...splineChartData,
          xAxis: {
            ...splineChartData.xAxis,
            categories: data?.timeSlots,
          },
          series: [
            {
              ...splineChartData.series[0], // Keep other properties of the series unchanged
              data: data?.slotCount,
            },
          ],
        });
      }
    } catch (err) {
      console.log("--err", err);
    }
  };

  const getWebinarCompaignList = async (filter = "") => {
    try {
      loader("show");
      let body = {
        user_id: localStorageUserId,
        event_id: eventId,
        search: "",
        filter: filter,
      };
      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      let response = [];
      await axios
        .post(`/webinar/get_webinar_campaign`, body)
        .then((res) => {
          response = res?.data;
        })
        .catch((err) => {
          loader("hide");
          console.log(err);
        });
      // const response = await postData(ENDPOINT.WEBINAR_EMAIL_COMPAIGN_LIST, body)
      let listData = response?.response?.data?.filter(
        (item) => !item?.subject?.includes("Thank you for registering")
      );
      setEmailListData(listData);
      let updateNewOptions = [];
      listData?.map((data, index) => {
        let valueupdate = JSON.parse(JSON.stringify(options));
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
        updateNewOptions?.push(valueupdate);
      });

      setNewOptions(updateNewOptions);
      loader("hide");
    } catch (err) {
      loader("hide");
      console.log("--err", err);
    }
  };

  const downloadStats = async (e) => {
    try {
      loader("show");
      // Create a new instance of JSZip
      const zip = new JSZip();

      // Make your API request to get the Excel file
      let payload = {
        eventId: eventId,
      };
      const res = await postFormData(
        `${ENDPOINT.WEBINAR_EVENT_STATS}`,
        payload,
        {
          responseType: "blob",
        }
      );
      if (
        res?.data?.type ==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        let excelSheetFileName = eventTitle.replace(/[\s:]+/g, "_");
        zip.file(`${excelSheetFileName}.xlsx`, res?.data);
      }

      // Convert the pie chart element to PNG image
      if (pieChartData?.series?.[0]?.data?.length > 0) {
        const pieChart = document.getElementById("pieChart");
        const pieChartImageDataUrl = await domtoimage.toPng(pieChart, {
          cacheBust: true,
        });

        // Convert the image data URL to a Blob
        const pieChartImageBlob = await fetch(pieChartImageDataUrl).then(
          (res) => res.blob()
        );

        // Add the pie chart image to the zip file
        zip.file("Region_Chart.png", pieChartImageBlob);
      }

      // Convert the online users chart element to PNG image
      if (splineChartData?.series?.[0]?.data?.length > 0) {
        const splineChart = document.getElementById("splineChart");
        const splineChartImageDataUrl = await domtoimage.toPng(splineChart, {
          cacheBust: true,
        });

        // Convert the image data URL to a Blob
        const splineChartImageBlob = await fetch(splineChartImageDataUrl).then(
          (res) => res.blob()
        );

        // Add the online users chart image to the zip file
        zip.file("Online_Users_Chart.png", splineChartImageBlob);
      }
      if (emailListData?.length) {
        for (let i = 0; i < emailListData?.length; i++) {
          const campaignChart = document.getElementById(
            `analytics_campaign_${i}`
          );
          const campaignChartImageDataUrl = await domtoimage.toPng(
            campaignChart,
            { cacheBust: true }
          );

          // Convert the image data URL to a Blob
          const campaignChartImageBlob = await fetch(
            campaignChartImageDataUrl
          ).then((res) => res.blob());

          // Add the online users chart image to the zip file
          zip.file(
            `${emailListData?.[i]?.subject
              ?.trim()
              .replace(/[^\w\s]/g, "")
              .replace(/\s+/g, "_")}_${i}.png`,
            campaignChartImageBlob
          );
        }
      }

      // Generate the zip file asynchronously
      zip.generateAsync({ type: "blob" }).then((content) => {
        // Save the generated zip file using FileSaver.js
        saveAs(content, `${eventTitle.replace(/[\s:]+/g, "_")}.zip`);
      });
      loader("hide");
    } catch (err) {
      console.error("Error downloading stats:", err);
      loader("hide");
    }
  };

  const downloadPopupFun = (e) => {
    setDownloadPopup(true);
  };

  const dropdownClicked = async (flag) => {
    loader("show");

    const body = {
      eventId: eventId,
      type: flag,
    };

    try {
      const response = await postData(
        ENDPOINT.GET_TOTAL_EMAIL_REGISTRATION_USERS,
        body
      );
      const responseData = response?.data?.data || [];
      setAttendedUsers(null);
      switch (flag) {
        case "overView":
          setFilterData(responseData?.filterObject);
          setUsersDataOriginal(responseData?.data);
          setOverViewData(responseData?.data);
          setUsersData([]);
          setSortedCountries(null);
          break;

        case "registeredHcps":
          const newValue = [
            {
              name: "",
              colorByPoint: true,
              data: response?.data?.data?.countryWiseData?.pieChartData || [],
            },
          ];

          const newValueRegion = [
            {
              name: "",
              colorByPoint: true,
              data: response?.data?.data?.regionData?.pieChartData || [],
              drilldown: true, // enable drilldown for this series
            },
          ];


          const newValueRegionEmail = [
            {
              name: "",
              colorByPoint: true,
              data: response?.data?.data?.totalRegistrationsByEmailAndOtherChannels?.pieChartData || [],
              drilldown: true, // enable drilldown for this series
            },
          ];

          setPieOptions({ ...commonPieOptions, series: newValue });
          setPieOptionsRegion({
            ...commonPieOptions,
            series: newValueRegion,
            drilldown: {
              series: response?.data?.data?.regionData?.drilldownData, // set the drilldown data
            },
          });
          setPieOptionsByEmail(
            {
              chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: "pie",
                height: 600,
              },
              title: {
                // text: "Click on the double arrows to see more details",
                text: "",
                align: "left",
                style: {
                  fontSize: "14px",
                },
              },
              exporting: {
                enabled: false,
                sourceWidth: 1600,
                sourceHeight: 1200,
                scale: 1,
               ...menuItemDefinitions,
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
                enabled: false, // Disable the default legend
              },
              plotOptions: {
                pie: {
                  size: "90%",
                  dataLabels: {
                    enabled: true,
                    format: "<b>{point.name}</b>: {point.y} ",
                    style: {
                      fontWeight: "bold",
                      color: "black",
                      textOutline: "none",
                      fontSize: "14px",
                    },
                    distance: 30, // Set distance from pie slice
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
            
        
            series: newValueRegionEmail,
            drilldown: {
              series: response?.data?.data?.totalRegistrationsByEmailAndOtherChannels?.drillDownData, // set the drilldown data
            },
      });
          setSortedCountries(response?.data?.data);
          setUsersData([]);
          setOverViewData([]);
          break;

        default:
          setFilterData(responseData?.filterObject);
          setUsersData(responseData?.registrationData);
          setUsersDataOriginal(responseData?.registrationData);
          setOverViewData([]);
          setSortedCountries(null);

          break;
      }
      setActiveTable(flag);
      setAppliedFilter({});

      loader("hide");
    } catch (error) {
      console.error("Error fetching data:", error);
      loader("hide");
    }
  };
  useEffect(() => {
    if (totalRegistrationRef?.current) {
      totalRegistrationRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (registeredGraphRef?.current) {
      registeredGraphRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (overviewTableRef?.current) {
      overviewTableRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (attendedUsersRef?.current) {
      attendedUsersRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [usersData, sortedCountries, overViewData, attendedUsers]);

  const downloadExcel = (data, name) => {
    loader("show")
  
    setTimeout(()=>{ try {
      if (data?.length == 0) {
        toast.warning("No data found");
        return;
      }
      data = data?.map((item, index) => {
        let finalData = {};

        finalData.Name = item?.name ? item?.name.trim() : "Anonymous";

        finalData.Email = item?.email ? item?.email.trim() : "N/A";
        finalData.Region = item?.region ? item?.region.trim() : "N/A";
        finalData.Country = item?.country ? item?.country.trim() : "N/A";
        finalData.Registered = item?.register_time
          ? item?.register_time.trim()
          : "N/A";
        if (item?.last_email != undefined) {
          finalData["Last Email"] = item?.last_email
            ? item?.last_email.trim()
            : "N/A";
        }
        if (item?.hcp_status != undefined) {
          finalData["User Type"] = item?.hcp_status
            ? item?.hcp_status.trim()
            : "N/A";
        }
        if (item?.Attended != undefined) {
          finalData["Attended"] = item?.Attended
            ? item?.Attended.trim()
            : "N/A";
        }
        return finalData;
      });
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });
      saveAs(blob, `${name}_data.xlsx`);
    } catch (error) {
      console.error(
        "An error occurred while downloading the Excel file:",
        error
      );
    }  loader("hide")
  
  }  ,500)
  };
  const onHandleDisplayResultChange = () => {
    setWhichTypeGraph(!whichTypeGraph);
  };

  const handleAttendedUserCountryWise = async () => {
    loader("show");

    const body = {
      eventId: eventId,
    };

    try {
      const response = await postData(ENDPOINT.GET_ATTENDED_DATA, body);
      const responseData = response?.data?.data || [];
      setUsersData([]);
      setOverViewData([]);
      setSortedCountries(null);
      setAttendedUsers(responseData);
      setActiveTable(null);

      loader("hide");
    } catch (error) {
      console.error("Error fetching data:", error);
      loader("hide");
    }
  };
  const renderTabsAndCharts = (data) => {
    return Object.keys(data).map((region) => {
      if (region == "totalRegistrationCount") return null;
      const regionData = data[region];
      const countries = regionData.map((item) => item.country);
      const registeredUsers = regionData.map((item) => item.registeredUsers);
      const attendedUsers = regionData.map((item) => item.attendedUsers);

      return (
        <Tab key={region} eventKey={region.toLowerCase()} title={region}>
          {attendedUsers?.length > 0 || registeredUsers?.length > 0 ? (
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                chart: {
                  marginTop: 40,
                  type: "bar",
                  events: {
                    load: function () {

                      let categoryHeight = 50;
                      this.update({
                        chart: {
                          height:
                            categoryHeight * countries.length +
                            (this.chartHeight - this.plotHeight),
                        },
                      });
                    },
                  },
                },
                exporting: {
                  enabled: true,
                  sourceWidth: 1600,
                  sourceHeight: 1200,
                  chartOptions: {
                    title: {
                      text: "", // Remove title from exported image
                    },
                  },
                  filename: "Total_Registration", // Set filename for exported image
                ...menuItemDefinitions,
                },
                title: {
                  text: "",
                },
                xAxis: {
                  categories: countries,
                  labels: {
                    style: {
                      color: "#70899E",
                      fontSize: "12px",
                      fontWeight: "500",
                    },
                  },
                },
                credits: {
                  enabled: false,
                },
                // exporting: {
                //   enabled:false,
                //   showHighchart: true,
                //   showTable: false,
                //   tableCaption: "",
                // },
                yAxis: {
                  min: 0,
                  title: {
                    text: "",
                  },
                  labels: {
                    style: {
                      color: "#70899E",
                      fontSize: "13px",
                    },
                  },
                  stackLabels: {
                    enabled: true,
                    style: {
                      fontWeight: "bold",
                      color: "#70899E",
                      fontSize: "13px",
                    },
                  },
                  allowDecimals: false,
                },
                plotOptions: {
                  bar: {
                    dataLabels: {
                      enabled: true,
                    },
                  },
                },

                legend: {
                  enabled: true,
                  itemStyle: {
                    color: "#97B6CF", // Color for legend items
                    fontSize: "15px", // Font size for legend items
                  },
                },

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
          ) : (
            <div className="no_found">
              <p>No Data Found</p>
            </div>
          )}
        </Tab>
      );
    });
  };
  const handleDownload =  (format, ref,defaultName = "registered_attended_stats") => {
    // Accessing Highcharts chart object using ref
    let chart = ref.current && ref.current.chart;
    console.log(chart,"chartchart");

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

  const handleSort = (key) => {
    setSortBy(key);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortData = (data, key, order) => {
    return data.sort((a, b) => {
      let valueA = a[key];
      let valueB = b[key];
      if (key == "register_time") {
        valueA = new Date(a[key]);
        valueB = new Date(b[key]);
        return order === "asc" ? valueA - valueB : valueB - valueA;
      }

      // Handle different data types (numbers, strings)
      if (typeof valueA === "number" && typeof valueB === "number") {
        return order === "asc" ? valueA - valueB : valueB - valueA;
      } else {
        return order === "asc"
          ? valueA?.localeCompare(valueB) // Handle string sorting with locale awareness
          : valueB?.localeCompare(valueA);
      }
    });
  };

  return (
    <>
    { eventId && <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <Row>
            <div className="top-header analytics_header sticky">
              <div className="page-title d-flex flex-column align-items-start">
                <h2 title={eventData?.title}>{eventData?.title}</h2>
                <p>{eventData?.formattedEventStartDateTime}</p>
              </div>

              {eventStatus == -1 && eventId >= 402 ? (
                <Button
                  title="Download Site Engagements"
                  className="download filled"
                  onClick={(e) => downloadPopupFun(e)}
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
              ) : (
                ""
              )}
            </div>
            <div className="webinar-analytics-layout rd-analytics-content">
              <Row>
                <Col md={9}>
                  <AnalyticsRegistration
                    dropdownClicked={dropdownClicked}
                    setEventData={setEventData}
                  />
                </Col>
                <Col md={3}>
                  <AnalyticsOverview
                    dropdownClicked={dropdownClicked}
                    setEventData={setEventData}
                  />
                </Col>
                <Col md={5} style={{ margin: "40px 0 0" }}>
                  <AnalyticsEmail />
                </Col>
                <Col md={7} style={{ margin: "40px 0 0" }}>
                  <AnalyticsLiveStream
                    handleAttendedUserCountryWise={
                      handleAttendedUserCountryWise
                    }
                  />
                </Col>
              </Row>
              {/* <Row>
                <Col md={5} style={{ margin: "40px 0 0" }}>
                  <AnalyticsEmail />
                </Col>
                <Col md={7} style={{ margin: "40px 0 0" }}>
                  <AnalyticsLiveStream handleAttendedUserCountryWise={handleAttendedUserCountryWise} />
                </Col>
              </Row> */}
              {activeTable == "totalRegistrations" && (
                <div className="rd-full-explain" ref={totalRegistrationRef}>
                  <div className="rd-section-title">
                    <h6>Registrations</h6>
                  </div>
                  {/* <div className="rd-training-block">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="rd-training-block-left">
                      <h4>Total Registrations |{" "}<span>{usersData?.length || 0}</span></h4>
                    </div> */}
                  <div className="rd-training-block">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="rd-training-block-left">
                        <h4>
                          Total Registrations |{" "}
                          <span>{usersDataOriginal?.length || 0}</span>
                        </h4>
                      </div>
                      <div className="rd-training-block-right d-flex align-items-center">
                        <div className="filter-btn">
                          <button
                            ref={buttonRef}
                            className={
                              Object.keys(apifilterObject)?.length
                                ? "btn btn-secondary dropdown filter_applied"
                                : "btn btn-secondary dropdown"
                            }
                            type="button"
                            id="dropdownMenuButton2"
                            onClick={() =>
                              setShowFilter((showFilter) => !showFilter)
                            }
                          >
                            Filter By
                            {showFilter ? (
                              <svg
                                className="close-arrow"
                                width="13"
                                height="12"
                                viewBox="0 0 13 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                {" "}
                                <rect
                                  width="2.09896"
                                  height="15.1911"
                                  rx="1.04948"
                                  transform="matrix(0.720074 0.693897 -0.720074 0.693897 11.0977 0)"
                                  fill="#0066BE"
                                />{" "}
                                <rect
                                  width="2.09896"
                                  height="15.1911"
                                  rx="1.04948"
                                  transform="matrix(0.720074 -0.693897 0.720074 0.693897 0 1.45898)"
                                  fill="#0066BE"
                                />{" "}
                              </svg>
                            ) : (
                              <svg
                                className="filter-arrow"
                                width="16"
                                height="14"
                                viewBox="0 0 16 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0.615385 2.46154H3.07692C3.07692 3.14031 3.62892 3.69231 4.30769 3.69231H5.53846C6.21723 3.69231 6.76923 3.14031 6.76923 2.46154H15.3846C15.7243 2.46154 16 2.18646 16 1.84615C16 1.50585 15.7243 1.23077 15.3846 1.23077H6.76923C6.76923 0.552 6.21723 0 5.53846 0H4.30769C3.62892 0 3.07692 0.552 3.07692 1.23077H0.615385C0.275692 1.23077 0 1.50585 0 1.84615C0 2.18646 0.275692 2.46154 0.615385 2.46154Z"
                                  fill="#97B6CF"
                                ></path>
                                <path
                                  d="M15.3846 6.15362H11.6923C11.6923 5.47485 11.1403 4.92285 10.4615 4.92285H9.23077C8.552 4.92285 8 5.47485 8 6.15362H0.615385C0.275692 6.15362 0 6.4287 0 6.76901C0 7.10931 0.275692 7.38439 0.615385 7.38439H8C8 8.06316 8.552 8.61516 9.23077 8.61516H10.4615C11.1403 8.61516 11.6923 8.06316 11.6923 7.38439H15.3846C15.7243 7.38439 16 7.10931 16 6.76901C16 6.4287 15.7243 6.15362 15.3846 6.15362Z"
                                  fill="#97B6CF"
                                ></path>
                                <path
                                  d="M15.3846 11.077H6.76923C6.76923 10.3982 6.21723 9.84619 5.53846 9.84619H4.30769C3.62892 9.84619 3.07692 10.3982 3.07692 11.077H0.615385C0.275692 11.077 0 11.352 0 11.6923C0 12.0327 0.275692 12.3077 0.615385 12.3077H3.07692C3.07692 12.9865 3.62892 13.5385 4.30769 13.5385H5.53846C6.21723 13.5385 6.76923 12.9865 6.76923 12.3077H15.3846C15.7243 12.3077 16 12.0327 16 11.6923C16 11.352 15.7243 11.077 15.3846 11.077Z"
                                  fill="#97B6CF"
                                ></path>
                              </svg>
                            )}
                          </button>
                          {showFilter && (
                            <div
                              ref={filterRef}
                              className="dropdown-menu filter-options"
                              aria-labelledby="dropdownMenuButton2"
                            >
                              <h4>Filter By</h4>
                              <Accordion defaultActiveKey="0" flush>
                                {Object.keys(filterdata)?.map(function (
                                  key,
                                  index
                                ) {
                                  return (
                                    <>
                                      {filterdata[key]?.length > 0 ? (
                                        <Accordion.Item
                                          className={
                                            key == "role"
                                              ? "card upper"
                                              : "card"
                                          }
                                          eventKey={index}
                                        >
                                          <Accordion.Header className="card-header">
                                            {key}
                                          </Accordion.Header>
                                          <Accordion.Body className="card-body">
                                            <ul>
                                              {filterdata[key]?.length
                                                ? filterdata[key]?.map(
                                                    (item, index) => (
                                                      <li key={index}>
                                                        {item != "" ? (
                                                          <label className="select-multiple-option">
                                                            <input
                                                              type={"checkbox"}
                                                              id={`custom-checkbox-tags-${index}`}
                                                              value={
                                                                typeof item ==
                                                                "object"
                                                                  ? item?.title
                                                                  : item
                                                              }
                                                              name={key}
                                                              checked={
                                                                typeof item ==
                                                                "object"
                                                                  ? appliedFilter[
                                                                      key
                                                                    ]?.includes(
                                                                      item.id
                                                                    )
                                                                    ? true
                                                                    : false
                                                                  : appliedFilter[
                                                                      key
                                                                    ]?.includes(
                                                                      item
                                                                    )
                                                                  ? true
                                                                  : false
                                                              }
                                                              onChange={(e) =>
                                                                handleOnFilterChange(
                                                                  e,
                                                                  typeof item ==
                                                                    "object"
                                                                    ? item.id
                                                                    : item,
                                                                  index,
                                                                  key,
                                                                  [
                                                                    ...filterdata[
                                                                      key
                                                                    ],
                                                                  ]
                                                                )
                                                              }
                                                            />
                                                            {typeof item ==
                                                            "object"
                                                              ? item?.title
                                                              : item}
                                                            <span className="checkmark"></span>
                                                          </label>
                                                        ) : null}
                                                      </li>
                                                    )
                                                  )
                                                : null}
                                            </ul>
                                          </Accordion.Body>
                                        </Accordion.Item>
                                      ) : null}
                                    </>
                                  );
                                })}
                              </Accordion>

                              <div className="filter-footer">
                                <Button
                                  className="btn btn-primary btn-bordered"
                                  onClick={(e) => customLoader(clearFilter,e)}
                                >
                                  Clear
                                </Button>
                                <Button
                                  className="btn btn-primary btn-filled"
                                  onClick={(e) => customLoader(applyFilter,e)}
                                >
                                  Apply
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                        <Button
                          title="Download stats"
                          onClick={() =>
                            downloadExcel(usersData, "Total Registrations")
                          }
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.3335 13.125C18.1125 13.125 17.9005 13.2128 17.7442 13.3691C17.588 13.5254 17.5002 13.7373 17.5002 13.9583V15.1775C17.4995 15.7933 17.2546 16.3836 16.8192 16.819C16.3838 17.2544 15.7934 17.4993 15.1777 17.5H4.82266C4.2069 17.4993 3.61655 17.2544 3.18114 16.819C2.74573 16.3836 2.50082 15.7933 2.50016 15.1775V13.9583C2.50016 13.7373 2.41237 13.5254 2.25609 13.3691C2.0998 13.2128 1.88784 13.125 1.66683 13.125C1.44582 13.125 1.23385 13.2128 1.07757 13.3691C0.921293 13.5254 0.833496 13.7373 0.833496 13.9583V15.1775C0.834599 16.2351 1.25524 17.2492 2.00311 17.997C2.75099 18.7449 3.76501 19.1656 4.82266 19.1667H15.1777C16.2353 19.1656 17.2493 18.7449 17.9972 17.997C18.7451 17.2492 19.1657 16.2351 19.1668 15.1775V13.9583C19.1668 13.7373 19.079 13.5254 18.9228 13.3691C18.7665 13.2128 18.5545 13.125 18.3335 13.125Z"
                              fill="#0066BE"
                            ></path>
                            <path
                              d="M14.7456 9.20249C14.5893 9.04626 14.3774 8.9585 14.1564 8.9585C13.9355 8.9585 13.7235 9.04626 13.5673 9.20249L10.8231 11.9467L10.8333 1.77108C10.8333 1.55006 10.7455 1.3381 10.5893 1.18182C10.433 1.02554 10.221 0.937744 10 0.937744C9.77899 0.937744 9.56702 1.02554 9.41074 1.18182C9.25446 1.3381 9.16667 1.55006 9.16667 1.77108L9.15643 11.9467L6.41226 9.20249C6.25509 9.05069 6.04459 8.96669 5.82609 8.96859C5.60759 8.97049 5.39858 9.05813 5.24408 9.21264C5.08957 9.36715 5.00193 9.57615 5.00003 9.79465C4.99813 10.0131 5.08213 10.2236 5.23393 10.3808L9.40059 14.5475C9.478 14.6251 9.56996 14.6867 9.6712 14.7287C9.77245 14.7707 9.88098 14.7923 9.99059 14.7923C10.1002 14.7923 10.2087 14.7707 10.31 14.7287C10.4112 14.6867 10.5032 14.6251 10.5806 14.5475L14.7473 10.3808C14.9033 10.2243 14.9907 10.0123 14.9904 9.79131C14.9901 9.57034 14.902 9.35854 14.7456 9.20249Z"
                              fill="#0066BE"
                            ></path>
                          </svg>
                        </Button>
                      </div>
                    </div>
                    <div className="table-registered">
                      <Table
                        className="fold-table registration-view"
                        id="individual_completion"
                      >
                        <thead className="sticky-header">
                          <tr>
                            <th scope="col" className="sort_option">
                              <span onClick={() => handleSort("name")}>
                                Name
                                <button
                                  className={`event_sort_btn ${
                                    sortBy == "name"
                                      ? sortOrder == "asc"
                                        ? "svg_asc"
                                        : "svg_active"
                                      : ""
                                  }`}
                                  onClick={() => handleSort("name")}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="8"
                                    height="8"
                                    viewBox="0 0 8 8"
                                    fill="none"
                                  >
                                    <g clip-path="url(#clip0_3722_6611)">
                                      <path
                                        d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                        fill="#97B6CF"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_3722_6611">
                                        <rect
                                          width="8"
                                          height="8"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </button>
                              </span>
                            </th>
                            <th scope="col" className="sort_option">
                              <span onClick={() => handleSort("email")}>
                                Email
                                <button
                                  className={`event_sort_btn ${
                                    sortBy == "email"
                                      ? sortOrder == "asc"
                                        ? "svg_asc"
                                        : "svg_active"
                                      : ""
                                  }`}
                                  onClick={() => handleSort("email")}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="8"
                                    height="8"
                                    viewBox="0 0 8 8"
                                    fill="none"
                                  >
                                    <g clip-path="url(#clip0_3722_6611)">
                                      <path
                                        d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                        fill="#97B6CF"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_3722_6611">
                                        <rect
                                          width="8"
                                          height="8"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </button>
                              </span>
                            </th>
                            <th scope="col" className="sort_option">
                              <span onClick={() => handleSort("province")}>
                                Region
                                <button
                                  className={`event_sort_btn ${
                                    sortBy == "province"
                                      ? sortOrder == "asc"
                                        ? "svg_asc"
                                        : "svg_active"
                                      : ""
                                  }`}
                                  onClick={() => handleSort("province")}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="8"
                                    height="8"
                                    viewBox="0 0 8 8"
                                    fill="none"
                                  >
                                    <g clip-path="url(#clip0_3722_6611)">
                                      <path
                                        d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                        fill="#97B6CF"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_3722_6611">
                                        <rect
                                          width="8"
                                          height="8"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </button>
                              </span>
                            </th>
                            <th scope="col" className="sort_option">
                              <span onClick={() => handleSort("country")}>
                                Country{" "}
                                <button
                                  className={`event_sort_btn ${
                                    sortBy == "country"
                                      ? sortOrder == "asc"
                                        ? "svg_asc"
                                        : "svg_active"
                                      : ""
                                  }`}
                                  onClick={() => handleSort("country")}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="8"
                                    height="8"
                                    viewBox="0 0 8 8"
                                    fill="none"
                                  >
                                    <g clip-path="url(#clip0_3722_6611)">
                                      <path
                                        d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                        fill="#97B6CF"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_3722_6611">
                                        <rect
                                          width="8"
                                          height="8"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </button>
                              </span>
                            </th>
                            <th scope="col" className="sort_option">
                              <span onClick={() => handleSort("register_time")}>
                                Registered{" "}
                                <button
                                  className={`event_sort_btn ${
                                    sortBy == "register_time"
                                      ? sortOrder == "asc"
                                        ? "svg_asc"
                                        : "svg_active"
                                      : ""
                                  }`}
                                  onClick={() => handleSort("register_time")}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="8"
                                    height="8"
                                    viewBox="0 0 8 8"
                                    fill="none"
                                  >
                                    <g clip-path="url(#clip0_3722_6611)">
                                      <path
                                        d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                        fill="#97B6CF"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_3722_6611">
                                        <rect
                                          width="8"
                                          height="8"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </button>
                              </span>
                            </th>
                            <th scope="col" className="sort_option">
                              <span onClick={() => handleSort("last_email")}>
                                Last Email{" "}
                                <button
                                  className={`event_sort_btn ${
                                    sortBy == "last_email"
                                      ? sortOrder == "asc"
                                        ? "svg_asc"
                                        : "svg_active"
                                      : ""
                                  }`}
                                  onClick={() => handleSort("last_email")}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="8"
                                    height="8"
                                    viewBox="0 0 8 8"
                                    fill="none"
                                  >
                                    <g clip-path="url(#clip0_3722_6611)">
                                      <path
                                        d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                        fill="#97B6CF"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_3722_6611">
                                        <rect
                                          width="8"
                                          height="8"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </button>
                              </span>
                            </th>
                            <th scope="col" className="sort_option">
                              <span onClick={() => handleSort("hcp_status")}>
                                User Type{" "}
                                <button
                                  className={`event_sort_btn ${
                                    sortBy == "hcp_status"
                                      ? sortOrder == "asc"
                                        ? "svg_asc"
                                        : "svg_active"
                                      : ""
                                  }`}
                                  onClick={() => handleSort("hcp_status")}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="8"
                                    height="8"
                                    viewBox="0 0 8 8"
                                    fill="none"
                                  >
                                    <g clip-path="url(#clip0_3722_6611)">
                                      <path
                                        d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                        fill="#97B6CF"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_3722_6611">
                                        <rect
                                          width="8"
                                          height="8"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </button>
                              </span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {usersData?.length ? (
                            // usersData.map((user, index) => (
                            sortData(usersData, sortBy, sortOrder).map(
                              (user, index) => (
                                <>
                                  <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.province}</td>
                                    <td>{user.country}</td>
                                    <td className="green">
                                      {user.register_time}
                                    </td>
                                    <td>{user.last_email}</td>
                                    <td>{user.hcp_status}</td>
                                  </tr>
                                  <tr className="blank">
                                    <td colSpan="7">&nbsp;</td>
                                  </tr>
                                </>
                              )
                            )
                          ) : (
                            <tr>
                              <td colSpan="7">
                                <div className="no_found">
                                  <p>No Data Found</p>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                  {/* </div>
                </div> */}
                </div>
              )}

              {/* HCP registered */}
              {sortedCountries && (
                <div className="rd-full-explain" ref={registeredGraphRef}>
                  <div className="rd-section-title">
                    <h6>Registrations</h6>
                  </div>
                  <div className="rd-training-block">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="rd-training-block-left">
                        <h4>
                          Registered HCPs According to Country |{" "}
                          <span>{sortedCountries?.totalRegistrationCount}</span>
                        </h4>
                      </div>
                      <div className="rd-training-block-right d-flex align-items-center">
                        <div className="switch6">
                          <label className="switch6-light">
                            <input
                              type="checkbox"
                              // ={graphType == "pie" ? true : false}
                              // onChange={onHandleDisplayResultChange}
                              checked={whichTypeGraph} 

                              onChange={() => {
                                loader("show");

                                setTimeout(() => {
                                  setWhichTypeGraph(!whichTypeGraph);
                                  loader("hide");
                                }, 500);
                              }}
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
                                  whichTypeGraph == 0
                                    ? countryBarRef
                                    : countryPieRef
                                )
                              }
                            >
                              Download PNG
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                handleDownload(
                                  "JPEG",
                                  whichTypeGraph == 0
                                    ? countryBarRef
                                    : countryPieRef
                                )
                              }
                            >
                              Download JPEG
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                handleDownload(
                                  "PDF",
                                  whichTypeGraph == 0
                                    ? countryBarRef
                                    : countryPieRef
                                )
                              }
                            >
                              Download PDF
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                handleDownload(
                                  "SVG",
                                  whichTypeGraph == 0
                                    ? countryBarRef
                                    : countryPieRef
                                )
                              }
                            >
                              Download SVG
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        {/* <Button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="6"
                            height="24"
                            viewBox="0 0 6 24"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3ZM6 12C6 13.6569 4.65685 15 3 15C1.34315 15 0 13.6569 0 12C0 10.3431 1.34315 9 3 9C4.65685 9 6 10.3431 6 12ZM3 24C4.65685 24 6 22.6569 6 21C6 19.3431 4.65685 18 3 18C1.34315 18 0 19.3431 0 21C0 22.6569 1.34315 24 3 24Z"
                              fill="#0066BE"
                            />
                          </svg>
                        </Button> */}
                      </div>
                    </div>
                    <div className="graph-view">
                      <div className="graph-view-smaller">
                        {whichTypeGraph == 0 ? (
                          <HighchartsReact
                            key={"bar-country"}
                            ref={countryBarRef}
                            highcharts={Highcharts}
                            options={{
                              chart: {
                                marginTop: 50,
                                marginBottom: 50,
                                type: "bar",
                                events: {
                                  load: function () {
                                    let categoryHeight = 50;
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
                                text: "",
                              },
                              xAxis: {
                                categories:
                                  sortedCountries?.countryWiseData
                                    ?.categoriesData,
                                allowDecimals: false,
                              },
                              credits: {
                                enabled: false,
                              },
                              exporting: {
                           
                                enabled: false,
                                showHighchart: true,
                                showTable: false,
                                tableCaption: "",
                              },
                              // legend: {
                              //   reversed: true,
                              //   align: "center",
                              //   verticalAlign: "top",
                              //   floating: true,
                              //   x: 0,
                              //   y: 50,
                              // },
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
                                        Highcharts.defaultOptions.title.style
                                          .color) ||
                                      "gray",
                                  },
                                },
                                allowDecimals: false,
                              },
                              plotOptions: {
                                bar: {
                                  dataLabels: {
                                    enabled: true,
                                  },
                                  series: {
                                    pointWidth: 30,
                                  },
                                },
                              },
                              legend: {
                                enabled: false,
                              },
                              series: [
                                {
                                  // name: title,
                                  data: sortedCountries?.countryWiseData
                                    ?.seriesData,
                                },
                              ],
                            }}
                          />
                        ) : (
                          <HighchartsReact
                            key={"pie"}
                            ref={countryPieRef}
                            highcharts={Highcharts}
                            options={pieOptions}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {sortedCountries && (
                <div className="rd-full-explain">
                  <div className="rd-section-title">
                    <h6>Registrations</h6>
                  </div>
                  <div className="rd-training-block">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="rd-training-block-left">
                        <h4>
                          Registered HCPs According to Region |{" "}
                          <span>{sortedCountries?.totalRegistrationCount}</span>
                        </h4>
                      </div>
                      <div className="rd-training-block-right d-flex align-items-center">
                        <div className="switch6">
                          <label className="switch6-light">
                            <input
                              type="checkbox"
                              checked={whichTypeGraphRegion} 

                              // ={graphType == "pie" ? true : false}
                              onChange={() => {
                                loader("show");

                                
                                setTimeout(() => {
                                  setWhichTypeGraphRegion(
                                    !whichTypeGraphRegion
                                  );
                                  loader("hide");
                                }, 500);

                              }}
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
                                  whichTypeGraphRegion == 0
                                    ? regionBarRef
                                    : regionPieRef
                                )
                              }
                            >
                              Download PNG
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                handleDownload(
                                  "JPEG",
                                  whichTypeGraphRegion == 0
                                    ? regionBarRef
                                    : regionPieRef
                                )
                              }
                            >
                              Download JPEG
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                handleDownload(
                                  "PDF",
                                  whichTypeGraphRegion == 0
                                    ? regionBarRef
                                    : regionPieRef
                                )
                              }
                            >
                              Download PDF
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                handleDownload(
                                  "SVG",
                                  whichTypeGraphRegion == 0
                                    ? regionBarRef
                                    : regionPieRef
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
                        {whichTypeGraphRegion == 0 ? (
                          <HighchartsReact
                            key={"bar-region"}
                            ref={regionBarRef}
                            highcharts={Highcharts}
                            options={{
                              chart: {
                                marginTop: 50,
                                marginBottom: 50,
                                type: "bar",
                                events: {
                                  load: function () {
                                    let categoryHeight = 50;
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
                                text: "",
                              },
                              xAxis: {
                                categories:
                                  sortedCountries?.regionData
                                    ?.barChartCategories,
                                allowDecimals: false,
                              },
                              credits: {
                                enabled: false,
                              },
                              exporting: {
                                // sourceWidth: 1600,
                                // sourceHeight: 1200,
                                // sourceWidth: 1100,
                                enabled: false,
                                showHighchart: true,
                                showTable: false,
                                tableCaption: "",
                              },
                              // legend: {
                              //   reversed: true,
                              //   align: "center",
                              //   verticalAlign: "top",
                              //   floating: true,
                              //   x: 0,
                              //   y: 50,
                              // },
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
                                        Highcharts.defaultOptions.title.style
                                          .color) ||
                                      "gray",
                                  },
                                },
                                allowDecimals: false,
                              },
                              plotOptions: {
                                bar: {
                                  dataLabels: {
                                    enabled: true,
                                  },
                                },
                              },
                              legend: {
                                enabled: false,
                              },
                              series: [
                                {
                                  // name: title,
                                  data: sortedCountries?.regionData
                                    ?.barChartSeries,
                                  color: "#00D4C0",
                                },
                              ],
                            }}
                          />
                        ) : (
                          <HighchartsReact
                            key={"pie"}
                            ref={regionPieRef}
                            highcharts={Highcharts}
                            options={pieOptionsRegion}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}


{sortedCountries && (
                <div className="rd-full-explain">
                  <div className="rd-section-title">
                    <h6>Registrations</h6>
                  </div>
                  <div className="rd-training-block">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="rd-training-block-left">
                      <h4>
                        Total Registered HCP By Email And Other Channels{" "}
                          {/* <span>{sortedCountries?.totalRegistrationCount}</span> */}
                        </h4>
                      </div>
                      <div className="rd-training-block-right d-flex align-items-center">
                        <div className="switch6">
                          <label className="switch6-light">
                            <input
                              type="checkbox"
                              checked={whichTypeGraphByEmail} 
                              // ={graphType == "pie" ? true : false}
                              onChange={() => {
                                loader("show");

                                setTimeout(() => {
                                  setWhichTypeGraphRegionByEmail(
                                    !whichTypeGraphByEmail
                                  );
                                  loader("hide");
                                }, 500);
                                
                              }}
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
                                  whichTypeGraphByEmail == 0
                                    ? regionBarEmailRef
                                    : regionPieEmailRef,"Total_Registered_HCP_By_Email_And_Other_Channels "
                                )
                              }
                            >
                              Download PNG
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                handleDownload(
                                  "JPEG",
                                  whichTypeGraphByEmail == 0
                                  ? regionBarEmailRef
                                  : regionPieEmailRef,"Total_Registered_HCP_By_Email_And_Other_Channels "
                                )
                              }
                            >
                              Download JPEG
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                handleDownload(
                                  "PDF",
                                  whichTypeGraphByEmail == 0
                                  ? regionBarEmailRef
                                  : regionPieEmailRef,"Total_Registered_HCP_By_Email_And_Other_Channels "
                                )
                              }
                            >
                              Download PDF
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                handleDownload(
                                  "SVG",
                                  whichTypeGraphByEmail == 0
                                  ? regionBarEmailRef
                                  : regionPieEmailRef,"Total_Registered_HCP_By_Email_And_Other_Channels "
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
                        {whichTypeGraphByEmail == 0 ? (
                          <HighchartsReact
                            key={"bar-by-email"}
                            ref={regionBarEmailRef}
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
                                  load: function() {
                                    let categoryHeight = 35;
                                   console.log(this);
                                    this.update({
                                      chart: {
                                        height: categoryHeight * this.pointCount + (this.chartHeight - this.plotHeight)
                                      }
                                    })
                                  },
                                  drillup : function(event) {
                                
                                    this.update({
                                      chart: {
                                        height: 135
                                      }
                                    })
                                  },
                                  
                                drilldown: function(event) {
                                  let categoryHeight = 35;
                                 
                                  this.update({
                                    chart: {
                                      height: categoryHeight * event.seriesOptions.data.length ||0 + (this.chartHeight - this.plotHeight)
                                    }
                                  })
                      }
                                }
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
                                  text: "Total Registered HCP By Email And Other Channels",
                                },
                              },
                              legend: {
                                enabled: false,
                              },
                              plotOptions: {
                                series: {
                                  // pointWidth: 30,
                                  groupPadding: 0.1,
                                  borderWidth: "0",
                                  pointWidth: 25,
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
                                // sourceWidth: 1600,
                                // sourceHeight: 1100,
                                enabled: false,
                                showHighchart: true,
                                showTable: false,
                                tableCaption: "",
                              },
                              series: [
                                {
                                  name: "",
                                  colorByPoint: true,
                                  data:sortedCountries?.totalRegistrationsByEmailAndOtherChannels
                                  ?.pieChartData?.map(
                                      (data) => ({
                                        y: data.y,
                                        color: data.color,
                                        drilldown: data?.drilldown,
                                        name: data?.name,
                                      })
                                    ) || [],
                                },
                              ],
                              drilldown: {
                                series: sortedCountries?.totalRegistrationsByEmailAndOtherChannels
                                    ?.drillDownData?.map(
                                    (drilldownItem) => ({
                                      id: drilldownItem.id,
                                      name: drilldownItem.id,
                                      data: drilldownItem.data.map(
                                        (item) => ({
                                          name: item[0], // Country name
                                          y: item[1], // Count
                                        })
                                      ),
                                    })
                                  ) || [],
                              },
                            }}
                          />
                        ) : (
                          <HighchartsReact
                            key={"pie-by-email"}
                            ref={regionPieEmailRef}
                            highcharts={Highcharts}
                            options={pieOptionsByEmail}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* HCP registered */}
              {/* Registered & attended HCPs According to Region */}
              {attendedUsers && (
                <div className="rd-full-explain" ref={attendedUsersRef}>
                  <div className="rd-section-title">
                    <h6>Registrations</h6>
                  </div>
                  <div className="rd-training-block">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="rd-training-block-left">
                        <h4>
                          Registered & attended HCPs According to Region

                        </h4>
                      </div>
          
                    </div>
                    <div className="country_tabs">
                      <Tabs
                        defaultActiveKey="african group 1"
                        className=""
                        fill
                      >
                        {renderTabsAndCharts(attendedUsers)}
                      </Tabs>
                    </div>
                  </div>
                </div>
              )}
              {/* Registered & attended HCPs According to Region */}
              {/*Overview */}
              {activeTable === "overView" && (
                <div className="rd-full-explain" ref={overviewTableRef}>
                  <div className="rd-section-title">
                    <h6>Overview</h6>
                  </div>
                  <div className="rd-training-block">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="rd-training-block-left">
                        <h4>Overview</h4>
                      </div>
                      <div className="rd-training-block-right d-flex align-items-center">
                        <div className="filter-btn">
                          <button
                            ref={buttonRef}
                            className={
                              Object.keys(apifilterObject)?.length
                                ? "btn btn-secondary dropdown filter_applied"
                                : "btn btn-secondary dropdown"
                            }
                            type="button"
                            id="dropdownMenuButton2"
                            onClick={() =>
                              setShowFilter((showFilter) => !showFilter)
                            }
                          >
                            Filter By
                            {showFilter ? (
                              <svg
                                className="close-arrow"
                                width="13"
                                height="12"
                                viewBox="0 0 13 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  width="2.09896"
                                  height="15.1911"
                                  rx="1.04948"
                                  transform="matrix(0.720074 0.693897 -0.720074 0.693897 11.0977 0)"
                                  fill="#0066BE"
                                />
                                <rect
                                  width="2.09896"
                                  height="15.1911"
                                  rx="1.04948"
                                  transform="matrix(0.720074 -0.693897 0.720074 0.693897 0 1.45898)"
                                  fill="#0066BE"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="filter-arrow"
                                width="16"
                                height="14"
                                viewBox="0 0 16 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0.615385 2.46154H3.07692C3.07692 3.14031 3.62892 3.69231 4.30769 3.69231H5.53846C6.21723 3.69231 6.76923 3.14031 6.76923 2.46154H15.3846C15.7243 2.46154 16 2.18646 16 1.84615C16 1.50585 15.7243 1.23077 15.3846 1.23077H6.76923C6.76923 0.552 6.21723 0 5.53846 0H4.30769C3.62892 0 3.07692 0.552 3.07692 1.23077H0.615385C0.275692 1.23077 0 1.50585 0 1.84615C0 2.18646 0.275692 2.46154 0.615385 2.46154Z"
                                  fill="#97B6CF"
                                ></path>
                                <path
                                  d="M15.3846 6.15362H11.6923C11.6923 5.47485 11.1403 4.92285 10.4615 4.92285H9.23077C8.552 4.92285 8 5.47485 8 6.15362H0.615385C0.275692 6.15362 0 6.4287 0 6.76901C0 7.10931 0.275692 7.38439 0.615385 7.38439H8C8 8.06316 8.552 8.61516 9.23077 8.61516H10.4615C11.1403 8.61516 11.6923 8.06316 11.6923 7.38439H15.3846C15.7243 7.38439 16 7.10931 16 6.76901C16 6.4287 15.7243 6.15362 15.3846 6.15362Z"
                                  fill="#97B6CF"
                                ></path>
                                <path
                                  d="M15.3846 11.077H6.76923C6.76923 10.3982 6.21723 9.84619 5.53846 9.84619H4.30769C3.62892 9.84619 3.07692 10.3982 3.07692 11.077H0.615385C0.275692 11.077 0 11.352 0 11.6923C0 12.0327 0.275692 12.3077 0.615385 12.3077H3.07692C3.07692 12.9865 3.62892 13.5385 4.30769 13.5385H5.53846C6.21723 13.5385 6.76923 12.9865 6.76923 12.3077H15.3846C15.7243 12.3077 16 12.0327 16 11.6923C16 11.352 15.7243 11.077 15.3846 11.077Z"
                                  fill="#97B6CF"
                                ></path>
                              </svg>
                            )}
                          </button>
                          {showFilter && (
                            <div
                              ref={filterRef}
                              className="dropdown-menu filter-options"
                              aria-labelledby="dropdownMenuButton2"
                            >
                              <h4>Filter By</h4>
                              <Accordion defaultActiveKey="0" flush>
                                {Object.keys(filterdata)?.map(function (
                                  key,
                                  index
                                ) {
                                  return (
                                    <>
                                      {filterdata[key]?.length > 0 ? (
                                        <Accordion.Item
                                          className={
                                            key == "role"
                                              ? "card upper"
                                              : "card"
                                          }
                                          eventKey={index}
                                        >
                                          <Accordion.Header className="card-header">
                                            {key}
                                          </Accordion.Header>
                                          <Accordion.Body className="card-body">
                                            <ul>
                                              {filterdata[key]?.length
                                                ? filterdata[key]?.map(
                                                    (item, index) => (
                                                      <li key={index}>
                                                        {item != "" ? (
                                                          <label className="select-multiple-option">
                                                            <input
                                                              type={"checkbox"}
                                                              id={`custom-checkbox-tags-${index}`}
                                                              value={
                                                                typeof item ==
                                                                "object"
                                                                  ? item?.title
                                                                  : item
                                                              }
                                                              name={key}
                                                              checked={
                                                                typeof item ==
                                                                "object"
                                                                  ? appliedFilter[
                                                                      key
                                                                    ]?.includes(
                                                                      item.id
                                                                    )
                                                                    ? true
                                                                    : false
                                                                  : appliedFilter[
                                                                      key
                                                                    ]?.includes(
                                                                      item
                                                                    )
                                                                  ? true
                                                                  : false
                                                              }
                                                              onChange={(e) =>
                                                                handleOnFilterChange(
                                                                  e,
                                                                  typeof item ==
                                                                    "object"
                                                                    ? item.id
                                                                    : item,
                                                                  index,
                                                                  key,
                                                                  [
                                                                    ...filterdata[
                                                                      key
                                                                    ],
                                                                  ]
                                                                )
                                                              }
                                                            />
                                                            {typeof item ==
                                                            "object"
                                                              ? item?.title
                                                              : item}
                                                            <span className="checkmark"></span>
                                                          </label>
                                                        ) : null}
                                                      </li>
                                                    )
                                                  )
                                                : null}
                                            </ul>
                                          </Accordion.Body>
                                        </Accordion.Item>
                                      ) : null}
                                    </>
                                  );
                                })}
                              </Accordion>

                              <div className="filter-footer">
                                <Button
                                  className="btn btn-primary btn-bordered"
                                  onClick={() => customLoader(clearFilter)}
                                >
                                  Clear
                                </Button>
                                <Button
                                  className="btn btn-primary btn-filled"
                                  onClick={(e) => customLoader(applyFilter,e)}
                                >
                                  Apply
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                        <Button
                          title="Download stats"
                          onClick={() =>
                            downloadExcel(overViewData, "Overview")
                          }
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.3335 13.125C18.1125 13.125 17.9005 13.2128 17.7442 13.3691C17.588 13.5254 17.5002 13.7373 17.5002 13.9583V15.1775C17.4995 15.7933 17.2546 16.3836 16.8192 16.819C16.3838 17.2544 15.7934 17.4993 15.1777 17.5H4.82266C4.2069 17.4993 3.61655 17.2544 3.18114 16.819C2.74573 16.3836 2.50082 15.7933 2.50016 15.1775V13.9583C2.50016 13.7373 2.41237 13.5254 2.25609 13.3691C2.0998 13.2128 1.88784 13.125 1.66683 13.125C1.44582 13.125 1.23385 13.2128 1.07757 13.3691C0.921293 13.5254 0.833496 13.7373 0.833496 13.9583V15.1775C0.834599 16.2351 1.25524 17.2492 2.00311 17.997C2.75099 18.7449 3.76501 19.1656 4.82266 19.1667H15.1777C16.2353 19.1656 17.2493 18.7449 17.9972 17.997C18.7451 17.2492 19.1657 16.2351 19.1668 15.1775V13.9583C19.1668 13.7373 19.079 13.5254 18.9228 13.3691C18.7665 13.2128 18.5545 13.125 18.3335 13.125Z"
                              fill="#0066BE"
                            ></path>
                            <path
                              d="M14.7456 9.20249C14.5893 9.04626 14.3774 8.9585 14.1564 8.9585C13.9355 8.9585 13.7235 9.04626 13.5673 9.20249L10.8231 11.9467L10.8333 1.77108C10.8333 1.55006 10.7455 1.3381 10.5893 1.18182C10.433 1.02554 10.221 0.937744 10 0.937744C9.77899 0.937744 9.56702 1.02554 9.41074 1.18182C9.25446 1.3381 9.16667 1.55006 9.16667 1.77108L9.15643 11.9467L6.41226 9.20249C6.25509 9.05069 6.04459 8.96669 5.82609 8.96859C5.60759 8.97049 5.39858 9.05813 5.24408 9.21264C5.08957 9.36715 5.00193 9.57615 5.00003 9.79465C4.99813 10.0131 5.08213 10.2236 5.23393 10.3808L9.40059 14.5475C9.478 14.6251 9.56996 14.6867 9.6712 14.7287C9.77245 14.7707 9.88098 14.7923 9.99059 14.7923C10.1002 14.7923 10.2087 14.7707 10.31 14.7287C10.4112 14.6867 10.5032 14.6251 10.5806 14.5475L14.7473 10.3808C14.9033 10.2243 14.9907 10.0123 14.9904 9.79131C14.9901 9.57034 14.902 9.35854 14.7456 9.20249Z"
                              fill="#0066BE"
                            ></path>
                          </svg>
                        </Button>
                      </div>
                    </div>
                    <div className="table-registered">
                      <Table
                        className="fold-table registration-view"
                        id="individual_completion"
                      >
                        <thead className="sticky-header">
                          <tr>
                            <th scope="col" className="sort_option">
                              <span onClick={() => handleSort("name")}>
                                Name{" "}
                                <button
                                  className={`event_sort_btn ${
                                    sortBy == "name"
                                      ? sortOrder == "asc"
                                        ? "svg_asc"
                                        : "svg_active"
                                      : ""
                                  }`}
                                  onClick={() => handleSort("name")}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="8"
                                    height="8"
                                    viewBox="0 0 8 8"
                                    fill="none"
                                  >
                                    <g clip-path="url(#clip0_3722_6611)">
                                      <path
                                        d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                        fill="#97B6CF"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_3722_6611">
                                        <rect
                                          width="8"
                                          height="8"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </button>
                              </span>
                            </th>
                            <th scope="col" className="sort_option">
                              <span onClick={() => handleSort("email")}>
                                Email{" "}
                                <button
                                  className={`event_sort_btn ${
                                    sortBy == "email"
                                      ? sortOrder == "asc"
                                        ? "svg_asc"
                                        : "svg_active"
                                      : ""
                                  }`}
                                  onClick={() => handleSort("email")}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="8"
                                    height="8"
                                    viewBox="0 0 8 8"
                                    fill="none"
                                  >
                                    <g clip-path="url(#clip0_3722_6611)">
                                      <path
                                        d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                        fill="#97B6CF"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_3722_6611">
                                        <rect
                                          width="8"
                                          height="8"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </button>
                              </span>
                            </th>
                            <th scope="col" className="sort_option">
                              <span onClick={() => handleSort("region")}>
                                Region
                                <button
                                  className={`event_sort_btn ${
                                    sortBy == "region"
                                      ? sortOrder == "asc"
                                        ? "svg_asc"
                                        : "svg_active"
                                      : ""
                                  }`}
                                  onClick={() => handleSort("region")}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="8"
                                    height="8"
                                    viewBox="0 0 8 8"
                                    fill="none"
                                  >
                                    <g clip-path="url(#clip0_3722_6611)">
                                      <path
                                        d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                        fill="#97B6CF"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_3722_6611">
                                        <rect
                                          width="8"
                                          height="8"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </button>
                              </span>
                            </th>
                            <th scope="col" className="sort_option">
                              <span onClick={() => handleSort("country")}>
                                Country{" "}
                                <button
                                  className={`event_sort_btn ${
                                    sortBy == "country"
                                      ? sortOrder == "asc"
                                        ? "svg_asc"
                                        : "svg_active"
                                      : ""
                                  }`}
                                  onClick={() => handleSort("country")}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="8"
                                    height="8"
                                    viewBox="0 0 8 8"
                                    fill="none"
                                  >
                                    <g clip-path="url(#clip0_3722_6611)">
                                      <path
                                        d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                        fill="#97B6CF"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_3722_6611">
                                        <rect
                                          width="8"
                                          height="8"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </button>
                              </span>
                            </th>
                            <th scope="col" className="sort_option">
                              <span onClick={() => handleSort("register_time")}>
                                Registered{" "}
                                <button
                                  className={`event_sort_btn ${
                                    sortBy == "register_time"
                                      ? sortOrder == "asc"
                                        ? "svg_asc"
                                        : "svg_active"
                                      : ""
                                  }`}
                                  onClick={() => handleSort("register_time")}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="8"
                                    height="8"
                                    viewBox="0 0 8 8"
                                    fill="none"
                                  >
                                    <g clip-path="url(#clip0_3722_6611)">
                                      <path
                                        d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                        fill="#97B6CF"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_3722_6611">
                                        <rect
                                          width="8"
                                          height="8"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </button>
                              </span>
                            </th>
                            <th scope="col" className="sort_option">
                              <span onClick={() => handleSort("Attended")}>
                                Attended
                                <button
                                  className={`event_sort_btn ${
                                    sortBy == "Attended"
                                      ? sortOrder == "asc"
                                        ? "svg_asc"
                                        : "svg_active"
                                      : ""
                                  }`}
                                  onClick={() => handleSort("Attended")}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="8"
                                    height="8"
                                    viewBox="0 0 8 8"
                                    fill="none"
                                  >
                                    <g clip-path="url(#clip0_3722_6611)">
                                      <path
                                        d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                        fill="#97B6CF"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_3722_6611">
                                        <rect
                                          width="8"
                                          height="8"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </button>
                              </span>
                            </th>
                            <th>Post-event views</th>
                          </tr>
                        </thead>
                        <tbody>
                          {overViewData?.length ? (
                            // overViewData.map((user, index) => (
                            sortData(overViewData, sortBy, sortOrder).map(
                              (user, index) => (
                                <>
                                  <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.region}</td>
                                    <td>{user.country}</td>
                                    <td className="green">
                                      {user.register_time}
                                    </td>
                                    <td>{user.Attended}</td>
                                    <td>{user.postEventViews}</td>
                                  </tr>
                                  <tr className="blank">
                                    <td colSpan="7">&nbsp;</td>
                                  </tr>
                                </>
                              )
                            )
                          ) : (
                            <tr>
                              <td colSpan="7">
                                <div className="no_found">
                                  <p>No Data Found</p>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              )}
              {/* Overview End */}
            </div>
          </Row>
        </div>
      </Col>}
     

      <Modal
        show={downloadPopup}
        dialogClassName="modal-90w"
        onHide={() => setDownloadPopup(false)}
        className="event-stats-download"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <div></div>
          <Modal.Title>{eventTitle}</Modal.Title>

          <button
            onClick={downloadStats}
            class="btn print"
            title="Download stats"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.3335 13.125C18.1125 13.125 17.9005 13.2128 17.7442 13.3691C17.588 13.5254 17.5002 13.7373 17.5002 13.9583V15.1775C17.4995 15.7933 17.2546 16.3836 16.8192 16.819C16.3838 17.2544 15.7934 17.4993 15.1777 17.5H4.82266C4.2069 17.4993 3.61655 17.2544 3.18114 16.819C2.74573 16.3836 2.50082 15.7933 2.50016 15.1775V13.9583C2.50016 13.7373 2.41237 13.5254 2.25609 13.3691C2.0998 13.2128 1.88784 13.125 1.66683 13.125C1.44582 13.125 1.23385 13.2128 1.07757 13.3691C0.921293 13.5254 0.833496 13.7373 0.833496 13.9583V15.1775C0.834599 16.2351 1.25524 17.2492 2.00311 17.997C2.75099 18.7449 3.76501 19.1656 4.82266 19.1667H15.1777C16.2353 19.1656 17.2493 18.7449 17.9972 17.997C18.7451 17.2492 19.1657 16.2351 19.1668 15.1775V13.9583C19.1668 13.7373 19.079 13.5254 18.9228 13.3691C18.7665 13.2128 18.5545 13.125 18.3335 13.125Z"
                fill="#0066BE"
              ></path>
              <path
                d="M14.7456 9.20249C14.5893 9.04626 14.3774 8.9585 14.1564 8.9585C13.9355 8.9585 13.7235 9.04626 13.5673 9.20249L10.8231 11.9467L10.8333 1.77108C10.8333 1.55006 10.7455 1.3381 10.5893 1.18182C10.433 1.02554 10.221 0.937744 10 0.937744C9.77899 0.937744 9.56702 1.02554 9.41074 1.18182C9.25446 1.3381 9.16667 1.55006 9.16667 1.77108L9.15643 11.9467L6.41226 9.20249C6.25509 9.05069 6.04459 8.96669 5.82609 8.96859C5.60759 8.97049 5.39858 9.05813 5.24408 9.21264C5.08957 9.36715 5.00193 9.57615 5.00003 9.79465C4.99813 10.0131 5.08213 10.2236 5.23393 10.3808L9.40059 14.5475C9.478 14.6251 9.56996 14.6867 9.6712 14.7287C9.77245 14.7707 9.88098 14.7923 9.99059 14.7923C10.1002 14.7923 10.2087 14.7707 10.31 14.7287C10.4112 14.6867 10.5032 14.6251 10.5806 14.5475L14.7473 10.3808C14.9033 10.2243 14.9907 10.0123 14.9904 9.79131C14.9901 9.57034 14.902 9.35854 14.7456 9.20249Z"
                fill="#0066BE"
              ></path>
            </svg>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div class="modal-height">
            <div className="d-flex align-items-center flex-column">
              <div className="high_charts" id="splineChart">
                {splineChartData?.series?.[0]?.data?.length ? (
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={splineChartData}
                  />
                ) : (
                  <div className="no_found">
                    <p>No Data Found</p>
                  </div>
                )}
              </div>
              <div className="high_charts" id="pieChart">
                {pieChartData?.series?.[0]?.data?.length ? (
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={pieChartData}
                  />
                ) : (
                  <div className="no_found">
                    <p>No Data Found</p>
                  </div>
                )}
              </div>
              {emailListData?.map((data, index) => {
                return (
                  <>
                    <div
                      className="analytics_campaign"
                      id={`analytics_campaign_${index}`}
                    >
                      <WebinarAnalyticCommonModal
                        data={data}
                        id={index}
                        options={newOptions[index]}
                      />
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Analytics;
