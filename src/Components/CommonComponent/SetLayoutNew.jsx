import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "./HeaderComponent/Header";
import { getDataRd, postData } from "../../axios/apiInstanceHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import {
  Accordion,
  Button,
  Col,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from "react-bootstrap";
import { loader } from "../../loader";
import "../assets/css/library.scss";
import TrialCompletionTable from "./TrialCompletionTable";
const defaultPdfRole = {
  3968:"Site User-Blinded",
  3970:"Site unblinded pharmacist",
  4521: "Investigator-Blinded"
};


let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const SetLayoutNew = () => {
  const rdLikeArray=["56Ek4feL/1A8mZgIKQWEqg==","bWmUjqX7J011   WUTYn9g==","MXl8m36VZFYXpgFVz3Pg0g==","HPW6EwQy6v8VrfnMsjz8tg=="]
  const isLikeRdAccount= rdLikeArray.includes(localStorage.getItem("user_id"))
  let dummyData = [
    {
      image: `${path_image}library-icon.svg`,
      title: "Library",
      subtitle: "Create and edit content, see all of your content here",
    },
    {
      image: `${path_image}crm-icon.svg`,
      title: "CRMs",
      subtitle: "See who read what, their RTR-activity and their habits",
    },
    {
      image: `${path_image}srm-icon.svg`,
      title: "SRM",
      subtitle: "...............................",
    },
    {
      image: `${path_image}analytics-icon.svg`,
      title: "Analytics",
      subtitle: "Check the engagement rates, dig into readers and content",
    },
    {
      image: `${path_image}email-icon1.svg`,
      title: "Email",
      subtitle: "Send and resend an email, and work with your lists",
    },
  ];

  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState('site_number'); // Initial sort key
  const [sortOrder, setSortOrder] = useState('desc');
  const [indidualCompletionTableData, setIndividualCompletionTableData] = useState();
  const [indidualCompletionTableDataBackup, setIndividualCompletionTableDataBackup] = useState();
  const [individualCompletionShow, setIndividualCompletionShow] = useState();
  const [trainingDropdownData, setTrainingCompletionDropdownData] = useState();
  const [trainingCertificate, setTrainingCertificate] = useState();
  const [isApiStatus, setIsApiStatus] = useState(false);
  const individual_Completion = useRef(null);
  const [isActive, setIsActive] = useState("");
  const [trainingAccordianShow, setTrainingAccordianShow] = useState();
  const [traingAccordianData, setTrainingAccordianData] = useState();
  const [flag, setFlag] = useState({
    individual_Completion: false,
    site_Completion: false,
    site_Engagement: false,
    content: false,
    top_content: false,
  });

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
      case 7:
        return "#97B6CF";     // Color for "Blocked"
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
      case 7:
        return "Blocked";
      default:
        return "Ignored";
    }
  };

  const [filterdata, setFilterData] = useState({
    'training_status_code': [
      { "id": 1, 'title': 'New' },
      { "id": 3, 'title': 'Invited' },
      { "id": 5, 'title': 'Started' },
      { "id": 2, 'title': 'Completed' },
      { "id": 6, 'title': 'Not Completed' },
      { "id": 4, 'title': 'Ignored' },
      { "id": 7, 'title': 'Blocked' },
    ],
    'user_type': ['Site User-Blinded', 'Investigator-Blinded', 'Site unblinded pharmacist'],
    'site_number': []

  });
  let createdBy = localStorage.getItem("user_id")
  

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
    
      if (Object.keys(filterdata?.site_number)?.length == 0) {
        let body = {
          user_id: createdBy
        }
        const response = await postData("https://webinar.docintel.app/demoapi/cron_Setup/public/api/distributes/filters_list", body)

        const site_number = response?.data?.response?.data?.site_number
        setFilterData((prevData) => {
          return {
            ...prevData,
            site_number: site_number
          };
        });
      }
      if (!indidualCompletionTableData) {
        const result = await postData(ENDPOINT.INDIVIDUAL_TRAINING_COMPLETION_V2, { created_by: createdBy });
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
            created_by: createdBy
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
              created_by: createdBy
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


  
  
  useEffect( async () => {
    let newdata = [...dummyData];
    if (localStorage.getItem("group_id") == 2) {
      newdata.push({
        image: `${path_image}license-icon.svg`,
        title: "Licensed",
        subtitle: "All your licensed content in one place",
      });
    }

    if (
      typeof localStorage.getItem("webinar_flag") !== "undefined" &&
      localStorage.getItem("webinar_flag") == 1 || localStorage.getItem("user_id") === "IJype v19WASFcSlrfRENQ=="
    ) {
      newdata.push({
        image: `${path_image}webinar-icon.svg`,
        title: "Webinar",
        subtitle: "See Webinar Event users",
      });
    }
    
    setData(newdata);
    
    
  }, []);

  const navigate = useNavigate();
  let [active, setActive] = useState();
  const handleChange = (title) => {
    setActive(title);
    if (title == "Library") {
      navigate("/library-content");
    } else if (title == "CRM") {
      (isLikeRdAccount)
        ? navigate("/new-readers-reviews")
        :
        navigate("/readers-view");
      
    } else if (title == "Analytics") {
      localStorage.getItem("group_id") == 2
        ? navigate("/content-analytics")
        : localStorage.getItem("user_id") == "B7SHpAc XDXSH NXkN0rdQ=="
          ? navigate("/totalhcp")
          : localStorage.getItem("user_id") == "iSnEsKu5gB/DRlycxB6G4g=="
            ? navigate("/octalatch-totalhcp")
            : (isLikeRdAccount)
              ? navigate("/Trial-analytics")
              : localStorage.getItem("user_id") == "wW0geGtDPvig5gF 6KbJrg=="
                ? navigate("/totalhcp")
                : localStorage.getItem("user_id") == "UbCJcnLM9fe HsRMgX8c1A=="
                  ? navigate("/totalhcp")
                  : localStorage.getItem("user_id") == "z2TunmZQf3QwCsICFTLGGQ=="
                    ? navigate("/totalhcp")
                    : localStorage.getItem("user_id") == "qDgwPdToP05Kgzc g2VjIQ=="
                      ? navigate("/totalhcp")
                      : navigate("/content-analytics");
    } else if (title == "Email") {
   
      navigate("/EmailList");
    } else if (title == "Webinar") {
      if (
        typeof localStorage.getItem("webinar_flag") !== "undefined" &&
        localStorage.getItem("webinar_flag") == 1
        ||
        localStorage.getItem("user_id") === "IJype v19WASFcSlrfRENQ=="
      ) {
        navigate("/webinar/event-listing")
        
      }
    } else if (title == "Licensed") {
     
      
      navigate("/license-content");
    } else if (title == "Q&A/SURVEY") {
      if (isLikeRdAccount) {
        //Remove code because it takes to old server
      }
    }
  };

  const isAuthenticated = localStorage.getItem("user_id") !== null;

  function formatTime(time) {
    // Create a Date object with today's date and the given time
    const [hours, minutes, seconds] = time.split(':');
    const date = new Date();
    date.setHours(hours, minutes, seconds);

    // Get the hour and minute in the desired format
    let hours12 = date.getHours() % 12 || "00"; // Convert to 12-hour format
    let minutesFormatted = date.getMinutes().toString().padStart(2, '0');
    let secondsFormatted = date.getSeconds().toString().padStart(2, '0');
    let ampm = date.getHours() >= 12 ? 'PM' : 'AM';

    // Return formatted time
    return `${hours12}:${minutesFormatted}:${secondsFormatted} ${ampm}`;
}

  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      {isAuthenticated ? (
        <>
          <Header />

          <div className="default-layout d-flex latest-home">
            <div className="library_create home-layout  d-flex">
              <Row>
                {data.map((item, index) => (
                  <div
                    className={
                      active == index
                        ? "col library_create-box active"
                        : "col library_create-box"
                    }
                    key={index}
                    onClick={() => handleChange(item?.title)}
                  >
                    <div className="create-library-img">
                      <img src={item.image} alt="Content msg Library" />
                    </div>
                    <div className="create-library-content">
                      <h3>{item.title}</h3>
                      <h5>{item.subtitle}</h5>
                    </div>
                  </div>
                ))}
              </Row>
            </div>
            <div className="timeline-layout">
              <div className="timeline-layout-inset">
                <div className="timeline-right-list">
                  <div className="timeline-right-header">
                    <div className="timeline-indicator">
                      <img src={path_image + "informed-circle-icon.svg"} alt="" />
                    </div>
                    <div className="timeline-date">
                      <h3>Trial</h3>
                      <p>July. 29. 2024 <span>|</span> 3:00 PM  <sub>last update</sub></p>
                    </div>
                  </div>
                  <div className="timeline-right-body">
                    <TrialCompletionTable createdBy={createdBy} pathImage={path_image} />
                  </div>                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default SetLayoutNew
