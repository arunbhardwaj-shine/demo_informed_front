import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Tab, Tabs, Form } from "react-bootstrap";
import Highcharts from "highcharts";
import { loader } from "../../loader";
import Select from "react-select";
import { ENDPOINT } from "../../axios/apiConfig";
import { postData } from "../../axios/apiHelper";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";

import RegistrationTypeLayout from "./RegistrationTypeLayout";

exporting(Highcharts);
exportData(Highcharts);

const RegistrationType = () => {
  const [isDataFound, setIsDataFound] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [data, setData] = useState([]);

  const [All, setAll] = useState([
    { value: "", label: "All" },
    { value: "active", label: "Active" },
    { value: "expired", label: "Expired" },
  ]);

  const activeTab = useRef(1);
  useEffect(() => {
    getDataFromApi();
  }, []);

  const selectedOptions = useRef("");

  const getDataFromApi = async (tab = "view") => {
    loader("show");

    try {
      const requestBody = {
        type: "topContent",
        tab: tab,
        time: selectedOptions.current,
      };
      const response = await postData(ENDPOINT.OPENING_BY_COUNTRY, requestBody);
      const hadData = response?.data?.data;
      if (hadData.length <= 0) {
        setIsDataFound(false);
      }

      // console.log(hadData);

      setIsDataFound(true);
      setData(hadData);
      setIsLoaded(true);

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
    setIsLoaded(false);

    loader("show");

    activeTab.current = event;
    if (event === 1) {
      getDataFromApi("view");
    } else if (event === 2) {
      getDataFromApi("reader");
    }
    // loader("hide");
  };

  const filterDataByStatus = (e) => {
    setIsLoaded(false);

    selectedOptions.current = e.value;
    if (activeTab.current === 1) {
      getDataFromApi("view");
    } else if (activeTab.current === 2) {
      getDataFromApi("reader");
    }
  };

  return (
    <>
      <Col className="right-sidebar">
        {isDataFound ? (
          <div className="custom-container">
            <Row>
              <div className="create-change-content spc-content analytic-charts">
                <div className="form_action">
                  <Form className="product-unit d-flex justify-content-between align-items-center">
                    <div className="form-group">
                      <label htmlFor="">Filter By</label>
                      <Select
                        options={All}
                        placeholder="All"
                        onChange={filterDataByStatus}
                        className="dropdown-basic-button split-button-dropup"
                      />
                    </div>
                  </Form>
                </div>
                <div className="delivery-trends">
                  <Tabs
                    defaultActiveKey={activeTab.current}
                    onSelect={handleTabChange}
                  >
                    <Tab eventKey="1" title="Views">
                      <RegistrationTypeLayout
                        data={activeTab.current === 1 ? data : null}
                      />
                    </Tab>
                    <Tab eventKey="2" title="Readers">
                      <RegistrationTypeLayout
                        data={activeTab.current === 2 ? data : null}
                      />
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </Row>
          </div>
        ) : isLoaded ? (
          <h4>No Data Found</h4>
        ) : null}
      </Col>
    </>
  );
};
export default RegistrationType;
