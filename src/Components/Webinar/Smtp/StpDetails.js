import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'

const StpDetails = () => {
  return (
    <div>        
      <Row>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Col md={{ span: 9, offset: 2 }}>
            hello
        </Col>
        </Row>
    </div>
  )
}

export default StpDetails