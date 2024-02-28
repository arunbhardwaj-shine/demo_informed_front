import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { createContent } from "../../CommonComponent/Validations";
import {
  Button,
  Form,
  Dropdown,
  DropdownButton,
  Col,
  Row,
} from "react-bootstrap";
import { postFormData, postData } from "../../../axios/apiHelper";
import { loader } from "../../../loader";
import { ENDPOINT } from "../../../axios/apiConfig";
import CommonModel from "../../../Model/CommonModel";
import moment from "moment";

let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const LibraryCreateUser = () => {
  const newdate = new Date();
  const titleFieldRef = useRef(null);
  const limitFieldRef = useRef(null);
  const [counterFlag, setCounterFlag] = useState(0);
  const [spcType, setSpcType] = useState(0);
  const [reseller, setReseller] = useState([]);
  const [show, setShow] = useState(false);
  const [commanShow, setCommanShow] = useState(false);
  const [hcpClickedFirst, setHcpClickedFirst] = useState([]);
  const [hcpIrtClickedFirst, setHcpIrtClickedFirst] = useState([]);

  const [id, setId] = useState(localStorage.getItem("user_id"));
  const handleClose = () => setShow(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [userInputs, setCreateLibraryInputs] = useState({
    expDatetime: new Date(
      moment(new Date(), "MM/DD/YYYY").add("years", 1).format("MM/DD/YYYY")
    ),
    // limit: "",
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
    language: "",
    newLanguageCode: "",
    format: "",
    ibu: "",
    allowOneSource: "",
    allowRequest: "",
    allowDraft: false,
    allowVideo: false,
    comDatetime: "",
    cpdValue: "",
    sold_unsold_status: "sold",
    request_quote: false,
    pharmaArr: '',
  });

  const [language, setLanguage] = useState([
    { value: "English", label: "English" },
    { value: "Russian", label: "Russian" },
  ]);
  const [blindType, setBlindType] = useState([
    { value: "blinded", label: "blind" },
    { value: "unblinded", label: "unblind" },
  ]);
  const [mandatoryRole, setMandatoryRole] = useState([
    "Site User-Blinded",
    "Investigator-Blinded",
    "Site unblinded pharmacist",
  ]);
  const [ebookFile, setEbookFile] = useState([]);
  const [chapter, setChapter] = useState([
    {
      chapterTitle: "",
      uploadFile: "",
      fileValue: "",
    },
  ]);
  const [pdfSpcData, setpdfSpcData] = useState([
    {
      chapterTitle: "",
      uploadFile: "",
      fileValue: "",
    },
  ]);
  const [userDetail, setUserDetail] = useState({
    user: {},
    production: [],
    pharmaArr: [],
    sales: [],
    country: [],
    format: [],
    product: [],
    hcp: [
      "Principal Investigator",
      "Sub-Investigator",
      "Study Coordinator",
      "Study Nurse",
      "Other",
    ],
  });

  const product = [
    {
      label: "Product name",
      type: "input",
      placeholder: "Type your product name",
    },
  ];

  const [ePrintType, setePrintType] = useState([]);

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
    try {
      const hadData = await postData(ENDPOINT.LIBRARYDETAIL, {
        user_id: id,
      });
      let country = [];
      if (hadData?.data?.data?.country?.length) {
        if (typeof hadData?.data?.data?.country == "string") {
          JSON.parse(hadData?.data?.data?.country)?.reduce(
            (objEntries, key) => {
              country.push({
                label: key,
                value: key,
              });
            }
          );
        } else {
          hadData?.data?.data?.country?.reduce((objEntries, key) => {
            country.push({
              label: key,
              value: key,
            });
          });
        }
      }

      setSpcType(hadData?.data?.data?.spcInc);

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
        hadData?.data?.data?.tags?.forEach((item) => {
          tags.push(item?.value);
        });
      }

      setePrintType(hadData?.data?.data?.fileType);
      setAllTags(tags);
      setUserDetail({
        ...userDetail,
        user: hadData?.data?.data?.user,
        production: hadData?.data?.data?.production,
        pharmaArr: hadData?.data?.data?.pharma_arr,
        country: country,
        costCenter: hadData?.data?.data?.costCenter,
        sales: hadData?.data?.data?.sale,
        format: hadData?.data?.data?.format,
        category: category,
        ibu: hadData?.data?.data?.ibu,
        product: hadData?.data?.data?.product,
        reseller: hadData?.data?.data?.reseller,
        trial: [{ label: "LEXx210", value: "3972" }],
      });

      loader("hide");
    } catch (err) {
      loader("hide");
    }
  };

  useEffect(() => {
    initalFun();
  }, []);
  const handleChange = (e, isSelectedName) => {
    if (e?.target?.files?.length < 1) {
      return;
    }
    if (isSelectedName == "docintelFormat") {
      if (e == "ebook") {
        setEbookFile([]);
        setpdfSpcData([
          {
            chapterTitle: "",
            uploadFile: "",
            fileValue: "",
          },
        ]);
      } else if (e == "pdfSpc") {
        setEbookFile([]);
        setChapter([
          {
            chapterTitle: "",
            uploadFile: "",
            fileValue: "",
          },
        ]);
      }

      setCreateLibraryInputs({
        ...userInputs,
        uploadFile: "",
        [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
          ? e?.target?.files
            ? e?.target?.files
            : e
          : e?.target?.value,
        allowVideo: false,
      });
    } else {
      setCreateLibraryInputs({
        ...userInputs,
        [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
          ? e?.target?.files
            ? e?.target?.files
            : e
          : e?.target?.value,
      });
    }
  };

  const nextButtonClicked = async (e) => {
    if (userInputs.docintelFormat == "ebook") {
      userInputs.chapter = chapter;
    } else if (userInputs?.docintelFormat == "pdfSpc") {
      userInputs.pdfChapter = pdfSpcData;
    }
    if (
      userDetail?.user?.[0]?.flag == 1 &&
      userDetail?.user?.[0]?.group_id == 3
    ) {
      if (!userInputs?.trial) {
        userInputs.trial = "";
      }
      if (!userInputs?.blindType) {
        userInputs.blindType = "";
      }
    }
    const err = createContent(
      userInputs,
      ebookFile,
      userDetail?.user?.[0]?.group_id,
      userDetail?.user?.[0]?.retailer,
    );

    if (Object.keys(err)?.length) {
      // if (Object.keys(err)[0] == "limit") {
      //   limitFieldRef.current.focus();
      // }
      if (Object.keys(err)[0] == "contentTitle") {
        titleFieldRef.current.focus();
      }

      toast.error(err[Object.keys(err)[0]]);
      setError(err);
      return;
    } else {
      loader("show");
      try {
        let formData = new FormData();

        formData.append("productionNotes", userInputs?.productionNotes);
        formData.append(
          "production",
          userInputs?.production ? userInputs?.production : 0
        );

        formData.append("sales", userInputs?.sales ? userInputs?.sales : 0);
        formData.append(
          "costCenter",
          userInputs?.costCenter ? userInputs?.costCenter : ""
        );

        formData.append("limit", userInputs?.limit);
        formData.append("file", userInputs?.uploadFile?.[0]);
        formData.append("title", userInputs?.contentTitle);

        if (localStorage.getItem("user_id") == "B7SHpAc XDXSH NXkN0rdQ==") {
          formData.append("language", userInputs?.language);
          formData.append("new_language_code", userInputs?.newLanguageCode);
        }

        if (
          userDetail?.user?.[0]?.group_id == 3 &&
          userDetail?.user?.[0]?.flag == 1
        ) {
          formData.append("blindType", userInputs?.blindType);
          formData.append("trial", userInputs?.trial);
          formData.append(
            "mandatory",
            userInputs?.mandatory
              ? JSON.stringify(userInputs?.mandatory)
              : JSON.stringify(false)
          );

          userInputs?.mandatory
            ? formData.append(
                "trail_user_type",
                hcpIrtClickedFirst?.length
                  ? JSON.stringify(hcpIrtClickedFirst)
                  : ""
              )
            : formData.append(
                "trail_user_type",
                hcpClickedFirst?.length ? JSON.stringify(hcpClickedFirst) : ""
              );
        }

        if (userDetail?.user?.[0]?.group_id == 3 &&
          userDetail?.user?.[0]?.octaLach == 1
        ) {
          formData.append(
            "medical",
            userInputs?.medical
              ? JSON.stringify(userInputs?.medical)
              : JSON.stringify(false)
          );

          formData.append(
            "sync_onesource",
            userInputs?.sync_onesource
              ? JSON.stringify(userInputs?.sync_onesource)
              : JSON.stringify(false)
          );
        }

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
        formData.append(
          "fileType",
          userInputs?.docintelFormat == "pdfSpc"
            ? "ebook"
            : userInputs?.docintelFormat
        );
        if (userInputs?.docintelFormat == "pdfSpc") {
          formData.append("spcInc", spcType);
        }
        formData.append("coverPhoto", userInputs?.coverPhoto?.[0]);
        formData.append(
          "chapter",
          userInputs?.docintelFormat == "pdfSpc"
            ? JSON.stringify(pdfSpcData)
            : JSON.stringify(chapter)
        );
        formData.append("specialRequirment", userInputs?.specialRequirment);
        formData.append("createdBy", id);

        formData.append("category", userInputs?.category);
        formData.append("formatType", userInputs?.format);
        formData.append("ibu", userInputs?.ibu ? userInputs?.ibu : "");
        formData.append("allowOneSource", userInputs?.allowOneSource);
        formData.append(
          "allowLibrary",
          userInputs?.allowLibrary ? userInputs?.allowLibrary : 1
        );
        formData.append("allowRequest", userInputs?.allowRequest ? 1 : 0);
        formData.append(
          "allowDraft",
          userInputs?.draft
            ? JSON.stringify(userInputs?.draft)
            : JSON.stringify(false)
        );

        if (userInputs?.docintelFormat == "video") {
          formData.append("allowVideo", 0);
        } else {
          formData.append("allowVideo", userInputs?.allowVideo ? 1 : 0);
        }

        formData.append("comDatetime", userInputs?.comDatetime);
        formData.append("cpdValue", userInputs?.cpdValue);
        formData.append(
          "tags",
          tagClickedFirst?.length ? JSON.stringify(tagClickedFirst) : ""
        );
        
        if(userDetail?.user?.[0]?.retailer == 1){
          formData.append("request_quote", userInputs?.request_quote ? 1 : 0);
          formData.append("sold_unsold_status", userInputs?.sold_unsold_status);
          formData.append(
            "pharama_val",
            userInputs?.pharmaArr ? userInputs?.pharmaArr : ""
          );
        }  
        const res = await postFormData(ENDPOINT.LIBRARYCREATE, formData, {
          header: {
            "Content-Type": "multipart/form-data",
          },
        });
        loader("hide");

        if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
          if (
            userInputs?.docintelFormat == "video" ||
            userInputs?.docintelFormat == "Video"
          ) {
            navigate("/content-detail", {
              state: { pdfId: res?.data?.data?.pdfId },
            });
          } else {
            navigate("/preview-content", {
              state: { pdfId: res?.data?.data?.pdfId, isEdit: 0 },
            });
          }
        } else {
          if (localStorage.getItem("user_id") == "rjiGlqA9DXJVH7bDDTX0Lg==") {
            if (
              userInputs?.docintelFormat == "video" ||
              userInputs?.docintelFormat == "Video"
            ) {
              navigate("/set-popup", {
                state: {
                  pdfId: res?.data?.data?.pdfId,
                  fileType: userInputs?.docintelFormat,
                  isEdit: 0,
                },
              });
            } else {
              if (userInputs?.allowVideo) {
                navigate("/library-add-link", {
                  state: {
                    pdfId: res?.data?.data?.pdfId,
                    isEdit: 0,
                    allowVideo: userInputs?.allowVideo,
                  },
                });
              } else {
                navigate("/set-popup", {
                  state: {
                    pdfId: res?.data?.data?.pdfId,
                    fileType: userInputs?.docintelFormat,
                    isEdit: 0,
                  },
                });
              }
            }
          } else {
            if (
              userInputs?.docintelFormat == "video" ||
              userInputs?.docintelFormat == "Video"
            ) {
              navigate("/set-popup", {
                state: {
                  pdfId: res?.data?.data?.pdfId,
                  fileType: userInputs?.docintelFormat,
                  ibu:userInputs?.ibu?userInputs?.ibu:"",
                  isEdit: 0,
                },
              });
            } else {
              if (userInputs?.allowVideo) {
                navigate("/library-add-link", {
                  state: {
                    pdfId: res?.data?.data?.pdfId,
                    isEdit: 0,
                    allowVideo: userInputs?.allowVideo,
                  },
                });
              } else {
                navigate("/set-popup", {
                  state: {
                    pdfId: res?.data?.data?.pdfId,
                    fileType: userInputs?.docintelFormat,
                    ibu:userInputs?.ibu?userInputs?.ibu:"",
                    isEdit: 0,
                  },
                });
              }
            }


            // navigate("/set-popup", {
            //   state: {
            //     pdfId: res?.data?.data?.pdfId,
            //     fileType: userInputs?.docintelFormat,
            //     isEdit: 0,
            //   },
            // });
          }
        }
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

  const onPdfTitleChange = (e, i) => {
    const { value } = e.target;
    const list = [...pdfSpcData];
    list[i].chapterTitle = value;
    setpdfSpcData(list);
  };

  const handleOnEbookPdfChange = (e, i) => {
    const value = e.target.files[0]?.name;
    const list = [...pdfSpcData];
    list[i].uploadFile = value;
    ebookFile[i] = e.target.files[0];
    setEbookFile(ebookFile);
    setpdfSpcData(list);
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
    setNewTag("");
    setIsOpen(false);
  };

  const tagClicked = (dd) => {
    if (!tagClickedFirst.includes(dd)) {
      setTagClickedFirst((oldArray) => [...oldArray, dd]);
    } else {
      toast.error("Tag already in list.");
    }
  };
  const hcpClicked = (dd) => {
    if (!hcpClickedFirst.includes(dd)) {
      if (dd == "All") {
        setHcpClickedFirst(userDetail?.hcp);
      } else {
        setHcpClickedFirst((oldArray) => [...oldArray, dd]);
      }
    } else {
      toast.error("Role already Selected.");
    }
  };

  const hcpIrtClicked = (dd) => {
    if (!hcpIrtClickedFirst.includes(dd)) {
      if (dd == "All") {
        setHcpIrtClickedFirst(mandatoryRole);
      } else {
        const newArray = [dd];
        setHcpIrtClickedFirst(newArray);
        // setHcpIrtClickedFirst((oldArray) => [...oldArray, dd]);
      }
    } else {
      toast.error("Role already Selected.");
    }
  };

  const removeTagFinal = (index) => {
    const tagsClickedFirst = tagClickedFirst;
    tagsClickedFirst.splice(index, 1);
    setTagClickedFirst(tagsClickedFirst);

    setTagsReRender(tagsReRender + 1);
  };

  const removeHcp = (data, type = "") => {
    if (type == "irt") {
      const hcpData = hcpIrtClickedFirst.filter((item) => item != data);
      setHcpIrtClickedFirst(hcpData);
    } else {
      const hcpData = hcpClickedFirst.filter((item) => item != data);
      setHcpClickedFirst(hcpData);
    }
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
      try {
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

        let prevtag = allTags;
        prevtag.push(newTag);
        setAllTags(prevtag);

        if (
          !temp_tags.includes(newTag.toLowerCase()) &&
          !alltemp_tags.includes(newTag.toLowerCase())
        ) {
          setTagClickedFirst((oldArray) => [...oldArray, newTag]);

          const body = {
            user_id: localStorage.getItem("user_id"),
            tags: newTag,
          };
        } else {
          toast.error("Tag already in list.");
        }
        setNewTag("");
        setTagsCounter(tagsCounter + 1);
      } catch (err) {
        console.log(err);
        loader("hide");
      }
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
                <label htmlFor="">Country</label>
                <Select
                  options={userDetail?.country || []}
                  placeholder="Select country"
                  onChange={(e) => handleChange(e?.value, "country")}
                  className="dropdown-basic-button split-button-dropup"
                  isClearable
                />
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

              {
                 userDetail?.user?.[0]?.retailer == 1  ? 
                  <div className="form-group">
                    <label htmlFor="">Pharma</label>
                    <Select
                      options={userDetail?.pharmaArr}
                      onChange={(e) => handleChange(e?.value, "pharmaArr")}
                      placeholder="Select pharma person"
                      className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                      isClearable
                    />
                  </div>
                 : null
              }

              {localStorage.getItem("user_id") ==
                "rOhdD02MgXkownQqcreqAw==" && (
                <>
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
                </>
              )}
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
                              id={"flexCheckDefault_" + index}
                              type="checkbox"
                              defaultValue={reseller.includes(item?.id)}
                              onClick={(e) => handleReseller(e, item)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={"flexCheckDefault_" + index}
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
              {userDetail?.user?.[0]?.flag != 1 &&
              userDetail?.user?.[0]?.group_id == 3 ? (
                <>
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
                </>
              ) : null}
              {userDetail?.user?.[0]?.flag == 0 &&
              userDetail?.user?.[0]?.group_id == 3 ? (
                <div className="form-group margin-added">
                  <label htmlFor="">Product</label>
                  <Select
                    options={userDetail?.product}
                    value={userInputs?.product}
                    placeholder="Select the product this is for"
                    onChange={(e) => handleChange(e, "product")}
                    // onChange={(e) => handleChange(e?.value, "product")}
                    className="dropdown-basic-button split-button-dropup"
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
              ) : (
                <>
                  {/*<div className="form-group">
                    <label htmlFor="">Trial</label>
                    <Select
                      options={userDetail?.trial}
                      placeholder="Select the product this is for"
                      onChange={(e) => handleChange(e?.value, "trial")}
                      className="dropdown-basic-button split-button-dropup"
                      isClearable
                    />
                    {error?.trial ? (
                      <div className="login-validation">{error?.trial}</div>
                    ) : null}
                  </div>*/}
                </>
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
                <>
                  {/*<div className="form-group">
                      <label htmlFor="">Blind type</label>
                      <Select
                        options={blindType}
                        placeholder="Select Business Unit"
                        onChange={(e) => handleChange(e?.value, "blindType")}
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                      />
                      {error?.blindType ? (
                        <div className="login-validation">{error?.blindType}</div>
                      ) : null}
                    </div>*/}
                </>
              ) : null}

              {userDetail?.user?.[0]?.flag == 0 &&
              userDetail?.user?.[0]?.pharmaData == 0 &&
              userDetail?.user?.[0]?.octaLach == 1 &&
              userDetail?.user?.[0]?.group_id == 3 ? (
                <div className="form-group">
                  <label htmlFor="">Content Use</label>
                  <fieldset id="group2">
                    <input
                      type="radio"
                      value="value2"
                      name="group2"
                      onClick={(e) => handleChange(1, "allowLibrary")}
                      id="limitagreed2"
                    />
                    <label htmlFor="limitagreed2">Library</label>

                    <input
                      type="radio"
                      value="value1"
                      name="group2"
                      onClick={(e) => handleChange(2, "allowLibrary")}
                      id="limitagreed1"
                    />
                    <label htmlFor="limitagreed1">Congress</label>
                  </fieldset>
                </div>
              ) : null}

              {userDetail?.user?.[0]?.flag == 1 &&
              userDetail?.user?.[0]?.group_id == 3 ? (
                <>
                  <div className="form-group justify-content-start rd">
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
                          {finalTags?.map((item, index) => {
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
                </>
              ) : null}
            </div>

            {localStorage.getItem("user_id") != "56Ek4feL/1A8mZgIKQWEqg==" ? (
              <>
                <div className="col-12 col-md-6 d-flex justify-content- align-items-start right-change flex-column">
                  <div className="form-group justify-content-end ">
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
                          {finalTags?.map((item, index) => {
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
              </>
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
      let body = {
        user_id: localStorage.getItem("user_id"),
        product: userDetail?.newValue,
        category: 0,
        type: 1,
      };
      await postData(ENDPOINT.ADD_SPC_PRODUCT, body);
      let newAr = userDetail?.product;
      newAr.push({ value: userDetail?.newValu, label: userDetail?.newValue });

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
              {/* {userDetail?.costCenter ? (
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
              ) : null} */}
              {/* <div className="form-group">
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
                <label htmlFor="">
                  Set limit of usage <span>*</span>
                </label>
                <input
                  type="number"
                  name="limit"
                  min="0"
                  className={
                    error?.limit ? "form-control error" : "form-control"
                  }
                  placeholder="“0” value means unlimited limit"
                  ref={limitFieldRef}
                  onChange={handleChange}
                />
                {error?.limit ? (
                  <div className="login-validation">{error?.limit}</div>
                ) : null}
              </div> */}
              <div className="form-group">
                <label htmlFor="">Allow</label>
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
                  {/*
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
                */}
                </fieldset>
              </div>

              {
                userDetail?.user?.[0]?.retailer == 1  ? 
                  <>
                    <div className="form-group">
                      <label htmlFor="">Status 
                      {/* <span>*</span> */}
                      </label>
                      <fieldset id="group2">
                        <input
                          type="radio"
                          value="sold"
                          name="sold_unsold_status"
                          checked={userInputs?.sold_unsold_status == 'sold' ? true : false}
                          onClick={(e) =>
                            handleChange('sold', "sold_unsold_status")
                          }
                          id="sold"
                        />
                        <label htmlFor="sold">Sold</label>
                        <input
                          type="radio"
                          value="unsold"
                          name="sold_unsold_status"
                          checked={userInputs?.sold_unsold_status == 'unsold' ? true : false}
                          onClick={(e) =>
                            handleChange('unsold', "sold_unsold_status")
                          }
                          id="unsold"
                        />
                        <label htmlFor="unsold">Unsold</label>
                      </fieldset>
                      {error?.status ? (
                        <div className="login-validation">
                          {error?.status}
                        </div>
                      ) : null}
                    </div>

                    <div className="form-group">
                    <label htmlFor="setasdraft1">Request quote</label>
                    <fieldset id="request_quote">
                      <div className="switch">
                        <label className="switch-light">
                          <input
                            type="checkbox"
                            value="value1"
                            name="request_quote"
                            id="setasdraft1"
                            onChange={(e) => {
                              handleChange(e.target?.checked, "request_quote");
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
                
                : null
              }
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
                  placeholder="Please type your notes here..."
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
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <div className="custom-container">
          <Row>
            <div className="page-top-nav sticky">
              <Row className="justify-content-end align-items-center">
                <Col md={1}>
                  <div className="header-btn-left">
                    {/* <Link
                      className="btn btn-primary btn-bordered back"
                      to="/library-create"
                    >
                      Back
                    </Link>
                    <Link
                      className="btn btn-primary btn-bordered back-btn"
                      to="/library-create"
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
                </Col>
                <Col md={9}>
                  <ul className="tabnav-link">
                    <li className="active active-main">
                      <a href="">Create Your Content</a>
                    </li>
                    {localStorage.getItem("user_id") ==
                      "rjiGlqA9DXJVH7bDDTX0Lg==" && userInputs?.allowVideo ? (
                      <li className="">
                        <a href="">[Embedding Video]</a>
                      </li>
                    ) : null}
                    {localStorage.getItem("user_id") !=
                    "56Ek4feL/1A8mZgIKQWEqg==" ? (
                      <li className="">
                        <a href="">Edit Consent Option</a>
                      </li>
                    ) : null}

                    <li className="">
                      <a href="">Approve Your Content &amp; Publish</a>
                    </li>
                  </ul>
                </Col>
                <Col md={2}>
                  <div className="header-btn">
                    <Link
                      className="btn btn-primary btn-bordered move-draft"
                      to="/library-create"
                    >
                      Cancel
                    </Link>

                    <button
                      className="btn btn-primary btn-filled next "
                      onClick={nextButtonClicked}
                    >
                      Next
                    </button>
                  </div>
                </Col>
              </Row>
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

                <Row>
                  <Col md={6}>
                    <div className="form-group val">
                      <label htmlFor="">
                        Content title <span>*</span>
                      </label>
                      <input
                        type="text"
                        name="contentTitle"
                        className={
                          error?.contentTitle
                            ? "form-control error"
                            : "form-control"
                        }
                        ref={titleFieldRef}
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

                    {userDetail?.user?.[0]?.flag == 1 &&
                    userDetail?.user?.[0]?.group_id == 3 ? (
                      <div className="form-group">
                        <label htmlFor="">Comment</label>
                        {/*<input
                              type="text"
                              name="journalTitle"
                              className="form-control"
                              onChange={(e) => handleChange(e)}
                            />*/}
                        <textarea
                          className={
                            error?.journalTitle
                              ? "form-control error"
                              : "form-control"
                          }
                          id="formControlTextarea"
                          rows="5"
                          name="journalTitle"
                          onChange={(e) => handleChange(e)}
                          placeholder="Please type your comments here..."
                        ></textarea>

                        {error?.journalTitle ? (
                          <div className="login-validation">
                            {error?.journalTitle}
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <div className="form-group">
                        {userDetail?.user?.[0]?.flag == 0 &&
                        userDetail?.user?.[0]?.group_id == 3 ? (
                          <label htmlFor="">Subtitle</label>
                        ) : (
                          <label htmlFor="">Journal title</label>
                        )}

                        <input
                          type="text"
                          name="journalTitle"
                          className={
                            error?.journalTitle
                              ? "form-control error"
                              : "form-control"
                          }
                          onChange={(e) => handleChange(e)}
                        />
                        {error?.journalTitle ? (
                          <div className="login-validation">
                            {error?.journalTitle}
                          </div>
                        ) : null}
                      </div>
                    )}

                    {localStorage.getItem("user_id") ==
                    "B7SHpAc XDXSH NXkN0rdQ==" ? (
                      <>
                        <div className="form-group">
                          <label htmlFor="">Language</label>
                          <Select
                            options={language}
                            placeholder="Select language"
                            onChange={(e) => handleChange(e?.value, "language")}
                            className="dropdown-basic-button split-button-dropup"
                            isClearable
                          />
                        </div>

                        <div className="form-group val">
                          <label htmlFor="">Request New Language Code</label>
                          <input
                            type="text"
                            name="newLanguageCode"
                            placeholder="Enter Language name for the new language code"
                            className="form-control"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          />
                        </div>
                      </>
                    ) : null}

                    {localStorage.getItem("user_id") !=
                      "iSnEsKu5gB/DRlycxB6G4g==" &&
                    localStorage.getItem("user_id") !=
                      "56Ek4feL/1A8mZgIKQWEqg==" ? (
                      <div className="form-group">
                        <label htmlFor="">Author</label>
                        <input
                          type="text"
                          name="keyAuthor"
                          className="form-control"
                          onChange={handleChange}
                        />
                      </div>
                    ) : null}

                    {userDetail?.user?.[0]?.flag == 1 &&
                    userDetail?.user?.[0]?.group_id == 3 ? (
                      <>
                        {
                          <div className="form-group">
                            <label htmlFor="setasdraft5">Set as draft</label>
                            <fieldset id="group2">
                              <div className="switch">
                                <label className="switch-light">
                                  <input
                                    type="checkbox"
                                    value="value1"
                                    name="group2"
                                    id="setasdraft5"
                                    onChange={(e) => {
                                      handleChange(e.target?.checked, "draft");
                                    }}
                                  />
                                  <span>
                                    <span className="switch-btn active">
                                      No
                                    </span>
                                    <span className="switch-btn ">Yes</span>
                                  </span>
                                  <a className="btn"></a>
                                </label>
                              </div>
                            </fieldset>
                          </div>
                        }
                      </>
                    ) : null}
                    {userDetail?.user?.[0]?.flag == 0 &&
                    userDetail?.user?.[0]?.group_id == 3 ? (
                      <>
                        <div className="form-group">
                          <label htmlFor="">Allowed</label>
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
                          <label htmlFor="setasdraft2">Set as draft</label>
                          <fieldset id="group2">
                            <div className="switch">
                              <label className="switch-light">
                                <input
                                  type="checkbox"
                                  value="value1"
                                  name="group2"
                                  id="setasdraft2"
                                  onChange={(e) => {
                                    handleChange(e.target?.checked, "draft");
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

                    {userDetail?.user?.[0]?.octaLach == 1 &&
                    userDetail?.user?.[0]?.group_id == 3 ? (
                      <>
                        <div className="form-group">
                          <label htmlFor="setasdraft3">Medical</label>
                          <fieldset id="group2">
                            <div className="switch">
                              <label className="switch-light">
                                <input
                                  type="checkbox"
                                  value="value1"
                                  name="group2"
                                  id="setasdraft3"
                                  onChange={(e) => {
                                    handleChange(e.target?.checked, "medical");
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

                    {userDetail?.user?.[0]?.octaLach == 1 &&
                    userDetail?.user?.[0]?.group_id == 3 ? (
                      <>
                        <div className="form-group">
                          <label htmlFor="synconesource" dangerouslySetInnerHTML={{__html: 'OneSource/<br>InformedGO<br>Library'}}></label>
                          <fieldset id="sync_onesource">
                            <div className="switch">
                              <label className="switch-light">
                                <input
                                  type="checkbox"
                                  value="value1"
                                  name="sync_onesource"
                                  id="synconesource"
                                  onChange={(e) => {
                                    handleChange(e.target?.checked, "sync_onesource");
                                  }}
                                />
                                <span>
                                  <span className="switch-btn active">No</span>
                                  <span className="switch-btn">Yes</span>
                                </span>
                                <a className="btn"></a>
                              </label>
                            </div>
                          </fieldset>
                        </div>
                      </>
                    ) : null}
                    
                    {userDetail?.user?.[0]?.flag == 1 &&
                    userDetail?.user?.[0]?.group_id == 3 ? (
                      <div className="form-group">
                        <label htmlFor="setasdraft4">
                          {localStorage.getItem("user_id") ==
                          "56Ek4feL/1A8mZgIKQWEqg=="
                            ? "Irt mandatory training"
                            : "Mandatory"}
                        </label>
                        <fieldset id="group2">
                          <div className="switch">
                            <label className="switch-light">
                              <input
                                type="checkbox"
                                name="group2"
                                id="setasdraft4"
                                onChange={(e) => {
                                  handleChange(e.target?.checked, "mandatory");
                                }}
                              />
                              <span>
                                <span
                                  className={`switch-btn ${
                                    userInputs?.mandatory == 0 ? " Active" : ""
                                  }`}
                                >
                                  No
                                </span>
                                <span
                                  className={`switch-btn ${
                                    userInputs?.mandatory == 1 ? " Active" : ""
                                  }`}
                                >
                                  Yes
                                </span>
                              </span>
                              <a className="btn"></a>
                            </label>
                          </div>
                        </fieldset>
                      </div>
                    ) : null}

                    {userDetail?.user?.[0]?.flag == 1 &&
                    (!userInputs?.mandatory || userInputs?.mandatory == 0) &&
                    userDetail?.user?.[0]?.group_id == 3 ? (
                      <div className="form-group">
                        <label htmlFor="">Role</label>
                        <div className="input-group w-100">
                          <div className="tags_added">
                            <div className="select-tags">
                              <ul>
                                <>
                                  <li
                                    className={
                                      hcpClickedFirst.length == 5
                                        ? "list1 all fade-down"
                                        : "list1 all fade-up"
                                    }
                                    onClick={() => {
                                      hcpClicked("All");
                                    }}
                                  >
                                    All
                                  </li>
                                  {userDetail?.hcp?.map((item, index) => {
                                    return (
                                      <li
                                        className="list1"
                                        onClick={() => {
                                          hcpClicked(item);
                                        }}
                                      >
                                        {item}
                                      </li>
                                    );
                                  })}
                                </>
                              </ul>
                              <div className="after-selected">
                                <ul className="after-tag-selected">
                                  {hcpClickedFirst.map((item, index) => {
                                    return (
                                      <li className="list1">
                                        {item}
                                        <img
                                          src="componentAssets/images/filter-close.svg"
                                          alt="Close-filter"
                                          onClick={() => removeHcp(item)}
                                        />
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {userDetail?.user?.[0]?.flag == 1 &&
                    userInputs?.mandatory == 1 &&
                    userDetail?.user?.[0]?.group_id == 3 ? (
                      <div className="form-group">
                        <label htmlFor="">IRT role</label>
                        <div className="input-group w-100">
                          <div className="tags_added">
                            <div className="select-tags">
                              <ul className="after-tag-selected">
                                <>
                                  {mandatoryRole.map((item, index) => {
                                    return (
                                      <li
                                        className="list1"
                                        onClick={() => {
                                          hcpIrtClicked(item);
                                        }}
                                      >
                                        {item}
                                      </li>
                                    );
                                  })}
                                </>
                              </ul>
                              <div className="after-selected">
                                <ul className="after-tag-selected">
                                  {hcpIrtClickedFirst.map((item, index) => {
                                    return (
                                      <>
                                        {mandatoryRole?.includes(item) ? (
                                          <li className="list1">
                                            {item}
                                            <img
                                              src="componentAssets/images/filter-close.svg"
                                              alt="Close-filter"
                                              onClick={() =>
                                                removeHcp(item, "irt")
                                              }
                                            />
                                          </li>
                                        ) : null}
                                      </>
                                    );
                                  })}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <div className="form-group val">
                      <label htmlFor="">
                        Docintel format <span>*</span>
                      </label>
                      <Select
                        className={
                          error?.docintelFormat
                            ? "dropdown-basic-button split-button-dropup error"
                            : "dropdown-basic-button split-button-dropup"
                        }
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
                              className={
                                error?.uploadFile
                                  ? "inputfile inputfile-6 error"
                                  : "inputfile inputfile-6"
                              }
                              accept="application/pdf"
                              onChange={(e) => handleChange(e, "uploadFile")}
                            />
                            <label htmlFor="file-6">
                              <span>Choose Your File</span>
                            </label>
                            {userInputs?.uploadFile?.[0]?.name ? (
                              <p className="uploaded-file">
                                {userInputs?.uploadFile?.[0].name}
                              </p>
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
                              <p className="uploaded-file">
                                {userInputs?.uploadFile?.[0]?.name}
                              </p>
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
                    ) : userInputs.docintelFormat == "ebook" ? (
                      chapter.map((val, i) => {
                        return (
                          <>
                            <div className="form-group val chapter-title">
                              <div className="ebook-format">
                                <label htmlFor="">
                                  {localStorage.getItem("user_id") !=
                                  "56Ek4feL/1A8mZgIKQWEqg=="
                                    ? "Chapter "
                                    : "File "}
                                  {i + 1} title <span>*</span>
                                </label>
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
                                      className={
                                        error?.chapter?.[i]
                                          ? "inputfile inputfile-6 error"
                                          : "inputfile inputfile-6"
                                      }
                                      accept="application/pdf"
                                      onChange={(e) =>
                                        handleOnEbookChange(e, i)
                                      }
                                    />
                                    <label htmlFor={`file-${i}`}>
                                      <span>Choose Your File</span>
                                    </label>

                                    <p>
                                      {val.uploadFile == "" ? (
                                        "Upload your PDF file"
                                      ) : (
                                        <p className="uploaded-file">
                                          {val.uploadFile}
                                        </p>
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="chapter-btn-wrapper">
                                {chapter.length - 1 == i ? (
                                  <Button
                                    className="btn btn-primary btn-bordered btn-voilet move-draft chappter-add-btn"
                                    onClick={addMoreChClicked}
                                  >
                                    Add Ch +
                                  </Button>
                                ) : null}

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
                    ) : userInputs.docintelFormat == "pdfSpc" ? (
                      pdfSpcData.map((val, i) => {
                        return (
                          <>
                            <div className="form-group val chapter-title pdf-spc">
                              <div className="ebook-format">
                                <label htmlFor="">
                                  {localStorage.getItem("user_id") !=
                                  "56Ek4feL/1A8mZgIKQWEqg=="
                                    ? "Chapter "
                                    : "File "}{" "}
                                  title
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) => onPdfTitleChange(e, i)}
                                  value={val.chapterTitle}
                                />
                                <div className="upload-file-box">
                                  <div className="box">
                                    <input
                                      type="file"
                                      name={`file-${i}`}
                                      id={`file-${i}`}
                                      className={
                                        error?.chapter?.[i]
                                          ? "inputfile inputfile-6 error"
                                          : "inputfile inputfile-6"
                                      }
                                      accept="application/pdf"
                                      onChange={(e) =>
                                        handleOnEbookPdfChange(e, i)
                                      }
                                    />
                                    <label htmlFor={`file-${i}`}>
                                      <span>Change Your File</span>
                                    </label>

                                    <p>
                                      {val.uploadFile == "" ? (
                                        "Upload your PDF file"
                                      ) : (
                                        <p className="uploaded-file">
                                          {val.uploadFile}
                                        </p>
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {error?.pdfChapter?.[i] ? (
                                <div className="login-validation-upload">
                                  {error?.pdfChapter?.[i]}
                                </div>
                              ) : null}
                            </div>
                          </>
                        );
                      })
                    ) : null}

                    {userDetail?.user?.[0]?.flag == 0 &&
                    userDetail?.user?.[0]?.group_id == 3 ? (
                      <>
                        {/*
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
                         */}
                      </>
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
                            <p className="uploaded-file">
                              {userInputs?.coverPhoto?.[0]?.name}
                            </p>
                          ) : (
                            <p>
                              Uplode an alternative cover <br />
                              <span>
                                <i>Allowed formats: PNG,JPEG</i>
                              </span>
                              <br />
                              <span>(Recommended size 88 X 124)</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Col>

                  {localStorage.getItem("user_id") !=
                  "56Ek4feL/1A8mZgIKQWEqg==" ? (
                    <Col
                      md={6}
                      className="d-flex justify-content-end align-items-start right-change"
                    >
                      <div className="form-group justify-content-end">
                        <label htmlFor="">
                          Production notes for Docintel team
                        </label>
                        <textarea
                          className="form-control"
                          id="formControlTextarea"
                          rows="5"
                          onChange={(e) =>
                            handleChange(e?.target.value, "productionNotes")
                          }
                          placeholder="Please type your notes here..."
                        ></textarea>
                      </div>
                    </Col>
                  ) : null}

                  {(ebookFile?.length &&
                    userInputs.docintelFormat?.includes("ebook")) ||
                  (["ebook", "pdf", "pdfSpc"].includes(
                    userInputs.docintelFormat
                  ) &&
                    localStorage.getItem("user_id") ==
                      "rjiGlqA9DXJVH7bDDTX0Lg==") ? (
                    <>
                      <div className="form-group">
                        <label htmlFor="">Include video</label>
                        <div className="switch">
                          <label className="switch-light">
                            <input
                              type="checkbox"
                              checked={userInputs?.allowVideo ? true : false}
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
                    </>
                  ) : null}
                </Row>
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
                <Form.Label>
                  Videos <span>*</span>
                </Form.Label>
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
              <label htmlFor="new-tag">
                {" "}
                {localStorage.getItem("user_id") === "B7SHpAc XDXSH NXkN0rdQ=="
                  ? "New Topic"
                  : "New Tag"}{" "}
              </label>
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
export default LibraryCreateUser;
