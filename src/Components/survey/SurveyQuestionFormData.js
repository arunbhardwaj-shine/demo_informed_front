import React, { useEffect, useState, useRef } from "react";
import { getData } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import { Accordion, Col, Modal, ProgressBar, Row } from "react-bootstrap";
import { useSidebar } from "../CommonComponent/LoginLayout";
import { loader } from "../../loader";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const SurveyQuestionFormData = () => {
  const { eventIdContext, handleEventId } = useSidebar();
  const firstAccordionRef = useRef([]);
  const accordionRefs = useRef([]);
  const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"));
  const [eventData, setEventData] = useState(
    eventIdContext ? eventIdContext : localStorageEvent
  );
 
 const [modalOpen,setModalOpen] = useState(false)

  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [progressBarData, setProgressBarData] = useState({
    patient_case_rating: {
      rating: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      percentage: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      questionName:
        "How relevant was this patient case to your clinical practice?",
      overall_rating: 0,
      total_users_answered: 0,
      type: "rating",
      color: [  '#39CABC','#FAC755','#F58289','#8A4E9C','#0066BE',  ]
    },
    future_clinical: {
      rating: { Yes: 0, No: 0 },
      percentage: { yes: 0, No: 0 },
      overall_rating: 0,
      total_users_answered: 0,
      questionName: "I plan to attend future Clinical Practice patient cases:",
      type: "choice",
      color : [ '#39CABC','#FAC755']
    },

    recommend_clinical: {
      rating: { Yes: 0, No: 0 },
      percentage: { Yes: 0, No: 0 },
      overall_rating: 0,
      questionName: "Would you recommend Clinical Practice to a colleague?",
      total_users_answered: 0,
      type: "choice",
      color : [ '#39CABC','#FAC755']
    },
    suggestion: {
      rating: { Suggestion: 0 },
      percentage: { Suggestion: 0 },
      overall_rating: 0,
      questionName:
        "Please suggest a topic for a future Clinical Practice patient case:",
        type: "suggestion",

      total_users_answered: 0,
      color : ['#39CABC']
    },
  });
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
     let usersData={ patient_case_rating:{1: [], 2: [], 3: [], 4: [], 5: []},  future_clinical: { yes: [], no: [] },
     recommend_clinical: { yes: [], no: [] },
     suggestion: { suggestion: [] } };


      // Count occurrences of ratings and answers
      data.forEach((item) => {
        const { survey_data ,...rest} = item;
        Object.keys(survey_data).forEach((key) => {
          if (survey_data[key]) {
            if (isObject(survey_data[key])) {
              const subKey = Object.keys(survey_data[key])[0];
              if (subKey === "patient_case_rating") {
                const rating = survey_data[key][subKey];
                if (rating >= 1 && rating <= 5) {
                  countObjects[subKey][rating.toString()]++;
                  usersData[subKey][rating.toString()].push(rest);
                }
              } else if (
                subKey === "future_clinical" ||
                subKey === "recommend_clinical"
              ) {
                const answer = survey_data[key][subKey];
                if (answer === "yes" || answer === "no") {
                  countObjects[subKey][answer]++;
                  usersData[subKey][answer].push(rest);

                }
              }
            } else if (survey_data[key].trim() !== "") {
              countObjects[key]["suggestion"]++;
              usersData[key]["suggestion"].push(rest);

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
         const totalCount=data?.length
        const percentageObj = {};
        let sum = 0;
        let weightedSum = 0;
        Object.keys(countObjects[key]).forEach((subKey) => {
          // if (subKey !== "suggestion") {
            const suggestion = countObjects[key][subKey];
            let rating = parseInt(subKey);
            if(isNaN(rating)){
              rating=0
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
      // console.log(usersData);
      // console.log(updatedProgressBarData)
      setProgressBarData(updatedProgressBarData);
    } catch (error) {
      console.error("An error occurred while processing the data:", error);
    }
  }, [data]);

  const handleModal = (key ,userValue) => {
    // console.log(  key ,userValue,'rytryh',usersData[userValue][key])
    setModalOpen(true)
    // setUserData(usersData[userValue][key])
    if (usersData != null) {
      setUserData(usersData[userValue][key]);
    } 
  };
  
  const handleModalClose = () => {
    setModalOpen(false)
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
    try {
      if (data?.length == 0) {
        toast.warning("No data found");
        return;
      }
      data = data?.map((item, index) => {
        let finalData = {};
        finalData.Name = item?.name ? item?.name.trim() : "N/A";
        finalData.Email = item?.email ? item?.email.trim() : "N/A";
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
        { wch: 15 }, // Width of column C (Country)
        { wch: 15 }, // Width of column D (SurveyDate)
        { wch: 45 }, // Width of column E (How relevant)
        { wch: 45 }, // Width of column F (Plan to attend)
        { wch: 45 }, // Width of column G (Recommend)
        { wch: 55 }, // Width of column H (Suggestion)
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

  const copyToClipboard = (content) => {
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(content);
      toast.success("content copied to the clipboard!");
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
      toast.success("content copied to the clipboard!");
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <Col className="right-sidebar custom-change">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <div className="custom-container">
      <Row>
    <Col>
  
  </Col>
</Row>

        <Row>
          <Col>
            <div className="survey_data">
              <div className="survey_data_heading d-flex align-items-center justify-content-between">
                <h4>Survey Data</h4>
                {/* {data?.length > 0 ? ( */}
                <div className="clear-search d-flex align-items-center">
                  <a
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
                  </a>
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
                {/* ) : (
                 ""
                 )} */}
              </div>

              <div className="survey-rating" style={{ display: "flex"}}>
              {Object.entries(progressBarData).map(([userValue, item], index) => (
        <div key={index} className="question-rating col">
          <div className="question">
            <div className="question-list"><span>Q{index + 1}:</span> <p>{item?.questionName}</p></div>
          </div>
          <div className="rating">
          <h2 dangerouslySetInnerHTML={{
          __html: item?.type === "rating" 
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
              :  item.type === "suggestion" 
              ? ` ${item?.rating?.suggestion   || 0 } <span> ${data?.length} <small>answered</small></span>`
                :`${item?.total_users_answered} <span> ${data?.length} <small>answered</small></span>`
        }}>
        </h2>

          </div>
          <div className="post-survey-rating">
            {Object.entries(item.rating).sort((a, b) => parseInt(b) - parseInt(a)).map(([key, value],colorIndex) => (
              <div key={key} className="survey-rating-detail">
           <h5 >{key} {item.type === "rating"  && <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_5227_4752)">
            <path d="M7.4636 0.873843C7.6629 0.375386 8.3371 0.375386 8.5364 0.873843L10.3356 5.37373C10.4195 5.58343 10.6078 5.72677 10.8241 5.7455L15.4656 6.14744C15.9797 6.19196 16.188 6.86363 15.7971 7.21621L12.2676 10.3992C12.1031 10.5476 12.0312 10.7795 12.081 11.0008L13.1504 15.7491C13.2688 16.275 12.7234 16.6902 12.2825 16.4096L8.3019 13.8769C8.1164 13.7589 7.8836 13.7589 7.6981 13.8769L3.71755 16.4096C3.27661 16.6902 2.73118 16.275 2.84964 15.7491L3.91901 11.0008C3.96884 10.7795 3.8969 10.5476 3.73243 10.3992L0.202937 7.21621C-0.188028 6.86363 0.0203079 6.19196 0.534448 6.14744L5.17591 5.7455C5.39221 5.72677 5.58055 5.58343 5.66439 5.37373L7.4636 0.873843Z" fill="#97B6CF"/>
            </g>
            <defs>
            <clipPath id="clip0_5227_4752">
            <rect width="16" height="16" fill="white" transform="translate(0 0.5)"/>
            </clipPath>
            </defs>
            </svg>
            }</h5>
           <ProgressBar style={{ flex: 1, margin: "0 10px" }}>
             <ProgressBar now={item.percentage[key]} 
            style={{ backgroundColor: item.color[colorIndex] }}
             />
           </ProgressBar>
                <h5 className="survey-rating-number">{item.rating[key]}</h5>
                <div onClick={()=>handleModal(key,userValue)}>
                <img
                src={path_image + "eye-watch.svg"}
                alt=""
                />
                </div>
         </div>
         
            ))}
          </div>
        </div>
      ))}
    </div>

              {data?.length > 0 ? (
                <div className="survey_data_details">
                  <div className="survey_data_accordion_heading">
                    <ul>
                      <li>Name</li>
                      <li>Email</li>
                      <li>Country</li>
                      <li>Survey Date</li>
                    </ul>
                  </div>

                  {data?.map((item, index) => {
                    return (
                      <>
                        <Accordion
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
                              </ul>
                            </Accordion.Header>
                            <Accordion.Body>
                              {openAccordionIndex === index && (
                                <>
                                  {Object.keys(item?.survey_data)?.length ? (
                                    <div className="main">
                                      <div className="survey-data">
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
                                      </div>

                                      <div className="survey-data">
                                        <h6>
                                          {" "}
                                          4. Please suggest a topic for a future
                                          Clinical Practice patient case:
                                        </h6>
                                        <p>{item?.survey_data?.suggestion}</p>
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
                        </Accordion>
                      </>
                    );
                  })}
                </div>
              ) : (
                <div className="no_found">
                  <p align="center">No Data Found</p>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
      {modalOpen && (
        <Modal
          show={modalOpen}
          onHide={handleModalClose}
          id="preview-poll"
          className="event_edit"
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop="static"
        >
          <Modal.Header>
            <div className="modal-header">
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
            </div>
          </Modal.Header>
          <Modal.Body>
            <>
              <div className="webinar-popup polls-preview">
                {userData?.length > 0 ? (
                <div className="survey_data_details">
                  <div className="survey_data_accordion_heading">
                  <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Country</th>
                          <th>Survey Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                         userData?.map((item, index) => {
                            return (
                              <tr>
                                <td>{item?.name ? item?.name : "N/A"}</td>
                                <td>{item?.email ? item?.email : "N/A"}</td>
                                <td>{item?.country ? item?.country : "N/A"}</td>
                                <td> {item?.created_at ? item?.created_at : "N/A"}</td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
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
