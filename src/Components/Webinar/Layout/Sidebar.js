import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
const Sidebar = () => {
  let path_image = "/" + process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  let path = process.env.REACT_APP_ASSETS_PATH_WEBINAR;
  const [token, setToken] = useState(true);
  const [getHomeStatus, setHomeStatus] = useState(false);
  const [EmailStatus, setEmailStatus] = useState(false);
  const [isHoveringHome, setIsHoveringHome] = useState(false);
  const [isHoveringEvents, setIsHoveringEvents] = useState(false);
  const [isHoveringRegistration, setIsHoveringRegistration] = useState(false);
  const [isHoveringEmails, setIsHoveringEmails] = useState(false);
  const [isHoveringReaders, setIsHoveringReaders] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (localStorage.getItem("Token")) {
      setToken(true);
    } else {
      document.body.classList.remove("sub_menu_toggle_sidebar");
      setHomeStatus(false);
      setEmailStatus(false);
      setToken(false);
    }
  }, [localStorage.getItem("Token")]);

  const toggleClassToBody = () => {
    document.body.classList.toggle("toggle_sidebar");
  };
  useEffect(() => {
    if (token === null || token === undefined) {
      document.body.classList.remove("sub_menu_toggle_sidebar");
      setHomeStatus(false);
      setEmailStatus(false);
      setToken(false);
    }
  }, [localStorage.getItem("Token"), token]);

  useEffect(() => {
    if (
      location.pathname === "/webinar/portal/registrationDetails" ||
      location.pathname === "/webinar/portal/registrationDetailslist"
    ) {
      // console.log("hi");
      setHomeStatus(true);
      const bodyHasClass = document.body.classList.contains(
        "sub_menu_toggle_sidebar"
      );

      if (!bodyHasClass) {
        document.body.classList.toggle("sub_menu_toggle_sidebar");
      }
    }
  }, []);
  useEffect(() => {
    if (
      location.pathname === "/webinar/portal/registrationDetails" ||
      location.pathname === "/webinar/portal/registrationDetailslist"||
      location.pathname === "/webinar/portal/createRegistration"||
      location.pathname === "/webinar/portal/Registrations"
    ) {
      // console.log("hi");
      setHomeStatus(true);
      const bodyHasClass = document.body.classList.contains(
        "sub_menu_toggle_sidebar"
      );

      if (!bodyHasClass) {
        document.body.classList.toggle("sub_menu_toggle_sidebar");
      }
    }
  }, []);

  useEffect(() => {
    if (
      location.pathname === "/webinar/email/WebinarSmartList" ||
      location.pathname === "/webinar/email/ViewSmartListWebinar" ||
      location.pathname === "/webinar/email/SmartListCreate" ||
      location.pathname === "/webinar/email/SmartListCreate/FilterList" ||
      location.pathname === "/webinar/email/SmartListCreate/ExcelUpload" ||
      location.pathname === "/webinar/email/template" ||
      location.pathname === "/webinar/email/emails" ||
      location.pathname === "/webinar/email/create" ||
      location.pathname === "/webinar/email/smart-list" ||
      location.pathname ===
        `/webinar/email/smart-list-users/${localStorage.getItem("SmartListId")}`
    ) {
      // console.log("hi");
      setEmailStatus(true);
      const bodyHasClass = document.body.classList.contains(
        "sub_menu_toggle_sidebar"
      );

      if (!bodyHasClass) {
        document.body.classList.toggle("sub_menu_toggle_sidebar");
      }
    }
  }, []);
  const showHideHome = (index) => {
    const bodyHasClass = document.body.classList.contains(
      "sub_menu_toggle_sidebar"
    );
    if (1 == index) {
      setEmailStatus(false);
      setHomeStatus(true);
      const bodyHasClass = document.body.classList.contains(
        "sub_menu_toggle_sidebar"
      );

      if (!bodyHasClass) {
        document.body.classList.toggle("sub_menu_toggle_sidebar");
      }
    } else if (2 == index) {
      const bodyHasClass = document.body.classList.contains(
        "sub_menu_toggle_sidebar"
      );

      if (!bodyHasClass) {
        document.body.classList.toggle("sub_menu_toggle_sidebar");
      }
      setHomeStatus(false);
      setEmailStatus(true);
      setHomeStatus(false);
    } else {
      document.body.classList.remove("sub_menu_toggle_sidebar");
      setEmailStatus(false);
      setHomeStatus(false);
    }
  };

  const handleMouseOverHome = () => {
    setIsHoveringHome(true);
  };

  const handleMouseOutHome = () => {
    setIsHoveringHome(false);
  };

  const handleMouseOverEvents = () => {
    setIsHoveringEvents(true);
  };

  const handleMouseOutEvents = () => {
    setIsHoveringEvents(false);
  };

  const handleMouseOverRegistration = () => {
    setIsHoveringRegistration(true);
  };

  const handleMouseOutRegistration = () => {
    setIsHoveringRegistration(false);
  };

  const handleMouseOverEmails = () => {
    setIsHoveringEmails(true);
  };

  const handleMouseOutEmails = () => {
    setIsHoveringEmails(false);
  };

  const handleMouseOverReaders = () => {
    setIsHoveringReaders(true);
  };

  const handleMouseOutReaders = () => {
    setIsHoveringReaders(false);
  };

  return (
    <div
      className="left-sidebar"
      id={
        localStorage.getItem("Token") === null ||
        localStorage.getItem("Token") === undefined
          ? "guestpage"
          : "loggedin"
      }
    >
      {location.pathname.includes("/webinar/register") ||
      location.pathname.includes("/webinar/editor") ? null : (
        <>
          {token ? (
            <>
              <div className="sidebar-menu">
                <ul>
                  <li
                    className={
                      location.pathname === "/webinar" ? "active" : "side_li"
                    }
                    onClick={showHideHome}
                  >
                    <Link
                      to="/webinar"
                      onMouseOver={handleMouseOverHome}
                      onMouseOut={handleMouseOutHome}
                    >
                      <img src={path_image + "webinar/home.svg"} />
                      {isHoveringHome && <p className="tooltip">Home</p>}
                    </Link>
                  </li>
                  {/* <li
                    className={
                      location.pathname === "/webinar/dashboard"
                        ? "active"
                        : "side_li"
                    }
                    onClick={showHideHome}
                  >
                    <Link to="/webinar/dashboard">
                      <img src={path_image + "webinar/dashboard.svg"} />
                     
                    </Link>
                  </li> */}

                  <li
                    className={
                      location.pathname.includes("/webinar/events")
                        ? "active"
                        : "side_li"
                    }
                    onClick={showHideHome}
                  >
                    <Link
                      to="/webinar/events"
                      onMouseOver={handleMouseOverEvents}
                      onMouseOut={handleMouseOutEvents}
                    >
                      <img src={path_image + "webinar/event.svg"} />
                      {/* <p className="tooltip">Event Details</p> */}
                      {isHoveringEvents && <p className="tooltip">Events</p>}
                    </Link>
                  </li>
                  <li
                    className={
                      location.pathname.includes("/webinar/portal/")
                        ? "active"
                        : "side_li"
                    }
                    onClick={() => showHideHome(1)}
                  >
                    <Link
                      to="/webinar/portal/registrationDetailslist"
                      onMouseOver={handleMouseOverRegistration}
                      onMouseOut={handleMouseOutRegistration}
                    >
                      <img src={path_image + "webinar/portal.svg"} />
                      {/* <p className="tooltip">Portal Preparation</p> */}
                      {isHoveringRegistration && (
                        <p className="tooltip">Portal</p>
                      )}
                    </Link>
                  </li>

                  {/* <li
                    className={
                      location.pathname.includes("/webinar/events")
                        ? "active"
                        : "side_li"
                    }
                    onClick={showHideHome}
                  >
                    <Link to="/webinar/events">
                      <img src={path_image + "webinar/event.svg"} />
                      {/* <p className="tooltip">Event Details</p> 
                    </Link>
                  </li> */}
                  {/* <li
                    className={
                      location.pathname.includes("/webinar/portal/")
                        ? "active"
                        : "side_li"
                    }
                    onClick={showHideHome}
                  >
                    <Link to="/webinar/portal/portalpreparation">
                      <img src={path_image + "webinar/portal.svg"} />
                      {/* <p className="tooltip">Portal Preparation</p> 
                    </Link>
                  </li> */}

                  {/* <li
                    className={
                      location.pathname === "/webinar/rehearsallist"
                        ? "active"
                        : "side_li"
                    }
                    onClick={showHideHome}
                  >
                    <Link to="/webinar/rehearsallist">
                      <img src={path_image + "webinar/rehearsal.svg"} />
                     
                    </Link>
                  </li> */}

                  <li
                    className={
                      location.pathname.includes("/webinar/email/")
                        ? "active"
                        : "side_li"
                    }
                    onClick={() => showHideHome(2)}
                  >
                    <Link
                      to="/webinar/email/template"
                      onMouseOver={handleMouseOverEmails}
                      onMouseOut={handleMouseOutEmails}
                    >
                      <img src={path_image + "webinar/mail.svg"} />
                      {/* <p className="tooltip">Email</p> */}
                      {isHoveringEmails && <p className="tooltip">Email</p>}
                    </Link>
                  </li>

                  {/* <li className={location.pathname === "/webinar/RegistrationDetails" ? "active": "nav__link"}>
                  <Link to="/webinar/RegistrationDetails">
                    <svg  width="24"  height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M23.92 2.28564L12.8457 8.8685C12.5899 9.01484 12.3004 9.09183 12.0057 9.09183C11.711 9.09183 11.4215 9.01484 11.1657 8.8685L0.0799999 2.28564C0.0270091 2.51424 0.000170336 2.74813 0 2.98279V14.1599C0 14.951 0.314264 15.7097 0.873659 16.2691C1.43305 16.8285 2.19175 17.1428 2.98286 17.1428H21.0171C21.8082 17.1428 22.5669 16.8285 23.1263 16.2691C23.6857 15.7097 24 14.951 24 14.1599V2.98279C23.9998 2.74813 23.973 2.51424 23.92 2.28564Z"
                        fill="#004A89"/>
                      <path
                        d="M12.2745 7.92L23.4517 1.26857C23.1772 0.877654 22.8128 0.558387 22.3891 0.33763C21.9655 0.116872 21.4951 0.00108202 21.0174 0H2.98311C2.50543 0.00108202 2.03499 0.116872 1.61138 0.33763C1.18776 0.558387 0.823359 0.877654 0.548828 1.26857L11.7374 7.92C11.8198 7.96501 11.9121 7.98861 12.006 7.98861C12.0998 7.98861 12.1922 7.96501 12.2745 7.92Z"
                        fill="#004A89"/>
                    </svg>
                    <p className="tooltip">Registration Page</p>
                  </Link>
                </li> */}
                  <li
                    className={
                      location.pathname === "/webinar/readers"
                        ? "active"
                        : "side_li"
                    }
                    onClick={showHideHome}
                  >
                    <Link
                      to="/webinar/readers"
                      onMouseOver={handleMouseOverReaders}
                      onMouseOut={handleMouseOutReaders}
                    >
                      <img src={path_image + "webinar/hcp.svg"} />
                      {/* <p className="tooltip">HCPs</p> */}
                      {isHoveringReaders && <p className="tooltip">Readers</p>}
                    </Link>
                  </li>

                  {/* <li
                    className={
                      location.pathname === "/webinar/analytics"
                        ? "active"
                        : "side_li"
                    }
                    onClick={showHideHome}
                  >
                    <Link to="/webinar/analytics">
                      <img src={path_image + "webinar/data-analytics.svg"} />
                      
                    </Link>
                  </li> */}

                  {/* <li
                    className={
                      location.pathname === "/webinar/files"
                        ? "active"
                        : "side_li"
                    }
                    onClick={showHideHome}
                  >
                    <Link to="/webinar/files">
                      <img src={path_image + "webinar/files.svg"} />
                     
                    </Link>
                  </li> */}

                  {/* <li className={location.pathname === "/webinar/WebinarSmartList" ? "active" : "nav__link"} >
                  <Link to="/webinar/WebinarSmartList">
                    <svg width="24" height="18"  viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M23.92 2.28564L12.8457 8.8685C12.5899 9.01484 12.3004 9.09183 12.0057 9.09183C11.711 9.09183 11.4215 9.01484 11.1657 8.8685L0.0799999 2.28564C0.0270091 2.51424 0.000170336 2.74813 0 2.98279V14.1599C0 14.951 0.314264 15.7097 0.873659 16.2691C1.43305 16.8285 2.19175 17.1428 2.98286 17.1428H21.0171C21.8082 17.1428 22.5669 16.8285 23.1263 16.2691C23.6857 15.7097 24 14.951 24 14.1599V2.98279C23.9998 2.74813 23.973 2.51424 23.92 2.28564Z"
                        fill="#004A89"/>
                      <path
                        d="M12.2745 7.92L23.4517 1.26857C23.1772 0.877654 22.8128 0.558387 22.3891 0.33763C21.9655 0.116872 21.4951 0.00108202 21.0174 0H2.98311C2.50543 0.00108202 2.03499 0.116872 1.61138 0.33763C1.18776 0.558387 0.823359 0.877654 0.548828 1.26857L11.7374 7.92C11.8198 7.96501 11.9121 7.98861 12.006 7.98861C12.0998 7.98861 12.1922 7.96501 12.2745 7.92Z"
                        fill="#004A89" />
                    </svg>
                    <p>Smart List</p>
                  </Link>
                </li> */}
                  {/* <li
                  className={
                    location.pathname === "/webinar/emails"
                      ? "active"
                      : "nav__link"
                  }
                >
                  <Link to="/webinar/emails">
                    <svg
                      width="24"
                      height="18"
                      viewBox="0 0 24 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23.92 2.28564L12.8457 8.8685C12.5899 9.01484 12.3004 9.09183 12.0057 9.09183C11.711 9.09183 11.4215 9.01484 11.1657 8.8685L0.0799999 2.28564C0.0270091 2.51424 0.000170336 2.74813 0 2.98279V14.1599C0 14.951 0.314264 15.7097 0.873659 16.2691C1.43305 16.8285 2.19175 17.1428 2.98286 17.1428H21.0171C21.8082 17.1428 22.5669 16.8285 23.1263 16.2691C23.6857 15.7097 24 14.951 24 14.1599V2.98279C23.9998 2.74813 23.973 2.51424 23.92 2.28564Z"
                        fill="#004A89"
                      />
                      <path
                        d="M12.2745 7.92L23.4517 1.26857C23.1772 0.877654 22.8128 0.558387 22.3891 0.33763C21.9655 0.116872 21.4951 0.00108202 21.0174 0H2.98311C2.50543 0.00108202 2.03499 0.116872 1.61138 0.33763C1.18776 0.558387 0.823359 0.877654 0.548828 1.26857L11.7374 7.92C11.8198 7.96501 11.9121 7.98861 12.006 7.98861C12.0998 7.98861 12.1922 7.96501 12.2745 7.92Z"
                        fill="#004A89"
                      />
                    </svg>
                    <p>Email{" "}</p>
                  </Link>
                </li> */}
                  {/* <li
                  className={
                    location.pathname === "/webinar/emailstats"
                      ? "active"
                      : "nav__link"
                  }
                >
                  <Link to="/webinar/emailstats">
                    <svg
                      width="24"
                      height="18"
                      viewBox="0 0 24 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23.92 2.28564L12.8457 8.8685C12.5899 9.01484 12.3004 9.09183 12.0057 9.09183C11.711 9.09183 11.4215 9.01484 11.1657 8.8685L0.0799999 2.28564C0.0270091 2.51424 0.000170336 2.74813 0 2.98279V14.1599C0 14.951 0.314264 15.7097 0.873659 16.2691C1.43305 16.8285 2.19175 17.1428 2.98286 17.1428H21.0171C21.8082 17.1428 22.5669 16.8285 23.1263 16.2691C23.6857 15.7097 24 14.951 24 14.1599V2.98279C23.9998 2.74813 23.973 2.51424 23.92 2.28564Z"
                        fill="#004A89"
                      />
                      <path
                        d="M12.2745 7.92L23.4517 1.26857C23.1772 0.877654 22.8128 0.558387 22.3891 0.33763C21.9655 0.116872 21.4951 0.00108202 21.0174 0H2.98311C2.50543 0.00108202 2.03499 0.116872 1.61138 0.33763C1.18776 0.558387 0.823359 0.877654 0.548828 1.26857L11.7374 7.92C11.8198 7.96501 11.9121 7.98861 12.006 7.98861C12.0998 7.98861 12.1922 7.96501 12.2745 7.92Z"
                        fill="#004A89"
                      />
                    </svg>
                    <p>Email Stats</p>
                  </Link>
                </li> */}

                  {/* <li
                  className={
                    location.pathname === "/webinar/regionstats" ? "active" : ""
                  }
                >
                  <Link to="/webinar/regionstats">
                    <svg
                      width="24"
                      height="18"
                      viewBox="0 0 24 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23.92 2.28564L12.8457 8.8685C12.5899 9.01484 12.3004 9.09183 12.0057 9.09183C11.711 9.09183 11.4215 9.01484 11.1657 8.8685L0.0799999 2.28564C0.0270091 2.51424 0.000170336 2.74813 0 2.98279V14.1599C0 14.951 0.314264 15.7097 0.873659 16.2691C1.43305 16.8285 2.19175 17.1428 2.98286 17.1428H21.0171C21.8082 17.1428 22.5669 16.8285 23.1263 16.2691C23.6857 15.7097 24 14.951 24 14.1599V2.98279C23.9998 2.74813 23.973 2.51424 23.92 2.28564Z"
                        fill="#004A89"
                      />
                      <path
                        d="M12.2745 7.92L23.4517 1.26857C23.1772 0.877654 22.8128 0.558387 22.3891 0.33763C21.9655 0.116872 21.4951 0.00108202 21.0174 0H2.98311C2.50543 0.00108202 2.03499 0.116872 1.61138 0.33763C1.18776 0.558387 0.823359 0.877654 0.548828 1.26857L11.7374 7.92C11.8198 7.96501 11.9121 7.98861 12.006 7.98861C12.0998 7.98861 12.1922 7.96501 12.2745 7.92Z"
                        fill="#004A89"
                      />
                    </svg>
                    <p>Region Stats</p>
                  </Link>
                </li> */}
                  {/* <li
                  className={
                    location.pathname === "/webinar/registration"
                      ? "active"
                      : "nav__link"
                  }
                >
                  <Link to="/webinar/registration">
                    <svg
                      width="24"
                      height="18"
                      viewBox="0 0 24 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23.92 2.28564L12.8457 8.8685C12.5899 9.01484 12.3004 9.09183 12.0057 9.09183C11.711 9.09183 11.4215 9.01484 11.1657 8.8685L0.0799999 2.28564C0.0270091 2.51424 0.000170336 2.74813 0 2.98279V14.1599C0 14.951 0.314264 15.7097 0.873659 16.2691C1.43305 16.8285 2.19175 17.1428 2.98286 17.1428H21.0171C21.8082 17.1428 22.5669 16.8285 23.1263 16.2691C23.6857 15.7097 24 14.951 24 14.1599V2.98279C23.9998 2.74813 23.973 2.51424 23.92 2.28564Z"
                        fill="#004A89"
                      />
                      <path
                        d="M12.2745 7.92L23.4517 1.26857C23.1772 0.877654 22.8128 0.558387 22.3891 0.33763C21.9655 0.116872 21.4951 0.00108202 21.0174 0H2.98311C2.50543 0.00108202 2.03499 0.116872 1.61138 0.33763C1.18776 0.558387 0.823359 0.877654 0.548828 1.26857L11.7374 7.92C11.8198 7.96501 11.9121 7.98861 12.006 7.98861C12.0998 7.98861 12.1922 7.96501 12.2745 7.92Z"
                        fill="#004A89"
                      />
                    </svg>
                    <p>Registrations</p>
                  </Link>
                </li> */}
                  {/* <li
                  className={
                    location.pathname === "/webinar/sendemail"
                      ? "active"
                      : "nav__link"
                  }
                >
                  <Link to="/webinar/sendemail">
                    <svg
                      width="24"
                      height="18"
                      viewBox="0 0 24 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23.92 2.28564L12.8457 8.8685C12.5899 9.01484 12.3004 9.09183 12.0057 9.09183C11.711 9.09183 11.4215 9.01484 11.1657 8.8685L0.0799999 2.28564C0.0270091 2.51424 0.000170336 2.74813 0 2.98279V14.1599C0 14.951 0.314264 15.7097 0.873659 16.2691C1.43305 16.8285 2.19175 17.1428 2.98286 17.1428H21.0171C21.8082 17.1428 22.5669 16.8285 23.1263 16.2691C23.6857 15.7097 24 14.951 24 14.1599V2.98279C23.9998 2.74813 23.973 2.51424 23.92 2.28564Z"
                        fill="#004A89"
                      />
                      <path
                        d="M12.2745 7.92L23.4517 1.26857C23.1772 0.877654 22.8128 0.558387 22.3891 0.33763C21.9655 0.116872 21.4951 0.00108202 21.0174 0H2.98311C2.50543 0.00108202 2.03499 0.116872 1.61138 0.33763C1.18776 0.558387 0.823359 0.877654 0.548828 1.26857L11.7374 7.92C11.8198 7.96501 11.9121 7.98861 12.006 7.98861C12.0998 7.98861 12.1922 7.96501 12.2745 7.92Z"
                        fill="#004A89"
                      />
                    </svg>
                    <p>Send Email{" "}</p>
                  </Link>
                </li> */}
                  {/* 
                
                <li
                  className={
                    location.pathname === "/webinar/contacts"
                      ? "active"
                      : "nav__link"
                  }
                >
                  <Link to="/webinar/contacts">
                    <svg
                      width="24"
                      height="18"
                      viewBox="0 0 24 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23.92 2.28564L12.8457 8.8685C12.5899 9.01484 12.3004 9.09183 12.0057 9.09183C11.711 9.09183 11.4215 9.01484 11.1657 8.8685L0.0799999 2.28564C0.0270091 2.51424 0.000170336 2.74813 0 2.98279V14.1599C0 14.951 0.314264 15.7097 0.873659 16.2691C1.43305 16.8285 2.19175 17.1428 2.98286 17.1428H21.0171C21.8082 17.1428 22.5669 16.8285 23.1263 16.2691C23.6857 15.7097 24 14.951 24 14.1599V2.98279C23.9998 2.74813 23.973 2.51424 23.92 2.28564Z"
                        fill="#004A89"
                      />
                      <path
                        d="M12.2745 7.92L23.4517 1.26857C23.1772 0.877654 22.8128 0.558387 22.3891 0.33763C21.9655 0.116872 21.4951 0.00108202 21.0174 0H2.98311C2.50543 0.00108202 2.03499 0.116872 1.61138 0.33763C1.18776 0.558387 0.823359 0.877654 0.548828 1.26857L11.7374 7.92C11.8198 7.96501 11.9121 7.98861 12.006 7.98861C12.0998 7.98861 12.1922 7.96501 12.2745 7.92Z"
                        fill="#004A89"
                      />
                    </svg>
                    <p>Contacts</p>
                  </Link>
                </li> */}
                  {/* <li
                  className={
                    location.pathname === "/webinar/stpdetails"
                      ? "active"
                      : "nav__link"
                  }
                >
                  <Link to="/webinar/stpdetails">
                    <svg
                      width="24"
                      height="18"
                      viewBox="0 0 24 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23.92 2.28564L12.8457 8.8685C12.5899 9.01484 12.3004 9.09183 12.0057 9.09183C11.711 9.09183 11.4215 9.01484 11.1657 8.8685L0.0799999 2.28564C0.0270091 2.51424 0.000170336 2.74813 0 2.98279V14.1599C0 14.951 0.314264 15.7097 0.873659 16.2691C1.43305 16.8285 2.19175 17.1428 2.98286 17.1428H21.0171C21.8082 17.1428 22.5669 16.8285 23.1263 16.2691C23.6857 15.7097 24 14.951 24 14.1599V2.98279C23.9998 2.74813 23.973 2.51424 23.92 2.28564Z"
                        fill="#004A89"
                      />
                      <path
                        d="M12.2745 7.92L23.4517 1.26857C23.1772 0.877654 22.8128 0.558387 22.3891 0.33763C21.9655 0.116872 21.4951 0.00108202 21.0174 0H2.98311C2.50543 0.00108202 2.03499 0.116872 1.61138 0.33763C1.18776 0.558387 0.823359 0.877654 0.548828 1.26857L11.7374 7.92C11.8198 7.96501 11.9121 7.98861 12.006 7.98861C12.0998 7.98861 12.1922 7.96501 12.2745 7.92Z"
                        fill="#004A89"
                      />
                    </svg>
                    <p>SMTP Details</p>
                  </Link>
                </li> */}
                </ul>
              </div>
              {getHomeStatus && (
                <div className="sidebar_submenu">
                  <button
                    className="toggle_btn"
                    onClick={() => toggleClassToBody()}
                  >
                    <img
                      src={path_image + "webinar/arrow-left.svg"}
                      alt="toggle-sidebar"
                    />
                  </button>
                  <ul>
                

                    {/* <li className={location.pathname === "/webinar/dashboard" ? "active" : "side_li"}>
                        <Link to="/webinar/dashboard"><img src={path_image + "webinar/dashboard.svg"} /> 
                        <p>Dashboard</p>
                        </Link>
                      </li> */}
                    {/* <li
                      className={
                        location.pathname ===
                        "/webinar/portal/portalpreparation"
                          ? "active"
                          : "side_li"
                      }
                    >
                      <Link to="/webinar/portal/portalpreparation">
                        <img src={path_image + "webinar/portal.svg"} />
                        <p>Portal Preparation</p>
                      </Link>
                    </li> */}
                    {/* <li
                      className={
                        location.pathname === "/webinar/portal/portalfeatures"
                          ? "active"
                          : "side_li"
                      }
                    >
                      <Link to="/webinar/portal/portalfeatures">
                        <img src={path_image + "webinar/dashboard.svg"} />
                        <p>Portal Features</p>
                      </Link>
                    </li> */}
                    <li
                      className={
                        location.pathname ===
                          "/webinar/portal/registrationDetails" ||
                        location.pathname ===
                          "/webinar/portal/registrationDetailslist"
                          ? "active"
                          : "side_li"
                      }
                    >
                      <Link to="/webinar/portal/registrationDetailslist">
                        <img src={path_image + "webinar/event.svg"} />
                        <p>Registration Page</p>
                      </Link>
                    </li>
                    <li
                      className={
                        location.pathname === "/webinar/portal/Registrations"||location.pathname === "/webinar/portal/createRegistration"
                          ? "active"
                          : "side_li"
                      }
                    >
                      <Link to="/webinar/portal/Registrations">
                        <img src={path_image + "webinar/dashboard.svg"} />
                        <p>Create Registration</p>
                      </Link>
                    </li>
                    <li
                      className={
                        location.pathname === "/webinar/portal/NewRegistration"
                          ? "active"
                          : "side_li"
                      }
                    >
                      <Link to="/webinar/portal/NewRegistration">
                        <img src={path_image + "webinar/file2.png"} />
                        <p>Create Registration</p>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
              {EmailStatus && (
                <div className="sidebar_submenu">
                  <button
                    className="toggle_btn"
                    onClick={() => toggleClassToBody()}
                  >
                    <img
                      src={path_image + "webinar/arrow-left.svg"}
                      alt="toggle-sidebar"
                    />
                  </button>
                  <ul>
                    <li
                      className={
                        location.pathname === "/webinar/email/template"
                          ? "active"
                          : "side_li"
                      }
                    >
                      <Link to="/webinar/email/template">
                        <img src={path + "file2.png"} />
                        <p>Auto Email</p>
                      </Link>
                    </li>

                    {/* <li className={location.pathname === "/webinar/dashboard" ? "active" : "side_li"}>
                        <Link to="/webinar/dashboard"><img src={path_image + "webinar/dashboard.svg"} /> 
                        <p>Dashboard</p>
                        </Link>
                      </li> */}
                    <li
                      className={
                        location.pathname === "/webinar/email/emails" ||
                        location.pathname === "/webinar/email/create" ||
                        location.pathname === "/webinar/email/smart-list" ||
                        location.pathname ===
                          `/webinar/email/smart-list-users/${localStorage.getItem(
                            "SmartListId"
                          )}`
                          ? "active"
                          : "side_li"
                      }
                    >
                      <Link to="/webinar/email/emails">
                        <img src={path + "message.png"} />
                        <p>Email</p>
                      </Link>
                    </li>
                    <li
                      className={
                        location.pathname ===
                          "/webinar/email/WebinarSmartList" ||
                        location.pathname ===
                          "/webinar/email/ViewSmartListWebinar" ||
                        location.pathname ===
                          "/webinar/email/SmartListCreate" ||
                        location.pathname ===
                          "/webinar/email/SmartListCreate/FilterList" ||
                        location.pathname ===
                          "/webinar/email/SmartListCreate/ExcelUpload"
                          ? "active"
                          : "side_li"
                      }
                    >
                      <Link to="/webinar/email/WebinarSmartList">
                        <img src={path + "mail-list.png"} />
                        <p>Smart List</p>
                      </Link>
                    </li>

                    {/* <li
                      className={
                        location.pathname === "/webinar/email/EmailsAnalaytics"
                          ? "active"
                          : "side_li"
                      }
                    >
                      <Link to="/webinar/email/EmailsAnalaytics">
                        <img src={path_image + "webinar/event.svg"} />
                        <p>Emails Analaytics</p>
                      </Link>
                    </li> */}
                  </ul>
                </div>
              )}
            </>
          ) : null}
        </>
      )}
    </div>
  );
};
export default Sidebar;
