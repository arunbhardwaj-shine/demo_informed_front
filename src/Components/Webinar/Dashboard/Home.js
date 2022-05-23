import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ExportApi from "../../../Api/ExportApi";
import EmailStatsChart from "./EmailStatsChart";

const Home = () => {
  const [event, setEvent] = useState([]);
  const [eventid, setEventId] = useState();
  const [templateList, setTemplateList] = useState();
  const [templateId, setTemplateId] = useState();
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
                onChange={(e)=>{handleGetTemplateList(e.target.value);setEventId(e.target.value)}}
                  name="type">
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
              <Col><Button>Dashboard</Button></Col>
              <Col><Button>Poll Question</Button></Col>
              <Col><Button>Webinar Question</Button></Col>
              <Col><Button>Email Stats</Button></Col>
              <Col><Button>Region Stats</Button></Col>
              <Col><Button>Links Stats</Button></Col>
            </Row>
            <hr style={{color:"#0066BE"}}size={4}></hr>
            <Row>
              <Col>
              <Form.Label>Select Template </Form.Label>
                <Form.Select
                  name="type"
                  onChange={(e)=>{setTemplateId(e.target.value)}}
                >
                  <option value="null"> Select Template</option>
                  {templateList
                    ? templateList?.map((val, i) => (
                        <React.Fragment key={i}>
                          <option value={val.id}>{val.name}</option>
                        </React.Fragment>
                      ))
                    : null}
                </Form.Select></Col>
            </Row>
            <Row>
              <EmailStatsChart eventid={eventid} templateId={templateId}/>
            </Row>
      </Col>
      </Row>
    </div>
  );
};

export default Home;
