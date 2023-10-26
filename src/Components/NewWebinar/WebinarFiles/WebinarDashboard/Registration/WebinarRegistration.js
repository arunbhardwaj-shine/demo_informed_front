import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import CommonAddQuestionModal from "./CommonAddQuestionModal";
import { toast } from "react-toastify";

// import Question from "./AddQuestion";

const WebinarRegistration = () => {
  const [file, setFile] = useState();
  const [foot, setfoot] = useState();
  const [showModal, setModal] = useState(false);
  const [formData, setFormData] = useState([]);
  const [formInputs, setFormInputs] = useState({});
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

  const handleChange = (e, index, item, data) => {
    if (data?.inputType == "radio" || data?.inputType == "checkbox") {
      let newObj = formInputs;
      if (!newObj[data?.label]) {
        newObj[data?.label] = [];
      }
      if (e?.target?.checked == true) {
        if (data?.inputType == "radio") {
          newObj[data?.label] = [];
          newObj[data?.label].push(item?.optionLabel);
        } else {
          newObj[data?.label].push(item?.optionLabel);
        }
      } else if (e?.target?.checked == false) {
        const index = newObj[data?.label]?.indexOf(item?.optionLabel);
        if (index > -1) {
          newObj[data?.label]?.splice(index, 1);
          if (newObj[data?.label]?.length == 0) {
            delete newObj[data?.label];
          }
        }
      }
      setFormInputs(newObj);
    } else {
      setFormInputs({ ...formInputs, [e?.target?.name]: e?.target?.value });
    }
  };
  const saveClicked = (e) => {
    e.preventDefault();

    // let allPresent = formData.every((item, index) => {
    //   return Object.keys(formInputs)?.includes(item?.label);
    // });
    // if (!allPresent) {
    //   toast.error("Please fill all the inputs");
    // } else {
    //   const formElement = document.getElementById("registration-form");
    //   const formHTML = formElement.outerHTML;
    //   console.log("HTML form content-->", formHTML);
    //   console.log("form inputs-->", formInputs);
    //   setFormInputs({});
    //   setFormData([]);
    // }

    const formElement = document.getElementById("registration-form");
    const formHTML = formElement.outerHTML;
    console.log("HTML form content-->", formHTML);
    console.log("form inputs-->", formInputs);
    setFormInputs({});
    setFormData([]);
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
                  <div className="add_hcp_boxes">
                    <button onClick={() => setModal(true)}>AddQuestion</button>
                    <div className="form_action">
                      <div className="row">
                        <form id="registration-form" onSubmit={saveClicked}>
                          <h2>
                            To register please select and fill in all your
                            details below.
                          </h2>

                          <h3>
                            This meeting is for healthcare professionals only.
                          </h3>

                          <hr></hr>

                          <div className="center-align-form">
                            {formData && formData?.length > 0 ? (
                              <div>
                                {formData?.map((data, index) => (
                                  <div key={index} className="centered-input">
                                    <div className="col-12 col-md-6">
                                      <div className="form-group">
                                        <label htmlFor="">{data?.label}</label>
                                        {data?.option?.length > 0 ? (
                                          data?.inputType === "radio" ? (
                                            data?.option?.map((item, index) => (
                                              <div key={index}>
                                                <input
                                                  type="radio"
                                                  name={data?.label}
                                                  required={
                                                    data?.required == "yes"
                                                      ? true
                                                      : false
                                                  }
                                                  // checked={}
                                                  onChange={(e) =>
                                                    handleChange(
                                                      e,
                                                      index,
                                                      item,
                                                      data
                                                    )
                                                  }
                                                />
                                                <label htmlFor="">
                                                  {item?.optionLabel}
                                                </label>
                                              </div>
                                            ))
                                          ) : data?.inputType == "checkbox" ? (
                                            data?.option?.map((item, index) => (
                                              <div key={index}>
                                                <input
                                                  type="checkbox"
                                                  name={data?.label}
                                                  required={
                                                    data?.required == "yes"
                                                      ? true
                                                      : false
                                                  }
                                                  onChange={(e) =>
                                                    handleChange(
                                                      e,
                                                      index,
                                                      item,
                                                      data
                                                    )
                                                  }
                                                />
                                                <label htmlFor="">
                                                  {item?.optionLabel}
                                                </label>
                                              </div>
                                            ))
                                          ) : null
                                        ) : (
                                          <input
                                            name={data?.label}
                                            className="form-control"
                                            type={data?.inputType}
                                            required={
                                              data?.required == "yes"
                                                ? true
                                                : false
                                            }
                                            placeholder={data?.placeholder}
                                            onChange={(e) =>
                                              handleChange(e, index)
                                            }
                                          />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                <Button type="submit">Save</Button>
                              </div>
                            ) : null}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
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
        formLabel={formData}
      />
    </>
  );
};

export default WebinarRegistration;
