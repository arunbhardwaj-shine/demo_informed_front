import Highcharts from "highcharts";
import React, { useEffect, useRef, useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { ENDPOINT } from "../../axios/apiConfig";
import { postData } from "../../axios/apiHelper";

import DocintelAccount from "./DocintelAccount";
const TrendingContent = () => {
  const [data, setData] = useState({});
  const [isDataFound, setIsDataFound] = useState(false);
  const [sectionLoader, setSectionLoader] = useState(false);
  const [apiCallStatus, setApiCallStatus] = useState(false);
  const [isSunshineAccount,setIsSunshineAccount]=useState(localStorage.getItem("account_type")=="USA_PHARMA"?true:false)

  Highcharts.setOptions({
    colors: [
      "#FFBE2C",
      "#F58289",
      "#00D4C0",
      "#D61975",
      "#0066BE",
      "#FFBE2C",
      "#F0EEE4",
      "#00003C",
    ],
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const activeTab = useRef(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    getDataFromApi();
  }, []);

  const getDataFromApi = async (type = "all") => {
    setSectionLoader(true);
    setApiCallStatus(false);
    try {
      const requestBody = {
        // type: type,
        type:isSunshineAccount?"sunshine": type,
      };
      let analyticsRoute=isSunshineAccount?ENDPOINT.USA_CONTENT:ENDPOINT.CONTENT
      const response = await postData(analyticsRoute, requestBody);
      const hadData = response?.data?.data;
      if (hadData.length <= 0) {
        setIsDataFound(false);
      }

      setIsDataFound(true);

      setData(hadData);

      setSectionLoader(false);
    } catch (err) {
      setIsDataFound(false);
      setSectionLoader(false);
    }
    setApiCallStatus(true);
  };

  const handleTabChange = (event) => {
    setIsDataFound(false);
    setSectionLoader(true);

    activeTab.current = event;
    if (event == 1) {
      getDataFromApi("all");
    } else if (event == 2) {
      getDataFromApi("haematology");
    } else if (event == 3) {
      getDataFromApi("critcal_care");
    } else if (event == 4) {
      getDataFromApi("immunology");
    } else if (event == 5) {
      getDataFromApi("ibu");
    }
  };

  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="top-header">
             
            </div>
            <div className="distribute-page-reader">
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="512.000000pt"
                height="512.000000pt"
                viewBox="0 0 512.000000 512.000000"
              >
                {" "}
                <g
                  transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                  fill="#0066be"
                  stroke="none"
                >
                  {" "}
                  <path d="M3455 4786 c-94 -41 -124 -169 -58 -247 46 -55 69 -59 320 -59 l228 -1 -175 -172 c-736 -724 -1646 -1247 -2689 -1547 -210 -61 -237 -74 -267 -132 -18 -35 -18 -101 1 -137 21 -41 70 -79 113 -87 44 -9 133 13 392 92 361 111 670 235 1020 410 636 317 1162 691 1683 1194 l136 131 3 -225 c3 -209 4 -227 24 -252 39 -53 71 -69 134 -69 63 0 95 16 134 69 21 27 21 38 21 486 0 448 0 459 -21 486 -11 15 -33 37 -48 48 -27 20 -40 21 -474 23 -356 2 -453 0 -477 -11z"></path>{" "}
                  <path d="M3740 3024 c-100 -36 -172 -110 -204 -210 -15 -44 -16 -161 -14 -1154 l3 -1105 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 1125 0 1125 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z"></path>{" "}
                  <path d="M2140 2224 c-100 -36 -172 -110 -204 -210 -15 -43 -16 -128 -14 -754 l3 -705 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 725 0 725 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z"></path>{" "}
                  <path d="M540 1744 c-100 -36 -172 -110 -205 -210 -14 -43 -15 -107 -13 -514 l3 -465 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 485 0 485 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z"></path>{" "}
                </g>{" "}
              </svg>
              <p>
                Trends are based on Read-Through-Rate quantity, meaning which
                content have had any kind of reading by individual HCPs.
              </p>
            </div>
            <div className="create-change-content spc-content analytic-charts">
              <div className="delivery-trends">
                <div className="tabs_content_load">
                  {!isSunshineAccount?
                  <Tabs
                    defaultActiveKey={activeTab.current}
                    onSelect={handleTabChange}
                  >
                    <Tab eventKey="1" title="All Business Units">
                      {isDataFound && data.length > 0 ? (
                        <DocintelAccount
                          data={activeTab.current == 1 ? data : null}
                        />
                      ) : apiCallStatus ? (
                        <div className="no_found">
                          <p>No Data Found</p>
                        </div>
                      ) : null}
                    </Tab>
                    <Tab eventKey="2" title="Haematology">
                      {isDataFound && data.length > 0 ? (
                        <DocintelAccount
                          data={activeTab.current == 2 ? data : null}
                        />
                      ) : apiCallStatus ? (
                        <div className="no_found">
                          <p>No Data Found</p>
                        </div>
                      ) : null}
                    </Tab>
                    <Tab eventKey="3" title="Critical Care">
                      {isDataFound && data.length > 0 ? (
                        <DocintelAccount
                          data={activeTab.current == 3 ? data : null}
                        />
                      ) : apiCallStatus ? (
                        <div className="no_found">
                          <p>No Data Found</p>
                        </div>
                      ) : null}
                    </Tab>
                    <Tab eventKey="4" title="Immunotherapy">
                      {isDataFound && data.length > 0 ? (
                        <DocintelAccount
                          data={activeTab.current == 4 ? data : null}
                        />
                      ) : apiCallStatus ? (
                        <div className="no_found">
                          <p>No Data Found</p>
                        </div>
                      ) : null}
                    </Tab>
                    <Tab eventKey="5" title="IBU">
                      {isDataFound && data.length > 0 ? (
                        <DocintelAccount
                          data={activeTab.current == 5 ? data : null}
                        />
                      ) : apiCallStatus ? (
                        <div className="no_found">
                          <p>No Data Found</p>
                        </div>
                      ) : null}
                    </Tab>
                  </Tabs>
                  :
                  isDataFound && data.length > 0 ? (
                    <div className="sunshine-content">
                    <DocintelAccount
                      data={activeTab.current == 1 ? data : null}
                    />
                    </div>
                  ) : apiCallStatus ? (
                    <div className="no_found">
                      <p>No Data Found</p>
                    </div>
                  ) : null}
                  {sectionLoader ? (
                    <div
                      className={
                        "loader tab-inside " + (sectionLoader ? "show" : "")
                      }
                      id="custom_loader"
                    >
                      <div className="loader_show">
                        <span className="loader-view"> </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </Row>
        </div>
      </Col>
    </>
  );
};
export default TrendingContent;

 
