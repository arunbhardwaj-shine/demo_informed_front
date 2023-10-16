import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import EventModelValidation from "./EventModelValidation";
import { toast } from "react-toastify";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const CommonAddEventModel = ({
  show,
  onClose,
  data,
  eventId,
  apiData,
  handleSubmit,
}) => {
  const path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [timeHours, setTimeHours] = useState([
    { label: "00 (00AM)", value: "0" },
    { label: "01 (01AM)", value: "1" },
    { label: "02 (02AM)", value: "2" },
    { label: "03 (03AM)", value: "3" },
    { label: "04 (04AM)", value: "4" },
    { label: "05 (05AM)", value: "5" },
    { label: "06 (06AM)", value: "6" },
    { label: "07 (07AM)", value: "7" },
    { label: "08 (08AM)", value: "8" },
    { label: "09 (09AM)", value: "9" },
    { label: "10 (10AM)", value: "10" },
    { label: "11 (11AM)", value: "11" },
    { label: "12 (12PM)", value: "12" },
    { label: "13 (13PM)", value: "13" },
    { label: "14 (14PM)", value: "14" },
    { label: "15 (15PM)", value: "15" },
    { label: "16 (16PM)", value: "16" },
    { label: "17 (17PM)", value: "17" },
    { label: "18 (18PM)", value: "18" },
    { label: "19 (19PM)", value: "19" },
    { label: "20 (20PM)", value: "20" },
    { label: "21 (21PM)", value: "21" },
    { label: "22 (22PM)", value: "22" },
    { label: "23 (23PM)", value: "23" },
  ]);
  const [timeMinutes, setTimeMinutes] = useState([
    { label: "00 ", value: "0" },
    { label: "05 ", value: "5" },
    { label: "10 ", value: "10" },
    { label: "15 ", value: "15" },
    { label: "20 ", value: "20" },
    { label: "25 ", value: "25" },
    { label: "30 ", value: "30" },
    { label: "35 ", value: "35" },
    { label: "40 ", value: "40" },
    { label: "45 ", value: "45" },
    { label: "50 ", value: "50" },
    { label: "55 ", value: "55" },
  ]);
  const [eventInputs, setEventInputs] = useState({
    // title: "",
    // eventDate: "",
    // eventCode: "",
    // eventDescription: "",
  });
  const [error, setError] = useState();

  const [countryTimezone, setCountryTimezone] = useState([
    { label: "Africa/Johannesburg", value: "Africa/Johannesburg" },
    { label: "America/Chicago", value: "America/Chicago" },
    { label: "America/Mexico_City", value: "America/Mexico_City" },
    { label: "America/New_York", value: "America/New_York" },
    { label: "Asia/Kolkata", value: "Asia/Kolkata" },
    { label: "Asia/Singapore", value: "Asia/Singapore" },
    { label: "Europe/Albania", value: "Europe/Albania" },
    { label: "Europe/Amsterdam", value: "Europe/Amsterdam" },
    { label: "Europe/AmsterdamORG", value: "Europe/AmsterdamORG" },
    { label: "Europe/London", value: "Europe/London" },
    { label: "Europe/Tallinn", value: "Europe/Tallinn" },
    { label: "europe/tirane", value: "europe/tirane" },
  ]);

  const [clientStreamOptions, setClientStreamOptions] = useState([
    { label: "Yes", value: "1" },
    { label: "No", value: "0" },
  ]);
  const [timezoneOptions, setTimezoneOptions] = useState([
    { label: "BST", value: "BST" },
    { label: "CDT", value: "CDT" },
    { label: "CEST", value: "CEST" },
    { label: "CET", value: "CET" },
    { label: "CST", value: "CST" },
    { label: "EEST", value: "EEST" },
    { label: "EST", value: "EST" },
    { label: "IST", value: "IST" },
    { label: "SAST", value: "SAST" },
    { label: "SGT", value: "SGT" },
    { label: "UTC", value: "UTC" },
  ]);
  const [buOptions, setBUOptions] = useState([
    { label: "Hematology", value: "Hematology" },
    { label: "Critical care", value: "Critical care" },
    { label: "Immunotherapy", value: "Immunotherapy" },
  ]);
  useEffect(() => {
    if (apiData) {
      let dateStart = moment(apiData?.dateStart, "DD-MM-YYYY").toDate();

      setEventInputs({
        ...apiData,
        dateStart: dateStart,
        type: {
          label: apiData?.type,
          value: apiData?.type,
        },
        timezone: {
          label: apiData?.timezone,
          value: apiData?.timezone,
        },
        country_timezone: {
          label: apiData?.country_timezone,
          value: apiData?.country_timezone,
        },
        is_client_stream: {
          label: apiData?.is_client_stream == 1 ? "Yes" : "No",
          value: apiData?.is_client_stream,
        },
        dateStartHour: {
          label: apiData?.dateStartHour,
          value: apiData?.dateStartHour,
        },
        dateStartMin: {
          label: apiData?.dateStartMin,
          value: apiData?.dateStartMin,
        },
        dateEndHour: {
          label: apiData?.dateEndHour,
          value: apiData?.dateEndHour,
        },
        dateEndMin: {
          label: apiData?.dateEndMin,
          value: apiData?.dateEndMin,
        },
      });
    } else {
      setEventInputs({});
    }
  }, [show]);
  const handleClose = () => {
    setError({});
    setEventInputs({});
    onClose(false);
  };
  const handleChange = (e, isSelectedName) => {
    setEventInputs({
      ...eventInputs,
      [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
        ? e?.target?.files
          ? e?.target?.files
          : e
        : e?.target?.value,
    });
  };
  const saveClicked = (e) => {
    const error = EventModelValidation(eventInputs);
    if (Object.keys(error)?.length) {
      toast.error(error[Object.keys(error)[0]]);
      setError(error);
      return;
    } else {
      handleSubmit();
      onClose(false);
      setEventInputs({});
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        id="add_hcp"
        className="event_edit"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              {data?.length ? "Edit Event" : "Add New Event"}
            </h5>
            <button
              type="button"
              onClick={handleClose}
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-hidden="true"
          >
            <div className="hcp-add-box">
              <div className="hcp-add-form tab-content" id="upload-confirm">
                <form id="add_hcp_form" className={"tab-pane" + "active"}>
                  <>
                    <div className="add_hcp_boxes">
                      <div className="form_action">
                        <div className="row">
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label htmlFor="">
                                Event Title <span> *</span>
                              </label>
                              <input
                                type="text"
                                name="title"
                                placeholder="Event Title"
                                className={
                                  error?.title
                                    ? "form-control error"
                                    : "form-control"
                                }
                                onChange={(e) => handleChange(e)}
                                value={
                                  eventInputs?.title ? eventInputs?.title : ""
                                }
                              />
                              {error?.title ? (
                                <div className="login-validation">
                                  {error?.title}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label htmlFor="">
                                BU <span> *</span>
                              </label>

                              <Select
                                options={buOptions}
                                className={
                                  error?.type
                                    ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                    : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                }
                                onChange={(e) => handleChange(e, "type")}
                                value={
                                  buOptions.findIndex(
                                    (item) =>
                                      item?.value == eventInputs?.type?.value
                                  ) != -1
                                    ? buOptions[
                                        buOptions.findIndex(
                                          (item) =>
                                            item?.value ==
                                            eventInputs?.type?.value
                                        )
                                      ]
                                    : ""
                                }
                                isClearable
                              />
                              {error?.type ? (
                                <div className="login-validation">
                                  {error?.type}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label htmlFor="">
                                Timezone <span> *</span>
                              </label>
                              <Select
                                options={timezoneOptions}
                                className={
                                  error?.timezone
                                    ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                    : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                }
                                onChange={(e) => handleChange(e, "timezone")}
                                value={
                                  timezoneOptions.findIndex(
                                    (item) =>
                                      item?.value ==
                                      eventInputs?.timezone?.value
                                  ) != -1
                                    ? timezoneOptions[
                                        timezoneOptions.findIndex(
                                          (item) =>
                                            item?.value ==
                                            eventInputs?.timezone?.value
                                        )
                                      ]
                                    : ""
                                }
                                isClearable
                              />
                              {error?.timezone ? (
                                <div className="login-validation">
                                  {error?.timezone}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label htmlFor="">
                                {" "}
                                Select Country Timezone <span> *</span>
                              </label>
                              <Select
                                options={countryTimezone}
                                className={
                                  error?.country_timezone
                                    ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                    : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                }
                                onChange={(e) =>
                                  handleChange(e, "country_timezone")
                                }
                                value={
                                  countryTimezone.findIndex(
                                    (item) =>
                                      item?.value ==
                                      eventInputs?.country_timezone?.value
                                  ) != -1
                                    ? countryTimezone[
                                        countryTimezone.findIndex(
                                          (item) =>
                                            item?.value ==
                                            eventInputs?.country_timezone?.value
                                        )
                                      ]
                                    : ""
                                }
                                isClearable
                              />
                              {error?.country_timezone ? (
                                <div className="login-validation">
                                  {error?.country_timezone}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label htmlFor="">
                                {" "}
                                Is Client Stream <span> *</span>
                              </label>
                              <Select
                                options={clientStreamOptions}
                                className={
                                  error?.is_client_stream
                                    ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                    : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                }
                                onChange={(e) =>
                                  handleChange(e, "is_client_stream")
                                }
                                value={
                                  clientStreamOptions.findIndex(
                                    (item) =>
                                      item?.value ==
                                      eventInputs?.is_client_stream?.value
                                  ) != -1
                                    ? clientStreamOptions[
                                        clientStreamOptions.findIndex(
                                          (item) =>
                                            item?.value ==
                                            eventInputs?.is_client_stream?.value
                                        )
                                      ]
                                    : ""
                                }
                                isClearable
                              />
                              {error?.is_client_stream ? (
                                <div className="login-validation">
                                  {error?.is_client_stream}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label htmlFor="">
                                Event Date <span> *</span>
                              </label>
                              <DatePicker
                                type="text"
                                name="dateStart"
                                dateFormat="dd-MM-yyyy"
                                className={
                                  error?.dateStart
                                    ? "form-control error"
                                    : "form-control"
                                }
                                placeholderText="Event Date"
                                selected={eventInputs?.dateStart}
                                onChange={(e) => handleChange(e, "dateStart")}
                                isClearable
                              />
                              {error?.dateStart ? (
                                <div className="login-validation">
                                  {error?.dateStart}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          <div className="col-12 col-md-6">
                            <div className="form-group double-select">
                              <label htmlFor="">
                                {" "}
                                Event Start Time <span> *</span>
                              </label>
                              <Select
                                options={timeHours}
                                className={
                                  error?.dateStartHour
                                    ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                    : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                }
                                onChange={(e) =>
                                  handleChange(e, "dateStartHour")
                                }
                                value={
                                  timeHours.findIndex(
                                    (item) =>
                                      item?.value ==
                                      eventInputs?.dateStartHour?.value
                                  ) != -1
                                    ? timeHours[
                                        timeHours?.findIndex(
                                          (item) =>
                                            item?.value ==
                                            eventInputs?.dateStartHour?.value
                                        )
                                      ]
                                    : ""
                                }
                                isClearable
                              />
                              {error?.dateStartHour ? (
                                <div className="login-validation">
                                  {error?.dateStartHour}
                                </div>
                              ) : null}

                              <Select
                                options={timeMinutes}
                                className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                onChange={(e) =>
                                  handleChange(e, "dateStartMin")
                                }
                                value={
                                  timeMinutes?.findIndex(
                                    (item) =>
                                      item?.value ==
                                      eventInputs?.dateStartMin?.value
                                  ) != -1
                                    ? timeMinutes[
                                        timeMinutes?.findIndex(
                                          (item) =>
                                            item?.value ==
                                            eventInputs?.dateStartMin?.value
                                        )
                                      ]
                                    : ""
                                }
                                isClearable
                              />
                            </div>
                          </div>

                          <div className="col-12 col-md-6">
                            <div className="form-group double-select">
                              <label htmlFor=""> Event End Time</label>
                              <Select
                                options={timeHours}
                                className={
                                  error?.dateEndHour
                                    ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                    : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                }
                                onChange={(e) => handleChange(e, "dateEndHour")}
                                value={
                                  timeHours.findIndex(
                                    (item) =>
                                      item?.value ==
                                      eventInputs?.dateEndHour?.value
                                  ) != -1
                                    ? timeHours[
                                        timeHours?.findIndex(
                                          (item) =>
                                            item?.value ==
                                            eventInputs?.dateEndHour?.value
                                        )
                                      ]
                                    : ""
                                }
                                isClearable
                              />
                              {error?.dateEndHour ? (
                                <div className="login-validation">
                                  {error?.dateEndHour}
                                </div>
                              ) : null}
                              <Select
                                options={timeMinutes}
                                className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                onChange={(e) => handleChange(e, "dateEndMin")}
                                value={
                                  timeMinutes?.findIndex(
                                    (item) =>
                                      item?.value ==
                                      eventInputs?.dateEndMin?.value
                                  ) != -1
                                    ? timeMinutes[
                                        timeMinutes?.findIndex(
                                          (item) =>
                                            item?.value ==
                                            eventInputs?.dateEndMin?.value
                                        )
                                      ]
                                    : ""
                                }
                                isClearable
                              />
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label htmlFor="">
                                Event Code <span> *</span>
                              </label>
                              <input
                                type="text"
                                name="event_code"
                                placeholder="Event Code"
                                className={
                                  error?.event_code
                                    ? "form-control error"
                                    : "form-control"
                                }
                                onChange={(e) => handleChange(e)}
                                value={
                                  eventInputs?.event_code
                                    ? eventInputs?.event_code
                                    : ""
                                }
                              />
                              {error?.event_code ? (
                                <div className="login-validation">
                                  {error?.event_code}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label htmlFor="">Event Description</label>
                              <input
                                type="text"
                                name="description"
                                placeholder="Event Description"
                                className="form-control"
                                onChange={(e) => handleChange(e)}
                                value={
                                  eventInputs?.description
                                    ? eventInputs?.description
                                    : ""
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <div className="hcp-modal-action">
                          <div className="hcp-action-block">
                            <>
                              <div className="hcp-remove">
                                <button
                                  type="button"
                                  className="btn btn-filled"
                                  // onClick={() => deleteRecord(i)}
                                >
                                  <img
                                    src={path_image + "delete.svg"}
                                    alt="Add More"
                                  />
                                </button>
                              </div>
                            </>
                          </div>
                        </div> */}
                    </div>
                  </>
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary save btn-filled"
            onClick={(e) => {
              saveClicked(e);
            }}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-primary save btn-filled"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};
export default CommonAddEventModel;
