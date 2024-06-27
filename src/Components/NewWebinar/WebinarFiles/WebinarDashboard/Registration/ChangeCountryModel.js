import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import Countries from "./Countries.json";

const ChangeCountryModel = ({
  show,
  onClose,
  handleSave,
  fieldData,
  dynamicFieldNo,
}) => {
  const inputOptions = Object.keys(Countries).map((key) => Countries[key]);

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
      setFormData({ ...fieldData });
    }
  }, [fieldData, show]);

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
    setError({});
  };

  const handleChange = (e, isSelectedName) => {
    setFormData((prevData) => ({
      ...prevData,
      [isSelectedName ? isSelectedName : e.target.name]: isSelectedName
        ? e
        : e.target.value,
    }));
    setError({});
  };

  const saveClicked = (e) => {
    e.preventDefault();

    const states = Countries[formData?.stateCountry];
    formData.option = states?.states.map((item) => ({
      checked: "",
      optionLabel: item.label,
      extension: [],
    }));

    if (formData.option?.length) {
      const lastTwoItems = formData.option.slice(-2);
      const [item1, item2] = lastTwoItems;
      const areLabelsEqual = item1?.optionLabel?.trim() === item2?.optionLabel?.trim();

      if (
        formData.option.some(
          (option, i) =>
            i < formData.option.length - 1 &&
            option.optionLabel?.trim() === formData.option[formData.option.length - 1].optionLabel?.trim()
        ) || areLabelsEqual
      ) {
        toast.error("Option can't be the same");
        return;
      }
    }

    if (Object.keys(error)?.length) {
      toast.error(error.option);
      return;
    } else {
      const saveData = fieldData ? formData : { ...formData, name: `dynamic_${dynamicFieldNo}` };
      handleSave(saveData);
      handleClose();
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      id="download-qr"
      className="webinar-registration send-confirm"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      centered
    >
      <Modal.Header>
        <div className="modal-header">
          <h5 className="modal-title" id="staticBackdropLabel">Select country</h5>
          <button type="button" onClick={handleClose} className="btn-close" aria-label="Close"></button>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="hcp-add-box">
        <div className="d-flex align-items-center form-group">
          <label>Country</label>
          <Select
            options={inputOptions}
            name="stateCountry"
            placeholder="Select Country"
            className={`dropdown-basic-button split-button-dropup selectcountry${error?.inputType ? 'error' : ''}`}
            value={inputOptions.find(item => item.value === formData?.stateCountry) || ""}
            onChange={(e) => handleChange(e?.value, "stateCountry")}
          />
          {error?.stateCountry && <div className="login-validation">{error?.stateCountry}</div>}

        </div>
      </div>
                   
             
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-primary save btn-filled" onClick={saveClicked}>
          Save
        </Button>
        <Button className="btn btn-primary save btn-bordered" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeCountryModel;
