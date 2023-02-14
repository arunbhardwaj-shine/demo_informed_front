import React,{useState} from 'react'
import { Col, Row } from 'react-bootstrap';
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const data = [
  {
    image:`${path_image}spc-create-icon.png`,
    title:"Create",
    subtitle:"Upload your SPC here"
  },
  {
     image:`${path_image}edit-icon.png`,
     title:"View | Edit",
     subtitle:"View and Edit all your SPC here"
  },
  {
     image:`${path_image}delete.png`,
     title:"Delete",
     subtitle:"Delete your SPC from here"
  }
]


const Spc = () => {
   let [active,setActive] = useState()
  const handleChange  = (value)=>{
    setActive(value)
  }
  return (
    <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div class="top-header">
              <div class="page-title">
                <h2>SPC</h2>
              </div>
            </div>
            <div className="library_create spc-box d-flex">
               {
                data.map((item,index) =>(
                <div className={active==index?"col library_create-box spc active":"col library_create-box spc"} key={index} onClick={()=>handleChange(index)} >
                    <div className="create-library-img">
                        <img src={item.image} alt="Content msg Library"/>
                    </div>
                    <div className="create-library-content">
                        <h3>{item.title}</h3>
                        <h5>{item.subtitle}</h5>
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
export default Spc