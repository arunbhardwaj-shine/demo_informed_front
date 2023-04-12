import React, { useState, useEffect } from 'react'
import { getData, postData, postFormData } from '../../axios/apiHelper';
import { Col, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { ENDPOINT } from '../../axios/apiConfig';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from "highcharts/modules/map";
import MapModule from "highcharts/modules/map";
// import worldMap from "@highcharts/map-collection/custom/world.geo.json";
const worldMap = "";

MapModule(Highcharts);



const CountryRegistration = () => {
  const [newData, setNewData] = useState();
// for map
const mapOptions = {
  chart: {
    map: "worldMap"
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
    }
  },

  xAxis: {
    min: 160,
    max: -120
  },
  yAxis: {
    min: -60,
    max: 20
  },
  series: [
    {
      name: "Country Registration",
      data: newData?.filter(country => country.lat && country.lon),
      mapData: worldMap,
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
        formatter: function() {
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

   // country list
   const [countryList, SetCountryList] = useState({
    chart: {
      type: 'bar',
      height: '500%'
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
            enabled: true
        }
    },
      series: {
        pointWidth: 15
    }
    },
    exporting: {
      showTable: true
    },
    series: []

});

Highcharts.setOptions({

  colors: ["#FFBE2C", "#00D4C0", "#F58289"]

});

  useEffect(() => {
    const getDataFromApi = async () => {
      try {
        const response = await postData(ENDPOINT.COUNTRY_REGISTRATION);
        const apiData = response.data;
       const countryData = apiData.data.coordination.map((coordObject,index) => {
        const [lat, lon] = Object.values(coordObject)[0].split("~");
        const totalIndex = apiData.data.critical_care[index] + apiData.data.haematology[index] + apiData.data.immunotherapy[index];
        return {
          name: Object.keys(coordObject)[0],
          lat: parseFloat(lat),
          lon: parseFloat(lon),
          critical_care: apiData.data.critical_care[index],
          haematology: apiData.data.haematology[index],
          immunotherapy: apiData.data.immunotherapy[index],
          totalIndex:totalIndex,
        };
      });
        setNewData(countryData);

      console.log("djjdjdjj",countryData);
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

      } catch (error) {
        console.log(error);
      }
    };

    getDataFromApi();
  }, []);

  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
          <div className="top-header">
                <div className="page-title d-flex">
                  <Link className="btn btn-primary btn-bordered back-btn" to="/top-clients">
                    <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.159662 12.0019C0.159662 11.5718 0.323895 11.1417 0.65167 10.8138L10.9712 0.494292C11.6277 -0.16216 12.692 -0.16216 13.3482 0.494292C14.0044 1.15048 14.0044 2.21459 13.3482 2.8711L4.21687 12.0019L13.3479 21.1327C14.0041 21.7892 14.0041 22.8532 13.3479 23.5093C12.6917 24.1661 11.6274 24.1661 10.9709 23.5093L0.65135 13.19C0.323523 12.8619 0.159662 12.4319 0.159662 12.0019Z" fill="#97B6CF" />
                    </svg>
                  </Link>
                  <h2>Total HCP</h2>
                </div>
              </div>
              <div className="create-change-content spc-content analytic-charts">
                <div className="high_charts"></div>
            <HighchartsReact constructorType={"mapChart"} highcharts={Highcharts} options={mapOptions} />
            </div>
                <div className="high_charts">
            <HighchartsReact highcharts={Highcharts} options={countryList} />
            </div>
          </Row>
        </div>
      </Col>
    </>
  );
};

export default CountryRegistration;
