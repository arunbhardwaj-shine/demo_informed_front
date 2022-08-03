import React from "react";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const AutoEmail = () => {
  return (
    <>
      <div className="col right-sidebar">
        <div className="custom-container">
          <div className="row">
              <div className="top-header">
                <div class="page-title">
                  <h2>Auto Email</h2>
                </div>
                <div className="top-right-action">
                <div className="header-btn">
                  <button className="btn btn-primary btn-bordered">Cancel</button>
                  <button className="btn btn-primary btn-filled next">Save</button></div>
                </div>
              </div>
              <div className="auto_mail_trigger">
                  <div className="row">
                  <div className="auto_mail_trigger_left col-sm-4 col-md-4">
                    <div className="auto_mail_trigger_box">
                        <div className="mail_trigger_left d-flex align-items-center">
                          <div className="mail_trigger_mail-icon">
                            <img src={path_image + "triggered_mail.svg"} alt="Preview" />
                          </div>
                          <h4>Triggered emails</h4>
                        </div>
                        <div className="mail_trigger_content">
                            <div className="trigger_content_box d-flex">
                              <div className="trigger_content_image">
                                <img src={path_image + "auto_mail_dummy.png"} alt="Preview" />
                              </div>
                              <div className="trigger_content">
                                <h6>New content</h6>
                                <p>When New content add to the user library</p>
                                <button className="btn btn-primary btn-filled  d-flex justify-content-center">
                                    View
                              </button>
                              </div>
                            </div>
                            <div className="trigger_content_box d-flex">
                              <div className="trigger_content_image">
                                <img src={path_image + "auto_mail_dummy.png"} alt="Preview" />
                              </div>
                              <div className="trigger_content">
                                <h6>New content</h6>
                                <p>When New content add to the user library</p>
                                <button className="btn btn-primary btn-filled  d-flex justify-content-center">
                                    View
                              </button>
                              </div>
                            </div>
                            <div className="trigger_content_box d-flex">
                              <div className="trigger_content_image">
                                <img src={path_image + "auto_mail_dummy.png"} alt="Preview" />
                              </div>
                              <div className="trigger_content">
                                <h6>New content</h6>
                                <p>When New content add to the user library</p>
                                <button className="btn btn-primary btn-filled  d-flex justify-content-center">
                                    View
                              </button>
                              </div>
                            </div>
                        </div>
                      </div>
                      <div className="auto_mail_trigger_box">
                        <div className="mail_trigger_left d-flex align-items-center">
                          <div className="mail_trigger_mail-icon">
                            <img src={path_image + "triggered_mail.svg"} alt="Preview" />
                          </div>
                          <h4>Reminder AutoMails</h4>
                        </div>
                        <div className="mail_trigger_content">
                            <div className="trigger_content_box d-flex">
                              <div className="trigger_content_image">
                                <img src={path_image + "auto_mail_dummy.png"} alt="Preview" />
                              </div>
                              <div className="trigger_content">
                                <h6>Why not try the app for offline reading?</h6>
                                <p>Link to app, goes out after 1 week from last activation if user have not logged into app.</p>
                                <button className="btn btn-primary btn-filled d-flex justify-content-center">
                                    View
                              </button>
                              </div>
                            </div>
                        </div>
                      </div>
                  </div>
                  <div className="auto_mail_trigger_right col-md-8 col-sm-8">
                      <div className="mail_trigger_right_dummy">
                          <div className="mail_trigger_dummy_content d-flex ">
                              <img src={path_image + "auto_mail.svg"} alt="" />
                              <h3>Select one of the auto emails to show here</h3>
                          </div>
                      </div>
                      <div className="email-form">
                <form>
                  <div className="form-inline row justify-content-between align-items-center">
                    <div className="form-group col-12 col-md-6">
                      <label for="exampleInputEmail1">Email Subject  Line</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email-desc"
                      />
                    </div>
                    <div className="form-group right-side col-12 col-md-6">
                      <label for="exampleInputEmail1">Email description </label>
                      <input
                        type="text"
                        className="form-control"
                        id="email-address"
                      />
                    </div>
                  </div>
                  <div className="form-inline row justify-content-end align-items-center">
                    <div className="form-buttons right-side col-12 col-md-5">
                      <button
                        className="btn btn-primary approved-btn btn-bordered">Approved </button>
                      <button
                        className="btn btn-primary btn-bordered btn-large">
                        Send A Sample
                      </button>
                    </div>
                  </div>
                </form>
              </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AutoEmail;
