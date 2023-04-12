import React from "react";
import { Col, Form, Row, Image } from "react-bootstrap";
import ContentAnalyticsComponentActivityGauge from "./ContentAnalyticsComponentActivityGauge";
export default function ContentAnalyticsComponent({ data }) {
  return (
    <>
      <Row>
        <Col>
          <Row>
            <Col>
              <Row>
                <Col>
                  <Image
                    src={data.coverImage}
                    alt="Image not availble"
                  />
                </Col>
                <Col>
                  <div>{data.title}</div>
                  <div>cancer</div>
                  <div> <span>{data.key_author}</span></div>
                  <div>{data.docintelLink}</div>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col>
                  <div>Consent type :<span>{data.limit}</span></div>
                  <div>Client :<span>{data.limit}</span></div>
                  <div>Agreed :Limit <span>{data.limit}</span></div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div>Upload Date : <span>{new Date(data.created).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
                </Col>

                <Col>
                  <div><span>{data.daysLeft}</span> to Go </div>
                </Col>
                <Col>
                  <div>Exp Date :<span>{new Date(data.exp_datetime).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <div>
              <Row>
                <ContentAnalyticsComponentActivityGauge label="Openings (total)" />
                <ContentAnalyticsComponentActivityGauge label="Unique Reader (total)" />

                <ContentAnalyticsComponentActivityGauge label="Registered Reader (total)" />
                <ContentAnalyticsComponentActivityGauge label="User With Rtr" />
                <ContentAnalyticsComponentActivityGauge label="Downloads" />
              </Row>
            </div>
          </Row>
        </Col>
      </Row>
    </>
  );
}
