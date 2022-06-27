import React, { useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useState } from "react";
import { Tabs } from "react-bootstrap";
import { Tab } from "react-bootstrap";
import axios from "axios";
import { BaseApi } from "../../../Api/BaseApi";
const RegionStatsChart = (props) => {
  const [regions, setRegions] = useState([]);
  const [options_ch, setOptions_ch] = useState({
    chart: {
      type: "bar",
    },
    title: {
      text: "Historic World Population by Region",
    },
    subtitle: {
      text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>',
    },
    xAxis: {
      categories: ["Africa", "America", "Asia", "Europe", "Oceania"],
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Population (millions)",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    tooltip: {
      valueSuffix: " millions",
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
      shadow: true,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Year 1800",
        data: [107, 31, 635, 203, 2],
      },
      {
        name: "Year 1900",
        data: [133, 156, 947, 408, 6],
      },
      {
        name: "Year 2000",
        data: [814, 841, 3714, 727, 31],
      },
      {
        name: "Year 2016",
        data: [1216, 1001, 4436, 738, 40],
      },
    ],
  });

  const [data, setData] = useState({});

  useEffect(() => {
    // console.log(localStorage.getItem("Token"));
    // console.log(props.eventid);
    const getChartDetails = async () => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("Token")}`,
      };

      await axios
        .get(`${BaseApi}region-stats/${localStorage.getItem("EventIdHeader")}`, {
          headers,
        })
        .then((res) => {
          // console.log(res);

          setData(res.data.data);
          // console.log(res.data.data);
          //    console.log(Object.keys(res.data.data));
          setRegions(Object.keys(res.data.data));

          //console.log(countryall)
          // setCounter(counter + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getChartDetails();
  }, []);

  return (
    <div class="right-sidebar">
      <div className="container">
        <Tabs defaultActiveKey="0">
          {regions.map((region, index) => {
            return (
              <Tab eventKey={index} title={region}>
                <p>tabular data</p>
              </Tab>
            );
          })}
        </Tabs>
      </div>
      {/* <HighchartsReact highcharts={Highcharts} options={options_ch} /> */}
    </div>
  );
};

export default RegionStatsChart;
