import { setNestedObjectValues } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ExportApi from "../../../Api/ExportApi";
import EmailStatsChart from "./EmailStatsChart";
import RegionStatsChart from "./RegionStatsChart";
import { Tabs, Tab } from "react-bootstrap";
const Home = () => {
  const [event, setEvent] = useState([]);
  const [eventid, setEventId] = useState();
  const [status, setStatus] = useState();
  const [key, setKey] = useState("home");
  const handleGetEventlist = () => {
    ExportApi.GetEventList().then((resp) => {
      if (resp.ok) {
        setEvent(resp.data.data);
        if (eventid == null || eventid == undefined) {
          setEventId(resp.data.data[0].id);
        }
      }
    });
  };
  useEffect(() => {
    handleGetEventlist();
  }, []);
  return (
    <div class="right-sidebar col">
      <Row>
        <Col md={{ span: 10, offset: 2 }}>
          <Row>
            <Col className="mb-5">
              <Form.Label>Select Event </Form.Label>
              <Form.Select
                value={eventid}
                onChange={(e) => {
                  setEventId(e.target.value);
                }}
                name="type"
              >
                <option value="Shine"> Select Event</option>
                {event?.map((val, i) => (
                  <React.Fragment key={i}>
                    <option value={val.id}>{val.title}</option>
                  </React.Fragment>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <div className="container">
            <Tabs defaultActiveKey="first">
              <Tab eventKey="first" title="Dashboard">
                Hii, I am 1st tab content
              </Tab>
              <Tab eventKey="second" title="Attended Dashboard">
                Hii, I am 2nd tab content
              </Tab>
              <Tab eventKey="third" title="Poll Question">
                Hii, I am 3rd tab content
              </Tab>
              <Tab eventKey="fourth" title="Webinar Questions">
                Hii, I am 3rd tab content
              </Tab>
              <Tab eventKey="fifth" title="Email Stats">
                <EmailStatsChart eventid={eventid} />
              </Tab>
              <Tab eventKey="sixth" title="Region Stats">
                <RegionStatsChart eventid={eventid} />
              </Tab>
              <Tab eventKey="seventh" title="Link Stats">
                Hii, I am 3rd tab content
              </Tab>
            </Tabs>
          </div>
          <hr style={{ color: "#0066BE" }} size={4}></hr>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
