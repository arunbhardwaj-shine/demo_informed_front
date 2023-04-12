import React from "react";
import { Col } from "react-bootstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";
highchartsMore(Highcharts);
solidGauge(Highcharts);

export default function ContentAnalyticsComponentActivityGauge({
  value,
  label,
  color,
  limit,
}) {

  const options = {
    chart: {
      type: "solidgauge",
      height: "80%",
    },

    tooltip: {
      borderWidth: 0,
      backgroundColor: "none",
      shadow: false,
      style: {
        fontSize: "10px",
      },
      valueSuffix: "%",
      pointFormat:
        '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.z}</span>',
      positioner: function (labelWidth) {
        return {
          x: (this.chart.chartWidth - labelWidth) / 2,
          y: this.chart.plotHeight / 2 + 15,
        };
      },
    },
    title: {
      text: "",
      style: {
        fontSize: "13px",
      },
    },
    pane: {
      startAngle: 0,
      endAngle: 360,
      background: [
        {
          outerRadius: "112%",
          innerRadius: "88%",
          backgroundColor: "#e8eaee",
          borderWidth: 0,
        },
      ],
    },
    yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,
      tickPositions: [],
    },
    plotOptions: {
      solidgauge: {
        dataLabels: {
          enabled: false,
        },
        linecap: "round",
        stickyTracking: false,
        rounded: true,
      },
    },

    series: [
      {
        name: "",
        data: [
          {
            color: color,
            radius: "112%",
            innerRadius: "88%",
            y: (value * 100) / limit,
            z: value,
          },
        ],
      },
    ],
  };

  return (
    <Col>
      

     
      <HighchartsReact highcharts={Highcharts} options={options} />

    </Col>
  );
}
