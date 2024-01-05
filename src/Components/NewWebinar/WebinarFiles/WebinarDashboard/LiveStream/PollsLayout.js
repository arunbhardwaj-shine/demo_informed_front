import React, { useEffect } from 'react'
import { Col, Tabs, Tab, Button } from 'react-bootstrap'
import LivePolls from './LivePolls'
import PollListing from '../../../../Webinar/Survey/PollListing'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";


const PollsLayout = () => {
    const location=useLocation()
    const localStorageEvent=JSON.parse(localStorage.getItem("EventIdContext"))
    const { eventIdContext,handleEventId } = useSidebar();
    useEffect(()=>{
        if(!eventIdContext){
            handleEventId(localStorageEvent) 
        }
    },[])
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
                            <LivePolls location={location} eventIdContext={eventIdContext?eventIdContext:localStorageEvent} />
                           

                        </Tab>

                        <Tab
                            eventKey="pollscreation"
                            title="Polls Creation "
                            className="flex-column justify-content-between"
                        >
                            <PollListing location={location} eventIdContext={eventIdContext?eventIdContext:localStorageEvent}/>

                        </Tab>
                    </Tabs>
                    </div>
                </div>
            </div>
        </Col>
    </>)
}
export default PollsLayout