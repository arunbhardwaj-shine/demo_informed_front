import React,{useState} from 'react'
import { Col, Row } from 'react-bootstrap';
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const data = [
  {
    image:`${path_image}create-icon.png`,
    title:"Create Campaign",
    subtitle:"Create Companion here"
  },
  {
     image:`${path_image}edit-icon.png`,
     title:"List Campaign",
     subtitle:"Edit campaign name"
  },
  {
     image:`${path_image}link-icon.png`,
     title:"Create Docintel eprint for Campaign",
     subtitle:"Create Docintel eprint for Campaign here"
  },
  {
     image:`${path_image}content-msg-icon.png`,
     title:"Edit Docintel eprint (Draft only)",
     subtitle:"Edit Docintel eprint for Campaign here"
  },
  {
     image:`${path_image}popup-icon.png`,
     title:"Edit Campaign List",
     subtitle:"Change or replace an existing Docintel eprint from here "
  },
  {
     image:`${path_image}popup-icon.png`,
     title:" Campaign GoCode",
     subtitle:"Create GoCode Compaign list here "
  }
]

const LibraryCampaign = () => {
      let [active,setActive] = useState()
  const handleChange  = (value)=>{
    setActive(value)
  }
  return (
    <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="library_create d-flex">
               {
                data.map((item,index) =>(
                <div className={active==index?"col library_create-box active":"col library_create-box"} key={index} onClick={()=>handleChange(index)} >
                    <div className="create-library-img">
                        <img src={item.image} alt="Content msg Library"/>
                    </div>
                    <div className="create-library-content">
                        <h4>{item.title}</h4>
                        <p>{item.subtitle}</p>
                    </div>
                  </div>
                ))
               }
            </div>
          </Row>
        </div>
      </Col>
  )
}

export default LibraryCampaign