import React, { useEffect, useState, useRef } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import Select, { createFilter } from "react-select";
const EditCountry = (props) => {
  const filterConfig = {
    matchFrom: "start",
  };
  const options = [
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
  ];

  let index = options?.findIndex((x) => x?.value == props?.selected_country);

  const [getSelectedCountry, setSelectedCountry] = useState(
    props.selected_country
  );
  const [getProfileUserId, setProfileUserId] = useState(props.profile_user);
  const [getDefaultIndex, setDefaultIndex] = useState(index);

  const onCountryChange = (e) => {
    if (e == null) {
      setSelectedCountry("");
      setDefaultIndex();
    } else {
      setSelectedCountry(e.value);
    }
  };

  return (
    <>
      <Select
        options={options}
        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
        id={"country" + getProfileUserId}
        onChange={(event) => onCountryChange(event)}
        defaultValue={
          typeof options[getDefaultIndex] === "undefined"
            ? "Select Country"
            : options[getDefaultIndex]
        }
        placeholder={
          typeof options[getDefaultIndex] === "undefined"
            ? "Select Country"
            : options[getDefaultIndex]
        }
        filterOption={createFilter(filterConfig)}
        isClearable
      />
      <input
        type="hidden"
        id={`field_country` + getProfileUserId}
        value={getSelectedCountry}
      />
    </>
  );
};

export default EditCountry;

// <DropdownButton className="dropdown-basic-button split-button-dropup edit-country-dropdown"
//   title= {getSelectedCountry != "" &&  getSelectedCountry != "undefined" ? getSelectedCountry == "B&H" ? "Bosnia and Herzegovina" : getSelectedCountry : "Select Country" }
//   onSelect={(event) => onCountryChange(event,getProfileUserId)}
//   >
//
//   <div className="scroll_div">
//       <Dropdown.Item eventKey="Afghanistan">Afghanistan</Dropdown.Item>
//       <Dropdown.Item eventKey="Albania">Albania</Dropdown.Item>
//       <Dropdown.Item eventKey="Algeria">Algeria</Dropdown.Item>
//       <Dropdown.Item eventKey="American Samoa">American Samoa</Dropdown.Item>
//       <Dropdown.Item eventKey="Andorra">Andorra</Dropdown.Item>
//       <Dropdown.Item eventKey="Angola">Angola</Dropdown.Item>
//       <Dropdown.Item eventKey="Anguilla">Anguilla</Dropdown.Item>
//       <Dropdown.Item eventKey="Antarctica">Antarctica</Dropdown.Item>
//       <Dropdown.Item eventKey="Antigua and Barbuda">Antigua and Barbuda</Dropdown.Item>
//       <Dropdown.Item eventKey="Argentina">Argentina</Dropdown.Item>
//       <Dropdown.Item eventKey="Armenia">Armenia</Dropdown.Item>
//       <Dropdown.Item eventKey="Aruba">Aruba</Dropdown.Item>
//       <Dropdown.Item eventKey="Australia">Australia</Dropdown.Item>
//       <Dropdown.Item eventKey="Austria">Austria</Dropdown.Item>
//       <Dropdown.Item eventKey="Azerbaijan">Azerbaijan</Dropdown.Item>
//       <Dropdown.Item eventKey="Bahamas">Bahamas</Dropdown.Item>
//       <Dropdown.Item eventKey="Bahrain">Bahrain</Dropdown.Item>
//       <Dropdown.Item eventKey="Bangladesh">Bangladesh</Dropdown.Item>
//       <Dropdown.Item eventKey="Barbados">Barbados</Dropdown.Item>
//       <Dropdown.Item eventKey="Belarus">Belarus</Dropdown.Item>
//       <Dropdown.Item eventKey="Belgium">Belgium</Dropdown.Item>
//       <Dropdown.Item eventKey="Belize">Belize</Dropdown.Item>
//       <Dropdown.Item eventKey="Benin">Benin</Dropdown.Item>
//       <Dropdown.Item eventKey="Bermuda">Bermuda</Dropdown.Item>
//       <Dropdown.Item eventKey="Bhutan">Bhutan</Dropdown.Item>
//       <Dropdown.Item eventKey="Bolivia">Bolivia</Dropdown.Item>
//       <Dropdown.Item eventKey="B&H">B&H</Dropdown.Item>
//       <Dropdown.Item eventKey="Botswana">Botswana</Dropdown.Item>
//       <Dropdown.Item eventKey="Bouvet Island">Bouvet Island</Dropdown.Item>
//       <Dropdown.Item eventKey="Brazil">Brazil</Dropdown.Item>
//       <Dropdown.Item eventKey="British Indian Ocean Territory">British Indian Ocean Territory</Dropdown.Item>
//       <Dropdown.Item eventKey="Brunei Darussalam">Brunei Darussalam</Dropdown.Item>
//       <Dropdown.Item eventKey="Bulgaria">Bulgaria</Dropdown.Item>
//       <Dropdown.Item eventKey="Burkina Faso">Burkina Faso</Dropdown.Item>
//       <Dropdown.Item eventKey="Burundi">Burundi</Dropdown.Item>
//       <Dropdown.Item eventKey="Cambodia">Cambodia</Dropdown.Item>
//       <Dropdown.Item eventKey="Cameroon">Cameroon</Dropdown.Item>
//       <Dropdown.Item eventKey="Canada">Canada</Dropdown.Item>
//       <Dropdown.Item eventKey="Cape Verde">Cape Verde</Dropdown.Item>
//       <Dropdown.Item eventKey="Cayman Islands">Cayman Islands</Dropdown.Item>
//       <Dropdown.Item eventKey="Central African Republic">Central African Republic</Dropdown.Item>
//       <Dropdown.Item eventKey="Chad">Chad</Dropdown.Item>
//       <Dropdown.Item eventKey="Chile">Chile</Dropdown.Item>
//       <Dropdown.Item eventKey="China">China</Dropdown.Item>
//       <Dropdown.Item eventKey="Christmas Island">Christmas Island</Dropdown.Item>
//       <Dropdown.Item eventKey="Cocos (Keeling) Islands">Cocos (Keeling) Islands</Dropdown.Item>
//       <Dropdown.Item eventKey="Colombia">Colombia</Dropdown.Item>
//       <Dropdown.Item eventKey="Comoros">Comoros</Dropdown.Item>
//       <Dropdown.Item eventKey="Congo">Congo</Dropdown.Item>
//       <Dropdown.Item eventKey="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</Dropdown.Item>
//       <Dropdown.Item eventKey="Cook Islands">Cook Islands</Dropdown.Item>
//       <Dropdown.Item eventKey="Costa Rica">Costa Rica</Dropdown.Item>
//       <Dropdown.Item eventKey="Cote D'ivoire">Cote D'ivoire</Dropdown.Item>
//       <Dropdown.Item eventKey="Croatia">Croatia</Dropdown.Item>
//       <Dropdown.Item eventKey="Cuba">Cuba</Dropdown.Item>
//       <Dropdown.Item eventKey="Cyprus">Cyprus</Dropdown.Item>
//       <Dropdown.Item eventKey="Czech Republic">Czech Republic</Dropdown.Item>
//       <Dropdown.Item eventKey="Denmark">Denmark</Dropdown.Item>
//       <Dropdown.Item eventKey="Djibouti">Djibouti</Dropdown.Item>
//       <Dropdown.Item eventKey="Dominica">Dominica</Dropdown.Item>
//       <Dropdown.Item eventKey="Dominican Republic">Dominican Republic</Dropdown.Item>
//       <Dropdown.Item eventKey="Ecuador">Ecuador</Dropdown.Item>
//       <Dropdown.Item eventKey="Egypt">Egypt</Dropdown.Item>
//       <Dropdown.Item eventKey="El Salvador">El Salvador</Dropdown.Item>
//       <Dropdown.Item eventKey="Equatorial Guinea">Equatorial Guinea</Dropdown.Item>
//       <Dropdown.Item eventKey="Eritrea">Eritrea</Dropdown.Item>
//       <Dropdown.Item eventKey="Estonia">Estonia</Dropdown.Item>
//       <Dropdown.Item eventKey="Ethiopia">Ethiopia</Dropdown.Item>
//       <Dropdown.Item eventKey="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</Dropdown.Item>
//       <Dropdown.Item eventKey="Faroe Islands">Faroe Islands</Dropdown.Item>
//       <Dropdown.Item eventKey="Fiji">Fiji</Dropdown.Item>
//       <Dropdown.Item eventKey="Finland">Finland</Dropdown.Item>
//       <Dropdown.Item eventKey="France">France</Dropdown.Item>
//       <Dropdown.Item eventKey="French Guiana">French Guiana</Dropdown.Item>
//       <Dropdown.Item eventKey="French Polynesia">French Polynesia</Dropdown.Item>
//       <Dropdown.Item eventKey="French Southern Territories">French Southern Territories</Dropdown.Item>
//       <Dropdown.Item eventKey="Gabon">Gabon</Dropdown.Item>
//       <Dropdown.Item eventKey="Gambia">Gambia</Dropdown.Item>
//       <Dropdown.Item eventKey="Georgia">Georgia</Dropdown.Item>
//       <Dropdown.Item eventKey="Germany">Germany</Dropdown.Item>
//       <Dropdown.Item eventKey="Ghana">Ghana</Dropdown.Item>
//       <Dropdown.Item eventKey="Gibraltar">Gibraltar</Dropdown.Item>
//       <Dropdown.Item eventKey="Greece">Greece</Dropdown.Item>
//       <Dropdown.Item eventKey="Greenland">Greenland</Dropdown.Item>
//       <Dropdown.Item eventKey="Grenada">Grenada</Dropdown.Item>
//       <Dropdown.Item eventKey="Guadeloupe">Guadeloupe</Dropdown.Item>
//       <Dropdown.Item eventKey="Guam">Guam</Dropdown.Item>
//       <Dropdown.Item eventKey="Guatemala">Guatemala</Dropdown.Item>
//       <Dropdown.Item eventKey="Guinea">Guinea</Dropdown.Item>
//       <Dropdown.Item eventKey="Guinea-bissau">Guinea-bissau</Dropdown.Item>
//       <Dropdown.Item eventKey="Guyana">Guyana</Dropdown.Item>
//       <Dropdown.Item eventKey="Haiti">Haiti</Dropdown.Item>
//       <Dropdown.Item eventKey="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</Dropdown.Item>
//       <Dropdown.Item eventKey="Holy See (Vatican City State)">Holy See (Vatican City State)</Dropdown.Item>
//       <Dropdown.Item eventKey="Honduras">Honduras</Dropdown.Item>
//       <Dropdown.Item eventKey="Hong Kong">Hong Kong</Dropdown.Item>
//       <Dropdown.Item eventKey="Hungary">Hungary</Dropdown.Item>
//       <Dropdown.Item eventKey="Iceland">Iceland</Dropdown.Item>
//       <Dropdown.Item eventKey="India">India</Dropdown.Item>
//       <Dropdown.Item eventKey="Indonesia">Indonesia</Dropdown.Item>
//       <Dropdown.Item eventKey="Iran, Islamic Republic of">Iran, Islamic Republic of</Dropdown.Item>
//       <Dropdown.Item eventKey="Iraq">Iraq</Dropdown.Item>
//       <Dropdown.Item eventKey="Ireland">Ireland</Dropdown.Item>
//       <Dropdown.Item eventKey="Israel">Israel</Dropdown.Item>
//       <Dropdown.Item eventKey="Italy">Italy</Dropdown.Item>
//       <Dropdown.Item eventKey="Jamaica">Jamaica</Dropdown.Item>
//       <Dropdown.Item eventKey="Japan">Japan</Dropdown.Item>
//       <Dropdown.Item eventKey="Jordan">Jordan</Dropdown.Item>
//       <Dropdown.Item eventKey="Kazakhstan">Kazakhstan</Dropdown.Item>
//       <Dropdown.Item eventKey="Kenya">Kenya</Dropdown.Item>
//       <Dropdown.Item eventKey="Kiribati">Kiribati</Dropdown.Item>
//       <Dropdown.Item eventKey="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</Dropdown.Item>
//       <Dropdown.Item eventKey="Korea, Republic of">Korea, Republic of</Dropdown.Item>
//       <Dropdown.Item eventKey="Kosovo">Kosovo</Dropdown.Item>
//       <Dropdown.Item eventKey="Kuwait">Kuwait</Dropdown.Item>
//       <Dropdown.Item eventKey="Kyrgyzstan">Kyrgyzstan</Dropdown.Item>
//       <Dropdown.Item eventKey="Lao People's Democratic Republic">Lao People's Democratic Republic</Dropdown.Item>
//       <Dropdown.Item eventKey="Latvia">Latvia</Dropdown.Item>
//       <Dropdown.Item eventKey="Lebanon">Lebanon</Dropdown.Item>
//       <Dropdown.Item eventKey="Lesotho">Lesotho</Dropdown.Item>
//       <Dropdown.Item eventKey="Liberia">Liberia</Dropdown.Item>
//       <Dropdown.Item eventKey="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</Dropdown.Item>
//       <Dropdown.Item eventKey="Liechtenstein">Liechtenstein</Dropdown.Item>
//       <Dropdown.Item eventKey="Lithuania">Lithuania</Dropdown.Item>
//       <Dropdown.Item eventKey="Luxembourg">Luxembourg</Dropdown.Item>
//       <Dropdown.Item eventKey="Macao">Macao</Dropdown.Item>
//       <Dropdown.Item eventKey="North Macedonia">North Macedonia</Dropdown.Item>
//       <Dropdown.Item eventKey="Madagascar">Madagascar</Dropdown.Item>
//       <Dropdown.Item eventKey="Malawi">Malawi</Dropdown.Item>
//       <Dropdown.Item eventKey="Malaysia">Malaysia</Dropdown.Item>
//       <Dropdown.Item eventKey="Maldives">Maldives</Dropdown.Item>
//       <Dropdown.Item eventKey="Mali">Mali</Dropdown.Item>
//       <Dropdown.Item eventKey="Malta">Malta</Dropdown.Item>
//       <Dropdown.Item eventKey="Marshall Islands">Marshall Islands</Dropdown.Item>
//       <Dropdown.Item eventKey="Martinique">Martinique</Dropdown.Item>
//       <Dropdown.Item eventKey="Mauritania">Mauritania</Dropdown.Item>
//       <Dropdown.Item eventKey="Mauritius">Mauritius</Dropdown.Item>
//       <Dropdown.Item eventKey="Mayotte">Mayotte</Dropdown.Item>
//       <Dropdown.Item eventKey="Mexico">Mexico</Dropdown.Item>
//       <Dropdown.Item eventKey="Micronesia, Federated States of">Micronesia, Federated States of</Dropdown.Item>
//       <Dropdown.Item eventKey="Moldova, Republic of">Moldova, Republic of</Dropdown.Item>
//       <Dropdown.Item eventKey="Monaco">Monaco</Dropdown.Item>
//       <Dropdown.Item eventKey="Mongolia">Mongolia</Dropdown.Item>
//       <Dropdown.Item eventKey="Montserrat">Montserrat</Dropdown.Item>
//       <Dropdown.Item eventKey="Morocco">Morocco</Dropdown.Item>
//       <Dropdown.Item eventKey="Mozambique">Mozambique</Dropdown.Item>
//       <Dropdown.Item eventKey="Myanmar">Myanmar</Dropdown.Item>
//       <Dropdown.Item eventKey="Namibia">Namibia</Dropdown.Item>
//       <Dropdown.Item eventKey="Nauru">Nauru</Dropdown.Item>
//       <Dropdown.Item eventKey="Nepal">Nepal</Dropdown.Item>
//       <Dropdown.Item eventKey="Netherlands">Netherlands</Dropdown.Item>
//       <Dropdown.Item eventKey="Netherlands Antilles">Netherlands Antilles</Dropdown.Item>
//       <Dropdown.Item eventKey="New Caledonia">New Caledonia</Dropdown.Item>
//       <Dropdown.Item eventKey="New Zealand">New Zealand</Dropdown.Item>
//       <Dropdown.Item eventKey="Nicaragua">Nicaragua</Dropdown.Item>
//       <Dropdown.Item eventKey="Niger">Niger</Dropdown.Item>
//       <Dropdown.Item eventKey="Nigeria">Nigeria</Dropdown.Item>
//       <Dropdown.Item eventKey="Niue">Niue</Dropdown.Item>
//       <Dropdown.Item eventKey="Norfolk Island">Norfolk Island</Dropdown.Item>
//       <Dropdown.Item eventKey="Northern Mariana Islands">Northern Mariana Islands</Dropdown.Item>
//       <Dropdown.Item eventKey="Norway">Norway</Dropdown.Item>
//       <Dropdown.Item eventKey="Oman">Oman</Dropdown.Item>
//       <Dropdown.Item eventKey="Pakistan">Pakistan</Dropdown.Item>
//       <Dropdown.Item eventKey="Palau">Palau</Dropdown.Item>
//       <Dropdown.Item eventKey="Palestinian Territory, Occupied">Palestinian Territory, Occupied</Dropdown.Item>
//       <Dropdown.Item eventKey="Panama">Panama</Dropdown.Item>
//       <Dropdown.Item eventKey="Papua New Guinea">Papua New Guinea</Dropdown.Item>
//       <Dropdown.Item eventKey="Paraguay">Paraguay</Dropdown.Item>
//       <Dropdown.Item eventKey="Peru">Peru</Dropdown.Item>
//       <Dropdown.Item eventKey="Philippines">Philippines</Dropdown.Item>
//       <Dropdown.Item eventKey="Pitcairn">Pitcairn</Dropdown.Item>
//       <Dropdown.Item eventKey="Poland">Poland</Dropdown.Item>
//       <Dropdown.Item eventKey="Portugal">Portugal</Dropdown.Item>
//       <Dropdown.Item eventKey="Puerto Rico">Puerto Rico</Dropdown.Item>
//       <Dropdown.Item eventKey="Qatar">Qatar</Dropdown.Item>
//       <Dropdown.Item eventKey="Reunion">Reunion</Dropdown.Item>
//       <Dropdown.Item eventKey="Romania">Romania</Dropdown.Item>
//       <Dropdown.Item eventKey="Russian Federation">Russian Federation</Dropdown.Item>
//       <Dropdown.Item eventKey="Rwanda">Rwanda</Dropdown.Item>
//       <Dropdown.Item eventKey="Saint Helena">Saint Helena</Dropdown.Item>
//       <Dropdown.Item eventKey="Saint Kitts and Nevis">Saint Kitts and Nevis</Dropdown.Item>
//       <Dropdown.Item eventKey="Saint Lucia">Saint Lucia</Dropdown.Item>
//       <Dropdown.Item eventKey="Saint Pierre and Miquelon">Saint Pierre and Miquelon</Dropdown.Item>
//       <Dropdown.Item eventKey="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</Dropdown.Item>
//       <Dropdown.Item eventKey="Samoa">Samoa</Dropdown.Item>
//       <Dropdown.Item eventKey="San Marino">San Marino</Dropdown.Item>
//       <Dropdown.Item eventKey="Sao Tome and Principe">Sao Tome and Principe</Dropdown.Item>
//       <Dropdown.Item eventKey="Saudi Arabia">Saudi Arabia</Dropdown.Item>
//       <Dropdown.Item eventKey="Senegal">Senegal</Dropdown.Item>
//       <Dropdown.Item eventKey="Serbia">Serbia</Dropdown.Item>
//       <Dropdown.Item eventKey="Montenegro">Montenegro</Dropdown.Item>
//       <Dropdown.Item eventKey="Seychelles">Seychelles</Dropdown.Item>
//       <Dropdown.Item eventKey="Sierra Leone">Sierra Leone</Dropdown.Item>
//       <Dropdown.Item eventKey="Singapore">Singapore</Dropdown.Item>
//       <Dropdown.Item eventKey="Slovakia">Slovakia</Dropdown.Item>
//       <Dropdown.Item eventKey="Slovenia">Slovenia</Dropdown.Item>
//       <Dropdown.Item eventKey="Solomon Islands">Solomon Islands</Dropdown.Item>
//       <Dropdown.Item eventKey="Somalia">Somalia</Dropdown.Item>
//       <Dropdown.Item eventKey="South Africa">South Africa</Dropdown.Item>
//       <Dropdown.Item eventKey="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</Dropdown.Item>
//       <Dropdown.Item eventKey="Spain">Spain</Dropdown.Item>
//       <Dropdown.Item eventKey="Sri Lanka">Sri Lanka</Dropdown.Item>
//       <Dropdown.Item eventKey="Sudan">Sudan</Dropdown.Item>
//       <Dropdown.Item eventKey="Suriname">Suriname</Dropdown.Item>
//       <Dropdown.Item eventKey="Svalbard and Jan Mayen">Svalbard and Jan Mayen</Dropdown.Item>
//       <Dropdown.Item eventKey="Swaziland">Swaziland</Dropdown.Item>
//       <Dropdown.Item eventKey="Sweden">Sweden</Dropdown.Item>
//       <Dropdown.Item eventKey="Switzerland">Switzerland</Dropdown.Item>
//       <Dropdown.Item eventKey="Syrian Arab Republic">Syrian Arab Republic</Dropdown.Item>
//       <Dropdown.Item eventKey="Taiwan, Province of China">Taiwan, Province of China</Dropdown.Item>
//       <Dropdown.Item eventKey="Tajikistan">Tajikistan</Dropdown.Item>
//       <Dropdown.Item eventKey="Tanzania, United Republic of">Tanzania, United Republic of</Dropdown.Item>
//       <Dropdown.Item eventKey="Thailand">Thailand</Dropdown.Item>
//       <Dropdown.Item eventKey="Timor-leste">Timor-leste</Dropdown.Item>
//       <Dropdown.Item eventKey="Togo">Togo</Dropdown.Item>
//       <Dropdown.Item eventKey="Tokelau">Tokelau</Dropdown.Item>
//       <Dropdown.Item eventKey="Tonga">Tonga</Dropdown.Item>
//       <Dropdown.Item eventKey="Trinidad and Tobago">Trinidad and Tobago</Dropdown.Item>
//       <Dropdown.Item eventKey="Tunisia">Tunisia</Dropdown.Item>
//       <Dropdown.Item eventKey="Turkey">Turkey</Dropdown.Item>
//       <Dropdown.Item eventKey="Turkmenistan">Turkmenistan</Dropdown.Item>
//       <Dropdown.Item eventKey="Turks and Caicos Islands">Turks and Caicos Islands</Dropdown.Item>
//       <Dropdown.Item eventKey="Tuvalu">Tuvalu</Dropdown.Item>
//       <Dropdown.Item eventKey="Uganda">Uganda</Dropdown.Item>
//       <Dropdown.Item eventKey="Ukraine">Ukraine</Dropdown.Item>
//       <Dropdown.Item eventKey="United Arab Emirates">United Arab Emirates</Dropdown.Item>
//       <Dropdown.Item eventKey="United Kingdom">United Kingdom</Dropdown.Item>
//       <Dropdown.Item eventKey="United States">United States</Dropdown.Item>
//       <Dropdown.Item eventKey="United States Minor Outlying Islands">United States Minor Outlying Islands</Dropdown.Item>
//       <Dropdown.Item eventKey="Uruguay">Uruguay</Dropdown.Item>
//       <Dropdown.Item eventKey="Uzbekistan">Uzbekistan</Dropdown.Item>
//       <Dropdown.Item eventKey="Vanuatu">Vanuatu</Dropdown.Item>
//       <Dropdown.Item eventKey="Venezuela">Venezuela</Dropdown.Item>
//       <Dropdown.Item eventKey="Viet Nam">Viet Nam</Dropdown.Item>
//       <Dropdown.Item eventKey="Virgin Islands, British">Virgin Islands, British</Dropdown.Item>
//       <Dropdown.Item eventKey="Virgin Islands, U.S.">Virgin Islands, U.S.</Dropdown.Item>
//       <Dropdown.Item eventKey="Wallis and Futuna">Wallis and Futuna</Dropdown.Item>
//       <Dropdown.Item eventKey="Western Sahara">Western Sahara</Dropdown.Item>
//       <Dropdown.Item eventKey="Yemen">Yemen</Dropdown.Item>
//       <Dropdown.Item eventKey="Zambia">Zambia</Dropdown.Item>
//       <Dropdown.Item eventKey="Zimbabwe">Zimbabwe</Dropdown.Item>
//   </div>
// </DropdownButton>
//
//
