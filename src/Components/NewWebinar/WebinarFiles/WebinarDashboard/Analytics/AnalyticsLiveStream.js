import React from 'react'
import { Table } from 'react-bootstrap';

const AnalyticsLiveStream = () => {
    const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  return (
    <>
          <div className='rd-analytics-box'>
              <p class="rd-box-small-title">Live stream</p>
              <div className='rd-analytics-box-layout'>
                  <div className="rd-analytics-top align-items-center d-flex justify-content-between">
                      <h6 className="mr-auto" style={{ color: '#39CABC' }}>
                          Attended HCPs
                      </h6>
                      <div className="d-flex">
                          <div className="count-number" style={{ color: '#39CABC' }}>
                            84
                          </div>
                          <img src={path_image + "doctor-svg.svg"} alt="CRM" className="CRM" />
                      </div>
                  </div>
                  <div className='attended_hcp'>
                    <div className='avg-speed'>
                          <img src={path_image + "avg-time-spend.png"} alt="" />
                    </div>
                    <div className='hcp-tracking'>
                        <img src={path_image +"hcp-online-graph.png"} alt=""/> 
                    </div>
                      <div className='top-country-data'>
                        <h6>The Top 5 Countries</h6>
                        <Table>
                            <tr>
                                <td>1. USA</td>
                                <td>21</td>
                            </tr>
                              <tr>
                                  <td>2. Portuga</td>
                                  <td>16</td>
                              </tr>
                              <tr>
                                  <td>3. Egypt</td>
                                  <td>11</td>
                              </tr>
                              <tr>
                                  <td>4. Bolivia</td>
                                  <td>9</td>
                              </tr>
                              <tr>
                                  <td>5. Spain</td>
                                  <td>7</td>
                              </tr>
                        </Table>
                          <div className="rd-box-export">
                              <img
                                  src={path_image + "arrow-export.svg"}
                                  alt=""
                              />
                          </div>
                      </div>
                  </div>
                </div>
            </div>
    </>
  )
}

export default AnalyticsLiveStream