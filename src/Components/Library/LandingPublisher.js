import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Container, Form, FormGroup, FormLabel, Row } from "react-bootstrap";
import Select from "react-select";
import Header from "../CommonComponent/HeaderComponent/Header";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Slider from "react-slick";
import LandingHeader from "./LandingHeader";
import LandingContact from "./LandingContact";
import LandingFooter from "./LandingFooter";
import { HomeValidation } from "../Validations/HomeValidations/HomeValidation";
import { loader } from "../../loader";
import { ENDPOINT } from "../../axios/apiConfig";
import { postData } from "../../axios/apiHelper";
import LandingSliderSection from "./LandingSliderSection";

const PharmaRd = () => {
  const [activeModule, setActiveModule] = useState(null);
  const [addClass, setAddClass] = useState(false);
  const [showBigCircleData, setShowBigCircleData] = useState(true);
  const [formFeilds, setFormFeilds] = useState(false);
  const [submitData, setSubmitData] = useState(false);
  const [modulesSelect, setModulesSelect] = useState(true);
  const [selectedModules, setSelectedModules] = useState([]);
  const [registerPage, setRegisterPage] = useState(true)
  const [intialModuleData, setIntialModuleData] = useState(null);
  const [payloadData, setPayloadData] = useState({});
  const [registerError, setRegisterError] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const companyRef = useRef(null);
  const phoneRef = useRef(null);
  const countryRef = useRef(null);

  const modules = [
    {
      id: 1,
      style: "1",
      active: false,
      icon: "RTR-icon.svg",
      title: "Read-Through-Rate",
      description: "Show you clients what work.",
    },
    {
      id: 2,
      style: "2",
      active: false,
      icon: "rating-icon.svg",
      title: "Rating Tool",
      description:
        "Gauge the true sentiments of HCPs regarding your content by enabling them to provide ratings while they interact with it.",
    },

    {
      id: 3,
      style: "3",
      active: false,
      icon: "auto-email-icon.svg",
      title: "Automail",
      description:
        "Automate emails to keep building the relationships with reminders, AI-based suggestions or or just help to stay informed.",
    },

    {
      id: 4,
      style: "4",
      active: false,
      icon: "legal-document-icon.svg",
      title: "Consent",
      description:
        "Help clients get the consent they require. ",
    },
    {
      id: 5,
      style: "5",
      active: false,
      icon: "email-small-icon.svg",
      title: "Email Engine",
      description:
        "Offer to run email campaigns for clients who need external one-off compliance",
    },
    {
      id: 6,
      style: "6",
      active: false,
      icon: "docintel-small-icon.svg",
      title: "Docintel.app",
      description:
        "HCPs can read in any browser and/or take offline in secure app",
    },
    {
      id: 7,
      style: "7",
      active: false,
      icon: "informedgo-icon.svg",
      title: "inforMedGo",
      description:
        "Give your clients a complimentary tool for in-person content distribution",
    },

    {
      id: 8,
      style: "8",
      active: false,
      icon: "web-portal-icon.svg",
      title: "Web Portal",
      description:
        "Plug-and-play modules to suit your clients needs for a faster and more flexible experience ",
    },

    {
      id: 9,
      style: "9",
      active: false,
      icon: "webinar-small-icon.svg",
      title: "Webinar Portal",
      description:
        "Enhance your clients' webinars with personalised branding and interactive features like live polls and questions",
    },
  ];

  const bigCircleModules = [
    {
      id: 1,
      active: false,
      logo: "rtr-image.svg",
      title: <span style={{ color: "#5A6BB5" }}>Read-Through-Rate</span>,
      image: "rtr-content-list.png",
      description:
        "Leverage our proprietary Read-Through-Rate metric to gauge the level of engagement. Show your clients which pages are read so they can encourage HCPs to engage more and gain more usage",
      para: "Knowledge is power - how will you help your clients?",
      features: [
        {
          keyFeature: "First captures each HCP’s consent",
          subKeyFeatures: []
        },
        {
          keyFeature: "Track every engagement down to each second spend on individual pages",
          subKeyFeatures: []
        },
        {
          keyFeature: "Track HCPs reading on & offline, in browser or in app",
          subKeyFeatures: []
        },
        {
          keyFeature: "True engagement data",
          subKeyFeatures: []
        },
      ],
    },

    {
      id: 2,
      active: false,
      logo: "rating-icon.svg",
      title: <span style={{ color: "#2B9BC8" }}>Rating Tool</span>,
      image: "rating-tool-min.png",
      description:
        "Introducing our revolutionary Rating Tool, assessing clinical value across your content. Gather insights as HCPs engage, guiding clients to prioritize value over quantity.",
      features: [
        {
          keyFeature: "Let HCPs rate your content",
          subKeyFeatures: []
        },
        {
          keyFeature: "HCPs rate whenever they engage via browser or in-app",
          subKeyFeatures: []
        },
        {
          keyFeature: "Prove ROI",
          subKeyFeatures: []
        },
      ],
    },

    {
      id: 3,
      active: false,
      logo: "auto-email-icon.svg",
      title: <span style={{ color: "#00D4C0" }}>Automail</span>,
      image: "automail-min.png",
      description:
        "We keep track of all your licensed content with confirmation emails and the limits you’ve agreed with your clients, You receive alerts prior to reaching limits, whether they are expiration or quantity-based",
      para: "",
      features: [
        {
          keyFeature: "Automated confirmation email",
          subKeyFeatures: ["Nearing expiration", "Nearing quantity limit"]
        },
        {
          keyFeature: "Alert to both sales & production",
          subKeyFeatures: []
        },
        {
          keyFeature: "Customisable AutoMail settings",
          subKeyFeatures: []
        },
      ],
    },

    {
      id: 4,
      active: false,
      logo: "legal-document-icon.svg",
      title: <span style={{ color: "#00A4BF" }}>Consent</span>,
      image: "consent-min.png",
      description:
        "Clients often realize their consent needs only after receiving the eprint. Our platform enables you and them to modify consent forms and language online anytime.",
      para: "",
      features: [
        {
          keyFeature: "Three standard consent forms makes it easy",
          subKeyFeatures: []
        },
        {
          keyFeature: "Any language possible",
          subKeyFeatures: []
        },
        {
          keyFeature:"Change online at any time",
          subKeyFeatures: []
        },
        {
          keyFeature: "Personalised experienced for the HCPs",
          subKeyFeatures: []
        },
        {
          keyFeature: "HCPs can withdraw consent through their Docintel account",
          subKeyFeatures: []
        },
      ],
    },

    {
      id: 5,
      active: false,
      logo: "email-small-icon.svg",
      title: <span style={{ color: "#0084BE" }}>Email Engine</span>,
      image: "email-engine-min.png",
      description:
        "Our email platform caters to the life science industry, designed for sending bulk emails with automated follow-ups tailored to each HCP's actions. It's commonly employed to invite HCPs to events or content launches using purchased lists, subject to email limits.",
      para: "",
      features: [
        {
          keyFeature: "Easy to use - built for the industry",
          subKeyFeatures: []
        },
        {
          keyFeature: "Dynamic SmartLists save you from excel-hell",
          subKeyFeatures: []
        },
        {
          keyFeature: "Track if HCP reads what you send",
          subKeyFeatures: []
        },
        {
          keyFeature: "Email & content engagement stored in CRM",
          subKeyFeatures: []
        },
        {
          keyFeature: "Add-on AutoMail for AI-automation",
          subKeyFeatures: []
        },
      ],
    },

    {
      id: 6,
      active: false,
      logo: "docintel-small-icon.svg",
      title: <span style={{ color: "#0066BE" }}>Docintel.app</span>,
      image: "docintel-min.png",
      description:
        "Beyond our elegant and user-friendly interfaces lies perhaps the most sophisticated and versatile technology accessible to publishers. Letting HCPs read on any device means flexibility for your clients and freedom to drive usage.",
      para: "Tailorable consent mechanisms, usage tracking, live analytics, multimedia content choices, and interactivity are all designed to enhance your client offer.",
      features: [
        "",
        "",
        "",
        ""
      ],
      features: [
        {
          keyFeature: "Secure and track limits agreed with client",
          subKeyFeatures: []
        },
        {
          keyFeature: "Multimedia options to satisfy any clients wish",
          subKeyFeatures: []
        },
        {
          keyFeature: "HCPs read on & offline, in any browser or in the app",
          subKeyFeatures: []
        },
        {
          keyFeature: "Track every engagement down to each second spend on individual pages",
          subKeyFeatures: []
        },
      ],
    },

    {
      id: 7,
      active: false,
      logo: "informedgo-icon.svg",
      title: <span style={{ color: "#045FAE" }}>inforMedGo</span>,
      image: "informedgo-min.png",
      description:
        "Maximize the success of pharma content distribution by including a complimentary InforMedGO app for Apple, Android, and Windows devices with every eprint. This enables reps to carry your eprints on any device, facilitating immediate distribution to HCPs.",
      para: "The key to success lies in actively distributing valuable content.",
      features: [
        {
          keyFeature: "Easy to use - download free app and enter code for instant activation",
          subKeyFeatures: []
        },
        {
          keyFeature: "Give Reps control over your entire content collection",
          subKeyFeatures: []
        },
        {
          keyFeature: "Gather on-the-spot consent",
          subKeyFeatures: []
        },
      ],
    },

    {
      id: 8,
      active: false,
      logo: "web-portal-icon.svg",
      title: <span style={{ color: "#6E52A2" }}>Web Portal</span>,
      image: "web-portal-min.png",
      description:
        "Offering complete creative freedom to build custom libraries of your content and add options for your clients that enhance the HCP experience. Implement secure consent mechanisms and comprehensive interaction tracking to gauge ROI and refine your offerings.",
      para: "",
      features: [
        {
          keyFeature: "Enhancing content pages",
          subKeyFeatures: []
        },
        {
          keyFeature: "On demand for when the HCP want to know more",
          subKeyFeatures: []
        },
        {
          keyFeature: "Let HCPs take what they want offline in their personal Docintel app account",
          subKeyFeatures: []
        },
        {
          keyFeature: "Combining Local and Global users for promotion",
          subKeyFeatures: []
        },
        {
          keyFeature: "Customise to clients visual identity",
          subKeyFeatures: []
        },
      ],
    },

    {
      id: 9,
      active: false,
      logo: "webinar-small-icon.svg",
      title: <span style={{ color: "#8A4E9C" }}>Webinar Portal</span>,
      image: "webinar-portal-min.png",
      description:
        "Transform your clients webinars with creative freedom and engagement tools that resonates and make HCPs feel valued and active participants. Convert the recordings into valuable content that can be distributed in a user-friendly format, fostering post-event engagement and stronger relationships with HCPs",
      para: "",
      features: [
        {
          keyFeature: "Online Webinar Platform every HCP will find easy to use",
          subKeyFeatures: []
        },
        {
          keyFeature: "Registration & Consent to suit any regulation",
          subKeyFeatures: []
        },
        {
          keyFeature: "Automated Calendar Reminders helping the HCPs be on time",
          subKeyFeatures: []
        },
        {
          keyFeature: "Automated personalised emails with single-click-login ensure easy access for each HCP",
          subKeyFeatures: []
        },
        {
          keyFeature: "Take the interaction to the next level & allow",
          subKeyFeatures: []
        },
        {
          keyFeature: "HCPs to ask real-time questions",
          subKeyFeatures: []
        },
        {
          keyFeature: "Learn who stayed and engaged to prove",
          subKeyFeatures: []
        },
      ],
    },
  ];

  const [country, setCountry] = useState([
    { value: "Afghanistan", label: "Afghanistan" },
    { value: "Albania", label: "Albania" },
    { value: "Algeria", label: "Algeria" },
    { value: "American Samoa", label: "American Samoa" },
    { value: "Andorra", label: "Andorra" },
    { value: "Angola", label: "Angola" },
    { value: "Anguilla", label: "Anguilla" },
    { value: "Antarctica", label: "Antarctica" },
    { value: "Antigua and Barbuda", label: "Antigua and Barbuda" },
    { value: "Argentina", label: "Argentina" },
    { value: "Armenia", label: "Armenia" },
    { value: "Aruba", label: "Aruba" },
    { value: "Australia", label: "Australia" },
    { value: "Austria", label: "Austria" },
    { value: "Azerbaijan", label: "Azerbaijan" },
    { value: "Bahamas", label: "Bahamas" },
    { value: "Bahrain", label: "Bahrain" },
    { value: "Bangladesh", label: "Bangladesh" },
    { value: "Barbados", label: "Barbados" },
    { value: "Belarus", label: "Belarus" },
    { value: "Belgium", label: "Belgium" },
    { value: "Belize", label: "Belize" },
    { value: "Benin", label: "Benin" },
    { value: "Bermuda", label: "Bermuda" },
    { value: "Bhutan", label: "Bhutan" },
    { value: "Bolivia", label: "Bolivia" },
    { value: "B&H", label: "Bosnia and Herzegovina" },
    { value: "Botswana", label: "Botswana" },
    { value: "Bouvet Island", label: "Bouvet Island" },
    { value: "Brazil", label: "Brazil" },
    {
      value: "British Indian Ocean Territory",
      label: "British Indian Ocean Territory",
    },
    { value: "Brunei Darussalam", label: "Brunei Darussalam" },
    { value: "Bulgaria", label: "Bulgaria" },
    { value: "Burkina Faso", label: "Burkina Faso" },
    { value: "Burundi", label: "Burundi" },
    { value: "Cambodia", label: "Cambodia" },
    { value: "Cameroon", label: "Cameroon" },
    { value: "Canada", label: "Canada" },
    { value: "Cape Verde", label: "Cape Verde" },
    { value: "Cayman Islands", label: "Cayman Islands" },
    { value: "Central African Republic", label: "Central African Republic" },
    { value: "Chad", label: "Chad" },
    { value: "Chile", label: "Chile" },
    { value: "China", label: "China" },
    { value: "Christmas Island", label: "Christmas Island" },
    { value: "Cocos (Keeling) Islands", label: "Cocos (Keeling) Islands" },
    { value: "Colombia", label: "Colombia" },
    { value: "Comoros", label: "Comoros" },
    { value: "Congo", label: "Congo" },
    {
      value: "Congo, The Democratic Republic of The",
      label: "Congo, The Democratic Republic of The",
    },
    { value: "Cook Islands", label: "Cook Islands" },
    { value: "Costa Rica", label: "Costa Rica" },
    { value: "Cote D'ivoire", label: "Cote D'ivoire" },
    { value: "Croatia", label: "Croatia" },
    { value: "Cuba", label: "Cuba" },
    { value: "Cyprus", label: "Cyprus" },
    { value: "Czech Republic", label: "Czech Republic" },
    { value: "Denmark", label: "Denmark" },
    { value: "Djibouti", label: "Djibouti" },
    { value: "Dominica", label: "Dominica" },
    { value: "Dominican Republic", label: "Dominican Republic" },
    { value: "Ecuador", label: "Ecuador" },
    { value: "Egypt", label: "Egypt" },
    { value: "El Salvador", label: "El Salvador" },
    { value: "Equatorial Guinea", label: "Equatorial Guinea" },
    { value: "Eritrea", label: "Eritrea" },
    { value: "Estonia", label: "Estonia" },
    { value: "Ethiopia", label: "Ethiopia" },
    {
      value: "Falkland Islands (Malvinas)",
      label: "Falkland Islands (Malvinas)",
    },
    { value: "Faroe Islands", label: "Faroe Islands" },
    { value: "Fiji", label: "Fiji" },
    { value: "Finland", label: "Finland" },
    { value: "France", label: "France" },
    { value: "French Guiana", label: "French Guiana" },
    { value: "French Polynesia", label: "French Polynesia" },
    {
      value: "French Southern Territories",
      label: "French Southern Territories",
    },
    { value: "Gabon", label: "Gabon" },
    { value: "Gambia", label: "Gambia" },
    { value: "Georgia", label: "Georgia" },
    { value: "Germany", label: "Germany" },
    { value: "Ghana", label: "Ghana" },
    { value: "Gibraltar", label: "Gibraltar" },
    { value: "Greece", label: "Greece" },
    { value: "Greenland", label: "Greenland" },
    { value: "Grenada", label: "Grenada" },
    { value: "Guadeloupe", label: "Guadeloupe" },
    { value: "Guam", label: "Guam" },
    { value: "Guatemala", label: "Guatemala" },
    { value: "Guinea", label: "Guinea" },
    { value: "Guinea-bissau", label: "Guinea-bissau" },
    { value: "Guyana", label: "Guyana" },
    { value: "Haiti", label: "Haiti" },
    {
      value: "Heard Island and Mcdonald Islands",
      label: "Heard Island and Mcdonald Islands",
    },
    {
      value: "Holy See (Vatican City State)",
      label: "Holy See (Vatican City State)",
    },
    { value: "Honduras", label: "Honduras" },
    { value: "Hong Kong", label: "Hong Kong" },
    { value: "Hungary", label: "Hungary" },
    { value: "Iceland", label: "Iceland" },
    { value: "India", label: "India" },
    { value: "Indonesia", label: "Indonesia" },
    { value: "Iran, Islamic Republic of", label: "Iran, Islamic Republic of" },
    { value: "Iraq", label: "Iraq" },
    { value: "Ireland", label: "Ireland" },
    { value: "Israel", label: "Israel" },
    { value: "Italy", label: "Italy" },
    { value: "Jamaica", label: "Jamaica" },
    { value: "Japan", label: "Japan" },
    { value: "Jordan", label: "Jordan" },
    { value: "Kazakhstan", label: "Kazakhstan" },
    { value: "Kenya", label: "Kenya" },
    { value: "Kiribati", label: "Kiribati" },
    {
      value: "Korea, Democratic People's Republic of",
      label: "Korea, Democratic People's Republic of",
    },
    { value: "Korea, Republic of", label: "Korea, Republic of" },
    { value: "Kosovo", label: "Kosovo" },
    { value: "Kuwait", label: "Kuwait" },
    { value: "Kyrgyzstan", label: "Kyrgyzstan" },
    {
      value: "Lao People's Democratic Republic",
      label: "Lao People's Democratic Republic",
    },
    { value: "Latvia", label: "Latvia" },
    { value: "Lebanon", label: "Lebanon" },
    { value: "Lesotho", label: "Lesotho" },
    { value: "Liberia", label: "Liberia" },
    { value: "Libyan Arab Jamahiriya", label: "Libyan Arab Jamahiriya" },
    { value: "Liechtenstein", label: "Liechtenstein" },
    { value: "Lithuania", label: "Lithuania" },
    { value: "Luxembourg", label: "Luxembourg" },
    { value: "Macao", label: "Macao" },
    { value: "North Macedonia", label: "North Macedonia" },
    { value: "Madagascar", label: "Madagascar" },
    { value: "Malawi", label: "Malawi" },
    { value: "Malaysia", label: "Malaysia" },
    { value: "Maldives", label: "Maldives" },
    { value: "Mali", label: "Mali" },
    { value: "Malta", label: "Malta" },
    { value: "Marshall Islands", label: "Marshall Islands" },
    { value: "Martinique", label: "Martinique" },
    { value: "Mauritania", label: "Mauritania" },
    { value: "Mauritius", label: "Mauritius" },
    { value: "Mayotte", label: "Mayotte" },
    { value: "Mexico", label: "Mexico" },
    {
      value: "Micronesia, Federated States of",
      label: "Micronesia, Federated States of",
    },
    { value: "Moldova, Republic of", label: "Moldova, Republic of" },
    { value: "Monaco", label: "Monaco" },
    { value: "Mongolia", label: "Mongolia" },
    { value: "Montserrat", label: "Montserrat" },
    { value: "Morocco", label: "Morocco" },
    { value: "Mozambique", label: "Mozambique" },
    { value: "Myanmar", label: "Myanmar" },
    { value: "Namibia", label: "Namibia" },
    { value: "Nauru", label: "Nauru" },
    { value: "Nepal", label: "Nepal" },
    { value: "Netherlands", label: "Netherlands" },
    { value: "Netherlands Antilles", label: "Netherlands Antilles" },
    { value: "New Caledonia", label: "New Caledonia" },
    { value: "New Zealand", label: "New Zealand" },
    { value: "Nicaragua", label: "Nicaragua" },
    { value: "Niger", label: "Niger" },
    { value: "Nigeria", label: "Nigeria" },
    { value: "Niue", label: "Niue" },
    { value: "Norfolk Island", label: "Norfolk Island" },
    { value: "Northern Mariana Islands", label: "Northern Mariana Islands" },
    { value: "Norway", label: "Norway" },
    { value: "Oman", label: "Oman" },
    { value: "Pakistan", label: "Pakistan" },
    { value: "Palau", label: "Palau" },
    {
      value: "Palestinian Territory, Occupied",
      label: "Palestinian Territory, Occupied",
    },
    { value: "Panama", label: "Panama" },
    { value: "Papua New Guinea", label: "Papua New Guinea" },
    { value: "Paraguay", label: "Paraguay" },
    { value: "Peru", label: "Peru" },
    { value: "Philippines", label: "Philippines" },
    { value: "Pitcairn", label: "Pitcairn" },
    { value: "Poland", label: "Poland" },
    { value: "Portugal", label: "Portugal" },
    { value: "Puerto Rico", label: "Puerto Rico" },
    { value: "Qatar", label: "Qatar" },
    { value: "Reunion", label: "Reunion" },
    { value: "Romania", label: "Romania" },
    { value: "Russian Federation", label: "Russian Federation" },
    { value: "Rwanda", label: "Rwanda" },
    { value: "Saint Helena", label: "Saint Helena" },
    { value: "Saint Kitts and Nevis", label: "Saint Kitts and Nevis" },
    { value: "Saint Lucia", label: "Saint Lucia" },
    { value: "Saint Pierre and Miquelon", label: "Saint Pierre and Miquelon" },
    {
      value: "Saint Vincent and The Grenadines",
      label: "Saint Vincent and The Grenadines",
    },
    { value: "Samoa", label: "Samoa" },
    { value: "San Marino", label: "San Marino" },
    { value: "Sao Tome and Principe", label: "Sao Tome and Principe" },
    { value: "Saudi Arabia", label: "Saudi Arabia" },
    { value: "Senegal", label: "Senegal" },
    { value: "Serbia", label: "Serbia" },
    { value: "Montenegro", label: "Montenegro" },
    { value: "Seychelles", label: "Seychelles" },
    { value: "Sierra Leone", label: "Sierra Leone" },
    { value: "Singapore", label: "Singapore" },
    { value: "Slovakia", label: "Slovakia" },
    { value: "Slovenia", label: "Slovenia" },
    { value: "Solomon Islands", label: "Solomon Islands" },
    { value: "Somalia", label: "Somalia" },
    { value: "South Africa", label: "South Africa" },
    {
      value: "South Georgia and The South Sandwich Islands",
      label: "South Georgia and The South Sandwich Islands",
    },
    { value: "Spain", label: "Spain" },
    { value: "Sri Lanka", label: "Sri Lanka" },
    { value: "Sudan", label: "Sudan" },
    { value: "Suriname", label: "Suriname" },
    { value: "Svalbard and Jan Mayen", label: "Svalbard and Jan Mayen" },
    { value: "Swaziland", label: "Swaziland" },
    { value: "Sweden", label: "Sweden" },
    { value: "Switzerland", label: "Switzerland" },
    { value: "Syrian Arab Republic", label: "Syrian Arab Republic" },
    { value: "Taiwan, Province of China", label: "Taiwan, Province of China" },
    { value: "Tajikistan", label: "Tajikistan" },
    {
      value: "Tanzania, United Republic of",
      label: "Tanzania, United Republic of",
    },
    { value: "Thailand", label: "Thailand" },
    { value: "Timor-leste", label: "Timor-leste" },
    { value: "Togo", label: "Togo" },
    { value: "Tokelau", label: "Tokelau" },
    { value: "Tonga", label: "Tonga" },
    { value: "Trinidad and Tobago", label: "Trinidad and Tobago" },
    { value: "Tunisia", label: "Tunisia" },
    { value: "Turkey", label: "Turkey" },
    { value: "Turkmenistan", label: "Turkmenistan" },
    { value: "Turks and Caicos Islands", label: "Turks and Caicos Islands" },
    { value: "Tuvalu", label: "Tuvalu" },
    { value: "Uganda", label: "Uganda" },
    { value: "Ukraine", label: "Ukraine" },
    { value: "United Arab Emirates", label: "United Arab Emirates" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "United States", label: "United States" },
    {
      value: "United States Minor Outlying Islands",
      label: "United States Minor Outlying Islands",
    },
    { value: "Uruguay", label: "Uruguay" },
    { value: "Uzbekistan", label: "Uzbekistan" },
    { value: "Vanuatu", label: "Vanuatu" },
    { value: "Venezuela", label: "Venezuela" },
    { value: "Viet Nam", label: "Viet Nam" },
    { value: "Virgin Islands, British", label: "Virgin Islands, British" },
    { value: "Virgin Islands, U.S.", label: "Virgin Islands, U.S." },
    { value: "Wallis and Futuna", label: "Wallis and Futuna" },
    { value: "Western Sahara", label: "Western Sahara" },
    { value: "Yemen", label: "Yemen" },
    { value: "Zambia", label: "Zambia" },
    { value: "Zimbabwe", label: "Zimbabwe" },
  ]);

  const [registerFormInputs, setRegisterFormInputs] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    consent1: { label: "Email me only about modules I’ve looked at", checked: false },
    consent2: { label: "Keep me informed about other news from inforMed.pro", checked: false },
  });

  const [moduleFormInputs, setModuleFormInputs] = useState({
    message: "",
    secondaryEmail: "",
    secondaryPhone: "",
  });

  const [moduleData, setModuleData] = useState({
    active: false,
    style: "",
    imagePath: "",
    heading: "",
    paragraph: "",
  });

  const [bigCircleModuleData, setBigModuleData] = useState({
    active: false,
    logoIconPath: "",
    heading: "",
    imagePath: "",
    detail: "",
    paragraph: "",
    highlights: [],
  });

  const handleClick = (moduleName, index) => {
    setModulesSelect(true)
    setSubmitData(false)
    const smallCircleData = modules[index];
    const bigCircleData = bigCircleModules[index];
    if (moduleName !== activeModule) {
      setModuleData({
        active: false,
        style: smallCircleData?.style,
        imagePath: smallCircleData?.icon,
        heading: smallCircleData?.title,
        paragraph: smallCircleData?.description,
      });
      setActiveModule();
    }
    setTimeout(() => {
      setModuleData((prevState) => ({
        active: moduleName === activeModule ? !prevState.active : true,
        style: moduleName === activeModule ? prevState.style : smallCircleData?.style,
        imagePath: smallCircleData?.icon,
        heading: smallCircleData?.title,
        paragraph: smallCircleData?.description,
      }));
      setActiveModule(moduleName === activeModule ? null : moduleName);
    }, 700);

    setBigModuleData((prevState) => ({
      active: moduleName === activeModule ? !prevState.active : true,
      logoIconPath: bigCircleData?.logo,
      heading: bigCircleData?.title,
      imagePath: bigCircleData?.image,
      detail: bigCircleData?.description,
      paragraph: bigCircleData?.para,
      highlights: bigCircleData?.features,
    }));
    setShowBigCircleData(true);
    setRegisterPage(true)
  };

  const handleReadClick = async (event) => {
    event.preventDefault(); 
    const err = HomeValidation(registerFormInputs);
    if (Object.keys(err)?.length) {
      if (Object?.keys(err)[0] == "name") {
        nameRef?.current?.focus();
      } else if (Object?.keys(err)[0] == "email") {
        emailRef?.current?.focus();
      } else if (Object.keys(err)[0] == "comapny") {
        companyRef.current.focus();
      } else if (Object.keys(err)[0] == "phone") {
        phoneRef.current.focus();
      } else if (Object.keys(err)[0] == "country") {
        countryRef.current.focus();
      }
      setRegisterError(err);
      return;
    } else {
      loader("show"); 
      try {
        let consent= "";
        let consentType= ""
        if (registerFormInputs?.consent1 === 'on' && registerFormInputs?.consent2 === 'on') {
          consent = "Full Consent";
        }
        else if(registerFormInputs?.consent1 === 'on' || registerFormInputs?.consent2 === 'on') {
          consent = "Limited Consent";
          consentType = registerFormInputs?.consent1 === 'on'
            ? "Email me only about modules I’ve looked at"
            : "Keep me informed about other news from inforMed.pro";
        } 
        else {
          consent = "No Consent";
        }
        let data =
        {
          name: registerFormInputs?.name?.trim(),
          email: registerFormInputs?.email?.trim(),
          phone: registerFormInputs?.phone?.trim(),
          company: registerFormInputs?.company?.trim(),
          country: registerFormInputs?.country?.trim(),
          consent: consent,
          consent_type: consentType,
          type:'register'
        }

        setPayloadData(data)
        const res = await postData(ENDPOINT.REGISTER,data );
        let obj = {};
        loader("hide");
        setRegisterFormInputs(obj);
        setSelectedCountry([]);
        setRegisterError(false);
        setRegisterPage(false);
        console.log(res, "===> data");
      } catch (err) {
        console.log(err);
        loader("hide");
      } 
    }
    console.log(registerFormInputs, "===>setRegisterFormInputs");
  };

  const handleRegisterFormChange = (e, isSelectedName) => {
    setRegisterFormInputs({
      ...registerFormInputs,
      [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
        ? e?.target?.files
          ? e.target?.files
          : e
        : e?.target?.value,
    });
  };

  const handleModuleFormChange = (e, isSelectedName) => {
    setModuleFormInputs({
      ...moduleFormInputs,
      [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
        ? e?.target?.files
          ? e.target?.files
          : e
        : e?.target?.value,
    });
  };

  const handleBigCircleClick = (moduleName, index) => {
    const bigCircleData = bigCircleModules[index];   
    setShowBigCircleData(true);
  
    if (showBigCircleData) {  
      setAddClass(false);  
      setBigModuleData((prevState) => ({ 
  active: moduleName === activeModule ? !prevState.active : true,  
        logoIconPath: bigCircleData?.logo,    
        heading: bigCircleData?.title,   
        imagePath: bigCircleData?.image, 
        detail: bigCircleData?.description, 
        paragraph: bigCircleData?.para, 
        highlights: bigCircleData?.features, 
      }));
      setActiveModule(moduleName === activeModule ? null : moduleName);
    } else { 
      setShowBigCircleData(false);
      setActiveModule(moduleName === activeModule ? null : moduleName);  
      const visibleModules = document.querySelectorAll('.stat.visible'); 
      const visibleModuleNames = Array.from(visibleModules).map(module => { 
        const classNames = module.className.split(' '); 
        return classNames[classNames.length - 2];
      }); 
      setSelectedModules(prevState => { 
        const isPreviouslySelected = prevState.includes(moduleName);  
        const updatedModules = isPreviouslySelected
            ? prevState.filter(item => item !== moduleName) 
          : [...prevState, moduleName]; 
        const stats = document.querySelectorAll('.stat'); 
        stats.forEach(stat => { 
          if (stat.classList.contains(moduleName)) { 
            stat.classList.toggle('visible'); 
            stat.classList.toggle('active'); 
          }
        }); 
        return updatedModules;
      });
   }
 
  }

  useEffect(() => {
    const stats = document.querySelectorAll('.stat');
    stats?.forEach(stat => {
      if (stat.classList.contains('visible')) {
        stat.classList.add('visible');
      }
    });
  }, [selectedModules]);

  const handleRequestClick = () => {
    setAddClass(true);  
    const stats = document.querySelectorAll('.stat');  
    stats?.forEach(stat => {  
      if (stat.classList.contains('visible')) { 
        stat.classList.add('visible');
      }
    });

    setShowBigCircleData(false);
    setModulesSelect(true); 
    setTimeout(() => { 
      const visibleModules = document.querySelectorAll('.stat.visible'); 
      const visibleModuleNames = Array.from(visibleModules).map(module => {
        const classNames = module.className.split(' ');
        return classNames[classNames.length - 2];
      });
      setSelectedModules(prevState => (
        [...new Set([...visibleModuleNames, ...prevState])]
      ));
    }, 500);
    setIntialModuleData({bigCircleModuleData, activeModule});
  }

  const handleFormClick = () => {
    setFormFeilds(true);
  };

  const handleSubmitClick = async () => {
    loader("show");
      try {
        const res = await postData(ENDPOINT.REGISTER, {
          ...payloadData,
          message: moduleFormInputs?.message?.trim(),
          email: moduleFormInputs?.secondaryEmail?.trim(),
          phone: moduleFormInputs?.secondaryPhone?.trim(),
          modules: selectedModules,
          type:'modules'
        });
        let obj = {};
        loader("hide");
        setModuleFormInputs(obj);
        console.log(res, "===> data2222");
      } catch (err) {
        console.log(err);
        loader("hide");
      }
      console.log(moduleFormInputs, "===>setModuleFormInputs");
        setSubmitData(true);
        setAddClass(false);
        setShowBigCircleData(false);
        setModulesSelect(false);
        setFormFeilds(false);
        console.log(selectedModules, "===>selectedModules");
    }

  const handleBigCircleClose = (moduleName, index) => {
    setAddClass(false);
    setFormFeilds(false)
    const smallCircleData = modules[index];
    if (moduleName !== activeModule) {
      setModuleData({
        active: false,
        imagePath: smallCircleData?.icon,
        heading: smallCircleData?.title,
        paragraph: smallCircleData?.description,
      });
      setActiveModule(moduleName === activeModule ? null : moduleName);
    }
    setTimeout(() => {
    setReadStatus(false);
    }, 200);
    setSelectedModules([])
  }

  const handleBigClose = (moduleName, index) => {
    setAddClass(false);
    setFormFeilds(false)
    setSelectedModules([])
    setSubmitData(false);
    setShowBigCircleData(false);
    setModulesSelect(false);
    const smallCircleData = modules[index];
    if (moduleName !== activeModule) {
      setTimeout(() => {
      setModuleData({
        active: false,
        imagePath: smallCircleData?.icon,
        heading: smallCircleData?.title,
        paragraph: smallCircleData?.description,
      });
      setActiveModule(null);
    }, 1000); 
    }
    setTimeout(() => {
      setReadStatus(false);
      }, 200); 
  }
 
  useEffect(() => {
    if (submitData) {
      setTimeout(() => {
        setSelectedModules([]);
        setSubmitData(false);
        setShowBigCircleData(true);
        setModulesSelect(true);
        setActiveModule(intialModuleData?.activeModule);
      }, 1000); 
    }
  }, [submitData]);

  const handleRead = () => {
    setReadStatus(true)
  }

  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
 
  const [show, setShow] = useState(false);
  const [readStatus, setReadStatus] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
      <LandingHeader/>

      <div className="landing-banner pharma publish">
        <Container>
          <Row>
            <div className="landing-block">
              <div className="landing-heading">
                <h1>Give your clients more</h1>
              </div>
              <div className="landing-sub-heading">
                <h4>
                  Simplify complexity using the most advanced platform made for
                  the medical publishing industry, ensuring the security of your
                  content.{" "}
                </h4>
              </div>
              <div className="circular-height">
                <div className="circular-ring">
                  <div className="big-circle">
                    <div className="icon-block icon56">
                      <img src={path_image + "subtract-icon.svg"} alt="" />
                    </div>
                    <div className="icon-block icon43 gradient">&nbsp;</div>
                    <div className="icon-block icon72">
                      <img src={path_image + "statistics-icon.svg"} alt="" />
                    </div>
                    <div className="icon-block icon43">&nbsp;</div>
                    <div className="icon-block icon60">
                      <img src={path_image + "world-icon.svg"} alt="" />
                    </div>
                    <div className="icon-block icon27">&nbsp;</div>
                    <div className="icon-block icon56">
                      <img src={path_image + "survay-icon.svg"} alt="" />
                    </div>
                    <div className="icon-block icon43 gradient">&nbsp;</div>
                    <div className="icon-block icon72">
                      <img
                        src={path_image + "legal-document-icon2.svg"}
                        alt=""
                      />
                    </div>
                    <div className="icon-block icon43">&nbsp;</div>
                    <div className="icon-block icon60">
                      <img src={path_image + "world-icon.svg"} alt="" />
                    </div>
                    <div className="icon-block icon27">&nbsp;</div>
                  </div>
                  <div className="circle circle-inner1">
                    <div className="icon-block icon72">
                      <img src={path_image + "white-emails.svg"} alt="" />
                    </div>
                    <div className="icon-block icon35">&nbsp;</div>
                    <div className="icon-block icon60">
                      <img src={path_image + "white-rtr.svg"} alt="" />
                    </div>
                    <div className="icon-block icon72">
                      <img src={path_image + "white-webinar.svg"} alt="" />
                    </div>
                    <div className="icon-block icon35">&nbsp;</div>
                    <div className="icon-block icon60">
                      <img src={path_image + "white-portal.svg"} alt="" />
                    </div>
                  </div>
                  <div className="circle circle-inner2">
                    <div className="icon-block icon60">
                      <img src={path_image + "white-spc.svg"} alt="" />
                    </div>
                    <div className="icon-block icon35">&nbsp;</div>
                    <div className="icon-block icon85">
                      <img src={path_image + "white-docintel.svg"} alt="" />
                    </div>
                    <div className="icon-block icon60">
                      <img src={path_image + "white-rating.svg"} alt="" />
                    </div>
                    <div className="icon-block icon35">&nbsp;</div>
                    <div className="icon-block icon85">
                      <img src={path_image + "white-docintel.svg"} alt="" />
                    </div>
                  </div>
                  <div className="circle circle-inner3">
                    <div className="icon-block icon27">&nbsp;</div>
                    <div className="icon-block icon60">
                      <img src={path_image + "white-polling.svg"} alt="" />
                    </div>
                    <div className="icon-block icon27">&nbsp;</div>
                    <div className="icon-block icon60">
                      <img src={path_image + "white-library.svg"} alt="" />
                    </div>
                  </div>
                  <div className="center-logo">
                    <div className="icon">
                      <img src={path_image + "readers-bigger.svg"} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </div>
      <div className="how-work">
        <Container>
          <Row>
            <Col md={5}>
              <div className="how-work-img">
                <img src={path_image + "how-work-publisher.png"} alt="" />
              </div>
            </Col>
            <Col
              md={{ span: 6, offset: 1 }}
              className="d-flex justify-content-center align-items-center"
            >
              <div className="how-work-text">
                <h3>How does it work? </h3>
                <h5>
                  Upload and create an eprint in 2 minutes from your own
                  account. Your clients distribute and you see the usage in
                  real-time and as they approach predefined limits you will be
                  alerted.
                </h5>
              </div>
            </Col>
          </Row>
          <Row>
            <div className="future-expand">
              <div className="future-expand-content">
                <h4>
                  The future doesn't have to mean leaving your comfort zone,
                  we're here to expand it!{" "}
                </h4>
              </div>
              <div className="future-expand-content-shape">
                <span className="shade-left">&nbsp;</span>
                <span className="shade-right">&nbsp;</span>
              </div>
            </div>
          </Row>
           <Row>
                <Col md={6} className='d-flex justify-content-center align-items-center'>
                    <div className='how-work-text'>
                        <h3>Say yes to more of your clients requests</h3>
                        <h5>With a decade of eprints in our system we’ve seen it all and solved more. With a universe of included tools you can help your clients achieve success. Allow us to demonstrate why our service continues to garnered enthusiastic praise from clients.</h5>
                    </div>
                </Col>
                <Col md={5} className="build_with d-flex justify-content-end">
                    <div className='how-work-img'>
                        <img src={path_image + "publisher-more.png"} alt=""/>
                    </div>
                </Col>
            </Row>
        </Container>
      </div>
      <LandingSliderSection/>
      <div className="consent-content">
        <Container>
          <Row>
            <div className="consent-content-inner">
              <div className="consent-text">
                <h5>
                  Docintel & inforMed.pro is 2 parts of a unified system. Create
                  and set limits in inforMed.pro and let your clients use the
                  free tools for distribution. Doctors engage with content using
                  Docintel on any device of their choice. Usage and limits are
                  monitored making life and reporting easier for you.
                </h5>
              </div>
              <div className="consent-details pharma-view">
                <ul>
                  <li>For Clinicians</li>
                  <li>Gathers consent</li>
                  <li>Read in any browser</li>
                  <li>Read offline in the app</li>
                </ul>
                <div className="consent-img">
                  <img src={path_image + "doc-pharma-info.png"} alt="" />
                </div>
                <ul>
                  <li>For Life science</li>
                  <li>Host content</li>
                  <li>Handles consent</li>
                  <li>Predicts the future</li>
                </ul>
              </div>
            </div>
            <div className="works-started">
              <div className="works-started-links pharm-page">
                <h3>Modules </h3>
                <h5>
                  Click on a module to explore its capabilities and discover how
                  it can benefit you. Learn about its connections with other
                  modules and how they collectively help your clients succeed.
                  These modules have been collaboratively developed with the
                  publishers and are now integral parts of our comprehensive
                  offerings aimed at enhancing your workflow.
                </h5>
              </div>
              <div className="modules-diagram publish">
                <div
                  className={`circle ${readStatus ? "bigger" : ""}`}
                  style={{ "--total": "9" }}
                >
                  <div
                    className={
                      activeModule === "read"
                        ? "stat read visible"
                        : activeModule === "docintel" || activeModule === "ai" || activeModule === "webinar" 
                        ? "stat read active"
                        : "stat read"
                    }
                    onClick={() => handleClick("read", 0)}
                    style={{ "--i": "1" }}
                  >
                    <img src={path_image + "RTR-icon.svg"} alt="" />
                    <span>Read-Through -Rate</span>
                    <div className="article-close">
                      <img src={path_image + "close-button.svg"} alt="" />
                    </div>
                  </div>

                  <div
                    className={
                      activeModule === "rating"
                        ? "stat rating visible"
                        : activeModule === "web" || activeModule === "docintel"
                        ? "stat rating active"
                        : "stat rating"
                    }
                    onClick={() => handleClick("rating", 1)}
                    style={{ "--i": "2" }}
                  >
                    <img src={path_image + "rating-icon.svg"} alt="" />
                    <span>Rating Tool</span>
                    <div className="article-close">
                      <img src={path_image + "close-button.svg"} alt="" />
                    </div>
                  </div>

                  <div
                    className={
                      activeModule === "automail"
                        ? "stat automail visible"
                        : activeModule === "engine" || activeModule === "webinar" ||  activeModule === "informed" ||
                          activeModule === "ai" ||
                          activeModule === "spc"
                        ? "stat automail active"
                        : "stat automail"
                    }
                    onClick={() => handleClick("automail", 2)}
                    style={{ "--i": "3" }}
                  >
                    <img src={path_image + "auto-email-icon.svg"} alt="" />
                    <span>Automail</span>
                    <div className="article-close">
                      <img src={path_image + "close-button.svg"} alt="" />
                    </div>
                  </div>

                  <div
                    className={
                      activeModule === "consent"
                        ? "stat consent visible"
                        : activeModule === "webinar" ||
                          activeModule === "web" ||
                          activeModule === "informed" ||
                          activeModule === "docintel" || activeModule === "read" || activeModule === "automail" ||
                          activeModule === "ai"
                        ? "stat consent active"
                        : " stat consent"
                    }
                    onClick={() => handleClick("consent", 3)}
                    style={{ "--i": "4" }}
                  >
                    <img src={path_image + "legal-document-icon.svg"} alt="" />
                    <span>Consent</span>
                    <div className="article-close">
                      <img src={path_image + "close-button.svg"} alt="" />
                    </div>
                  </div>

                  <div
                    className={
                      activeModule === "engine"
                        ? "stat engine visible"
                        : activeModule === "survey" ||
                          activeModule === "spc" ||
                          activeModule === "automail"
                        ? "stat engine active"
                        : "stat engine"
                    }
                    onClick={() => handleClick("engine", 4)}
                    style={{ "--i": "5" }}
                  >
                    <img src={path_image + "email-small-icon.svg"} alt="" />
                    <span>Email Engine</span>
                    <div className="article-close">
                      <img src={path_image + "close-button.svg"} alt="" />
                    </div>
                  </div>

                  <div
                    className={
                      activeModule === "docintel"
                        ? "stat docintel visible"
                        : activeModule === "read" ||
                          activeModule === "spc" ||
                          activeModule === "web" ||
                          activeModule === "consent" ||
                          activeModule === "survey" ||
                          activeModule === "informed" ||
                          activeModule === "engine" ||
                          activeModule === "rating"
                        ? "stat docintel active"
                        : "stat docintel"
                    }
                    onClick={() => handleClick("docintel", 5)}
                    style={{ "--i": "6" }}
                  >
                    <img src={path_image + "docintel-small-icon.svg"} alt="" />
                    <span>Docintel.app</span>
                    <div className="article-close">
                      <img src={path_image + "close-button.svg"} alt="" />
                    </div>
                  </div>

                  <div
                    className={
                      activeModule === "informed"
                        ? "stat informed visible"
                        : activeModule === "consent" ||
                          activeModule === "ai" || activeModule === "webinar" || activeModule === "automail" ||
                          activeModule === "spc"
                        ? "stat informed active"
                        : "stat informed"
                    }
                    onClick={() => handleClick("informed", 6)}
                    style={{ "--i": "7" }}
                  >
                    <img src={path_image + "informedgo-icon.svg"} alt="" />
                    <span>inforMedGo</span>
                    <div className="article-close">
                      <img src={path_image + "close-button.svg"} alt="" />
                    </div>
                  </div>

                  <div
                    className={
                      activeModule === "web"
                        ? "stat web visible"
                        : activeModule === "webinar" ||
                          activeModule === "docintel" ||
                          activeModule === "consent" ||
                          activeModule === "ai" ||
                          activeModule === "rating"
                        ? "stat web active"
                        : "stat web"
                    }
                    onClick={() => handleClick("web", 7)}
                    style={{ "--i": "8" }}
                  >
                    <img src={path_image + "web-portal-icon.svg"} alt="" />
                    <span>Web Portal</span>
                    <div className="article-close">
                      <img src={path_image + "close-button.svg"} alt="" />
                    </div>
                  </div>

                  <div
                    className={
                      activeModule === "webinar"
                        ? "stat webinar visible"
                        : activeModule === "qa" || activeModule === "web"
                        ? "stat webinar active"
                        : "stat webinar"
                    }
                    onClick={() => handleClick("webinar", 8)}
                    style={{ "--i": "9" }}
                  >
                    <img src={path_image + "webinar-small-icon.svg"} alt="" />
                    <span>Webinar Portal</span>
                    <div className="article-close">
                      <img src={path_image + "close-button.svg"} alt="" />
                    </div>
                  </div>

                  <div className="module-logo">
                    <img src={path_image + "module-logo.svg"} alt="" />
                  </div>
                  <div
                    className={`mudule-article-overview ${
                      moduleData?.active === true ? "active" : ""
                    }`} style={{ "--i": moduleData?.style }}
                  >
                    
                    <div className="module-space">
                      <img src={path_image + "" + moduleData?.imagePath} alt="" />
                      <h4>{moduleData?.heading}</h4>
                    </div>
                    <p>{moduleData?.paragraph}</p>
                    <Button onClick={handleRead}>
                      Read more
                    </Button>
                  </div>
                </div>
                <div
                  className={`module-bigger-size ${readStatus ? "show" : ""}`}
                >
                  {!showBigCircleData && !submitData &&(
                  <img className="close" src={path_image+'module-close-button.svg'} alt="" onClick={handleBigCircleClose}/>
                  )}
                  <div class="shape shape-left"></div>

                  {registerPage && ( 
                    <div>
                    <img className="close" src={path_image+'module-close-button.svg'} alt="" onClick={handleBigCircleClose}/>
                   <div className="module-register">
                                <h4>Registration</h4>
                                <p>Register to access additional module details. Your information and activity remain confidential per GDPR, but we may occasionally notify you about new features or functions. Please confirm by ticking below if that's acceptable.</p>
                                <Form>
                          <Row>
                            <Col md="6">
                              <div className="form-group">
                                <input
                                  type="text"
                                  placeholder="Name"
                                  name="name"
                                  ref={nameRef}
                                  // className="form-control"
                                  className={
                                    !registerError?.name
                                      ? "form-control"
                                      : "form-control error"
                                  }
                                  value={
                                    registerFormInputs?.name
                                      ? registerFormInputs?.name
                                      : ""
                                  }
                                  onChange={handleRegisterFormChange}
                                />
                                <span>
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M10.1034 8.41164C12.4325 8.41164 14.3202 6.52838 14.3202 4.20564C14.3202 1.88289 12.4321 0 10.1034 0C7.77476 0 5.88599 1.88325 5.88599 4.206C5.88599 6.52874 7.77476 8.41164 10.1034 8.41164ZM11.8921 8.69831H8.31405C5.33701 8.69831 2.91504 11.1145 2.91504 14.0839V18.4485L2.92616 18.5168L3.22756 18.611C6.06862 19.4964 8.53687 19.7917 10.5685 19.7917C14.5365 19.7917 16.8365 18.6632 16.9782 18.5913L17.2599 18.4492H17.29V14.0839C17.2911 11.1145 14.8691 8.69831 11.8921 8.69831Z"
                                      fill="#97B6CF"
                                      fill-opacity="0.56"
                                    />
                                  </svg>
                                </span>
                                {registerError?.name ? (
                                  <div className="contact-validation">
                                    {registerError?.name}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </Col>

                            <Col md="6">
                              <div className="form-group">
                                <Select
                                  options={country}
                                  placeholder="Select country"
                                  // className="dropdown-basic-button split-button-dropup"
                                  className={
                                    !registerError?.country
                                      ? "dropdown-basic-button split-button-dropup"
                                      : "dropdown-basic-button split-button-dropup error"
                                  }
                                  isClearable
                                  onChange={(e) => {
                                    handleRegisterFormChange(
                                      e?.value,
                                      "country"
                                    );
                                    setSelectedCountry(e);
                                  }}
                                  value={selectedCountry}
                                  ref={countryRef}
                                />
                                <span>
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clip-path="url(#clip0_561_11075)">
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M19.9999 9.99993C19.9999 12.1465 19.3199 14.1372 18.1645 15.7682C17.7528 16.1293 17.1149 16.1879 16.8712 16.0462C16.8091 16.0102 16.7874 15.9797 16.8112 15.8842C17.0536 14.9078 17.0149 14.4061 16.9774 13.9212C16.9616 13.7167 16.9465 13.5235 16.9516 13.2898C16.9754 12.165 16.8217 11.4929 16.4533 11.1102C16.0757 10.7182 15.5549 10.7091 15.0517 10.7007C14.6845 10.6944 14.3053 10.6879 13.9212 10.5547C12.7616 9.78114 13.085 9.272 13.5308 8.56965C13.7862 8.16766 14.0734 7.71536 13.9138 7.23922C13.979 7.11028 14.175 6.89895 14.2762 6.87063C15.1036 7.12934 17.1108 7.17848 17.4945 7.07348C17.9003 6.96223 18.2496 6.29289 18.1871 5.74739C18.1279 5.23059 17.7253 4.90762 17.1099 4.88344C17.0186 4.87973 16.8482 4.89582 16.5024 4.92883C16.0783 4.96953 15.1396 5.05938 14.805 5.01926C14.6938 4.6318 14.6083 3.85496 14.9475 3.54516C15.297 3.22535 15.9216 3.01676 16.3778 2.86445C16.5675 2.80113 16.7142 2.75121 16.8299 2.70305C18.7795 4.52907 19.9999 7.12446 19.9999 9.99993ZM4.30078 1.78785C4.66269 1.9009 4.92453 1.99445 5.13937 2.07152C6.00234 2.38031 6.09351 2.38016 7.57414 2.06856C8.54582 1.86391 8.75242 2.03356 9.06574 2.29047C9.32285 2.50141 9.64328 2.76383 10.3211 2.86035C10.5257 2.88965 10.8056 2.89809 10.9532 3.0634C11.0244 3.1436 11.0549 3.25367 11.0578 3.36082C11.0635 3.57805 10.9902 3.78328 10.9548 3.99477C10.9253 4.16992 10.9216 4.37082 10.7881 4.50528C10.6269 4.66766 10.2875 4.67926 10.074 4.72348C9.4636 4.84985 8.93996 5.05215 8.38738 5.33481C7.87274 5.59805 7.23231 5.92551 7.04359 6.89149C6.98953 7.17024 6.6025 7.24707 6.01789 7.33239C5.49363 7.40883 4.95168 7.48786 4.74937 7.92446C4.52785 8.40172 4.87144 8.89711 5.09691 9.30149C5.31414 9.69051 5.54566 10.1257 5.9357 10.3685C6.23371 10.5543 6.53445 10.5191 7.03277 10.4609C7.21402 10.4398 7.43949 10.4135 7.71152 10.3919C8.03649 10.3919 10.3728 11.0457 11.1736 11.9012C11.3318 12.0699 11.4065 12.224 11.3965 12.3588C11.3161 13.4152 10.8235 13.9965 10.302 14.612C9.81192 15.1899 9.30575 15.7875 9.18567 16.7548C9.04727 17.8733 8.64684 18.4436 8.46149 18.4485C8.4611 18.4485 8.46031 18.4485 8.45992 18.4485C8.33313 18.4485 7.90992 18.0642 7.60246 16.341C7.23289 14.2674 6.59543 13.8351 6.08336 13.4877C5.66621 13.2047 5.36488 13.0002 5.34777 11.4919C5.33656 10.492 4.80992 9.77954 3.95816 9.28614C3.19191 8.84247 1.77894 8.02254 0.966085 5.71457C1.71898 4.13356 2.87523 2.78035 4.30078 1.78785ZM9.99989 20.0001C12.9007 20.0001 15.5166 18.7579 17.3449 16.7784C17.3007 16.7814 17.2565 16.7834 17.2128 16.7834C16.9608 16.7834 16.7245 16.7318 16.5362 16.6225C16.2103 16.4334 16.0711 16.0971 16.1641 15.7234C16.3807 14.8518 16.3473 14.4247 16.3125 13.9727C16.2962 13.761 16.2791 13.5424 16.2848 13.2757C16.3036 12.3803 16.1987 11.8072 15.9728 11.5725C15.7961 11.389 15.5174 11.3754 15.0403 11.3671C14.6269 11.3602 14.1583 11.3522 13.6566 11.168C13.6324 11.1591 13.6094 11.1477 13.5882 11.1338C12.8304 10.6368 12.4608 10.1104 12.4579 9.52477C12.4557 9.01938 12.7278 8.59067 12.9678 8.21223C13.2082 7.83364 13.3488 7.59145 13.2703 7.42258C13.1386 7.1393 13.3883 6.79313 13.5487 6.61192C13.8449 6.27715 14.1779 6.13797 14.4612 6.22996C15.159 6.45641 16.9944 6.48926 17.3033 6.43344C17.3996 6.35856 17.579 6.01118 17.515 5.7702C17.5016 5.7193 17.4603 5.56438 17.0841 5.54965C17.029 5.54809 16.7829 5.57164 16.5657 5.5925C14.8121 5.76036 14.3991 5.7293 14.2394 5.41715C13.9312 4.81348 13.9261 3.82707 14.3153 3.2625C14.3678 3.18625 14.4291 3.11567 14.4973 3.05317C14.9516 2.63781 15.654 2.40328 16.1664 2.23207C16.1949 2.22262 16.224 2.21281 16.2535 2.20297C14.5398 0.825626 12.3649 0 9.99989 0C8.1916 0 6.49398 0.482383 5.02871 1.32551C5.15648 1.36973 5.26773 1.40926 5.36406 1.44383C6.08332 1.70094 6.08332 1.70094 7.43652 1.41613C8.62895 1.16508 9.03899 1.40649 9.48817 1.77488C9.71106 1.9575 9.92141 2.13008 10.4152 2.20047C10.8506 2.26238 11.2298 2.33688 11.4623 2.62094C11.8341 3.07481 11.6566 3.87352 11.5416 4.39129C11.4539 4.78504 11.2406 5.12512 10.8315 5.23539C10.4575 5.33606 10.072 5.3836 9.70199 5.50016C9.35309 5.61024 9.01063 5.76477 8.69102 5.92829C8.22613 6.16614 7.82434 6.37157 7.69813 7.01926C7.54891 7.78235 6.71937 7.90344 6.1139 7.99192C5.84851 8.03082 5.40488 8.09551 5.35394 8.20481C5.3514 8.21012 5.29656 8.34083 5.5739 8.78547L5.68301 8.96141C5.97726 9.43419 6.15476 9.71961 6.28805 9.80254C6.38437 9.86251 6.55184 9.84579 6.95523 9.7988C7.14273 9.77676 7.37648 9.74965 7.66231 9.72684C8.0761 9.69383 10.5934 10.3808 11.6044 11.3881C11.9339 11.7162 12.0878 12.06 12.0611 12.4093C11.9643 13.6813 11.3514 14.4047 10.8102 15.043C10.3447 15.5922 9.94278 16.0668 9.84723 16.8367C9.67856 18.2029 9.14133 19.0974 8.47926 19.1148C8.4718 19.115 8.46473 19.1152 8.45762 19.1152C7.76883 19.1152 7.26051 18.2214 6.94594 16.4579C6.62555 14.6612 6.1384 14.3308 5.7089 14.0393C5.10051 13.6266 4.70047 13.227 4.68101 11.4993C4.67316 10.7752 4.23597 10.2175 3.62382 9.86286C2.91378 9.45161 1.5189 8.64348 0.59796 6.59204C0.210889 7.65629 -0.000244141 8.80372 -0.000244141 9.99985C-8.78904e-05 15.5141 4.48578 20.0001 9.99989 20.0001Z"
                                        fill="#97B6CF"
                                        fill-opacity="0.56"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_561_11075">
                                        <rect
                                          width="20"
                                          height="20"
                                          fill="#97B6CF"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </span>
                                {registerError?.country ? (
                                  <div className="contact-validation">
                                    {registerError?.country}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </Col>

                            <Col md="6">
                              <div className="form-group">
                                <input
                                  type="number"
                                  placeholder="Phone"
                                  name="phone"
                                  // className="form-control"
                                  ref={phoneRef}
                                  className={
                                    !registerError?.phone
                                      ? "form-control"
                                      : "form-control error"
                                  }
                                  value={
                                    registerFormInputs?.phone
                                      ? registerFormInputs?.phone
                                      : ""
                                  }
                                  onChange={handleRegisterFormChange}
                                />
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                  >
                                    <path
                                      d="M19.5763 15.4867C19.3052 15.1839 18.4716 14.4293 17.8747 13.9796C17.2888 13.5191 16.329 12.8961 15.9552 12.7031C15.3446 12.3855 14.4247 12.4211 13.8532 12.805C13.3836 13.1319 12.9486 13.506 12.5552 13.9214L12.5466 13.9304C12.3317 14.1575 12.0432 14.3008 11.7324 14.3347C11.4217 14.3687 11.109 14.2912 10.8501 14.116C9.87673 13.4522 8.96826 12.698 8.13683 11.8632C7.30211 11.0318 6.54785 10.1233 5.88409 9.14996C5.70887 8.89109 5.63134 8.57839 5.66533 8.26764C5.69931 7.95691 5.84261 7.66835 6.06964 7.45348L6.07862 7.44488C6.49412 7.05147 6.86821 6.61651 7.19503 6.14684C7.57901 5.57535 7.61456 4.65543 7.29698 4.04488C7.10401 3.67145 6.48097 2.71285 6.02042 2.12535C5.57042 1.52848 4.81612 0.694883 4.51339 0.423789C4.01925 -0.0215235 3.18448 -0.137539 2.60206 0.179648C2.11284 0.457493 1.65453 0.786556 1.23487 1.16129L1.19073 1.20035C-1.38427 3.41559 0.311045 9.59879 5.35987 14.6379C10.4017 19.6875 16.5833 21.3839 18.7985 18.8089L18.8376 18.7648C19.2125 18.3452 19.5415 17.8869 19.8192 17.3976C20.1376 16.8156 20.0216 15.9808 19.5763 15.4867Z"
                                      fill="#97B6CF"
                                      fill-opacity="0.56"
                                    />
                                  </svg>
                                </span>
                                {registerError?.phone ? (
                                  <div className="contact-validation">
                                    {registerError?.phone}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </Col>

                            <Col md="6">
                              <div className="form-group">
                                <input
                                  type="text"
                                  placeholder="Company"
                                  name="company"
                                  // className="form-control"
                                  ref={companyRef}
                                  className={
                                    !registerError?.company
                                      ? "form-control"
                                      : "form-control error"
                                  }
                                  value={
                                    registerFormInputs?.company
                                      ? registerFormInputs?.company
                                      : ""
                                  }
                                  onChange={handleRegisterFormChange}
                                />
                                <span>
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M14.1667 2.60713C14.1667 2.07122 13.6682 1.67463 13.146 1.79514L3.14603 4.10283C2.76792 4.19009 2.50008 4.52677 2.50008 4.91482V17.5H2.08341C1.8533 17.5 1.66675 17.6866 1.66675 17.9167C1.66675 18.1468 1.8533 18.3334 2.08341 18.3334H2.91511H2.91675H2.91839H6.66675V15.8334C6.66675 15.3731 7.03985 15 7.50008 15H9.16675C9.627 15 10.0001 15.3731 10.0001 15.8334V18.3334H13.7484H13.7501H13.7517H14.1667V2.60713ZM5.41675 6.66669C5.18663 6.66669 5.00008 6.85324 5.00008 7.08336V7.91669C5.00008 8.14681 5.18663 8.33336 5.41675 8.33336H6.25008C6.4802 8.33336 6.66675 8.14681 6.66675 7.91669V7.08336C6.66675 6.85324 6.4802 6.66669 6.25008 6.66669H5.41675ZM5.00008 9.58336C5.00008 9.35327 5.18663 9.16669 5.41675 9.16669H6.25008C6.4802 9.16669 6.66675 9.35327 6.66675 9.58336V10.4167C6.66675 10.6468 6.4802 10.8334 6.25008 10.8334H5.41675C5.18663 10.8334 5.00008 10.6468 5.00008 10.4167V9.58336ZM5.41675 11.6667C5.18663 11.6667 5.00008 11.8533 5.00008 12.0834V12.9167C5.00008 13.1468 5.18663 13.3334 5.41675 13.3334H6.25008C6.4802 13.3334 6.66675 13.1468 6.66675 12.9167V12.0834C6.66675 11.8533 6.4802 11.6667 6.25008 11.6667H5.41675ZM7.50008 7.08336C7.50008 6.85324 7.68663 6.66669 7.91675 6.66669H8.75008C8.98016 6.66669 9.16675 6.85324 9.16675 7.08336V7.91669C9.16675 8.14681 8.98016 8.33336 8.75008 8.33336H7.91675C7.68663 8.33336 7.50008 8.14681 7.50008 7.91669V7.08336ZM7.91675 9.16669C7.68663 9.16669 7.50008 9.35327 7.50008 9.58336V10.4167C7.50008 10.6468 7.68663 10.8334 7.91675 10.8334H8.75008C8.98016 10.8334 9.16675 10.6468 9.16675 10.4167V9.58336C9.16675 9.35327 8.98016 9.16669 8.75008 9.16669H7.91675ZM7.50008 12.0834C7.50008 11.8533 7.68663 11.6667 7.91675 11.6667H8.75008C8.98016 11.6667 9.16675 11.8533 9.16675 12.0834V12.9167C9.16675 13.1468 8.98016 13.3334 8.75008 13.3334H7.91675C7.68663 13.3334 7.50008 13.1468 7.50008 12.9167V12.0834ZM10.4167 6.66669C10.1867 6.66669 10.0001 6.85324 10.0001 7.08336V7.91669C10.0001 8.14681 10.1867 8.33336 10.4167 8.33336H11.2501C11.4802 8.33336 11.6667 8.14681 11.6667 7.91669V7.08336C11.6667 6.85324 11.4802 6.66669 11.2501 6.66669H10.4167ZM10.0001 9.58336C10.0001 9.35327 10.1867 9.16669 10.4167 9.16669H11.2501C11.4802 9.16669 11.6667 9.35327 11.6667 9.58336V10.4167C11.6667 10.6468 11.4802 10.8334 11.2501 10.8334H10.4167C10.1867 10.8334 10.0001 10.6468 10.0001 10.4167V9.58336ZM10.4167 11.6667C10.1867 11.6667 10.0001 11.8533 10.0001 12.0834V12.9167C10.0001 13.1468 10.1867 13.3334 10.4167 13.3334H11.2501C11.4802 13.3334 11.6667 13.1468 11.6667 12.9167V12.0834C11.6667 11.8533 11.4802 11.6667 11.2501 11.6667H10.4167Z"
                                      fill="#97B6CF"
                                      fill-opacity="0.56"
                                    />
                                    <path
                                      d="M15 4.74219V18.333H17.0822H17.0833H17.0845H17.9167C18.1468 18.333 18.3333 18.1464 18.3333 17.9164C18.3333 17.6863 18.1468 17.4997 17.9167 17.4997H17.5V6.50721C17.5 6.19157 17.3217 5.90301 17.0393 5.76185L15 4.74219Z"
                                      fill="#97B6CF"
                                      fill-opacity="0.56"
                                    />
                                    <path
                                      d="M9.16667 18.333H7.5V15.833H9.16667V18.333Z"
                                      fill="#97B6CF"
                                      fill-opacity="0.56"
                                    />
                                  </svg>
                                </span>
                                {registerError?.company ? (
                                  <div className="contact-validation">
                                    {registerError?.company}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </Col>

                            <Col md="6">
                              <div className="form-group">
                                <input
                                  type="email"
                                  placeholder="Email"
                                  name="email"
                                  //  className="form-control"
                                  ref={emailRef}
                                  className={
                                    !registerError?.email
                                      ? "form-control"
                                      : "form-control error"
                                  }
                                  value={
                                    registerFormInputs?.email
                                      ? registerFormInputs?.email
                                      : ""
                                  }
                                  onChange={handleRegisterFormChange}
                                />
                                <span>
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M19.5428 4.05714L10.2285 9.6C10.1598 9.63751 10.0829 9.65717 10.0047 9.65717C9.92644 9.65717 9.84948 9.63751 9.78084 9.6L0.457031 4.05714C0.685807 3.73138 0.989475 3.46532 1.34249 3.28136C1.6955 3.09739 2.08753 3.0009 2.4856 3H17.5142C17.9122 3.0009 18.3043 3.09739 18.6573 3.28136C19.0103 3.46532 19.314 3.73138 19.5428 4.05714ZM10.7048 10.392L19.9333 4.90625C19.9775 5.09675 19.9999 5.29165 20 5.4872V14.8015C20 15.4607 19.7381 16.093 19.2719 16.5592C18.8058 17.0253 18.1735 17.2872 17.5143 17.2872H2.48571C1.82646 17.2872 1.19421 17.0253 0.728049 16.5592C0.261887 16.093 0 15.4607 0 14.8015V5.4872C0.000141946 5.29165 0.0225076 5.09675 0.0666666 4.90625L9.30476 10.392C9.5179 10.5139 9.7592 10.5781 10.0048 10.5781C10.2503 10.5781 10.4916 10.5139 10.7048 10.392Z"
                                      fill="#97B6CF"
                                      fill-opacity="0.56"
                                    />
                                  </svg>
                                </span>
                                {registerError?.email ? (
                                <div className="contact-validation">
                                  {registerError?.email}
                                </div>
                              ) : (
                                ""
                              )}
                              </div>
                              
                            </Col>

                            <Col md="12">
                              <div className="form-group">
                                <FormLabel className="form-consent">
                                  I also consent to:
                                </FormLabel>
                                <Form.Check
                                  // type="checkbox"
                                  // label="Email me only about modules I’ve looked at"
                                  // name="consent1"
                                  // checked={registerFormInputs.consent1}
                                  // onChange={handleRegisterFormChange}

                                  type="checkbox" id="consent1"
                                  // label={registerFormInputs.consent1.label}
                                  label="Email me only about modules I’ve looked at"
                                  name="consent1"  for="#consent2"                              
                                  checked={registerFormInputs?.consent1?.checked}                               
                                  onChange={handleRegisterFormChange}
                                />
                                <Form.Check
                                  // type="checkbox"
                                  // label="Keep me informed about other news from inforMed.pro"
                                  // name="consent2"
                                  // checked={registerFormInputs.consent2}
                                  // onChange={handleRegisterFormChange}

                                  type="checkbox" id="consent2"
                                  // label={registerFormInputs.consent2.label}  
                                  label="Keep me informed about other news from inforMed.pro"                            
                                  name="consent2"  for="#consent2"                             
                                  checked={registerFormInputs?.consent2?.checked}                               
                                  onChange={handleRegisterFormChange}
                                />
                              </div>
                            </Col>
                            <Button
                              className="btn-filled"
                              onClick={handleReadClick}
                            >
                              Register
                            </Button>
                          </Row>
                        </Form>
                            </div> 
                            </div>
                            )} 
                  <div className={`module-discribe ${addClass ? 'request' : ''}`}>
                    <div
                      className={`${
                        bigCircleModuleData?.active === true
                          ? "active d-flex justify-content-between flex-column"
                          : "d-flex justify-content-between flex-column"
                      }`}
                    >
                      {showBigCircleData && !registerPage &&(
                      <div className="big-circle-data">
                      <div className="big-circle-top">
                        <img
                          className="module-img"
                          src={
                            path_image + "" + bigCircleModuleData?.logoIconPath
                          }
                        />
                      </div>
                      <div lassName="big-circle-middle">
                         <h4>{bigCircleModuleData?.heading}</h4>
                        <img
                          className="module-content-view"
                          src={path_image + "" + bigCircleModuleData?.imagePath}
                        />
                        <p>{bigCircleModuleData?.detail}</p>
                        <p className="semibold">
                          {bigCircleModuleData?.paragraph}
                        </p>
                        
                        <div className="key-features">
                          <h5> Key Features</h5>
                          <ul>
                            {/* {bigCircleModuleData?.highlights?.map(
                              (feature, index) => (
                                <li key={index}>{feature}</li>
                              )
                            )} */}

                            {bigCircleModuleData?.highlights?.map((feature, index) => (
                                <li key={index}>
                                  {feature?.keyFeature}
                                  {feature?.subKeyFeatures && feature?.subKeyFeatures.length > 0 && (
                                    <ul>
                                      {feature?.subKeyFeatures?.map((subFeature, subIndex) => (
                                        <li key={subIndex}>{subFeature}</li>
                                      ))}
                                    </ul>
                                  )}
                                </li>
                                ))}
                          </ul>
                        </div>
                      </div>
                      </div>
                       )}

                     {!showBigCircleData && !submitData &&(
                      <div className="request-content">
                       <Form>
                            <h4>Module Request</h4>
                            <p>
                              Please tell us what you would like to know more
                              about.
                            </p>
                            <Row>
                              <Col md="12">
                                <div className="form-group">
                                  <textarea
                                  placeholder="Type Your Message.."
                                  name="message"
                                  value={
                                    moduleFormInputs?.message
                                      ? moduleFormInputs?.message
                                      : ""
                                  }
                                  onChange={handleModuleFormChange}
                                ></textarea>
                                </div>
                                {!formFeilds && (
                                  <div className="form-group click-link">
                                    <FormLabel>
                                      If you want to enter new contact details{" "}
                                      <span onClick={handleFormClick}>
                                        Click here
                                      </span>
                                    </FormLabel>
                                  </div>
                                )}
                              </Col>

                              {formFeilds && (
                                <div className="form-feilds d-flex">
                                  <Col md="6">
                                    <div className="form-group">
                                      <input
                                        type="email"
                                        placeholder="Email"
                                        name="secondaryEmail"
                                        className="form-control"
                                        value={
                                          moduleFormInputs?.secondaryEmail
                                            ? moduleFormInputs?.secondaryEmail
                                            : ""
                                        }
                                        onChange={handleModuleFormChange}
                                      />
                                      <span>
                                        <svg
                                          width="20"
                                          height="20"
                                          viewBox="0 0 20 20"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M19.5428 4.05714L10.2285 9.6C10.1598 9.63751 10.0829 9.65717 10.0047 9.65717C9.92644 9.65717 9.84948 9.63751 9.78084 9.6L0.457031 4.05714C0.685807 3.73138 0.989475 3.46532 1.34249 3.28136C1.6955 3.09739 2.08753 3.0009 2.4856 3H17.5142C17.9122 3.0009 18.3043 3.09739 18.6573 3.28136C19.0103 3.46532 19.314 3.73138 19.5428 4.05714ZM10.7048 10.392L19.9333 4.90625C19.9775 5.09675 19.9999 5.29165 20 5.4872V14.8015C20 15.4607 19.7381 16.093 19.2719 16.5592C18.8058 17.0253 18.1735 17.2872 17.5143 17.2872H2.48571C1.82646 17.2872 1.19421 17.0253 0.728049 16.5592C0.261887 16.093 0 15.4607 0 14.8015V5.4872C0.000141946 5.29165 0.0225076 5.09675 0.0666666 4.90625L9.30476 10.392C9.5179 10.5139 9.7592 10.5781 10.0048 10.5781C10.2503 10.5781 10.4916 10.5139 10.7048 10.392Z"
                                            fill="#97B6CF"
                                            fill-opacity="0.56"
                                          />
                                        </svg>
                                      </span>
                                    </div>
                                  </Col>
                                  <Col md="6">
                                    <div className="form-group">
                                      <input
                                        type="number"
                                        placeholder="Phone"
                                        name="secondaryPhone"
                                        className="form-control"
                                        value={
                                          moduleFormInputs?.secondaryPhone
                                            ? moduleFormInputs?.secondaryPhone
                                            : ""
                                        }
                                        onChange={handleModuleFormChange}
                                      />
                                      <span>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="20"
                                          height="20"
                                          viewBox="0 0 20 20"
                                          fill="none"
                                        >
                                          <path
                                            d="M19.5763 15.4867C19.3052 15.1839 18.4716 14.4293 17.8747 13.9796C17.2888 13.5191 16.329 12.8961 15.9552 12.7031C15.3446 12.3855 14.4247 12.4211 13.8532 12.805C13.3836 13.1319 12.9486 13.506 12.5552 13.9214L12.5466 13.9304C12.3317 14.1575 12.0432 14.3008 11.7324 14.3347C11.4217 14.3687 11.109 14.2912 10.8501 14.116C9.87673 13.4522 8.96826 12.698 8.13683 11.8632C7.30211 11.0318 6.54785 10.1233 5.88409 9.14996C5.70887 8.89109 5.63134 8.57839 5.66533 8.26764C5.69931 7.95691 5.84261 7.66835 6.06964 7.45348L6.07862 7.44488C6.49412 7.05147 6.86821 6.61651 7.19503 6.14684C7.57901 5.57535 7.61456 4.65543 7.29698 4.04488C7.10401 3.67145 6.48097 2.71285 6.02042 2.12535C5.57042 1.52848 4.81612 0.694883 4.51339 0.423789C4.01925 -0.0215235 3.18448 -0.137539 2.60206 0.179648C2.11284 0.457493 1.65453 0.786556 1.23487 1.16129L1.19073 1.20035C-1.38427 3.41559 0.311045 9.59879 5.35987 14.6379C10.4017 19.6875 16.5833 21.3839 18.7985 18.8089L18.8376 18.7648C19.2125 18.3452 19.5415 17.8869 19.8192 17.3976C20.1376 16.8156 20.0216 15.9808 19.5763 15.4867Z"
                                            fill="#97B6CF"
                                            fill-opacity="0.56"
                                          />
                                        </svg>
                                      </span>
                                    </div>
                                  </Col>
                                </div>
                              )}
                            </Row>
                          </Form>
                      <p>Please select the modules you're interested in:</p>
                    </div>
                       )}
                    {modulesSelect && !registerPage &&(
                    <div
                      className="module-diagram circle pharma_market publisher"
                      style={{ "--total": "19" }}
                    >
                      <div
                        className={
                          selectedModules.includes('rating') || activeModule === "rating" 
                            ? "stat rating visible"
                            : activeModule === "web" ||  activeModule === "docintel"
                              ? "stat rating active"
                              : "stat rating"
                        }
                        onClick={() => handleBigCircleClick("rating", 1)}
                        style={{ "--i": "1" }}
                      >
                        <img src={path_image + "rating-icon.svg"} alt="" />
                        <span>Rating Tool</span>
                        {activeModule === "rating"  && (
                          <div className="article-close">
                          <img
                            src={path_image + "close-button.svg"}
                            alt=""
                            onClick={handleBigCircleClose}
                          />
                        </div>
                        )}
                      
                      </div>

                      <div
                        className={
                          selectedModules?.includes('automail') || activeModule === "automail"
                            ? "stat automail visible"
                            :  activeModule === "engine" || activeModule === "ai" || activeModule === "spc" || activeModule === "webinar" || activeModule === "informed"
                            ? "stat automail active"
                            : "stat automail"
                        }
                        onClick={() => handleBigCircleClick("automail", 2)}
                        style={{ "--i": "2" }}
                      >
                        <img src={path_image + "auto-email-icon.svg"} alt="" />
                        <span>Automail</span>
                        {activeModule === "automail" && (
                            <div className="article-close">
                            <img
                              src={path_image + "close-button.svg"}
                              alt=""
                              onClick={handleBigCircleClose}
                            />
                          </div>
                        )}
                      </div>

                      <div
                        className={
                          selectedModules.includes("consent") || activeModule === "consent"
                            ? "stat consent visible"
                            :  activeModule === "webinar" ||
                              activeModule === "web" ||
                              activeModule === "informed" ||
                              activeModule === "docintel" || activeModule === "read" || activeModule === "automail" ||
                              activeModule === "ai"
                            ? "stat consent active"
                            : " stat consent"
                        }
                        onClick={() => handleBigCircleClick("consent", 3)}
                        style={{ "--i": "3" }}
                      >
                        <img
                          src={path_image + "legal-document-icon.svg"}
                          alt=""
                        />
                        <span>Consent</span>
                        {activeModule === "consent" && (
                          <div className="article-close">
                          <img
                            src={path_image + "close-button.svg"}
                            alt=""
                            onClick={handleBigCircleClose}
                          />
                        </div>
                        )}
                      </div>

                      <div
                        className={
                          selectedModules.includes("engine") || activeModule === "engine"
                            ? "stat engine visible"
                            :   activeModule === "survey" ||
                              activeModule === "spc" ||
                              activeModule === "automail"
                            ? "stat engine active"
                            : "stat engine"
                        }
                        onClick={() => handleBigCircleClick("engine", 4)}
                        style={{ "--i": "4" }}
                      >
                        <img src={path_image + "email-small-icon.svg"} alt="" />
                        <span>Email Engine</span>
                        {activeModule === "engine" && (
                           <div className="article-close">
                           <img
                             src={path_image + "close-button.svg"}
                             alt=""
                             onClick={handleBigCircleClose}
                           />
                         </div>
                        )}
                      </div>

                      <div className="stat blank" style={{ "--i": "5" }}></div>
                      <div className="stat blank" style={{ "--i": "6" }}></div>
                      <div className="stat blank" style={{ "--i": "7" }}></div>
                      <div className="stat blank" style={{ "--i": "8" }}></div>
                      <div className="stat blank" style={{ "--i": "9" }}></div>

                      <div
                        className={
                          selectedModules.includes("docintel") || activeModule === "docintel"
                            ? "stat docintel visible"
                            :  activeModule === "read" ||
                              activeModule === "spc" ||
                              activeModule === "web" ||
                              activeModule === "consent" ||
                              activeModule === "survey" ||
                              activeModule === "informed" ||
                              activeModule === "engine" ||
                              activeModule === "rating"
                            ? "stat docintel active"
                            : "stat docintel"
                        }
                        onClick={() => handleBigCircleClick("docintel", 5)}
                        style={{ "--i": "10" }}
                      >
                        <img
                          src={path_image + "docintel-small-icon.svg"}
                          alt=""
                        />
                        <span>Docintel.app</span>
                        {activeModule === "docintel" && (
                           <div className="article-close">
                           <img
                             src={path_image + "close-button.svg"}
                             alt=""
                             onClick={handleBigCircleClose}
                           />
                         </div>
                        )}
                      </div>

                      <div
                        className={
                          selectedModules.includes("informed") || activeModule === "informed"
                            ? "stat informed visible"
                            :  activeModule === "consent" ||
                              activeModule === "consent" || activeModule === "webinar" || activeModule === "automail" ||
                              activeModule === "ai" ||
                              activeModule === "spc"
                            ? "stat informed active"
                            : "stat informed"
                        }
                        onClick={() => handleBigCircleClick("informed", 6)}
                        style={{ "--i": "11" }}
                      >
                        <img src={path_image + "informedgo-icon.svg"} alt="" />
                        <span>inforMedGo</span>
                        {activeModule === "informed" && (
                          <div className="article-close">
                          <img
                            src={path_image + "close-button.svg"}
                            alt=""
                            onClick={handleBigCircleClose}
                          />
                        </div>
                        )}
                      </div>

                      <div
                        className={
                          selectedModules.includes("web") ||  activeModule === "web" 
                            ? "stat web visible"
                            :activeModule === "webinar" ||
                              activeModule === "docintel" ||
                              activeModule === "consent" ||
                              activeModule === "ai" ||
                              activeModule === "rating"
                            ? "stat web active"
                            : "stat web"
                        }
                        onClick={() => handleBigCircleClick("web", 7)}
                        style={{ "--i": "12" }}
                      >
                        <img src={path_image + "web-portal-icon.svg"} alt="" />
                        <span>Web Portal</span>
                        {activeModule === "web" && (
                           <div className="article-close">
                           <img
                             src={path_image + "close-button.svg"}
                             alt=""
                             onClick={handleBigCircleClose}
                           />
                         </div>
                        )}
                      </div>

                      <div
                        className={
                          selectedModules.includes("webinar") || activeModule === "webinar" 
                            ? "stat webinar visible"
                            : activeModule === "qa" || activeModule === "web"
                            ? "stat webinar active"
                            : "stat webinar"
                        }
                        onClick={() => handleBigCircleClick("webinar", 8)}
                        style={{ "--i": "13" }}
                      >
                        <img
                          src={path_image + "webinar-small-icon.svg"}
                          alt=""
                        />
                        <span>Webinar Portal</span>
                        {activeModule === "webinar"  && (
                           <div className="article-close">
                           <img
                             src={path_image + "close-button.svg"}
                             alt=""
                             onClick={handleBigCircleClose}
                           />
                         </div>
                        )}
                      </div>

                      <div
                        className={
                          selectedModules.includes("read") || activeModule === "read"
                            ? "stat read visible"
                            :  activeModule === "docintel" || activeModule === "webinar" ||
                              activeModule === "ai"
                            ? "stat read active"
                            : "stat read"
                        }
                        style={{ "--i": "14" }}
                        onClick={() => handleBigCircleClick("read", 0)}
                      >
                        <img src={path_image + "RTR-icon.svg"} alt="" />
                        <span>Read-Through -Rate</span>
                        {activeModule === "read" && (
                          <div className="article-close">
                          <img
                            src={path_image + "close-button.svg"}
                            alt=""
                            onClick={handleBigCircleClose}
                          />
                        </div>
                        )}
                      </div>

                      <div className="stat blank" style={{ "--i": "15" }}></div>
                      <div className="stat blank" style={{ "--i": "16" }}></div>
                      <div className="stat blank" style={{ "--i": "17" }}></div>
                      <div className="stat blank" style={{ "--i": "18" }}></div>
                      <div className="stat blank" style={{ "--i": "19" }}></div>
                    </div>
                     )}
                    {showBigCircleData && !registerPage && (
                      <div className="d-flex align-items-center justify-content-center fotter-btns">
                        <Button className="btn-filled" onClick={handleRequestClick}>Request</Button>
                        <Link to="/" className="">
                          <img src={path_image + "downlaod-ppt.svg"} alt="" />
                        </Link>
                      </div>
                       )}

                  {!showBigCircleData && !submitData &&(
                      <div className="d-flex align-items-center justify-content-center fotter-btns">
                        <Button className="btn-filled" onClick={handleSubmitClick} >Submit</Button>
                      </div>
                       )}
                    </div>

                    {submitData &&(
                    <div className='submit-section'>
                       <img src={path_image + "thanks-img.svg"} alt="" />
                      <h3>Thank You!</h3>
                      <p>We appreciate your interset and will respond very quickly.</p>
                      <Button className="btn-filled" onClick={handleBigClose}>Close</Button>
                    </div>
                     )}
                  </div>

                  <div class="shape shape-right"></div>
                </div>
             
              </div>
            </div>
          </Row>
        </Container>
      </div>
      <div className="contact-us pharma publish">
        <Container>
          <Row>
            <LandingContact/>
          </Row>
        </Container>
      </div>

      <LandingFooter/>
    </>
  );
};

export default PharmaRd;
