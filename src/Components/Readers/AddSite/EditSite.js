import React from "react";
import { Col, Row } from "react-bootstrap";
import AddSite from "./AddSite";

const EditSite = () => {
    return (
        <>
            <Col className="right-sidebar">
                <Row>
                    <div className="create-change-content add-site">
                        <AddSite />
                    </div>
                </Row>
            </Col>
        </>
    );
}

export default EditSite;