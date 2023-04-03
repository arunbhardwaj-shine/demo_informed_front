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
import "./highchart.css";

exporting(Highcharts);
exportData(Highcharts);

const SalesByCountry = () => {
  const [data, setData] = useState({});
  const [isDataFound, setIsDataFound] = useState(false);
  Highcharts.setOptions({
    colors: ['#FFBE2C', '#F58289', '#00D4C0', '#D61975', '#0066BE', '#FFBE2C', '#F0EEE4','#00003C']
  });
  
  const [isLoaded, setIsLoaded] = useState(false);
  
  const chart = useRef(null);
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
  const dataType = useRef(null);
  
  const years = useRef(null);
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
        dataType: dataType.current,
        year: years.current,
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
    dataType.current = e.value;
    setIsDataFound(false);
    getDataFromApi();
  };
  
  const filterDataByYears = (e) => {
    years.current = e.value;
    setIsDataFound(false);
    getDataFromApi();
  };

  return (
    <>
      <Col className="right-sidebar">
         <Row>
              <div className="form-group d-flex align-items-center">
                <label htmlFor="">Filter By</label>
                <div className="d-flex">
                  <Select
                    options={All}
                    placeholder="All"
                    onChange={filterDataByDataType}
                 
                    className="dropdown-basic-button split-button-dropup mr-2"
                    isClearable
                  />
                  <Select
                    options={Years}
                    
                    placeholder="Years"
                    onChange={filterDataByYears}
                    className="dropdown-basic-button split-button-dropup"
                    isClearable
                  />
                </div>
              </div>
            </Row>
        {isDataFound ? (
          <div className="custom-container">
           

            <Row>
              <div className="page-top-nav">
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
