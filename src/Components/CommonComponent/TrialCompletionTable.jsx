import React, { useState, useRef, useEffect, useCallback } from "react";
import { Accordion, Button, Table } from "react-bootstrap";
import { postData } from "../../axios/apiInstanceHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import { loader } from "../../loader";

const defaultPdfRole = {
  3968: "Site User-Blinded",
  3970: "Site unblinded pharmacist",
  4521: "Investigator-Blinded",
};

const TrialCompletionTable = ({ createdBy, pathImage }) => {
  const [indidualCompletionTableData, setIndividualCompletionTableData] = useState();
  const [indidualCompletionTableDataBackup, setIndividualCompletionTableDataBackup] = useState();
  const [individualCompletionShow, setIndividualCompletionShow] = useState();
  const [trainingDropdownData, setTrainingCompletionDropdownData] = useState();
  const [trainingAccordianShow, setTrainingAccordianShow] = useState();
  const [traingAccordianData, setTrainingAccordianData] = useState();
  const [trainingCertificate, setTrainingCertificate] = useState();
  const [isApiStatus, setIsApiStatus] = useState(false);
  const [sortBy, setSortBy] = useState("site_number");
  const [sortOrder, setSortOrder] = useState("desc");

  const individual_Completion = useRef(null);

  // Data fetching function wrapped with useCallback
  const individualCompletion = useCallback(async () => {
    try {
      // Validate createdBy is not empty
      if (!createdBy) {
        console.log("-err", "createdBy is null or empty");
        loader("hide");
        return;
      }

      loader("show");
      setIndividualCompletionShow();
      setSortBy("site_number");
      setSortOrder("desc");

      if (!indidualCompletionTableData) {
        const result = await postData("https://onesource.informed.pro/api/demo/v2/training-completion", {
          created_by: createdBy,
        });
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
  }, [createdBy, indidualCompletionTableData]);

  // Auto-fetch training data on component mount
  useEffect(() => {
    if (createdBy) {
      const fetchData = async () => {
        await individualCompletion();
      };
      fetchData();
    }
  }, [createdBy]);

  const individualCompletionShowData = async (e, index, id, statusCode) => {
    if (individualCompletionShow == index) {
      setIndividualCompletionShow();
    } else {
      try {
        loader("show");
        let body = {
          user_id: id,
          training_status_code: statusCode,
          created_by: createdBy,
        };
        const result = await postData(ENDPOINT.TRAINING_COMPLETION_DROPDOWN, body);

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
            created_by: createdBy,
          };
          const result = await postData(ENDPOINT.TRAINING_COMPLETION_PAGE_CLICK, body);

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

  // Helper functions
  const handleSort = (key) => {
    setSortBy(key);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortData = (data, key, order) => {
    if (!data) return [];
    return data.sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];

      const isDateTimeString = (val) =>
        typeof val === "string" && /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(val);

      const convertToDate = (val) => new Date(val);

      if (isDateTimeString(valueA) && isDateTimeString(valueB)) {
        const dateA = convertToDate(valueA);
        const dateB = convertToDate(valueB);
        return order === "asc" ? dateA - dateB : dateB - dateA;
      }

      if (typeof valueA === "number" && typeof valueB === "number") {
        return order === "asc" ? valueA - valueB : valueB - valueA;
      } else {
        return order === "asc"
          ? valueA?.localeCompare(valueB)
          : valueB?.localeCompare(valueA);
      }
    });
  };

  const getStatusColor = (code) => {
    switch (code) {
      case 1:
        return "#8A4E9C";
      case 2:
        return "#39CABC";
      case 3:
        return "#0066BE";
      case 4:
        return "#f58289";
      case 5:
        return "#FAC755";
      case 6:
        return "#FF9534";
      case 7:
        return "#97B6CF";
      default:
        return "#f58289";
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

  return (
    <>
      <Table className="fold-table" id="individual_completion">
        <thead>
          <tr>
            <th scope="col" className="sort_option">
              <span onClick={() => handleSort("site_number")}>
                Site
                <button
                  className={`event_sort_btn ${
                    sortBy == "site_number"
                      ? sortOrder == "asc"
                        ? "svg_asc"
                        : "svg_active"
                      : ""
                  }`}
                  onClick={() => handleSort("site_number")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <g clipPath="url(#clip0_3722_6611)">
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <g clipPath="url(#clip0_3722_6611)">
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
              <span onClick={() => handleSort("username")}>
                Name
                <button
                  className={`event_sort_btn ${
                    sortBy == "username"
                      ? sortOrder == "asc"
                        ? "svg_asc"
                        : "svg_active"
                      : ""
                  }`}
                  onClick={() => handleSort("username")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <g clipPath="url(#clip0_3722_6611)">
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
              <span onClick={() => handleSort("user_country")}>
                Country
                <button
                  className={`event_sort_btn ${
                    sortBy == "user_country"
                      ? sortOrder == "asc"
                        ? "svg_asc"
                        : "svg_active"
                      : ""
                  }`}
                  onClick={() => handleSort("user_country")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <g clipPath="url(#clip0_3722_6611)">
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
              <span onClick={() => handleSort("user_type")}>
                Role
                <button
                  className={`event_sort_btn ${
                    sortBy == "user_type"
                      ? sortOrder == "asc"
                        ? "svg_asc"
                        : "svg_active"
                      : ""
                  }`}
                  onClick={() => handleSort("user_type")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <g clipPath="url(#clip0_3722_6611)">
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
              <span onClick={() => handleSort("training_status")}>
                Status
                <button
                  className={`event_sort_btn ${
                    sortBy == "training_status"
                      ? sortOrder == "asc"
                        ? "svg_asc"
                        : "svg_active"
                      : ""
                  }`}
                  onClick={() => handleSort("training_status")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <g clipPath="url(#clip0_3722_6611)">
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
              <span onClick={() => handleSort("originalDate")}>
                Last activity
                <button
                  className={`event_sort_btn ${
                    sortBy == "originalDate"
                      ? sortOrder == "asc"
                        ? "svg_asc"
                        : "svg_active"
                      : ""
                  }`}
                  onClick={() => handleSort("originalDate")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <g clipPath="url(#clip0_3722_6611)">
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
          {typeof indidualCompletionTableData !== "undefined" &&
          indidualCompletionTableData?.length > 0 ? (
            <>
              {sortData(indidualCompletionTableData, sortBy, sortOrder)?.map((item, index) => {
                return (
                  <>
                    <tr
                      className={`view ${
                        individualCompletionShow == index ? "show" : ""
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
                      <td>{item?.site_number ? item?.site_number : "NA"}</td>
                      <td>{item?.email ? item?.email : "NA"}</td>
                      <td>
                        {item?.username
                          ? item?.username?.charAt(0).toUpperCase() +
                            item?.username.slice(1)
                          : "NA"}
                      </td>
                      <td>{item?.user_country ? item?.user_country : "NA"}</td>
                      <td>{item?.user_type ? item?.user_type : "NA"}</td>

                      <td
                        style={{
                          color: getStatusColor(item?.training_status_code),
                        }}
                      >
                        {getStatusText(item?.training_status_code)}
                      </td>

                      <td>
                        {item?.last_activity ? item.last_activity : "NA"}
                      </td>

                      <td className="infocol">
                        <img
                          className="info_img"
                          src="componentAssets/images/user_info.svg"
                          alt=""
                        />
                        <div className="extra_info">
                          <p>
                            <span>First email sent:</span>
                            {item?.date_first_email_sent
                              ? item.date_first_email_sent
                              : "NA"}
                          </p>

                          <p>
                            <span>Last email sent:</span>
                            {item?.date_last_email_sent
                              ? item.date_last_email_sent
                              : "NA"}
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
                        {item?.reminders_sent ? item.reminders_sent : 0}
                      </td>

                      <td className="non_display">
                        {item?.bounced ? item.bounced : "NA"}
                      </td>

                      <td className="pics">
                        {item?.training_status_code === 2 ? (
                          <div>
                            <img
                              src={pathImage + "certificate.png"}
                              alt="Certificate"
                              style={{ cursor: "pointer" }}
                              onClick={(event) => {
                                downloadCertificate(
                                  item?.certificate_link,
                                  event
                                );
                              }}
                            />
                          </div>
                        ) : null}
                      </td>
                    </tr>
                    {individualCompletionShow == index ? (
                      <tr className={"fold show"}>
                        <td colSpan="9">
                          <div className="fold-content">
                            {trainingDropdownData?.length == 0 ? (
                              <p className="not_found">No Data Found</p>
                            ) : (
                              <p>
                                Completed Contents |{" "}
                                <span>{trainingDropdownData?.length}</span>
                              </p>
                            )}

                            <Accordion>
                              {trainingDropdownData?.map((data, i) => {
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
                                              src={data?.article_image}
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
                                                      {data?.total_pages}
                                                    </span>
                                                  </>
                                                ) : data?.file_type ==
                                                  "video" ? (
                                                  <>
                                                    Time
                                                    <span>
                                                      {data?.max_time}
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
                                                          pathImage +
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
                                      {trainingAccordianShow == i ? (
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
                                                              pathImage +
                                                              "article-content-cover.png"
                                                            }
                                                            alt=""
                                                          />
                                                        </div>
                                                        <div className="article-detail-view">
                                                          <div className="article-page-number">
                                                            Page{" "}
                                                            {pageData?.page}
                                                          </div>
                                                          <div className="article-spanrd-time">
                                                            Time spent |{" "}
                                                            <span>
                                                              {pageData?.time}
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
                                                  <p>No Data Found</p>
                                                </div>
                                              </>
                                            ) : null}
                                          </div>
                                        </Accordion.Body>
                                      ) : null}
                                    </Accordion.Item>
                                  </>
                                );
                              })}
                            </Accordion>

                            {trainingCertificate?.length ? (
                              <Accordion>
                                {trainingCertificate?.map((certItem, certIndex) => {
                                  return (
                                    <>
                                      <Accordion.Item eventKey={certIndex}>
                                        <Accordion.Header>
                                          <div className="d-flex align-items-start">
                                            <div className="content-image">
                                              <img
                                                src={
                                                  pathImage +
                                                  "Trial_certificate_cover.png"
                                                }
                                                alt=""
                                              />
                                            </div>
                                            <div className="content-detail">
                                              <h6>{certItem?.type}</h6>
                                              <p>
                                                {defaultPdfRole[
                                                  certItem?.pdfId
                                                ] || certItem?.training_type}
                                              </p>

                                              <div className="page-count">
                                                <div className="time">
                                                  {" "}
                                                  <span></span>
                                                </div>

                                                <div className="completed-date certificate-download">
                                                  <Button
                                                    title="Download stats"
                                                    onClick={(event) => {
                                                      downloadCertificate(
                                                        certItem?.pdf_link,
                                                        event
                                                      );
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
                                                      {certItem?.date}
                                                      <img
                                                        src={
                                                          pathImage +
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
                                      </Accordion.Item>
                                    </>
                                  );
                                })}
                              </Accordion>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    ) : null}
                    <tr className="blank">
                      <td colSpan="8" style={{ height: "10px;" }}>
                        &nbsp;
                      </td>
                    </tr>
                  </>
                );
              })}
            </>
          ) : (
            <>
              <tr>
                <td colSpan="9">
                  <div className="no_found" style={{ textAlign: "center" }}>
                    <p>No Data Found</p>
                  </div>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </Table>

      {/* Return state setters and functions for parent components */}
      {/* These are exposed through a ref or context if needed */}
    </>
  );
};

// Export helper hook to get component methods
export const useTrialCompletionTable = () => {
  return {
    individualCompletion: null,
  };
};

export default TrialCompletionTable;
