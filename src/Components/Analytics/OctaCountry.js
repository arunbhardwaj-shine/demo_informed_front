import React, { useState, useEffect, useRef } from 'react';
import { Col, Row, Tab, Tabs, Form } from "react-bootstrap";
import { postData } from '../../axios/apiHelper';
import { ENDPOINT } from '../../axios/apiConfig';
import Select from "react-select";
import { Link } from "react-router-dom";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { loader } from "../../loader";


const OctaCountry = () => {
  // Line Chart
  const [selectedRegion, setSelectRegions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectCountryByRegion, setSelectCountryByRegion] = useState([]);
  const [selectRegionVal, setSelectRegionVal] = useState("");
  const [isDataFound, setIsDataFound] = useState(false);
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
      enabled: true,
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
      text: ''
    },
    xAxis: {
      categories: [],
    },
    exporting: {
      showTable: true,
      tableCaption: '',
    },
    yAxis: {
      title: {
        text: 'Total Sales'
      },
      showZero: true
    },
    legend: {
      enabled: true,
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      x: 0,
      y: 0
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },

    series: []
  });

  const selectRegionValue = useRef("EU");
  const selectCountryValue = useRef("Austria");
  const getCountry = useRef(null);



  const getDataFromApi = async () => {
    try {
      loader("show");
      const region = selectRegionValue.current;
      const country = selectCountryValue.current;
      const payload = { region, country };

      const response = await postData(ENDPOINT.STATEBYREGION, { region, country });
      const data = response.data.data;

      setSelectRegions(data.uniqueRegions);
      setSelectedCountry(Object.entries(data.countryRegionArray));
      // for line chart
      const lineData = JSON.parse(data.haematology_data_rev);

      const lastValue = lineData[lineData.length - 1];
      const lineSeries = [
        {
          name: country + '(' + lastValue + ')',
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
      const barData = JSON.parse(data.haematology_data);
      const totalValue = barData.reduce((acc, curr) => acc + curr, 0);

      const barSeries = [
        {
          name: country + '(' + totalValue + ')',
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
      setIsDataFound(true);
      loader("hide");

    } catch (error) {
      console.log(error);
      setIsDataFound(false);
      loader("hide");
    }
  };

  useEffect(() => {
    getDataFromApi();
  }, []);


  const filterByRegion = (e) => {
    const selectedRegion = e;
    selectRegionValue.current = selectedRegion;
    setSelectRegionVal(selectedRegion);

    const filteredCountries = selectedCountry.filter((country) => country[1] === selectedRegion);
    setSelectCountryByRegion(filteredCountries);

    const firstCountry = filteredCountries[0][0];
    setSelectedCountry(filteredCountries[0]);
    selectCountryValue.current = firstCountry;
    setIsDataFound(true);
    loader("hide");
    getDataFromApi();
  }

  const filterByCountry = (e) => {
    selectCountryValue.current = e.value;
    getDataFromApi();
  };

  return (
    <Col className="right-sidebar">
      <div className="custom-container">
        <Row>
          <div className="top-header">
            <div className="page-title d-flex">
              <h2>State By Region </h2>
            </div>
          </div>
          <div className="create-change-content spc-content analytic-charts">
            <div className="form_action">
              <Form className="product-unit d-flex justify-content-between align-items-center">
                <div className="form-group ">
                  <label htmlFor=""></label>
                  <Select
                    options={selectedRegion.map((region) => ({ value: region, label: region }))}
                    onChange={(selectedOption) => filterByRegion(selectedOption.value)}
                    className="dropdown-basic-button split-button-dropup"
                    value={{ value: selectRegionValue.current, label: selectRegionValue.current }}
                  />
                  <Select
                    options={selectedCountry
                      .filter((country) => country[1] === selectRegionValue.current)
                      .map(([country]) => ({ value: country, label: country }))}
                    onChange={(option) => filterByCountry(option)}
                    className="dropdown-basic-button split-button-dropup"
                    value={{ value: selectCountryValue.current, label: selectCountryValue.current }} // Set the selected value for the second dropdown
                  // isDisabled={selectCountryByRegion.length === 0}
                  />
                </div>
              </Form>
            </div>
            {isDataFound ? (
              <div>
                <div className="high_charts">
                  <HighchartsReact highcharts={Highcharts} options={optionsRev} />
                </div>
                <div className="high_charts">
                  <HighchartsReact highcharts={Highcharts} options={optionBar} />
                </div>
              </div>
            ) : null}
          </div>
        </Row>
      </div>
    </Col>
  );
};

export default OctaCountry;
