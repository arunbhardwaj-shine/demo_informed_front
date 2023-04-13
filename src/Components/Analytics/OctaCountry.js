import React, { useState, useEffect, useRef } from 'react';
import { Col, Row, Tab, Tabs, Form } from "react-bootstrap";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { postData } from '../../axios/apiHelper';
import { ENDPOINT } from '../../axios/apiConfig';
import Select from "react-select";
import { Link } from "react-router-dom";


const OctaCountry = () => {
  // Line Chart
  const [selectedRegion, setSelectRegions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  // const selectRegionValue = useRef("EU");
  const [optionsRev, setOptionsRev] = useState({
    title: {
      text: 'Total HCPs'
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      title: {
        text: 'Number of Visitors'
      }
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      x: 0,
      y: 0
    },
    plotOptions: {
      series: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
          format: "{point.y}"
        }
      },
    },
    series: []
  });

  // for bar chart
  const [optionBar, setOptionBar] = useState({
    chart: {
      type: 'bar',
      height: '50%'
    },
    title: {
      text: 'Sales by Product Category'
    },
    xAxis: {
      categories: [],
    },
    yAxis: {
      title: {
        text: 'Total Sales'
      },
      showZero: true
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      x: 0,
      y: 0
    },
    plotOptions: {
      series: {
        // stacking: 'normal'
      }
    },
    series: []
  });

  // const selectRegionValue = useRef("EU");
  // const selectCountryValue = useRef("Austria");
  // const getCountry = useRef(null);


  
    const getDataFromApi = async () => {
      try {
        const region = "EU";
        const country = "Austria";
        const response = await postData(ENDPOINT.STATEBYREGION, { region, country });
        const data = response.data.data;
        console.log(data);

        // setSelectRegions(data.uniqueRegions);
        // setSelectedCountry(Object.entries(data.countryRegionArray));
        // for line chart
        const lineSeries = [
          {
            data: JSON.parse(data.haematology_data_rev),
          },
        ];
        const lineCategories = JSON.parse(data.haematology_month_re);
        const newLineOptions = {
          ...optionsRev,
          xAxis: {
            categories: lineCategories,
          },
          series: lineSeries,
        };
        setOptionsRev(newLineOptions);

        // for bar chart

        const barSeries = [
          {
            data: JSON.parse(data.haematology_data).reverse(),

          },
        ];
        const barCategory = JSON.parse(data.haematology_t_month).reverse();

        const newBarOption = {
          ...optionBar,
          xAxis: {
            categories: barCategory,
          },
          series: barSeries,
        };
        setOptionBar(newBarOption);


      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      // console.log(getCountry.current);
      getDataFromApi();
         }, []);


  return (
    <Col className="right-sidebar">
      <div className="custom-container">
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
          </div>
        </div>
        <Row>
          <div className="create-change-content spc-content analytic-charts">
            
            <div className="high_charts">
              <HighchartsReact highcharts={Highcharts} options={optionsRev} />
            </div>
            <div className="high_charts">
              <HighchartsReact highcharts={Highcharts} options={optionBar} />
            </div>
          </div>
        </Row>
      </div>
    </Col>
  );
};

export default OctaCountry;