

import React, { useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";

import ActivityGauge from "./ActivityGauge";

export default function GaugeComponent({tab}) {
  console.log("hell",tab)
  return (
    <div>
         <Row>
                  <ActivityGauge
                    label="informed GO"
                    list={[
                      { "Email Sent": "50%" },
                      { "Email Opened": "0%" },
                      { "Content opened": "30%" },
                      { RTR: "20%" },
                    ]}
                    series={tab.g0}
                  />
                  <ActivityGauge
                    label="informed Pro"
                    list={[{ "": "50%" }, { "": "0%" }, { "": "30%" }]}
                    series={tab.g1}
                  />

                  <ActivityGauge
                    label="Docintel Code"
                    list={[
                      { Activated: "50%" },
                      { Opened: "0%" },
                      { RTR: "30%" },
                    ]}
                    series={tab.g2}
                  />
                  <ActivityGauge
                    label="Qr Activity"
                    list={[
                      { Scanned: "50%" },
                      { Registered: "0%" },
                      { RTR: "30%" },
                    ]}
                    series={tab.g3}
                  />
                  <ActivityGauge
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
