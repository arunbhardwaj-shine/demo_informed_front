import React from "react";
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { SlideDown } from 'react-slidedown'
function Sidebar() {
    const location = useLocation();
    const [showSubMenu, setShowSubMenu] = useState(true);
    const childTabHandler = () => {
        if(window.matchMedia("(max-width: 767px)").matches){
            setShowSubMenu(true)
        } }
  return (
    <div className={"nav js-nav extended"}>
      <SlideDown className="nav-child" closed={
          window.matchMedia("(max-width: 767px)").matches
            ? !location.pathname.includes("/webinar/") || !showSubMenu : !location.pathname.includes("/webinar/")} >
        <Link  onClick={childTabHandler}className={
            location.pathname.includes("/webinar/readers")
              ? "nav__link inner active"
              : "nav__link inner"
          } to="/webinar/readers/"  title="Readers" >
          <div className="nav__preview" >
            <i className="la la-users "></i>
          </div>
          <div className="nav__title" >
            Readers
          </div>
        </Link>
        <Link  onClick={childTabHandler} className={
            location.pathname.includes("/webinar/contact-forms")
              ? "nav__link inner active"
              : "nav__link inner"}  to="/webinar/contact-forms" title="Contact Forms" >
          <div className="nav__preview" >
            <i className="la la-edit "></i>
          </div>
          <div className="nav__title" >
            Contact Forms
          </div>
        </Link>
        <Link  onClick={childTabHandler}className={
            location.pathname.includes("/webinar/email-stats")? "nav__link inner active": "nav__link inner"
          }to="/webinar/email-stats"   title="Email Stats">
          <div className="nav__preview" >
            <i className="la la-envelope"></i>
          </div>
          <div className="nav__title" >
            Email Stats
          </div>
        </Link>
        <Link onClick={childTabHandler}className={
            location.pathname.includes("/webinar/auto-mail-editor")? "nav__link inner active"
              : "nav__link inner"
          }  to="/webinar/auto-mail-editor" title="Auto Mail Editor">
          <div className="nav__preview" >
            <i className="la la-file-code "></i>
          </div>
          <div className="nav__title" >
            Auto Mail Editor
          </div>
        </Link>
        <Link onClick={childTabHandler}className={
            location.pathname.includes("/webinar/webinar-settings")
              ? "nav__link inner active"
              : "nav__link inner"
          }to="/webinar/webinar-settings"title="Webinar Settings">
          <div className="nav__preview" >
            <i className="la la-cogs "></i>
          </div>
          <div className="nav__title" >
            Webinar Settings
          </div>
        </Link>
        <Link onClick={childTabHandler} className={
            location.pathname.includes("/webinar/manage-events")
              ? "nav__link inner active"
              : "nav__link inner"   }   to="/webinar/manage-events"   title="Manage Events" >
          <div className="nav__preview" >
            <i className="la la-file-pdf "></i>
          </div>
          <div className="nav__title" >
            Manage Events
          </div>
        </Link>
        <Link className={
            location.pathname.includes("/webinar/live-event-tool")
              ? "nav__link inner active item-has-child"
              : "nav__link inner"   }   to="/webinar/live-event-tool"   title="Live Event Tools" >
          <div className="nav__preview" >
            <i className="la la-comments "></i>
          </div>
          <div className="nav__title" >
            Live Event Tool
          </div>
          {location.pathname.includes("/webinar/live-event-tool") ||
          location.pathname.includes("/webinar/live-event-tool/") ? (
            <SlideDown
              className="nav-child"   closed={
                !location.pathname.includes("/webinar/live-event-tool") &&
                !location.pathname.includes("/webinar/live-event-tool/")} >
              <Link
                onClick={childTabHandler}
                className={
                  location.pathname.includes(
                    "/webinar/live-event-tool/poll-question"     )       ? "nav__link inner active"       : "nav__link inner"   }   to="/webinar/live-event-tool/poll-question"   title="Manage Events" >
                <div className="nav__preview" >
                  <i className="la la-list "></i>
                </div>
                <div className="nav__title" >
                  Poll Question
                </div>
              </Link>
              <Link onClick={childTabHandler} className={
                  location.pathname.includes("/webinar/live-event-tool/survey")
                    ? "nav__link inner active"
                    : "nav__link inner"  }  to="/webinar/live-event-tool/survey"  title="Manage Events">
                <div className="nav__preview" >
                  <i className="la la-chart-bar "></i>
                </div>
                <div className="nav__title" > Survey  </div>
              </Link>
            </SlideDown>
          ) : null}
        </Link>
      </SlideDown>
    </div>
  );}
export default Sidebar;
