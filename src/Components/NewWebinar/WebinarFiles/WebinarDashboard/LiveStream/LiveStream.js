import React, { useState } from 'react'
import { Col, Tabs, Tab, Button } from 'react-bootstrap';

const LiveStream = () => {
  const [readers, setReaders] = useState([
    { name: "A", email: "a@abc.com" },
    { name: "B", email: "b@abc.com" },
    { name: "C", email: "c@abc.com" },
    { name: "D", email: "d@abc.com" },
    { name: "E", email: "e@abc.com" },
    { name: "F", email: "f@abc.com" },
    { name: "G", email: "g@abc.com" },
    { name: "H", email: "h@abc.com" }
  ])
  return (
    <>

      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <div className="row">
            <Col className="col-4" >

              Engagements
              <div className="doc-content-main-box col" style={{ height: "860px", border: "1px solid black" }}>
                <div className="live-stream-tabs-data" style={{ padding: "5px" }}>
                  <Tabs
                    defaultActiveKey="new"
                    fill
                  >
                    <Tab
                      eventKey="new"
                      title="New "
                      className="flex-column justify-content-between"
                    >
                      <div className="doc-content-header">
                        <div className="doc-content">
                          <h4>Question | {"8"}</h4>
                        </div>
                      </div>
                      <div className="tab-panel d-flex flex-column justify-content-between">
                        {readers?.length ?
                          readers?.map((item, index) => {
                            return (<>
                              <div className="live-stream-ques col" style={{ margin: "3px" }}>
                                <div className="live-stream-ques-header">
                                  <div className="live-stream-hcp">
                                    <h4>{item?.name}</h4>
                                  </div>
                                </div>
                                <div className='reader-message'>
                                  If you want to divide the container into three equal portions using Bootstrap's grid system,
                                  you can use the col class with the appropriate width for each column.
                                  In Bootstrap, you can use the col-4 class to create three equal-width columns
                                  within a row. Here's how you can modify your code:
                                </div>
                                <div>
                                  <Button className="btn btn-outline-primary btn-bordered">
                                    Send To Speaker
                                  </Button>
                                  <Button className="btn btn-outline-primary btn-bordered">
                                    Delete
                                  </Button>
                                  <Button className="btn btn-outline-primary btn-bordered">
                                    Ignore
                                  </Button>
                                </div>
                              </div>
                            </>)
                          })
                          : ""}
                      </div>
                    </Tab>
                    <Tab
                      eventKey="sent"
                      title="Sent "
                      className="flex-column justify-content-between"
                    >

                    </Tab>

                    <Tab
                      eventKey="ignored"
                      title="Ignored "
                      className="flex-column justify-content-between"
                    >

                    </Tab>

                  </Tabs>
                </div>
              </div>
            </Col>
            <Col className="col-4">
              Live HCP's Tracking
            </Col>
            <Col className="col-4">
              Attendees
            </Col>
          </div>
        </div>
      </Col>
    </>
  );
}

export default LiveStream