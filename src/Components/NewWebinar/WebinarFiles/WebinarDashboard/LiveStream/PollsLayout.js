import React from 'react'
import { Col, Tabs, Tab, Button } from 'react-bootstrap'
import LivePolls from './LivePolls'
import PollListing from '../../../../Webinar/Survey/PollListing'
import { Link, useLocation, useNavigate } from "react-router-dom";

const PollsLayout = () => {
    const location=useLocation()
    return (<>
        <Col className="right-sidebar custom-change full-width">
            <div className="custom-container">
                <div className="row">
                    <div className='poll-creation'>
                    <Tabs
                        defaultActiveKey="livepolls"
                        fill
                    >
                        <Tab
                            eventKey="livepolls"
                            title="Live Polls "
                            className="flex-column justify-content-between"
                        >
                            <LivePolls location={location} />
                           

                        </Tab>

                        <Tab
                            eventKey="pollscreation"
                            title="Polls Creation "
                            className="flex-column justify-content-between"
                        >
                            <PollListing location={location}/>

                        </Tab>
                    </Tabs>
                    </div>
                </div>
            </div>
        </Col>
    </>)
}
export default PollsLayout