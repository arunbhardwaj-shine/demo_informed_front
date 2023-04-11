import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import Highcharts from "highcharts";
import { loader } from "../../loader";

import { ENDPOINT } from "../../axios/apiConfig";
import { postData } from "../../axios/apiHelper";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";

import RegistrationTypeLayout from "./RegistrationTypeLayout";

exporting(Highcharts);
exportData(Highcharts);

const RegistrationType = () => {
  const [isDataFound, setIsDataFound] = useState(false);
  const [data, setData] = useState([]);

  const activeTab = useRef(1);
  useEffect(() => {
    getDataFromApi();
  }, []);

  const getDataFromApi = async (tab="view") => {
    loader("show");

    try {
      const requestBody = {
        type: "topContent",
        tab: tab,
        time: "",
      };
      const response = await postData(ENDPOINT.OPENING_BY_COUNTRY, requestBody);
      const hadData = response?.data?.data;
      if (hadData.length <= 0) {
        setIsDataFound(false);
      }

      console.log(hadData);

      setIsDataFound(true);
        setData(hadData);

      loader("hide");
    } catch (err) {
      setIsDataFound(false);
      console.log(err);
      loader("hide");
    }
    // console.log(chart.current)
  };

  const handleTabChange = (event) => {
    setIsDataFound(false);
    loader("show");

    activeTab.current = event;
    if (event == 1) {
      getDataFromApi("view");
    } else if (event == 2) {
      getDataFromApi("reader");
    } 
    // loader("hide");
  };

  return (
    <>
      <Col className="right-sidebar">
        {isDataFound ? (
          <div className="custom-container">
            <Row>
              <div className="create-change-content spc-content analytic-charts">
                <div className="delivery-trends">
                  <Tabs
                    defaultActiveKey={activeTab.current}
                    onSelect={handleTabChange}
                  >
                    <Tab eventKey="1" title="Views">
                      <RegistrationTypeLayout  data={activeTab.current==1?data:null}/>
                    </Tab>
                    <Tab eventKey="2" title="Readers">
                      <RegistrationTypeLayout  data={activeTab.current==2?data:null} />
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </Row>
          </div>
        ) : null}
      </Col>
    </>
  );
};
export default RegistrationType;
