import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const IRTRole = () => {

  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <Row>
            <div className="top-header sticky">
              <div className="page-title"><h2>IRT Role</h2> </div>
              <div className="top-right-action"></div>
            </div>

            <div className="email-result">
              <div className="col email-result-block">
                <div className="email_box_block">
                  <div className="email-block-add">
                    <Link
                    // to="/EmailArticleSelect" 
                    >
                    </Link>
                    <p>Site User-Blinded</p>
                  </div>
                  
                </div>

                <div className="email_box_block">
                  <div className="email-block-add">
                    <Link
                    // to="/EmailArticleSelect" 
                    >
                    </Link>
                    <p>Investigator-Blinded</p>
                  </div>
                  
                </div>

                <div className="email_box_block">
                  <div className="email-block-add">
                    <Link
                    // to="/EmailArticleSelect" 
                    >
                    </Link>
                    <p>Site Unblinded Pharmacist</p>
                  </div>
                  
                </div>
              </div>
            </div>
          </Row>
        </div>
      </Col>
    </>
  );
};

export default IRTRole;
