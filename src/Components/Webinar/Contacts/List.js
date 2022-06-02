import React from 'react';
import { Button, Col, Form, Row, Table } from "react-bootstrap";


const Contacts = () => {
  return (
    <div >

  	<Col md={{ span: 10, offset: 2 }}>
          <Row>
            <Col xs={2}>
              <h2>
                <strong>Contacts</strong>
              </h2>
            </Col>
		    <Row>
                <Col>
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Speakers</th>
                        <th>Country</th>
                        <th>Question Related To</th>
                        <th>Addtional Details</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    	Contacts listing will come here
                    </tbody>
                  </Table>
                </Col>
            </Row>    
		</Row>    
    </Col>
    </div>
  );
}
export default Contacts;