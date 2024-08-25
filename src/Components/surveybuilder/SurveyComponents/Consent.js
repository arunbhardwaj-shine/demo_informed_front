// import React from 'react';
// import { Form, Row } from 'react-bootstrap';
// import Select from "react-select";
// import consent from './consentobj.json';

// const Consent = ({ item, handleUpdateConsent, index }) => {
//     const consentOptions = [
//         { value: "Octapharma | English", label: "Octapharma | English" },
//         { value: "Octapharma | Russian", label: "Octapharma | Russian" },
//         { value: "Octapharma | Spanish", label: "Octapharma | Spanish" },
//         { value: "Octapharma | German", label: "Octapharma | German" },
//     ];
   

//     const defaultOption = consentOptions.find(option => option.label === "Octapharma | English");

//     const getConsent = (selectedLanguage) => {
//         console.log(selectedLanguage)

//         return {
//             accordionType: "commonElements",
//             type: "consent",
//             style: {},
//             questionId: 0,
//             visible: true,
//             question: consent.question[selectedLanguage],
//             extra: {
//                 selectedLanguage,
//                 consentOptions: consent.consentOptions[selectedLanguage],
//                 consentDetails: consent.consentDetails[selectedLanguage],
//                 privacyLinks: consent.privacyLinks,
//                 cookiePolicy: consent.cookiePolicy[selectedLanguage],
//                 operatingStatement: consent.operatingStatement[selectedLanguage]
//             }
//         }
//     }

//     return (
//         <div>
//             <div className="steps scale-options">
//                 <Row>
//                     <Form.Group>
//                         <Form.Label>Consent Version</Form.Label>
//                         <Select
//                             aria-label="Rating Scale"
//                             className="dropdown-basic-button split-button-dropup"
//                             placeholder="Select your consent version"
//                             name="consentOptions"
//                             value={consentOptions.find(option => option.value === item.extra.selectedLanguage) || defaultOption}
//                             onChange={(selectedOption) => {
//                                 handleUpdateConsent(getConsent(selectedOption.value));
//                             }
//                             }
//                             options={consentOptions}
//                         />
//                         <small>You can’t do any changes on the Consent due to .......... </small>
//                     </Form.Group>
//                 </Row>
//             </div>
//         </div>
//     );
// }

// export default Consent;


import React from 'react';
import { Form, Row } from 'react-bootstrap';
import Select from "react-select";
import consent from './consentobj.json';

const Consent = ({ item, handleUpdateConsent, index }) => {
    const consentOptions = [
        { value: "Octapharma | English", label: "Octapharma | English" },
        { value: "Octapharma | Russian", label: "Octapharma | Russian" },
        { value: "Octapharma | Spanish", label: "Octapharma | Spanish" },
        { value: "Octapharma | German", label: "Octapharma | German" },
    ];
   

    const defaultOption = consentOptions.find(option => option.label === "Octapharma | English");

    const getConsent = (selectedLanguage) => {
        console.log(selectedLanguage)

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
                consentDetails: consent.consentDetails[selectedLanguage],
                privacyLinks: consent.privacyLinks,
                cookiePolicy: consent.cookiePolicy[selectedLanguage],
                operatingStatement: consent.operatingStatement[selectedLanguage]
            }
        }
    }

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
                            value={consentOptions.find(option => option.value === item.extra.selectedLanguage) || defaultOption}
                            onChange={(selectedOption) => {
                                handleUpdateConsent(getConsent(selectedOption.value));
                            }
                            }
                            options={consentOptions}
                        />
                        <small>You can’t do any changes on the Consent due to .......... </small>
                    </Form.Group>
                </Row>
            </div>
        </div>
    );
}

export default Consent;

