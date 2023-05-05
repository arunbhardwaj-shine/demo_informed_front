import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { createContent } from "../../CommonComponent/Validations";
import { Button, Form, Dropdown, DropdownButton, Col, Row } from "react-bootstrap";
import { postFormData, postData } from "../../../axios/apiHelper";
import { loader } from "../../../loader";
import { ENDPOINT } from "../../../axios/apiConfig";
import CommonModel from "../../../Model/CommonModel";
import moment from "moment";

let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const LicenseCreateUser = () => {
  const newdate = new Date();
  const [counterFlag, setCounterFlag] = useState(0);
  const [reseller, setReseller] = useState([]);
  const [show, setShow] = useState(false);
  const [commanShow, setCommanShow] = useState(false);
  const [id, setId] = useState(localStorage.getItem("user_id"));
  const handleClose = () => setShow(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [userInputs, setCreateLibraryInputs] = useState({
    expDatetime: new Date(
      moment(new Date(), "MM/DD/YYYY").add("years", 1).format("MM/DD/YYYY")
    ),
    limit: "",
    uploadFile: "",
    contentTitle: "",
    keyAuthor: "",
    company: "",
    country: "",
    journalTitle: "",
    allowShare: "",
    allowDownload: "",
    allowPrint: "",
    product: "",
    docintelFormat: "",
    coverPhoto: "",
    specialRequirment: "",
    productionNotes: "",
    category: "",
    format: "",
    ibu: "",
    allowOneSource: "",
    allowLibrary: "",
    allowRequest: "",
    allowDraft: false,
    allowVideo: false,
    comDatetime: "",
    cpdValue: "",
  });
  const [blindType, setBlindType] = useState([
    { value: "blind", label: "blind" },
    { value: "unblind", label: "unblind" },
  ]);
  const [ebookFile, setEbookFile] = useState([]);
  const [chapter, setChapter] = useState([
    {
      chapterTitle: "",
      uploadFile: "",
      fileValue: "",
    },
  ]);
  const [userDetail, setUserDetail] = useState({
    user: {},
    production: [],
    sales: [],
    country: [],
    format: [],
    product: [],
  });

  const product = [
    {
      label: "Product name",
      type: "input",
      placeholder: "Type your product name",
    },
  ];

  const [ePrintType, setePrintType] = useState([
    { value: "pdf", label: "PDF" },
    { value: "video", label: "video" },
    { value: "ebook", label: "eBook" },
  ]);

  const [chapterSelect, setChapterSelect] = useState("");
  const [videoSelect, setVideoSelect] = useState("");
  const [uploadNewVideo, setUploadNewVideo] = useState(false);
  const [changeEmbeddedVideo, setChangeEmbeddedVideo] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [allTags, setAllTags] = useState({});
  const [newTag, setNewTag] = useState("");
  const [tagClickedFirst, setTagClickedFirst] = useState([]);
  const [tagsCounter, setTagsCounter] = useState(0);
  const [finalTags, setFinalTags] = useState([]);
  const [tagsReRender, setTagsReRender] = useState(0);
  const [updateflag, setupdateFlag] = useState(0);

  const initalFun = async () => {
    loader("show");
    const hadData = await postData(ENDPOINT.LIBRARYDETAIL, {
      user_id: id,
    });
    let country = [];
    hadData?.data?.data?.country?.reduce((objEntries, key) => {
      country.push({
        label: key,
        value: key,
      });
    });
    let category = [];
    if (hadData?.data?.data?.category?.length) {
      hadData?.data?.data?.category?.reduce((objEntries, key) => {
        category.push({
          label: key,
          value: key,
        });
      });
    }
    let tags = [];
    if (hadData?.data?.data?.tags?.length) {
      hadData?.data?.data?.tags?.reduce((objEntries, key) => {
        tags.push(key?.value);
      });
    }

    setAllTags(tags);
    setUserDetail({
      user: hadData?.data?.data?.user,
      production: hadData?.data?.data?.production,
      country: country,
      costCenter: hadData?.data?.data?.costCenter,
      sales: hadData?.data?.data?.sale,
      format: hadData?.data?.data?.format?.sort((a, b) =>
        a.value > b.value ? 1 : -1
      ),
      category: category?.sort((a, b) => (a.value > b.value ? 1 : -1)),
      ibu: hadData?.data?.data?.ibu,
      product: hadData?.data?.data?.product?.sort((a, b) =>
        a.value > b.value ? 1 : -1
      ),
      reseller: hadData?.data?.data?.reseller,
    });

    loader("hide");
  };
  useEffect(() => {
    initalFun();
  }, []);
  const handleChange = (e, isSelectedName) => {
    if (e?.target?.files?.length < 1) {
      return;
    }
    setCreateLibraryInputs({
      ...userInputs,
      [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
        ? e?.target?.files
          ? e?.target?.files
          : e
        : e?.target?.value,
    });
  };

  const nextButtonClicked = async (e) => {
    if (userInputs.docintelFormat == "ebook") {
      userInputs.chapter = chapter;
    }

    if(userDetail?.user?.[0]?.flag == 1 &&
      userDetail?.user?.[0]?.group_id == 3){
        userInputs.chapter = chapter
        if(!userInputs?.trial){
          userInputs.trial = ""
        }
        if(!userInputs?.blindType){
          userInputs.blindType = ""
        }
      }else{

      }

    const err = createContent(
      userInputs,
      ebookFile,
      userDetail?.user?.[0]?.group_id
    );
    console.log("-err",err)


    if (Object.keys(err)?.length) {
      setError(err);
      return;
    } else {
      loader("show");
      try {
        let formData = new FormData();

        formData.append("productionNotes", userInputs?.productionNotes);
        formData.append("limit", userInputs?.limit);
        formData.append("file", userInputs?.uploadFile?.[0]);
        formData.append("title", userInputs?.contentTitle);
        formData.append("production", userInputs?.production?userInputs?.production:0);
        formData.append("sales", userInputs?.sales?userInputs?.sales:0);
        formData.append("costCenter", userInputs?.costCenter?userInputs?.costCenter:"");

        if (userDetail?.user?.[0]?.group_id == 3) {
          formData.append(
            "expDatetime",
            new Date(moment().year(2030).format("MM/DD/YYYY"))
          );
        } else {
          formData.append("expDatetime", userInputs?.expDatetime);
        }
        formData.append("company", userInputs?.company);
        formData.append("country", userInputs?.country);
        formData.append("pdfSubTitle", userInputs?.journalTitle);
        formData.append("keyAuthor", userInputs?.keyAuthor);
        formData.append("multiplePublisher", JSON.stringify(reseller));
        formData.append("allowShare", userInputs?.allowShare);
        formData.append("allowDownload", userInputs?.allowDownload);
        formData.append("allowPrint", userInputs?.allowPrint);
        formData.append(
          "product",
          userInputs?.product?.value ? userInputs?.product?.value : ""
        );
        ebookFile?.forEach((item) => {
          formData.append("ebookData", item);
        });
        formData.append("fileType", userInputs?.docintelFormat);
        formData.append("coverPhoto", userInputs?.coverPhoto?.[0]);
        formData.append("chapter", JSON.stringify(chapter));
        formData.append("specialRequirment", userInputs?.specialRequirment);
        formData.append("createdBy", id);
        formData.append("licensed", 1);
        formData.append("category", userInputs?.category);
        formData.append("format", userInputs?.format);
        formData.append("ibu", userInputs?.ibu);
        formData.append("allowOneSource", userInputs?.allowOneSource);
        formData.append("allowLibrary", userInputs?.allowLibrary);
        formData.append("allowRequest", userInputs?.allowRequest ? 1 : 0);
        formData.append(
          "allowDraft",
          userInputs?.allowDraft
            ? JSON.stringify(userInputs?.allowDraft)
            : JSON.stringify(false)
        );
        formData.append("allowVideo", userInputs?.allowVideo ? 1 : 0);
        formData.append("trial", userInputs?.trial);
        formData.append("blindType", userInputs?.blindType);
        formData.append("comDatetime", userInputs?.comDatetime);
        formData.append("cpdValue", userInputs?.cpdValue);
        formData.append(
          "tags",
          tagClickedFirst?.length ? JSON.stringify(tagClickedFirst) : ""
        );

        const res = await postFormData(ENDPOINT.LIBRARYCREATE, formData, {
          header: {
            "Content-Type": "multipart/form-data",
          },
        });
        loader("hide");
        navigate("/license-set-popup", {
          state: {
            pdfId: res?.data?.data?.pdfId,
            fileType: userInputs?.docintelFormat,
          },
        });
      } catch (err) {
        loader("hide");
      }
    }
  };

  const addMoreChClicked = () => {
    if (chapter.every((element) => element.uploadFile != "")) {
      setChapter([
        ...chapter,
        {
          chapterTitle: "",
          uploadFile: "",
        },
      ]);
    } else {
      toast.warning("Please input the chapter file atleast!");
    }
  };

  const deleteRecord = (i) => {
    const list = chapter;
    list.splice(i, 1);
    ebookFile.splice(i, 1);
    setChapter(list);
    setEbookFile(ebookFile);
    setCounterFlag(counterFlag + 1);
  };

  const onChapterTitleChange = (e, i) => {
    const { value } = e.target;
    const list = [...chapter];
    list[i].chapterTitle = value;
    setChapter(list);
  };

  const handleOnEbookChange = (e, i) => {
    const value = e.target.files[0]?.name;
    const list = [...chapter];
    list[i].uploadFile = value;
    ebookFile[i] = e.target.files[0];
    setEbookFile(ebookFile);
    setChapter(list);
  };

  const onChapterSelect = (event) => {
    setChapterSelect(event);
  };

  const onVideoSelect = (event) => {
    setVideoSelect(event);
  };

  const handleReseller = (e, data) => {
    let newData = [];
    if (e.target.checked) {
      newData = reseller;
      newData.push(data?.id);
    } else {
      newData = reseller?.filter((item) => item != data?.id);
    }
    setReseller(newData);
  };

  const onUploadNewVideoClicked = () => {
    setUploadNewVideo(true);
  };
  const onChangeEmbeddedVideo = (event) => {
    setChangeEmbeddedVideo(event);
  };
  const addNewProductClicked = (e) => {
    e.preventDefault();
    setCommanShow(true);
  };

  const topicButtonClicked = (group_id) => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const tagClicked = (dd) => {
    if (!tagClickedFirst.includes(dd)) {
      setTagClickedFirst((oldArray) => [...oldArray, dd]);
    } else {
      toast.error("Tag already in list.");
    }
  };

  const removeTagFinal = (index) => {
    const tags = finalTags;
    const tagsClickedFirst = tagClickedFirst;
    tags.splice(index, 1);
    tagsClickedFirst.splice(index, 1);
    setFinalTags(tags);
    setTagClickedFirst(tagsClickedFirst);

    setTagsReRender(tagsReRender + 1);
  };

  const newTagChanged = (e) => {
    setNewTag(e.target.value);
    e.target.value = "";
    const new_atg = document.getElementById("new-tag");
    new_atg.value = "";
  };

  const addTag = async () => {
    if (typeof newTag == "undefined" || newTag.trim().length == 0) {
      toast.error("Please input a tag");
    } else {
      loader("show");
      const hadData = await postData(ENDPOINT.ADD_TAGS, {
        product: newTag,
        type: 2,
      });
      loader("hide");
      let temp_tags = tagClickedFirst.map((data) => {
        return data.toLowerCase();
      });
      let alltemp_tags = [];
      Object.entries(allTags).map((data) => {
        return alltemp_tags.push(...data);
      });
      alltemp_tags = alltemp_tags.map((data) => {
        return data.toLowerCase();
      });

      if (
        !temp_tags.includes(newTag.toLowerCase()) &&
        !alltemp_tags.includes(newTag.toLowerCase())
      ) {
        setTagClickedFirst((oldArray) => [...oldArray, newTag]);

        // const body = {
        //   user_id: localStorage.getItem("user_id"),
        //   tags: newTag,
        // };

      } else {
        toast.error("Tag already in list.");
      }
      setNewTag("");
      setTagsCounter(tagsCounter + 1);
    }
  };

  const saveButtonClicked = async () => {
    loader("show");

    if (typeof finalTags != "undefined" && finalTags.length > 0) {
      let prev_tags = finalTags;
      let new_tags = prev_tags.concat(tagClickedFirst);
      const uniqueTags = new_tags.filter((x, i, a) => a.indexOf(x) == i);
      setFinalTags(uniqueTags);
    } else {
      setFinalTags(tagClickedFirst);
    }
    setupdateFlag(updateflag + 1);
    closeModal();
    loader("hide");
  };

  const publisherFun = () => {
    return (
      <div className="create-change-content">
        <div className="form_action">
          <h4>Who is involved</h4>
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="">Company</label>
                <input
                  type="text"
                  className="form-control"
                  name="company"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Country</label>
                <Select
                  options={userDetail?.country || []}
                  placeholder="Select country"
                  onChange={(e) => handleChange(e?.value, "country")}
                  className="dropdown-basic-button split-button-dropup"
                  isClearable
                />
              </div>
              <div className="form-group margin-added">
                <label htmlFor="">Client product</label>
                <Select
                  options={userDetail?.product}
                  value={userInputs?.product}
                  onChange={(e) => handleChange(e, "product")}
                  placeholder="Select product"
                  className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                  isClearable
                />
                <div className="add_product">
                  <span>&nbsp;</span>
                  <Button
                    onClick={addNewProductClicked}
                    className="btn-bordered btn-voilet"
                  >
                    Add New Product +
                  </Button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="">Production</label>
                <Select
                  options={userDetail?.production}
                  onChange={(e) => handleChange(e?.id, "production")}
                  placeholder="Select own production person"
                  className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                  isClearable
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Sales</label>
                <Select
                  options={userDetail?.sales}
                  placeholder="Who made the sale?"
                  onChange={(e) => handleChange(e?.id, "sales")}
                  className="dropdown-basic-button split-button-dropup edit-sales-dropdown"
                  isClearable
                />
              </div>
            </div>
            <div className="col-12 col-md-6 d-flex justify-content-end align-items-end right-change">
              <div className="form-group justify-content-end">
                <label htmlFor="">Reseller</label>
                <div className="form-check-group">
                  <div className="form-check-group-inset">
                    {userDetail?.reseller?.length ? (
                      userDetail?.reseller?.map((item, index) => {
                        return (
                          <div className="form-check" key={index}>
                            <input
                              className="form-check-input"
                              value=""
                              id={"flexCheckDefault_"+index}
                              type="checkbox"
                              defaultValue={reseller.includes(item?.id)}
                              onClick={(e) => handleReseller(e, item)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={"flexCheckDefault_"+index}
                            >
                              {item?.value}
                            </label>
                          </div>
                        );
                      })
                    ) : (
                      <>
                        <div className="form-check">
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckReseller"
                          >
                            N/A
                          </label>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const docintelLink = () => {
    return (
      <div className="create-change-content">
        <div className="form_action">
          <h4>About the Docintel link you're making</h4>
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="">Category</label>
                <Select
                  options={userDetail?.category}
                  placeholder="Select category type for HCPs to sort"
                  onChange={(e) => handleChange(e?.value, "category")}
                  className="dropdown-basic-button split-button-dropup"
                  isClearable
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Format</label>
                <Select
                  options={userDetail?.format}
                  placeholder="Select format for tracking"
                  onChange={(e) => handleChange(e?.value, "format")}
                  className="dropdown-basic-button split-button-dropup"
                  isClearable
                />
              </div>
              {userDetail?.user?.[0]?.flag == 0 &&
              userDetail?.user?.[0]?.group_id == 3 ? (
                <div className="form-group">
                  <label htmlFor="">Product</label>
                  <Select
                    options={userDetail?.product}
                    placeholder="Select the product this is for"
                    onChange={(e) => handleChange(e?.value, "product")}
                    className="dropdown-basic-button split-button-dropup"
                    isClearable
                  />
                </div>
              ) : (
                <div className="form-group">
                  <label htmlFor="">Trial</label>
                  <Select
                    options={userDetail?.trial}
                    placeholder="Select the product this is for"
                    onChange={(e) => handleChange(e?.value, "trial")}
                    className="dropdown-basic-button split-button-dropup"
                    isClearable
                  />
                </div>
              )}

              {userDetail?.user?.[0]?.pharmaData == 1 &&
              userDetail?.user?.[0]?.group_id == 3 ? (
                <div className="form-group">
                  <label htmlFor="">Business Unit</label>
                  <Select
                    options={userDetail?.ibu}
                    placeholder="Select Business Unit"
                    onChange={(e) => handleChange(e?.value, "ibu")}
                    className="dropdown-basic-button split-button-dropup"
                    isClearable
                  />
                </div>
              ) : userDetail?.user?.[0]?.flag == 1 &&
                userDetail?.user?.[0]?.group_id == 3 ? (
                <div className="form-group">
                  <label htmlFor="">Blind type</label>
                  <Select
                    options={blindType}
                    placeholder="Select Business Unit"
                    onChange={(e) => handleChange(e?.value, "blindType")}
                    className="dropdown-basic-button split-button-dropup"
                    isClearable
                  />
                </div>
              ) : null}

              {userDetail?.user?.[0]?.flag == 0 &&
              userDetail?.user?.[0]?.group_id == 3 ? (
                <div className="form-group">
                  <label htmlFor="">Content Use</label>
                  <fieldset id="group2">
                    <input
                      type="checkbox"
                      value="value1"
                      name="group2"
                      onClick={(e) =>
                        handleChange(e.target?.checked, "allowOneSource")
                      }
                      id="limitagreed1"
                    />
                    <label htmlFor="limitagreed1">One Source</label>
                    <input
                      type="checkbox"
                      value="value2"
                      name="group2"
                      onClick={(e) =>
                        handleChange(e.target?.checked, "allowLibrary")
                      }
                      id="limitagreed2"
                    />
                    <label htmlFor="limitagreed2">Library</label>
                  </fieldset>
                </div>
              ) : null}

              {userDetail?.user?.[0]?.flag == 1 &&
              userDetail?.user?.[0]?.group_id == 3 ? (
                <>
                  <div className="form-group">
                    <label htmlFor="">Completion date</label>
                    <DatePicker
                      selected={userInputs?.comDatetime}
                      name="comDatetime"
                      onChange={(e) => handleChange(e, "comDatetime")}
                      dateFormat="dd/MM/yyyy"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">CPD value</label>
                    <input
                      type="number"
                      name="cpdValue"
                      className="form-control"
                      placeholder="“0” value means unlimited limit"
                      onChange={handleChange}
                    />
                  </div>
                </>
              ) : null}
            </div>
            <div className="col-12 col-md-6 d-flex justify-content-end align-items-start right-change">
              <div className="form-group justify-content-end">
                <label htmlFor="">Topics</label>
                <div className="input-group w-100">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-filled btn-primary"
                      type="button"
                      id="tags-add"
                      data-bs-toggle="modal"
                      data-bs-target="#tagsModal"
                      onClick={(e) =>
                        topicButtonClicked(userDetail?.user[0]?.group_id)
                      }
                    >
                      Add Topic +
                    </button>
                  </div>
                  <div className="tags_added">
                    <div className="select-tags"></div>
                    <ul>
                      {tagClickedFirst?.map((item, index) => {
                        return (
                          <li className="list1">
                            {item}
                            <img
                              src="componentAssets/images/filter-close.svg"
                              alt="Close-filter"
                              onClick={() => removeTagFinal(index)}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {userDetail?.user?.[0]?.flag == 1 &&
            userDetail?.user?.[0]?.group_id == 3 ? (
              <div className="col-12 col-md-6 d-flex justify-content-end align-items-start right-change">
                <div className="form-group justify-content-end">
                  <label htmlFor="">HCP Type</label>
                  <div className="input-group w-100">
                    <div className="input-group-prepend">
                      <button
                        className="btn btn-filled btn-primary"
                        type="button"
                        id="tags-add"
                        data-bs-toggle="modal"
                        data-bs-target="#tagsModal"
                        onClick={(e) =>
                          topicButtonClicked(userDetail?.user[0]?.group_id)
                        }
                      >
                        Add HCP +
                      </button>
                    </div>
                    <div className="tags_added">
                      <div className="select-tags">
                        {/* {data?.tags?.length
                        ? JSON.parse(data.tags)?.map((data) => {
                            return <div>{data}</div>;
                          })
                        : ""} */}
                      </div>
                      <ul>
                        <li className="list1">
                          Excessive bleedings{" "}
                          <img
                            src="componentAssets/images/filter-close.svg"
                            alt="Close-filter"
                          />
                        </li>
                        <li className="list1">
                          New tag 3{" "}
                          <img
                            src="componentAssets/images/filter-close.svg"
                            alt="Close-filter"
                          />
                        </li>
                        <li className="list1">
                          New tag 6{" "}
                          <img
                            src="componentAssets/images/filter-close.svg"
                            alt="Close-filter"
                          />
                        </li>
                        <li className="list1">
                          global{" "}
                          <img
                            src="componentAssets/images/filter-close.svg"
                            alt="Close-filter"
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  };

  const handleModelFun = (e) => {
    setUserDetail({ ...userDetail, newValue: e.target.value });
  };
  const handleSubmitModelFun = async (e) => {
    try {
      let newAr = userDetail?.product;

      newAr.push({ value: userDetail?.newValu, label: userDetail?.newValue });
      let body = {
        user_id: localStorage.getItem("user_id"),
        product: userDetail?.newValue,
        category: 0,
        type: 1,
      };
      const res = await postData(ENDPOINT.ADD_SPC_PRODUCT, body);
      setCreateLibraryInputs({
        ...userInputs,
        product: { value: userDetail?.newValue, label: userDetail?.newValue },
      });
      setUserDetail({ ...userDetail, product: newAr });
    } catch (err) {
      console.log("err", err);
    }
  };

  const LimitAgreed = () => {
    return (
      <div className="create-change-content">
        <div className="form_action">
          <h4>Limits agreed</h4>
          <div className="row">
            <div className="col-12 col-md-6">
              {userDetail?.costCenter ? (
                <div className="form-group">
                  <label htmlFor="">Cost centre</label>
                  <Select
                    options={userDetail?.costCenter}
                    className="dropdown-basic-button split-button-dropup"
                    isClearable
                    placeholder="Select cost center"
                    onChange={(e) => handleChange(e?.value, "costCenter")}
                  />
                </div>
              ) : null}
              <div className="form-group">
                <label htmlFor="">Expiration date</label>
                <DatePicker
                  selected={
                    userInputs?.expDatetime
                      ? new Date(userInputs?.expDatetime)
                      : new Date(
                          moment(new Date(), "MM/DD/YYYY")
                            .add("years", 1)
                            .format("MM/DD/YYYY")
                        )
                  }
                  name="expDatetime"
                  onChange={(e) => handleChange(e, "expDatetime")}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  minDate={currentDate}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Set limit of usage *</label>
                <input
                  type="number"
                  name="limit"
                  min="0"
                  className="form-control"
                  placeholder="“0” value means unlimited limit"
                  onChange={handleChange}
                />
                {error?.limit ? (
                  <div className="login-validation">{error?.limit}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="">Enable</label>
                <fieldset id="group2">
                  <input
                    type="checkbox"
                    value="value1"
                    name="group2"
                    onClick={(e) =>
                      handleChange(e.target?.checked, "allowPrint")
                    }
                    id="limitagreed1"
                  />
                  <label htmlFor="limitagreed1">Print</label>
                  <input
                    type="checkbox"
                    value="value2"
                    name="group2"
                    onClick={(e) =>
                      handleChange(e.target?.checked, "allowDownload")
                    }
                    id="limitagreed2"
                  />
                  <label htmlFor="limitagreed2">Download</label>
                  {
                    /*
                    <input
                      type="checkbox"
                      value="value3"
                      onClick={(e) =>
                        handleChange(e.target?.checked, "allowShare")
                      }
                      name="group2"
                      id="limitagreed3"
                    />
                    <label htmlFor="limitagreed3">Share</label>
                    */
                  }

                </fieldset>
              </div>
            </div>
            <div className="col-12 col-md-6 d-flex justify-content-end align-items-start right-change">
              <div className="form-group justify-content-end">
                <label htmlFor="">Invoice notes</label>
                <textarea
                  className="form-control"
                  id="formControlTextarea"
                  onChange={(e) =>
                    handleChange(e?.target.value, "specialRequirment")
                  }
                  rows="5"
                  placeholder="Please type your notes here.."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <Row>
            <div className="page-top-nav sticky">
              <div className="row justify-content-end align-items-center">
                <div className="col-12 col-md-1">
                  <div className="header-btn-left">
                    {/* <Link
                      className="btn btn-primary btn-bordered back"
                      to="/license-create"
                    >
                      Back
                    </Link>
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
                    </Link>*/}
                  </div>
                </div>
                <div className="col-12 col-md-9">
                  <ul className="tabnav-link">
                    <li className="active active-main">
                      <a href="">Create Your Content</a>
                    </li>
                    <li className="">
                      <a href="">Edit Consent Option</a>
                    </li>
                    <li className="">
                      <a href="">Approve Your Content &amp; Publish</a>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-md-2">
                  <div className="header-btn">
                    <Link
                      className="btn btn-primary btn-bordered move-draft"
                      to="/license-create"
                    >
                      Cancel
                    </Link>

                    <button
                      className="btn btn-primary btn-filled next"
                      onClick={nextButtonClicked}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {userDetail?.user?.[0]?.group_id == 2
              ? publisherFun()
              : userDetail?.user?.[0]?.flag == 0 &&
                userDetail?.user?.[0]?.group_id == 3
              ? docintelLink()
              : userDetail?.user?.[0]?.flag == 1 &&
                userDetail?.user?.[0]?.group_id == 3
              ? docintelLink()
              : null}
            {userDetail?.user?.[0]?.group_id == 2 ? LimitAgreed() : null}

            <div className="create-change-content">
              <div className="form_action">
                {userDetail?.user?.[0]?.group_id == 2 ? (
                  <h4>Creating the eprint</h4>
                ) : userDetail?.user?.[0]?.flag == 0 &&
                  userDetail?.user?.[0]?.group_id == 3 ? (
                  <h4>Creating the Docintel Link</h4>
                ) : userDetail?.user?.[0]?.flag == 1 &&
                  userDetail?.user?.[0]?.group_id == 3 ? (
                  <h4>Creating the Docintel Link</h4>
                ) : null}

                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="form-group val">
                      <label htmlFor="">Content title *</label>
                      <input
                        type="text"
                        name="contentTitle"
                        className="form-control"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                      {error?.contentTitle ? (
                        <div className="login-validation">
                          {error?.contentTitle}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      {userDetail?.user?.[0]?.flag == 0 &&
                      userDetail?.user?.[0]?.group_id == 3 ? (
                        <label htmlFor="">Sub title</label>
                      ) : (
                        <label htmlFor="">Journal title</label>
                      )}

                      <input
                        type="text"
                        name="journalTitle"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                      />
                      {error?.journalTitle ? (
                        <div className="login-validation">
                          {error?.journalTitle}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Author</label>
                      <input
                        type="text"
                        name="keyAuthor"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                    {(userDetail?.user?.[0]?.flag == 0 &&
                      userDetail?.user?.[0]?.group_id == 3) ||
                    (userDetail?.user?.[0]?.flag == 1 &&
                      userDetail?.user?.[0]?.group_id == 3) ? (
                      <>
                        <div className="form-group">
                          <label htmlFor="">Enable</label>
                          <fieldset id="group2">
                            <input
                              type="checkbox"
                              value="value1"
                              name="group2"
                              onClick={(e) =>
                                handleChange(e.target?.checked, "allowPrint")
                              }
                              id="limitagreed1"
                            />
                            <label htmlFor="limitagreed1">Print</label>
                            <input
                              type="checkbox"
                              value="value2"
                              name="group2"
                              onClick={(e) =>
                                handleChange(e.target?.checked, "allowDownload")
                              }
                              id="limitagreed2"
                            />
                            <label htmlFor="limitagreed2">Download</label>
                            <input
                              type="checkbox"
                              value="value3"
                              onClick={(e) =>
                                handleChange(e.target?.checked, "allowShare")
                              }
                              name="group2"
                              id="limitagreed3"
                            />
                            <label htmlFor="limitagreed3">Share</label>
                            <input
                              type="checkbox"
                              value="value4"
                              name="group2"
                              onClick={(e) =>
                                handleChange(e.target?.checked, "allowRequest")
                              }
                              id="limitagreed4"
                            />
                            <label htmlFor="limitagreed4">Request</label>
                          </fieldset>
                        </div>
                        <div className="form-group">
                          <label htmlFor="setasdraft1">Set as draft</label>
                          <fieldset id="group2">
                            <div className="switch">
                              <label className="switch-light">
                                <input
                                  type="checkbox"
                                  value="value1"
                                  name="group2"
                                  id="setasdraft1"
                                  onChange={(e) => {
                                    handleChange(!e.target?.checked, "draft");
                                  }}
                                />
                                <span>
                                  <span className="switch-btn active">No</span>
                                  <span className="switch-btn ">Yes</span>
                                </span>
                                <a className="btn"></a>
                              </label>
                            </div>
                          </fieldset>
                        </div>
                      </>
                    ) : null}

                    <div className="form-group val">
                      <label htmlFor="">Docintel format *</label>
                      <Select
                        className="dropdown-basic-button split-button-dropup"
                        options={ePrintType}
                        isClearable
                        placeholder="Select type of Docintel format "
                        onChange={(event) =>
                          handleChange(event?.value, "docintelFormat")
                        }
                      />
                      {error?.docintelFormat ? (
                        <div className="login-validation">
                          {error?.docintelFormat}
                        </div>
                      ) : null}
                    </div>

                    {userInputs.docintelFormat == "pdf" ? (
                      <div className="form-group val">
                        <label htmlFor="">Upload PDF</label>
                        <div className="upload-file-box">
                          <div className="box">
                            <input
                              type="file"
                              name="file-6[]"
                              id="file-6"
                              className="inputfile inputfile-6"
                              accept="application/pdf"
                              onChange={(e) => handleChange(e, "uploadFile")}
                            />
                            <label htmlFor="file-6">
                              <span>Choose Your File</span>
                            </label>
                            {userInputs?.uploadFile?.[0]?.name ? (
                              <p>{userInputs?.uploadFile?.[0].name}</p>
                            ) : (
                              <p>Upload your PDF</p>
                            )}
                          </div>
                        </div>
                        {error?.uploadFile ? (
                          <div className="login-validation-upload">
                            {error?.uploadFile}
                          </div>
                        ) : null}
                      </div>
                    ) : userInputs?.docintelFormat == "video" ? (
                      <div className="form-group val">
                        <label htmlFor="">Upload video</label>
                        <div className="upload-file-box">
                          <div className="box">
                            <input
                              type="file"
                              name="file-6[]"
                              id="file-6"
                              className="inputfile inputfile-6"
                              accept="video/mp4"
                              onChange={(e) => handleChange(e, "uploadFile")}
                            />
                            <label htmlFor="file-6">
                              <span>Choose Your File</span>
                            </label>
                            {userInputs?.uploadFile?.[0]?.name ? (
                              <p>{userInputs?.uploadFile?.[0]?.name}</p>
                            ) : (
                              <p>Upload your Video file</p>
                            )}
                          </div>
                        </div>
                        {error?.uploadVideo ? (
                          <div className="login-validation-upload">
                            {error?.uploadVideo}
                          </div>
                        ) : null}
                      </div>
                    ) : // ePrint == "eBook" ? (
                    userInputs.docintelFormat == "ebook" ? (
                      chapter.map((val, i) => {
                        return (
                          <>
                            <div className="form-group val chapter-title">
                              <div className="ebook-format">
                                <label htmlFor="">Chapter {i + 1} title</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) => onChapterTitleChange(e, i)}
                                  value={val.chapterTitle}
                                />
                                <div className="upload-file-box">
                                  <div className="box">
                                    <input
                                      type="file"
                                      name={`file-${i}`}
                                      id={`file-${i}`}
                                      className="inputfile inputfile-6"
                                      accept="application/pdf"
                                      onChange={(e) =>
                                        handleOnEbookChange(e, i)
                                      }
                                    />
                                    <label htmlFor={`file-${i}`}>
                                      <span>Choose Your File</span>
                                    </label>

                                    <p>
                                      {val.uploadFile == ""
                                        ? "Upload your PDF file"
                                        : val.uploadFile}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="chapter-btn-wrapper">
                                {
                                  chapter.length -1 == i ?
                                    <Button
                                      className="btn btn-primary btn-bordered btn-voilet move-draft chappter-add-btn"
                                      onClick={addMoreChClicked}
                                    >
                                      Add Ch +
                                    </Button>
                                    : null
                              }

                                {chapter.length > 1 ? (
                                  <Button
                                    className="dlt_btn"
                                    onClick={() => deleteRecord(i, val?.id)}
                                  >
                                    <img
                                      src={path_image + "delete.svg"}
                                      alt="Delete Row"
                                    />
                                  </Button>
                                ) : null}
                              </div>
                              {error?.chapter?.[i] ? (
                                <div className="login-validation-upload">
                                  {error?.chapter?.[i]}
                                </div>
                              ) : null}
                            </div>
                          </>
                        );
                      })
                    ) : // <div className="form-group val">
                    //   <label htmlFor="">Upload Ebook</label>
                    //   <div className="upload-file-box">
                    //     <div className="box">
                    //       <input
                    //         type="file"
                    //         name="file-6[]"
                    //         id="file-6"
                    //         className="inputfile inputfile-6"
                    //         accept="application/pdf"
                    //         onChange={(e) => handleEbookChange(e)}
                    //       />
                    //       <label htmlFor="file-6">
                    //         <span>Choose Your File</span>
                    //       </label>
                    //       <p>
                    //         {selectedEbookName == ""
                    //           ? "Upload your Ebook file"
                    //           : selectedEbookName}{" "}
                    //       </p>
                    //     </div>
                    //   </div>
                    //   {error?.pdfFile ? (
                    //     <div className="login-validation-upload">
                    //       {error?.pdfFile}
                    //     </div>
                    //   ) : null}
                    // </div>
                    null}

                    {(userDetail?.user?.[0]?.flag == 0 &&
                      userDetail?.user?.[0]?.group_id == 3) ||
                    (userDetail?.user?.[0]?.flag == 1 &&
                      userDetail?.user?.[0]?.group_id == 3) ? (
                      <div className="form-group">
                        <label htmlFor="">Include video</label>
                        <div className="switch">
                          <label className="switch-light">
                            <input
                              type="checkbox"
                              // onChange={(e) => includeVideoCheckboxChanged(e)}
                              onChange={(e) => {
                                handleChange(e.target?.checked, "allowVideo");
                              }}
                            />
                            <span>
                              <span className="switch-btn active">No</span>
                              <span className="switch-btn">Yes</span>
                            </span>
                            <a className="btn"></a>
                          </label>
                        </div>
                      </div>
                    ) : null}
                    <div className="form-group val">
                      <label htmlFor="">Content cover</label>
                      <div className="upload-file-box">
                        <div className="box">
                          <input
                            type="file"
                            name="file-5[]"
                            id="file-5"
                            className="inputfile inputfile-5"
                            accept="image/png, image/jpeg"
                            onChange={(e) => handleChange(e, "coverPhoto")}
                          />
                          <label htmlFor="file-5">
                            <span>Choose Your File</span>
                          </label>
                          {userInputs?.coverPhoto?.[0]?.name ? (
                            <p>{userInputs?.coverPhoto?.[0]?.name}</p>
                          ) : (
                            <p>
                              Upload your cover image <br />
                              <span>(Recommended size 88 X 124)</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 d-flex justify-content-end align-items-start right-change">
                    <div className="form-group justify-content-end">
                      <label htmlFor="">
                        Production notes to Docintel team
                      </label>
                      <textarea
                        className="form-control"
                        id="formControlTextarea"
                        rows="5"
                        onChange={(e) =>
                          handleChange(e?.target.value, "productionNotes")
                        }
                        placeholder="Please type your notes here.."
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </Col>
      <Modal className="pdf-video-link" show={show} onHide={handleClose}>
        <Modal.Header>
          <div className="form_action embedding-video">
            <div className="side-step-text first-step">
              <div className="embedded-video-step">
                <h2>Step1</h2>
              </div>
              <p>Select the chapter </p>
              <Form.Group className="formgroup">
                <Form.Label>Chapters</Form.Label>
                {/* <ReactSelect
                  placeholder="Select your chapter"
                  options={types}
                  className="dropdown-basic-button split-button-dropup"
                  isClearable
                /> */}
                <DropdownButton
                  className="dropdown-basic-button split-button-dropup "
                  title={
                    chapterSelect != "" ? chapterSelect : "Select your chapter"
                  }
                  onSelect={(event) => onChapterSelect(event)}
                >
                  <div className="scroll_div">
                    <Dropdown.Item
                      eventKey="Chapter 1"
                      className={chapterSelect == "Chapter 1" ? "active" : ""}
                    >
                      Chapter 1
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="Chapter 2"
                      className={chapterSelect == "Chapter 2" ? "active" : ""}
                    >
                      Chapter 2
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="Chapter 3"
                      className={chapterSelect == "Chapter 3" ? "active" : ""}
                    >
                      Chapter 3
                    </Dropdown.Item>
                  </div>
                </DropdownButton>
              </Form.Group>
            </div>
            <div className="side-step-text second-step">
              <div className="embedded-video-step">
                <h2>Step2</h2>
              </div>
              <p>
                Select the video and highlight the area you want to embed the
                video in{" "}
              </p>
              <Form.Group className="formgroup">
                <Form.Label>Videos *</Form.Label>
                <DropdownButton
                  className="dropdown-basic-button split-button-dropup "
                  title={videoSelect != "" ? videoSelect : "Select your video"}
                  onSelect={(event) => onVideoSelect(event)}
                >
                  <div className="scroll_div">
                    <Dropdown.Item
                      eventKey="Video 1"
                      className={videoSelect == "Video 1" ? "active" : ""}
                    >
                      Video 1
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="Video 2"
                      className={videoSelect == "Video 2" ? "active" : ""}
                    >
                      Video 2
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="Video 3"
                      className={videoSelect == "Video 3" ? "active" : ""}
                    >
                      Video 3
                    </Dropdown.Item>
                  </div>
                </DropdownButton>

                <div className="upload-file-box">
                  <Button
                    className="btn-filled"
                    onClick={onUploadNewVideoClicked}
                  >
                    Upload new Video +
                  </Button>
                </div>
              </Form.Group>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body-content">
            <img src={path_image + "pdf-dummy.png"} alt="Close-filter" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-bordered"
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            className="btn-filled"
            variant="primary"
            // onClick={handleClose}
            onClick={() => navigate("/edit-Consent-Options")}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={uploadNewVideo} className="send-confirm" id="download-qr">
        <Modal.Header>
          <h5 className="modal-title" id="staticBackdropLabel">
            Change Embedded Video
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={() => {
              setUploadNewVideo(false);
            }}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="">Video</label>
            <DropdownButton
              className="dropdown-basic-button split-button-dropup "
              title={
                changeEmbeddedVideo != ""
                  ? changeEmbeddedVideo
                  : "Select your video"
              }
              onSelect={(event) => onChangeEmbeddedVideo(event)}
            >
              <div className="scroll_div">
                <Dropdown.Item
                  eventKey="Change Video 1"
                  className={
                    changeEmbeddedVideo == "Change Video 1" ? "active" : ""
                  }
                >
                  Change Video 1
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Change Video 2"
                  className={
                    changeEmbeddedVideo == "Change Video 2" ? "active" : ""
                  }
                >
                  Change Video 2
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Change Video 3"
                  className={
                    changeEmbeddedVideo == "Change Video 3" ? "active" : ""
                  }
                >
                  Change Video 3
                </Dropdown.Item>
              </div>
            </DropdownButton>
          </div>
        </Modal.Body>

        <div className="modal-footer">
          <button
            type="button"
            disabled={changeEmbeddedVideo == "" ? true : false}
            className="btn btn-primary save btn-filled"
            onClick={() => setUploadNewVideo(false)}
          >
            Apply
          </button>
        </div>
      </Modal>
      <CommonModel
        show={commanShow}
        onClose={setCommanShow}
        heading={"Add New Product"}
        data={product}
        footerButton={"Add"}
        handleChange={handleModelFun}
        handleSubmit={handleSubmitModelFun}
        // inputValue
      />
      <Modal id="tagsModal" show={isOpen}>
        <Modal.Header>
          <h5 className="modal-title" id="staticBackdropLabel">
            Add Topic
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={closeModal}
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </Modal.Header>
        <Modal.Body>
          <div className="select-tags">
            <h6>Select Topic :</h6>
            <div className="tag-lists">
              <div className="tag-lists-view">
                {Object.values(allTags).map((data) => {
                  return (
                    <>
                      <div onClick={(event) => tagClicked(data)}>{data} </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="selected-tags">
            <h6>
              Selected Topic <span>| {tagClickedFirst.length}</span>
            </h6>

            <div className="total-selected">
              {tagClickedFirst.map((data, index) => {
                return (
                  <>
                    <div className="tag-cross">
                      {data.innerHTML || data}
                      <img
                        src={path_image + "filter-close.svg"}
                        alt="Close-filter"
                        onClick={() => removeTagFinal(index)}
                      />
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <form>
            <div className="form-group">
              <label htmlFor="new-tag">New Tag</label>
              <input
                type="text"
                className="form-control"
                id="new-tag"
                value={newTag}
                onChange={(e) => newTagChanged(e)}
              />

              <button
                onClick={addTag}
                type="button"
                className="btn btn-primary add btn-bordered"
              >
                Add
              </button>
            </div>
          </form>
          <button
            type="button"
            className="btn btn-primary save btn-filled"
            onClick={saveButtonClicked}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default LicenseCreateUser;
