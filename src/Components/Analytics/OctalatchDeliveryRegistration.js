import React, { useState, useEffect, useRef } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Highcharts from "highcharts";
import { loader } from "../../loader";
import { ENDPOINT } from "../../axios/apiConfig";
import { getData } from "../../axios/apiHelper";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import Select from "react-select";
import HighchartsReact from "highcharts-react-official";
import { Link } from "react-router-dom";
import CommonLineGraph from "./CommonLineGraph";
import CommonPieChart from "./CommonPieChart";
import axios from "axios";
exporting(Highcharts);
exportData(Highcharts);
const OctalatchDeliveryRegistration = () => {
  const [isDataFound, setIsDataFound] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [data, setData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    getDataFromApi();
  }, []);

  const getDataFromApi = async () => {
    loader("show");

    try {
      // const response = await getData(ENDPOINT.OCTALATCH_DELIVERY_REGISTRATION);

      axios.get(ENDPOINT.OCTALATCH_DELIVERY_REGISTRATION).then((response) => {
        const hadData = response?.data?.response?.data;
        const pieData = response?.data?.response?.pie_graph;

        if (hadData.length <= 0) {
          setIsDataFound(false);
          loader("hide");
          return;
        }

        const ibu = hadData?.Ibu;

        const data = hadData;

        setPieData(pieData);
        setData(data);

        setIsDataFound(true);
      });
    } catch (err) {
      setIsDataFound(false);
    }
    setIsLoaded(true);
    loader("hide");
  };

  return (
    <>
      <Col className="right-sidebar">
        {isDataFound ? (
          <div className="custom-container">
            <Row>
              <div className="top-header">
                <div className="page-title d-flex">
                  <h2>Delivery Registration </h2>
                </div>
              </div>
              <div className="create-change-content spc-content analytic-charts">
                <div className="high_charts">
                  <CommonPieChart
                    data={pieData?.pie_keys}
                    value={pieData?.pie_values}
                  />
                </div>

                {Object.keys(data)?.map((item, index) => (
                  <div className="high_charts" keys={index}>
                    <CommonLineGraph data={data[item]} name={item} />
                  </div>
                ))}
              </div>
            </Row>
          </div>
        ) : null}
      </Col>
    </>
  );
};
export default OctalatchDeliveryRegistration;
