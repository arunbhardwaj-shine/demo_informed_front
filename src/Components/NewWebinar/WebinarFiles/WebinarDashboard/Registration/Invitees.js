import React from "react";
import { Button, Col } from "react-bootstrap";
import Select from "react-select";

const Invitees = () => {
  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <div className="row">
            <div className="top-header regi-web">
              <div className="page-title">
                <h2>Invitees</h2>
              </div>
            </div>
            <div className="page-top-nav smart_list_names sticky">
              <div className="d-flex justify-content-between align-items-center add-padding">
                <div className="d-flex event-select align-items-center">
                  <label htmlFor="">Total Registrations</label>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
               
                <div className="col-md-8">
                  <table className="table" id="table-to-xls">
                    <thead className="sticky-header">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Country</th>
                        <th scope="col">Registered</th>
                        <th scope="col">Last Email</th>
                       
                      </tr>
                    </thead>
                    <tbody className="form-group">
                      <tr>
                        <td>UserName1</td>
                        <td>Username1@gmail.com</td>
                        <td>India</td>
                        <td>12.19.2023</td>
                        <td>Invite Email</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              
                <div className="col-md-4">
                  <table className="table" id="table-to-xls">
                    <thead className="sticky-header">
                      <tr>
                        <th scope="col">User Type</th>
                      </tr>
                    </thead>
                    <tbody className="form-group">
                      <tr>
                      <td>
                        <Select
                    // options={dropDownData}
                    // placeholder="Select Event"
                    // name="province"
                    className="dropdown-basic-button split-button-dropup"
                    // isClearable
                    // onChange={handleSelectChange}
                    // value={selectedItem}
                  />
                        </td>
                        <td>
                          <Button>Save</Button>
                        </td>
                      </tr>
                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};

export default Invitees;
