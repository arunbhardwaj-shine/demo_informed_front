import React, { useState, useEffect } from "react";
import { getData, postData, postFormData } from "../../axios/apiHelper";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ENDPOINT } from "../../axios/apiConfig";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import MapModule from "highcharts/modules/map";
import worldMap from "@highcharts/map-collection/custom/world.geo.json";

MapModule(Highcharts);

const MapComponent = ({ data, status }) => {
  const [newData, setNewData] = useState();
  // for map
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
            '<span style="font-weight: bold">{point.pdfTitle}</span><br>' +
            '<span style="font-weight: bold">Total Opening : {point.opening}</span><br>' +
            '<span style="font-weight: bold">Total Reader : {point.reader}</span>',
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

  // country list
  // const [countryList, SetCountryList] = useState({
  //   chart: {
  //     type: "bar",
  //     height: "500%",
  //   },
  //   title: {
  //     text: "",
  //   },
  //   xAxis: {
  //     categories: [],
  //   },
  //   yAxis: {
  //     title: {
  //       text: "Number of Cases",
  //     },
  //   },
  //   stackLabels: {
  //     enabled: true,
  //   },
  //   legend: {
  //     align: "center",
  //     verticalAlign: "bottom",
  //     layout: "horizontal",
  //     x: 0,
  //     y: 0,
  //   },
  //   plotOptions: {
  //     bar: {
  //       dataLabels: {
  //         enabled: true,
  //       },
  //     },
  //     series: {
  //       pointWidth: 15,
  //     },
  //   },
  //   exporting: {
  //     showTable: true,
  //   },
  //   series: [],
  // });

  Highcharts.setOptions({
    colors: ["#FFBE2C", "#00D4C0", "#F58289"],
  });

  useEffect(() => {
    const getDataFromApi = async () => {
      try {
        if (!status) {
          const countryData = data?.data?.map((item) => {
            const latlongParts = item?.latlong.split("~");
            const lat = parseFloat(latlongParts[0]) || 0;
            const lon = parseFloat(latlongParts[1]) || 0;
            const viewedOnDates = item?.dated
              .map((date) => `viewed on: ${date}` + "<br> ")
              .join("");
            const indexVal = data?.countryname.indexOf(item.country);
            const open = data?.opening[indexVal];
            const readers = data?.reader[indexVal];
            return {
              opening: open,
              reader: readers,
              name: item.country,
              lat: lat,
              lon: lon,
              city: item.city,
              country: item.country,
              address: item.address,
              pdfTitle: item.pdftitle,
              dated: viewedOnDates,
            };
          });

          setNewData(countryData);
        } else {
          const countryData = data?.response?.data.map((coordObject, index) => {
            const [lat, lon] = coordObject.coordinates.split("~");

            return {
              name: coordObject.region_name,
              lat: parseFloat(lat),
              lon: parseFloat(lon),
            };
          });

          setNewData(countryData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getDataFromApi();
  }, []);

  return (
    <>
      {/*<Col className="right-sidebar">
          <div className="custom-container">
            <Row>*/}

      <div className="high_charts"></div>
      <HighchartsReact
        constructorType={"mapChart"}
        highcharts={Highcharts}
        options={mapOptions}
      />
      {/* <div className="high_charts">
              <HighchartsReact highcharts={Highcharts} options={countryList} />
            </div> */}
      {/*
              </Row>
            </div>
          </Col>
              */}
    </>
  );
};

export default MapComponent;
