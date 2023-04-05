import React, { useState, useEffect, useRef } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Highcharts from "highcharts";
import { loader } from "../../../loader";

import { ENDPOINT } from "../../../axios/apiConfig";
import { postData } from "../../../axios/apiHelper";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import Select from "react-select";

import HighchartsReact from "highcharts-react-official";
import { Link } from "react-router-dom";

exporting(Highcharts);
exportData(Highcharts);

const SalesByCountry = () => {
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

  const chart = useRef(null);
  const [All, setAll] = useState([
    { value: "", label: "All" },
    { value: "live", label: "Live" },
    { value: "expired", label: "Expired" },
  ]);
  const [Years, setYears] = useState([
    { value: "", label: "All" },

    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
    { value: "2019", label: "2019" },
  ]);
  const dataType = useRef(All[0]);

  const years = useRef(Years[0]);
  const [topClientOptions, setTopClientOptions] = useState({
    chart: {
      marginTop: 100,
      type: "bar",
      events: {
        load: function () {
          let categoryHeight = 35;
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
      text: " ",
    },
    xAxis: {
      categories: [],
    },
    credits: {
      enabled: false,
    },
    exporting: {
      showHighchart: true,
      showTable: false,
      tableCaption: "",
    },
    legend: {
      reversed: true,
      align: "center",
      verticalAlign: "top",
      floating: true,
      x: 0,
      y: 50,
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

    series: [],
  });

  useEffect(() => {
    getDataFromApi();
  }, []);

  const getDataFromApi = async () => {
    loader("show");

    try {
      const requestBody = {
        type: "saleCountry",
        dataType: dataType?.current?.value ? dataType?.current?.value : "",
        year: years?.current?.value ? years.current.value : "",
      };
      const response = await postData(ENDPOINT.OPENING_BY_COUNTRY, requestBody);
      const hadData = response?.data?.data;
      if (hadData.length <= 0) {
        setIsDataFound(false);
      }

      const categories = hadData?.name;

      const newSeries = [
        {
          name: `Readers (${hadData.readerTotal})`,
          data: hadData.reader,
          color: Highcharts.getOptions().colors[1],
        },
        {
          name: `Views (${hadData.viewTotal})`,
          data: hadData.view,
          color: Highcharts.getOptions().colors[2],
        },
        {
          name: `Quantity Sold (${hadData.soldTotal})`,
          data: hadData.sold,
          color: Highcharts.getOptions().colors[0],
        },
      ];

      const newClientOptions = {
        ...topClientOptions,
        xAxis: { categories: categories },
        series: newSeries,
        exporting: { showTable: true },
      };

      setTopClientOptions(newClientOptions);

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

  const filterDataByDataType = (e) => {
    dataType.current = e;
    setIsDataFound(false);
    getDataFromApi();
  };

  const filterDataByYears = (e) => {
    years.current = e;
    setIsDataFound(false);
    getDataFromApi();
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
                  <h2>Sales by country</h2>
                </div>
              </div>
              <div className="create-change-content spc-content analytic-charts">
                <div className="form_action">
                  <Form className="product-unit d-flex justify-content-between align-items-center">
                    <div className="form-group d-flex align-items-center">
                      <label htmlFor="">Filter By</label>
                      <Select
                        options={All}
                        placeholder="All"
                        onChange={filterDataByDataType}
                        defaultValue={
                          dataType?.current ? dataType?.current : null
                        }
                        name="first"
                        className="dropdown-basic-button split-button-dropup mr-2"
                        isClearable
                      />
                      <Select
                        options={Years}
                        name="years"
                        placeholder="Filter By"
                        onChange={filterDataByYears}
                        defaultValue={years?.current ? years?.current : null}
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                      />
                    </div>
                  </Form>
                </div>

                <div className="high_charts">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={topClientOptions}
                    ref={chart}
                  />
                </div>
              </div>
            </Row>
          </div>
        ) : null}
      </Col>
    </>
  );
};
export default SalesByCountry;
