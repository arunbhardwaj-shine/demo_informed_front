import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Container, Form, FormGroup, Row } from 'react-bootstrap';
import Select from "react-select";
import Header from '../CommonComponent/HeaderComponent/Header';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Slider from "react-slick";

const PharmaRd = () => {
const sliderRef = useRef();
const parentRef = useRef('');
const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const options = [
  { value: 'Algeria', label: 'Algeria' },
  { value: 'Australia', label: 'Australia' },
  { value: 'America', label: 'America' }
]
 const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    useEffect(() => {
        if (!parentRef.current) {
            return;
        }

        parentRef.current.addEventListener("wheel", e => { 
            handleScroll(e)
        });
    }, [parentRef]);
        const handleScroll = e => {
        let sliderLength = sliderRef.current.props.children.length;

        var element = document.getElementsByClassName('slick-active')[0];
        var activeSlide = element.getAttribute('data-index'); 
       
      if (
             (e.deltaY < 0 && activeSlide == 0) ||
             (e.deltaY > 0 && activeSlide == sliderLength - 1)
        ) {
            return;
        }

        e.preventDefault();

        if (e.deltaY < 0) {
            let a= sliderRef.current.slickPrev();
        } else {
            let a= sliderRef.current.slickNext();
        }
    };
      const settings = ({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        centerMode: true,
        centerPadding: '0%',
        fade: true,
    });
  return (
    <>
     <div className="header-landing" sticky="top">
        <Container>
            <Row>
                <div className='d-flex justify-content-between'>
                    <div className='logo'>
                        <img src={path_image + "informed_logo.svg"} alt="Informed.pro" />
                    </div>
                    <div className='login'>
                        <Button className='btn-white' onClick={handleShow}>Login</Button>
                    </div>
                </div>
            </Row>
        </Container>
    </div>
    <div className='landing-banner pharma rd'>
        <Container>
            <Row>
                <div className='landing-block'>
                    <div className='landing-heading'>
                        <h1>Investigator Relationship Builder</h1>
                    </div>
                    <div className='landing-sub-heading'><h4>Build new experiences with your IRTs. Track what they complete, remind them and issue certificates</h4></div>
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
                    <h5>Start with any set of modules and expand your universe with add-ons or invent new tools to suit your needs. As your data grows so do your options for building better relationships based on real world data - and we’re to help you all the way.</h5>
                </div>
            </Row>
        </Container>
    </div>
    <div className='pharma-slide'>
                <div className="pharma-slider">
                    <div className="slider" ref={parentRef}>
                        <Slider {...settings} ref={sliderRef}>
                            <div className="slider-in">
                                <div className="slider-in-views">
                                    <img src={path_image + "informed-logo-slide.svg"} alt="" />
                                </div>
                            </div>
                            <div className="slider-in" style={{background:`url({path_image + "informed-logo-slide.svg"})`}}>
                                <div className="slider-in-view slide1">
                                    <div className="slide-left-sided d-flex align-items-start">
                                        <img src={path_image + "arrow-slide1.png"} alt="" />
                                    </div>
                                    <div className="slide-right-sided">
                                        <div className="slide-right-content">
                                            <img src={path_image + "logo-shape1.png"} alt="" />
                                            <h3>Content</h3>
                                            <h5>Create a library of all your content and easily distribute it. We collect deep data, tracking what HCPs have opened, what pages they’ve read and how much time they’ve spent on them.</h5>
                                         </div>
                                    </div>
                                </div>
                            </div>
                            <div className="slider-in">
                                <div className="slider-in-view slide2">
                                    <div className="slide-right-sided">
                                        <div className="slide-right-content">
                                            <img src={path_image + "logo-shape2.png"} alt="" />
                                            <h3>Consent</h3>
                                            <h5>We’ve proven time and time again that HCPs give their consent and in return you equip them with content you can be confident they’ll love. Crucially, you’ll be able to observe the way they’re using your content.</h5>
                                        </div>
                                    </div>
                                    <div className="slide-left-sided">
                                        <img src={path_image + "arrow-slide2.png"} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="slider-in">
                                <div className="slider-in-view slide3">
                                    <div className="slide-left-sided">
                                        <img src={path_image + "arrow-slide3.png"} alt="" />
                                    </div>
                                    <div className="slide-right-sided">
                                        <div className="slide-right-content">
                                            <img src={path_image + "logo-shape3.png"} alt="" />
                                            <h3>Delivery</h3>
                                            <h5>Make <strong><i>push & pull, delivery & availability</i></strong> the standard for educating your HCPs. With a broad range of modules for every situation we ensure each HCP get what they need. And with AI recommendations we can help you optimise personalised delivery engagement. </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="slider-in">
                                <div className="slider-in-view slide4">
                                    <div className="slide-right-sided">
                                        <div className="slide-right-content">
                                            <h3>Personalisation</h3>
                                            <h5>Mass communication that feels personal for each HCP? That’s the promise marketing has been waiting for.</h5>

                                            <h5>Our proprietary AI can recommend content likely to interest each HCP based on their engagement history, saving you valuable time and effort. This becomes even more powerful when combined with other modules that can automate content delivery.</h5>
                                        </div>
                                    </div>
                                    <div className="slide-left-sided">
                                        <img src={path_image + "informed-logo-slide.svg"} alt="" />
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
    </div>
    <div className="consent-content">
        <Container>
            <Row>
                <div className="consent-content-inner">
                    <div className="consent-text">
                        <h5>Consent & content data is at the foundation of all our modules. This allows you to connect the data you collect in unprecedented ways, whether it's for automating tasks, reporting, analytics, or predictions, always with consent.</h5>
                    </div>
                    <div className="consent-details">
                        <ul>
                            <li>For Clinicians</li>
                            <li>Gathers consent</li>
                            <li>Read in any browser</li>
                            <li>Read offline in the app</li>
                        </ul>
                        <div className="consent-img">
                            <img src={path_image + "doc-rd-info.png"} alt=""/>
                        </div>
                        <ul>
                            <li>For Life science</li>
                            <li>Host content</li>
                            <li>Handles consent</li>
                            <li>Predicts the future</li>
                        </ul>
                    </div>
                </div>
                <div className='works-started'>
                    <div className='works-started-links pharm-page'>
                        <h3>Modules </h3>
                        <h5>Click on a module to explore its capabilities and discover how it can benefit you. Learn about its connections with other modules and how they collectively help your clients succeed. These modules have been collaboratively developed with the pharmaceutical industry and are now integral parts of our comprehensive offerings aimed at enhancing your workflow.</h5>
                    </div>
                    <div className="modules-diagram">
                        <div className="circle" style={{'--total': "11"}}>
                            <div className="stat read" style={{'--i':"1"}}><img src={path_image+ "RTR-icon.svg"}alt="" /><span>Read-Through -Rate</span></div>
                            <div className="stat rating" style={{'--i':"2"}}><img src={path_image+ "rating-icon.svg"}alt="" /><span>Rating Tool</span></div>
                            <div className="stat automail" style={{'--i':"3"}}><img src={path_image+ "auto-email-icon.svg"}alt="" /><span>Automail</span></div>
                            <div className="stat consent" style={{'--i':"4"}}><img src={path_image+ "legal-document-icon.svg"}alt="" /><span>Consent</span></div>
                            <div className="stat engine" style={{'--i':"5"}}><img src={path_image+ "email-small-icon.svg"}alt="" /><span>Email Engine</span></div>
                            <div className="stat docintel" style={{'--i':"6"}}><img src={path_image+ "docintel-small-icon.svg"}alt="" /><span>Docintel.app</span></div>
                            <div className="stat automatic-certificate" style={{'--i':"7"}}><img src={path_image+ "auto-certificate.svg"}alt="" /><span>Automatic Certificate</span></div>
                            <div className="stat qa" style={{'--i':"8"}}><img src={path_image+ "polling-icon.svg"}alt="" /><span>Q & Poll</span></div>
                            <div className="stat survey" style={{'--i':"9"}}><img src={path_image+ "survey-icon.svg"}alt="" /><span>Survey Engine</span></div>
                            <div className="stat site" style={{'--i':"10"}}><img src={path_image+ "site-overview.svg"}alt="" /><span>Site overview</span></div>
                            <div className="stat webinar" style={{'--i':"11"}}><img src={path_image+ "webinar-small-icon.svg"}alt="" /><span>Webinar Portal</span></div>
                            <div className="module-logo">
                                <img src={path_image + "module-logo.svg"} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </Row>
        </Container>
    </div>
    <div className='contact-us pharma rd'>
        <Container>
            <Row>
                <div className='contact-inset'>
                    <h3>Contact Us</h3>
                    <h5>We’re always happy to talk to you and answer any questions you have. You might have a question about something not covered on the page, something about compliance or other requests. <br/>Please let us know what it is and who you are so we can get back to you right away.</h5>
                    <div className="form-sec">
                        <Form>
                            <Row>
                                <Col md="6">
                                    <div className="form-group">
                                        <input type="text" placeholder='Name' name="name" className="form-control"/>
                                        <span><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.1034 8.41164C12.4325 8.41164 14.3202 6.52838 14.3202 4.20564C14.3202 1.88289 12.4321 0 10.1034 0C7.77476 0 5.88599 1.88325 5.88599 4.206C5.88599 6.52874 7.77476 8.41164 10.1034 8.41164ZM11.8921 8.69831H8.31405C5.33701 8.69831 2.91504 11.1145 2.91504 14.0839V18.4485L2.92616 18.5168L3.22756 18.611C6.06862 19.4964 8.53687 19.7917 10.5685 19.7917C14.5365 19.7917 16.8365 18.6632 16.9782 18.5913L17.2599 18.4492H17.29V14.0839C17.2911 11.1145 14.8691 8.69831 11.8921 8.69831Z" fill="white" fill-opacity="0.56"/>
                                        </svg></span>
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className="form-group">
                                        <input type="email" placeholder='Email' name="email" className="form-control"/>
                                        <span><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5428 4.05714L10.2285 9.6C10.1598 9.63751 10.0829 9.65717 10.0047 9.65717C9.92644 9.65717 9.84948 9.63751 9.78084 9.6L0.457031 4.05714C0.685807 3.73138 0.989475 3.46532 1.34249 3.28136C1.6955 3.09739 2.08753 3.0009 2.4856 3H17.5142C17.9122 3.0009 18.3043 3.09739 18.6573 3.28136C19.0103 3.46532 19.314 3.73138 19.5428 4.05714ZM10.7048 10.392L19.9333 4.90625C19.9775 5.09675 19.9999 5.29165 20 5.4872V14.8015C20 15.4607 19.7381 16.093 19.2719 16.5592C18.8058 17.0253 18.1735 17.2872 17.5143 17.2872H2.48571C1.82646 17.2872 1.19421 17.0253 0.728049 16.5592C0.261887 16.093 0 15.4607 0 14.8015V5.4872C0.000141946 5.29165 0.0225076 5.09675 0.0666666 4.90625L9.30476 10.392C9.5179 10.5139 9.7592 10.5781 10.0048 10.5781C10.2503 10.5781 10.4916 10.5139 10.7048 10.392Z" fill="white" fill-opacity="0.56"/>
                                        </svg>
                                        </span>
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className="form-group">
                                        <Select
                                            options={options}
                                            placeholder="Select country"
                                            className="dropdown-basic-button split-button-dropup"
                                            />
                                            <span><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_561_11075)">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9999 9.99993C19.9999 12.1465 19.3199 14.1372 18.1645 15.7682C17.7528 16.1293 17.1149 16.1879 16.8712 16.0462C16.8091 16.0102 16.7874 15.9797 16.8112 15.8842C17.0536 14.9078 17.0149 14.4061 16.9774 13.9212C16.9616 13.7167 16.9465 13.5235 16.9516 13.2898C16.9754 12.165 16.8217 11.4929 16.4533 11.1102C16.0757 10.7182 15.5549 10.7091 15.0517 10.7007C14.6845 10.6944 14.3053 10.6879 13.9212 10.5547C12.7616 9.78114 13.085 9.272 13.5308 8.56965C13.7862 8.16766 14.0734 7.71536 13.9138 7.23922C13.979 7.11028 14.175 6.89895 14.2762 6.87063C15.1036 7.12934 17.1108 7.17848 17.4945 7.07348C17.9003 6.96223 18.2496 6.29289 18.1871 5.74739C18.1279 5.23059 17.7253 4.90762 17.1099 4.88344C17.0186 4.87973 16.8482 4.89582 16.5024 4.92883C16.0783 4.96953 15.1396 5.05938 14.805 5.01926C14.6938 4.6318 14.6083 3.85496 14.9475 3.54516C15.297 3.22535 15.9216 3.01676 16.3778 2.86445C16.5675 2.80113 16.7142 2.75121 16.8299 2.70305C18.7795 4.52907 19.9999 7.12446 19.9999 9.99993ZM4.30078 1.78785C4.66269 1.9009 4.92453 1.99445 5.13937 2.07152C6.00234 2.38031 6.09351 2.38016 7.57414 2.06856C8.54582 1.86391 8.75242 2.03356 9.06574 2.29047C9.32285 2.50141 9.64328 2.76383 10.3211 2.86035C10.5257 2.88965 10.8056 2.89809 10.9532 3.0634C11.0244 3.1436 11.0549 3.25367 11.0578 3.36082C11.0635 3.57805 10.9902 3.78328 10.9548 3.99477C10.9253 4.16992 10.9216 4.37082 10.7881 4.50528C10.6269 4.66766 10.2875 4.67926 10.074 4.72348C9.4636 4.84985 8.93996 5.05215 8.38738 5.33481C7.87274 5.59805 7.23231 5.92551 7.04359 6.89149C6.98953 7.17024 6.6025 7.24707 6.01789 7.33239C5.49363 7.40883 4.95168 7.48786 4.74937 7.92446C4.52785 8.40172 4.87144 8.89711 5.09691 9.30149C5.31414 9.69051 5.54566 10.1257 5.9357 10.3685C6.23371 10.5543 6.53445 10.5191 7.03277 10.4609C7.21402 10.4398 7.43949 10.4135 7.71152 10.3919C8.03649 10.3919 10.3728 11.0457 11.1736 11.9012C11.3318 12.0699 11.4065 12.224 11.3965 12.3588C11.3161 13.4152 10.8235 13.9965 10.302 14.612C9.81192 15.1899 9.30575 15.7875 9.18567 16.7548C9.04727 17.8733 8.64684 18.4436 8.46149 18.4485C8.4611 18.4485 8.46031 18.4485 8.45992 18.4485C8.33313 18.4485 7.90992 18.0642 7.60246 16.341C7.23289 14.2674 6.59543 13.8351 6.08336 13.4877C5.66621 13.2047 5.36488 13.0002 5.34777 11.4919C5.33656 10.492 4.80992 9.77954 3.95816 9.28614C3.19191 8.84247 1.77894 8.02254 0.966085 5.71457C1.71898 4.13356 2.87523 2.78035 4.30078 1.78785ZM9.99989 20.0001C12.9007 20.0001 15.5166 18.7579 17.3449 16.7784C17.3007 16.7814 17.2565 16.7834 17.2128 16.7834C16.9608 16.7834 16.7245 16.7318 16.5362 16.6225C16.2103 16.4334 16.0711 16.0971 16.1641 15.7234C16.3807 14.8518 16.3473 14.4247 16.3125 13.9727C16.2962 13.761 16.2791 13.5424 16.2848 13.2757C16.3036 12.3803 16.1987 11.8072 15.9728 11.5725C15.7961 11.389 15.5174 11.3754 15.0403 11.3671C14.6269 11.3602 14.1583 11.3522 13.6566 11.168C13.6324 11.1591 13.6094 11.1477 13.5882 11.1338C12.8304 10.6368 12.4608 10.1104 12.4579 9.52477C12.4557 9.01938 12.7278 8.59067 12.9678 8.21223C13.2082 7.83364 13.3488 7.59145 13.2703 7.42258C13.1386 7.1393 13.3883 6.79313 13.5487 6.61192C13.8449 6.27715 14.1779 6.13797 14.4612 6.22996C15.159 6.45641 16.9944 6.48926 17.3033 6.43344C17.3996 6.35856 17.579 6.01118 17.515 5.7702C17.5016 5.7193 17.4603 5.56438 17.0841 5.54965C17.029 5.54809 16.7829 5.57164 16.5657 5.5925C14.8121 5.76036 14.3991 5.7293 14.2394 5.41715C13.9312 4.81348 13.9261 3.82707 14.3153 3.2625C14.3678 3.18625 14.4291 3.11567 14.4973 3.05317C14.9516 2.63781 15.654 2.40328 16.1664 2.23207C16.1949 2.22262 16.224 2.21281 16.2535 2.20297C14.5398 0.825626 12.3649 0 9.99989 0C8.1916 0 6.49398 0.482383 5.02871 1.32551C5.15648 1.36973 5.26773 1.40926 5.36406 1.44383C6.08332 1.70094 6.08332 1.70094 7.43652 1.41613C8.62895 1.16508 9.03899 1.40649 9.48817 1.77488C9.71106 1.9575 9.92141 2.13008 10.4152 2.20047C10.8506 2.26238 11.2298 2.33688 11.4623 2.62094C11.8341 3.07481 11.6566 3.87352 11.5416 4.39129C11.4539 4.78504 11.2406 5.12512 10.8315 5.23539C10.4575 5.33606 10.072 5.3836 9.70199 5.50016C9.35309 5.61024 9.01063 5.76477 8.69102 5.92829C8.22613 6.16614 7.82434 6.37157 7.69813 7.01926C7.54891 7.78235 6.71937 7.90344 6.1139 7.99192C5.84851 8.03082 5.40488 8.09551 5.35394 8.20481C5.3514 8.21012 5.29656 8.34083 5.5739 8.78547L5.68301 8.96141C5.97726 9.43419 6.15476 9.71961 6.28805 9.80254C6.38437 9.86251 6.55184 9.84579 6.95523 9.7988C7.14273 9.77676 7.37648 9.74965 7.66231 9.72684C8.0761 9.69383 10.5934 10.3808 11.6044 11.3881C11.9339 11.7162 12.0878 12.06 12.0611 12.4093C11.9643 13.6813 11.3514 14.4047 10.8102 15.043C10.3447 15.5922 9.94278 16.0668 9.84723 16.8367C9.67856 18.2029 9.14133 19.0974 8.47926 19.1148C8.4718 19.115 8.46473 19.1152 8.45762 19.1152C7.76883 19.1152 7.26051 18.2214 6.94594 16.4579C6.62555 14.6612 6.1384 14.3308 5.7089 14.0393C5.10051 13.6266 4.70047 13.227 4.68101 11.4993C4.67316 10.7752 4.23597 10.2175 3.62382 9.86286C2.91378 9.45161 1.5189 8.64348 0.59796 6.59204C0.210889 7.65629 -0.000244141 8.80372 -0.000244141 9.99985C-8.78904e-05 15.5141 4.48578 20.0001 9.99989 20.0001Z" fill="white" fill-opacity="0.56"/>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_561_11075">
                                                <rect width="20" height="20" fill="white"/>
                                                </clipPath>
                                                </defs>
                                                </svg>
                                            </span>
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className="form-group">
                                        <input type="text" placeholder='Company' name="company" className="form-control"/>
                                        <span><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1667 2.60713C14.1667 2.07122 13.6682 1.67463 13.146 1.79514L3.14603 4.10283C2.76792 4.19009 2.50008 4.52677 2.50008 4.91482V17.5H2.08341C1.8533 17.5 1.66675 17.6866 1.66675 17.9167C1.66675 18.1468 1.8533 18.3334 2.08341 18.3334H2.91511H2.91675H2.91839H6.66675V15.8334C6.66675 15.3731 7.03985 15 7.50008 15H9.16675C9.627 15 10.0001 15.3731 10.0001 15.8334V18.3334H13.7484H13.7501H13.7517H14.1667V2.60713ZM5.41675 6.66669C5.18663 6.66669 5.00008 6.85324 5.00008 7.08336V7.91669C5.00008 8.14681 5.18663 8.33336 5.41675 8.33336H6.25008C6.4802 8.33336 6.66675 8.14681 6.66675 7.91669V7.08336C6.66675 6.85324 6.4802 6.66669 6.25008 6.66669H5.41675ZM5.00008 9.58336C5.00008 9.35327 5.18663 9.16669 5.41675 9.16669H6.25008C6.4802 9.16669 6.66675 9.35327 6.66675 9.58336V10.4167C6.66675 10.6468 6.4802 10.8334 6.25008 10.8334H5.41675C5.18663 10.8334 5.00008 10.6468 5.00008 10.4167V9.58336ZM5.41675 11.6667C5.18663 11.6667 5.00008 11.8533 5.00008 12.0834V12.9167C5.00008 13.1468 5.18663 13.3334 5.41675 13.3334H6.25008C6.4802 13.3334 6.66675 13.1468 6.66675 12.9167V12.0834C6.66675 11.8533 6.4802 11.6667 6.25008 11.6667H5.41675ZM7.50008 7.08336C7.50008 6.85324 7.68663 6.66669 7.91675 6.66669H8.75008C8.98016 6.66669 9.16675 6.85324 9.16675 7.08336V7.91669C9.16675 8.14681 8.98016 8.33336 8.75008 8.33336H7.91675C7.68663 8.33336 7.50008 8.14681 7.50008 7.91669V7.08336ZM7.91675 9.16669C7.68663 9.16669 7.50008 9.35327 7.50008 9.58336V10.4167C7.50008 10.6468 7.68663 10.8334 7.91675 10.8334H8.75008C8.98016 10.8334 9.16675 10.6468 9.16675 10.4167V9.58336C9.16675 9.35327 8.98016 9.16669 8.75008 9.16669H7.91675ZM7.50008 12.0834C7.50008 11.8533 7.68663 11.6667 7.91675 11.6667H8.75008C8.98016 11.6667 9.16675 11.8533 9.16675 12.0834V12.9167C9.16675 13.1468 8.98016 13.3334 8.75008 13.3334H7.91675C7.68663 13.3334 7.50008 13.1468 7.50008 12.9167V12.0834ZM10.4167 6.66669C10.1867 6.66669 10.0001 6.85324 10.0001 7.08336V7.91669C10.0001 8.14681 10.1867 8.33336 10.4167 8.33336H11.2501C11.4802 8.33336 11.6667 8.14681 11.6667 7.91669V7.08336C11.6667 6.85324 11.4802 6.66669 11.2501 6.66669H10.4167ZM10.0001 9.58336C10.0001 9.35327 10.1867 9.16669 10.4167 9.16669H11.2501C11.4802 9.16669 11.6667 9.35327 11.6667 9.58336V10.4167C11.6667 10.6468 11.4802 10.8334 11.2501 10.8334H10.4167C10.1867 10.8334 10.0001 10.6468 10.0001 10.4167V9.58336ZM10.4167 11.6667C10.1867 11.6667 10.0001 11.8533 10.0001 12.0834V12.9167C10.0001 13.1468 10.1867 13.3334 10.4167 13.3334H11.2501C11.4802 13.3334 11.6667 13.1468 11.6667 12.9167V12.0834C11.6667 11.8533 11.4802 11.6667 11.2501 11.6667H10.4167Z" fill="white" fill-opacity="0.56"/>
                                            <path d="M15 4.74219V18.333H17.0822H17.0833H17.0845H17.9167C18.1468 18.333 18.3333 18.1464 18.3333 17.9164C18.3333 17.6863 18.1468 17.4997 17.9167 17.4997H17.5V6.50721C17.5 6.19157 17.3217 5.90301 17.0393 5.76185L15 4.74219Z" fill="white" fill-opacity="0.56"/>
                                            <path d="M9.16667 18.333H7.5V15.833H9.16667V18.333Z" fill="white" fill-opacity="0.56"/>
                                            </svg>
                                        </span>
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className="form-group">
                                        <input type="number" placeholder='Phone' name="phone" className="form-control"/>
                                        <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path d="M19.5763 15.4867C19.3052 15.1839 18.4716 14.4293 17.8747 13.9796C17.2888 13.5191 16.329 12.8961 15.9552 12.7031C15.3446 12.3855 14.4247 12.4211 13.8532 12.805C13.3836 13.1319 12.9486 13.506 12.5552 13.9214L12.5466 13.9304C12.3317 14.1575 12.0432 14.3008 11.7324 14.3347C11.4217 14.3687 11.109 14.2912 10.8501 14.116C9.87673 13.4522 8.96826 12.698 8.13683 11.8632C7.30211 11.0318 6.54785 10.1233 5.88409 9.14996C5.70887 8.89109 5.63134 8.57839 5.66533 8.26764C5.69931 7.95691 5.84261 7.66835 6.06964 7.45348L6.07862 7.44488C6.49412 7.05147 6.86821 6.61651 7.19503 6.14684C7.57901 5.57535 7.61456 4.65543 7.29698 4.04488C7.10401 3.67145 6.48097 2.71285 6.02042 2.12535C5.57042 1.52848 4.81612 0.694883 4.51339 0.423789C4.01925 -0.0215235 3.18448 -0.137539 2.60206 0.179648C2.11284 0.457493 1.65453 0.786556 1.23487 1.16129L1.19073 1.20035C-1.38427 3.41559 0.311045 9.59879 5.35987 14.6379C10.4017 19.6875 16.5833 21.3839 18.7985 18.8089L18.8376 18.7648C19.2125 18.3452 19.5415 17.8869 19.8192 17.3976C20.1376 16.8156 20.0216 15.9808 19.5763 15.4867Z" fill="white" fill-opacity="0.56"/>
</svg></span>
                                    </div>
                                </Col>
                                <Col md="12">
                                    <div className="form-group">
                                        <textarea placeholder='Type Your Message..'/>
                                    </div>
                                </Col>
                            <Button className='btn-filled'>Send</Button>
                            </Row>
                        </Form>
                    </div>
                </div>
            </Row>
        </Container>
    </div>
    <div className='footer'>
        <Container>
            <Row>
                <div className='footer-inset'>
                    <div className='footer-logo'>
                        <img src={path_image +"footer-logo.svg"} alt="" />
                    </div>
                    <div className='copyright'>
                        <p>Copyright MedArkive Ltd 2023. Read our <Link to="#">Privacy Policy</Link> and <Link to="#">Terms of Use</Link></p>
                    </div>
                </div>
            </Row>
        </Container>
    </div>
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
                        <span className="pawword_img"><img src={path_image + "hide.svg"} alt=""/></span>
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

export default PharmaRd