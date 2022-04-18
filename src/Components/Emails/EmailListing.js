import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EmailList = () => {
  let path= process.env.ASSETS_PATH_INFORMED;
 
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
                    <img src="{path}img/upload_hcp.png" alt="upload" width="300px" />
                </Link>
              </div>
              <div className="col-sm-6">
                <img src="{path}img/upload.png"  alt="upload" width="300px" />
              </div>
            </div>
        </div>
      </>
    );
};

export default EmailList;
