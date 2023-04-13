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

const MapComponent = ({ data }) => {
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
          pointFormat: "Views:<br>"+
          "{point.pdfTitle}<br>" +
          "Address: {point.address}<br>" +
          "City: {point.city}<br>" +
          "Country: {point.country}<br>" +
          "{point.dated}"
          

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
  const [countryList, SetCountryList] = useState({
    chart: {
      type: "bar",
      height: "500%",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: [],
    },
    yAxis: {
      title: {
        text: "Number of Cases",
      },
    },
    stackLabels: {
      enabled: true,
    },
    legend: {
      align: "center",
      verticalAlign: "bottom",
      layout: "horizontal",
      x: 0,
      y: 0,
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
      series: {
        pointWidth: 15,
      },
    },
    exporting: {
      showTable: true,
    },
    series: [],
  });

  Highcharts.setOptions({
    colors: ["#FFBE2C", "#00D4C0", "#F58289"],
  });

  useEffect(() => {
    const getDataFromApi = async () => {
      try {
        const countryData = data?.map((item) => {
          const latlongParts = item?.latlong.split("~");
          const lat = parseFloat(latlongParts[0]) || 0;
          const lon = parseFloat(latlongParts[1]) || 0;
          const viewedOnDates = item?.dated
  .map(date => `viewed on: ${date}`+
  "<br> ")
  .join("");
 
          return {
            name: item.country,
            lat: lat,
            lon: lon,
            city:item.city,
            country:item.country,
            address:item.address,
            pdfTitle:item.pdftitle,
            dated:viewedOnDates,
          };
        });
      
       
        setNewData(countryData);

        const newSeries = [
          {
            name: `critical_care`,
            data: data?.critical_care,
            color: Highcharts?.getOptions()?.colors[2],
          },
          {
            name: `haematology`,
            data: data?.haematology,
            color: Highcharts?.getOptions()?.colors[1],
          },
          {
            name: `immunotherapy`,
            data: data?.immunotherapy,
            color: Highcharts?.getOptions()?.colors[0],
          },
        ];
        const categories = data?.country;

        const newCountryList = {
          ...countryList,
          xAxis: {
            categories: categories,
          },
          series: newSeries,
        };

        SetCountryList(newCountryList);
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
            <div className="create-change-content spc-content analytic-charts">
              <div className="high_charts"></div>
              <HighchartsReact
                constructorType={"mapChart"}
                highcharts={Highcharts}
                options={mapOptions}
              />
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

export default MapComponent;
