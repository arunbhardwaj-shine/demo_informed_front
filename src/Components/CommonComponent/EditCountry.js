import React, { useEffect, useState, useRef } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const EditCountry = (props) => {
  const [getSelectedCountry, setSelectedCountry] = useState(props.selected_country);
  const [getProfileUserId, setProfileUserId] = useState(props.profile_user);
  const [getChangeIndex, setChangeIndex] = useState(props.edit_index);
  const [getFlag, setFlag] = useState(props.flag);


  const onCountryChange = (e,profile_user_id) => {
    setSelectedCountry(e);
    props.changeEditCountry(e,profile_user_id,getChangeIndex,getFlag);
  };
  return(
    <>

    <DropdownButton className="dropdown-basic-button split-button-dropup edit-country-dropdown"
      title= {getSelectedCountry != "" &&  getSelectedCountry != "undefined" ? getSelectedCountry == "B&H" ? "Bosnia and Herzegovina" : getSelectedCountry : "Select Country" }
      onSelect={(event) => onCountryChange(event,getProfileUserId)}
      >
          <Dropdown.Item eventKey="Afghanistan">Afghanistan</Dropdown.Item>
          <Dropdown.Item eventKey="Albania">Albania</Dropdown.Item>
          <Dropdown.Item eventKey="Algeria">Algeria</Dropdown.Item>
          <Dropdown.Item eventKey="American Samoa">American Samoa</Dropdown.Item>
          <Dropdown.Item eventKey="Andorra">Andorra</Dropdown.Item>
          <Dropdown.Item eventKey="Angola">Angola</Dropdown.Item>
          <Dropdown.Item eventKey="Anguilla">Anguilla</Dropdown.Item>
          <Dropdown.Item eventKey="Antarctica">Antarctica</Dropdown.Item>
          <Dropdown.Item eventKey="Antigua and Barbuda">Antigua and Barbuda</Dropdown.Item>
          <Dropdown.Item eventKey="Argentina">Argentina</Dropdown.Item>
          <Dropdown.Item eventKey="Armenia">Armenia</Dropdown.Item>
          <Dropdown.Item eventKey="Aruba">Aruba</Dropdown.Item>
          <Dropdown.Item eventKey="Australia">Australia</Dropdown.Item>
          <Dropdown.Item eventKey="Austria">Austria</Dropdown.Item>
          <Dropdown.Item eventKey="Azerbaijan">Azerbaijan</Dropdown.Item>
          <Dropdown.Item eventKey="Bahamas">Bahamas</Dropdown.Item>
          <Dropdown.Item eventKey="Bahrain">Bahrain</Dropdown.Item>
          <Dropdown.Item eventKey="Bangladesh">Bangladesh</Dropdown.Item>
          <Dropdown.Item eventKey="Barbados">Barbados</Dropdown.Item>
          <Dropdown.Item eventKey="Belarus">Belarus</Dropdown.Item>
          <Dropdown.Item eventKey="Belgium">Belgium</Dropdown.Item>
          <Dropdown.Item eventKey="Belize">Belize</Dropdown.Item>
          <Dropdown.Item eventKey="Benin">Benin</Dropdown.Item>
          <Dropdown.Item eventKey="Bermuda">Bermuda</Dropdown.Item>
          <Dropdown.Item eventKey="Bhutan">Bhutan</Dropdown.Item>
          <Dropdown.Item eventKey="Bolivia">Bolivia</Dropdown.Item>
          <Dropdown.Item eventKey="B&H">B&H</Dropdown.Item>
          <Dropdown.Item eventKey="Botswana">Botswana</Dropdown.Item>
          <Dropdown.Item eventKey="Bouvet Island">Bouvet Island</Dropdown.Item>
          <Dropdown.Item eventKey="Brazil">Brazil</Dropdown.Item>
          <Dropdown.Item eventKey="British Indian Ocean Territory">British Indian Ocean Territory</Dropdown.Item>
          <Dropdown.Item eventKey="Brunei Darussalam">Brunei Darussalam</Dropdown.Item>
          <Dropdown.Item eventKey="Bulgaria">Bulgaria</Dropdown.Item>
          <Dropdown.Item eventKey="Burkina Faso">Burkina Faso</Dropdown.Item>
          <Dropdown.Item eventKey="Burundi">Burundi</Dropdown.Item>
          <Dropdown.Item eventKey="Cambodia">Cambodia</Dropdown.Item>
          <Dropdown.Item eventKey="Cameroon">Cameroon</Dropdown.Item>
          <Dropdown.Item eventKey="Canada">Canada</Dropdown.Item>
          <Dropdown.Item eventKey="Cape Verde">Cape Verde</Dropdown.Item>
          <Dropdown.Item eventKey="Cayman Islands">Cayman Islands</Dropdown.Item>
          <Dropdown.Item eventKey="Central African Republic">Central African Republic</Dropdown.Item>
          <Dropdown.Item eventKey="Chad">Chad</Dropdown.Item>
          <Dropdown.Item eventKey="Chile">Chile</Dropdown.Item>
          <Dropdown.Item eventKey="China">China</Dropdown.Item>
          <Dropdown.Item eventKey="Christmas Island">Christmas Island</Dropdown.Item>
          <Dropdown.Item eventKey="Cocos (Keeling) Islands">Cocos (Keeling) Islands</Dropdown.Item>
          <Dropdown.Item eventKey="Colombia">Colombia</Dropdown.Item>
          <Dropdown.Item eventKey="Comoros">Comoros</Dropdown.Item>
          <Dropdown.Item eventKey="Congo">Congo</Dropdown.Item>
          <Dropdown.Item eventKey="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</Dropdown.Item>
          <Dropdown.Item eventKey="Cook Islands">Cook Islands</Dropdown.Item>
          <Dropdown.Item eventKey="Costa Rica">Costa Rica</Dropdown.Item>
          <Dropdown.Item eventKey="Cote D'ivoire">Cote D'ivoire</Dropdown.Item>
          <Dropdown.Item eventKey="Croatia">Croatia</Dropdown.Item>
          <Dropdown.Item eventKey="Cuba">Cuba</Dropdown.Item>
          <Dropdown.Item eventKey="Cyprus">Cyprus</Dropdown.Item>
          <Dropdown.Item eventKey="Czech Republic">Czech Republic</Dropdown.Item>
          <Dropdown.Item eventKey="Denmark">Denmark</Dropdown.Item>
          <Dropdown.Item eventKey="Djibouti">Djibouti</Dropdown.Item>
          <Dropdown.Item eventKey="Dominica">Dominica</Dropdown.Item>
          <Dropdown.Item eventKey="Dominican Republic">Dominican Republic</Dropdown.Item>
          <Dropdown.Item eventKey="Ecuador">Ecuador</Dropdown.Item>
          <Dropdown.Item eventKey="Egypt">Egypt</Dropdown.Item>
          <Dropdown.Item eventKey="El Salvador">El Salvador</Dropdown.Item>
          <Dropdown.Item eventKey="Equatorial Guinea">Equatorial Guinea</Dropdown.Item>
          <Dropdown.Item eventKey="Eritrea">Eritrea</Dropdown.Item>
          <Dropdown.Item eventKey="Estonia">Estonia</Dropdown.Item>
          <Dropdown.Item eventKey="Ethiopia">Ethiopia</Dropdown.Item>
          <Dropdown.Item eventKey="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</Dropdown.Item>
          <Dropdown.Item eventKey="Faroe Islands">Faroe Islands</Dropdown.Item>
          <Dropdown.Item eventKey="Fiji">Fiji</Dropdown.Item>
          <Dropdown.Item eventKey="Finland">Finland</Dropdown.Item>
          <Dropdown.Item eventKey="France">France</Dropdown.Item>
          <Dropdown.Item eventKey="French Guiana">French Guiana</Dropdown.Item>
          <Dropdown.Item eventKey="French Polynesia">French Polynesia</Dropdown.Item>
          <Dropdown.Item eventKey="French Southern Territories">French Southern Territories</Dropdown.Item>
          <Dropdown.Item eventKey="Gabon">Gabon</Dropdown.Item>
          <Dropdown.Item eventKey="Gambia">Gambia</Dropdown.Item>
          <Dropdown.Item eventKey="Georgia">Georgia</Dropdown.Item>
          <Dropdown.Item eventKey="Germany">Germany</Dropdown.Item>
          <Dropdown.Item eventKey="Ghana">Ghana</Dropdown.Item>
          <Dropdown.Item eventKey="Gibraltar">Gibraltar</Dropdown.Item>
          <Dropdown.Item eventKey="Greece">Greece</Dropdown.Item>
          <Dropdown.Item eventKey="Greenland">Greenland</Dropdown.Item>
          <Dropdown.Item eventKey="Grenada">Grenada</Dropdown.Item>
          <Dropdown.Item eventKey="Guadeloupe">Guadeloupe</Dropdown.Item>
          <Dropdown.Item eventKey="Guam">Guam</Dropdown.Item>
          <Dropdown.Item eventKey="Guatemala">Guatemala</Dropdown.Item>
          <Dropdown.Item eventKey="Guinea">Guinea</Dropdown.Item>
          <Dropdown.Item eventKey="Guinea-bissau">Guinea-bissau</Dropdown.Item>
          <Dropdown.Item eventKey="Guyana">Guyana</Dropdown.Item>
          <Dropdown.Item eventKey="Haiti">Haiti</Dropdown.Item>
          <Dropdown.Item eventKey="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</Dropdown.Item>
          <Dropdown.Item eventKey="Holy See (Vatican City State)">Holy See (Vatican City State)</Dropdown.Item>
          <Dropdown.Item eventKey="Honduras">Honduras</Dropdown.Item>
          <Dropdown.Item eventKey="Hong Kong">Hong Kong</Dropdown.Item>
          <Dropdown.Item eventKey="Hungary">Hungary</Dropdown.Item>
          <Dropdown.Item eventKey="Iceland">Iceland</Dropdown.Item>
          <Dropdown.Item eventKey="India">India</Dropdown.Item>
          <Dropdown.Item eventKey="Indonesia">Indonesia</Dropdown.Item>
          <Dropdown.Item eventKey="Iran, Islamic Republic of">Iran, Islamic Republic of</Dropdown.Item>
          <Dropdown.Item eventKey="Iraq">Iraq</Dropdown.Item>
          <Dropdown.Item eventKey="Ireland">Ireland</Dropdown.Item>
          <Dropdown.Item eventKey="Israel">Israel</Dropdown.Item>
          <Dropdown.Item eventKey="Italy">Italy</Dropdown.Item>
          <Dropdown.Item eventKey="Jamaica">Jamaica</Dropdown.Item>
          <Dropdown.Item eventKey="Japan">Japan</Dropdown.Item>
          <Dropdown.Item eventKey="Jordan">Jordan</Dropdown.Item>
          <Dropdown.Item eventKey="Kazakhstan">Kazakhstan</Dropdown.Item>
          <Dropdown.Item eventKey="Kenya">Kenya</Dropdown.Item>
          <Dropdown.Item eventKey="Kiribati">Kiribati</Dropdown.Item>
          <Dropdown.Item eventKey="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</Dropdown.Item>
          <Dropdown.Item eventKey="Korea, Republic of">Korea, Republic of</Dropdown.Item>
          <Dropdown.Item eventKey="Kosovo">Kosovo</Dropdown.Item>
          <Dropdown.Item eventKey="Kuwait">Kuwait</Dropdown.Item>
          <Dropdown.Item eventKey="Kyrgyzstan">Kyrgyzstan</Dropdown.Item>
          <Dropdown.Item eventKey="Lao People's Democratic Republic">Lao People's Democratic Republic</Dropdown.Item>
          <Dropdown.Item eventKey="Latvia">Latvia</Dropdown.Item>
          <Dropdown.Item eventKey="Lebanon">Lebanon</Dropdown.Item>
          <Dropdown.Item eventKey="Lesotho">Lesotho</Dropdown.Item>
          <Dropdown.Item eventKey="Liberia">Liberia</Dropdown.Item>
          <Dropdown.Item eventKey="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</Dropdown.Item>
          <Dropdown.Item eventKey="Liechtenstein">Liechtenstein</Dropdown.Item>
          <Dropdown.Item eventKey="Lithuania">Lithuania</Dropdown.Item>
          <Dropdown.Item eventKey="Luxembourg">Luxembourg</Dropdown.Item>
          <Dropdown.Item eventKey="Macao">Macao</Dropdown.Item>
          <Dropdown.Item eventKey="North Macedonia">North Macedonia</Dropdown.Item>
          <Dropdown.Item eventKey="Madagascar">Madagascar</Dropdown.Item>
          <Dropdown.Item eventKey="Malawi">Malawi</Dropdown.Item>
          <Dropdown.Item eventKey="Malaysia">Malaysia</Dropdown.Item>
          <Dropdown.Item eventKey="Maldives">Maldives</Dropdown.Item>
          <Dropdown.Item eventKey="Mali">Mali</Dropdown.Item>
          <Dropdown.Item eventKey="Malta">Malta</Dropdown.Item>
          <Dropdown.Item eventKey="Marshall Islands">Marshall Islands</Dropdown.Item>
          <Dropdown.Item eventKey="Martinique">Martinique</Dropdown.Item>
          <Dropdown.Item eventKey="Mauritania">Mauritania</Dropdown.Item>
          <Dropdown.Item eventKey="Mauritius">Mauritius</Dropdown.Item>
          <Dropdown.Item eventKey="Mayotte">Mayotte</Dropdown.Item>
          <Dropdown.Item eventKey="Mexico">Mexico</Dropdown.Item>
          <Dropdown.Item eventKey="Micronesia, Federated States of">Micronesia, Federated States of</Dropdown.Item>
          <Dropdown.Item eventKey="Moldova, Republic of">Moldova, Republic of</Dropdown.Item>
          <Dropdown.Item eventKey="Monaco">Monaco</Dropdown.Item>
          <Dropdown.Item eventKey="Mongolia">Mongolia</Dropdown.Item>
          <Dropdown.Item eventKey="Montserrat">Montserrat</Dropdown.Item>
          <Dropdown.Item eventKey="Morocco">Morocco</Dropdown.Item>
          <Dropdown.Item eventKey="Mozambique">Mozambique</Dropdown.Item>
          <Dropdown.Item eventKey="Myanmar">Myanmar</Dropdown.Item>
          <Dropdown.Item eventKey="Namibia">Namibia</Dropdown.Item>
          <Dropdown.Item eventKey="Nauru">Nauru</Dropdown.Item>
          <Dropdown.Item eventKey="Nepal">Nepal</Dropdown.Item>
          <Dropdown.Item eventKey="Netherlands">Netherlands</Dropdown.Item>
          <Dropdown.Item eventKey="Netherlands Antilles">Netherlands Antilles</Dropdown.Item>
          <Dropdown.Item eventKey="New Caledonia">New Caledonia</Dropdown.Item>
          <Dropdown.Item eventKey="New Zealand">New Zealand</Dropdown.Item>
          <Dropdown.Item eventKey="Nicaragua">Nicaragua</Dropdown.Item>
          <Dropdown.Item eventKey="Niger">Niger</Dropdown.Item>
          <Dropdown.Item eventKey="Nigeria">Nigeria</Dropdown.Item>
          <Dropdown.Item eventKey="Niue">Niue</Dropdown.Item>
          <Dropdown.Item eventKey="Norfolk Island">Norfolk Island</Dropdown.Item>
          <Dropdown.Item eventKey="Northern Mariana Islands">Northern Mariana Islands</Dropdown.Item>
          <Dropdown.Item eventKey="Norway">Norway</Dropdown.Item>
          <Dropdown.Item eventKey="Oman">Oman</Dropdown.Item>
          <Dropdown.Item eventKey="Pakistan">Pakistan</Dropdown.Item>
          <Dropdown.Item eventKey="Palau">Palau</Dropdown.Item>
          <Dropdown.Item eventKey="Palestinian Territory, Occupied">Palestinian Territory, Occupied</Dropdown.Item>
          <Dropdown.Item eventKey="Panama">Panama</Dropdown.Item>
          <Dropdown.Item eventKey="Papua New Guinea">Papua New Guinea</Dropdown.Item>
          <Dropdown.Item eventKey="Paraguay">Paraguay</Dropdown.Item>
          <Dropdown.Item eventKey="Peru">Peru</Dropdown.Item>
          <Dropdown.Item eventKey="Philippines">Philippines</Dropdown.Item>
          <Dropdown.Item eventKey="Pitcairn">Pitcairn</Dropdown.Item>
          <Dropdown.Item eventKey="Poland">Poland</Dropdown.Item>
          <Dropdown.Item eventKey="Portugal">Portugal</Dropdown.Item>
          <Dropdown.Item eventKey="Puerto Rico">Puerto Rico</Dropdown.Item>
          <Dropdown.Item eventKey="Qatar">Qatar</Dropdown.Item>
          <Dropdown.Item eventKey="Reunion">Reunion</Dropdown.Item>
          <Dropdown.Item eventKey="Romania">Romania</Dropdown.Item>
          <Dropdown.Item eventKey="Russian Federation">Russian Federation</Dropdown.Item>
          <Dropdown.Item eventKey="Rwanda">Rwanda</Dropdown.Item>
          <Dropdown.Item eventKey="Saint Helena">Saint Helena</Dropdown.Item>
          <Dropdown.Item eventKey="Saint Kitts and Nevis">Saint Kitts and Nevis</Dropdown.Item>
          <Dropdown.Item eventKey="Saint Lucia">Saint Lucia</Dropdown.Item>
          <Dropdown.Item eventKey="Saint Pierre and Miquelon">Saint Pierre and Miquelon</Dropdown.Item>
          <Dropdown.Item eventKey="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</Dropdown.Item>
          <Dropdown.Item eventKey="Samoa">Samoa</Dropdown.Item>
          <Dropdown.Item eventKey="San Marino">San Marino</Dropdown.Item>
          <Dropdown.Item eventKey="Sao Tome and Principe">Sao Tome and Principe</Dropdown.Item>
          <Dropdown.Item eventKey="Saudi Arabia">Saudi Arabia</Dropdown.Item>
          <Dropdown.Item eventKey="Senegal">Senegal</Dropdown.Item>
          <Dropdown.Item eventKey="Serbia">Serbia</Dropdown.Item>
          <Dropdown.Item eventKey="Montenegro">Montenegro</Dropdown.Item>
          <Dropdown.Item eventKey="Seychelles">Seychelles</Dropdown.Item>
          <Dropdown.Item eventKey="Sierra Leone">Sierra Leone</Dropdown.Item>
          <Dropdown.Item eventKey="Singapore">Singapore</Dropdown.Item>
          <Dropdown.Item eventKey="Slovakia">Slovakia</Dropdown.Item>
          <Dropdown.Item eventKey="Slovenia">Slovenia</Dropdown.Item>
          <Dropdown.Item eventKey="Solomon Islands">Solomon Islands</Dropdown.Item>
          <Dropdown.Item eventKey="Somalia">Somalia</Dropdown.Item>
          <Dropdown.Item eventKey="South Africa">South Africa</Dropdown.Item>
          <Dropdown.Item eventKey="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</Dropdown.Item>
          <Dropdown.Item eventKey="Spain">Spain</Dropdown.Item>
          <Dropdown.Item eventKey="Sri Lanka">Sri Lanka</Dropdown.Item>
          <Dropdown.Item eventKey="Sudan">Sudan</Dropdown.Item>
          <Dropdown.Item eventKey="Suriname">Suriname</Dropdown.Item>
          <Dropdown.Item eventKey="Svalbard and Jan Mayen">Svalbard and Jan Mayen</Dropdown.Item>
          <Dropdown.Item eventKey="Swaziland">Swaziland</Dropdown.Item>
          <Dropdown.Item eventKey="Sweden">Sweden</Dropdown.Item>
          <Dropdown.Item eventKey="Switzerland">Switzerland</Dropdown.Item>
          <Dropdown.Item eventKey="Syrian Arab Republic">Syrian Arab Republic</Dropdown.Item>
          <Dropdown.Item eventKey="Taiwan, Province of China">Taiwan, Province of China</Dropdown.Item>
          <Dropdown.Item eventKey="Tajikistan">Tajikistan</Dropdown.Item>
          <Dropdown.Item eventKey="Tanzania, United Republic of">Tanzania, United Republic of</Dropdown.Item>
          <Dropdown.Item eventKey="Thailand">Thailand</Dropdown.Item>
          <Dropdown.Item eventKey="Timor-leste">Timor-leste</Dropdown.Item>
          <Dropdown.Item eventKey="Togo">Togo</Dropdown.Item>
          <Dropdown.Item eventKey="Tokelau">Tokelau</Dropdown.Item>
          <Dropdown.Item eventKey="Tonga">Tonga</Dropdown.Item>
          <Dropdown.Item eventKey="Trinidad and Tobago">Trinidad and Tobago</Dropdown.Item>
          <Dropdown.Item eventKey="Tunisia">Tunisia</Dropdown.Item>
          <Dropdown.Item eventKey="Turkey">Turkey</Dropdown.Item>
          <Dropdown.Item eventKey="Turkmenistan">Turkmenistan</Dropdown.Item>
          <Dropdown.Item eventKey="Turks and Caicos Islands">Turks and Caicos Islands</Dropdown.Item>
          <Dropdown.Item eventKey="Tuvalu">Tuvalu</Dropdown.Item>
          <Dropdown.Item eventKey="Uganda">Uganda</Dropdown.Item>
          <Dropdown.Item eventKey="Ukraine">Ukraine</Dropdown.Item>
          <Dropdown.Item eventKey="United Arab Emirates">United Arab Emirates</Dropdown.Item>
          <Dropdown.Item eventKey="United Kingdom">United Kingdom</Dropdown.Item>
          <Dropdown.Item eventKey="United States">United States</Dropdown.Item>
          <Dropdown.Item eventKey="United States Minor Outlying Islands">United States Minor Outlying Islands</Dropdown.Item>
          <Dropdown.Item eventKey="Uruguay">Uruguay</Dropdown.Item>
          <Dropdown.Item eventKey="Uzbekistan">Uzbekistan</Dropdown.Item>
          <Dropdown.Item eventKey="Vanuatu">Vanuatu</Dropdown.Item>
          <Dropdown.Item eventKey="Venezuela">Venezuela</Dropdown.Item>
          <Dropdown.Item eventKey="Viet Nam">Viet Nam</Dropdown.Item>
          <Dropdown.Item eventKey="Virgin Islands, British">Virgin Islands, British</Dropdown.Item>
          <Dropdown.Item eventKey="Virgin Islands, U.S.">Virgin Islands, U.S.</Dropdown.Item>
          <Dropdown.Item eventKey="Wallis and Futuna">Wallis and Futuna</Dropdown.Item>
          <Dropdown.Item eventKey="Western Sahara">Western Sahara</Dropdown.Item>
          <Dropdown.Item eventKey="Yemen">Yemen</Dropdown.Item>
          <Dropdown.Item eventKey="Zambia">Zambia</Dropdown.Item>
          <Dropdown.Item eventKey="Zimbabwe">Zimbabwe</Dropdown.Item>
    </DropdownButton>

        <input type="hidden" id={`field_country` + getProfileUserId} value={getSelectedCountry} />
    </>
  )
}

export default EditCountry;
