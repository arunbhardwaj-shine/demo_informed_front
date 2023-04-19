import React, { useState, useEffect, useRef } from "react";
import { Col, Form, Row, Accordion, ProgressBar } from "react-bootstrap";
import Highcharts from "highcharts";
import { loader } from "../../loader";
import { ENDPOINT } from "../../axios/apiConfig";
import { postData } from "../../axios/apiHelper";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import Select from "react-select";
import HighchartsReact from "highcharts-react-official";
import ContentAnalyticsComponent from "./ContentAnalyticsComponent";
import html2canvas from "html2canvas";

import { Link } from "react-router-dom";
import MapComponent from "./MapComponent";

exporting(Highcharts);
exportData(Highcharts);

const ContentAnalytics = () => {
  const [pdfData, setPdfData] = useState({});
  const [isDataFound, setIsDataFound] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pdfOptions, setPdfOptions] = useState([]);
  const [urlOptions, setUrlOptions] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(0);
  const [isPdfData, setIsPdfData] = useState(false);
  const mapData = useRef([]);
  const readersData = useRef([]);
  const barData = useRef(null);

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isReaderAccordionOpen, setIsReaderAccordionOpen] = useState(false);

  useEffect(() => {
    getDataFromApi();
  }, []);

  async function getDataFromApi() {
    loader("show");
    try {
      const requestBody = {
        selectValue: JSON.stringify(["id", "title", "code"]),
        type:"rest"
      };
      const response = await postData(ENDPOINT.LIBRARY, requestBody);
      const hadData = response?.data?.data?.library || [];

      const pdfObj = hadData.map((item) => ({
        label: item.title,
        value: item.id,
      }));
      const urlObj = hadData.map((item) => ({
        label: item.code,
        value: item.id,
      }));

      setPdfOptions(pdfObj);
      setUrlOptions(urlObj);
      // alert(pdfObj[0].value)
      setSelectedPdf(pdfObj[0].value);
      setIsDataFound(true);
    } catch (err) {
      setIsDataFound(false);
      console.log(err);
    } finally {
      // loader("hide");
    }
  }

  async function filterPdfData(pdfId) {
    setIsLoaded(false);
    // setIsDataFound(false)
    setIsAccordionOpen(false);
    setIsReaderAccordionOpen(false);

    setSelectedPdf(pdfId.value);
    loader("show");
    try {
      setIsPdfData(false);
      const requestBody = {
        pdfId: pdfId.value,
      };
      const response = await postData(ENDPOINT.CONTENTANALYTICS, requestBody);
      const hadData = response?.data?.data || [];
      setIsDataFound(hadData);
      setIsLoaded(true);
      setIsPdfData(true);
    } catch (err) {
      setIsDataFound(false);
      console.log(err);
    } finally {
      loader("hide");
    }
  }

  useEffect(() => {
    if (pdfOptions.length > 0) {
      filterPdfData(pdfOptions[0]);
    }
  }, [pdfOptions]);
  const handleAccordionOpen = async () => {
    try {
      loader("show");
      if (!isAccordionOpen) {
        const requestBody = { pdfId: selectedPdf };
        const response = await postData(ENDPOINT.MAPLOCATION, requestBody);
        const hadData = response?.data?.data || [];
        mapData.current = hadData;
        barData.current = response?.data || [];
        setIsAccordionOpen(true);
      } else {
        setIsAccordionOpen(false);
      }
    } catch (error) {
      // Handle error here
    } finally {
      loader("hide");
    }
  };

  const handleReaderAccordionOpen = async () => {
    try {
      loader("show");
      if (!isReaderAccordionOpen) {
        const requestBody = { pdfId: selectedPdf };
        const response = await postData(ENDPOINT.READERANALYTICS, requestBody);
        const hadData = response?.data?.data || [];
        readersData.current = hadData;
        setIsReaderAccordionOpen(true);
      } else {
        setIsReaderAccordionOpen(false);
      }
    } catch (error) {
      // Handle error here
    } finally {
      loader("hide");
    }
  };

  const handleParent = () => {
    html2canvas(document.getElementById("parent")).then((canvas) => {
      const link = document.createElement("a");
      link.download = `${Math.random()}.png`;
      link.href = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      link.click();
    });
  };
  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="top-header">
              <div className="page-title d-flex">
                <Link
                  className="btn btn-primary btn-bordered back-btn"
                  to="/top-clients"
                >
                  <svg
                    width="14"
                    height="24"
                    viewBox="0 0 14 24"
                    fill="pdfOptionsnone"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.159662 12.0019C0.159662 11.5718 0.323895 11.1417 0.65167 10.8138L10.9712 0.494292C11.6277 -0.16216 12.692 -0.16216 13.3482 0.494292C14.0044 1.15048 14.0044 2.21459 13.3482 2.8711L4.21687 12.0019L13.3479 21.1327C14.0041 21.7892 14.0041 22.8532 13.3479 23.5093C12.6917 24.1661 11.6274 24.1661 10.9709 23.5093L0.65135 13.19C0.323523 12.8619 0.159662 12.4319 0.159662 12.0019Z"
                      fill="#97B6CF"
                    />
                  </svg>
                </Link>
                <h2>Content Analytics</h2>
              </div>
            </div>
            <div className="create-change-content spc-content analytic-charts">
              {isDataFound ? (
                <div className="form_action d-flex justify-content-between align-items-center">
                  <Form className="product-unit d-flex justify-content-between align-items-center">
                    <div className="form-group d-flex align-items-center">
                      <label htmlFor="">Filter By</label>
                      <Select
                        options={pdfOptions}
                        onChange={(selectedOption) => {
                          filterPdfData(selectedOption); // call the function when an option is selected
                        }}
                        className="dropdown-basic-button split-button-dropup mr-2"
                        isClearable
                        defaultValue={pdfOptions[0]} // pass the first object as the default value
                      />
                      <Select
                        options={urlOptions}
                        onChange={(selectedOption) => {
                          filterPdfData(selectedOption); // call the function when an option is selected
                        }}
                        className="dropdown-basic-button split-button-dropup mr-2"
                        isClearable
                        defaultValue={urlOptions[0]}
                      />
                    </div>
                  </Form>
                  <div className="clear-search">
                    <button
                      onClick={handleParent}
                      className="btn btn-outline-primary"
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
                </div>
              ) : null}

              {isPdfData ? (
                <div id="parent">
                  <ContentAnalyticsComponent data={isDataFound} />
                  <div className="content_analytics">
                    <Row>
                      <Col>
                        <Accordion onSelect={handleAccordionOpen} className="content_analytics_accordian">
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>
                              See Country Details
                            </Accordion.Header>
                            {isAccordionOpen ? (
                              <Accordion.Body>
                                <MapComponent
                                  data={mapData.current}
                                  status={false}
                                />
                                <Row>
                                  <Col>
                                    <BarComponent data={barData.current} />
                                  </Col>
                                </Row>
                              </Accordion.Body>
                            ) : null}
                          </Accordion.Item>
                        </Accordion>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Accordion onSelect={handleReaderAccordionOpen} className="content_analytics_accordian">
                          <Accordion.Item eventKey="1">
                            <Accordion.Header>
                              Readers Per Page
                            </Accordion.Header>
                            {isReaderAccordionOpen ? (
                              <Accordion.Body>
                                <ReadersPerPageLayout
                                  data={readersData.current}
                                />
                              </Accordion.Body>
                            ) : null}
                          </Accordion.Item>
                        </Accordion>
                      </Col>
                    </Row>
                  </div>
                </div>
              ) : isLoaded ? (
                <h4> No Data Found</h4>
              ) : null}
            </div>
          </Row>
        </div>
      </Col>
    </>
  );
};
export default ContentAnalytics;

const ReadersPerPageLayout = ({ data }) => {
  return (
    <>
      {/* <Row>
        <Col>Readers Per Page</Col>
      </Row>
      <Row>
        <Col>Total : data?.length Pages</Col>
      </Row> */}
      <div class="section-detail-box d-flex">
        <div class="detail_section_heading">Readers Per Page</div>
        <div class="detail_section_pages">Total : data?.length Pages</div>
                        </div>
      {data?.map((element, index) => {
        return (
          <React.Fragment key={index}>
            <Row>
              <Col>
                <div>{element?.page}</div>
              </Col>
              <Col>
                <div>
                  <Row>
                    <Col>
                      <span>Ignored: </span>
                    </Col>
                    <Col>
                      <ProgressBar
                        now={element?.ignored}
                        label={`${element?.ignored}% Complete`}
                      />
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row>
                    <Col>
                      <span>Browser: </span>
                    </Col>
                    <Col>
                      <ProgressBar
                        now={element?.browsed}
                        label={`${element?.browsed}% Complete`}
                      />
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col>
                <div>
                  <Row>
                    <Col>
                      <span>Read: </span>
                    </Col>
                    <Col>
                      <ProgressBar
                        now={element?.read}
                        label={`${element?.read}% Complete`}
                      />
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row>
                    <Col>
                      <span>Reader: </span>
                    </Col>
                    <Col>
                      <ProgressBar
                        now={element?.readers}
                        label={`${element?.readers}% Complete`}
                      />
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col>
                <div>
                  <span>Time Needed: </span>{" "}
                  <span>{element?.avgsecond} Seconds</span>
                </div>
                <div>
                  <span>Time Spent: </span>{" "}
                  <span> {element?.timeSpent} Seconds</span>
                </div>
              </Col>
            </Row>
          </React.Fragment>
        );
      })}
    </>
  );
};

const BarComponent = ({ data }) => {
  const countries = data.data.countryname;
  const newSeries = [
    {
      name: `Openings`,
      data: data.data.opening,
      color: "#56cbbd",
    },
    {
      name: `Readers`,
      data: data.data.reader,
      color: "#f9bc04",
    },
  ];

  return (
    <>
      <div className="high_charts">
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            chart: {
              marginTop: 100,
              marginBottom: 100,
              type: "bar",
              events: {
                load: function () {
                  let categoryHeight = 50;
                  this.update({
                    chart: {
                      height:
                        categoryHeight * this.pointCount +
                        (this.chartHeight - this.plotHeight),
                    },
                  });
                },
              },
            },
            title: {
              text: "Unique Readers ",
            },
            xAxis: {
              categories: countries,
            },
            credits: {
              enabled: false,
            },
            exporting: {
              showHighchart: true,
              showTable: true,
              tableCaption: "",
            },
            legend: {
              reversed: true,
              align: "center",
              verticalAlign: "bottom", // set to bottom
              floating: true,
              x: 0,
              y: 20,
            },
            yAxis: {
              min: 0,
              title: {
                text: "",
              },
              stackLabels: {
                enabled: true,
                style: {
                  fontWeight: "bold",
                  color:
                    (Highcharts.defaultOptions.title.style &&
                      Highcharts.defaultOptions.title.style.color) ||
                    "gray",
                },
              },
            },
            plotOptions: {
              bar: {
                dataLabels: {
                  enabled: true,
                },
              },
            },

            series: newSeries,
          }}
        />
      </div>
    </>
  );
};
