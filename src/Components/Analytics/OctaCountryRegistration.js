import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Tabs, Tab } from "react-bootstrap";
import Highcharts from "highcharts";
import { loader } from "../../loader";
import { ENDPOINT } from "../../axios/apiConfig";
import { getData } from "../../axios/apiHelper";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";

import HighchartsReact from "highcharts-react-official";
import ContentAnalyticsComponent from "./ContentAnalyticsComponent";
import MapModule from "highcharts/modules/map";
import worldMap from "@highcharts/map-collection/custom/world.geo.json";
import axios from "axios";
import drilldown from 'highcharts/modules/drilldown.js';

import { Link } from "react-router-dom";

exporting(Highcharts);
exportData(Highcharts);
drilldown(Highcharts);

const OctaCountryRegestration = () => {
  const [isDataFound, setIsDataFound] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const mapData = useRef([]);

  useEffect(() => {
    getDataFromApi();
  }, []);

  async function getDataFromApi() {
    loader("show");
    try {
      axios
        .get(
          "https://webinar.docintel.app/lmn/api/analytics/octalatch_country_stats"
        )
        .then((response) => {
          mapData.current = response.data || [];
          setIsDataFound(true);
          loader("hide");
        });

      setIsLoaded(true);
    } catch (err) {
      setIsDataFound(false);
      console.log(err);
    } finally {
    }
  }

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
                <h2>Octa Country Registration</h2>
              </div>
            </div>
            <div className="create-change-content spc-content analytic-charts">
              {isDataFound ? (
                <>
                  <Row>
                    <Col>
                      <MapComponent data={mapData.current} />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <PieComponent data={mapData.current} />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <TabComponent data={mapData.current} />
                    </Col>
                  </Row>
                </>
              ) : null}
            </div>
          </Row>
        </div>
      </Col>
    </>
  );
};
export default OctaCountryRegestration;

const MapComponent = ({ data }) => {

  const [newData, setNewData] = useState();
  const mapOptions = {
    chart: {
      map: "worldMap",
    },
    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        align: "right",
        verticalAlign: "bottom",
        x: -10,
        y: -10,
      },
    },

    xAxis: {
      min: 160,
      max: -120,
    },
    yAxis: {
      min: -60,
      max: 20,
    },
    series: [
      {
        name: "",
        data: newData?.filter((country) => country.lat && country.lon),
        mapData: worldMap,
        joinBy: ["name"],
        keys: ["code", "value"],
        tooltip: {
          headerFormat: "",
          pointFormat:
            "{point.name} <br/>Total Registration: {point.totalIndex}",
        },
        states: {
          hover: {
            color: "#BADA55",
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function () {
            const countries = this.series.options.data.filter(
              (country) => country.name === this.point.name
            );
            if (countries.length > 0) {
              return this.point.name;
            } else {
              return null;
            }
          },
        },
      },
    ],
  };

  Highcharts.setOptions({
    colors: ["#FFBE2C", "#00D4C0", "#F58289"],
  });

  useEffect(() => {
    const getDataFromApi = async () => {
      try {
        const countryData = data?.response?.data.map((coordObject, index) => {
          const [lat, lon] = coordObject.coordinates.split("~");

          return {
            name: coordObject.region_name,
            totalIndex: coordObject.total,
            lat: parseFloat(lat),
            lon: parseFloat(lon),
          };
        });

        setNewData(countryData);
      } catch (error) {
        console.log(error);
      }
    };

    getDataFromApi();
  }, []);

  return (
    <>
      {
        /*<Col className="right-sidebar">
          <div className="custom-container">
            <Row>*/
      }

            <div className="create-change-content spc-content analytic-charts">
              <div className="high_charts"></div>
              <HighchartsReact
                constructorType={"mapChart"}
                highcharts={Highcharts}
                options={mapOptions}
              />

            </div>
      {
        /*
        </Row>
      </div>
    </Col>
        */
      }

    </>
  );
};
const PieComponent = ({ data }) => {
  const series = [];
  data?.response?.data.forEach((element, index) => {
    const newSeries = {
      name: element.region_name,
      y: element.total_per,
      color: Highcharts.getOptions().colors[index],
      drilldown: element.region_name, // set the drilldown value
    };

    series.push(newSeries);
  });

  const drilldownData = {};
  data?.response?.data.forEach((element, index) => {
    const countryDrill = element.country_drill;
    const drillData = element.drill_data;
    const dataArr = [];
    for (let i = 0; i < countryDrill.length; i++) {
      dataArr.push([countryDrill[i], drillData[i]]);
    }
    drilldownData[element.region_name] = {

      id: element.region_name,
      name: element.region_name,
      data: dataArr,
    };
  });
console.log("series",series)

  console.log("drill Data",drilldownData)
  const countryStatsPieOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    series: [
      {
        name: "Article Registration based on delivery",
        colorByPoint: true,
        data: series,
        drilldown: true, // enable drilldown for this series
      },
    ],
    drilldown: {
      series: Object.values(drilldownData), // set the drilldown data
    },
  };

  return (
    <>
      <div className="high_charts">
        <HighchartsReact
          highcharts={Highcharts}
          options={countryStatsPieOptions}
        />
      </div>
    </>
  );
};

const TabComponent = ({ data }) => {
  const [activeTab, setActiveTab] = useState("1");

  const handleTabSelect = (tabKey) => {
    setActiveTab(tabKey);
  };

  return (
    <>
      <div className="high_charts">
        <Tabs activeKey={activeTab} onSelect={handleTabSelect}>
          {data?.response?.data.map((region, index) => (
            <Tab eventKey={index + 1} title={region.region_name}>
              <Row>
                <Col>
              <Barcomponent
                countries={region.countries}
                countriesData={region.countries_data}
                title={region.region_name}
              />
              </Col>
              </Row>
            </Tab>
          ))}
        </Tabs>
      </div>
    </>
  );
};

const Barcomponent = ({ countries, countriesData ,title}) => {
  console.log(countries)
  return (
    <>
      <div className="high_charts">
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            chart: {
              marginTop: 100,
              type: "bar",
              events: {
                load: function () {
                  let categoryHeight = 50;
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
              categories: countries,
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

            series: [{
              name: title,
              data: countriesData,
              color:"#00D4C0"
            }]
          }}
        />
      </div>
    </>
  );
};
