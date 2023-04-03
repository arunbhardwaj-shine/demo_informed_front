import React, { useEffect, useState } from "react";
import { loader } from "../../../loader";
import { toast } from "react-toastify";
import "react-circular-progressbar/dist/styles.css";
import { postData } from "../../../axios/apiHelper";
import { ENDPOINT } from "../../../axios/apiConfig";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Collapse from 'react-bootstrap/Collapse';
import { Button } from "react-bootstrap";

const ContentDetail = () => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
   const [open, setOpen] = useState(false);
  const { state } = useLocation();
  const [libraryData, setLibraryData] = useState();
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
      };

      const res = await postData(ENDPOINT.LIBRARY, body);

      setLibraryData(res?.data?.data?.library);

      loader("hide");
    } catch (err) {
      console.log("err");
      loader("hide");
    }
  };

  const removeTopic = (id) => {
    const allTopics = libraryData?.topic;
    allTopics.splice(id, 1);
    setReRender(reRender + 1);
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
                      to="/library-edit"
                      state={{ pdfid: state?.pdfId }}
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
                                  <div className="d-flex align-items-start">
                                    <img
                                      src={path_image + "dummy-img.png"}
                                      alt="Preview "
                                    />
                                    <div className="verify-email-detail-clear">
                                      <h6>
                                        <strong>Content Title | </strong>
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
                                      <h6>
                                        <strong>Topics | </strong>
                                        <ul>
                                          {data?.topic
                                            ? data?.topic?.map((topic, id) => {
                                                return (
                                                  <>
                                                    <li className="list1">
                                                      {topic.innerHTML || topic}{" "}
                                                      <img
                                                        src={
                                                          path_image +
                                                          "filter-close.svg"
                                                        }
                                                        alt="Close-filter"
                                                        onClick={() =>
                                                          removeTopic(id)
                                                        }
                                                      />
                                                    </li>
                                                  </>
                                                );
                                              })
                                            : "N/A"}
                                        </ul>
                                      </h6>
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
                                            toast.success(
                                              "content copied to the clipboard!"
                                            );
                                            window.navigator.clipboard.writeText(
                                              data?.docintelLink
                                            );
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
                                                    {data?.multiple_publisher
                                                      ? "Yes"
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
                                                    {data?.limit
                                                      ? data?.limit
                                                      : "N/A"}
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <th>Enable</th>
                                                  <td>
                                                    {data?.enable
                                                      ? data?.enable
                                                      : "N/A"}
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <th>Invoice Notes</th>
                                                  <td>
                                                    {/* {data?.special_requirment
                                                      ?data?.special_requirment?.trim()
                                                      : "N/A"} */}
                                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,  
                                                      <Collapse in={open}>
                                                      <div id="collapse-text-view">sed do eiusmod tempor incididunt ut labore et dolore magna amet, 
                                                      consectetur adipiscing elit,
                                                              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                                              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                                              nisi ut aliquip ex Lorem ipsum dolor sit amet, consectetur adipiscing
                                                              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                                                              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                                              laboris nisi ut aliquip ex Lorem ipsum dolor sit amet, consectetur
                                                              adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                                              magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                                        </div>
                                                     </Collapse>
                                                     <span className="show_more"
                                                              onClick={() => setOpen(!open)}
                                                              aria-controls="example-collapse-text"
                                                              aria-expanded={open}>...</span>
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
                                    <h6>Creating the eprint </h6>
                                    <div className="smartlist-view email_box_outer">
                                      <div className="smartlist-view email_box">
                                        <div className="mail-box-content">
                                          <div className="mailbox-table">
                                            <table>
                                              <tbody>
                                                <tr>
                                                  <th>ePrint type</th>
                                                  <td>
                                                    {data?.linkType
                                                      ? data?.linkType
                                                      : "N/A"}
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <th>Uploaded chapters</th>
                                                  <td>
                                                    {data?.file_type == "ebook"
                                                      ? "Yes"
                                                      : "N/A"}
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <th>Included videos</th>
                                                  <td>
                                                    {data?.file_type == "video"
                                                      ? "Yes"
                                                      : "N/A"}
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <th>Saved as draft</th>
                                                  <td>
                                                    {data?.save_draft
                                                      ? data?.save_draft
                                                      : "N/A"}
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <th>
                                                    Production notes to Docintel
                                                    team
                                                  </th>
                                                  <td>
                                                    {data?.production_notes
                                                      ? data?.production_notes?.trim()
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
    </>
  );
};

export default ContentDetail;
