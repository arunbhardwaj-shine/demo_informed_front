import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import CommonAddQuestionModal from "./CommonAddQuestionModal";

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
    console.log(
      "e name-->",
      e?.target?.name,
      " --e value--->",
      e?.target?.value,
      " --index-->",
      index,
      "--checked-->",
      e?.target?.checked,
      "item--->",
      item,
      "---data--->",
      data
    );

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
    Object.keys(formInputs).forEach((item, index) => {
      console.log("item-->", item);
      formData.includes(item);
    });
    let index = formData.forEach((item, index) => {
      if (Object.keys(formInputs)?.includes(item?.label)) {
        return true;
      } else {
        return false;
      }
    });
    console.log("index---->", index);
    console.log("form data-->", formData);
    setFormInputs({});
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
                  {formData && formData?.length > 0 ? (
                    <form onSubmit={saveClicked}>
                      {formData?.map((data, index) => (
                        <div key={index}>
                          {/* <form onSubmit={saveClicked}> */}
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
                                            <input
                                              type="radio"
                                              name={data?.label}
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
                                        placeholder={data?.placeholder}
                                        onChange={(e) => handleChange(e, index)}
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* </form> */}
                        </div>
                      ))}
                      <Button type="submit">Save</Button>
                    </form>
                  ) : null}
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
