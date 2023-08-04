import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React,{useEffect, useState} from "react"
import 'react-tabs/style/react-tabs.css';
import WebinarQuestion from './WebinarQuestion';
import PollQuestion from './PollQuestion';
import { useLocation,useNavigate,useSearchParams  } from 'react-router-dom';
import { Col, Container } from 'react-bootstrap';
const CommanPage = () =>{
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const navigation = useNavigate();
  const [index,setIndex] = useState(0)
  const[queryData,setQueryData] = useState("")
  const [constData,setConstData] = useState([
    "/Webinar/question-list","/Webinar/poll-question","/Webinar/webinar-question"
  ])
  const location = useLocation();
  const [searchParams] = useSearchParams();

    useEffect(()=>{
      const data =  constData.indexOf(location.pathname)
      console.log("-data",searchParams.get('evnt'))
      setQueryData(searchParams.get('evnt'))
      if(data >-1){
         setIndex(data)
      }
    },[])
    const handleChange = (value)=>{
    const data =  constData.indexOf(value)
    if(data >-1){
       setIndex(data)
    }
    }
    return (
      <>
       <div className="loader" id="custom_loader">
        <div className="loader_show">
          <span className="loader-view"> </span>
        </div>
      </div>
      <header
      className="sticky webinar-quest">
       <Container>
          <nav className="navbar navbar-expand-sm navbar-light">
              <div className="d-flex justify-content-between align-items-center" style={{width:"100%"}}>
              <Col md={6} lg={6}>
                <Tabs selectedIndex={index}>
                  <TabList className="nav nav-fill">
                    <Tab eventKey="webinar" className="nav-item nav-link" onClick={()=>{
                       handleChange("/Webinar/question-list")
                      navigation(`/Webinar/question-list?evnt=${queryData}`)
                     }}>Webinar</Tab>
                    <Tab eventKey="poll-question" className="nav-item nav-link" onClick={()=>{
                       handleChange("/Webinar/poll-question")
                      navigation(`/Webinar/poll-question?evnt=${queryData}`)
                     }}>Poll Question </Tab>
                    <Tab eventKey="all-answers" className="nav-item nav-link" onClick={()=>{
                      handleChange("/Webinar/webinar-question")
                      navigation(`/Webinar/webinar-question?evnt=${queryData}`)
                    
                      }}>All Answer</Tab>
                  </TabList>
                </Tabs>
              </Col>
              <Col md={6} lg={6}>
                <div className="right-sec d-flex justify-content-end align-items-center">
                  <h6><span>Webinar</span>Speaker Zone</h6>
                  <img src={"/componentAssets/images/" + "informed_icon.png"} alt="icon"/>
                </div>
              </Col>
              </div>
          </nav>
        </Container>
    </header>
       </>
    )
}
export default  CommanPage