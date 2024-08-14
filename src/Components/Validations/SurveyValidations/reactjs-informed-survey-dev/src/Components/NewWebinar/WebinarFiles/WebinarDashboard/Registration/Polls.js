import React from "react";
import { Button, Col, Tab, Tabs } from "react-bootstrap";

const Polls = () => {
  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <div className="row">
            <div className="top-header regi-web">
              <div className="page-title">
                <div className="tabs-data">
                  <Tabs
                  // onSelect={(key) =>
                  //   tabClicked(key, data?.id, index, data?.country)
                  // }
                  // defaultActiveKey="personal-details"
                  // fill
                  >
                   <Tab
                    eventKey="live-polls"
                    title={
                        <div className="flex-column justify-content-between">
                        <span>Live Polls</span>
                        <Button style={{ marginLeft: "50px" }}>Reset All</Button>
                        </div>
                    }
                    >
                   <div className="live-polls-content" style={{display:'flex'}}>
                    <div className="left-content">
                        <h4>No Polls Created Yet!</h4>
                    </div>
                    <div className="right-content">
                     <h4>Polls Results</h4>
                    </div>
                   </div>
                    </Tab>
                    <Tab
                      eventKey="polls-creation"
                      title="Polls Creation"
                      className="flex-column justify-content-between"
                    ></Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};

export default Polls;
