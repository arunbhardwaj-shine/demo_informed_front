import moment from "moment";
import CountryList from "./CountryList";
import DatePicker from "react-datepicker";
import { useState } from "react";
import Select from "react-select";
import { Ee } from "react-flags-select";

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
    templateId
  }) => {
    const [stateOptions, setStateOptions] = useState([
      { label: "Alabama", value: "Alabama" },
      { label: "Alaska", value: "Alaska" },
      { label: "Arizona", value: "Arizona" },
      { label: "Arkansas", value: "Arkansas" },
      { label: "California", value: "California" },
      { label: "Colorado", value: "Colorado" },
      { label: "Connecticut", value: "Connecticut" },
      { label: "Delaware", value: "Delaware" },
      { label: "Florida", value: "Florida" },
      { label: "Georgia", value: "Georgia" },
      { label: "Hawaii", value: "Hawaii" },
      { label: "Ldaho", value: "Ldaho" },
      { label: "Illinois", value: "Illinois" },
      { label: "Indiana", value: "Indiana" },
      { label: "Lowa", value: "Lowa" },
      { label: "Kansas", value: "Kansas" },
      { label: "Kentucky", value: "Kentucky" },
      { label: "Louisiana", value: "Louisiana" },
      { label: "Maine", value: "Maine" },
      { label: "Maryland", value: "Maryland" },
      { label: "Massachusetts", value: "Massachusetts" },
      { label: "Michigan", value: "Michigan" },
      { label: "Minnesota", value: "Minnesota" },
      { label: "Mississippi", value: "Mississippi" },
      { label: "Missouri", value: "Missouri" },
      { label: "Montana", value: "Montana" },
      { label: "Nebraska", value: "Nebraska" },
      { label: "Nevada", value: "Nevada" },
      { label: "New Hampshire", value: "New Hampshire" },
      { label: "New Jersey", value: "New Jersy" },
      { label: "New Mexico", value: "New Mexico" },
      { label: "New York", value: "New York" },
      { label: "North Carolina", value: "North Carolina" },
      { label: "North Dakota", value: "North Dakota" },
      { label: "Ohio", value: "Ohio" },
      { label: "Oklahoma", value: "Oklahoma" },
      { label: "Oregon", value: "Oregon" },
      { label: "Pennsylvania", value: "Pennsylvania" },
      { label: "Rhode Island", value: "Rhode Island" },
      { label: "South Carolina", value: "South Carolina" },
      { label: "South Dakota", value: "South Dakota" },
      { label: "Tennessee", value: "Tennessee" },
      { label: "Texas", value: "Texas" },
      { label: "Utah", value: "Utah" },
      { label: "Vermont", value: "Vermont" },
      { label: "Wyoming", value: "Wyoming" },
      { label: "Wisconsin", value: "Wisconsin" },
      { label: "West Virginia", value: "West Virginia" },
      { label: "Washington", value: "Washington" },
      { label: "Virginia", value: "Virginia" },
    ]);
    const [countryList, setCountryList] = useState(CountryList);
    const [extensionData, setExtensionData] = useState({});
    const label = userData[form.label]?userData[form.label]:form?.label?.replace(/ /g, "_");

  
  
    const handleFieldChange = (value, e = "") => {
      const newData = { ...formFieldData };
    
      if (form?.inputType === "datepicker") {
        newData[label] = moment(value).format("YYYY-MM-DD");
      } else if (form?.inputType === "checkbox") {
        newData[label] = Array.isArray(newData[label]) ? newData[label] : [];
    
        if (e.target.checked) {
          newData[label] = [...newData[label], value];
        } else {
          newData[label] = newData[label].filter((item) => item !== value);
        }
      } else {
        newData[label] = value;
      }
      setFormFieldData(newData);
    };
    
  
    if (label?.includes('country') || label?.includes('Country')) {
      form.inputType = "selection-country";
    }
     else if (label?.includes('state') || label?.includes('state')) {
      form.inputType = "selection-state";
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
      ||form.inputType === "selection-state"
    ) {
      const options = form.option?.map((op) => ({
        label: op.optionLabel,
        value: op.optionLabel,
      }));
  
      fieldInput = (
        <Select
          options={form.inputType === "selection-country" ? countryList :form.inputType === "selection-state" ? stateOptions: options}
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
    } else if ( form.inputType === "radio") {
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
                    // if (item.extension) {
                      setExtensionData({
                        [item.optionLabel]: item.extension? item.extension:[],
                      });
                    // }
                  }}
                />
                <label
                  style={{
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
    } 
    else if (form.inputType === "checkbox" ) {
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
                  onChange={(e) => {
                    handleFieldChange(item.optionLabel,e);
                    // console.log(item,"");
                    // console.log();
                    if (!extensionData[label + index]) {
                      setExtensionData({
                        ...extensionData,
                        [label + index]: item.extension ? item.extension : [],
                      });
                    } else {
                      const updatedExtensionData = { ...extensionData };
                      delete updatedExtensionData[label + index];
                      setExtensionData(updatedExtensionData);
                    }
                    
                  }}
                />
                <label
                  style={{
                    color: pageColors?.labelColor,
                  }}
                  htmlFor={label + index}
                >
                  {item.optionLabel}
                </label>
                <span className="checkmark" />
              </li>
              {extensionData[label + index]?.length > 0 &&
                extensionData[label + index]?.map((opt, i) => (
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
            color: pageColors?.labelColor,
          }}
        >
          {form.label}
          {isRequired ? "*" : ""}
        </label>
        {fieldInput}
        <div className="help-block">{formErrors[label]}</div>
      </div>
    );
  };
  export default FormField;
