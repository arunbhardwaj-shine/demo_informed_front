import React, { useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";

import ActivityGauge from "./ActivityGauge";

export default function GaugeComponent({ tab, list }) {
  return (
    <div>
      <Row>
        <ActivityGauge label="informed GO" list={list.g0} series={tab.g0} />
        <ActivityGauge label="informed Pro" list={list.g1} series={tab.g1} />

        <ActivityGauge label="Docintel Code" list={list.g2} series={tab.g2} />
        <ActivityGauge label="Qr Activity" list={list.g3} series={tab.g3} />
        <ActivityGauge label="Peer Activity" list={list.g4} series={tab.g4} />
      </Row>
    </div>
  );
}
