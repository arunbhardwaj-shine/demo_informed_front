import React, { useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";

import ActivityGauge from "./ActivityGauge";

export default function GaugeComponent({ tab, list }) {
  return (
    <div>
      <Row>
        <ActivityGauge label="InforMed GO" list={list.g0} series={tab.g0} />
        <ActivityGauge label="InforMed.pro" list={list.g1} series={tab.g1} />

        <ActivityGauge label="Docintel Code" list={list.g2} series={tab.g2} />
        <ActivityGauge label="QR Activity" list={list.g3} series={tab.g3} />
        <ActivityGauge label="Peer Activity" list={list.g4} series={tab.g4} />
        {localStorage.getItem("user_id") == "B7SHpAc XDXSH NXkN0rdQ==" ? (
          <ActivityGauge label="Direct Link" list={list.g5} series={tab.g5} />
        ) : null}
      </Row>
    </div>
  );
}
