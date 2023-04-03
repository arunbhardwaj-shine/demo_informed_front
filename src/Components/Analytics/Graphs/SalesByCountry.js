import React, { useState, useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import Highcharts from "highcharts";
import { loader } from "../../../loader";

import { ENDPOINT } from "../../../axios/apiConfig";
import { postData } from "../../../axios/apiHelper";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import Select from "react-select";

import HighchartsReact from "highcharts-react-official";

exporting(Highcharts);
exportData(Highcharts);

const SalesByCountry = () => {
  const [data, setData] = useState({});
  const [isDataFound, setIsDataFound] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const  chart=useRef(null)
  const [All, setAll] = useState([
    { value: "live", label: "Live" },
    { value: "expired", label: "Expired" },
  ]);
  const [Years, setYears] = useState([
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
    { value: "2019", label: "2019" },
  ]);

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
      text: "Sales By Country",
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

  const getDataFromApi = async (filter = "") => {

    loader("show");

    try {
      const requestBody = {
        type: "saleCountry",
        filter: filter,
        dataType: "live",
        year: 2023,
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
    console.log(chart.current)
  };

  const filterData = (e) => {
    getDataFromApi(e.value);
  };

  return (
    <>
      <Col className="right-sidebar">
        {isDataFound ? (
          <div className="custom-container">
            <Row>
              <div className="form-group ">
                <label htmlFor="">Filter By</label>
                <Select
                  options={All}
                  placeholder="All"
                  onChange={filterData}
                  className="dropdown-basic-button split-button-dropup"
                  isClearable
                />
                <Select
                  options={Years}
                  placeholder="Filter By"
                  onChange={filterData}
                  className="dropdown-basic-button split-button-dropup"
                  isClearable
                />
              </div>
            </Row>
            
            <Row>
              <div className="page-top-nav" >
                <HighchartsReact
                  highcharts={Highcharts}
                  options={topClientOptions}
                  ref={chart}
                />
              </div>
            </Row>
          </div>
        ) : null}
      </Col>
    </>
  );
};
export default SalesByCountry;
