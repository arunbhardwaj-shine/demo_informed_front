import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const IRTRole = () => {

  const navigate = useNavigate();
  const navigateEmail = (pdfId,role) => {
    let obj = { pdfId: pdfId,IRTFlag: 1,siteRole: role};
    localStorage.setItem("IRTFlag",1)
    navigate("/EmailList", {
      state: {IrtObj:obj},
    });
  };
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <Row>
            <div className="top-header sticky">
              <div className="page-title"><h2>Email IRT</h2> </div>
              <div className="top-right-action"></div>
            </div>

            {/* <div className="email-result">
              <div className="col email-result-block">
                <div className="email_box_block">
                  <div className="email-block-add">
                    <Link
                    // to="/EmailArticleSelect" 
                    >
                    </Link>
                    <p onClick={() => navigateEmail(3968,'Site User-Blinded')}>Site User-Blinded</p>
                  </div>
                  
                </div>

                <div className="email_box_block">
                  <div className="email-block-add">
                    <Link
                    // to="/EmailArticleSelect" 
                    >
                    </Link>
                    <p onClick={() => navigateEmail(4521,'Investigator-Blinded')}>Investigator-Blinded</p>
                  </div>
                  
                </div>

                <div className="email_box_block">
                  <div className="email-block-add">
                    <Link
                    // to="/EmailArticleSelect" 
                    >
                    </Link>
                    <p onClick={() => navigateEmail(3970,'Site unblinded pharmacist')}>Site Unblinded Pharmacist</p>
                  </div>
                  
                </div>
              </div>
            </div> */}
            <div className="landing-layout irt_create_role d-flex">

                  <Col className="irt-create">
                    <div className="irt-create-upper">
                      <div className="d-flex justify-content-end align-items-center">
                        <div className="count-number">144</div>
                          <img src={path_image + "IRT-doctor.svg"} alt=""/>
                        
                        </div>
                      <div className=""><h3>Site User-Blinded</h3></div>
                    </div>
                    <div className="irt-status">
                      <div className="started"> 
                        <p>Started</p>
                        <div className="irt-value">
                          <span>&nbsp;</span>
                          30%
                        </div>
                      </div>
                      <div className="completed">
                        <p>Completed</p>
                        <div className="irt-value">
                          <span>&nbsp;</span>
                          60%
                        </div>
                      </div>
                      <div className="ignored">
                        <p>Ignored</p>
                        <div className="irt-value">
                          <span>&nbsp;</span>
                          10%
                        </div>
                      </div>
                      <div className="bar-chart">
                      <svg width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="31.5002" cy="31.5002" r="31.5002" fill="#39CABC" />
                        <path d="M56.5072 50.6553C60.0739 45.999 62.2697 40.4395 62.8473 34.6027C63.425 28.766 62.3616 22.8838 59.7769 17.6188C57.1922 12.3537 53.1889 7.91485 48.2177 4.80209C43.2466 1.68933 37.5051 0.0263087 31.6399 0.000309478L31.5002 31.5002L56.5072 50.6553Z" fill="#FAC755" />
                        <path d="M40.755 61.6103C46.5718 59.8224 51.7462 56.388 55.6527 51.7221C59.5593 47.0562 62.0307 41.3587 62.7683 35.3182L31.5002 31.5002L40.755 61.6103Z" fill="#F58289" />
                      </svg>
                      </div>
                    </div>
                  </Col>
                  <Col className="irt-create">
                    <div className="irt-create-upper">
                      <div className="d-flex  justify-content-end align-items-center">
                        <div className="count-number">109</div>
                          <img src={path_image + "IRT-doctor.svg"} alt=""/>
                        
                        </div>
                      <div className=""><h3>Investigatoar-Blinded</h3></div>
                    </div>
                    <div className="irt-status">
                      <div className="started"> 
                        <p>Started</p>
                        <div className="irt-value">
                          <span>&nbsp;</span>
                          30%
                        </div>
                      </div>
                      <div className="completed">
                        <p>Completed</p>
                        <div className="irt-value">
                          <span>&nbsp;</span>
                          60%
                        </div>
                      </div>
                      <div className="ignored">
                        <p>Ignored</p>
                        <div className="irt-value">
                          <span>&nbsp;</span>
                          10%
                        </div>
                      </div>
                      <div className="bar-chart">
                      <svg width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="31.5002" cy="31.5002" r="31.5002" fill="#39CABC" />
                        <path d="M56.5072 50.6553C60.0739 45.999 62.2697 40.4395 62.8473 34.6027C63.425 28.766 62.3616 22.8838 59.7769 17.6188C57.1922 12.3537 53.1889 7.91485 48.2177 4.80209C43.2466 1.68933 37.5051 0.0263087 31.6399 0.000309478L31.5002 31.5002L56.5072 50.6553Z" fill="#FAC755" />
                        <path d="M40.755 61.6103C46.5718 59.8224 51.7462 56.388 55.6527 51.7221C59.5593 47.0562 62.0307 41.3587 62.7683 35.3182L31.5002 31.5002L40.755 61.6103Z" fill="#F58289" />
                      </svg>
                      </div>
                    </div>
                  </Col>
                  <Col className="irt-create">
                    <div className="irt-create-upper">
                      <div className="d-flex justify-content-end align-items-center">
                        <div className="count-number">123</div>
                          <img src={path_image + "IRT-doctor.svg"} alt=""/>
                        
                        </div>
                      <div className=""><h3>Site Unblinded Pharmacist</h3></div>
                    </div>
                    <div className="irt-status">
                      <div className="started"> 
                        <p>Started</p>
                        <div className="irt-value">
                          <span>&nbsp;</span>
                          30%
                        </div>
                      </div>
                      <div className="completed">
                        <p>Completed</p>
                        <div className="irt-value">
                          <span>&nbsp;</span>
                          60%
                        </div>
                      </div>
                      <div className="ignored">
                        <p>Ignored</p>
                        <div className="irt-value">
                          <span>&nbsp;</span>
                          10%
                        </div>
                      </div>
                      <div className="bar-chart">
                      <svg width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="31.5002" cy="31.5002" r="31.5002" fill="#39CABC" />
                        <path d="M56.5072 50.6553C60.0739 45.999 62.2697 40.4395 62.8473 34.6027C63.425 28.766 62.3616 22.8838 59.7769 17.6188C57.1922 12.3537 53.1889 7.91485 48.2177 4.80209C43.2466 1.68933 37.5051 0.0263087 31.6399 0.000309478L31.5002 31.5002L56.5072 50.6553Z" fill="#FAC755" />
                        <path d="M40.755 61.6103C46.5718 59.8224 51.7462 56.388 55.6527 51.7221C59.5593 47.0562 62.0307 41.3587 62.7683 35.3182L31.5002 31.5002L40.755 61.6103Z" fill="#F58289" />
                      </svg>
                      </div>
                    </div>
                  </Col>

            </div>
          </Row>
        </div>
      </Col>
    </>
  );
};

export default IRTRole;
