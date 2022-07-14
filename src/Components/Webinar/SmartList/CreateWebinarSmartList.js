import React from 'react'
import { Link } from 'react-router-dom'

const CreateWebinarSmartList = () => {
  return (
    <>
    <div class="col right-sidebar">
      <div className="custom-container">
        <div className="row">
      <div className="page-top-nav smart_list_names">
        <div class="row justify-content-end align-items-center">
          <div class="col-12 col-md-11">
            <ul class="tabnav-link">
              <li class="active active-main">
                <a href="javascript:void(0)">Create smart list</a>
              </li>
              <li class="">
                <a href="javascript:void(0)">Select & Verify Your HCPs</a>
              </li>
            </ul>
          </div>
          <div class="col-12 col-md-1">
            <div class="header-btn-right">
                <Link>
              <button
                class="btn btn-primary btn-bordered light"
                onClick={closeClicked}
              >
                Cancel
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <section className="create_smart_list">
        <div class="create_smart_list_inset">
          <div class="create-smart-step">
            <h2>STEP1</h2>
            <div class="create-smart-step-box">
              <form>
                <div class="row justify-content-between align-items-center">
                  <div class="form-group col">
                    <label for="smart-list-name">Enter smart list name</label>
                    <input
                      type="text"
                      class="form-control"
                      value={smartListName}
                      onChange={(event) => handleSmartListName(event)}
                    />
                  </div>

                  <div class="form-group col">
                    <label for="creator-name">Creator’s Name</label>
                    <input
                      type="text"
                      class="form-control"
                      value={creatorName}
                      onChange={(event) => handleCreatorName(event)}
                    />
                  </div>

                  <div class="form-group col-sm-12">
                    <div class="form-group-content">
                      <p>
                        I want this to be a <span>Demo list</span>
                      </p>
                      <div class="select-demo-option">
                        <input type="checkbox" name="cherk" />
                        <span class="checkmark"></span>
                      </div>
                      <a  href="#" data-bs-toggle="tooltip" data-bs-placement="top">
                        <img src={path + "question.svg"} alt="" />
                      </a>
                        <div className="tooltip">A list that will appeare when you select smart list to <span>send a sample.</span></div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="create-smart-step">
            <h2>STEP2</h2>
            <div class="create-smart-step-box">
              <h5>How do you want to create your smart list ?</h5>
              <ul>
                <li>
                  <div class="send-option-img group-opt">
                    <input
                      onClick={(event) => toggleSelection("group-opt")}
                      type="radio"
                      name="select-option-hcp"
                      id="segment"
                      value={activeClass}
                    />
                    <img src={path + "group-hcp.svg"} alt="Group HCPs" />
                  </div>
                  <p>Segment from current cohort </p>
                </li>
                <li>
                  <div
                    class="send-option-img upload-opt"
                    data-bs-toggle="modal"
                    data-bs-target="#upload-confirm"
                  >
                    <input
                      type="radio"
                      onClick={handleShow}
                      name="select-option-hcp"
                    />
                    <img src={path + "upload-btn.svg"} alt="Single HCP" />{" "}
                    {filename != "" ? <p>{filename}</p> : null}
                  </div>
                  <p>Upload new HCPs</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="download-sample">
            <p>Download sample Excel file to upload new HCPs</p>
            <div class="upload-btn" onClick={downloadFile}>
              Download File
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>
    </div>

   
  </>
  )
}

export default CreateWebinarSmartList