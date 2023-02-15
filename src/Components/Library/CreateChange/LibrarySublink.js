import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'

const LibrarySublink = () => {
  return (
    <>
    <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="top-header">
                <div className="page-title">
                  <h2>New SubLink</h2>
                </div>
                <div className="header-btn">
                    <Button className="btn-bordered cancel">Close</Button>
                </div>
            </div>
          </Row>
        </div>
    </Col>
    </>
  )
}

export default LibrarySublink