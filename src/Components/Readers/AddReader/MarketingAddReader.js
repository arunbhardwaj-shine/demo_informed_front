import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button, Form, FormGroup } from "react-bootstrap";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import CommonModel from "../../../Model/CommonModel";
import { loader } from "../../../loader";
import DatePicker from "react-datepicker";
import moment from "moment";
import { ENDPOINT } from "../../../axios/apiConfig";
import { getData, postData } from "../../../axios/apiHelper";
import { AddReaderValidation } from "../../Validations/ReaderValidation/AddReaderValidation";
import { toast } from "react-toastify";

const MarketingAddReader = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const primaryPhoneRef = useRef(null);
  const countryRef = useRef(null);
  const postcodeRef = useRef(null);
  const contactTotalRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [titleOptions, setTitleOptions] = useState([]);
  const [groupId, setGroupId] = useState();
  const navigate = useNavigate();
  const [prospectOptions, setProspectOptions] = useState([]);
  const [ownershipOptions, setOwnershipOptions] = useState([]);
  const [companyProductOptions, setCompanyProductOptions] = useState([]);
  const [therapyAreaOptions, setTherapyAreaOptions] = useState([]);
  const [localOptions, setLocalOptions] = useState([]);
  const [taskOptions, setTaskOptions] = useState([]);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [logActivityOptions, setLogActivityOptions] = useState([]);
  const [pipelineOptions, setPipelineOptions] = useState([]);
  const [probabilityOptions, setProbabilityOptions] = useState([]);
  const [countryAll, setCountryAll] = useState([]);
  const [typeOfContact, setTypeOfContact] = useState([]);
  const [error, setError] = useState({});
  const [commanShow, setCommanShow] = useState(false);
  const [data, setData] = useState([]);
  const [newProduct, setNewProduct] = useState({
    label: "",
    value: "",
  });
  const [commonHeader, setCommonHeader] = useState("");
  const [commonFooter, setCommonFooter] = useState("");
  const [showTaskExtra, setShowTaskExtra] = useState(false);
  const [userInputs, setUserInputs] = useState({
    jobTitle: "",
    title: { value: "" },
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    alternativeEmail: "",
    countryCode: { value: "" },
    primary_phone: "",
    alternativePhone: "",
    linkedIn: "",
    prospect: { value: "" },
    ownership: { value: "" },
    typeContact: [],
    customerType: { value: "" },
    companyName: { value: "" },
    country: { value: "" },
    companyWebsite: "",
    companyProduct: { value: "" },
    therapyArea: { value: "" },
    local: { value: "" },
    address: { street1: "", street2: "", city: "", postcode: "", country: "" },
    logActivity: "",
    task: { task: "", taskCheckClicked: false, taskDate: "" },
    nextContact: new Date(
      moment(new Date(), "MM/DD/YYYY").format("MM/DD/YYYY")
    ),
    opportunityTitle: "",
    ourProduct: "",
    contactTotal: "",
    pipeline: { value: "" },
    opportunityValue: "",
    probability: { value: "" },
    weightedValue: "",
    quoteSent: false,
    quoteValid: new Date(moment(new Date(), "MM/DD/YYYY").format("MM/DD/YYYY")),
  });
  // const [countryCode, setCountryCode] = useState([
  //   { value: "", label: "Select" },
  //   { value: "Afghanistan", label: "+93" },
  //   { value: "Albania", label: "+355" },
  //   { value: "Algeria", label: "+213" },
  //   { value: "American Samoa", label: "+1-684" },
  //   { value: "Andorra", label: "+376" },
  //   { value: "Angola", label: "+244" },
  //   { value: "Anguilla", label: "+1-264" },
  //   { value: "Antarctica", label: "+672" },
  //   { value: "Antigua and Barbuda", label: "+1-268" },
  //   { value: "Argentina", label: "+54" },
  //   { value: "Armenia", label: "+374" },
  //   { value: "India", label: "+91" },
  //   { value: "Azerbaijan", label: "+994" },
  //   { value: "Bahamas", label: "+1-242" },
  //   { value: "Bahrain", label: "+973" },
  //   { value: "Bangladesh", label: "+880" },
  //   { value: "Barbados", label: "+1-246" },
  //   { value: "Belarus", label: "+375" },
  //   { value: "Belgium", label: "+32" },
  // ]);
  const [countryCode, setCountryCode] = useState([
    { value: "", label: "Select" },
    {
      label: "+7 840",
      value: "Abkhazia",
    },

    {
      label: "+93",
      value: "Afghanistan",
    },

    {
      label: "+355",

      value: "Albania",
    },

    {
      label: "+213",

      value: "Algeria",
    },

    {
      label: "+1 684",

      value: "American Samoa",
    },

    {
      label: "+376",

      value: "Andorra",
    },

    {
      label: "+244",

      value: "Angola",
    },

    {
      label: "+1 264",

      value: "Anguilla",
    },

    {
      label: "+1 268",

      value: "Antigua and Barbuda",
    },

    {
      label: "+54",

      value: "Argentina",
    },

    {
      label: "+374",

      value: "Armenia",
    },

    {
      label: "+297",

      value: "Aruba",
    },

    {
      label: "+247",

      value: "Ascension",
    },

    {
      label: "+61",

      value: "Australia",
    },

    {
      label: "+672",

      value: "Australian External Territories",
    },

    {
      label: "+43",

      value: "Austria",
    },

    {
      label: "+994",

      value: "Azerbaijan",
    },

    {
      label: "+1 242",

      value: "Bahamas",
    },

    {
      label: "+973",

      value: "Bahrain",
    },

    {
      label: "+880",

      value: "Bangladesh",
    },

    {
      label: "+1 246",

      value: "Barbados",
    },

    {
      label: "+1 268",

      value: "Barbuda",
    },

    {
      label: "+375",

      value: "Belarus",
    },

    {
      label: "+32",

      value: "Belgium",
    },

    {
      label: "+501",

      value: "Belize",
    },

    {
      label: "+229",

      value: "Benin",
    },

    {
      label: "+1 441",

      value: "Bermuda",
    },

    {
      label: "+975",

      value: "Bhutan",
    },

    {
      label: "+591",

      value: "Bolivia",
    },

    {
      label: "+387",

      value: "Bosnia and Herzegovina",
    },

    {
      label: "+267",

      value: "Botswana",
    },

    {
      label: "+55",

      value: "Brazil",
    },

    {
      label: "+246",

      value: "British Indian Ocean Territory",
    },

    {
      label: "+1 284",

      value: "British Virgin Islands",
    },

    {
      label: "+673",

      value: "Brunei",
    },

    {
      label: "+359",

      value: "Bulgaria",
    },

    {
      label: "+226",

      value: "Burkina Faso",
    },

    {
      label: "+257",

      value: "Burundi",
    },

    {
      label: "+855",

      value: "Cambodia",
    },

    {
      label: "+237",

      value: "Cameroon",
    },

    {
      label: "+1",

      value: "Canada",
    },

    {
      label: "+238",

      value: "Cape Verde",
    },

    {
      label: "+ 345",

      value: "Cayman Islands",
    },

    {
      label: "+236",

      value: "Central African Republic",
    },

    {
      label: "+235",

      value: "Chad",
    },

    {
      label: "+56",

      value: "Chile",
    },

    {
      label: "+86",

      value: "China",
    },

    {
      label: "+61",

      value: "Christmas Island",
    },

    {
      label: "+61",

      value: "Cocos-Keeling Islands",
    },

    {
      label: "+57",

      value: "Colombia",
    },

    {
      label: "+269",

      value: "Comoros",
    },

    {
      label: "+242",

      value: "Congo",
    },

    {
      label: "+243",

      value: "Congo, Dem. Rep. of (Zaire)",
    },

    {
      label: "+682",

      value: "Cook Islands",
    },

    {
      label: "+506",

      value: "Costa Rica",
    },

    {
      label: "+385",

      value: "Croatia",
    },

    {
      label: "+53",

      value: "Cuba",
    },

    {
      label: "+599",

      value: "Curacao",
    },

    {
      label: "+537",

      value: "Cyprus",
    },

    {
      label: "+420",

      value: "Czech Republic",
    },

    {
      label: "+45",

      value: "Denmark",
    },

    {
      label: "+246",

      value: "Diego Garcia",
    },

    {
      label: "+253",

      value: "Djibouti",
    },

    {
      label: "+1 767",

      value: "Dominica",
    },

    {
      label: "+1 809",

      value: "Dominican Republic",
    },

    {
      label: "+670",

      value: "East Timor",
    },

    {
      label: "+56",

      value: "Easter Island",
    },

    {
      label: "+593",

      value: "Ecuador",
    },

    {
      label: "+20",

      value: "Egypt",
    },

    {
      label: "+503",

      value: "El Salvador",
    },

    {
      label: "+240",

      value: "Equatorial Guinea",
    },

    {
      label: "+291",

      value: "Eritrea",
    },

    {
      label: "+372",

      value: "Estonia",
    },

    {
      label: "+251",

      value: "Ethiopia",
    },

    {
      label: "+500",

      value: "Falkland Islands",
    },

    {
      label: "+298",

      value: "Faroe Islands",
    },

    {
      label: "+679",

      value: "Fiji",
    },

    {
      label: "+358",

      value: "Finland",
    },

    {
      label: "+33",

      value: "France",
    },

    {
      label: "+596",

      value: "French Antilles",
    },

    {
      label: "+594",

      value: "French Guiana",
    },

    {
      label: "+689",

      value: "French Polynesia",
    },

    {
      label: "+241",

      value: "Gabon",
    },

    {
      label: "+220",

      value: "Gambia",
    },

    {
      label: "+995",

      value: "Georgia",
    },

    {
      label: "+49",

      value: "Germany",
    },

    {
      label: "+233",

      value: "Ghana",
    },

    {
      label: "+350",

      value: "Gibraltar",
    },

    {
      label: "+30",

      value: "Greece",
    },

    {
      label: "+299",

      value: "Greenland",
    },

    {
      label: "+1 473",

      value: "Grenada",
    },

    {
      label: "+590",

      value: "Guadeloupe",
    },

    {
      label: "+1 671",

      value: "Guam",
    },

    {
      label: "+502",

      value: "Guatemala",
    },

    {
      label: "+224",

      value: "Guinea",
    },

    {
      label: "+245",

      value: "Guinea-Bissau",
    },

    {
      label: "+595",

      value: "Guyana",
    },

    {
      label: "+509",

      value: "Haiti",
    },

    {
      label: "+504",

      value: "Honduras",
    },

    {
      label: "+852",

      value: "Hong Kong SAR China",
    },

    {
      label: "+36",

      value: "Hungary",
    },

    {
      label: "+354",

      value: "Iceland",
    },

    {
      label: "+91",

      value: "India",
    },

    {
      label: "+62",

      value: "Indonesia",
    },

    {
      label: "+98",

      value: "Iran",
    },

    {
      label: "+964",

      value: "Iraq",
    },

    {
      label: "+353",

      value: "Ireland",
    },

    {
      label: "+972",

      value: "Israel",
    },

    {
      label: "+39",

      value: "Italy",
    },

    {
      label: "+225",

      value: "Ivory Coast",
    },

    {
      label: "+1 876",

      value: "Jamaica",
    },

    {
      label: "+81",

      value: "Japan",
    },

    {
      label: "+962",

      value: "Jordan",
    },

    {
      label: "+7 7",

      value: "Kazakhstan",
    },

    {
      label: "+254",

      value: "Kenya",
    },

    {
      label: "+686",

      value: "Kiribati",
    },

    {
      label: "+965",

      value: "Kuwait",
    },

    {
      label: "+996",

      value: "Kyrgyzstan",
    },

    {
      label: "+856",

      value: "Laos",
    },

    {
      label: "+371",

      value: "Latvia",
    },

    {
      label: "+961",

      value: "Lebanon",
    },

    {
      label: "+266",

      value: "Lesotho",
    },

    {
      label: "+231",

      value: "Liberia",
    },

    {
      label: "+218",

      value: "Libya",
    },

    {
      label: "+423",

      value: "Liechtenstein",
    },

    {
      label: "+370",

      value: "Lithuania",
    },

    {
      label: "+352",

      value: "Luxembourg",
    },

    {
      label: "+853",

      value: "Macau SAR China",
    },

    {
      label: "+389",

      value: "Macedonia",
    },

    {
      label: "+261",

      value: "Madagascar",
    },

    {
      label: "+265",

      value: "Malawi",
    },

    {
      label: "+60",

      value: "Malaysia",
    },

    {
      label: "+960",

      value: "Maldives",
    },

    {
      label: "+223",

      value: "Mali",
    },

    {
      label: "+356",

      value: "Malta",
    },

    {
      label: "+692",

      value: "Marshall Islands",
    },

    {
      label: "+596",

      value: "Martinique",
    },

    {
      label: "+222",

      value: "Mauritania",
    },

    {
      label: "+230",

      value: "Mauritius",
    },

    {
      label: "+262",

      value: "Mayotte",
    },

    {
      label: "+52",

      value: "Mexico",
    },

    {
      label: "+691",

      value: "Micronesia",
    },

    {
      label: "+1 808",

      value: "Midway Island",
    },

    {
      label: "+373",

      value: "Moldova",
    },

    {
      label: "+377",

      value: "Monaco",
    },

    {
      label: "+976",

      value: "Mongolia",
    },

    {
      label: "+382",

      value: "Montenegro",
    },

    {
      label: "+1664",

      value: "Montserrat",
    },

    {
      label: "+212",

      value: "Morocco",
    },

    {
      label: "+95",

      value: "Myanmar",
    },

    {
      label: "+264",

      value: "Namibia",
    },

    {
      label: "+674",

      value: "Nauru",
    },

    {
      label: "+977",

      value: "Nepal",
    },

    {
      label: "+31",

      value: "Netherlands",
    },

    {
      label: "+599",

      value: "Netherlands Antilles",
    },

    {
      label: "+1 869",

      value: "Nevis",
    },

    {
      label: "+687",

      value: "New Caledonia",
    },

    {
      label: "+64",

      value: "New Zealand",
    },

    {
      label: "+505",

      value: "Nicaragua",
    },

    {
      label: "+227",

      value: "Niger",
    },

    {
      label: "+234",

      value: "Nigeria",
    },

    {
      label: "+683",

      value: "Niue",
    },

    {
      label: "+672",

      value: "Norfolk Island",
    },

    {
      label: "+850",

      value: "North Korea",
    },

    {
      label: "+1 670",

      value: "Northern Mariana Islands",
    },

    {
      label: "+47",

      value: "Norway",
    },

    {
      label: "+968",

      value: "Oman",
    },

    {
      label: "+92",

      value: "Pakistan",
    },

    {
      label: "+680",

      value: "Palau",
    },

    {
      label: "+970",

      value: "Palestinian Territory",
    },

    {
      label: "+507",

      value: "Panama",
    },

    {
      label: "+675",

      value: "Papua New Guinea",
    },

    {
      label: "+595",

      value: "Paraguay",
    },

    {
      label: "+51",

      value: "Peru",
    },

    {
      label: "+63",

      value: "Philippines",
    },

    {
      label: "+48",

      value: "Poland",
    },

    {
      label: "+351",

      value: "Portugal",
    },

    {
      label: "+1 787",

      value: "Puerto Rico",
    },

    {
      label: "+974",

      value: "Qatar",
    },

    {
      label: "+262",

      value: "Reunion",
    },

    {
      label: "+40",

      value: "Romania",
    },

    {
      label: "+7",

      value: "Russia",
    },

    {
      label: "+250",

      value: "Rwanda",
    },

    {
      label: "+685",

      value: "Samoa",
    },

    {
      label: "+378",

      value: "San Marino",
    },

    {
      label: "+966",

      value: "Saudi Arabia",
    },

    {
      label: "+221",

      value: "Senegal",
    },

    {
      label: "+381",

      value: "Serbia",
    },

    {
      label: "+248",

      value: "Seychelles",
    },

    {
      label: "+232",

      value: "Sierra Leone",
    },

    {
      label: "+65",

      value: "Singapore",
    },

    {
      label: "+421",

      value: "Slovakia",
    },

    {
      label: "+386",

      value: "Slovenia",
    },

    {
      label: "+677",

      value: "Solomon Islands",
    },

    {
      label: "+27",

      value: "South Africa",
    },

    {
      label: "+500",

      value: "South Georgia and the South Sandwich Islands",
    },

    {
      label: "+82",

      value: "South Korea",
    },

    {
      label: "+34",

      value: "Spain",
    },

    {
      label: "+94",

      value: "Sri Lanka",
    },

    {
      label: "+249",

      value: "Sudan",
    },

    {
      label: "+597",

      value: "Suriname",
    },

    {
      label: "+268",

      value: "Swaziland",
    },

    {
      label: "+46",

      value: "Sweden",
    },

    {
      label: "+41",

      value: "Switzerland",
    },

    {
      label: "+963",

      value: "Syria",
    },

    {
      label: "+886",

      value: "Taiwan",
    },

    {
      label: "+992",

      value: "Tajikistan",
    },

    {
      label: "+255",

      value: "Tanzania",
    },

    {
      label: "+66",

      value: "Thailand",
    },

    {
      label: "+670",

      value: "Timor Leste",
    },

    {
      label: "+228",

      value: "Togo",
    },

    {
      label: "+690",

      value: "Tokelau",
    },

    {
      label: "+676",

      value: "Tonga",
    },

    {
      label: "+1 868",

      value: "Trinidad and Tobago",
    },

    {
      label: "+216",

      value: "Tunisia",
    },

    {
      label: "+90",

      value: "Turkey",
    },

    {
      label: "+993",

      value: "Turkmenistan",
    },

    {
      label: "+1 649",

      value: "Turks and Caicos Islands",
    },

    {
      label: "+688",

      value: "Tuvalu",
    },

    {
      label: "+1 340",

      value: "U.S. Virgin Islands",
    },

    {
      label: "+256",

      value: "Uganda",
    },

    {
      label: "+380",

      value: "Ukraine",
    },

    {
      label: "+971",

      value: "United Arab Emirates",
    },

    {
      label: "+44",

      value: "United Kingdom",
    },

    {
      label: "+1",

      value: "United States",
    },

    {
      label: "+598",

      value: "Uruguay",
    },

    {
      label: "+998",

      value: "Uzbekistan",
    },

    {
      label: "+678",

      value: "Vanuatu",
    },

    {
      label: "+58",

      value: "Venezuela",
    },

    {
      label: "+84",

      value: "Vietnam",
    },

    {
      label: "+1 808",

      value: "Wake Island",
    },

    {
      label: "+681",

      value: "Wallis and Futuna",
    },

    {
      label: "+967",

      value: "Yemen",
    },

    {
      label: "+260",

      value: "Zambia",
    },

    {
      label: "+255",

      value: "Zanzibar",
    },

    {
      label: "+263",

      value: "Zimbabwe",
    },
  ]);

  const [userDetail, setUserDetail] = useState({
    title: [],
    prospect: [],
    ownership: [],
    company: [],
    companyProduct: [],
    therapyArea: [],
    local: [],
    logActivity: [],
    task: [],
    pipeline: [],
  });

  const sortobj = (arrayOfObjects) => {
    arrayOfObjects.sort((a, b) => {
      const labelA = a.label.toUpperCase();
      const labelB = b.label.toUpperCase();

      if (labelA < labelB) {
        return -1;
      }
      if (labelA > labelB) {
        return 1;
      }

      // Labels are equal
      return 0;
    });
  };

  useEffect(() => {
    // sortobj(countryCode);
    initalFun();
  }, []);
  useEffect(() => {}, [userInputs]);
  const initalFun = async () => {
    try {
      loader("show");
      const hasData = await getData(`${ENDPOINT.READER_MARKETING_USER_DROP}`);
      if (Object.keys(hasData?.data?.data)?.length) {
        let country = [];
        hasData?.data?.data?.country.reduce((objEntries, key) => {
          country.push({
            label: key,
            value: key,
          });
        });
        setCountryAll(country);
        setTitleOptions(hasData?.data?.data?.title);
        setProspectOptions(hasData?.data?.data?.prospect);
        setOwnershipOptions(hasData?.data?.data?.contact_ownership);
        setCustomerOptions(hasData?.data?.data?.customer_type);
        setCompanyOptions(hasData?.data?.data?.company_name);
        setCompanyProductOptions(hasData?.data?.data?.company_product);
        setTherapyAreaOptions(hasData?.data?.data?.company_therapy_area);
        setLocalOptions(hasData?.data?.data?.local);
        setTaskOptions(hasData?.data?.data?.task);
        setPipelineOptions(hasData?.data?.data?.pipeline);
        setProbabilityOptions(hasData?.data?.data?.probablity);
        setTypeOfContact(hasData?.data?.data?.type_of_contact);
        setLogActivityOptions(hasData?.data?.data?.log_activity);
      }
    } catch (err) {
      console.log("--err", err);
    } finally {
      loader("hide");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      // e.preventDefault();
      setUserInputs({ ...userInputs, countryCode: { label: "", value: "" } });
    }
  };

  const handleChange = (e, isSelectedName, key) => {
    // if (e == null) {
    //   return;
    // }
   

    if (isSelectedName == "task") {
      setShowTaskExtra(true);
    }
    if (isSelectedName == "address") {
      if (e.target?.name == "street1") {
        setUserInputs({
          ...userInputs,
          address: { ...userInputs?.address, street1: e?.target?.value },
        });
      } else if (e?.target?.name == "street2") {
        setUserInputs({
          ...userInputs,
          address: { ...userInputs?.address, street2: e?.target?.value },
        });
      } else if (e?.target?.name == "city") {
        setUserInputs({
          ...userInputs,
          address: { ...userInputs?.address, city: e?.target?.value },
        });
      } else if (key == "addressCountry") {
        setUserInputs({
          ...userInputs,
          address: { ...userInputs?.address, country: e?.value },
        });
      } else if (e.target?.name == "postcode") {
        const cleanedValue = e?.target?.value?.replace(/[^a-zA-Z0-9]/g, "");
        if (cleanedValue?.length <= 12) {
          setUserInputs({
            ...userInputs,
            address: { ...userInputs?.address, postcode: cleanedValue },
          });

          setError(null);
        } else {
          setError({ postcode: "Postcode maximum of 12 Character long" });
        }
      }
    } else if (key == "typeContact") {
      const typeContactArray = [...(userInputs?.typeContact || [])];
      if (e == true) {
        typeContactArray.push(isSelectedName);
      } else {
        const index = typeContactArray.indexOf(isSelectedName);
        if (index !== -1) {
          typeContactArray.splice(index, 1);
        }
      }
      setUserInputs({
        ...userInputs,
        typeContact: typeContactArray,
      });
    } else if (isSelectedName == "taskValueChecked") {
      if (e) {
        setUserInputs({
          ...userInputs,
          task: {
            ...userInputs?.task,
            taskCheckClicked: e,
            taskDate: new Date(),
          },
        });
      } else {
        setUserInputs({
          ...userInputs,
          task: { ...userInputs?.task, taskCheckClicked: e },
        });
      }
    } else if (isSelectedName == "taskDate") {
      setUserInputs({
        ...userInputs,
        task: { ...userInputs?.task, taskDate: new Date(e) },
      });
    } else if (isSelectedName == "probability") {
      let weighted_Value = "";
      if (userInputs?.opportunityValue) {
        weighted_Value = (userInputs?.opportunityValue * e?.value) / 100;
        setUserInputs({
          ...userInputs,
          weightedValue: weighted_Value,
          [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
            ? e
            : e?.target?.value,
        });
      } else {
        setUserInputs({
          ...userInputs,
          [isSelectedName ? isSelectedName : e.target?.name]: isSelectedName
            ? e
            : e?.target?.value,
        });
      }
    } else if (e?.target?.name == "opportunityValue") {
      const cleanedValue = e?.target?.value?.replace(/\D/g, "");

      if (cleanedValue >= 0) {
        let weighted_Value = "";
        if (userInputs?.probability?.value) {
          weighted_Value =
            (userInputs?.probability?.value * cleanedValue) / 100;

          setUserInputs({
            ...userInputs,
            weightedValue: weighted_Value,
            [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
              ? e
              : cleanedValue,
          });
          setError(null);
        } else {
          setUserInputs({
            ...userInputs,
            [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
              ? e
              : cleanedValue,
          });
          setError(null);
        }
      } else {
        setError({
          opportunityValue: "Please enter valid amount",
        });
      }
    } else if (e?.target?.name == "primary_phone") {
      const cleanedValue = e?.target?.value?.replace(/\D/g, "");
      if (cleanedValue?.length <= 12) {
        setUserInputs({
          ...userInputs,

          [e?.target?.name]: cleanedValue,
        });
        setError(null);
      } else {
        setError({
          primary_phone: "Number must be in between 10 to 12 digits",
        });
      }
    } else if (e?.target?.name == "alternativePhone") {
      const cleanedValue = e?.target?.value?.replace(/\D/g, "");
      if (cleanedValue?.length <= 12) {
        setUserInputs({
          ...userInputs,
          [e?.target?.name]: cleanedValue,
        });
        setError(null);
      } else {
        setError({
          alternativePhone: "Number must be in between 10 to 12 digits",
        });
      }
    } else if (e?.target?.name == "contactTotal") {
      const cleanedValue = e?.target?.value?.replace(/\D/g, "");
      if (cleanedValue > 500 || cleanedValue < 0) {
        setError({ contactTotal: "Contact total must be in between 0 to 500" });
      } else {
        setUserInputs({
          ...userInputs,
          [e?.target?.name]: cleanedValue,
        });
        setError(null);
      }
    } else if (isSelectedName == "task") {
      setUserInputs({
        ...userInputs,
        task: { ...userInputs?.task, task: e?.value },
      });
    } else {
      setUserInputs({
        ...userInputs,
        [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
          ? e
          : e?.target?.value,
      });
    }
  };

  const addNewProductClicked = (e, statusMsg) => {
    e.preventDefault();
    setCommanShow(true);
    if (statusMsg == "title") {
      setNewProduct("");
      setData(() => [
        {
          name: "title",
          label: "Title",
          type: "input",
          placeholder: "Type your title",
        },
      ]);
      setCommonHeader("Add New Title");
    }
    if (statusMsg == "prospect") {
      setNewProduct("");
      setData(() => [
        {
          name: "prospect",
          label: "Prospect",
          type: "input",
          placeholder: "Type your prospect",
        },
      ]);
      setCommonHeader("Add New Prospect");
    }
    if (statusMsg == "ownership") {
      setNewProduct("");
      setData(() => [
        {
          name: "ownership",
          label: "Ownership",
          type: "input",
          placeholder: "Type your contact ownership",
        },
      ]);
      setCommonHeader("Add New Contact Ownership");
    }
    if (statusMsg == "company") {
      setNewProduct("");
      setData(() => [
        {
          name: "company",
          label: "Company",
          type: "input",
          placeholder: "Type your company",
        },
      ]);
      setCommonHeader("Add New Company ");
    }
    if (statusMsg == "companyProduct") {
      setNewProduct("");
      setData(() => [
        {
          name: "companyProduct",
          label: "Company Product",
          type: "input",
          placeholder: "Type your company product",
        },
      ]);
      setCommonHeader("Add New Company Product ");
    }
    if (statusMsg == "therapyArea") {
      setNewProduct("");
      setData(() => [
        {
          name: "therapyArea",
          label: "Therapy Area",
          type: "input",
          placeholder: "Type company therapy area",
        },
      ]);
      setCommonHeader("Add New Company Therapy Area ");
    }
    if (statusMsg == "local") {
      setNewProduct("");
      setData(() => [
        {
          name: "local",
          label: "Local International",
          type: "input",
          placeholder: "Type Local International",
        },
      ]);
      setCommonHeader("Add New");
    }
    if (statusMsg == "logActivity") {
      setNewProduct("");
      setData(() => [
        {
          name: "logActivity",
          label: "log Activity",
          type: "input",
          placeholder: "Type log activity",
        },
      ]);
      setCommonHeader("Add New Log Activity");
    }
    if (statusMsg == "task") {
      setNewProduct("");
      setData(() => [
        {
          name: "task",
          label: "Task",
          type: "input",
          placeholder: "Type task",
        },
      ]);
      setCommonHeader("Add New Task");
    }
    if (statusMsg == "pipeline") {
      setNewProduct("");
      setData(() => [
        {
          name: "pipeline",
          label: "Pipeline",
          type: "input",
          placeholder: "Type pipeline",
        },
      ]);
      setCommonHeader("Add New Pipeline");
    }
    setCommonFooter("Add");
  };
  const handleModelFun = (e) => {
    setNewProduct({
      label: e?.target?.name?.trim(),
      value: e?.target?.value?.trim(),
    });
  };

  const handleSubmitModelFun = async (e) => {
    try {
      loader("show");
      const obj = {
        title: "title",
        prospect: "prospect",
        ownership: "contact_ownership",
        company: "company_name",
        companyProduct: "company_product",
        therapyArea: "company_therapy_area",
        local: "local",
        task: "task",
        pipeline: "pipeline",
        logActivity: "log_activity",
      };
      await postData(`${ENDPOINT.ADD_MARKETING_FEATURES}`, {
        label: obj[newProduct.label],
        value: newProduct.value,
      });

      if (newProduct.label == "title") {
        let title = titleOptions;
        title.unshift({
          label: newProduct.value,
          value: newProduct.value,
        });
        setTitleOptions(title);
      }
      if (newProduct.label == "prospect") {
        let prospect = prospectOptions;
        prospect.unshift({
          label: newProduct.value,
          value: newProduct.value,
        });
        setProspectOptions(prospect);
      }
      if (newProduct.label == "ownership") {
        let ownership = ownershipOptions;
        ownership.unshift({
          label: newProduct.value,
          value: newProduct.value,
        });
        setOwnershipOptions(ownership);
      }
      if (newProduct.label == "company") {
        let company = companyOptions;
        company.unshift({
          label: newProduct.value,
          value: newProduct.value,
        });
        setCompanyOptions(company);
      }

      if (newProduct.label == "companyProduct") {
        let companyProduct = companyProductOptions;
        companyProduct.unshift({
          label: newProduct.value,
          value: newProduct.value,
        });
        setCompanyProductOptions(companyProduct);
      }
      if (newProduct.label == "therapyArea") {
        let therapyArea = therapyAreaOptions;
        therapyArea.unshift({
          label: newProduct.value,
          value: newProduct.value,
        });
        setTherapyAreaOptions(therapyArea);
      }
      if (newProduct.label == "local") {
        let local = localOptions;
        local.unshift({
          label: newProduct.value,
          value: newProduct.value,
        });
        setLocalOptions(local);
      }
      if (newProduct.label == "logActivity") {
        let logActivity = logActivityOptions;
        logActivity.unshift({
          label: newProduct.value,
          value: newProduct.value,
        });
        setLogActivityOptions(logActivity);
      }

      if (newProduct.label == "task") {
        let task = taskOptions;
        task.unshift({
          label: newProduct.value,
          value: newProduct.value,
        });
        setTaskOptions(task);
      }
      if (newProduct.label == "pipeline") {
        let pipeline = pipelineOptions;
        pipeline.unshift({
          label: newProduct.value,
          value: newProduct.value,
        });
        setPipelineOptions(pipeline);
      }
    } catch (err) {
      console.log("--err", err);
    } finally {
      loader("hide");
    }
  };
  const Main = () => {
    return (
      <>
        <div className="create-change-content reader_added">
          <div className="form_action">
            {/* <h4>About CRM you're creating</h4> */}
            <div className="row">
              <div className="col-12 col-md-7">
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Job title</Form.Label>
                  <input
                    type="text"
                    className="form-control"
                    name="jobTitle"
                    onChange={(e) => handleChange(e)}
                    value={userInputs?.jobTitle}
                    placeholder="Enter job title here"
                  />
                </Form.Group>
                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Title</Form.Label>
                  <Select
                    options={titleOptions}
                    name="title"
                    value={userInputs?.title?.value ? userInputs?.title : ""}
                    // value={
                    //   titleOptions?.findIndex(
                    //     (e) => e.value == userInputs?.title
                    //   ) == -1
                    //     ? ""
                    //     : titleOptions[
                    //         titleOptions?.findIndex(
                    //           (e) => e.value == userInputs?.title
                    //         )
                    //       ]
                    // }
                    isClearable
                    onChange={(e) => handleChange(e, "title")}
                    placeholder="Select title"
                    className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                  />{" "}
                  <div className="add_product">
                    <span>&nbsp;</span>
                    <Button
                      onClick={(e) => addNewProductClicked(e, "title")}
                      className="btn-bordered btn-voilet"
                    >
                      Add New Title +
                    </Button>
                  </div>
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">
                    First name <span>*</span>
                  </Form.Label>
                  <input
                    type="text"
                    className={
                      error?.firstName ? "form-control error" : "form-control"
                    }
                    name="firstName"
                    ref={nameRef}
                    value={userInputs?.firstName}
                    onChange={(e) => handleChange(e)}
                    placeholder="First name"
                  />
                  {error?.firstName ? (
                    <div className="login-validation">{error?.firstName}</div>
                  ) : (
                    ""
                  )}
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Middle name</Form.Label>
                  <input
                    type="text"
                    placeholder="Middle name"
                    className="form-control"
                    name="middleName"
                    value={userInputs?.middleName}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Last name</Form.Label>
                  <input
                    type="text"
                    placeholder="Last name"
                    className="form-control"
                    name="lastName"
                    value={userInputs?.lastName}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">
                    Primary email <span>*</span>
                  </Form.Label>
                  <input
                    type="email"
                    className={
                      error?.email ? "form-control error" : "form-control"
                    }
                    placeholder="example@email.com"
                    ref={emailRef}
                    name="email"
                    value={userInputs?.email}
                    onChange={(e) => handleChange(e)}
                  />
                  {error?.email ? (
                    <div className="login-validation">{error?.email}</div>
                  ) : (
                    ""
                  )}
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Alternative email </Form.Label>
                  <input
                    type="email"
                    className={
                      error?.alternativeEmail
                        ? "form-control error"
                        : "form-control"
                    }
                    placeholder="example@email.com"
                    name="alternativeEmail"
                    value={userInputs?.alternativeEmail}
                    onChange={(e) => handleChange(e)}
                  />
                  {error?.alternativeEmail ? (
                    <div className="login-validation">
                      {error?.alternativeEmail}
                    </div>
                  ) : (
                    ""
                  )}
                </Form.Group>
                <Form.Group className="form-group primary_phone">
                  <Form.Label htmlFor="">Primary phone </Form.Label>
                  <Select
                    options={countryCode}
                    className={
                      error?.primary_phone
                        ? "dropdown-basic-button split-button-dropup error"
                        : "dropdown-basic-button split-button-dropup"
                    }
                    isClearable
                    // value={
                    //   countryCode?.findIndex(
                    //     (e) => e.value == userInputs?.countryCode
                    //   ) == -1
                    //     ? ""
                    //     : countryCode[
                    //         countryCode?.findIndex(
                    //           (e) => e.value == userInputs?.countryCode?.value
                    //         )
                    //       ]
                    // }
                    ref={primaryPhoneRef}
                    placeholder="Select "
                    onChange={(e) => handleChange(e, "countryCode")}
                  />

                  <input
                    type="tel"
                    className={
                      error?.primary_phone
                        ? "form-control error"
                        : "form-control"
                    }
                    name="primary_phone"
                    placeholder="Phone number"
                    value={userInputs?.primary_phone}
                    onChange={(e) => handleChange(e)}
                  />

                  {error?.primary_phone ? (
                    <div className="login-validation">
                      {error?.primary_phone}
                    </div>
                  ) : (
                    ""
                  )}
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Alternative phone</Form.Label>
                  <input
                    type="tel"
                    className={
                      error?.alternativePhone
                        ? "form-control error"
                        : "form-control"
                    }
                    name="alternativePhone"
                    placeholder="Alternative phone"
                    value={userInputs?.alternativePhone}
                    onChange={(e) => handleChange(e)}
                  />
                  {error?.alternativePhone ? (
                    <div className="login-validation">
                      {error?.alternativePhone}
                    </div>
                  ) : (
                    ""
                  )}
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">LinkedIn</Form.Label>
                  <input
                    type="text"
                    placeholder="Enter linkedIn"
                    className="form-control"
                    name="linkedIn"
                    value={userInputs?.linkedIn}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>
                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Prospect</Form.Label>
                  <Select
                    options={prospectOptions}
                    name="prospect"
                    value={
                      userInputs?.prospect?.value ? userInputs?.prospect : ""
                    }
                    isClearable
                    onChange={(e) => handleChange(e, "prospect")}
                    placeholder="Select prospect"
                    className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                  />{" "}
                  <div className="add_product">
                    <span>&nbsp;</span>
                    <Button
                      onClick={(e) => addNewProductClicked(e, "prospect")}
                      className="btn-bordered btn-voilet"
                    >
                      Add New Prospect +
                    </Button>
                  </div>
                </Form.Group>
                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Contact ownership</Form.Label>
                  <Select
                    options={ownershipOptions}
                    name="ownership"
                    value={
                      userInputs?.ownership?.value ? userInputs?.ownership : ""
                    }
                    onChange={(e) => handleChange(e, "ownership")}
                    placeholder="Select contact ownership"
                    className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                    isClearable
                  />{" "}
                  <div className="add_product">
                    <span>&nbsp;</span>
                    <Button
                      onClick={(e) => addNewProductClicked(e, "ownership")}
                      className="btn-bordered btn-voilet"
                    >
                      Add New ownership +
                    </Button>
                  </div>
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Type of contact</Form.Label>
                  <fieldset id="group2">
                    {typeOfContact?.length
                      ? typeOfContact?.map((item, index) => {
                          return (
                            <>
                              <input
                                type="checkbox"
                                value="value1"
                                name={item?.label}
                                onClick={(e) =>
                                  handleChange(
                                    e.target?.checked,
                                    item?.value,
                                    "typeContact"
                                  )
                                }
                                id={`limitagreed${index}`}
                              />
                              <Form.Label htmlFor={`limitagreed${index}`}>
                                {item?.label}
                              </Form.Label>
                            </>
                          );
                        })
                      : ""}
                  </fieldset>
                </Form.Group>
                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Customer type</Form.Label>
                  <Select
                    options={customerOptions}
                    name="customerType"
                    value={
                      userInputs?.customerType?.value
                        ? userInputs?.customerType
                        : ""
                    }
                    isClearable
                    onChange={(e) => handleChange(e, "customerType")}
                    placeholder="Select customer type"
                    className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                  />
                </Form.Group>
                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Company name</Form.Label>
                  <Select
                    options={companyOptions}
                    name="companyName"
                    value={
                      userInputs?.companyName?.value
                        ? userInputs?.companyName
                        : ""
                    }
                    isClearable
                    onChange={(e) => handleChange(e, "companyName")}
                    placeholder="Select contact company"
                    className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                  />{" "}
                  <div className="add_product">
                    <span>&nbsp;</span>
                    <Button
                      onClick={(e) => addNewProductClicked(e, "company")}
                      className="btn-bordered btn-voilet"
                    >
                      Add New Company +
                    </Button>
                  </div>
                </Form.Group>
                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">
                    Country <span>*</span>{" "}
                  </Form.Label>
                  <Select
                    options={countryAll}
                    className={
                      error?.country
                        ? "dropdown-basic-button split-button-dropup error"
                        : "dropdown-basic-button split-button-dropup"
                    }
                    value={
                      userInputs?.country?.value ? userInputs?.country : ""
                    }
                    isClearable
                    placeholder="Select country"
                    ref={countryRef}
                    onChange={(e) => handleChange(e, "country")}
                  />
                  {error?.country ? (
                    <div className="login-validation">{error?.country}</div>
                  ) : (
                    ""
                  )}
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Company website</Form.Label>
                  <input
                    type="text"
                    placeholder="Enter company website"
                    className="form-control"
                    name="companyWebsite"
                    value={userInputs?.companyWebsite}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>
                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Company product</Form.Label>
                  <Select
                    options={companyProductOptions}
                    name="companyProduct"
                    value={
                      userInputs?.companyProduct?.value
                        ? userInputs?.companyProduct
                        : ""
                    }
                    isClearable
                    onChange={(e) => handleChange(e, "companyProduct")}
                    placeholder="Select company product"
                    className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                  />{" "}
                  <div className="add_product">
                    <span>&nbsp;</span>
                    <Button
                      onClick={(e) => addNewProductClicked(e, "companyProduct")}
                      className="btn-bordered btn-voilet"
                    >
                      Add New Product +
                    </Button>
                  </div>
                </Form.Group>
                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Company therapy area</Form.Label>
                  <Select
                    options={therapyAreaOptions}
                    name="therapyArea"
                    value={
                      userInputs?.therapyArea?.value
                        ? userInputs?.therapyArea
                        : ""
                    }
                    isClearable
                    onChange={(e) => handleChange(e, "therapyArea")}
                    placeholder="Select therapy area"
                    className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                  />{" "}
                  <div className="add_product">
                    <span>&nbsp;</span>
                    <Button
                      onClick={(e) => addNewProductClicked(e, "therapyArea")}
                      className="btn-bordered btn-voilet"
                    >
                      Add New Therapy Area +
                    </Button>
                  </div>
                </Form.Group>

                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Local/International</Form.Label>
                  <Select
                    options={localOptions}
                    name="local"
                    value={userInputs?.local?.value ? userInputs?.local : ""}
                    onChange={(e) => handleChange(e, "local")}
                    placeholder="Select "
                    className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                    isClearable
                  />{" "}
                  <div className="add_product">
                    <span>&nbsp;</span>
                    <Button
                      onClick={(e) => addNewProductClicked(e, "local")}
                      className="btn-bordered btn-voilet"
                    >
                      Add New +
                    </Button>
                  </div>
                </Form.Group>

                {/* <Form.Group className="form-group">
                  <Form.Label htmlFor="">Address</Form.Label>
                  <input
                    type="text"
                    placeholder="Enter address"
                    className="form-control"
                    name="address"
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group> */}
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Street 1</Form.Label>
                  <input
                    type="text"
                    placeholder="Enter street 1"
                    className="form-control"
                    name="street1"
                    value={userInputs?.address?.street1}
                    onChange={(e) => handleChange(e, "address")}
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Street 2</Form.Label>
                  <input
                    type="text"
                    placeholder="Enter street 2"
                    className="form-control"
                    name="street2"
                    value={userInputs?.address?.street2}
                    onChange={(e) => handleChange(e, "address")}
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">City</Form.Label>
                  <input
                    type="text"
                    placeholder="Enter city"
                    className="form-control"
                    name="city"
                    value={userInputs?.address?.city}
                    onChange={(e) => handleChange(e, "address")}
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Post code</Form.Label>
                  <input
                    type="text"
                    placeholder="Enter post code"
                    className={
                      error?.postcode ? "form-control error" : "form-control"
                    }
                    name="postcode"
                    ref={postcodeRef}
                    value={userInputs?.address?.postcode}
                    onChange={(e) => handleChange(e, "address")}
                  />
                  {error?.postcode ? (
                    <div className="login-validation">{error?.postcode}</div>
                  ) : (
                    ""
                  )}
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Country</Form.Label>

                  <Select
                    options={countryAll}
                    className="dropdown-basic-button split-button-dropup"
                    value={
                      userInputs?.address?.country
                        ? {
                            label: userInputs?.address?.country,
                            value: userInputs?.address?.country,
                          }
                        : ""
                    }
                    isClearable
                    placeholder="Select country"
                    onChange={(e) =>
                      handleChange(e, "address", "addressCountry")
                    }
                  />
                </Form.Group>
                {/* <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Log activity</Form.Label>
                  <Select
                    options={logActivityOptions}
                    name="logActivity"
                    value={userInputs?.logActivity}
                    onChange={(e) => handleChange(e, "logActivity")}
                    placeholder="Select log activity"
                     isClearable
                    className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                   
                  />{" "}
                  <div className="add_product">
                    <span>&nbsp;</span>
                    <Button
                      onClick={(e) => addNewProductClicked(e, "logActivity")}
                      className="btn-bordered btn-voilet"
                    >
                      Add New Log Activity +
                    </Button>
                  </div>
                </Form.Group> */}
                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Task</Form.Label>
                  <Select
                    options={taskOptions}
                    name="task"
                    value={
                      userInputs?.task?.task
                        ? {
                            value: userInputs?.task?.task,
                            label: userInputs?.task?.task,
                          }
                        : ""
                    }
                    isClearable
                    onChange={(e) => handleChange(e, "task")}
                    placeholder="Select task"
                    className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                  />{" "}
                  <div className="add_product">
                    <span>&nbsp;</span>
                    <Button
                      onClick={(e) => addNewProductClicked(e, "task")}
                      className="btn-bordered btn-voilet"
                    >
                      Add New Task +
                    </Button>
                  </div>
                </Form.Group>

                {showTaskExtra && (
                  <div>
                    <Form.Group className="form-group margin-added">
                      <Form.Label></Form.Label>
                      <DatePicker
                        selected={
                          userInputs?.task?.taskDate
                            ? new Date(userInputs?.task?.taskDate)
                            : ""
                        }
                        name="taskDate"
                        onChange={(e) => handleChange(e, "taskDate")}
                        dateFormat="dd/MM/yyyy"
                        className="form-control"
                        placeholderText="Select task date"
                        // minDate={currentDate}
                        // onKeyDown={handleKeyDown}
                        onKeyDown={(e) => {
                          e.preventDefault();
                        }}
                      />
                      <div className="add_check">
                        <fieldset id="group2">
                          <>
                            <input
                              type="checkbox"
                              value="value1"
                              name="taskCheckClicked"
                              onClick={(e) =>
                                handleChange(
                                  e.target?.checked,

                                  "taskValueChecked"
                                )
                              }
                              id={`taskCheckClicked`}
                            />
                            <Form.Label htmlFor="taskCheckClicked">
                              Completed
                            </Form.Label>
                          </>
                        </fieldset>
                      </div>
                    </Form.Group>
                  </div>
                )}
                <Form.Group className="form-group">
                  <Form.Label>Next contact</Form.Label>
                  <DatePicker
                    selected={
                      userInputs?.nextContact
                        ? new Date(userInputs?.nextContact)
                        : new Date(
                            moment(new Date(), "MM/DD/YYYY").format(
                              "MM/DD/YYYY"
                            )
                          )
                    }
                    name="nextContact"
                    onChange={(date) => handleChange(date, "nextContact")}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    // minDate={currentDate}
                    // onKeyDown={handleKeyDown}
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                  />
                </Form.Group>
              </div>
              <div className="col-12 col-md-5 d-flex justify-content-end right-change">
                <div className="form-group justify-content-end align-items-start">
                  <label htmlFor="">Log activity </label>

                  <textarea
                    name="logActivity"
                    value={userInputs?.logActivity}
                    className="form-control"
                    id="formControlTextarea"
                    onChange={(e) =>
                      handleChange(e?.target?.value, "logActivity")
                    }
                    rows="5"
                    placeholder="Please type your notes here..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const Opportunity = () => {
    return (
      <>
        <div className="create-change-content reader_added">
          <div className="form_action">
            {/* <h4>Opportunity</h4> */}
            <div className="row">
              <div className="col-12 col-md-7">
                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Title</Form.Label>
                  <input
                    type="text"
                    className="form-control"
                    name="opportunityTitle"
                    placeholder="Title"
                    value={userInputs?.opportunityTitle}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Our Product</Form.Label>
                  <input
                    type="text"
                    className="form-control"
                    name="ourProduct"
                    placeholder="Our Product"
                    value={userInputs?.ourProduct}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>

                <div className="form-group">
                  <label htmlFor="">Contact total</label>
                  <input
                    type="tel"
                    name="contactTotal"
                    min="0"
                    max="500"
                    ref={contactTotalRef}
                    className={
                      error?.contactTotal
                        ? "form-control error"
                        : "form-control"
                    }
                    value={userInputs?.contactTotal}
                    placeholder="Enter contact total"
                    onChange={(e) => handleChange(e)}
                  />
                  {error?.contactTotal ? (
                    <div className="login-validation">
                      {error?.contactTotal}
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <Form.Group className="form-group margin-added">
                  <Form.Label htmlFor="">Pipeline Stage</Form.Label>
                  <Select
                    options={pipelineOptions}
                    placeholder="Select pipeline stage"
                    // className="dropdown-basic-button split-button-dropup"
                    className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                    value={
                      userInputs?.pipeline?.value ? userInputs?.pipeline : ""
                    }
                    isClearable
                    onChange={(e) => handleChange(e, "pipeline")}
                  />
                  <div className="add_product">
                    <span>&nbsp;</span>
                    <Button
                      className="btn-bordered btn-voilet"
                      onClick={(e) => addNewProductClicked(e, "pipeline")}
                    >
                      Add New Pipeline Stage +
                    </Button>
                  </div>
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label htmlFor="">Value</Form.Label>
                  <input
                    type="tel"
                    min={0}
                    className={
                      error?.opportunityValue
                        ? "form-control error"
                        : "form-control"
                    }
                    name="opportunityValue"
                    placeholder="Amount"
                    value={userInputs?.opportunityValue}
                    onChange={(e) => handleChange(e)}
                  />
                  {error?.opportunityValue ? (
                    <div className="login-validation">
                      {error?.opportunityValue}
                    </div>
                  ) : (
                    ""
                  )}
                </Form.Group>

                <Form.Group className="form-group ">
                  <Form.Label htmlFor="">Probability %</Form.Label>
                  <Select
                    options={probabilityOptions}
                    className="dropdown-basic-button split-button-dropup"
                    value={
                      userInputs?.probability?.value
                        ? userInputs?.probability
                        : ""
                    }
                    isClearable
                    placeholder="Select probability"
                    onChange={(e) => handleChange(e, "probability")}
                  />
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label htmlFor=""> Weighted value</Form.Label>
                  <input
                    type="number"
                    className="form-control"
                    name="weightedValue"
                    placeholder="Weighted value"
                    value={
                      userInputs?.weightedValue
                        ? (userInputs?.weightedValue).toFixed(2)
                        : ""
                    }
                    // onChange={(e) => handleChange(e)}
                  />
                </Form.Group>

                <div className="form-group">
                  <label htmlFor="setasdraft1">Quote Sent</label>
                  <fieldset id="group2">
                    <div className="switch">
                      <label className="switch-light">
                        <input
                          type="checkbox"
                          value="value1"
                          name="quoteSent"
                          id="setasdraft1"
                          onChange={(e) => {
                            handleChange(e.target?.checked, "quoteSent");
                          }}
                        />
                        <span>
                          <span className="switch-btn active">No</span>
                          <span className="switch-btn ">Yes</span>
                        </span>
                        <a className="btn"></a>
                      </label>
                    </div>
                  </fieldset>
                </div>

                <div className="form-group">
                  <label htmlFor="">Quote valid until</label>
                  <DatePicker
                    selected={
                      userInputs?.quoteValid
                        ? new Date(userInputs?.quoteValid)
                        : new Date(
                            moment(new Date(), "MM/DD/YYYY").format(
                              "MM/DD/YYYY"
                            )
                          )
                    }
                    name="quoteValid"
                    onChange={(e) => handleChange(e, "quoteValid")}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    // minDate={currentDate}
                    // onKeyDown={handleKeyDown}
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const formatDate = (newDate) => {
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const day = String(newDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  function isValidDateFormat(dateString) {
    const regex = /^\d{1,2} [A-Za-z]+ \d{4}$/;
    return regex.test(dateString);
  }

  function convertDate(dateString) {
    const formattedDate = moment(dateString, "DD MMMM YYYY").format(
      "YYYY-MM-DD"
    );
    return formattedDate;
  }
  const nextButtonClicked = (e) => {
    e.preventDefault();
    const result = AddReaderValidation(userInputs, groupId);

    if (Object.keys(result)?.length) {
      if (Object.keys(result)[0] == "firstName") {
        nameRef.current.focus();
      } else if (Object.keys(result)[0] == "email") {
        emailRef.current.focus();
      } else if (Object.keys(result)[0] == "primary_phone") {
        primaryPhoneRef.current.focus();
      } else if (Object.keys(result)[0] == "country") {
        countryRef.current.focus();
      } else if (Object.keys(result)[0] == "postcode") {
        postcodeRef.current.focus();
      } else if (Object.keys(result)[0] == "contactTotal") {
        contactTotalRef.current.focus();
      }
      toast.error(result[Object.keys(result)[0]]);
      setError(result);
      return;
    } else {
     
      try {
        loader("show");
        let nextContactDate = "";
        if (isValidDateFormat(userInputs?.nextContact)) {
          nextContactDate = convertDate(userInputs?.nextContact);
        } else {
          nextContactDate = formatDate(userInputs?.nextContact);
        }
        let quoteValidDate = "";
        if (isValidDateFormat(userInputs?.quoteValid)) {
          quoteValidDate = convertDate(userInputs?.quoteValid);
        } else {
          quoteValidDate = formatDate(userInputs?.quoteValid);
        }
        let data = {
          jobTitle: userInputs?.jobTitle,
          title: userInputs?.title?.value,
          firstName: userInputs?.firstName,
          middleName: userInputs?.middleName,
          lastName: userInputs?.lastName,
          email: userInputs?.email,
          alternativeEmail: userInputs?.alternativeEmail,
          primary_phone: `${
            userInputs?.countryCode?.label &&
            userInputs?.countryCode?.label != "Select"
              ? userInputs?.countryCode?.label
              : ""
          }-informed-${userInputs?.primary_phone}`,

          alternativePhone: userInputs?.alternativePhone,
          linkedIn: userInputs?.linkedIn,
          prospect: userInputs?.prospect?.value,
          contact_ownership: userInputs?.ownership?.value,
          type_of_contact: userInputs?.typeContact,
          customerType: userInputs?.customerType?.value,
          company_name: userInputs?.companyName?.value,
          country: userInputs?.country?.value,
          company_website: userInputs?.companyWebsite,
          company_product: userInputs?.companyProduct?.value,
          company_therapy_area: userInputs?.therapyArea?.value,
          local: userInputs?.local?.value,
          // address: `${userInputs?.street1}-${userInputs?.street2}-${userInputs?.city}-${userInputs?.postcode}-${userInputs?.addressCountry?.value}`,
          address: userInputs?.address,
          log_activity: userInputs?.logActivity,
          task: {
            task: userInputs?.task?.task,
            taskCheckClicked: userInputs?.task?.taskCheckClicked,
            taskDate: userInputs?.task?.taskDate,
          },
          next_contact: nextContactDate,
          opportunity_title: userInputs?.opportunityTitle,
          our_product: userInputs?.ourProduct,
          contact_total: userInputs?.contactTotal,
          pipeline: userInputs?.pipeline?.value,
          opportunity_value: userInputs?.opportunityValue,
          probability: userInputs?.probability?.value,
          weighted_value: userInputs?.weightedValue
            ? userInputs?.weightedValue
            : "",
          quote_sent: userInputs?.quoteSent,
          quote_valid: quoteValidDate,
        };
        loader("hide");
        navigate("/reader-review", {
          state: {
            data: data,
          },
        });
      } catch (err) {
        console.log(err);
        loader("hide");
      }
    }
  };

  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <Row>
            <div className="page-top-nav sticky">
              <Row className="justify-content-end align-items-center">
                <Col md={1}>
                  <div className="header-btn-left"></div>
                </Col>
                <Col md={9}>
                  <ul className="tabnav-link">
                    <li className="active active-main">
                      <a href="">Create Your Content</a>
                    </li>

                    <li className="">
                      <a href="">Approve Your Content &amp; Publish</a>
                    </li>
                  </ul>
                </Col>
                <Col md={2}>
                  <div className="header-btn">
                    <Link
                      className="btn btn-primary btn-bordered move-draft"
                      to="/readers-view"
                    >
                      Cancel
                    </Link>

                    <button
                      className="btn btn-primary btn-filled next "
                      onClick={nextButtonClicked}
                    >
                      Next
                    </button>
                  </div>
                </Col>
              </Row>
            </div>
            {Main()}
            {Opportunity()}
          </Row>
        </div>
      </Col>
      <CommonModel
        show={commanShow}
        onClose={setCommanShow}
        heading={commonHeader}
        data={data}
        footerButton={commonFooter}
        handleChange={handleModelFun}
        handleSubmit={handleSubmitModelFun}
      />
    </>
  );
};
export default MarketingAddReader;
