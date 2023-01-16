import React, { useState } from 'react'
import { Col, Dropdown, DropdownButton, Form, Modal, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SmartListAdd = () => {
    const [field, setField] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
    <Col className="right-sidebar">
      <div className="custom-container">    
        <Row>
          <div className="page-top-nav">
                      <div className="row justify-content-end align-items-center">
            <div className="col-12 col-md-2">
                      <div className="header-btn-left">
                <button  className="btn btn-primary btn-bordered back"><Link to="/readers-view">Back</Link></button>
                </div>
            </div>
            <div className="col-12 col-md-6">

            </div>
            <div className="col-12 col-md-4">  
              <div className="header-btn">
                <button onClick={handleShow}
                  className="btn btn-primary btn-bordered upload">
                    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" fill="none">
                    <path d="M88 63C86.9391 63 85.9217 63.4214 85.1716 64.1716C84.4214 64.9217 84 65.9391 84 67V72.852C83.9968 75.8076 82.8213 78.6413 80.7313 80.7313C78.6413 82.8213 75.8077 83.9968 72.852 84H23.148C20.1923 83.9968 17.3586 82.8213 15.2687 80.7313C13.1787 78.6413 12.0032 75.8076 12 72.852V67C12 65.9391 11.5786 64.9217 10.8284 64.1716C10.0783 63.4214 9.06087 63 8 63C6.93913 63 5.92172 63.4214 5.17157 64.1716C4.42143 64.9217 4 65.9391 4 67V72.852C4.00529 77.9287 6.02437 82.796 9.61417 86.3858C13.204 89.9756 18.0713 91.9947 23.148 92H72.852C77.9287 91.9947 82.796 89.9756 86.3858 86.3858C89.9756 82.796 91.9947 77.9287 92 72.852V67C92 65.9391 91.5786 64.9217 90.8284 64.1716C90.0783 63.4214 89.0609 63 88 63Z" fill="#0066BE"/>
                    <path d="M70.7788 31.3305C70.0287 32.0803 69.0115 32.5016 67.9508 32.5016C66.8902 32.5016 65.8729 32.0803 65.1228 31.3305L51.9508 18.1585L52 67.0012C52 68.0621 51.5786 69.0795 50.8284 69.8296C50.0783 70.5798 49.0609 71.0012 48 71.0012C46.9391 71.0012 45.9217 70.5798 45.1716 69.8296C44.4214 69.0795 44 68.0621 44 67.0012L43.9508 18.1585L30.7788 31.3305C30.0244 32.0591 29.014 32.4623 27.9652 32.4532C26.9165 32.444 25.9132 32.0234 25.1716 31.2817C24.4299 30.5401 24.0093 29.5369 24.0002 28.4881C23.991 27.4393 24.3942 26.4289 25.1228 25.6745L45.1228 5.67447C45.4944 5.30196 45.9358 5.00642 46.4218 4.80477C46.9077 4.60312 47.4287 4.49932 47.9548 4.49932C48.481 4.49932 49.002 4.60312 49.4879 4.80477C49.9739 5.00642 50.4153 5.30196 50.7868 5.67447L70.7868 25.6745C71.5357 26.4256 71.9555 27.4435 71.954 28.5041C71.9525 29.5648 71.5298 30.5814 70.7788 31.3305Z" fill="#0066BE"/>
                    </svg> Upload
                </button>
                <button 
                  className="btn btn-primary btn-filled next">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        </Row>
        <Row>
            <div className='create-reader'>
                <h4>Create Smart List</h4>
                <h6>Please name this list and then select who to include.You can pick one or more.</h6>
                <Form className='d-flex flex-wrap row'>
                    <Form.Group className="mb-3 col-6 form-group">
                      <Form.Label>Name of SmartList</Form.Label>
                      <Form.Control
                        name="name-of-smartList"
                        type="text"
                        placeholder="Name of SmartList"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 col-6 form-group">
                      <Form.Label>Registered or Unregistered Users?</Form.Label>
                      <DropdownButton className="dropdown-basic-button split-button-dropup" title="Registered or Unregistered Users">
                        <Dropdown.Item>Select</Dropdown.Item>
                        <Dropdown.Item>Registered Users</Dropdown.Item>
                        <Dropdown.Item>Unregistered Users</Dropdown.Item>
                      </DropdownButton>
                    </Form.Group>
                    
                    <Form.Group  className="mb-3 col-6 form-group" as={Col} controlId="my_product_field">
                      <Form.Label>Contact type</Form.Label>
                      <div className='form-product-list'>
                        <Form.Control as="select" multiple value={field} onChange={e => setField([].slice.call(e.target.selectedOptions).map(item => item.value))}>
                            <option value="HCP">HCP</option>
                            <option value="Staff">Staff</option>
                            <option value="Test user">Test user</option>
                        </Form.Control>
                      </div>
                    </Form.Group>
                    <Form.Group  className="mb-3 col-6 form-group" as={Col} controlId="my_indication_field">
                      <Form.Label>Speciality</Form.Label>
                      <div className='form-interest-area'>
                        <Form.Control as="select" multiple value={field} onChange={e => setField([].slice.call(e.target.selectedOptions).map(item => item.value))}>
                            <option value="Anaesthesia &amp; Intensive care">Anaesthesia &amp; Intensive care</option>
                            <option value="CIDP and MMN">CIDP and MMN</option>
                            <option value="Cardiac surgery">Cardiac surgery</option>
                            <option value="GBS">GBS</option>
                            <option value="General Haematology">General Haematology</option>
                            <option value="Haematological malignancies">Haematological malignancies</option>
                            <option value="Haemophilia and VWD">Haemophilia and VWD</option>
                            <option value="Immunology">Immunology</option>
                            <option value="Neurology">Neurology</option>
                            <option value="Transplantation">Transplantation</option>
                            <option value="Trauma">Trauma</option>
                            <option value="Other">Other</option>
                        </Form.Control>
                      </div>
                    </Form.Group>
                    <Form.Group  className="mb-3 col-6 form-group" as={Col} controlId="my_country_field">
                      <Form.Label>Country</Form.Label>
                      <div className='form-interest-area'>
                        <Form.Control as="select" multiple value={field} onChange={e => setField([].slice.call(e.target.selectedOptions).map(item => item.value))}>
                            <option value="USA">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Austria">Austria</option>
                            <option value="Russia">Russia</option>
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="American Samoa">American Samoa</option>
                            <option value="Andorra">Andorra</option>
                            <option value="Angola">Angola</option>
                            <option value="Anguilla">Anguilla</option>
                            <option value="Antarctica">Antarctica</option>
                            <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Armenia">Armenia</option>
                            <option value="Aruba">Aruba</option>
                            <option value="Australia">Australia</option>
                            <option value="Azerbaijan">Azerbaijan</option>
                            <option value="Bahamas">Bahamas</option>
                            <option value="Bahrain">Bahrain</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Barbados">Barbados</option>
                            <option value="Belarus">Belarus</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Belize">Belize</option>
                            <option value="Benin">Benin</option>
                            <option value="Bermuda">Bermuda</option>
                            <option value="Bhutan">Bhutan</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="B&amp;H">Bosnia and Herzegovina</option>
                            <option value="Botswana">Botswana</option>
                            <option value="Bouvet Island">Bouvet Island</option>
                            <option value="Brazil">Brazil</option>
                            <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                            <option value="Brunei Darussalam">Brunei Darussalam</option>
                            <option value="Bulgaria">Bulgaria</option>
                            <option value="Burkina Faso">Burkina Faso</option>
                            <option value="Burundi">Burundi</option>
                            <option value="Cambodia">Cambodia</option>
                            <option value="Cameroon">Cameroon</option>
                            <option value="Canada">Canada</option>
                            <option value="Cape Verde">Cape Verde</option>
                            <option value="Cayman Islands">Cayman Islands</option>
                            <option value="Central African Republic">Central African Republic</option>
                            <option value="Chad">Chad</option>
                            <option value="Chile">Chile</option>
                            <option value="China">China</option>
                            <option value="Christmas Island">Christmas Island</option>
                            <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Comoros">Comoros</option>
                            <option value="Congo">Congo</option>
                            <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                            <option value="Cook Islands">Cook Islands</option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Cote D'ivoire">Cote D'ivoire</option>
                            <option value="Croatia">Croatia</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Cyprus">Cyprus</option>
                            <option value="Czech Republic">Czech Republic</option>
                            <option value="Denmark">Denmark</option>
                            <option value="Djibouti">Djibouti</option>
                            <option value="Dominica">Dominica</option>
                            <option value="Dominican Republic">Dominican Republic</option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="Egypt">Egypt</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Equatorial Guinea">Equatorial Guinea</option>
                            <option value="Eritrea">Eritrea</option>
                            <option value="Estonia">Estonia</option>
                            <option value="Ethiopia">Ethiopia</option>
                            <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                            <option value="Faroe Islands">Faroe Islands</option>
                            <option value="Fiji">Fiji</option>
                            <option value="Finland">Finland</option>
                            <option value="France">France</option>
                            <option value="French Guiana">French Guiana</option>
                            <option value="French Polynesia">French Polynesia</option>
                            <option value="French Southern Territories">French Southern Territories</option>
                            <option value="Gabon">Gabon</option>
                            <option value="Gambia">Gambia</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Germany">Germany</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Gibraltar">Gibraltar</option>
                            <option value="Greece">Greece</option>
                            <option value="Greenland">Greenland</option>
                            <option value="Grenada">Grenada</option>
                            <option value="Guadeloupe">Guadeloupe</option>
                            <option value="Guam">Guam</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Guinea">Guinea</option>
                            <option value="Guinea-bissau">Guinea-bissau</option>
                            <option value="Guyana">Guyana</option>
                            <option value="Haiti">Haiti</option>
                            <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                            <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                            <option value="Honduras">Honduras</option>
                            <option value="Hong Kong">Hong Kong</option>
                            <option value="Hungary">Hungary</option>
                            <option value="Iceland">Iceland</option>
                            <option value="India">India</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                            <option value="Iraq">Iraq</option>
                            <option value="Ireland">Ireland</option>
                            <option value="Israel">Israel</option>
                            <option value="Italy">Italy</option>
                            <option value="Jamaica">Jamaica</option>
                            <option value="Japan">Japan</option>
                            <option value="Jordan">Jordan</option>
                            <option value="Kazakhstan">Kazakhstan</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Kiribati">Kiribati</option>
                            <option value="Korea">Korea</option>
                            <option value="Kosovo">Kosovo</option>
                            <option value="Kuwait">Kuwait</option>
                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                            <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                            <option value="Latvia">Latvia</option>
                            <option value="Lebanon">Lebanon</option>
                            <option value="Lesotho">Lesotho</option>
                            <option value="Liberia">Liberia</option>
                            <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                            <option value="Liechtenstein">Liechtenstein</option>
                            <option value="Lithuania">Lithuania</option>
                            <option value="Luxembourg">Luxembourg</option>
                            <option value="Macao">Macao</option>
                            <option value="North Macedonia">North Macedonia</option>
                            <option value="Madagascar">Madagascar</option>
                            <option value="Malawi">Malawi</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Mali">Mali</option>
                            <option value="Malta">Malta</option>
                            <option value="Marshall Islands">Marshall Islands</option>
                            <option value="Martinique">Martinique</option>
                            <option value="Mauritania">Mauritania</option>
                            <option value="Mauritius">Mauritius</option>
                            <option value="Mayotte">Mayotte</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                            <option value="Moldova, Republic of">Moldova, Republic of</option>
                            <option value="Monaco">Monaco</option>
                            <option value="Mongolia">Mongolia</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Morocco">Morocco</option>
                            <option value="Mozambique">Mozambique</option>
                            <option value="Myanmar">Myanmar</option>
                            <option value="Namibia">Namibia</option>
                            <option value="Nauru">Nauru</option>
                            <option value="Nepal">Nepal</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="Netherlands Antilles">Netherlands Antilles</option>
                            <option value="New Caledonia">New Caledonia</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Nicaragua">Nicaragua</option>
                            <option value="Niger">Niger</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Niue">Niue</option>
                            <option value="Norfolk Island">Norfolk Island</option>
                            <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                            <option value="Norway">Norway</option>
                            <option value="Nordic">Nordic</option>
                            <option value="Oman">Oman</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Palau">Palau</option>
                            <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                            <option value="Panama">Panama</option>
                            <option value="Papua New Guinea">Papua New Guinea</option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Peru">Peru</option>
                            <option value="Philippines">Philippines</option>
                            <option value="Pitcairn">Pitcairn</option>
                            <option value="Poland">Poland</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Puerto Rico">Puerto Rico</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Reunion">Reunion</option>
                            <option value="Romania">Romania</option>
                            <option value="Rwanda">Rwanda</option>
                            <option value="Saint Helena">Saint Helena</option>
                            <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                            <option value="Saint Lucia">Saint Lucia</option>
                            <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                            <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                            <option value="Samoa">Samoa</option>
                            <option value="San Marino">San Marino</option>
                            <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Senegal">Senegal</option>
                            <option value="Serbia">Serbia</option>
                            <option value="Montenegro">Montenegro</option>
                            <option value="Seychelles">Seychelles</option>
                            <option value="Sierra Leone">Sierra Leone</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Slovakia">Slovakia</option>
                            <option value="Slovenia">Slovenia</option>
                            <option value="Solomon Islands">Solomon Islands</option>
                            <option value="Somalia">Somalia</option>
                            <option value="South Africa">South Africa</option>
                            <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                            <option value="Spain">Spain</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="Sudan">Sudan</option>
                            <option value="Suriname">Suriname</option>
                            <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                            <option value="Swaziland">Swaziland</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                            <option value="Taiwan, Province of China">Taiwan, Province of China</option>
                            <option value="Tajikistan">Tajikistan</option>
                            <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Timor-leste">Timor-leste</option>
                            <option value="Togo">Togo</option>
                            <option value="Tokelau">Tokelau</option>
                            <option value="Tonga">Tonga</option>
                            <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                            <option value="Tunisia">Tunisia</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Turkmenistan">Turkmenistan</option>
                            <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                            <option value="Tuvalu">Tuvalu</option>
                            <option value="Uganda">Uganda</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="United Arab Emirates">United Arab Emirates</option>
                            <option value="United States">United States</option>
                            <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                            <option value="Uruguay">Uruguay</option>
                            <option value="Uzbekistan">Uzbekistan</option>
                            <option value="Vanuatu">Vanuatu</option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="Viet Nam">Viet Nam</option>
                            <option value="Virgin Islands, British">Virgin Islands, British</option>
                            <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                            <option value="Wallis and Futuna">Wallis and Futuna</option>
                            <option value="Western Sahara">Western Sahara</option>
                            <option value="Yemen">Yemen</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Zimbabwe">Zimbabwe</option>
                        </Form.Control>
                      </div>
                    </Form.Group>
                </Form>
            </div>
        </Row>
      </div>
       <Modal show={show} onHide={handleClose} className="send-confirm" id="upload-confirm">
        <Modal.Header closeButton>
          <Modal.Title><h4>Upload File</h4></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Use this side for adding multiple contacts via an excel sheet. <br/><a href="https:informed.pro/Readers/download" id="download_excel_id" title="Please download the sample Excel file, follow the same format and save it in your pc, then upload file." download="">Download the sample Excel file</a></p>
            <div class="upload-file-box">
              <div class="box">
                <input type="file" name="file" id="upload-file"class="inputfile inputfile-5" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" data-multiple-caption="{count} files selected"/>
                  <>
                    <label for="upload-file">
                      <span>Choose Your File</span>
                    </label>
                    <p>Upload your new list file</p>
                  </>
              </div>
        </div>
              <h4>Please upload max 300 readers at once.</h4>
        <div class="modal-buttons"> <button type="button"  onClick={handleClose} class="btn btn-primary btn-bordered light" data-bs-dismiss="modal">Upload</button></div>
        </Modal.Body>
      </Modal>
    </Col>
    </>
  )
}

export default SmartListAdd