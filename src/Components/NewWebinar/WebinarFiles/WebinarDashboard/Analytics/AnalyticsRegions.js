import React from 'react'
import { Button, Col, Dropdown, Row, Tab, Tabs } from 'react-bootstrap'

const AnalyticsRegions = () => {
    const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  return (
    <>
        <Col className="right-sidebar">
            <div className="custom-container">
                <Row>
                      <div className='rd-full-explain analytics-region'>
                        <div className="rd-training-block">
                            <div className="d-flex align-items-center justify-content-between">
                                {/* <div className="rd-training-block-right d-flex">
                                        <div className="switch6">
                                            <label className="switch6-light">
                                            <input
                                                type="checkbox"
                                                // ={graphType == "pie" ? true : false}
                                                //onChange={onHandleDisplayResultChange}
                                            />
                                            <span>
                                                <span>
                                                <img src={path_image + "bar-graph-img.png"} style={{transform:'rotate(90deg)'}}/>
                                                </span>
                                                <span>
                                                <img src={path_image + "pie-img.png"} />
                                                </span>
                                            </span>
                                            <a className="btn"></a>
                                            </label>
                                        </div>
                                        <Button>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="24" viewBox="0 0 6 24" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3ZM6 12C6 13.6569 4.65685 15 3 15C1.34315 15 0 13.6569 0 12C0 10.3431 1.34315 9 3 9C4.65685 9 6 10.3431 6 12ZM3 24C4.65685 24 6 22.6569 6 21C6 19.3431 4.65685 18 3 18C1.34315 18 0 19.3431 0 21C0 22.6569 1.34315 24 3 24Z" fill="#0066BE"/>
                                            </svg>
                                        </Button>
                                    </div> */}
                            </div>
                            <div className="country_tabs">
                                <Tabs
                                    defaultActiveKey="mena"
                                    className=""
                                    fill
                                >
                                    <Tab eventKey="mena" title="MENA">
                                        <div className='tabs-data'>
                                              <div className="d-flex align-items-center justify-content-between">
                                                  <div className="rd-training-block-left">
                                                      <h4>Total registered & Attended HCPs</h4>
                                                  </div>
                                                  <div className="rd-training-block-right d-flex">
                                                      <div className="switch6">
                                                          <label className="switch6-light">
                                                              <input
                                                                  type="checkbox"
                                                              // ={graphType == "pie" ? true : false}
                                                              //onChange={onHandleDisplayResultChange}
                                                              />
                                                              <span>
                                                                  <span>
                                                                      <img src={path_image + "bar-graph-img.png"} style={{ transform: 'rotate(90deg)' }} />
                                                                  </span>
                                                                  <span>
                                                                      <img src={path_image + "pie-img.png"} />
                                                                  </span>
                                                              </span>
                                                              <a className="btn"></a>
                                                          </label>
                                                      </div>
                                                      <Dropdown>
                                                          <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                              <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  width="6"
                                                                  height="24"
                                                                  viewBox="0 0 6 24"
                                                                  fill="none"
                                                              >
                                                                  <path
                                                                      fill-rule="evenodd"
                                                                      clip-rule="evenodd"
                                                                      d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3ZM6 12C6 13.6569 4.65685 15 3 15C1.34315 15 0 13.6569 0 12C0 10.3431 1.34315 9 3 9C4.65685 9 6 10.3431 6 12ZM3 24C4.65685 24 6 22.6569 6 21C6 19.3431 4.65685 18 3 18C1.34315 18 0 19.3431 0 21C0 22.6569 1.34315 24 3 24Z"
                                                                      fill="#0066BE"
                                                                  />
                                                              </svg>
                                                          </Dropdown.Toggle>

                                                          <Dropdown.Menu>
                                                              <Dropdown.Item>Download PNG</Dropdown.Item>
                                                              <Dropdown.Item>Download JPEG</Dropdown.Item>
                                                              <Dropdown.Item>Download PDF</Dropdown.Item>
                                                              <Dropdown.Item>Download SVG</Dropdown.Item>
                                                          </Dropdown.Menu>
                                                      </Dropdown>
                                                      {/* <Button>
                                                          <svg xmlns="http://www.w3.org/2000/svg" width="6" height="24" viewBox="0 0 6 24" fill="none">
                                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3ZM6 12C6 13.6569 4.65685 15 3 15C1.34315 15 0 13.6569 0 12C0 10.3431 1.34315 9 3 9C4.65685 9 6 10.3431 6 12ZM3 24C4.65685 24 6 22.6569 6 21C6 19.3431 4.65685 18 3 18C1.34315 18 0 19.3431 0 21C0 22.6569 1.34315 24 3 24Z" fill="#0066BE" />
                                                          </svg>
                                                      </Button> */}
                                                  </div>
                                              </div>
                                            <div className="graph-view">
                                                <img src={path_image + "registered-attended.png"} alt="" />
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="latam" title="LATAM">
                                        <img src={path_image + "attended-hcp.png"} alt="" />
                                    </Tab>
                                    <Tab eventKey="eu" title="EU">
                                        <img src={path_image + "attended-hcp.png"} alt="" />
                                    </Tab>
                                    <Tab eventKey="brazil" title="Brazil">
                                        <img src={path_image + "attended-hcp.png"} alt="" />
                                    </Tab>
                                    <Tab eventKey="ee/cis" title="EE/CIS">
                                        <img src={path_image + "attended-hcp.png"} alt="" />
                                    </Tab>
                                    <Tab eventKey="other" title="Other">
                                        <img src={path_image + "attended-hcp.png"} alt="" />
                                    </Tab>
                                    <Tab eventKey="tinbs" title="TINBS">
                                        <img src={path_image + "attended-hcp.png"} alt="" />
                                    </Tab>
                                    <Tab eventKey="mexico" title="Mexico">
                                        <img src={path_image + "attended-hcp.png"} alt="" />
                                    </Tab>
                                    <Tab eventKey="russian" title="Russian Federation">
                                        <img src={path_image + "attended-hcp.png"} alt="" />
                                    </Tab>
                                    <Tab eventKey="zaf" title="ZAF">
                                        <img src={path_image + "attended-hcp.png"} alt="" />
                                    </Tab>
                                    <Tab eventKey="us" title="US">
                                        <img src={path_image + "attended-hcp.png"} alt="" />
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>  
                      </div>
                </Row>
            </div>
        </Col>
    </>
  )
}

export default AnalyticsRegions