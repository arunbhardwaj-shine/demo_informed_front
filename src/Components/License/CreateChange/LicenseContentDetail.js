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

const LicenseContentDetail = () => {
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

      let body = {
        pdfId: typeof state?.pdfId !== "undefined" ? state?.pdfId : articleId,
        apiType: "Library",
        type: "content",
      };

      const res = await postData(ENDPOINT.LIBRARY, body);

      setLibraryData(res?.data?.data?.library);
      let data = "";
      if (res?.data?.data?.library?.[0]?.allow_print) {
        data += "print,";
      }
      if (res?.data?.data?.library?.[0]?.allow_download) {
        data += "Download,";
      }
      if (res?.data?.data?.library?.[0]?.allow_share) {
        data += "Share,";
      }
      if (res?.data?.data?.library?.[0]?.chat_box) {
        data += "Request,";
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
                      to="/license-edit"
                      state={{ pdfid: state?.pdfId }}
                      className="btn btn-primary btn-bordered move-draft"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-primary btn-bordered next"
                      onClick={() => navigate("/license-content")}
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
                                  <div className="d-flex align-items-start">
                                    <img
                                      src={path_image + "dummy-img.png"}
                                      alt="Preview "
                                    />
                                    <div className="verify-email-detail-clear">
                                      <h6>
                                        <strong>Content title | </strong>
                                        {data?.title ? data?.title : "N/A"}
                                      </h6>
                                      <h6>
                                        <strong>Content subtitle | </strong>
                                        {data?.pdf_sub_title
                                          ? data?.pdf_sub_title
                                          : "N/A"}
                                      </h6>
                                      <h6>
                                        <strong>Author | </strong>
                                        {data?.key_author
                                          ? data?.key_author
                                          : "N/A"}
                                      </h6>
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
                                              value: data?.docintelLink,
                                            });
                                          }}
                                        >
                                          Download QR
                                        </Button>
                                        <Link
                                          to="/license-sublink"
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
                                  <div className="col-12 col-md-4 mail-recipt-left">
                                    <h6>Who is involved</h6>

                                    <div className="smartlist-view email_box_outer">
                                      <div className="smartlist-view email_box">
                                        <div className="mail-box-content">
                                          <div className="mailbox-table">
                                            <table>
                                              <tbody>
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
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-12 col-md-4 mail-recipt-left">
                                    <h6>Limits agreed </h6>
                                    <div className="smartlist-view email_box_outer">
                                      <div className="smartlist-view email_box">
                                        <div className="mail-box-content">
                                          <div className="mailbox-table">
                                            <table>
                                              <tbody>
                                                <tr>
                                                  <th>Cost center</th>
                                                  <td>
                                                    {data?.cost_center
                                                      ? data?.cost_center
                                                      : "N/A"}
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <th>Expiration date</th>
                                                  <td>
                                                    {data?.expireDate
                                                      ? data?.expireDate
                                                      : "N/A"}
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <th>Set limit of usage</th>
                                                  <td>
                                                    {data?.limit >= 0
                                                      ? data?.limit
                                                      : "N/A"}
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <th>Enabled</th>
                                                  <td>
                                                    {enableData?.enable
                                                      ? enableData?.enable
                                                      : "N/A"}
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <th>inforMedGO code</th>
                                                  <td>{data?.rep_code}</td>
                                                </tr>

                                                <tr>
                                                  <th>Docintel code</th>
                                                  <td>{data?.docintel_code}</td>
                                                </tr>
                                                <tr>
                                                  <th>Invoice Notes</th>
                                                  <td>
                                                    {data?.special_requirment
                                                      ? data?.special_requirment?.trim()
                                                          ?.length > 10
                                                        ? data?.special_requirment?.substring(
                                                            0,
                                                            10
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
                                                        ?.length > 10 ? (
                                                        <span
                                                          className="show_more"
                                                          onClick={() =>
                                                            setOpen(!open)
                                                          }
                                                          aria-controls="example-collapse-text"
                                                          aria-expanded={open}
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
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-12 col-md-4 mail-recipt-left">
                                    <h6>About the Docintel Link </h6>
                                    <div className="smartlist-view email_box_outer">
                                      <div className="smartlist-view email_box">
                                        <div className="mail-box-content">
                                          <div className="mailbox-table">
                                            <table>
                                              <tbody>
                                                <tr>
                                                  <th>ePrint type</th>
                                                  <td>
                                                    {data?.spc_included
                                                      ? "PDF+SPC"
                                                      : data?.file_type ==
                                                        "ebook"
                                                      ? "Ebook"
                                                      : data?.file_type ==
                                                        "video"
                                                      ? "Video"
                                                      : "PDF"}
                                                  </td>
                                                </tr>
                                                {data?.file_type == "ebook" ? (
                                                  <tr>
                                                    <th>Uploaded chapters</th>
                                                    <td>
                                                      {data?.chapterCount
                                                        ? data?.chapterCount
                                                        : "N/A"}
                                                    </td>
                                                  </tr>
                                                ) : null}
                                                {data?.file_type == "video" ? (
                                                  <tr>
                                                    <th>Included videos</th>
                                                    <td>
                                                      {data?.file_type ==
                                                      "video"
                                                        ? "Yes"
                                                        : "N/A"}
                                                    </td>
                                                  </tr>
                                                ) : null}
                                                {localStorage.getItem(
                                                  "group_id"
                                                ) == "3" ? (
                                                  <tr>
                                                    <th>Saved as draft</th>
                                                    <td>
                                                      {data?.draft
                                                        ? "Yes"
                                                        : "N/A"}
                                                    </td>
                                                  </tr>
                                                ) : null}
                                                <tr>
                                                  <th>
                                                    Production notes for
                                                    Docintel team
                                                  </th>
                                                  <td>
                                                    {data?.production_notes
                                                      ? data?.production_notes?.trim()
                                                          .length > 10
                                                        ? data?.production_notes?.substring(
                                                            0,
                                                            10
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
                                                        .length > 10 ? (
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
    </>
  );
};

export default LicenseContentDetail;
