import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import Select from "react-select";

const AnalyticsEmailView = () => {
    const options = [
        { value: 'Invitation email facilisi vitae leo odio 2024', label: 'Invitation email facilisi vitae leo odio 2024' },
        { value: 'Announcement email facilisi vitae leo odio 2024', label: 'Announcement email facilisi vitae leo odio 2024' },
        { value: 'Coming soon email facilisi vitae leo odio 2024', label: 'Coming soon email facilisi vitae leo odio 2024' }
    ]
    const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    return (
        <>
            <Col className="right-sidebar">
                <div className="custom-container">
                    <Row>
                        <div className="top-header">
                            <div className="page-title d-flex flex-column align-items-start">
                                <h2>Emails</h2>
                            </div>
                        </div>
                        <div className='webinar-emails-details'>
                            <p>Select the email to see the stats:</p>
                            <Form>
                                <Select
                                    options={options}
                                    className="dropdown-basic-button split-button-dropup mr-2 btn-bigger">
                                </Select>
                            </Form>
                        </div>
                        <div className="rd-full-explain webinar-emails-statss">
                            <div className="rd-training-block">
                                <div className="d-flex align-items-start justify-content-between">
                                    <div className="rd-training-block-left">
                                        <h5>Invitation Email facilisi vitae leo odio 2024 </h5>
                                        <p className="email-date">April. 22. 2024 | 8:00 am</p>
                                    </div>
                                    <div className="rd-training-block-right d-flex">
                                        <Button className='print'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M2 4C2 2.89543 2.89543 2 4 2H7.41667C7.96895 2 8.41667 1.55228 8.41667 1C8.41667 0.447715 7.96895 0 7.41667 0H4C1.79086 0 0 1.79086 0 4V7.41667C0 7.96895 0.447715 8.41667 1 8.41667C1.55228 8.41667 2 7.96895 2 7.41667V4Z" fill="#0066BE"></path><path d="M16.5833 0C16.031 0 15.5833 0.447715 15.5833 1C15.5833 1.55228 16.031 2 16.5833 2H20C21.1046 2 22 2.89543 22 4V7.41667C22 7.96895 22.4477 8.41667 23 8.41667C23.5523 8.41667 24 7.96895 24 7.41667V4C24 1.79086 22.2091 0 20 0H16.5833Z" fill="#0066BE"></path><path d="M2 16.5833C2 16.031 1.55228 15.5833 1 15.5833C0.447715 15.5833 0 16.031 0 16.5833V20C0 22.2091 1.79086 24 4 24H8.33333C8.88562 24 9.33333 23.5523 9.33333 23C9.33333 22.4477 8.88562 22 8.33333 22H4C2.89543 22 2 21.1046 2 20V16.5833Z" fill="#0066BE"></path><path d="M24 16.5833C24 16.031 23.5523 15.5833 23 15.5833C22.4477 15.5833 22 16.031 22 16.5833V20C22 21.1046 21.1046 22 20 22H16.5833C16.031 22 15.5833 22.4477 15.5833 23C15.5833 23.5523 16.031 24 16.5833 24H20C22.2091 24 24 22.2091 24 20V16.5833Z" fill="#0066BE"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M9 12.5004C9 10.8449 10.344 9.5 11.9996 9.5C13.6551 9.5 15 10.8449 15 12.5004C15 14.156 13.6551 15.5 11.9996 15.5C10.344 15.5 9 14.156 9 12.5004ZM13.7991 12.5004C13.7991 11.5073 12.9927 10.7 11.9996 10.7C11.0064 10.7 10.2 11.5073 10.2 12.5004C10.2 13.4936 11.0064 14.3 11.9996 14.3C12.9927 14.3 13.7991 13.4936 13.7991 12.5004Z" fill="#0066BE"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16.5963 8.3H18.4615C18.8952 8.3 19.3118 8.46771 19.6194 8.7676C19.927 9.06757 20.1 9.47489 20.1 9.9V16.5C20.1 17.3862 19.3642 18.1 18.4615 18.1H5.53846C4.63579 18.1 3.9 17.3862 3.9 16.5V9.9C3.9 9.47489 4.07298 9.06757 4.38065 8.7676C4.68823 8.46771 5.10478 8.3 5.53846 8.3H7.4037C7.47384 8.3 7.53879 8.26556 7.57717 8.2097L8.67004 6.61137C8.97401 6.16652 9.48587 5.9 10.0326 5.9H13.9674C14.5141 5.9 15.026 6.1665 15.33 6.61137L16.4228 8.20961C16.4611 8.26552 16.5261 8.3 16.5963 8.3ZM9.85906 7.3904L8.76624 8.98866C8.46169 9.43342 7.94989 9.7 7.4037 9.7H5.53846C5.48265 9.7 5.42956 9.72164 5.39042 9.7592C5.35199 9.79727 5.33077 9.84786 5.33077 9.9V16.5C5.33077 16.608 5.42144 16.7 5.53846 16.7H18.4615C18.5786 16.7 18.6692 16.608 18.6692 16.5V9.9C18.6692 9.84787 18.648 9.79729 18.6096 9.75923C18.5705 9.72165 18.5174 9.7 18.4615 9.7H16.5963C16.0501 9.7 15.5383 9.43347 15.2338 8.98871L14.1409 7.3904C14.1026 7.33449 14.0376 7.3 13.9674 7.3H10.0326C9.96249 7.3 9.89744 7.33457 9.85906 7.3904Z" fill="#0066BE"></path></svg>
                                        </Button>
                                    </div>
                                </div>
                                <div className='analytics_email_stats'>
                                    <div className='d-flex align-items-center email_stats_gap flex-wrap'>
                                        <div className='email-stats-send'>
                                            <div className='email-box'>
                                                <p>Emails send</p>
                                                <div className='email_stats_list d-flex align-items-end justify-content-between'>
                                                    <div className="d-flex align-items-center">
                                                        <img src={path_image + 'mailes_send.svg'} alt='Export' /> <p>19213</p> 
                                                    </div>
                                                    <div className="rd-box-export">
                                                        <img src={path_image + 'arrow-export.svg'} alt='Export' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='email-stats-send'>
                                            <div className='email-box opened'>
                                                <p>Emails opened</p>
                                                <div className='email_stats_list d-flex align-items-end justify-content-between'>
                                                    <div className="d-flex align-items-center">
                                                        <img src={path_image + 'mail-opened-icon.svg'} alt='Export' /> <p>23.90% (4591)</p> 
                                                    </div>
                                                    <div className="rd-box-export">
                                                        <img src={path_image + 'arrow-export.svg'} alt='Export' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='email-stats-details'>
                                            <div className='email-box d-flex'>
                                                <Col className='video-click '>
                                                    <p>Video click</p>
                                                    <div className='email_stats_list d-flex align-items-end justify-content-between'>
                                                        <div className="d-flex align-items-center">
                                                            <img src={path_image + 'video-click-banner.svg'} alt='Export' /> <p>2.46% (113)</p>
                                                        </div>
                                                        <div className="rd-box-export">
                                                            <img src={path_image + 'arrow-export.svg'} alt='Export' />
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col className='registration-banner'>
                                                    <p>ISTH registeration banner click</p>
                                                    <div className='email_stats_list d-flex align-items-end justify-content-between'>
                                                        <div className="d-flex align-items-center">
                                                            <img src={path_image + 'registration-banner-icon.svg'} alt='Export' /> <p>3.40% (156)</p>
                                                        </div>
                                                        <div className="rd-box-export">
                                                            <img src={path_image + 'arrow-export.svg'} alt='Export' />
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col className='video-banner'>
                                                    <p>Video booth banner click</p>
                                                    <div className='email_stats_list d-flex align-items-end justify-content-between'>
                                                        <div className="d-flex align-items-center">
                                                            <img src={path_image + 'video-banner-click-icon.svg'} alt='Export' /> <p>1.20% (55)</p>
                                                        </div>
                                                        <div className="rd-box-export">
                                                            <img src={path_image + 'arrow-export.svg'} alt='Export' />
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col className='registration'>
                                                    <p>Registration</p>
                                                    <div className='email_stats_list d-flex align-items-end justify-content-between'>
                                                        <div className="d-flex align-items-center">
                                                            <img src={path_image + 'registration-icon.svg'} alt='Export' /> <p>1.20% (55)</p>
                                                        </div>
                                                        <div className="rd-box-export">
                                                            <img src={path_image + 'arrow-export.svg'} alt='Export' />
                                                        </div>
                                                    </div>
                                                </Col>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                               
                                <div className="graph-view">
                                    <img src={path_image + "email-stats.png"} alt="" />
                                </div>
                            </div>
                        </div>
                    </Row>
                </div>
            </Col>
        </>
    )
}

export default AnalyticsEmailView