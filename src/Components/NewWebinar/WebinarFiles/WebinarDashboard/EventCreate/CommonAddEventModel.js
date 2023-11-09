import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import EventModelValidation from "./EventModelValidation";
import { toast } from "react-toastify";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { loader } from "../../../../../loader";
import { postData, updateConsent } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";

const CommonAddEventModel = ({
  show,
  onClose,
  webinarDetail,
  data,
  eventId,
  apiData,
  handleSubmit,
}) => {
  const path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [timeHours, setTimeHours] = useState([
    { label: "00 ", value: "00" },
    { label: "01 ", value: "01" },
    { label: "02 ", value: "02" },
    { label: "03 ", value: "03" },
    { label: "04 ", value: "04" },
    { label: "05 ", value: "05" },
    { label: "06 ", value: "06" },
    { label: "07 ", value: "07" },
    { label: "08 ", value: "08" },
    { label: "09 ", value: "09" },
    { label: "10 ", value: "10" },
    { label: "11 ", value: "11" },
    { label: "12 ", value: "12" },
    { label: "13 ", value: "13" },
    { label: "14 ", value: "14" },
    { label: "15 ", value: "15" },
    { label: "16 ", value: "16" },
    { label: "17 ", value: "17" },
    { label: "18 ", value: "18" },
    { label: "19 ", value: "19" },
    { label: "20 ", value: "20" },
    { label: "21 ", value: "21" },
    { label: "22 ", value: "22" },
    { label: "23 ", value: "23" },
  ]);
  const [timeMinutes, setTimeMinutes] = useState([
    { label: "00 ", value: "00" },
    { label: "05 ", value: "05" },
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

  const [error, setError] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [countryTimezone, setCountryTimezone] = useState([]);
  const [clientStreamOptions, setClientStreamOptions] = useState([
    { label: "Yes", value: "1" },
    { label: "No", value: "0" },
  ]);
  const [timezoneOptions, setTimezoneOptions] = useState([]);
  const [ibuOptions, setIBUOptions] = useState([]);
  const [eventInputs, setEventInputs] = useState({
    dateStart: new Date(moment(new Date(), "MM/DD/YYYY").format("MM/DD/YYYY")),
    title: "",
    type: "",
    timezone: "",
    country_timezone: "",
    is_client_stream: "",
    client_stream_url: "",
    dateStartHour: "",
    dateStartMin: "",
    dateEndHour: "",
    dateEndMin: "",
    event_code: "",
    description: "",
    speaker_name: "",
    speaker_email: "",
  });
  useEffect(() => {
    setCountryTimezone(webinarDetail?.countryTimezone);
    setIBUOptions(webinarDetail?.ibu);
    setTimezoneOptions(webinarDetail?.timezoneName);
    if (data?.id) {
        let speaker_name = '';
        let speaker_email = '';
        if(data?.raw_description){
          let parseData = JSON.parse(data?.raw_description);
          speaker_name = parseData?.speaker_name;
          speaker_email = parseData?.speaker_email;
        }
      setEventInputs({
        ...data,
        title: data?.title,
        type: data?.type ? data?.type : "",
        timezone: data?.timezone,
        country_timezone: data?.country_timezone,
        is_client_stream: data?.is_client_stream == 1 ? "Yes" : "No",
        client_stream_url: data?.client_stream_url
          ? data?.client_stream_url
          : "",
        dateStart: data?.dateStart,
        dateStartHour: data?.dateStartHour,
        dateStartMin: data?.dateStartMin,
        dateEndHour: data?.dateEndHour ? data?.dateEndHour : "",
        dateEndMin: data?.dateEndMin ? data?.dateEndMin : "",
        event_code: data?.event_code,
        description: data?.description ? data?.description : "",
        speaker_name: speaker_name,
        speaker_email: speaker_email,
      });
    } else {
      setEventInputs({
        dateStart: new Date(
          moment(new Date(), "MM/DD/YYYY").format("MM/DD/YYYY")
        ),
        title: "",
        type: "",
        timezone: "",
        country_timezone: "",
        is_client_stream: "",
        client_stream_url: "",
        dateStartHour: "",
        dateStartMin: "",
        dateEndHour: "",
        dateEndMin: "",
        event_code: "",
        description: "",
        speaker_name: "",
        speaker_email: "",
      });
    }
  }, [show]);
  const handleClose = () => {
    setError({});
    setEventInputs({
      dateStart: new Date(
        moment(new Date(), "MM/DD/YYYY").format("MM/DD/YYYY")
      ),
    });
    onClose(false);
  };
  const handleChange = (e, isSelectedName) => {
    if (e?.target?.name == "event_code") {
      setEventInputs({
        ...eventInputs,
        [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
          ? e
          : e?.target?.value?.trim(),
      });
    } else {
      setEventInputs({
        ...eventInputs,
        [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
          ? e
          : e?.target?.value,
      });
    }
  };
  const saveClicked = async (e) => {
    try {
      const error = EventModelValidation(eventInputs);
      if (Object.keys(error)?.length) {
        // toast.error(error[Object.keys(error)[0]]);
        setError(error);
        return;
      } else {
        loader("show");
        let dataObj = {
          title: eventInputs?.title,
          type: eventInputs?.type ? eventInputs?.type : "",
          timezone: eventInputs?.timezone,
          countryTimezone: eventInputs?.country_timezone,
          isClientStream: eventInputs?.is_client_stream == "Yes" ? 1 : 0,
          clientStreamUrl: eventInputs?.client_stream_url
            ? eventInputs?.client_stream_url
            : "",
          dateStart: eventInputs?.dateStart,
          dateStartHour: eventInputs?.dateStartHour,
          dateStartMin: eventInputs?.dateStartMin,
          dateEndHour: eventInputs?.dateEndHour,
          dateEndMin: eventInputs?.dateEndMin,
          eventCode: eventInputs?.event_code,
          description: eventInputs?.description ? eventInputs?.description : "",
          speaker_name: eventInputs?.speaker_name ? eventInputs?.speaker_name : "",
          speaker_email: eventInputs?.speaker_email ? eventInputs?.speaker_email : "",
        };
        console.log(dataObj,"dataObj");

        if (data?.id) {
          const res = await updateConsent(
            `${ENDPOINT.WEBINAR_UPDATE_EVENT}/${data?.id}`,
            dataObj
          );
        } else {
          const res = await postData(ENDPOINT.WEBINAR_ADD_NEW_EVENT, dataObj);
        }

        // onClose(false);
        setEventInputs({
          dateStart: new Date(
            moment(new Date(), "MM/DD/YYYY").format("MM/DD/YYYY")
          ),
        });
        handleSubmit();
        setError({});
      }
    } catch (err) {
      console.log("--err", err);
    } finally {
      loader("hide");
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
              {data?.id ? "Edit Event" : "New Event"}
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
                          <div className="col-12 col-md-12">
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
                          <div className="col-12 col-md-12 speaker-name">
                            <div className="row">
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">Speaker's Name  <span> *</span></label>
                                  <input
                                    type="text"
                                    name="speaker_name"
                                    placeholder="Enter Speaker's Name"
                                    className={
                                      error?.speaker_name
                                        ? "form-control error"
                                        : "form-control"
                                    }
                                    onChange={(e) => handleChange(e)}
                                    value={
                                      eventInputs?.speaker_name ? eventInputs?.speaker_name : ""
                                    }
                                  />
                                    {error?.speaker_name ? (
                                      <div className="login-validation">
                                        {error?.speaker_name}
                                      </div>
                                    ) : null}
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                  <div className="form-group">
                                    <label htmlFor="">Speaker's Email  <span> *</span> </label>
                                    <input
                                      type="email"
                                      name="speaker_email"
                                      placeholder="Enter Speaker's Email"
                                      className={
                                        error?.speaker_email
                                          ? "form-control error"
                                          : "form-control"
                                      }
                                      onChange={(e) => handleChange(e)}
                                      value={
                                        eventInputs?.speaker_email ? eventInputs?.speaker_email : ""
                                      }
                                    />
                                    {error?.speaker_email ? (
                                      <div className="login-validation">
                                        {error?.speaker_email}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                                {/* <div className="col-12 col-md-12">
                                  <span class="add-choice">Add Speaker<img src={path_image+"add-choice.svg"} alt=""/></span>
                                </div> */}
                            </div>
                          </div>
                          <div className="col-12 col-md-12">
                            <div className="form-group">
                              <label htmlFor="">IBU</label>

                              <Select
                                options={ibuOptions}
                                className={
                                  error?.type
                                    ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                    : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                }
                                onChange={(e) => handleChange(e?.value, "type")}
                                value={
                                  ibuOptions
                                    ? ibuOptions.findIndex(
                                        (item) =>
                                          item?.value == eventInputs?.type
                                      ) != -1
                                      ? ibuOptions[
                                          ibuOptions.findIndex(
                                            (item) =>
                                              item?.value == eventInputs?.type
                                          )
                                        ]
                                      : ""
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

                          <div className="col-12 col-md-12">
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
                                onChange={(e) =>
                                  handleChange(e?.value, "timezone")
                                }
                                value={
                                  timezoneOptions
                                    ? timezoneOptions.findIndex(
                                        (item) =>
                                          item?.value == eventInputs?.timezone
                                      ) != -1
                                      ? timezoneOptions[
                                          timezoneOptions.findIndex(
                                            (item) =>
                                              item?.value ==
                                              eventInputs?.timezone
                                          )
                                        ]
                                      : ""
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

                          <div className="col-12 col-md-12">
                            <div className="form-group">
                              <label htmlFor="">
                                {" "}
                                Select Timezone<span>*</span>
                              </label>
                              <Select
                                options={countryTimezone}
                                className={
                                  error?.country_timezone
                                    ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                    : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                }
                                onChange={(e) =>
                                  handleChange(e?.value, "country_timezone")
                                }
                                value={
                                  countryTimezone
                                    ? countryTimezone?.findIndex(
                                        (item) =>
                                          item?.value ==
                                          eventInputs?.country_timezone
                                      ) != -1
                                      ? countryTimezone[
                                          countryTimezone?.findIndex(
                                            (item) =>
                                              item?.value ==
                                              eventInputs?.country_timezone
                                          )
                                        ]
                                      : ""
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
                          <div className="col-12 col-md-12">
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
                                  handleChange(e?.label, "is_client_stream")
                                }
                                value={
                                  clientStreamOptions?.findIndex(
                                    (item) =>
                                      item?.label ==
                                      eventInputs?.is_client_stream
                                  ) != -1
                                    ? clientStreamOptions[
                                        clientStreamOptions?.findIndex(
                                          (item) =>
                                            item?.label ==
                                            eventInputs?.is_client_stream
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
                          {eventInputs?.is_client_stream == "Yes" ? (
                            <div className="col-12 col-md-12">
                              <div className="form-group">
                                <label htmlFor="">
                                  Client Stream URL <span> *</span>
                                </label>
                                <input
                                  type="text"
                                  name="client_stream_url"
                                  placeholder="Event url"
                                  className={
                                    error?.client_stream_url
                                      ? "form-control error"
                                      : "form-control"
                                  }
                                  onChange={(e) => handleChange(e)}
                                  value={
                                    eventInputs?.client_stream_url
                                      ? eventInputs?.client_stream_url
                                      : ""
                                  }
                                />
                                {error?.client_stream_url ? (
                                  <div className="login-validation">
                                    {error?.client_stream_url}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          <div className="col-12 col-md-12">
                            <div className="form-group">
                              <label htmlFor="">
                                Event Date <span> *</span>
                              </label>

                              <DatePicker
                                name="dateStart"
                                className={
                                  error?.dateStart
                                    ? "form-control error"
                                    : "form-control"
                                }
                                placeholderText="Event Date"
                                selected={
                                  eventInputs?.dateStart
                                    ? new Date(eventInputs?.dateStart)
                                    : new Date(
                                        moment(new Date(), "MM/DD/YYYY").format(
                                          "MM/DD/YYYY"
                                        )
                                      )
                                }
                                onChange={(date) =>
                                  handleChange(date, "dateStart")
                                }
                                minDate={currentDate}
                                dateFormat="dd/MM/yyyy"
                              />
                              {error?.dateStart ? (
                                <div className="login-validation">
                                  {error?.dateStart}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          <div className="col-12 col-md-12">
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
                                  handleChange(e?.value, "dateStartHour")
                                }
                                value={
                                  timeHours?.findIndex(
                                    (item) =>
                                      item?.value == eventInputs?.dateStartHour
                                  ) != -1
                                    ? timeHours[
                                        timeHours?.findIndex(
                                          (item) =>
                                            item?.value ==
                                            eventInputs?.dateStartHour
                                        )
                                      ]
                                    : ""
                                }
                                isClearable
                              />
                              
                              <Select
                                options={timeMinutes}
                                className={
                                  error?.dateStartHour
                                    ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                    : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                }
                                onChange={(e) =>
                                  handleChange(e?.value, "dateStartMin")
                                }
                                value={
                                  timeMinutes?.findIndex(
                                    (item) =>
                                      item?.value == eventInputs?.dateStartMin
                                  ) != -1
                                    ? timeMinutes[
                                        timeMinutes?.findIndex(
                                          (item) =>
                                            item?.value ==
                                            eventInputs?.dateStartMin
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
                            </div>
                          </div>

                          <div className="col-12 col-md-12">
                            <div className="form-group double-select">
                              <label htmlFor="">
                                {" "}
                                Event End Time <span> *</span>
                              </label>
                              <Select
                                options={timeHours}
                                className={
                                  error?.dateEndHour
                                    ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                    : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                }
                                onChange={(e) =>
                                  handleChange(e?.value, "dateEndHour")
                                }
                                value={
                                  timeHours?.findIndex(
                                    (item) =>
                                      item?.value == eventInputs?.dateEndHour
                                  ) != -1
                                    ? timeHours[
                                        timeHours?.findIndex(
                                          (item) =>
                                            item?.value ==
                                            eventInputs?.dateEndHour
                                        )
                                      ]
                                    : ""
                                }
                                isClearable
                              />
                              
                              <Select
                                options={timeMinutes}
                                // className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                className={
                                  error?.dateEndHour
                                    ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                    : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                }
                                onChange={(e) =>
                                  handleChange(e?.value, "dateEndMin")
                                }
                                value={
                                  timeMinutes?.findIndex(
                                    (item) =>
                                      item?.value == eventInputs?.dateEndMin
                                  ) != -1
                                    ? timeMinutes[
                                        timeMinutes?.findIndex(
                                          (item) =>
                                            item?.value ==
                                            eventInputs?.dateEndMin
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
                            </div>
                          </div>
                          <div className="col-12 col-md-12">
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

                          <div className="col-12 col-md-12">
                            <div className="form-group">
                              <label htmlFor="">Event Description</label>
                              <textarea
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
            className="btn btn-primary save btn-bordered"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary save btn-filled"
            onClick={(e) => {
              saveClicked(e);
            }}
          >
            Save
          </button>
        </div>
      </Modal>
    </>
  );
};
export default CommonAddEventModel;
