import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";

const CommonAddQuestionModal = ({ show, onClose, handleSave, formLabel }) => {
  const [inputOptions, setInputOption] = useState([
    { label: "Text", value: "text" },
    { label: "Email", value: "email" },
    { label: "Checkbox", value: "checkbox" },
    { label: "Radio", value: "radio" },
  ]);
  const [formData, setFormData] = useState({
    label: "",
    inputType: "",
    placeholder: "",
    option: [],
  });
  useEffect(() => {}, [show]);
  const handleClose = () => {
    setFormData({ label: "", inputType: "", placeholder: "", option: [] });
    onClose(false);
  };
  const handleChange = (e, isSelectedName, index) => {
    if (isSelectedName == "optionValue") {
      // let updateOption = [...formData?.option];
      // updateOption[index] = e?.target?.value;
      // setFormData({ ...formData, option: updateOption });
      //--------
      // let updateOption = { ...formData, option: [...formData?.option] };
      // console.log("new form data--->", updateOption?.option[index]);
      // console.log("index--->", index);
      //  updateOption?.option?.[index]?.optionLabel=e?.target?.value
      //------
      let updateOption = formData?.option;

      console.log("update option-->", updateOption?.[index]?.optionLabel);
      updateOption[index].optionLabel = e?.target?.value;
      setFormData({ ...formData, option: updateOption });
    } else {
      setFormData({
        ...formData,
        [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
          ? e
          : e?.target?.value,
      });
    }

    // }
  };

  const saveClicked = (e) => {
    e.preventDefault();
    console.log("form Data-->>", formData);
    if (formData?.label == "") {
      toast.error("Please enter label");
      return;
    }
    if (formLabel?.find((item, index) => item?.label == formData?.label)) {
      toast.error("label already exist");
      return;
    }

    handleSave(formData);

    handleClose();
  };
  const AddOptions = (e) => {
    e.preventDefault();
    let optionObj = {
      optionLabel: "",
    };

    setFormData({ ...formData, option: [...formData?.option, optionObj] });
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
              Add
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
                            <div className="form-group">
                              <label htmlFor="">Add Label</label>
                              <input
                                type="text"
                                name="label"
                                placeholder="Enter label"
                                className="form-control"
                                onChange={(e) => handleChange(e)}
                              />
                            </div>
                          </div>

                          <div className="col-12 col-md-6">
                            <div className="form-group bottom">
                              <label htmlFor="">Input type</label>
                              <Select
                                options={inputOptions}
                                name="inputType"
                                placeholder="Enter input type"
                                // className="dropdown-basic-button split-button-dropup edit-country-dropdown bottom"
                                className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                onChange={(e) =>
                                  handleChange(e?.value, "inputType")
                                }
                              />
                            </div>
                          </div>
                          {formData?.inputType == "text" ||
                          formData?.inputType == "email" ? (
                            <div className="col-12 col-md-6">
                              <div className="form-group">
                                <label htmlFor="">Placeholder</label>
                                <input
                                  type="text"
                                  name="placeholder"
                                  placeholder="Enter placeholder"
                                  className="form-control"
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
                                      <label htmlFor="">{`Option ${
                                        index + 1
                                      }`}</label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter option"
                                        onChange={(e) =>
                                          handleChange(e, "optionValue", index)
                                        }
                                      />
                                    </div>
                                  </div>
                                )
                              )
                            : ""}
                          {formData?.inputType == "radio" ||
                          formData?.inputType == "checkbox" ? (
                            <div className="add-more-option">
                              <Button
                                className="add-option"
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
