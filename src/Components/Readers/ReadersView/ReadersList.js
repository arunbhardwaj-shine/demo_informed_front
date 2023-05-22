import React, { useEffect, useRef, useState } from "react";
import {
  Accordion,
  Button,
  Col,
  Form,
  OverlayTrigger,
  ProgressBar,
  Row,
  Tab,
  Tabs,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
import {
  postData,
  getData,
  postFormData,
  deleteData,
} from "../../../axios/apiHelper";
import { ENDPOINT } from "../../../axios/apiConfig";
import { loader } from "../../../loader";
import { toast } from "react-toastify";
import { Spinner } from "react-activity";
import { popup_alert } from "../../../popup_alert";
import CommonConfirmModel from "../../../Model/CommonConfirmModel";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const NewReaders = () => {
  let obj = {};
  const limit = 24;
  const [search, setSearch] = useState("");
  const [readerDataList, setReaderDataList] = useState([]);
  const [country, setCountry] = useState([]);
  const [isFlag, setFlag] = useState(0);

  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setCount] = useState(0);
  const [appliedFilter, setAppliedFilter] = useState({
    // status: ["Registered"],
    // "contact Type": ["HCP"],
  });

  const [filterApplyflag, setFilterApplyflag] = useState(0);
  const [pageAll, setPageAll] = useState(false);
  const [pageAllClicked, setPageAllClicked] = useState(false);
  const [siteNumber, setSiteNumber] = useState([]);
  const [siteName, setSiteName] = useState([]);

  const [countryAll, setCountryAll] = useState([]);
  const defaultCountry = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectedSiteName, setSelectedSiteName] = useState([]);
  const [selectedSiteNumber, setSelectedSiteNumber] = useState([]);
  const [selectedRole, setSelectedRole] = useState([]);
  const [totalCountFlag, setTotalCountFlag] = useState(true);

  const [filterdata, setFilterData] = useState({
    // Status: ["Registered", "Unregistered"],
  });
  const [filterObject, setFilterObject] = useState({
    // status: ["Registered"],
    // "contact Type": ["HCP"],
  });
  const [apifilterObject, setApifilterObject] = useState({
   status: ["Registered"],
    // "contact Type": ["HCP"], 
    // status: ["Registered"],

    // status:["Unregistered"]
  });
  const [forceRender, setForceRender] = useState(false);
  const [updateflag, setUpdateFlag] = useState(0);
  const [types, setTypes] = useState([
    { value: "0", label: "HCP" },
    { value: "1", label: "Staff User" },
    { value: "3", label: "Test User" },
    { value: "4", label: "Competitor" },
  ]);
  const [change, setChanges] = useState(null);
  const userTypeValues = {
    0: "HCP",
    1: "Staff User",
    3: "Test User",
    4: "Competitor",
  };
  const [changeCountry, setChangeCountry] = useState([]);
  const [changeUserType, setChangeUserType] = useState([]);
  const [changeBlindedType, setChangeBlindedType] = useState([]);
  const [changeRoleType, setChangeRoleType] = useState([]);
  const [changeIRTType, setChangeIRTType] = useState([]);
  const [changeSiteNumberType, setChangeSiteNumberType] = useState([]);
  const [changeSiteNameType, setChangeSiteNameType] = useState([]);

  const [showfilter, setShowFilter] = useState(false);
  const [emailStats, setEmailStats] = useState([]);
  const [statsFlag, setStatsFlag] = useState(0);
  const [spcFlag, setSpcFlag] = useState(0);
  const [apiCallStatus, setApiCallStatus] = useState(false);
  const [deletestatus, setDeleteStatus] = useState(false);
  const [resetDataId, setResetDataId] = useState();

  const [commonConfirmModelFun, setCommonConfirmModelFun] = useState(() => {});
  const [popupMessage, setPopupMessage] = useState({
    message1: "",
    message2: "",
    footerButton: "",
  });
  const [confirmationpopup, setConfirmationPopup] = useState(false);

  useEffect(() => {
    getFilters();
    getReaderListData(page, filterObject, search);
  }, []);

  const getFilters = async () => {
    try {
      loader("show");
      const res = await getData(ENDPOINT.READERSFILTER);
      setCountry(res?.data?.data?.country);
      setFilterData(res?.data?.data);
    } catch (err) {
      loader("hide");
    }
  };

  const getReaderListData = async (page, obj, search, load = 0) => {
    try {
      setIsLoaded(false);
      if (load == 0) {
        loader("show");
        setPage(1);
        page = 1;
      } else {
        setPageAll(true);
      }
      setApiCallStatus(false);
      let data = {
        user_id: localStorage.getItem("user_id"),
        userType: 5,
        search: search,
        type: "",
        flag: isFlag,
        page: page,
        limit: limit,
      };

      let payload = { ...data, ...obj };

      const res = await postData(ENDPOINT.READER_LIST_DATA, payload);
      if (spcFlag == 0) {
        let body = {
          user_id: localStorage.getItem("user_id"),
        };
        const res_data = await postData(ENDPOINT.SPC_HELPER_LISTING, body);
        let countries = [];
        Object.entries(res_data?.data?.data?.country).map(([index, item]) => {
          countries.push({
            value: item == "B&H" ? "Bosnia and Herzegovina" : item,
            label: item == "B&H" ? "Bosnia and Herzegovina" : item,
          });

          setCountryAll(countries);
        });
        setSpcFlag(1);
      }

      if (totalCount != res?.data?.data?.total) {
        if (res?.data?.data?.result?.length <= 0) {
          setCount(0);
        } else {
          setCount(res?.data?.data?.total);
        }
      }

      let total_results = 0;
      if (page != 1) {
        total_results =
          res?.data?.data?.result?.length + readerDataList?.length;
        setReaderDataList((oldArray) => [
          ...oldArray,
          ...res?.data?.data?.result,
        ]);
      } else {
        total_results = res?.data?.data?.result?.length;
        setReaderDataList(res?.data?.data?.result);
      }

      // if ( total_results <= res?.data?.data?.total) {
      //   setIsLoaded(false);
      //  } else {
      //   setIsLoaded(true);
      // }

      if (
        res?.data?.data?.total > total_results &&
        res?.data?.data?.result?.length != 0
      ) {
        setIsLoaded(true);
      } else {
        setIsLoaded(false);
      }

      if (res?.data?.data?.flag == 1) {
        setFlag(1);
      } else {
        setFlag(res?.data?.data?.flag ? res?.data?.data?.flag : 0);
      }
      setPageAll(false);
      setApiCallStatus(true);
      setTotalCountFlag(true);
      loader("hide");
    } catch (err) {
      console.log(err);
      loader("hide");
    }
  };
  const getDownloadData = async (page, obj, search) => {
    try {
      loader("show");
      let data = {
        user_id: localStorage.getItem("user_id"),
        userType: 5,
        search: search,
        type: "",
        page: page,
      };

      let payload = { ...data, ...filterObject };
      const res = await postFormData(ENDPOINT.READER_DOWNLOAD, payload, {
        responseType: "blob",
      });
      const link = document.createElement("a");
      const url = URL.createObjectURL(res?.data);
      link.href = url;
      link.download = "readers.xlsx";
      link.click();
      loader("hide");
    } catch (err) {
      console.log(err);
      loader("hide");
    }
  };

  const loadMoreClicked = () => {
    // setPageAllClicked(true);
    let sp = page + 1;
    getReaderListData(sp, filterObject, search, 1);
    if (isFlag == 1) {
      setPage(2);
    } else {
      setPage(sp);
    }
  };

  const searchChange = (e) => {
    setSearch(e?.target?.value);
    setFlag(0);
    if (e?.target?.value === "") {
      setReaderDataList([]);
      // setPageAllClicked(false);

      getReaderListData(page, filterObject, "");
    }
  };

  const submitHandler = (event) => {
    setReaderDataList([]);
    setCount(0);

    getReaderListData(page, filterObject, search);
    event.preventDefault();
    return false;
  };

  const handleOnFilterChange = (e, item, index, key, data = []) => {
    let newObj = JSON.parse(JSON.stringify(appliedFilter));

    if (!newObj[key]) {
      newObj[key] = [];
    }
    if (!apifilterObject[key]) {
      apifilterObject[key] = [];
    }
    if (key == "region") {
      let newCountry = [];
      if (item == "All") {
        newCountry = country;
        filterdata.country = [];
        delete apifilterObject.country;
        delete filterObject.country;
      } else {
        Object.keys(filterdata?.regionCountry)?.forEach((values) => {
          if (filterdata?.regionCountry[values] == item) {
            newCountry.push(values);
          }
        });
        delete apifilterObject.country;
        delete filterObject.country;
      }
      setFilterData({ ...filterdata, country: newCountry });
    }

    if (e?.target?.checked == true) {
      if (
        key == "status" ||
        key == "contact Type" ||
        key == "userAction" ||
        key == "Business Unit" ||
        key == "webinarRegistered" ||
        key == "Registered For Webinar" ||
        key == "RTR?" ||
        key == "region" ||
        key == "IRT" ||
        key == "Blinded" ||
        key == "Accounts" ||
        key == "List"
      ) {
        if (key == "region") {
          newObj["country"] = [];
          newObj[key] = [];
          apifilterObject[key] = [];
          newObj[key]?.push(item);
          apifilterObject[key]?.push(e.target.value);
        } else {
          newObj[key] = [];
          apifilterObject[key] = [];
          newObj[key]?.push(item);
          apifilterObject[key]?.push(e.target.value);
        }
      } else {
        if (item == "All") {
          newObj[key] = data;
          apifilterObject[key] = data;
        } else {
          newObj[key]?.push(item);
          apifilterObject[key]?.push(item);
          if (data?.length - 1 == newObj[key]?.length) {
            newObj[key]?.push("All");
            apifilterObject[key]?.push("All");
          }
        }
      }
    } else {
      if (item == "All") {
        newObj[key] = [];
      } else {
        if (newObj[key]?.includes("All")) {
          newObj[key] = newObj[key]?.filter((item) => item != "All");
        }
      }
      const index = newObj[key]?.indexOf(item);
      if (index > -1) {
        newObj[key]?.splice(index, 1);
        if (newObj[key]?.length == 0) {
          delete newObj[key];
        }
      }
      const index2 = apifilterObject[key]?.indexOf(e.target.value);
      if (index2 > -1) {
        apifilterObject[key]?.splice(index2, 1);
        if (apifilterObject[key]?.length == 0) {
          delete apifilterObject[key];
        }
      }
    }

    // setFilterObject(newObj);
    setAppliedFilter(newObj);
    setApifilterObject(apifilterObject);
    setForceRender(!forceRender);
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
  const onCountryChange = (e, i, index) => {
    setSelectedCountry((prev) => {
      const newSelectedSiteNumber = [...prev];
      newSelectedSiteNumber[index] = {
        value: e.value,
        label: e.value,
      };
      return newSelectedSiteNumber;
    });
    if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
      let consent1 = {
        index: i,
        value: "",
      };
      const found2 = changeSiteNumberType.some((el) => el.index === i);
      if (!found2) {
        setChangeSiteNumberType((oldarray) => [...oldarray, consent1.value]);
      } else {
        const updatedArray = changeSiteNumberType.map((el) =>
          el.index === i ? { ...el, value: consent1.value } : el
        );
        setChangeSiteNumberType(updatedArray);
      }

      let consent2 = {
        index: i,
        value: "",
      };
      const found3 = changeSiteNameType.some((el) => el.index === i);
      if (!found3) {
        setChangeSiteNameType((oldarray) => [...oldarray, consent2.value]);
      } else {
        const updatedArray = changeSiteNameType.map((el) =>
          el.index === i ? { ...el, value: consent2.value } : el
        );
        setChangeSiteNameType(updatedArray);
      }
      setSelectedSiteNumber((prev) => {
        const newSelectedSiteNumber = [...prev];
        newSelectedSiteNumber[index] = true;
        return newSelectedSiteNumber;
      });

      setSelectedSiteName((prev) => {
        const newSelectedSiteName = [...prev];
        newSelectedSiteName[index] = true;
        return newSelectedSiteName;
      });

      // console.log(selectedSiteName[0].length);
      let consetValue = e.value;
      const filteredData = change.sideData.filter(
        (item) => item.country === consetValue
      );

      const siteNumbers = filteredData.map((item) => ({
        label: item.site_number,
        value: item.site_number,
      }));
      const siteNames = filteredData.map((item) => ({
        label: item.site_name,
        value: item.site_name,
      }));
      setSiteNumber((prevSiteNumbers) => ({
        ...prevSiteNumbers,
        [index]: siteNumbers,
      }));
      setSiteName((prevSiteNumbers) => ({
        ...prevSiteNumbers,
        [index]: siteNames,
      }));
    }
    let consent = {
      index: i,
      value: e.value,
    };
    const found = changeCountry.some((el) => el.index === i);
    if (!found) {
      setChangeCountry((oldarray) => [...oldarray, consent]);
    } else {
      const updatedArray = changeCountry.map((el) =>
        el.index === i ? { ...el, value: e.value } : el
      );
      setChangeCountry(updatedArray);
    }
  };

  const onUserChange = (e, i) => {
    const consetValue = e.value;
    const consent = {
      index: i,
      value: consetValue,
    };
    const found = changeUserType.some((el) => el.index === i);

    if (!found) {
      setChangeUserType((oldArray) => [...oldArray, consent]);
    } else {
      setChangeUserType((oldArray) =>
        oldArray.map((el) =>
          el.index === i ? { ...el, value: consetValue } : el
        )
      );
    }
  };

  const onBlindedChange = (e, i) => {
    const consetValue = e.value;
    const consent = {
      index: i,
      value: consetValue,
    };
    const found = changeBlindedType.some((el) => el.index === i);

    if (!found) {
      setChangeBlindedType((oldArray) => [...oldArray, consent]);
    } else {
      setChangeBlindedType((oldArray) =>
        oldArray.map((el) =>
          el.index === i ? { ...el, value: consetValue } : el
        )
      );
    }
  };

  const onRoleChange = (e, i, index) => {
    const consetValue = e.value;
    setSelectedRole((prev) => {
      const newSelectedSiteName = [...prev];
      newSelectedSiteName[index] = {
        value: consetValue,
        label: consetValue,
      };
      return newSelectedSiteName;
    });

    const consent = {
      index: i,
      value: consetValue,
    };

    const found = changeRoleType.some((el) => el.index === i);

    if (!found) {
      setChangeRoleType((oldArray) => [...oldArray, consent]);
    } else {
      setChangeRoleType((oldArray) =>
        oldArray.map((el) =>
          el.index === i ? { ...el, value: consetValue } : el
        )
      );
    }
  };

  const onIrtChange = (e, i, index) => {
    setSelectedRole((prev) => {
      const newSelectedSiteName = [...prev];
      newSelectedSiteName[index] = true;
      return newSelectedSiteName;
    });
    let consetValue = e.value;
    let consent = {
      index: i,
      value: parseInt(consetValue),
    };

    const foundIndex = changeIRTType.findIndex((el) => el.index === i);
    if (foundIndex === -1) {
      setChangeIRTType((oldarray) => [...oldarray, consent]);
    } else {
      setChangeIRTType((oldarray) =>
        oldarray.map((el) => {
          if (el.index === i) {
            return { ...el, value: parseInt(consetValue) };
          }
          return el;
        })
      );
    }
  };

  const onSiteNumberChange = (e, i, index) => {
    const selectedSiteNumber = e.value;
    const selectedItem = change.sideData.find(
      (item) => item.site_number === selectedSiteNumber
    );
    const selectedCountry1 = selectedItem.country;
    const selectedName = selectedItem.site_name;

    let consent = {
      index: i,
      value: selectedCountry1,
    };
    const found1 = changeCountry.some((el) => el.index === i);
    if (!found1) {
      setChangeCountry((oldarray) => [...oldarray, consent]);
    } else {
      const updatedArray = changeCountry.map((el) =>
        el.index === i ? { ...el, value: selectedCountry1 } : el
      );
      setChangeCountry(updatedArray);
    }
    let consent1 = {
      index: i,
      value: selectedName,
    };
    setSelectedCountry((prev) => {
      const newSelectedCountry = [...prev];
      newSelectedCountry[index] = {
        value: selectedCountry1,
        label: selectedCountry1,
      };
      return newSelectedCountry;
    });

    setSelectedSiteName((prev) => {
      const newSelectedSiteName = [...prev];
      newSelectedSiteName[index] = {
        value: selectedName,
        label: selectedName,
      };
      return newSelectedSiteName;
    });

    setSelectedSiteNumber((prev) => {
      const newSelectedSiteNumber = [...prev];
      newSelectedSiteNumber.splice(index, 1, {
        value: e.value,
        label: e.value,
      });
      return newSelectedSiteNumber;
    });

    const found2 = changeSiteNameType.some((el) => el.index === i);
    if (!found2) {
      setChangeSiteNameType((oldarray) => [...oldarray, consent1]);
    } else {
      const updatedArray = changeSiteNameType.map((el) =>
        el.index === i ? { ...el, value: selectedName } : el
      );
      setChangeSiteNameType(updatedArray);
    }
    let consetValue = e.value;
    consent = {
      index: i,
      value: consetValue,
    };

    const found = changeSiteNumberType.some((el) => el.index === i);
    if (!found) {
      setChangeSiteNumberType((oldarray) => [...oldarray, consent]);
    } else {
      const index = changeSiteNumberType.findIndex((el) => el.index === i);
      let updatedArray = [...changeSiteNumberType];
      updatedArray[index].value = consetValue;
      setChangeSiteNumberType(updatedArray);
    }
  };
  const onSiteNameChange = (e, i, index) => {
    const selectedSiteName = e.value;
    const selectedItem = change.sideData.find(
      (item) => item.site_name === selectedSiteName
    );
    const selectedCountry = selectedItem.country;
    const selectedSiteNumber = selectedItem.site_number;

    let consent = {
      index: i,
      value: selectedCountry,
    };
    const found1 = changeCountry.some((el) => el.index === i);
    if (!found1) {
      setChangeCountry((oldarray) => [...oldarray, consent]);
    } else {
      const updatedArray = changeCountry.map((el) =>
        el.index === i ? { ...el, value: selectedCountry } : el
      );
      setChangeCountry(updatedArray);
    }

    let consent1 = {
      index: i,
      value: selectedSiteNumber,
    };
    const found2 = changeSiteNumberType.some((el) => el.index === i);
    if (!found2) {
      setChangeSiteNumberType((oldarray) => [...oldarray, consent1]);
    } else {
      const updatedArray = changeSiteNumberType.map((el) =>
        el.index === i ? { ...el, value: selectedSiteNumber } : el
      );
      setChangeSiteNumberType(updatedArray);
    }

    let consent2 = {
      index: i,
      value: selectedSiteName,
    };
    const found3 = changeSiteNameType.some((el) => el.index === i);
    if (!found3) {
      setChangeSiteNameType((oldarray) => [...oldarray, consent2]);
    } else {
      const updatedArray = changeSiteNameType.map((el) =>
        el.index === i ? { ...el, value: selectedSiteName } : el
      );
      setChangeSiteNameType(updatedArray);
    }

    setSelectedCountry((prev) => {
      const newSelectedCountry = [...prev];
      newSelectedCountry[index] = {
        value: selectedCountry,
        label: selectedCountry,
      };
      return newSelectedCountry;
    });

    setSelectedSiteNumber((prev) => {
      const newSelectedSiteNumber = [...prev];
      newSelectedSiteNumber[index] = {
        value: selectedSiteNumber,
        label: selectedSiteNumber,
      };
      return newSelectedSiteNumber;
    });

    setSelectedSiteName((prev) => {
      const newSelectedSiteName = [...prev];
      newSelectedSiteName[index] = {
        value: selectedSiteName,
        label: selectedSiteName,
      };
      return newSelectedSiteName;
    });
  };

  const updateReaderDetails = async (reader_id, index) => {
    try {
      const index = changeCountry.findIndex((el) => el.index === reader_id);

      let country = "";
      if (index !== -1) {
        country = changeCountry[index].value;
      }
      const tindex = changeUserType.findIndex((el) => el.index === reader_id);
      let type = "";
      if (tindex !== -1) {
        type = changeUserType[tindex].value;
      }
      let body = {};
      let role = "";
      let irt = "";
      let siteNumber = "";
      let siteName = "";

      let binded = "";

      if (localStorage.getItem("user_id") === "56Ek4feL/1A8mZgIKQWEqg==") {
        const roleIndex = changeRoleType.findIndex(
          (el) => el.index === reader_id
        );
        if (roleIndex !== -1) {
          role = changeRoleType[roleIndex].value;
        }

        const irtIndex = changeIRTType.findIndex(
          (el) => el.index === reader_id
        );
        if (irtIndex !== -1) {
          irt = changeIRTType[irtIndex].value;
        }

        const blindedIndex = changeBlindedType.findIndex(
          (el) => el.index === reader_id
        );
        if (blindedIndex !== -1) {
          binded = changeBlindedType[blindedIndex].value;
        }

        const siteNumberIndex = changeSiteNumberType.findIndex(
          (el) => el.index === reader_id
        );
        if (siteNumberIndex !== -1) {
          siteNumber = changeSiteNumberType[siteNumberIndex].value;
        }

        const siteNameIndex = changeSiteNameType.findIndex(
          (el) => el.index === reader_id
        );
        if (siteNameIndex !== -1) {
          siteName = changeSiteNameType[siteNameIndex].value;
        }

        if (
          country !== "" ||
          type !== "" ||
          role !== "" ||
          irt !== "" ||
          binded !== "" ||
          siteNumber !== "" ||
          siteName !== ""
        ) {
          body = {
            type: 1,
            readerId: reader_id,
            userStatus: type,
            country: country,
            binded: binded,
            irt: irt,
            role: role,
            siteNumber: siteNumber,
            siteName: siteName,
          };
        }
      } else {
        if (country !== "" || type !== "") {
          loader("show");
          body = {
            type: 0,
            readerId: reader_id,
            userStatus: type,
            country: country,
          };
        }
      }

      if (Object.keys(body).length !== 0) {
        const res = await postData(ENDPOINT.READERSTATUSUPDATE, body);
        const libDataIndex = readerDataList.findIndex(
          (el) => el.id === reader_id
        );

        if (country !== "") {
          readerDataList[libDataIndex].country = country;
        }

        if (type !== "") {
          let userTypeValue = userTypeValues?.[type];
          readerDataList[libDataIndex].user_status = userTypeValue;
        }

        if (role !== "") {
          readerDataList[libDataIndex].role = role;
        }

        if (irt !== "") {
          readerDataList[libDataIndex].irt = irt == 1 ? "Yes" : "No";
        }
        if (binded !== "") {
          readerDataList[libDataIndex].binded = binded;
        }
        if (siteName !== "") {
          readerDataList[libDataIndex].siteName = siteName;
        }
        if (siteNumber !== "") {
          readerDataList[libDataIndex].siteNumber = siteNumber;
        }

        const newData = readerDataList;
        setReaderDataList(newData);
        setUpdateFlag(updateflag + 1);
        loader("hide");
        popup_alert({
          visible: "show",
          message: "Your Profile has been updated successfully!",
          type: "success",
          redirect: "",
        });
      } else {
        toast.warning("Nothing to update.");
      }
    } catch (err) {
      console.log("err", err);
      loader("hide");
    }
  };

  const clearFilter = () => {
    document.querySelectorAll("input")?.forEach((checkbox) => {
      checkbox.checked = false;
    });
    obj = {};

    if (filterApplyflag > 0) {
      // setApifilterObject({});
      let obj = {
        // status: ["Registered"],
        // "contact Type": ["HCP"],
      };

      setAppliedFilter(obj);
      setFilterObject(obj);
      setReaderDataList([]);
      // setAppliedFilter({
      //   status: ["Registered"],
      //   "contact Type": ["HCP"],

      // })

      getReaderListData(page, obj, search);
      setSearch("");
    }
    setShowFilter(false);
  };

  const applyFilter = (e) => {
    e.preventDefault();
    setTotalCountFlag(false);
    setFlag(0);
    setFilterApplyflag(1);
    setReaderDataList([]);
    setFilterObject(appliedFilter);
    getReaderListData(page, appliedFilter, search);
    setShowFilter(false);
  };

  const removeindividualfilter = (key, index) => {
    let old_object = filterObject;

    old_object[key]?.splice(index, 1);
    if (old_object[key].includes("All")) {
      const allIndex = old_object[key]?.indexOf("All");
      old_object[key]?.splice(allIndex, 1);
    }
    if (old_object[key]?.length == 0) {
      delete old_object[key];
    }

    // old_object2[key]?.splice(index, 1);
    // if (old_object2[key]?.length == 0) {
    //   delete old_object2[key];
    // }
    if (Object.keys(old_object)?.length !== 0) {
      setFilterObject(old_object);
      // setApifilterObject(old_object2);
      setReaderDataList([]);
      getReaderListData(page, old_object);
    } else {
      //   let obj = { status: ["Registered"]
      // };
      setFilterObject({});
      // setApifilterObject(old_object2);
      setReaderDataList([]);
      getReaderListData(page, obj);
    }
  };

  const tabClicked = async (key, userId) => {
    setApiCallStatus(false);
    if (key == "usage") {
      let index = emailStats.findIndex((el) => el.userId == userId);
      if (index === -1) {
        let normal_data = emailStats;
        try {
          let body = {
            readerId: userId,
          };
          const res = await postData(ENDPOINT.READERACTIVITY, body);
          if (res?.data?.data) {
            let new_data = res?.data?.data;
            normal_data.push(new_data);
            setEmailStats(normal_data);
            setStatsFlag(statsFlag + 1);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else if (
      key == "change-tab" &&
      localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
    ) {
      const res = await getData(ENDPOINT.READER_USER_DROP);
      setChanges(res?.data?.data);
      setSiteNumber((prevSiteNumbers) => ({
        ...prevSiteNumbers,
        all: res?.data?.data?.siteNumber,
      }));
      setSiteName((prevSiteName) => ({
        ...prevSiteName,
        all: res?.data?.data?.siteName,
      }));
    }
    setApiCallStatus(true);
  };

  const showConfirmationPopup = (stateMsg, e, id) => {
    if (stateMsg == "delete") {
      setResetDataId(id);
      setCommonConfirmModelFun(() => deleteUser);
      setPopupMessage({
        message1: "You are about to remove this reader.",
        message2: "Are you sure you want to do this?",
        footerButton: "Yes Please!",
      });
      if (confirmationpopup) {
        setConfirmationPopup(false);
      } else {
        setConfirmationPopup(true);
      }
    }
  };

  const deleteUser = async (id) => {
    loader("show");
    try {
      await deleteData(ENDPOINT.DELETEREADER, id);
      loader("hide");
      popup_alert({
        visible: "show",
        message: "Reader has been deleted <br />successfully !",
        type: "success",
        redirect: "",
      });

      const updatedRes = readerDataList.filter((item) => item.id !== id);
      setReaderDataList(updatedRes);
      // }
      loader("hide");
    } catch (err) {
      loader("hide");
    }
    hideConfirmationModal();
  };

  const hideConfirmationModal = () => {
    setConfirmationPopup(false);
  };

  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <Row>
            <div className="top-header reader_list sticky">
              <div className="page-title">{/* <h2>CRM</h2> */}</div>
              <div className="top-right-action library_content_view">
                <div className="search-bar">
                  <form className="d-flex" onSubmit={(e) => submitHandler(e)}>
                    <input
                      className="form-control me-2"
                      type="text"
                      placeholder="Search by email or name"
                      aria-label="Search"
                      id="email_search"
                      onChange={(e) => searchChange(e)}
                    />
                    <button className="btn-outline-success" type="submit">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.8045 14.862L11.2545 10.312C12.1359 9.22334 12.6665 7.84 12.6665 6.33334C12.6665 2.84134 9.82522 0 6.33325 0C2.84128 0 0 2.84131 0 6.33331C0 9.82531 2.84132 12.6667 6.33328 12.6667C7.83992 12.6667 9.22325 12.136 10.3119 11.2547L14.8619 15.8047C14.9919 15.9347 15.1625 16 15.3332 16C15.5039 16 15.6745 15.9347 15.8045 15.8047C16.0652 15.544 16.0652 15.1227 15.8045 14.862ZM6.33328 11.3333C3.57597 11.3333 1.33333 9.09066 1.33333 6.33331C1.33333 3.57597 3.57597 1.33331 6.33328 1.33331C9.0906 1.33331 11.3332 3.57597 11.3332 6.33331C11.3332 9.09066 9.09057 11.3333 6.33328 11.3333Z"
                          fill="#97B6CF"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
                <div className="filter-by nav-item dropdown">
                  <button
                    className={
                      Object.keys(apifilterObject)?.length &&
                      filterApplyflag == 1
                        ? "btn btn-secondary dropdown filter_applied"
                        : "btn btn-secondary dropdown"
                    }
                    type="button"
                    id="dropdownMenuButton2"
                    onClick={() => setShowFilter((showfilter) => !showfilter)}
                  >
                    Filter By
                    {showfilter ? (
                      <svg
                        className="close-arrow"
                        width="13"
                        height="12"
                        viewBox="0 0 13 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="2.09896"
                          height="15.1911"
                          rx="1.04948"
                          transform="matrix(0.720074 0.693897 -0.720074 0.693897 11.0977 0)"
                          fill="#0066BE"
                        />
                        <rect
                          width="2.09896"
                          height="15.1911"
                          rx="1.04948"
                          transform="matrix(0.720074 -0.693897 0.720074 0.693897 0 1.45898)"
                          fill="#0066BE"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="filter-arrow"
                        width="16"
                        height="14"
                        viewBox="0 0 16 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.615385 2.46154H3.07692C3.07692 3.14031 3.62892 3.69231 4.30769 3.69231H5.53846C6.21723 3.69231 6.76923 3.14031 6.76923 2.46154H15.3846C15.7243 2.46154 16 2.18646 16 1.84615C16 1.50585 15.7243 1.23077 15.3846 1.23077H6.76923C6.76923 0.552 6.21723 0 5.53846 0H4.30769C3.62892 0 3.07692 0.552 3.07692 1.23077H0.615385C0.275692 1.23077 0 1.50585 0 1.84615C0 2.18646 0.275692 2.46154 0.615385 2.46154Z"
                          fill="#97B6CF"
                        ></path>
                        <path
                          d="M15.3846 6.15362H11.6923C11.6923 5.47485 11.1403 4.92285 10.4615 4.92285H9.23077C8.552 4.92285 8 5.47485 8 6.15362H0.615385C0.275692 6.15362 0 6.4287 0 6.76901C0 7.10931 0.275692 7.38439 0.615385 7.38439H8C8 8.06316 8.552 8.61516 9.23077 8.61516H10.4615C11.1403 8.61516 11.6923 8.06316 11.6923 7.38439H15.3846C15.7243 7.38439 16 7.10931 16 6.76901C16 6.4287 15.7243 6.15362 15.3846 6.15362Z"
                          fill="#97B6CF"
                        ></path>
                        <path
                          d="M15.3846 11.077H6.76923C6.76923 10.3982 6.21723 9.84619 5.53846 9.84619H4.30769C3.62892 9.84619 3.07692 10.3982 3.07692 11.077H0.615385C0.275692 11.077 0 11.352 0 11.6923C0 12.0327 0.275692 12.3077 0.615385 12.3077H3.07692C3.07692 12.9865 3.62892 13.5385 4.30769 13.5385H5.53846C6.21723 13.5385 6.76923 12.9865 6.76923 12.3077H15.3846C15.7243 12.3077 16 12.0327 16 11.6923C16 11.352 15.7243 11.077 15.3846 11.077Z"
                          fill="#97B6CF"
                        ></path>
                      </svg>
                    )}
                  </button>
                  {showfilter && (
                    <div
                      className="dropdown-menu filter-options"
                      aria-labelledby="dropdownMenuButton2"
                    >
                      <h4>Filter By</h4>

                      <Accordion defaultActiveKey="0" flush>
                        {Object.keys(filterdata)?.map(function (key, index) {
                          return (
                            <>
                              {filterdata[key]?.length > 0 ? (
                                <Accordion.Item
                                  className="card"
                                  eventKey={index}
                                >
                                  <Accordion.Header className="card-header">
                                    {key}
                                  </Accordion.Header>

                                  <Accordion.Body className="card-body">
                                    <ul>
                                      {filterdata[key]?.length
                                        ? filterdata[key]?.map(
                                            (item, index) => (
                                              <li key={index}>
                                                {item != "" ? (
                                                  <label className="select-multiple-option">
                                                    <input
                                                      type={
                                                        key == "status" ||
                                                        key == "Accounts" ||
                                                        key == "contact Type" ||
                                                        key == "userAction" ||
                                                        key == "Blinded" ||
                                                        key == "IRT" ||
                                                        key == "region" ||
                                                        key == "RTR?" ||
                                                        key ==
                                                          "Business Unit" ||
                                                        key ==
                                                          "webinarRegistered" ||
                                                        key ==
                                                          "Registered For Webinar" ||
                                                        key == "List"
                                                          ? "radio"
                                                          : "checkbox"
                                                      }
                                                      id={`custom-checkbox-tags-${index}`}
                                                      value={
                                                        typeof item == "object"
                                                          ? item?.title
                                                          : item
                                                      }
                                                      name={key}
                                                      checked={
                                                        typeof item == "object"
                                                          ? appliedFilter[
                                                              key
                                                            ]?.includes(item.id)
                                                            ? true
                                                            : false
                                                          : appliedFilter[
                                                              key
                                                            ]?.includes(item)
                                                          ? true
                                                          : false
                                                      }
                                                      // defaultChecked={
                                                      //   key == "contactType" &&
                                                      //   item == "HCP"
                                                      //     ? true
                                                      //     : filterObject?.hasOwnProperty(
                                                      //         key
                                                      //       )
                                                      //     ? filterObject[
                                                      //         key
                                                      //       ]?.indexOf(item) !==
                                                      //       -1
                                                      //     : false
                                                      // }

                                                      onChange={(e) =>
                                                        handleOnFilterChange(
                                                          e,
                                                          typeof item ==
                                                            "object"
                                                            ? item.id
                                                            : item,
                                                          index,
                                                          key,
                                                          [...filterdata[key]]
                                                        )
                                                      }
                                                    />
                                                    {typeof item == "object"
                                                      ? item?.title
                                                      : item}
                                                    {/* {key == "draft" &&
                                                      typeof item  == "string" && item == "0"
                                                      ? "live"
                                                      : key == "draft" &&  typeof item  == "string" &&
                                                        item == "1"
                                                      ? "draft" &&  typeof item  == "string"
                                                      : item} */}
                                                    <span className="checkmark"></span>
                                                  </label>
                                                ) : null}
                                              </li>
                                            )
                                          )
                                        : null}
                                    </ul>
                                  </Accordion.Body>
                                </Accordion.Item>
                              ) : null}
                            </>
                          );
                        })}
                      </Accordion>

                      <div className="filter-footer">
                        <Button
                          className="btn btn-primary btn-bordered"
                          onClick={clearFilter}
                        >
                          Clear
                        </Button>
                        <Button
                          className="btn btn-primary btn-filled"
                          onClick={applyFilter}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="clear-search">
                  <button
                    className="btn print"
                    title="Download stats"
                    onClick={() => {
                      getDownloadData(page, obj, search);
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.3335 13.125C18.1125 13.125 17.9005 13.2128 17.7442 13.3691C17.588 13.5254 17.5002 13.7373 17.5002 13.9583V15.1775C17.4995 15.7933 17.2546 16.3836 16.8192 16.819C16.3838 17.2544 15.7934 17.4993 15.1777 17.5H4.82266C4.2069 17.4993 3.61655 17.2544 3.18114 16.819C2.74573 16.3836 2.50082 15.7933 2.50016 15.1775V13.9583C2.50016 13.7373 2.41237 13.5254 2.25609 13.3691C2.0998 13.2128 1.88784 13.125 1.66683 13.125C1.44582 13.125 1.23385 13.2128 1.07757 13.3691C0.921293 13.5254 0.833496 13.7373 0.833496 13.9583V15.1775C0.834599 16.2351 1.25524 17.2492 2.00311 17.997C2.75099 18.7449 3.76501 19.1656 4.82266 19.1667H15.1777C16.2353 19.1656 17.2493 18.7449 17.9972 17.997C18.7451 17.2492 19.1657 16.2351 19.1668 15.1775V13.9583C19.1668 13.7373 19.079 13.5254 18.9228 13.3691C18.7665 13.2128 18.5545 13.125 18.3335 13.125Z"
                        fill="#0066BE"
                      />
                      <path
                        d="M14.7456 9.20249C14.5893 9.04626 14.3774 8.9585 14.1564 8.9585C13.9355 8.9585 13.7235 9.04626 13.5673 9.20249L10.8231 11.9467L10.8333 1.77108C10.8333 1.55006 10.7455 1.3381 10.5893 1.18182C10.433 1.02554 10.221 0.937744 10 0.937744C9.77899 0.937744 9.56702 1.02554 9.41074 1.18182C9.25446 1.3381 9.16667 1.55006 9.16667 1.77108L9.15643 11.9467L6.41226 9.20249C6.25509 9.05069 6.04459 8.96669 5.82609 8.96859C5.60759 8.97049 5.39858 9.05813 5.24408 9.21264C5.08957 9.36715 5.00193 9.57615 5.00003 9.79465C4.99813 10.0131 5.08213 10.2236 5.23393 10.3808L9.40059 14.5475C9.478 14.6251 9.56996 14.6867 9.6712 14.7287C9.77245 14.7707 9.88098 14.7923 9.99059 14.7923C10.1002 14.7923 10.2087 14.7707 10.31 14.7287C10.4112 14.6867 10.5032 14.6251 10.5806 14.5475L14.7473 10.3808C14.9033 10.2243 14.9907 10.0123 14.9904 9.79131C14.9901 9.57034 14.902 9.35854 14.7456 9.20249Z"
                        fill="#0066BE"
                      />
                    </svg>
                  </button>
                </div>

                <div className="clear-search">
                  {deletestatus ? (
                    <button
                      className="btn btn-outline-primary cancel"
                      title="Cancel delete"
                      onClick={(e) => setDeleteStatus(false)}
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-primary"
                      title="Delete"
                      onClick={(e) => setDeleteStatus(true)}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.84 22.25H8.15989C7.3915 22.2389 6.65562 21.9381 6.09941 21.4079C5.5432 20.8776 5.20765 20.157 5.15985 19.39L4.24984 5.55C4.24518 5.44966 4.26045 5.34938 4.29478 5.25498C4.32911 5.16057 4.38181 5.07391 4.44985 5C4.51993 4.9234 4.60479 4.86177 4.69931 4.81881C4.79382 4.77584 4.89606 4.75244 4.99985 4.75H19C19.1029 4.74977 19.2046 4.7707 19.2991 4.81148C19.3935 4.85226 19.4785 4.91202 19.5488 4.98704C19.6192 5.06207 19.6733 5.15077 19.7079 5.24761C19.7426 5.34446 19.7569 5.44739 19.75 5.55L18.88 19.39C18.8317 20.1638 18.4905 20.8902 17.9258 21.4214C17.3611 21.9527 16.6153 22.249 15.84 22.25ZM5.83986 6.25L6.60987 19.3C6.63531 19.6935 6.80978 20.0625 7.09775 20.3319C7.38573 20.6013 7.76555 20.7508 8.15989 20.75H15.84C16.2336 20.7485 16.6121 20.5982 16.8996 20.3292C17.1871 20.0603 17.3622 19.6927 17.39 19.3L18.2 6.3L5.83986 6.25Z"
                          fill="#0066BE"
                        />
                        <path
                          d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z"
                          fill="#0066BE"
                        />
                        <path
                          d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z"
                          fill="#0066BE"
                        />
                        <path
                          d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z"
                          fill="#0066BE"
                        />
                        <path
                          d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z"
                          fill="#0066BE"
                        />
                        <path
                          d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z"
                          fill="#0066BE"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {Object.keys(filterObject)?.length && filterApplyflag == 1 ? (
              <div className="apply-filter">
                {/* <h6>Applied filters</h6> */}
                <div className="filter-block">
                  <div className="filter-block-left full">
                    {Object.keys(filterObject)?.map((key, index) => {
                      return (
                        <>
                          {filterObject[key]?.length ? (
                            <div className="filter-div">
                              <div className="filter-div-title">
                                <span>{key} |</span>
                              </div>
                              <div className="filter-div-list">
                                {filterObject[key]?.map((item, index) => (
                                  <div
                                    className="filter-result"
                                    id={item}
                                    rt={index}
                                    onClick={(event) => {
                                      removeindividualfilter(key, index);
                                    }}
                                  >
                                    {key == "draft" && item == "0"
                                      ? "live"
                                      : key == "draft" && item == "1"
                                      ? "draft"
                                      : key == "Registered For Title"
                                      ? filterdata?.[
                                          "Registered For Title"
                                        ]?.find((element) => element.id == item)
                                          ?.title
                                      : item}
                                    <img
                                      src={path_image + "filter-close.svg"}
                                      alt="Close-filter"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : null}
                        </>
                      );
                    })}
                  </div>
                  <div className="clear-filter">
                    <Button
                      className="btn btn-outline-primary btn-bordered"
                      onClick={clearFilter}
                    >
                      Remove All
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="library-content-box-layuot readerlist d-flex">
              <h4>
                <span>Total HCP</span> | {totalCountFlag ? totalCount : 0}
              </h4>
              {readerDataList?.length || updateflag ? (
                readerDataList.map((data, index) => {
                  return (
                    <>
                      <div className="doc-content-main-box col" key={index}>
                        <div className="doc-content-header">
                          <div className="doc-content">
                            <h4>{data?.name}</h4>
                          </div>
                        </div>
                        <div className="tabs-data">
                          <Tabs
                            onSelect={(key) => tabClicked(key, data?.id)}
                            defaultActiveKey="personal-details"
                            fill
                          >
                            <Tab
                              eventKey="personal-details"
                              title="Personal Details"
                              className="flex-column justify-content-between"
                            >
                              <div className="tab-panel d-flex flex-column justify-content-between">
                                <ul className="tab-mail-list">
                                  {!data?.ipFlag ? (
                                    <li>
                                      <h6 className="tab-content-title">
                                        Email
                                      </h6>
                                      <h6>
                                        {data?.email ? data?.email : "N/A"}
                                      </h6>
                                    </li>
                                  ) : (
                                    ""
                                  )}
                                  <li>
                                    <h6 className="tab-content-title">
                                      Country
                                    </h6>
                                    <h6>
                                      {data?.country
                                        ? data?.country == "B&H"
                                          ? "Bosnia and Herzegovina"
                                          : data?.country
                                        : "N/A"}
                                    </h6>
                                  </li>

                                  {localStorage.getItem("user_id") ==
                                    "56Ek4feL/1A8mZgIKQWEqg==" &&
                                  localStorage.getItem("group_id") == "3" ? (
                                    <>
                                      <li>
                                        <h6 className="tab-content-title">
                                          Role
                                        </h6>
                                        <h6>
                                          {data?.role
                                            ? data.role != 0
                                              ? data.role
                                              : "N/A"
                                            : "N/A"}
                                        </h6>
                                      </li>

                                      <li>
                                        <h6 className="tab-content-title">
                                          Blinded
                                        </h6>
                                        <h6>
                                          {data?.binded ? data?.binded : "N/A"}
                                        </h6>
                                      </li>
                                      <li>
                                        <h6 className="tab-content-title">
                                          IRT
                                        </h6>
                                        <h6>{data?.irt ? data?.irt : "N/A"}</h6>
                                      </li>
                                      <li>
                                        <h6 className="tab-content-title">
                                          Site Number
                                        </h6>
                                        <h6>
                                          {data?.siteNumber
                                            ? data?.siteNumber
                                            : "N/A"}
                                        </h6>
                                      </li>
                                      <li>
                                        <h6 className="tab-content-title">
                                          Site Name
                                        </h6>
                                        <h6>
                                          {data?.siteName
                                            ? data?.siteName
                                            : "N/A"}
                                        </h6>
                                      </li>
                                    </>
                                  ) : (
                                    <>
                                      {data?.ipAddress || data?.ipFlag ? (
                                        ""
                                      ) : (
                                        <li>
                                          <h6 className="tab-content-title">
                                            User Status
                                          </h6>
                                          <h6>{data?.user_status}</h6>
                                        </li>
                                      )}

                                      {data?.ipAddress || data?.ipFlag ? (
                                        ""
                                      ) : (
                                        <li>
                                          <h6 className="tab-content-title">
                                            Interests
                                          </h6>
                                          <h6>
                                            {data?.interests
                                              ? data?.interests
                                              : "N/A"}
                                          </h6>
                                        </li>
                                      )}

                                      {data?.ipAddress || data?.ipFlag ? (
                                        ""
                                      ) : (
                                        <li>
                                          <h6 className="tab-content-title">
                                            Last Email
                                          </h6>
                                          <h6>
                                            {data?.last_email
                                              ? data?.last_email
                                              : "N/A"}
                                          </h6>
                                        </li>
                                      )}
                                      {data?.ipFlag ? (
                                        <li>
                                          <h6 className="tab-content-title">
                                            Date
                                          </h6>
                                          <h6>
                                            {data?.date ? data?.date : "N/A"}
                                          </h6>
                                        </li>
                                      ) : (
                                        ""
                                      )}
                                      {/* <li>
                                        <h6 className="tab-content-title">
                                          Last Activity
                                        </h6>
                                        <h6>
                                          {data?.last_activity
                                            ? data?.last_activity
                                            : "N/A"}
                                        </h6>
                                      </li> */}
                                    </>
                                  )}
                                </ul>
                              </div>
                              <div className="data-main-footer-sec">
                                {deletestatus ? (
                                  <div className="dlt_btn">
                                    <button
                                      onClick={(e) =>
                                        showConfirmationPopup(
                                          "delete",
                                          e,
                                          data?.id
                                        )
                                      }
                                    >
                                      <img
                                        src={path_image + "delete.svg"}
                                        alt="Delete Row"
                                      />
                                    </button>
                                  </div>
                                ) : !data?.ipFlag ? (
                                  <div className="data-main-footer-sec-inner">
                                    <div className="footer-btn d-flex justify-content-end">
                                      <Link
                                        to="/reader-edit"
                                        className="btn btn-primary btn-filled"
                                        state={{ id: data.id }}
                                      >
                                        Edit
                                      </Link>
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </Tab>
                            <Tab
                              eventKey="usage"
                              title="Usage"
                              className="flex-column justify-content-between"
                            >
                              <div className="data-main-box tab-panel d-flex flex-column justify-content-between">
                                <ul className="tab-mail-list data">
                                  {!data?.ipFlag ? (
                                    <>
                                      {" "}
                                      <li>
                                        <h6 className="tab-content-title">
                                          Emails sent
                                          <LinkWithTooltip
                                            tooltip="Number of unique HCPs who have opened the content (based on ip address, device & browser)."
                                            href="#"
                                          >
                                            <img
                                              src={
                                                path_image +
                                                "info_circle_icon.svg"
                                              }
                                              alt="refresh-btn"
                                            />
                                          </LinkWithTooltip>
                                        </h6>
                                        <div className="data-progress send">
                                          <ProgressBar
                                            variant="default"
                                            now={100}
                                            label={
                                              emailStats.findIndex(
                                                (el) => el.userId == data?.id
                                              ) !== -1
                                                ? emailStats[
                                                    emailStats.findIndex(
                                                      (el) =>
                                                        el.userId == data?.id
                                                    )
                                                  ]?.emailSent
                                                : "Loading"
                                            }
                                          />
                                        </div>
                                      </li>
                                      <li>
                                        <h6 className="tab-content-title">
                                          Emails opened
                                          <LinkWithTooltip
                                            tooltip="Number of opening counts for specific article."
                                            href="#"
                                          >
                                            <img
                                              src={
                                                path_image +
                                                "info_circle_icon.svg"
                                              }
                                              alt="refresh-btn"
                                            />
                                          </LinkWithTooltip>
                                        </h6>
                                        <div className="data-progress open">
                                          <ProgressBar
                                            variant="default"
                                            now={15}
                                            label={
                                              emailStats.findIndex(
                                                (el) => el.userId == data?.id
                                              ) !== -1
                                                ? emailStats[
                                                    emailStats.findIndex(
                                                      (el) =>
                                                        el.userId == data?.id
                                                    )
                                                  ]?.emailOpen
                                                : "Loading"
                                            }
                                          />
                                        </div>
                                      </li>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                  <li>
                                    <h6 className="tab-content-title">
                                      Content delivered
                                      <LinkWithTooltip
                                        tooltip="Number of HCPs who have register for or activated the content."
                                        href="#"
                                      >
                                        <img
                                          src={
                                            path_image + "info_circle_icon.svg"
                                          }
                                          alt="refresh-btn"
                                        />
                                      </LinkWithTooltip>
                                    </h6>
                                    <div className="data-progress delivered">
                                      <ProgressBar
                                        variant="default"
                                        now={2}
                                        label={
                                          emailStats.findIndex(
                                            (el) => el.userId == data?.id
                                          ) !== -1
                                            ? emailStats[
                                                emailStats.findIndex(
                                                  (el) => el.userId == data?.id
                                                )
                                              ]?.contentDeliverd
                                            : "Loading"
                                        }
                                      />
                                    </div>
                                  </li>
                                  <li>
                                    <h6 className="tab-content-title">
                                      Content with RTR
                                      <LinkWithTooltip
                                        tooltip="Number of unique HCPs who have opened the content (based on ip address, device & browser)."
                                        href="#"
                                      >
                                        <img
                                          src={
                                            path_image + "info_circle_icon.svg"
                                          }
                                          alt="refresh-btn"
                                        />
                                      </LinkWithTooltip>
                                    </h6>
                                    <div className="data-progress rtr">
                                      <ProgressBar
                                        variant="default"
                                        now={5}
                                        label={
                                          emailStats.findIndex(
                                            (el) => el.userId == data?.id
                                          ) !== -1
                                            ? emailStats[
                                                emailStats.findIndex(
                                                  (el) => el.userId == data?.id
                                                )
                                              ]?.rtr
                                            : "Loading"
                                        }
                                      />
                                    </div>
                                  </li>
                                  <li>
                                    <h6 className="tab-content-title">
                                      QR openings
                                      <LinkWithTooltip
                                        tooltip="Number of opening counts for specific article."
                                        href="#"
                                      >
                                        <img
                                          src={
                                            path_image + "info_circle_icon.svg"
                                          }
                                          alt="refresh-btn"
                                        />
                                      </LinkWithTooltip>
                                    </h6>
                                    <div className="data-progress qr-opening">
                                      <ProgressBar
                                        variant="default"
                                        now={11}
                                        label={
                                          emailStats.findIndex(
                                            (el) => el.userId == data?.id
                                          ) !== -1
                                            ? emailStats[
                                                emailStats.findIndex(
                                                  (el) => el.userId == data?.id
                                                )
                                              ]?.qr
                                            : "Loading"
                                        }
                                      />
                                    </div>
                                  </li>
                                  <li>
                                    <h6 className="tab-content-title">
                                      GO openings
                                      <LinkWithTooltip
                                        tooltip="Number of HCPs who have register for or activated the content."
                                        href="#"
                                      >
                                        <img
                                          src={
                                            path_image + "info_circle_icon.svg"
                                          }
                                          alt="refresh-btn"
                                        />
                                      </LinkWithTooltip>
                                    </h6>
                                    <div className="data-progress go-opening">
                                      <ProgressBar
                                        variant="default"
                                        now={25}
                                        label={
                                          emailStats.findIndex(
                                            (el) => el.userId == data?.id
                                          ) !== -1
                                            ? emailStats[
                                                emailStats.findIndex(
                                                  (el) => el.userId == data?.id
                                                )
                                              ]?.go
                                            : "Loading"
                                        }
                                      />
                                    </div>
                                  </li>
                                  <li>
                                    <h6 className="tab-content-title">
                                      Content openings
                                      <LinkWithTooltip
                                        tooltip="Number of HCPs who have register for or activated the content."
                                        href="#"
                                      >
                                        <img
                                          src={
                                            path_image + "info_circle_icon.svg"
                                          }
                                          alt="refresh-btn"
                                        />
                                      </LinkWithTooltip>
                                    </h6>
                                    <div className="data-progress content-opening">
                                      <ProgressBar
                                        variant="default"
                                        now={19}
                                        label={
                                          emailStats.findIndex(
                                            (el) => el.userId == data?.id
                                          ) !== -1
                                            ? emailStats[
                                                emailStats.findIndex(
                                                  (el) => el.userId == data?.id
                                                )
                                              ]?.contentOpening
                                            : "Loading"
                                        }
                                      />
                                    </div>
                                  </li>
                                  {!data?.ipFlag ? (
                                    <li className="last-activity">
                                      <h6 className="tab-content-title">
                                        Last Activity
                                      </h6>
                                      <div className="data-progress content-opening">
                                        <ProgressBar
                                          variant="default"
                                          now={19}
                                          label={
                                            emailStats.findIndex(
                                              (el) => el.userId == data?.id
                                            ) !== -1
                                              ? emailStats[
                                                  emailStats.findIndex(
                                                    (el) =>
                                                      el.userId == data?.id
                                                  )
                                                ]?.LastActivity
                                              : "Loading"
                                          }
                                        />
                                      </div>
                                    </li>
                                  ) : (
                                    ""
                                  )}
                                </ul>
                              </div>
                              <div className="data-main-footer-sec">
                                <div className="data-main-footer-sec-inner">
                                  <div className="footer-btn d-flex justify-content-end">
                                    <Link
                                      className="btn btn-primary btn-bordered"
                                      to="/timeline-detail"
                                      state={{ readerId: data?.id }}
                                    >
                                      See time line
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </Tab>
                            {!data?.ipFlag ? (
                              <Tab eventKey="change-tab" title="Change">
                                <div className="data-main-box change-tab-main-box">
                                  <ul className="tab-mail-list data change">
                                    {localStorage.getItem("user_id") ==
                                      "56Ek4feL/1A8mZgIKQWEqg==" && change ? (
                                      <>
                                        {/*console.log(
                                        types.findIndex(
                                          (el) =>
                                          el.label.toLowerCase() == data?.user_status.toLowerCase()
                                        ))*/}
                                        {/*<li>
                                          <h6 className="tab-content-title">
                                            User Status
                                          </h6>
                                          <div className="select-dropdown-wrapper">
                                            <div className="select">
                                              <Select
                                                options={types}
                                                defaultValue={
                                                  types[
                                                    types.findIndex(
                                                      (el) =>
                                                        el.label.toLowerCase() ==
                                                        data?.user_status?.toLowerCase()
                                                    )
                                                  ]
                                                }
                                                onChange={(event) =>
                                                  onUserChange(event, data.id)
                                                }
                                                id={"user_type_" + data?.id}
                                                className="dropdown-basic-button split-button-dropup"
                                                isClearable
                                              />
                                            </div>
                                          </div>
                                        </li>*/}
                                        <li>
                                          <h6 className="tab-content-title">
                                            Blinded
                                          </h6>
                                          <div className="select-dropdown-wrapper">
                                            <div className="select">
                                              <Select
                                                options={change?.blind_type}
                                                value={
                                                  changeBlindedType?.[
                                                    changeBlindedType.findIndex(
                                                      (el) =>
                                                        el.index == data.id
                                                    )
                                                  ]?.value == "blinded"
                                                    ? change?.blind_type[0]
                                                    : changeBlindedType?.[
                                                        changeBlindedType.findIndex(
                                                          (el) =>
                                                            el.index == data.id
                                                        )
                                                      ]?.value == "unblinded"
                                                    ? change?.blind_type[1]
                                                    : data?.binded === "Yes"
                                                    ? change?.blind_type[0]
                                                    : change?.blind_type[1]
                                                }
                                                onChange={(event) =>
                                                  onBlindedChange(
                                                    event,
                                                    data.id
                                                  )
                                                }
                                                id={"blinded_type" + data?.id}
                                                className="dropdown-basic-button split-button-dropup"
                                                isClearable
                                              />
                                            </div>
                                          </div>
                                        </li>
                                        <li>
                                          <h6 className="tab-content-title">
                                            IRT
                                          </h6>
                                          <div className="select-dropdown-wrapper">
                                            <div className="select">
                                              <Select
                                                options={change?.irt}
                                                value={
                                                  changeIRTType?.[
                                                    changeIRTType.findIndex(
                                                      (el) =>
                                                        el.index == data.id
                                                    )
                                                  ]?.value == 1
                                                    ? change?.irt[0]
                                                    : changeIRTType?.[
                                                        changeIRTType.findIndex(
                                                          (el) =>
                                                            el.index == data.id
                                                        )
                                                      ]?.value == 0
                                                    ? change?.irt[1]
                                                    : data?.irt === "Yes"
                                                    ? change?.irt[0]
                                                    : change?.irt[1]
                                                }
                                                onChange={(event) => {
                                                  onIrtChange(
                                                    event,
                                                    data.id,
                                                    index
                                                  );
                                                }}
                                                id={"irt_type" + data?.id}
                                                className="dropdown-basic-button split-button-dropup"
                                                isClearable
                                              />
                                            </div>
                                          </div>
                                        </li>
                                        <li>
                                          <h6 className="tab-content-title">
                                            Role
                                          </h6>
                                          <div className="select-dropdown-wrapper">
                                            <div className="select">
                                              {(
                                                changeIRTType.filter(
                                                  (el) => el.index == data.id
                                                )?.length
                                                  ? changeIRTType.filter(
                                                      (el) =>
                                                        el.index == data.id
                                                    )?.[0]?.value
                                                  : data?.irt == "Yes"
                                                  ? true
                                                  : false
                                              ) ? (
                                                <Select
                                                  options={change?.userIrtRoles}
                                                  value={
                                                    selectedRole[index] !=
                                                      undefined &&
                                                    selectedRole[index] != true
                                                      ? selectedRole[index]
                                                      : selectedRole[index] ==
                                                        true
                                                      ? null
                                                      : change?.userIrtRoles.find(
                                                          (roleObj) =>
                                                            roleObj.value ===
                                                            data?.role
                                                        )
                                                  }
                                                  onChange={(event) =>
                                                    onRoleChange(
                                                      event,
                                                      data.id,
                                                      index
                                                    )
                                                  }
                                                  id={"role_" + data?.id}
                                                  className="dropdown-basic-button split-button-dropup"
                                                  isClearable
                                                  placeholder="Select Role"
                                                />
                                              ) : (
                                                <Select
                                                  options={change?.role}
                                                  value={
                                                    selectedRole[index] !=
                                                      undefined &&
                                                    selectedRole[index] != true
                                                      ? selectedRole[index]
                                                      : selectedRole[index] ==
                                                        true
                                                      ? null
                                                      : change?.role.find(
                                                          (roleObj) =>
                                                            roleObj.value ===
                                                            data?.role
                                                        )
                                                  }
                                                  onChange={(event) =>
                                                    onRoleChange(
                                                      event,
                                                      data.id,
                                                      index
                                                    )
                                                  }
                                                  id={"role_" + data?.id}
                                                  className="dropdown-basic-button split-button-dropup"
                                                  isClearable
                                                  placeholder="Select Role"
                                                />
                                              )}
                                            </div>
                                          </div>
                                        </li>
                                        <li>
                                          <h6 className="tab-content-title">
                                            Country
                                          </h6>
                                          <div className="select-dropdown-wrapper">
                                            <div className="select">
                                              <Select
                                                ref={defaultCountry}
                                                options={countryAll}
                                                value={
                                                  selectedCountry[index] !==
                                                  undefined
                                                    ? selectedCountry[index]
                                                    : data?.country === "B&H"
                                                    ? countryAll.find(
                                                        (el) =>
                                                          el.value ===
                                                          "Bosnia and Herzegovina"
                                                      )
                                                    : countryAll.find(
                                                        (el) =>
                                                          el.value ===
                                                          data?.country
                                                      )
                                                }
                                                onChange={(event) =>
                                                  onCountryChange(
                                                    event,
                                                    data.id,
                                                    index
                                                  )
                                                }
                                                id={data.id}
                                                className="dropdown-basic-button split-button-dropup"
                                                isClearable
                                              />
                                            </div>
                                          </div>
                                        </li>
                                        <li>
                                          <h6 className="tab-content-title">
                                            Site Number
                                          </h6>
                                          <div className="select-dropdown-wrapper">
                                            <div className="select">
                                              <Select
                                                options={
                                                  siteNumber[index] != undefined
                                                    ? siteNumber[index]
                                                    : siteNumber?.all
                                                }
                                                value={
                                                  selectedSiteNumber[index] !=
                                                    undefined &&
                                                  selectedSiteNumber[index] !=
                                                    true
                                                    ? selectedSiteNumber[index]
                                                    : selectedSiteNumber[
                                                        index
                                                      ] == true
                                                    ? null
                                                    : change?.siteNumber[
                                                        change?.siteNumber.findIndex(
                                                          (el) =>
                                                            el.label.toLowerCase() ===
                                                            data?.siteNumber?.toLowerCase()
                                                        )
                                                      ]
                                                }
                                                // placeholder="Select Site Number"
                                                onChange={(event) =>
                                                  onSiteNumberChange(
                                                    event,
                                                    data.id,
                                                    index
                                                  )
                                                }
                                                placeholder="Select Site Number"
                                                id={
                                                  "siteNumber_type" + data?.id
                                                }
                                                className="dropdown-basic-button split-button-dropup"
                                                isClearable
                                              />
                                            </div>
                                          </div>
                                        </li>
                                        <li>
                                          <h6 className="tab-content-title">
                                            Site Name
                                          </h6>
                                          <div className="select-dropdown-wrapper">
                                            <div className="select">
                                              <Select
                                                options={
                                                  siteName[index] != undefined
                                                    ? siteName[index]
                                                    : siteName?.all
                                                }
                                                value={
                                                  selectedSiteName[index] !=
                                                    undefined &&
                                                  selectedSiteName[index] !=
                                                    true
                                                    ? selectedSiteName[index]
                                                    : selectedSiteName[index] ==
                                                      true
                                                    ? null
                                                    : change?.siteName[
                                                        change?.siteName.findIndex(
                                                          (el) =>
                                                            el.label.toLowerCase() ===
                                                            data?.siteName?.toLowerCase()
                                                        )
                                                      ]
                                                }
                                                placeholder="Select Site Name"
                                                onChange={(event) =>
                                                  onSiteNameChange(
                                                    event,
                                                    data.id,
                                                    index
                                                  )
                                                }
                                                id={"siteName_type" + data?.id}
                                                className="dropdown-basic-button split-button-dropup"
                                                isClearable
                                              />
                                            </div>
                                          </div>
                                        </li>
                                      </>
                                    ) : apiCallStatus ? (
                                      <>
                                        <li>
                                          <h6 className="tab-content-title">
                                            User status
                                          </h6>
                                          <div className="select-dropdown-wrapper">
                                            {/*console.log(
                                            types.findIndex(
                                              (el) =>
                                              el.label.toLowerCase() == data?.user_status.toLowerCase()
                                            ))*/}
                                            <div className="select">
                                              <Select
                                                options={types}
                                                defaultValue={
                                                  types[
                                                    types.findIndex(
                                                      (el) =>
                                                        el.label.toLowerCase() ==
                                                        data?.user_status?.toLowerCase()
                                                    )
                                                  ]
                                                }
                                                onChange={(event) =>
                                                  onUserChange(event, data.id)
                                                }
                                                id={"user_type_" + data?.id}
                                                className="dropdown-basic-button split-button-dropup"
                                                isClearable
                                              />
                                            </div>
                                          </div>
                                        </li>
                                        <li>
                                          <h6 className="tab-content-title">
                                            Country
                                          </h6>
                                          <div className="select-dropdown-wrapper">
                                            <div className="select">
                                              <Select
                                                options={countryAll}
                                                defaultValue={
                                                  countryAll[
                                                    countryAll.findIndex(
                                                      (el) =>
                                                        el.value ==
                                                        data?.country
                                                    )
                                                  ]
                                                }
                                                onChange={(event) =>
                                                  onCountryChange(
                                                    event,
                                                    data.id
                                                  )
                                                }
                                                id={data.id}
                                                className="dropdown-basic-button split-button-dropup"
                                                isClearable
                                              />
                                            </div>
                                          </div>
                                        </li>
                                      </>
                                    ) : (
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          width: "100%",
                                          height: "100%",
                                        }}
                                      >
                                        <Spinner
                                          color="#53aff4"
                                          size={32}
                                          speed={1}
                                          animating={true}
                                        />
                                      </div>
                                    )}
                                  </ul>

                                  {apiCallStatus ? (
                                    <div className="data-main-footer-sec">
                                      <div className="footer-btn d-flex justify-content-end">
                                        <Button
                                          className="btn btn-primary btn-filled update"
                                          onClick={(e) =>
                                            updateReaderDetails(data?.id, index)
                                          }
                                          id={data?.id}
                                        >
                                          Update
                                        </Button>
                                      </div>
                                    </div>
                                  ) : null}
                                </div>
                              </Tab>
                            ) : (
                              ""
                            )}
                          </Tabs>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : apiCallStatus ? (
                <div className="no_found">
                  <p>No Data Found</p>
                </div>
              ) : null}
            </div>
            {isLoaded == true ? (
              <div className="load_more">
                <Button
                  className="btn btn-primary btn-filled"
                  onClick={loadMoreClicked}
                >
                  Load More
                </Button>
              </div>
            ) : null}

            {pageAll == true ? (
              <div
                className="load_more"
                style={{
                  margin: "0 auto",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <Spinner color="#53aff4" size={32} speed={1} animating={true} />
              </div>
            ) : null}
          </Row>
        </div>
      </Col>

      <CommonConfirmModel
        show={confirmationpopup}
        onClose={hideConfirmationModal}
        fun={commonConfirmModelFun}
        popupMessage={popupMessage}
        path_image={path_image}
        resetDataId={resetDataId}
      />
    </>
  );
};

export default NewReaders;
