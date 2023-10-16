import React,{useState} from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LandingHeader from './LandingHeader';
import LandingContact from './LandingContact';
import LandingFooter from './LandingFooter';

const MainLanding = () => {
const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  return (
    <>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <LandingHeader/>

    <div className='landing-banner'>
        <Container>
            <Row>
                <div className='landing-block'>
                    <div className='circular-ring'>
                        <div class="big-circle">
                            <div class="icon-block big">
                                <img src={path_image + "docintel-icon.svg"} alt="" />
                            </div>
                            <div class="icon-block medium">
                                &nbsp;
                            </div>
                            <div class="icon-block small">
                                &nbsp;
                            </div>
                        </div>
                        <div class="circle circle-inner1">
                             <div class="icon-block">
                                    <img src={path_image + "statistics-icon.svg"} alt="" />
                                </div>
                        </div>
                        <div class="circle circle-inner2">
                            <div class="icon-block">
                                 <img src={path_image + "world-icon.svg"} alt="" />
                            </div>
                            <div class="icon-block">
                                 <img src={path_image + "subtract-icon.svg"} alt="" />
                            </div>
                        </div>
                        <div class="circle circle-inner3">
                            <div className='circle-half-bigger'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="178" height="161" viewBox="0 0 178 161" fill="none">
                                    <path d="M20.4043 5.92969C20.4043 8.87521 22.7921 11.263 25.7376 11.263C28.6831 11.263 31.071 8.87521 31.071 5.92969C31.071 2.98417 28.6831 0.596354 25.7376 0.596354C22.7921 0.596354 20.4043 2.98417 20.4043 5.92969ZM145.968 5.92969C145.968 8.87521 148.356 11.263 151.301 11.263C154.247 11.263 156.635 8.87521 156.635 5.92969C156.635 2.98417 154.247 0.596354 151.301 0.596354C148.356 0.596354 145.968 2.98417 145.968 5.92969ZM145.968 128.279C145.968 131.225 148.356 133.613 151.301 133.613C154.247 133.613 156.635 131.225 156.635 128.279C156.635 125.334 154.247 122.946 151.301 122.946C148.356 122.946 145.968 125.334 145.968 128.279ZM83.1862 154.93C83.1862 157.875 85.574 160.263 88.5195 160.263C91.465 160.263 93.8529 157.875 93.8529 154.93C93.8529 151.984 91.465 149.596 88.5195 149.596C85.574 149.596 83.1862 151.984 83.1862 154.93ZM25.7376 128.279L26.4564 127.584L25.7376 128.279ZM2.01953 67.1045C2.01953 43.5896 11.3311 22.2603 26.4564 6.62497L25.0189 5.2344C9.54666 21.2284 0.0195312 43.0511 0.0195312 67.1045H2.01953ZM150.583 6.62497C165.708 22.2603 175.02 43.5896 175.02 67.1045H177.02C177.02 43.0511 167.492 21.2284 152.02 5.2344L150.583 6.62497ZM175.02 67.1045C175.02 90.6194 165.708 111.949 150.583 127.584L152.02 128.975C167.492 112.981 177.02 91.1579 177.02 67.1045H175.02ZM88.5195 153.93C64.1733 153.93 42.1771 143.835 26.4564 127.584L25.0189 128.975C41.1 145.598 63.6082 155.93 88.5195 155.93V153.93ZM26.4564 127.584C11.3311 111.949 2.01953 90.6194 2.01953 67.1045H0.0195312C0.0195312 91.1579 9.54666 112.981 25.0189 128.975L26.4564 127.584Z" fill="#49E9F3"/>
                                </svg>
                                <div class="icon-block">
                                    <img src={path_image + "email-icon-circle.svg"} alt="" />
                                 </div>
                                <div class="icon-block">
                                    <img src={path_image + "library-icon-circle.svg"} alt="" />
                                </div>
                            </div>
                            
                        </div>
                        <div class="circle circle-inner4">
                            <div class="icon-block">
                               &nbsp;
                            </div>
                        </div>
                        <div class="center-logo">
                            <div class="icon">
                                <img src={path_image + "readers-bigger.svg"} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className='landing-heading'>
                        <h1>Predictive Relationship Builder!</h1>
                    </div>
                    <div className='landing-sub-heading'><h4>Connecting content & consent with intelligent predictions<br/><br/>
The right materials reaching the right person at the right time</h4></div>
                </div>
            </Row>
        </Container>
    </div>

    <div className='how-work main-sec'>
        <Container>
            <Row>
                <Col md={5}>
                    <div className='how-work-img'>
                        <img src={path_image + "how-work.png"} alt=""/>
                    </div>
                </Col>
                <Col md={{ span: 6, offset: 1 }} className='d-flex justify-content-center align-items-center'>
                    <div className='how-work-text'>
                        <h3>How does it work? </h3>
                        <h5>We host all your content whilst using intelligence to create personalised recommendations for each HCP ( Healthcare Professional ) with their consent. </h5>
                    </div>
                </Col>
            </Row>
            <Row>
                <div className='future-expand'>
                    <div className='future-expand-content'>
                        <h4>The future doesn’t have to mean leaving your comfort zone, we’re here to expand it! </h4>
                    </div>
                    <div className='future-expand-content-shape'>
                        <span className='shade-left'>&nbsp;</span>
                        <span className='shade-right'>&nbsp;</span>
                    </div>
                    {/* <h5>With no disruptions, it is easily integrated whether you use our entire universe of tools or decide to onboard just one our planet, just know it won’t disturb your solar system. Think of us as a help in hand in the system you’ve already created.</h5> */}
                </div>
            </Row>
            <Row className='margin-gap'>
                <Col md={6} className='d-flex justify-content-center align-items-center'>
                    <div className='how-work-text'>
                        <h3>Built with and for the life sciences</h3>
                        <h5>Every module has faced HCPs, regulations and compliance. Our collaborative onboarding process is designed to enhance your current workflow.</h5>
                    </div>
                </Col>
                <Col md={5} className="build_with d-flex justify-content-end">
                    <div className='how-work-img'>
                        <img src={path_image + "build-with.png"} alt=""/>
                    </div>
                </Col>
            </Row>
            <Row>
                <div className='works-started'>
                    <h3>Let’s get started</h3>
                    <div className='works-started-links'>
                        <h3>Tell us what you work with?</h3>
                        <div className='started-links d-flex justify-content-evenly'>
                            {/* <Link to="/pharma-rd" className='pharma-rd'>Pharma R&D</Link> */}
                            {/* <Link to="/pharma-marketing" className='pharma-marketing'>Pharma Marketing</Link> */}
                            {/* <Link to="/landing-publisher" className='publisher-gradient'>Publishers</Link> */}
                            <a href='/pharma-marketing' className='pharma-marketing'>Pharma Marketing</a>
                            <a href='/landing-publisher' className='publisher-gradient'>Publishers</a>
                        </div>
                    </div>
                </div>
            </Row>
            
        </Container>
    </div>

    <div className='contact-us'>
        <Container>
            <Row>
                <LandingContact/>
            </Row>
        </Container>
    </div>
  
    <LandingFooter/> 
    </>
  )
}

export default MainLanding