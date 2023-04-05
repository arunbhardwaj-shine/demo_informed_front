import React, { useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";
import Gauge from "./Gauge";
import GaugeComponent from "./GaugeComponent";
highchartsMore(Highcharts);
solidGauge(Highcharts);
const DeliveryTrends = () => {
  Highcharts.setOptions({
    colors: [
      "#0066BE",
      "#F58289",
      "#FFBE2C",
      "#00D4C0",
      "#0066BE",
      "#FFBE2C",
      "#F0EEE4",
      "#00003C",
    ],
  });

  const data={
    
    "tab0":{
    "g0":[
      {
        name: "Email Send",
        data: [
          {
            color: Highcharts.getOptions().colors[0],
            radius: "112%",
            innerRadius: "88%",
            y: 52,
            z: 12,
          },
        ],
      },
      {
        name: "Email opened",
        data: [
          {
            color: Highcharts.getOptions().colors[1],
            radius: "87%",
            innerRadius: "63%",
            y: 0,
            z: 22,
          },
        ],
      },
      {
        name: "Content Opened",
        data: [
          {
            color: Highcharts.getOptions().colors[2],
            radius: "62%",
            innerRadius: "38%",
            y: 22,
            z: 12,
          },
        ],
      },
      {
        name: "RTR (Read Through Rate)",
        data: [
          {
            color: Highcharts.getOptions().colors[3],
            radius: "38%",
            innerRadius: "18%",
            y: 25,
            z: 22,
          },
        ],
      },
    ],
    "g1":[
      {
        name: "",
        data: [
          {
            color: Highcharts.getOptions().colors[0],
            radius: "112%",
            innerRadius: "88%",
            y: 12,
            z: 12,
          },
        ],
      },
      {
        name: "Email opening",
        data: [
          {
            color: Highcharts.getOptions().colors[1],
            radius: "87%",
            innerRadius: "63%",
            y: 0,
            z: 22,
          },
        ],
      },
      {
        name: "CTR",
        data: [
          {
            color: Highcharts.getOptions().colors[2],
            radius: "62%",
            innerRadius: "38%",
            y: 22,
            z: 12,
          },
        ],
      },
      {
        name: "RTR (Read Through Rate)",
        data: [
          {
            color: Highcharts.getOptions().colors[3],
            radius: "38%",
            innerRadius: "18%",
            y: 25,
            z: 22,
          },
        ],
      },
    ],
    
    "g2":[
      {
        name: "Activated",
        data: [
          {
            color: Highcharts.getOptions().colors[1],
            radius: "87%",
            innerRadius: "63%",
            y: 0,
            z: 22,
          },
        ],
      },
      {
        name: "Opened",
        data: [
          {
            color: Highcharts.getOptions().colors[2],
            radius: "62%",
            innerRadius: "38%",
            y: 22,
            z: 12,
          },
        ],
      },
      {
        name: "RTR",
        data: [
          {
            color: Highcharts.getOptions().colors[3],
            radius: "38%",
            innerRadius: "18%",
            y: 25,
            z: 22,
          },
        ],
      },
    ],

"g3":[
  {
    name: "Scanned",
    data: [
      {
        color: Highcharts.getOptions().colors[1],
        radius: "87%",
        innerRadius: "63%",
        y: 0,
        z: 22,
      },
    ],
  },
  {
    name: "Registered",
    data: [
      {
        color: Highcharts.getOptions().colors[2],
        radius: "62%",
        innerRadius: "38%",
        y: 22,
        z: 12,
      },
    ],
  },
  {
    name: "RTR ",
    data: [
      {
        color: Highcharts.getOptions().colors[3],
        radius: "38%",
        innerRadius: "18%",
        y: 25,
        z: 22,
      },
    ],
  },
],"g4":[
  {
    name: "",
    data: [
      {
        color: Highcharts.getOptions().colors[0],
        radius: "112%",
        innerRadius: "88%",
        y: 100,
        z: 12,
      },
    ],
  },
  {
    name: "Email opening",
    data: [
      {
        color: Highcharts.getOptions().colors[1],
        radius: "87%",
        innerRadius: "63%",
        y: 0,
        z: 22,
      },
    ],
  },
  {
    name: "CTR",
    data: [
      {
        color: Highcharts.getOptions().colors[2],
        radius: "62%",
        innerRadius: "38%",
        y: 22,
        z: 12,
      },
    ],
  },
  {
    name: "RTR (Read Through Rate)",
    data: [
      {
        color: Highcharts.getOptions().colors[3],
        radius: "38%",
        innerRadius: "18%",
        y: 25,
        z: 22,
      },
    ],
  },
]
    
  },

  "tab1":{
    "g0":[
      {
        name: "Email Send",
        data: [
          {
            color: Highcharts.getOptions().colors[0],
            radius: "112%",
            innerRadius: "88%",
            y: 52,
            z: 12,
          },
        ],
      },
      {
        name: "Email opened",
        data: [
          {
            color: Highcharts.getOptions().colors[1],
            radius: "87%",
            innerRadius: "63%",
            y: 0,
            z: 22,
          },
        ],
      },
      {
        name: "Content Opened",
        data: [
          {
            color: Highcharts.getOptions().colors[2],
            radius: "62%",
            innerRadius: "38%",
            y: 22,
            z: 12,
          },
        ],
      },
      {
        name: "RTR (Read Through Rate)",
        data: [
          {
            color: Highcharts.getOptions().colors[3],
            radius: "38%",
            innerRadius: "18%",
            y: 25,
            z: 22,
          },
        ],
      },
    ],
    "g1":[
      {
        name: "",
        data: [
          {
            color: Highcharts.getOptions().colors[0],
            radius: "112%",
            innerRadius: "88%",
            y: 12,
            z: 12,
          },
        ],
      },
      {
        name: "Email opening",
        data: [
          {
            color: Highcharts.getOptions().colors[1],
            radius: "87%",
            innerRadius: "63%",
            y: 10,
            z: 22,
          },
        ],
      },
      {
        name: "CTR",
        data: [
          {
            color: Highcharts.getOptions().colors[2],
            radius: "62%",
            innerRadius: "38%",
            y: 12,
            z: 12,
          },
        ],
      },
      {
        name: "RTR (Read Through Rate)",
        data: [
          {
            color: Highcharts.getOptions().colors[3],
            radius: "38%",
            innerRadius: "18%",
            y: 25,
            z: 22,
          },
        ],
      },
    ],
    
    "g2":[
      {
        name: "Activated",
        data: [
          {
            color: Highcharts.getOptions().colors[1],
            radius: "87%",
            innerRadius: "63%",
            y: 60,
            z: 22,
          },
        ],
      },
      {
        name: "Opened",
        data: [
          {
            color: Highcharts.getOptions().colors[2],
            radius: "62%",
            innerRadius: "38%",
            y: 52,
            z: 12,
          },
        ],
      },
      {
        name: "RTR",
        data: [
          {
            color: Highcharts.getOptions().colors[3],
            radius: "38%",
            innerRadius: "18%",
            y: 25,
            z: 22,
          },
        ],
      },
    ],

"g3":[
  {
    name: "Scanned",
    data: [
      {
        color: Highcharts.getOptions().colors[1],
        radius: "87%",
        innerRadius: "63%",
        y: 30,
        z: 22,
      },
    ],
  },
  {
    name: "Registered",
    data: [
      {
        color: Highcharts.getOptions().colors[2],
        radius: "62%",
        innerRadius: "38%",
        y: 72,
        z: 12,
      },
    ],
  },
  {
    name: "RTR ",
    data: [
      {
        color: Highcharts.getOptions().colors[3],
        radius: "38%",
        innerRadius: "18%",
        y: 25,
        z: 22,
      },
    ],
  },
],"g4":[
  {
    name: "",
    data: [
      {
        color: Highcharts.getOptions().colors[0],
        radius: "112%",
        innerRadius: "88%",
        y: 100,
        z: 12,
      },
    ],
  },
  {
    name: "Email opening",
    data: [
      {
        color: Highcharts.getOptions().colors[1],
        radius: "87%",
        innerRadius: "63%",
        y: 30,
        z: 22,
      },
    ],
  },
  {
    name: "CTR",
    data: [
      {
        color: Highcharts.getOptions().colors[2],
        radius: "62%",
        innerRadius: "38%",
        y: 52,
        z: 12,
      },
    ],
  },
  {
    name: "RTR (Read Through Rate)",
    data: [
      {
        color: Highcharts.getOptions().colors[3],
        radius: "38%",
        innerRadius: "18%",
        y: 75,
        z: 22,
      },
    ],
  },
]
    
  },
  "tab2":{
    "g0":[
      {
        name: "Email Send",
        data: [
          {
            color: Highcharts.getOptions().colors[0],
            radius: "112%",
            innerRadius: "88%",
            y: 100,
            z: 12,
          },
        ],
      },
      {
        name: "Email opened",
        data: [
          {
            color: Highcharts.getOptions().colors[1],
            radius: "87%",
            innerRadius: "63%",
            y: 99,
            z: 22,
          },
        ],
      },
      {
        name: "Content Opened",
        data: [
          {
            color: Highcharts.getOptions().colors[2],
            radius: "62%",
            innerRadius: "38%",
            y: 72,
            z: 12,
          },
        ],
      },
      {
        name: "RTR (Read Through Rate)",
        data: [
          {
            color: Highcharts.getOptions().colors[3],
            radius: "38%",
            innerRadius: "18%",
            y: 55,
            z: 22,
          },
        ],
      },
    ],
    "g1":[
      {
        name: "",
        data: [
          {
            color: Highcharts.getOptions().colors[0],
            radius: "112%",
            innerRadius: "88%",
            y: 72,
            z: 12,
          },
        ],
      },
      {
        name: "Email opening",
        data: [
          {
            color: Highcharts.getOptions().colors[1],
            radius: "87%",
            innerRadius: "63%",
            y: 10,
            z: 22,
          },
        ],
      },
      {
        name: "CTR",
        data: [
          {
            color: Highcharts.getOptions().colors[2],
            radius: "62%",
            innerRadius: "38%",
            y: 72,
            z: 12,
          },
        ],
      },
      {
        name: "RTR (Read Through Rate)",
        data: [
          {
            color: Highcharts.getOptions().colors[3],
            radius: "38%",
            innerRadius: "18%",
            y: 75,
            z: 22,
          },
        ],
      },
    ],
    
    "g2":[
      {
        name: "Activated",
        data: [
          {
            color: Highcharts.getOptions().colors[1],
            radius: "87%",
            innerRadius: "63%",
            y: 60,
            z: 22,
          },
        ],
      },
      {
        name: "Opened",
        data: [
          {
            color: Highcharts.getOptions().colors[2],
            radius: "62%",
            innerRadius: "38%",
            y: 52,
            z: 12,
          },
        ],
      },
      {
        name: "RTR",
        data: [
          {
            color: Highcharts.getOptions().colors[3],
            radius: "38%",
            innerRadius: "18%",
            y: 25,
            z: 22,
          },
        ],
      },
    ],

"g3":[
  {
    name: "Scanned",
    data: [
      {
        color: Highcharts.getOptions().colors[1],
        radius: "87%",
        innerRadius: "63%",
        y: 30,
        z: 22,
      },
    ],
  },
  {
    name: "Registered",
    data: [
      {
        color: Highcharts.getOptions().colors[2],
        radius: "62%",
        innerRadius: "38%",
        y: 72,
        z: 12,
      },
    ],
  },
  {
    name: "RTR ",
    data: [
      {
        color: Highcharts.getOptions().colors[3],
        radius: "38%",
        innerRadius: "18%",
        y: 25,
        z: 22,
      },
    ],
  },
],"g4":[
  {
    name: "",
    data: [
      {
        color: Highcharts.getOptions().colors[0],
        radius: "112%",
        innerRadius: "88%",
        y: 100,
        z: 12,
      },
    ],
  },
  {
    name: "Email opening",
    data: [
      {
        color: Highcharts.getOptions().colors[1],
        radius: "87%",
        innerRadius: "63%",
        y: 30,
        z: 22,
      },
    ],
  },
  {
    name: "CTR",
    data: [
      {
        color: Highcharts.getOptions().colors[2],
        radius: "62%",
        innerRadius: "38%",
        y: 52,
        z: 12,
      },
    ],
  },
  {
    name: "RTR (Read Through Rate)",
    data: [
      {
        color: Highcharts.getOptions().colors[3],
        radius: "38%",
        innerRadius: "18%",
        y: 75,
        z: 22,
      },
    ],
  },
]
    
  }
}
  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <Tabs defaultActiveKey="1">
              <Tab eventKey="1" title="All Business Units" >
              <GaugeComponent tab={data.tab0}/>
              </Tab>
              <Tab eventKey="2" title="Haematology">
              <GaugeComponent tab={data.tab1}/>
              </Tab>
              <Tab eventKey="3" title="Critical Care">
              <GaugeComponent tab={data.tab2}/>
              </Tab>
              <Tab eventKey="4" title="Immunotherapy">
              <GaugeComponent tab={data.tab0}/>
              </Tab>
            </Tabs>
          </Row>
        </div>
      </Col>
    </>
  );
};
export default DeliveryTrends;
