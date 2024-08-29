import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Container, Form, FormGroup, Row } from 'react-bootstrap';
import Select from "react-select";
import LandingHeader from "./LandingHeader";
import LandingContact from "./LandingContact";
import LandingFooter from "./LandingFooter";
import { Link } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";

const PharmaRnd = () => {
    const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            />
            <LandingHeader />

            <div className='landing-banner pharma rd'>
                <Container>
                    <Row>
                        <div className='landing-block'>
                            <div className='landing-heading'>
                                <h1>Automate your training tools</h1>
                            </div>
                            <div className='landing-sub-heading'><h4>Simplify your training and ensure you systematically get every IRT and site certified.</h4></div>
                            <div className="circular-height">
                                <div className='circular-ring'>
                                    <div className="big-circle">
                                        <div className="icon-block icon56">
                                            <img src={path_image + "subtract-icon.svg"} alt="" />
                                        </div>
                                        <div className="icon-block icon43 gradient">
                                            &nbsp;
                                        </div>
                                        <div className="icon-block icon72">
                                            <img src={path_image + "statistics-icon.svg"} alt="" />
                                        </div>
                                        <div className="icon-block icon43">
                                            &nbsp;
                                        </div>
                                        <div className="icon-block icon60">
                                            <img src={path_image + "world-icon.svg"} alt="" />
                                        </div>
                                        <div className="icon-block icon27">
                                            &nbsp;
                                        </div>
                                        <div className="icon-block icon56">
                                            <img src={path_image + "survay-icon.svg"} alt="" />
                                        </div>
                                        <div className="icon-block icon43 gradient">
                                            &nbsp;
                                        </div>
                                        <div className="icon-block icon72">
                                            <img src={path_image + "legal-document-icon2.svg"} alt="" />
                                        </div>
                                        <div className="icon-block icon43">
                                            &nbsp;
                                        </div>
                                        <div className="icon-block icon60">
                                            <img src={path_image + "world-icon.svg"} alt="" />
                                        </div>
                                        <div className="icon-block icon27">
                                            &nbsp;
                                        </div>
                                    </div>
                                    <div className="circle circle-inner1">
                                        <div className="icon-block icon72">
                                            <img src={path_image + "white-emails.svg"} alt="" />
                                        </div>
                                        <div className="icon-block icon35">
                                            &nbsp;
                                        </div>
                                        <div className="icon-block icon60">
                                            <img src={path_image + "white-rtr.svg"} alt="" />
                                        </div>
                                        <div className="icon-block icon72">
                                            <img src={path_image + "white-webinar.svg"} alt="" />
                                        </div>
                                        <div className="icon-block icon35">
                                            &nbsp;
                                        </div>
                                        <div className="icon-block icon60">
                                            <img src={path_image + "white-portal.svg"} alt="" />
                                        </div>


                                    </div>
                                    <div className="circle circle-inner2">
                                        <div className="icon-block icon60">
                                            <img src={path_image + "white-spc.svg"} alt="" />
                                        </div>
                                        <div className="icon-block icon35">
                                            &nbsp;
                                        </div>
                                        <div className="icon-block icon85">
                                            <img src={path_image + "white-docintel.svg"} alt="" />
                                        </div>
                                        <div className="icon-block icon60">
                                            <img src={path_image + "white-rating.svg"} alt="" />
                                        </div>
                                        <div className="icon-block icon35">
                                            &nbsp;
                                        </div>
                                        <div className="icon-block icon85">
                                            <img src={path_image + "white-docintel.svg"} alt="" />
                                        </div>
                                    </div>
                                    <div className="circle circle-inner3">
                                        <div className="icon-block icon27">
                                            &nbsp;
                                        </div>
                                        <div className="icon-block icon60">
                                            <img src={path_image + "white-polling.svg"} alt="" />
                                        </div>
                                        <div className="icon-block icon27">
                                            &nbsp;
                                        </div>
                                        <div className="icon-block icon60">
                                            <img src={path_image + "white-library.svg"} alt="" />
                                        </div>

                                    </div>
                                    <div className="center-logo">
                                        <div className="icon">
                                            <img src={path_image + "readers-bigger.svg"} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Row>
                </Container>
            </div>
            <div className='how-work rd'>
                <Container>
                    <Row>
                        <div className='faster-site'>
                            <div className="faster-site-heading text-center">
                                <h3>Faster site onboarding</h3>
                                <h5>Automate IRT training. Input roles once, then watch as training, certification, and updates roll out automatically as your trial evolves. Effortless compliance, from start to finish.</h5>
                            </div>
                            <div className="rd-point d-flex align-items-center justify-content-center w-100">
                                <div className="rd-point-left context">
                                    <div>Role-specific learning <span>&nbsp;</span></div>
                                    <div>Personalised digital libraries <span>&nbsp;</span></div>
                                    <div>Automated completion tracking <span>&nbsp;</span></div>
                                </div>
                                <div className="rd-point-img">
                                    <img src={path_image +"rd-circle-site.png"} alt=""/>
                                </div>
                                <div className="rd-point-right context">
                                    <div>Faster training and protocol updates <span>&nbsp;</span></div>
                                    <div>Virtual investigator meetings <span>&nbsp;</span></div>
                                    <div>Collaborate with external partners <span>&nbsp;</span></div>
                                </div>
                            </div>
                        </div>
                    </Row>
                    <Row>
                        <div className="text-center rd-greater-sec">
                            <img src={path_image + "rd-greater.png"} alt=""/>
                        </div>
                        <div className='future-expand rd-greater-sec'>
                            <div className='future-expand-content'>
                                <h4>Greater awareness among site staff</h4>
                            </div>
                            <div className='future-expand-content-shape'>
                                <span className='shade-left'>&nbsp;</span>
                                <span className='shade-right'>&nbsp;</span>
                            </div>
                            <h5>Engage site staff through an ongoing customised program, keeping them informed to help investigators recruit patients faster.</h5>
                        </div>
                    </Row>
                    <Row className="how-works-sec">
                        <Col md={5}>
                            <div className='how-work-img rd-works-img'>
                                <img src={path_image + "rd-shortening.png"} alt="" />
                            </div>
                        </Col>
                        <Col md={{ span: 6, offset: 1 }} className='d-flex justify-content-center align-items-center'>
                            <div className='how-work-text'>
                                <h3>Shortening the trial, day by day</h3>
                                <h5>Let inforMed.pro track doctors training activities, allowing you and your CRO to collaborate faster with less manual input, saving you days.<br/>
                                Replacing in-situ Investigator Meetings with virtual IM’s not only reduces costs but also ensures more IRTs can attend or watch important details at their convenience.</h5>
                            </div>
                        </Col>
                    </Row>
                    <Row className="how-works-last">
                        <Col md={6} className='d-flex justify-content-center align-items-center'>
                            <div className='how-work-text'>
                                <h3>Built in partnership with pharma R&D to meet the needs of a modern trial</h3>
                                <h5>With decades of experience, our trial tools are built on our proven technology used by pharmaceutical companies worldwide. Behind the simplified interface lies advanced AI technology, supported by multiple layers of safety and security.</h5>
                            </div>
                        </Col>
                        <Col md={{ span: 5, offset: 1 }} className="d-flex justify-content-end">
                            <div className='how-work-img'>
                                <img src={path_image + "rd-build.png"} alt="" />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <div className='future-expand rd-sec'>
                            <div className='future-expand-content'>
                                <h4>Build better relationships with HCPs</h4>
                            </div>
                            <div className='future-expand-content-shape'>
                                <span className='shade-left'>&nbsp;</span>
                                <span className='shade-right'>&nbsp;</span>
                            </div>
                            <h5>Elevate trial engagement through smarter training. Tailor content delivery, incorporate feedback from IRTs, sites, and staff, and personalize learning experiences. Build trust and loyalty that extends beyond your current trial to future collaborations.</h5>
                        </div>
                    </Row>
                </Container>
            </div>

            <div className='contact-us pharma rd'>
                <Container>
                    <Row>
                        <LandingContact source="Pharma-trial">
                            <h5>
                                We’re always happy to talk to you and answer any questions you have. You might have a question about something not covered on the page, something about compliance or other requests.
                            </h5>
                            <h5>We're here to help, leave your details below and we'll get back to you straight away.</h5>
                        </LandingContact>
                    </Row>
                </Container>
            </div>
            <LandingFooter />
            <Modal show={show} onHide={handleClose} className='login-confirm' id="download-qr" aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FormGroup>
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="form-control" />
                                <span><svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.9333 1.77222L10.7048 6.87521C10.4916 6.98865 10.2503 7.04833 10.0048 7.04833C9.7592 7.04833 9.5179 6.98865 9.30476 6.87521L0.0666666 1.77222C0.0225076 1.94943 0.000141946 2.13073 0 2.31264V10.9771C0 11.5903 0.261887 12.1785 0.728049 12.6121C1.19421 13.0458 1.82646 13.2894 2.48571 13.2894H17.5143C18.1735 13.2894 18.8058 13.0458 19.2719 12.6121C19.7381 12.1785 20 11.5903 20 10.9771V2.31264C19.9999 2.13073 19.9775 1.94943 19.9333 1.77222Z" fill="#97B6CF"></path><path d="M10.2285 6.13954L19.5428 0.983389C19.314 0.680352 19.0103 0.432858 18.6573 0.261728C18.3043 0.0905987 17.9122 0.000838778 17.5142 0H2.4856C2.08753 0.000838778 1.6955 0.0905987 1.34249 0.261728C0.989475 0.432858 0.685807 0.680352 0.457031 0.983389L9.78084 6.13954C9.84948 6.17443 9.92644 6.19272 10.0047 6.19272C10.0829 6.19272 10.1598 6.17443 10.2285 6.13954Z" fill="#97B6CF"></path></svg></span>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div className="form-group pass">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="form-control" />
                                <span><svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.625 7.5H13V5C13 2.2425 10.7575 0 7.99999 0C5.2425 0 3 2.2425 3 5V7.5H2.375C1.34167 7.5 0.5 8.34083 0.5 9.37499V18.125C0.5 19.1592 1.34167 20 2.375 20H13.625C14.6583 20 15.5 19.1592 15.5 18.125V9.37499C15.5 8.34083 14.6583 7.5 13.625 7.5ZM4.66666 5C4.66666 3.16166 6.16166 1.66667 7.99999 1.66667C9.83833 1.66667 11.3333 3.16166 11.3333 5V7.5H4.66666V5ZM8.83333 13.935V15.8333C8.83333 16.2933 8.46083 16.6667 7.99999 16.6667C7.53916 16.6667 7.16666 16.2933 7.16666 15.8333V13.935C6.67083 13.6458 6.33333 13.1142 6.33333 12.5C6.33333 11.5808 7.08083 10.8333 7.99999 10.8333C8.91916 10.8333 9.66666 11.5808 9.66666 12.5C9.66666 13.1142 9.32916 13.6458 8.83333 13.935Z" fill="#97B6CF"></path></svg></span>
                                <span className="pawword_img"><img src={path_image + "hide.svg"} alt="" /></span>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="check-remember"
                                />
                                <label className="form-check-label" for="check-remember">Remember me</label>
                            </div>
                        </FormGroup>
                        <button type="submit" className="btn btn-primary save btn-filled">
                            Login
                        </button>
                        <div className='forgot-details'>
                            <Link to="#">Forget password?</Link>
                        </div>

                    </Form>
                </Modal.Body>
            </Modal>

        </>
    )
}

export default PharmaRnd