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
                            <div className='circle-half-bigger'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="253" height="149" viewBox="0 0 253 149" fill="none">
                                    <path d="M0.407552 45.1106C0.407552 46.5834 1.60146 47.7773 3.07422 47.7773C4.54698 47.7773 5.74089 46.5834 5.74089 45.1106C5.74089 43.6379 4.54698 42.444 3.07422 42.444C1.60146 42.444 0.407552 43.6379 0.407552 45.1106ZM209.448 45.1106L209.807 44.7625L209.448 45.1106ZM247.408 145.414C247.408 146.887 248.601 148.081 250.074 148.081C251.547 148.081 252.741 146.887 252.741 145.414C252.741 143.941 251.547 142.747 250.074 142.747C248.601 142.747 247.408 143.941 247.408 145.414ZM3.43317 45.4587C29.4773 18.6011 65.9227 1.91406 106.261 1.91406V0.914062C65.6409 0.914062 28.9398 17.7189 2.71527 44.7625L3.43317 45.4587ZM106.261 1.91406C146.6 1.91406 183.045 18.6011 209.089 45.4587L209.807 44.7625C183.583 17.7189 146.881 0.914062 106.261 0.914062V1.91406ZM209.089 45.4587C234.147 71.2991 249.574 106.552 249.574 145.414H250.574C250.574 106.282 235.039 70.7821 209.807 44.7625L209.089 45.4587Z" fill="#356D9C"/>
                                </svg>
                                <div class="icon-block">
                                    <img src={path_image + "statistics-icon.svg"} alt="" />
                                </div>
                            </div>
                            
                            <div className='circle-half-small'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="106" viewBox="0 0 46 106" fill="none">
                                    <path d="M40.5169 103.164C40.5169 104.637 41.7108 105.831 43.1836 105.831C44.6564 105.831 45.8503 104.637 45.8503 103.164C45.8503 101.691 44.6564 100.497 43.1836 100.497C41.7108 100.497 40.5169 101.691 40.5169 103.164ZM0.516927 3.16406C0.516927 4.63682 1.71083 5.83073 3.18359 5.83073C4.65635 5.83073 5.85026 4.63682 5.85026 3.16406C5.85026 1.6913 4.65635 0.497396 3.18359 0.497396C1.71083 0.497396 0.516927 1.6913 0.516927 3.16406ZM43.5447 102.818C18.8738 77.0567 3.68359 41.9101 3.68359 3.16406H2.68359C2.68359 42.1761 17.9791 77.5683 42.8225 103.51L43.5447 102.818Z" fill="#356D9C"/>
                                </svg>
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
                    <div className='landing-sub-heading'><h4>Connecting content & consent with intelligent predictions Allowing the right materials, to reach the right person, at the right time</h4></div>
                </div>
            </Row>
        </Container>
    </div>

    <div className='how-work'>
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
                        <span className='shade-left'>&nbsp;</span>
                        <h4>The future doesn’t have to mean leaving your comfort zone, we’re here to expand it! </h4>
                        <span className='shade-right'>&nbsp;</span>
                    </div>
                    <h5>With no disruptions, it is easily integrated whether you use our entire universe of tools or decide to onboard just one our planet, just know it won’t disturb your solar system. Think of us as a help in hand in the system you’ve already created.</h5>
                </div>
                <div className='works-started'>
                    <h3>Let’s get started</h3>
                    <div className='works-started-links'>
                        <h3>Tell us what you work with?</h3>
                        <div className='started-links d-flex justify-content-evenly'>
                            {/* <Link to="/pharma-rd" className='pharma-rd'>Pharma R&D</Link> */}
                            <Link to="/pharma-marketing" className='pharma-marketing'>Pharma Marketing</Link>
                            <Link to="/landing-publisher" className='publisher-gradient'>Publishers</Link>
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