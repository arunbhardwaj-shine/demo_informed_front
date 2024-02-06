import React, { useState, useEffect } from "react";
import { Col, Form, Row, Accordion, ProgressBar } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import Highcharts from "highcharts";
import { loader } from "../../loader";
import { ENDPOINT } from "../../axios/apiConfig";
import { postData, getData } from "../../axios/apiHelper";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import Select from "react-select";
import HighchartsReact from "highcharts-react-official";
import ContentAnalyticsComponent from "./ContentAnalyticsComponent";
import MapComponent from "./MapComponent";
import domtoimage from "dom-to-image";
import axios from "axios";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
exporting(Highcharts);
exportData(Highcharts);

const ContentAnalytics = () => {
  const { state } = useLocation();
  const [isDataFound, setIsDataFound] = useState(false);
  const [filterPdfLinkData, setFilterPdfLinkData] = useState();
  const [sublinkData, setSublinkData] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [pdfOptions, setPdfOptions] = useState([]);
  const [urlOptions, setUrlOptions] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(0);
  const [selectedSublink, setSelectedSublink] = useState("");
  const [isPdfData, setIsPdfData] = useState(false);
  const [sectionLoader, setSectionLoader] = useState(false);
  const [mapData, setMapData] = useState([]);
  const [readerData, setReaderData] = useState([]);
  const [linkData, setLinkData] = useState([]);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isReaderAccordionOpen, setIsReaderAccordionOpen] = useState(false);
  const [isLinkAccordianOpen, setisLinkAccordianOpen] = useState(false);
  const [sublinkOptions, setSublinkOptions] = useState([]);
  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    getDataFromApi();
  }, []);

  async function getDataFromApi() {
    try {
      loader("show");
      const requestBody = {
        selectValue: JSON.stringify(["id", "title", "code"]),
        type: "rest",
      };
      const response = await postData(ENDPOINT.LIBRARY, requestBody);
      const hadData = response?.data?.data?.library || [];

      const pdfObj = hadData
        .map((item) => ({
          label: item.title.trim(),
          value: item.id,
        }))
        .sort((a, b) =>
          a.label.toLowerCase().localeCompare(b.label.toLowerCase())
        );
      const urlObj = hadData
        .map((item) => ({
          label: item.code,
          value: item.id,
        }))
        .sort((a, b) =>
          a.label.toLowerCase().localeCompare(b.label.toLowerCase())
        );
      setPdfOptions(pdfObj);
      setUrlOptions(urlObj);
      setSelectedPdf(pdfObj[0].value);
      setIsDataFound(true);
      if (pdfObj[0].value) {
        getSublink(pdfObj[0].value);
      }
    } catch (err) {
      loader("hide");
      setIsDataFound(false);
      console.log(err);
    }
  }

  const getSublink = async (pdfId) => {
    try {
      const res = await getData(ENDPOINT.LIBRARYRESUBLINKLISTING + "/" + pdfId);
      const data = res?.data?.data;
      const subLinkObj = data
        ?.map((item) => ({
          label: item.name.trim(),
          value: item.unique_code,
        }))
        .sort((a, b) =>
          a.label.toLowerCase().localeCompare(b.label.toLowerCase())
        );
      setSublinkOptions(subLinkObj);
    } catch (err) {
      console.log("--err", err);
    }
  };

  async function filterPdfData(pdfId) {
    setIsLoaded(false);
    setReaderData([]);
    setSublinkOptions([]);
    setIsAccordionOpen(false);
    setIsReaderAccordionOpen(false);
    setSelectedSublink("");
    setSublinkData("");
    setSelectedPdf(pdfId.value);

    try {
      loader("show");
      setIsPdfData(false);
      const requestBody = {
        pdfId: pdfId.value,
      };
      const response = await postData(ENDPOINT.CONTENTANALYTICS, requestBody);
      const hadData = response?.data?.data || [];

      setFilterPdfLinkData(hadData);
      setIsLoaded(true);
      setIsPdfData(true);
      if (hadData) {
        getSublink(pdfId.value);
      }
    } catch (err) {
      setIsDataFound(false);
      console.log(err);
    } finally {
      loader("hide");
    }
  }

  const filterSublinkData = async (sublinkId) => {
    try {
      loader("show");
      setIsLoaded(false);
      setIsPdfData(false);
      setReaderData([]);
      setIsAccordionOpen(false);
      setIsReaderAccordionOpen(false);
      setSelectedSublink(sublinkId?.value);
      const body = {
        pdfId: selectedPdf,
        userpdf_unique_code: sublinkId?.value,
        flag: 1,
      };
      const res = await postData(ENDPOINT.LIBRARY_SUBLINK_ANALYTICS, body);
      const hadData = res?.data?.data || [];
      setSublinkData(hadData);
      setIsPdfData(true);
    } catch (err) {
      console.log("--err", err);
    } finally {
      loader("hide");
    }
  };

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
        if (selectedSublink) {
          const response = await postData(ENDPOINT.SUBLINK_MAPLOCATION, {
            userpdf_unique_code: selectedSublink,
            pdfId: selectedPdf,
          });
          const hadMapData = response?.data || [];
          setMapData(hadMapData);
        } else {
          const response = await postData(ENDPOINT.MAPLOCATION, {
            pdfId: selectedPdf,
          });
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
          if (selectedSublink) {
            const response = await postData(ENDPOINT.SUBLINK_READER_ANALYTICS, {
              userpdf_unique_code: selectedSublink,
              pdfId: selectedPdf,
            });
            const hadData = response?.data?.data || [];
            setReaderData(hadData);
          } else {
            const response = await postData(ENDPOINT.READERANALYTICS, {
              pdfId: selectedPdf,
            });
            const hadData = response?.data?.data || [];
            setReaderData(hadData);
          }
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

  const handleLinksAccordionOpen = async () => {
    try {
      if (!isLinkAccordianOpen) {
        setSectionLoader(true);
        if (!linkData?.length) {
          const response = await postData(ENDPOINT.LINKSANALYTICS, {
            pdfId: selectedPdf,
          });
          const hadData = response?.data?.data || [];
          setLinkData(hadData);
        }
        setisLinkAccordianOpen(true);
      } else {
        setisLinkAccordianOpen(false);
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
      const element = document.getElementById("parent");
      // add padding to the element

      const dataUrl = await domtoimage.toPng(element, { cacheBust: true });

      const link = document.createElement("a");
      link.download = `${Math.random()}.png`;
      link.href = dataUrl;
      link.click();

      loader("hide");
    } catch (err) {
      loader("hide");
      console.log(err);
    }
  };
  const downloadUniqueStats = async () => {
    try {
      loader("show");
      let durl =
        "https://webinar.informed.pro/Analytics/download_excel_new/" +
        selectedPdf;
      const response = await axios.get(durl, { responseType: "blob" });
      // .then((response) => {
      // Create a Blob from the response data
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      // Create a temporary URL for the Blob
      const url = window.URL.createObjectURL(blob);
      // Create a link and click it to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = "readers.xlsx";
      link.click();
      // Clean up the temporary URL
      window.URL.revokeObjectURL(url);
      // })
      // .catch((error) => {
      //   console.error('Error downloading the Excel file:', error);
      // });
      loader("hide");
    } catch (err) {
      console.log(err);
      loader("hide");
    }
  };

  const handleAccordionToggle = (index) => {
    setActiveKey(activeKey === index ? null : index);
  };

  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            {localStorage.getItem("group_id") == 2 ||
            (localStorage.getItem("group_id") == 3 &&
              localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") ? (
              ""
            ) : (
              <div className="top-header content_analytic">
                <div className="page-title d-flex">
                  {state?.pdfId ? (
                    <Link
                      className="btn btn-primary btn-bordered back-btn"
                      to="/library-content"
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
                  ) : null}
                  <h2>Content Analytics</h2>
                </div>
              </div>
            )}

            <div className="create-change-content spc-content analytic-charts">
              {isDataFound ? (
                <div className="form_action d-flex justify-content-between align-items-center">
                  <Form className="product-unit d-flex justify-content-between align-items-center">
                    <div className="form-group d-flex align-items-center">
                      <label htmlFor="">Filter By</label>

                      <Select
                        options={pdfOptions}
                        onChange={(selectedOption) => {
                          filterPdfData(selectedOption);
                        }}
                        className="dropdown-basic-button split-button-dropup mr-2 btn-bigger"
                        isClearable
                        defaultValue={
                          state?.pdfId
                            ? pdfOptions?.filter(
                                (item) => item?.value == state?.pdfId
                              )
                            : pdfOptions?.[0]
                        }
                        value={
                          selectedPdf != ""
                            ? pdfOptions[
                                pdfOptions?.findIndex(
                                  (el) => el?.value === selectedPdf
                                )
                              ]
                            : ""
                        }
                      />

                      <Select
                        options={urlOptions}
                        onChange={(selectedOption) => {
                          filterPdfData(selectedOption);
                        }}
                        className="dropdown-basic-button split-button-dropup mr-2"
                        isClearable
                        defaultValue={urlOptions[0]}
                        value={
                          selectedPdf != ""
                            ? urlOptions[
                                urlOptions?.findIndex(
                                  (el) => el?.value === selectedPdf
                                )
                              ]
                            : ""
                        }
                      />

                      <Select
                        options={sublinkOptions}
                        onChange={(selectedOption) => {
                          filterSublinkData(selectedOption);
                        }}
                        className="dropdown-basic-button split-button-dropup mr-2"
                        isClearable
                        placeholder="Select sublink"
                        value={
                          selectedSublink != ""
                            ? sublinkOptions[
                                sublinkOptions?.findIndex(
                                  (el) => el?.value === selectedSublink
                                )
                              ]
                            : ""
                        }
                      />
                    </div>
                  </Form>
                  <div className="clear-search d-flex">
                    {localStorage.getItem("user_id") ==
                    "b3APser7L8OELDIG8ee2HQ==" ? (
                      ""
                    ) : (
                      <button
                        style={{ marginRight: "10px" }}
                        onClick={downloadUniqueStats}
                        title="Download stats"
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
                    )}

                    {/* <button
                      style={{ marginRight: "10px" }}
                      onClick={downloadUniqueStats}
                      title="Download stats"
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
                    </button> */}

                    <button
                      onClick={handleParent}
                      title={
                        localStorage.getItem("user_id") ==
                        "b3APser7L8OELDIG8ee2HQ=="
                          ? "Print screen"
                          : "Print article"
                      }
                      // title="Print article"
                      className="btn btn-outline-primary"
                    >
                      {localStorage.getItem("user_id") ==
                      "b3APser7L8OELDIG8ee2HQ==" ? (
                        <svg
                          id="Layer_1"
                          data-name="Layer 1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          height="24px"
                          width="24px"
                        >
                          <path
                            d="M42.653,170.667A21.333,21.333,0,0,1,21.32,149.333V85.32a64.073,64.073,0,0,1,64-64h64.014a21.333,21.333,0,1,1,0,42.667H85.32A21.357,21.357,0,0,0,63.986,85.32v64.014A21.333,21.333,0,0,1,42.653,170.667Z"
                            fill="#0066be"
                          ></path>
                          <path
                            d="M426.68,490.68H362.667a21.333,21.333,0,1,1,0-42.667H426.68a21.357,21.357,0,0,0,21.333-21.333V362.667a21.333,21.333,0,1,1,42.667,0V426.68A64.073,64.073,0,0,1,426.68,490.68Z"
                            fill="#0066be"
                          ></path>
                          <path
                            d="M448,170.667a21.333,21.333,0,0,1-21.333-21.333V85.32a21.357,21.357,0,0,0-21.333-21.333H341.32a21.333,21.333,0,1,1,0-42.667h64.014a64.073,64.073,0,0,1,64,64v64.014A21.333,21.333,0,0,1,448,170.667Z"
                            fill="#0066be"
                          ></path>
                          <path
                            d="M149.333,490.68H85.32a64.073,64.073,0,0,1-64-64V362.667a21.333,21.333,0,1,1,42.667,0V426.68A21.357,21.357,0,0,0,85.32,448.014h64.014a21.333,21.333,0,1,1,0,42.667Z"
                            fill="#0066be"
                          ></path>
                          <path
                            d="M362.68,384.014H149.32a42.716,42.716,0,0,1-42.667-42.667V213.32a42.716,42.716,0,0,1,42.667-42.667h29.5l15.436-30.874a21.334,21.334,0,0,1,19.081-11.793h85.333a21.334,21.334,0,0,1,19.081,11.793l15.436,30.874h29.5a42.716,42.716,0,0,1,42.667,42.667V341.347A42.716,42.716,0,0,1,362.68,384.014ZM149.32,213.32V341.347H362.68V213.32H320a21.334,21.334,0,0,1-19.081-11.793l-15.436-30.874H226.518l-15.436,30.874A21.334,21.334,0,0,1,192,213.32Z"
                            fill="#0066be"
                          ></path>
                          <path
                            d="M256,330.667a64,64,0,1,1,64-64A64.073,64.073,0,0,1,256,330.667Zm0-85.333a21.333,21.333,0,1,0,21.333,21.333A21.357,21.357,0,0,0,256,245.333Z"
                            fill="#0066BE"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          id="Layer_1"
                          data-name="Layer 1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          height="24px"
                          width="24px"
                        >
                          <path
                            d="M42.653,170.667A21.333,21.333,0,0,1,21.32,149.333V85.32a64.073,64.073,0,0,1,64-64h64.014a21.333,21.333,0,1,1,0,42.667H85.32A21.357,21.357,0,0,0,63.986,85.32v64.014A21.333,21.333,0,0,1,42.653,170.667Z"
                            fill="#0066be"
                          ></path>
                          <path
                            d="M426.68,490.68H362.667a21.333,21.333,0,1,1,0-42.667H426.68a21.357,21.357,0,0,0,21.333-21.333V362.667a21.333,21.333,0,1,1,42.667,0V426.68A64.073,64.073,0,0,1,426.68,490.68Z"
                            fill="#0066be"
                          ></path>
                          <path
                            d="M448,170.667a21.333,21.333,0,0,1-21.333-21.333V85.32a21.357,21.357,0,0,0-21.333-21.333H341.32a21.333,21.333,0,1,1,0-42.667h64.014a64.073,64.073,0,0,1,64,64v64.014A21.333,21.333,0,0,1,448,170.667Z"
                            fill="#0066be"
                          ></path>
                          <path
                            d="M149.333,490.68H85.32a64.073,64.073,0,0,1-64-64V362.667a21.333,21.333,0,1,1,42.667,0V426.68A21.357,21.357,0,0,0,85.32,448.014h64.014a21.333,21.333,0,1,1,0,42.667Z"
                            fill="#0066be"
                          ></path>
                          <path
                            d="M362.68,384.014H149.32a42.716,42.716,0,0,1-42.667-42.667V213.32a42.716,42.716,0,0,1,42.667-42.667h29.5l15.436-30.874a21.334,21.334,0,0,1,19.081-11.793h85.333a21.334,21.334,0,0,1,19.081,11.793l15.436,30.874h29.5a42.716,42.716,0,0,1,42.667,42.667V341.347A42.716,42.716,0,0,1,362.68,384.014ZM149.32,213.32V341.347H362.68V213.32H320a21.334,21.334,0,0,1-19.081-11.793l-15.436-30.874H226.518l-15.436,30.874A21.334,21.334,0,0,1,192,213.32Z"
                            fill="#0066be"
                          ></path>
                          <path
                            d="M256,330.667a64,64,0,1,1,64-64A64.073,64.073,0,0,1,256,330.667Zm0-85.333a21.333,21.333,0,1,0,21.333,21.333A21.357,21.357,0,0,0,256,245.333Z"
                            fill="#0066BE"
                          ></path>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              ) : null}

              {isPdfData ? (
                <div id="parent">
                  <ContentAnalyticsComponent
                    data={filterPdfLinkData}
                    sublinkData={sublinkData}
                  />
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
                                Object.keys(mapData?.data?.countryname)
                                  ?.length ? (
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
                                ) : (
                                  <>
                                    <div className="no_found">
                                      <p align="center">No Data Available</p>
                                    </div>
                                  </>
                                )
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
                                readerData?.length ? (
                                  <ReadersPerPageLayout data={readerData} />
                                ) : (
                                  <>
                                    <div className="no_found">
                                      <p align="center">No Data Available</p>
                                    </div>
                                  </>
                                )
                              ) : null}
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </Col>
                    </Row>

                    {selectedPdf == 4830 ? (
                      <Row>
                        <Col>
                          <Accordion
                            onSelect={handleLinksAccordionOpen}
                            className="content_analytics_accordian"
                          >
                            <Accordion.Item eventKey="2">
                              <Accordion.Header>
                                Links Per Page
                              </Accordion.Header>

                              <Accordion.Body>
                                {!isLinkAccordianOpen ? (
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
                                {isLinkAccordianOpen ? (
                                  linkData?.length ? (
                                    <LinksLayout
                                      data={linkData}
                                      activeKey={activeKey}
                                      handleAccordionToggle={
                                        handleAccordionToggle
                                      }
                                    />
                                  ) : (
                                    <>
                                      <div className="no_found">
                                        <p align="center">No Data Available</p>
                                      </div>
                                    </>
                                  )
                                ) : null}
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </Col>
                      </Row>
                    ) : null}
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
      <div className="section-detail-box d-flex">
        <div className="detail_section_heading">Readers Per Page</div>
        <div className="detail_section_pages">Total : {data?.length} Pages</div>
      </div>
      {data?.map((element, index) => {
        return (
          <React.Fragment key={index}>
            <div className="analytics-detail-view-box">
              <div className="analytics-detil-image">
                <div>Page {element?.page}</div>
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
                    <span>Browsed: </span>
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

  if (data?.data?.pinOpenings) {
    var newObject = {
      name: "Article Usage",
      data: data?.data?.pinOpenings,
      color: "#00003C",
    };
    newSeries.push(newObject);
  }

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

const LinksLayout = ({ data, activeKey, handleAccordionToggle }) => {
  const downloadExcel = (data) => {
    try {
      if (data?.length == 0) {
        toast.warning("No data found");
        return;
      }
      let newData = [];
  
      data = data?.map((item, index) => {
        let finalData = {};
  
        finalData.Page = item?.page;
        finalData.Count = item?.count;
        finalData.Link = item?.link ? item?.link : "N/A";
        newData.push(finalData);
        item.data = item?.data?.map((itemChild, indexChild) => {
          let finalDataSample = {};
          finalDataSample.IpAddress = itemChild?.ip_address;
          finalDataSample.Browser = itemChild?.browser;
          finalDataSample.Date = itemChild?.date;
          newData.push(finalDataSample);
  
          return itemChild;
        });
  
    
  
        return item;
      });
  
      const worksheet = XLSX.utils.json_to_sheet(newData);
  
      // Set dynamic width for each column except "Link"
      let columnWidths = {
        "Page": 5,
        "Count": 5,
        "Link": 70,
        "IpAddress": 10,
        "Browser": 10,
        "Date": 10,
    }; 
      console.log(Object.keys(columnWidths).map((key) => ({
        wch: columnWidths[key] + 2,
      })));
      worksheet["!cols"] = Object.keys(columnWidths).map((key) => ({
        wch: columnWidths[key] + 2,
      }));
  
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });
      saveAs(blob, `readers_per_link.xlsx`);
    } catch (error) {
      console.error(
        "An error occurred while downloading the Excel file:",
        error
      );
    }
  };
  
  return (
    <>
      <div className="section-detail-box d-flex">
        <div className="detail_section_heading">Readers Per Link</div>
        <div className="detail_section_pages">Total: {data?.length} Pages</div>
        <button
          className="btn print"
          title="Download stats"
          onClick={() => {
            downloadExcel(data);
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
      <Accordion activeKey={activeKey} onSelect={handleAccordionToggle}>
        {data?.map((item, index) => (
          <Accordion.Item
            key={index}
            eventKey={index.toString()}
            disabled={item.count === 0}
          >
            <Accordion.Header>
              <div className="analytics-detail-view-box">
                <div className="analytics-detil-image">
                  <div>Page {item?.page}</div>
                </div>
                <div className="analytics-time-detail">
                  <div className="time-needed">
                    Link: <span>{item?.link}</span>
                  </div>
                  <div className="time-spent">
                    No of clicks: <span> {item?.count}</span>
                  </div>
                </div>
              </div>
            </Accordion.Header>
              <Accordion.Body>
                {
                  item?.data.length > 0 ?
                    <table>
                      <thead>
                        <tr>
                          <th>Ipaddress</th>
                          <th>Browser</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          item?.data?.map((substring, index) => {
                            return (
                              <tr>
                                <td>{substring?.ip_address}</td>
                                <td>{substring?.browser}</td>
                                <td>{substring?.date}</td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  :
                  null
                }
              </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
};
