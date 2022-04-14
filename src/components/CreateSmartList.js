import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Button, Modal } from "react-bootstrap";

import CustomModal from "./ModalComponent/Modal";



const CreateSmartList = () => {
  const [showModal, setShow] = useState(false);
  const handleShow = () => setShow(true);

    return (
      <>
        <div className="row">
              <button className="btn-cancel">cancel</button>
              <button className="btn-nxt">Next</button>
        </div>
        <div className="row">
            <div className="step1">
                <div className="col-sm-6">
                  <input type="text" name="smart_list_name" />
                </div>
                <div className="col-sm-6">
                  <input type="text" name="creator_name" />
                </div>
            </div>
            <div className="step2">
              <div className="col-sm-6">
                <Link to="/SmartListFilter">
                    <img src="/componentAssets/img/upload_hcp.png" width="300px" />
                </Link>
              </div>
              <div className="col-sm-6">
                <img src="/componentAssets/img/upload.png" width="300px" onClick={handleShow} />
              </div>
            </div>
              {showModal ? <CustomModal />:null}
        </div>
      </>
    );
};

export default CreateSmartList;
