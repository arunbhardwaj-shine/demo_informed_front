import React, { useEffect, useState } from 'react'
import { Col, Tabs, Tab, Button } from 'react-bootstrap'
import LivePolls from './LivePolls'
import PollListing from '../../../../Webinar/Survey/PollListing'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";


const PollsLayout = () => {
    const [flag, setFlag] = useState(1);
    const localStorageEvent=JSON.parse(localStorage.getItem("EventIdContext"))
    const { eventIdContext,handleEventId } = useSidebar();
    const [selectedTab,setSelectedTab]=useState("live-polls")
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
        if(key === "live-polls"){
            setFlag(flag + 1);
        }
    };

    return (<>
        <Col className="right-sidebar custom-change full-width">
            <div className="custom-container">
                <div className="row">
                    <div className='poll-creation'>
                    <Tabs
                        defaultActiveKey="live-polls"
                        
                        activeKey={selectedTab}
                        onSelect={handleTabSelect}
                        fill
                    >
                        <Tab
                            eventKey="live-polls"
                            
                            title="Live Polls "
                            className="flex-column justify-content-between"
                        >
                            <LivePolls  eventIdContext={eventIdContext?eventIdContext:localStorageEvent} flag={flag} />
                            
                        </Tab>

                        <Tab
                            eventKey="polls-creation"
                            title="Polls Creation "
                            className="flex-column justify-content-between"
                        >
                            <PollListing  eventIdContext={eventIdContext?eventIdContext:localStorageEvent}/>

                        </Tab>
                    </Tabs>
                    </div>
                </div>
            </div>
        </Col>
    </>)
}
export default PollsLayout