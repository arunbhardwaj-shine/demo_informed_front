import { useState, useEffect } from "react";
import { Button, Modal, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Login from "./../Auth/Login";
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
    if(token==null||token==undefined){
      navigate("/webinar")
    }
  }, [localStorage.getItem("Token"), token]);
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Link className="nav__link nav__link_head" to="/dashboard">
          {/* <div className="nav__preview"><img className="nav__pic" src={Logo} alt="Logo" /></div> */}
          {/* <div className="container__title title title_md"><img className="nav__pic" src={betaCRM} alt="betaCRM" /></div> */}
        </Link>
        <div className="container">
          <Link to="/">Library</Link>
        </div>
        <div className="container">
          <Link to="/">Readers</Link>
        </div>
        <div className="container">
          <Link to="/">Analytics</Link>
        </div>
        <div className="container">
          <Link to="/">Distrubute</Link>
        </div>
        <div className="container">
          <Link to={localStorage.getItem("Token")?"/Webinar/dashboard":"/"}>Webinar</Link>
        </div>
        {token ? (
          <div className={
              dropdownOpen
                ? "container__new new js-new open"
                : "container__new new js-new"}>
            <Button
              onClick={() => {
                setSmShow(true);
                setDropdownOpen(!dropdownOpen);}} >
              Welcome ,{usernameget}
            </Button>
            <Modal size="sm" show={smShow}
              onHide={() => setSmShow(false)}
              aria-labelledby="example-modal-sizes-title-sm">
              <Modal.Body>
                <div className="new__dropdown js-new-dropdown">
                  <a className="new__item" onClick={(e) => e.preventDefault()}>
                    <div className="new__title">New Project</div>
                  </a>
                  <a className="new__item" onClick={(e) => e.preventDefault()}>
                    <div className="new__title">New Task</div>
                  </a>
                  <a className="new__item" onClick={(e) => e.preventDefault()}>
                    <div className="new__title">New Contact</div>
                  </a>
                  <a className="new__item" onClick={(e) => e.preventDefault()}>
                    <div className="new__title">New Event</div>
                  </a>
                  <a className="new__item" onClick={(e) => e.preventDefault()}>
                    <div className="new__title">New Product</div>
                  </a>
                  <a className="new__item" onClick={(e) => e.preventDefault()}>
                    <div className="new__title">New Invoice</div>
                  </a>
                  <button
                    className="btn btn-primary btn-user btn-block" type="submit"
                    onClick={() => {
                      localStorage.removeItem("Token");
                      setDropdownOpen(false);}}>
                    Logout
                  </button>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        ) : (
          <div
            className={
              dropdownOpen ? "container__new new js-new open"
                : "container__new new js-new"}>
            <Button
              onClick={() => {setSmShowLogin(true);
                setDropdownOpen(!dropdownOpen);}}>
              Login
            </Button>
            <Modal size="sm" show={smShowLogin}
              onHide={() => setSmShowLogin(false)}
              aria-labelledby="example-modal-sizes-title-sm" >
              <Modal.Body>
                <Login active={hengleLonginPage} />
              </Modal.Body>
            </Modal>
            <div className="new__backdrop backdrop js-new-backdrop"
              onClick={() => {
                setSmShowLogin(false);
                setDropdownOpen(false);}}
            ></div>
          </div>)}
      </Navbar>
    </div>);};
export default Header;
