import React, { useEffect, useState } from "react";
import { Button, Col, Row, Tab, Tabs } from "react-bootstrap";
import { loader } from "../../../../../loader";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
import { postData } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";

const AnalyticsQuestions = () => {
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const { eventIdContext, handleEventId } = useSidebar();
  const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"));
  const [eventId, setEventId] = useState(eventIdContext || localStorageEvent);
  const [questions, setQuestions] = useState(
  {}
  );
  const [flag, setFlag] = useState(1);

  useEffect(() => {
    getQuestions();
  }, [flag]);

  const getQuestions = async () => {
    loader("show");

    try {
      let body = {
        eventId: eventId?.eventId,
      };
      const response = await postData(
        ENDPOINT.WEBINAR_EVENT_QUESTION_ANSWER,
        body
      );
      setQuestions(response?.data?.data);
    } catch (err) {
      console.log(err);
    } finally {
      loader("hide");
    }
  };

  const getSpeakerQuestion = async() =>{
    try{
       loader("show")
      const result = await postData(ENDPOINT.QUESTION_ANSWER,{
            "companyId":eventId?.companyId,
            "eventId":eventId?.eventId
         })
         setQuestions(result?.data?.data)
    }catch(err){
        console.log("-er",err)
    }
    finally{
                loader("hide")

    }
}

  const handleTabClick = async (key) => {
    setQuestions({})
if(key=="questions"){
   await  getQuestions()
}else{
    await getSpeakerQuestion()
}
};

const downloadExcel = (data) => {
    try {
      if (!data) {
        toast.warning("No data found");
        return;
      }

      const sheets = ["new","question", "sent", "ignore"];
      const workbook = XLSX.utils.book_new();
if(!workbook) return null
      sheets.forEach((sheetName) => {
        let sheetData = data[sheetName];

        if (sheetData?.length) {
          sheetData = sheetData.map((item) => {
            let finalData = {};
            finalData.Name = item?.name ? item?.name.trim() : "Anonymous";
            finalData.Email = item?.email ? item?.email.trim() : "N/A";
            finalData.Country = item?.country ? item?.country.trim() : "N/A";
            finalData.Message = item?.question ? item?.question.trim() : "N/A";
            finalData.Reply = item?.reply ? item?.reply.trim() : "N/A";
            finalData.Date = item?.question_date ? item?.question_date : "N/A";
            return finalData;
          });

          const worksheet = XLSX.utils.json_to_sheet(sheetData);
          XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        }
      });

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });

      saveAs(
        blob,
        `question_stats_Data.xlsx`
      );

      
    } catch (error) {
      console.error(
        "An error occurred while downloading the Excel file:",
        error
      );
      
    }
};



  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="poll-creation">
              <Tabs defaultActiveKey="questions" fill onSelect={handleTabClick}>
                <Tab
                  eventKey="questions"
                  title="Questions"
                  className="flex-column justify-content-between"
                >
                  <div className="question-download">
                    <div className="clear-search">
                      <button className="btn print" title="Download stats" onClick={()=>downloadExcel(questions)}>
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
                    </div>
                  </div>
                  <div className="question-listing-analytics speaker_zone">
                    <div className="question-listing-analytics-left">
                      <div className="webinar-top-sec d-flex justify-content-between align-center">
                        <div className="top-heading">
                          <h4>
                            Questions |{" "}
                            <span>{questions?.new?.length || 0}</span>{" "}
                          </h4>
                        </div>
                      </div>
                      <div className="speaker-zone-listed">
                        {questions?.new?.map((question, index) => (
                          <QuestionItem key={index} question={question} />
                        ))}
                      </div>
                    </div>
                    <div className="question-listing-analytics-right">
                      <div className="answered">
                        <div className="webinar-top-sec d-flex justify-content-between align-center">
                          <div className="top-heading">
                            <h4>
                              Send to Speaker |{" "}
                              <span>{questions?.sent?.length || 0}</span>{" "}
                            </h4>
                          </div>
                        </div>
                        <div className="speaker-zone-listed">
                          {questions?.sent?.map((question, index) => (
                            <QuestionItem key={index} question={question} />
                          ))}
                        </div>
                      </div>
                      <div className="ignored">
                        <div className="webinar-top-sec d-flex justify-content-between align-center">
                          <div className="top-heading">
                            <h4>
                              Ignored |{" "}
                              <span>{questions?.ignore?.length || 0}</span>{" "}
                            </h4>
                          </div>
                        </div>
                        <div className="speaker-zone-listed">
                          {questions?.ignore?.map((question, index) => (
                            <QuestionItem key={index} question={question} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>

                <Tab
                  eventKey="speaker-zone"
                  title="Speaker Zone"
                  className="flex-column justify-content-between"
                >
                  <div className="speaker-download">
                    <div className="clear-search">
                      <button className="btn print" title="Download stats" onClick={()=>downloadExcel(questions)}>
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
                    </div>
                  </div>
                  <div className="question-listing-analytics speaker_zone">
                    <div className="question-listing-analytics-left">
                      <div className="webinar-top-sec d-flex justify-content-between align-center">
                        <div className="top-heading">
                          <h4>
                          Questions | <span>{questions?.question?.length || 0}</span>{" "}
                          </h4>
                        </div>
                      </div>
                      <div className="speaker-zone-listed">
                      {questions?.question?.map((question, index) => (
                          <QuestionItem key={index} question={question} />
                        ))}
                      </div>
                    </div>
                    <div className="question-listing-analytics-right">
                      <div className="answered">
                        <div className="webinar-top-sec d-flex justify-content-between align-center">
                          <div className="top-heading">
                            <h4>
                              Answered |  <span>{questions?.answer?.length || 0}</span>{" "}
                            </h4>
                          </div>
                        </div>
                        <div className="speaker-zone-listed">
                        {questions?.answer?.map((question, index) => (
                          <QuestionItem key={index} question={question} />
                        ))}
                        </div>
                      </div>
                      <div className="ignored">
                        <div className="webinar-top-sec d-flex justify-content-between align-center">
                          <div className="top-heading">
                            <h4>
                              Ignored |  <span>{questions?.ignore?.length || 0}</span>{" "}
                            </h4>
                          </div>
                        </div>
                        <div className="speaker-zone-listed">
                        {questions?.ignore?.map((question, index) => (
                          <QuestionItem key={index} question={question} />
                        ))} 
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </Row>
        </div>
      </Col>
    </>
  );
};

const QuestionItem = ({ question }) => (
  <div className="reader_list">
    <div className="detail-box">
      <div className="d-flex justify-content-between align-items-center">
        <p className="user_name">{question?.username || question?.name ||"Anonymous"}</p>
        <div className="question-post-time">
          <small>{question?.question_date}</small>
        </div>
      </div>
      <div className="user-question">
        <p>{question?.question}</p>
      </div>
    </div>
  </div>
);

export default AnalyticsQuestions;
