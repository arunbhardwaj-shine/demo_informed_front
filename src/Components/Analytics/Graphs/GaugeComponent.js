

import React, { useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";
import Gauge from "./Gauge";

export default function GaugeComponent({tab}) {
  console.log("hell",tab)
  return (
    <div>
         <Row>
                  <Gauge
                    label="informed GO"
                    list={[
                      { "Email Sent": "50%" },
                      { "Email Opened": "0%" },
                      { "Content opened": "30%" },
                      { RTR: "20%" },
                    ]}
                    series={tab.g0}
                  />
                  <Gauge
                    label="informed Pro"
                    list={[{ "": "50%" }, { "": "0%" }, { "": "30%" }]}
                    series={tab.g1}
                  />

                  <Gauge
                    label="Docintel Code"
                    list={[
                      { Activated: "50%" },
                      { Opened: "0%" },
                      { RTR: "30%" },
                    ]}
                    series={tab.g2}
                  />
                  <Gauge
                    label="Qr Activity"
                    list={[
                      { Scanned: "50%" },
                      { Registered: "0%" },
                      { RTR: "30%" },
                    ]}
                    series={tab.g3}
                  />
                  <Gauge
                    label="Peer Activity"
                    list={[
                      { Shared: "50%" },
                      { "Content Clicked": "0%" },
                      { Registered: "30%" },
                      { RTR: "20%" },
                    ]}
                    series={tab.g4}
                  />
                </Row>
    </div>
  )
}
