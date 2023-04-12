import React, { useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";
highchartsMore(Highcharts);
solidGauge(Highcharts);

export default function ContentAnalyticsComponentActivityGauge({ series, label, list }) {

  const [bgColors, setBgColors] = useState([
    {
      outerRadius: "112%",
      innerRadius: "88%",
      backgroundColor: Highcharts.color(Highcharts.getOptions().colors[0])
        .setOpacity(0.3)
        .get(),
      borderWidth: 0,
    },
   
  ])


  const [options, setOptions] = useState({
    chart: {
      type: "solidgauge",
      height: "80%",
    },
    title: {
      text: label,
      style: {
        fontSize: "18px",
      },
    },
    exporting: {
      enabled: false,
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
    pane: {
      startAngle: 0,
      endAngle: 360,
      background: bgColors,
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
          "name": "Shared",
          "data": [
              {
                  "color": "#0066BE",
                  "radius": "112%",
                  "innerRadius": "88%",
                  "y": 10,
                  "z": 100
                  
              }
          ]
      },
     
  ],
  });



  return (
    <Col>
 
      <HighchartsReact highcharts={Highcharts} options={options} />
      {/* <div class="stats_precenage">
        <ul class="ul_stats_first" style={{listStyle:"none"}}>
          {list.map((item, index) => {
            const key = Object.keys(item)[0];
            const value = item[key];
            return (
              <li key={index}>
                <span>{key}</span>  <span >{value}</span>
              </li>
            );
          })}
        </ul>
      </div> */}
    </Col>
  );
}
