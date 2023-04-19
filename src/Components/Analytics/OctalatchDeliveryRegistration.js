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
  const [month, setMonth] = useState();

  useEffect(() => {
    getDataFromApi();
  }, []);

  const getDataFromApi = async () => {
    loader("show");

    try {
      // const response = await getData(ENDPOINT.OCTALATCH_DELIVERY_REGISTRATION);

      axios
        .get(ENDPOINT.OCTALATCH_DELIVERY_REGISTRATION)
        .then((response) => {
          const hadData = response?.data?.response?.data;
          const pieData = response?.data?.response?.pie_graph;

          if (hadData.length <= 0) {
            setIsDataFound(false);
            loader("hide");
            return;
          }

          const ibu = hadData?.Ibu;

          const data = hadData;

          const months = ibu?.IBU_Docintel_code?.months;

          setPieData(pieData);
          setData(data);
          setMonth(months);

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
                  <h2>Delivery Registration </h2>
                </div>
              </div>
              <div className="create-change-content spc-content analytic-charts">
                <div className="high_charts">
                  <CommonPieChart data={pieData} />
                </div>

                {Object.keys(data)?.map((item, index) => (
                  <div className="high_charts" keys={index}>
                    <CommonLineGraph
                      data={data[item]}
                      name={item}
                      months={month}
                    />
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
