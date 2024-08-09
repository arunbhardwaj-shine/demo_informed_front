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
import { useLocation } from "react-router-dom";
import { getData, postData,getDataRd } from "../../axios/apiInstanceHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import { loader } from "../../loader";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import IndividualCompletion from "./IndividualCompletion";
import SiteCompletion from "./SiteCompletion";
import SiteEngagement from "./SiteEngagement";
import PopularContent from "./PopularContent";
import axios from 'axios';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


const color = ["#fee9b9", "#fec037", "#e4a923", "#c28b0c"];
const RDAnalytics = () => {
  const [show, setShow] = useState();
  const location=useLocation()
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
  const [indidualCompletionTableDataBackup, setIndividualCompletionTableDataBackup] = useState();
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
  const [isApiStatus, setIsApiStatus] = useState(false);
  const [mostPopularContentSiteData, setMostPopularContentSiteData] = useState(
    []
  );
  const [isContentSiteAccordionOpen, setIsContentSiteAccordionOpen] = useState(
    []
  );
  const [isContentPageAccordionOpen, setIsContentPageAccordionOpen] = useState(
    []
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('site_number'); // Initial sort key
  const [sortOrder, setSortOrder] = useState('desc');

  const [siteCompletionShow, setSiteCompletionShow] = useState();
  const [sortDirection, setSortDirection] = useState(0);
  const [isActive, setIsActive] = useState("");
  const [lastSortedPDFId, setLastSortedPDFId] = useState(null);

  const [trainingStatus, setTrainingStatus] = useState([]);
  const [siteRole, setSiteRole] = useState([]);
  const [filterdata, setFilterData] = useState({
    'training_status_code': [
     {"id":1, 'title': 'New'},
     {"id":2, 'title': 'Completed'},
     {"id":3, 'title': 'Invited'},
     {"id":4, 'title': 'Ignored'},
     {"id":5, 'title': 'Started'},
     {"id":6, 'title': 'Not Completed'}
    ],
    'user_type': ['Site User-Blinded', 'Investigator-Blinded', 'Site unblinded pharmacist'],
    'site_number':[]
   
  });
  const [filter, setFilter] = useState("");
  const [showfilter, setShowFilter] = useState(false);
  const [updateflag, setUpdateFlag] = useState(0);

  const [appliedFilter, setAppliedFilter] = useState({})
  const [apifilterObject, setApifilterObject] = useState({});
  const [filterObject, setFilterObject] = useState({});
  const [apiFilterData, setApiFilterData] = useState({});
  const [otherFilter, setOtherFilter] = useState({});
  const [forceRender, setForceRender] = useState(false);
  const [filterApplyflag, setFilterApplyflag] = useState(0);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const individual_Completion = useRef(null);
  const site_Completion = useRef(null);
  const site_Engagement = useRef(null);
  const content = useRef(null);
  const top_content = useRef(null);
  const buttonRef = useRef(null);
  const filterRef = useRef(null);
  let createdBy=localStorage.getItem("user_id")
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const handleClick = (event) => {
    setIsActive((current) => !current);
  };

  Highcharts.setOptions({
    colors: ["#FFCACD", "#39CABC"],
  });

  const getMostPopularContentPageData = async (file_type, pdf_id) => {
    try {
      if (file_type != "video") {
        loader("show");
        setIsApiStatus(false);

        if (
          !isContentPageAccordionOpen[pdf_id] ||
          isContentPageAccordionOpen[pdf_id] == undefined
        ) {
          const result = await postData(ENDPOINT.MOST_POPULAR_PAGE_CONTENT, {
            pdf_id: pdf_id,
            created_by:createdBy
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
        }
        setIsApiStatus(true);
      }
    } catch (err) {
      console.log("--err", err);
    } finally {
      loader("hide");
    }
  };

  const getMostPopularContentSiteData = async (pdf_id) => {
    try {
      loader("show");
      setIsActive("");

      if (
        !isContentSiteAccordionOpen[pdf_id] ||
        isContentSiteAccordionOpen[pdf_id] == undefined
      ) {
        const result = await postData(ENDPOINT.MOST_POPULAR_SITE_CONTENT, {
          pdf_id: pdf_id,
          created_by:createdBy
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
                text: `<p>Device</p></br></br></br><span >${chart_data?.totalDevices}</span>`,

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

                  data: chart_data?.deviceNames?.map((name, index) => ({
                    name,

                    y: chart_data?.deviceCount[name],

                    color: color[(index % chart_data?.deviceNames?.length) + 1],
                  })),

                  size: "80%",

                  innerSize: "65%",
                },
              ],
            },
            device_names: chart_data?.deviceNames,
          },
        }));
        setIsContentSiteAccordionOpen({
          ...isContentSiteAccordionOpen,
          [pdf_id]: true,
        });
      }
    } catch (err) {
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
      setIsActive("");
      setIndividualCompletionShow();
      setSortBy('site_number');
      setSortOrder('desc');
      setFlag({
        site_Completion: false,
        site_Engagement: false,
        content: false,
        top_content: false,
        individual_Completion: true,
      });
      // setTrainingCompletionDropdownData("");
      // setTrainingCertificate("");
      if(Object.keys(filterdata?.site_number)?.length==0){
        let body={
          // user_id:localStorage.getItem('user_id')
          user_id:createdBy
        }        
        const response=await postData("https://webinar.docintel.app/lmn/api/distributes/filters_list",body)
        
        const site_number=response?.data?.response?.data?.site_number
        setFilterData((prevData) => {
          return {
              ...prevData,
              site_number: site_number
          };
      });
      }
      if (!indidualCompletionTableData) {
        const result = await postData(ENDPOINT.INDIVIDUAL_TRAINING_COMPLETION_V2,{created_by:createdBy});
        setIndividualCompletionTableData(result?.data?.data);
        setIndividualCompletionTableDataBackup(result?.data?.data);
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
          created_by:createdBy
        };
        const result = await postData(
          ENDPOINT.TRAINING_COMPLETION_DROPDOWN,
          body
        );

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
      setIsApiStatus(false);
      if (fileType != "video") {
        loader("show");
        if (trainingAccordianShow == i) {
          setTrainingAccordianShow();
        } else {
          let body = {
            user_id: userId,
            pdf_id: pdfId,
            file_type: fileType,
            created_by:createdBy
          };
          const result = await postData(
            ENDPOINT.TRAINING_COMPLETION_PAGE_CLICK,
            body
          );

          setTrainingAccordianData(result?.data?.data?.time_spend_on_pdf);
          setTrainingAccordianShow(i);
          setIsApiStatus(true);
        }
        loader("hide");
      }
    } catch (err) {
      loader("hide");
      console.log("-err", err);
    }
  };

  const siteCompletion = async () => {
    try {
      loader("show");
      setIsActive("");
      setSiteCompletionShow();
      setSortBy('site_name');
      setSortOrder('asc');
      setFlag({
        individual_Completion: false,
        site_Engagement: false,
        content: false,
        top_content: false,
        site_Completion: true,
      });
      if (!siteCompletionTableData) {
        const result = await getDataRd(`${ENDPOINT.SITE_REGISTRATION_LIST}`);
        setSiteCompletionTableData(result?.data?.data);

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

  const mostPopularContent = async () => {
    try {
      loader("show");
      setIsContentSiteAccordionOpen([]);
      setIsContentPageAccordionOpen([]);
      setIsActive("");

      setFlag({
        individual_Completion: false,
        site_Completion: false,
        site_Engagement: false,
        top_content: false,
        content: true,
      });

      setIsContentSiteAccordionOpen([]);
      setIsContentPageAccordionOpen([]);
      const result = await postData(ENDPOINT.MOST_POPULAR_CONTENT_DROPDOWN,{created_by:createdBy});
      const data = result?.data?.data;
      setMostPopularContentData(data.pdf_data);
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
      setIsActive("");
      setShow();
      setSortBy('site_name');
      setSortOrder('asc');
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
    // setIsActive(!isActive);
    if (isActive == "asc") {
      setIsActive("dec");
    } else {
      setIsActive("asc");
    }
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
    // setIsActive(!isActive);
    if (isActive == "asc") {
      setIsActive("dec");
    } else {
      setIsActive("asc");
    }
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
    // setIsActive(!isActive);
    if (isActive == "asc") {
      setIsActive("dec");
    } else {
      setIsActive("asc");
    }
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
    // setIsActive(!isActive);
    if (isActive == "asc") {
      setIsActive("dec");
    } else {
      setIsActive("asc");
    }
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
        // userTableHeadings.innerHTML = `
        // <th></th>
        //   <th>Name</th>
        //   <th>Role</th>
        //   <th>Blind type</th>
        //   <th>Training</th>
        // `;
        userTableHeadings.innerHTML = `
        <th></th>
          <th>Name</th>
          <th>Role</th>
          
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

          // const bindedCell = document.createElement("td");
          // bindedCell.textContent = user.binded;
          // userRow.appendChild(bindedCell);

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

    const randomPrefix = "site_completion_";
    const element = document.createElement("a");
    element.href = uri + base64(format(template, context));
    element.download = `${randomPrefix}_.xls`;
    element.click();
  };


  const downloadExcelUsers = (data,tableName) => {
    try {
      data = data?.map((item, index) => {
        let finalData = {};
        finalData.Site = item?.site_number ? item?.site_number : "NA";
        finalData.Email = item?.email ? item?.email.trim() : "NA";
        finalData.Name = item?.username ? item?.username.trim() : "NA";
        finalData.Country = item?.country ? item?.country : "NA";       
        finalData.Role = item?.user_type ? item?.user_type : "NA";       
        finalData.Training = item?.training_status ? item?.training_status : "NA";
        finalData[`Last activity`] = item?.last_activity ? item?.last_activity : "NA";
        finalData[`First email sent`] = item?.date_first_email_sent ? item?.date_first_email_sent : "NA";
        finalData[`Last email sent`] = item?.date_last_email_sent ? item?.date_last_email_sent : "NA";
        finalData[`Total reminders sent`] = item?.reminders_sent ? item?.reminders_sent : 0;
        return finalData;
      });

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      
      // Set column widths dynamically based on the content
      const columnWidths = data.reduce((acc, row) => {
        Object.keys(row).forEach((key, index) => {
          const value = row[key] ? row[key].toString() : '';
          const width = Math.max(value.length, key.length) + 2;
          acc[index] = Math.max(acc[index] || 0, width);
        });
        return acc;
      }, []);
  
      worksheet['!cols'] = columnWidths.map(width => ({ wch: width }));
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });
      saveAs(
        blob,`${tableName}_.xls`
      );
    } catch (error) {
      console.error(
        "An error occurred while downloading the Excel file:",
        error
      );
  }
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

    // Remove the td whose class is infocol in exportTable
    const infocol = exportTable.getElementsByClassName("infocol");
    Array.from(infocol).forEach((infocol) => {
      infocol.remove();
    });

    const infotd = exportTable.getElementsByClassName("infotd");
    Array.from(infotd).forEach((infotd) => {
      infotd.remove();
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
  function downloadCertificate(certificate_link, event) {
    fetch(certificate_link)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "certificate_.pdf";
        link.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    event.stopPropagation();
  }

  const allEngagement = async () => {
    try {
      loader("show");
      const response = await axios.get(`https://webinar.docintel.app/lmn/api/analytics/rd_all_site_engagement?uid=${localStorage.getItem("user_id")=="sNl1hra39QmFk9HwvXETJA=="?2147536982:2147501188}`, {
        responseType: 'blob',
      });
      // Create a blob and download the file
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'site_data.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      loader("hide");
    } catch (error) {
      loader("hide");
      console.error('Error downloading Excel file:', error);
    }
  }

  const handleSort = (key) => {
    setSortBy(key);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortData = (data, key, order) => {
    return data.sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];

      // Check if the values are datetime strings in the format "YYYY-MM-DD HH:MM:SS"
      const isDateTimeString = (val) =>
        typeof val === 'string' && /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(val);

      // Convert datetime strings to Date objects for comparison
      const convertToDate = (val) => new Date(val);

      if (isDateTimeString(valueA) && isDateTimeString(valueB)) {
        const dateA = convertToDate(valueA);
        const dateB = convertToDate(valueB);
        return order === 'asc' ? dateA - dateB : dateB - dateA;
      }


      // Handle different data types (numbers, strings)
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return order === 'asc' ? valueA - valueB : valueB - valueA;
      } else {
        return order === 'asc'
          ? valueA?.localeCompare(valueB) // Handle string sorting with locale awareness
          : valueB?.localeCompare(valueA);
      }
    });
  };

  const removeindividualfilter = (key, item) => {
    let old_object = filterObject;
    let otherFilterObj = otherFilter;
    const index = old_object[key]?.indexOf(item);
    if (index > -1) {
      if (old_object[key].includes("All")) {
        const allIndex = old_object[key]?.indexOf("All");
        old_object[key]?.splice(allIndex, 1);
        delete otherFilterObj[key];
      }
      old_object[key]?.splice(index, 1);
      otherFilterObj[key]?.splice(index, 1);

      if (old_object[key]?.length == 0) {
        delete old_object[key];
        delete otherFilterObj[key];
      }
    }
    setAppliedFilter(old_object);
    setOtherFilter(otherFilterObj);
    setFilterObject(old_object);
    applyFilter()
    
  };

  const applyFilter = (flag=0) => {
    setFilterApplyflag(1);
    setIndividualCompletionTableData([]);
    setFilterObject(appliedFilter);
    const hasAllNonEmptyValues = Object.keys(otherFilter).every(key => {
      const value = filter[key];
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== null && value !== undefined && value !== '';
    });
    
    if (!hasAllNonEmptyValues || searchTerm.length != 0) {
      const data = indidualCompletionTableDataBackup.filter(item => {
        const matchesFilters = Object.keys(otherFilter).every(key => {
          if (Array.isArray(otherFilter[key])) {
            return otherFilter[key].some(value => {
              if (typeof value === 'string') {
                return item[key] && item[key].includes(value);
              } else if (typeof value === 'number') {
                return item[key] === value;
              }
              return false;
            });
          }
          return true;
        });
        
         // Check if the item matches the search term (name or email)
         if(flag == 1){
           return matchesFilters;
         }else{
            const matchesSearch = (
              item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
            return matchesFilters && matchesSearch;
         }

      });
      setIndividualCompletionTableData(data);
    } else {
      setIndividualCompletionTableData(indidualCompletionTableDataBackup);
    }
    setShowFilter(false);

  };

  // by gagan

  const clearFilter = () => {
    document.querySelectorAll("input")?.forEach((checkbox) => {
      checkbox.checked = false;
    });
    setOtherFilter({});
    setAppliedFilter({});

    if (Object.keys(filterObject)?.length) {
      setFilterObject({});
      setIndividualCompletionTableData(indidualCompletionTableDataBackup);
      setSearchTerm(''); 
    } 
    setShowFilter(false);
    setForceRender(!forceRender);
  };

  const handleOnFilterChange = (e, item, index, key, data = []) => {
    let newObj = JSON.parse(JSON.stringify(appliedFilter));
    let otherObj = JSON.parse(JSON.stringify(otherFilter));

    if (!newObj[key]) {
      newObj[key] = [];
    }
    if (!otherObj[key]) {
      otherObj[key] = [];
    }


    if (e?.target?.checked == true) {
      if (
        key == "training_status_code" ||
        key == "user_type" ||
        key == "site_number"
       
      ) {
        newObj[key] = [];
        newObj[key]?.push(item);
        otherObj[key] = [];
        otherObj[key]?.push(item);
      } else {
        if (item == "All") {
          newObj[key] = ["All"];
          otherObj[key] = data;
        } else {
          newObj[key]?.push(item);
          otherObj[key]?.push(item);

          if (data?.length - 1 == newObj[key]?.length) {
            newObj[key]?.push("All");
            otherObj[key]?.push(item);
          }
        }
      }
    } else {
      if (item == "All") {
        newObj[key] = [];
        otherObj[key] = [];
      } else {
        if (newObj[key].includes("All")) {
          newObj[key] = newObj[key].filter((item) => item != "All");
          otherObj[key] = otherObj[key].filter((item) => item != "All");
        }
        const index = newObj[key]?.indexOf(item);
        if (index > -1) {
          newObj[key]?.splice(index, 1);
          if (newObj[key]?.length == 0) {
            delete otherObj[key];
            delete newObj[key];
          }
        }
      }

      const otherIndex = otherObj[key]?.indexOf(item);
      if (otherIndex > -1) {
        otherObj[key]?.splice(otherIndex, 1);
        if (otherObj[key]?.length == 0) {
          delete otherObj[key];
        }
        newObj[key] = otherObj[key];
      }
    }
    setOtherFilter(otherObj);
    setAppliedFilter(newObj);
    setForceRender(!forceRender);
  };

  const refresh = async() => {
    try{
      setRefreshFlag(true);
      setSortBy('site_number');
      setSortOrder('desc');
      let obj = {
        "sync":1,
        created_by:createdBy
      };
      const response = await postData(ENDPOINT.INDIVIDUAL_TRAINING_COMPLETION_V2,obj);
      const hadData = response?.data?.data || [];
      setIndividualCompletionTableData(hadData);
      setIndividualCompletionTableDataBackup(hadData);
      setRefreshFlag(false);
    }catch(err){
      console.log(err);
    }
  }

  const submitHandler = (event) => {
    applyFilter();
    event.preventDefault();
    return false;
  };

  const searchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      applyFilter(1);
    }
  };

  const getStatusColor = (code) => {
    switch (code) {
      case 1:
        return "#8A4E9C";       // Color for "New"
      case 2:
        return "#39CABC";      // Color for "Completed"
      case 3:
        return "#0066BE";     // Color for "Invited"
      case 4:
        return "#f58289";        // Color for "Ignored"
      case 5:
        return "#FAC755";     // Color for "Started"
      case 6:
        return "#FF9534";      // Color for "Not Completed"
      default:
        return "#f58289";       // Default color
    }
  };
  
  const getStatusText = (code) => {
    switch (code) {
      case 1:
        return "New";
      case 2:
        return "Completed";
      case 3:
        return "Invited";
      case 4:
        return "Ignored";
      case 5:
        return "Started";
      case 6:
        return "Not Completed";
      default:
        return "Ignored";
    }
  };

  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="top-header">
              <div className="page-title d-flex">
                <h2>
                  {
                    location.pathname == '/LEX-210-analytics' ? "LEX-210" : "Trial Analytics"
                  }
                  
                </h2>
              </div>
              <Button onClick={allEngagement} title="Download Site Engagements" className="download">
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
            <div className="rd-analytics-content">
              <Row>
                <Col md={12} lg={9}>
                  <Row>
                    <Col md={6} lg={4}>
                      <IndividualCompletion
                        individualCompletionfn={individualCompletion}
                        createdBy={createdBy}
                      />
                    </Col>
                    <Col md={6} lg={8}>
                      <SiteCompletion siteCompletionfn={siteCompletion} createdBy={createdBy}/>
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
                    // setMostPopularContentData={setMostPopularContentData}
                    topContentTableFn={topContentTableFn}
                    createdBy={createdBy}
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
                        <div className="search-bar">
                          <form className="d-flex" onSubmit={(e) => submitHandler(e)}>
                            <input
                              className="form-control me-2"
                              type="search"
                              value={searchTerm}
                              placeholder="Search by email or name"
                              aria-label="Search"
                              id="email_search"
                              onChange={(e) => searchChange(e)}
                            />
                            <button className="btn btn-outline-success" type="submit">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15.8045 14.862L11.2545 10.312C12.1359 9.22334 12.6665 7.84 12.6665 6.33334C12.6665 2.84134 9.82522 0 6.33325 0C2.84128 0 0 2.84131 0 6.33331C0 9.82531 2.84132 12.6667 6.33328 12.6667C7.83992 12.6667 9.22325 12.136 10.3119 11.2547L14.8619 15.8047C14.9919 15.9347 15.1625 16 15.3332 16C15.5039 16 15.6745 15.9347 15.8045 15.8047C16.0652 15.544 16.0652 15.1227 15.8045 14.862ZM6.33328 11.3333C3.57597 11.3333 1.33333 9.09066 1.33333 6.33331C1.33333 3.57597 3.57597 1.33331 6.33328 1.33331C9.0906 1.33331 11.3332 3.57597 11.3332 6.33331C11.3332 9.09066 9.09057 11.3333 6.33328 11.3333Z"
                                  fill="#97B6CF"
                                />
                              </svg>
                            </button>
                          </form>
                        </div>
                      {typeof indidualCompletionTableData !== "undefined" &&
                      indidualCompletionTableData?.length > 0?
                      <>
                          <button className={refreshFlag ? "refresh-rotate" : "refresh"} title="Refresh" onClick={refresh}>
                              <svg fill="#0066be" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 383.748 383.748"><g><path d="M62.772,95.042C90.904,54.899,137.496,30,187.343,30c83.743,0,151.874,68.13,151.874,151.874h30
                              C369.217,81.588,287.629,0,187.343,0c-35.038,0-69.061,9.989-98.391,28.888C70.368,40.862,54.245,56.032,41.221,73.593
                              L2.081,34.641v113.365h113.91L62.772,95.042z"></path><path d="M381.667,235.742h-113.91l53.219,52.965c-28.132,40.142-74.724,65.042-124.571,65.042
                              c-83.744,0-151.874-68.13-151.874-151.874h-30c0,100.286,81.588,181.874,181.874,181.874c35.038,0,69.062-9.989,98.391-28.888
                              c18.584-11.975,34.707-27.145,47.731-44.706l39.139,38.952V235.742z"></path></g></svg>
                          </button>
                          <Button
                            title="Download stats"
                            onClick={() => downloadExcelUsers(indidualCompletionTableData,"individual_completion")
                              
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
                      </>
                        :""}
                       
                        {/* <Button
                          // className={`sort_btn ${isActive ? "active" : ""}`}
                          className={`sort_btn ${
                            isActive == "dec"
                              ? "svg_active"
                              : isActive == "asc"
                              ? "svg_asc"
                              : ""
                          }`}
                          onClick={sortIndividualCompletion}
                        >
                          Sort By{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              id="asc"
                              d="M18.9224 12.744C18.7661 12.5878 18.5542 12.5 18.3332 12.5C18.1122 12.5 17.9003 12.5878 17.744 12.744L14.9999 15.4882V2.49984C14.9999 2.27882 14.9121 2.06686 14.7558 1.91058C14.5995 1.7543 14.3875 1.6665 14.1665 1.6665C13.9455 1.6665 13.7335 1.7543 13.5773 1.91058C13.421 2.06686 13.3332 2.27882 13.3332 2.49984V15.4882L10.589 12.744C10.4318 12.5922 10.2213 12.5082 10.0029 12.5101C9.78435 12.512 9.57534 12.5997 9.42084 12.7542C9.26633 12.9087 9.17869 13.1177 9.17679 13.3362C9.17489 13.5547 9.25889 13.7652 9.41068 13.9223L13.5774 18.089C13.6548 18.1666 13.7467 18.2282 13.848 18.2702C13.9492 18.3122 14.0577 18.3338 14.1674 18.3338C14.277 18.3338 14.3855 18.3122 14.4867 18.2702C14.588 18.2282 14.6799 18.1666 14.7574 18.089L18.924 13.9223C19.08 13.7658 19.1675 13.5538 19.1672 13.3328C19.1669 13.1119 19.0788 12.9001 18.9224 12.744Z"
                              fill="#97B6CF"
                            />
                            <path
                              id="dsc"
                              d="M10.5892 6.0772L6.42251 1.91054C6.34489 1.83277 6.25253 1.77129 6.15084 1.7297C5.94698 1.64544 5.71803 1.64544 5.51417 1.7297C5.41248 1.77129 5.32011 1.83277 5.2425 1.91054L1.07583 6.0772C0.919572 6.23368 0.831875 6.44582 0.832031 6.66695C0.832188 6.88809 0.920184 7.10011 1.07666 7.25636C1.23314 7.41262 1.44528 7.50032 1.66642 7.50016C1.88756 7.5 2.09957 7.41201 2.25583 7.25553L5 4.51137V17.4997C5 17.7207 5.0878 17.9327 5.24408 18.0889C5.40036 18.2452 5.61232 18.333 5.83334 18.333C6.05435 18.333 6.26631 18.2452 6.4226 18.0889C6.57888 17.9327 6.66667 17.7207 6.66667 17.4997V4.51137L9.41085 7.25553C9.56801 7.40733 9.77852 7.49132 9.99701 7.48943C10.2155 7.48753 10.4245 7.39989 10.579 7.24538C10.7335 7.09087 10.8212 6.88186 10.8231 6.66337C10.825 6.44487 10.741 6.23437 10.5892 6.0772Z"
                              fill="#97B6CF"
                            />
                          </svg>
                        </Button> */}
                      </div>
                    </div>
                     {/* Code for filter start */}
                     <div className="d-flex justify-content-end rd-content-filter-add">
                        <div className="filter_btn_div d-flex align-items-center">

                        {/** By gagan */}
                        {Object.keys(filterObject)?.length !== 0 &&
                          filterApplyflag > 0 ? (
                          <div className="apply-filter">
                            <div className="filter-block">
                              <div className="filter-block-left full">
                                {Object.keys(filterObject)?.map((key, index) => {
                                  return (
                                    <>
                                      {filterObject[key]?.length ? (
                                        <div className="filter-div">
                                          <div className="filter-div-title">
                                            <span>{key == "training_status_code" ? "Status" : key == "user_type" ? "Role" : key == "site_number" ? "Site" : key} |</span>
                                          </div>

                                          <div className="filter-div-list">
                                            {filterObject[key]?.map((item, index) => (
                                              <div
                                                className={
                                                  key == "Role"
                                                    ? "filter-result upper"
                                                    : "filter-result"
                                                }
                                              >
                                                {key == "training_status_code"
                                                    ? getStatusText(item)
                                                    : item}
                                                <img
                                                  src={path_image + "filter-close.svg"}
                                                  onClick={() =>
                                                    removeindividualfilter(key, item)
                                                  }
                                                  alt="Close-filter"
                                                />
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      ) : null}
                                    </>
                                  );
                                })}
                              </div>
                              <div className="clear-filter">
                                <button
                                  className="btn btn-outline-primary btn-bordered"
                                  onClick={clearFilter}
                                >
                                  Remove All
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : null}

  {/** end */}

  {/** By Gagan */}

  <div className={`${showfilter?"filter-by nav-item dropdown highlight":"filter-by nav-item dropdown" }`} style={{margin:'0'}}>
    <button
      ref={buttonRef}
      className={
        Object.keys(filterObject)?.length &&
          filterApplyflag == 1
          ? "btn btn-secondary dropdown filter_applied"
          : "btn btn-secondary dropdown"
      }
      type="button"
      id="dropdownMenuButton2"
      onClick={() => setShowFilter((showfilter) => !showfilter)}
    >
      Filter By
      {showfilter ? (
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
    {showfilter && (
      <div
        ref={filterRef}
        className="dropdown-menu filter-options"
        aria-labelledby="dropdownMenuButton2"
      >
        <h4>Filter By</h4>

        <Accordion defaultActiveKey="0" flush>
          {Object.keys(filterdata)?.map(function (key, index) {
            return (
              <>
                {filterdata[key]?.length > 0 ? (
                  <Accordion.Item
                    className={
                      key == "role" ? "card upper" : "card"
                    }
                    eventKey={index}
                  >
                    <Accordion.Header className="card-header">
                      {key == "training_status_code" ? "Status" : key == "user_type" ? "Role" : key == "site_number" ? "Site" : key}
                    </Accordion.Header>

                    <Accordion.Body className="card-body">
                      <ul>
                        {filterdata[key]?.length
                          ? filterdata[key]
                          ?.sort((a, b) => {
                            if (key === "training_status_code") {
                              const itemA = typeof a === "object" ? a?.title : a;
                              const itemB = typeof b === "object" ? b?.title : b;
                              return itemA.localeCompare(itemB);
                            }
                            // If not "training_status_code", do not sort
                            return 0;
                          })
                          
                          ?.map(
                            (item, index) => (
                              <li key={index}>
                                {item != "" ? (
                                  <label className="select-multiple-option">
                                    <input
                                      type="radio"
                                      id={`custom-checkbox-${item}-${index}`}
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
                                          ]?.includes(item)
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
                                          [...filterdata[key]]
                                        )
                                      }
                                    />
                                    {typeof item == "object"
                                      ? item?.title
                                      : item}
                                    {/* {key == "draft" &&
                              typeof item  == "string" && item == "0"
                              ? "live"
                              : key == "draft" &&  typeof item  == "string" &&
                                item == "1"
                              ? "draft" &&  typeof item  == "string"
                              : item} */}
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
            onClick={clearFilter}
          >
            Clear
          </Button>
          <Button
            className="btn btn-primary btn-filled"
            onClick={applyFilter}
          >
            Apply
          </Button>
        </div>
      </div>
    )}
  </div>


  {/* end*/}
                        </div>
                      </div>
{/* Code for filter end */}
                    <Table className="fold-table" id="individual_completion">
                      <thead>
                        <tr>
                          <th scope="col" className="sort_option">
                            <span onClick={() => handleSort('site_number')} >
                              Site
                              <button
                                className={`event_sort_btn ${sortBy == "site_number" ?
                                  sortOrder == "asc"
                                    ? "svg_asc"
                                    : "svg_active"
                                  : ""
                                  }`}
                                onClick={() => handleSort('site_number')}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </span>
                          </th>
                          <th scope="col" className="sort_option">
                            <span onClick={() => handleSort('email')} >
                              Email
                              <button
                                className={`event_sort_btn ${sortBy == "email" ?
                                  sortOrder == "asc"
                                    ? "svg_asc"
                                    : "svg_active"
                                  : ""
                                  }`}
                                onClick={() => handleSort('email')}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </span>
                          </th>
                          <th scope="col" className="sort_option">
                            <span onClick={() => handleSort('username')} >
                              Name
                              <button
                                className={`event_sort_btn ${sortBy == "username" ?
                                  sortOrder == "asc"
                                    ? "svg_asc"
                                    : "svg_active"
                                  : ""
                                  }`}
                                onClick={() => handleSort('username')}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </span>
                          </th>
                          <th scope="col" className="sort_option">
                            <span onClick={() => handleSort('user_country')} >
                              Country
                              <button
                                className={`event_sort_btn ${sortBy == "user_country" ?
                                  sortOrder == "asc"
                                    ? "svg_asc"
                                    : "svg_active"
                                  : ""
                                  }`}
                                onClick={() => handleSort('user_country')}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </span>
                          </th>
                          <th scope="col" className="sort_option">
                            <span onClick={() => handleSort('user_type')} >
                              Role
                              <button
                                className={`event_sort_btn ${sortBy == "user_type" ?
                                  sortOrder == "asc"
                                    ? "svg_asc"
                                    : "svg_active"
                                  : ""
                                  }`}
                                onClick={() => handleSort('user_type')}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </span>
                          </th>
                          <th scope="col" className="sort_option">
                            <span onClick={() => handleSort('training_status')} >
                              Status
                              <button
                                className={`event_sort_btn ${sortBy == "training_status" ?
                                  sortOrder == "asc"
                                    ? "svg_asc"
                                    : "svg_active"
                                  : ""
                                  }`}
                                onClick={() => handleSort('training_status')}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </span>
                          </th>
                          <th scope="col" className="sort_option">
                            <span onClick={() => handleSort('originalDate')} >
                              Last activity
                              <button
                                className={`event_sort_btn ${sortBy == "originalDate" ?
                                  sortOrder == "asc"
                                    ? "svg_asc"
                                    : "svg_active"
                                  : ""
                                  }`}
                                onClick={() => handleSort('originalDate')}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </span>
                          </th>
                          <th className="infotd">&nbsp;</th>
                          <th className="non_display">First email sent</th>
                          <th className="non_display">Last email sent</th>
                          <th className="non_display">Total reminders sent</th>
                          <th className="non_display">Bounce back</th>
                          <th>&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                      
                        {/* {indidualCompletionTableData?.map((item, index) => { */}
                        {}
                        {typeof indidualCompletionTableData !== "undefined" &&
                          indidualCompletionTableData?.length > 0 ?(<> {sortData(indidualCompletionTableData, sortBy, sortOrder)?.map((item, index) => {
                            return (
                              <>
                                <tr
                                  className={`view ${individualCompletionShow == index
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
                                    {item?.site_number ? item?.site_number : "NA"}
                                  </td>
                                  <td>
                                    {item?.email ? item?.email : "NA"}
                                  </td>
                                  <td>
                                    {item?.username
                                      ? item?.username?.charAt(0).toUpperCase() +
                                      item?.username.slice(1)
                                      : "NA"}
                                  </td>
                                  <td>
                                    {item?.user_country ? item?.user_country : "NA"}
                                  </td>
                                  <td>
                                    {item?.user_type ? item?.user_type : "NA"}
                                  </td>

                                  <td style={{ color: getStatusColor(item?.training_status_code) }} >
                                    {getStatusText(item?.training_status_code)}
                                  </td>

                                  <td>
                                    {item?.last_activity
                                      ? item.last_activity
                                      : "NA"}
                                  </td>

                                  <td className="infocol">
                                    <img className="info_img" src="componentAssets/images/user_info.svg" alt="" />
                                    <div className="extra_info">
                                      <p>
                                        <span>First email sent:</span>
                                        {item?.date_first_email_sent ? item.date_first_email_sent : "NA"}
                                      </p>

                                      <p>
                                        <span>Last email sent:</span>
                                        {item?.date_last_email_sent ? item.date_last_email_sent : "NA"}
                                      </p>

                                      <p>
                                        <span>Total reminders sent:</span>
                                        {item?.reminders_sent ? item.reminders_sent : 0}
                                      </p>

                                      <p>
                                        <span>Bounce back:</span>
                                        {item?.bounced ? item.bounced : "NA"}
                                      </p>
                                    </div>
                                  </td>

                                  <td className="non_display">
                                    {item?.date_first_email_sent
                                      ? item.date_first_email_sent
                                      : "NA"}
                                  </td>

                                  <td className="non_display">
                                    {item?.date_last_email_sent
                                      ? item.date_last_email_sent
                                      : "NA"}
                                  </td>

                                  <td className="non_display">
                                    {item?.reminders_sent
                                      ? item.reminders_sent
                                      : 0}
                                  </td>

                                  <td className="non_display">
                                    {item?.bounced
                                      ? item.bounced
                                      : "NA"}
                                  </td>

                                  <td className="pics">
                                    {item?.training_status_code === 2 ? (
                                      <div>
                                        <img
                                          src={path_image + "certificate.png"}
                                          alt="Certificate"


                                          onClick={(event) =>
                                          {  if(createdBy=="sNl1hra39QmFk9HwvXETJA==") return

                                            downloadCertificate(
                                              item?.certificate_link,
                                              event
                                            )}
                                          }
                                        />
                                      </div>
                                    ) : null}
                                  </td>
                                </tr>
                                {individualCompletionShow == index ? (
                                  <tr className={"fold show"}>
                                    <td colspan="9">
                                      <div className="fold-content">
                                        {
                                          trainingDropdownData?.length == 0 ?
                                            <p className="not_found">No Data Found</p>
                                            :
                                            <p>
                                              Completed Contents |{" "}
                                              <span>
                                                {trainingDropdownData?.length}
                                              </span>
                                            </p>
                                        }
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
                                                                2 ? (
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
                                                          ) : isApiStatus ? (
                                                            <>
                                                              <div className="no_found">
                                                                <p>
                                                                  No Data Found
                                                                </p>
                                                              </div>
                                                            </>
                                                          ) : null}
                                                        </div>
                                                      </Accordion.Body>
                                                    ) : // (
                                                      //   <div>No Data</div>
                                                      // )
                                                      null}
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
                                                                  onClick={(
                                                                    event
                                                                  ) =>
                                                                    {
                                                                      if(createdBy=="sNl1hra39QmFk9HwvXETJA==") return
                                                                    downloadCertificate(
                                                                      item?.pdf_link,
                                                                      event
                                                                    )}
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
                                                      {/* <Accordion.Body></Accordion.Body> */}
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
                                  <td colspan="8" style={{ height: "10px;" }}>
                                    &nbsp;
                                  </td>
                                </tr>
                              </>
                            )
                          })}
                          </>)

                          : <><tr><td colspan="9"><div className="no_found" style={{ textAlign: 'center' }}><p>No Data Found</p></div></td></tr></>
                          }
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
                        {/* <Button
                          className={`sort_btn ${
                            isActive == "dec"
                              ? "svg_active"
                              : isActive == "asc"
                              ? "svg_asc"
                              : ""
                          }`}
                          onClick={sortSiteCompletion}
                        >
                          Sort By{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              id="asc"
                              d="M18.9224 12.744C18.7661 12.5878 18.5542 12.5 18.3332 12.5C18.1122 12.5 17.9003 12.5878 17.744 12.744L14.9999 15.4882V2.49984C14.9999 2.27882 14.9121 2.06686 14.7558 1.91058C14.5995 1.7543 14.3875 1.6665 14.1665 1.6665C13.9455 1.6665 13.7335 1.7543 13.5773 1.91058C13.421 2.06686 13.3332 2.27882 13.3332 2.49984V15.4882L10.589 12.744C10.4318 12.5922 10.2213 12.5082 10.0029 12.5101C9.78435 12.512 9.57534 12.5997 9.42084 12.7542C9.26633 12.9087 9.17869 13.1177 9.17679 13.3362C9.17489 13.5547 9.25889 13.7652 9.41068 13.9223L13.5774 18.089C13.6548 18.1666 13.7467 18.2282 13.848 18.2702C13.9492 18.3122 14.0577 18.3338 14.1674 18.3338C14.277 18.3338 14.3855 18.3122 14.4867 18.2702C14.588 18.2282 14.6799 18.1666 14.7574 18.089L18.924 13.9223C19.08 13.7658 19.1675 13.5538 19.1672 13.3328C19.1669 13.1119 19.0788 12.9001 18.9224 12.744Z"
                              fill="#97B6CF"
                            />
                            <path
                              id="dsc"
                              d="M10.5892 6.0772L6.42251 1.91054C6.34489 1.83277 6.25253 1.77129 6.15084 1.7297C5.94698 1.64544 5.71803 1.64544 5.51417 1.7297C5.41248 1.77129 5.32011 1.83277 5.2425 1.91054L1.07583 6.0772C0.919572 6.23368 0.831875 6.44582 0.832031 6.66695C0.832188 6.88809 0.920184 7.10011 1.07666 7.25636C1.23314 7.41262 1.44528 7.50032 1.66642 7.50016C1.88756 7.5 2.09957 7.41201 2.25583 7.25553L5 4.51137V17.4997C5 17.7207 5.0878 17.9327 5.24408 18.0889C5.40036 18.2452 5.61232 18.333 5.83334 18.333C6.05435 18.333 6.26631 18.2452 6.4226 18.0889C6.57888 17.9327 6.66667 17.7207 6.66667 17.4997V4.51137L9.41085 7.25553C9.56801 7.40733 9.77852 7.49132 9.99701 7.48943C10.2155 7.48753 10.4245 7.39989 10.579 7.24538C10.7335 7.09087 10.8212 6.88186 10.8231 6.66337C10.825 6.44487 10.741 6.23437 10.5892 6.0772Z"
                              fill="#97B6CF"
                            />
                          </svg>
                        </Button> */}
                      </div>
                    </div>
                    <Table className="fold-table" id="site_completion">
                      <thead>
                        <tr>

                          <th scope="col" className="site_name sort_option">
                            <span onClick={() => handleSort('site_name')} >
                              Site Name
                              <button
                                className={`event_sort_btn ${sortBy == "site_name" ?
                                  sortOrder == "asc"
                                    ? "svg_asc"
                                    : "svg_active"
                                  : ""
                                  }`}
                                onClick={() => handleSort('site_name')}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </span>
                          </th>
                          <th scope="col" className="sort_option">
                            <span onClick={() => handleSort('site_number')} >
                              Site Number
                              <button
                                className={`event_sort_btn ${sortBy == "site_number" ?
                                  sortOrder == "asc"
                                    ? "svg_asc"
                                    : "svg_active"
                                  : ""
                                  }`}
                                onClick={() => handleSort('site_number')}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </span>
                          </th>
                          <th scope="col" className="sort_option">
                            <span onClick={() => handleSort('site_country')} >
                              Country
                              <button
                                className={`event_sort_btn ${sortBy == "site_country" ?
                                  sortOrder == "asc"
                                    ? "svg_asc"
                                    : "svg_active"
                                  : ""
                                  }`}
                                onClick={() => handleSort('site_country')}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </span>
                          </th>
                          <th scope="col" className="active-irt sort_option">
                            <span onClick={() => handleSort('total_user')} >
                              Active IRTs
                              <button
                                className={`event_sort_btn ${sortBy == "total_user" ?
                                  sortOrder == "asc"
                                    ? "svg_asc"
                                    : "svg_active"
                                  : ""
                                  }`}
                                onClick={() => handleSort('total_user')}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </span>
                          </th>
                          <th scope="col" className="sort_option">
                            <span onClick={() => handleSort('completed_training')} >
                              Completed Training
                              <button
                                className={`event_sort_btn ${sortBy == "completed_training" ?
                                  sortOrder == "asc"
                                    ? "svg_asc"
                                    : "svg_active"
                                  : ""
                                  }`}
                                onClick={() => handleSort('completed_training')}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {siteCompletionTableData?.map((item, index) => { */}
                        {typeof siteCompletionTableData !== "undefined" &&
                          siteCompletionTableData.length > 0 &&
                          sortData(siteCompletionTableData, sortBy, sortOrder).map((item, index) => {
                            return (
                              <>
                                <tr
                                  className={`view ${siteCompletionShow == index ? "show" : ""
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
                                                {/* <th>Blind type</th> */}
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
                                                  {/* <td>{data?.binded}</td> */}
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
                                                        ? "Ignored"
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

                        {/* <Button
                          className={`sort_btn ${
                            isActive == "dec"
                              ? "svg_active"
                              : isActive == "asc"
                              ? "svg_asc"
                              : ""
                          }`}
                          onClick={siteEngagementSort}
                        >
                          Sort By
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              id="asc"
                              d="M18.9224 12.744C18.7661 12.5878 18.5542 12.5 18.3332 12.5C18.1122 12.5 17.9003 12.5878 17.744 12.744L14.9999 15.4882V2.49984C14.9999 2.27882 14.9121 2.06686 14.7558 1.91058C14.5995 1.7543 14.3875 1.6665 14.1665 1.6665C13.9455 1.6665 13.7335 1.7543 13.5773 1.91058C13.421 2.06686 13.3332 2.27882 13.3332 2.49984V15.4882L10.589 12.744C10.4318 12.5922 10.2213 12.5082 10.0029 12.5101C9.78435 12.512 9.57534 12.5997 9.42084 12.7542C9.26633 12.9087 9.17869 13.1177 9.17679 13.3362C9.17489 13.5547 9.25889 13.7652 9.41068 13.9223L13.5774 18.089C13.6548 18.1666 13.7467 18.2282 13.848 18.2702C13.9492 18.3122 14.0577 18.3338 14.1674 18.3338C14.277 18.3338 14.3855 18.3122 14.4867 18.2702C14.588 18.2282 14.6799 18.1666 14.7574 18.089L18.924 13.9223C19.08 13.7658 19.1675 13.5538 19.1672 13.3328C19.1669 13.1119 19.0788 12.9001 18.9224 12.744Z"
                              fill="#97B6CF"
                            />
                            <path
                              id="dsc"
                              d="M10.5892 6.0772L6.42251 1.91054C6.34489 1.83277 6.25253 1.77129 6.15084 1.7297C5.94698 1.64544 5.71803 1.64544 5.51417 1.7297C5.41248 1.77129 5.32011 1.83277 5.2425 1.91054L1.07583 6.0772C0.919572 6.23368 0.831875 6.44582 0.832031 6.66695C0.832188 6.88809 0.920184 7.10011 1.07666 7.25636C1.23314 7.41262 1.44528 7.50032 1.66642 7.50016C1.88756 7.5 2.09957 7.41201 2.25583 7.25553L5 4.51137V17.4997C5 17.7207 5.0878 17.9327 5.24408 18.0889C5.40036 18.2452 5.61232 18.333 5.83334 18.333C6.05435 18.333 6.26631 18.2452 6.4226 18.0889C6.57888 17.9327 6.66667 17.7207 6.66667 17.4997V4.51137L9.41085 7.25553C9.56801 7.40733 9.77852 7.49132 9.99701 7.48943C10.2155 7.48753 10.4245 7.39989 10.579 7.24538C10.7335 7.09087 10.8212 6.88186 10.8231 6.66337C10.825 6.44487 10.741 6.23437 10.5892 6.0772Z"
                              fill="#97B6CF"
                            />
                          </svg>
                        </Button> */}
                      </div>
                    </div>
                    <div className="table-responsive">
                      <Table className="fold-table" id="site_engagement">
                        <thead className="sticky-header">
                          <tr>
                            <th scope="col" className="sort_option">
                              <span onClick={() => handleSort('site_name')} >
                                Site
                                <button
                                  className={`event_sort_btn ${sortBy == "site_name" ?
                                    sortOrder == "asc"
                                      ? "svg_asc"
                                      : "svg_active"
                                    : ""
                                    }`}
                                  onClick={() => handleSort('site_name')}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                    <g clip-path="url(#clip0_3722_6611)">
                                      <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_3722_6611">
                                        <rect width="8" height="8" fill="white" />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </button>
                              </span>
                            </th>
                            <th scope="col" className="sort_option">
                              <span onClick={() => handleSort('site_number')} >
                                Site Number
                                <button
                                  className={`event_sort_btn ${sortBy == "site_number" ?
                                    sortOrder == "asc"
                                      ? "svg_asc"
                                      : "svg_active"
                                    : ""
                                    }`}
                                  onClick={() => handleSort('site_number')}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                    <g clip-path="url(#clip0_3722_6611)">
                                      <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_3722_6611">
                                        <rect width="8" height="8" fill="white" />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </button>
                              </span>
                            </th>
                            <th scope="col" className="sort_option">
                              <span onClick={() => handleSort('site_country')} >
                                Country
                                <button
                                  className={`event_sort_btn ${sortBy == "site_country" ?
                                    sortOrder == "asc"
                                      ? "svg_asc"
                                      : "svg_active"
                                    : ""
                                    }`}
                                  onClick={() => handleSort('site_country')}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                    <g clip-path="url(#clip0_3722_6611)">
                                      <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_3722_6611">
                                        <rect width="8" height="8" fill="white" />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </button>
                              </span>
                            </th>
                            <th scope="col" className="sort_option">
                              <span onClick={() => handleSort('site_users')} >
                                Site Users
                                <button
                                  className={`event_sort_btn ${sortBy == "site_users" ?
                                    sortOrder == "asc"
                                      ? "svg_asc"
                                      : "svg_active"
                                    : ""
                                    }`}
                                  onClick={() => handleSort('site_users')}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                    <g clip-path="url(#clip0_3722_6611)">
                                      <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_3722_6611">
                                        <rect width="8" height="8" fill="white" />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </button>
                              </span>
                            </th>
                            <th scope="col" className="sort_option">
                              <span onClick={() => handleSort('content_engagement')} >
                                Content engagement
                                <button
                                  className={`event_sort_btn ${sortBy == "content_engagement" ?
                                    sortOrder == "asc"
                                      ? "svg_asc"
                                      : "svg_active"
                                    : ""
                                    }`}
                                  onClick={() => handleSort('content_engagement')}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                    <g clip-path="url(#clip0_3722_6611)">
                                      <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_3722_6611">
                                        <rect width="8" height="8" fill="white" />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </button>
                              </span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* {rdSiteData?.map((item, index) => { */}
                          {typeof rdSiteData !== "undefined" &&
                            rdSiteData.length > 0 &&
                            sortData(rdSiteData, sortBy, sortOrder).map((item, index) => {
                              return (
                                <>
                                  {item?.site_users != 0 && (
                                    <tr
                                      key={index}
                                      className={`view ${show == index ? "show" : ""
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
                                                {item?.content_engagement}
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

                                  {item?.site_users != 0 && (
                                    <tr className="blank">
                                      <td colspan="5" style={{ height: "10px" }}>
                                        &nbsp;
                                      </td>
                                    </tr>
                                  )}
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
                          <span>
                            {mostPopularContentData &&
                              mostPopularContentData.length > 0
                              ? mostPopularContentData?.length
                              : 0}
                          </span>
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
                                getMostPopularContentPageData(
                                  item?.pdf?.file_type,
                                  item?.pdf?.id
                                )
                              }
                            >
                              <div className="d-flex align-items-start engagement-sec">
                                <div className="content-image">
                                  <img
                                    src={
                                      path_image +
                                      `${item?.pdf?.file_type == "video"
                                        ? "article-video-cover.png"
                                        : "article-content.png"
                                      }`
                                    }
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
                            <Accordion.Body
                              className={`${item?.pdf?.file_type == "video"
                                  ? "accordian_video"
                                  : ""
                                }`}
                            >
                              <div className="article-pages-details d-flex">
                                <div className="article-page-show" key={index}>
                                  <div className="article-cover-img">
                                    <div className="page-number">Page 1</div>
                                  </div>
                                  <div className="article-detail-view">
                                    <div className="article-spanrd-time">
                                      Read | Watched{" "}
                                      <span>
                                        {item.watched_count}{" "}
                                        <img
                                          src={path_image + "eye-watch.svg"}
                                          alt=""
                                        />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                {mostPopularContentPageData[item.pdf?.id]
                                  ?.length ? (
                                  <>
                                    {/* <div
                                      className="article-page-show"
                                      key={index}
                                    >
                                      <div className="article-cover-img">
                                        <div className="page-number">
                                          Page 1
                                        </div>
                                      </div>
                                      <div className="article-detail-view">
                                        <div className="article-spanrd-time">
                                          Read | Watched{" "}
                                          <span>
                                            {item.watched_count}{" "}
                                            <img
                                              src={path_image + "eye-watch.svg"}
                                              alt=""
                                            />
                                          </span>
                                        </div>
                                      </div>
                                    </div> */}
                                    {mostPopularContentPageData[
                                      item.pdf?.id
                                    ].map((pdf, index) =>
                                      pdf?.page != 1 ? (
                                        <div
                                          className="article-page-show"
                                          key={index}
                                        >
                                          <div className="article-cover-img">
                                            <div className="page-number">
                                              Page {pdf.page}
                                            </div>
                                          </div>
                                          <div className="article-detail-view">
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
                                      ) : null
                                    )}
                                  </>
                                ) : // isApiStatus ? (
                                  //   <>
                                  //     <p className="no-data-found">
                                  //       No Data Found
                                  //     </p>
                                  //   </>
                                  // ) :
                                  null}
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
                            { }
                            <Accordion.Body>
                              <div className="contents-block d-flex">
                                {mostPopularContentSiteData[item.pdf?.id]
                                  ?.length ? (
                                  <>
                                    <div className="contents-block-left">
                                      <Table>
                                        <thead>
                                          <tr>
                                            <th>Site</th>
                                            <th>Site Number</th>
                                            <th className="short_value">
                                              <Button
                                                className={`sort_btn ${isActive == "dec"
                                                    ? "svg_active"
                                                    : isActive == "asc"
                                                      ? "svg_asc"
                                                      : ""
                                                  }`}
                                                onClick={() => {
                                                  sortContentView(item.pdf?.id);
                                                }}
                                              >
                                                Sort By{" "}
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="20"
                                                  height="20"
                                                  viewBox="0 0 20 20"
                                                  fill="none"
                                                >
                                                  <path
                                                    id="asc"
                                                    d="M18.9224 12.744C18.7661 12.5878 18.5542 12.5 18.3332 12.5C18.1122 12.5 17.9003 12.5878 17.744 12.744L14.9999 15.4882V2.49984C14.9999 2.27882 14.9121 2.06686 14.7558 1.91058C14.5995 1.7543 14.3875 1.6665 14.1665 1.6665C13.9455 1.6665 13.7335 1.7543 13.5773 1.91058C13.421 2.06686 13.3332 2.27882 13.3332 2.49984V15.4882L10.589 12.744C10.4318 12.5922 10.2213 12.5082 10.0029 12.5101C9.78435 12.512 9.57534 12.5997 9.42084 12.7542C9.26633 12.9087 9.17869 13.1177 9.17679 13.3362C9.17489 13.5547 9.25889 13.7652 9.41068 13.9223L13.5774 18.089C13.6548 18.1666 13.7467 18.2282 13.848 18.2702C13.9492 18.3122 14.0577 18.3338 14.1674 18.3338C14.277 18.3338 14.3855 18.3122 14.4867 18.2702C14.588 18.2282 14.6799 18.1666 14.7574 18.089L18.924 13.9223C19.08 13.7658 19.1675 13.5538 19.1672 13.3328C19.1669 13.1119 19.0788 12.9001 18.9224 12.744Z"
                                                    fill="#97B6CF"
                                                  />
                                                  <path
                                                    id="dsc"
                                                    d="M10.5892 6.0772L6.42251 1.91054C6.34489 1.83277 6.25253 1.77129 6.15084 1.7297C5.94698 1.64544 5.71803 1.64544 5.51417 1.7297C5.41248 1.77129 5.32011 1.83277 5.2425 1.91054L1.07583 6.0772C0.919572 6.23368 0.831875 6.44582 0.832031 6.66695C0.832188 6.88809 0.920184 7.10011 1.07666 7.25636C1.23314 7.41262 1.44528 7.50032 1.66642 7.50016C1.88756 7.5 2.09957 7.41201 2.25583 7.25553L5 4.51137V17.4997C5 17.7207 5.0878 17.9327 5.24408 18.0889C5.40036 18.2452 5.61232 18.333 5.83334 18.333C6.05435 18.333 6.26631 18.2452 6.4226 18.0889C6.57888 17.9327 6.66667 17.7207 6.66667 17.4997V4.51137L9.41085 7.25553C9.56801 7.40733 9.77852 7.49132 9.99701 7.48943C10.2155 7.48753 10.4245 7.39989 10.579 7.24538C10.7335 7.09087 10.8212 6.88186 10.8231 6.66337C10.825 6.44487 10.741 6.23437 10.5892 6.0772Z"
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
                                  </>
                                ) : isContentSiteAccordionOpen[
                                  item?.pdf?.id
                                ] ? (
                                  <div className="not_found">No Data Found</div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </Accordion.Body>
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
                                                    ? "Ignored"
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
