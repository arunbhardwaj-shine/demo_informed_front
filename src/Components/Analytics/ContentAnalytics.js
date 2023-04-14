import React, { useState, useEffect, useRef } from "react";
import { Col, Form, Row, Accordion } from "react-bootstrap";
import Highcharts from "highcharts";
import { loader } from "../../loader";
import { ENDPOINT } from "../../axios/apiConfig";
import { postData } from "../../axios/apiHelper";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import Select from "react-select";
import HighchartsReact from "highcharts-react-official";
import ContentAnalyticsComponent from "./ContentAnalyticsComponent";

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
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  useEffect(() => {
    getDataFromApi();
  }, []);

  async function getDataFromApi() {
    loader("show");
    try {
      const requestBody = {
        selectValue: JSON.stringify(["id", "title", "code"]),
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
      setIsLoaded(true);
    } catch (err) {
      setIsDataFound(false);
      console.log(err);
    } finally {
      loader("hide");
    }
  }

  async function filterPdfData(pdfId) {
    setIsAccordionOpen(false);
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
  const handAccordionOpen = async () => {
    loader("show");
    if (!isAccordionOpen) {
      const requestBody = {
        pdfId: selectedPdf,
      };
      const response = await postData(ENDPOINT.MAPLOCATION, requestBody);
      const hadData = response?.data?.data || [];
      mapData.current = hadData;

      setIsAccordionOpen(true);
    } else {
      setIsAccordionOpen(false);
    }
    loader("hide");
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
                    fill="none"
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
                  <div className="form_action">
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
                          onChange={filterPdfData}
                          className="dropdown-basic-button split-button-dropup mr-2"
                          isClearable
                          defaultValue={urlOptions[0]}
                        />
                      </div>
                    </Form>
                  </div>
              ) : null}

              {isPdfData ? (
                <>
                  <ContentAnalyticsComponent data={isDataFound} />

                  <Row>
                    <Col>
                      <Accordion onSelect={handAccordionOpen}>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            See Country Details
                          </Accordion.Header>
                          {isAccordionOpen ? (
                            <Accordion.Body>
                              <MapComponent data={mapData.current} status={false} />
                            </Accordion.Body>
                          ) : null}
                        </Accordion.Item>
                      </Accordion>
                    </Col>
                  </Row>
                </>
              ) : null}
            </div>
          </Row>
        </div>
      </Col>
    </>
  );
};
export default ContentAnalytics;
