import React from "react";
import { Col, Row } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

const DefaultWebinar = () => {
  const path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

  return (
    <>
      <Col className="col right-sidebar">
        <div className="custom-container">
          <Row>
              <div className="search_view readers">
                  <div className="smart-list-btns">
                    <div className="top-right-action">
                      <div className="col">
                        <label>Select Event</label>
                        <Dropdown>
                          <Dropdown.Toggle variant="default">
                            1:1 meeting with IBU Haematology
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="#">1:1 meeting with IBU Haematology</Dropdown.Item>
                            <Dropdown.Item href="#">PUP haematology</Dropdown.Item>
                            <Dropdown.Item href="#">Making informed treatment decisions in previously  untreated patients with severe haemophilia A</Dropdown.Item>
                            <Dropdown.Item href="#">PUP haematology</Dropdown.Item>
                            <Dropdown.Item href="#">Haematology</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="col">
                        <label>Select Country</label>
                        <Dropdown>
                          <Dropdown.Toggle variant="default">
                            Select country
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="#">Afghanistan</Dropdown.Item>
                            <Dropdown.Item href="#">Australia</Dropdown.Item>
                            <Dropdown.Item href="#">Ireland</Dropdown.Item>
                            <Dropdown.Item href="#">Italy</Dropdown.Item>
                            <Dropdown.Item href="#">Kuwait</Dropdown.Item>
                            <Dropdown.Item href="#">South Africa</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="col">
                        <label>Select User type</label>
                        <Dropdown>
                          <Dropdown.Toggle variant="default">
                            Select type
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="#">HCP</Dropdown.Item>
                            <Dropdown.Item href="#">HCP Team</Dropdown.Item>
                            <Dropdown.Item href="#">Staff User</Dropdown.Item>
                            <Dropdown.Item href="#">Distributor</Dropdown.Item>
                            <Dropdown.Item href="#">Test user</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="col">
                        <label>Select Type</label>
                        <Dropdown>
                          <Dropdown.Toggle variant="default">
                            Select type
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="#">Virtual</Dropdown.Item>
                            <Dropdown.Item href="#">Live</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="search-bar col">
                        <form
                          className="d-flex">
                             <label>Search</label>
                          <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search by name or email"
                            aria-label="Search"/>
                        
                            <button className="btn btn-outline-success" type="submit">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15.8045 14.862L11.2545 10.312C12.1359 9.22334 12.6665 7.84 12.6665 6.33334C12.6665 2.84134 9.82522 0 6.33325 0C2.84128 0 0 2.84131 0 6.33331C0 9.82531 2.84132 12.6667 6.33328 12.6667C7.83992 12.6667 9.22325 12.136 10.3119 11.2547L14.8619 15.8047C14.9919 15.9347 15.1625 16 15.3332 16C15.5039 16 15.6745 15.9347 15.8045 15.8047C16.0652 15.544 16.0652 15.1227 15.8045 14.862ZM6.33328 11.3333C3.57597 11.3333 1.33333 9.09066 1.33333 6.33331C1.33333 3.57597 3.57597 1.33331 6.33328 1.33331C9.0906 1.33331 11.3332 3.57597 11.3332 6.33331C11.3332 9.09066 9.09057 11.3333 6.33328 11.3333Z"
                                  fill="#97B6CF"
                                ></path>
                              </svg>
                            </button>
                        </form>
                      </div>
                      <div className="download-excel col">
                        <a href="javascript:;" class="dnl_re" onclick="download_user(this)">
                            <img src="https://cdn-icons-png.flaticon.com/512/338/338840.png" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
            </Row>
           <div className="selected-webinar-list">
            <table className="table webinar-reader">
              <thead className="sticky-header">
                <tr>
                  <th scope="col">S.no.</th>      
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Country</th>
                  <th scope="col">State</th>
                  <th scope="col">Category</th>
                  <th scope="col">SignUp Date</th>
                  <th scope="col">User Type</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="form-group">
                <tr className="seprator-add">
                  <td colspan="9"></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Infoshiv</td>
                    <td>info@whmcsglobalservices.com</td>
                    <td>Anguilla</td>
                    <td>N/A</td>
                    <td>Live</td>
                    <td>22-Nov-2022 07:16 am</td>
                    <td><Dropdown>
                          <Dropdown.Toggle variant="light">
                            Select User Type
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item href="#">HCP</Dropdown.Item>
                            <Dropdown.Item href="#">HCP Team</Dropdown.Item>
                            <Dropdown.Item href="#">Staff User</Dropdown.Item>
                            <Dropdown.Item href="#">Distributor</Dropdown.Item>
                            <Dropdown.Item href="#">Test User</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                    </td>
                    <td className='table_action'>
                      <table>
                        <tbody>
                          <tr>
                            <td><a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#0066be" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg></a></td>
                            <td><a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#0066be" d="M352 144c0-44.2 35.8-80 80-80s80 35.8 80 80v48c0 17.7 14.3 32 32 32s32-14.3 32-32V144C576 64.5 511.5 0 432 0S288 64.5 288 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H352V144z"/></svg></a></td>
                            <td><a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#c50e0e" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></a></td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Infoshiv</td>
                    <td>info@whmcsglobalservices.com</td>
                    <td>Anguilla</td>
                    <td>N/A</td>
                    <td>Live</td>
                    <td>22-Nov-2022 07:16 am</td>
                    <td><Dropdown>
                          <Dropdown.Toggle variant="light">
                            Select User Type
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item href="#">HCP</Dropdown.Item>
                            <Dropdown.Item href="#">HCP Team</Dropdown.Item>
                            <Dropdown.Item href="#">Staff User</Dropdown.Item>
                            <Dropdown.Item href="#">Distributor</Dropdown.Item>
                            <Dropdown.Item href="#">Test User</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                    </td>
                    <td className='table_action'>
                      <table>
                        <tbody>
                          <tr>
                            <td><a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#0066be" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg></a></td>
                            <td><a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#0066be" d="M352 144c0-44.2 35.8-80 80-80s80 35.8 80 80v48c0 17.7 14.3 32 32 32s32-14.3 32-32V144C576 64.5 511.5 0 432 0S288 64.5 288 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H352V144z"/></svg></a></td>
                            <td><a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#c50e0e" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></a></td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                <tr>
                    <td>1</td>
                    <td>Infoshiv</td>
                    <td>info@whmcsglobalservices.com</td>
                    <td>Anguilla</td>
                    <td>N/A</td>
                    <td>Live</td>
                    <td>22-Nov-2022 07:16 am</td>
                    <td><Dropdown>
                          <Dropdown.Toggle variant="light">
                            Select User Type
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item href="#">HCP</Dropdown.Item>
                            <Dropdown.Item href="#">HCP Team</Dropdown.Item>
                            <Dropdown.Item href="#">Staff User</Dropdown.Item>
                            <Dropdown.Item href="#">Distributor</Dropdown.Item>
                            <Dropdown.Item href="#">Test User</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                    </td>
                    <td className='table_action'>
                      <table>
                        <tbody>
                          <tr>
                            <td><a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#0066be" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg></a></td>
                            <td><a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#0066be" d="M352 144c0-44.2 35.8-80 80-80s80 35.8 80 80v48c0 17.7 14.3 32 32 32s32-14.3 32-32V144C576 64.5 511.5 0 432 0S288 64.5 288 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H352V144z"/></svg></a></td>
                            <td><a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#c50e0e" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></a></td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
              </tbody>
            </table>
            <div className="readers-webinar">
            <div className="list-webinar-readers">
                <h3>Total Webinar Users</h3>
                <h2>20</h2>
                <span>(Note: Total webinar users only include HCP's)</span>
            </div>
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};

export default DefaultWebinar;
