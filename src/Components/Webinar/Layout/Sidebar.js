import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
const Sidebar = () => {
  let path_image = "/" + process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [token, setToken] = useState(true);
  const [getHomeStatus, setHomeStatus] = useState(false);
  const [EmailStatus, setEmailStatus] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("Token")) {
      setToken(true);
    } else {
      setToken(false);
    }
  }, [localStorage.getItem("Token")]);
  
  useEffect(() => {
    if (token === null || token === undefined) {
      setToken(false);
    }
  }, [localStorage.getItem("Token"), token]);

  
  const toggleClassToBody = () => {
    document.body.classList.toggle("toggle_sidebar");
  };

  const showHideHome = (index) => {

    console.log(location.pathname)
    const bodyHasClass = document.body.classList.contains("sub_menu_toggle_sidebar");
    console.log(index);
    if(1==index){
      setHomeStatus(true);
      const bodyHasClass = document.body.classList.contains("sub_menu_toggle_sidebar");
      if (!bodyHasClass) {
        document.body.classList.toggle("sub_menu_toggle_sidebar");
      }
    } else if (2==index) {
      const bodyHasClass = document.body.classList.contains("sub_menu_toggle_sidebar");
      if (!bodyHasClass) {
        document.body.classList.toggle("sub_menu_toggle_sidebar");
      }
      setEmailStatus(true);
      setHomeStatus(false);
    } else {
      document.body.classList.remove("sub_menu_toggle_sidebar");
      setEmailStatus(false);
      setHomeStatus(false);
    }
  };
  return (
    <div className="left-sidebar">
      {location.pathname.includes("/webinar/register") ||
      location.pathname.includes("/webinar/editor") ? null : (
        <>
          {token ? (
                <>   
            <div className="sidebar-menu">
              <ul>  
                <li className={location.pathname === "/webinar" ? "active" : "side_li"} onClick={showHideHome}>
                  <Link to="/webinar"><img src={path_image + "webinar/home.svg"} /> 
                  </Link>
                </li>
                <li className={location.pathname === "/webinar/dashboard" ? "active" : "side_li"}onClick={showHideHome} >
                  <Link to="/webinar/dashboard"><img src={path_image + "webinar/dashboard.svg"} /> 
                  {/* <p>Dashboard</p> */}
                  </Link>
                </li>
                
                <li
                  className={location.pathname.includes("/webinar/events")  ? "active" : "side_li"}onClick={showHideHome}>
                  <Link to="/webinar/events"><img src={path_image + "webinar/event.svg"} />
                  {/* <p>Event Details</p> */}
                  </Link>
                </li>
                <li
                  className={location.pathname.includes("/webinar/portal/")  ? "active" : "side_li"}onClick={()=>showHideHome(1)}>
                  <Link to="/webinar/portal/polls"><img src={path_image + "webinar/portal.svg"} />
                  {/* <p>Portal Preparation</p> */}
                  </Link>
                </li>
                <li
                    className={
                      location.pathname === "/webinar/rehearsallist"
                        ? "active"
                        : "side_li"
                    }
                    onClick={showHideHome}
                  >
                    <Link to="/webinar/rehearsallist">
                      <img src={path_image + "webinar/rehearsal.svg"} />
                      {/* <p>Rehearsal</p> */}
                    </Link>
                  </li>

                  <li
                    className={
                      location.pathname.includes("/webinar/email/")
                        ? "active"
                        : "side_li"
                    }
                    onClick={()=>showHideHome(2)}
                  >
                    <Link to="/webinar/email/template">
                      <img src={path_image + "webinar/mail.svg"} />
                      {/* <p>Email</p> */}
                    </Link>
                  </li>
                  <li
                    className={
                      location.pathname === "/webinar/readers"
                        ? "active"
                        : "side_li"
                    }
                    onClick={showHideHome}
                  >
                    <Link to="/webinar/readers">
                      <img src={path_image + "webinar/hcp.svg"} />
                      {/* <p>HCPs</p> */}
                    </Link>
                  </li>
                  <li
                    className={
                      location.pathname === "/webinar/LiveTools"
                        ? "active"
                        : "side_li"
                    }
                    onClick={showHideHome}
                  >
                    <Link to="/webinar/LiveTools">
                      <img src={path_image + "webinar/live.svg"} />
                      {/* <p>Live Tools</p> */}
                    </Link>
                  </li>
                  <li
                    className={
                      location.pathname === "/webinar/analytics"
                        ? "active"
                        : "side_li"
                    }
                    onClick={showHideHome}
                  >
                    <Link to="/webinar/analytics">
                      <img src={path_image + "webinar/data-analytics.svg"} />
                      {/* <p>Analytics</p> */}
                    </Link>
                  </li>
                  <li
                    className={
                      location.pathname === "/webinar/files"
                        ? "active"
                        : "side_li"
                    }
                    onClick={showHideHome}
                  >
                    <Link to="/webinar/files">
                      <img src={path_image + "webinar/files.svg"} />
                      {/* <p>Files</p> */}
                    </Link>
                  </li>

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
                    <li
                      className={
                        location.pathname === "/webinar/portal/polls"
                          ? "active"
                          : "side_li"
                      }
                    >
                      <Link to="/webinar/portal/polls">
                        <img src={path_image + "webinar/home.svg"} />
                        <p>Polls</p>
                      </Link>
                    </li>

                    <li
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
                    </li>
                    <li
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
                    </li>
                    <li
                      className={
                        location.pathname === "/webinar/portal/registration"
                          ? "active"
                          : "side_li"
                      }
                    >
                      <Link to="/webinar/portal/registration">
                        <img src={path_image + "webinar/event.svg"} />
                        <p>Registration Page</p>
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
                        <img src={path_image + "webinar/home.svg"} />
                        <p>Auto Email</p>
                      </Link>
                    </li>

                         <li
                      className={
                        location.pathname === "/webinar/email/emails"
                          ? "active"
                          : "side_li"
                      }
                    >
                      <Link to="/webinar/email/emails">
                        <img src={path_image + "webinar/dashboard.svg"} />
                        <p>Emails</p>
                      </Link>
                    </li>
                    <li
                      className={
                        location.pathname ===
                        "/webinar/email/SmartListCreate"
                          ? "active"
                          : "side_li"
                      }
                    >
                      <Link to="/webinar/email/SmartListCreate">
                        <img src={path_image + "webinar/portal.svg"} />
                        <p>Smart List</p>
                      </Link>
                    </li>
                    <li
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
                    </li>
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
