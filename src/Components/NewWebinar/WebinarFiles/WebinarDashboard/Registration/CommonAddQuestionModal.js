import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import RegistrationValidation from "./AddQuestionValidation";
import CountryList from "./CountryList";

let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const CommonAddQuestionModal = ({
  show,
  onClose,
  handleSave,
  formLabel,
  fieldData,
  dynamicFieldNo,
}) => {
  const [inputOptions, setInputOption] = useState([
    { label: "Text", value: "text" },
    { label: "Email", value: "email" },
    { label: "Textarea", value: "textarea" },
    { label: "Selection", value: "selection" },
    { label: "Checkbox", value: "checkbox" },
    { label: "Radio", value: "radio" },
  ]);
  const [addSpaceOptions, setAddSpaceOptions] = useState([
    { label: 10, value: 10 },
    { label: 15, value: 15 },
    { label: 20, value: 20 },
    { label: 25, value: 25 },
    { label: 30, value: 30 },
    { label: 35, value: 35 },
    { label: 40, value: 40 }
  ]);
  const [requiredOption, setRequiredOption] = useState([
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ]);
  const [formData, setFormData] = useState({
    label: "",
    inputType: "",
    placeholder: "",
    required: "",
    option: "",
    extension: "",
  });
  const [error, setError] = useState({});

  useEffect(() => {
    if (fieldData) {
      let editFormData = JSON.parse(JSON.stringify(fieldData));
      setFormData(editFormData);
    }
  }, [show]);

  const handleClose = () => {
    setFormData({
      label: "",
      inputType: "",
      placeholder: "",
      option: [],
      required: "",
      extension: "",
      addSpace: 10,
    });
    onClose(false);
    setError();
  };

  const handleChange = (e, isSelectedName, index) => {
    if (isSelectedName == "optionValue") {
      let updateOption = formData?.option;
      updateOption[index].optionLabel = e?.target?.value;
      setFormData({ ...formData, option: updateOption });
    } else if (isSelectedName == "inputType") {
      setFormData({
        ...formData,
        label: "",
        option: [],
        placeholder: "",
        required: "",
        extension: "",
        [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
          ? e
          : e?.target?.value,
      });
      setError({});
    } else if (isSelectedName == "extension") {
      setFormData({
        ...formData,
        [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
          ? e?.target?.checked
          : e?.target?.value,
      });
    }
    else if (isSelectedName == "showAllCountries") {

      let ourOptions = CountryList.map((country) => {
        return { checked: "", "optionLabel": country.value, "extension": [] }
      }
      )
      setFormData({
        ...formData,
        [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
          ? e?.target?.checked
          : e?.target?.value,
        option: e?.target?.checked ? ourOptions : []
      });
    } else {
      setFormData({
        ...formData,
        [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
          ? e
          : e?.target?.value,
      });
    }
  };

  const saveClicked = (e) => {
    e.preventDefault();

    const error = RegistrationValidation(formData, formLabel, fieldData);
    let optionObj = {
      optionLabel: "",
      extension: [],
      checked: "",
    };

    if (formData?.option?.length) {
      let index = formData?.option?.findIndex(
        (data, index) => data?.optionLabel == ""
      );
      const lastTwoItems = formData?.option?.slice(-2);
      const [item1, item2] = lastTwoItems;
      const areLabelsEqual =
        item1?.optionLabel?.trim() === item2?.optionLabel?.trim();

      if (
        formData.option.some(
          (option, i) =>
            i < formData.option.length - 1 &&
            option.optionLabel?.trim() ===
            formData.option[formData.option.length - 1].optionLabel?.trim()
        )
      ) {
        toast.error("Option can't be the same");
        return;
      } else if (areLabelsEqual) {
        toast.error("Option can't be the same");
        return;
      }
    }

    if (Object.keys(error)?.length) {
      // toast.error(error[Object.keys(error)[0]]);
      toast.error(error.option);
      console.log(error);
      setError(error);
      return;
    } else {
      // handleSave({ ...formData, name: `dynamic_${dynamicFieldNo}` });
      if (fieldData) {
        handleSave({ ...formData });
      } else {
        handleSave({ ...formData, name: `dynamic_${dynamicFieldNo}` });
      }
      handleClose();
      setError();
    }
  };
  // const AddOptions = (e) => {
  //   e.preventDefault();
  //   let optionObj = {
  //     optionLabel: "",
  //     extension: [],
  //     checked: "",
  //   };

  //   if (formData?.option?.length) {
  //     let index = formData?.option?.findIndex(
  //       (data, index) => data?.optionLabel == ""
  //     );
  //     const lastTwoItems = formData?.option?.slice(-2);
  //     const [item1, item2] = lastTwoItems;
  //     const areLabelsEqual = item1?.optionLabel === item2?.optionLabel;
  //     if (index > -1) {
  //       toast.error(`Please fill the option ${index + 1}`);
  //       return;
  //     } else if (item1?.optionLabel === item2?.optionLabel) {
  //       toast.error("Option can't be same");
  //       return;
  //     } else {
  //       setFormData({ ...formData, option: [...formData?.option, optionObj] });
  //     }
  //   } else {
  //     setFormData({ ...formData, option: [...formData?.option, optionObj] });
  //   }
  // };

  const AddOptions = (e) => {
    e.preventDefault();
    let optionObj = {
      optionLabel: "",
      extension: [],
      checked: "",
    };

    if (formData?.option?.length) {
      let index = formData?.option?.findIndex(
        (data, index) => data?.optionLabel == ""
      );
      const lastTwoItems = formData?.option?.slice(-2);
      const [item1, item2] = lastTwoItems;
      const areLabelsEqual = item1?.optionLabel === item2?.optionLabel;

      if (
        formData.option.some(
          (option, i) =>
            i < formData.option.length - 1 &&
            option.optionLabel ===
            formData.option[formData.option.length - 1].optionLabel
        )
      ) {
        toast.error("Option can't be the same");
        return;
      } else if (index > -1) {
        toast.error(`Please fill the option ${index + 1}`);
        return;
      } else if (areLabelsEqual) {
        toast.error("Option can't be the same");
        return;
      } else {
        setFormData({ ...formData, option: [...formData?.option, optionObj] });
      }
    } else {
      setFormData({ ...formData, option: [...formData?.option, optionObj] });
    }
  };

  const deleteOption = (e, index) => {
    e.preventDefault();
    let updatedFormData = formData?.option;
    updatedFormData?.splice(index, 1);

    setFormData({ ...formData, option: updatedFormData });
    setError();
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        id="add_hcp"
        className="webinar-registration"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
      >
        <Modal.Header>
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              {fieldData ? "Edit Fields" : "Add Fields"}
            </h5>
            <button
              type="button"
              onClick={handleClose}
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-hidden="true"
          >
            <div className="hcp-add-box">
              <div className="hcp-add-form tab-content" id="upload-confirm">
                <form id="add_hcp_form" className={"tab-pane" + "active"}>
                  <>
                    <div className="add_hcp_boxes">
                      <div className="form_action">
                        <div className="row">
                          {fieldData ? (
                            ""
                          ) : (
                            <div className="col-12 col-md-6">
                              <div className="form-group bottom">
                                <label htmlFor="">Input type</label>
                                <Select
                                  options={inputOptions}
                                  name="inputType"
                                  placeholder="Enter input type"
                                  className={
                                    error?.inputType
                                      ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                      : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                  }
                                  value={
                                    inputOptions.findIndex(
                                      (item, index) =>
                                        item?.value == formData?.inputType
                                    ) != -1
                                      ? inputOptions[
                                      inputOptions.findIndex(
                                        (item, index) =>
                                          item?.value == formData?.inputType
                                      )
                                      ]
                                      : ""
                                  }
                                  onChange={(e) =>
                                    handleChange(e?.value, "inputType")
                                  }
                                />
                                {error?.inputType ? (
                                  <div className="login-validation">
                                    {error?.inputType}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          )}

                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              {/* <label htmlFor="">Add Label</label> */}
                              {fieldData ? <label htmlFor="">Label Name</label> : <label htmlFor="">Add Label</label>}
                              <input
                                type="text"
                                name="label"
                                placeholder="Enter label"
                                className={
                                  error?.label
                                    ? "form-control error"
                                    : "form-control"
                                }
                                value={formData?.label}
                                onChange={(e) => handleChange(e)}
                              />
                              {error?.label ? (
                                <div className="login-validation">
                                  {error?.label}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                            <div className="form-group bottom">
                              <label htmlFor="">Required</label>
                              <Select
                                options={requiredOption}
                                name="required"
                                placeholder="Select required type"
                                className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                value={
                                  requiredOption?.findIndex(
                                    (item, index) =>
                                      item?.value == formData?.required
                                  ) != -1
                                    ? requiredOption[
                                    requiredOption?.findIndex(
                                      (item, index) =>
                                        item?.value == formData?.required
                                    )
                                    ]
                                    : ""
                                }
                                onChange={(e) =>
                                  handleChange(e?.value, "required")
                                }
                              />
                            </div>
                          </div>
                          {formData?.inputType == "text" ||
                            formData?.inputType == "email" ||
                            formData?.inputType == "textarea" ||
                            formData?.inputType == "selection" ||
                            formData?.name == "country" ? (
                            <div className="col-12 col-md-6">
                              <div className="form-group">
                                {/* <label htmlFor="">Placeholder</label> */}
                                {fieldData ? <label htmlFor="">Placeholder Value</label> : <label htmlFor="">Placeholder</label>}
                                <input
                                  type="text"
                                  name="placeholder"
                                  placeholder="Enter placeholder"
                                  className="form-control"
                                  value={formData?.placeholder}
                                  onChange={(e) => handleChange(e)}
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}

                          {Object.keys(formData?.option)?.length
                            ? Object.keys(formData?.option)?.map(
                              (item, index) => (
                                <div className="col-12 col-md-6" key={index}>
                                  <div className="form-group">
                                    <label htmlFor="">{`Option ${index + 1
                                      }`}</label>
                                    <input
                                      className={
                                        (error?.option &&
                                          error?.index == index) ||
                                          (error?.options &&
                                            error?.index == index)
                                          ? "form-control error"
                                          : formData?.name=="onesource_consent"?"form-control disabled ":"form-control" 
                                      }
                                      type="text"
                                      placeholder="Enter option"
                                      value={
                                        formData?.option[item]?.optionLabel
                                      }
                                      onChange={(e) =>
                                        handleChange(e, "optionValue", index)
                                      }
                                      // disabled={`${ formData?.name=="onesource_consent"?true:false}`}
                                    />
                                    {error?.option &&
                                      error?.index == index ? (
                                      <div className="login-validation">
                                        {error?.option}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    {error?.options &&
                                      error?.index == index ? (
                                      <div className="login-validation">
                                        {error?.options}
                                      </div>
                                    ) : (
                                      ""
                                    )}

                                    {/* <button
                                        className="dlt_btn_event btn-voilet"
                                        onClick={(e) => {
                                          deleteOption(e, index);
                                        }}
                                      >
                                        <img
                                          title="Delete"
                                          src={path_image + "delete-icon.svg"}
                                          alt="Delete Row"
                                        />
                                      </button> */}
                                    <button
                                      className={`dlt_btn_event btn-filled ${ formData?.name=="onesource_consent"?"disabled":''}`  }
                                      // disabled={`${ formData?.name=="onesource_consent"?true:false}`}

                                      onClick={(e) => {
                                        if(formData?.name!="onesource_consent"){

                                          deleteOption(e, index);
                                        }else{
                                          return;
                                        }
                                      }}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="40"
                                        height="40"
                                        viewBox="0 0 40 40"
                                        fill="none"
                                      >
                                        <path
                                          d="M24.8608 31.7609C25.1362 32.0343 25.5082 32.1901 25.8977 32.1951C26.2871 32.1901 26.6592 32.0343 26.9346 31.7609C27.21 31.4876 27.367 31.1183 27.3721 30.7317V15.122C27.3721 14.7338 27.2167 14.3616 26.9402 14.0872C26.6637 13.8127 26.2887 13.6585 25.8977 13.6585C25.5067 13.6585 25.1316 13.8127 24.8551 14.0872C24.5786 14.3616 24.4233 14.7338 24.4233 15.122V30.7317C24.4284 31.1183 24.5854 31.4876 24.8608 31.7609Z"
                                          fill="#0066be"
                                        />
                                        <path
                                          d="M14.1027 32.1951C13.7133 32.1901 13.3412 32.0343 13.0658 31.7609C12.7904 31.4876 12.6334 31.1183 12.6283 30.7317V15.122C12.6283 14.7338 12.7837 14.3616 13.0602 14.0872C13.3367 13.8127 13.7117 13.6585 14.1027 13.6585C14.4937 13.6585 14.8687 13.8127 15.1452 14.0872C15.4217 14.3616 15.5771 14.7338 15.5771 15.122V30.7317C15.572 31.1183 15.415 31.4876 15.1396 31.7609C14.8642 32.0343 14.4921 32.1901 14.1027 32.1951Z"
                                          fill="#0066be"
                                        />
                                        <path
                                          d="M18.9633 31.7609C19.2387 32.0343 19.6107 32.1901 20.0002 32.1951C20.3896 32.1901 20.7617 32.0343 21.0371 31.7609C21.3125 31.4876 21.4695 31.1183 21.4746 30.7317V15.122C21.4746 14.7338 21.3192 14.3616 21.0427 14.0872C20.7662 13.8127 20.3912 13.6585 20.0002 13.6585C19.6092 13.6585 19.2341 13.8127 18.9577 14.0872C18.6812 14.3616 18.5258 14.7338 18.5258 15.122V30.7317C18.5309 31.1183 18.6879 31.4876 18.9633 31.7609Z"
                                          fill="#0066be"
                                        />
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M27.3721 3.90252V5.85366H37.6923C38.0833 5.85366 38.4583 6.00784 38.7348 6.28228C39.0113 6.55673 39.1667 6.92895 39.1667 7.31707C39.1667 7.70519 39.0113 8.07742 38.7348 8.35186C38.4583 8.62631 38.0833 8.78049 37.6923 8.78049H35.1489L33.5251 34.4195C33.4302 35.9294 32.7595 37.3467 31.6494 38.3833C30.5393 39.4199 29.0731 39.998 27.5489 40H12.4512C10.9407 39.9783 9.49405 39.3915 8.40063 38.3569C7.30721 37.3222 6.64757 35.916 6.55362 34.4195L4.85518 8.78049H2.3077C1.91668 8.78049 1.54167 8.62631 1.26517 8.35186C0.988677 8.07742 0.833344 7.70519 0.833344 7.31707C0.833344 6.92895 0.988677 6.55673 1.26517 6.28228C1.54167 6.00784 1.91668 5.85366 2.3077 5.85366H12.6283V3.80495C12.6532 2.80361 13.0651 1.85011 13.7787 1.14183C14.4922 0.433555 15.4529 0.0247359 16.4617 0H23.5387C24.5643 0.0254581 25.5393 0.447827 26.2555 1.17695C26.9717 1.90607 27.3724 2.88419 27.3721 3.90252ZM24.4233 3.90252V5.85366H15.5771V3.90252C15.5771 3.66964 15.6703 3.4463 15.8362 3.28163C16.0021 3.11696 16.2271 3.02445 16.4617 3.02445H23.5387C23.7733 3.02445 23.9983 3.11696 24.1642 3.28163C24.3301 3.4463 24.4233 3.66964 24.4233 3.90252ZM9.40411 34.2439L7.8904 8.78049L32.1883 8.87805L30.596 34.2439C30.5414 35.0101 30.1971 35.7274 29.632 36.2522C29.0668 36.7769 28.3228 37.0702 27.5489 37.0732H12.4512C11.676 37.0748 10.9293 36.7831 10.3632 36.2574C9.7971 35.7318 9.45412 35.0117 9.40411 34.2439Z"
                                          fill="#0066be"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              )
                            )
                            : ""}
                          <div className="col-12 col-md-6">
                            <div className="form-group bottom">
                              <label htmlFor="">Add Space</label>
                              <Select
                                options={addSpaceOptions}
                                name="addSpace"
                                placeholder="Enter input type"
                                className={
                                  error?.inputType
                                    ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                    : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                }
                                value={
                                  addSpaceOptions.findIndex(
                                    (item, index) =>
                                      item?.value == formData?.addSpace
                                  ) != -1
                                    ? addSpaceOptions[
                                    addSpaceOptions.findIndex(
                                      (item, index) =>
                                        item?.value == formData?.addSpace
                                    )
                                    ]
                                    : addSpaceOptions[0]
                                }
                                onChange={(e) =>
                                  handleChange(e?.value, "addSpace")
                                }
                              />
                              {error?.inputType ? (
                                <div className="login-validation">
                                  {error?.addSpace}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          {
                            formData?.name == "country" ? (
                              <div className="add-extension">
                                <label htmlFor="">Show All Countries</label>
                                <input
                                  type="checkbox"
                                  name="showAllCountries"
                                  className="form-check-input"
                                  checked={formData?.showAllCountries}
                                  onChange={(e) => handleChange(e, "showAllCountries")}
                                />
                              </div>
                            ) : null
                          }
                          {formData?.inputType == "radio" ||
                            formData?.inputType == "checkbox" ? (
                            <div className="add-extension">
                              <label htmlFor="">Add Extension</label>
                              <input
                                type="checkbox"
                                name="extension"
                                className="form-check-input"
                                checked={formData?.extension}
                                onChange={(e) => handleChange(e, "extension")}
                              />
                            </div>
                          ) : (
                            ""
                          )}
                          {(formData?.inputType == "selection" &&
                            formData?.label != "country" &&
                            formData?.label != "state (us)") ||
                            formData?.inputType == "radio" ||
                            formData?.inputType == "checkbox" ? (
                            <div className="add-more-option">
                              <Button
                                className={`add-option ${ formData?.name=="onesource_consent"?"disabled":''}`  }
                                // disabled={`${ formData?.name=="onesource_consent"?true:false}`}
                                onClick={(e) => AddOptions(e)}
                              >
                                Add options
                              </Button>
                            </div>
                          ) : (
                            ""
                          )}


                        </div>
                      </div>
                    </div>
                  </>
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-primary save btn-filled"
            onClick={(e) => {
              saveClicked(e);
            }}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-primary save btn-bordered"
            onClick={handleClose}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default CommonAddQuestionModal;
