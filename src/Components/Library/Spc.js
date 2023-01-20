import React,{useState} from 'react'
import { Col, Row } from 'react-bootstrap';
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const data = [
  {
    image:`${path_image}create-icon.png`,
    title:"Create",
    subtitle:"Upload SPC here"
  },
  {
     image:`${path_image}edit-icon.png`,
     title:"List/Edit",
     subtitle:"See all SPC here"
  },
  {
     image:`${path_image}link-icon.png`,
     title:"Delete",
     subtitle:"Delete SPC from here"
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
export default Spc