import React from "react";
import { Col, Row } from "react-bootstrap";
import Header from "../../Layout/Header";
import Sidebar from "../../Layout/Sidebar";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <Row>
        <Col>
          <Sidebar />
        </Col>
        <Col>Webinar Dashboard  </Col>
      </Row>
    </div>
  );
};

export default Dashboard;