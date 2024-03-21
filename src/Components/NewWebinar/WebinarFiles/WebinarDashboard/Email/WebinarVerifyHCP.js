import React, { useEffect, useState, useRef } from "react";
import { Modal, Dropdown } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import { useNavigate } from "react-router-dom";
import { loader } from "../../../../../loader";
import {
    getWebinarCampaignId,
    getWebinarSelected,
    getWebinarSelectedSmartListData,
    getWebinarEmailData
} from "../../../../../actions";
import axios from "axios";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { popup_alert } from "../../../../../popup_alert";
import { Link } from "react-router-dom";

import DropdownButton from "react-bootstrap/DropdownButton";
import EditCountry from "../../../../CommonComponent/EditCountry";
import EditContactType from "../../../../CommonComponent/EditContactType";
import Select, { createFilter } from "react-select";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
import AddNewContactModal from "../../../../../Model/AddNewContactModal";

var old_object = {};
var selected_Data = [];
const WebinarVerifyHCP = (props) => {
    const { eventIdContext, handleEventId } = useSidebar()
    const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"))
    const [eventId, setEventId] = useState(
        eventIdContext?.eventId
            ? eventIdContext?.eventId
            : localStorageEvent?.eventId
    );
    const [totalData, setTotalData] = useState({});
    const [siteNumberAll, setSiteNumberAll] = useState([]);
    const [siteNameAll, setSiteNameAll] = useState([]);
    const [role, setRole] = useState([]);
    const [irtRole, setIrtRole] = useState([]);
    const [institutionType, setInstitutionType] = useState([]);
    const [optIRT, setoptIRT] = useState([
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
    ]);
    let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    const filterConfig = {
        matchFrom: "start",
    };
    const [SendListData, setSendListData] = useState([]);
    const [UserData, setUserData] = useState([]);
    var campaign_id = "0";

    if (old_object?.campaign_id || old_object?.campaign_id === "") {
        var campaign_id = old_object?.campaign_id ? old_object.campaign_id : "";
    } else {
        var campaign_id = old_object?.campaign_id
            ? old_object?.campaign_id
            : props.getWebinarDraftData?.campaign_id
                ? props.getWebinarDraftData?.campaign_id
                : "";
    }
    const [validationError, setValidationError] = useState({});
    const [campaign_id_st, setCampaign_id] = useState(campaign_id);
    const [templateId, setTemplateId] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [reRender, setReRender] = useState(0);
    const [sorting, setSorting] = useState(0);
    const [editable, setEditable] = useState(0);
    const [saveOpen, setSaveOpen] = useState(false);
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [editableData, setEditableData] = useState([]);
    const [sortingCount, setSortingCount] = useState(0);
    const [userId, setUserId] = useState("56Ek4feL/1A8mZgIKQWEqg==");
    const navigate = useNavigate();

    const [selectedHcp, setSelectedHcp] = useState(
        selected_Data ? selected_Data : []
    );
    const [modalCounter, setModalCounter] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [activeManual, setActiveManual] = useState("active");
    const [activeExcel, setActiveExcel] = useState("");
    const [counterFlag, setCounterFlag] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [countryall, setCountryall] = useState([]);
    const [irtCountry, setIRTCountry] = useState([]);
    const [addFileReRender, setAddFileReRender] = useState(0);
    const [hpc, setHpc] = useState([
        {
            firstname: "",
            lastname: "",
            email: "",
            contact_type: "",
            country: "",
            countryIndex: "",
            role:
                localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
                    ? irtRole?.[0]?.value
                    : "",
            optIrt:
                localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
                    ? "yes"
                    : "",
            institutionType: "",
        },
    ]);
    const [updateCounter, setUpdateCounter] = useState(0);

    const axiosFun = async () => {
        try {
            const result = await axios.get(`emailapi/get_site`);
            let country = result?.data?.response?.data?.site_country_data;
            let arr = [];
            Object.entries(country)?.map(([index, item]) => {
                let label = item;
                if (index == "B&H") {
                    label = "Bosnia and Herzegovina";
                }
                arr.push({
                    value: item,
                    label: label,
                });
            });
            setIRTCountry(arr);
        } catch (err) {
            console.log("-err", err);
        }
    };

    const [validationReRender, setValidationReRender] = useState(0);
    let [validator] = React.useState(new SimpleReactValidator());

    const [manualReRender, setManualReRender] = useState(0);
    let file_name = useRef("");

    let reducHcp = selectedHcp?.map((item) => {
        return item?.profile_user_id;
    });

    const updateReader = (readers_d = "", type = 1) => {
        if (type == 1) {
            var reducHcp = selectedHcp?.map((item) => {
                return item?.profile_user_id ? item?.profile_user_id : item;
            });
        } else {
            var reducHcp = readers_d;
        }

        let body = {
            user_id: localStorage.getItem("user_id"),
            readers_id: reducHcp,
        };
        loader("show");
        axios
            .post(`emailapi/get_user_details`, body)
            .then((res) => {
                setSelectedHcp(res?.data?.response.data);
                loader("hide");
                // setCounter(counter + 1);
            })
            .catch((err) => {
                loader("hide");
                console.log(err);
            });
    };

    useEffect(() => {
        if (
            typeof props !== "undefined" &&
            props !== null &&
            props.hasOwnProperty("getWebinarDraftData")
        ) {
            if (props.getWebinarDraftData !== null) {
                let reducHcp = props.getWebinarDraftData?.campaign_data?.selectedHcp;

                if (typeof reducHcp != "undefined") {
                    let check_type_readrs = reducHcp[0];
                    if (typeof check_type_readrs === "object") {
                        setSelectedHcp(reducHcp);
                        updateReader(reducHcp);
                    } else {
                        updateReader(reducHcp, 2);
                    }
                }
            }
        }
    }, []);

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;

    const handleInputChange = (event, selected) => {
        const div = document.querySelector("div.active");

        if (div) {
            div.classNameList.remove("active");
        }
        event.target.classNameList.toggle("active");
        setTemplateId(selected);
    };

    useEffect(() => {
        if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
            axiosFun();
        }

        const getalCountry = async () => {
            let body = {
                user_id: localStorage.getItem("user_id"),
            };
            await axios
                .post(`distributes/filters_list`, body)
                .then((res) => {
                    if (res?.data?.status_code == 200) {
                        let country = res?.data?.response?.data?.country;
                        let arr = [];

                        Object.entries(country)?.map(([index, item]) => {
                            let label = item;
                            if (index == "B&H") {
                                label = "Bosnia and Herzegovina";
                            }
                            arr.push({
                                value: item,
                                label: label,
                            });
                        });
                        setCountryall(arr);

                        if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
                            let investigator_type =
                                res?.data?.response?.data?.investigator_type;
                            let newType = [];
                            Object.keys(investigator_type)?.map((item, i) => {
                                newType?.push({ label: item, value: item });
                            });
                            let irt_inverstigator_type =
                                res?.data?.response?.data?.irt_inverstigator_type;
                            let newIrtType = [];
                            Object.keys(irt_inverstigator_type)?.map((item, i) => {
                                newIrtType.push({ label: item, value: item });
                            });
                            let instution_type = res?.data?.response?.data?.institution_type;
                            let newInstitutionType = [];
                            Object.keys(instution_type)?.map((item, i) => {
                                newInstitutionType.push({ label: item, value: item });
                            });
                            setInstitutionType(newInstitutionType);
                            setRole(newType);
                            setIrtRole(newIrtType);
                        }

                        setTotalData(res?.data?.response?.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        getalCountry();
    }, []);

    const setHpcList = (list) => {
        setHpc(list)
    }

    const nextClicked = () => {
        props.getWebinarSelected(selectedHcp);
        navigate("/webinar/email/verifyHcpMAIL", {
            state: {
                selectedHcp: selectedHcp,
                removedHcp: "",
            },
        });
    };

    const closeModal = () => {
        setIsOpen(false);
        setHpc([
            {
                firstname: "",
                lastname: "",
                email: "",
                contact_type: "",
                country: "",
                countryIndex: "",
            },
        ]);
        setActiveManual("active");
        setActiveExcel("");
    };

    const editablemade = () => {
        setSaveOpen(true);
        let temp_val = 1 - editable;
        if (temp_val) setEditable(temp_val);
    };

    const addNewHcp = () => {
        // $('#myModal').modal('show'
        // document.getElementById("tagsModal").modal('show');
        setIsOpen(true);
        setHpc([
            {
                firstname: "",
                lastname: "",
                email: "",
                contact_type: "",
                country: "",
                countryIndex: "",
                role:
                    localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
                        ? irtRole?.[0]?.value
                        : "",
                optIrt:
                    localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
                        ? "yes"
                        : "",
                institutionType: "",
            },
        ]);
        setActiveManual("active");
        setActiveExcel("");
    };

    const selectHcp = (index) => {
        let arr = [];
        arr = searchedUsers;
        let added_user_id = arr[index]?.profile_user_id;
        let prev_obj = selectedHcp?.find((x) => x?.profile_user_id === added_user_id);
        if (typeof prev_obj == "undefined") {
            const removedArray = arr?.splice(index, 1);
            setSelectedHcp((oldArray) => [...oldArray, removedArray[0]]);
            setSearchedUsers(arr);
            setReRender(reRender + 1);
        } else {
            toast.error("User with same email already added in list.");
        }
    };

    const nameChanged = (e) => {
        setName(e?.target?.value);
    };

    const onFileChange = (event) => {
        setSelectedFile(event?.target?.files[0]);
    };

    const deleteSelected = (index) => {
        let arr = [];
        arr = selectedHcp;
        arr.splice(index, 1);
        setSelectedHcp(arr);
        setReRender(reRender + 1);
    };

    const sortSelectedUsers = () => {
        let normalArr = [];
        normalArr = selectedHcp;
        if (sorting === 0) {
            normalArr.sort((a, b) =>
                a?.first_name?.toLowerCase() > b?.first_name?.toLowerCase()
                    ? 1
                    : b?.first_name?.toLowerCase() > a?.first_name?.toLowerCase()
                        ? -1
                        : 0
            );
        } else {
            normalArr.sort((a, b) =>
                a?.first_name?.toLowerCase() < b?.first_name?.toLowerCase()
                    ? 1
                    : b?.first_name?.toLowerCase() < a?.first_name?.toLowerCase()
                        ? -1
                        : 0
            );
        }
        setSelectedHcp(normalArr);
        setSorting(1 - sorting);
        setSortingCount(sortingCount + 1);
    };

    const emailChanged = (e) => {
        setEmail(e?.target?.value);
    };

    const addFile = () => {
        const addfile_btn = document.getElementById("add_file_btn");
        if (document.querySelector("#add_file_btn .active") !== null) {
            addfile_btn.classList.remove("active");
        } else {
            addfile_btn.classList.add("active");
        }
        document.querySelector("#add_hcp_btn").classList.remove("active");

        setActiveExcel("active");
        setActiveManual("");
        setAddFileReRender(addFileReRender + 1);
    };

    const addHcp = () => {
        const addhcp_btn = document.getElementById("add_hcp_btn");
        if (document.querySelector("#add_hcp_btn .active") !== null) {
            addhcp_btn.classList.remove("active");
        } else {
            addhcp_btn.classList.add("active");
        }
        document.querySelector("#add_file_btn").classList.remove("active");

        setActiveExcel("");
        setActiveManual("active");
        setManualReRender(manualReRender + 1);
    };

    const onFirstNameChange = (e, i) => {
        const { value } = e?.target;
        const list = [...hpc];
        const name = hpc[i]?.firstname;
        list[i].firstname = value;
        setHpc(list);
    };

    const onLastNameChange = (e, i) => {
        const { value } = e?.target;
        const list = [...hpc];
        const name = hpc[i]?.lastname;
        list[i].lastname = value;
        setHpc(list);
    };

    const onEmailChange = (e, i) => {
        const { value } = e?.target;
        const list = [...hpc];
        const name = hpc[i]?.email;
        list[i].email = value;
        setHpc(list);
    };

    const onRoleChange = (e, i) => {
        if (e == "") {
            const list = [...hpc];
            list[i].role = "";
            setHpc(list);
        } else {
            const value = e?.value;
            const list = [...hpc];
            const name = hpc[i]?.role;
            list[i].role = value;
            setHpc(list);
        }
    };
    const onInstitutionChange = (e, i) => {
        if (e == "") {
            const list = [...hpc];
            list[i].institutionType = "";
            list[i].optIRT = "";
            list[i].role = "";
            list[i].country = "";
            setHpc(list);
        } else {
            const value = e?.value;
            const list = [...hpc];
            const name = hpc[i]?.institutionType;
            list[i].institutionType = value;
            setHpc(list);
            if (e?.value == "Study site") {
                onIRTChange("yes", i);
            } else {
                onIRTChange("no", i);
            }
        }
    };

    const onIRTChange = (e, i) => {
        if (e == "") {
            const list = [...hpc];
            list[i].optIrt = "";
            list[i].role = "";
            list[i].country = "";
            setHpc(list);
        } else {
            const value = e;
            const list = [...hpc];
            const name = hpc[i]?.optIrt;
            list[i].optIrt = value;
            list[i].role = e == "yes" ? irtRole[0]?.value : "Other";
            list[i].country = "";
            list[i].siteNumberIndex = "";
            list[i].siteNameIndex = "";
            list[i].siteName = "";
            list[i].siteNumber = "";
            setHpc(list);
        }
        let arr = [];
        setSiteNumberAll(arr);
        setSiteNameAll(arr);
        setCounterFlag(counterFlag + 1);
    };

    const onContactTypeChange = (e, i) => {
        const value = e;
        const list = [...hpc];
        const name = hpc[i]?.contact_type;
        list[i].contact_type = value;
        setHpc(list);
    };

    const onCountryChange = (e, i) => {
        if (e == null) {
            const list = [...hpc];
            list[i].country = "";
            list[i].countryIndex = "";
            setHpc(list);
        } else {
            if (localStorage.getItem("user_id") === "56Ek4feL/1A8mZgIKQWEqg==") {
                let consetValue = e?.value;
                if (e.value == "B&H") {
                    consetValue = "Bosnia and Herzegovina";
                }
                const matchingKeys = Object.entries(totalData?.site_country_data)
                    .filter(([key, value]) => value === consetValue)
                    .map(([key, value]) => key);
                const filteredSiteNames = matchingKeys?.map((key) => ({
                    label: totalData?.site_data[key],
                    value: totalData?.site_data[key],
                }));
                const siteNumbers = matchingKeys?.map((key) => ({
                    label: key,
                    value: key,
                }));
                setSiteNumberAll(siteNumbers);
                setSiteNameAll(filteredSiteNames);
            }
            const value = e?.value;
            const list = [...hpc];
            const name = hpc[i]?.country;
            list[i].country = value;

            let index = countryall?.findIndex((x) => x?.value === value);
            list[i].countryIndex = index;
            list[i].siteNumberIndex = "";
            list[i].siteNameIndex = "";
            list[i].siteName = "";
            list[i].siteNumber = "";
            setHpc(list);
        }
    };

    const onSiteNumberChange = (e, i) => {
        if (e == null) {
            const list = [...hpc];
            list[i].siteNumber = "";
            setHpc(list);
        } else {
            let getSiteData = totalData?.site_data;
            let site_name_value = getSiteData[e?.value];
            const value = e?.value;
            const list = [...hpc];
            const name = hpc[i]?.siteNumber;
            list[i].siteNumber = value;
            list[i].siteName = site_name_value;
            let snameindex = siteNameAll?.findIndex(
                (x) => x?.value === site_name_value
            );
            list[i].siteNameIndex = snameindex;
            let index = siteNumberAll?.findIndex((x) => x?.value === value);
            list[i].siteNumberIndex = index;
            setHpc(list);
        }
    };

    const onSiteNameChange = (e, i) => {
        if (e == null) {
            const list = [...hpc];
            list[i].siteName = "";
            setHpc(list);
        } else {
            const value = e?.value;
            let getSiteData = totalData?.site_data;
            let site_number_value = Object.keys(getSiteData)?.find(
                (key) => getSiteData[key] === e?.value
            );
            const list = [...hpc];
            const name = hpc[i]?.siteName;
            list[i].siteName = value;
            list[i].siteNumber = site_number_value;
            let snameindex = siteNumberAll?.findIndex(
                (x) => x.value === site_number_value
            );
            list[i].siteNumberIndex = snameindex;
            let index = siteNameAll?.findIndex((x) => x?.value === value);
            list[i].siteNameIndex = index;
            setHpc(list);
        }
    };

    const deleteRecord = (i) => {
        const list = hpc;
        list.splice(i, 1);
        setHpc(list);
        setCounterFlag(counterFlag + 1);
    };

    const saveClicked = async () => {
        if (activeManual == "active") {
            const body_data = hpc?.map((data) => {
                if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
                    return {
                        first_name: data?.firstname,
                        last_name: data?.lastname,
                        email: data?.email,
                        country: data?.country,
                        // contact_type: data.contact_type,
                        siteNumber: data?.siteNumber ? data?.siteNumber : "",
                        siteName: data?.siteName ? data?.siteName : "",
                        investigator_type: data?.role,
                        siteIrt: data?.optIrt == "yes" ? 1 : 0,
                        institution_type: data?.institutionType
                            ? data?.institutionType
                            : "",
                    };
                } else {
                    return {
                        first_name: data?.firstname,
                        last_name: data?.lastname,
                        email: data?.email,
                        country: data?.country,
                        contact_type: data?.contact_type,
                    };
                }
            });

            const body = {
                data: body_data,
                user_id: localStorage.getItem("user_id"),
                smart_list_id: "",
            };

            const status = body?.data?.map((data,index) => {
                if (
                    data?.email == "" ||
                    data?.institution_type == "" ||
                    data?.first_name == "" ||
                    data?.last_name == "" ||
                    data?.country == ""
                ) {
                    if (
                        data?.first_name == "" &&
                        localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
                    ) {
                        setValidationError({
                            newHcpFirstName: "Please enter the first name",
                            index: index,
                        });
                        return "Please enter the first name";
                    } else if (
                        data?.last_name == "" &&
                        localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
                    ) {
                        setValidationError({
                            newHcpLastName: "Please enter the last name",
                            index: index,
                        });
                        return "Please enter the last name";
                    } else if (data?.email == "") {

                        setValidationError({
                            newHcpEmail: "Please enter the email atleast",
                            index: index,
                        });
                        return "Please enter the email atleast";
                    }

                    if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
                        if (data?.institution_type == "") {
                            setValidationError({
                                newHcpInstitution: "Please Select the institution ",
                                index: index,
                            });
                            return "Please Select the institution ";
                        }
                        if (data?.country == "") {

                            setValidationError({
                                newHcpCountry: "Please select the country",
                                index: index,
                            });
                            return "Please select the country";
                        }
                    }
                    return "true";
                } else if (data?.email != "") {
                    let email = data?.email;
                    let useremail = email?.trim();
                    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    if (regex.test(String(useremail).toLowerCase())) {
                        let prev_obj = selectedHcp?.find((x) => x?.email?.toLowerCase() === useremail?.toLowerCase());
                        if (typeof prev_obj != "undefined") {
                            setValidationError({
                                newHcpEmail: "User with same email already added in list.",
                                index: index,
                            });
                            return "User with same email already added in list.";
                        }
                    } else {
                        setValidationError({
                            newHcpEmail: "Email format is not valid",
                            index: index,
                        });
                        return "Email format is not valid";
                    }
                    return "true";
                } else {
                    return "true";
                }
            });
            status.sort();
            if (status.every((element) => element == "true")) {
                loader("show");

                axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
                await axios
                    .post(`distributes/add_new_readers_in_list`, body)
                    .then((res) => {
                        if (res?.data?.status_code === 200) {
                            toast.success("User added successfully");
                            res?.data?.response?.data?.map((data) => {
                                setSelectedHcp((oldArray) => [...oldArray, data]);
                            });
                            setIsOpen(false);
                            loader("hide");
                        } else {
                            toast.warning(res.data.message);
                        }
                        loader("hide");
                        //setSelectedHcp(res.data.response.data);
                    })
                    .catch((err) => {
                        loader("hide");
                        toast.error("Somwthing went wrong");
                    });
            } else {
                const filteredArray = status?.filter((value) => value !== "true");
                toast.warning(filteredArray?.[0]);
                // toast.warning(status[0]);
            }
            // setIsOpen(false);
        } else {
            let formData = new FormData();
            let user_id = localStorage.getItem("user_id");
            formData.append("user_id", user_id);
            formData.append("smart_list_id", "");
            formData.append("reader_file", selectedFile);
            axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
            if (selectedFile) {
                loader("show");
                await axios
                    .post(`distributes/update_reader_list`, formData)
                    .then((res) => {
                        if (res?.data?.status_code === 200) {
                            toast.success("User added successfuly");
                            res?.data?.response?.data?.map((data) => {
                                setSelectedHcp((oldArray) => [...oldArray, data]);
                                setIsOpen(false);
                                setActiveManual("active");
                                setActiveExcel("");
                                setSelectedFile(null);
                                loader("hide");
                            });
                        } else {
                            toast.warning(res?.data?.message);
                            loader("hide");
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                setIsOpen(false);
            } else {
                toast.error("Please add a excel file");
            }
        }
    };

    const addMoreHcp = () => {
        const status = hpc.map((data) => {
            if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
                if (
                    data?.firstname == "" ||
                    data?.lastname == "" ||
                    data?.country == "" ||
                    data?.email == "" ||
                    data?.institutionType == ""
                ) {
                    return "false";
                } else {
                    return "true";
                }
            } else {
                if (data?.email == "") {
                    return "false";
                } else {
                    return "true";
                }
            }
        });

        if (status.every((element) => element == "true")) {
            setHpc([
                ...hpc,
                {
                    firstname: "",
                    lastname: "",
                    email: "",
                    contact_type: "",
                    country: "",
                    countryIndex: "",
                    role:
                        localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
                            ? irtRole?.[0]?.value
                            : "",
                    optIrt:
                        localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
                            ? "yes"
                            : "",
                    institutionType: "",
                },
            ]);
        } else {
            if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
                toast.warning("Please input the required fields.");
            } else {
                toast.warning("Please input the required fields.");
            }
        }
    };

    const editing = (
        profile_id,
        profile_user_id,
        email,
        jobTitle,
        company,
        country,
        names,
        index,
        contact_type
    ) => {
        if (editable != 0) {
            const name_edit = document.getElementById(
                "field_name" + profile_user_id
            )?.innerText;
            const country_edit = document.getElementById(
                "field_country" + profile_user_id
            )?.value;
            const contact_type_edit = document.getElementById(
                "field_contact_type" + profile_user_id
            )?.value;

            const arr = [];
            arr.push({
                profile_id: "",
                profile_user_id: profile_user_id,
                email: email,
                jobTitle: jobTitle,
                company: company,
                country: country_edit,
                username: name_edit,
                contact_type: contact_type_edit,
            });

            let prev_obj = editableData?.find(
                (x) => x?.profile_user_id === profile_user_id
            );
            if (typeof prev_obj != "undefined") {
                //update existing
                editableData.map(
                    (obj) => arr?.find((o) => o?.profile_user_id === profile_user_id) || obj
                );
            } else {
                //create new
                setEditableData((oldArray) => [...oldArray, ...arr]);
            }
        }
    };

    const backClicked = () => {
        navigate("/webinar/email/selectHCP");
    };

    const searchHcp = async (e) => {
        e.preventDefault();
        if (name?.trim().length == 0 && email?.trim()?.length == 0) {
            toast.error("Please enter search criteria");
        } else {
            const body = {
                user_id: localStorage.getItem("user_id"),
                name: name,
                email: email,
            };

            axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
            loader("show");
            await axios
                .post(`emailapi/search_hcp`, body)
                .then((res) => {
                    if (res?.data?.status_code === 200) {
                        setSearchedUsers(res?.data?.response?.data);
                    } else {
                        setSearchedUsers([]);
                    }
                    if (res.data.message) {
                        setMessage(res?.data?.message);
                    }
                    loader("hide");
                })
                .catch((err) => {
                    loader("hide");
                    console.log(err);
                });
        }
    };

    const saveEditClicked = async () => {
        setEditable(0);
        if (editableData?.length > 0) {
            editableData?.map((data) => {
                const name_edit = document.getElementById(
                    "field_name" + data.profile_user_id
                ).innerText;
                const country_edit = document.getElementById(
                    "field_country" + data.profile_user_id
                )?.value;
                const edit_index = document.getElementById(
                    "field_index" + data.profile_user_id
                )?.value;
                const contact_type_edit = document.getElementById(
                    "field_contact_type" + data.profile_user_id
                )?.value;

                let prev_obj = selectedHcp?.find(
                    (x) => x?.profile_user_id === data?.profile_user_id
                );
                if (typeof prev_obj != "undefined") {
                    if (typeof selectedHcp[edit_index] != "undefined") {
                        selectedHcp[edit_index].country = country_edit;
                    }
                    if (typeof selectedHcp[edit_index] != "undefined") {
                        selectedHcp[edit_index].contact_type = contact_type_edit;
                    }
                }

                data.contact_type = contact_type_edit;
                data.country = country_edit;
                data.username = name_edit;
            });

            const body = {
                user_id: localStorage.getItem("user_id"),
                edit_list_array: editableData,
            };
            setSaveOpen(false);
            axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
            loader("show");
            await axios
                .post(`distributes/update_reders_details`, body)
                .then((res) => {
                    loader("hide");
                    if (res?.data?.status_code === 200) {
                        toast.success("data updated successfully");
                    } else {
                        popup_alert({
                            visible: "show",
                            message: res?.data?.message,
                            type: "error",
                        });
                    }
                })
                .catch((err) => {
                    console.log("something went wrong");
                });
            setEditableData([]);
        } else {
            setSaveOpen(false);
            toast.warning("No row update");
        }
    };

    const closeClicked = () => {
        setSaveOpen(false);
        setEditable(0);
        let vr = selectedHcp;
        setSelectedHcp([]);
        setTimeout(() => {
            setSelectedHcp(vr);
            updateReader();
            console.log("This will run after 1 second!");
            setUpdateCounter(updateCounter + 1);
        }, 50);
    };

    const saveAsDraft = async () => {
        // console.log("hi");
        // console.log(props);
        // console.log(selectedHcp);
        // const body = {
        //   user_id: localStorage.getItem("user_id"),
        //   pdf_id: props.getDraftData.pdf_id,
        //   description: props.getDraftData.description,
        //   creator: props.getDraftData.creator,
        //   campaign_name: props.getDraftData.campaign,
        //   subject: props.getDraftData.subject,
        //   route_location: "VerifyHCP",
        //   tags: props.getDraftData.tags,
        //   campaign_data: {
        //     template_id: props.getDraftData.template_id,
        //     // selectedHcp: selectedHcp.map((hcp) => {
        //     //   return hcp.user_id;
        //     // }),
        //   },
        //   campaign_id: props.getDraftData.campaign_id || "",
        // };

        const body = {
            user_id: localStorage.getItem("user_id"),
              pdf_id:0,
              event_id:eventId,
              description: old_object?.emailDescription
                ? old_object?.emailDescription
                : props.getWebinarDraftData?.description
                    ? props.getWebinarDraftData?.description
                    : "",
            creator: old_object?.emailCreator
                ? old_object?.emailCreator
                : props.getWebinarDraftData?.creator
                    ? props.getWebinarDraftData?.creator
                    : "",
                    campaign_name: "webinar",

            subject: old_object?.emailSubject
                ? old_object?.emailSubject
                : props.getWebinarDraftData?.subject,
            route_location: "webinar/email/verifyHCP",
            tags: old_object?.tags ? old_object?.tags : props?.getWebinarDraftData?.tags,
            campaign_data: {
                template_id: old_object?.templateId
                    ? old_object?.templateId
                    : props.getWebinarDraftData?.campaign_data?.template_id,
                selectedHcp: selectedHcp,
                list_selection: old_object?.selected
                    ? old_object?.selected
                    : props.getWebinarDraftData?.campaign_data?.list_selection,
            },

            campaign_id: campaign_id_st,
            source_code: old_object?.template
                ? old_object?.template
                : props.getWebinarDraftData?.source_code,
            status: 2,
            auto_responder_id: old_object?.templateId
            ? old_object?.templateId
            : props?.getWebinarDraftData?.campaign_data?.template_id
        };

        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        loader("show");
        await axios
            .post(`emailapi/save_draft`, body)
            .then((res) => {
                if (res.data.status_code === 200) {
                    setCampaign_id(res?.data?.response?.data?.id);
                    setSelectedHcp(selectedHcp);
                    popup_alert({
                        visible: "show",
                        message: "Your changes has been saved <br />successfully !",
                        type: "success",
                        redirect: "/webinar/email",
                    });
                } else {
                    toast.warning(res?.data?.message);
                }
                loader("hide");
            })
            .catch((err) => {
                toast.error("Something went wrong");
            });
    };

    return (
        <>
            <div className="col right-sidebar custom-change">
                <div className="custom-container">
                    <div className="row">
                        <div className="page-top-nav sticky">
                            <div className="row justify-content-end align-items-center">
                                <div className="col-12 col-md-1">
                                    <div className="header-btn-left">
                                        <button
                                            className="btn btn-primary btn-bordered back"
                                            onClick={backClicked}
                                        >
                                            Back
                                        </button>
                                    </div>
                                </div>
                                <div className="col-12 col-md-9">
                                    <ul className="tabnav-link">

                                        <li className="active">
                                            <Link to="/webinar/email/create-new-email">Create Your Email</Link>
                                        </li>
                                        {/*
                  <li className="active">
                    <Link to="/SelectHCP">Select HCPs</Link>
                  </li>
                  */}
                                        <li className="active active-main">
                                            <a href="javascript:void(0)">Select Verify your HCPs</a>
                                        </li>

                                        <li className="">
                                            <a href="javascript:void(0)">Verify your Email</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-12 col-md-2">
                                    <div className="header-btn">
                                        <button
                                            onClick={saveAsDraft}
                                            className="btn btn-primary btn-bordered move-draft"
                                        >
                                            Save As Draft
                                        </button>

                                        {selectedHcp?.length === 0 ? (
                                            <button className="btn btn-primary btn-filled next disabled">
                                                Next
                                            </button>
                                        ) : (
                                            <button
                                                onClick={nextClicked}
                                                className="btn btn-primary btn-filled next"
                                            >
                                                Next
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="top-header">
                            <div className="page-title">
                                <h4>
                                    {localStorage.getItem("user_id") == userId
                                        ? "Search For User By:"
                                        : "Search For HCP By:"}
                                </h4>
                            </div>
                        </div>

                        <section className="search-hcp">
                            <div className="form-search-hcp">
                                <form>
                                    <div className="form-inline row justify-content-between align-items-center">
                                        <div className="col-12 col-md-7">
                                            <div className="row justify-content-between align-items-center">
                                                <div className="form-group col-sm-6">
                                                    <label htmlFor="hcp-name">Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id=""
                                                        onChange={(e) => nameChanged(e)}
                                                    />
                                                </div>
                                                <div className="form-group col-sm-6">
                                                    <label htmlFor="hcp-email">Email</label>
                                                    <input
                                                        type="mail"
                                                        className="form-control"
                                                        id=""
                                                        onChange={(e) => emailChanged(e)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-button col-12 col-md-5">
                                            <button
                                                className="btn btn-primary btn-filled"
                                                onClick={(e) => searchHcp(e)}
                                            >
                                                Search
                                            </button>
                                            <button
                                                className="btn btn-primary btn-bordered"
                                                type="button"
                                                data-bs-toggle="modal"
                                                data-bs-target="#add_hcp"
                                                onClick={addNewHcp}
                                            >
                                                {localStorage.getItem("user_id") == userId
                                                    ? "Add User +"
                                                    : "Add HCP +"}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="search-hcp-table">
                                <div
                                    className={
                                        searchedUsers?.length === 0
                                            ? "search-hcp-table-inside not-found"
                                            : "search-hcp-table-inside"
                                    }
                                >
                                    {searchedUsers?.length === 0 ? (
                                        <div className="not-found">
                                            <h4>No Record Found !</h4>
                                        </div>
                                    ) : (
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Bounced</th>
                                                    <th scope="col">Country</th>
                                                    {localStorage.getItem("user_id") ===
                                                        "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                                        <>
                                                            <th scope="col">IRT mandatory training</th>
                                                            <th scope="col">IRT role</th>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <th scope="col">Business unit</th>
                                                            <th scope="col">Contact type</th>
                                                        </>
                                                    )}

                                                    <th scope="col">Consent</th>
                                                    <th scope="col">Email received</th>
                                                    <th scope="col">Openings</th>
                                                    <th scope="col">Registrations</th>
                                                    <th scope="col">Last email</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {searchedUsers?.map((users, index) => {
                                                    return (
                                                        <>
                                                            <tr>
                                                                <td>{users?.name}</td>
                                                                <td>{users?.email ? users?.email : "N/A"}</td>
                                                                <td>{users?.bounce ? users?.bounce : "N/A"}</td>
                                                                <td>
                                                                    {users?.country ? users?.country : "N/A"}
                                                                </td>
                                                                <td>
                                                                    {localStorage.getItem("user_id") ==
                                                                        "56Ek4feL/1A8mZgIKQWEqg=="
                                                                        ? users?.irt
                                                                            ? "Yes"
                                                                            : "No"
                                                                        : users?.ibu
                                                                            ? users?.ibu
                                                                            : "N/A"}
                                                                </td>
                                                                <td>
                                                                    {localStorage.getItem("user_id") ===
                                                                        "56Ek4feL/1A8mZgIKQWEqg=="
                                                                        ? users?.user_type
                                                                            ? users?.user_type
                                                                            : "N/A"
                                                                        : users?.contact_type
                                                                            ? users?.contact_type
                                                                            : "N/A"}
                                                                </td>
                                                                <td>
                                                                    <span>
                                                                        {users?.consent ? users?.consent : "N/A"}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span>
                                                                        {users?.email_received
                                                                            ? users?.email_received
                                                                            : "N/A"}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span>
                                                                        {users?.email_opening
                                                                            ? users?.email_opening
                                                                            : "N/A"}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span>
                                                                        {users?.registration
                                                                            ? users?.registration
                                                                            : "N/A"}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span>
                                                                        {users?.last_email
                                                                            ? users?.last_email
                                                                            : "N/A"}
                                                                    </span>
                                                                </td>
                                                                <td className="add-new-hcp">
                                                                    <img
                                                                        src={path_image + "add-row.png"}
                                                                        alt="Add More"
                                                                        onClick={() => selectHcp(index)}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        </>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>

                            <div className="selected-hcp-table">
                                <div className="table-title">
                                    <h4>
                                        {localStorage.getItem("user_id") == userId
                                            ? "Selected Users"
                                            : "Selected HCPs"}
                                        <span>| {selectedHcp?.length}</span>
                                    </h4>
                                    <div className="selected-hcp-table-action">
                                        {editable == false ? (
                                            <>
                                                <div className="hcp-added">
                                                    <button
                                                        className="btn btn-outline-primary"
                                                        onClick={editablemade}
                                                    >
                                                        <img src={path_image + "edit.svg"} alt="" />
                                                    </button>
                                                </div>
                                                <div className="hcp-sort">
                                                    {sortingCount == 0 ? (
                                                        <>
                                                            <button
                                                                className="btn btn-outline-primary"
                                                                onClick={sortSelectedUsers}
                                                            >
                                                                Sort By{" "}
                                                                <img
                                                                    src={path_image + "sort.svg"}
                                                                    alt="Shorting"
                                                                />
                                                            </button>
                                                        </>
                                                    ) : sorting == 0 ? (
                                                        <>
                                                            <button
                                                                className="btn btn-outline-primary desc"
                                                                onClick={sortSelectedUsers}
                                                            >
                                                                Sort By{" "}
                                                                <img
                                                                    src={path_image + "sort-decending.svg"}
                                                                    alt="Shorting"
                                                                />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button
                                                                className="btn btn-outline-primary asc"
                                                                onClick={sortSelectedUsers}
                                                            >
                                                                Sort By{" "}
                                                                <img
                                                                    src={path_image + "sort-assending.svg"}
                                                                    alt="Shorting"
                                                                />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </>
                                        ) : null}
                                        {saveOpen ? (
                                            <>
                                                <button
                                                    className="btn btn-primary btn-filled"
                                                    onClick={closeClicked}
                                                >
                                                    Close
                                                </button>

                                                <button
                                                    className="btn btn-primary btn-bordered"
                                                    onClick={saveEditClicked}
                                                >
                                                    Save
                                                </button>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="selected-hcp-list">
                                    {selectedHcp?.length === 0 ? (
                                        <div className="not-found">
                                            <h4>No Contact selected yet!</h4>
                                        </div>
                                    ) : (
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Bounced</th>
                                                    <th scope="col">Country</th>

                                                    {localStorage.getItem("user_id") ===
                                                        "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                                        <>
                                                            <th scope="col">IRT mandatory training</th>
                                                            <th scope="col">IRT role</th>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <th scope="col">Business unit</th>
                                                            <th scope="col">Interest</th>
                                                        </>
                                                    )}
                                                    <th scope="col">Consent</th>
                                                    <th scope="col">Email received</th>
                                                    <th scope="col">Openings</th>
                                                    <th scope="col">Registrations</th>
                                                    <th scope="col">Last email</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedHcp?.map((data, index) => {
                                                    return (
                                                        <>
                                                            <tr
                                                                id={`row-selected` + index}
                                                                onClick={(e) =>
                                                                    editing(
                                                                        //  e.currentTarget,
                                                                        data?.profile_id,
                                                                        data?.profile_user_id,
                                                                        data?.email,
                                                                        data?.jobTitle,
                                                                        data?.company,
                                                                        data?.country,
                                                                        data?.first_name + " " + data?.last_name,
                                                                        localStorage.getItem("user_id") ===
                                                                            "56Ek4feL/1A8mZgIKQWEqg=="
                                                                            ? data?.user_type
                                                                            : data?.contact_type
                                                                    )
                                                                }
                                                            >
                                                                <td
                                                                    id={`field_name` + data?.profile_user_id}
                                                                    contenteditable={
                                                                        editable === 0 ? "false" : "true"
                                                                    }
                                                                >
                                                                    <span>{data?.name || data?.first_name}</span>
                                                                </td>
                                                                <td id={`field_email` + data?.profile_user_id}>
                                                                    {data?.email ? data?.email : "N/A"}
                                                                </td>
                                                                <input
                                                                    type="hidden"
                                                                    id={`field_index` + data?.profile_user_id}
                                                                    value={index}
                                                                />
                                                                <td
                                                                    id={`field_bounced` + data?.profile_user_id}
                                                                >
                                                                    {data?.bounce ? data?.bounce : "N/A"}
                                                                </td>
                                                                <td>
                                                                    {editable ? (
                                                                        <EditCountry
                                                                            selected_country={data?.country}
                                                                            profile_user={data?.profile_user_id}
                                                                        ></EditCountry>
                                                                    ) : (
                                                                        <span>
                                                                            {data?.country ? data?.country : "N/A"}
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {/*data?.ibu ? data?.ibu : "N/A"*/}
                                                                    {localStorage.getItem("user_id") ==
                                                                        "56Ek4feL/1A8mZgIKQWEqg=="
                                                                        ? data?.irt
                                                                            ? "Yes"
                                                                            : "No"
                                                                        : data?.ibu
                                                                            ? data?.ibu
                                                                            : "N/A"}
                                                                </td>
                                                                <td>
                                                                    {localStorage.getItem("user_id") ===
                                                                        "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                                                        data?.user_type != 0 ? (
                                                                            data?.user_type
                                                                        ) : (
                                                                            "N/A"
                                                                        )
                                                                    ) : editable ? (
                                                                        <EditContactType
                                                                            selected_ibu={data?.contact_type}
                                                                            profile_user={data?.profile_user_id}
                                                                        ></EditContactType>
                                                                    ) : (
                                                                        <span>
                                                                            {data?.contact_type
                                                                                ? data?.contact_type
                                                                                : "N/A"}
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    <span>
                                                                        {data?.consent ? data?.consent : "N/A"}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span>
                                                                        {data?.email_received
                                                                            ? data?.email_received
                                                                            : "N/A"}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span>
                                                                        {data?.email_opening
                                                                            ? data?.email_opening
                                                                            : "N/A"}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span>
                                                                        {data?.registration
                                                                            ? data?.registration
                                                                            : "N/A"}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span>
                                                                        {data?.last_email
                                                                            ? data?.last_email
                                                                            : "N/A"}
                                                                    </span>
                                                                </td>
                                                                <td className="delete_row" colSpan="12">
                                                                    <img
                                                                        src={path_image + "delete.svg"}
                                                                        alt="Delete Row"
                                                                        onClick={() => deleteSelected(index)}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        </>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            {/* <Modal
        id="add_hcp"
        show={isOpen}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-hidden="true"
        >
          <Modal.Header>
            <h5 className="modal-title" id="staticBackdropLabel">
              {localStorage.getItem("user_id") == userId
                ? "Add New User +"
                : "Add New HCP"}
            </h5>
            <button
              onClick={closeModal}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </Modal.Header>
          <Modal.Body>
            <div className="hcp-add-box">
              <div className="hcp-add-form tab-content" id="upload-confirm">
                <form id="add_hcp_form" className={"tab-pane" + activeManual}>
                  {hpc?.map((val, i) => {
                    const fieldName = `hpc[${i}]`;
                    return (
                      <>
                        <div className="add_hcp_boxes">
                          <div className="form_action">
                            <div className="row">
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">
                                    First name{" "}
                                    {localStorage.getItem("user_id") ==
                                      "56Ek4feL/1A8mZgIKQWEqg==" && (
                                      <span>*</span>
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    onChange={(event) =>
                                      onFirstNameChange(event, i)
                                    }
                                    value={val.firstname}
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">
                                    Last name{" "}
                                    {localStorage.getItem("user_id") ==
                                      "56Ek4feL/1A8mZgIKQWEqg==" && (
                                      <span>*</span>
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    onChange={(event) =>
                                      onLastNameChange(event, i)
                                    }
                                    value={val.lastname}
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">
                                    Email <span>*</span>
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="email-desc"
                                    name={`${fieldName}.email`}
                                    onChange={(event) =>
                                      onEmailChange(event, i)
                                    }
                                    value={val?.email}
                                  />
                                </div>
                              </div>
                              {localStorage.getItem("user_id") ===
                              "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                <>
                                  {" "}
                                  <div className="col-12 col-md-6">
                                    <div className="form-group bottom">
                                      <label for="">
                                        Institution <span>*</span>
                                      </label>
                                      <Select
                                        options={institutionType}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onInstitutionChange(event, i)
                                        }
                                        defaultValue={
                                          val?.institutionType
                                            ? {
                                                label: val?.institutionType,
                                                value: val?.institutionType,
                                              }
                                            : ""
                                        }
                                        placeholder="Select institution"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">
                                        IRT mandatory training
                                      </label>

                                      <Select
                                        options={optIRT}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onIRTChange(event?.value, i)
                                        }
                                        defaultValue={
                                          val?.optIrt
                                            ? {
                                                label: "Yes",
                                                value: val?.optIrt,
                                              }
                                            : ""
                                        }
                                        value={
                                          optIRT.findIndex(
                                            (el) => el?.value == val?.optIrt
                                          ) == -1
                                            ? ""
                                            : optIRT[
                                                optIRT.findIndex(
                                                  (el) =>
                                                    el?.value == val?.optIrt
                                                )
                                              ]
                                        }
                                        placeholder="Select IRT"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">IRT role</label>
                                      {val?.optIrt == "yes" ? (
                                        <Select
                                          options={irtRole}
                                          className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                          onChange={(event) =>
                                            onRoleChange(event, i)
                                          }
                                          value={
                                            irtRole?.findIndex(
                                              (el) => el?.value == val?.role
                                            ) == -1
                                              ? ""
                                              : irtRole[
                                                  irtRole?.findIndex(
                                                    (el) =>
                                                      el?.value == val?.role
                                                  )
                                                ]
                                          }
                                          isClearable
                                          placeholder="Select Role"
                                        />
                                      ) : val?.optIrt == "no" ? (
                                        <Select
                                          options={role}
                                          className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                          onChange={(event) =>
                                            onRoleChange(event, i)
                                          }
                                          value={
                                            role?.findIndex(
                                              (el) => el?.value == val?.role
                                            ) == -1
                                              ? ""
                                              : role[
                                                  role?.findIndex(
                                                    (el) =>
                                                      el?.value == val?.role
                                                  )
                                                ]
                                          }
                                          isClearable
                                          placeholder="Select Role"
                                        />
                                      ) : (
                                        <Select
                                          className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                          placeholder="Select Role"
                                        />
                                      )}
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label htmlFor="">Contact type</label>
                                      <DropdownButton
                                        className="dropdown-basic-button split-button-dropup"
                                        title={
                                          hpc[i].contact_type != "" &&
                                          hpc[i].contact_type != "undefined"
                                            ? hpc[i].contact_type
                                            : "Select Type"
                                        }
                                        onSelect={(event) =>
                                          onContactTypeChange(event, i)
                                        }
                                      >
                                        <Dropdown.Item
                                          eventKey="HCP"
                                          className={
                                            hpc[i].contact_type == "HCP"
                                              ? "active"
                                              : ""
                                          }
                                        >
                                          HCP
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          eventKey="Staff"
                                          className={
                                            hpc[i].contact_type == "Staff"
                                              ? "active"
                                              : ""
                                          }
                                        >
                                          Staff
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          eventKey="Test Users"
                                          className={
                                            hpc[i].contact_type == "Test Users"
                                              ? "active"
                                              : ""
                                          }
                                        >
                                          Test Users
                                        </Dropdown.Item>
                                      </DropdownButton>                                 
                                    </div>
                                  </div>
                                </>
                              )}
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">
                                    Country{" "}
                                    {localStorage.getItem("user_id") ==
                                      "56Ek4feL/1A8mZgIKQWEqg==" && (
                                      <span>*</span>
                                    )}
                                  </label>
                                  {val?.optIrt == "yes" ? (
                                    <Select
                                      options={irtCountry}
                                      className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                      onChange={(event) =>
                                        onCountryChange(event, i)
                                      }
                                      value={
                                        irtCountry.findIndex(
                                          (el) => el.value == val?.country
                                        ) == -1
                                          ? ""
                                          : irtCountry[
                                              irtCountry.findIndex(
                                                (el) => el.value == val?.country
                                              )
                                            ]
                                      }
                                      placeholder="Select Country"
                                      filterOption={createFilter(filterConfig)}
                                      isClearable
                                    />
                                  ) : (
                                    <Select
                                      options={countryall}
                                      className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                      onChange={(event) =>
                                        onCountryChange(event, i)
                                      }
                                      value={
                                        countryall.findIndex(
                                          (el) => el?.value == val?.country
                                        ) == -1
                                          ? ""
                                          : countryall[
                                              countryall?.findIndex(
                                                (el) => el?.value == val?.country
                                              )
                                            ]
                                      }
                                      placeholder="Select Country"
                                      filterOption={createFilter(filterConfig)}
                                      isClearable
                                    />
                                  )}                               
                                </div>
                              </div>                            

                              {localStorage.getItem("user_id") ===
                              "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                <>
                                  {" "}
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Site number</label>

                                      <Select
                                        options={siteNumberAll}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onSiteNumberChange(event, i)
                                        }
                                        value={
                                          siteNumberAll[hpc[i]?.siteNumberIndex]
                                            ? siteNumberAll[
                                                hpc[i]?.siteNumberIndex
                                              ]
                                            : ""
                                        }
                                        placeholder={"Select Site Number"}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Site name</label>

                                      <Select
                                        options={siteNameAll}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onSiteNameChange(event, i)
                                        }
                                        value={
                                          siteNameAll[hpc[i]?.siteNameIndex]
                                            ? siteNameAll[hpc[i]?.siteNameIndex]
                                            : ""
                                        }
                                        placeholder={"Select Site Name"}
                                      />
                                    </div>
                                  </div>
                                </>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div className="hcp-modal-action">
                            <div className="hcp-action-block">
                              {activeManual == "active" ? (
                                <>
                                  {hpc.length > 1 && (
                                    <div className="hcp-remove">
                                      <button
                                        type="button"
                                        className="btn btn-filled"
                                        onClick={() => deleteRecord(i)}
                                      >
                                        <img
                                          src={path_image + "delete.svg"}
                                          alt="Add More"
                                        />
                                      </button>
                                    </div>
                                  )}
                                </>
                              ) : null}

                              <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item add_hcp">
                                  <a
                                    id="add_hcp_btn"
                                    onClick={addMoreHcp}
                                    className="nav-link active btn-bordered"
                                    data-bs-toggle="tab"
                                    href="javascript:;"
                                  >
                                    {localStorage.getItem("user_id") == userId
                                      ? "Add User +"
                                      : "Add HCP +"}
                                  </a>
                                </li>                              
                              </ul>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </form>             
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button
              type="button"
              className="btn btn-primary save btn-filled"
              onClick={saveClicked}
            >
              Save
            </button>
          </Modal.Footer>
        </div>      
      </Modal> */}

            <AddNewContactModal
                show={isOpen}
                closeClicked={closeModal}
                activeManual={activeManual}
                hpc={hpc}
                setHpc={setHpcList}
                totalData={totalData}
                countryall={countryall}
                irtCountry={irtCountry}
                irtRole={irtRole}
                role={role}
                institutionType={institutionType}
                saveClicked={saveClicked}
                validationError={validationError}
            />
        </>
    );
};

const mapStateToProps = (state) => {
    old_object = state.getWebinarEmailData;
    selected_Data = state.getWebinarSelected;
    return state;
};

export default connect(mapStateToProps, {
    getWebinarEmailData,
    getWebinarSelected,
})(WebinarVerifyHCP);
