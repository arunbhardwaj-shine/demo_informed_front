import React, { useState, useEffect, useRef } from 'react'
import { postData } from '../../axios/apiHelper';
import { Col, Row, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { ENDPOINT } from '../../axios/apiConfig';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from "highcharts/modules/map";
import MapModule from "highcharts/modules/map";
import worldMap from "@highcharts/map-collection/custom/world.geo.json";
import Select from "react-select";
import { useMemo } from 'react';
import { loader } from "../../loader";
MapModule(Highcharts);

const CountryRegistration = () => {
  const [isDataFound, setIsDataFound] = useState(false);
  const [newData, setNewData] = useState([]);

  const [monthYear, setMonthYear] = useState();
  let startMonth = new Date("March 2022");
  let endMonth = new Date();
  let months = [{ value: "All", label: "All" }];

  while (startMonth <= endMonth) {
    let monthName = startMonth.toLocaleString('default', { month: 'long' });
    let year = startMonth.getFullYear();

    months.push({ value: `${monthName} ${year}`, label: `${monthName} ${year}` });

    startMonth.setMonth(startMonth.getMonth() + 1);
  }

  const MemoizedMap = React.memo(({ data }) => (
    <HighchartsReact
      constructorType={"mapChart"}
      highcharts={Highcharts}
      options={mapOptions}
    />
  ));
  
  // for map
  const mapOptions = useMemo(() => {
   return {
     chart: {
       type: "map",
       
       events: {
        load: function (e) {
          this.mapZoom(0.3, 4500, -4500);
        }
      }
     },
     title: {
       text: "Country Registration"
     },
     credits: {
       enabled: false
     },
     mapNavigation: {
       enabled: true,
       buttonOptions: {
         align: "right",
         verticalAlign: "bottom",
         x: -10,
         y: -10
       },
     },
     series: [
       {
         name: "Country Registration",
         data: newData?.filter(country => country.lat && country.lon),
         mapData: worldMap,
         showInLegend: false,
         joinBy: ["name"],
         keys: ["code", "value"],
         tooltip: {
           headerFormat: "",
           pointFormat: "Total Registration: {point.totalIndex}",
          
         },
         states: {
           hover: {
             color: "#BADA55",
           },
         },
         dataLabels: {
           enabled: true,
           formatter: function () {
             const countries = this.series.options.data.filter(country => country.name === this.point.name);
             if (countries.length > 0) {
               return this.point.name;
             } else {
               return null;
             }
           }
         },
       },
     ],
   };
 }, [newData]);

  console.log("map", mapOptions);
  // country list
  const [countryList, SetCountryList] = useState({
    chart: {
      type: 'bar',
      height: 4000
    },
    title: {
      text: 'Country List'
    },
    xAxis: {
      categories: [],
    },
    yAxis: {
      title: {
        text: 'Number of Cases'
      }
    },
    stackLabels: {
      enabled: true,
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      x: 0,
      y: 0
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          pointWidth: 25,

        }

      },
    },
    exporting: {
      showTable: true,
      tableCaption: '',
    },
    series: []

  });

  Highcharts.setOptions({

    colors: ["#FFBE2C", "#00D4C0", "#F58289"]

  });

  const optionMonth = useRef();
  const optionYear = useRef();

  const getDataFromApi = async () => {
    try {
      loader("show");
      const month = optionMonth.current;
      const year = optionYear.current;
      const response = await postData(ENDPOINT.COUNTRY_REGISTRATION, { year, month });
      const apiData = response.data;
      console.log("apiData", apiData);
      const countryData = apiData.data.coordination.map((coordObject, index) => {
        const [lat, lon] = Object.values(coordObject)[0].split("~");
        const totalIndex = apiData.data.critical_care[index] + apiData.data.haematology[index] + apiData.data.immunotherapy[index];
        return {
          name: Object.keys(coordObject)[0],
          lat: parseFloat(lat),
          lon: parseFloat(lon),
          critical_care: apiData.data.critical_care[index],
          haematology: apiData.data.haematology[index],
          immunotherapy: apiData.data.immunotherapy[index],
          totalIndex: totalIndex,
          countryLat: apiData.data.lat,
          countryLon: apiData.data.long,
        };
      });
      setNewData(countryData);
      // setChartUpdate(prev => prev + 1);
      const newSeries = [
        {
          name: `critical_care`,
          data: apiData.data?.critical_care,
          color: Highcharts?.getOptions()?.colors[2],
        },
        {
          name: `haematology`,
          data: apiData.data?.haematology,
          color: Highcharts?.getOptions()?.colors[1],
        },
        {
          name: `immunotherapy`,
          data: apiData.data?.immunotherapy,
          color: Highcharts?.getOptions()?.colors[0],
        },
      ];
      const categories = apiData.data?.country;

      const newCountryList = {
        ...countryList,
        xAxis: {
          categories: categories,
        },
        series: newSeries,
      };

      SetCountryList(newCountryList)
      setIsDataFound(true);
      loader("hide");
    } catch (error) {
      setIsDataFound(false);
      console.log(error);
      loader("hide");
    }
  };

  useEffect(() => {
    getDataFromApi();
  }, []);

  const selectMonthYear = (e) => {
    const [month, year] = e.value.split(" ");
    optionMonth.current = month;
    optionYear.current = year;
    getDataFromApi();
  }

  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
          <div className="top-header">
              <div className="page-title d-flex">
                <h2>Country Registration</h2>
              </div>
            </div>
            <div className="create-change-content spc-content analytic-charts">
              <div className="form_action">
                <Form className="product-unit d-flex justify-content-between align-items-center">
                  <div className="form-group ">
                    <label htmlFor="">Months</label>
                    <Select
                      options={months}
                      value={monthYear}
                      onChange={selectMonthYear}
                      placeholder="All"
                      className="dropdown-basic-button split-button-dropup"
                      isClearable
                    />
                  </div>
                </Form>
              </div>
              <div className="high_charts">
                {newData.length?(
                  <MemoizedMap data={newData} />
                  ) : null}
              </div>
              
              <div className="high_charts">
                <HighchartsReact highcharts={Highcharts} options={countryList} />
              </div>
            </div>
          </Row>
        </div>
      </Col>
    </>

  );
};

export default CountryRegistration;
