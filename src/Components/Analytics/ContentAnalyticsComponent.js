import React from "react";
import { Col, Form, Row, Image } from "react-bootstrap";
import ContentAnalyticsComponentActivityGauge from "./ContentAnalyticsComponentActivityGauge";
export default function ContentAnalyticsComponent({ data }) {
  return (
    <>
      <Row> 
              <Col sm={7}>
                <div class="detail-box left">
                  <div class="media">
                      <div className="media-left media-middle">
                          <Image
                            src={data.coverImage}
                            alt="Image not availble"
                          />
                      </div>
                      <div className="media-body">
                          <div>{data.title}</div>
                          <div>cancer</div>
                          <div> <span>{data.key_author}</span></div>
                          <div>{data.docintelLink}</div>
                      </div>
                  </div>
                </div>
              </Col> 
              {/* <Col sm={5}>
                  <div className="detail-box">
                     <div>Consent type :<span>{data.limit}</span></div>
                     <div>Client :<span>{data.limit}</span></div>
                      <div>Agreed :Limit <span>{data.limit}</span></div>
                  </div>
                  <div class="detail-box right">
                    <div class="detail-box-grid">
                      <div class="reparkive">
                        <div class="reparkive-box">
                          <p>Upload date: <span>{new Date(data.created).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span></p>
                        </div>
                        <div class="reparkive-box second">
                            <span>{data.daysLeft}</span> to Go 
                        </div>
                        <div class="reparkive-box">
                          <p>Exp date: <span>{new Date(data.exp_datetime).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span></p>
                        </div>


                      </div>
                    </div>
                  </div>
              </Col>  */}
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
                <Col>
                  <div>Consent type :<span>{data.limit}</span></div>
                  <div>Client :<span>{data.limit}</span></div>
                  <div>Agreed :Limit <span>{data.limit}</span></div>
                </Col>
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
              <div className="circle_graph d-flex">
                <ContentAnalyticsComponentActivityGauge label="Openings (total)" />
                <ContentAnalyticsComponentActivityGauge label="Unique Reader (total)" />

                <ContentAnalyticsComponentActivityGauge label="Registered Reader (total)" />
                <ContentAnalyticsComponentActivityGauge label="User With Rtr" />
                <ContentAnalyticsComponentActivityGauge label="Downloads" />
              </div>
    </>
  );
}
