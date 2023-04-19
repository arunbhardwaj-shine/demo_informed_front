import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Tab, Tabs, Form} from "react-bootstrap";
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

  const [data, setData] = useState([]);
  const [sectionLoader, setSectionLoader] = useState(false);
  const [apiCallStatus, setApiCallStatus] = useState(false);
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

  const getDataFromApi = async (tab="view") => {
    setSectionLoader(true);
    setApiCallStatus(false);
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
      setIsDataFound(true);
      setData(hadData);
      setSectionLoader(false);
    } catch (err) {
      setIsDataFound(false);
      console.log(err);
      setSectionLoader(false);
    }
    setApiCallStatus(true);
  };

  const handleTabChange = (event) => {
    setIsDataFound(false);
    setSectionLoader(true);
    activeTab.current = event;
    if (event === 1) {
      getDataFromApi("view");
    } else if (event === 2) {
      getDataFromApi("reader");
    }
  };

  const filterDataByStatus = (e) => {
    setIsDataFound(false);
    setSectionLoader(true);
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

        {/*isDataFound ? (*/}
        {/*data.length > 0 ? (*/}
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
                  <div className="tabs_content_load">
                    <Tabs
                      defaultActiveKey={activeTab.current}
                      onSelect={handleTabChange}
                    >
                      <Tab eventKey="1" title="Views">
                        {isDataFound && data.length > 0 ? (
                          <RegistrationTypeLayout  data={activeTab.current==1?data:null} />
                        ) :
                        apiCallStatus ?
                        <div className="no_found">
                               <p>No Data Found</p>
                         </div>
                         : null
                       }
                      </Tab>
                      <Tab eventKey="2" title="Readers">
                      {isDataFound && data.length > 0 ? (
                        <RegistrationTypeLayout  data={activeTab.current==2?data:null}  />
                      ) :
                      apiCallStatus ?
                      <div className="no_found">
                             <p>No Data Found</p>
                       </div>
                       : null
                     }
                      </Tab>
                    </Tabs>

                    {
                      sectionLoader ?
                      <div className={"loader tab-inside "+ (sectionLoader ? 'show' : '')} id="custom_loader">
                        <div className="loader_show"><span className="loader-view"> </span></div>
                      </div>
                      : ''
                    }
                  </div>
                </div>
              </div>
            </Row>
          </div>
          {
            /*) :
              apiCallStatus ?
              <div className="no_found">
                     <p>No Data Found</p>
               </div>
               : null*/
          }
      </Col>
    </>
  );
};
export default RegistrationType;
