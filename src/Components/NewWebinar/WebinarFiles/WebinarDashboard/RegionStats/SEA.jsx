import React, { useState, useEffect } from "react";
import "../../../assets/css/webinar.css";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import { loader } from "../../../../../loader";
import { Col, Row } from "react-bootstrap";

let data ={
    "Indonesia": 12,
    "Malaysia": 24,
    "Philippines": 65,
    "Singapore": 1,
    "Vietnam": 2
}
let data2 ={
    "Indonesia": 1,
    "Philippines": 9
}

let colorArr = {
  Afghanistan: "#F58289",
  Albania: "#00D4C0",
  Algeria: "#0066BE",
  Andorra: "#db6f2c",
  Angola: "#9af5b2",
  Argentina: "#0066BE",
  Aruba: "#db6f2c",
  Austria: "#9af5b2",
  Azerbaijan: "#00003C",
  Bahrain: "#db6f2c",
  Bangladesh: "#9af5b2",
  Belarus: "#7c00ad",
  Belgium: "#FFBE2C",
  Bolivia: "#F58289",
  Brazil: "#00D4C0",
  Bulgaria: "#db6f2c",
  Canada: "#9C9CA2",
  Chile: "#FFBE2C",
  Colombia: "#0066BE",
  "Costa Rica": "#db6f2c",
  "Croatia (Hrvatska)": "#00003C",
  Cuba: "#7cb0dd",
  "Dominican Republic": "#F58289",
  Ecuador: "#0066BE",
  Egypt: "#00D4C0",
  "El Salvador": "#D61975",
  France: "#db6f2c",
  Georgia: "#9af5b2",
  Germany: "#7cb0dd",
  Greece: "#7c00ad",
  Guatemala: "#FFBE2C",
  Hungary: "#db6f2c",
  India: "#7cb0dd",
  Indonesia: "#7c00ad",
  Iraq: "#D61975",
  Italy: "#0066BE",
  Japan: "#7cb0dd",
  Jordan: "#F58289",
  Kazakhstan: "#00D4C0",
  KSA: "#FFBE2C",
  Kyrgyzstan: "#F58289",
  Latvia: "#D61975",
  Lesotho: "#0066BE",
  Lithuania: "#7cb0dd",
  Macedonia: "#FFBE2C",
  Malaysia: "#00D4C0",
  Mexico: "#FFBE2C",
  Morocco: "#00D4C0",
  Nepal: "#D61975",
  Nigeria: "#00003C",
  Pakistan: "#00D4C0",
  Palestine: "#D61975",
  "Palestinian Territory Occupied": "#9af5b2",
  Panama: "#FFBE2C",
  Paraguay: "#9af5b2",
  Peru: "#0066BE",
  Philippines: "#D61975",
  Poland: "#0066BE",
  Portugal: "#F58289",
  Qatar: "#D61975",
  Reunion: "#0066BE",
  Romania: "#9af5b2",
  Russia: "#00003C",
  "Saint Pierre and Miquelon": "#9C9CA2",
  Samoa: "#7cb0dd",
  Senegal: "#7c00ad",
  Serbia: "#F58289",
  "Sierra Leone": "#0066BE",
  Singapore: "#db6f2c",
  Slovakia: "#9af5b2",
  "South Africa": "#7cb0dd",
  Spain: "#9af5b2",
  Sudan: "#7cb0dd",
  Switzerland: "#FFBE2C",
  Syria: "#7cb0dd",
  Taiwan: "#F58289",
  Tunisia: "#00D4C0",
  Turkey: "#D61975",
  UAE: "#FFBE2C",
  Ukraine: "#00D4C0",
  "United Arab Emirates": "#9C9CA2",
  "United Kingdom": "#00003C",
  "United State of America": "#9af5b2",
  Uruguay: "#7c00ad",
  Venezuela: "#F58289",
  Vietnam: "#D61975",
  Yemen: "#00D4C0",
};

const SEA = () => {
  const [options, setOptions] = useState({
    chart: {
      renderTo: "country_container",
      type: "bar",
    },
    title: {
      text: "HCP’s On-Site Registered",
    },
    credits: { enabled: false },
    legend: {},
    minPointLength: 10,
    plotOptions: {
      series: {
        shadow: false,
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          formatter: function () {
            return this.y;
          },
        },
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
    tooltip: {
      formatter: function () {
        return this.x + ":" + this.y;
      },
    },
  });

  const [options2, setOptions2] = useState({
    chart: {
      renderTo: "country_container",
      type: "bar",
    },
    title: {
      text: "HCP’s Attended",
    },
    credits: { enabled: false },
    legend: {},
    minPointLength: 10,
    plotOptions: {
      series: {
        shadow: false,
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          formatter: function () {
            return this.y;
          },
        },
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
    tooltip: {
      formatter: function () {
        return this.x + ":" + this.y;
      },
    },
  });

  const [options3, setOptions3] = useState({
    chart: {
      renderTo: "country_container",
      type: "pie",
    },
    title: {
      text: "HCP’s Registered (104)",
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

  const [options4, setOptions4] = useState({
    chart: {
      renderTo: "country_container",
      type: "pie",
    },
    title: {
      text: "HCP’s Attended (10)",
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

  const getDataFromApi = async () => {
    try {
      loader("show");
      const categories = Object.keys(data).sort();
      const transformedChartData = Object.entries(data).map(([name, y]) => ({
        name,
        y,
        color: colorArr[name],
      }));
      let updatedSeries = [
        {
          ...options.series[0],
          data: transformedChartData,
        },
      ];

      let updatedOptions = {
        ...options,
        xAxis: {
          ...options.xAxis,
          categories: categories,
        },
        series: updatedSeries,
      };

      setOptions(updatedOptions);

      const categories2 = Object.keys(data2).sort();
      const transformedChartData2 = Object.entries(data2).map(([name, y]) => ({
        name,
        y,
        color: colorArr[name],
      }));
      updatedSeries = [
        {
          ...options.series[0],
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

      setOptions2(updatedOptions);

      const categories3 = Object.keys(data).sort();
      const transformedChartData3 = Object.entries(data).map(([name, y]) => ({
        name,
        y,
        color: colorArr[name],
      }));
      updatedSeries = [
        {
          ...options3.series[0],
          data: transformedChartData3,
        },
      ];

      updatedOptions = {
        ...options3,
        xAxis: {
          ...options3.xAxis,
          categories: categories3,
        },
        series: updatedSeries,
      };

      setOptions3(updatedOptions);

      const categories4 = Object.keys(data2).sort();
      const transformedChartData4 = Object.entries(data2).map(([name, y]) => ({
        name,
        y,
        color: colorArr[name],
      }));
      updatedSeries = [
        {
          ...options4.series[0],
          data: transformedChartData4,
        },
      ];

      updatedOptions = {
        ...options4,
        xAxis: {
          ...options4.xAxis,
          categories: categories4,
        },
        series: updatedSeries,
      };

      setOptions4(updatedOptions);

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
    <div>
        <p>Total number of attendees in this region is 10</p>
        <p>4.83% (10/207)  of total attendees</p>
        <p>0.64% (10/1560) of total registered</p>
    </div>
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>

      <div>
        <HighchartsReact highcharts={Highcharts} options={options2} />
      </div>

      <div>
        <h5
          style={{
            textAlign: "center",
            padding: "15px 10px",
            background: "#0b3a81",
            margin: "0",
            color: "#fff",
            marginTop:'30px',
            marginBottom:'20px'
          }}
        >
          Region Wise
        </h5>
      </div>

      <Row>
        <Col>
          <HighchartsReact highcharts={Highcharts} options={options3} />
        </Col>

        <Col>
          <HighchartsReact highcharts={Highcharts} options={options4} />
        </Col>
      </Row>
    </>
  );
};

export default SEA;