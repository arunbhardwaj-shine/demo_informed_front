import React, { useEffect, useRef, useState } from "react";
import {
  Accordion,
  Button,
  Col,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from "react-bootstrap";
import { getData, postData } from "../../axios/apiInstanceHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import { loader } from "../../loader";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import IndividualCompletion from "./IndividualCompletion";
import SiteCompletion from "./SiteCompletion";
import SiteEngagement from "./SiteEngagement";
import PopularContent from "./PopularContent";
const color = ["#fee9b9", "#fec037", "#e4a923", "#c28b0c"];
const RDAnalytics = () => {
  const [show, setShow] = useState();
  const [totalSiteNumber, setTotalSiteNumber] = useState();
  const [chartOptions, setChartOptions] = useState();
  const [rdSiteData, setRdSiteData] = useState();
  // const [pieData, setPieData] = useState({});
  const [flag, setFlag] = useState({
    individual_Completion: false,
    site_Completion: false,
    site_Engagement: false,
    content: false,
    top_content: false,
  });
  const [sortSite, setSortSite] = useState(false);
  const [activeAccordionKey, setActiveAccordionKey] = useState(null);
  const [indidualCompletionTableData, setIndividualCompletionTableData] =
    useState();
  const [individualCompletionShow, setIndividualCompletionShow] = useState();
  const [trainingDropdownData, setTrainingCompletionDropdownData] = useState();
  const [trainingAccordianShow, setTrainingAccordianShow] = useState();
  const [traingAccordianData, setTrainingAccordianData] = useState();
  const [trainingCertificate, setTrainingCertificate] = useState();

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

  const [siteCompletionShow, setSiteCompletionShow] = useState();
  const [sortDirection, setSortDirection] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [lastSortedPDFId, setLastSortedPDFId] = useState(null);

  const individual_Completion = useRef(null);
  const site_Completion = useRef(null);
  const site_Engagement = useRef(null);
  const content = useRef(null);
  const top_content = useRef(null);
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const handleClick = (event) => {
    setIsActive((current) => !current);
  };

  Highcharts.setOptions({
    colors: ["#FFCACD", "#39CABC"],
  });

  const getMostPopularContentPageData = async (pdf_id) => {
    setIsContentSiteAccordionOpen({
      ...isContentSiteAccordionOpen,
      [pdf_id]: false,
    });
    setIsContentSiteAccordionOpen([]);

    loader("show");

    try {
      loader("show");
      if (
        !isContentPageAccordionOpen[pdf_id] ||
        isContentPageAccordionOpen[pdf_id] == undefined
      ) {
        const result = await postData(ENDPOINT.MOST_POPULAR_PAGE_CONTENT, {
          pdf_id: pdf_id,
        });
        const data = result?.data?.data;
        setMostPopularContentPageData((prevData) => ({
          ...prevData,
          [pdf_id]: data.time_spend_on_pdf,
        }));

        setIsContentPageAccordionOpen({
          ...isContentPageAccordionOpen,
          [pdf_id]: true,
        });
      } else {
        setIsContentPageAccordionOpen({
          ...isContentPageAccordionOpen,
          [pdf_id]: false,
        });
      }
    } catch (err) {
      console.log("--err", err);
    } finally {
      loader("hide");
    }
  };

  const getMostPopularContentSiteData = async (pdf_id) => {
    setIsContentPageAccordionOpen({
      ...isContentPageAccordionOpen,
      [pdf_id]: false,
    });

    loader("show");

    try {
      loader("show");
      if (
        !isContentSiteAccordionOpen[pdf_id] ||
        isContentSiteAccordionOpen[pdf_id] == undefined
      ) {
        const result = await postData(ENDPOINT.MOST_POPULAR_SITE_CONTENT, {
          pdf_id: pdf_id,
        });

        const data = result?.data?.data?.site_data;
        const chart_data = result?.data?.data?.chart_data;

        // set accordian data options //
        setMostPopularContentSiteData((prevData) => ({
          ...prevData,
          [pdf_id]: data,
        }));
        // Set chart data options for the PDF
        setChartOptions((prevOptions) => ({
          ...prevOptions,

          [pdf_id]: {
            chart_data: {
              chart: {
                type: "pie",
                height: 300,
              },
              title: {
                text: "",
              },
              subtitle: {
                text: `<p>Devices</p></br></br></br><span >${chart_data.totalDevices}</span>`,

                verticalAlign: "middle",

                y: 15,
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

                    color: color[(index % chart_data.deviceNames.length) + 1],
                  })),

                  size: "80%",

                  innerSize: "65%",
                },
              ],
            },
            device_names: chart_data.deviceNames,
          },
        }));
        setIsContentSiteAccordionOpen({
          ...isContentSiteAccordionOpen,
          [pdf_id]: true,
        });
        // loader("hide");
      } else {
        setIsContentSiteAccordionOpen({
          ...isContentSiteAccordionOpen,
          [pdf_id]: false,
        });
      }
    } catch (err) {
      // loader("hide");
      console.log("--err", err);
    } finally {
      loader("hide");
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
    try {
      loader("show");
      setFlag({
        site_Completion: false,
        site_Engagement: false,
        content: false,
        top_content: false,
        individual_Completion: true,
      });
      if (!indidualCompletionTableData) {
        const result = await postData(ENDPOINT.INDIVIDUAL_TRAINING_COMPLETION);
        setIndividualCompletionTableData(result?.data?.data);
        individual_Completion?.current?.focus();
        loader("hide");
      } else {
        setTimeout(() => {
          individual_Completion?.current?.focus();
          loader("hide");
        }, 500);
      }
    } catch (err) {
      loader("hide");
      console.log("-err", err);
    }
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
        setTrainingCompletionDropdownData(result?.data?.data?.data);
        setTrainingCertificate(result?.data?.data?.certificate);

        loader("hide");
      } catch (err) {
        loader("hide");
        console.log("-err", err);
      }
      setIndividualCompletionShow(index);
    }
  };

  const individualTrainingDropdown = async (e, i, userId, pdfId, fileType) => {
    try {
      loader("show");
      if (trainingAccordianShow == i) {
        setTrainingAccordianShow();
      } else {
        let body = {
          user_id: userId,
          pdf_id: pdfId,
          file_type: fileType,
        };
        const result = await postData(
          ENDPOINT.TRAINING_COMPLETION_PAGE_CLICK,
          body
        );

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
    try {
      loader("show");
      setFlag({
        individual_Completion: false,
        site_Engagement: false,
        content: false,
        top_content: false,
        site_Completion: true,
      });
      if (!siteCompletionTableData) {
        const result = await getData(ENDPOINT.SITE_REGISTRATION_LIST);
        setSiteCompletionTableData(result?.data?.data);
        console.log(result?.data?.data);
        site_Completion?.current?.focus();
        loader("hide");
      } else {
        setTimeout(() => {
          loader("hide");
          site_Completion?.current?.focus();
        }, 500);
      }
    } catch (err) {
      loader("hide");
      console.log("-err", err);
    }
  };

  const mostPopularContent = () => {
    try {
      setIsContentSiteAccordionOpen([]);
      setIsContentPageAccordionOpen([]);
      loader("show");
      setFlag({
        individual_Completion: false,
        site_Completion: false,
        site_Engagement: false,
        top_content: false,
        content: true,
      });
      setIsContentSiteAccordionOpen([]);
      setIsContentPageAccordionOpen([]);
      setTimeout(() => {
        content?.current?.focus();
        loader("hide");
      }, 1000);
    } catch (err) {
      console.log("--err", err);
    }
  };

  const topContentTableFn = () => {
    try {
      loader("show");
      setFlag({
        individual_Completion: false,
        site_Completion: false,
        site_Engagement: false,
        content: false,
        top_content: true,
      });
      setTimeout(() => {
        top_content?.current?.focus();
      }, 1000);
    } catch (err) {
      console.log("--err", err);
    } finally {
      loader("hide");
    }
  };

  const siteEngagementFun = () => {
    try {
      loader("show");

      setFlag({
        individual_Completion: false,
        site_Completion: false,
        content: false,
        top_content: false,
        site_Engagement: true,
      });
      setTimeout(() => {
        site_Engagement?.current?.focus();
        loader("hide");
      }, 500);
    } catch (err) {
      loader("hide");
      console.log("--err", err);
    }
  };

  const siteEngagementSort = () => {
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
    const sortedSiteCompletionTableData = [...siteCompletionTableData].sort(
      (a, b) => {
        const siteNumberA = a.site_number.toLowerCase();
        const siteNumberB = b.site_number.toLowerCase();

        if (sortDirection === 0) {
          if (siteNumberA > siteNumberB) return -1;
          if (siteNumberA < siteNumberB) return 1;
          return 0;
        } else {
          if (siteNumberA < siteNumberB) return -1;
          if (siteNumberA > siteNumberB) return 1;
          return 0;
        }
      }
    );

    setSiteCompletionTableData(sortedSiteCompletionTableData);
    setSortDirection(sortDirection === 0 ? 1 : 0); // Toggle the sort direction
    setIsActive(!isActive);
  };

  const sortIndividualCompletion = () => {
    const sortedIndividualCompletion = [...indidualCompletionTableData].sort(
      (a, b) => {
        const siteNumberA = a.training_status.toLowerCase();
        const siteNumberB = b.training_status.toLowerCase();
        if (sortDirection === 0) {
          if (siteNumberA > siteNumberB) return -1;
          if (siteNumberA < siteNumberB) return 1;
          return 0;
        } else {
          if (siteNumberA < siteNumberB) return -1;
          if (siteNumberA > siteNumberB) return 1;
          return 0;
        }
      }
    );
    setIndividualCompletionTableData(sortedIndividualCompletion);
    setSortDirection(sortDirection === 0 ? 1 : 0); // Toggle the sort direction
    setIsActive(!isActive);
  };

  const sortContentView = (pdfId) => {
    const sortedContentViewObject = { ...mostPopularContentSiteData };

    if (!sortedContentViewObject.hasOwnProperty(pdfId)) {
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

    const updatedContentViewObject = {
      ...sortedContentViewObject,
      [pdfId]: sortedArray,
    };
    setMostPopularContentSiteData(updatedContentViewObject);

    if (lastSortedPDFId === pdfId) {
      setSortDirection(sortDirection === 0 ? 1 : 0);
    }
    setSortDirection(sortDirection === 0 ? 1 : 0);
    setLastSortedPDFId(pdfId);
    setIsActive(!isActive);
  };
  const handleExportSiteCompletion = (siteCompletionTableData) => {
    const base64 = (s) => {
      return window.btoa(unescape(encodeURIComponent(s)));
    };

    const format = (s, c) => {
      return s.replace(/{(\w+)}/g, function (m, p) {
        return c[p];
      });
    };

    const exportTable = document.createElement("table");

    // Create headings for the parent table
    const parentTableHeadings = document.createElement("tr");
    parentTableHeadings.innerHTML = `
      <th>No </th>
      <th class="site_name">Site name</th>
      <th>Site number</th>
      <th>Country</th>
      <th class="active-irt">Active IRTs</th>
      <th>Completed training</th>
    `;
    exportTable.appendChild(parentTableHeadings);

    siteCompletionTableData.forEach((siteData, index) => {
      const siteRow = document.createElement("tr");

      // Create table cells for site data
      const serialNoCell = document.createElement("td");
      serialNoCell.textContent = index + 1;
      siteRow.appendChild(serialNoCell);

      const siteNameCell = document.createElement("td");
      siteNameCell.textContent = siteData.site_name;
      siteRow.appendChild(siteNameCell);

      const siteNumberCell = document.createElement("td");
      siteNumberCell.textContent = siteData.site_number;
      siteRow.appendChild(siteNumberCell);

      const siteCountryCell = document.createElement("td");
      siteCountryCell.textContent = siteData.site_country;
      siteRow.appendChild(siteCountryCell);

      const totalUserCell = document.createElement("td");
      totalUserCell.textContent = siteData.total_user;
      siteRow.appendChild(totalUserCell);

      const completedTrainingCell = document.createElement("td");
      completedTrainingCell.textContent = siteData.completed_training;
      siteRow.appendChild(completedTrainingCell);

      exportTable.appendChild(siteRow);

      if (siteData.Users && siteData.Users.length > 0) {
        const userTableHeadings = document.createElement("tr");
        userTableHeadings.innerHTML = `
        <th></th>
          <th>Name</th>
          <th>Role</th>
          <th>Blind type</th>
          <th>Training</th>
        `;
        exportTable.appendChild(userTableHeadings);

        siteData.Users.forEach((user) => {
          const userRow = document.createElement("tr");
          const EmptyCell = document.createElement("td");
          EmptyCell.textContent = " ";
          userRow.appendChild(EmptyCell);
          // Create table cells for user data
          const firstNameCell = document.createElement("td");
          firstNameCell.textContent = user.first_name;
          userRow.appendChild(firstNameCell);

          const userTypeCell = document.createElement("td");
          userTypeCell.textContent = user.user_type;
          userRow.appendChild(userTypeCell);

          const bindedCell = document.createElement("td");
          bindedCell.textContent = user.binded;
          userRow.appendChild(bindedCell);

          const trainingCell = document.createElement("td");
          trainingCell.textContent = user.training;
          userRow.appendChild(trainingCell);

          exportTable.appendChild(userRow);
        });
      }

      // Add a blank row after each site
      const blankRow = document.createElement("tr");
      exportTable.appendChild(blankRow);
    });

    // Generate the Excel file
    const uri = "data:application/vnd.ms-excel;base64,";
    const template =
      '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-mic' +
      'rosoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta cha' +
      'rset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:Exce' +
      "lWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>" +
      "</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></" +
      "xml><![endif]--></head><body>{table}</body></html>";

    const context = {
      worksheet: "Sheet1",
      table: exportTable.outerHTML,
    };

    const randomPrefix = "site_completion_"
    const element = document.createElement("a");
    element.href = uri + base64(format(template, context));
    element.download = `${randomPrefix}_.xls`;
    element.click();
  };

  const handleExport = (tableName) => {
    const table = document.getElementById(tableName);
    const rows = table.getElementsByTagName("tr");
    const base64 = (s) => {
      return window.btoa(unescape(encodeURIComponent(s)));
    };

    const format = (s, c) => {
      return s.replace(/{(\w+)}/g, function (m, p) {
        return c[p];
      });
    };

    const filteredRows = Array.from(rows).filter((row, index) => {
      const classNames = row.className.split(" ");
      return (
        !classNames.includes("fold") &&
        !classNames.includes("fold-content") &&
        !classNames.includes("show") &&
        !classNames.includes("doctor") &&
        index !== 0 // Exclude the first row (header row)
      );
    });

    // Create a new table element and copy the header row
    const exportTable = document.createElement("table");
    const headerRow = table.getElementsByTagName("thead")[0].cloneNode(true);
    exportTable.appendChild(headerRow);

    // Copy the filtered rows to the export table
    filteredRows.forEach((row) => {
      const clonedRow = row.cloneNode(true);
      exportTable.appendChild(clonedRow);
    });

    // console.log(exportTable);
    // Remove the empty rows with class "blank"
    const blankRows = exportTable.getElementsByClassName("blank");
    Array.from(blankRows).forEach((blankRow) => {
      blankRow.remove();
    });

    // Remove the td whose class is pics in exportTable
    const pics = exportTable.getElementsByClassName("pics");
    Array.from(pics).forEach((pic) => {
      pic.remove();
    });

    // Remove the img element from the td with class="active-irt"
    const activeIRTRows = exportTable.getElementsByClassName("doctor");
    Array.from(activeIRTRows).forEach((row) => {
      row.remove();
    });

    // Generate the Excel file
    const uri = "data:application/vnd.ms-excel;base64,";
    const template =
      '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-mic' +
      'rosoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta cha' +
      'rset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:Exce' +
      "lWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>" +
      "</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></" +
      "xml><![endif]--></head><body>{table}</body></html>";

    const context = {
      worksheet: "Sheet1",
      table: exportTable.outerHTML,
    };

    // const randomPrefix =
    //   `site_completion_` + Math.random().toString(36).substring(7); // Generate a random string
    const element = document.createElement("a");
    element.href = uri + base64(format(template, context));
    element.download = `${tableName}_.xls`; // Use the random prefix in the file name
    element.click();

    // Insert the removed blank rows after the table generation
    Array.from(blankRows).forEach((blankRow) => {
      exportTable.appendChild(blankRow);
    });
  };
  const tooltip = (
    <Tooltip id="tooltip">
      The number of individual users who viewed the content
    </Tooltip>
  );
  function downloadCertificate(certificate_link,event) {
    console.log(certificate_link)
    fetch(certificate_link)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'certificate_.pdf';
        link.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Error:', error);
      });
      event.stopPropagation();
  }
  

  return (
    <>
      <Col className="right-sidebar">
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
                      <IndividualCompletion
                        individualCompletionfn={individualCompletion}
                      />
                    </Col>
                    <Col md={6} lg={8}>
                      <SiteCompletion siteCompletionfn={siteCompletion} />
                    </Col>
                    <Col md={12} lg={12}>
                      <SiteEngagement
                        siteEngagementfun={siteEngagementFun}
                        setRdSiteData={setRdSiteData}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col md={12} lg={3}>
                  <PopularContent
                    mostPopularContentFn={mostPopularContent}
                    setMostPopularContentData={setMostPopularContentData}
                    topContentTableFn={topContentTableFn}
                  />
                </Col>
              </Row>
              {flag?.individual_Completion ? (
                <div className="rd-full-explain">
                  <div className="rd-section-title">
                    <h4>IRT Mandatory Training</h4>
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
                        <Button
                          title="Download stats"
                          onClick={() => handleExport("individual_completion")}
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

                        <Button
                          className={`sort_btn ${isActive ? "active" : ""}`}
                          onClick={sortIndividualCompletion}
                        >
                          Sort By{" "}
                          <img src={path_image + "sort.svg"} alt="Shorting" />
                        </Button>
                      </div>
                    </div>
                    <Table className="fold-table" id="individual_completion">
                      <thead>
                        <tr>
                          <th>Site</th>
                          <th>Name</th>
                          <th>Role</th>
                          <th>Training</th>
                          <th>Last activity</th>
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
                                <td>
                                  {item?.site_name ? item?.site_name : "NA"}
                                </td>
                                <td>
                                  {item?.username
                                    ? item?.username?.charAt(0).toUpperCase() +
                                      item?.username.slice(1)
                                    : "NA"}
                                </td>
                                <td>
                                  {item?.user_type ? item?.user_type : "NA"}
                                </td>

                                <td
                                  className={
                                    item?.training_status_code == 0
                                      ? "complete"
                                      : item?.training_status_code == 1
                                      ? "started"
                                      : item?.training_status == "completed"
                                      ? "complete"
                                      : "not_yet"
                                  }
                                >
                                  {item?.training_status_code == "0"
                                    ? "Complete"
                                    : item?.training_status_code == "1"
                                    ? "Started"
                                    : item?.training_status_code == "2"
                                    ? "Not yet"
                                    : null}
                                </td>

                                <td>
                                  {item?.last_activity
                                    ? item.last_activity
                                    : "NA"}
                                </td>

                                <td className="pics">
                                {item?.training_status_code === 0 ? (
  <div>
    <img
      src={path_image + "certificate.png"}
      alt="Certificate"
      onClick={(event)=>downloadCertificate(item?.certificate_link,event)}
    />
  </div>
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
                                      {/* <span>
                                        Click on the content for more details
                                      </span> */}
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
                                                      data?.id,
                                                      data?.file_type
                                                    )
                                                  }
                                                >
                                                  <Accordion.Header>
                                                    <div className="d-flex align-items-start">
                                                      <div className="content-image">
                                                        <img
                                                          src={
                                                            data?.article_image
                                                          }
                                                          // src={
                                                          //   path_image +
                                                          //   "lex-book-cover.png"
                                                          // }
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
                                                            {item?.training_status_code ==
                                                            0 ? (
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

                                      {trainingCertificate?.length ? (
                                        <Accordion>
                                          {trainingCertificate?.map(
                                            (item, index) => {
                                              return (
                                                <>
                                                  <Accordion.Item
                                                    eventKey={index}
                                                  >
                                                    <Accordion.Header>
                                                      <div className="d-flex align-items-start">
                                                        <div className="content-image">
                                                          <img
                                                            src={
                                                              item?.certificateImage
                                                              // path_image +
                                                              // "article-content.png"
                                                            }
                                                            alt=""
                                                          />
                                                        </div>
                                                        <div className="content-detail">
                                                          <h6>{item?.type}</h6>

                                                          <div className="page-count">
                                                            <div className="time">
                                                              {" "}
                                                              <span></span>
                                                            </div>
                                                            
                                                            <div className="completed-date certificate-download">
                                                              <Button
                                                                  title="Download stats"
                                                                  onClick={(event)=>downloadCertificate(item?.pdf_link,event)}
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
                                                              <div className="certificate-issue">
                                                              Issued date
                                                              <span className="complete">
                                                                {item?.date}
                                                                <img
                                                                  src={
                                                                    path_image +
                                                                    "check-complete.svg"
                                                                  }
                                                                  alt=""
                                                                />
                                                              </span>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </Accordion.Header>
                                                    <Accordion.Body></Accordion.Body>
                                                  </Accordion.Item>
                                                </>
                                              );
                                            }
                                          )}
                                        </Accordion>
                                      ) : null}
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
                        <Button
                          title="Download stats"
                          onClick={() =>
                            handleExportSiteCompletion(siteCompletionTableData)
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
                        <Button
                          className={`sort_btn ${isActive ? "active" : ""}`}
                          onClick={sortSiteCompletion}
                        >
                          Sort By{" "}
                          <img src={path_image + "sort.svg"} alt="Shorting" />
                        </Button>
                      </div>
                    </div>
                    <Table className="fold-table" id="site_completion">
                      <thead>
                        <tr>
                          <th className="site_name">Site name</th>
                          <th>Site number</th>
                          <th>Country</th>
                          <th className="active-irt">Active IRTs</th>
                          <th>Completed training</th>
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
                                    className="doctor"
                                  />
                                </td>
                                <td className="complete">
                                  {item?.completed_training}
                                </td>
                              </tr>

                              {siteCompletionShow === index ? (
                                <>
                                  <tr className="fold show">
                                    <td colspan="5" className="site_complete">
                                      {item?.Users?.length ? (
                                        <Table>
                                          <thead>
                                            <tr>
                                              <th>Name</th>
                                              <th>Role</th>
                                              <th>Blind type</th>
                                              <th>Training</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {item?.Users.map((data, i) => (
                                              <tr key={i}>
                                                <td>
                                                  {data?.first_name
                                                    ? data?.first_name
                                                    : "NA"}
                                                </td>
                                                <td>
                                                  {data?.user_type
                                                    ? data?.user_type
                                                    : "NA"}
                                                </td>
                                                <td>{data?.binded}</td>
                                                <td
                                                  className={
                                                    data?.training_status_code ==
                                                    "0"
                                                      ? "complete"
                                                      : "not_yet"
                                                  }
                                                >
                                                  {data?.training_status_code ==
                                                  "0"
                                                    ? "Completed"
                                                    : data?.training_status_code ==
                                                      "1"
                                                    ? "Not yet"
                                                    : null}
                                                </td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </Table>
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
                  <div
                    className="rd-training-block"
                    ref={site_Engagement}
                    tabIndex={-1}
                  >
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
                          onClick={() => handleExport("site_engagement")} // Call your export function here
                        />

                        <Button
                          className={`sort_btn ${isActive ? "active" : ""}`}
                          onClick={siteEngagementSort}
                        >
                          Sort By
                          <img src={path_image + "sort.svg"} alt="Shorting" />
                        </Button>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <Table className="fold-table" id="site_engagement">
                        <thead>
                          <tr>
                            <th>Site</th>
                            <th>Site number</th>
                            <th>Country</th>
                            <th>Site users</th>
                            <th>Content engagement</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rdSiteData?.map((item, index) => {
                            return (
                              <>
                                {item?.site_users != 0 && (
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
                                )}
                                {show == index ? (
                                  <tr className="fold show">
                                    {item?.pdf_data?.length ? (
                                      <td colspan="5">
                                        <div className="fold-content">
                                          <p>
                                            Content engagement |{" "}
                                            <span>
                                              {item?.pdf_data?.length}
                                            </span>
                                          </p>

                                          {item?.pdf_data?.map((data, i) => {
                                            return (
                                              <>
                                                <div className="d-flex align-items-start engagement-sec">
                                                  <div className="content-image">
                                                    <img
                                                      src={data?.cover_img}
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
                                                              {
                                                                data?.total_pages
                                                              }
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
                                                  <div className="pages-viewer">
                                                    {data?.unique_users}{" "}
                                                    <div className="popular-tooltip">
                                                      <OverlayTrigger
                                                        placement="left"
                                                        overlay={tooltip}
                                                      >
                                                        <img
                                                          src="componentAssets/images/viewer.svg"
                                                          alt=""
                                                        />
                                                      </OverlayTrigger>
                                                    </div>
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
                      <div
                        className="rd-training-block-left"
                        ref={content}
                        tabIndex={-1}
                      >
                        <h4>
                          Contents |{" "}
                          <span>{mostPopularContentData && mostPopularContentData.length > 0 ?mostPopularContentData?.length + 1:0}</span>
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
                            <Accordion.Header
                              onClick={() =>
                                getMostPopularContentPageData(item?.pdf?.id)
                              }
                            >
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
                                <div className="pages-viewer">
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
                                          {/* <img src={pdf.article_image} alt="" /> */}
                                          <div className="page-number">
                                          Page {pdf.page}
                                            </div>
                                        </div>
                                        <div className="article-detail-view">
                                          {/* <div className="article-page-number">
                                            Page {pdf.page}
                                          </div> */}
                                          <div className="article-spanrd-time">
                                            Read | Watched{" "}
                                            <span>
                                              {pdf.read_watched}{" "}
                                              <img
                                                src={
                                                  path_image + "eye-watch.svg"
                                                }
                                                alt=""
                                              />
                                            </span>
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
                            className={
                              activeAccordionKey === "10"
                                ? "accordion-read active"
                                : "accordion-read"
                            }
                            onClick={() => setActiveAccordionKey("10")}
                          >
                            <Accordion.Header
                              onClick={() => {
                                getMostPopularContentSiteData(
                                  item?.pdf?.id,
                                  index
                                );
                              }}
                            >
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
                                            <th>Site number</th>
                                            <th className="short_value">
                                              <Button
                                                className={`sort_btn ${
                                                  isActive ? "active" : ""
                                                }`}
                                                onClick={() => {
                                                  sortContentView(item.pdf?.id);
                                                }}
                                              >
                                                Sort By{" "}
                                                <img
                                                  src={path_image + "sort.svg"}
                                                  alt="Shorting"
                                                />
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
                                              <>
                                                <p key={index}>
                                                  <span
                                                    style={{
                                                      backgroundColor:
                                                        color[index],
                                                      borderRadius: "100%",
                                                      width: "15px",
                                                      height: "15px",
                                                    }}
                                                  ></span>
                                                  {item}
                                                </p>
                                              </>
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
              {flag?.top_content ? (
                <div className="rd-full-explain">
                  <div className="rd-section-title">
                    <h4>Top Content</h4>
                  </div>
                  <div className="rd-training-block">
                    <div className="d-flex align-items-center justify-content-between">
                      <div
                        className="rd-training-block-left"
                        ref={top_content}
                        tabIndex={-1}
                      >
                        <h4>
                          Top Content |{" "}
                          {/* <span>{topContentTableData?.length}</span> */}
                        </h4>
                        <p></p>
                      </div>
                      <div className="rd-training-block-right d-flex">
                        <Button
                          title="Download stats"
                          onClick={() => handleExport("site_completion")}
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
                        <Button
                          className={`sort_btn ${isActive ? "active" : ""}`}
                          onClick={sortSiteCompletion}
                        >
                          Sort By{" "}
                          <img src={path_image + "sort.svg"} alt="Shorting" />
                        </Button>
                      </div>
                    </div>
                    <Table className="fold-table" id="site_completion">
                      <thead>
                        <tr>
                          <th className="site_name">Site name</th>
                          <th>Site number</th>
                          <th>Country</th>
                          <th className="active-irt">Active IRTs</th>
                          <th>Completed training</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {siteCompletionTableData?.map((item, index) => {
                          return (
                            <> */}
                        <tr
                          // className={`view ${
                          //   siteCompletionShow == index ? "show" : ""
                          // }`}
                          // onClick={(e) => {
                          //   siteCompletionShowData(e, index);
                          // }}
                          className={"view"}
                        >
                          <td className="site_name">
                            {/* {item?.site_name} */}
                            Here site name
                          </td>
                          <td>
                            {/* {item?.site_number} */}
                            Here site number
                          </td>
                          <td>
                            {/* {item?.site_country} */}
                            Here country name
                          </td>
                          <td className="active-irt">
                            <span>
                              {/* {item?.total_user} */}
                              Here total user
                            </span>{" "}
                            <img
                              src={path_image + "doctor-svg.svg"}
                              alt=""
                              className="doctor"
                            />
                          </td>
                          <td className="complete">
                            {/* {item?.completed_training} */}
                            Here training complete
                          </td>
                        </tr>

                        {/* {siteCompletionShow === index ? (
                                <> */}
                        <tr className="fold show">
                          <td colspan="5" className="site_complete">
                            {/* {item?.Users?.length ? ( */}
                            <Table>
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Role</th>
                                  <th>Blind type</th>
                                  <th>Training</th>
                                </tr>
                              </thead>
                              <tbody>
                                {/* {item?.Users.map((data, i) => ( */}
                                <tr
                                // key={i}
                                >
                                  <td>
                                    {/* {data?.first_name
                                                    ? data?.first_name
                                                    : "NA"} */}
                                    First name
                                  </td>
                                  <td>
                                    {/* {data?.user_type
                                                    ? data?.user_type
                                                    : "NA"} */}
                                    User type
                                  </td>
                                  <td>
                                    {/* {data?.binded} */}
                                    Blind type
                                  </td>
                                  <td
                                  // className={
                                  //   data?.training_status_code ==
                                  //   "0"
                                  //     ? "complete"
                                  //     : "not_yet"
                                  // }
                                  >
                                    {/* {data?.training_status_code ==
                                                  "0"
                                                    ? "Completed"
                                                    : data?.training_status_code ==
                                                      "1"
                                                    ? "Not yet"
                                                    : null} */}
                                    Training status
                                  </td>
                                </tr>
                                {/* ))} */}
                              </tbody>
                            </Table>
                            {/* ) : (
                                        <div className="no_data">
                                          No Data Found
                                        </div>
                                      )} */}
                          </td>
                        </tr>
                        {/* </>
                              ) : null} */}

                        <tr className="blank">
                          <td colspan="5" style={{ height: "10px;" }}>
                            &nbsp;
                          </td>
                        </tr>
                        {/* </>
                          );
                        })} */}
                      </tbody>
                    </Table>
                  </div>
                </div>
              ) : null}
            </div>
          </Row>
        </div>
      </Col>
    </>
  );
};

export default RDAnalytics;
