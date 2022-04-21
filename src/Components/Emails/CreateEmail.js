import React, { useEffect, useState } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const CreateEmail = () => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [SendListData, setSendListData] = useState([]);
  const [UserData, setUserData] = useState([]);
  const [templateList, setTemplateList] = useState([]);
  const [template, setTemplate] = useState("");
  const [counter, setCounter] = useState(0);

  //axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
  //   useEffect(() => {
  //     const body = {
  //       user_id: 18207,
  //       language: "",
  //       ibu: "",
  //     };
  //     axios
  //       .post(`emailapi/get_template_list`, body)
  //       .then((res) => {
  //         console.log(res);
  //         // console.log(res.data.response.data);
  //         setTemplateList(res.data.response.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, []);

  useEffect(() => {
    const body = {
      user_id: 18207,
      language: "",
      ibu: "",
    };

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const getTemplateListData = async () => {
      console.log(process.env.REACT_APP_API_KEY);
      await axios
        .post(`emailapi/get_template_list`, body)
        .then((res) => {
          console.log(res);
          setTemplateList(res.data.response.data);
          setCounter(counter + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getTemplateListData();
  }, []);

  const templateClicked = (template) => {
    console.log(template.source_code);
    setTemplate(template.source_code);
  };

  return (
    <>
      <div className="col right-sidebar">
        <div className="page-top-nav">
          <div className="row justify-content-end align-items-center">
            <div className="col-12 col-md-1">
              <div className="header-btn-left">
                <button className="btn btn-primary btn-bordered back">
                  Back
                </button>
              </div>
            </div>
            <div className="col-12 col-md-9">
              <ul className="tabnav-link">
                <li className="">
                  <a href="">Select Content</a>
                </li>
                <li className="active">
                  <a href="">Create Your Email</a>
                </li>
                <li className="">
                  <a href="">Select HCPs</a>
                </li>
                <li className="">
                  <a href="">Verify your list</a>
                </li>
                <li className="">
                  <a href="">Verify your Email</a>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-2">
              <div className="header-btn">
                <button className="btn btn-primary btn-bordered move-draft">
                  Save As Draft
                </button>
                <button className="btn btn-primary btn-filled next">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="top-header">
          <div className="custom-container">
            <div className="row">
              <div className="page-title">
                <h4>Select your Template</h4>
              </div>
            </div>
          </div>
        </div>

        <section className="select-mail-template">
          <div className="custom-container">
            <div className="row">
              <OwlCarousel
                className="mail-templates owl-carousel owl-theme"
                margin={20}
                items={4}
                loop
                nav
              >
                {/* <div className="item">
                  <img src={path_image + "content_added1.png"} alt="" />
                  <p>Template 1</p>
                </div>
                <div className="item">
                  <img src={path_image + "welcome_email1.png"} alt="" />
                  <p>Template 2</p>
                </div>
                <div className="item">
                  <img src={path_image + "content_added1.png"} alt="" />
                  <p>Template 3</p>
                </div>
                <div className="item">
                  <img src={path_image + "welcome_email1.png"} alt="" />
                  <p>Template 4</p>
                </div>
                <div className="item">
                  <img src={path_image + "content_added1.png"} alt="" />
                  <p>Template 5</p>
                </div>
                <div className="item">
                  <img src={path_image + "welcome_email1.png"} alt="" />
                  <p>Template 6</p>
                </div> */}

                {console.log(templateList)}
                {templateList.map((template) => {
                  return (
                    <>
                      <div
                        className="item"
                        onClick={() => templateClicked(template)}
                      >
                        <img src={path_image + "content_added1.png"} alt="" />
                        <p>{template.name}</p>
                      </div>
                      ;
                    </>
                  );
                })}
              </OwlCarousel>
              <div className="email-form">
                <form>
                  <div className="form-inline row justify-content-between align-items-center">
                    <div className="form-group col-12 col-md-7">
                      <label for="exampleInputEmail1">Email Description </label>
                      <input
                        type="text"
                        className="form-control"
                        id="email-desc"
                      />
                    </div>
                    <div className="form-group right-side col-12 col-md-5">
                      <label for="exampleInputEmail1">Email Creator</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email-address"
                      />
                    </div>
                  </div>
                  <div className="form-inline row justify-content-between align-items-center">
                    <div className="form-group">
                      <label for="exampleInputEmail1">Email Campaign</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email-campaign"
                      />
                    </div>
                  </div>
                  <div className="input-group w-100">
                    <div className="input-group-prepend">
                      <button
                        className="btn btn-bordered"
                        type="button"
                        id="tags-add"
                        data-bs-toggle="modal"
                        data-bs-target="#tagsModal"
                      >
                        + Add Tag
                      </button>
                    </div>
                    <div className="tags_added">
                      <ul>
                        <li className="list1">
                          tag1{" "}
                          <img
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                        </li>
                        <li className="list2">
                          tag2{" "}
                          <img
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                        </li>
                        <li className="list3">
                          tag3{" "}
                          <img
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                        </li>
                        <br />
                        <li className="list4">
                          tag4{" "}
                          <img
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                        </li>
                        <li className="list5">
                          tag5{" "}
                          <img
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="form-inline row justify-content-end align-items-center">
                    <div className="form-group col-12 col-md-7">
                      <label for="exampleInputEmail1">Email Subject</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email-subject"
                      />
                    </div>
                    <div className="form-buttons right-side col-12 col-md-5">
                      <button className="btn btn-primary approved-btn btn-bordered">
                        Approved{" "}
                        <img src={path_image + "approved-btn.svg"} alt="" />
                      </button>
                      <button className="btn btn-primary btn-filled btn-large">
                        Send A Sample{" "}
                        <img src={path_image + "send-sample.svg"} alt="" />
                      </button>
                      <button className="btn btn-primary btn-filled">
                        Save As template
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <CKEditor
              editor={ClassicEditor}
              data={template}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                console.log({ event, editor, data });
              }}
              onBlur={(event, editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                console.log("Focus.", editor);
              }}
            />
          </div>
        </section>
      </div>

      <div
        className="modal fade"
        id="tagsModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="tagsModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Add Tags
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="select-tags">
                <h6>Select Tag :</h6>
                <div className="tag-lists">
                  <div className="tag-lists-view">
                    <div>Hemophilia</div>
                    <div>Tag 2..</div>
                    <div>Tag 3..</div>
                    <div>New ..</div>
                    <div>Hemophilia</div>
                    <div>Tag 2..</div>
                    <div>Tag 3..</div>
                    <div>New ..</div>
                    <div>Hemophilia</div>
                    <div>Tag 2..</div>
                    <div>Tag 3..</div>
                    <div>New ..</div>
                    <div>Hemophilia</div>
                    <div>Tag 2..</div>
                    <div>Tag 3..</div>
                    <div>New ..</div>
                    <div>Hemophilia</div>
                    <div>Tag 2..</div>
                    <div>Tag 3..</div>
                    <div>New ..</div>
                    <div>Hemophilia</div>
                    <div>Tag 2..</div>
                    <div>Tag 3..</div>
                    <div>New ..</div>
                    <div>Tag 3..</div>
                    <div>New ..</div>
                    <div>Hemophilia</div>
                    <div>Tag 2..</div>
                    <div>Tag 3..</div>
                    <div>New ..</div>
                    <div>Hemophilia</div>
                    <div>Tag 2..</div>
                    <div>Tag 3..</div>
                    <div>New ..</div>
                  </div>
                </div>
              </div>
              <div className="selected-tags">
                <h6>
                  Selected Tag <span>| 3</span>
                </h6>
                <div className="total-selected">
                  <div>
                    Hemophilia{" "}
                    <img
                      src={path_image + "filter-close.svg"}
                      alt="Close-filter"
                    />
                  </div>
                  <div>
                    Tag 2..{" "}
                    <img
                      src={path_image + "filter-close.svg"}
                      alt="Close-filter"
                    />
                  </div>
                  <div>
                    Tag 3..{" "}
                    <img
                      src={path_image + "filter-close.svg"}
                      alt="Close-filter"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <form>
                <div className="form-group">
                  <label for="new-tag">New Tag</label>
                  <input type="text" className="form-control" id="new-tag" />
                  <button
                    type="button"
                    className="btn btn-primary add btn-bordered"
                  >
                    Add
                  </button>
                </div>
              </form>
              <button type="button" className="btn btn-primary save btn-filled">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateEmail;
