import React from "react";
import { Col, Row } from "react-bootstrap";
import Header from "../Layout/Header";
// import Sidebar from "../Layout/Sidebar";
const Home = () => {
  return (
    <div>
      <Header />
      <Row>
        {/* <Col>
          <Sidebar />
        </Col> */}
        <Col>Home Page </Col>
      </Row>
    </div>
  );
};

export default Home;
