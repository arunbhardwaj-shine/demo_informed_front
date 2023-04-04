import React, { useState, useEffect, useRef } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { loader } from "../../loader";
import { postData } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import Select from "react-select";
import { Link } from "react-router-dom";

exporting(Highcharts);
exportData(Highcharts);

const TopReseller = () => {
  const [isDataFound, setIsDataFound] = useState(false);

  const [All, setAll] = useState([
    { value: "", label: "All" },
    { value: "live", label: "Live" },
    { value: "expired", label: "Expired" },
  ]);
  const [Year, setYear] = useState([
    { value: "", label: "All" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
    { value: "2019", label: "2019" },
  ]);
  const dataType = useRef(All[0]);
  const year = useRef(Year[0]);
  // const [userType, setUserType] = useState("topSeller");
  const userType = useRef("topSeller");
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
  const [topResellerOptions, setTopResellerOptions] = useState({
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
      text: "Top Reseller",
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
        type: userType.current,
        dataType: dataType.current,
        year: year.current,
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

  const filterDataByDataType = (e) => {
    if (!e?.value == "") {
      userType.current = "topSellerAjax";
    } else if (e?.value == "") {
      userType.current = "topSeller";
    }
    dataType.current = e?.value;
    setIsDataFound(false);
    getDataFromApi();
  };
  const filterDataByYear = (e) => {
    if (!e?.value == "") {
      userType.current = "topSellerAjax";
    } else if (e?.value == "") {
      userType.current = "topSeller";
    }

    year.current = e?.value;
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
                <h2>Top reseller</h2>
              </div>
            </div>
            <div className="create-change-content spc-content analytic-charts">
              <div className="form_action">
                <Form className="product-unit d-flex justify-content-between align-items-center">
                  <div className="form-group">
                    <label htmlFor="">Filter By</label>
                    <Select
                      options={All}
                      placeholder="All"
                      onChange={filterDataByDataType}
                      className="dropdown-basic-button split-button-dropup"
                      isClearable
                    />
                    <Select
                      options={Year}
                      placeholder="Year"
                      onChange={filterDataByYear}
                      className="dropdown-basic-button split-button-dropup"
                      isClearable
                    />
                  </div>
                </Form>
              </div>
              {isDataFound ? (
                <div className="high_charts">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={topResellerOptions}
                  />
                </div>
              ) : null}
            </div>
          </Row>
        </div>
      </Col>
    </>
  );
};
export default TopReseller;
