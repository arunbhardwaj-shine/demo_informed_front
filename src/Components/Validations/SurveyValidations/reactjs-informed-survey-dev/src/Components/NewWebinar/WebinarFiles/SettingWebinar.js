import React from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
const data = [
  {
    name: "Webinar Setting",
    type: "radio",
    value1: "Video",
    value2: "Webinar",
    radio: "webinarSetting",
  },
  {
    name: "Ask Live Question",
    type: "radio",
    value1: "Yes",
    value2: "No",
    radio: "question",
  },
  {
    name: "Reset Question and Answers",
    type: "button",
    value: "Reset",
  },
];
const SettingWebinar = () => {
  return (
    <>
      <Col className="col right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="top-header">
              <div className="page-title">
                <h2>Webinar Settings</h2>
              </div>
            </div>
          </Row>
          <div className="main-webinar-content">
            <div className="websetting-content">
              {data.map((item, index) => (
                <div className="websetting" key={index}>
                  <span>{item.name}</span>

                  <div className="websetting-radio">
                    {item.type == "button" ? (
                      <Button className="btn-bordered">{item?.value} </Button>
                    ) : (
                      <>
                        <Form.Check
                          type="radio"
                          name={item?.radio}
                          label={item.value1}
                        />
                        <Form.Check
                          type="radio"
                          name={item?.radio}
                          label={item.value2}
                        />
                      </>
                    )}
                  </div>
                </div>
              ))}
              <Button className="websetting-button btn-filled">Save </Button>
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};
export default SettingWebinar;
