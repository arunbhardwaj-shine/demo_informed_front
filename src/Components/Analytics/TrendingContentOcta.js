import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";

import Highcharts from "highcharts";
import { loader } from "../../loader";

import { ENDPOINT } from "../../axios/apiConfig";
import { postData } from "../../axios/apiHelper";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";

import DocintelAccount from "./DocintelAccount";
const TrendingContentOcta = () => {
  const [data, setData] = useState({});
  const [isDataFound, setIsDataFound] = useState(false);

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
    getDataFromApi();
  }, []);

  const getDataFromApi = async (type = "all") => {
    loader("show");

    try {
      //   let requestBody
      //   if(localStorage.getItem("user_id")=="iSnEsKu5gB/DRlycxB6G4g=="){

      //   }

      const requestBody = {
        type: "octa",
      };
      const response = await postData(ENDPOINT.CONTENTTYPE, requestBody);
      const hadData = response?.data?.data;
      if (hadData.length <= 0) {
        setIsDataFound(false);
      }

      setIsDataFound(true);
      setIsLoaded(true);
      setData(hadData);

      loader("hide");
    } catch (err) {
      setIsDataFound(false);
      // console.log(err);
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
              <div className="delivery-trends">
                <div className="custom-container">
                  <h3>Trending Content Based On Read Through Rate </h3>
                  <DocintelAccount data={data} />
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
export default TrendingContentOcta;
