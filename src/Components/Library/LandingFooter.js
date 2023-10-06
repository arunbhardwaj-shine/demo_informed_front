import React,{useState} from 'react'
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const LandingFooter = () => {
    const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  return (
    <>
     <div className='footer'>
        <Container>
            <Row>
                <div className='footer-inset'>
                    <div className='footer-logo'>
                        <img src={path_image +"footer-logo.svg"} alt="" />
                    </div>
                    <div className='copyright'>
                        <p>Copyright MedArkive Ltd 2023. Read our <Link to="#">Privacy Policy</Link> and <Link to="#">Terms of Use</Link></p>
                    </div>
                </div>
            </Row>
        </Container>
    </div>
    </>
  )
}

export default LandingFooter