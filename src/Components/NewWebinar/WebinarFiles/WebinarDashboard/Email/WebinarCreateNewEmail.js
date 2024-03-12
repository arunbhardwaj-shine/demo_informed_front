import React from "react";
import { Col } from "react-bootstrap";
import { Link} from "react-router-dom";

const WebinarCreateNewEmail = () => {
    let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    return (
        <>
            <Col className="right-sidebar custom-change">
                <div className="custom-container">
                    <div className="row">
                        <div className="top-header regi-web sticky">
                            <div className="page-title">
                                <h2>Create new email</h2>
                            </div>
                        </div>
                        <div className="email-result">
                            <div className="col email-result-block">
                                <div className="email_box_block">
                                    <div className="email-block-add">
                                        <Link
                                            to="/webinar/email/create-new-email"
                                            // onClick={createNewEmail}
                                            >
                                            <img src={path_image + "add-button.svg"} alt="" />
                                        </Link>
                                        <p>To all internal HCP</p>
                                    </div>
                                </div>
                                <div className="email_box_block">
                                    <div className="email-block-add">
                                        <Link
                                            to="/webinar/email/create-new-email"
                                            // onClick={createNewEmail}
                                            >
                                            <img src={path_image + "add-button.svg"} alt="" />
                                        </Link>
                                        <p>To all US List</p>
                                    </div>
                                </div>
                                <div className="email_box_block">
                                    <div className="email-block-add">
                                        <Link
                                            to="/webinar/email/create-new-email"
                                            // onClick={createNewEmail}
                                            >
                                            <img src={path_image + "add-button.svg"} alt="" />
                                        </Link>
                                        <p>Custom Smart List</p>
                                    </div>
                                </div>
                                <div className="email_box_block">
                                    <div className="email-block-add">
                                        <Link
                                            to="/webinar/email/create-new-email"
                                            // onClick={createNewEmail}
                                            >
                                            <img src={path_image + "add-button.svg"} alt="" />
                                        </Link>
                                        <p>To no register HCP</p>
                                    </div>
                                </div>
                                <div className="email_box_block">
                                    <div className="email-block-add">
                                        <Link
                                            to="/webinar/email/create-new-email"
                                            // onClick={createNewEmail}
                                            >
                                            <img src={path_image + "add-button.svg"} alt="" />
                                        </Link>
                                        <p>Send to single HCP</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </>)

}
export default WebinarCreateNewEmail