import React, { useEffect, useRef, useState } from "react";
import { Accordion, Button, Col, Row, Table } from "react-bootstrap";
import { getData, postData } from "../../axios/apiInstanceHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import { loader } from "../../loader";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const RDAnalytics = () => {
  const [show, setShow] = useState();
  const [totalSiteNumber, setTotalSiteNumber] = useState();
  const [totalRdSiteNumber, setTotalRdSiteNumber] = useState();

  const [chartOptions, setChartOptions] = useState();
  const [rdSiteData, setRdSiteData] = useState();
  const [pieData, setPieData] = useState({});
  const [flag, setFlag] = useState({
    individual_Completion: false,
    site_Completion: false,
    site_Engagement: false,
    content: false,
  });

  const [indidualCompletionTableData, setIndividualCompletionTableData] =
    useState();
  const [individualCompletionShow, setIndividualCompletionShow] = useState();
  const [trainingDropdownData, setTrainingCompletionDropdownData] = useState();
  const [trainingAccordianShow, setTrainingAccordianShow] = useState();
  const [traingAccordianData, setTrainingAccordianData] = useState();

  const [siteCompletionTableData, setSiteCompletionTableData] = useState();
  const [mostPopularContentData, setMostPopularContentData] = useState([]);
  const [mostPopularContentPageData, setMostPopularContentPageData] = useState(
    []
  );
  const [mostPopularContentSiteData, setMostPopularContentSiteData] = useState(
    []
  ); 
  const [isContentSiteAccordionOpen, setIsContentSiteAccordionOpen] = useState(
    []
  ); 
  const [isContentPageAccordionOpen, setIsContentPageAccordionOpen] = useState(
    []
  ); 
  // const [mostPopularContentSiteData, setMostPopularContentSiteData] = useState(
  //   []
  // );
  const [siteCompletionShow, setSiteCompletionShow] = useState();

  //const [sortedData, setSortedData] = useState(rdSiteData);
  const [sortDirection, setSortDirection] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [lastSortedPDFId, setLastSortedPDFId] = useState(null);

  const individual_Completion = useRef(null);
  const site_Completion = useRef(null);
  const site_Engagement = useRef(null);
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const handleClick = event => {
    setIsActive(current => !current);
  };
  const colors = ["#39CABC", "#FFCACD", "#DECBE3", "#986CA5", "#004A89"];
  Highcharts.setOptions({
    colors: ["#FFCACD", "#39CABC"],
  });

  const [pieOptions, setPieOptions] = useState({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      // height: 500,
    },
    title: {
      text: "",
      align: "left",
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
      // reversed: true,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
        point: {
          events: {},
        },
        showInLegend: true,
      },
    },
    series: [
      // {
      //   name: "",
      //   colorByPoint: true,
      //   data: [],
      // },
    ],
  });

  const [columnOptions, setColumnOptions] = useState({
    chart: {
      type: "column",
    },
    title: {
      text: "UEFA CL most assists by season",
    },
    xAxis: {
      categories: [],
      title: {
        text: "Site",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Assists",
      },
    },
    tooltip: {
      pointFormat:
        '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
      shared: true,
    },
    legend: {
      verticalAlign: "bottom",
      reversed: true,
      symbolWidth: 20, // Width of the legend symbol (rectangle)
      symbolHeight: 10, // Height of the legend symbol (rectangle)
      symbolRadius: 0, // Disable rounded corners of the legend symbol
    },
    plotOptions: {
      series: {
        stacking: "normal",
        // pointWidth: 30,
      },
    },
    series: [],
  });
  const [rdSiteOptions, setRdSiteOptions] = useState({
    chart: {
      type: "column",
    },
    title: {
      text: "UEFA CL most assists by season",
    },
    xAxis: {
      categories: [],
      title: {
        text: "Site",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
      },
    },
    tooltip: {
      pointFormat:
        '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
      shared: true,
    },
    legend: {
      align: "right",
      verticalAlign: "middle",
      layout: "verticle",
      reversed: true,
      symbolWidth: 20, // Width of the legend symbol (rectangle)
      symbolHeight: 10, // Height of the legend symbol (rectangle)
      symbolRadius: 0, // Disable rounded corners of the legend symbol
    },
    plotOptions: {
      series: {
        // stacking: "normal",
        // pointWidth: 30,
      },
    },
    series: [],
  });

  useEffect(() => {
    getMostPopularData();
    initialFun();
    getPieChartData();
    getRdSiteChartData();
  }, []);
  const initialFun = async () => {
    try {
      loader("show");
      const result = await getData(ENDPOINT.SITEREGISTER);
      const data = result?.data?.data?.registered_irt;
      setTotalSiteNumber(result?.data?.total_sites);
  
      const newSeries = data?.map((item, index) => {
        return {
          name: item.name,
          data: item.data,
        };
      });
  
      // Sort the newSeries array based on the maximum data
      newSeries.sort((a, b) => {
        const maxDataA = Math.max(...a.data);
        const maxDataB = Math.max(...b.data);
        return maxDataB - maxDataA;
      });
  
      const columnCategories = result?.data?.data?.site_numbers;
  
      const newColumnOptions = {
        ...columnOptions,
        xAxis: {
          categories: columnCategories,
        },
        series: newSeries,
      };
      setColumnOptions(newColumnOptions);
    } catch (err) {
      // console.log("-err", err);
    }
  };

  
  useEffect(() => {
    const checkboxElement = document.querySelector('.switch6 input[type="checkbox"]');
    checkboxElement.addEventListener('click', handleCheckboxClick);

    return () => {
      checkboxElement.removeEventListener('click', handleCheckboxClick);
    };
  }, []);
  const handleCheckboxClick = () => {
  
    initialFun();
    loader("hide")
  };

  const getPieChartData = async () => {
    try {
      const result = await getData(ENDPOINT.IRT_COUNT_GRAPH);
      setPieData({
        completed: result?.data?.data?.completed,
        notcompleted: result?.data?.data?.notcompleted,
        total: result?.data?.data?.total,
      });
      let newValue = [
        {
          name: "",
          colorByPoint: true,
          data: [
            {
              name: "Completed",
              y: result?.data?.data?.completed,

              color: colors[0],
            },
            {
              name: "Not Completed",
              y: result?.data?.data?.notcompleted,

              color: colors[1],
            },
          ],
        },
      ];

      const newPieOptions = {
        ...pieOptions,
        series: newValue,
      };
      setPieOptions(newPieOptions);
      loader("hide");
    } catch (err) {
      // loader("hide");
      // console.log("-err", err);
    }
  };

  const getRdSiteChartData = async () => {
    try {
      const result = await getData(ENDPOINT.RD_SITE_ENGAGEMENT);
      const data = result?.data?.data;
      setTotalRdSiteNumber(result?.data?.total_content);
      setRdSiteData(data);

      let siteUsers = [];
      let contentEngagement = [];
      let site_number = [];
      let newArr = [];

      data?.map((item, index) => {
        site_number.push(item?.site_number);
        siteUsers.push(item?.site_users);
        contentEngagement.push(item?.content_engagement);
      });
      newArr.push({
        name: "Non-mandatory content engaged with",
        data: contentEngagement,
        color: colors[2],
      });
      newArr.push({
        name: "Users in the site",
        data: siteUsers,
        color: colors[3],
      });

      const newRdSiteOptions = {
        ...rdSiteOptions,
        xAxis: {
          categories: site_number,
        },
        series: newArr,
      };
      setRdSiteOptions(newRdSiteOptions);

      // loader("hide");
    } catch (err) {
      loader("hide");
      console.log("--err", err);
    }
  };
  const getMostPopularData = async () => {
    try {
      const result = await postData(ENDPOINT.MOST_POPULAR_CONTENT);
      const data = result?.data?.data;
      // console.log(data);
      setMostPopularContentData(data.pdf_data);

      // setRdSiteOptions(newRdSiteOptions);

      // loader("hide");
    } catch (err) {
      loader("hide");
      console.log("--err", err);
    }
  };
  const getMostPopularContentPageData = async (pdf_id) => {
    try {
      if(!isContentPageAccordionOpen[pdf_id] || isContentPageAccordionOpen[pdf_id]==undefined){
      const result = await postData(ENDPOINT.MOST_POPULAR_PAGE_CONTENT, {
        pdf_id: pdf_id,
      });
      const data = result?.data?.data;
      // console.log("drowdown",data);

      setMostPopularContentPageData((prevData) => ({
        ...prevData,
        [pdf_id]: data.time_spend_on_pdf,
      }));
    
    setIsContentPageAccordionOpen({...isContentPageAccordionOpen,[pdf_id]:true})
  }
  else{
    setIsContentPageAccordionOpen({...isContentPageAccordionOpen,[pdf_id]:false})
  }
      // console.log(mostPopularContentPageData)
    } catch (err) {
      console.log("--err", err);
    }
  };

  const getMostPopularContentSiteData = async (pdf_id) => {
    try {
// console.log(isContentSiteAccordionOpen[pdf_id]);
      if(!isContentSiteAccordionOpen[pdf_id] || isContentSiteAccordionOpen[pdf_id]==undefined){
      const result = await postData(ENDPOINT.MOST_POPULAR_SITE_CONTENT, {
        pdf_id: pdf_id,
      });
      const data = result?.data?.data.site_data;
      const chart_data = result?.data?.data?.chart_data;
      setMostPopularContentSiteData((prevData) => ({
        ...prevData,
        [pdf_id]: data,
      }));

      // console.log("dropdown", data);

      // Set chart data options for the PDF
      setChartOptions((prevOptions) => ({
        ...prevOptions,
        [pdf_id]: {
          chart_data: {
            chart: {
              type: "pie",
            },
            title: {
              text: "Device Chart",
            },
            subtitle: {
              text: `<p>Devices</p></br></br></br><span >${chart_data.totalDevices}</span>`,
              verticalAlign: "middle",
              y: 45,
            },
            exporting: {
              enabled: false,
            },
            plotOptions: {
              pie: {
                innerSize: "70%",
                dataLabels: {
                  enabled: true,
                  format: "{point.y}",
                  style: {
                    fontWeight: "bold",
                    color: "white",
                    textOutline: "none",
                    fontSize: "12px",
                  },
                  distance: -20, // Adjust the distance of the data labels from the center
                },
                animation: {
                  duration: 1000,
                },
                enableMouseTracking: false, // Disable hover functionality
              },
            },
            series: [
              {
                name: "Device Count",
                data: chart_data.deviceNames.map((name, index) => ({
                  name,
                  y: chart_data.deviceCount[name],
                  color: ["#fee9b9", "#fec037", "#e4a923", "#c28b0c"][
                    index % 4
                  ],
                })),
                size: "80%",
                innerSize: "75%",
              },
            ],
          },
          device_names: chart_data.deviceNames,
        },
      }));
      setIsContentSiteAccordionOpen({...isContentSiteAccordionOpen,[pdf_id]:true})
    }
    else{
      setIsContentSiteAccordionOpen({...isContentSiteAccordionOpen,[pdf_id]:false})
    }

      // console.log(chartOptions);
    } catch (err) {
      console.log("--err", err);
    }
  };

  const rdShowData = (e, index) => {
    if (show == index) {
      setShow();
    } else {
      setShow(index);
    }
  };
  const siteCompletionShowData = (e, index) => {
    if (siteCompletionShow == index) {
      setSiteCompletionShow();
    } else {
      setSiteCompletionShow(index);
    }
  };

  const individualCompletion = async () => {
    if (!indidualCompletionTableData) {
      try {
        loader("show");
        const result = await postData(ENDPOINT.INDIVIDUAL_TRAINING_COMPLETION);

        setIndividualCompletionTableData(result?.data?.data);
        loader("hide");
      } catch (err) {
        loader("hide");
        console.log("-err", err);
      }
    }
    individual_Completion?.current?.focus();
  };

  const individualCompletionShowData = async (e, index, id, statusCode) => {
    if (individualCompletionShow == index) {
      setIndividualCompletionShow();
    } else {
      try {
        loader("show");
        let body = {
          user_id: id,
          training_status_code: statusCode,
        };
        const result = await postData(
          ENDPOINT.TRAINING_COMPLETION_DROPDOWN,
          body
        );
        // setTrainingCertificate(result?.data?.certificate);
        setTrainingCompletionDropdownData(result?.data?.data);
        // console.log("result--->", result);
        loader("hide");
      } catch (err) {
        loader("hide");
        console.log("-err", err);
      }
      setIndividualCompletionShow(index);
    }
  };

  const individualTrainingDropdown = async (e, i, userId, pdfId) => {
    try {
      loader("show");
      if (trainingAccordianShow == i) {
        setTrainingAccordianShow();
      } else {
        let body = {
          user_id: userId,
          pdf_id: pdfId,
        };
        const result = await postData(
          ENDPOINT.TRAINING_COMPLETION_PAGE_CLICK,
          body
        );
        // console.log("page click-->", result?.data?.data?.time_spend_on_pdf);
        setTrainingAccordianData(result?.data?.data?.time_spend_on_pdf);
        setTrainingAccordianShow(i);
      }
      loader("hide");
    } catch (err) {
      loader("hide");
      console.log("-err", err);
    }
  };

  const siteCompletion = async () => {
    if (!siteCompletionTableData) {
      try {
        loader("show");

        const result = await getData(ENDPOINT.SITE_REGISTRATION_LIST);

        setSiteCompletionTableData(result?.data?.data);
        loader("hide");
      } catch (err) {
        console.log("-err", err);
      }
    }
    site_Completion?.current?.focus();
  };
  // const sortSelectedUsers = () => {
  //   let normalArr = [];
  //   normalArr = readers;
  //   if (sorting === 0) {
  //     normalArr.sort((a, b) =>
  //       a.first_name.toLowerCase() > b.first_name.toLowerCase()
  //         ? 1
  //         : b.first_name.toLowerCase() > a.first_name.toLowerCase()
  //         ? -1
  //         : 0
  //     );
  //   } else {
  //     normalArr.sort((a, b) =>
  //       a.first_name.toLowerCase() < b.first_name.toLowerCase()
  //         ? 1
  //         : b.first_name.toLowerCase() < a.first_name.toLowerCase()
  //         ? -1
  //         : 0
  //     );
  //   }

  //   setReaders(normalArr);
  //   setSorting(1 - sorting);
  //   setSortingCount(sortingCount + 1);
  // };

  const handleSort = () => {
    const sortedRdSiteData = [...rdSiteData].sort((a, b) => {
      const siteNumberA = a.site_number.toLowerCase();
      const siteNumberB = b.site_number.toLowerCase();
  
      if (sortDirection === 0) {
        if (siteNumberA < siteNumberB) return -1;
        if (siteNumberA > siteNumberB) return 1;
        return 0;
      } else {
        if (siteNumberA > siteNumberB) return -1;
        if (siteNumberA < siteNumberB) return 1;
        return 0;
      }
    });

    setRdSiteData(sortedRdSiteData);
    setSortDirection(sortDirection === 0 ? 1 : 0); // Toggle the sort direction
    setIsActive(!isActive);
  };
  
  const sortSiteCompletion = () => {
    const sortedSiteCompletionTableData = [...siteCompletionTableData].sort((a, b) => {
      const siteNumberA = a.site_number.toLowerCase();
      const siteNumberB = b.site_number.toLowerCase();
  
      if (sortDirection === 0) {
        if (siteNumberA < siteNumberB) return -1;
        if (siteNumberA > siteNumberB) return 1;
        return 0;
      } else {
        if (siteNumberA > siteNumberB) return -1;
        if (siteNumberA < siteNumberB) return 1;
        return 0;
      }
    });
  
    setSiteCompletionTableData(sortedSiteCompletionTableData);
    setSortDirection(sortDirection === 0 ? 1 : 0); // Toggle the sort direction
    setIsActive(!isActive);
  }
  
  
  const sortIndividualCompletion = () => {

    const sortedIndividualCompletion = [...indidualCompletionTableData].sort((a,b) => {
          const siteNumberA = a.training_status.toLowerCase();
          const siteNumberB = b.training_status.toLowerCase();
    
          if (sortDirection === 0) {
            if (siteNumberA < siteNumberB) return -1;
            if (siteNumberA > siteNumberB) return 1;
            return 0;
          } else {
            if (siteNumberA > siteNumberB) return -1;
            if (siteNumberA < siteNumberB) return 1;
            return 0;
          }
        });
      

        setIndividualCompletionTableData(sortedIndividualCompletion);
        setSortDirection(sortDirection === 0 ? 1 : 0); // Toggle the sort direction
        setIsActive(!isActive);
    }
  
    const sortContentView = (pdfId) => {
      const sortedContentViewObject = { ...mostPopularContentSiteData };
    
      if (!sortedContentViewObject.hasOwnProperty(pdfId)) {
        // Handle the case when the provided ID does not exist in the data
      //  console.error(`Data with ID ${pdfId} does not exist`);
        return;
      }
    
      const sortedArray = sortedContentViewObject[pdfId].sort((a, b) => {
        const siteNumberA = a.count;
        const siteNumberB = b.count;
    
        if (sortDirection === 0) {
          return siteNumberA - siteNumberB;
        } else {
          return siteNumberB - siteNumberA;
        }
      });
    
      const updatedContentViewObject = { ...sortedContentViewObject, [pdfId]: sortedArray };
      setMostPopularContentSiteData(updatedContentViewObject); 
    
     
      if (lastSortedPDFId === pdfId) {
        setSortDirection(sortDirection === 0 ? 1 : 0);
        setIsActive(!isActive);
      }
    
      setLastSortedPDFId(pdfId); 
    };
    
    
    
    const handleExport = (tableName) => {
      const table = document.getElementById(tableName);
      const rows = table.getElementsByTagName('tr');
      const base64 = (s) => {
        return window.btoa(unescape(encodeURIComponent(s)));
      };
    
      const format = (s, c) => {
        return s.replace(/{(\w+)}/g, function (m, p) {
          return c[p];
        });
      };
    
      // Filter out rows with class names "fold" or "fold-content"
      const filteredRows = Array.from(rows).filter((row, index) => {
        const classNames = row.className.split(' ');
        return (
          !classNames.includes('fold') &&
          !classNames.includes('fold-content') &&
          !classNames.includes('show')&& !classNames.includes('doctor')&& 
          index !== 0// Exclude the first row (header row)
        );
      });
    // console.log(filteredRows);
      // Create a new table element and copy the header row
      const exportTable = document.createElement('table');
      const headerRow = table.getElementsByTagName('thead')[0].cloneNode(true);
      exportTable.appendChild(headerRow);
      console.log(headerRow);
    
      // Copy the filtered rows to the export table
      filteredRows.forEach((row) => {
        const clonedRow = row.cloneNode(true);
        exportTable.appendChild(clonedRow);
      });
      
    
      // Generate the Excel file
      const uri = 'data:application/vnd.ms-excel;base64,';
      const template =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-mic' +
        'rosoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta cha' +
        'rset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:Exce' +
        'lWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>' +
        '</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></' +
        'xml><![endif]--></head><body>{table}</body></html>';
    
      const context = {
        worksheet: 'Sheet1',
        table: exportTable.outerHTML,
      };
    
      const randomPrefix = Math.random().toString(36).substring(7); // Generate a random string

  const element = document.createElement('a');
  element.href = uri + base64(format(template, context));
  element.download = `${randomPrefix}_site_engagement.xls`; // Use the random prefix in the file name
  element.click();
    };
    
    
    
    
    




  return (
    <>
      <Col className="right-sidebar col">
        <div className="custom-container">
          <Row>
            <div className="top-header">
              <div className="page-title d-flex">
                <h2>LEX-210</h2>
              </div>
            </div>
            <div className="rd-analytics-content">
              <Row>
                <Col md={12} lg={9}>
                  <Row>
                    <Col md={6} lg={4}>
                      <div className="rd-analytics-box irt">
                        <p className="rd-box-small-title">IRT Training</p>
                        <div className="rd-analytics-box-layout">
                          <div className="rd-analytics-top d-flex justify-content-between align-items-center">
                            <h5 className="mr-auto">Individual Completion</h5>
                            <div className="d-flex">
                              <div className="count-number">
                                {pieData.total}
                              </div>
                              <img src={path_image + "doctor-svg.svg"} alt="" class="doctor" />
                            </div>
                          </div>
                          <div className="graph-box">
                            <div className="">
                              <p>Completing the mandatory training</p>
                              <span>
                                Click on the graph to see more details
                              </span>
                            </div>

                            <HighchartsReact
                              highcharts={Highcharts}
                              options={pieOptions}
                            />
                          </div>
                          {pieOptions?.series?.length ? (
                            <div className="rd-box-export">
                              <img
                                src={path_image + "arrow-export.svg"}
                                alt=""
                                onClick={() => {
                                  setFlag({
                                    individual_Completion: true,
                                    site_Completion: false,
                                    site_Engagement: false,
                                    content: false,
                                  });
                                  individualCompletion();
                                }}
                              />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </Col>
                    <Col md={6} lg={8}>
                      <div className="rd-analytics-box sites">
                        <p className="rd-box-small-title">Sites</p>
                        <div className="rd-analytics-box-layout">
                          <div className="rd-analytics-top d-flex justify-content-between align-items-center">
                            <h5>Site Completion</h5>
                            <div className="d-flex">
                              <div className="count-number">
                                {totalSiteNumber}
                              </div>
                              <img src={path_image + "hospital.svg"} alt="" />
                            </div>
                          </div>
                          <div className="graph-box">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="">
                                <p>Registered IRTs at each site</p>
                                <span>
                                  Click on the graph to see more details
                                </span>
                              </div>
                              <div className="switch6">
                                <label className="switch6-light">
                                  <input type="checkbox" />
                                  <span>
                                    <span>
                                      <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M9.38984 0C9.19775 0 9.04202 0.154607 9.04202 0.345325V2.58985H7.30435C6.632 2.58985 6.08696 3.13098 6.08696 3.79849V9.49635H2.08696C1.41461 9.49635 0.869565 10.0375 0.869565 10.705V22.7914C0.869565 22.9767 0.911599 23.1524 0.986719 23.3094H0.347826C0.155727 23.3094 0 23.464 0 23.6547C0 23.8454 0.155727 24 0.347826 24H23.6522C23.8443 24 24 23.8454 24 23.6547C24 23.464 23.8443 23.3094 23.6522 23.3094H23.1872C23.2623 23.1524 23.3043 22.9767 23.3043 22.7914V10.705C23.3043 10.0375 22.7593 9.49635 22.087 9.49635H17.913V3.79849C17.913 3.13098 17.368 2.58985 16.6957 2.58985H14.9565V3.2805H16.8696C17.1577 3.2805 17.3913 3.51241 17.3913 3.79849V22.7914C17.3913 23.0774 17.1577 23.3094 16.8696 23.3094H14.6087V17.7842C14.6087 17.5934 14.453 17.4388 14.2609 17.4388H9.91304C9.72094 17.4388 9.56522 17.5934 9.56522 17.7842V23.3094H7.13043C6.84229 23.3094 6.6087 23.0774 6.6087 22.7914V3.79849C6.6087 3.51241 6.84229 3.2805 7.13043 3.2805H9.04202V5.5252C9.04202 5.71592 9.19775 5.87052 9.38984 5.87052H14.6072C14.7993 5.87052 14.9551 5.71592 14.9551 5.5252V0.345325C14.9551 0.154607 14.7993 0 14.6072 0H9.38984ZM14.0628 3.48443C14.0628 3.58665 13.9705 3.66926 13.8563 3.66926H12.7361V4.78831C12.7361 4.90183 12.6534 4.99513 12.5517 4.99513H11.4464C11.3447 4.99513 11.262 4.90301 11.262 4.78831V3.66926H10.1418C10.0288 3.66926 9.93596 3.58665 9.93596 3.48443V2.38082C9.93596 2.2786 10.0288 2.19659 10.1418 2.19659H11.262V1.07694C11.262 0.963427 11.3447 0.87012 11.4464 0.87012H12.5517C12.6529 0.87012 12.7361 0.962237 12.7361 1.07694V2.19659H13.8563C13.9705 2.19659 14.0628 2.2786 14.0628 2.38082V3.48443Z"
                                          fill="#0066BE"
                                        />
                                        <path
                                          d="M8.86957 8.63304C8.67747 8.63304 8.52174 8.78765 8.52174 8.97836V10.705C8.52174 10.8957 8.67747 11.0503 8.86957 11.0503H10.6087C10.8008 11.0503 10.9565 10.8957 10.9565 10.705V8.97836C10.9565 8.78765 10.8008 8.63304 10.6087 8.63304H8.86957Z"
                                          fill="#0066BE"
                                        />
                                        <path
                                          d="M8.52174 13.2949C8.52174 13.1042 8.67747 12.9496 8.86957 12.9496H10.6087C10.8008 12.9496 10.9565 13.1042 10.9565 13.2949V15.0216C10.9565 15.2123 10.8008 15.3669 10.6087 15.3669H8.86957C8.67747 15.3669 8.52174 15.2123 8.52174 15.0216V13.2949Z"
                                          fill="#0066BE"
                                        />
                                        <path
                                          d="M13.0435 8.97836C13.0435 8.78765 13.1992 8.63304 13.3913 8.63304H15.1304C15.3225 8.63304 15.4783 8.78765 15.4783 8.97836V10.705C15.4783 10.8957 15.3225 11.0503 15.1304 11.0503H13.3913C13.1992 11.0503 13.0435 10.8957 13.0435 10.705V8.97836Z"
                                          fill="#0066BE"
                                        />
                                        <path
                                          d="M13.0435 13.2949C13.0435 13.1042 13.1992 12.9496 13.3913 12.9496H15.1304C15.3225 12.9496 15.4783 13.1042 15.4783 13.2949V15.0216C15.4783 15.2123 15.3225 15.3669 15.1304 15.3669H13.3913C13.1992 15.3669 13.0435 15.2123 13.0435 15.0216V13.2949Z"
                                          fill="#0066BE"
                                        />
                                      </svg>
                                    </span>
                                    <span>
                                      <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M11.9022 12.7158C15.4135 12.7158 18.2601 9.86924 18.2601 6.35788C18.2601 2.84652 15.4135 0 11.9022 0C8.39081 0 5.54429 2.84652 5.54429 6.35788C5.54429 9.86924 8.39081 12.7158 11.9022 12.7158Z"
                                          fill="#0066BE"
                                        />
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M19.133 13.2823C19.3757 13.8414 19.5167 14.5256 19.5476 15.3171C20.3648 15.5038 20.977 16.2348 20.977 17.1086C20.977 18.1229 20.1518 18.9487 19.1375 18.9487C18.1233 18.9487 17.298 18.124 17.298 17.1086C17.298 16.2463 17.8965 15.5221 18.6995 15.3251C18.6641 14.5387 18.4762 13.3428 17.7075 12.7529C17.3152 12.6507 16.9114 12.577 16.4974 12.5399C16.4665 13.9162 11.9161 17.3136 11.9161 17.3136C11.9161 17.3136 7.36443 13.9173 7.3336 12.5393C6.87386 12.5816 6.42613 12.6661 5.99381 12.7866C5.43242 13.2309 5.14231 14.059 5.12746 15.2623C5.29251 15.3571 5.42557 15.505 5.50781 15.6837C6.11203 15.9693 6.64657 16.5701 7.0549 17.425C7.12343 17.5689 7.132 17.7317 7.08174 17.8802C7.32674 18.5107 7.46666 19.2011 7.46666 19.7785C7.46666 20.5906 7.46666 21.3576 6.58261 21.554C6.48666 21.6345 6.3673 21.6779 6.24109 21.6779H5.65001C5.35361 21.6779 5.11261 21.4358 5.11261 21.1405L5.11432 21.1028C5.13431 20.8253 5.36903 20.6031 5.65001 20.6031H6.24109C6.30106 20.6031 6.36045 20.614 6.41756 20.6334C6.45354 20.6231 6.46496 20.6157 6.46496 20.6157C6.53121 20.4992 6.53121 20.0132 6.53121 19.7802C6.53121 19.3102 6.41299 18.7425 6.20683 18.2143C6.10003 18.1543 6.0138 18.0612 5.96011 17.9504C5.60204 17.2006 5.1149 16.7157 4.71856 16.7157C4.31422 16.7157 3.80252 17.2394 3.44559 18.0178C3.38734 18.1457 3.28511 18.2485 3.15947 18.3108C2.97329 18.8156 2.87107 19.3353 2.87107 19.7802C2.87107 19.9761 2.87107 20.4958 2.94588 20.618C2.94588 20.618 2.94612 20.6181 2.94644 20.6182L2.94699 20.6185C2.95139 20.6207 2.96924 20.6298 3.00984 20.6397C3.07095 20.6163 3.13663 20.6037 3.2023 20.6037H3.79396C4.06751 20.6037 4.29595 20.8099 4.32736 21.0789L4.33021 21.0846L4.33135 21.1205C4.33135 21.4381 4.09035 21.6797 3.79396 21.6797H3.20287C3.08523 21.6797 2.97158 21.6408 2.87849 21.5689C2.5404 21.506 2.30226 21.3564 2.15092 21.1137C1.96874 20.8196 1.93504 20.4352 1.93504 19.7808C1.93504 19.2068 2.06754 18.5466 2.30797 17.9161C2.27256 17.7814 2.28398 17.6403 2.34338 17.5124C2.59352 16.9647 2.91276 16.4964 3.26455 16.156C3.45758 15.9699 3.66603 15.8202 3.88362 15.71C3.96528 15.5193 4.10691 15.3645 4.27939 15.2651C4.28852 14.5113 4.40445 13.8597 4.61862 13.3234C2.16348 14.5661 0.480469 17.1143 0.480469 20.0566C0.480469 23.8167 3.22743 24 6.82304 24C7.01698 24 7.21329 23.9994 7.41183 23.9989C7.61495 23.9983 7.8204 23.9977 8.02804 23.9977H15.8006C16.0078 23.9977 16.2129 23.9983 16.4157 23.9989C16.6143 23.9994 16.8107 24 17.0051 24C20.6012 24 23.3493 23.8167 23.3493 20.0566C23.3499 17.0841 21.6309 14.513 19.133 13.2823ZM17.8577 20.8516C17.8577 20.9498 17.7692 21.0292 17.6595 21.0292H16.5842V22.1045C16.5842 22.2136 16.5048 22.3033 16.4071 22.3033H15.346C15.2484 22.3033 15.169 22.2148 15.169 22.1045V21.0292H14.0936C13.9851 21.0292 13.896 20.9498 13.896 20.8516V19.791C13.896 19.6928 13.9851 19.614 14.0936 19.614H15.169V18.5381C15.169 18.429 15.2484 18.3393 15.346 18.3393H16.4071C16.5042 18.3393 16.5842 18.4278 16.5842 18.5381V19.614H17.6595C17.7692 19.614 17.8577 19.6928 17.8577 19.791V20.8516Z"
                                          fill="#0066BE"
                                        />
                                        <path
                                          d="M19.137 17.9573C19.6057 17.9573 19.9856 17.5773 19.9856 17.1086C19.9856 16.6399 19.6057 16.26 19.137 16.26C18.6683 16.26 18.2883 16.6399 18.2883 17.1086C18.2883 17.5773 18.6683 17.9573 19.137 17.9573Z"
                                          fill="#0066BE"
                                        />
                                      </svg>
                                    </span>
                                  </span>
                                  <a className="btn btn-primary"></a>
                                </label>
                              </div>
                            </div>
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={columnOptions}
                            />

                            {/* <img className="graph-chart" src={path_image + "graph-chart.png"} alt="" /> */}
                          </div>
                          {columnOptions?.series?.length ? (
                            <div className="rd-box-export">
                              <img
                                src={path_image + "arrow-export.svg"}
                                alt=""
                                onClick={() => {
                                  setFlag({
                                    individual_Completion: false,
                                    site_Completion: true,
                                    site_Engagement: false,
                                    content: false,
                                  });

                                  siteCompletion();
                                }}
                              />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </Col>
                    <Col md={12} lg={12}>
                      <div className="rd-analytics-box non-mandatory">
                        <p className="rd-box-small-title">
                          Non-mandatory Content
                        </p>
                        <div className="rd-analytics-box-layout">
                          <div className="rd-analytics-top d-flex justify-content-between align-items-center">
                            <h5>Site Engagement</h5>
                            <div className="d-flex">
                              <div className="count-number">
                                {totalRdSiteNumber}
                              </div>
                              <img
                                src={path_image + "site-engaged.svg"}
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="graph-box">
                            <div className="">
                              <p>
                                Engaging With Non-mandatory Content at each site
                              </p>
                              <span>
                                Click on the graph to see more details
                              </span>
                            </div>

                            <HighchartsReact
                              highcharts={Highcharts}
                              options={rdSiteOptions}
                            />
                          </div>
                          {rdSiteOptions?.series?.length ? (
                            <div className="rd-box-export">
                              <img
                                src={path_image + "arrow-export.svg"}
                                alt=""
                                onClick={() => {
                                  setFlag({
                                    individual_Completion: false,
                                    site_Completion: false,
                                    site_Engagement: true,
                                    content: false,
                                  });
                                  site_Engagement?.current?.focus();
                                }}
                              />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>

                <Col md={12} lg={3}>
                  <div className="rd-analytics-box rd-content">
                    <p className="rd-box-small-title">Content</p>
                    <div className="rd-analytics-box-layout">
                      <div className="rd-analytics-top d-flex justify-content-between align-items-center">
                        <h5>Most Popular content</h5>
                        <div className="d-flex">
                          <div className="count-number">
                            {mostPopularContentData
                              ? mostPopularContentData[0]?.watched_count +
                                mostPopularContentData[1]?.watched_count +
                                mostPopularContentData[2]?.watched_count
                              : 0}
                          </div>
                          <img src={path_image + "content-view.svg"} alt="" />
                        </div>
                      </div>
                      <div className="graph-box">
                      <div className="">
                          <p>
                            Sites who Read | Watch the <span>1 top</span>{" "}
                            content
                          </p>
                          <span>Click on the graph to see more details</span>
                        </div>
                        <img
                          className="pie-chart"
                          src={path_image + "pie-chart2.png"}
                          alt=""
                        />
                        <div className="">
                          <p>The Top 3 content</p>
                        </div>
                        <div className="lex-article">
                          {mostPopularContentData
                            ?.slice(0, 3)
                            ?.map((item, index) => (
                              <div
                                key={index}
                                className="d-flex lex-article-box"
                              >
                                <div className="lex-image">
                                  <div className="article-number">
                                    {item?.pdf.id}
                                  </div>
                                  <img src={item?.article_image} alt="" />
                                </div>
                                <div className="lex-detail">
                                  <p>{item.pdf.title}</p>
                                  <span>{item?.pdf?.pdf_sub_title}</span>
                                  <div className="d-flex justify-content-between">
                                    <div className="pages-number">
                                      {item?.total_pages ||
                                      item?.total_pages == 0
                                        ? "Pages:"
                                        : "Time:"}
                                      <span>
                                        {item?.total_pages ||
                                        item?.total_pages == 0
                                          ? item.total_pages
                                          : item?.max_time}
                                      </span>
                                    </div>
                                    <div className="pages-viewer">
                                      {item.watched_count}{" "}
                                      <img
                                        src={path_image + "viewer.svg"}
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                        {/* <div className="">
                          <p>
                            Sites who Read | Watch the <span>1 top</span>{" "}
                            content
                          </p>
                          <span>Click on the graph to see more details</span>
                        </div>
                        <img
                          className="pie-chart"
                          src={path_image + "pie-chart2.png"}
                          alt=""
                        /> */}
                      </div>
                      <div className="rd-box-export">
                        <img
                          src={path_image + "arrow-export.svg"}
                          alt=""
                          onClick={() => {
                            setFlag({
                              individual_Completion: false,
                              site_Completion: false,
                              site_Engagement: false,
                              content: true,
                            });
                            // individualCompletion();
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              {flag.individual_Completion ? (
                <div className="rd-full-explain">
                  <div className="rd-section-title">
                    <h4>IRT Training</h4>
                  </div>
                  <div
                    className="rd-training-block"
                    ref={individual_Completion}
                    tabIndex={-1}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="rd-training-block-left">
                        <h4>
                          Individual Completion |{" "}
                          <span>{indidualCompletionTableData?.length}</span>
                        </h4>
                        <p>Click on the Record to see more details</p>
                      </div>
                      <div className="rd-training-block-right d-flex">
                        <Button title="Download stats" onClick={() => handleExport('individual_completion')}>
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
                        <Button 
                        //className="sort_btn"
                        className={`sort_btn ${isActive ? 'active' : ''}`}
                        onClick={sortIndividualCompletion}
                        >
                          Sort By
                          <svg
                            width="20"
                            height="18"
                            viewBox="0 0 20 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.9214 11.7442C18.7651 11.588 18.5532 11.5002 18.3322 11.5002C18.1112 11.5002 17.8993 11.588 17.743 11.7442L14.9989 14.4884V1.50002C14.9989 1.27901 14.9111 1.06705 14.7548 0.910765C14.5985 0.754484 14.3866 0.666687 14.1655 0.666687C13.9445 0.666687 13.7326 0.754484 13.5763 0.910765C13.42 1.06705 13.3322 1.27901 13.3322 1.50002V14.4884L10.588 11.7442C10.4309 11.5924 10.2204 11.5084 10.0019 11.5103C9.78338 11.5122 9.57437 11.5998 9.41986 11.7543C9.26535 11.9088 9.17771 12.1179 9.17581 12.3364C9.17391 12.5549 9.25791 12.7654 9.40971 12.9225L13.5764 17.0892C13.6538 17.1668 13.7457 17.2284 13.847 17.2704C13.9482 17.3124 14.0568 17.334 14.1664 17.334C14.276 17.334 14.3845 17.3124 14.4858 17.2704C14.587 17.2284 14.679 17.1668 14.7564 17.0892L18.923 12.9225C19.079 12.766 19.1665 12.554 19.1662 12.333C19.1659 12.112 19.0778 11.9002 18.9214 11.7442Z"
                              fill="#97B6CF"
                            />
                            <path
                              d="M10.5892 5.0775L6.42251 0.91084C6.34489 0.833074 6.25253 0.771594 6.15084 0.730007C5.94698 0.645743 5.71803 0.645743 5.51417 0.730007C5.41248 0.771594 5.32011 0.833074 5.2425 0.91084L1.07583 5.0775C0.919572 5.23398 0.831875 5.44612 0.832031 5.66726C0.832188 5.88839 0.920184 6.10041 1.07666 6.25667C1.23314 6.41293 1.44528 6.50062 1.66642 6.50047C1.88756 6.50031 2.09957 6.41231 2.25583 6.25584L5 3.51167V16.5C5 16.721 5.0878 16.933 5.24408 17.0892C5.40036 17.2455 5.61232 17.3333 5.83334 17.3333C6.05435 17.3333 6.26631 17.2455 6.4226 17.0892C6.57888 16.933 6.66667 16.721 6.66667 16.5V3.51167L9.41085 6.25584C9.56801 6.40763 9.77852 6.49163 9.99701 6.48973C10.2155 6.48783 10.4245 6.40019 10.579 6.24568C10.7335 6.09118 10.8212 5.88217 10.8231 5.66367C10.825 5.44517 10.741 5.23467 10.5892 5.0775Z"
                              fill="#97B6CF"
                            />
                          </svg>
                        </Button>
                      </div>
                    </div>
                    <Table className="fold-table" id="individual_completion">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Role</th>
                          <th>Blind type</th>
                          <th>Training</th>
                          <th>Site</th>
                          <th>&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        {indidualCompletionTableData?.map((item, index) => {
                          return (
                            <>
                              <tr
                                className={`view ${
                                  individualCompletionShow == index
                                    ? "show"
                                    : ""
                                }`}
                                onClick={(e) =>
                                  individualCompletionShowData(
                                    e,
                                    index,
                                    item?.user_id,
                                    item?.training_status_code
                                  )
                                }
                              >
                                <td>{item?.username}</td>
                                <td>{item?.user_type}</td>
                                <td>{item?.blind_type}</td>
                                <td
                                  className={
                                    item?.training_status == "started"
                                      ? "started"
                                      : item?.training_status == "complete"
                                      ? "complete"
                                      : "not_yet"
                                  }
                                >
                                  {item?.training_status}
                                </td>
                                <td>{item?.site_name}</td>

                                <td class="pics">
                                  {item?.training_status == "complete" ? (
                                    <img
                                      src={path_image + "certificate.png"}
                                      alt="Certificate"
                                    />
                                  ) : null}
                                </td>
                              </tr>
                              {individualCompletionShow == index ? (
                                <tr className={"fold show"}>
                                  <td colspan="6">
                                    <div className="fold-content">
                                      <p>
                                        Completed Contents |{" "}
                                        <span>
                                          {trainingDropdownData?.length}
                                        </span>
                                      </p>
                                      <span>
                                        Click on the content for more details
                                      </span>
                                      <Accordion>
                                        {trainingDropdownData?.map(
                                          (data, i) => {
                                            return (
                                              <>
                                                <Accordion.Item
                                                  eventKey={i}
                                                  onClick={(e) =>
                                                    individualTrainingDropdown(
                                                      e,
                                                      i,
                                                      item?.user_id,
                                                      data?.id
                                                    )
                                                  }
                                                >
                                                  <Accordion.Header>
                                                    <div className="d-flex align-items-start">
                                                      <div className="content-image">
                                                        <img
                                                          // src={data?.pdf_thumb}
                                                          src={
                                                            path_image +
                                                            "lex-book-cover.png"
                                                          }
                                                          alt=""
                                                        />
                                                      </div>
                                                      <div className="content-detail">
                                                        <h6>{data?.title}</h6>
                                                        <p>
                                                          {data?.pdf_sub_title
                                                            ? data?.pdf_sub_title
                                                            : " "}
                                                        </p>
                                                        <div className="page-count">
                                                          <div className="time">
                                                            {data?.file_type ==
                                                            "pdf" ? (
                                                              <>
                                                                Pages{" "}
                                                                <span>
                                                                  {
                                                                    data?.total_pages
                                                                  }
                                                                </span>
                                                              </>
                                                            ) : data?.file_type ==
                                                              "video" ? (
                                                              <>
                                                                Time
                                                                <span>
                                                                  {
                                                                    data?.max_time
                                                                  }
                                                                </span>
                                                              </>
                                                            ) : null}
                                                          </div>
                                                          <div className="completed-date">
                                                            {item?.training_status ==
                                                            "complete" ? (
                                                              <>
                                                                Completed date
                                                                <span className="complete">
                                                                  {data?.date
                                                                    ? data?.date
                                                                    : "NA"}{" "}
                                                                  <img
                                                                    src={
                                                                      path_image +
                                                                      "check-complete.svg"
                                                                    }
                                                                    alt=""
                                                                  />
                                                                </span>
                                                              </>
                                                            ) : (
                                                              <>
                                                                Recent Activity
                                                                <span className="started">
                                                                  {data?.date
                                                                    ? data?.date
                                                                    : "NA"}{" "}
                                                                </span>
                                                              </>
                                                            )}
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </Accordion.Header>
                                                  {trainingAccordianShow ==
                                                  i ? (
                                                    <Accordion.Body>
                                                      <div className="article-pages-details d-flex">
                                                        {trainingDropdownData?.length ? (
                                                          traingAccordianData?.map(
                                                            (pageData, e) => {
                                                              return (
                                                                <>
                                                                  <div className="article-page-show">
                                                                    <div className="article-cover-img">
                                                                      <img
                                                                        src={
                                                                          path_image +
                                                                          "article-content-cover.png"
                                                                        }
                                                                        alt=""
                                                                      />
                                                                    </div>
                                                                    <div className="article-detail-view">
                                                                      <div className="article-page-number">
                                                                        Page{" "}
                                                                        {
                                                                          pageData?.page
                                                                        }
                                                                      </div>
                                                                      <div className="article-spanrd-time">
                                                                        Time
                                                                        spent |{" "}
                                                                        <span>
                                                                          {
                                                                            pageData?.time
                                                                          }
                                                                          {/* <small>
                                                                            sec
                                                                          </small> */}
                                                                        </span>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                </>
                                                              );
                                                            }
                                                          )
                                                        ) : (
                                                          <div>No Data</div>
                                                        )}
                                                      </div>
                                                    </Accordion.Body>
                                                  ) : null}
                                                </Accordion.Item>
                                              </>
                                            );
                                          }
                                        )}
                                      </Accordion>
                                    </div>
                                  </td>
                                </tr>
                              ) : null}
                              <tr className="blank">
                                <td colspan="6" style={{ height: "10px;" }}>
                                  &nbsp;
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </div>
              ) : null}
              {/*Site Completion */}
              {flag?.site_Completion ? (
                <div className="rd-full-explain">
                  <div className="rd-section-title">
                    <h4>Sites</h4>
                  </div>
                  <div
                    className="rd-training-block"
                    ref={site_Completion}
                    tabIndex={-1}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="rd-training-block-left">
                        <h4>
                          Site Completion |{" "}
                          <span>{siteCompletionTableData?.length}</span>
                        </h4>
                        <p></p>
                      </div>
                      <div className="rd-training-block-right d-flex">
                        <Button title="Download stats" onClick={() => handleExport('site_completion')}>
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
                        <Button  
                       // className="sort_btn"
                        className={`sort_btn ${isActive ? 'active' : ''}`}
                        onClick={sortSiteCompletion}
                        >
                          Sort By
                          <svg
                            width="20"
                            height="18"
                            viewBox="0 0 20 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.9214 11.7442C18.7651 11.588 18.5532 11.5002 18.3322 11.5002C18.1112 11.5002 17.8993 11.588 17.743 11.7442L14.9989 14.4884V1.50002C14.9989 1.27901 14.9111 1.06705 14.7548 0.910765C14.5985 0.754484 14.3866 0.666687 14.1655 0.666687C13.9445 0.666687 13.7326 0.754484 13.5763 0.910765C13.42 1.06705 13.3322 1.27901 13.3322 1.50002V14.4884L10.588 11.7442C10.4309 11.5924 10.2204 11.5084 10.0019 11.5103C9.78338 11.5122 9.57437 11.5998 9.41986 11.7543C9.26535 11.9088 9.17771 12.1179 9.17581 12.3364C9.17391 12.5549 9.25791 12.7654 9.40971 12.9225L13.5764 17.0892C13.6538 17.1668 13.7457 17.2284 13.847 17.2704C13.9482 17.3124 14.0568 17.334 14.1664 17.334C14.276 17.334 14.3845 17.3124 14.4858 17.2704C14.587 17.2284 14.679 17.1668 14.7564 17.0892L18.923 12.9225C19.079 12.766 19.1665 12.554 19.1662 12.333C19.1659 12.112 19.0778 11.9002 18.9214 11.7442Z"
                              fill="#97B6CF"
                            />
                            <path
                              d="M10.5892 5.0775L6.42251 0.91084C6.34489 0.833074 6.25253 0.771594 6.15084 0.730007C5.94698 0.645743 5.71803 0.645743 5.51417 0.730007C5.41248 0.771594 5.32011 0.833074 5.2425 0.91084L1.07583 5.0775C0.919572 5.23398 0.831875 5.44612 0.832031 5.66726C0.832188 5.88839 0.920184 6.10041 1.07666 6.25667C1.23314 6.41293 1.44528 6.50062 1.66642 6.50047C1.88756 6.50031 2.09957 6.41231 2.25583 6.25584L5 3.51167V16.5C5 16.721 5.0878 16.933 5.24408 17.0892C5.40036 17.2455 5.61232 17.3333 5.83334 17.3333C6.05435 17.3333 6.26631 17.2455 6.4226 17.0892C6.57888 16.933 6.66667 16.721 6.66667 16.5V3.51167L9.41085 6.25584C9.56801 6.40763 9.77852 6.49163 9.99701 6.48973C10.2155 6.48783 10.4245 6.40019 10.579 6.24568C10.7335 6.09118 10.8212 5.88217 10.8231 5.66367C10.825 5.44517 10.741 5.23467 10.5892 5.0775Z"
                              fill="#97B6CF"
                            />
                          </svg>
                        </Button>
                      </div>
                    </div>
                    <Table className="fold-table" id="site_completion">
                      <thead>
                        <tr>
                          <th className="site_name">Site Name</th>
                          <th>Site Number</th>
                          <th>Country</th>
                          <th className="active-irt">
                            Active IRTs | Pharmacists
                          </th>
                          <th>Completed Training</th>
                        </tr>
                      </thead>
                      <tbody>
                        {siteCompletionTableData?.map((item, index) => {
                          return (
                            <>
                              <tr
                                className={`view ${
                                  siteCompletionShow == index ? "show" : ""
                                }`}
                                onClick={(e) => {
                                  siteCompletionShowData(e, index);
                                }}
                              >
                                <td className="site_name">{item?.site_name}</td>
                                <td>{item?.site_number}</td>
                                <td>{item?.site_country}</td>
                                <td className="active-irt">
                                  <span>{item?.total_user}</span>{" "}
                                  <img
                                    src={path_image + "doctor-svg.svg"}
                                    alt=""
                                  />
                                </td>
                                <td className="complete">
                                  {item?.completed_training}
                                </td>
                              </tr>

                              {siteCompletionShow == index ? (
                                <>
                                  <tr className="fold show">
                                   <td colspan="5" className="site_complete">
                                      {item?.Users?.length ? (
                                        item?.Users?.map((data, i) => {
                                          return (
                                            <>
                                              <Table>
                                                <thead>
                                                  <tr>
                                                    <th>Name</th>
                                                    <th>Role</th>
                                                    <th>Blind Type</th>
                                                    <th>Training</th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  <tr>
                                                    <td>{data?.first_name}</td>
                                                    <td>{data?.user_type}</td>
                                                    <td>{data?.binded}</td>
                                                    <td className="complete">
                                                      {data?.training}
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </Table>
                                            </>
                                          );
                                        })
                                      ) : (
                                       
                                    <div className="no_data">
                                      No Data Found
                                    </div>
                                    
                                      )}
                                   </td>
                                  </tr>
                                </>
                              ) : null}
                              <tr className="blank">
                                <td colspan="5" style={{ height: "10px;" }}>
                                  &nbsp;
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </div>
              ) : null}
              {/*Site Completion End*/}
              {/*Site Engagement */}
              {flag?.site_Engagement ? (
                <div className="rd-full-explain">
                  <div className="rd-section-title">
                    <h4>Non-mandatory Content</h4>
                  </div>
                  <div className="rd-training-block">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="rd-training-block-left">
                        <h4>
                          Site Engagement | <span>{rdSiteData?.length}</span>
                        </h4>
                        <p>Click on the Record to see more details</p>
                      </div>
                      <div
                        className="rd-training-block-right d-flex"
                        ref={site_Engagement}
                        tabIndex={-1}
                      >
                        <button
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                   
    
                    onClick={() => handleExport('table-to-xls')} // Call your export function here

                    />
                        {/* <Button title="Download stats">
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
                        </Button> */}
                        <Button 
                        //className="sort_btn"
                          className={`sort_btn ${isActive ? 'active' : ''}`}
                        onClick={handleSort}
                        >
                          Sort By
                          <svg
                            width="20"
                            height="18"
                            viewBox="0 0 20 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.9214 11.7442C18.7651 11.588 18.5532 11.5002 18.3322 11.5002C18.1112 11.5002 17.8993 11.588 17.743 11.7442L14.9989 14.4884V1.50002C14.9989 1.27901 14.9111 1.06705 14.7548 0.910765C14.5985 0.754484 14.3866 0.666687 14.1655 0.666687C13.9445 0.666687 13.7326 0.754484 13.5763 0.910765C13.42 1.06705 13.3322 1.27901 13.3322 1.50002V14.4884L10.588 11.7442C10.4309 11.5924 10.2204 11.5084 10.0019 11.5103C9.78338 11.5122 9.57437 11.5998 9.41986 11.7543C9.26535 11.9088 9.17771 12.1179 9.17581 12.3364C9.17391 12.5549 9.25791 12.7654 9.40971 12.9225L13.5764 17.0892C13.6538 17.1668 13.7457 17.2284 13.847 17.2704C13.9482 17.3124 14.0568 17.334 14.1664 17.334C14.276 17.334 14.3845 17.3124 14.4858 17.2704C14.587 17.2284 14.679 17.1668 14.7564 17.0892L18.923 12.9225C19.079 12.766 19.1665 12.554 19.1662 12.333C19.1659 12.112 19.0778 11.9002 18.9214 11.7442Z"
                              fill="#97B6CF"
                            />
                            <path
                              d="M10.5892 5.0775L6.42251 0.91084C6.34489 0.833074 6.25253 0.771594 6.15084 0.730007C5.94698 0.645743 5.71803 0.645743 5.51417 0.730007C5.41248 0.771594 5.32011 0.833074 5.2425 0.91084L1.07583 5.0775C0.919572 5.23398 0.831875 5.44612 0.832031 5.66726C0.832188 5.88839 0.920184 6.10041 1.07666 6.25667C1.23314 6.41293 1.44528 6.50062 1.66642 6.50047C1.88756 6.50031 2.09957 6.41231 2.25583 6.25584L5 3.51167V16.5C5 16.721 5.0878 16.933 5.24408 17.0892C5.40036 17.2455 5.61232 17.3333 5.83334 17.3333C6.05435 17.3333 6.26631 17.2455 6.4226 17.0892C6.57888 16.933 6.66667 16.721 6.66667 16.5V3.51167L9.41085 6.25584C9.56801 6.40763 9.77852 6.49163 9.99701 6.48973C10.2155 6.48783 10.4245 6.40019 10.579 6.24568C10.7335 6.09118 10.8212 5.88217 10.8231 5.66367C10.825 5.44517 10.741 5.23467 10.5892 5.0775Z"
                              fill="#97B6CF"
                            />
                          </svg>
                        </Button>
                      </div>
                    </div>
                    <Table className="fold-table" id="table-to-xls">
                      <thead>
                        <tr>
                          <th>Site</th>
                          <th>Site Number</th>
                          <th>Country</th>
                          <th>Site Users</th>
                          <th>Content engagement</th>
                        </tr>
                      </thead>
                      <tbody>
                      {rdSiteData?.map((item, index) => {
                          return (
                            <>
                              <tr
                                key={index}
                                className={`view ${
                                  show == index ? "show" : ""
                                }`}
                                onClick={(e) => rdShowData(e, index)}
                              >
                                <td>{item?.site_name}</td>
                                <td>{item?.site_number}</td>
                                <td>{item?.site_country}</td>
                                <td>{item?.site_users}</td>
                                <td>{item?.content_engagement}</td>
                              </tr>
                              {show == index ? (
                                <tr
                                  className="fold show"
                                  // className={`fold ${
                                  //   show && show == index ? "show" : ""
                                  // }`}
                                >
                                  {item?.pdf_data?.length ? (
                                    <td colspan="5">
                                      <div className="fold-content">
                                        <p>
                                          Content engagement |{" "}
                                          <span>{item?.pdf_data?.length}</span>
                                        </p>
                                        <span>
                                          Click on the content for more details
                                        </span>
                                        {item?.pdf_data?.map((data, i) => {
                                          return (
                                            <>
                                              <div className="d-flex align-items-start engagement-sec">
                                                <div className="content-image">
                                                  <img
                                                    src={
                                                      // path_image +
                                                      // "article-content.png"
                                                      data?.cover_img
                                                    }
                                                    alt="no image"
                                                  />
                                                </div>
                                                <div className="content-detail">
                                                  <h6>{data?.title}</h6>
                                                  <p>{data?.pdf_sub_title}</p>
                                                  <div className="page-count">
                                                    <div className="time">
                                                      {data?.file_type ==
                                                      "pdf" ? (
                                                        <>
                                                          Pages{" "}
                                                          <span>
                                                            {data?.total_pages}
                                                          </span>
                                                        </>
                                                      ) : data?.file_type ==
                                                        "video" ? (
                                                        <>
                                                          Time{" "}
                                                          <span>
                                                            {data?.max_time}
                                                          </span>
                                                        </>
                                                      ) : null}
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="pages-viewer">
                                                  {data?.unique_users}{" "}
                                                  <img
                                                    src="componentAssets/images/viewer.svg"
                                                    alt=""
                                                  />
                                                </div>
                                              </div>
                                            </>
                                          );
                                        })}
                                      </div>
                                    </td>
                                  ) : (
                                    <td colspan="5">
                                    <div className="no_data">
                                      No Data Found
                                    </div>
                                    </td>
                                  )}
                                </tr>
                              ) : null}

                              <tr className="blank">
                                <td colspan="5" style={{ height: "10px" }}>
                                  &nbsp;
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </div>
              ) : null}
              {/*Site Engagement End*/}
              {/*Content*/}
              {flag?.content ? (
                <div className="rd-full-explain">
                  <div className="rd-section-title">
                    <h4>Contents</h4>
                  </div>
                  <div className="rd-training-block">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="rd-training-block-left">
                        <h4>
                          Contents |{" "}
                          <span>{mostPopularContentData?.length + 1}</span>
                        </h4>
                        <p>Click on the Record to see more details</p>
                      </div>
                    </div>
                    {mostPopularContentData?.map((item, index) => (
                      <div className="fold-content contents">
                        <Accordion>
                          <Accordion.Item
                            key={index}
                            eventKey={index.toString()}
                           
                          >
                            <Accordion.Header  onClick={() =>
                              getMostPopularContentPageData(item?.pdf?.id)
                            }>
                              <div className="d-flex align-items-start engagement-sec">
                                <div className="content-image">
                                  <img
                                    src={path_image + "article-content.png"}
                                    alt=""
                                  />
                                </div>
                                <div className="content-detail">
                                  <h6>{item.pdf.title}</h6>
                                  <p>{item?.pdf?.pdf_sub_title}</p>
                                  <div className="page-count">
                                    <div className="time">
                                      {item?.total_pages ||
                                      item?.total_pages === 0
                                        ? "Pages:"
                                        : "Time:"}
                                      <span>
                                        {item?.total_pages ||
                                        item?.total_pages === 0
                                          ? item.total_pages
                                          : item?.max_time}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div class="pages-viewer">
                                  {item.watched_count}{" "}
                                  <img src={path_image + "viewer.svg"} alt="" />
                                </div>
                              </div>
                            </Accordion.Header>
                            <Accordion.Body>
                              <div className="article-pages-details d-flex">
                                {mostPopularContentPageData[item.pdf?.id]
                                  ?.length > 0 &&
                                  mostPopularContentPageData[item.pdf?.id].map(
                                    (pdf, index) => (
                                      <div
                                        className="article-page-show"
                                        key={index}
                                      >
                                        <div className="article-cover-img">
                                          <img src={pdf.article_image} alt="" />
                                        </div>
                                        <div className="article-detail-view">
                                          <div className="article-page-number">
                                            Page {pdf.page}
                                          </div>
                                          <div className="article-spanrd-time">
                                            Read | Watched{" "}
                                            <span>{pdf.read_watched} <img src={path_image + "eye-watch.svg"} alt="" /></span>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item
                            eventKey="10"
                            className={isActive ? 'accordion-read active' : 'accordion-read'} onClick={handleClick}
                           
                          >
                            <Accordion.Header  onClick={() =>
                              getMostPopularContentSiteData(item?.pdf?.id)
                            }>
                              <div className="d-flex align-items-center justify-content-center">
                                Who Read | Watched at each site{" "}
                                <img
                                  src={path_image + "accordian_arrow.svg"}
                                  alt=""
                                />
                              </div>
                            </Accordion.Header>
                            {mostPopularContentSiteData[item.pdf?.id]?.length >
                              0 && (
                              <>
                                <Accordion.Body>
                                  <div className="contents-block d-flex">
                                    <div className="contents-block-left">
                                      <Table>
                                        <thead>
                                          <tr>
                                            <th>Site</th>
                                            <th>Site Number</th>
                                            <th className="short_value">
                                              <Button 
                                            // className="sort_btn"
                                              className={`sort_btn ${isActive ? 'active' : ''}`}
                                               onClick={()=>sortContentView(item.pdf?.id)}
                                              >
                                                Sort By
                                                <svg
                                                  width="20"
                                                  height="18"
                                                  viewBox="0 0 20 18"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path
                                                    d="M18.9214 11.7442C18.7651 11.588 18.5532 11.5002 18.3322 11.5002C18.1112 11.5002 17.8993 11.588 17.743 11.7442L14.9989 14.4884V1.50002C14.9989 1.27901 14.9111 1.06705 14.7548 0.910765C14.5985 0.754484 14.3866 0.666687 14.1655 0.666687C13.9445 0.666687 13.7326 0.754484 13.5763 0.910765C13.42 1.06705 13.3322 1.27901 13.3322 1.50002V14.4884L10.588 11.7442C10.4309 11.5924 10.2204 11.5084 10.0019 11.5103C9.78338 11.5122 9.57437 11.5998 9.41986 11.7543C9.26535 11.9088 9.17771 12.1179 9.17581 12.3364C9.17391 12.5549 9.25791 12.7654 9.40971 12.9225L13.5764 17.0892C13.6538 17.1668 13.7457 17.2284 13.847 17.2704C13.9482 17.3124 14.0568 17.334 14.1664 17.334C14.276 17.334 14.3845 17.3124 14.4858 17.2704C14.587 17.2284 14.679 17.1668 14.7564 17.0892L18.923 12.9225C19.079 12.766 19.1665 12.554 19.1662 12.333C19.1659 12.112 19.0778 11.9002 18.9214 11.7442Z"
                                                    fill="#97B6CF"
                                                  />
                                                  <path
                                                    d="M10.5892 5.0775L6.42251 0.91084C6.34489 0.833074 6.25253 0.771594 6.15084 0.730007C5.94698 0.645743 5.71803 0.645743 5.51417 0.730007C5.41248 0.771594 5.32011 0.833074 5.2425 0.91084L1.07583 5.0775C0.919572 5.23398 0.831875 5.44612 0.832031 5.66726C0.832188 5.88839 0.920184 6.10041 1.07666 6.25667C1.23314 6.41293 1.44528 6.50062 1.66642 6.50047C1.88756 6.50031 2.09957 6.41231 2.25583 6.25584L5 3.51167V16.5C5 16.721 5.0878 16.933 5.24408 17.0892C5.40036 17.2455 5.61232 17.3333 5.83334 17.3333C6.05435 17.3333 6.26631 17.2455 6.4226 17.0892C6.57888 16.933 6.66667 16.721 6.66667 16.5V3.51167L9.41085 6.25584C9.56801 6.40763 9.77852 6.49163 9.99701 6.48973C10.2155 6.48783 10.4245 6.40019 10.579 6.24568C10.7335 6.09118 10.8212 5.88217 10.8231 5.66367C10.825 5.44517 10.741 5.23467 10.5892 5.0775Z"
                                                    fill="#97B6CF"
                                                  />
                                                </svg>
                                              </Button>{" "}
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {mostPopularContentSiteData[
                                            item.pdf?.id
                                          ].map((pdf, index) => (
                                            <tr key={index}>
                                              {" "}
                                              {/* Add key prop with a unique value */}
                                              <td>{pdf.site_name}</td>
                                              <td>{pdf.site_number}</td>
                                              <td className="short_value">
                                                {pdf.count}{" "}
                                                <img
                                                  src="componentAssets/images/viewer.svg"
                                                  alt=""
                                                />
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </Table>
                                    </div>
                                    <div className="contents-block-right">
                                      <h4>Used Devices</h4>
                                      <div className="used-device-detail">
                                        <HighchartsReact
                                          highcharts={Highcharts}
                                          options={
                                            chartOptions[item.pdf?.id]
                                              ?.chart_data
                                          }
                                        />
                                        <div className="used-device-detail d-flex align-items-center">
                                          {chartOptions[
                                            item.pdf?.id
                                          ]?.device_names?.map(
                                            (item, index) => (
                                              <p key={index}><span></span>{item}</p>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Accordion.Body>
                              </>
                            )}
                          </Accordion.Item>
                        </Accordion>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              {/*Content End*/}
            </div>
          </Row>
        </div>
      </Col>
    </>
  );
};

export default RDAnalytics;
