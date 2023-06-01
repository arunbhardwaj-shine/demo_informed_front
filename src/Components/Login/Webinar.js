import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import { loader } from "../../loader";
import ReactPlayer from "react-player";
import { ENDPOINT } from "../../axios/apiConfig";
import { postData } from "../../axios/apiHelper";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Form,
  Modal,
  Button,
  NavItem,
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import { HomeValidation } from "../Validations/HomeValidations/HomeValidation";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const Webinar = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  const navigate = useNavigate();
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [userInputs, setUserInputs] = useState({});
  const [userSignInInputs, setUserSignInInputs] = useState({});
  const [activeSection, setActiveSection] = useState("banner-section");
  const [signInModal, setSignInModal] = useState(false);
  const [mapbutton, setMapbutton] = useState(false);
  const [carousalStatus, setCarousalStatus] = useState({
    slide1: true,
    slide2: true,
    slide3: true,
  });
  const [privacyshow, setPrivacyshow] = useState(false);
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const [getOpenVideoPopup, setOpenVideoPopup] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoImage, setVideoImage] = useState("");
  const [selctOptions, setSelectOptions] = useState([
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
  ]);
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
  const [contactFormInputs, setContactFormInputs] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
  });
  const [contactFormError, setContactFormError] = useState({});
  const [forceRender, setForceRender] = useState(false);
  const chartRef = useRef(null);
  let mapData = [
    {
      latitude: 55.7558,
      longitude: 37.6173,
      title: "Moscow",
      webinar_title: "Workshop",
      webinar_title_country: "Russian",
      country: "Moscow",
      purpose:
        "An interactive workshop with a top KOL presenting several of her own illustrative cases. Participants got talking about their current cases, doubts, opinions and best practices with live video calls translated by an interpreter. Everything was unscripted and free-form.",
      auto_mail: "AutoMails",
      ssi_link: "SSi",
      live_participation: "Live Participation",
      live_translation: "Live Translation",
      follow_up: "Segmented auto follow up",
    },
    {
      latitude: 43.814632,
      longitude: 16.978783,
      title: "Zagreb",
      webinar_title: "Workshop",
      webinar_title_country: "English",
      country: "Zagreb",
      purpose:
        "The client hosted an interactive workshop with a top KOL presenting several of her own illustrative cases. Participants got talking about their current cases, doubts, opinions and best practices with live video calls. Everything was unscripted and free-form.",
      auto_mail: "AutoMails",
      ssi_link: "SSi",
      live_participation: "Live Participation",
      live_poll_answer: "Live Poll & answers",
      approval: "Pre-approve written questions",
      follow_up: "Segmented auto follow up",
    },
    {
      latitude: 25.432608,
      longitude: -104.133209,
      title: "Mexico",
      webinar_title: "Trial recruitment",
      webinar_title_country: "Spanish",
      country: "Mexico",
      purpose:
        "A series of webinars aimed at recruting HCPs for an upcoming trial. It was important to verify the HCPs and control access, and to give them options to interact with either live video or chat & written answer.",
      auto_mail: "AutoMails",
      ssi_link: "SSi",
      pre_record_presentation: "Pre-recorded presentation",
      approval: "Pre-approve written questions",
      contact_info: "Contact for more info",
      online_repeat: "Online repeat in portal 1 week",
      follow_up: "Segmented auto follow up",
    },
    {
      latitude: 49.520008,
      longitude: 9.404954,
      title: "Germany",
      webinar_title: "Trial Recruitment",
      webinar_title_country: "Europe",
      country: "Germany",
      purpose:
        "A series of webinars aimed at recruiting HCPs for an upcoming trial. It was important to verify the HCPs and control access, and give them options to interact with either live video call in or chat.",
      auto_mail: "AutoMails",
      ssi_link: "SSi",
      pre_record_presentation: "Pre-recorded presentation",
      approval: "Pre-approve written questions",
      contact_info: "Contact for more info",
      online_repeat: "Online repeat in portal 1 week",
      follow_up: "Segmented auto follow up",
    },
    {
      latitude: 41.0,
      longitude: -75.5,
      title: "New York",
      webinar_title: "Trial Recruitment",
      webinar_title_country: "USA",
      country: "New York",
      purpose:
        "A series of webinars aimed at recruting HCPs for an upcoming trial. It was important to verify the HCPs and control access, and to give them options to interact with either live video or chat & written answer.",
      auto_mail: "AutoMails",
      ssi_link: "SSi",
      pre_record_presentation: "Pre-recorded presentation",
      approval: "Pre-approve written questions",
      contact_info: "Contact for more info",
      online_repeat: "Online repeat in portal 1 week",
      follow_up: "Segmented auto follow up",
    },
    {
      latitude: -32.195246,
      longitude: 24.034088,
      title: "Johannesburg",
      webinar_title: "Pre-market awareness",
      country: "Johannesburg",
      purpose:
        "This was the clients first local webinar and it featured a globally respected KOL in the field. Primary purpose was to start building pre-marketing awareness about a type of treatment and so CPD-accreditation was secured.",
      auto_mail: "AutoMails",
      ssi_link: "SSi",
      approval: "Pre-approve written questions",
      cpd_certificate: "CPD certificate",
      offline_video: "Docintel offline video",
      follow_up: "Segmented auto follow up",
    },
    {
      latitude: -33.883333,
      longitude: 30.049999,
      title: "Durban",
      webinar_title: "Patient awarness",
      country: "Durban",
      purpose:
        "This was a masterclass in practical management of patient care. It was open to both HCPs and patient groups and so email invites was segmented accordingly. Records of attendees are tagged in the client's inforMed.pro account and the automatic follow up was segmented accordingly.",
      auto_mail: "AutoMails",
      ssi_link: "SSi",
      approval: "Pre-approve written questions",
      cpd_certificate: "CPD certificate",
      offline_video: "Docintel offline video",
      follow_up: "Segmented auto follow up",
    },
    {
      latitude: 0.19027,
      longitude: 102.851959,
      title: "Singapore",
      webinar_title: "SEA",
      country: "Singapore",
      purpose:
        "Aimed at HCPs in 6 countries centred around Singapore. Primary target was to start building digital relationships with HCPs. The drive for attendees was through local societies, affiliate sellers, and own reps, all traffic tracked and measured.",
      auto_mail: "AutoMails",
      ssi_link: "SSi",
      live_poll_answer: "Live Poll & answers",
      approval: "Pre-approve written questions",
      offline_video: "Docintel offline video",
      post_survey: "Post Survey",
      follow_up: "Segmented auto follow up",
    },
    {
      latitude: 47.210033,
      longitude: 15.363449,
      title: "Vienna",
      webinar_title: "Investigator meeting",
      country: "Vienna",
      purpose:
        "Instead of flying investigators from around the world in for a physical meeting the client brought investigators from global sites into a 2 day interactive meeting. The investigators interacted with the speakers and each other through a custom branded platform. We helped to prep the many speakers, ran multiple emails to drive HCPs to register and helped them turn up for the 2 days.",
      auto_mail: "AutoMails",
      ssi_link: "SSi",
      live_participation: "Live Participation",
      live_poll_answer: "Live Poll & answers",
      approval: "Pre-approve written questions",
      cpd_certificate: "CPD certificate",
      offline_video: "Docintel offline video",
      post_survey: "Post Survey",
      follow_up: "Segmented auto follow up",
    },
  ];
  let coulums = {
    webinar_title: "",
    webinar_title_country: "",
    country: "",
    purpose: "",
    auto_mail: "AutoMails",
    ssi_link: "Single Sign in links (SSi)",
    pre_record_presentation: "Pre-recorded presentation",
    live_participation: "Live Participation",
    live_poll_answer: "Live Poll & answers",
    approval: "Approval of written questions",
    live_translation: "Live Translation",
    contact_info: "Contact for more info",
    cpd_certificate: "CPD certificate",
    online_repeat: "Online repeat in portal 1 week",
    offline_video: "Docintel offline video",
    post_survey: "Post Survey",
    follow_up: "Segmented auto follow up",
  };

  useEffect(() => {
    let chart = null;

    // Create the map chart
    if (!chart) {
      chart = am4core.create(chartRef.current, am4maps.MapChart);

      chart.seriesContainer.events.on("hit", function (ev) {
        let mapButtons = document.querySelectorAll(".map-button");
        let button = document.getElementById("mapButton");

        mapButtons.forEach((element) => {
          element.classList.remove("active");
        });
        button.classList.add("active");
        let element = document.getElementById("chartdiv");
        element.classList.remove("compare-data");

        if (ev.event == undefined || ev.event.target.tagName != "image") {
          chart.closeAllPopups();
        }
      });

      document
        .getElementById("compareButton")
        .addEventListener("click", (event) => {
          chart.closeAllPopups();
          var html = '<table width="90%">';

          for (var key in coulums) {
            let itemsForSkip = [
              "webinar_title",
              "webinar_title_country",
              "country",
              "purpose",
            ];

            html += `<tr><td >${coulums[key]}</td>`;
            mapData.forEach((v) => {
              var element =
                v[key] != undefined
                  ? '<img width="15"  src="https://informed.pro/img/webinar/slider-over-img.png"'
                  : "";
              if (itemsForSkip.includes(key)) {
                element = v[key] != undefined ? v[key] : "";
              }
              html += `<td class=${key}>${element}</td>`;
            });
            html += `</tr>`;
          }

          html += `</table>`;

          chart.openPopup(`${html}`);

          let mapButtons = document.querySelectorAll(".map-button");

          mapButtons.forEach((element) => {
            element.classList.remove("active");
          });

          let element = document.getElementById("chartdiv");
          element.classList.add("compare-data");
          event.target.classList.add("active");
        });

      document
        .getElementById("mapButton")
        .addEventListener("click", (event) => {
          chart.closeAllPopups();

          let mapButtons = document.querySelectorAll(".map-button");

          mapButtons.forEach((element) => {
            element.classList.remove("active");
          });
          let element = document.getElementById("chartdiv");
          element.classList.remove("compare-data");
          event.target.classList.add("active");
        });

      chart.geodata = am4geodata_worldLow;

      let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        chart.maxZoomLevel = 5;
      } else {
        chart.maxZoomLevel = 1;
      }
      // chart.projection = new am4maps.projections.Miller();
      chart.chartContainer.wheelable = false;
      const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.useGeodata = true;

      // Configure series data
      const polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = "";
      polygonTemplate.fill = am4core.color("#ffffff");
      polygonTemplate.stroke = am4core.color("#f8f9fc");
      // Add points to the map based on latitude and longitude
      const imageSeries = chart.series.push(new am4maps.MapImageSeries());
      const imageSeriesTemplate = imageSeries.mapImages.template;
      let marker = imageSeriesTemplate.createChild(am4core.Image);
      marker.href = `https://informed.pro/img/webinar/slider-over-img.png`;
      marker.width = 20;
      marker.height = 20;
      marker.nonScaling = true;
      marker.tooltipText = "{title}";
      marker.horizontalCenter = "middle";
      marker.verticalCenter = "bottom";

      imageSeriesTemplate.propertyFields.latitude = "latitude";
      imageSeriesTemplate.propertyFields.longitude = "longitude";
      imageSeries.data = mapData;
      // Zoom and center the map on the highlighted points
      chart.homeZoomLevel = 0.5;

      chart.homeGeoPoint = {
        latitude: mapData[0].latitude,
        longitude: mapData[0].longitude,
      };
      imageSeriesTemplate.events.on("over", function (ev) {
        //console.log(ev.target.dataItem.dataContext.title)

        let arr = ["Mexico", "New York", "Germany"];
        if (!arr.includes(ev.target.dataItem.dataContext.title)) {
          return;
        }

        var lineSeries = chart.series.push(new am4maps.MapArcSeries());
        lineSeries.mapLines.template.strokeWidth = 1;
        lineSeries.mapLines.template.stroke = am4core.color("#c5c9cd");
        lineSeries.data = [
          {
            multiGeoLine: [
              [
                { latitude: 49.520008, longitude: 9.404954 },
                { latitude: 42.5, longitude: -76.0 },
                { latitude: 25.432608, longitude: -104.133209 },
                { latitude: 49.520008, longitude: 9.404954 },
              ],
            ],
          },
        ];

        lineSeries.mapLines.template.line.controlPointDistance = 0;
        lineSeries.mapLines.template.line.controlPointPosition = 0;
        lineSeries.tooltip.background.fill = am4core.color("#67b7dc");
      });

      imageSeriesTemplate.events.on("out", function (ev) {
        let arr = ["Mexico", "New York", "Germany"];
        if (!arr.includes(ev.target.dataItem.dataContext.title)) {
          return;
        }

        var lineSeries = chart.series.pop(new am4maps.MapArcSeries());
      });

      imageSeriesTemplate.events.on("hit", function (ev) {
        chart.closeAllPopups();

        let webinar_title = `<p class="webinar_title">${ev.target.dataItem.dataContext.webinar_title}</p>`;
        let webinar_title_country = `<p class="webinar_title_country">${ev.target.dataItem.dataContext.webinar_title_country}</p>`;

        let country = `<p class="country_name">${ev.target.dataItem.dataContext.country}</p>`;
        let purpose = `<p class="purpose">${ev.target.dataItem.dataContext.purpose}</p>`;
        let auto_mail = `<li><span></span>${ev.target.dataItem.dataContext.auto_mail}</li>`;
        let ssi_link = `<li><span></span>${ev.target.dataItem.dataContext.ssi_link}</li>`;
        let pre_record_presentation = `<li><span></span>${ev.target.dataItem.dataContext.pre_record_presentation}</li>`;
        let live_participation = `<li><span></span>${ev.target.dataItem.dataContext.live_participation}</li>`;
        let live_poll_answer = `<li><span></span>${ev.target.dataItem.dataContext.live_poll_answer}</li>`;
        let approval = `<li><span></span>${ev.target.dataItem.dataContext.approval}</li>`;
        let live_translation = `<li><span></span>${ev.target.dataItem.dataContext.live_translation}</li>`;
        let contact_info = `<li><span></span>${ev.target.dataItem.dataContext.contact_info}</li>`;
        let cpd_certificate = `<li><span></span>${ev.target.dataItem.dataContext.cpd_certificate}</li>`;
        let online_repeat = `<li><span></span>${ev.target.dataItem.dataContext.online_repeat}</li>`;
        let offline_video = `<li><span></span>${ev.target.dataItem.dataContext.offline_video}</li>`;
        let post_survey = `<li><span></span>${ev.target.dataItem.dataContext.post_survey}</li>`;
        let follow_up = `<li><span></span>${ev.target.dataItem.dataContext.follow_up}</li>`;

        let popup = chart.openPopup(`${
          ev.target.dataItem.dataContext.webinar_title ? webinar_title : ""
        }
                  ${
                    ev.target.dataItem.dataContext.webinar_title_country
                      ? webinar_title_country
                      : ""
                  }
                   ${ev.target.dataItem.dataContext.country ? country : ""}
                   ${ev.target.dataItem.dataContext.purpose ? purpose : ""}
                   ${ev.target.dataItem.dataContext.ssi_link ? ssi_link : ""}
                   ${ev.target.dataItem.dataContext.auto_mail ? auto_mail : ""}
                   ${
                     ev.target.dataItem.dataContext.pre_record_presentation
                       ? pre_record_presentation
                       : ""
                   }
                   ${
                     ev.target.dataItem.dataContext.live_participation
                       ? live_participation
                       : ""
                   }
                   ${
                     ev.target.dataItem.dataContext.live_poll_answer
                       ? live_poll_answer
                       : ""
                   }
                   ${ev.target.dataItem.dataContext.approval ? approval : ""}
                   ${
                     ev.target.dataItem.dataContext.live_translation
                       ? live_translation
                       : ""
                   }
                   ${
                     ev.target.dataItem.dataContext.contact_info
                       ? contact_info
                       : ""
                   }
                   ${
                     ev.target.dataItem.dataContext.cpd_certificate
                       ? cpd_certificate
                       : ""
                   }
                   ${
                     ev.target.dataItem.dataContext.online_repeat
                       ? online_repeat
                       : ""
                   }
                   ${
                     ev.target.dataItem.dataContext.offline_video
                       ? offline_video
                       : ""
                   }
                   ${
                     ev.target.dataItem.dataContext.post_survey
                       ? post_survey
                       : ""
                   }
                   ${ev.target.dataItem.dataContext.follow_up ? follow_up : ""}
                   `);
        chart.modal.container = document.body;

        popup.left = ev.svgPoint.x + 0;
        popup.top = ev.svgPoint.y + 1;
        //popup.showCurtain = true;
      });
    }
    const handlePrevClick = () => {
      // event.preventDefault();
      const ampopupInside = document.querySelector(".ampopup-inside");
      const scrollLeftValue = ampopupInside.scrollLeft;

      const totalWidth = document.querySelector(
        ".ampopup-inside table"
      ).offsetWidth;
      const popupWidth = ampopupInside.offsetWidth;
      const movableWidth = totalWidth - popupWidth;
      const rightOffset = movableWidth - scrollLeftValue;

      if (rightOffset > 0) {
        document.querySelector(".horizon-next").classList.add("show-next");
      }

      if (scrollLeftValue <= 350) {
        document.querySelector(".horizon-prev").classList.remove("show-prev");
      }

      ampopupInside.scrollBy({
        left: -350,
        behavior: "smooth",
      });
    };
    const handleNextClick = () => {
      // event.preventDefault();
      const ampopupInside = document.querySelector(".ampopup-inside");
      const scrollLeftValue = ampopupInside.scrollLeft;
      const scrollTarget = scrollLeftValue + 350;

      const totalWidth = document.querySelector(
        ".ampopup-inside table"
      ).offsetWidth;
      const popupWidth = ampopupInside.offsetWidth;
      const movableWidth = totalWidth - popupWidth;
      const rigthOffset = movableWidth - scrollLeftValue;

      if (rigthOffset <= 350) {
        document.querySelector(".horizon-next").classList.remove("show-next");
      }

      if (scrollLeftValue > 0) {
        document.querySelector(".horizon-prev").classList.add("show-prev");
      }

      ampopupInside.scrollTo({
        left: scrollTarget,
        behavior: "smooth",
      });
    };
    document
      .querySelector(".horizon-prev")
      .addEventListener("click", handlePrevClick);
    document
      .querySelector(".horizon-next")
      .addEventListener("click", handleNextClick);

    return () => {
      // Clean up chart when component unmounts
      if (chart) {
        chart.dispose();
        chart = null;
      }
    };
  }, []);

  const handleShow = (type) => {
    if (type == "forgot") {
      setShow(true);
    } else {
      setPrivacyshow(true);
    }
  };

  const handleChange = (e, isSelectedName) => {
    setUserInputs({
      ...userInputs,
      [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
        ? e?.target?.files
          ? e?.target?.files
          : e
        : e?.target?.value,
    });
  };
  const handleContactFormChange = (e, isSelectedName) => {
    setContactFormInputs({
      ...contactFormInputs,
      [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
        ? e?.target?.files
          ? e?.target?.files
          : e
        : e?.target?.value,
    });
  };

  // const clickSignInButton = (e) => {
  //   e.preventDefault();
  //   setSignInModal(true);
  // };

  const handleSignInChange = async (e, isSelectedName) => {
    if (e?.target?.files?.length < 1) {
      return;
    }
    setUserSignInInputs({
      ...userSignInInputs,
      [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
        ? e?.target?.files
          ? e?.target?.files
          : e
        : e?.target?.value,
    });
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    if (!userInputs?.username && !userInputs?.password) {
      setShowError("Please enter a username and password");
    } else if (userInputs?.username === "") {
      setShowError("Please enter a username");
    } else if (userInputs?.password === "") {
      setShowError("Please enter a password");
    } else {
      setShowError(null);
      loader("show");
      try {
        const res = await postData(ENDPOINT.LOGIN, {
          email: userInputs?.username,
          password: userInputs?.password,
        });

        localStorage.clear();
        localStorage.setItem("user_id", res?.data?.data?.userToken);
        localStorage.setItem("group_id", res?.data?.data?.groupId);
        localStorage.setItem("webinar_flag", res?.data?.data?.webinar_flag);
        localStorage.setItem("name", res?.data?.data?.name);
        localStorage.setItem("decrypted_token", res?.data?.data?.jwtToken);
        loader("hide");
        if (res?.data?.data?.webinar_flag == 1) {
          window.location.href =
            "https://informed.pro/Webinar/readers_webinar?rdylr=" +
            res?.data?.data?.userToken;
        } else {
          navigate("/home");
        }
      } catch (err) {
        console.log(err);
        setShowError(err?.response?.data?.message);
        loader("hide");
      }
    }
  };

  // const handleClose = () => {
  //   setSignInModal(false);
  // };

  const handleClose = (type) => {
    if (type == "forgot") {
      setShow(false);
    } else {
      setPrivacyshow(false);
    }
  };
  const changeSliderTab = (event) => {
    if (event.target.tagName === "IMG") {
      const parentLi = event.target.parentNode;
      var slide = parentLi.getAttribute("data-slide-to");
    } else if (event.target.tagName === "LI") {
      var slide = event.target.getAttribute("data-slide-to");
    } else if (event.target.tagName === "SPAN") {
      const parentLi = event.target.parentNode;
      var slide = parentLi.getAttribute("data-slide-to");
    }

    //var activeSlide = event.target.getAttribute('data-slide-active');
    var checkbox = document.getElementById("s" + slide);
    checkbox.checked = true; // Checks the box

    var slideTabs = document.querySelectorAll(".slide-tab");
    slideTabs.forEach(function (slideTab) {
      slideTab.classList.remove("active");
    });
    var images = document.querySelectorAll(".img-fluid");
    images.forEach(function (image) {
      image.classList.remove("active");
    });
    if (event.target.tagName === "IMG") {
      const parentLi = event.target.parentNode;
      parentLi.classList.add("active");
    } else if (event.target.tagName === "SPAN") {
      const parentLi = event.target.parentNode;
      parentLi.classList.add("active");
    } else if (event.target.tagName === "LI") {
      event.target.classList.add("active");
    }

    var labels = document.querySelectorAll("label");
    labels.forEach(function (label) {
      label.classList.remove("left-slide");
    });

    var activeSlide = document.getElementById("slide" + slide);
    activeSlide.classList.add("left-slide");
    setTimeout(function () {
      labels.forEach(function (label) {
        label.classList.remove("active");
      });
      activeSlide.classList.add("active");
      var activeSlideImage = activeSlide.querySelector("img");
      activeSlideImage.classList.add("active");
    }, 1000);
  };

  const changeSlider = (event) => {
    var slide = event.target.value;
    var slideTabs = document.querySelectorAll(".slide-tab");
    slideTabs.forEach(function (slideTab) {
      slideTab.classList.remove("active");
    });
    var images = document.querySelectorAll(".img-fluid");
    images.forEach(function (image) {
      image.classList.remove("active");
    });

    var activeSlideTab = document.getElementById("slide-tab" + slide);
    activeSlideTab.classList.add("active");

    var labels = document.querySelectorAll("label");
    labels.forEach(function (label) {
      label.classList.remove("left-slide");
    });

    var activeSlide = document.getElementById("slide" + slide);
    activeSlide.classList.add("left-slide");

    setTimeout(function () {
      labels.forEach(function (label) {
        label.classList.remove("active");
      });
      activeSlide.classList.add("active");
      var activeSlideImage = activeSlide.querySelector("img");
      activeSlideImage.classList.add("active");
    }, 1000);
  };

  // for send email forgetpassword
  const onSendEmail = async (event) => {
    event.preventDefault();
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (email.trim() === "") {
      setErrorMsg("Please enter your email.");
    } else if (!emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email address.");
    } else {
      loader("show");
      try {
        const res = await postData(ENDPOINT.FORGET, {
          email: email,
        });
        loader("hide");
        setEmail("");
        setErrorMsg(null);
        setSuccessMsg(res?.data?.message);
        // setShow(false)
      } catch (err) {
        setSuccessMsg(null);
        setErrorMsg(err?.response?.data?.message);
        loader("hide");
      }
    }
  };
  const submitContactForm = async (event) => {
    event.preventDefault();

    const err = HomeValidation(contactFormInputs);
    if (Object.keys(err)?.length) {
      setContactFormError(err);
      return;
    } else {
      loader("show");
      try {
        const res = await postData(ENDPOINT.INFORMED_USER_FORM, {
          name: contactFormInputs?.name?.trim(),
          email: contactFormInputs?.email?.trim(),
          phone: contactFormInputs?.phone?.trim(),
          company: contactFormInputs?.company?.trim(),
          country: contactFormInputs?.country?.trim(),
          comment: contactFormInputs?.comment?.trim(),
        });

        let obj = {};
        setContactFormInputs(obj);
        setContactFormError(false);
        setForceRender(!forceRender);
        loader("hide");
      } catch (err) {
        console.log(err);
        loader("hide");
      }
    }
  };

  const watchVideo = (slideType) => {
    if (slideType == "slide1") {
      setVideoUrl("https://informed.pro/webinar/assets/img/post-webinar.mp4");
      setVideoImage("https://informed.pro/img/webinar/post-webinar.png");
      setOpenVideoPopup(true);
    } else if (slideType == "slide2") {
      setVideoUrl(
        "https://informed.pro/webinar/assets/img/audience-engagement.mp4"
      );
      setVideoImage("https://informed.pro/img/webinar/audience-engagement.png");
      setOpenVideoPopup(true);
    } else if (slideType == "slide3") {
      setVideoUrl("https://informed.pro/webinar/assets/img/pre-webinar.mp4");
      setVideoImage("https://informed.pro/img/webinar/pre-webinar.png");
      setOpenVideoPopup(true);
    }
  };

  return (
    <>
      <div className="loader" id="custom_loader">
        <div className="loader_show">
          <span className="loader-view"> </span>
        </div>
      </div>

      <div className="informed">
        <div className="informed-header header">
          <div className="custom-container">
            <Navbar expand="lg" className="webinar-nav">
              <Navbar.Brand href="#home">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50.333"
                  height="50.322"
                  viewBox="0 0 50.333 50.322"
                >
                  {" "}
                  <g
                    id="Group_121"
                    data-name="Group 121"
                    transform="translate(-949.788 -26.964)"
                  >
                    {" "}
                    <g
                      id="Group_6"
                      data-name="Group 6"
                      transform="translate(939.85 17)"
                    >
                      {" "}
                      <g
                        id="Group_5"
                        data-name="Group 5"
                        transform="translate(9.939 9.964)"
                      >
                        {" "}
                        <path
                          id="Path_212"
                          data-name="Path 212"
                          d="M94.241,41.237l-.006,0A25.174,25.174,0,1,0,68.7,66.356v.008h.182c.127,0,.253,0,.379,0H94.241Z"
                          transform="translate(-43.907 -16.044)"
                          fill="#fff"
                        />{" "}
                        <path
                          id="Path_213"
                          data-name="Path 213"
                          d="M89.736,60.758a16.572,16.572,0,0,1-10.909,5.249,2.3,2.3,0,0,1-1.838-.708l-.009-.009a7.359,7.359,0,0,1-1.052-8.773l2.43,1.651-1.543-7.615-7.089,1.871,2.353,1.493a11.817,11.817,0,0,0-1.661,6.97A11.6,11.6,0,0,0,71.464,64.9,16.651,16.651,0,0,1,62.332,42.72a2.923,2.923,0,0,1,1.97-1.647,7.359,7.359,0,0,1,8.123,3.476l-2.645,1.278L77.148,48.3l1.924-7.075L76.6,42.515a11.715,11.715,0,0,0-9.478-6.047A16.635,16.635,0,0,1,91.207,39.9a2.661,2.661,0,0,1,.371,2.282l0,.015a7.406,7.406,0,0,1-7.068,5.3h0l.215-2.929-5.824,5.145,5.165,5.2.116-2.784a11.712,11.712,0,0,0,9.863-5.022,16.821,16.821,0,0,1,.16,2.311,16.576,16.576,0,0,1-4.462,11.337M77.563,28.952A20.448,20.448,0,1,0,98.01,49.4,20.448,20.448,0,0,0,77.563,28.952"
                          transform="translate(-52.287 -24.234)"
                          fill="#0066be"
                        />{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>{" "}
                </svg>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="webinar-login" />
              <Navbar.Collapse id="webinar-login">
                <Nav className="justify-content-start">
                  <NavItem className="nav-item active">
                    <a className="nav-link" href="#building-section">
                      Relationships <span className="sr-only">(current)</span>
                    </a>
                  </NavItem>
                  <NavItem className="nav-item">
                    <a className="nav-link" href="#feature">
                      Features
                    </a>
                  </NavItem>
                  <NavItem className="nav-item">
                    <a className="nav-link" href="#testimonial">
                      Testimonial
                    </a>
                  </NavItem>
                  <NavItem className="nav-item">
                    <a className="nav-link" href="#cases">
                      Cases
                    </a>
                  </NavItem>
                  <NavItem className="nav-item">
                    <a className="nav-link" href="#request_demo">
                      Request Demo
                    </a>
                  </NavItem>
                  <NavDropdown title="Sign in">
                    <Form onSubmit={handleLogin}>
                      <Form.Control
                        type="text"
                        placeholder="Username"
                        className="form-field"
                        aria-label="Name"
                        name="username"
                        autoComplete="off"
                        onChange={handleChange}
                      />
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        className="form-field"
                        aria-label="Password"
                        autoComplete="off"
                        name="password"
                        onChange={handleChange}
                      />
                      {showError && <p style={{ color: "red" }}>{showError}</p>}
                      <Button variant="outline-success" type="submit">
                        Go
                      </Button>
                      <p
                        onClick={(e) => handleShow("forgot")}
                        className="forgot-link"
                      >
                        Forgot password?
                      </p>
                    </Form>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </div>
        {/* ---------------header section ends here------------- */}
        {/* ---------------banner section start here------------- */}
        <div className="fixed_div"></div>
        <section
          className="banner-section"
          idd="11"
          id="banner-section"
          data-anchor="banner-section"
        >
          <div className="container">
            <div className="row">
              <div
                className="col-md-6 left-sec"
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                <div className="content">
                  <ul>
                    <li>Docintel</li>
                    <li>Webinars</li>
                  </ul>
                  <h1>Building long term relationships with HCP’s</h1>
                </div>
              </div>
              <div className="col-md-6 right-sec">
                <div className="right-banner">
                  <img
                    data-aos="fade-up"
                    data-aos-duration="1300"
                    src={path_image + "banner-main.png"}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="know-how-link">
          <div className="container">
            <div className="row">
              <div className="want-more" id="scroll-img">
                <a href="#building-section">Want to know how?</a>
              </div>
            </div>
          </div>
        </div>
        {/* <!---------------banner section ends here--------------> */}

        {/* <!------------------scroll-sec-----------------> */}
        <div className="scroll-sec demo" id="section07" data-anchor="section07">
          <a href="#building-section" id="scroll-img">
            <img src={path_image + "scroll-down.png"} alt="" width="25px" />
          </a>
          <div className="animated-arrow">
            <a href="#building-section">
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
        </div>
        {/* <section id="section07" className="demo">
  <a href="#section08"><span></span><span></span><span></span>Scroll</a>
</section>  */}
        {/* <!------------------scroll-sec ends here------------------> */}

        {/* <!---------------building-real section start here--------------> */}

        <section
          className="building-section common"
          idd="22"
          id="building-section"
          data-anchor="building-section"
        >
          <div className="container">
            <h2 data-aos="fade-right" data-aos-duration="1000">
              Building Relationships
            </h2>
            <div className="row">
              <div
                className="col-md-5 left-sec"
                data-aos="fade-right"
                data-aos-duration="1300"
              >
                <div className="content">
                  <div className="video-sec">
                    <img src={path_image + "jdflindtWebinar.png"} alt="video" />
                  </div>
                  <p>
                    We believe that consented, databased relationships last
                    longer.
                  </p>
                  <p>
                    Our platform helps deliver more engaging webinars that
                    become an integral part of your marketing campaign.
                  </p>
                  <p>
                    It places webinars within the strategy of building an
                    on-going dialogue; continually learning what each Health
                    Care Professional (HCP) wants.
                  </p>
                  <span className="name">
                    <i>Jacob Flindt</i>
                  </span>
                  <span className="degntn">CEO</span>
                </div>
                {/* <!-- <div className="want-more"><a href="#">Want to know how?</a></div> --> */}
              </div>
              <div
                className="col-md-7 right-sec"
                data-aos="fade-left"
                data-aos-duration="1300"
              >
                <div className="mt-5 mb-5">
                  <div className="row">
                    <div className="col-md-12 space-left">
                      <ul className="timeline">
                        <li>
                          <span>
                            <img src={path_image + "build1.png"} alt="" />
                          </span>
                          <p className="float-right">Capture consent</p>
                        </li>
                        <li>
                          <span>
                            <img src={path_image + "build2.png"} alt="" />
                          </span>
                          <p className="float-right">
                            Engage HCP’s with speakers at Webinars
                          </p>
                        </li>
                        <li>
                          <span>
                            <img src={path_image + "build3.png"} alt="" />
                          </span>
                          <p className="float-right">
                            Analyse HCP Webinar behaviour using our bespoke
                            system
                          </p>
                        </li>
                        <li>
                          <span>
                            <img src={path_image + "diagram.png"} alt="" />
                          </span>
                          <p className="float-right">
                            Our system creates automatic segmentation and
                            AutoMail
                          </p>
                        </li>
                        <li>
                          <span>
                            <img src={path_image + "build5.png"} alt="" />
                          </span>
                          <p className="float-right">
                            HCP’s can download Docintel app to watch previous
                            webinars
                          </p>
                        </li>
                        <li>
                          <span>
                            <img src={path_image + "build6.png"} alt="" />
                          </span>
                          <p className="float-right">
                            Personalise future invites and interactions based on
                            RWE.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!---------------building-real section Ends here--------------> */}

        {/* <!---------------platform feature section star here-----------> */}
        <section
          className="tech-section why-choose-section system-section common"
          idd="33"
          id="feature"
          data-anchor="feature"
        >
          <div className="container">
            <div className="row">
              {/* <!-- <div className="why-heading m-100 pl-3">

  </div> --> */}

              <div className="col-md-12 d-flex justify-content-between">
                <h2 data-aos="fade-up" data-aos-duration="1000">
                  Platform Features
                </h2>
                <a
                  href="https://docintel.app/Webinar/Docintel/login.php"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  className="btnn"
                >
                  Request Demo
                </a>
              </div>
            </div>
          </div>
          <div className="cycle-slide">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div
                    id="blogCarousel"
                    className="carousel slide row "
                    data-ride="carousel"
                  >
                    <div
                      className="col-md-8 col-sm-8 col-8 cst-cs-item pl-0"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                    >
                      <div id="slider">
                        <input
                          type="radio"
                          className="slide-radio"
                          name="slide-radio"
                          id="s1"
                          value="1"
                          onClick={(e) => changeSlider(e)}
                        />
                        <input
                          type="radio"
                          className="slide-radio"
                          name="slide-radio"
                          id="s2"
                          value="2"
                          onClick={(e) => changeSlider(e)}
                        />
                        <input
                          type="radio"
                          className="slide-radio"
                          name="slide-radio"
                          id="s3"
                          value="3"
                          checked
                          onClick={(e) => changeSlider(e)}
                        />
                        {/* <input type="radio" className="slide-radio" name="slide-radio" id="s4" checked value="4"> */}
                        <label htmlFor="s1" id="slide1">
                          <img
                            src={path_image + "post-webinar.png"}
                            className="img-fluid"
                            alt=""
                          />
                          <div className="div-left-text caption-crausal">
                            <div
                              className={
                                carousalStatus?.slide1
                                  ? "caption-crausal-inside collapse show"
                                  : "caption-crausal-inside collapse"
                              }
                              id="slide_content"
                            >
                              <p>
                                <span className="caption-img">
                                  <img
                                    src={path_image + "slider-over-img.png"}
                                    alt="sdlc-icon"
                                  />
                                </span>
                                Your choice of streaming technology
                              </p>
                              <p>
                                <span className="caption-img">
                                  <img
                                    src={path_image + "slider-over-img.png"}
                                    alt="sdlc-icon"
                                  />
                                </span>
                                Automated interactions
                                <ul>
                                  <li>Calendar invites</li>
                                  <li>Auto mail reminders</li>
                                  <li>Single Sign-in (SSi) to webinars</li>
                                </ul>
                              </p>
                              <p>
                                <span className="caption-img">
                                  <img
                                    src={path_image + "slider-over-img.png"}
                                    alt="sdlc-icon"
                                  />
                                </span>
                                Compliance simplified
                                <ul>
                                  <li>You control who has access</li>
                                  <li>
                                    Pre- registration set to custom regulation
                                  </li>
                                  <li>GDPR/CCPA compliant </li>
                                </ul>
                              </p>
                            </div>
                            <div className="caption-crausal-footer">
                              <button
                                className="btn btn-link"
                                type="button"
                                data-toggle="collapse"
                                data-target="#slide_content"
                                onClick={() =>
                                  setCarousalStatus((carousalStatus) => ({
                                    ...carousalStatus,
                                    slide1: !carousalStatus.slide1,
                                  }))
                                }
                              >
                                <img
                                  src={path_image + "down-arrow1.png"}
                                  alt=""
                                />
                              </button>
                              <div className="watch-demo-video">
                                {/*<a className="watch-demo" data-toggle="modal" data-target="#video1">Watch Video</a>*/}
                                <button
                                  className="watch-demo"
                                  onClick={(e) => watchVideo("slide1")}
                                >
                                  Watch Video
                                </button>
                              </div>
                            </div>
                          </div>
                        </label>
                        <label htmlFor="s2" id="slide2">
                          <img
                            src={path_image + "audience-engagement.png"}
                            className="img-fluid"
                            alt=""
                          />
                          <div className="div-left-text caption-crausal">
                            <div
                              className={
                                carousalStatus?.slide2
                                  ? "caption-crausal-inside collapse show"
                                  : "caption-crausal-inside collapse"
                              }
                              id="slide_content_two"
                            >
                              <p>
                                <span className="caption-img">
                                  <img
                                    src={path_image + "slider-over-img.png"}
                                    alt="sdlc-icon"
                                  />
                                </span>
                                Set up your URL and bespoke branding
                              </p>
                              <p>
                                <span className="caption-img">
                                  <img
                                    src={path_image + "slider-over-img.png"}
                                    alt="sdlc-icon"
                                  />
                                </span>
                                Build email templates, AutoMails and calendar
                                reminders
                              </p>
                              <p>
                                <span className="caption-img">
                                  <img
                                    src={path_image + "slider-over-img.png"}
                                    alt="sdlc-icon"
                                  />
                                </span>
                                Invite your audience your way or through us
                              </p>
                              <p>
                                <span className="caption-img">
                                  <img
                                    src={path_image + "slider-over-img.png"}
                                    alt="sdlc-icon"
                                  />
                                </span>
                                Gain consent to stay in touch post webinar.
                              </p>
                            </div>
                            <div className="caption-crausal-footer">
                              <button
                                className="btn btn-link"
                                type="button"
                                data-toggle="collapse"
                                data-target="#slide_content_two"
                                onClick={() =>
                                  setCarousalStatus((carousalStatus) => ({
                                    ...carousalStatus,
                                    slide2: !carousalStatus.slide2,
                                  }))
                                }
                              >
                                <img
                                  src={path_image + "down-arrow1.png"}
                                  alt=""
                                />
                              </button>
                              <div className="watch-demo-video">
                                <button
                                  className="watch-demo"
                                  onClick={(e) => watchVideo("slide2")}
                                >
                                  Watch Video
                                </button>
                              </div>
                            </div>
                          </div>
                        </label>
                        <label htmlFor="s3" id="slide3" className="active">
                          <img
                            src={path_image + "pre-webinar.png"}
                            className="img-fluid active"
                            alt=""
                          />
                          <div className="div-left-text caption-crausal">
                            <div
                              className={
                                carousalStatus?.slide3
                                  ? "caption-crausal-inside collapse show"
                                  : "caption-crausal-inside collapse"
                              }
                              id="slide-content3"
                            >
                              <div className="caption-crausal-inside-top">
                                <span>1 WEEK</span>
                                <p>Setup Time</p>
                              </div>
                              <p>
                                <span className="caption-img">
                                  <img
                                    src={path_image + "slider-over-img.png"}
                                    alt="sdlc-icon"
                                  />
                                </span>
                                Interactive: encouraging active participation
                                <ul>
                                  <li>Live video questions</li>
                                  <li>Written questions (pre-screen option)</li>
                                  <li>On screen polls</li>
                                </ul>
                              </p>
                              <p>
                                <span className="caption-img">
                                  <img
                                    src={path_image + "slider-over-img.png"}
                                    alt="sdlc-icon"
                                  />
                                </span>
                                Monitor your audience
                                <ul>
                                  <li>Remove unwanted guests</li>
                                  <li>Learn who stays</li>
                                </ul>
                              </p>
                            </div>
                            <div className="caption-crausal-footer">
                              <button
                                className="btn btn-link"
                                type="button"
                                data-toggle="collapse"
                                data-target="#slide-content3"
                                onClick={() =>
                                  setCarousalStatus((carousalStatus) => ({
                                    ...carousalStatus,
                                    slide3: !carousalStatus.slide3,
                                  }))
                                }
                              >
                                <img
                                  src={path_image + "down-arrow1.png"}
                                  alt=""
                                />
                              </button>
                              <div className="watch-demo-video">
                                <button
                                  className="watch-demo"
                                  onClick={(e) => watchVideo("slide3")}
                                >
                                  Watch Video
                                </button>
                              </div>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                    <div
                      className="col-md-4 col-sm-4 col-4 left-sdd"
                      data-aos="fade-down"
                      data-aos-duration="1000"
                    >
                      <ol className="carousel-indicators cst-tab">
                        <li
                          data-target="#blogCarousel"
                          data-slide-to="3"
                          data-slide-active="1"
                          id="slide-tab3"
                          className="slide-tab active"
                          onClick={(e) => changeSliderTab(e)}
                        >
                          <img
                            className="without-active"
                            src={path_image + "feature2.png"}
                            alt=""
                          />
                          <img
                            className="with-active"
                            src={path_image + "feature-active2.png"}
                            alt=""
                          />
                          Getting Started <span>Pre-Webinar</span>
                        </li>
                        <li
                          data-target="#blogCarousel"
                          data-slide-to="2"
                          data-slide-active="2"
                          className="slide-tab"
                          id="slide-tab2"
                          onClick={(e) => changeSliderTab(e)}
                        >
                          <img
                            className="without-active"
                            src={path_image + "feature3.png"}
                            alt=""
                          />
                          <img
                            className="with-active"
                            src={path_image + "feature-active3.png"}
                            alt=""
                          />
                          Audience Engagement <span>Webinar</span>
                        </li>
                        <li
                          data-target="#blogCarousel"
                          data-slide-to="1"
                          data-slide-active="3"
                          id="slide-tab1"
                          className="slide-tab"
                          onClick={changeSliderTab}
                        >
                          <img
                            className="without-active"
                            src={path_image + "feature4.png"}
                            alt=""
                          />
                          <img
                            className="with-active"
                            src={path_image + "feature-active4.png"}
                            alt=""
                          />
                          Relationship Building <span>Post-Webinar</span>
                        </li>
                        {/*<li
                          data-target="#blogCarousel"
                          data-slide-to="3"
                          className=""
                        >
                          <img
                            className="without-active"
                            src={path_image + "feature4.png"}
                            alt=""
                          />
                          <img
                            className="with-active"
                            src={path_image + "feature-active4.png"}
                            alt=""
                          />
                          Relationship Building <span>Post-Webinar</span>
                        </li>*/}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!---------------platform feature section ends here-------------> */}

        {/* <!--------------effective webinar section start here--------------> */}
        <section
          className="effective-section common"
          idd="44"
          id="testimonial"
          data-anchor="testimoniial"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2 data-aos="fade-right" data-aos-duration="1500">
                  effective webinars
                </h2>
              </div>
              <div className="col-md-8">
                <ul className="efft-list">
                  <li data-aos="fade-right" data-aos-duration="1000">
                    <span>
                      <img src={path_image + "effect1.png"} alt="" />
                    </span>
                    <p>Gathering HCP's together</p>
                  </li>
                  <li data-aos="fade-left" data-aos-duration="1000">
                    <span>
                      <img src={path_image + "effect3.png"} alt="" />
                    </span>
                    <p>Sharing new information and the latest learnings</p>
                  </li>
                  <li data-aos="fade-right" data-aos-duration="1000">
                    <span>
                      <img src={path_image + "effect2.png"} alt="" />
                    </span>
                    <p>Seeking feedback from HCP's</p>
                  </li>
                  <li data-aos="fade-left" data-aos-duration="1000">
                    <span>
                      <img src={path_image + "effect4.png"} alt="" />
                    </span>
                    <p>Debating Issues</p>
                  </li>
                </ul>
              </div>
              <div className="col-md-4"></div>
              <div className="col-md-12">
                <a
                  data-aos="zoom-out-down"
                  data-aos-duration="1000"
                  href="#"
                  className="btnn"
                >
                  find out more
                </a>
              </div>
            </div>
          </div>

          <div className="teamm" data-aos="fade-left" data-aos-duration="1000">
            <div className="container">
              <div className="row">
                <div className="col-md-8">
                  <div className="team-outer text-center">
                    <h3>
                      " The Docintel Team is a delight to work with. They are
                      innovative and enjoy a challenge. The webinar platform is
                      user friendly and created for seamless ease of use."
                    </h3>
                    <span>Jacqui McAllister</span>
                    <span>Project Manager, Octapharma South Africa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!--------------effective webinar section start here--------------> */}

        {/* <!--------------case example section start here-----------------> */}
        <section
          className="case-exple common"
          idd="55"
          id="cases"
          data-anchor="cases"
        >
          <div className="custom-container">
            <div className="row">
              <div className="col-md-12 blue-br">
                <h3
                  data-aos="fade-right"
                  data-aos-easing="linear"
                  data-aos-duration="1500"
                >
                  Case Examples
                </h3>
                <div className="map_buttons">
                  <ul>
                    <li>
                      <Button
                        className={
                          mapbutton ? "map-button" : "map-button active"
                        }
                        id="mapButton"
                        onClick={(e) => setMapbutton(false)}
                      >
                        Single
                      </Button>
                    </li>
                    <li>
                      <Button
                        className={
                          mapbutton ? "map-button active" : "map-button"
                        }
                        id="compareButton"
                        onClick={(e) => setMapbutton(true)}
                      >
                        Compare
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="map-outer">
          <div className="custom-container">
            <div className="row">
              <div ref={chartRef} id="chartdiv">
                {" "}
              </div>
              <div className="horizon-arrows">
                <div className="horizon horizon-prev">
                  <img
                    src={` https://informed.pro/img/webinar/left-arrow-line-symbol.png`}
                    alt=""
                  />
                </div>
                <div className="horizon horizon-next show-next">
                  <img
                    src={`https://informed.pro/img/webinar/right-arrow-angle.png`}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!--------------case example section ends here------------------> */}

        <section className="blank-space">
          <div className="blank-background"></div>
        </section>
        <section
          className="common"
          idd="66"
          id="request_demo"
          data-anchor="section6"
        >
          <div className="request_demo_main">
            <div className="container">
              <div className="row">
                <div className="demo-video-form">
                  <form
                    className="form-horizontal"
                    data-aos="fade-up"
                    data-aos-duration="1100"
                  >
                    <h2>Get a FREE walkthrough</h2>
                    <p>
                      Need further information?
                      <br />
                      Receive a walkthrough from a dedicated member of our team
                    </p>
                    <div className="form-left-fields">
                      <div
                        className={
                          !contactFormError?.name
                            ? "form-group"
                            : "form-group error"
                        }
                      >
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="contact-field"
                          placeholder="Name"
                          value={
                            contactFormInputs?.name
                              ? contactFormInputs?.name
                              : ""
                          }
                          onChange={handleContactFormChange}
                        />
                      </div>
                      <div
                        className={
                          !contactFormError?.email
                            ? "form-group"
                            : "form-group error"
                        }
                      >
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="contact-field"
                          placeholder="Email"
                          value={
                            contactFormInputs?.email
                              ? contactFormInputs?.email
                              : ""
                          }
                          onChange={handleContactFormChange}
                        />
                      </div>
                      <div
                        className={
                          !contactFormError?.phone
                            ? "form-group"
                            : "form-group error"
                        }
                      >
                        <input
                          type="number"
                          id="phone"
                          name="phone"
                          className="contact-field"
                          placeholder="Contact Number"
                          value={
                            contactFormInputs?.phone
                              ? contactFormInputs?.phone
                              : ""
                          }
                          onChange={handleContactFormChange}
                        />
                      </div>
                      <div
                        className={
                          !contactFormError?.company
                            ? "form-group"
                            : "form-group error"
                        }
                      >
                        <input
                          type="text"
                          id="company"
                          name="company"
                          className="contact-field"
                          placeholder="Company"
                          value={
                            contactFormInputs?.company
                              ? contactFormInputs?.company
                              : ""
                          }
                          onChange={handleContactFormChange}
                        />
                      </div>
                      <div
                        className={
                          !contactFormError?.country
                            ? "form-group select-option input-group"
                            : "form-group select-option input-group error"
                        }
                      >
                        <Select
                          className="form-control contact-field"
                          id="country"
                          name="country"
                          options={country}
                          placeholder="Select country"
                          onChange={(e) =>
                            handleContactFormChange(e?.value, "country")
                          }
                          isClearable
                        ></Select>
                      </div>
                    </div>
                    <div className="form-right-fields">
                      <div className="form-group input-group">
                        <textarea
                          className="form-control"
                          rows="8"
                          id="comment"
                          placeholder="Comments"
                          name="comment"
                          value={
                            contactFormInputs?.comment
                              ? contactFormInputs?.comment
                              : ""
                          }
                          onChange={handleContactFormChange}
                        ></textarea>
                      </div>
                      {/* {contactFormError && (
                        <p style={{ color: "red" }}>{contactFormError}</p>
                      )} */}
                    </div>

                    <img
                      src="<?php INFORMEDPROURL;?>img/loader.gif"
                      width="50"
                      id="contact-form-loader"
                      style={{ display: "none" }}
                    />

                    <button
                      type="button"
                      id="contact-button"
                      onClick={submitContactForm}
                      className="btn btn-default requst-demo"
                    >
                      Request Demo
                    </button>
                    <p
                      className="alert alert-success"
                      style={{ display: "none", marginTop: "15px" }}
                      id="contact-success-msg"
                    >
                      {" "}
                      Thank you for contacting us. We will get back to you
                      shortly.{" "}
                    </p>
                    <p
                      className="alert alert-danger"
                      style={{ display: "none", marginTop: "15px" }}
                      id="contact-error-msg"
                    >
                      {" "}
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer
          className="common"
          idd="66"
          id="request_demo"
          data-anchor="section6"
        >
          <div className="copyright">
            <ul>
              <li>&copy; 2020 DocIntel</li>
              <li>
                <a
                  target="_blank"
                  href="https://albert.docintel.app/terms_of_use/"
                >
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a href="javascript:;" onClick={(e) => handleShow("privacy")}>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </footer>

        <div
          id="pp-nav"
          className="right white right-boxed hidden-xs"
          style={{ color: " rgb(0, 0, 0)", margintop: 161 }}
        >
          <ul>
            <li data-scroll="banner-section">
              <a
                href="#banner-section"
                className={
                  activeSection == "banner-section"
                    ? "page-scroll act11 activeMenu"
                    : "page-scroll act11"
                }
                onClick={() => setActiveSection("banner-section")}
              >
                <span></span>
                <p>Banner</p>
              </a>
            </li>

            <li data-scroll="building-section">
              <a
                href="#building-section"
                menuAct="22"
                className={
                  activeSection == "building-section"
                    ? "page-scroll act22 activeMenu"
                    : "page-scroll act22"
                }
                onClick={() => setActiveSection("building-section")}
              >
                <span></span>
                <p>Relationships</p>
              </a>
            </li>
            <li data-scroll="feature">
              <a
                href="#feature"
                menuAct="33"
                className={
                  activeSection == "feature"
                    ? "page-scroll act33 activeMenu"
                    : "page-scroll act33"
                }
                onClick={() => setActiveSection("feature")}
              >
                <span></span>
                <p>Features</p>
              </a>
            </li>
            <li data-scroll="testimonial">
              <a
                href="#testimonial"
                menuAct="44"
                className={
                  activeSection == "testimonial"
                    ? "page-scroll act44 activeMenu"
                    : "page-scroll act44"
                }
                onClick={() => setActiveSection("testimonial")}
              >
                <span></span>
                <p>Testimonial</p>
              </a>
            </li>
            <li data-scroll="cases">
              <a
                href="#cases"
                menuAct="55"
                className={
                  activeSection == "cases"
                    ? "page-scroll act55 activeMenu"
                    : "page-scroll act55"
                }
                onClick={() => setActiveSection("cases")}
              >
                <span></span>
                <p>Cases</p>
              </a>
            </li>
            <li data-scroll="request_demo">
              <a
                href="#request_demo"
                menuAct="66"
                className={
                  activeSection == "request_demo"
                    ? "page-scroll act66 activeMenu"
                    : "page-scroll act66"
                }
                onClick={() => setActiveSection("request_demo")}
              >
                <span></span>
                <p>Request Demo</p>
              </a>
            </li>
          </ul>
          {/* <ul>
          <li data-scroll="banner-section">
            <a href="#banner-section" className="page-scroll act11 active">
              <span style={{}}></span>
            </a>
          </li>
          <li data-scroll="building-section">
            <a href="#building-section" className="page-scroll act22">
              <span style={{}}></span>
            </a>
          </li>
          <li data-scroll="feature">
            <a href="#feature" className="page-scroll act33">
              <span style={{}}></span>
            </a>
          </li>
          <li data-scroll="testimonial">
            <a href="#testimonial" className="page-scroll act44">
              <span style={{}}></span>
            </a>
          </li>
          <li data-scroll="cases">
            <a href="#cases" className="page-scroll act55">
              <span style={{}}></span>
            </a>
          </li>
          <li data-scroll="request_demo">
            <a href="#request_demo" className="page-scroll act66">
              <span style={{}}></span>
            </a>
          </li>
        </ul> */}
        </div>
      </div>

      {/*Start Video Modal Functionality*/}
      <Modal
        show={getOpenVideoPopup}
        className="full_video_popup"
        id="open_video_popup"
      >
        <Modal.Header>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={() =>
              setOpenVideoPopup((getOpenVideoPopup) => !getOpenVideoPopup)
            }
          ></button>
        </Modal.Header>
        <Modal.Body>
          {videoUrl !== "" && videoImage !== "" ? (
            <ReactPlayer
              url={videoUrl}
              controls={true}
              width="100%"
              height="100%"
              playing={true}
              muted={true}
              light={videoImage}
            />
          ) : null}

          {/*<Player playsInline poster={video_poster} src={video_url}>
              <BigPlayButton position="center" />
            </Player>*/}
        </Modal.Body>
      </Modal>
      {/*End Video Modal Functionality*/}

      {
        /*Modal For Forgot password start*/
        <Modal
          show={show}
          onHide={(e) => handleClose("forgot")}
          className="header-forgot"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Reset Your Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={onSendEmail}>
              <Form.Control
                type="text"
                placeholder="Enter your Email"
                className="form-field"
                aria-label="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              {errorMsg && <p>{errorMsg}</p>}
              {successMsg && <p style={{ color: "#39CABC" }}>{successMsg}</p>}
              <Button type="submit">Send Email</Button>
            </Form>
          </Modal.Body>
        </Modal>
        /*Modal For Forgot password end*/
      }

      {
        /*Modal For privacy Policy start*/
        <Modal show={privacyshow} onHide={(e) => handleClose("privacy")}>
          <Modal.Header closeButton>
            <Modal.Title>Privacy Policy</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="privacy_policy_modal">
              <p>
                MedArkive is committed to protecting your personal information.
              </p>
              <p>
                This Policy explains what personal information MedArkive Ltd
                ("MedArkive", "we", "us", "our") collects from you through our
                platform, how we use the information and how we keep it secure.
              </p>
              <p>This statement applies to our website and apps.</p>
              <p>
                This policy applies as between you, the user of this website,
                and MedArkive the owner and provider of this website. Our
                Privacy Policy does not extend to any websites that can be
                accessed from our website including, but not limited to, any
                links we may provide on social media websites.
              </p>
              <ol start="1">
                <li dir="ltr">Data Protection Law</li>
              </ol>
              <p>
                MedArkive is committed to complying with the data protection
                law. We adhere to the law by ensuring that the data you provide
                us will be:
              </p>
              <ul>
                <li>Processed lawfully, fairly and in a transparent manner;</li>
                <li>
                  Collected for specific, explicit and legitimate purposes and
                  not further processed in a manner that is incompatible with
                  those purposes;
                </li>
                <li>
                  Adequate, relevant and limited to what is necessary for those
                  purposes;
                </li>
                <li>Accurate and, where necessary, kept up to date;</li>
                <li>
                  Kept in a form which permits identification of data subject
                  for no longer than is necessary for the purposes for which the
                  personal data is processed;
                </li>
                <li>
                  Processed in a manner that ensures appropriate security of the
                  personal data.
                </li>
              </ul>
              <ol start="2">
                <li dir="ltr">Collecting Personal Information</li>
              </ol>
              <p>
                MedArkive acts as the processor of the information you provide.
              </p>
              <p>
                We process the information for legitimate business purposes and
                to help our clients provide our users with tailored content
                aimed at improving their professional development and knowledge.
                <br />
                If you decide not to provide us with your personal data you may
                not be able to use some of our platform and/or services.
              </p>
              <ol start="3">
                <li dir="ltr">Data Collected</li>
              </ol>
              <p>The following data may be collected by MedArkive:</p>
              <ol start="a" className="list-ol">
                <li>name;</li>
                <li>date of birth;</li>
                <li>gender;</li>
                <li>job title;</li>
                <li>profession;</li>
                <li>
                  contact information such as email addresses and/or telephone
                  numbers;
                </li>
                <li>
                  demographic information such as post code, preferences and
                  interests;
                </li>
                <li>IP address (automatically collected);</li>
                <li>web browser type and version (automatically collected);</li>
                <li>operating system (automatically collected);</li>
                <li>
                  {" "}
                  a list of URLs starting with a referring site, your activity
                  on this Website, and the site you exit to (automatically
                  collected).
                </li>
              </ol>
              <br />
              <ol start="4">
                <li dir="ltr">How We Use Data</li>
              </ol>
              <p>
                MedArkive uses your personal information for the following
                reasons:
              </p>

              <ul>
                <li>
                  To operate effectively as a business and to perform essential
                  business operations, including providing products optimised
                  for medical professionals
                </li>
              </ul>

              <p dir="ltr">
                We are motivated to provide products which offer outstanding
                resources for medical professionals, including sponsored
                content. To enhance your enjoyment and productivity on our
                platform, we endeavour to identify and improve our services. To
                ensure your experience with our products is seamless, we
                continuously re-examine and iteratively optimise user journeys
                on our platform. We infer your location from your device IP
                address in order to geo restrict certain content on our platform
                and ensure smooth access for you without the need to re-login
                when avoidable, and aid content selection for sponsors of
                content. Product issues, identified by users and communicated
                through customer support, are effectively diagnosed and resolved
                using data collected from interactions on the platform.
                Decisions on product development and evaluations of product
                performance are based on aggregate analysis and business
                intelligence based on non-personal data.
                <br />
                All our clients and partners are required to take appropriate
                security measures to protect your personal data in line with
                national legislation and policies of the countries they reside
                in. No matter which country our clients reside in MedArkive will
                always treat personal data as a minimum with a level
                corresponding to the General Data Protection Regulation. This
                means that you will have the rights as set out in clause 5
                (below) and have the right to disclosure, erasure etc. from
                MedArkive's database.
                <br />
                Should you wish to exercise your right to be forgotten we will
                erase all data about you in both platforms and request the data
                controller to do the same. However, where consent was given we
                keep a record of this for disclosures under legal requirements,
                but we will delete all other data collected.
                <br />
                In addition to the specific disclosure of personal data set out
                in this section, we may disclose your personal data where such
                disclosure is necessary for compliance with a legal obligation
                to which we are subject, or in order to protect your vital
                interests or the vital interests of another natural person. We
                may also disclose your personal data where such disclosure is
                necessary for the establishment, exercise or defence of legal
                claims, whether in court proceedings or in an administrative or
                out-of-court procedure.
              </p>
              <ul>
                <li className="change_li">
                  To deliver communications of personal interest including
                  product and content releases, motivational prompts and in
                  response to product queries or support requests.
                </li>
              </ul>

              <p dir="ltr">
                Direct communications
                <br />
                Communications sent by MedArkive come in the form of emails to
                the email address provided by you during the registration
                process and through notifications delivered to your device.
                MedArkive may send you communications relating to new and
                existing product and content releases and updates. We send such
                communications so that you are aware of changes we are making to
                the content or features of our products, or new releases, which
                could affect the usefulness of our core services to you. You, of
                course, have the right to opt out of such email communication at
                any time by using the unsubscribe link, found at the bottom of
                every email.
                <br />
                Third party communications.
                <br />
                Our clients contact you in various ways and deliver content
                hosted by MedArkive. They will do this under their own set of
                regulations depending on your relationship with them, which will
                be independent from MedArkive. We may also from time to time
                push free sponsored content from our clients into your account.
                You can always delete content received in your account.
              </p>
              <ul>
                <li className="change_li">
                  To inform commercial partners and clients of engagement and
                  interactions on sponsored content hosted on our platform
                </li>
              </ul>
              <p dir="ltr">
                When you receive content hosted by MedArkive and sponsored by
                our clients, such as medical device companies and pharmaceutical
                companies, they are the data controllers. As data controllers
                they will have control over your private data which we will host
                in our inforMed.pro platform and what is done with the data is
                their decision.
                <br />
                The data controllers will have access to see your name, email,
                IP address, what you read and when, but they will never see your
                password. Each data controller will only see the data that is in
                relation to what each of them have sponsored. Only MedArkive and
                you can see all the content you have engaged with. You can find
                it in the reading list under your CPD Log in the apps. Should
                you contact us about your right to disclosure, erasure etc. we
                will delete what we can from our database and inform each data
                controller about your desire to be forgotten. We will inform you
                who has received any personal data about you so that you may
                contact them for further erasure.
                <br />
                <br />
                Our aim with processing your private data is to help our clients
                to identify better content that is more suited to help you in
                your professional capacity.
                <br />
                <br />
                To the extent that the legal basis for our processing of your
                personal information is consent, you have the right to withdraw
                that consent at any time by emailing dpo@medarkive.com.
                Withdrawal will not affect the lawfulness of processing before
                the withdrawal.
              </p>
              <ol start="5">
                <li dir="ltr">Accessing your personal data</li>
              </ol>

              <p>Under the data protection legislation you have:</p>
              <ul>
                <li>the right to be informed;</li>
                <li>the right to access;</li>
                <li>the right to rectification;</li>
                <li>the right to erasure;</li>
                <li>the right to restrict processing;</li>
                <li>the right to object; and</li>
                <li>
                  rights in relation to automated decision making and profiling.
                </li>
              </ul>

              <p dir="ltr">
                <span>
                  To learn more about your rights you should consult the data
                  protection legislation and the country guidance from the
                  relevant supervisory authority.
                  <br />
                  <br />
                  Upon written request to our data protection officer we will
                  provide you with information about what personal data we hold
                  about you. To be able to process your request we may ask you
                  to verify your identity or ask more information about your
                  request. Where we are legally permitted to do so, we may
                  decline your request but we will explain why if we do so.{" "}
                  <br />
                  <br /> You have the right to lodge a complaint with a
                  supervisory authority if you think that our processing of your
                  personal data infringes data protection laws.
                </span>
              </p>
              <ol start="6">
                <li dir="ltr">Data Retention</li>
              </ol>
              <p dir="ltr">
                <span>
                  MedArkive will retain personal data for as long as necessary
                  to fulfil our aim of improving content provided to you.
                </span>
              </p>
              <ol start="7">
                <li dir="ltr">Securing Your Information</li>
              </ol>

              <p dir="ltr">
                Data security is of great importance to MedArkive and to protect
                your data we have put in place suitable physical, electronic and
                managerial procedures to safeguard and secure data collected via
                our website and our apps.
                <br />
                Our main office is located in England, UK. We also have
                affiliate offices situated in the EU and in India. We are
                hosting all content and personal data on servers within the EU.
                Our clients are based all over the world. As such we may
                transfer data across the globe, but will always abide by English
                data protection legislation and as a minimum The General Data
                Protection Regulation.
              </p>
              <ol start="8">
                <li dir="ltr">Third Party Websites and Services</li>
              </ol>

              <p dir="ltr">
                MedArkive may, from time to time, employ the services of other
                parties for dealing with matters that may include, but are not
                limited to, delivery of sponsored items, search engine
                facilities, advertising and marketing. The providers of such
                services may have access to certain personal data provided by
                users of this website.
                <br />
                Any data used by such parties is used only to the extent
                required by them to perform the services that MedArkive
                requests. Any use for other purposes is strictly prohibited.
                Furthermore, any data that is processed by third parties shall
                be processed within the terms of this Policy and in accordance
                with the data protection legislation.
              </p>

              <ol start="9">
                <li dir="ltr">Links to Other Websites</li>
              </ol>
              <p dir="ltr">
                This website may, from time to time, provide links to other
                websites. MedArkive has no control over such websites and is in
                no way responsible for the content thereof. This Policy does not
                extend to your use of such websites. Users are advised to read
                the privacy policy or statement of other websites prior to using
                them.
              </p>

              <ol start="10">
                <li dir="ltr">Changes of Business Ownership and Control</li>
              </ol>
              <p dir="ltr">
                MedArkive may, from time to time, expand or reduce our business
                and this may involve the sale and/or the transfer of control of
                all or part of MedArkive. Data provided by users will, where it
                is relevant to any part of our business so transferred, be
                transferred along with that part and the new owner or newly
                controlling party will, under the terms of this Policy, be
                permitted to use the data for the purposes for which it was
                originally supplied to us.
                <br />
                <br />
                In the event that any data submitted by users is to be
                transferred in such a manner, you will not be contacted in
                advance and informed of the changes.
              </p>
              <ol start="11">
                <li dir="ltr">Cookies</li>
              </ol>
              <p>
                This website may place and access certain cookies on your
                computer. MedArkive uses cookies to improve your experience of
                using the website and to improve our range of products and
                services. MedArkive has carefully chosen these cookies and has
                taken steps to ensure that your privacy is protected and
                respected at all times.
                <br />
                <br />
                All cookies used by this website are used in accordance with
                current English and EU cookie law.
                <br />
                <br />
                Before the website places any cookies on your computer, you will
                be presented with a message bar requesting your consent to set
                those cookies. By giving your consent to the placing of cookies
                you are enabling MedArkive to provide the best possible
                experience and service to you. You may, if you wish, deny
                consent to the placing of cookies; however certain features of
                the website may not function fully or as intended.
                <br />
                <br />
                This website uses analytics services provided by MedArkive.
                Website analytics refers to a set of tools used to collect and
                analyse usage statistics, enabling us to better understand how
                users use the website. This, in turn, enables us to improve the
                website and the products and services offered through it. You do
                not have to allow us to use these cookies, as detailed below,
                however, whilst our use of them does not pose any risk to your
                privacy or your safe use of the Website it does enable us to
                continually improve our business. Some services are only
                available via registration and if you choose not to register we
                may not be able to let you access some content. The reason for
                this can both be commercial interests from sponsors of content
                or in order to comply with local regulations such as The
                Physician Payments Sunshine Act in the USA.
                <br />
                <br />
                You can choose to enable or disable cookies in your internet
                browser. Most internet browsers also enable you to choose
                whether you wish to disable all cookies or only third party
                cookies. By default, most internet browsers accept cookies but
                this can be changed. For further details, please consult the
                help menu in your internet browser.
                <br />
                <br />
                You can choose to delete cookies at any time however you may
                lose any information that enables you to access the website more
                quickly and efficiently including, but not limited to,
                personalisation settings.
                <br />
                <br />
                It is recommended that you ensure that your internet browser is
                up-to-date and that you consult the help and guidance provided
                by the developer of your internet browser if you are unsure
                about adjusting your privacy settings.
              </p>
              <ol start="12">
                <li dir="ltr">Changes to this Policy</li>
              </ol>
              <p dir="ltr">
                MedArkive reserves the right to revise this Policy as we may
                deem necessary from time to time or as may be required by law.
                Any changes will be immediately posted on the website and you
                are deemed to have accepted the terms of the Policy on your
                first use of the website following the alterations.
              </p>
            </div>
          </Modal.Body>
        </Modal>
        /*Modal For privacy Policy end*/
      }
    </>
  );
};
export default Webinar;
