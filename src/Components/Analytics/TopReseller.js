import React, { useState, useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { loader } from "../../loader";
import { postData } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import Select from "react-select";

exporting(Highcharts);
exportData(Highcharts);

const TopReseller = () => {
  const [isDataFound, setIsDataFound] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const dataFetchedRef = useRef(false);
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
  const [topResellerOptions, setTopResellerOptions] = useState({
    chart: {
      marginTop: 100,
      type: "bar",
      events: {
        load: function () {
          let categoryHeight = 25;
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
      text: "Top Reseller",
    },
    xAxis: {
      categories: [],
    },
    credits: {
      enabled: false,
    },
    exporting: {
      showHighchart: true,
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
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getDataFromApi();
  }, []);

  const getDataFromApi = async (filter = "") => {
    try {
      loader("show");
      let data = {
        type: "topSeller",
        filter: filter,
      };
      const response = await postData(ENDPOINT.TOPRESELLER, data);
      const hadData = response?.data?.data;
      if (hadData.length <= 0) {
        setIsDataFound(false);
      }
      const categories = hadData?.name;
      const newSeries = [
        {
          name: `Readers (${hadData?.readerTotal})`,
          data: hadData?.reader,
          color: Highcharts.getOptions().colors[1],
        },
        {
          name: `Views (${hadData?.viewTotal})`,
          data: hadData?.view,
          color: Highcharts.getOptions().colors[2],
        },
        {
          name: `Quantity Sold (${hadData?.soldTotal})`,
          data: hadData?.sold,
          color: Highcharts.getOptions().colors[0],
        },
      ];

      const newResellerOptions = {
        ...topResellerOptions,
        xAxis: { categories: categories },
        series: newSeries,
      };
      setTopResellerOptions(newResellerOptions);
      setIsDataFound(true);
      loader("hide");
    } catch (err) {
      setIsDataFound(false);
      console.log(err);
      loader("hide");
    }
  };

  const filterData = (e) => {
    // console.log(e);
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
              <div className="page-top-nav">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={topResellerOptions}
                />
              </div>
            </Row>
          </div>
        ) : null}
      </Col>
    </>
  );
};
export default TopReseller;
