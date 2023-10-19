import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import CommonAddQuestionModal from "./CommonAddQuestionModal";

// import Question from "./AddQuestion";

const WebinarRegistration = () => {
  const [file, setFile] = useState();
  const [foot, setfoot] = useState();
  const [showModal, setModal] = useState(false);
  const [formData, setFormData] = useState([]);
  useEffect(() => {}, []);
  const handleFileSelect = (e, flag) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.style.display = "none";
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      console.log(file);
      if (flag == "header") {
        setFile(URL.createObjectURL(file));
      }
      if (flag == "footer") {
        setfoot(URL.createObjectURL(file));
      }
    });

    fileInput.click();
  };
  const handleAddQuestionModalClose = () => {
    setModal(false);
  };

  const handleModalSave = (form) => {
    let updateFormData = [...formData];
    updateFormData.push(form);
    setFormData(updateFormData);
  };

  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="outer">
              <header className="header">
                <button
                  className="button"
                  onClick={(e) => handleFileSelect(e, "header")}
                >
                  upload
                </button>

                <img className="header-img" src={file} />
              </header>

              <section className="section">
                <div className="sec1">
                  <h1>
                    To register please select and fill in all your details
                    below.
                  </h1>

                  <h2>This meeting is for healthcare professionals only.</h2>

                  <hr></hr>
                </div>

                <div>
                  <button onClick={() => setModal(true)}>AddQuestion</button>

                  {/* {showmodel && <Question />} */}
                  {formData && formData?.length > 0
                    ? formData?.map((data, index) => (
                        <div key={index}>
                          <form>
                            <div className="add_hcp_boxes">
                              <div className="form_action">
                                <div className="row">
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label htmlFor="">{data?.label}</label>
                                      {data?.option?.length > 0 ? (
                                        data?.inputType === "radio" ? (
                                          data?.option?.map((item, index) => (
                                            <div key={index}>
                                              <input type="radio" />
                                              <label htmlFor="">
                                                {item}
                                              </label>
                                            </div>
                                          ))
                                        ) : data?.inputType == "checkbox" ? (
                                          data?.option?.map((item, index) => (
                                            <div key={index}>
                                              <input type="checkbox" />
                                              <label htmlFor="">{item}</label>
                                            </div>
                                          ))
                                        ) : (
                                          <input
                                            className="form-control"
                                            type={data?.inputType}
                                            placeholder={data?.placeholder}
                                          />
                                        )
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      ))
                    : null}
                </div>
              </section>

              <footer className="footer">
                <button
                  className="fbutton"
                  onClick={(e) => handleFileSelect(e, "footer")}
                >
                  upload
                </button>

                <img className="footer-img" src={foot} />
              </footer>
            </div>
          </Row>
        </div>
      </Col>
      <CommonAddQuestionModal
        show={showModal}
        onClose={handleAddQuestionModalClose}
        handleSave={handleModalSave}
      />
    </>
  );
};

export default WebinarRegistration;
