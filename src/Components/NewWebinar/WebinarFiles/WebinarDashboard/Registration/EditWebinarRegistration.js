import React, { useEffect, useState } from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import CommonAddQuestionModal from "./CommonAddQuestionModal";
import { toast } from "react-toastify";
import Select from "react-select";
import { loader } from "../../../../../loader";
import { getData, postData } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import WebinarRegistrationValidation from "./WebinarRegistrationValidation";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const EditWebinarRegistration = () => {
  const [file, setFile] = useState();
  const [foot, setFoot] = useState();
  const [showModal, setModal] = useState(false);
  const [page, setPage] = useState(1);
  const [dropDownData, setDropDownData] = useState([]);
  const [formData, setFormData] = useState({
    pageTitle: "",
    bodyText: "",
    headerImageUrl: "",
    body: [],
    footerImageUrl: "",
  });
  const [eventData, setEventData] = useState({
    event_id: "",
    company_id: "",
    label: "testing7",
  });
  const [showChangeHeader, setShowChangeHeader] = useState(false);
  const [showChangeFooter, setShowChangeFooter] = useState(false);

  useEffect(() => {
    // getEventData();
    getWebinarData();
  }, []);
  const getEventData = async () => {
    try {
      loader("show");
      const response = await getData(`${ENDPOINT.EVENT_LIST}?type=${page}`);
      let dropDownDataTemp = response?.data?.data?.map((item) => ({
        value: item?.id,
        label: item?.event_code,
        company_id: item?.company_id,
      }));
      setDropDownData(dropDownDataTemp);
    } catch (err) {
      console.log("--err", err);
    } finally {
      loader("hide");
    }
  };
  const getWebinarData = async () => {
    try {
      loader("show");
      const response = await getData(
        `${ENDPOINT.GET_REGISTRATION_FORM}/${eventData?.label}`
      );
      const hadData = response?.data?.data;

      setEventData({
        ...eventData,
        event_id: hadData?.event_id,
        company_id: hadData?.company_id,
      });
      const newFormData = JSON.parse(hadData?.content);
      setFormData(newFormData);
      //   console.log("hadData--->", hadData);
    } catch (err) {
      console.log("--err", err);
    } finally {
      loader("hide");
    }
  };
  const handleFileSelect = (e, isSelectedName) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.style.display = "none";

    fileInput.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (isSelectedName === "headerImageUrl") {
        setFile(URL.createObjectURL(file));
        const imgElement = document.querySelector(".header-img");
      }

      if (isSelectedName === "footerImageUrl") {
        const imgElement = document.querySelector(".footer-img");
        setFoot(URL.createObjectURL(file));
      }

      try {
        const uploadedImageUrl = await uploadImageToServer(file);

        setFormData({ ...formData, [isSelectedName]: uploadedImageUrl });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    });

    fileInput.click();
  };

  const uploadImageToServer = async (file) => {
    try {
      loader("show");
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        "https://onesource.informed.pro/api/upload-image",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const uploadedData = await response.json();
        return uploadedData.imageUrl;
      } else {
        console.error("Image upload failed");
        return null;
      }
    } catch (error) {
      console.error("Image upload error:", error);
      return null;
    } finally {
      loader("hide");
    }
  };

  const handleAddQuestionModalClose = () => {
    setModal(false);
  };

  const handleModalSave = (form) => {
    let updateFormBody = formData?.body;
    updateFormBody.push(form);
    setFormData({ ...formData, body: updateFormBody });
  };

  const handleChange = (e, isSelectedName) => {
    if (isSelectedName) {
      let updateFormBody = formData?.body;

      if (e?.target?.checked == true) {
        if (
          formData?.body?.find(
            (item, index) =>
              item?.label?.toLowerCase() == isSelectedName?.toLowerCase()
          )
        ) {
          toast.error("Label already exist");
          return;
        }
        if (isSelectedName == "name" || isSelectedName == "email") {
          let newObj = {
            label: isSelectedName,
            inputType: isSelectedName == "email" ? "email" : "text",
            placeholder: `Please enter ${isSelectedName}`,
            option: [],
            required: "",
          };
          updateFormBody?.push(newObj);
        } else {
          let newObj = {
            label: isSelectedName,
            inputType: "selection",
            placeholder: "",
            option: [],
            required: "",
          };
          updateFormBody?.push(newObj);
        }
        setFormData({ ...formData, body: updateFormBody });
      } else if (e?.target?.checked == false) {
        let index = updateFormBody?.findIndex(
          (item, index) => item?.label == isSelectedName
        );
        if (index > -1) {
          updateFormBody?.splice(index, 1);
        }
        setFormData({ ...formData, body: updateFormBody });
      } else if (isSelectedName == "company_id") {
        setEventData({
          ...eventData,
          company_id: e?.company_id,
          event_id: e?.value,
        });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e?.target?.value });
    }
  };
  const saveClicked = async (e) => {
    e.preventDefault();

    try {
      const error = WebinarRegistrationValidation(formData, eventData);

      if (Object.keys(error)?.length) {
        toast.error(error[Object.keys(error)[0]]);
        return;
      } else {
        loader("show");
        let data = {
          eventId: eventData?.event_id,
          companyId: eventData?.company_id,
          content: JSON.stringify(formData),
        };

        const response = await postData(
          ENDPOINT.CREATE_WEBINAR_REGISTRATION,
          data
        );

        setFormData({
          pageTitle: "",
          bodyText: "",
          headerImageUrl: "",
          body: [],
          footerImageUrl: "",
        });
        setEventData({ event_id: "", company_id: "" });
        setFile("");
        setFoot("");
      }
    } catch (err) {
      console.log("--err", err);
    } finally {
      loader("hide");
    }
  };

  return (
    <>
      <Col className="right-sidebar">
        <div className="register-page">
          <h3 style={{ marginBottom: "20px" }}>Registration Page</h3>
          <div className="row">
            <div className="left-section col-sm-3 col-md-6 col-lg-8">
              <div className="text-section">
                <div className="row">
                  <div className="form-group col-lg-3 webinar-select">
                    <label htmlFor="">Select Event</label>
                    {/* <h5>Select Event</h5> */}
                  </div>
                  <div className="col-lg-6 registration-text ">
                    <input
                      placeholder="Select Event"
                      name="company_id"
                      className="form-control"
                      value={eventData?.label}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-3 ">
                    <label htmlFor="">Registration Page Title</label>
                    {/* <h5>Registration Page Title</h5> */}
                  </div>
                  <div className="col-lg-6 registration-text">
                    <input
                      type="text"
                      name="pageTitle"
                      value={formData?.pageTitle}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-3 registration-bodyHeading">
                    {/* <h5>Body Text</h5> */}
                    <label htmlFor="">Body Text</label>
                  </div>
                  <div className="col-lg-6 registration-bodyText">
                    <textarea
                      cols="50"
                      rows="4"
                      name="bodyText"
                      value={formData?.bodyText}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="feilds-section">
                  <Form.Check
                    className="webinar-checkbox"
                    inline
                    label="Name"
                    name="name"
                    type="checkbox"
                    checked={
                      formData?.body?.findIndex(
                        (item, index) => item?.label?.toLowerCase() == "name"
                      ) != -1
                        ? true
                        : false
                    }
                    onChange={(e) => handleChange(e, "name")}
                  />

                  <Form.Check
                    className="webinar-checkbox"
                    inline
                    label="Email"
                    name="email"
                    type="checkbox"
                    checked={
                      formData?.body?.findIndex(
                        (item, index) => item?.label?.toLowerCase() == "email"
                      ) != -1
                        ? true
                        : false
                    }
                    onChange={(e) => handleChange(e, "email")}
                  />

                  <Form.Check
                    className="webinar-checkbox"
                    inline
                    label="Profession"
                    name="profession"
                    type="checkbox"
                    checked={
                      formData?.body?.findIndex(
                        (item, index) =>
                          item?.label?.toLowerCase() == "profession"
                      ) != -1
                        ? true
                        : false
                    }
                    onChange={(e) => handleChange(e, "profession")}
                  />

                  <Form.Check
                    className="webinar-checkbox"
                    inline
                    label="Country"
                    name="country"
                    type="checkbox"
                    checked={
                      formData?.body?.findIndex(
                        (item, index) => item?.label?.toLowerCase() == "country"
                      ) != -1
                        ? true
                        : false
                    }
                    onChange={(e) => handleChange(e, "country")}
                  />

                  <Form.Check
                    className="webinar-checkbox"
                    inline
                    label="State"
                    name="state"
                    type="checkbox"
                    checked={
                      formData?.body?.findIndex(
                        (item, index) => item?.label?.toLowerCase() == "state"
                      ) != -1
                        ? true
                        : false
                    }
                    onChange={(e) => handleChange(e, "state")}
                  />

                  <span>
                    <Button
                      style={{ marginLeft: "20px" }}
                      onClick={() => setModal(true)}
                    >
                      Add Feilds
                    </Button>
                  </span>
                  <section className="webinarRegistrationBody">
                    <div className="sec1">
                      <div className="add_hcp_boxes">
                        <div className="form_action">
                          <div className="row">
                            <form id="registration-form" onSubmit={saveClicked}>
                              {formData && Object.keys(formData)?.length ? (
                                <div>
                                  <hr></hr>
                                  <h3
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    {/* {formData?.pageTitle} */}
                                  </h3>

                                  <h4
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    {/* {formData?.bodyText} */}
                                  </h4>

                                  <div className="center-align-form">
                                    <div>
                                      {formData?.body?.map((data, index) => (
                                        <div
                                          key={index}
                                          className="centered-input"
                                        >
                                          <div className="col-12 col-md-6">
                                            <div className="form-group">
                                              <label htmlFor="">
                                                {data?.label
                                                  ? data?.label
                                                      ?.charAt(0)
                                                      .toUpperCase() +
                                                    data?.label
                                                      ?.slice(1)
                                                      ?.toLowerCase()
                                                  : ""}
                                              </label>
                                              {
                                                // data?.option?.length > 0 ? (
                                                data?.inputType === "radio" ? (
                                                  data?.option?.map(
                                                    (item, index) => (
                                                      <div key={index}>
                                                        <input
                                                          style={{
                                                            marginBottom:
                                                              "15px",
                                                            marginTop: "10px",
                                                          }}
                                                          type="radio"
                                                          name={data?.label}
                                                        />
                                                        <label htmlFor="">
                                                          {item?.optionLabel}
                                                        </label>
                                                      </div>
                                                    )
                                                  )
                                                ) : data?.inputType ==
                                                  "checkbox" ? (
                                                  data?.option?.map(
                                                    (item, index) => (
                                                      <div key={index}>
                                                        <input
                                                          style={{
                                                            marginBottom:
                                                              "25px",
                                                            marginTop: "10px",
                                                          }}
                                                          type="checkbox"
                                                          name={data?.label}
                                                        />
                                                        <label htmlFor="">
                                                          {item?.optionLabel}
                                                        </label>
                                                      </div>
                                                    )
                                                  )
                                                ) : data?.inputType ==
                                                  "selection" ? (
                                                  <div key={index}>
                                                    <Select className="dropdown-basic-button split-button-dropup webinar-select">
                                                      {data?.option?.map(
                                                        (item) => (
                                                          <option
                                                            value={
                                                              item?.optionLabel
                                                            }
                                                          >
                                                            {item?.optionLabel}
                                                          </option>
                                                        )
                                                      )}
                                                    </Select>
                                                  </div>
                                                ) : (
                                                  // ) : null
                                                  <input
                                                    style={{
                                                      marginBottom: "25px",
                                                      marginTop: "10px",
                                                      borderRadius: "27px",
                                                      padding: "11px",
                                                      paddingLeft: "20px",
                                                    }}
                                                    name={data?.label?.toLowerCase()}
                                                    className="form-control"
                                                    type={data?.inputType}
                                                    // required={
                                                    //   data?.required == "yes"
                                                    //     ? true
                                                    //     : false
                                                    // }
                                                    placeholder={
                                                      data?.placeholder
                                                    }
                                                    onChange={(e) =>
                                                      handleChange(e, index)
                                                    }
                                                  />
                                                )
                                              }
                                              <button
                                                className="dlt_btn_event btn-voilet"
                                                onClick={(e) => {
                                                  // setConfirmationPopup(true);
                                                  //   deleteOption(e, index);
                                                }}
                                              >
                                                <img
                                                  title="Delete"
                                                  src={
                                                    path_image +
                                                    "delete-icon.svg"
                                                  }
                                                  alt="Delete Row"
                                                />
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                      <Button type="submit">Save</Button>
                                    </div>
                                  </div>
                                </div>
                              ) : null}
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
            <div className="right-section col-sm-9 col-md-6 col-lg-4">
              <div
                className="header-section"
                onMouseOver={() => setShowChangeHeader(true)}
                onMouseOut={() => setShowChangeHeader(false)}
              >
                {!file && (
                  <h4
                    className="header-img-section"
                    id="uploadButton"
                    onClick={(e) => handleFileSelect(e, "headerImageUrl")}
                  >
                    Upload header
                  </h4>
                )}
                <img className="header-img" src={file} />
                <div className="header-text">
                  {" "}
                  {showChangeHeader && file && (
                    <h4
                      className="header-hover"
                      onClick={(e) => handleFileSelect(e, "headerImageUrl")}
                    >
                      Change Header
                    </h4>
                  )}
                </div>
              </div>

              <div
                className="footer-section"
                onMouseOver={() => setShowChangeFooter(true)}
                onMouseOut={() => setShowChangeFooter(false)}
              >
                {!foot && (
                  <h4
                    className="footer-img-section"
                    onClick={(e) => handleFileSelect(e, "footerImageUrl")}
                  >
                    Upload footer
                  </h4>
                )}
                <img className="footer-img" src={foot} />
                <div className="footer-text">
                  {" "}
                  {showChangeFooter && foot && (
                    <h4
                      className="footer-hover"
                      onClick={(e) => handleFileSelect(e, "footerImageUrl")}
                    >
                      Change Footer
                    </h4>
                  )}
                </div>
              </div>

              {/* <div className="footer-section">
              {!foot && (<h4 className="footer-img-section"  onClick={(e) => handleFileSelect(e, "footer")}>Upload footer</h4>)}
              <img className="footer-img" src={foot} />
              </div> */}
            </div>
          </div>
        </div>
      </Col>
      <CommonAddQuestionModal
        show={showModal}
        onClose={handleAddQuestionModalClose}
        handleSave={handleModalSave}
        formLabel={formData?.body}
      />
    </>
  );
};

export default EditWebinarRegistration;
