import React, { useEffect, useState, useRef } from "react";
import { getData } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import { Accordion, Col, Modal, ProgressBar, Row, Button, Table, Tooltip } from "react-bootstrap";
import { useSidebar } from "../CommonComponent/LoginLayout";
import { loader } from "../../loader";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import domtoimage from "dom-to-image";


const SurveyQuestionFormData = () => {
  const { eventIdContext, handleEventId } = useSidebar();
  const firstAccordionRef = useRef([]);
  const accordionRefs = useRef([]);
  const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"));
  const [eventData, setEventData] = useState(
    eventIdContext ? eventIdContext : localStorageEvent
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [countData, setCountData] = useState([]);
  const [sortNameDirection, setSortNameDirection] = useState(0);
  const [sortingCount, setSortingCount] = useState(0);
  const [sorting, setSorting] = useState(0);
  const [isActive, setIsActive] = useState({});

  const [sortName, setSortName] = useState(0);
  const [sortCount, setSortCount] = useState(0);
  const [sort, setSort] = useState(0);
  const [isActiveSort, setIsActiveSort] = useState({});

  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [userDetails, setUserDetails] = useState([]);
  const [showDetails, setShowDetails] = useState({});
  const [showAnswerDetails, setShowAnswerDetails] = useState({});
 
  const toggleDetails = (index) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const toggleAnswerDetails = (index) => {
    setShowAnswerDetails((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
 
  useEffect(() => {
    getSurveyData();
  }, []);
  const [progressBarData, setProgressBarData] = useState({
    patient_case_rating: {
      rating: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      percentage: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      questionName:
        "How relevant was this patient case to your clinical practice?",
      overall_rating: 0,
      total_users_answered: 0,
      type: "rating",
      color: ["#39CABC", "#FAC755", "#F58289", "#8A4E9C", "#0066BE"],
    },
    future_clinical: {
      rating: { Yes: 0, No: 0 },
      percentage: { yes: 0, No: 0 },
      overall_rating: 0,
      total_users_answered: 0,
      questionName: "I plan to attend future Clinical Practice patient cases:",
      type: "choice",
      color: ["#39CABC", "#FAC755"],
    },

    recommend_clinical: {
      rating: { Yes: 0, No: 0 },
      percentage: { Yes: 0, No: 0 },
      overall_rating: 0,
      questionName: "Would you recommend Clinical Practice to a colleague?",
      total_users_answered: 0,
      type: "choice",
      color: ["#39CABC", "#FAC755"],
    },
    suggestion: {
      rating: { Suggestion: 0 },
      percentage: { Suggestion: 0 },
      overall_rating: 0,
      questionName:
        "Please suggest a topic for a future Clinical Practice patient case:",
      type: "suggestion",

      total_users_answered: 0,
      color: ["#39CABC"],
    },
  });
  const [quesKey,setQuesKey] = useState('')
  const ratingColors = {
    5: "#39CABC", 
    4: "#FAC755", 
    3: "#F58289", 
    2: "#8A4E9C", 
    1: "#0066BE", 
  };

  useEffect(() => {
    getSurveyData();
  }, []);

  const getSurveyData = async () => {
    try {
      loader("show");
      let eventId = eventData?.eventId ? eventData?.eventId : 0;
      if (eventId == 0) {
        toast.error("Event id required");
        return;
      } else {
        const response = await getData(
          ENDPOINT.GET_SURVEY_DATA + `?type=2&eventId=${eventId}`
        );
        let data = [];
        response?.data?.data?.map((item, index) => {
          item.survey_data = JSON.parse(item?.survey_data);
          data?.push(item);
        });
        setData(data);
      }
    } catch (err) {
      console.log("--err", err);
    } finally {
      loader("hide");
    }
  };

  function isObject(value) {
    return value !== null && typeof value === "object";
  }
  useEffect(() => {
    try {
      const updatedProgressBarData = { ...progressBarData };

      if (!data || data.length === 0) {
        return;
      }

      const countObjects = {
        patient_case_rating: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        future_clinical: { yes: 0, no: 0 },
        recommend_clinical: { yes: 0, no: 0 },
        suggestion: { suggestion: 0 },
      };
      let usersData = {
        patient_case_rating: [],
        future_clinical: [],
        recommend_clinical: [],
        suggestion: [],
      };
      // Count occurrences of ratings and answers
      data.forEach((item) => {
        const { survey_data, ...rest } = item;
        Object.keys(survey_data).forEach((key) => {
          if (survey_data[key]) {
            if (isObject(survey_data[key])) {
              const subKey = Object.keys(survey_data[key])[0];
              if (subKey === "patient_case_rating") {
                const rating = survey_data[key][subKey];
                if (rating >= 1 && rating <= 5) {
                  countObjects[subKey][rating.toString()]++;
                  rest.rating=rating
                  rest.region=rest.region
                  usersData[subKey].push(rest);
                }
              } else if (
                subKey === "future_clinical" ||
                subKey === "recommend_clinical"
              ) {
                const answer = survey_data[key][subKey];
                if (answer === "yes" || answer === "no") {
                  countObjects[subKey][answer]++;
                  rest.answer=answer
                  rest.region=rest.region
                  usersData[subKey].push(rest);
                }
              }
            } 
            // else if (survey_data[key].trim() !== "") {
            //   countObjects[key]["suggestion"]++;
            //   // rest.suggestion=suggestion
            //   rest.region=rest.region
            //   usersData[key].push(rest);
            // }
            else if (typeof survey_data[key] === "string" && survey_data[key].trim() !== "") {
              countObjects[key]["suggestion"]++;
              rest.suggestion = survey_data[key].trim(); 
              rest.region = rest.region;
              usersData[key].push(rest);
            }
          }
        });
      });
      setUsersData(usersData);
      Object.keys(updatedProgressBarData).forEach((key) => {
        updatedProgressBarData[key]["rating"] = { ...countObjects[key] };
      });

      Object.keys(updatedProgressBarData).forEach((key) => {
        // const totalCount = Object.values(countObjects[key]).reduce(
        //   (acc, suggestion) => acc + suggestion,
        //   0
        // );
        const totalCount = data?.length;
        const percentageObj = {};
        let sum = 0;
        let weightedSum = 0;
        Object.keys(countObjects[key]).forEach((subKey) => {
          // if (subKey !== "suggestion") {
          const suggestion = countObjects[key][subKey];
          let rating = parseInt(subKey);
          if (isNaN(rating)) {
            rating = 0;
          }
          sum += suggestion;
          weightedSum += suggestion * rating;
          percentageObj[subKey] =
            totalCount > 0 ? ((suggestion / totalCount) * 100).toFixed(2) : 0;
          // }
        });
        updatedProgressBarData[key]["percentage"] = { ...percentageObj };
        updatedProgressBarData[key]["overall_rating"] =
          totalCount > 0 ? (weightedSum / sum).toFixed(2) : 0;
        updatedProgressBarData[key]["total_users_answered"] = totalCount;
      });
      setProgressBarData(updatedProgressBarData);
    } catch (error) {
      console.error("An error occurred while processing the data:", error);
    }
  }, [data]);

  const handleModal = (key) => {
    setModalOpen(true);
    if (usersData != null) {
      setUserData(usersData[key]);
      setQuesKey(key)
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleAccordionOpen = (index) => {
    setOpenAccordionIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  useEffect(() => {
    if (accordionRefs.current[openAccordionIndex]) {
      accordionRefs.current[openAccordionIndex].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [openAccordionIndex]);

  const downloadSurveyUsers = (data) => {
    console.log(data,'data')
    try {
      if (data?.length == 0) {
        toast.warning("No data found");
        return;
      }
      data = data?.map((item, index) => {
        let finalData = {};
        finalData.Name = item?.name ? item?.name.trim() : "N/A";
        finalData.Email = item?.email ? item?.email.trim() : "N/A";
        finalData.Region = item?.region ? item?.region.trim() : "N/A";
        finalData.Country = item?.country ? item?.country.trim() : "N/A";
        finalData.SurveyDate = item?.created_at
          ? item?.created_at.trim()
          : "N/A";
        finalData[
          `How relevant was this patient case to your clinical practice?`
        ] = item?.survey_data?.patient_case?.patient_case_rating
          ? `${item?.survey_data?.patient_case?.patient_case_rating} star`.trim()
          : "N/A";
        finalData[`I plan to attend future Clinical Practice patient cases:`] =
          item?.survey_data?.clinical_practice?.future_clinical
            ? `${item?.survey_data?.clinical_practice?.future_clinical}`.trim()
            : "N/A";
        finalData[`Would you recommend Clinical Practice to a colleague?`] =
          item?.survey_data?.recommend?.recommend_clinical
            ? `${item?.survey_data?.recommend?.recommend_clinical}`.trim()
            : "N/A";
        finalData[
          `Please suggest a topic for a future Clinical Practice patient case:`
        ] = item?.survey_data?.suggestion
          ? `${item?.survey_data?.suggestion}`.trim()
          : "N/A";
        return finalData;
      });
      const worksheet = XLSX.utils.json_to_sheet(data);
      // Specify column widths (in Excel units, 1 unit = 1/256th of the width of a character)
      const columnWidths = [
        { wch: 20 }, // Width of column A (Name)
        { wch: 25 }, // Width of column B (Email)
        { wch: 15 }, // Width of column C (Region)
        { wch: 15 }, // Width of column D (Country)
        { wch: 15 }, // Width of column E (SurveyDate)
        { wch: 45 }, // Width of column F (How relevant)
        { wch: 45 }, // Width of column G (Plan to attend)
        { wch: 45 }, // Width of column H (Recommend)
        { wch: 55 }, // Width of column I (Suggestion)
      ];

      // Apply column widths
      worksheet["!cols"] = columnWidths;
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });
      saveAs(blob, `Survey_Data_${eventData?.eventCode}.xlsx`);
    } catch (error) {
      console.error(
        "An error occurred while downloading the Excel file:",
        error
      );
    }
  };

  const downloadUserData = (userData) => {
    try {
      if (userData?.length == 0) {
        toast.warning("No data found");
        return;
      }
      userData = userData?.map((item, index) => {
        let downloadData = {};
        downloadData.Name = item?.name ? item?.name.trim() : "N/A";
        downloadData.Email = item?.email ? item?.email.trim() : "N/A";
        downloadData.Region = item?.region ? item?.region.trim() : "N/A";
        downloadData.Country = item?.country ? item?.country.trim() : "N/A";
        if (quesKey !== 'future_clinical' && quesKey !== 'recommend_clinical' && quesKey !== 'suggestion') {
          downloadData.Rating = item?.rating ? item?.rating.trim() : "N/A";
        }
        if (quesKey !== 'patient_case_rating' && quesKey !== 'suggestion') {
          downloadData.Answer = item?.answer ? item?.answer.trim() : "N/A";
        }
        downloadData.Date = item?.created_at
        ? item?.created_at.trim()
        : "N/A";       
         return downloadData;
      });
      const worksheet = XLSX.utils.json_to_sheet(userData);
      // Specify column widths (in Excel units, 1 unit = 1/256th of the width of a character)
      const columnWidths = [
        { wch: 20 }, // Width of column A (Name)
        { wch: 25 }, // Width of column B (Email)
        { wch: 15 }, // Width of column C (Region)
        { wch: 15 }, // Width of column D (Country)
        { wch: 15 }, // Width of column E (Rating)
        { wch: 15 }, // Width of column F (SurveyDate)
      ];

      // Apply column widths
      worksheet["!cols"] = columnWidths;
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });
      saveAs(blob, `Post_Survey_Data.xlsx`);
    } catch (error) {
      console.error(
        "An error occurred while downloading the Excel file:",
        error
      );
    }
  };

  const copyToClipboard = (content) => {
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(content);
      toast.success("Survey link copied to clipboard");
    } else {
      unsecuredCopyToClipboard(content);
    }
  };

  const unsecuredCopyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      toast.success("Survey link copied to clipboard");
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
    document.body.removeChild(textArea);
  };

  const dynamicSort = (key, direction) => (a, b) => {
    // Function to get the value of a nested key
    const getNestedValue = (obj, keys) => {
      for (const key of keys) {
        obj = obj?.[key];
      }
      return obj;
    };
  
    // If key is a string, split it into an array of keys
    const keys = typeof key === 'string' ? key.split('.') : [key];
    const valueA = getNestedValue(a, keys);
    const valueB = getNestedValue(b, keys);
  
    if (direction === 'asc') {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    } else {
      return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    }
  };

  const dynamicSorting = (key, direction) => (a, b) => {
    // Function to get the value of a nested key
    const getNestedValue = (obj, keys) => {
      for (const key of keys) {
        obj = obj?.[key];
      }
      return obj;
    };
  
    // If key is a string, split it into an array of keys
    const keys = typeof key === 'string' ? key.split('.') : [key];
    const valueA = getNestedValue(a, keys);
    const valueB = getNestedValue(b, keys);
  
    if (direction === 'asc') {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    } else {
      return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    }
  };
  
  const userSort = (e, key) => {
    const direction = sortNameDirection === 0 ? 'asc' : 'dec';
  
    const sortedUserData = [...data].sort(dynamicSort(key, direction));
  
    setData(sortedUserData);
    setSortNameDirection(sortNameDirection === 0 ? 1 : 0);
    setIsActive({ [key]: direction === 'asc' ? 'dec' : 'asc' });
    setSorting(1 - sorting);
    setSortingCount(sortingCount + 1);
  };

  const userSorting = (e, key) => {
    const direction = sortName === 0 ? 'asc' : 'dec';
  
    const sortedData = [...userData].sort(dynamicSorting(key, direction));
  
    setUserData(sortedData);
    setSortName(sortName === 0 ? 1 : 0);
    setIsActiveSort({ [key]: direction === 'asc' ? 'dec' : 'asc' });
    setSort(1 - sort);
    setSortCount(sortCount + 1);
  };

  const handleParent = async () => {
    try {
      loader("show");
      const element = document.getElementById("survey-card");
      // add padding to the element

      const dataUrl = await domtoimage.toPng(element, { cacheBust: true });

      const link = document.createElement("a");
      link.download = `Post_Survey.png`;
      link.href = dataUrl;
      link.click();

      loader("hide");
    } catch (err) {
      loader("hide");
      console.log(err);
    }
  };
  
  return (
    <Col className="right-sidebar custom-change">
      {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
      <div className="custom-container">
        {/* <Row>
          <Col></Col>
        </Row> */}

        <Row>
          {/* <Col> */}
          <div className="top-header regi-web sticky">
            <div className="page-title">
              <h2>Post Survey</h2>
            </div>
            <div className="top-right-action">
              <div className="d-flex justify-content-end header_btns clear-search">
                <a
                  className={`btn-filled`}
                  // href={`${window.location.protocol}//${window.location.host}survey/survey-question-form?event=${eventData?.eventCode}`}
                  href={`https://events.docintel.app/survey/survey-question-form?event=${eventData?.eventCode}`}
                  onClick={(e) => {
                    e.preventDefault();
                    // if (!isDataSaved) {
                    //   return;
                    // }
                    console.dir();
                    let newLink = e.currentTarget.getAttribute("href");
                    copyToClipboard(newLink);
                  }}
                >
                  Copy Link <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g clip-path="url(#clip0_5323_1320)">
                      <path d="M9.59862 1.59837L6.34653 4.85044C6.34025 4.85669 6.33634 4.86428 6.33009 4.87059C7.13125 4.75391 7.95428 4.83391 8.71722 5.13141L10.9244 2.92422C11.6556 2.193 12.8448 2.193 13.5761 2.92422C14.3073 3.65537 14.3073 4.84466 13.5761 5.57581C13.4514 5.70056 10.136 9.01597 10.324 8.82787C9.587 9.56494 8.37787 9.5334 7.67234 8.82787C7.30694 8.46247 6.712 8.46247 6.34653 8.82787L5.77734 9.39706C5.93522 9.66531 6.11622 9.92344 6.34653 10.1537C7.73528 11.5425 10.1257 11.6534 11.6297 10.1702C11.636 10.1639 11.6435 10.16 11.6498 10.1537L14.9019 6.90169C16.3663 5.43719 16.3663 3.06287 14.9019 1.59837C13.4374 0.133875 11.0631 0.133875 9.59862 1.59837Z" fill="white" />
                      <path d="M7.29013 11.8627L5.07582 14.077C4.34466 14.8082 3.15538 14.8082 2.42423 14.077C1.69301 13.3458 1.69301 12.1566 2.42423 11.4254C2.54891 11.3007 5.87141 7.97818 5.68338 8.16621C6.42038 7.42921 7.62951 7.46068 8.33504 8.16621C8.70044 8.53168 9.29541 8.53168 9.66085 8.16621L10.23 7.59702C10.0722 7.32877 9.89116 7.07065 9.66085 6.8404C8.27476 5.45424 5.88607 5.3363 4.3777 6.82393C4.37141 6.83018 4.36385 6.83412 4.35754 6.8404L1.09835 10.0996C-0.366086 11.564 -0.366148 13.9384 1.09835 15.4029C2.56285 16.8673 4.93723 16.8673 6.40166 15.4029L9.66082 12.1437C9.6671 12.1374 9.67101 12.1299 9.67726 12.1235C8.8761 12.2402 8.0531 12.1602 7.29013 11.8627Z" fill="white" />
                    </g>
                    <defs>
                      <clipPath id="clip0_5323_1320">
                        <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>

                <button
                  className="btn print"
                  title="Print data"
                  onClick={handleParent}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M2 4C2 2.89543 2.89543 2 4 2H7.41667C7.96895 2 8.41667 1.55228 8.41667 1C8.41667 0.447715 7.96895 0 7.41667 0H4C1.79086 0 0 1.79086 0 4V7.41667C0 7.96895 0.447715 8.41667 1 8.41667C1.55228 8.41667 2 7.96895 2 7.41667V4Z" fill="#0066BE" />
                    <path d="M16.5833 0C16.031 0 15.5833 0.447715 15.5833 1C15.5833 1.55228 16.031 2 16.5833 2H20C21.1046 2 22 2.89543 22 4V7.41667C22 7.96895 22.4477 8.41667 23 8.41667C23.5523 8.41667 24 7.96895 24 7.41667V4C24 1.79086 22.2091 0 20 0H16.5833Z" fill="#0066BE" />
                    <path d="M2 16.5833C2 16.031 1.55228 15.5833 1 15.5833C0.447715 15.5833 0 16.031 0 16.5833V20C0 22.2091 1.79086 24 4 24H8.33333C8.88562 24 9.33333 23.5523 9.33333 23C9.33333 22.4477 8.88562 22 8.33333 22H4C2.89543 22 2 21.1046 2 20V16.5833Z" fill="#0066BE" />
                    <path d="M24 16.5833C24 16.031 23.5523 15.5833 23 15.5833C22.4477 15.5833 22 16.031 22 16.5833V20C22 21.1046 21.1046 22 20 22H16.5833C16.031 22 15.5833 22.4477 15.5833 23C15.5833 23.5523 16.031 24 16.5833 24H20C22.2091 24 24 22.2091 24 20V16.5833Z" fill="#0066BE" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9 12.5004C9 10.8449 10.344 9.5 11.9996 9.5C13.6551 9.5 15 10.8449 15 12.5004C15 14.156 13.6551 15.5 11.9996 15.5C10.344 15.5 9 14.156 9 12.5004ZM13.7991 12.5004C13.7991 11.5073 12.9927 10.7 11.9996 10.7C11.0064 10.7 10.2 11.5073 10.2 12.5004C10.2 13.4936 11.0064 14.3 11.9996 14.3C12.9927 14.3 13.7991 13.4936 13.7991 12.5004Z" fill="#0066BE" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5963 8.3H18.4615C18.8952 8.3 19.3118 8.46771 19.6194 8.7676C19.927 9.06757 20.1 9.47489 20.1 9.9V16.5C20.1 17.3862 19.3642 18.1 18.4615 18.1H5.53846C4.63579 18.1 3.9 17.3862 3.9 16.5V9.9C3.9 9.47489 4.07298 9.06757 4.38065 8.7676C4.68823 8.46771 5.10478 8.3 5.53846 8.3H7.4037C7.47384 8.3 7.53879 8.26556 7.57717 8.2097L8.67004 6.61137C8.97401 6.16652 9.48587 5.9 10.0326 5.9H13.9674C14.5141 5.9 15.026 6.1665 15.33 6.61137L16.4228 8.20961C16.4611 8.26552 16.5261 8.3 16.5963 8.3ZM9.85906 7.3904L8.76624 8.98866C8.46169 9.43342 7.94989 9.7 7.4037 9.7H5.53846C5.48265 9.7 5.42956 9.72164 5.39042 9.7592C5.35199 9.79727 5.33077 9.84786 5.33077 9.9V16.5C5.33077 16.608 5.42144 16.7 5.53846 16.7H18.4615C18.5786 16.7 18.6692 16.608 18.6692 16.5V9.9C18.6692 9.84787 18.648 9.79729 18.6096 9.75923C18.5705 9.72165 18.5174 9.7 18.4615 9.7H16.5963C16.0501 9.7 15.5383 9.43347 15.2338 8.98871L14.1409 7.3904C14.1026 7.33449 14.0376 7.3 13.9674 7.3H10.0326C9.96249 7.3 9.89744 7.33457 9.85906 7.3904Z" fill="#0066BE" />
                  </svg>
                </button>
                </div>
            </div>
          </div>
            {/* <div className="clear-search d-flex align-items-center">
                  <a
                    className={`copy_link btn-filled`}
                    // href={`${window.location.protocol}//${window.location.host}survey/survey-question-form?event=${eventData?.eventCode}`}
                    href={`https://events.docintel.app/survey/survey-question-form?event=${eventData?.eventCode}`}
                    onClick={(e) => {
                      e.preventDefault();
                      // if (!isDataSaved) {
                      //   return;
                      // }
                      console.dir();
                      let newLink = e.currentTarget.getAttribute("href");
                      copyToClipboard(newLink);
                    }}
                  >
                Copy Link <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                  <g clip-path="url(#clip0_5323_1320)">
                    <path d="M9.59862 1.59837L6.34653 4.85044C6.34025 4.85669 6.33634 4.86428 6.33009 4.87059C7.13125 4.75391 7.95428 4.83391 8.71722 5.13141L10.9244 2.92422C11.6556 2.193 12.8448 2.193 13.5761 2.92422C14.3073 3.65537 14.3073 4.84466 13.5761 5.57581C13.4514 5.70056 10.136 9.01597 10.324 8.82787C9.587 9.56494 8.37787 9.5334 7.67234 8.82787C7.30694 8.46247 6.712 8.46247 6.34653 8.82787L5.77734 9.39706C5.93522 9.66531 6.11622 9.92344 6.34653 10.1537C7.73528 11.5425 10.1257 11.6534 11.6297 10.1702C11.636 10.1639 11.6435 10.16 11.6498 10.1537L14.9019 6.90169C16.3663 5.43719 16.3663 3.06287 14.9019 1.59837C13.4374 0.133875 11.0631 0.133875 9.59862 1.59837Z" fill="white" />
                    <path d="M7.29013 11.8627L5.07582 14.077C4.34466 14.8082 3.15538 14.8082 2.42423 14.077C1.69301 13.3458 1.69301 12.1566 2.42423 11.4254C2.54891 11.3007 5.87141 7.97818 5.68338 8.16621C6.42038 7.42921 7.62951 7.46068 8.33504 8.16621C8.70044 8.53168 9.29541 8.53168 9.66085 8.16621L10.23 7.59702C10.0722 7.32877 9.89116 7.07065 9.66085 6.8404C8.27476 5.45424 5.88607 5.3363 4.3777 6.82393C4.37141 6.83018 4.36385 6.83412 4.35754 6.8404L1.09835 10.0996C-0.366086 11.564 -0.366148 13.9384 1.09835 15.4029C2.56285 16.8673 4.93723 16.8673 6.40166 15.4029L9.66082 12.1437C9.6671 12.1374 9.67101 12.1299 9.67726 12.1235C8.8761 12.2402 8.0531 12.1602 7.29013 11.8627Z" fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_5323_1320">
                      <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
                    </clipPath>
                  </defs>
                </svg>
                  </a>
                
                    <button
                      className="btn print"
                      title="Download data"
                      onClick={handleParent}
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
                        />
                        <path
                          d="M14.7456 9.20249C14.5893 9.04626 14.3774 8.9585 14.1564 8.9585C13.9355 8.9585 13.7235 9.04626 13.5673 9.20249L10.8231 11.9467L10.8333 1.77108C10.8333 1.55006 10.7455 1.3381 10.5893 1.18182C10.433 1.02554 10.221 0.937744 10 0.937744C9.77899 0.937744 9.56702 1.02554 9.41074 1.18182C9.25446 1.3381 9.16667 1.55006 9.16667 1.77108L9.15643 11.9467L6.41226 9.20249C6.25509 9.05069 6.04459 8.96669 5.82609 8.96859C5.60759 8.97049 5.39858 9.05813 5.24408 9.21264C5.08957 9.36715 5.00193 9.57615 5.00003 9.79465C4.99813 10.0131 5.08213 10.2236 5.23393 10.3808L9.40059 14.5475C9.478 14.6251 9.56996 14.6867 9.6712 14.7287C9.77245 14.7707 9.88098 14.7923 9.99059 14.7923C10.1002 14.7923 10.2087 14.7707 10.31 14.7287C10.4112 14.6867 10.5032 14.6251 10.5806 14.5475L14.7473 10.3808C14.9033 10.2243 14.9907 10.0123 14.9904 9.79131C14.9901 9.57034 14.902 9.35854 14.7456 9.20249Z"
                          fill="#0066BE"
                        />
                      </svg>
                    </button>
            
            </div> */}
            <div className="survey-rating" style={{ display: "flex" }} id='survey-card'>
              
              {Object.entries(progressBarData).map(
                ([userValue, item], index) => (
                  <>
                  <div key={index} className="question-rating col">
                    <div className="question">
                      <div className="question-list">
                        <span>Q{index + 1}:</span> <p>{item?.questionName}</p>
                      </div>
                    </div>
                    <div className="rating">
                      <h2
                        dangerouslySetInnerHTML={{
                          __html:
                            item?.type === "rating"
                              ? `${item?.overall_rating} <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_5227_4798)">
            <path d="M11.1954 0.560765C11.4944 -0.186922 12.5056 -0.186922 12.8046 0.560765L15.5034 7.31059C15.6292 7.62514 15.9117 7.84016 16.2361 7.86825L23.1983 8.47116C23.9695 8.53794 24.282 9.54544 23.6956 10.0743L18.4014 14.8489C18.1546 15.0713 18.0467 15.4192 18.1215 15.7512L19.7255 22.8736C19.9032 23.6626 19.0851 24.2852 18.4237 23.8644L12.4529 20.0654C12.1746 19.8884 11.8254 19.8884 11.5472 20.0654L5.57632 23.8644C4.91492 24.2852 4.09678 23.6626 4.27446 22.8736L5.87852 15.7512C5.95327 15.4192 5.84536 15.0713 5.59864 14.8489L0.304406 10.0743C-0.282043 9.54544 0.0304618 8.53794 0.801672 8.47116L7.76386 7.86825C8.08831 7.84016 8.37082 7.62514 8.49659 7.31059L11.1954 0.560765Z" fill="#004A89"/>
            </g>
            <defs>
            <clipPath id="clip0_5227_4798">
            <rect width="24" height="24" fill="white"/>
            </clipPath>
            </defs>
            </svg>
          <span> ${item.total_users_answered}  <small>rating</small></span>`
                              : item.type === "suggestion"
                              ? ` ${item?.rating?.suggestion || 0} <span> ${
                                  data?.length
                                } <small>HCPs</small></span>`
                              : `${item?.total_users_answered} <span> ${data?.length} <small>HCPs</small></span>`,
                        }}
                      ></h2>
                    </div>
                    <div className="post-survey-rating-list d-flex justify-content-between flex-column">
                      <div className="post-survey-rating">
                      {Object.entries(item.rating)
                        .sort((a, b) => parseInt(b) - parseInt(a))
                        .map(([key, value], colorIndex) => (
                          <div key={key} className="survey-rating-detail">
                            <h5>
                              {key}{" "}
                              {item.type === "rating" && (
                                <svg
                                  width="16"
                                  height="17"
                                  viewBox="0 0 16 17"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clip-path="url(#clip0_5227_4752)">
                                    <path
                                      d="M7.4636 0.873843C7.6629 0.375386 8.3371 0.375386 8.5364 0.873843L10.3356 5.37373C10.4195 5.58343 10.6078 5.72677 10.8241 5.7455L15.4656 6.14744C15.9797 6.19196 16.188 6.86363 15.7971 7.21621L12.2676 10.3992C12.1031 10.5476 12.0312 10.7795 12.081 11.0008L13.1504 15.7491C13.2688 16.275 12.7234 16.6902 12.2825 16.4096L8.3019 13.8769C8.1164 13.7589 7.8836 13.7589 7.6981 13.8769L3.71755 16.4096C3.27661 16.6902 2.73118 16.275 2.84964 15.7491L3.91901 11.0008C3.96884 10.7795 3.8969 10.5476 3.73243 10.3992L0.202937 7.21621C-0.188028 6.86363 0.0203079 6.19196 0.534448 6.14744L5.17591 5.7455C5.39221 5.72677 5.58055 5.58343 5.66439 5.37373L7.4636 0.873843Z"
                                      fill="#97B6CF"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_5227_4752">
                                      <rect
                                        width="16"
                                        height="16"
                                        fill="white"
                                        transform="translate(0 0.5)"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              )}
                            </h5>
                            <ProgressBar style={{ flex: 1, margin: "0 10px" }}>
                              <ProgressBar
                                now={item.percentage[key]}
                                style={{
                                  backgroundColor: item.color[colorIndex],
                                }}
                              />
                            </ProgressBar>
                            <h5 className="survey-rating-number">
                              {item.rating[key]}
                            </h5>
                            {/* <div onClick={()=>handleModal(key,userValue)} className="survey-rating-view">
                  <img 
                  src={path_image + "eye-watch.svg"}
                  alt=""
                  />
                </div> */}
                          </div>
                        ))}
                        </div>
                        <div className="post-survey-btn">
                      <Button onClick={() => handleModal(userValue)}>
                        View
                      </Button>
                      </div>
                    </div>
                  </div>
                  </>
                )
              )}
            </div>
            <div className="survey_data">
              <div className="survey_data_heading d-flex align-items-center justify-content-between">
                <h4>Survey participants | <span>{data?.length}</span></h4>
                {/* {data?.length > 0 ? ( */}
                <div className="clear-search d-flex align-items-center">
                  {/* <a
                    className={`copy_link btn-voilet`}
                    // href={`${window.location.protocol}//${window.location.host}survey/survey-question-form?event=${eventData?.eventCode}`}
                    href={`https://events.docintel.app/survey/survey-question-form?event=${eventData?.eventCode}`}
                    onClick={(e) => {
                      e.preventDefault();
                      // if (!isDataSaved) {
                      //   return;
                      // }
                      console.dir();
                      let newLink = e.currentTarget.getAttribute("href");
                      copyToClipboard(newLink);
                    }}
                  >
                    Copy Survey Link
                  </a> */}
                  {data?.length > 0 ? (
                    <button
                      className="btn print"
                      title="Download data"
                      onClick={() => {
                        downloadSurveyUsers(data);
                      }}
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
                        />
                        <path
                          d="M14.7456 9.20249C14.5893 9.04626 14.3774 8.9585 14.1564 8.9585C13.9355 8.9585 13.7235 9.04626 13.5673 9.20249L10.8231 11.9467L10.8333 1.77108C10.8333 1.55006 10.7455 1.3381 10.5893 1.18182C10.433 1.02554 10.221 0.937744 10 0.937744C9.77899 0.937744 9.56702 1.02554 9.41074 1.18182C9.25446 1.3381 9.16667 1.55006 9.16667 1.77108L9.15643 11.9467L6.41226 9.20249C6.25509 9.05069 6.04459 8.96669 5.82609 8.96859C5.60759 8.97049 5.39858 9.05813 5.24408 9.21264C5.08957 9.36715 5.00193 9.57615 5.00003 9.79465C4.99813 10.0131 5.08213 10.2236 5.23393 10.3808L9.40059 14.5475C9.478 14.6251 9.56996 14.6867 9.6712 14.7287C9.77245 14.7707 9.88098 14.7923 9.99059 14.7923C10.1002 14.7923 10.2087 14.7707 10.31 14.7287C10.4112 14.6867 10.5032 14.6251 10.5806 14.5475L14.7473 10.3808C14.9033 10.2243 14.9907 10.0123 14.9904 9.79131C14.9901 9.57034 14.902 9.35854 14.7456 9.20249Z"
                          fill="#0066BE"
                        />
                      </svg>
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {data?.length > 0 ? (
              <>
                <div className="survey_data_details">
                  <div className="survey_data_accordion_heading">
                      <Table className="fold-table" id="individual_completion">
                      <thead className="sticky-header">
                          <tr>
                            <th  className="sort_option">
                              <span  onClick={(e) => userSort(e, "name")}>Name
                              <button
                                className={`event_sort_btn ${isActive?.name == "dec"
                                    ? "svg_active"
                                    : isActive?.name == "asc"
                                      ? "svg_asc"
                                      : ""
                                  }`}
                                onClick={(e) => userSort(e, "name")}
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
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button></span></th>

                            <th  className="sort_option">
                              <span onClick={(e) => userSort(e, "email")}>Email
                              <button
                                className={`event_sort_btn ${isActive?.email == "dec"
                                    ? "svg_active"
                                    : isActive?.email == "asc"
                                      ? "svg_asc"
                                      : ""
                                  }`}
                                onClick={(e) => userSort(e, "email")}
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
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button></span></th>

                              <th  className="sort_option">
                        <span  onClick={(e) => userSort(e, "region")}>Region
                        <button
                          className={`event_sort_btn ${
                            isActive?.region == "dec"
                              ? "svg_active"
                              : isActive?.region == "asc"
                              ? "svg_asc"
                              : ""
                          }`}
                          onClick={(e) => userSort(e, "region")}
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
                                <rect width="8" height="8" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button></span>
                              </th>

                            <th  className="sort_option"> 
                              <span   onClick={(e) => userSort(e, "country")}>Country
                              <button
                                className={`event_sort_btn ${isActive?.country == "dec"
                                    ? "svg_active"
                                    : isActive?.country == "asc"
                                      ? "svg_asc"
                                      : ""
                                  }`}
                                onClick={(e) => userSort(e, "country")}
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
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button></span></th>

                            <th  className="sort_option"> 
                              <span onClick={(e) => userSort(e, "created_at")}>Date
                              <button
                                className={`event_sort_btn ${isActive?.created_at == "dec"
                                    ? "svg_active"
                                    : isActive?.created_at == "asc"
                                      ? "svg_asc"
                                      : ""
                                  }`} onClick={(e) => userSort(e, "created_at")}
                                
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
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button></span></th>

                            <th  className="sort_option">
                              <span onClick={(e) => userSort(e, "survey_data.patient_case.patient_case_rating")}>Q1
                              <button
                                className={`event_sort_btn ${isActive?.survey_data?.patient_case
                                    ?.patient_case_rating == "dec"
                                    ? "svg_active"
                                    : isActive?.survey_data?.patient_case
                                      ?.patient_case_rating == "asc"
                                      ? "svg_asc"
                                      : ""
                                  }`}
                                onClick={(e) => userSort(e, "survey_data.patient_case.patient_case_rating")}
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
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button></span></th>

                            <th  className="sort_option">
                              <span  onClick={(e) => userSort(e, "survey_data.clinical_practice.future_clinical")}>Q2
                              <button
                                className={`event_sort_btn ${isActive?.survey_data?.clinical_practice?.future_clinical == "dec"
                                    ? "svg_active"
                                    : isActive?.survey_data?.clinical_practice?.future_clinical == "asc"
                                      ? "svg_asc"
                                      : ""
                                  }`}
                                onClick={(e) => userSort(e, "survey_data.clinical_practice.future_clinical")}
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
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button></span></th>

                            <th  className="sort_option">
                              <span  onClick={(e) => userSort(e, "survey_data.recommend.recommend_clinical")}>Q3
                              <button
                                className={`event_sort_btn ${isActive?.survey_data?.recommend?.recommend_clinical == "dec"
                                    ? "svg_active"
                                    : isActive?.survey_data?.recommend?.recommend_clinical == "asc"
                                      ? "svg_asc"
                                      : ""
                                  }`}
                                onClick={(e) => userSort(e, "survey_data.recommend.recommend_clinical")}
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
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button></span></th>

                          </tr>
                        </thead>
                      {/* <ul>
                      <li>
                        Name
                        <button
                          className={`event_sort_btn ${
                            isActive?.name == "dec"
                              ? "svg_active"
                              : isActive?.name == "asc"
                              ? "svg_asc"
                              : ""
                          }`}
                          onClick={(e) => userSort(e, "name")}
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
                                <rect width="8" height="8" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </li>
                      <li>
                        Email
                        <button
                          className={`event_sort_btn ${
                            isActive?.email == "dec"
                              ? "svg_active"
                              : isActive?.email == "asc"
                              ? "svg_asc"
                              : ""
                          }`}
                          onClick={(e) => userSort(e, "email")}
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
                                <rect width="8" height="8" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </li>
                      <li>
                        Country
                        <button
                          className={`event_sort_btn ${
                            isActive?.country == "dec"
                              ? "svg_active"
                              : isActive?.country == "asc"
                              ? "svg_asc"
                              : ""
                          }`}
                          onClick={(e) => userSort(e, "country")}
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
                                <rect width="8" height="8" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </li>
                      <li>
                        Date
                        <button
                          className={`event_sort_btn ${
                            isActive?.created_at == "dec"
                              ? "svg_active"
                              : isActive?.created_at == "asc"
                              ? "svg_asc"
                              : ""
                          }`}
                          onClick={(e) => userSort(e, "created_at")}
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
                                <rect width="8" height="8" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </li>
                      <li>Q1
                      <button
                          className={`event_sort_btn ${
                            isActive?.survey_data?.patient_case
                            ?.patient_case_rating == "dec"
                              ? "svg_active"
                              : isActive?.survey_data?.patient_case
                              ?.patient_case_rating == "asc"
                              ? "svg_asc"
                              : ""
                          }`}
                          onClick={(e) => userSort(e, "survey_data.patient_case.patient_case_rating")}
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
                                <rect width="8" height="8" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </li>
                      <li>Q2
                      <button
                          className={`event_sort_btn ${
                            isActive?.survey_data?.clinical_practice?.future_clinical == "dec"
                              ? "svg_active"
                              : isActive?.survey_data?.clinical_practice?.future_clinical == "asc"
                              ? "svg_asc"
                              : ""
                          }`}
                          onClick={(e) => userSort(e, "survey_data.clinical_practice.future_clinical")}
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
                                <rect width="8" height="8" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                      </button>
                      </li>
                      <li>Q3
                      <button
                          className={`event_sort_btn ${
                            isActive?.survey_data?.recommend?.recommend_clinical == "dec"
                              ? "svg_active"
                              : isActive?.survey_data?.recommend?.recommend_clinical == "asc"
                              ? "svg_asc"
                              : ""
                          }`}
                          onClick={(e) => userSort(e, "survey_data.recommend.recommend_clinical")}
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
                                <rect width="8" height="8" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                      </button>
                      </li>
                    </ul> */}
                  <tbody>
                    
                  {data?.map((item, index) => {
                    return (
                      <>
                        <tr className={showDetails[index] ? 'view show' : 'view'}  onClick={() => toggleDetails(index)}>
                        <td>{item?.name ? item?.name : "N/A"}</td>
                        <td>{item?.email ? item?.email : "N/A"}</td>
                        <td>{item?.region ? item?.region : "N/A"}</td>
                        <td>{item?.country ? item?.country : "N/A"}</td>
                        <td>{item?.created_at ? item?.created_at : "N/A"}</td>
                          <td>
                            {
                              item?.survey_data?.patient_case
                                ?.patient_case_rating
                            }{" "}
                            <svg
                              width="16"
                              height="17"
                              viewBox="0 0 16 17"
                              // fill="none"
                              fill={ratingColors[item?.survey_data?.patient_case?.patient_case_rating]}
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0_5227_4752)">
                                <path
                                  d="M7.4636 0.873843C7.6629 0.375386 8.3371 0.375386 8.5364 0.873843L10.3356 5.37373C10.4195 5.58343 10.6078 5.72677 10.8241 5.7455L15.4656 6.14744C15.9797 6.19196 16.188 6.86363 15.7971 7.21621L12.2676 10.3992C12.1031 10.5476 12.0312 10.7795 12.081 11.0008L13.1504 15.7491C13.2688 16.275 12.7234 16.6902 12.2825 16.4096L8.3019 13.8769C8.1164 13.7589 7.8836 13.7589 7.6981 13.8769L3.71755 16.4096C3.27661 16.6902 2.73118 16.275 2.84964 15.7491L3.91901 11.0008C3.96884 10.7795 3.8969 10.5476 3.73243 10.3992L0.202937 7.21621C-0.188028 6.86363 0.0203079 6.19196 0.534448 6.14744L5.17591 5.7455C5.39221 5.72677 5.58055 5.58343 5.66439 5.37373L7.4636 0.873843Z"
                                  // fill="#97B6CF"
                                  fill={ratingColors[item?.survey_data?.patient_case?.patient_case_rating]}
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_5227_4752">
                                  <rect
                                    width="16"
                                    height="16"
                                    fill="white"
                                    transform="translate(0 0.5)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </td>
                          <td>
                            {
                              item?.survey_data?.clinical_practice
                                ?.future_clinical
                            }
                          </td>
                        <td>
                            {
                              item?.survey_data?.recommend
                                ?.recommend_clinical
                            }
                          </td>
                      </tr>
                      {showDetails[index] && (
                          <tr className="fold">
                            <td colspan="8">
                           <div className="survey-data">
                              <h6>
                                {" "}
                                Q4. Please suggest a topic for a
                                future Clinical Practice patient case:
                              </h6>
                              <p>
                                {/* {item?.survey_data?.suggestion
                                  ? item?.survey_data?.suggestion
                                  : "N/A"} */}
                                {item?.survey_data?.suggestion.trim() !== "" ? item?.survey_data?.suggestion : "N/A"}
                              </p>
                            </div>
                            </td>
                          </tr>
                        )}
                        <tr className="blank">
                                <td colspan="8" style={{ height: "10px;" }}>
                                  &nbsp;
                                </td>
                              </tr>
                        {/* <Accordion
                          key={index}
                          activeKey={openAccordionIndex === index ? "0" : null}
                          onSelect={() => handleAccordionOpen(index)}
                          className="content_analytics_accordian"
                        >
                          <Accordion.Item
                            eventKey="0"
                            ref={(ref) => {
                              accordionRefs.current[index] = ref;
                            }}
                          >
                            <Accordion.Header>
                              <ul>
                                <li>{item?.name ? item?.name : "N/A"}</li>
                                <li>{item?.email ? item?.email : "N/A"}</li>
                                <li>{item?.country ? item?.country : "N/A"}</li>
                                <li>
                                  {item?.created_at ? item?.created_at : "N/A"}
                                </li>
                                <li>
                                  {
                                    item?.survey_data?.patient_case
                                      ?.patient_case_rating
                                  }{" "}
                                  <svg
                                    width="16"
                                    height="17"
                                    viewBox="0 0 16 17"
                                    // fill="none"
                                    fill={ratingColors[item?.survey_data?.patient_case?.patient_case_rating]}
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clip-path="url(#clip0_5227_4752)">
                                      <path
                                        d="M7.4636 0.873843C7.6629 0.375386 8.3371 0.375386 8.5364 0.873843L10.3356 5.37373C10.4195 5.58343 10.6078 5.72677 10.8241 5.7455L15.4656 6.14744C15.9797 6.19196 16.188 6.86363 15.7971 7.21621L12.2676 10.3992C12.1031 10.5476 12.0312 10.7795 12.081 11.0008L13.1504 15.7491C13.2688 16.275 12.7234 16.6902 12.2825 16.4096L8.3019 13.8769C8.1164 13.7589 7.8836 13.7589 7.6981 13.8769L3.71755 16.4096C3.27661 16.6902 2.73118 16.275 2.84964 15.7491L3.91901 11.0008C3.96884 10.7795 3.8969 10.5476 3.73243 10.3992L0.202937 7.21621C-0.188028 6.86363 0.0203079 6.19196 0.534448 6.14744L5.17591 5.7455C5.39221 5.72677 5.58055 5.58343 5.66439 5.37373L7.4636 0.873843Z"
                                        // fill="#97B6CF"
                                        fill={ratingColors[item?.survey_data?.patient_case?.patient_case_rating]}
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_5227_4752">
                                        <rect
                                          width="16"
                                          height="16"
                                          fill="white"
                                          transform="translate(0 0.5)"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </li>
                                <li>
                                  {
                                    item?.survey_data?.clinical_practice
                                      ?.future_clinical
                                  }
                                </li>
                                <li>
                                  {
                                    item?.survey_data?.recommend
                                      ?.recommend_clinical
                                  }
                                </li>
                              </ul>
                            </Accordion.Header>
                            <Accordion.Body>
                              {openAccordionIndex === index && (
                                <>
                                  {Object.keys(item?.survey_data)?.length ? (
                                    <div className="main">
                                      {/* <div className="survey-data">
                                        <h6>
                                          {" "}
                                          1. How relevant was this patient case
                                          to your clinical practice?
                                        </h6>
                                        <p>
                                          {
                                            item?.survey_data?.patient_case
                                              ?.patient_case_rating
                                          }{" "}
                                          star
                                        </p>
                                      </div>

                                      <div className="survey-data">
                                        <h6>
                                          {" "}
                                          2. I plan to attend future Clinical
                                          Practice patient cases:
                                        </h6>
                                        <p>
                                          {
                                            item?.survey_data?.clinical_practice
                                              ?.future_clinical
                                          }
                                        </p>
                                      </div>

                                      <div className="survey-data">
                                        <h6>
                                          {" "}
                                          3. Would you recommend Clinical
                                          Practice to a colleague?
                                        </h6>
                                        <p>
                                          {
                                            item?.survey_data?.recommend
                                              ?.recommend_clinical
                                          }
                                        </p>
                                      </div> */}

                                      {/*<div className="survey-data">
                                        <h6>
                                          {" "}
                                          Q4. Please suggest a topic for a
                                          future Clinical Practice patient case:
                                        </h6>
                                        <p>
                                          {/* {item?.survey_data?.suggestion
                                            ? item?.survey_data?.suggestion
                                            : "N/A"} 
                                          {item?.survey_data?.suggestion.trim() !== "" ? item?.survey_data?.suggestion : "N/A"}
                                        </p>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="no_found">
                                      <p align="center">No Data Found</p>
                                    </div>
                                  )}
                                </>
                              )}
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion> */}
                      </>
                    );
                  })}
                  </tbody>
                  </Table>
                  </div>
                </div>
                </>
              ) : (
                <div className="no_found">
                  <p align="center">No Data Found</p>
                </div>
              )}
            </div>
          {/* </Col> */}
        </Row>
      </div>
      {modalOpen && (
        <Modal
          show={modalOpen}
          onHide={handleModalClose}
          id="tagsModal"
          className="survey_detail_modal"
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop="static"
        >
          <Modal.Header>
              <h5 className="modal-title" id="staticBackdropLabel">
                Preview{" "}
              </h5>
              <button
                type="button"
                onClick={handleModalClose}
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
                
          </Modal.Header>
          <Modal.Body>
            <>
              <div className="d-flex justify-content-end">
                <div className="clear-search d-flex align-items-center">
                  {userData?.length > 0 ? (
                    <button
                      className="btn print"
                      title="Download data"
                      onClick={() => {
                        downloadUserData(userData);
                      }}
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
                        />
                        <path
                          d="M14.7456 9.20249C14.5893 9.04626 14.3774 8.9585 14.1564 8.9585C13.9355 8.9585 13.7235 9.04626 13.5673 9.20249L10.8231 11.9467L10.8333 1.77108C10.8333 1.55006 10.7455 1.3381 10.5893 1.18182C10.433 1.02554 10.221 0.937744 10 0.937744C9.77899 0.937744 9.56702 1.02554 9.41074 1.18182C9.25446 1.3381 9.16667 1.55006 9.16667 1.77108L9.15643 11.9467L6.41226 9.20249C6.25509 9.05069 6.04459 8.96669 5.82609 8.96859C5.60759 8.97049 5.39858 9.05813 5.24408 9.21264C5.08957 9.36715 5.00193 9.57615 5.00003 9.79465C4.99813 10.0131 5.08213 10.2236 5.23393 10.3808L9.40059 14.5475C9.478 14.6251 9.56996 14.6867 9.6712 14.7287C9.77245 14.7707 9.88098 14.7923 9.99059 14.7923C10.1002 14.7923 10.2087 14.7707 10.31 14.7287C10.4112 14.6867 10.5032 14.6251 10.5806 14.5475L14.7473 10.3808C14.9033 10.2243 14.9907 10.0123 14.9904 9.79131C14.9901 9.57034 14.902 9.35854 14.7456 9.20249Z"
                          fill="#0066BE"
                        />
                      </svg>
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="polls-preview">
              
                {userData?.length > 0  ?  (
                  <>
                  <div className="survey_data_details">
                    <div className="survey_data_accordion_heading">
                      <table>
                          <thead className="sticky-header">
                          <tr>
                            {/* <th>Name</th> */}
                            <th  className="sort_option">
                              <span  onClick={(e) => userSorting(e, "name")}>Name
                              <button
                                className={`event_sort_btn ${isActiveSort?.name == "dec"
                                    ? "svg_active"
                                    : isActiveSort?.name == "asc"
                                      ? "svg_asc"
                                      : ""
                                  }`}
                                onClick={(e) => userSorting(e, "name")}
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
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                            </button></span></th>

                            {/* <th>Email</th> */}
                            <th  className="sort_option">
                              <span onClick={(e) => userSorting(e, "email")}>Email
                              <button
                                className={`event_sort_btn ${isActiveSort?.email == "dec"
                                    ? "svg_active"
                                    : isActiveSort?.email == "asc"
                                      ? "svg_asc"
                                      : ""
                                  }`}
                                onClick={(e) => userSorting(e, "email")}
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
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button></span></th>

                            {/* <th>Region</th> */}
                            <th  className="sort_option">
                        <span  onClick={(e) => userSorting(e, "region")}>Region
                        <button
                          className={`event_sort_btn ${
                            isActiveSort?.region == "dec"
                              ? "svg_active"
                              : isActiveSort?.region == "asc"
                              ? "svg_asc"
                              : ""
                          }`}
                          onClick={(e) => userSorting(e, "region")}
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
                                <rect width="8" height="8" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button></span>
                              </th>

                            {/* <th>Country</th> */}
                            <th  className="sort_option"> 
                              <span   onClick={(e) => userSorting(e, "country")}>Country
                              <button
                                className={`event_sort_btn ${isActiveSort?.country == "dec"
                                    ? "svg_active"
                                    : isActiveSort?.country == "asc"
                                      ? "svg_asc"
                                      : ""
                                  }`}
                                onClick={(e) => userSorting(e, "country")}
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
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button></span></th>
                            {quesKey === 'patient_case_rating' ? (
                                // <th>Rating</th>
                                <th  className="sort_option"> 
                              <span   onClick={(e) => userSorting(e, "rating")}>Rating
                              <button
                                className={`event_sort_btn ${isActiveSort?.rating == "dec"
                                    ? "svg_active"
                                    : isActiveSort?.rating == "asc"
                                      ? "svg_asc"
                                      : ""
                                  }`}
                                onClick={(e) => userSorting(e, "rating")}
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
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button></span></th>
                              ) : (quesKey === 'future_clinical' || quesKey === 'recommend_clinical') ? (
                                // <th>Answer</th>
                                <th  className="sort_option"> 
                              <span   onClick={(e) => userSorting(e, "answer")}>Answer
                              <button
                                className={`event_sort_btn ${isActiveSort?.answer == "dec"
                                    ? "svg_active"
                                    : isActiveSort?.answer == "asc"
                                      ? "svg_asc"
                                      : ""
                                  }`}
                                onClick={(e) => userSorting(e, "answer")}
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
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button></span></th>
                              )  : (
                                '' 
                            )}

                            {/* <th>Date</th> */}
                            <th  className="sort_option"> 
                              <span onClick={(e) => userSorting(e, "created_at")}>Date
                              <button
                                className={`event_sort_btn ${isActiveSort?.created_at == "dec"
                                    ? "svg_active"
                                    : isActiveSort?.created_at == "asc"
                                      ? "svg_asc"
                                      : ""
                                  }`}
                                  onClick={(e) => userSorting(e, "created_at")}
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
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button></span></th>
                          </tr>
                        </thead>
                          <tbody>
                            {userData?.map((item, index) => (
                              <>
                                <tr key={index} onClick={quesKey === 'suggestion' ? () => toggleAnswerDetails(index) : undefined} className={quesKey === 'suggestion' ? showAnswerDetails[index] ? 'view show' : 'view' : ''}>
                                  <td>{item?.name ? item?.name : "N/A"}</td>
                                  <td>{item?.email ? item?.email : "N/A"}</td>
                                  <td>{item?.region ? item?.region : "N/A"}</td>
                                  <td>{item?.country ? item?.country : "N/A"}</td>
                                  {quesKey === 'patient_case_rating' ? (
                                    <td>
                                      {item?.rating ? item?.rating : "N/A"}
                                      <svg
                                        width="16"
                                        height="17"
                                        viewBox="0 0 16 17"
                                        // fill="none"
                                        fill={ratingColors[item?.rating]}
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <g clip-path="url(#clip0_5227_4752)">
                                          <path
                                            d="M7.4636 0.873843C7.6629 0.375386 8.3371 0.375386 8.5364 0.873843L10.3356 5.37373C10.4195 5.58343 10.6078 5.72677 10.8241 5.7455L15.4656 6.14744C15.9797 6.19196 16.188 6.86363 15.7971 7.21621L12.2676 10.3992C12.1031 10.5476 12.0312 10.7795 12.081 11.0008L13.1504 15.7491C13.2688 16.275 12.7234 16.6902 12.2825 16.4096L8.3019 13.8769C8.1164 13.7589 7.8836 13.7589 7.6981 13.8769L3.71755 16.4096C3.27661 16.6902 2.73118 16.275 2.84964 15.7491L3.91901 11.0008C3.96884 10.7795 3.8969 10.5476 3.73243 10.3992L0.202937 7.21621C-0.188028 6.86363 0.0203079 6.19196 0.534448 6.14744L5.17591 5.7455C5.39221 5.72677 5.58055 5.58343 5.66439 5.37373L7.4636 0.873843Z"
                                            // fill="#97B6CF"
                                            fill={ratingColors[item?.rating]}
                                          />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_5227_4752">
                                            <rect
                                              width="16"
                                              height="16"
                                              fill="white"
                                              transform="translate(0 0.5)"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </td>
                                  ) : quesKey === 'future_clinical' ? (
                                    <td>{item?.answer ? item?.answer : "N/A"}</td>
                                  ) : quesKey === 'recommend_clinical' ? (
                                    <td>{item?.answer ? item?.answer : "N/A"}</td>
                                  ) : null}
                                  <td>{item?.created_at ? item?.created_at : "N/A"}</td>
                                </tr>
                                {quesKey === 'suggestion' && showAnswerDetails[index] && (
                                  <tr className="fold" key={`details-${index}`}>
                                    <td colSpan="5">
                                    
                           <div className="survey-data">
                              <h6>
                                {" "}
                                Q4. Please suggest a topic for a
                                future Clinical Practice patient case:
                              </h6>
                              <p>
                                {/* {item?.survey_data?.suggestion
                                  ? item?.survey_data?.suggestion
                                  : "N/A"} */}
                                { item?.suggestion}
                              </p>
                            </div>
                           
                                    </td>
                                  </tr>
                                )}

                                <tr key={`blank-${index}`} className="blank">
                                  <td colSpan="6" style={{ height: "8px" }}>&nbsp;</td>
                                </tr>
                              </>
                            ))}
                          </tbody>
                      </table>
                    </div>
                  </div>
                  </>
                ) : (
                  <div className="no_found">
                    <p align="center">No Data Found</p>
                  </div>
                )}
              </div>
            </>
          </Modal.Body>
        </Modal>
      )}
    </Col>
  );
};

export default SurveyQuestionFormData;
