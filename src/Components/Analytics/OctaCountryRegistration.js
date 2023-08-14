import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Tabs, Tab } from "react-bootstrap";
import Highcharts from "highcharts";
import { loader } from "../../loader";

import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";

import HighchartsReact from "highcharts-react-official";
import HighchartsMap from "highcharts/modules/map";
import proj4 from "proj4";
import worldMap from "@highcharts/map-collection/custom/world.geo.json";

import axios from "axios";
import drilldown from "highcharts/modules/drilldown.js";

import { Link } from "react-router-dom";
import customWrap from "./customWrap";

HighchartsMap(Highcharts);

// Load Highcharts modules
require("highcharts/modules/map")(Highcharts);
require("highcharts/modules/exporting")(Highcharts);
exporting(Highcharts);
exportData(Highcharts);
drilldown(Highcharts);
customWrap(Highcharts);

//set image path
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const OctaCountryRegestration = () => {
  const [isDataFound, setIsDataFound] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const mapData = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);
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
              {/* <div className="page-title d-flex">
                <h2>Octa Country Registration</h2>
              </div> */}
            </div>
            <div className="create-change-content spc-content analytic-charts space-added">
              {isDataFound ? (
                <>
                  <Row>
                    <Col>
                      <MapComponent data={mapData.current} />
                      <PieComponent data={mapData.current} />
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

  const options = {
    chart: {
      map: "custom/world",
      proj4,
      plotBackgroundColor: '#aad3df',  
    },
    title: {
      text: "Regions",
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: "bottom",
      },
    },
    series: [
      {
        name: "Basemap",
        borderColor: "grey",
        nullColor: "#93d38c",
        showInLegend: false,
        mapData: worldMap,
      },
      {
        name: "Separators",
        type: "mapline",
        nullColor: "#707070",
        showInLegend: false,
        enableMouseTracking: false,
      },
      {
        // Specify points using lat/lon
        type: "mappoint",
        name: "Total Registrations",
        color: "black",
        data: newData,

        tooltip: {
          headerFormat: "",
          pointFormat: '<span style="font-weight: bold">Total Registration : {point.totalIndex}</span>',
        },
        showInLegend: false,
        marker: {
          symbol: `url(${path_image}/marker.png)`,
          width: 17,
          height: 24,
          offsetY: -15, // adjust the position of the marker icon
        },
      },
    ],
  };

  useEffect(() => {
    getDataFromApi();
  }, []);

  const getDataFromApi = async () => {
    try {
      const countryData = data?.response?.data
        .map((coordObject, index) => {
          const [lat, lon] = coordObject.coordinates.split("~");
          const latitude = parseFloat(lat);
          const longitude = parseFloat(lon);

          if (!isNaN(latitude) && !isNaN(longitude)) {
            return {
              name: coordObject.region_name,
              totalIndex: coordObject.total,
              lat: latitude,
              lon: longitude,
            };
          } else {
            console.log(`Invalid coordinates: ${coordObject.coordinates}`);
            return null;
          }
        })
        .filter((point) => point !== null);

      setNewData(countryData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="high_charts"></div>
      <HighchartsReact
        constructorType={"mapChart"}
        highcharts={Highcharts}
        options={options}
      />
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

  const countryStatsPieOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      height: "600",
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
      <div className="high_charts top">
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
      <div className="high_charts top">
        <Tabs activeKey={activeTab} onSelect={handleTabSelect}>
          {data?.response?.data.map((region, index) => (
            <Tab eventKey={index + 1} title={region.region_name}>
              <Row>
                <Col>
                  <Barcomponent
                    countries={region.countries}
                    countriesData={region.countries_data}
                  //  title={region.region_name}
                  title="HCP"
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

const Barcomponent = ({ countries, countriesData, title }) => {
  window.proj4 = null;
  const data = countries.map((country, index) => ({
    name: country,
    value: countriesData[index],
  }));

  data.sort((a, b) => a.name.localeCompare(b.name));

  const sortedCountries = data.map((country) => country.name);
  const sortedCountriesData = data.map((country) => country.value);

  return (
    <>
      <div className="high_charts top">
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
              text: "Country List",
            },
            xAxis: {
              categories: sortedCountries,
            },
            credits: {
              enabled: false,
            },
            exporting: {
              showHighchart: true,
              showTable: true,
              tableCaption: "",
            },
            // legend: {
            //   reversed: true,
            //   align: "center",
            //   verticalAlign: "top",
            //   floating: true,
            //   x: 0,
            //   y: 50,
            // },
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

            series: [
              {
                name: title,
                data: sortedCountriesData,
                color: "#00D4C0",
              },
            ],
          }}
        />
      </div>
    </>
  );
};
