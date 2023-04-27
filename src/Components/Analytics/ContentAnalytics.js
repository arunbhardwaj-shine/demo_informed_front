import React, { useState, useEffect, useRef } from "react";
import { Col, Form, Row, Accordion, ProgressBar } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Highcharts from "highcharts";
import { loader } from "../../loader";
import { ENDPOINT } from "../../axios/apiConfig";
import { postData, postFormData } from "../../axios/apiHelper";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import Select from "react-select";
import HighchartsReact from "highcharts-react-official";
import ContentAnalyticsComponent from "./ContentAnalyticsComponent";
import html2canvas from "html2canvas";
import MapComponent from "./MapComponent";

exporting(Highcharts);
exportData(Highcharts);

const ContentAnalytics = () => {
  const { state } = useLocation();
  const [pdfData, setPdfData] = useState({});
  const [isDataFound, setIsDataFound] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pdfOptions, setPdfOptions] = useState([]);
  const [urlOptions, setUrlOptions] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(0);
  const [isPdfData, setIsPdfData] = useState(false);
  const [sectionLoader, setSectionLoader] = useState(false);
  const [mapData, setMapData] = useState([]);
  const [readerData, setReaderData] = useState([]);
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
        type: "rest",
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
    }
  }

  async function filterPdfData(pdfId) {
    setIsLoaded(false);

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
      let pdfId = state?.pdfId ? { value: state?.pdfId } : pdfOptions[0];
      filterPdfData(pdfId);
    }
  }, [pdfOptions]);
  const handleAccordionOpen = async () => {
    try {
      if (!isAccordionOpen) {
        setSectionLoader(true);

        if (!Object.keys(mapData)?.length) {
          const requestBody = { pdfId: selectedPdf };
          const response = await postData(ENDPOINT.MAPLOCATION, requestBody);
          const hadMapData = response?.data || [];

          setMapData(hadMapData);
        }
        setIsAccordionOpen(true);
      } else {
        setIsAccordionOpen(false);
      }
    } catch (error) {
      console.log(error);
      setSectionLoader(false);
    } finally {
      setSectionLoader(false);
    }
  };

  const handleReaderAccordionOpen = async () => {
    try {
      if (!isReaderAccordionOpen) {
        setSectionLoader(true);
        if (!readerData?.length) {
          const requestBody = { pdfId: selectedPdf };
          const response = await postData(
            ENDPOINT.READERANALYTICS,
            requestBody
          );
          const hadData = response?.data?.data || [];

          setReaderData(hadData);
        }
        setIsReaderAccordionOpen(true);
      } else {
        setIsReaderAccordionOpen(false);
      }
    } catch (error) {
      console.log(error);
      setSectionLoader(false);
    } finally {
      setSectionLoader(false);
    }
  };

  const handleParent = async () => {
    try {
      loader("show");

      await html2canvas(document.getElementById("parent")).then((canvas) => {
        const link = document.createElement("a");
        link.download = `${Math.random()}.png`;
        link.href = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        link.click();
      });
      loader("hide");
    } catch (err) {
      loader("hide");
      console.log(err);
    }
  };

  const downloadUniqueStats = async () => {
    try {
      loader("show");
      const res = await postFormData(
        ENDPOINT.DOWNLOADARTICLEREADERS,
        { pdfId: selectedPdf },
        {
          responseType: "blob",
        }
      );
      const link = document.createElement("a");
      const url = URL.createObjectURL(res?.data);
      link.href = url;
      link.download = "readers.xlsx";
      link.click();
      loader("hide");
    } catch (err) {
      console.log(err);
      loader("hide");
    }
  }
  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="top-header">
              <div className="page-title d-flex">
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
                        className="dropdown-basic-button split-button-dropup mr-2 btn-bigger"
                        isClearable
                        defaultValue={
                          state?.pdfId
                            ? pdfOptions?.filter(
                                (item) => item?.value == state?.pdfId
                              )
                            : pdfOptions?.[0]
                        } // pass the first object as the default value
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
                  <div className="clear-search d-flex">
                    <button
                      style={{ marginRight: "10px" }}
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

                    <button
                      onClick={downloadUniqueStats}
                      className="btn btn-outline-primary"
                    >
                      <svg
                        height="141.732px"
                        viewBox="-0.288 -24.675 141.732 141.732"
                        width="141.732px"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="Livello_98">
                          <path
                            fill="#0066BE"
                            d="M37.164,60.964C17.418,61.378,1.395,74.75,0,91.622h18.693l0.009-0.104c0.9-10.901,6.48-21.019,15.712-28.487   C35.305,62.312,36.223,61.622,37.164,60.964 M44.62,27.247c0-2.408,0.255-4.747,0.731-6.98c-2.211-1.199-4.662-1.872-7.244-1.872   c-9.761,0-17.673,9.526-17.673,21.279c0,11.395,7.437,20.695,16.78,21.253c4.202-2.928,8.886-5.22,13.868-6.815   c1.054-1.366,1.952-2.902,2.681-4.568C48.203,44.364,44.62,36.296,44.62,27.247 M92.995,26.994C92.995,12.085,82.958,0,70.578,0   C58.197,0,48.161,12.085,48.161,26.994c0,13.36,8.063,24.457,18.651,26.61C42.957,55.19,23.947,71.714,22.238,92.38h96.68   c-1.71-20.666-20.719-37.19-44.576-38.775C84.93,51.451,92.995,40.357,92.995,26.994 M120.72,40.436   c0-11.753-7.912-21.28-17.674-21.28c-2.583,0-5.031,0.676-7.243,1.872c0.479,2.233,0.729,4.573,0.729,6.98   c0,9.05-3.582,17.117-9.144,22.293c0.726,1.666,1.627,3.202,2.678,4.571c4.984,1.596,9.667,3.888,13.868,6.813   C113.285,61.13,120.72,51.829,120.72,40.436 M141.156,92.383c-1.396-16.872-17.418-30.243-37.164-30.657   c0.94,0.657,1.857,1.346,2.749,2.066c9.23,7.469,14.812,17.586,15.713,28.484l0.009,0.104L141.156,92.383L141.156,92.383z"
                          />
                        </g>
                        <g id="Livello_1_1_" />
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
                        <Accordion
                          onSelect={handleAccordionOpen}
                          className="content_analytics_accordian"
                        >
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>
                              See Country Details
                            </Accordion.Header>

                            <Accordion.Body>
                              {!isAccordionOpen ? (
                                <div className="accordion-loader">
                                  <div
                                    className={
                                      "loader tab-inside " +
                                      (sectionLoader ? "show" : "")
                                    }
                                    id="custom_loader"
                                  >
                                    <div className="loader_show">
                                      <span className="loader-view"> </span>
                                    </div>
                                  </div>
                                </div>
                              ) : null}
                              {isAccordionOpen ? (
                                <>
                                  <MapComponent
                                    data={mapData?.data}
                                    status={false}
                                  />
                                  <Row>
                                    <Col>
                                      <BarComponent data={mapData} />
                                    </Col>
                                  </Row>
                                </>
                              ) : null}
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Accordion
                          onSelect={handleReaderAccordionOpen}
                          className="content_analytics_accordian"
                        >
                          <Accordion.Item eventKey="1">
                            <Accordion.Header>
                              Readers Per Page
                            </Accordion.Header>

                            <Accordion.Body>
                              {!isReaderAccordionOpen ? (
                                <div className="accordion-loader">
                                  <div
                                    className={
                                      "loader tab-inside " +
                                      (sectionLoader ? "show" : "")
                                    }
                                    id="custom_loader"
                                  >
                                    <div className="loader_show">
                                      <span className="loader-view"> </span>
                                    </div>
                                  </div>
                                </div>
                              ) : null}
                              {isReaderAccordionOpen ? (
                                <ReadersPerPageLayout data={readerData} />
                              ) : null}
                            </Accordion.Body>
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


        <Col>Total : {data?.length} Pages</Col>
      </Row>

      </Row>
      <Row>
        <Col>Total : data?.length Pages</Col>
      </Row> */}
      <div class="section-detail-box d-flex">
        <div class="detail_section_heading">Readers Per Page</div>
        <div class="detail_section_pages">Total : {data?.length} Pages</div>
      </div>
      {data?.map((element, index) => {
        return (
          <React.Fragment key={index}>
            <div className="analytics-detail-view-box">
              <div className="analytics-detil-image">
                <div>{element?.page}</div>
              </div>
              <div className="analytics-reader-detail">
                <div className="analytics-reader-detail-box">
                  <div className="analytics-reader-title">Ignored:</div>
                  <div className="analytics-reader-progress ignored">
                    <ProgressBar now={100} label={`${element?.ignored}`} />
                  </div>
                </div>
                <div className="analytics-reader-detail-box">
                  <div className="analytics-reader-title">
                    <span>Browser: </span>
                  </div>
                  <div className="analytics-reader-progress browsed">
                    <ProgressBar now={100} label={`${element?.browsed}`} />
                  </div>
                </div>
              </div>
              <div className="analytics-reader-detail">
                <div className="analytics-reader-detail-box">
                  <div className="analytics-reader-title">Read:</div>
                  <div className="analytics-reader-progress read">
                    <ProgressBar now={100} label={`${element?.read}`} />
                  </div>
                </div>
                <div className="analytics-reader-detail-box">
                  <div className="analytics-reader-title">Reader</div>
                  <div className="analytics-reader-progress reader">
                    <ProgressBar now={100} label={`${element?.readers}`} />
                  </div>
                </div>
              </div>
              <div className="analytics-time-detail">
                <div className="time-needed">
                  Time Needed: <span>{element?.avgsecond} Seconds</span>
                </div>
                <div className="time-spent">
                  Time Spent: <span> {element?.timeSpent} Seconds</span>
                </div>
              </div>
            </div>
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
