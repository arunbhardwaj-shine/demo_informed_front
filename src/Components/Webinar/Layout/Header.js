import { useState, useEffect } from "react";
import { Button, Dropdown, DropdownButton, Modal, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Login from "./../../../Auth/Login";
// import Logo from "../../assets/img/informed-icon.png";
const Header = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [smShowLogin, setSmShowLogin] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("Token"));
  const [usernameget, setUsernameget] = useState(
    localStorage.getItem("username")
  );
  const hengleLonginPage = (data) => {
    setSmShowLogin(data);
    setDropdownOpen(data);
  };
  let navigate = useNavigate();
  useEffect(() => {
    setToken(localStorage.getItem("Token"));
    setUsernameget(localStorage.getItem("username"));
  }, [localStorage.getItem("Token"), token]);
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Link className="nav__link nav__link_head" to="/webinar">
          <div className="nav__preview">
            {" "}
            <img
              src="https://informed.pro/css/newtemplate/images/inforMed_Logo_Blue.png"
              height="28"
              alt="CoolBrand"
            />
          </div>
          {/* <div className="container__title title title_md"><img className="nav__pic" src={betaCRM} alt="betaCRM" /></div> */}
        </Link>
        <div className="container">
          <Link to="/webinar">Library</Link>
        </div>
        <div className="container">
          <Link to="/webinar">Readers</Link>
        </div>
        <div className="container">
          <Link to="/webinar">Analytics</Link>
        </div>
        <div className="container">
          <Link to="/webinar">Distrubute</Link>
        </div>
        <div className="container">
          <Link
            to={
              localStorage.getItem("Token") ? "/webinar/dashboard" : "/webinar"
            }
          >
            Webinar
          </Link>
        </div>
        {token?(
         <Dropdown>
         <Dropdown.Toggle variant="success" id="dropdown-basic">
          {usernameget?usernameget:"WellCome"}
         </Dropdown.Toggle>
       
         <Dropdown.Menu>
         <Dropdown.Item >Seting
             </Dropdown.Item>
         <Dropdown.Item onClick={()=>localStorage.removeItem("Token")}><Link to="/webinar">Logout</Link> </Dropdown.Item>
         </Dropdown.Menu>
       </Dropdown>
         
        ) : (
          <div
            className={
              dropdownOpen
                ? "container__new new js-new open"
                : "container__new new js-new"
            }
          >
            <Button
              onClick={() => {
                setSmShowLogin(true);
                setDropdownOpen(!dropdownOpen);
              }}
            >
              Login
            </Button>
            <Modal
              size="sm"
              show={smShowLogin}
              onHide={() => setSmShowLogin(false)}
              aria-labelledby="example-modal-sizes-title-sm"
            >
              <Modal.Body>
                <Login active={hengleLonginPage} />
              </Modal.Body>
            </Modal>
            <div
              className="new__backdrop backdrop js-new-backdrop"
              onClick={() => {
                setSmShowLogin(false);
                setDropdownOpen(false);
              }}
            ></div>
          </div>
        )}
      </Navbar>
    </div>
  );
};
export default Header;
