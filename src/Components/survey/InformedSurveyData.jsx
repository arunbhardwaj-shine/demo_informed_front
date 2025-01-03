import React, { useEffect, useState ,useRef} from 'react'
import { getData } from '../../axios/apiHelper'
import { ENDPOINT } from '../../axios/apiConfig'
import { Accordion, Col, Row } from 'react-bootstrap'
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify'
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { loader } from '../../loader';
const InformedSurveyData = () => {
  const [data, setData] = useState([])
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
  const [apiCallStatus, setApiCallStatus] = useState(false)
  const accordionRefs = useRef([]);
  useEffect(() => {
    getSurveyData()
  }, [])

  const getSurveyData = async () => {
    try {
      loader("show")

      const response = await getData(ENDPOINT.GET_INFORMED_SURVEY_DATA + "?type=3")
      let data = []
      response?.data?.data?.map((item, index) => {
        item.survey_data = JSON.parse(item?.survey_data)
        data?.push(item)
      })
      setData(data)

    } catch (err) {
      console.log("--err", err)
    } finally {
      loader("hide")
      setApiCallStatus(true)
    }
  }

  const handleAccordionOpen=(index)=>{
    setOpenAccordionIndex((prevIndex) => (prevIndex === index ? null : index));
  }
  useEffect(() => {
    if (accordionRefs.current[openAccordionIndex]) {
        accordionRefs.current[openAccordionIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }
}, [openAccordionIndex]);

  const downloadExcelSurveyData = () => {
    try {
      if (data?.length == 0) {
        toast.warning("No data found");
        return;
      }
      let downloadData = data?.map((item, index) => {
        const userAgent = item?.survey_data?.user_agent ? item?.survey_data?.user_agent.trim() : "N/A";
        const platform = item?.survey_data?.platform ? item?.survey_data?.platform.trim() : "N/A";
  
        return {
          "Ip Address": item?.survey_data?.ip_address ? item?.survey_data?.ip_address.trim() : "N/A",
          "Device Details": `${userAgent} (${platform})`,
        //   "Device Details": item?.survey_data?.user_agent ? item?.survey_data?.user_agent.trim() : "N/A"(item?.survey_data?.patform ? item?.survey_data?.patform.trim() : "N/A"),
          SurveyDate: item?.created_at ? item.created_at.trim() : "N/A",
          "1.Where are you in your career?":
          item?.survey_data?.career ? item?.survey_data?.career : "N/A",

          "2. What is your biggest challenge this year?": formatArrayToCommaSeparatedString( item?.survey_data?.biggest_challenge ? item?.survey_data?.biggest_challenge:"N/A"),

          "3.What is your work path?":
          item?.survey_data?.work_path ? item?.survey_data?.work_path : "N/A",
        
         
          "4. What is your biggest challenge this year?": formatArrayToCommaSeparatedString( item?.survey_data?.second_biggest_challenge ?item?.survey_data?.second_biggest_challenge:"N/A"),
        };
      })
      
      // const worksheet = XLSX.utils.json_to_sheet(downloadData, { header: Object.keys(downloadData[0]), origin: 'A1' });
      // // Adjust column widths
      // const columnWidths = downloadData.reduce((acc, item) => {
      //   Object.keys(item).forEach(key => {
      //     const columnLength = item[key].length;
      //     if (!acc[key] || acc[key] < columnLength) {
      //       acc[key] = columnLength;
      //     }
      //   });
      //   return acc;
      // }, {});

      // worksheet['!cols'] = Object.keys(columnWidths).map(key => ({ wch: columnWidths[key] }));

      const worksheet = XLSX.utils.json_to_sheet(downloadData);
         // Specify column widths (in Excel units, 1 unit = 1/256th of the width of a character)
         const columnWidths = [
          {wch: 20}, // Width of column A 
          {wch: 20}, // Width of column B 
          {wch: 20}, // Width of column C 
          {wch: 25}, // Width of column D 
          {wch: 25}, // Width of column E 
          {wch: 25}, // Width of column F 
          {wch: 20}, // Width of column G  
         
        ];
      
      // Apply column widths
      worksheet['!cols'] = columnWidths;
      
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });
      saveAs(
        blob, "Informed_Survey_Data.xlsx");

    } catch (err) {
      console.log("An error occurred while downloading the Excel file:", err)
    }
  }

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

  const formatArrayToCommaSeparatedString = (array) => {
    if (Array.isArray(array) && array.length > 0) {
      return array.join(', '); // Join array elements with commas
    }
    return 'N/A'; // Default value if array is empty or undefined
  };

  return (<>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <div className="loader" id="custom_loader"><div className="loader_show"><span className="loader-view"> </span></div></div>
    <Col className="right-sidebar custom-change full-width-survey">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <div className="custom-container">
        <Row>
          <Col>
            <div className="survey_data">
              <div className='survey_data_heading d-flex align-items-center justify-content-between'>
                <h4>Informed Survey Data</h4>
                <div className='clear-search d-flex align-items-center'>
                  {/* <a
                    className={`copy_link btn-voilet`}
                    // href={`${window.location.protocol}//${window.location.host}/survey/check8`}
                    href={`https://events.docintel.app/survey/8check`}
                    onClick={(e) => {
                      e.preventDefault();
                      
                      console.dir();
                      let newLink = `${e.currentTarget.getAttribute("href")}`;
                      copyToClipboard(newLink);
                    }}
                  >
                    Copy Survey Link
                  </a> */}
                  {data?.length > 0 ?
                    <div className="clear-search d-flex align-items-center">
                      <button
                        className="btn print"
                        title="Download data"
                        onClick={() => {
                          downloadExcelSurveyData();
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
                    </div>
                    : ""}
                </div>
              </div>
              {data?.length > 0 ? <>
                <div className='survey_data_details'>
                  <div className='survey_data_accordion_heading'>
                    <ul>
                      <li>Ip Address</li>
                      <li>Device Details</li>
                      <li>Survey Date</li>
                    </ul>
                  </div>

                  {data?.map((item, index) => {
                    return (<>
                      <Accordion
                      key={index}
                        activeKey={openAccordionIndex === index ? '0' : null}                        
                        onSelect={() => handleAccordionOpen(index)}
                        className="content_analytics_accordian"
                      >
                        <Accordion.Item eventKey="0" ref={(ref) => { accordionRefs.current[index] = ref; }}>                        
                          <Accordion.Header>
                            <ul>
                              <li>{item?.survey_data?.ip_address ? item?.survey_data?.ip_address : "N/A"}</li>
                              <li>{item?.survey_data?.user_agent ? item?.survey_data?.user_agent : "N/A"} ({item?.survey_data?.platform ? item?.survey_data?.platform : "N/A"})</li>
                              <li>{item?.created_at ? item?.created_at : "N/A"}</li>
                            </ul>
                          </Accordion.Header>

                          <Accordion.Body>
                            {openAccordionIndex === index && (
                              <>
                                {Object.keys(item?.survey_data)?.length ? (
                                  <div className='main'>


                                    <div className='survey-data'>
                                      <h6>1.Where are you in your career? </h6>
                                      <p>{item?.survey_data?.career ? item?.survey_data?.career : "N/A"}</p>
                                    </div>

                                    <div className='survey-data'>
                                      <h6>2.What is your biggest challenge this year?</h6>
                                      {/* <p>{item?.survey_data?.biggest_challenge ? item?.survey_data?.biggest_challenge : "N/A"}</p> */}
                                      <p>{formatArrayToCommaSeparatedString(item?.survey_data?.biggest_challenge ? item?.survey_data?.biggest_challenge : "N/A")}</p>
                                    </div>

                                    <div className='survey-data'>
                                      <h6>3.What is your work path?</h6>
                                      <p>{item?.survey_data?.work_path ? item?.survey_data?.work_path : "N/A"}</p>
                                      
                                    </div>

                                    <div className='survey-data'>
                                      <h6>4. What is your biggest challenge this year?</h6>
                                      {/* <p>{item?.survey_data?.second_biggest_challenge ?item?.survey_data?.second_biggest_challenge:"N/A"}</p> */}
                                      <p>{formatArrayToCommaSeparatedString(item?.survey_data?.second_biggest_challenge ?item?.survey_data?.second_biggest_challenge:"N/A")}</p>
                                    </div>
 
                                  </div>
                                ) : (
                                  <div className="no_found">
                                    <h3 align="center" style={{ color: "#004A89" }}>No Data Found</h3>
                                  </div>
                                )}
                              </>
                            )}

                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </>)
                  })}


                </div>
              </>
                : apiCallStatus ? <div className='no_found'><h3 style={{ color: "#004A89" }}>No Data Found</h3></div> : ""}
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  </>)
}
export default InformedSurveyData