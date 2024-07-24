import React, { useEffect, useState } from "react";
import { loader } from "../../../loader";
import { toast } from "react-toastify";
import CommonModel from "../../../Model/CommonModel";
import "react-circular-progressbar/dist/styles.css";
import { postData } from "../../../axios/apiHelper";
import { ENDPOINT } from "../../../axios/apiConfig";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";
import { Button } from "react-bootstrap";
import QRCode from "qrcode.react";
import { Modal } from "react-bootstrap";
import CommonConfirmModel from "../../../Model/CommonConfirmModel";
import {
  getEmailData,
  getDraftData,
  getSelectedSmartListData,
} from "../../../actions";
import { connect } from "react-redux";

var dxr = 0;
var pdf_id = 0;

const ContentDetail = (props) => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [open, setOpen] = useState(false);
  const [openProduction, setOpenProduction] = useState(false);
  const { state } = useLocation();
  const [libraryData, setLibraryData] = useState();
  const [qrValue, setQrValue] = useState("QR-code");
  const [qrState, setQr] = useState({ value: "" });
  const [qrSize, setQrSize] = useState(290);
  const [size, setSize] = useState("Small");
  const [show, setShow] = useState(false);
  const [enableData, setEnableData] = useState({
    enable: "",
    reseller: "",
  });

  const [reRender, setReRender] = useState(0);
  const navigate = useNavigate();
  const [articleId, setArticleId] = useState(
    typeof state?.pdfId !== "undefined" ? state?.pdfId : ""
  );
  const [isEdit, setIsEdit] = useState(
    typeof state?.isEdit !== "undefined" ? state?.isEdit : 0
  );
  const location = useLocation();
  // console.log(location,'content details')

  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState({
    message1: "",
    message2: "",
    footerButton: "",
    footerButtonSecond: ""
  });
  const [commonConfirmModelFun, setCommonConfirmModelFun] = useState(() => {});

  useEffect(() => {
    getLibraryData();
  }, []);

  const getLibraryData = async () => {
    try {
      loader("show");

      if (typeof articleId === "undefined") {
        if (state?.pdfId) {
          setArticleId(state?.pdfId);
        }
      }

      dxr = typeof state?.pdfId !== "undefined" ? state?.pdfId : articleId;
      pdf_id = typeof state?.pdfId !== "undefined" ? state?.pdfId : articleId;

      let body = {
        pdfId: typeof state?.pdfId !== "undefined" ? state?.pdfId : articleId,
        apiType: "Library",
        type: "content",
      };

      const res = await postData(ENDPOINT.LIBRARY, body);
      // if(typeof (state?.isEdit) !== "undefined" && state?.isEdit !== 1){
        if(localStorage.getItem('user_id') == 'm5JI5zEDY3xHFTZBnSGQZg=='){
          messagePopup();
        }
      // }

      setLibraryData(res?.data?.data?.library);
      let data = "";
      if (res?.data?.data?.library?.[0]?.allow_print) {
        data += "Print,";
      }
      if (res?.data?.data?.library?.[0]?.allow_download) {
        data += " Download,";
      }
      if (res?.data?.data?.library?.[0]?.allow_share) {
        data += " Share,";
      }
      if (res?.data?.data?.library?.[0]?.chat_box) {
        data += " Request,";
      }
      if (data) {
        data = data.replace(/^,|,$/g, "");
      }
      setEnableData({
        enable: data,
        reseller: res?.data?.data?.resellerData.length
          ? res?.data?.data?.resellerData?.join()
          : "",
      });

      loader("hide");
    } catch (err) {
      console.log("err");
      loader("hide");
    }
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
    document.body.appendChild(textArea); // textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      toast.success("content copied to the clipboard!");
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
    document.body.removeChild(textArea);
  };

  const removeTopic = (id) => {
    const allTopics = libraryData?.topic;
    allTopics.splice(id, 1);
    setReRender(reRender + 1);
  };

  const commonModelFun = () => {
    setShow(true);
  };

  const downloadQRData = [
    {
      label: "Select Size",
      type: "dropdown",
      dropdown: [
        {
          key: "Tiny",
          value: "M",
        },
        {
          key: "Article",
          value: "H",
        },
        {
          key: "Large Print",
          value: "L",
        },
      ],
    },
  ];

  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${qrValue}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    setShow(false);
  };

  const handleQR = (e) => {
    if (e == "H") {
      setQrSize(390);
    }
    if (e == "L") {
      setQrSize(490);
    }
    setQr({ ...qrState, level: e });
  };

  const messagePopup = async() => {
    console.log("POPUP IS OPEN")
    setTimeout(function () {
      setCommonConfirmModelFun(() => userAction);
      setPopupMessage({
        message1: "Please select which action you performed with this article.",
        message2: "",
        footerButton: "Only upload",
        footerButtonSecond: "Upload and Email",
      });
      setConfirmationPopup(true);
    }, 800);
  }

  const hideConfirmationModal = () => {
    setConfirmationPopup(false);
  };

  const userAction = (val) => {
    if(val == 'mail'){
      props.getEmailData({ PdfSelected: articleId });
      navigate("/CreateEmail", {
        state: { PdfSelected: articleId },
      });
    }else{
      navigate("/library-content");
    }
  }

  return (
    <>
      <div className="col right-sidebar">
        <div className="custom-container">
          <div className="row">
            <div className="page-top-nav">
              <div className="row justify-content-end align-items-center">
                <div className="col-12 col-md-1">
                  <div className="header-btn-left"></div>
                </div>
                <div className="col-12 col-md-9"></div>
                <div className="col-12 col-md-2">
                  <div className="header-btn">
                    <Link
                      // to="/library-edit"
                      to={
                        location?.state?.flag === "mandatory"
                          ? "/library-mandatory-content"
                          : location?.state?.flag === "Non-mandatory"
                          ? "/library-content"
                          : "/library-edit"
                      }
                      state={{ pdfid: state?.pdfId,flag: localStorage.getItem("user_id") ==="56Ek4feL/1A8mZgIKQWEqg==" 
                        ? (location?.state?.flag === "Non-mandatory" ? 'Non-mandatory' : "mandatory")
                        : ''  }}
                      className="btn btn-primary btn-bordered move-draft"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-primary btn-bordered next"
                      onClick={() => navigate("/library-content")}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <section className="verify_email content_details">
              {libraryData?.length
                ? libraryData.map((data, index) => {
                    return (
                      <>
                        <div className="row" key={index}>
                          <div className="col-12">
                            <div className="verify-mail-box">
                              <div className="verify-email-detail">
                                <div>
                                  <h4>Content Details</h4>
                                  <div className="d-flex align-items-start preview_content">
                                    <img
                                      src={data?.coverImage}
                                      alt="Preview "
                                    />
                                    <div className="verify-email-detail-clear">
                                      <h6>
                                        <strong>Content title | </strong>
                                        {data?.title ? data?.title : "N/A"}
                                      </h6>
                                      <h6>
                                        <>
                                          {localStorage.getItem("user_id") ==
                                          "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==" ? (
                                            <strong>Comment | </strong>
                                          ) : (
                                            <strong>Content subtitle | </strong>
                                          )}
                                          {data?.pdf_sub_title
                                            ? data?.pdf_sub_title
                                            : "N/A"}
                                        </>
                                      </h6>
                                      {localStorage.getItem("user_id") !=
                                        "iSnEsKu5gB/DRlycxB6G4g==" &&
                                      localStorage.getItem("user_id") !=
                                        "56Ek4feL/1A8mZgIKQWEqg==" && localStorage.getItem("user_id") != "sNl1hra39QmFk9HwvXETJA==" ? (
                                        <h6>
                                          <strong>Author | </strong>
                                          {data?.key_author
                                            ? data?.key_author
                                            : "N/A"}
                                        </h6>
                                      ) : null}

                                      {localStorage.getItem("group_id") ==
                                      "3" ? (
                                        <h6>
                                          <strong>Topics | </strong>
                                          <ul>
                                            {data?.tags
                                              ? JSON?.parse(data?.tags)?.map(
                                                  (topic, id) => {
                                                    return (
                                                      <>
                                                        <li className="list1">
                                                          {topic.innerHTML ||
                                                            topic}{" "}
                                                        </li>
                                                      </>
                                                    );
                                                  }
                                                )
                                              : "N/A"}
                                          </ul>
                                        </h6>
                                      ) : null}

                                      <h6>
                                        <strong>Docintel | </strong>
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
                                            src={
                                              path_image + "copy-content.svg"
                                            }
                                            alt="Copy"
                                          />
                                        </span>
                                      </h6>
                                      <div className="info_btn">
                                        <Button
                                          className="btn btn-primary btn-bordered move-draft"
                                          onClick={() => {
                                            commonModelFun();
                                            setQr({
                                              ...qrState,
                                              value: data?.docintelLink+`~QRcode`,
                                            });
                                          }}
                                        >
                                          Download QR
                                        </Button>
                                        <Link
                                          to="/library-sublink"
                                          state={{ pdfid: data.id }}
                                          className="btn btn-primary btn-filled next"
                                        >
                                          New sublink
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="mail-recipt">
                                <div className="row">
                                  {localStorage.getItem("group_id") != "3" ||
                                  (localStorage.getItem("user_id") ==
                                    "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==") ? (
                                    <div className="col-12 col-md-4 mail-recipt-left">
                                      <h6>Who is involved</h6>

                                      <div className="smartlist-view email_box_outer">
                                        <div className="smartlist-view email_box">
                                          <div className="mail-box-content">
                                            <div className="mailbox-table">
                                              <table>
                                                <tbody>
                                                  {localStorage.getItem(
                                                    "user_id"
                                                  ) ==
                                                    "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==" &&
                                                  localStorage.getItem(
                                                    "group_id"
                                                  ) == "3" ? (
                                                    <>
                                                      <tr>
                                                        <th>User Role</th>
                                                        <td>
                                                          {data?.trail_user_type
                                                            ? typeof data?.trail_user_type ==
                                                                "string" &&
                                                              data?.trail_user_type !=
                                                                ""
                                                              ? JSON.parse(
                                                                  data?.trail_user_type
                                                                ).join()
                                                              : "N/A"
                                                            : "N/A"}
                                                        </td>
                                                      </tr>
                                                      {/*<tr>
                                                          <th>Blind Type</th>
                                                          <td>
                                                            {data?.blindType
                                                              ? data.blindType ==
                                                                "blinded"
                                                                ? "Yes"
                                                                : "No"
                                                              : "No"}
                                                          </td>
                                                        </tr>*/}

                                                      <tr>
                                                        <th>
                                                          IRT mandatory training
                                                        </th>
                                                        <td>
                                                          {data?.reader_mandatory
                                                            ? "Yes"
                                                            : "No"}
                                                        </td>
                                                      </tr>
                                                    </>
                                                  ) : (
                                                    <>
                                                      <tr>
                                                        <th>Company</th>
                                                        <td>
                                                          {data?.company
                                                            ? data?.company
                                                            : "N/A"}
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <th>Country</th>
                                                        <td>
                                                          {data?.country
                                                            ? data?.country
                                                            : "N/A"}
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <th>Client Product</th>
                                                        <td>
                                                          {data?.product
                                                            ? data?.product
                                                            : "N/A"}
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <th>Production</th>
                                                        <td>
                                                          {data?.productName
                                                            ? data?.productName
                                                            : "N/A"}
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <th>Sales</th>
                                                        <td>
                                                          {data?.saleName
                                                            ? data?.saleName
                                                            : "N/A"}
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <th>Reseller</th>
                                                        <td>
                                                          {enableData?.reseller
                                                            ? enableData?.reseller
                                                            : "N/A"}
                                                        </td>
                                                      </tr>
                                                    </>
                                                  )}
                                                </tbody>
                                              </table>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : null}

                                  {localStorage.getItem("user_id") !=
                                  "56Ek4feL/1A8mZgIKQWEqg==" && localStorage.getItem("user_id") != "sNl1hra39QmFk9HwvXETJA==" ? (
                                    <>
                                      <div className="col-12 col-md-4 mail-recipt-left">
                                        {localStorage.getItem("group_id") ==
                                        2 ? (
                                          <h6>Limits agreed </h6>
                                        ) : null}

                                        <div className="smartlist-view email_box_outer">
                                          <div className="smartlist-view email_box">
                                            <div className="mail-box-content">
                                              <div className="mailbox-table">
                                                <table>
                                                  <tbody>
                                                    {localStorage.getItem(
                                                      "group_id"
                                                    ) == 2 ? (
                                                      <tr>
                                                        <th>Cost center</th>
                                                        <td>
                                                          {data?.cost_center
                                                            ? data?.cost_center
                                                            : "N/A"}
                                                        </td>
                                                      </tr>
                                                    ) : null}

                                                    {localStorage.getItem(
                                                      "group_id"
                                                    ) == 2 ? (
                                                      <>
                                                        <tr>
                                                          <th>
                                                            Expiration date
                                                          </th>
                                                          <td>
                                                            {data?.expireDate
                                                              ? data?.expireDate
                                                              : "N/A"}
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <th>
                                                            Set limit of usage
                                                          </th>
                                                          <td>
                                                            {data?.limit > 0
                                                              ? data?.limit
                                                              : "unlimited"}
                                                          </td>
                                                        </tr>
                                                      </>
                                                    ) : null}
                                                    {localStorage.getItem(
                                                      "group_id"
                                                    ) == "3" &&
                                                    localStorage.getItem(
                                                      "user_id"
                                                    ) !=
                                                      "56Ek4feL/1A8mZgIKQWEqg==" && localStorage.getItem("user_id") != "sNl1hra39QmFk9HwvXETJA==" ? (
                                                      <tr>
                                                        <th>Product</th>
                                                        <td>
                                                          {data?.product
                                                            ? data?.product
                                                            : "N/A"}
                                                        </td>
                                                      </tr>
                                                    ) : (
                                                      ""
                                                    )}

                                                    {localStorage.getItem(
                                                      "user_id"
                                                    ) !=
                                                    "56Ek4feL/1A8mZgIKQWEqg==" && localStorage.getItem("user_id") != "sNl1hra39QmFk9HwvXETJA==" ? (
                                                      <tr>
                                                        <th>Enabled</th>
                                                        <td>
                                                          {enableData?.enable
                                                            ? enableData?.enable
                                                            : "N/A"}
                                                        </td>
                                                      </tr>
                                                    ) : null}

                                                    <tr>
                                                      <th>inforMedGO code</th>
                                                      <td>{data?.rep_code}</td>
                                                    </tr>

                                                    <tr>
                                                      <th>Docintel code</th>
                                                      <td>
                                                        {data?.docintel_code}
                                                      </td>
                                                    </tr>

                                                    {localStorage.getItem(
                                                      "group_id"
                                                    ) == 2 ? (
                                                      <tr>
                                                        <th>Invoice Notes</th>
                                                        <td>
                                                          {data?.special_requirment
                                                            ? data?.special_requirment?.trim()
                                                                ?.length > 100
                                                              ? data?.special_requirment?.substring(
                                                                  0,
                                                                  100
                                                                )
                                                              : data?.special_requirment?.trim()
                                                            : "N/A"}

                                                          <Collapse in={open}>
                                                            <div id="collapse-text-view">
                                                              {data?.special_requirment
                                                                ? data?.special_requirment?.trim()
                                                                : ""}
                                                            </div>
                                                          </Collapse>
                                                          {data?.special_requirment ? (
                                                            data?.special_requirment?.trim()
                                                              ?.length > 100 ? (
                                                              <span
                                                                className="show_more"
                                                                onClick={() =>
                                                                  setOpen(!open)
                                                                }
                                                                aria-controls="example-collapse-text"
                                                                aria-expanded={
                                                                  open
                                                                }
                                                              >
                                                                ...
                                                              </span>
                                                            ) : (
                                                              ""
                                                            )
                                                          ) : (
                                                            ""
                                                          )}
                                                        </td>
                                                      </tr>
                                                    ) : null}
                                                  </tbody>
                                                </table>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ) : null}

                                  <div className="col-12 col-md-4 mail-recipt-left">
                                    <h6>About the Docintel Link </h6>
                                    <div className="smartlist-view email_box_outer">
                                      <div className="smartlist-view email_box">
                                        <div className="mail-box-content">
                                          <div className="mailbox-table">
                                            <table>
                                              <tbody>
                                                {localStorage.getItem(
                                                  "user_id"
                                                ) !=
                                                "56Ek4feL/1A8mZgIKQWEqg==" && localStorage.getItem("user_id") != "sNl1hra39QmFk9HwvXETJA==" ? (
                                                  <tr>
                                                    <th>ePrint type</th>
                                                    <td>
                                                      {data?.spc_included
                                                        ? "PDF+SPC"
                                                        : data?.file_type == "ebook" && data?.parent_id == 0
                                                        ? "Ebook"
                                                        : data?.file_type == "ebook" && data?.parent_id == 1
                                                        ? "Ebook + Video"
                                                        : data?.file_type ==
                                                          "video"
                                                        ? "Video"
                                                        : "PDF"}
                                                    </td>
                                                  </tr>
                                                ) : null}

                                                {data?.file_type == "ebook" ? (
                                                  <tr>
                                                    <th>Uploaded chapters</th>
                                                    <td>
                                                      {data?.chapterCount
                                                        ? data?.chapterCount
                                                        : 0}
                                                    </td>
                                                  </tr>
                                                ) : null}

                                                {data?.file_type == "video" ? (
                                                  <tr>
                                                    <th>Included videos</th>
                                                    <td>
                                                      Yes
                                                      {/*data?.file_type == "video"
                                                          ? "Yes"
                                                          : "N/A"*/}
                                                    </td>
                                                  </tr>
                                                ) : null}

                                                {localStorage.getItem(
                                                  "group_id"
                                                ) == "3" ? (
                                                  <>
                                                    <tr>
                                                      <th>Saved as draft</th>
                                                      <td>
                                                        {data?.draft
                                                          ? "Yes"
                                                          : "No"}
                                                      </td>
                                                    </tr>

                                                    {localStorage.getItem(
                                                      "user_id"
                                                    ) ==
                                                    "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==" ? (
                                                      <>
                                                        <tr>
                                                          <th>
                                                            inforMedGO code
                                                          </th>
                                                          <td>
                                                            {data?.rep_code}
                                                          </td>
                                                        </tr>

                                                        <tr>
                                                          <th>Docintel code</th>
                                                          <td>
                                                            {
                                                              data?.docintel_code
                                                            }
                                                          </td>
                                                        </tr>
                                                      </>
                                                    ) : null}
                                                  </>
                                                ) : null}
                                                {localStorage.getItem(
                                                  "user_id"
                                                ) !=
                                                "56Ek4feL/1A8mZgIKQWEqg==" && localStorage.getItem("user_id") != "sNl1hra39QmFk9HwvXETJA==" ? (
                                                  <tr>
                                                    <th>
                                                      Production notes for
                                                      Docintel team
                                                    </th>
                                                    <td>
                                                      {data?.production_notes
                                                        ? data?.production_notes?.trim()
                                                            .length > 100
                                                          ? data?.production_notes?.substring(
                                                              0,
                                                              100
                                                            )
                                                          : data?.production_notes.trim()
                                                        : "N/A"}
                                                      <Collapse
                                                        in={openProduction}
                                                      >
                                                        <div id="collapse-text-view">
                                                          {data?.production_notes
                                                            ? data?.production_notes?.trim()
                                                            : ""}
                                                        </div>
                                                      </Collapse>
                                                      {data?.production_notes ? (
                                                        data?.production_notes?.trim()
                                                          .length > 100 ? (
                                                          <span
                                                            className="show_more"
                                                            onClick={() =>
                                                              setOpenProduction(
                                                                !openProduction
                                                              )
                                                            }
                                                            aria-controls="example-collapse-text"
                                                            aria-expanded={
                                                              openProduction
                                                            }
                                                          >
                                                            ...
                                                          </span>
                                                        ) : (
                                                          ""
                                                        )
                                                      ) : (
                                                        ""
                                                      )}
                                                    </td>
                                                  </tr>
                                                ) : null}
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })
                : null}
            </section>
          </div>
        </div>
      </div>

      <CommonModel
        show={show}
        onClose={setShow}
        heading={"Download QR"}
        data={downloadQRData}
        footerButton={"Download"}
        handleSubmit={downloadQRCode}
        handleQR={handleQR}
      />

      <QRCode
        style={{ display: "none" }}
        id="qr-gen"
        value={qrState?.value}
        size={qrSize}
        level={qrState?.level}
        includeMargin={true}
      />

      <CommonConfirmModel
        show={confirmationpopup}
        onClose={hideConfirmationModal}
        fun={commonConfirmModelFun}
        popupMessage={popupMessage}
        path_image={path_image}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  dxr = state.getEmailData?.PdfSelected;
  pdf_id = state.getDraftData?.pdf_id;
  return state;
};

export default connect(mapStateToProps, {
  getEmailData: getEmailData,
  getDraftData: getDraftData,
})(ContentDetail)