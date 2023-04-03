import React, { useState, useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import Highcharts from "highcharts";
import { loader } from "../../loader";
import { postData } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import Select from "react-select";

import HighchartsReact from "highcharts-react-official";

exporting(Highcharts);
exportData(Highcharts);

const TopSales = () => {
  const [isDataFound, setIsDataFound] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
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
  const year = useRef(null);
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
      let data = {
        type: "topClient",
        dataType: dataType.current,
        year: year.current,
      };
      const response = await postData(ENDPOINT.TOPCLIENTS, data);

      const hadData = response?.data?.data;
      if (hadData.length <= 0) {
        setIsDataFound(false);
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
      setIsDataFound(true);
      loader("hide");
    } catch (err) {
      setIsDataFound(false);
      console.log(err);
      loader("hide");
    }
  };

  const filterDataByDataType = (e) => {
    dataType.current = e?.value;
    setIsDataFound(false);
    getDataFromApi();
  };
  const filterDataByYear = (e) => {
    year.current = e?.value;
    setIsDataFound(false);
    getDataFromApi();
  };

  return (
    <>
      <Col className="right-sidebar">
        <Row>
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
              options={Years}
              placeholder="Years"
              onChange={filterDataByYear}
              className="dropdown-basic-button split-button-dropup"
              isClearable
            />
          </div>
        </Row>
        {isDataFound ? (
          <div className="custom-container">
            <Row>
              <div className="page-top-nav">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={topSaleOptions}
                />
              </div>
            </Row>
          </div>
        ) : null}
      </Col>
    </>
  );
};
export default TopSales;
