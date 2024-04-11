import React from 'react'
import { Col } from 'react-bootstrap'

const AnalyticsRegistration = () => {


const [pieChartData,setPiechartData]=useState([])
    const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  return (
    <>
        <div className='rd-analytics-box'>
              <p class="rd-box-small-title">Registration</p>
              <div className='rd-analytics-box-layout d-flex justify-content-between align-items-start'>
                <Col md={3}>
                    <div className="rd-analytics-top d-flex justify-content-between align-items-center" >
                        <h6 className="regi-title">
                            Total Registrations
                        </h6>
                        <div className="d-flex">
                            <div className="count-number">
                                102
                            </div>
                              <img src={path_image + "crm.svg"} alt="CRM" className="CRM" />
                        </div>
                    </div>
                    <div className='graph-box'>
                        <div className='highchart-chart'>
                            <img src={path_image + "total-registration-analytics.png"} alt="" />
                        </div>
                          <div className="rd-box-export">
                              <img
                                  src={path_image + "arrow-export.svg"}
                                  alt=""
                              //   onClick={() => {
                              //       individualCompletionfn();
                              //   }}
                              />
                          </div>
                    </div>
                      
                  </Col>
                  <Col md={9}>
                    <div className="rd-analytics-top d-flex justify-content-between align-items-center" >
                        <h6 className="regi-hcp">
                            Registered HCPs
                        </h6>
                        <div className="d-flex">
                            <div className="count-number">
                                94
                            </div>
                              <img src={path_image + "irt.svg"} alt="" className="doctor" />
                        </div>
                    </div>
                        <div className='graph-box d-flex justify-content-between'>
                            <div className='highchart-chart left-side'>
                              <img src={path_image + "registered-hcp-analytics.png"} alt="" />
                              <div className="rd-box-export">
                                  <img
                                      src={path_image + "arrow-export.svg"}
                                      alt=""
                                  //   onClick={() => {
                                  //       individualCompletionfn();
                                  //   }}
                                  />
                              </div>
                            </div>
                          
                          <div className='highchart-chart right-side'>
                              <img src={path_image + "registered-overtime-analytics.png"} alt="" />
                          </div>
                        </div>
                  </Col>
              </div>

        </div>
    </>
  )
}

export default AnalyticsRegistration