import React, { useEffect, useState } from "react";
import { getData } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import { Accordion, Col, Row } from "react-bootstrap";
import { useSidebar } from "../CommonComponent/LoginLayout";
import { loader } from "../../loader";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const SurveyQuestionFormData = () => {
  const { eventIdContext, handleEventId } = useSidebar();

  const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"));

  const [eventData, setEventData] = useState(
    eventIdContext ? eventIdContext : localStorageEvent
  );

  const [data, setData] = useState([]);
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
  useEffect(() => {
    getSurveyData();
  }, []);

  const getSurveyData = async () => {
    try {
      loader("show")
      const response = await getData(ENDPOINT.GET_SURVEY_DATA + "?type=2");
      let data = [];
      response?.data?.data?.map((item, index) => {
        item.survey_data = JSON.parse(item?.survey_data);
        data?.push(item);
      });
      // console.log("response-->", data)
      // setData(data);
    } catch (err) {
      console.log("--err", err);
    }finally{
      loader("hide")
    }
  };

  const handleAccordionOpen = (index) => {
    setOpenAccordionIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const downloadSurveyUsers = (data) => {
    try {
      if (data?.length == 0) {
        toast.warning("No data found");
        return;
      }
      data = data?.map((item, index) => {
        let finalData = {};
        finalData.Name = item?.name ? item?.name.trim() : "N/A";
        finalData.Country = item?.country ? item?.country.trim() : "N/A";
        finalData.Email = item?.email ? item?.email.trim() : "N/A";
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
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });
      saveAs(blob, `Survey_Users_Data.xlsx`);
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
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <div className="custom-container">
        <Row>
          <Col>
            <div className="survey_data">
              <div className="survey_data_heading d-flex align-items-center justify-content-between">
                <h4>Survey Data</h4>
                {/* {data?.length > 0 ? ( */}
                  <div className="clear-search d-flex align-items-center">
                    <a
                      className={`copy_link btn-voilet`}
                      href={`${window.location.protocol}//${window.location.host}/survey/survey-question-form?evnt=${eventData?.eventCode}`}
                      onClick={(e) => {
                        e.preventDefault();
                        // if (!isDataSaved) {
                        //   return;
                        // }
                        console.dir();
                        let newLink = `${e.currentTarget.getAttribute("href")}`;
                        copyToClipboard(newLink);
                      }}
                    >
                      Copy Survey Link
                    </a>
                    {data?.length > 0 ? (
                    <button
                      className="btn print"
                      title="Download stats"
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
                          <Accordion.Item eventKey="0">
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
    </Col>
  );
};

export default SurveyQuestionFormData;
