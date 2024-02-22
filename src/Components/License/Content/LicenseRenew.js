import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { postData } from "../../../axios/apiHelper";
import { ENDPOINT } from "../../../axios/apiConfig";
import Select from "react-select";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Col, Row, ProgressBar, Form } from "react-bootstrap";

import "react-toastify/dist/ReactToastify.css";
import "react-activity/dist/library.css";

import { loader } from "../../../loader";
import { toast } from "react-toastify";
import moment from "moment";
import DatePicker from "react-datepicker";

const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const LicenseRenew = () => {
  const navigate = useNavigate();
  const [flag, setFlag] = useState(0);
  const location = useLocation();
  const [opening_details, setOpeningDetails] = useState([]);
  const [data, setData] = useState(location?.state?.data);
  const BrokenImage ="https://docintel.s3-eu-west-1.amazonaws.com/cover/default/default.png";
  const dropdownData = [
    { value: "reset", label: "Reset collected data and set a new limit" },
    { value: "update", label: "Add a new quantity to the current usage" },
    { value: "add", label: "Add a new  quantity to the pervious quantity" },
  ];
  const [selectedValue, setSelectedValue] = useState("");
  const limitFieldRef = useRef(null);
  const [error, setError] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [userInputs, setCreateLibraryInputs] = useState({
    expDatetime: new Date(
      moment(new Date(), "MM/DD/YYYY").add("years", 1).format("MM/DD/YYYY")
    ),
    limit: "",
    specialRequirement: "",
  });
  useEffect(() => {
    if (!data) {
      navigate("/license/renew-listing");
    } else {
      getLibraryStats("data-tab", data?.id);
    }
  }, []);

  const getLibraryStats = async (event, id) => {
    setFlag(0);


      let normal_data = opening_details;
      try {
        let body = {
          pdfId: [id],
        };
        const res = await postData(ENDPOINT.LIBRARYSTATS, body);
        if (res?.data?.data?.[0]) {
          let new_data = res?.data?.data?.[0];
          normal_data.push(new_data);
          setOpeningDetails(normal_data);
          setFlag(flag + 1);
        }
      } catch (err) {
        console.log(err);
      }
    
  };

  function LinkWithTooltip({ id, children, href, tooltip }) {
    return (
      <OverlayTrigger
        overlay={<Tooltip id={id}>{tooltip}</Tooltip>}
        placement="top"
        delayShow={300}
        delayHide={150}
      >
        <a href={href}>{children}</a>
      </OverlayTrigger>
    );
  }
  const imageOnError = (event) => {
    event.currentTarget.src = BrokenImage;
    event.currentTarget.className = "error";
  };



  const handleChange = (e, isSelectedName) => {
    setCreateLibraryInputs({
      ...userInputs,
      [e?.target?.name]: e?.target?.value,
    });
  };


  const copyToClipboard = (content) => {
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(content);
      toast.success("content copied to the clipboard!");
    } else {
      unsecuredCopyToClipboard(content);
    }
  };
  const unsecuredCopyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    // textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      toast.success("content copied to the clipboard!");
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
    document.body.removeChild(textArea);
  };

  const renewButtonClicked = async (e) => {
    loader("show");

    let err = {};
    const { limit, expDatetime, specialRequirement } = userInputs;

    try {
      if (!limit) {
        err.limit = "Limit is required";
      } else if (limit < 0) {
        err.limit = "Limit must be greater than or equal to 0";
      }

      setError(err);

      if (Object.keys(err).length) {
        return;
      }

      const formattedExpDatetime = expDatetime
        ? moment(expDatetime).format("YYYY/MM/DD")
        : "";

      const payload = {
        pdfId: data?.id,
        limit,
        expDatetime: formattedExpDatetime,
        specialRequirement,
      };

      const res = await postData(ENDPOINT.RENEWLICENSE, {
        user_id: localStorage.getItem("user_id"),
        ...payload,
      });
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      loader("hide");
    }
  };


  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <Row>
            <div className="top-header sticky">
              <div className="page-title d-flex">
                <Link
                  className="btn btn-primary btn-bordered back-btn"
                  to="/license-create"
                >
                  <svg
                    width="14"
                    height="24"
                    viewBox="0 0 14 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.159662 12.0019C0.159662 11.5718 0.323895 11.1417 0.65167 10.8138L10.9712 0.494292C11.6277 -0.16216 12.692 -0.16216 13.3482 0.494292C14.0044 1.15048 14.0044 2.21459 13.3482 2.8711L4.21687 12.0019L13.3479 21.1327C14.0041 21.7892 14.0041 22.8532 13.3479 23.5093C12.6917 24.1661 11.6274 24.1661 10.9709 23.5093L0.65135 13.19C0.323523 12.8619 0.159662 12.4319 0.159662 12.0019Z"
                      fill="#97B6CF"
                    />
                  </svg>
                </Link>
                <h2>Renew</h2>
              </div>
            </div>

            <div className="library-content-box-layuot">
              <>
                <div className="doc-content-main-box col">
                  <div className="doc-content-header">
                    <div className="doc-content-header-logo">
                      <a href="#">
                        <img
                          alt="doc-logo"
                          src={data?.coverImage}
                          onError={imageOnError}
                          style={{ width: "67px" }}
                        />
                      </a>
                    </div>
                    <div className="doc-content">
                      <h5>{data?.title}</h5>
                      <h6>
                        {data?.pdf_sub_title
                          ? data.pdf_sub_title
                          : data?.folder_name}
                      </h6>
                      <p>{data?.key_author}</p>
                      <div className="select-tags">
                        {data?.tags?.length
                          ? JSON.parse(data.tags)?.map((data) => {
                              return <div>{data}</div>;
                            })
                          : ""}
                      </div>
                    </div>
                    <div className="tabs-data">
                      {/* <div className="flex-column justify-content-between"> */}

                      {/* </div> */}

                      <div className="tab-panel d-flex flex-column justify-content-between">
                        <div className="tab-content-links">
                          <a
                            href={data?.docintelLink}
                            className="doc-link"
                            target="_blank"
                          >
                            {data?.docintelLink}
                          </a>
                          <span
                            className="copy-content"
                            onClick={() => {
                              copyToClipboard(data?.docintelLink);
                            }}
                          >
                            <img
                              src={path_image + "copy-content.svg"}
                              alt="Copy"
                            />
                          </span>
                        </div>
                        <ul className="tab-mail-list">
                          {localStorage.getItem("group_id") == 2 && (
                            <>
                              <li>
                                <h6 className="tab-content-title">
                                  Sales person
                                </h6>
                                <h6>
                                  {data?.saleName ? data.saleName : "N/A"}
                                </h6>
                              </li>
                              <li>
                                <h6 className="tab-content-title">
                                  Production person
                                </h6>
                                <h6>
                                  {data?.productName
                                    ? data?.productName
                                    : "N/A"}
                                </h6>
                              </li>
                              <li>
                                <h6 className="tab-content-title">Company</h6>
                                <h6>{data?.company ? data?.company : "N/A"}</h6>
                              </li>

                              <li>
                                <h6 className="tab-content-title">
                                  Client product
                                </h6>
                                <h6>{data?.product ? data?.product : "N/A"}</h6>
                              </li>
                              <li>
                                <h6 className="tab-content-title">Country</h6>
                                <h6>{data?.country ? data?.country : "N/A"}</h6>
                              </li>
                              <li>
                                <h6 className="tab-content-title">Reseller</h6>
                                <h6>
                                  {data?.reseller ? data?.reseller : "N/A"}
                                </h6>
                              </li>
                              <li>
                                <h6 className="tab-content-title">
                                  Cost Center
                                </h6>
                                <h6>
                                  {data?.cost_center && data?.cost_center != 0
                                    ? data.cost_center
                                    : "N/A"}
                                </h6>
                              </li>

                              {/* <li>
                                  <h6 className="tab-content-title">
                                    Client name
                                  </h6>
                                  <h6>
                                    {data?.company +
                                      " " +
                                      data?.product +
                                      " " +
                                      data?.country}
                                  </h6>
                                </li> */}
                            </>
                          )}

                          <li>
                            <h6 className="tab-content-title">Enable</h6>
                            <h6>{data?.enable ? data?.enable : "N/A"}</h6>
                          </li>
                          <li>
                            <h6 className="tab-content-title">
                              Expiration date
                            </h6>
                            <h6>
                              {data?.expireDate ? data?.expireDate : "N/A"}
                            </h6>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="data-main-box tab-panel d-flex flex-column justify-content-between">
                      <ul className="tab-mail-list data">
                      {data?.lastRomanNumber == 2 ||
                        data?.lastRomanNumber == 3 ? (
                          <>
                            <li className="d-flex align-center">
                              <h6 className="tab-content-title">
                                Unique reader (total)
                                <LinkWithTooltip tooltip="Number of unique HCPs who have opened the content (based on IP address, device &amp; browser).">
                                  <img
                                    src={path_image + "info_circle_icon.svg"}
                                    alt="refresh-btn"
                                  />
                                </LinkWithTooltip>
                              </h6>
                              <div className="data-progress send">
                                <ProgressBar
                                  variant={
                                    opening_details.findIndex(
                                      (el) => el.pdfId == data?.id
                                    ) !== -1
                                      ? opening_details[
                                          opening_details.findIndex(
                                            (el) => el.pdfId == data?.id
                                          )
                                        ]?.unique > 0
                                        ? "warning"
                                        : "default"
                                      : "default"
                                  }
                                  now={
                                    opening_details.findIndex(
                                      (el) => el.pdfId == data?.id
                                    ) !== -1
                                      ? opening_details[
                                          opening_details.findIndex(
                                            (el) => el.pdfId == data?.id
                                          )
                                        ]?.unique
                                      : "100"
                                  }
                                  label={
                                    opening_details.findIndex(
                                      (el) => el.pdfId == data?.id
                                    ) !== -1
                                      ? opening_details[
                                          opening_details.findIndex(
                                            (el) => el.pdfId == data?.id
                                          )
                                        ]?.unique
                                      : "Loading"
                                  }
                                />
                              </div>
                            </li>
                            <li>
                              <h6 className="tab-content-title">
                                Article Usage
                                <LinkWithTooltip tooltip="Number of usage on the content.">
                                  <img
                                    src={path_image + "info_circle_icon.svg"}
                                    alt="refresh-btn"
                                  />
                                </LinkWithTooltip>
                              </h6>
                              <div className="data-progress">
                                <ProgressBar
                                  variant={
                                    opening_details.findIndex(
                                      (el) => el.pdfId == data?.id
                                    ) !== -1
                                      ? opening_details[
                                          opening_details.findIndex(
                                            (el) => el.pdfId == data?.id
                                          )
                                        ]?.pinReaders
                                        ? "pin_usage"
                                        : "default"
                                      : "default"
                                  }
                                  now={
                                    opening_details.findIndex(
                                      (el) => el.pdfId == data?.id
                                    ) !== -1
                                      ? (opening_details[
                                          opening_details.findIndex(
                                            (el) => el.pdfId == data?.id
                                          )
                                        ]?.pinReaders /
                                          opening_details[
                                            opening_details.findIndex(
                                              (el) => el.pdfId == data?.id
                                            )
                                          ]?.limit) *
                                        100
                                      : "100"
                                  }
                                  label={
                                    opening_details.findIndex(
                                      (el) => el.pdfId == data?.id
                                    ) !== -1
                                      ? opening_details[
                                          opening_details.findIndex(
                                            (el) => el.pdfId == data?.id
                                          )
                                        ].pinReaders
                                      : "Loading"
                                  }
                                />
                                <span>
                                  Agreed Limit :&nbsp;
                                  <strong>
                                    {opening_details.findIndex(
                                      (el) => el.pdfId == data?.id
                                    ) !== -1
                                      ? opening_details[
                                          opening_details.findIndex(
                                            (el) => el.pdfId == data?.id
                                          )
                                        ]?.limit == 1000
                                        ? "Unlimited"
                                        : opening_details[
                                            opening_details.findIndex(
                                              (el) => el.pdfId == data?.id
                                            )
                                          ]?.limit
                                      : "Unlimited"}
                                  </strong>
                                </span>
                              </div>
                              <span className="total-left">
                                {opening_details.findIndex(
                                  (el) => el.pdfId == data?.id
                                ) !== -1
                                  ? opening_details[
                                      opening_details.findIndex(
                                        (el) => el.pdfId == data?.id
                                      )
                                    ]?.limit == 1000
                                    ? null
                                    : opening_details[
                                        opening_details.findIndex(
                                          (el) => el.pdfId == data?.id
                                        )
                                      ]?.limit -
                                      opening_details[
                                        opening_details.findIndex(
                                          (el) => el.pdfId == data?.id
                                        )
                                      ]?.pinReaders
                                  : null}

                                {opening_details.findIndex(
                                  (el) => el.pdfId == data?.id
                                ) !== -1 ? (
                                  opening_details[
                                    opening_details.findIndex(
                                      (el) => el.pdfId == data?.id
                                    )
                                  ]?.limit != 1000 ? (
                                    <small>Left</small>
                                  ) : null
                                ) : null}
                              </span>
                            </li>
                          </>
                        ) : (
                          <li className="d-flex align-center">
                            <h6 className="tab-content-title">
                              Unique reader (total)
                              <LinkWithTooltip tooltip="Number of unique HCPs who have opened the content (based on IP address, device &amp; browser).">
                                <img
                                  src={path_image + "info_circle_icon.svg"}
                                  alt="refresh-btn"
                                />
                              </LinkWithTooltip>
                            </h6>
                            <div className="data-progress send">
                              <ProgressBar
                                variant={
                                  opening_details.findIndex(
                                    (el) => el.pdfId == data?.id
                                  ) !== -1
                                    ? opening_details[
                                        opening_details.findIndex(
                                          (el) => el.pdfId == data?.id
                                        )
                                      ]?.unique
                                      ? "warning"
                                      : "default"
                                    : "default"
                                }
                                now={
                                  opening_details.findIndex(
                                    (el) => el.pdfId == data?.id
                                  ) !== -1
                                    ? (opening_details[
                                        opening_details.findIndex(
                                          (el) => el.pdfId == data?.id
                                        )
                                      ]?.unique /
                                        opening_details[
                                          opening_details.findIndex(
                                            (el) => el.pdfId == data?.id
                                          )
                                        ]?.limit) *
                                      100
                                    : "100"
                                }
                                label={
                                  opening_details.findIndex(
                                    (el) => el.pdfId == data?.id
                                  ) !== -1
                                    ? opening_details[
                                        opening_details.findIndex(
                                          (el) => el.pdfId == data?.id
                                        )
                                      ]?.unique
                                    : "Loading"
                                }
                              />
                              <span>
                                Agreed Limit :&nbsp;
                                <strong>
                                  {" "}
                                  {opening_details.findIndex(
                                    (el) => el.pdfId == data?.id
                                  ) !== -1
                                    ? opening_details[
                                        opening_details.findIndex(
                                          (el) => el.pdfId == data?.id
                                        )
                                      ]?.limit == 1000
                                      ? "unlimited"
                                      : opening_details[
                                          opening_details.findIndex(
                                            (el) => el.pdfId == data?.id
                                          )
                                        ]?.limit
                                    : "unlimited"}
                                </strong>
                              </span>
                            </div>
                            <span className="total-left">
                              {opening_details.findIndex(
                                (el) => el.pdfId == data?.id
                              ) !== -1
                                ? opening_details[
                                    opening_details.findIndex(
                                      (el) => el.pdfId == data?.id
                                    )
                                  ]?.limit == 1000
                                  ? null
                                  : opening_details[
                                      opening_details.findIndex(
                                        (el) => el.pdfId == data?.id
                                      )
                                    ]?.limit -
                                    opening_details[
                                      opening_details.findIndex(
                                        (el) => el.pdfId == data?.id
                                      )
                                    ]?.unique
                                : null}

                              {opening_details.findIndex(
                                (el) => el.pdfId == data?.id
                              ) !== -1 ? (
                                opening_details[
                                  opening_details.findIndex(
                                    (el) => el.pdfId == data?.id
                                  )
                                ]?.limit != 1000 ? (
                                  <small>Left</small>
                                ) : null
                              ) : null}
                            </span>
                          </li>
                        )}
                        <li>
                          <h6 className="tab-content-title">
                            Openings (total){" "}
                            <LinkWithTooltip tooltip="Number of opening counts for specific article.">
                              <img
                                src={path_image + "info_circle_icon.svg"}
                                alt="refresh-btn"
                              />
                            </LinkWithTooltip>
                          </h6>
                          <div className="data-progress limited">
                            <ProgressBar
                              variant={
                                opening_details.findIndex(
                                  (el) => el.pdfId == data?.id
                                ) !== -1
                                  ? opening_details[
                                      opening_details.findIndex(
                                        (el) => el.pdfId == data?.id
                                      )
                                    ].opening
                                    ? "success"
                                    : "default"
                                  : "default"
                              }
                              now={
                                opening_details.findIndex(
                                  (el) => el.pdfId == data?.id
                                ) !== -1
                                  ? opening_details[
                                      opening_details.findIndex(
                                        (el) => el.pdfId == data?.id
                                      )
                                    ].opening
                                  : "100"
                              }
                              label={
                                opening_details.findIndex(
                                  (el) => el.pdfId == data?.id
                                ) !== -1
                                  ? opening_details[
                                      opening_details.findIndex(
                                        (el) => el.pdfId == data?.id
                                      )
                                    ].opening
                                  : "Loading"
                              }
                            />
                          </div>
                        </li>

                  

                        <li>
                          <h6 className="tab-content-title">
                            Registered readers
                            <LinkWithTooltip tooltip="Number of HCPs who have register for or activated the content.">
                              <img
                                src={path_image + "info_circle_icon.svg"}
                                alt="refresh-btn"
                              />
                            </LinkWithTooltip>
                          </h6>
                          <div className="data-progress">
                            <ProgressBar
                              variant={
                                opening_details.findIndex(
                                  (el) => el.pdfId == data?.id
                                ) !== -1
                                  ? opening_details[
                                      opening_details.findIndex(
                                        (el) => el.pdfId == data?.id
                                      )
                                    ]?.reader
                                    ? "danger"
                                    : "default"
                                  : "default"
                              }
                              now={
                                opening_details.findIndex(
                                  (el) => el.pdfId == data?.id
                                ) !== -1
                                  ? (opening_details[
                                      opening_details.findIndex(
                                        (el) => el.pdfId == data?.id
                                      )
                                    ]?.reader /
                                      opening_details[
                                        opening_details.findIndex(
                                          (el) => el.pdfId == data?.id
                                        )
                                      ]?.limit) *
                                    100
                                  : "100"
                              }
                              label={
                                opening_details.findIndex(
                                  (el) => el.pdfId == data?.id
                                ) !== -1
                                  ? opening_details[
                                      opening_details.findIndex(
                                        (el) => el.pdfId == data?.id
                                      )
                                    ].reader
                                  : "Loading"
                              }
                            />
                          </div>
                        </li>

                        <li>
                          <h6 className="tab-content-title">
                            SubLinks
                            <LinkWithTooltip tooltip="Number of sublinks with content.">
                              <img
                                src={path_image + "info_circle_icon.svg"}
                                alt="refresh-btn"
                              />
                            </LinkWithTooltip>
                          </h6>
                          <div className="data-progress">
                            <ProgressBar
                              variant={
                                opening_details.findIndex(
                                  (el) => el.pdfId == data?.id
                                ) !== -1
                                  ? opening_details[
                                      opening_details.findIndex(
                                        (el) => el.pdfId == data?.id
                                      )
                                    ]?.subLink
                                    ? "sublink"
                                    : "default"
                                  : "default"
                              }
                              now={
                                opening_details.findIndex(
                                  (el) => el.pdfId == data?.id
                                ) !== -1
                                  ? (opening_details[
                                      opening_details.findIndex(
                                        (el) => el.pdfId == data?.id
                                      )
                                    ]?.subLink /
                                      opening_details[
                                        opening_details.findIndex(
                                          (el) => el.pdfId == data?.id
                                        )
                                      ]?.limit) *
                                    100
                                  : "100"
                              }
                              label={
                                opening_details.findIndex(
                                  (el) => el.pdfId == data?.id
                                ) !== -1
                                  ? opening_details[
                                      opening_details.findIndex(
                                        (el) => el.pdfId == data?.id
                                      )
                                    ].subLink
                                  : "Loading"
                              }
                            />
                          </div>
                        </li>

                        {data?.allow_print ? (
                          <li>
                            <h6 className="tab-content-title">
                              Printed
                              <LinkWithTooltip tooltip="Number of HCPs who have print the content.">
                                <img
                                  src={path_image + "info_circle_icon.svg"}
                                  alt="refresh-btn"
                                />
                              </LinkWithTooltip>
                            </h6>
                            <div className="data-progress">
                              <ProgressBar
                                variant={
                                  opening_details.findIndex(
                                    (el) => el.pdfId == data?.id
                                  ) !== -1
                                    ? opening_details[
                                        opening_details.findIndex(
                                          (el) => el.pdfId == data?.id
                                        )
                                      ]?.print
                                      ? "print"
                                      : "default"
                                    : "default"
                                }
                                now={
                                  opening_details.findIndex(
                                    (el) => el.pdfId == data?.id
                                  ) !== -1
                                    ? (opening_details[
                                        opening_details.findIndex(
                                          (el) => el.pdfId == data?.id
                                        )
                                      ]?.print /
                                        opening_details[
                                          opening_details.findIndex(
                                            (el) => el.pdfId == data?.id
                                          )
                                        ]?.limit) *
                                      100
                                    : "100"
                                }
                                label={
                                  opening_details.findIndex(
                                    (el) => el.pdfId == data?.id
                                  ) !== -1
                                    ? opening_details[
                                        opening_details.findIndex(
                                          (el) => el.pdfId == data?.id
                                        )
                                      ].print
                                    : "Loading"
                                }
                              />
                            </div>
                          </li>
                        ) : null}

                        {data?.allow_download ? (
                          <li>
                            <h6 className="tab-content-title">
                              Downloaded
                              <LinkWithTooltip tooltip="Number of HCPs who have download the content.">
                                <img
                                  src={path_image + "info_circle_icon.svg"}
                                  alt="refresh-btn"
                                />
                              </LinkWithTooltip>
                            </h6>
                            <div className="data-progress">
                              <ProgressBar
                                variant={
                                  opening_details.findIndex(
                                    (el) => el.pdfId == data?.id
                                  ) !== -1
                                    ? opening_details[
                                        opening_details.findIndex(
                                          (el) => el.pdfId == data?.id
                                        )
                                      ]?.download
                                      ? "download"
                                      : "default"
                                    : "default"
                                }
                                now={
                                  opening_details.findIndex(
                                    (el) => el.pdfId == data?.id
                                  ) !== -1
                                    ? (opening_details[
                                        opening_details.findIndex(
                                          (el) => el.pdfId == data?.id
                                        )
                                      ]?.download /
                                        opening_details[
                                          opening_details.findIndex(
                                            (el) => el.pdfId == data?.id
                                          )
                                        ]?.limit) *
                                      100
                                    : "100"
                                }
                                label={
                                  opening_details.findIndex(
                                    (el) => el.pdfId == data?.id
                                  ) !== -1
                                    ? opening_details[
                                        opening_details.findIndex(
                                          (el) => el.pdfId == data?.id
                                        )
                                      ].download
                                    : "Loading"
                                }
                              />
                            </div>
                          </li>
                        ) : null}
                      </ul>
                    </div>
                  </div>
                </div>
              </>

              <div id="renewModal">
                <div className="form_action">
                  <Form className="product-unit d-flex justify-content-between align-items-center">
                    <div className="form-group">
                      <h5 className="modal-title" id="staticBackdropLabel">
                        Please select what you like to do to renew your license
                      </h5>
                      <Select
                        options={dropdownData}
                        placeholder="Select Here"
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                        onChange={(value) => {
                          setCreateLibraryInputs({
                            expDatetime: new Date(
                              moment(new Date(), "MM/DD/YYYY")
                                .add("years", 1)
                                .format("MM/DD/YYYY")
                            ),
                            limit: "",
                          });
                          setSelectedValue(value?.value);
                        }}
                      />
                    </div>
                  </Form>
                </div>
                {selectedValue && (
                  <div className="create-change-content">
                    <div className="form_action">
                      <div className="form-group">
                        <label htmlFor="">
                          Set limit of usage <span>*</span>
                        </label>
                        <input
                          type="number"
                          name="limit"
                          min="0"
                          ref={limitFieldRef}
                          className={
                            error.limit ? "form-control error" : "form-control"
                          }
                          placeholder="“0” value means unlimited limit"
                          value={userInputs?.limit}
                          onChange={(e) => handleChange(e, "limit")}
                        />
                        {error.limit && (
                          <div className="login-validation">{error.limit}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Expiration date</label>
                        <DatePicker
                          selected={
                            userInputs.expDatetime
                              ? new Date(userInputs.expDatetime)
                              : new Date(
                                  moment(new Date())
                                    .add(1, "years")
                                    .format("MM/DD/YYYY")
                                )
                          }
                          name="expDatetime"
                          onChange={(date) => handleChange(date, "expDatetime")}
                          dateFormat="dd/MM/yyyy"
                          className="form-control"
                          minDate={currentDate}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Invoice notes</label>
                        <textarea
                          className="form-control"
                          id="formControlTextarea"
                          onChange={(e) =>
                            handleChange(e.target.value, "specialRequirement")
                          }
                          rows="5"
                          placeholder="Please type your notes here..."
                          value={userInputs?.specialRequirement}
                        ></textarea>
                      </div>
                      <button
                        className="btn btn-primary btn-filled next"
                        onClick={renewButtonClicked}
                      >
                        Renew License
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Row>
        </div>
      </Col>
    </>
  );
};

export default LicenseRenew;
