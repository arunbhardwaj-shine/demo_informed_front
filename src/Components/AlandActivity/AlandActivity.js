import React, { useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import { loader } from "../../loader";
import * as XLSX from "xlsx";
import { surveyAxiosInstance } from "../surveybuilder/CommonFunctions/CommonFunction";
import { surveyEndpoints } from "../surveybuilder/SurveyEndpoints/SurveyEndpoints";

const AlandActivity = () => {
  const { ALAND_ACTIVITY } = surveyEndpoints;
  let createdBy = localStorage.getItem("user_id");
  const [sortBy, setSortBy] = useState("site_number"); // Initial sort key
  const [sortOrder, setSortOrder] = useState("desc");
  const [individualCompletionShow, setIndividualCompletionShow] = useState();
  const [AllUserData, setAlluserData] = useState([]);
  const site_Engagement = useRef(null);

  const videoRegex = /\.(mp4|mov|avi|mkv|wmv|flv|webm|m4v|3gp|ogg|ts)$/i; // Case-insensitive
 
  const tableHeaders = {
    name: "Name",
    email: "Email",
    country: "Country",
    last_activity: "Last Activity",
  };

 

  // const downloadExcelForAllUsers = (data) => {
  //   const workbook = XLSX.utils.book_new();
  //   const worksheet = XLSX.utils.aoa_to_sheet([]); // Start with an empty sheet

  //   let rowOffset = 0; // Track the current row to place data in the sheet

  //   data.forEach((user) => {
  //     const { name, email, country, last_activity, activities } = user;

  //     // Define the main details header for the first row only
  //     const mainDetailsHeader = [
  //       "Name",
  //       "Email",
  //       "Country",
  //       "Last Activity",
  //       "Recent Activity",
  //       "Recent Activity",
  //       "Recent Activity",
  //       "Recent Activity",
  //       "Recent Activity",
  //       "Recent Activity",
  //       "Recent Activity",
  //       "Recent Activity",
  //       "Recent Activity",
  //       "Recent Activity",
  //     ];
  //     const mainDetails = [name, email, country, last_activity]; // User details without activities

  //     // Add main header to the worksheet if it's the first user
  //     if (rowOffset === 0) {
  //       XLSX.utils.sheet_add_aoa(worksheet, [mainDetailsHeader], {
  //         origin: `A${rowOffset + 1}`,
  //       });
  //       rowOffset += 1;
  //     }

  //     // Add main user details horizontally in the first few cells of the row
  //     XLSX.utils.sheet_add_aoa(worksheet, [mainDetails], {
  //       origin: `A${rowOffset + 1}`,
  //     });

  //     const activityDescriptions = activities.map((activity) => {
  //       return `${
  //         activity?.action === "Downloaded All Clicked"
  //           ? "Download All Clicked for"
  //           : activity?.action
  //       } ${
  //         activity?.action === "Clicked"
  //           ? `on the ${activity?.tab} tab`
  //           : `the ${activity?.tab},`
  //       } ${
  //         activity?.filename ? (videoRegex.test(activity?.filename)) 
  //           ? activity?.filename.split('/').pop()
  //           : activity?.filename :""
  //       } ${activity?.date ? `(${activity?.date})` : ""} `;
  //     });
 
  //     XLSX.utils.sheet_add_aoa(worksheet, [activityDescriptions], {
  //       origin: `E${rowOffset + 1}`,
  //     });

  //     // Move to the next row for the next user
  //     rowOffset += 1;
  //   });

  //   // Auto-fit column widths
  //   const maxColWidths = [];
  //   const range = XLSX.utils.decode_range(worksheet["!ref"]);

  //   for (let col = range.s.c; col <= range.e.c; col++) {
  //     let maxWidth = 10;
  //     for (let row = range.s.r; row <= range.e.r; row++) {
  //       const cell = worksheet[XLSX.utils.encode_cell({ r: row, c: col })];
  //       if (cell && cell.v) {
  //         maxWidth = Math.max(maxWidth, cell.v.toString().length);
  //       }
  //     }
  //     maxColWidths.push({ wch: maxWidth + 2 }); // Add padding for readability
  //   }
  //   worksheet["!cols"] = maxColWidths;

  //   // Append the worksheet to the workbook and download as an Excel file
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "User Details");
  //   XLSX.writeFile(workbook, "All_User_Activities.xlsx");
  // };

  const downloadExcelForAllUsers = (data) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([]); // Start with an empty sheet
     
  
    let rowOffset = 0; // Track the current row in the sheet
  
    const mainDetailsHeader = [
      "Name",
      "Email",
      "Country",
      "Last Activity",
      ...Array(10).fill("Recent Activity"), // Generate 10 'Recent Activity' headers
    ];
  
    // Add the main header row to the sheet
    XLSX.utils.sheet_add_aoa(worksheet, [mainDetailsHeader], { origin: "A1" });
    rowOffset++;
  
    data.forEach((user) => {
      const { name, email, country, last_activity, activities } = user;
  
      // Add user details horizontally
      const mainDetails = [name, email, country, last_activity];
      XLSX.utils.sheet_add_aoa(worksheet, [mainDetails], { origin: `A${rowOffset + 1}` });
  
      // Format activity descriptions
      const activityDescriptions = activities.map((activity) => {
        const actionText =
          activity?.action === "Downloaded All Clicked"
            ? "Download All Clicked for"
            : activity?.action;
  
        const tabText =
          activity?.action === "Clicked" ? `on the ${activity?.tab} tab` : `the ${activity?.tab}`;
  
        const filenameText = activity?.filename
          ? videoRegex.test(activity?.filename)
            ? activity.filename.split("/").pop()
            : activity.filename
          : "";
  
        const dateText = activity?.date ? `(${activity.date})` : "";
  
        return `${actionText} ${tabText}, ${filenameText} ${dateText}`.trim();
      });
  
      // Add activity descriptions horizontally starting from column E
      XLSX.utils.sheet_add_aoa(worksheet, [activityDescriptions], { origin: `E${rowOffset + 1}` });
  
      rowOffset++; // Move to the next row
    });
  
    // Auto-fit column widths
    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    worksheet["!cols"] = Array.from({ length: range.e.c - range.s.c + 1 }, (_, col) => {
      let maxWidth = 10;
      for (let row = range.s.r; row <= range.e.r; row++) {
        const cell = worksheet[XLSX.utils.encode_cell({ r: row, c: col })];
        if (cell && cell.v) {
          maxWidth = Math.max(maxWidth, cell.v.toString().length);
        }
      }
      return { wch: maxWidth + 2 }; // Add padding
    });
  
    // Append the worksheet to the workbook and download as an Excel file
    XLSX.utils.book_append_sheet(workbook, worksheet, "User Details");
    XLSX.writeFile(workbook, "All_User_Activities.xlsx");
  };
  





  const fetchData = async () => {
    try {
      loader("show");
      const response = await surveyAxiosInstance.post(ALAND_ACTIVITY);

      if (response.status === 200) {
        console.log(response.data.data);
        setAlluserData(response.data.data);
      }
      loader("hide");
    } catch (error) {
      loader("hide");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const individualCompletionShowData = async (e, index) => {
    e.preventDefault();
    if (individualCompletionShow == index) {
      setIndividualCompletionShow();
    } else {
      setIndividualCompletionShow(index);
    }
  };

  const handleSort = (key) => {
    setSortBy(key);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortData = (data, key, order) => {
    return data.sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];

      // Check if the values are datetime strings in the format "YYYY-MM-DD HH:MM:SS"
      const isDateTimeString = (val) =>
        typeof val === "string" &&
        /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(val);

      // Convert datetime strings to Date objects for comparison
      const convertToDate = (val) => new Date(val);

      if (isDateTimeString(valueA) && isDateTimeString(valueB)) {
        const dateA = convertToDate(valueA);
        const dateB = convertToDate(valueB);
        return order === "asc" ? dateA - dateB : dateB - dateA;
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
      <div className="rd-full-explain">
        <div className="rd-section-title">
          <h4>Non-mandatory Content</h4>
        </div>
        <div className="rd-training-block" ref={site_Engagement} tabIndex={-1}>
          <div className="d-flex align-items-center justify-content-between">
            <div className="rd-training-block-left">
              <h4>
                Aland Island | <span>{AllUserData?.length}</span>
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
                onClick={() => downloadExcelForAllUsers(AllUserData)}
              />
            </div>
          </div>

          <Table className="fold-table" id="individual_completion">
            <thead>
              <tr>
                {Object.keys(tableHeaders).map((key, index) => {
                  return (
                    <th scope="col" className="sort_option" key={index}>
                      <span onClick={() => handleSort(key)}>
                        {tableHeaders[key]}
                        <button
                          className={`event_sort_btn ${
                            sortBy == key
                              ? sortOrder == "asc"
                                ? "svg_asc"
                                : "svg_active"
                              : ""
                          }`}
                          onClick={() => handleSort(key)}
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
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {typeof AllUserData !== "undefined" && AllUserData?.length > 0 ? (
                <>
                  {" "}
                  {sortData(AllUserData, sortBy, sortOrder)?.map(
                    (item, index) => {
                      return (
                        <>
                          <tr
                            key={index}
                            className={`view ${
                              individualCompletionShow == index ? "show" : ""
                            }`}
                            onClick={(e) =>
                              individualCompletionShowData(
                                e,
                                index,
                                item?.user_id
                              )
                            }
                          >
                            <td>{item?.name ? item?.name : "NA"}</td>
                            <td>{item?.email ? item?.email : "NA"}</td>
                            <td>{item?.country ? item?.country : "NA"}</td>
                            <td>
                              {item?.last_activity ? item?.last_activity : "NA"}
                            </td>
                          </tr>
                          {individualCompletionShow === index ? (
                            <tr className="fold show">
                              <td colspan="5" className="site_complete">
                                {item?.activities?.length > 0 ? (
                                  <Table>
                                    <thead>
                                      <tr>
                                        <th>Active tab</th>
                                        <th>Action</th>
                                        <th>Date</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {item?.activities.map((data, i) => (
                                        <tr key={i}>
                                          <td>
                                            {data?.tab ? data?.tab : "NA"}
                                          </td>
                                          <td>
                                            {`${
                                              data?.action ===
                                              "Downloaded All Clicked"
                                                ? "Download All Clicked for"
                                                : data?.action
                                            } ${
                                              data?.action === "Clicked"
                                                ? `on the ${data?.tab} tab`
                                                : `the ${data?.tab}`
                                            } 

                                             ${
                                              data?.filename ? (videoRegex.test(data?.filename)) 
                                                ? data?.filename.split('/').pop()
                                                : data?.filename :""
                                            }`}




                                            {/* ${
                                              data?.filename
                                                ? data?.filename
                                                : ""
                                            }`} */}
                                          </td>

                                          <td>
                                            {data?.date ? data?.date : "NA"}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </Table>
                                ) : (
                                  <div className="no_data">No Data Found</div>
                                )}
                              </td>
                            </tr>
                          ) : null}
                          <tr className="blank">
                            <td colspan="8" style={{ height: "10px;" }}>
                              &nbsp;
                            </td>
                          </tr>
                        </>
                      );
                    }
                  )}
                </>
              ) : (
                <>
                  <tr>
                    <td colspan="9">
                      <div className="no_found" style={{ textAlign: "center" }}>
                        <p>No Data Found</p>
                      </div>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default AlandActivity;
