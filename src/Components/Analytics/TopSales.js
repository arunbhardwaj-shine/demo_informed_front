import React, { useState, useEffect, useRef } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Highcharts from "highcharts";
import { loader } from "../../loader";
import { postData } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import Select from "react-select";

import HighchartsReact from "highcharts-react-official";
import { Link } from "react-router-dom";

exporting(Highcharts);
exportData(Highcharts);

const TopSales = () => {
  const [isDataFound, setIsDataFound] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [All, setAll] = useState([
    { value: "", label: "All" },
    { value: "live", label: "Live" },
    { value: "expired", label: "Expired" },
  ]);
  // const [Year, setYear] = useState([
  //   { value: "", label: "All" },
  //   { value: "2023", label: "2023" },
  //   { value: "2022", label: "2022" },
  //   { value: "2021", label: "2021" },
  //   { value: "2020", label: "2020" },
  //   { value: "2019", label: "2019" },
  // ]);

  const [years, setYears] = useState([{ value: "", label: "All" }]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 2019;
    const yearsList = [];

    for (let i = currentYear; i >= startYear; i--) {
      yearsList.push({ value: i.toString(), label: i.toString() });
    }

    setYears([...years, ...yearsList]);
  }, []);

  const dataType = useRef(All[0]);
  const year = useRef(years[0]);
  const userType = useRef("topSales");
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
  const [topSaleOptions, setTopSaleOptions] = useState({
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
      text: "Top Sales",
    },
    xAxis: {
      categories: [],
    },
    credits: {
      enabled: false,
    },
    exporting: {
      showTable: true,
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
    try {
      loader("show");

      if (dataType?.current?.value == "" && year?.current?.value == "") {
        userType.current = "topSales";
      } else {
        userType.current = "topSalesAjax";
      }
      let data = {
        type: userType.current,
        dataType: dataType?.current?.value ? dataType?.current?.value : "",
        year: year?.current?.value ? year?.current?.value : "",
      };

      const response = await postData(ENDPOINT.TOPSALES, data);

      const hadData = response?.data?.data;
      if (hadData?.name?.length <= 0) {
        setIsDataFound(false);
      } else {
        setIsDataFound(true);
      }

      const categories = hadData?.name;
      const newSeries = [
        {
          name: `Readers (${hadData?.readerTotal})`,
          data: hadData?.reader,
          color: Highcharts?.getOptions()?.colors[1],
        },
        {
          name: `Views (${hadData?.viewTotal})`,
          data: hadData?.view,
          color: Highcharts?.getOptions()?.colors[2],
        },
        {
          name: `Quantity Sold (${hadData?.soldTotal})`,
          data: hadData?.sold,
          color: Highcharts?.getOptions()?.colors[0],
        },
      ];

      const newSaleOptions = {
        ...topSaleOptions,
        xAxis: { categories: categories },
        series: newSeries,
      };

      setTopSaleOptions(newSaleOptions);
      setIsLoaded(true);
      loader("hide");
    } catch (err) {
      setIsDataFound(false);
      console.log(err);
      loader("hide");
    }
  };

  const filterDataByDataType = (e) => {
    setIsLoaded(false);
    dataType.current = e;
    setIsDataFound(false);
    getDataFromApi(e.value);
  };
  const filterDataByYear = (e) => {
    setIsLoaded(false);
    year.current = e;
    setIsDataFound(false);
    getDataFromApi();
  };

  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="top-header">
              <div className="page-title d-flex">
                <h2>Top Sales</h2>
              </div>
            </div>
            <div className="create-change-content spc-content analytic-charts">
              <div className="form_action">
                <Form className="product-unit d-flex justify-content-between align-items-center">
                  <div className="form-group ">
                    <label htmlFor="">Filter By</label>
                    <Select
                      options={All}
                      placeholder="All"
                      onChange={filterDataByDataType}
                      className="dropdown-basic-button split-button-dropup"
                      isClearable
                    />
                    <Select
                      options={years}
                      placeholder="Year"
                      onChange={filterDataByYear}
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
                    options={topSaleOptions}
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
export default TopSales;
