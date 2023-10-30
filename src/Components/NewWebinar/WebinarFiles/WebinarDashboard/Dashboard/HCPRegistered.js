import React, { useState, useEffect } from "react";
import "../../../assets/css/webinar.css";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import { loader } from "../../../../../loader";
import { Col, Row } from "react-bootstrap";

let data = {
    chartData: [],
    chartDataLive: {
        "Other": 28,
        "EE/CIS": 34,
        "MENA": 1063,
        "LATAM": 53,
        "EU": 35,
        "TINBS": 205,
        "Brazil": 1,
        "Canada": 3,
        "SEA": 104,
        "Mexico": 9,
        "Russian Federation": 1,
        "ZAF": 3,
        "US": 21
    },
    regionColorArr: {
        "Other": "#F58289",
        "EE/CIS": "#D61975",
        "MENA": "#00D4C0",
        "LATAM": "#db6f2c",
        "EU": "#00003C",
        "TINBS": "#FFBE2C",
        "Brazil": "#00D4C0",
        "Canada": "#F58289",
        "SEA": "#0066BE",
        "Mexico": "#7c00ad",
        "Russian Federation": "#7cb0dd",
        "ZAF": "#9C9CA2",
        "US": "#9af5b2"
    }
  }

const HCPRegistered = () => {

    const [options, setOptions] = useState({
    chart: {
      renderTo: "country_container",
      type: "pie",
      // width: 1200,
      // height: 21 > 20 ? 1200 : 400,
    },
    title: {
      text: "HCP’s Registered Live By  Region (1560)",
    },
    credits: { enabled: false },
    legend: {},
    minPointLength: 10,
    plotOptions: {
      series: {
        shadow: false,
        borderWidth: 0,
        // dataLabels: {
        //   enabled: true,
        //   formatter: function () {
        //     return this.y;
        //   },
        // },
      },
    },
    xAxis: {
      lineColor: "#999",
      lineWidth: 1,
      tickColor: "#666",
      tickLength: 3,
      labels: {
        padding: 0,
        style: {
          fontSize: "9px",
        },
      },
      categories: [],
     
    },
    yAxis: {
      lineColor: "#999",
      lineWidth: 1,
      tickColor: "#666",
      tickWidth: 1,
      tickLength: 3,
      gridLineColor: "#ddd",
      title: false,
    },
    series: [
      {
        colorByPoint: true,
        showInLegend: false,
        data: [],
      },
    ],
    // tooltip: {
    //   formatter: function () {
    //     return this.x + ":" + this.y;
    //   },
    // },
  });

  const [options2, setOptions2] = useState({
    chart: {
      renderTo: "country_container",
      type: "pie",
      // width: 1200,
      // height: 21 > 20 ? 1200 : 400,
    },
    title: {
      text: "HCP’s Registered Virtual By Country(0)",
    },
    credits: { enabled: false },
    legend: {},
    minPointLength: 10,
    plotOptions: {
      series: {
        shadow: false,
        borderWidth: 0,
        // dataLabels: {
        //   enabled: true,
        //   formatter: function () {
        //     return this.y;
        //   },
        // },
      },
    },
    xAxis: {
      lineColor: "#999",
      lineWidth: 1,
      tickColor: "#666",
      tickLength: 3,
      labels: {
        padding: 0,
        style: {
          fontSize: "9px",
        },
      },
      categories: [],
    },
    yAxis: {
      lineColor: "#999",
      lineWidth: 1,
      tickColor: "#666",
      tickWidth: 1,
      tickLength: 3,
      gridLineColor: "#ddd",
      title: false,
    },
    series: [
      {
        colorByPoint: true,
        showInLegend: false,
        data: [{}],
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.5)',
      },
    ],
    // tooltip: {
    //   formatter: function () {
    //     return this.x + ":" + this.y;
    //   },
    // },
  });



  const getDataFromApi = async () => {
    try {
      loader("show");
     const categories = Object.keys(data.chartDataLive).sort();
      const transformedChartData = Object.entries(data.chartDataLive).map(
        ([name, y]) => ({
          name,
          y,
          color: data.regionColorArr[name],
        })
      );

    let  updatedSeries = [
        {
          ...options.series[0],
          data: transformedChartData,
        },
      ];

    let  updatedOptions = {
        ...options,
        xAxis: {
          ...options.xAxis,
          categories: categories,
        },
        series: updatedSeries,
      };

      console.log(updatedOptions);
      setOptions(updatedOptions);

      loader("show");
      const categories2 = Object.keys(data.chartData).sort();
       const transformedChartData2 = Object.entries(data.chartData).map(
         ([name, y]) => ({
           name,
           y,
           color: data.regionColorArr[name],
         })
       );
 
     updatedSeries = [
         {
           ...options2.series[0],
           data: transformedChartData2,
         },
       ];
 
      updatedOptions = {
         ...options2,
         xAxis: {
           ...options2.xAxis,
           categories: categories2,
         },
         series: updatedSeries,
       };
 
       console.log(updatedOptions);
       setOptions2(updatedOptions);

      loader("hide");
    } catch (error) {
      console.log(error);
      loader("hide");
    }
  };

  useEffect(() => {
    getDataFromApi();
  }, []);
  return (
    <>
     <div className="hcp-registered">
      <Row>
        <Col>
        <HighchartsReact highcharts={Highcharts} options={options2} />
        </Col>
        <Col>
        <HighchartsReact highcharts={Highcharts} options={options} />
        </Col>
        
      </Row>
      
      </div>
    </>
  )
}

export default HCPRegistered