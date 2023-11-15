import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import RegistrationValidation from "./AddQuestionValidation";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const CommonExtensionModal = ({
  show,
  onClose,
  handleSave,
  formLabel,
  extensionData,
  dynamicFieldNo,
}) => {
  const [inputOptions, setInputOption] = useState([
    { label: "Text", value: "text" },
    { label: "Radio", value: "radio" },
    { label: "Date", value: "date" },
    { label: "Textarea", value: "textarea" },
    { label: "Selection", value: "selection" },
    { label: "Checkbox", value: "checkbox" },
  ]);

  const [formData, setFormData] = useState({
    label: "",
    name: "",
    inputType: "",
    placeholder: "",
    option: [],
  });
  const [error, setError] = useState({});
  useEffect(() => {
    if (extensionData != "undefined" && extensionData) {
      let editFormData = JSON.parse(JSON.stringify(extensionData));
      // let editFormData = extensionData;
      setFormData(editFormData);
    } else {
      setFormData({
        label: "",
        name: "",
        inputType: "",
        placeholder: "",
        option: [],
      });
    }
  }, [show]);
  const handleClose = () => {
    setFormData({
      label: "",
      name: "",
      inputType: "",
      placeholder: "",
      option: [],
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

        [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
          ? e
          : e?.target?.value,
      });
      setError({});
    } else {
      setFormData({
        ...formData,
        [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
          ? e
          : e?.target?.value,
      });
    }
  };

  // const saveClicked = (e) => {
  //   e.preventDefault();
  //   handleSave(formData);
  //   handleClose();
  // };

  const saveClicked = (e) => {
    e.preventDefault();

    const error = RegistrationValidation(formData, formLabel, extensionData);
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
      } else if (areLabelsEqual) {
        toast.error("Option can't be the same");
        return;
      }
    }

    if (Object.keys(error)?.length) {
      // toast.error(error[Object.keys(error)[0]]);
      toast.error(error.option);
      setError(error);
      return;
    } else {
      handleSave({ ...formData, name: `dynamic_${dynamicFieldNo}` });
      handleClose();
      setError();
    }
  };

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

  // const AddOptions = (e) => {
  //   e.preventDefault();

  //   let optionObj = {
  //     optionLabel: "",
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

  const deleteOption = (e, index) => {
    e.preventDefault();
    let updatedFormData = formData?.option;
    updatedFormData?.splice(index, 1);

    setFormData({ ...formData, option: updatedFormData });
    setError()
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
        centered
      >
        <Modal.Header>
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              {extensionData != "undefined" && extensionData
                ? "Edit Extensions"
                : "Add Extensions"}
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
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label htmlFor="">Add Label</label>
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

                          {formData?.inputType == "text" ||
                          formData?.inputType == "email" ||
                          formData?.inputType == "textarea" ? (
                            <div className="col-12 col-md-6">
                              <div className="form-group">
                                <label htmlFor="">Placeholder</label>
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

                          {formData?.option?.length > 0
                            ? formData?.option?.map((item, index) => (
                                <div className="col-12 col-md-6" key={index}>
                                  <div className="form-group">
                                    <label htmlFor="">{`Option ${
                                      index + 1
                                    }`}</label>
                                    <input
                                      className={
                                        (error?.option &&
                                          error?.index == index) ||
                                        (error?.options &&
                                          error?.index == index)
                                          ? "form-control error"
                                          : "form-control"
                                      }
                                      type="text"
                                      placeholder="Enter option"
                                      value={
                                        formData?.option[index]?.optionLabel
                                      }
                                      onChange={(e) =>
                                        handleChange(e, "optionValue", index)
                                      }
                                    />
                                    {error?.option && error?.index == index ? (
                                      <div className="login-validation">
                                        {error?.option}
                                      </div>
                                    ) : (
                                      ""
                                    )}

                                    {error?.options && error?.index == index ? (
                                      <div className="login-validation">
                                        {error?.options}
                                      </div>
                                    ) : (
                                      ""
                                    )}

                                    <button
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
                                    </button>
                                  </div>
                                </div>
                              ))
                            : ""}
                          {formData?.inputType == "radio" ||
                          formData?.inputType == "checkbox" ||
                          formData?.inputType == "selection" ? (
                            <div className="add-more-option">
                              <Button
                                className="add-option"
                                onClick={(e) => AddOptions(e)}
                              >
                                Add option
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
export default CommonExtensionModal;
