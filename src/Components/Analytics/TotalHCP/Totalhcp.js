import React, { useState } from "react";
import {
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Row,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const options = {
  chart: {
    type: "bar",
  },
  title: {
    text: "Total HCPs",
  },
  xAxis: {
    categories: [
      "Mar (2023)",
      "Feb (2023)",
      "Jan (2023)",
      "Dec (2022)",
      "Nov (2022)",
      "Oct (2022)",
      "Sept (2022)",
      "Aug (2022)",
      "Jul (2022)",
      "Jun (2022)",
      "May (2022)",
      "Apr (2022)",
      "Before Mar (2022)",
    ],
  },
  yAxis: {
    min: 0,

    title: {
      text: "HCP",
    },
    stackLabels: {
      enabled: true,
    },
  },

  legend: {
    reversed: true,
  },
  plotOptions: {
    series: {
      stacking: "normal",
      // dataLabels: {
      //   enabled: true,
      // },
    },
  },
  series: [
    {
      name: "Russian Federation ",
      data: [1, 4, 8, 1, 0, 1, 2, 1, 2, 4, 1, 2, 315],
    },
    {
      name: "Russian Federation ",
      data: [1, 4, 8, 1, 0, 1, 2, 1, 2, 4, 1, 2, 300],
    },
    {
      name: "TINBS",
      data: [12, 4, 18, 15, 10, 17, 11, 15, 16, 8, 18, 25, 215],
    },
    {
      name: "SEA",
      data: [2, 4, 8, 5, 1, 7, 9, 8, 6, 8, 8, 5, 200],
    },
    {
      name: "MENA",
      data: [2, 41, 18, 5, 21, 71, 9, 38, 16, 18, 8, 15, 210],
    },
    {
      name: "Canada",
      data: [12, 14, 16, 25, 52, 7, 19, 28, 6, 12, 18, 25, 450],
    },
    {
      name: "Others",
      data: [15, 4, 6, 15, 12, 7, 9, 8, 6, 21, 12, 15, 520],
    },
  ],
};

const Totalhcp = () => {
  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="page-top-nav">
              <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
          </Row>
        </div>
      </Col>
    </>
  );
};

export default Totalhcp;
