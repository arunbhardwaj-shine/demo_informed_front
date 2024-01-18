import React, { useEffect, useState } from 'react'
import { Col, Tabs, Tab, Button } from 'react-bootstrap'
import LivePolls from './LivePolls'
import PollListing from '../../../../Webinar/Survey/PollListing'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";


const PollsLayout = () => {
    const location=useLocation();
    const [flag, setFlag] = useState(1);
    const localStorageEvent=JSON.parse(localStorage.getItem("EventIdContext"))
    const { eventIdContext,handleEventId } = useSidebar();
    const [selectedTab,setSelectedTab]=useState("livepolls")
    useEffect(()=>{
        if(!eventIdContext){
            handleEventId(localStorageEvent) 
        }
    },[])

    const handleTabSelect = (key) => {
        if(key==selectedTab){
            return
        }
        setSelectedTab(key)
        if(key === "livepolls"){
            setFlag(flag + 1);
        }
    };

    return (<>
        <Col className="right-sidebar custom-change full-width">
            <div className="custom-container">
                <div className="row">
                    <div className='poll-creation'>
                    <Tabs
                        defaultActiveKey="livepolls"
                        
                        activeKey={selectedTab}
                        onSelect={handleTabSelect}
                        fill
                    >
                        <Tab
                            eventKey="livepolls"
                            
                            title="Live Polls "
                            className="flex-column justify-content-between"
                        >
                            <LivePolls location={location} eventIdContext={eventIdContext?eventIdContext:localStorageEvent} flag={flag} />
                            
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