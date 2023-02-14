import React,{useState} from 'react'
import { Col, Row } from 'react-bootstrap';
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

function Products() {
  return (
     <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div class="top-header">
              <div class="page-title">
                <h2>Products</h2>
              </div>
            </div>
          </Row>
        </div>
      </Col>
  )
}

export default Products