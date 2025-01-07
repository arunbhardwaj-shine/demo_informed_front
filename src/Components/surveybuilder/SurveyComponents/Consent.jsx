import React from "react";
import { Form, Row } from "react-bootstrap";
import Select from "react-select";
import consent from "./consentobj.json";
import consentCountries from "./Modals/consentCountries";

const Consent = ({ item, handleUpdateConsent, index }) => {
  const consentOptions = [
    { value: "One Source consent", label: "One Source consent" },
    { value: "Octapharma consent", label: "Octapharma consent" },
    { value: "General consent", label: "General consent" },
  ];



  const getConsent = (selectedLanguage) => {
    const consentInputData = consent.consentDetails[selectedLanguage];
    consentInputData[consentInputData.length - 1].countryOptions =
      consentCountries["English"];
    return {
      accordionType: "commonElements",
      type: "consent",
      style: {},
      questionId: 0,
      visible: true,
      question: consent.question[selectedLanguage],
      extra: {
        selectedLanguage,
        consentOptions: consent.consentOptions[selectedLanguage],
        consentDetails: consentInputData,
        privacyLinks: consent.privacyLinks,
        cookiePolicy: consent.cookiePolicy[selectedLanguage],
        operatingStatement: consent.operatingStatement[selectedLanguage],
      },
    };
  };

  return (
    <div>
      <div className="steps scale-options">
        <Row>
          <Form.Group>
            <Form.Label>Consent Version</Form.Label>
            <Select
              aria-label="Rating Scale"
              className="dropdown-basic-button split-button-dropup"
              placeholder="Select your consent version"
              name="consentOptions"
              value={consentOptions.find(
                (option) => option.value === item.extra.selectedLanguage
              )}
              onChange={(selectedOption) => {
                handleUpdateConsent(getConsent(selectedOption.value));
              }}
              options={consentOptions}
            />
            <small>
              Please select one of the consent versions approved by your legal
              department
            </small>
          </Form.Group>
        </Row>
      </div>
    </div>
  );
};

export default Consent;
