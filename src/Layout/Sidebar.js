import { Link } from "react-router-dom";
// import "react-slidedown/lib/slidedown.css";
// import { useState } from "react";
const Sidebar = () => {
  return (
    <div className="sidebar js-sidebar" >
      <div className="sidebar__nav">
        <nav className={"nav js-nav"}>
          <div className="nav__list">
            {/* <!-- mobile primary menu--> */}
            <div className="nav__primary js-nav-primary">
              <div className="nav__group">
                <Link className={"nav__link"}to="/dashboard" title="Dashboard">
                  <div className="nav__preview">
                    <i className="la la-tachometer-alt "></i>
                  </div>
                  <div className="nav__title">Home</div>
                </Link>
                <Link className={ "nav__link"}  to="/dashboard"  title="Dashboard" >
                  <div className="nav__preview">
                    <i className="la la-tachometer-alt "></i>
                  </div>
                  <div className="nav__title">Dashboard</div>
                </Link>
                <Link className={"nav__link" }   to="/Webinar/Event/Add"   title="Library" >
                  <div className="nav__preview">
                    <i className="la la-table "></i>
                  </div>
                  <div className="nav__title">Event Details</div>
                </Link>
                <Link className={ "nav__link"
                  } to="/Webinar/Event/Add"  title="Library" >
                  <div className="nav__preview">
                    <i className="la la-table "></i>
                  </div>
                  <div className="nav__title">Rehearsal</div>
                </Link>
                <Link className={ "nav__link" } to="/readers"title="Readers" >
                  <div className="nav__preview">
                    <i className="la la-clipboard-check "></i>
                  </div>
                  <div className="nav__title">Readers</div>
                </Link>
                <Link className={"nav__link"} to="/analytics"title="Analytics" >
                  <div className="nav__preview">
                    <i className="la la-chart-area"></i>
                  </div>
                  <div className="nav__title">Analytics</div>
                </Link>
                <Link  className={ "nav__link" }to="/distribute" title="Distribute">
                  <div className="nav__preview">
                    <i className="la la-images "></i>
                  </div>
                  <div className="nav__title">Distribute</div>
                </Link>
                <Link   className={ "nav__link"}to= "/webinar/readers" title="Webinar" >
                  <div className="nav__preview">
                    <i className="la la-calendar-week "></i>
                  </div>
                  <div className="nav__title">Webinar</div>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};
export default Sidebar;
