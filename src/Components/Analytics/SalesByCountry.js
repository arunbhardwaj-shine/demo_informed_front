import React, { useState, useEffect, useRef } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Highcharts from "highcharts";
import { loader } from "../../loader";

import { ENDPOINT } from "../../axios/apiConfig";
import { postData } from "../../axios/apiHelper";
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
  const selectFilterType = useRef("saleCountry");

  const chart = useRef(null);
  const [All, setAll] = useState([
    { value: "", label: "All" },
    { value: "live", label: "Live" },
    { value: "expired", label: "Expired" },
  ]);
  const [year, setYears] = useState([{ value: "", label: "All" }]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 2019;
    const yearsList = [];

    for (let i = currentYear; i >= startYear; i--) {
      yearsList.push({ value: i.toString(), label: i.toString() });
    }

    setYears([...year, ...yearsList]);
  }, []);
  const dataType = useRef(All[0]);

  const years = useRef(year[0]);
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
    window.scrollTo(0, 0);
    getDataFromApi();
  }, []);

  const getDataFromApi = async () => {
    loader("show");

    try {
      if (dataType?.current?.value == "" && years?.current?.value == "") {
        selectFilterType.current = "saleCountry";
      } else {
        selectFilterType.current = "saleCountryFilter";
      }
      const requestBody = {
        type: selectFilterType.current,
        dataType: dataType?.current?.value ? dataType?.current?.value : "",
        year: years?.current?.value ? years.current.value : "",
      };
      const response = await postData(ENDPOINT.OPENING_BY_COUNTRY, requestBody);
      const hadData = response?.data?.data;

      if (hadData?.name?.length <= 0) {
        setIsDataFound(false);
      } else {
        setIsDataFound(true);
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

  const filterDataByDataType = (e) => {
    setIsLoaded(false);
    dataType.current = e;
    setIsDataFound(false);
    getDataFromApi();
  };

  const filterDataByYears = (e) => {
    setIsLoaded(false);
    years.current = e;
    setIsDataFound(false);
    getDataFromApi();
  };

  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            {/* <div className="top-header">
              <div className="page-title d-flex">
                <h2>Sales by country</h2>
              </div>
            </div> */}
            <div className="create-change-content spc-content analytic-charts">
              <div className="form_action">
                <Form className="product-unit d-flex justify-content-between align-items-center">
                  <div className="form-group d-flex align-items-center">
                    <label htmlFor="">Filter By</label>
                    <Select
                      options={All}
                      placeholder="All"
                      onChange={filterDataByDataType}
                      // defaultValue={
                      //   dataType?.current ? dataType?.current : null
                      // }
                      name="first"
                      className="dropdown-basic-button split-button-dropup mr-2"
                      isClearable
                    />
                    <Select
                      options={year}
                      name="years"
                      placeholder="Year"
                      onChange={filterDataByYears}
                      // defaultValue={years?.current ? years?.current : null}
                      className="dropdown-basic-button split-button-dropup"
                      isClearable
                    />
                  </div>
                </Form>
              </div>
              {isDataFound ? (
                <div className="high_charts space-added">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={topClientOptions}
                    ref={chart}
                  />
                </div>
              ) : isLoaded ? (
                <div className="no_found">
                  <p>No Data Found</p>
                </div>
              ) : null}
            </div>
          </Row>
        </div>
      </Col>
    </>
  );
};
export default SalesByCountry;
