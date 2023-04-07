import React, { useState, useEffect} from "react";
import {  Col,  Row, Tab, Tabs } from "react-bootstrap";
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

  useEffect(() => {
    getDataFromApi();
  }, []);

  const getDataFromApi = async () => {
    loader("show");

    try {
      const requestBody = {
        type: "saleCountry",
        dataType: "",
        year: "",
      };
      const response = await postData(ENDPOINT.OPENING_BY_COUNTRY, requestBody);
      const hadData = response?.data?.data;
      if (hadData.length <= 0) {
        setIsDataFound(false);
      }

   


      setIsDataFound(true);
      //   setData(hadData);

      loader("hide");
    } catch (err) {
      setIsDataFound(false);
      console.log(err);
      loader("hide");
    }
    // console.log(chart.current)
  };

  return (
    <>
      <Col className="right-sidebar">
        {isDataFound ? (
          <div className="custom-container">
            <Row>
              <Tabs defaultActiveKey="1">
                <Tab eventKey="1" title="Views">
                 <RegistrationTypeLayout/>
                </Tab>
                <Tab eventKey="2" title="Readers">
                <RegistrationTypeLayout/>
                </Tab>
              </Tabs>
            </Row>

            
          </div>
        ) : null}
      </Col>
    </>
  );
};
export default RegistrationType;
