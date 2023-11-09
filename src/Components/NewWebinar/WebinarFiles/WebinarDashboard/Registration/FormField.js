import moment from "moment";
import CountryList from "./CountryList";
import DatePicker from "react-datepicker";
import { useState } from "react";
import Select from "react-select";

const userData = {
  name: "userName",
  email: "userEmail",
  country: "country",
  "Your Country": "country",
  state: "state",
  consent: "consent",
  websiteFolder: "websiteFolder",
  companyId: "companyId",
  eventId: "eventId",
  speaker: "speaker",
  companyEmail: "companyEmail",
  virtual_or_live: "virtual_or_live",
  radio_group: 1,
  radio_group2: 1,
  organize_own: 4,
  being_connected: "being_connected",
 "Airport of departure": "departure",
  "Preferred departure date": "air_departure_date",
  "Preferred departure time": "departure_time",
  "Preferred return flight date": "air_return_date",
  'I consent to:': "consent",


};
const FormField = ({
    form,
    formFieldData,
    setFormFieldData,
    formErrors,
    pageColors,
    level,
  }) => {
    const [countryList, setCountryList] = useState(CountryList);
    const [extensionData, setExtensionData] = useState({});
    const label = userData[form.label]?userData[form.label]:form?.label?.replace(/ /g, "_");
    // console.log(label);
  
  
    const handleFieldChange = (value) => {
      const newData = { ...formFieldData };
      console.log(newData);
  
      if (form?.inputType === "datepicker") {
        newData[label] = moment(value).format("YYYY-MM-DD");
      } else {
        newData[label] = value;
      }
  
      setFormFieldData(newData);
    };
  
    if (label?.includes('country') || label?.includes('Country')) {
      form.inputType = "selection-country";
    }
  
    const isRequired = form.required === "yes";
  
    let fieldInput = null;
  
    if (form.inputType === "textarea") {
      fieldInput = (
        <textarea
          className="form-control"
          placeholder={form.placeholder}
          cols="40"
          rows="4"
          onChange={(e) => handleFieldChange(e.target.value)}
        ></textarea>
      );
    } else if (
      form.inputType === "selection" ||
      form.inputType === "selection-country"
    ) {
      const options = form.option?.map((op) => ({
        label: op.optionLabel,
        value: op.optionLabel,
      }));
  
      fieldInput = (
        <Select
          options={form.inputType === "selection-country" ? countryList : options}
          className="dropdown-basic-button split-button-dropup mr-2 btn-bigger"
          isClearable
          onChange={(selectedOption) => handleFieldChange(selectedOption.value)}
        />
      );
    } else if (form.inputType === "datepicker") {
      fieldInput = (
        <DatePicker
          selected={formFieldData[label] ? new Date(formFieldData[label]) : null}
          name={form.label}
          dateFormat="dd/MM/yyyy"
          className="form-control"
          placeholderText="Select task date"
          onChange={(date) => handleFieldChange(date)}
          onKeyDown={(e) => {
            e.preventDefault();
          }}
        />
      );
    } else if (form.inputType === "checkbox" || form.inputType === "radio") {
      fieldInput = (
        <ul>
          {form.option?.map((item, index) => (
            <>
              <li key={index}>
                {/* {console.log(item,"oppppp")} */}
  
                <input
                  type={form.inputType}
                  id={label + index}
                  name={label}
                  className="organize_own_selection"
                  onChange={() => {
                    handleFieldChange(item.optionLabel);
                    console.log(extensionData,form);
                    // if (item.extension) {
                      setExtensionData({
                        [item.optionLabel]: item.extension? item.extension:[],
                      });
                    // }
                  }}
                />
                <label
                  style={{
                    textTransform: "capitalize",
                    color: pageColors?.labelColor,
                  }}
                  htmlFor={label + index}
                >
                  {item.optionLabel}
                </label>
                <span className="checkmark" />
              </li>
              {extensionData[item.optionLabel]?.length > 0 &&
                extensionData[item.optionLabel]?.map((opt, i) => (
                  <FormField
                    form={opt}
                    key={i}
                    formFieldData={formFieldData}
                    setFormFieldData={setFormFieldData}
                    formErrors={formErrors}
                    pageColors={pageColors}
                    level={form.label}
                  />
                ))}
            </>
          ))}
        </ul>
      );
    } else {
      fieldInput = (
        <input
          type={form.inputType}
          className="form-control"
          id="usr"
          placeholder={form.placeholder}
          onChange={(e) => handleFieldChange(e.target.value)}
        />
      );
    }
  
    return (
      <div className="col-sm-12 col-md-12 consent-form-list attend-sec">
        <label
          style={{
            textTransform: "capitalize",
            color: pageColors?.labelColor,
          }}
        >
          {form.label}
          {isRequired ? "*" : ""}
        </label>
        {fieldInput}
        <div class="help-block">{formErrors[label]}</div>
      </div>
    );
  };
  export default FormField;
