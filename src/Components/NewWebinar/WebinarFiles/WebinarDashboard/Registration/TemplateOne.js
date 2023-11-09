import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import Select from "react-select";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { loader } from "../../../../../loader";
import { getData, postData } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import CountryList from "./CountryList";
import DatePicker from "react-datepicker";
import moment from "moment";
import FormField from "./FormField";
const userData = {
  name: "userName",
  email: "userEmail",
  country: "country",
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

};

export default function TemplateOne({children}) {
  const location = useLocation();
  let params = useParams();
  let navigate = useNavigate();

  let prevData = useLocation();
  prevData = prevData?.state;
  // console.log(prevData,"prevData");
  const event_code = new URLSearchParams(location.search).get("event");
  const [formData, setFormData] = useState(prevData ? prevData : {});
  const [formFieldData, setFormFieldData] = useState({});
  const [formErrors, setFormErrors] = useState({}); // Create a state to store form validation errors
  const [pageColors, setPageColors] = useState(
    prevData
      ? {
          labelColor: prevData?.content?.labelColor,
          background: prevData?.content?.backgroundColor,
        }
      : { labelColor: "#fff000", background: "#000" }
  ); // Create a state to store form validation errors

  useEffect(() => {
    if (!prevData?.content) {
      EventDataFun();
    }
  }, []);
  const EventDataFun = async () => {
    try {
      loader("show");
      const response = await getData(
        `${ENDPOINT.GET_REGISTRATION_FORM}/${event_code}`
      );
      let hadData = response?.data?.data;
      hadData = { ...hadData, content: JSON.parse(hadData?.content) };
      setFormData(hadData);
      // console.log(hadData?.content);
      setPageColors({
        labelColor: hadData?.content?.labelColor,
        background: hadData?.content?.backgroundColor,
      });
      //   setEventData({
      //     ...eventData,
      //     event_id: hadData?.event_id,
      //     company_id: hadData?.company_id,
      //   });
      loader("hide");
    } catch (err) {
      loader("hide");
      console.log("-err", err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formFieldData);
    const isValid = ValidateFormData();

    if (isValid) {
      loader("show");

      let response = await postData(
        "https://webinar.docintel.app/flow/apis/register",
        formFieldData
      );
      console.log(response);
      loader("hide");

      console.log("Form is valid. Submitting data:", formFieldData);
    } else {
      console.log("Form has errors. Please correct them.");
    }
  };

  const ValidateFormData = () => {
    // console.log(formFieldData);
    // console.log(formErrors);
    const errors = {};

    formData?.content?.body?.forEach((form) => {
      const label = userData[form.label]?userData[form.label]:form?.label?.replace(/ /g, "_");

      const fieldValue = formFieldData[label];
      // console.log(label,form);

      if (form.required == "yes" && !fieldValue) {
        errors[label] = `This field is required.`;
        // errors[label] = `This ${label} is required.`;
      } else {
        delete errors[label];
      }

      if (form.inputType === "email" && fieldValue) {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!emailRegex.test(fieldValue)) {
          errors[label] = "Invalid email address.";
        } else {
          delete errors[label];
        }
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleBackClicked = () => {
    navigate("/webinar-registration", { state: prevData });
  };
  return (
    <>
  
    <link rel="stylesheet" href="https://webinar.docintel.app/Webinar/css/style.css?v=1.7" />
    <link rel="stylesheet" href="https://webinar.docintel.app/Webinar/css/custom.css?v=1.7" />
    <link rel="stylesheet" href="https://webinar.docintel.app/Webinar/fonts/fonts.css?v=1.7" />
    <link rel="stylesheet" href="https://webinar.docintel.app/Webinar/css/login.css?v=1.7" />
    {/*<link rel="stylesheet" href="css/responsive.css">
    <link rel="stylesheet" href="css/style.css">*/}
    <div className="wrapper">
      <section className="factor-season">
        <div className="container">
          <div className="row">
            <div className="factor-season-inner">
              <div className="row">
                <div className="col-sm-8 col-md-8">
                  <div className="factor-season-left">
                    <div className="factor__logo">
                      <img src="https://webinar.docintel.app/Webinar/images/logo.png" alt="Factor logo" />
                    </div>
                    <h1>26-27 October 2022</h1>
                    <h2>
                      University of Miami – Hemophilia Treatment Center, Miami FL
                      33136
                    </h2>
                  </div>
                </div>
                <div className="col-sm-4 col-md-4">
                  <div className="factor-season-right">
                    <div className="emory__logo">
                      <img src="https://webinar.docintel.app/Webinar/images/logo1.png" alt="Emory logo" />
                    </div>
                    <h3>
                      Chair : Fernando F Corrales-Medina, MD FAAP, Miami, USA
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
   {
    children
   }
    </div>
    <div className="modal fade thnku" id="myModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">
              <img src="https://webinar.docintel.app/Webinar/images/cross.png" alt="Close" />
            </button>
          </div>
          {/* Modal body */}
          <div className="modal-body">
            <h2>Thank you for registering.</h2>
          </div>
        </div>
      </div>
    </div>
    <script type="https://webinar.docintel.app/Webinar/text/javascript" src="https://webinar.docintel.app/Webinar/js/login.js"></script>

  </>
  
  )
}
