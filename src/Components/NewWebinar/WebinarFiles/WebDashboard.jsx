import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import { useState } from "react";
import Highcharts from "highcharts";
import { ExportingAccessibilityOptions } from "highcharts";
import HighchartsReact from "highcharts-react-official";
require("highcharts/modules/exporting")(Highcharts);

const WebDashboard = () => {
  const [options, setOptions] = useState({
    chart: {
      animation: {
        duration: 500,
      },
      marginRight: 50,
    },
    title: {
      text: "HCPs virtual registered",
    },
    subtitle: {
      text:
        "Source: <a " +
        'href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"' +
        'target="_blank">Wikipedia.org</a>',
    },
    xAxis: {
      categories: ["Africa", "America", "Asia", "Europe", "Oceaniaa"],
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
      series: {
        animation: false,
        groupPadding: 0,
        pointPadding: 0.1,
        borderWidth: 0,
        colorByPoint: true,
        dataSorting: {
          enabled: true,
          matchByName: true,
        },
        type: "bar",
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
        type: "bar",
        name: "Year 1990",
        data: [631, 727, 202, 721, 26],
      },
    ],
    exporting: {
      buttons: {
        contextButton: {
          menuItems: ["printChart", "separator", "downloadPNG", "downloadPDF"],
        },
      },
    },
  });

  const [options2, setOptions2] = useState({
    chart: {
      type: "bar",
    },
    title: {
      text: "HCPs Live registered",
    },
    subtitle: {
      text:
        "Source: <a " +
        'href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"' +
        'target="_blank">Wikipedia.org</a>',
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
      series: {
        animation: false,
        groupPadding: 0,
        pointPadding: 0.1,
        borderWidth: 0,
        colorByPoint: true,
        dataSorting: {
          enabled: true,
          matchByName: true,
        },
        type: "bar",
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
        name: "Year 1990",
        data: [26, 721, 631, 727, 3202],
      },
    ],
  });

  const [template, setTemplate] = useState("1:1 meeting with IBU Haematology");

  const templateClicked = (e) => {
    setTemplate(e);
  };

  const [options3, setOptions3] = useState({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "HCPs attended by countries (108)",
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
        name: "Brands",
        colorByPoint: true,
        data: [
          {
            name: "Uruguay",
            y: 70.67,
            sliced: true,
            selected: true,
          },
          {
            name: "Andora",
            y: 14.77,
          },
          {
            name: "Argentina",
            y: 4.86,
          },
          {
            name: "Belgium",
            y: 2.63,
          },
          {
            name: "Colombia",
            y: 1.53,
          },
          {
            name: "Egypt",
            y: 1.4,
          },
          {
            name: "Maxico",
            y: 0.84,
          },
          {
            name: "Greece",
            y: 0.51,
          },
          {
            name: "Peru",
            y: 2.6,
          },
        ],
      },
    ],
  });

  const [options4, setOptions4] = useState({
    chart: {
      type: "bar",
    },
    title: {
      text: "Historic World Population by Region",
    },
    subtitle: {
      text:
        "Source: <a " +
        'href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"' +
        'target="_blank">Wikipedia.org</a>',
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
        name: "Year 1990",
        data: [631, 727, 3202, 721, 26],
      },
    ],
  });
  const [options5, setOptions5] = useState({
    chart: {
      type: "bar",
    },
    title: {
      text: "Total HCPs as Timeframe",
    },
    subtitle: {
      text:
        "Source: <a " +
        'href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"' +
        'target="_blank">Wikipedia.org</a>',
    },
    xAxis: {
      categories: ["Africa", "America", "Asia", "Europe", "Oceania"],
      title: {
        text: "Registration",
      },
    },
    yAxis: {
      categories: ["Africa", "America", "Asia", "Europe", "Oceania"],
      min: 0,
      title: {
        text: "Registration",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    tooltip: {
      valueSuffix: "millions",
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
        name: "",
        data: [],
      },
    ],
  });

  const path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [eventSelected, setEventSelected] = useState(
    "1:1 meeting with IBU Haematology"
  );

  const eventDropDownClicked = (e) => {
    console.log(e);
    setEventSelected(e);
  };

  return <div></div>;
};
export default WebDashboard;
