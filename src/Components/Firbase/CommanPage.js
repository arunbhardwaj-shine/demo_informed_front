import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import WebinarQuestion from './WebinarQuestion';
import { useNavigate } from "react-router-dom";
import PollQuestion from './PollQuestion';
import { Col, Container } from 'react-bootstrap';
const CommanPage = () =>{
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const navigation = useNavigate();

    return (
      <>
      <header
      className="sticky webinar-quest">
       <Container>
          <nav className="navbar navbar-expand-sm navbar-light">
              <div className="d-flex justify-content-between align-items-center" style={{width:"100%"}}>
              <Col md={6} lg={6}>
                <Tabs>
                  <TabList className="nav nav-fill">
                  
                    <Tab eventKey="webinar" className="nav-item nav-link" onClick={()=>navigation(`/question-list?evnt=event-test1`)}>Webinar</Tab>
                    <Tab eventKey="poll-question" className="nav-item nav-link" onClick={()=>navigation(`/poll-question?evnt=event-test1`)}>PollQuestion </Tab>
                    <Tab eventKey="all-answers" className="nav-item nav-link" onClick={()=>navigation(`/webinar-question?evnt=event-test1`)}>All Answer</Tab>
                  </TabList>
                </Tabs>
              </Col>
              <Col md={6} lg={6}>
                <div className="right-sec d-flex justify-content-end align-items-center">
                  <h6><span>Webinar</span>Speaker Zone</h6>
                  <img src={path_image + "informed_icon.png"} alt="icon"/>
                </div>
              </Col>
              </div>
          </nav>
        </Container>
    </header>
    {/* <div className=''>
    <Tabs>
      <TabPanel eventKey="webinar">
        <WebinarQuestion />
      </TabPanel>
      <TabPanel eventKey="poll-question">
        <PollQuestion />
      </TabPanel>
      <TabPanel eventKey="all-answers">
          <h2>Any content 2</h2>
      </TabPanel>
    </Tabs>
     </div> */}
       </>
    )
}
export default  CommanPage