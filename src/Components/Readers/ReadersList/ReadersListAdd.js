import React, { useState ,useEffect} from "react";
import {
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import axios from "axios";

import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import EditContactType from "../../CommonComponent/EditContactType";
import EditCountry from "../../CommonComponent/EditCountry";
import Select, { createFilter } from "react-select";
import { postData, postFormData } from "../../../axios/apiHelper";
import { ENDPOINT } from "../../../axios/apiConfig";
import { loader } from "../../../loader";
import CommonConfirmModel from "../../../Model/CommonConfirmModel";
import MessageModel from "../../../Model/MessageModel";
import { toast } from "react-toastify";
import { popup_alert } from "../../../popup_alert";

let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
axios.defaults.baseURL = process.env.REACT_APP_API_KEY;

const ReadersListAdd = () => {
  let combine_data_manual;
  const { state } = useLocation();
  const navigate = useNavigate();
  const [readersData, setReadersData] = useState(
    typeof state?.readersData !== "undefined" ? state?.readersData : []
  );

  const [updateData, setUpdatedData] = useState(
    typeof state?.readersData !== "undefined" ? state?.readersData : []
  );

  const filterConfig = {
    matchFrom: "start",
  };
  const [getNewReaders, setNewReaders] = useState([]);
  const [editableData, setEditableData] = useState([]);
  const [clickData, setClickData] = useState(0);
  const [editable, setEditable] = useState(0);
  const [sorting, setSorting] = useState(0);
  const [update, setUpdate] = useState(0);
  const [sortingCount, setSortingCount] = useState(0);
  const [saveOpen, setSaveOpen] = useState(false);
  const [updateCounter, setUpdateCounter] = useState(0);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [activeManual, setActiveManual] = useState("active");
  const [activeExcel, setActiveExcel] = useState("");
  const [userId,setUserId] = useState("56Ek4feL/1A8mZgIKQWEqg==")
  const [emailChanged, setEmailChanged] = useState("");
  const [emailData, setEmailData] = useState("");

  const [counterFlag, setCounterFlag] = useState(0);
  const [commanShow, setCommanShow] = useState(false);
  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [countryall, setCountryall] = useState([
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
  const [siteStreetAll, setSiteStreetAll] = useState([]);
  const [siteCityAll, setSiteCityAll] = useState([]);
  const [sitePostalCodeAll, setSitePostCodeAll] = useState([]);
  const [change, setChanges] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
      axiosFun();
    }
    const getalCountry = async () => {
      let body = {
        user_id: localStorage.getItem("user_id"),
      };
      await axios
        .post(`distributes/filters_list`, body)
        .then((res) => {
          if (res.data.status_code == 200) {
            let user_type;
            let sub_role;
            let blind_type;
            let arrUserType;
            let arrSubRole;
            let arrBlindType;
            let site_number;
            let arrSiteNumber;
            let country = res.data.response.data.country;
            let site_name;
            let arrSiteName;
            let site_street;
            let arrSiteStreet;
            let site_postcode;
            let site_city;
            let arrSiteCity;
            let arrSitePostCode;
            let arrSiteIrt;
            let irt_user_type;
            let arrIrtUserType = [];

            let arr = [];

            if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
              user_type = res.data.response.data.investigator_type;
              sub_role = res.data.response.data.sub_role;
              blind_type = res.data.response.data.blind_type;
              site_number = res.data.response.data.site_number;
              site_name = res.data.response.data.site_name;
              site_street = res.data.response.data.site_street;
              site_postcode = res.data.response.data.site_post_code;
              site_city = res.data.response.data.site_city;
              irt_user_type = res?.data?.response?.data?.irt_inverstigator_type;

              arrUserType = [];
              arrSubRole = [];
              arrBlindType = [];
              arrSiteNumber = [];
              arrSiteName = [];
              arrSiteStreet = [];
              arrSitePostCode = [];
              arrSiteCity = [];
              arrSiteIrt = [
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" },
              ];
            }

            //  const data = Object.assign({}, res.data.response.data.blind_type);

            Object.entries(country).map(([index, item]) => {
              let label = item;
              if (index == "B&H") {
                label = "Bosnia and Herzegovina";
              }
              arr.push({
                value: item,
                label: label,
              });
            });

            if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
              Object.entries(site_number).map(([index, item]) => {
                let label = item;

                arrSiteNumber.push({
                  value: item,
                  label: label,
                });
              });

              Object.entries(site_street).map(([index, item]) => {
                let label = item;

                arrSiteStreet.push({
                  value: item,
                  label: label,
                });
              });

              Object.entries(site_city).map(([index, item]) => {
                let label = item;

                arrSiteCity.push({
                  value: item,
                  label: label,
                });
              });

              Object.entries(site_postcode).map(([index, item]) => {
                let label = item;

                arrSitePostCode.push({
                  value: item,
                  label: label,
                });
              });

              Object.entries(site_name).map(([index, item]) => {
                let label = item;

                arrSiteName.push({
                  value: item,
                  label: label,
                });
              });

              Object.entries(user_type).map(([index, item]) => {
                let label = item;

                arrUserType.push({
                  value: item,
                  label: label,
                });
              });

              Object.entries(sub_role).map(([index, item]) => {
                let label = item;
                arrSubRole.push({
                  value: item,
                  label: label,
                });
              });
              Object.entries(blind_type).map(([index, item]) => {
                let label = item;

                arrBlindType.push({
                  value: item,
                  label: label,
                });
              });
              Object.entries(irt_user_type)?.map(([item, index]) => {
                arrIrtUserType.push({
                  label: item,
                  value: item,
                });
              });
            }

            setCountryall(arr);
            if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
              setIrtRole(arrIrtUserType);
              setUserTypeAll(arrUserType);
              setSubUserTypeAll(arrSubRole);
              setSiteNumberAll(arrSiteNumber);
              setSiteNameAll(arrSiteName);
              setSiteStreetAll(arrSiteStreet);
              setSitePostCodeAll(arrSitePostCode);
              setSiteCityAll(arrSiteCity);
              setSiteIrtAll(arrSiteIrt);
              setBlindTypeAll(arrBlindType);
              setSiteData(res.data.response.data.site_data);
              setChanges(res.data.response.data);
            }

            // setCountryall(res.data.response.data.country);
          }
          // let country_opt = res.data.response.data.country;
          // var country_options = "<option>Select Country</option>";
          //   Object.entries(country_opt).map((item) => {
          //     let opt = "<option>"+item[0]+"</option>";
          //     country_options = country_options+opt;
          //   });
          //
          //   let x=document.querySelectorAll(".country-form_edit");  // Find the elements
          //     [].forEach.call(x, function(op) {
          //       op.innerHTML = country_options;
          //       op.value = op.getAttribute("data-id");
          //     });
          //     loader("hide");
        })
        .catch((err) => {
          //console.log(err);
        });
    };
    getalCountry();
  }, []);

  const axiosFun = async () => {
    try {
      const result = await axios.get(`emailapi/get_site`);

      let country = result?.data?.response?.data?.site_country_data;
      let arr = [];
      Object.entries(country).map(([index, item]) => {
        let label = item;
        if (index == "B&H") {
          label = "Bosnia and Herzegovina";
        }
        arr.push({
          value: item,
          label: label,
        });
      });
      setIRTCountry(arr);
    } catch (err) {
      console.log("-err", err);
    }
  };

  const [hpc, setHpc] = useState([
    {
      firstname: "",
      lastname: "",
      email: "",
      contact_type: "",
      country: "",
      countryIndex: "",
    },
  ]);
  const [validationError, setValidationError] = useState({});
  const [siteIrtAll, setSiteIrtAll] = useState([]);
  const [siteNameAll, setSiteNameAll] = useState([]);
  const [siteNumberAll, setSiteNumberAll] = useState([]);
  const [irtRole, setIrtRole] = useState([]);
  const [irtCountry, setIRTCountry] = useState([]);
  const [userTypeAll, setUserTypeAll] = useState([]);
  const [subUserTypeAll, setSubUserTypeAll] = useState([]);
  const [blindTypeAll, setBlindTypeAll] = useState([]);
  const [forceRender, setForceRender] = useState(false);
  const [siteData, setSiteData] = useState([]);
  const [editList, setEditList] = useState([]);
  const [newData, setNewData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showReaders, setShowSaveReader] = useState(false);
  let combine_data;
  const [isOpen, setIsOpen] = useState(false);
  const [getlistid, setListId] = useState("");

  const onUserTypeChange = (e, i) => {
    if (e == null) {
      const list = [...hpc];
      list[i].userType = "";
      list[i].userTypeIndex = "";
      setHpc(list);
    } else {
      const value = e.value;
      const list = [...hpc];
      const name = hpc[i].userType;
      list[i].userType = value;

      let index = countryall.findIndex((x) => x.value === value);
      list[i].userTypeIndex = index;
      setHpc(list);
    }
  };

  const onSubUserTypeChange = (e, i) => {
    if (e == null) {
      const list = [...hpc];
      list[i].subUserType = "";
      list[i].subUserType = "";
      setHpc(list);
    } else {
      const value = e.value;
      const list = [...hpc];
      const name = hpc[i].subUserType;
      list[i].subUserType = value;

      let index = subUserTypeAll.findIndex((x) => x.value === value);
      list[i].subUserTypeIndex = index;
      setHpc(list);
    }
  };

  const onSiteNumberChange = (e, i) => {
    if (e == null) {
      const list = [...hpc];
      list[i].siteNumber = "";
      setHpc(list);
    } else {
      let getSiteData = siteData;
      let site_name_value = getSiteData[e.value];
      const value = e.value;
      const list = [...hpc];
      const name = hpc[i].siteNumber;
      list[i].siteNumber = value;
      list[i].siteName = site_name_value;

      let snameindex = siteNameAll.findIndex(
        (x) => x.value === site_name_value
      );
      list[i].siteNameIndex = snameindex;

      let index = siteNumberAll.findIndex((x) => x.value === value);
      list[i].siteNumberIndex = index;
      setHpc(list);
    }
    // e.preventDefault();
    // if (index != 0) {
    //   const { value } = e.target;
    //   const old_hpc = hpc;
    //   old_hpc[i].siteDetails[index].siteNumber = value;

    //   setHpc(old_hpc);
    //   setUpdate(update + 1);
    // } else if (index == 0) {
    //   const { value } = e;
    //   const old_hpc = hpc;
    //   old_hpc[i].siteDetails[index].siteNumber = value;

    //   setHpc(old_hpc);
    //   setUpdate(update + 1);
    // }
  };
  const onSiteNameChange = (e, i) => {
    if (e == null) {
      const list = [...hpc];
      list[i].siteName = "";
      setHpc(list);
    } else {
      const value = e.value;
      let getSiteData = siteData;
      let site_number_value = Object.keys(getSiteData).find(
        (key) => getSiteData[key] === e.value
      );

      const list = [...hpc];
      const name = hpc[i].siteName;
      list[i].siteName = value;
      list[i].siteNumber = site_number_value;

      let snameindex = siteNumberAll.findIndex(
        (x) => x.value === site_number_value
      );
      list[i].siteNumberIndex = snameindex;

      let index = siteNameAll.findIndex((x) => x.value === value);
      list[i].siteNameIndex = index;
      setHpc(list);
    }
  };
  const onSiteIrtChange = (e, i) => {
    if (e == null) {
      const list = [...hpc];
      list[i].siteIrt = "";
      list[i].siteIrt = "";
      list[i].userType = "";
      list[i].userTypeIndex = "";
      list[i].country = "";
      setHpc(list);
    } else {
      const value = e.value;
      const list = [...hpc];
      const name = hpc[i].siteIrt;
      list[i].siteIrt = value;

      let index = siteIrtAll.findIndex((x) => x.value === value);
      list[i].siteIrtIndex = index;
      list[i].userType = "";
      list[i].userTypeIndex = "";
      list[i].country = "";
      list[i].siteNumberIndex = "";
      list[i].siteNameIndex = "";
      list[i].siteName = "";
      list[i].siteNumber = "";
      setHpc(list);
    }
    let arr = [];
    setSiteNumberAll(arr);
    setSiteNameAll(arr);
    setForceRender(!forceRender);
  };
  const onBlindTypeChange = (e, i) => {
    if (e == null) {
      const list = [...hpc];
      list[i].blindType = "";
      list[i].blindType = "";
      setHpc(list);
    } else {
      const value = e.value;
      const list = [...hpc];
      const name = hpc[i].blindType;
      list[i].blindType = value;

      let index = blindTypeAll.findIndex((x) => x.value === value);
      list[i].blindTypeIndex = index;
      setHpc(list);
    }
  };
  const handleShow = () => {
    setIsOpenAdd(true);
    setHpc([
      {
        firstname: "",
        lastname: "",
        email: "",
        contact_type: "",
        country: "",
        countryIndex: "",
      },
    ]);
    setActiveManual("active");
    setActiveExcel("");
  };

  const editButtonClicked = () => {
    if (editable == 1) {
      setSaveOpen(false);
    } else {
      setSaveOpen(true);
    }
    let temp_val = 1 - editable;
    setEditable(temp_val);
    setUpdate(update + 1);
  };

  const sortSelectedUsers = () => {
    let getReaderArr = [];
    let readerDataArr = [];

    getReaderArr = getNewReaders;
    readerDataArr = readersData;
    if (sorting === 0) {
      getReaderArr.sort((a, b) =>
        a.firtName.toLowerCase() > b.firtName.toLowerCase()
          ? 1
          : b.firtName.toLowerCase() > a.firtName.toLowerCase()
          ? -1
          : 0
      );
      readerDataArr.sort((a, b) =>
        a.firtName.toLowerCase() > b.firtName.toLowerCase()
          ? 1
          : b.firtName.toLowerCase() > a.firtName.toLowerCase()
          ? -1
          : 0
      );
    } else {
      getReaderArr.sort((a, b) =>
        a.firtName.toLowerCase() < b.firtName.toLowerCase()
          ? 1
          : b.firtName.toLowerCase() < a.firtName.toLowerCase()
          ? -1
          : 0
      );
      readerDataArr.sort((a, b) =>
        a.firtName.toLowerCase() < b.firtName.toLowerCase()
          ? 1
          : b.firtName.toLowerCase() < a.firtName.toLowerCase()
          ? -1
          : 0
      );
    }
    setReadersData(readerDataArr);
    setSorting(1 - sorting);
    setSortingCount(sortingCount + 1);
  };

  const saveEditClicked = async () => {
    setEditable(0);
    if (editableData.length > 0) {
      editableData.map((data) => {
        const name_edit = document.getElementById(
          "field_name" + data.profileIndex
        ).innerText;
        const country_edit = document.getElementById(
          "field_country" + data.profileIndex
        ).value;
        const edit_index = document.getElementById(
          "field_index" + data.profileIndex
        ).value;
        const contactTypeElement = document.getElementById(
          "field_contact_type" + data.profileIndex
        );
        const contact_type_edit = contactTypeElement ? contactTypeElement.value : 0;


        let prev_obj_index = readersData.findIndex(
          (x) => x.profileIndex === data.profileIndex
        );

        if (prev_obj_index != "-1") {
          if (typeof readersData[edit_index] != "undefined") {
            readersData[edit_index].country = country_edit;
          }
          if (typeof readersData[edit_index] != "undefined") {
            readersData[edit_index].contact_type = contact_type_edit;
          }
          setReadersData(readersData);
        }

        let prev_obj_new_added = getNewReaders.findIndex(
          (x) => x.profileIndex === data.profileIndex
        );

        if (prev_obj_new_added != "-1") {
          if (typeof getNewReaders[edit_index] != "undefined") {
            getNewReaders[edit_index].country = country_edit;
          }
          if (typeof getNewReaders[edit_index] != "undefined") {
            getNewReaders[edit_index].contact_type = contact_type_edit;
          }
          setNewReaders(getNewReaders);
        }
      });
      setSaveOpen(false);
      setEditableData([]);
    } else {
      setSaveOpen(false);
    }
  };

  const createUser = async () => {
    loader("show");
    try {
      const new_obj = [...readersData, ...getNewReaders];
      // console.log(new_obj);
      await postData(ENDPOINT.INSERTBULKREADERS, new_obj);
      loader("hide");
      navigate("/readers-view");
    } catch (err) {
      console.log(err);
      loader("hide");
    }
  };

  const deleteReaderRecord = (index) => {
    loader("show");
    let deleteIndex = readersData.findIndex((el) => el.profileIndex == index);
    if (deleteIndex != "-1") {
      readersData.splice(deleteIndex, 1);
      setReadersData(readersData);
    }

    let deleteNewAddedIndex = getNewReaders.findIndex(
      (el) => el.profileIndex == index
    );
    if (deleteNewAddedIndex != "-1") {
      getNewReaders.splice(deleteNewAddedIndex, 1);
      setNewReaders(getNewReaders);
    }

    setConfirmationPopup(false);
    setClickData(0);
    loader("hide");
  };

  const deleteModalDisplay = (pindex) => {
    if (readersData.length > 1) {
      setConfirmationPopup(true);
      setClickData(pindex);
    } else {
      popup_alert({
        visible: "show",
        message: "Please keep atleast one reader or delete the smart list",
        type: "error",
        redirect: "",
      });
      // setModalMessage("Please keep atleast one reader in list");
      // setCommanShow(true);
    }
  };

  const deleteNewlyAdded = (profileIndex) => {
    let temp_len =
      parseInt(readersData.length) + parseInt(getNewReaders.length);
    if (temp_len > 1) {
      setConfirmationPopup(true);
      setClickData(profileIndex);
    } else {
      popup_alert({
        visible: "show",
        message: "Please keep atleast one reader or delete the smart list",
        type: "error",
        redirect: "",
      });
    }
  };

  const modalClose = (value) => {
    setCommanShow(false);
  };

  const closeClicked = async () => {
    setSaveOpen(false);
    setEditable(0);
    let vr = readersData;
    setReadersData([]);
    setTimeout(() => {
      setReadersData(vr);
      setUpdateCounter(updateCounter + 1);
    }, 50);
  };

  const editing = (profileIndex, email, country, names, contact_type) => {
    if (editable != 0) {
      const name_edit = document.getElementById(
        "field_name" + profileIndex
      ).innerText;
      const country_edit = document.getElementById(
        "field_country" + profileIndex
      ).value;

      const contactTypeElement = document.getElementById(
        "field_contact_type" + profileIndex
      );
      const contact_type_edit = contactTypeElement ? contactTypeElement.value : 0;


      const arr = [];
      arr.push({
        profileIndex: profileIndex,
        email: email,
        country: country_edit,
        username: name_edit,
        contact_type: contact_type_edit,
      });

      let prev_obj = editableData.find((x) => x.profileIndex === profileIndex);
      if (typeof prev_obj != "undefined") {
        //update existing
        editableData.map(
          (obj) => arr.find((o) => o.profileIndex === profileIndex) || obj
        );
      } else {
        //create new
        setEditableData((oldArray) => [...oldArray, ...arr]);
      }
    }
  };

  const onFirstNameChange = (e, i) => {
    const { value } = e.target;
    const list = [...hpc];
    const name = hpc[i].firstname;
    list[i].firstname = value;
    setHpc(list);
  };

  const onLastNameChange = (e, i) => {
    const { value } = e.target;
    const list = [...hpc];
    const name = hpc[i].lastname;
    list[i].lastname = value;
    setHpc(list);
  };

  const onEmailChange = (e, i) => {
    const { value } = e.target;
    setEmailChanged(value);
    const list = [...hpc];
    const name = hpc[i].email;
    list[i].email = value;
    setHpc(list);
    setEmailData(e.target.value);
  };

  const onContactTypeChange = (e, i) => {
    const value = e;
    const list = [...hpc];
    const name = hpc[i].contact_type;
    list[i].contact_type = value;
    setHpc(list);
  };

  const onCountryChange = (e, i) => {
    if (e == null) {
      const list = [...hpc];
      list[i].country = "";
      list[i].countryIndex = "";
      setHpc(list);
    } else {
      if (localStorage.getItem("user_id") === "56Ek4feL/1A8mZgIKQWEqg==") {
        let consetValue = e.value;
        if (e.value == "B&H") {
          consetValue = "Bosnia and Herzegovina";
        }

        const matchingKeys = Object.entries(change.site_country_data)
          .filter(([key, value]) => value === consetValue)
          .map(([key, value]) => key);

        const filteredSiteNames = matchingKeys.map((key) => ({
          label: change.site_data[key],
          value: change.site_data[key],
        }));
        const siteNumbers = matchingKeys.map((key) => ({
          label: key,
          value: key,
        }));

        setSiteNumberAll(siteNumbers);
        setSiteNameAll(filteredSiteNames);
      }
      const value = e.value;
      const list = [...hpc];
      const name = hpc[i].country;
      list[i].country = value;

      let index = countryall.findIndex((x) => x.value === value);
      list[i].countryIndex = index;
      setHpc(list);
    }
  };

  const deleteRecord = (i) => {
    const list = hpc;
    list.splice(i, 1);
    setHpc(list);
    setCounterFlag(counterFlag + 1);
  };

  const addMoreHcp = () => {
    const status = hpc.map((data) => {
      if (data.email == "") {
        return "false";
      } else {
        return "true";
      }
    });

    if (status.every((element) => element == "true")) {
      setHpc([
        ...hpc,
        {
          firstname: "",
          lastname: "",
          email: "",
          contact_type: "",
          country: "",
          countryIndex: "",
        },
      ]);
    } else {
      toast.warning("Please input the email atleast");
    }
  };
  const saveClickedRd = async (e) => {
    //  setIsOpenAdd(false);
    const random = Math.floor(Math.random() * 9000 + 1000);

    if (activeManual == "active") {
      const body_data = hpc.map((data) => {
        return {
          profileIndex: random,
          firtName: data.firstname,
          lastName: data.lastname,
          email: data.email,
          country: data.country,
          contact_type: data.contact_type,
          role: data.userType ? data.userType : "",
          subRole: data.subUserType ? data.subUserType : "",
          blindType: data.blindType ? data.blindType : "",
          siteNumber: data.siteNumber ? data.siteNumber : "",
          siteName: data.siteName ? data.siteName : "",
          siteStreet: data.siteStreet ? data.siteStreet : "",
          sitePostalCode: data.sitePostCode ? data.sitePostCode : "",
          siteCity: data.siteCity ? data.siteCity : "",
          irt:
            data.siteIrt == "Yes" ? "Yes" : data.siteIrt == "Training" ? 2 : "No",
            "contact_type": "HCP",
        };
      });
console.log(body_data);
      const status = body_data.map((data) => {
        if (data.email == "") {
          return "Please enter the email atleast";
        } else if (data.email != "") {
          let email = data.email;
          let useremail = email.trim();
          var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (regex.test(String(useremail).toLowerCase())) {
            let prev_obj = readersData.find((x) => x.email === useremail);
            if (typeof prev_obj != "undefined") {
              return "User with same email already added in list.";
            } else {
              return "true";
            }
            return "true";
          } else {
            return "Email format is not valid";
          }
        } else {
          return "true";
        }
      });

      if (status.every((element) => element == "true")) {
        let old_data = readersData;
        let new_data = body_data;
        if (typeof getNewReaders != "undefined") {
          let added_prev_readers_array = getNewReaders;
          let combine_new_readers_array = [
            ...new_data,
            ...added_prev_readers_array,
          ];
          setNewReaders(combine_new_readers_array);
        }
        combine_data_manual = [...new_data, ...old_data];
        setReadersData(old_data);
        setUpdatedData(old_data);
        setIsOpenAdd(false);
      } else {
        toast.warning(status[0]);
      }
    } else {
      let formData = new FormData();
      let user_id = localStorage.getItem("user_id");
      formData.append("user_id", user_id);
      formData.append("smart_list_id", getlistid);
      formData.append("reader_file", selectedFile);

      if (selectedFile) {
        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        loader("show");
        await axios
          .post(`distributes/update_reader_list`, formData)
          .then((res) => {
            if (res.data.status_code === 200) {
              toast.success("User added successfuly");

              let old_data = editList;
              let new_data = res.data.response.data;
              setNewData(new_data);
              combine_data = [...new_data, ...old_data];
              setEditList(old_data);
              setShowSaveReader(true);
              setIsOpenAdd(false);
              setActiveManual("active");
              setActiveExcel("");
              setSelectedFile(null);
              //    setUpdatedData(combine_data);

              loader("hide");
            } else {
              toast.warning(res.data.message);
              loader("hide");
            }
          })
          .catch((err) => {
            loader("hide");
            //console.log("something went wrong");
          });
        setIsOpen(false);
      } else {
        toast.warning("Please add a excel file");
      }
    }
  };
  const saveClicked = async () => {
    if (activeManual == "active") {
      const body_data = hpc.map((data, index) => {
        const random = Math.floor(Math.random() * 9000 + 1000);
        return {
          profileIndex: random,
          firtName: data.firstname,
          lastName: data.lastname,
          email: data.email,
          country: data.country,
          contact_type: data.contact_type,
        };
      });

      const status = body_data.map((data) => {
        if (data.email == "") {
          return "Please enter the email atleast";
        } else if (data.email != "") {
          let email = data.email;
          let useremail = email.trim();
          var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (regex.test(String(useremail).toLowerCase())) {
            let prev_obj = readersData.find((x) => x.email === useremail);
            if (typeof prev_obj != "undefined") {
              return "User with same email already added in list.";
            } else {
              return "true";
            }
            return "true";
          } else {
            return "Email format is not valid";
          }
        } else {
          return "true";
        }
      });

      if (status.every((element) => element == "true")) {
        let old_data = readersData;
        let new_data = body_data;
        if (typeof getNewReaders != "undefined") {
          let added_prev_readers_array = getNewReaders;
          let combine_new_readers_array = [
            ...new_data,
            ...added_prev_readers_array,
          ];
          setNewReaders(combine_new_readers_array);
        }
        combine_data_manual = [...new_data, ...old_data];
        setReadersData(old_data);
        setUpdatedData(old_data);
        setIsOpenAdd(false);
      } else {
        status.sort();
        toast.warning(status[0]);
      }
    }
  };

  return (
    <>
      <Col className="col right-sidebar custom-change">
        <div className="custom-container">
          <Row>
            <div className="page-top-nav sticky">
              <div className="row justify-content-end align-items-center">
                <Col md="1">
                  <div className="header-btn-left">
                    <Link
                      className="btn btn-primary btn-bordered back-btn"
                      to="/reader-add"
                    >
                      <svg
                        width="14"
                        height="24"
                        viewBox="0 0 14 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.159662 12.0019C0.159662 11.5718 0.323895 11.1417 0.65167 10.8138L10.9712 0.494292C11.6277 -0.16216 12.692 -0.16216 13.3482 0.494292C14.0044 1.15048 14.0044 2.21459 13.3482 2.8711L4.21687 12.0019L13.3479 21.1327C14.0041 21.7892 14.0041 22.8532 13.3479 23.5093C12.6917 24.1661 11.6274 24.1661 10.9709 23.5093L0.65135 13.19C0.323523 12.8619 0.159662 12.4319 0.159662 12.0019Z"
                          fill="#97B6CF"
                        />
                      </svg>
                    </Link>
                  </div>
                </Col>

                <Col md="9">
                  <ul className="tabnav-link">
                    <li className="">
                      <a href="">Create CRM</a>
                    </li>
                    <li className="active active-main">
                      <a href="">Review &amp; approve</a>
                    </li>
                  </ul>
                </Col>

                <Col md="2">
                  <div className="header-btn">
                    <button
                      className={
                        saveOpen
                          ? "btn btn-primary btn-filled btn-disabled"
                          : "btn btn-primary btn-filled create"
                      }
                      onClick={createUser}
                    >
                      Create
                    </button>
                  </div>
                </Col>
              </div>
            </div>

            <div className="create-reader create-change-content reader_added smartlist_readers_view">
              <div className="form_action">
                <div className="create-reader-form-header table-title">
                  <h4>
                  {localStorage.getItem("user_id") == userId?"  Uploaded Users":"  Uploaded HCPs"}

                    <span> | {readersData.length}</span>
                  </h4>

                  <div className="selected-hcp-table-action">
                    {editable == false ? (
                      <>
                        <ReactHTMLTableToExcel
                          id="test-table-xls-button"
                          className="btn btn-outline-primary"
                          table="table-to-xls"
                          filename="tablexls"
                          sheet="tablexls"
                          buttonText="Download "
                          buttonTitle="Download reader list"
                          title="jhfgjhfjhf"
                        />

                        <div className="hcp-new-user">
                          <button
                            title="Add new reader"
                            className="btn btn-outline-primary"
                            onClick={handleShow}
                          >
                            <img
                              src={path_image + "new-user.svg"}
                              alt="New User"
                            />
                          </button>
                        </div>

                        <div className="hcp-added">
                          <button
                            title="Edit reader list"
                            className="btn btn-outline-primary"
                            onClick={editButtonClicked}
                          >
                            <img
                              src={path_image + "edit-button.svg"}
                              alt="Edit"
                            />
                          </button>
                        </div>
                        <div className="hcp-sort">
                          {sortingCount == 0 ? (
                            <>
                              <button
                                className="btn btn-outline-primary"
                                onClick={sortSelectedUsers}
                              >
                                Sort By{" "}
                                <img
                                  src={path_image + "sort.svg"}
                                  alt="Shorting"
                                />
                              </button>
                            </>
                          ) : sorting == 0 ? (
                            <>
                              <button
                                className="btn btn-outline-primary desc"
                                onClick={sortSelectedUsers}
                              >
                                Sort By{" "}
                                <img
                                  src={path_image + "sort-decending.svg"}
                                  alt="Shorting"
                                />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="btn btn-outline-primary asc"
                                onClick={sortSelectedUsers}
                              >
                                Sort By{" "}
                                <img
                                  src={path_image + "sort-assending.svg"}
                                  alt="Shorting"
                                />
                              </button>
                            </>
                          )}
                        </div>
                      </>
                    ) : null}

                    {saveOpen ? (
                      <>
                        <button
                          className="btn btn-primary btn-filled"
                          onClick={closeClicked}
                        >
                          Close
                        </button>
                        <button
                          className="btn btn-primary btn-bordered"
                          onClick={saveEditClicked}
                        >
                          Save
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>

                <div className="smart-list-view">
                  <div className="selected-hcp-list">
                    <table className="table" id="table-to-xls">
                      <thead className="sticky-header">
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Country</th>
                          {localStorage.getItem("user_id") ==
                            "56Ek4feL/1A8mZgIKQWEqg==" ? (
                              <>
                              <th scope="col">IRT mandatory training</th>
                              <th scope="col">IRT Role</th>
                              </>
                            ) : (
                              <>
                              <th scope="col">Business Unit</th>
                              <th scope="col">Contact Type</th>
                              </>
                          )}


                        </tr>
                      </thead>
                      <tbody>
                        {typeof getNewReaders !== "undefined" &&
                          getNewReaders.length > 0 &&
                          getNewReaders.map((item, index) => (
                            <tr
                              key={item}
                              className="hcps-added"
                              id={`row-selected` + index}
                              onClick={(e) =>
                                editing(
                                  item?.profileIndex,
                                  item?.email,
                                  item?.country,
                                  item?.firtName + " " + item?.lastName,
                                  item?.contact_type
                                )
                              }
                            >
                              <td
                                contenteditable={
                                  editable === 0 ? "false" : "true"
                                }
                                suppressContentEditableWarning={true}
                                id={`field_name` + item?.profileIndex}
                              >
                                <span>
                                  {item?.firtName + " " + item?.lastName}
                                </span>
                              </td>
                              <td>
                                <span>{item?.email}</span>
                              </td>
                              <input
                                type="hidden"
                                id={`field_index` + item?.profileIndex}
                                value={index}
                              />
                              <td>
                                {editable ? (
                                  <EditCountry
                                    selected_country={item?.country}
                                    profile_user={item?.profileIndex}
                                  ></EditCountry>
                                ) : (
                                  <span>
                                    {item?.country ? item.country : "N/A"}
                                  </span>
                                )}
                              </td>
                              <td>
                              {localStorage.getItem("user_id") ==
                              "56Ek4feL/1A8mZgIKQWEqg=="
                                ? item?.irt
                                  ? item.irt == "Yes" ? "Yes" : "No"
                                  : "No"
                                :item.ibu
                                ? item.ibu
                                : "N/A"}
                              </td>
                              <td>

                                {localStorage.getItem("user_id") ==
                                "56Ek4feL/1A8mZgIKQWEqg==" ?
                                  item.role
                                : editable ? (
                                  <EditContactType
                                    selected_ibu={item?.contact_type}
                                    profile_user={item?.profileIndex}
                                  ></EditContactType>
                                ) : (
                                  <span>{item?.contact_type}</span>
                                )}
                              </td>
                              <td className="delete_row" colspan="12">
                                <img
                                  src={path_image + "delete.svg"}
                                  alt="Delete Row"
                                  onClick={() =>
                                    deleteNewlyAdded(item?.profileIndex)
                                  }
                                />
                              </td>
                            </tr>
                          ))}

                        {typeof getNewReaders !== "undefined" &&
                          getNewReaders.length > 0 && (
                            <tr className="seprator-add">
                              <td colspan="13"></td>
                            </tr>
                          )}

                        {readersData.length > 0 ? (
                          readersData.map(function (data, index) {
                            return (
                              <tr
                                key={data}
                                id={`row-selected` + index}
                                onClick={(e) =>
                                  editing(
                                    data?.profileIndex,
                                    data?.email,
                                    data?.country,
                                    data?.firtName + " " + data?.lastName,
                                    data?.contact_type
                                  )
                                }
                              >
                                <td
                                  id={`field_name` + data.profileIndex}
                                  contentEditable={
                                    editable === 0 ? "false" : "true"
                                  }
                                  suppressContentEditableWarning={true}
                                >
                                  <span>
                                    {data?.firtName + " " + data?.lastName}
                                  </span>
                                </td>

                                <td>
                                  <input
                                    type="hidden"
                                    id={`field_index` + data.profileIndex}
                                    value={index}
                                  />
                                  {data?.email}
                                </td>
                                <td>
                                  {editable ? (
                                    <EditCountry
                                      selected_country={data.country}
                                      profile_user={data.profileIndex}
                                    ></EditCountry>
                                  ) : (
                                    <span>{data.country}</span>
                                  )}
                                </td>
                                <td>
                                  {
                                    localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" ?
                                     data?.irt
                                      ? data.irt == "Yes" ? "Yes" : "No"
                                      : "No"
                                    : data.ibu
                                    ? data.ibu
                                    : "N/A"
                                  }
                                </td>

                                <td>
                                  {
                                    localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" ?
                                      <span>{data?.role}</span>
                                    :
                                      editable ? (
                                      <EditContactType
                                        selected_ibu={data.contact_type}
                                        profile_user={data.profileIndex}
                                      ></EditContactType>
                                    ) : (
                                      <span>{data.contact_type}</span>
                                    )
                                }
                                </td>
                                <td className="delete_row" colSpan="12">
                                  <img
                                    src={path_image + "delete.svg"}
                                    title="Delete reader"
                                    alt="Delete Row"
                                    id={"delete" + data.profileIndex}
                                    onClick={() => {
                                      deleteModalDisplay(data.profileIndex);
                                    }}
                                  />
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr className="no_found">
                            <td>No Data Found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </Col>

      {/* add new hcps */}


      {localStorage.getItem("user_id")=="56Ek4feL/1A8mZgIKQWEqg=="?  <Modal
        id="add_hcp"
        show={isOpenAdd}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-hidden="true"
        >
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              {localStorage.getItem("user_id") == userId
                ? "Add New User +"
                : "Add New HCP"}
            </h5>
            <button
              onClick={() => {
                setIsOpenAdd(false);
                setHpc([
                  {
                    firstname: "",
                    lastname: "",
                    email: "",
                    contact_type: "",
                    country: "",
                    countryIndex: "",
                  },
                ]);
                setActiveManual("active");
                // document.querySelector("#file-4").value = "";
                setActiveExcel("");
              }}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="hcp-add-box">
              <div className="hcp-add-form tab-content" id="upload-confirm">
                <form id="add_hcp_form" className={"tab-pane" + activeManual}>
                  {hpc.map((val, i) => {
                    const fieldName = `hpc[${i}]`;
                    return (
                      <>
                        <div className="add_hcp_boxes">
                          <div className="form_action">
                            <div className="row">
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">First Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    onChange={(event) =>
                                      onFirstNameChange(event, i)
                                    }
                                    value={val.firstname}
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">Last Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    onChange={(event) =>
                                      onLastNameChange(event, i)
                                    }
                                    value={val.lastname}
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">
                                    Email <span>*</span>
                                  </label>
                                  <input
                                    type="email"
                                    className={
                                      validationError?.newHcpEmail
                                        ? "form-control error"
                                        : "form-control"
                                    }
                                    id="email-desc"
                                    name={`${fieldName}.email`}
                                    onChange={(event) =>
                                      onEmailChange(event, i)
                                    }
                                    value={val.email}
                                  />
                                  {validationError?.newHcpEmail ? (
                                    <div className="login-validation">
                                      {validationError?.newHcpEmail}
                                    </div>
                                  ) : null}
                                </div>
                              </div>

                              {localStorage.getItem("user_id") !=
                              "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                <div className="col-12 col-md-6">
                                  <div className="form-group">
                                    <label for="">Contact Type</label>
                                    <DropdownButton
                                      className="dropdown-basic-button split-button-dropup"
                                      title={
                                        hpc[i].contact_type != "" &&
                                        hpc[i].contact_type != "undefined"
                                          ? hpc[i].contact_type
                                          : "Select Type"
                                      }
                                      onSelect={(event) =>
                                        onContactTypeChange(event, i)
                                      }
                                    >
                                      <div className="scroll_div">
                                        <Dropdown.Item
                                          eventKey="HCP"
                                          className={
                                            hpc[i].contact_type == "HCP"
                                              ? "active"
                                              : ""
                                          }
                                        >
                                          HCP
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          eventKey="Staff"
                                          className={
                                            hpc[i].contact_type == "Staff"
                                              ? "active"
                                              : ""
                                          }
                                        >
                                          Staff
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          eventKey="Test Users"
                                          className={
                                            hpc[i].contact_type == "Test Users"
                                              ? "active"
                                              : ""
                                          }
                                        >
                                          Test Users
                                        </Dropdown.Item>
                                      </div>
                                    </DropdownButton>
                                  </div>
                                </div>
                              ) : null}

                              {localStorage.getItem("user_id") !=
                              "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                <div className="col-12 col-md-6">
                                  <div className="form-group">
                                    <label for="">Country</label>
                                    <Select
                                      options={countryall}
                                      className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                      onChange={(event) =>
                                        onCountryChange(event, i)
                                      }
                                      defaultValue={
                                        countryall[hpc[i].countryIndex]
                                      }
                                      placeholder={
                                        typeof countryall[
                                          hpc[i].countryIndex
                                        ] === "undefined"
                                          ? "Select Country"
                                          : countryall[hpc[i].countryIndex]
                                      }
                                      filterOption={createFilter(filterConfig)}
                                      isClearable
                                    />
                                    {/*
                                    <DropdownButton className="dropdown-basic-button split-button-dropup country"
                                        title= {hpc[i].country != "" &&  hpc[i].country != "undefined" ? hpc[i].country == "B&H" ? "Bosnia and Herzegovina" : hpc[i].country : "Select Country" }
                                        onSelect={(event) => onCountryChange(event, i)}
                                        >
                                        <div className="scroll_div">
                                        {countryall.length === 0
                                        ? ""
                                        : Object.entries(countryall).map(
                                        ([index, item]) => {
                                        return (
                                        <>
                                        <Dropdown.Item eventKey={index} className = {hpc[i].country == index ? "active" : "" }>{item == "B&H" ? "Bosnia and Herzegovina" : item}</Dropdown.Item>
                                        </>
                                      );
                                    }
                                  )}
                                  </div>
                                  </DropdownButton>
                                    */}
                                  </div>
                                </div>
                              ) : null}

                              {localStorage.getItem("user_id") ==
                              "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                <>
                                  <hr />
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">IRT mandatory training</label>
                                      <Select
                                        options={siteIrtAll}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onSiteIrtChange(
                                            event,

                                            i
                                          )
                                        }
                                        defaultValue={
                                          siteIrtAll[hpc[i].siteIrtIndex]
                                        }
                                        placeholder={
                                          typeof siteIrtAll[
                                            hpc[i].siteIrtIndex
                                          ] === "undefined"
                                            ? "Select Site IRT"
                                            : siteIrtAll[hpc[i].siteIrtIndex]
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">IRT Role</label>
                                      {siteIrtAll[hpc[i].siteIrtIndex]
                                        ?.value === "Yes" ? (
                                        <Select
                                          options={irtRole}
                                          className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                          onChange={(event) =>
                                            onUserTypeChange(event, i)
                                          }
                                          value={
                                            irtRole.findIndex(
                                              (el) => el.value == val?.userType
                                            ) == -1
                                              ? ""
                                              : irtRole[
                                                  irtRole.findIndex(
                                                    (el) =>
                                                      el.value == val?.userType
                                                  )
                                                ]
                                          }
                                          placeholder={"Select Role"}
                                          isClearable
                                          // filterOption={createFilter(filterConfig)}
                                        />
                                      ) : siteIrtAll[hpc[i].siteIrtIndex]
                                          ?.value === "No" ? (
                                        <Select
                                          options={userTypeAll}
                                          className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                          onChange={(event) =>
                                            onUserTypeChange(event, i)
                                          }
                                          value={
                                            userTypeAll.findIndex(
                                              (el) => el.value == val?.userType
                                            ) == -1
                                              ? ""
                                              : userTypeAll[
                                                  userTypeAll.findIndex(
                                                    (el) =>
                                                      el.value == val?.userType
                                                  )
                                                ]
                                          }
                                          isClearable
                                          placeholder={"Select Role"}
                                          // filterOption={createFilter(filterConfig)}
                                        />
                                      ) : (
                                        <Select
                                          className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                          placeholder={"Select Role"}
                                        />
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Blind Type</label>
                                      <Select
                                        options={blindTypeAll}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onBlindTypeChange(event, i)
                                        }
                                        defaultValue={
                                          blindTypeAll[hpc[i].blindTypeIndex]
                                        }
                                        placeholder={
                                          typeof blindTypeAll[
                                            hpc[i].blindTypeIndex
                                          ] === "undefined"
                                            ? "Select Blind Type"
                                            : blindTypeAll[
                                                hpc[i].blindTypeIndex
                                              ]
                                        }
                                        // filterOption={createFilter(filterConfig)}
                                      />
                                    </div>
                                  </div>

                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Sub Role</label>
                                      <Select
                                        options={subUserTypeAll}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onSubUserTypeChange(event, i)
                                        }
                                        defaultValue={
                                          subUserTypeAll[
                                            hpc[i].subUserTypeIndex
                                          ]
                                        }
                                        placeholder={
                                          typeof subUserTypeAll[
                                            hpc[i].subUserTypeIndex
                                          ] === "undefined"
                                            ? "Select Sub Role"
                                            : subUserTypeAll[
                                                hpc[i].subUserTypeIndex
                                              ]
                                        }
                                        // filterOption={createFilter(filterConfig)}
                                        //  isClearable
                                      />
                                    </div>
                                  </div>

                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Country</label>
                                      {siteIrtAll[hpc[i].siteIrtIndex]
                                        ?.value === "Yes" ? (
                                        <Select
                                          options={irtCountry}
                                          className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                          onChange={(event) =>
                                            onCountryChange(event, i)
                                          }
                                          value={
                                            irtCountry.findIndex(
                                              (el) => el.value == val?.country
                                            ) == -1
                                              ? ""
                                              : irtCountry[
                                                  irtCountry.findIndex(
                                                    (el) =>
                                                      el.value == val?.country
                                                  )
                                                ]
                                          }
                                          placeholder="Select Country"
                                          filterOption={createFilter(
                                            filterConfig
                                          )}
                                          isClearable
                                        />
                                      ) : (
                                        <Select
                                          options={countryall}
                                          className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                          onChange={(event) =>
                                            onCountryChange(event, i)
                                          }
                                          value={
                                            countryall.findIndex(
                                              (el) => el.value == val?.country
                                            ) == -1
                                              ? ""
                                              : countryall[
                                                  countryall.findIndex(
                                                    (el) =>
                                                      el.value == val?.country
                                                  )
                                                ]
                                          }
                                          placeholder="Select Country"
                                          filterOption={createFilter(
                                            filterConfig
                                          )}
                                          isClearable
                                        />
                                      )}
                                      {/*
                                    <DropdownButton className="dropdown-basic-button split-button-dropup country"
                                        title= {hpc[i].country != "" &&  hpc[i].country != "undefined" ? hpc[i].country == "B&H" ? "Bosnia and Herzegovina" : hpc[i].country : "Select Country" }
                                        onSelect={(event) => onCountryChange(event, i)}
                                        >
                                        <div className="scroll_div">
                                        {countryall.length === 0
                                        ? ""
                                        : Object.entries(countryall).map(
                                        ([index, item]) => {
                                        return (
                                        <>
                                        <Dropdown.Item eventKey={index} className = {hpc[i].country == index ? "active" : "" }>{item == "B&H" ? "Bosnia and Herzegovina" : item}</Dropdown.Item>
                                        </>
                                      );
                                    }
                                  )}
                                  </div>
                                  </DropdownButton>
                                    */}
                                    </div>
                                  </div>

                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Site Number</label>
                                      <Select
                                        options={siteNumberAll}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onSiteNumberChange(event, i)
                                        }
                                        value={
                                          siteNumberAll[hpc[i].siteNumberIndex]
                                            ? siteNumberAll[
                                                hpc[i].siteNumberIndex
                                              ]
                                            : ""
                                        }
                                        // defaultValue={
                                        //   siteNumberAll[hpc[i].siteNumberIndex]
                                        // }
                                        placeholder={
                                          typeof siteNumberAll[
                                            hpc[i].siteNumberIndex
                                          ] === "undefined"
                                            ? "Select Site Number"
                                            : siteNumberAll[
                                                hpc[i].siteNumberIndex
                                              ]
                                        }
                                        // onChange={(event) =>
                                        //   onUserTypeChange(event, i)
                                        // }
                                        // defaultValue={
                                        //   userTypeAll[
                                        //     hpc[i].userTypeIndex
                                        //   ]
                                        // }
                                        // placeholder={
                                        //   typeof userTypeAll[
                                        //     hpc[i].userTypeIndex
                                        //   ] === "undefined"
                                        //     ? "Select User Type"
                                        //     : userTypeAll[
                                        //         hpc[i].userTypeIndex
                                        //       ]
                                        // }
                                        // filterOption={createFilter(filterConfig)}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Site Name</label>

                                      <Select
                                        options={siteNameAll}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onSiteNameChange(event, i)
                                        }
                                        // onChange={(event) =>
                                        //   onUserTypeChange(event, i)
                                        // }
                                        // defaultValue={
                                        //   userTypeAll[
                                        //     hpc[i].userTypeIndex
                                        //   ]
                                        // }
                                        // valueField={
                                        //   siteNameAll[hpc[i].siteNameIndex]?.value
                                        // }
                                        value={
                                          siteNameAll[hpc[i].siteNameIndex]
                                            ? siteNameAll[hpc[i].siteNameIndex]
                                            : ""
                                        }
                                        defaultValue={
                                          siteNameAll[hpc[i].siteNameIndex]
                                        }
                                        placeholder={
                                          typeof siteNameAll[
                                            hpc[i].siteNameIndex
                                          ] === "undefined"
                                            ? "Select Site Name"
                                            : siteNameAll[hpc[i].siteNameIndex]
                                        }
                                        // filterOption={createFilter(filterConfig)}
                                      />
                                    </div>
                                  </div>

                                  {/* <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Site Street</label>
                                      <Select
                                        options={siteStreetAll}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onSiteStreetChange(
                                            event,

                                            i
                                          )
                                        }
                                        defaultValue={
                                          siteStreetAll[hpc[i].siteStreetIndex]
                                        }
                                        placeholder={
                                          typeof siteStreetAll[
                                            hpc[i].siteStreetIndex
                                          ] === "undefined"
                                            ? "Select Site Street"
                                            : siteStreetAll[
                                                hpc[i].siteStreetIndex
                                              ]
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Site Post Code</label>
                                      <Select
                                        options={sitePostalCodeAll}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onSitePostCode(
                                            event,

                                            i
                                          )
                                        }
                                        defaultValue={
                                          sitePostalCodeAll[
                                            hpc[i].sitePostCodeIndex
                                          ]
                                        }
                                        placeholder={
                                          typeof sitePostalCodeAll[
                                            hpc[i].sitePostCodeIndex
                                          ] === "undefined"
                                            ? "Select Post Code"
                                            : sitePostalCodeAll[
                                                hpc[i].sitePostCodeIndex
                                              ]
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Site City</label>
                                      <Select
                                        options={siteCityAll}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onSiteCityChange(
                                            event,

                                            i
                                          )
                                        }
                                        defaultValue={
                                          siteStreetAll[hpc[i].siteStreetIndex]
                                        }
                                        placeholder={
                                          typeof siteCityAll[
                                            hpc[i].siteCityIndex
                                          ] === "undefined"
                                            ? "Select Site City"
                                            : siteCityAll[hpc[i].siteCityIndex]
                                        }
                                      />
                                    </div>
                                  </div>*/}

                                  {/* <button onClick={(e) => addMoreSite(i, e)}>
                                    +
                                  </button> */}

                                  {val?.siteDetails?.map((data, index) => {
                                    return (
                                      <>
                                        {/* {index !== 0 ? (
                                          <>
                                            <div className="add-content-form">
                                              <div className="row">
                                                <div className="col-12 col-md-6">
                                                  <div className="form-group">
                                                    <label for="">
                                                      Site number
                                                    </label>
                                                    <input
                                                      type="email"
                                                      className="form-control"
                                                      id="email-desc"
                                                      // name={`${fieldName}.email`}
                                                      onChange={(event) =>
                                                        onSiteNumberChange(
                                                          event,
                                                          index,
                                                          i
                                                        )
                                                      }
                                                      value={data.siteNumber}
                                                    />
                                                  </div>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                  <div className="form-group">
                                                    <label for="">
                                                      Site name
                                                    </label>
                                                    <input
                                                      type="email"
                                                      className="form-control"
                                                      id="email-desc"
                                                      // name={`${fieldName}.email`}
                                                      onChange={(event) =>
                                                        onSiteNameChange(
                                                          event,
                                                          index,
                                                          i
                                                        )
                                                      }
                                                      value={data.siteName}
                                                    />
                                                  </div>
                                                </div>

                                                <div className="col-12 col-md-6">
                                                  <div className="form-group">
                                                    <label for="">
                                                      Site Street
                                                    </label>
                                                    <input
                                                      type="email"
                                                      className="form-control"
                                                      id="email-desc"
                                                      // name={`${fieldName}.email`}
                                                      onChange={(event) =>
                                                        onSiteStreetChange(
                                                          event,
                                                          index,
                                                          i
                                                        )
                                                      }
                                                      value={data.siteStreet}
                                                    />
                                                  </div>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                  <div className="form-group">
                                                    <label for="">
                                                      Site Post Code
                                                    </label>
                                                    <input
                                                      type="email"
                                                      className="form-control"
                                                      id="email-desc"
                                                      // name={`${fieldName}.email`}
                                                      onChange={(event) =>
                                                        onSitePostCode(
                                                          event,
                                                          index,
                                                          i
                                                        )
                                                      }
                                                      value={data.sitePostCode}
                                                    />
                                                  </div>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                  <div className="form-group">
                                                    <label for="">
                                                      Site City
                                                    </label>
                                                    <input
                                                      type="email"
                                                      className="form-control"
                                                      id="email-desc"
                                                      // name={`${fieldName}.email`}
                                                      onChange={(event) =>
                                                        onSiteCityChange(
                                                          event,
                                                          index,
                                                          i
                                                        )
                                                      }
                                                      value={data.siteCity}
                                                    />
                                                  </div>
                                                  <div className="delete_btn">
                                                    {index !== 0 ? (
                                                      <button
                                                        type="button"
                                                        className="btn btn-filled"
                                                        onClick={(e) =>
                                                          removeSite(
                                                            index,
                                                            i,
                                                            e
                                                          )
                                                        }
                                                      >
                                                        <img
                                                          src={
                                                            path_image +
                                                            "delete.svg"
                                                          }
                                                          alt="Add More"
                                                        />
                                                      </button>
                                                    ) : null}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </>
                                        ) : ( */}
                                        <>
                                          <div className="add-content-form">
                                            <div className="row"></div>
                                          </div>
                                        </>
                                        {/* )} */}
                                      </>
                                    );
                                  })}
                                </>
                              ) : null}
                              {/*
                              <div className="col-12 col-md-6 btn_rmv">
                                <div className="form-group">
                                  {i !== 0 && (
                                    <button
                                      type="button"
                                      className="btn btn-filled"
                                      onClick={() => deleteRecord(i)}
                                    >
                                      Remove
                                    </button>
                                  )}
                                </div>
                              </div>
                              */}
                            </div>
                          </div>

                          <div className="hcp-modal-action">
                            <div className="hcp-action-block">
                              {activeManual == "active" ? (
                                <>
                                  {hpc.length > 1 && (
                                    <div className="hcp-remove">
                                      <button
                                        type="button"
                                        className="btn btn-filled"
                                        onClick={() => deleteRecord(i)}
                                      >
                                        <img
                                          src={path_image + "delete.svg"}
                                          alt="Add More"
                                        />
                                      </button>
                                    </div>
                                  )}
                                </>
                              ) : null}
                              <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item add_hcp">
                                  <a
                                    onClick={(e) => addMoreHcp(e)}
                                    className="nav-link active btn-bordered"
                                    data-bs-toggle="tab"
                                    href="javascript:;"
                                  >
                                    {localStorage.getItem("user_id") == userId
                                      ? "Add User +"
                                      : "Add HCP +"}
                                  </a>
                                </li>

                                {/*
                                <li className="nav-item add-file">
                                  <a
                                    onClick={(e) => addFile(e)}
                                    className="nav-link btn-filled"
                                    data-bs-toggle="tab"
                                    href="javascript:;"
                                  >
                                    Add File
                                  </a>
                                </li>
                                */}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </form>

                {/*
                  <form id="add_file" className={"tab-pane" + activeExcel}>
                    <div className="file_upload-box">
                      <div className="upload-file-box">
                        <div className="box">
                          <input
                            type="file"
                            name="file-4[]"
                            id="file-4"
                            className="inputfile inputfile-3"
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            onChange={onFileChange}
                            data-multiple-caption="{count} files selected"
                            multiple
                            // ref={file_name}
                          />

                          {file_name.current?.files === undefined ||
                          file_name.current.files?.length === 0 ? (
                            <>
                              <label htmlFor="file-4">
                                <span>Choose Your File</span>
                              </label>
                              <p>Upload your excel file</p>
                            </>
                          ) : (
                            <h5>{file_name.current.files[0].name}</h5>
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                  */}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary save btn-filled"
              onClick={(e) => {
                saveClickedRd(e);
              }}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>:<Modal
        id="add_hcp"
        show={isOpenAdd}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-hidden="true"
        >
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
            {localStorage.getItem("user_id") == userId?"Add New User +":"Add New HCP"}
            </h5>
            <button
              onClick={() => {
                setIsOpenAdd(false);
                setHpc([
                  {
                    firstname: "",
                    lastname: "",
                    email: "",
                    contact_type: "",
                    country: countryall,
                    countryIndex: "",
                  },
                ]);
                setActiveManual("active");
                // document.querySelector("#file-4").value = "";
                setActiveExcel("");
              }}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="hcp-add-box">
              <div className="hcp-add-form tab-content">
                <form id="add_hcp_form" className={"tab-pane" + activeManual}>
                  {hpc.map((val, i) => {
                    const fieldName = `hpc[${i}]`;
                    return (
                      <>
                        <div className="add_hcp_boxes">
                          <div className="form_action">
                            <div className="row">
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">First Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    onChange={(event) =>
                                      onFirstNameChange(event, i)
                                    }
                                    value={val.firstname}
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">Last Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    onChange={(event) =>
                                      onLastNameChange(event, i)
                                    }
                                    value={val.lastname}
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">
                                    Email <span>*</span>
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="email-desc"
                                    name={`${fieldName}.email`}
                                    onChange={(event) =>
                                      onEmailChange(event, i)
                                    }
                                    value={val.email}
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">Contact Type</label>
                                  <DropdownButton
                                    className="dropdown-basic-button split-button-dropup"
                                    title={
                                      hpc[i].contact_type != "" &&
                                      hpc[i].contact_type != "undefined"
                                        ? hpc[i].contact_type
                                        : "Select Type"
                                    }
                                    onSelect={(event) =>
                                      onContactTypeChange(event, i)
                                    }
                                  >
                                    <Dropdown.Item
                                      eventKey="HCP"
                                      className={
                                        hpc[i].contact_type == "HCP"
                                          ? "active"
                                          : ""
                                      }
                                    >
                                      HCP
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      eventKey="Staff"
                                      className={
                                        hpc[i].contact_type == "Staff"
                                          ? "active"
                                          : ""
                                      }
                                    >
                                      Staff
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      eventKey="Test Users"
                                      className={
                                        hpc[i].contact_type == "Test Users"
                                          ? "active"
                                          : ""
                                      }
                                    >
                                      Test Users
                                    </Dropdown.Item>
                                  </DropdownButton>
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">Country</label>

                                  <Select
                                    options={countryall}
                                    className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                    onChange={(event) =>
                                      onCountryChange(event, i)
                                    }
                                    defaultValue={
                                      countryall[hpc[i].countryIndex]
                                    }
                                    placeholder={
                                      typeof countryall[hpc[i].countryIndex] ===
                                      "undefined"
                                        ? "Select Country"
                                        : countryall[hpc[i].countryIndex]
                                    }
                                    filterOption={createFilter(filterConfig)}
                                    isClearable
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="hcp-modal-action">
                            <div className="hcp-action-block">
                              {activeManual == "active" ? (
                                <>
                                  {hpc.length > 1 && (
                                    <div className="hcp-remove">
                                      <button
                                        type="button"
                                        className="btn btn-filled"
                                        onClick={() => deleteRecord(i)}
                                      >
                                        <img
                                          src={path_image + "delete.svg"}
                                          alt="Add More"
                                        />
                                      </button>
                                    </div>
                                  )}
                                </>
                              ) : null}

                              <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item add_hcp">
                                  <a
                                    onClick={addMoreHcp}
                                    className="nav-link active btn-bordered"
                                    data-bs-toggle="tab"
                                    href="javascript:;"
                                  >
                                  {localStorage.getItem("user_id") == userId?"Add User +":"Add HCP +"}
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </form>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary save btn-filled"
              onClick={saveClicked}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>}


      <CommonConfirmModel
        show={confirmationpopup}
        onClose={setConfirmationPopup}
        fun={deleteReaderRecord}
        resetDataId={clickData}
        popupMessage={{
          message1: "The HCP will be deleted from the list.",
          message2: " Are you sure you want to delete it?",
          footerButton: " Yes please!",
        }}
        path_image={path_image}
      />

      <MessageModel
        show={commanShow}
        onClose={modalClose}
        heading={""}
        data={modalMessage}
        footerButton={"Close"}
        handleSubmit={modalClose}
      />
    </>
  );
};

export default ReadersListAdd;
