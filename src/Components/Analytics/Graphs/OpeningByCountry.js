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
const OpeningByCountry = () => {
  const [data, setData] = useState({});
  const [isDataFound, setIsDataFound] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const chart = useRef(null);
  Highcharts.setOptions({
    colors: ['#FFBE2C', '#F58289', '#00D4C0', '#D61975', '#0066BE', '#FFBE2C', '#F0EEE4','#00003C']
  });
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
      text: "Country Stats",
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
    getDataFromApi();
  }, []);

  const getDataFromApi = async (filter = "") => {
    loader("show");

    try {
      const requestBody = {
        type: "Openingcountry",
        filter: filter,
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
    console.log(chart.current);
  };

  const filterData = (e) => {
    setIsDataFound(false);

    getDataFromApi(e.value);
  };

  return (
    <>
      <Col className="right-sidebar">
        <Row>
          <div className="form-group ">
            <Select
              options={data?.pdfData?.map((pdf) => ({
                label: pdf.title,
                value: pdf.id,
              }))}
              placeholder="Filter By"
              onChange={filterData}
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
export default OpeningByCountry;
