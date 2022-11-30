import React from 'react'
import { Button, Dropdown, Modal } from 'react-bootstrap';
import { Form, Link } from 'react-router-dom';

export const WebinarHeader = () => {
  return (
    <>
    {/* {console.log("- ium here")} */}
    <header>
    <nav className="navbar navbar-expand-sm navbar-light">
          <div className="container-fluid">
            <a className="navbar-brand">
              <img
                src="https://informed.pro/css/newtemplate/images/inforMed_Logo_Blue.png"
                width={230}
              />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsibleNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <a className="nav-link">Library</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">Readers</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">Analytics</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">Distrubute</a>
                </li>
                <li className="nav-item active active-main">
                    <a className="nav-link">Webinar</a>
                </li>
              </ul>
            </div>

            
              {/* <Form.Select
                 id="event"
                 value={localStorage.getItem("EventIdHeader")}>
                
              </Form.Select> */}
            
            <div className="user-login">
              
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    WelCome
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>Setting</Dropdown.Item>
                    <Dropdown.Item>Reset Password</Dropdown.Item>
                    <Dropdown.Item>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              
            </div>
          </div>
        </nav>
        
        </header>
    </>
  )
}
export default WebinarHeader;
