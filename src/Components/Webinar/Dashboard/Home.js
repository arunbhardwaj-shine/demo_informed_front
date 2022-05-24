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
  const [templateList, setTemplateList] = useState();
  const [templateId, setTemplateId] = useState();
  const [status, setStatus] = useState();
  const handleGetEventlist = () => {
    ExportApi.GetEventList().then((resp) => {
      if (resp.ok) {
        setEvent(resp.data.data);
      }
    });
  };
  const handleGetTemplateList = (id) => {
    ExportApi.UserTemplateList(id).then((resp) => {
      if (resp.ok) {
        console.log("first", resp.data.code);
        if (resp.data.code == 404) {
        }
        setTemplateList(resp.data.data);
      }
    });
  };
  useEffect(() => {
    handleGetEventlist();
  }, []);
  return (
    <div>
      <Row>
        <Col md={{ span: 10, offset: 2 }}>
          <Row>
            <Col className="mb-5">
              <Form.Label>Select Event </Form.Label>
              <Form.Select
                onChange={(e) => {
                  handleGetTemplateList(e.target.value);
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
          <Row>
            <Col>
              <Form.Label>Select Template </Form.Label>
              <Form.Select
                name="type"
                onChange={(e) => {
                  setTemplateId(e.target.value);
                }}
              >
                <option value="null"> Select Template</option>
                {templateList
                  ? templateList?.map((val, i) => (
                      <React.Fragment key={i}>
                        <option value={val.id}>{val.name}</option>
                      </React.Fragment>
                    ))
                  : null}
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
                <EmailStatsChart eventid={eventid} templateId={templateId} />
              </Tab>
              <Tab eventKey="sixth" title="Region Stats">
                <RegionStatsChart eventid={eventid} templateId={templateId} />
              </Tab>
              <Tab eventKey="seventh" title="Link Stats">
                Hii, I am 3rd tab content
              </Tab>
            </Tabs>
          </div>
          <hr style={{ color: "#0066BE" }} size={4}></hr>

          <Row>
            {status == 4 ? (
              <EmailStatsChart eventid={eventid} templateId={templateId} />
            ) : null}

            {status == 5 ? (
              <RegionStatsChart eventid={eventid} templateId={templateId} />
            ) : null}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
