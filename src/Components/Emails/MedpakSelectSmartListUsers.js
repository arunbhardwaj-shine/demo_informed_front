import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loader } from "../../loader";

import TableOnly from "./TableOnly";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { popup_alert } from "../../popup_alert";
import { Modal, Dropdown, Table } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import EditCountry from "../CommonComponent/EditCountry";
import EditContactType from "../CommonComponent/EditContactType";
import Select, { createFilter } from "react-select";
import Accordion from "react-bootstrap/Accordion";
var old_object = {};

const MedpakSelectSmartListUsers = (props) => {
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
    const filterConfig = {
        matchFrom: "start",
    };
    const navigate = useNavigate();
    let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    const location = useLocation();
    const [readers, setReaders] = useState([]);
    const [campaign_id_st, setCampaign_id] = useState();
    const [SendListData, setSendListData] = useState([]);
    const [PdfSelected, setPdfSelected] = useState(0);
    const [showLessInfo, setShowLessInfo] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [TemplateId, setTemplateId] = useState(0);
    const [removedReaders, setRemovedReaders] = useState([]);
    const [readersNewlyAdded, setReadersNewlyAdded] = useState([]);
    const [reRender, setReRender] = useState(0);
    const [userId, setUserId] = useState("56Ek4feL/1A8mZgIKQWEqg==");
    const [update, setUpdate] = useState(0);
    const [activeManual, setActiveManual] = useState("active");
    const [activeExcel, setActiveExcel] = useState("");
    const [editableData, setEditableData] = useState([]);
    const [manualReRender, setManualReRender] = useState(0);
    const [sorting, setSorting] = useState(0);
    const [counterFlag, setCounterFlag] = useState(0);
    const [countryall, setCountryall] = useState([]);
    const [irtCountry, setIRTCountry] = useState([]);
    const [addFileReRender, setAddFileReRender] = useState(0);
    const [saveOpen, setSaveOpen] = useState(false);
    const [editable, setEditable] = useState(0);
    const [updateCounter, setUpdateCounter] = useState(0);
    const [sortingCount, setSortingCount] = useState(0);
    const [countryWiseData, setCountryWiseData] = useState({});
    const [showfilter, setShowFilter] = useState(false);
    const buttonRef = useRef(null);
    const filterRef = useRef(null);
    const [filterObject, setFilterObject] = useState({});
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
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [validationError, setValidationError] = useState({});

    // const smartListSelected = location.state
    //   ? location.state.smartListSelected
    //   : props.getDraftData.smart_list_data;

    useEffect(() => {
        let campaign_id =
            typeof old_object === "object" &&
                old_object !== null &&
                old_object?.campaign_id
                ? old_object.campaign_id
                : props.getDraftData?.campaign_id
                    ? props.getDraftData.campaign_id
                    : "";
        setCampaign_id(campaign_id);

        // removedHcp
        if (old_object?.removedHcp) {
            if (old_object.removedHcp.length > 0) {
                setRemovedReaders(old_object.removedHcp);
            }
        } else {
            if (props?.getDraftData && props.getDraftData.campaign_data?.removedHcp) {
                if (
                    typeof props.getDraftData.campaign_data.removedHcp != "undefined" &&
                    props.getDraftData.campaign_data.removedHcp != ""
                ) {
                    setRemovedReaders(props.getDraftData.campaign_data.removedHcp);
                }
            }
        }
    }, []);

    const inputElement = useRef();
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    useEffect(() => {
        console.log("user List--->", props)
        const body = {
            user_id: localStorage.getItem("user_id"),
            list_id: props.getSelectedSmartListData?.id
                ? props.getSelectedSmartListData.id
                : props.getDraftData.campaign_data.smart_list_id,
            show_specific: 1,
        };

        if (props.getSelectedSmartListData?.id) {
            loader("show");
            axios
                .post(`distributes/get_reders_list`, body)
                .then((res) => {
                    if (old_object?.removedHcp) {
                        if (old_object.removedHcp.length > 0) {
                            var removedUsers = old_object.removedHcp;
                            var allUsers = res.data.response.data;
                            var pendingUsers = allUsers.filter(function (objFromA) {
                                return !removedUsers.find(function (objFromB) {
                                    return objFromA.profile_id === objFromB.profile_id;
                                });
                            });
                            console.log("i am here in 1")
                            setReaders(pendingUsers);
                        } else {
                            console.log("i am here in 2")
                            setReaders(res.data.response.data);

                        }
                    } else if (
                        props?.getDraftData &&
                        props.getDraftData.campaign_data?.removedHcp
                    ) {
                        if (
                            typeof props.getDraftData.campaign_data.removedHcp !=
                            "undefined" &&
                            props.getDraftData.campaign_data.removedHcp != ""
                        ) {
                            var removedUsers = props.getDraftData.campaign_data.removedHcp;
                            var allUsers = res.data.response.data;
                            var pendingUsers = allUsers.filter(function (objFromA) {
                                return !removedUsers.find(function (objFromB) {
                                    return objFromA.profile_id === objFromB.profile_id;
                                });
                            });
                            console.log("i am here in 3")
                            setReaders(pendingUsers);
                        } else {
                            console.log("i am here in 4")
                            setReaders(res.data.response.data);
                        }
                    } else {
                        console.log("i am here in 5")
                        setReaders(res.data.response.data);
                        const processedData = res?.data?.response?.data?.reduce((acc, person) => {
                            const country = person?.country?.toUpperCase();

                            // If the country key doesn't exist, create an array for it
                            if (!acc[country]) {
                                acc[country] = [];
                            }

                            // Push the person data to the country array
                            acc[country].push(person);

                            return acc;
                        }, {});
                        console.log("process data--->", processedData)
                        setCountryWiseData(processedData);
                    }

                    loader("hide");
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setReaders(props.getDraftData.campaign_data.selectedHcp);
        }
    }, []);

    const backClicked = () => {
        navigate("/SelectSmartList");
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
                    if (res.data.status_code == 200) {
                        let country = res.data.response.data.country;
                        let arr = [];

                        Object.entries(country).map(([index, item]) => {
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
                                newType.push({ label: item, value: item });
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

                        setTotalData(res.data.response.data);
                    }
                    // setCountryall(res.data.response.data.country);

                    // setCounter(counter + 1);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        getalCountry();
    }, []);

    const saveAsDraft = async () => {
        const body = {
            user_id: localStorage.getItem("user_id"),
            pdf_id: old_object?.PdfSelected
                ? old_object.PdfSelected
                : props.getDraftData.pdf_id,
            description: old_object?.emailDescription
                ? old_object.emailDescription
                : props.getDraftData?.description
                    ? props.getDraftData.description
                    : "",
            creator: old_object?.emailCreator
                ? old_object.emailCreator
                : props.getDraftData?.creator
                    ? props.getDraftData.creator
                    : "",
            campaign_name: old_object?.emailCampaign
                ? old_object.emailCampaign
                : props.getDraftData.campaign,
            subject: old_object?.emailSubject
                ? old_object.emailSubject
                : props.getDraftData.subject,
            route_location: "MedpakSelectSmartListUsers",
            tags: old_object?.tags ? old_object.tags : props.getDraftData.tags,
            campaign_data: {
                template_id: old_object?.templateId
                    ? old_object.templateId
                    : props.getDraftData.campaign_data.template_id,
                smart_list_id: props.getSelectedSmartListData?.id
                    ? props.getSelectedSmartListData.id
                    : props.getDraftData.campaign_data.smart_list_id,
                //smart_list_data: readers,
                // users_list : smartListSelected,
                selectedHcp: [...readers, ...readersNewlyAdded],
                list_selection: old_object?.selected
                    ? old_object.selected
                    : props.getDraftData?.campaign_data?.list_selection
                        ? props.getDraftData.campaign_data.list_selection
                        : 0,
                removedHcp: removedReaders,
            },
            campaign_id: campaign_id_st,
            source_code: old_object?.template
                ? old_object.template
                : props.getDraftData.source_code,
            status: 2,
        };

        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        loader("show");
        await axios
            .post(`emailapi/save_draft`, body)
            .then((res) => {
                if (res.data.status_code == 200) {
                    setCampaign_id(res.data.response.data.id);
                    popup_alert({
                        visible: "show",
                        message: "Your changes has been saved <br />successfully !",
                        type: "success",
                        redirect: "/EmailList",
                    });
                    loader("hide");
                } else {
                    toast.warning(res.data.message);
                    loader("hide");
                }
                // setCampaign_id(res.data.response.data.id);
            })
            .catch((err) => {
                loader("hide");
                toast.error("Something went wrong");
            });
    };

    const nextClicked = () => {
        navigate("/verifyMAIL", {
            // data: data,
            // smartListName: smartListName,
            state: {
                selectedHcp: [...readers, ...readersNewlyAdded],
                removedHcp: removedReaders,
            },
        });
    };

    const axiosFun = async () => {
        try {
            const result = await axios.get(`emailapi/get_site`);

            let country = result?.data?.response?.data?.site_country_data;
            let arr = [];
            Object.entries(country).map(([index, item]) => {
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

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const showMoreInfo = (e) => {
        e.preventDefault();

        setShowLessInfo(!showLessInfo);
    };

    const onFirstNameChange = (e, i) => {
        const { value } = e.target;
        const list = [...hpc];
        const name = hpc[i].firstname;
        list[i].firstname = value;
        setHpc(list);
    };

    const onLastNameChange = (e, i) => {
        const { value } = e.target;
        const list = [...hpc];
        const name = hpc[i].lastname;
        list[i].lastname = value;
        setHpc(list);
    };

    const onEmailChange = (e, i) => {
        const { value } = e.target;
        const list = [...hpc];
        const name = hpc[i].email;
        list[i].email = value;
        setHpc(list);
        // setEmailData(e.target.value);
    };
    const onRoleChange = (e, i) => {
        if (e == "") {
            const list = [...hpc];
            list[i].role = "";
            setHpc(list);
        } else {
            const value = e?.value;
            const list = [...hpc];
            const name = hpc[i].role;
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
            const name = hpc[i].institutionType;
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
            const name = hpc[i].optIrt;
            list[i].optIrt = value;
            list[i].role = "";
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
        const name = hpc[i].contact_type;
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
                let consetValue = e.value;
                if (e.value == "B&H") {
                    consetValue = "Bosnia and Herzegovina";
                }
                const matchingKeys = Object.entries(totalData.site_country_data)
                    .filter(([key, value]) => value === consetValue)
                    .map(([key, value]) => key);
                const filteredSiteNames = matchingKeys.map((key) => ({
                    label: totalData.site_data[key],
                    value: totalData.site_data[key],
                }));
                const siteNumbers = matchingKeys.map((key) => ({
                    label: key,
                    value: key,
                }));
                setSiteNumberAll(siteNumbers);
                setSiteNameAll(filteredSiteNames);
            }
            const value = e.value;
            const list = [...hpc];
            const name = hpc[i].country;
            list[i].country = value;
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
            let getSiteData = totalData.site_data;
            let site_name_value = getSiteData[e.value];
            const value = e.value;
            const list = [...hpc];
            const name = hpc[i].siteNumber;
            list[i].siteNumber = value;
            list[i].siteName = site_name_value;
            let snameindex = siteNameAll.findIndex(
                (x) => x.value === site_name_value
            );
            list[i].siteNameIndex = snameindex;
            let index = siteNumberAll.findIndex((x) => x.value === value);
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
            const value = e.value;
            let getSiteData = totalData.site_data;
            let site_number_value = Object.keys(getSiteData).find(
                (key) => getSiteData[key] === e.value
            );
            const list = [...hpc];
            const name = hpc[i].siteName;
            list[i].siteName = value;
            list[i].siteNumber = site_number_value;
            let snameindex = siteNumberAll.findIndex(
                (x) => x.value === site_number_value
            );
            list[i].siteNumberIndex = snameindex;
            let index = siteNameAll.findIndex((x) => x.value === value);
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

    const addNewUser = () => {
        setIsOpenAdd(true);
        setValidationError({});
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

    const handleSelect = (e) => {
        setPdfSelected(e.target.value);
    };

    const newlyAddedRemoved = (reader, i) => {
        const readersRemoved = removedReaders;
        setRemovedReaders((oldArray) => [reader, ...oldArray]);
        const newlyAdded = readersNewlyAdded;
        newlyAdded.splice(i, 1);
        setReadersNewlyAdded(newlyAdded);
        let merged_array = [reader, ...readersRemoved];
        old_object.removedHcp = merged_array;

        if (props.getDraftData?.campaign_data) {
            if (props.getDraftData.campaign_data?.removedHcp) {
                props.getDraftData.campaign_data.removedHcp = merged_array;
            }
        }
        setUpdate(update + 1);
    };

    const handleInputChange = (event, selected) => {
        const div = document.querySelector("div.active");

        if (div) {
            div.classNameNameList.remove("active");
        }
        event.target.classNameNameList.toggle("active");
        setTemplateId(selected);
    };

    const readersAdded = (reader, i) => {
        // const newlyAddedReaders = readersNewlyAdded;
        const readersRemoved = removedReaders;
        readersRemoved.splice(i, 1);
        setRemovedReaders(readersRemoved);
        setReadersNewlyAdded((oldArray) => [reader, ...oldArray]);

        //setReaders((oldArray) => [reader, ...oldArray]);
        setReRender(reRender + 1);
    };
    const addMoreHcp = () => {
        const status = hpc.map((data) => {
            if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
                if (
                    data?.email == "" ||
                    data?.institutionType == "" ||
                    data.last_name == "" ||
                    data.first_name == "" ||
                    data.country == ""
                ) {
                    return "false";
                } else {
                    return "true";
                }
            } else {
                if (data.email == "") {
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

    const addHcp = (e) => {
        const addhcp_btn = document.getElementById("add_hcp_btn");
        if (document.querySelector("#add_hcp_btn .active") !== null) {
            addhcp_btn.classList.remove("active");
        } else {
            addhcp_btn.classList.add("active");
        }
        document.querySelector("#add_file_btn").classList.remove("active");

        e.preventDefault();
        setActiveExcel("");
        setActiveManual("active");
        setManualReRender(manualReRender + 1);
    };

    const sortSelectedUsers = () => {
        let normalArr = [];
        normalArr = readers;
        if (sorting === 0) {
            normalArr.sort((a, b) =>
                a.first_name.toLowerCase() > b.first_name.toLowerCase()
                    ? 1
                    : b.first_name.toLowerCase() > a.first_name.toLowerCase()
                        ? -1
                        : 0
            );
        } else {
            normalArr.sort((a, b) =>
                a.first_name.toLowerCase() < b.first_name.toLowerCase()
                    ? 1
                    : b.first_name.toLowerCase() < a.first_name.toLowerCase()
                        ? -1
                        : 0
            );
        }

        setReaders(normalArr);
        setSorting(1 - sorting);
        setSortingCount(sortingCount + 1);
    };

    const addFile = (e) => {
        const addfile_btn = document.getElementById("add_file_btn");
        if (document.querySelector("#add_file_btn .active") !== null) {
            addfile_btn.classList.remove("active");
        } else {
            addfile_btn.classList.add("active");
        }
        document.querySelector("#add_hcp_btn").classList.remove("active");

        e.preventDefault();
        setActiveExcel("active");
        setActiveManual("");
        setAddFileReRender(addFileReRender + 1);
    };

    const editing = (
        profile_id,
        profile_user_id,
        email,
        jobTitle,
        company,
        country,
        names,
        contact_type
    ) => {
        if (editable != 0) {
            const name_edit = document.getElementById(
                "field_name" + profile_user_id
            ).innerText;
            const country_edit = document.getElementById(
                "field_country" + profile_user_id
            ).value;
            {
            }

            const contact_type_edit =
                localStorage.getItem("user_id") !== "56Ek4feL/1A8mZgIKQWEqg=="
                    ? document.getElementById("field_contact_type" + profile_user_id)
                        .value
                    : "";

            const arr = [];
            arr.push({
                profile_id: profile_id,
                profile_user_id: profile_user_id,
                email: email,
                jobTitle: jobTitle,
                company: company,
                country: country_edit,
                username: name_edit,
                contact_type: contact_type_edit,
            });

            let prev_obj = editableData.find(
                (x) => x.profile_user_id === profile_user_id
            );
            if (typeof prev_obj != "undefined") {
                //update existing
                editableData.map(
                    (obj) => arr.find((o) => o.profile_user_id === profile_user_id) || obj
                );
            } else {
                //create new
                setEditableData((oldArray) => [...oldArray, ...arr]);
            }
        }
    };
    const deleteReader = (i) => {
        const previous_removed_users = removedReaders;
        const readersList = readers;
        const removedReader = readersList.splice(i, 1);
        setReaders(readersList);
        setRemovedReaders((oldArray) => [...oldArray, removedReader[0]]);
        let merged_array = [...previous_removed_users, ...removedReader];
        old_object.removedHcp = merged_array;

        if (props.getDraftData?.campaign_data) {
            if (props.getDraftData.campaign_data?.removedHcp) {
                props.getDraftData.campaign_data.removedHcp = merged_array;
            }
        }
    };

    const saveEditClicked = async () => {
        setEditable(0);
        if (editableData.length > 0) {
            editableData.map((data) => {
                const name_edit = document.getElementById(
                    "field_name" + data.profile_user_id
                ).innerText;
                const country_edit = document.getElementById(
                    "field_country" + data.profile_user_id
                ).value;
                const edit_index = document.getElementById(
                    "field_index" + data.profile_user_id
                ).value;
                const contact_type_edit =
                    localStorage.getItem("user_id") !== "56Ek4feL/1A8mZgIKQWEqg=="
                        ? document.getElementById(
                            "field_contact_type" + data.profile_user_id
                        ).value
                        : "";

                let prev_obj = readers.find(
                    (x) => x.profile_user_id === data.profile_user_id
                );
                if (typeof prev_obj != "undefined") {
                    if (typeof readers[edit_index] != "undefined") {
                        readers[edit_index].country = country_edit;
                    }
                    if (typeof readers[edit_index] != "undefined") {
                        readers[edit_index].contact_type = contact_type_edit;
                    }
                } else {
                    if (typeof readersNewlyAdded[edit_index] != "undefined") {
                        readersNewlyAdded[edit_index].country = country_edit;
                    }
                    if (typeof readersNewlyAdded[edit_index] != "undefined") {
                        readersNewlyAdded[edit_index].contact_type = contact_type_edit;
                    }
                }
                data.country = country_edit;
                data.username = name_edit;
                data.contact_type = contact_type_edit;
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
                    if (res.data.status_code === 200) {
                        toast.success("List updated");
                    } else {
                        popup_alert({
                            visible: "show",
                            message: res.data.message,
                            type: "error",
                        });
                    }
                })
                .catch((err) => {
                    toast.error("Something went wrong");
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
        let vr = readers;
        setReaders([]);
        setTimeout(() => {
            setReaders(vr);
            console.log("This will run after 1 second!");
            setUpdateCounter(updateCounter + 1);
        }, 50);
    };

    const saveClicked = async () => {
        //   setIsOpenAdd(false);

        if (activeManual == "active") {
            const body_data = hpc.map((data) => {
                if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
                    return {
                        first_name: data.firstname,
                        last_name: data.lastname,
                        email: data.email,
                        country: data.country,
                        contact_type: data?.contact_type ? data?.contact_type : "",
                        siteNumber: data?.siteNumber ? data.siteNumber : "",
                        siteName: data.siteName ? data.siteName : "",
                        investigator_type: data?.role,
                        siteIrt: data?.optIrt == "yes" ? 1 : 0,
                        institution_type: data?.institutionType
                            ? data?.institutionType
                            : "",
                    };
                } else {
                    return {
                        first_name: data.firstname,
                        last_name: data.lastname,
                        email: data.email,
                        country: data.country,
                        contact_type: data.contact_type,
                    };
                }
            });

            const body = {
                data: body_data,
                user_id: localStorage.getItem("user_id"),
                smart_list_id: "",
            };

            const status = body.data.map((data, index) => {
                if (
                    data.email == "" ||
                    data?.institution_type == "" ||
                    data.first_name == "" ||
                    data.last_name == "" ||
                    data.country == ""
                ) {
                    if (
                        data.first_name == "" &&
                        localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
                    ) {
                        setValidationError({
                            newHcpFirstName: "Please enter the first name",
                            index: index,
                        });
                        return;
                    }
                    if (
                        data.last_name == "" &&
                        localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
                    ) {
                        setValidationError({
                            newHcpLastName: "Please enter the last name",
                            index: index,
                        });
                        return;
                    }
                    if (data.email == "") {
                        setValidationError({
                            newHcpEmail: "Please enter the email atleast",
                            index: index,
                        });

                        return;
                    }
                    //  else if (data.email != "") {
                    //   let email = data.email;
                    //   let useremail = email.trim();
                    //   var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    //   if (regex.test(String(useremail).toLowerCase())) {
                    //     let prev_obj = readers.find((x) => x.email === useremail);
                    //     if (typeof prev_obj != "undefined") {
                    //       setValidationError({
                    //         newHcpEmail: "User with same email already added in list.",
                    //         index: index,
                    //       });
                    //       return;
                    //     }
                    //   } else {
                    //     setValidationError({
                    //       newHcpEmail: "Email format is not valid",
                    //       index: index,
                    //     });
                    //     return;
                    //   }
                    // }
                    if (
                        data.institution_type == "" &&
                        localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
                    ) {
                        setValidationError({
                            newHcpInstitution: "Please enter the institution ",
                            index: index,
                        });
                        return;
                    }

                    if (
                        data.country == "" &&
                        localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
                    ) {
                        setValidationError({
                            newHcpCountry: "Please select the country",
                            index: index,
                        });
                        return;
                    }
                    return "true";
                } else if (data.email != "") {
                    let email = data.email;
                    let useremail = email.trim();
                    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    if (regex.test(String(useremail).toLowerCase())) {
                        let prev_obj = readers.find((x) => x.email === useremail);
                        let prev_obj_new = readersNewlyAdded.find(
                            (x) => x.email === useremail
                        );

                        if (
                            typeof prev_obj != "undefined" ||
                            typeof prev_obj_new != "undefined"
                        ) {
                            setValidationError({
                                newHcpEmail: "User with same email already added in list.",
                                index: index,
                            });
                            return;
                        }
                    } else {
                        setValidationError({
                            newHcpEmail: "Email format is not valid",
                            index: index,
                        });
                        return;
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
                        if (res.data.status_code === 200) {
                            toast.success("User added successfuly");
                            res.data.response.data.map((data) => {
                                setReadersNewlyAdded((oldArray) => [data, ...oldArray]);
                            });
                            setIsOpen(false);
                            setIsOpenAdd(false);
                        } else {
                            toast.warning(res.data.message);
                            loader("hide");
                        }
                        loader("hide");

                        //setSelectedHcp(res.data.response.data);
                    })
                    .catch((err) => {
                        loader("hide");
                        toast.error("Somwthing went wrong");
                    });
            } else {
                const filteredArray = status.filter((value) => value !== "true");
                toast.warning(filteredArray?.[0]);
                // toast.warning(status[0]);
            }

            //  setIsOpen(false);
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
                        if (res.data.status_code === 200) {
                            res.data.response.data.map((data) => {
                                setReadersNewlyAdded((oldArray) => [...oldArray, data]);
                            });
                            setIsOpenAdd(false);
                            setActiveManual("active");
                            setActiveExcel("");
                            setSelectedFile(null);
                            loader("hide");
                            toast.success("user added successfully");
                        } else {
                            toast.warning(res.data.message);
                            loader("hide");
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                setIsOpen(false);
            } else {
                toast.warning("Please add a excel file");
            }
        }
    };

    const editButtonClicked = () => {
        setSaveOpen(true);

        let temp_val = 1 - editable;
        setEditable(temp_val);
        setUpdate(update + 1);
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
                                            <Link to="/EmailArticleSelect">Select Content</Link>
                                        </li>
                                        <li className="active">
                                            <Link to="/CreateEmail">Create Your Email</Link>
                                        </li>
                                        <li className="active">
                                            <Link to="/SelectSmartList">
                                                {localStorage.getItem("user_id") == userId
                                                    ? "Select Users"
                                                    : "Select HCPs"}
                                            </Link>
                                        </li>
                                        {/*
                  <li className="active">
                    <Link to="/SelectSmartList">Select Smart List</Link>
                  </li>
                  */}

                                        <li className="active active-main">
                                            <Link to="/MedpakSelectSmartListUsers">Verify Your List</Link>
                                        </li>

                                        <li className="">
                                            <a href="javascript:void(0)">Verify Your Email</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-12 col-md-2">
                                    <div className="header-btn">
                                        <button
                                            className="btn btn-primary btn-bordered move-draft"
                                            onClick={saveAsDraft}
                                        >
                                            Save As Draft
                                        </button>
                                        <button
                                            className="btn btn-primary btn-filled next"
                                            onClick={nextClicked}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <section className="search-hcp">
                            <div className="result-hcp-table">

                            <div
                    className={
                      showfilter
                        ? "filter-by nav-item dropdown highlight"
                        : "filter-by nav-item dropdown"
                    }
                  >
                    <button
                      ref={buttonRef}
                      className={
                        Object.keys(filterObject).length > 0
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
                          />
                          <path
                            d="M15.3846 6.15362H11.6923C11.6923 5.47485 11.1403 4.92285 10.4615 4.92285H9.23077C8.552 4.92285 8 5.47485 8 6.15362H0.615385C0.275692 6.15362 0 6.4287 0 6.76901C0 7.10931 0.275692 7.38439 0.615385 7.38439H8C8 8.06316 8.552 8.61516 9.23077 8.61516H10.4615C11.1403 8.61516 11.6923 8.06316 11.6923 7.38439H15.3846C15.7243 7.38439 16 7.10931 16 6.76901C16 6.4287 15.7243 6.15362 15.3846 6.15362Z"
                            fill="#97B6CF"
                          />
                          <path
                            d="M15.3846 11.077H6.76923C6.76923 10.3982 6.21723 9.84619 5.53846 9.84619H4.30769C3.62892 9.84619 3.07692 10.3982 3.07692 11.077H0.615385C0.275692 11.077 0 11.352 0 11.6923C0 12.0327 0.275692 12.3077 0.615385 12.3077H3.07692C3.07692 12.9865 3.62892 13.5385 4.30769 13.5385H5.53846C6.21723 13.5385 6.76923 12.9865 6.76923 12.3077H15.3846C15.7243 12.3077 16 12.0327 16 11.6923C16 11.352 15.7243 11.077 15.3846 11.077Z"
                            fill="#97B6CF"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                                {/* <div className="table-title">
                                    <h4>
                                        {/* HCPs <span>| {smartListSelected.readers_count}</span>
                                    </h4>
                                    <div className="selected-hcp-table-action">
                                        {editable == false ? (
                                            <>
                                                {
                                                    localStorage.getItem('user_id') != 'iSnEsKu5gB/DRlycxB6G4g==' ?
                                                        <a
                                                            className="show-less-info"
                                                            onClick={(e) => showMoreInfo(e)}
                                                        >
                                                            {showLessInfo == true ? (
                                                                <p className="show_more">Show More information</p>
                                                            ) : (
                                                                <p className="show_less">Show less information</p>
                                                            )}{" "}
                                                        </a> : null
                                                }
                                                <div className="hcp-new-user">
                                                    <button
                                                        className="btn btn-outline-primary"
                                                        onClick={addNewUser}
                                                    >
                                                        <img
                                                            src={path_image + "new-user.svg"}
                                                            alt="New User"
                                                        />
                                                    </button>
                                                </div>
                                                <div className="hcp-added">
                                                    <button
                                                        className="btn btn-outline-primary"
                                                        onClick={editButtonClicked}
                                                    >
                                                        <img src={path_image + "edit.svg"} alt="Edit" />
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
                                </div> */}

                                {/* <div className="selected-hcp-list">
                                    {/* <table className="table">
                                        {/* <thead>
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Bounced</th>
                                                <th scope="col">Country</th>

                                                {localStorage.getItem("user_id") ==
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

                                                {showLessInfo == false ? (
                                                    <>
                                                        <th scope="col">Consent</th>
                                                        <th scope="col">Email received</th>
                                                        <th scope="col">Openings</th>
                                                        <th scope="col">Registrations</th>
                                                        <th scope="col">Last email</th>
                                                    </>
                                                ) : null}
                                            </tr>
                                        </thead> */}
                                {/* <tbody>
                                            {removedReaders?.map((rr, i) => {
                                                return (
                                                    <>
                                                        {/* <tr className="hcps-deleted">
                                                            <td>
                                                                <span>
                                                                    {rr?.first_name
                                                                        ? rr?.first_name + " " + rr?.last_name
                                                                        : "N/A"}
                                                                </span>
                                                            </td>
                                                            <td>{rr.email ? rr.email : "N/A"}</td>
                                                            <td>{rr.bounce ? rr.bounce : "N/A"}</td>
                                                            <td>
                                                                <span>{rr.country ? rr.country : "N/A"}</span>
                                                            </td>
                                                            <td>
                                                                {/*rr?.ibu ? rr?.ibu : "N/A"
                                                                {localStorage.getItem("user_id") ==
                                                                    "56Ek4feL/1A8mZgIKQWEqg=="
                                                                    ? rr?.irt
                                                                        ? "Yes"
                                                                        : "No"
                                                                    : rr.ibu && rr.ibu != 0
                                                                        ? rr.ibu
                                                                        : "N/A"}
                                                            </td>
                                                            {localStorage.getItem("user_id") ==
                                                                "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                                                <td>
                                                                    {rr?.user_type != 0 ? rr.user_type : "N/A"}
                                                                </td>
                                                            ) : (
                                                                <td>
                                                                    {rr.contact_type ? rr.contact_type : "N/A"}
                                                                </td>
                                                            )}

                                                            {showLessInfo == false ? (
                                                                <td>
                                                                    <span>{rr.consent ? rr.consent : "N/A"}</span>{" "}
                                                                </td>
                                                            ) : null}
                                                            {showLessInfo == false ? (
                                                                <td>
                                                                    <span>
                                                                        {rr.email_received
                                                                            ? rr.email_received
                                                                            : "N/A"}
                                                                    </span>
                                                                </td>
                                                            ) : null}
                                                            {showLessInfo == false ? (
                                                                <td>
                                                                    <span>
                                                                        {rr.email_opening
                                                                            ? rr.email_opening
                                                                            : "N/A"}
                                                                    </span>
                                                                </td>
                                                            ) : null}
                                                            {showLessInfo == false ? (
                                                                <td>
                                                                    <span>
                                                                        {rr.registration ? rr.registration : "N/A"}
                                                                    </span>
                                                                </td>
                                                            ) : null}
                                                            {showLessInfo == false ? (
                                                                <td>
                                                                    <span>
                                                                        {rr.last_email ? rr.last_email : "N/A"}
                                                                    </span>
                                                                </td>
                                                            ) : null}

                                                            <td className="add-new-hcp" colSpan="12">
                                                                <img
                                                                    src={path_image + "add-row.png"}
                                                                    alt="Add Row"
                                                                    onClick={() => readersAdded(rr, i)}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </>
                                                );
                                            })}

                                            {/* <tr className="seprator-add">
                                                <td colSpan="13"></td>
                                            </tr>
                                            {readersNewlyAdded?.map((readers, i) => {
                                                return (
                                                    <>
                                                        <tr
                                                            className="hcps-added"
                                                            onClick={(e) =>
                                                                editing(
                                                                    readers.profile_id,
                                                                    readers.profile_user_id,
                                                                    readers.email,
                                                                    readers.jobTitle,
                                                                    readers.company,
                                                                    readers.country,
                                                                    readers.first_name + " " + readers.last_name,
                                                                    readers.contact_type
                                                                )
                                                            }
                                                        >
                                                            <td
                                                                id={`field_name` + readers.profile_user_id}
                                                                contentEditable={
                                                                    editable === 0 ? "false" : "true"
                                                                }
                                                            >
                                                                <span>
                                                                    {readers.first_name
                                                                        ? readers.first_name +
                                                                        " " +
                                                                        readers.last_name
                                                                        : "N/A"}
                                                                </span>
                                                            </td>
                                                            <td>{readers.email ? readers.email : "N/A"}</td>
                                                            <input
                                                                type="hidden"
                                                                id={`field_index` + readers.profile_user_id}
                                                                value={i}
                                                            />
                                                            <td>{readers.bounce ? readers.bounce : "N/A"}</td>
                                                            <td>
                                                                {editable ? (
                                                                    <EditCountry
                                                                        selected_country={readers.country}
                                                                        profile_user={readers.profile_user_id}
                                                                    ></EditCountry>
                                                                ) : (
                                                                    <span>
                                                                        {readers.country ? readers.country : "N/A"}
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td>
                                                                {/*readers.ibu ? readers.ibu : "N/A"
                                                                {localStorage.getItem("user_id") ==
                                                                    "56Ek4feL/1A8mZgIKQWEqg=="
                                                                    ? readers?.irt
                                                                        ? "Yes"
                                                                        : "No"
                                                                    : readers.ibu && readers.ibu != 0
                                                                        ? readers.ibu
                                                                        : "N/A"}
                                                            </td>
                                                            <td>
                                                                {localStorage.getItem("user_id") ==
                                                                    "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                                                    <span>
                                                                        {readers.user_type != 0
                                                                            ? readers?.user_type
                                                                            : "N/A"}
                                                                    </span>
                                                                ) : editable ? (
                                                                    <EditContactType
                                                                        selected_ibu={readers.contact_type}
                                                                        profile_user={readers.profile_user_id}
                                                                    ></EditContactType>
                                                                ) : (
                                                                    <span>
                                                                        {readers.contact_type
                                                                            ? readers.contact_type
                                                                            : "N/A"}
                                                                    </span>
                                                                )}
                                                            </td>
                                                            {showLessInfo == false ? (
                                                                <td>
                                                                    <span>
                                                                        {readers.consent ? readers.consent : "N/A"}
                                                                    </span>{" "}
                                                                </td>
                                                            ) : null}
                                                            {showLessInfo == false ? (
                                                                <td>
                                                                    <span>
                                                                        {readers.email_received
                                                                            ? readers.email_received
                                                                            : "N/A"}
                                                                    </span>
                                                                </td>
                                                            ) : null}
                                                            {showLessInfo == false ? (
                                                                <td>
                                                                    <span>
                                                                        {readers.email_opening
                                                                            ? readers.email_opening
                                                                            : "N/A"}
                                                                    </span>
                                                                </td>
                                                            ) : null}
                                                            {showLessInfo == false ? (
                                                                <td>
                                                                    <span>
                                                                        {readers.registration
                                                                            ? readers.registration
                                                                            : "N/A"}
                                                                    </span>
                                                                </td>
                                                            ) : null}
                                                            {showLessInfo == false ? (
                                                                <td>
                                                                    <span>
                                                                        {readers.last_email
                                                                            ? readers.last_email
                                                                            : "N/A"}
                                                                    </span>
                                                                </td>
                                                            ) : null}
                                                            <td className="delete_row" colSpan="12">
                                                                <img
                                                                    src={path_image + "delete.svg"}
                                                                    alt="Delete Row"
                                                                    onClick={() => newlyAddedRemoved(readers, i)}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </>
                                                );
                                            })}
                                            {readers?.map((readers, i) => {
                                                return (
                                                    <>
                                                        <tr
                                                            id={`row-selected` + i}
                                                            onClick={(e) =>
                                                                editing(
                                                                    readers.profile_id,
                                                                    readers.profile_user_id,
                                                                    readers.email,
                                                                    readers.jobTitle,
                                                                    readers.company,
                                                                    readers.country,
                                                                    readers.first_name + " " + readers.last_name,
                                                                    readers.contact_type
                                                                )
                                                            }
                                                        >
                                                            <td
                                                                id={`field_name` + readers.profile_user_id}
                                                                contentEditable={
                                                                    editable === 0 ? "false" : "true"
                                                                }
                                                            >
                                                                <span>
                                                                    {" "}
                                                                    {readers.first_name
                                                                        ? readers.first_name +
                                                                        " " +
                                                                        readers.last_name
                                                                        : "N/A"}{" "}
                                                                </span>
                                                            </td>
                                                            <td id={`field_email` + readers.profile_user_id}>
                                                                {readers.email ? readers.email : "N/A"}
                                                            </td>
                                                            <input
                                                                type="hidden"
                                                                id={`field_index` + readers.profile_user_id}
                                                                value={i}
                                                            />
                                                            <td
                                                                id={`field_bounced` + readers.profile_user_id}
                                                            >
                                                                {readers.bounce ? readers.bounce : "N/A"}
                                                            </td>
                                                            <td>
                                                                {editable ? (
                                                                    <EditCountry
                                                                        selected_country={readers.country}
                                                                        profile_user={readers.profile_user_id}
                                                                    ></EditCountry>
                                                                ) : (
                                                                    <span>
                                                                        {readers.country ? readers.country : "N/A"}
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td>
                                                                {/*readers.ibu ? readers.ibu : "N/A"
                                                                {localStorage.getItem("user_id") ==
                                                                    "56Ek4feL/1A8mZgIKQWEqg=="
                                                                    ? readers?.irt
                                                                        ? "Yes"
                                                                        : "No"
                                                                    : readers.ibu && readers.ibu != 0
                                                                        ? readers.ibu
                                                                        : "N/A"}
                                                            </td>
                                                            <td>
                                                                {localStorage.getItem("user_id") ==
                                                                    "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                                                    <span>
                                                                        {readers.user_type != 0
                                                                            ? readers?.user_type
                                                                            : "N/A"}
                                                                    </span>
                                                                ) : editable ? (
                                                                    <EditContactType
                                                                        selected_ibu={readers.contact_type}
                                                                        profile_user={readers.profile_user_id}
                                                                    ></EditContactType>
                                                                ) : (
                                                                    <span>
                                                                        {readers.contact_type
                                                                            ? readers.contact_type
                                                                            : "N/A"}
                                                                    </span>
                                                                )}
                                                            </td>
                                                            {showLessInfo == false ? (
                                                                <td>
                                                                    <span>
                                                                        {readers.consent ? readers.consent : "N/A"}
                                                                    </span>
                                                                </td>
                                                            ) : null}
                                                            {showLessInfo == false ? (
                                                                <td>
                                                                    <span>
                                                                        {readers.email_received
                                                                            ? readers.email_received
                                                                            : "N/A"}
                                                                    </span>
                                                                </td>
                                                            ) : null}
                                                            {showLessInfo == false ? (
                                                                <td>
                                                                    <span>
                                                                        {readers.email_opening
                                                                            ? readers.email_opening
                                                                            : "N/A"}
                                                                    </span>
                                                                </td>
                                                            ) : null}
                                                            {showLessInfo == false ? (
                                                                <td>
                                                                    <span>
                                                                        {readers.registration
                                                                            ? readers.registration
                                                                            : "N/A"}
                                                                    </span>
                                                                </td>
                                                            ) : null}
                                                            {showLessInfo == false ? (
                                                                <td>
                                                                    <span>
                                                                        {readers.last_email
                                                                            ? readers.last_email
                                                                            : "N/A"}
                                                                    </span>
                                                                </td>
                                                            ) : null}
                                                            <td className="delete_row" colSpan="12">
                                                                <img
                                                                    src={path_image + "delete.svg"}
                                                                    alt="Add Row"
                                                                    onClick={() => deleteReader(i)}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </>
                                                );
                                            })}
                                        </tbody> 
                                    </table>
                                </div>*/}


                                <Accordion>
                                    {Object.keys(countryWiseData)?.length ? Object.keys(countryWiseData)?.map((country, index) => {
                                        return (
                                            <Accordion.Item eventKey={index}>
                                                <Accordion.Header>
                                                    {country}
                                                </Accordion.Header>

                                                <Accordion.Body className="card-body">
                                                    <div className="selected-hcp-list">
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">Name</th>
                                                                    <th scope="col">Email</th>
                                                                    <th scope="col">Bounced</th>
                                                                    <th scope="col">Country</th>
                                                                    <th scope="col">Business unit</th>
                                                                    <th scope="col">Contact type</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    countryWiseData?.[country]?.map((readers, i) => {
                                                                        return (
                                                                            <tr
                                                                                id={`row-selected` + i}
                                                                                onClick={(e) =>
                                                                                    editing(
                                                                                        readers.profile_id,
                                                                                        readers.profile_user_id,
                                                                                        readers.email,
                                                                                        readers.jobTitle,
                                                                                        readers.company,
                                                                                        readers.country,
                                                                                        readers.first_name + " " + readers.last_name,
                                                                                        readers.contact_type
                                                                                    )
                                                                                }
                                                                            >
                                                                                <td
                                                                                    id={`field_name` + readers.profile_user_id}
                                                                                    contentEditable={
                                                                                        editable === 0 ? "false" : "true"
                                                                                    }
                                                                                >
                                                                                    <span>
                                                                                        {" "}
                                                                                        {readers.first_name
                                                                                            ? readers.first_name +
                                                                                            " " +
                                                                                            readers.last_name
                                                                                            : "N/A"}{" "}
                                                                                    </span>
                                                                                </td>

                                                                                <td id={`field_email` + readers.profile_user_id}>
                                                                                    {readers.email ? readers.email : "N/A"}
                                                                                </td>
                                                                                <input
                                                                                    type="hidden"
                                                                                    id={`field_index` + readers.profile_user_id}
                                                                                    value={i}
                                                                                />
                                                                                <td
                                                                                    id={`field_bounced` + readers.profile_user_id}
                                                                                >
                                                                                    {readers.bounce ? readers.bounce : "N/A"}
                                                                                </td>
                                                                                <td>
                                                                                    {editable ? (
                                                                                        <EditCountry
                                                                                            selected_country={readers.country}
                                                                                            profile_user={readers.profile_user_id}
                                                                                        ></EditCountry>
                                                                                    ) : (
                                                                                        <span>
                                                                                            {readers.country ? readers.country : "N/A"}
                                                                                        </span>
                                                                                    )}
                                                                                </td>
                                                                                <td>

                                                                                    {readers?.ibu && readers?.ibu != 0
                                                                                        ? readers?.ibu
                                                                                        : "N/A"
                                                                                    }
                                                                                </td>
                                                                                <td>
                                                                                    {localStorage.getItem("user_id") ==
                                                                                        "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                                                                        <span>
                                                                                            {readers.user_type != 0
                                                                                                ? readers?.user_type
                                                                                                : "N/A"}
                                                                                        </span>
                                                                                    ) : editable ? (
                                                                                        <EditContactType
                                                                                            selected_ibu={readers.contact_type}
                                                                                            profile_user={readers.profile_user_id}
                                                                                        ></EditContactType>
                                                                                    ) : (
                                                                                        <span>
                                                                                            {readers.contact_type
                                                                                                ? readers.contact_type
                                                                                                : "N/A"}
                                                                                        </span>
                                                                                    )}
                                                                                </td>
                                                                                <td className="delete_row" colSpan="12">
                                                                                    <img
                                                                                        src={path_image + "delete.svg"}
                                                                                        alt="Add Row"
                                                                                        onClick={() => deleteReader(i)}
                                                                                    />
                                                                                </td>
                                                                            </tr>)
                                                                    })
                                                                }
                                                            </tbody>

                                                        </table>
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>)
                                    }) : ""}

                                </Accordion>

                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <Modal
                id="add_hcp"
                show={isOpenAdd}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <div
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex="-1"
                    aria-hidden="true"
                >
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">
                            {localStorage.getItem("user_id") == userId
                                ? "Add New User +"
                                : "Add New HCP"}
                        </h5>
                        <button
                            onClick={() => {
                                setIsOpenAdd(false);
                                setHpc([
                                    {
                                        firstname: "",
                                        lastname: "",
                                        email: "",
                                        contact_type: "",
                                        country: "",
                                        countryIndex: "",
                                        role:
                                            localStorage.getItem("user_id") ==
                                                "56Ek4feL/1A8mZgIKQWEqg=="
                                                ? irtRole?.[0]?.value
                                                : "",
                                        optIrt:
                                            localStorage.getItem("user_id") ==
                                                "56Ek4feL/1A8mZgIKQWEqg=="
                                                ? "yes"
                                                : "",
                                        institutionType: "",
                                    },
                                ]);
                                setActiveManual("active");
                                setActiveExcel("");
                            }}
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="hcp-add-box">
                            <div className="hcp-add-form tab-content">
                                <form id="add_hcp_form" className={"tab-pane" + activeManual}>
                                    {hpc.map((val, i) => {
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
                                                                            )}{" "}
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className={
                                                                            validationError?.newHcpFirstName &&
                                                                                validationError?.index == i
                                                                                ? "form-control error"
                                                                                : "form-control"
                                                                        }
                                                                        onChange={(event) =>
                                                                            onFirstNameChange(event, i)
                                                                        }
                                                                        value={val.firstname}
                                                                    />
                                                                    {validationError?.newHcpFirstName &&
                                                                        validationError?.index == i ? (
                                                                        <div className="login-validation">
                                                                            {validationError?.newHcpFirstName}
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-md-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="">
                                                                        Last name{" "}
                                                                        {localStorage.getItem("user_id") ==
                                                                            "56Ek4feL/1A8mZgIKQWEqg==" && (
                                                                                <span>*</span>
                                                                            )}{" "}
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className={
                                                                            validationError?.newHcpLastName &&
                                                                                validationError?.index == i
                                                                                ? "form-control error"
                                                                                : "form-control"
                                                                        }
                                                                        onChange={(event) =>
                                                                            onLastNameChange(event, i)
                                                                        }
                                                                        value={val.lastname}
                                                                    />
                                                                    {validationError?.newHcpLastName &&
                                                                        validationError?.index == i ? (
                                                                        <div className="login-validation">
                                                                            {validationError?.newHcpLastName}
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-md-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="">
                                                                        Email <span>*</span>
                                                                    </label>
                                                                    <input
                                                                        type="email"
                                                                        className={
                                                                            validationError?.newHcpEmail &&
                                                                                validationError?.index == i
                                                                                ? "form-control error"
                                                                                : "form-control"
                                                                        }
                                                                        id="email-desc"
                                                                        name={`${fieldName}.email`}
                                                                        onChange={(event) =>
                                                                            onEmailChange(event, i)
                                                                        }
                                                                        value={val.email}
                                                                    />
                                                                    {validationError?.newHcpEmail &&
                                                                        validationError?.index == i ? (
                                                                        <div className="login-validation">
                                                                            {validationError?.newHcpEmail}
                                                                        </div>
                                                                    ) : null}
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
                                                                                className={
                                                                                    validationError?.newHcpInstitution &&
                                                                                        validationError?.index == i
                                                                                        ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                                                                        : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                                                                }
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
                                                                            {validationError?.newHcpInstitution &&
                                                                                validationError?.index == i ? (
                                                                                <div className="login-validation">
                                                                                    {validationError?.newHcpInstitution}
                                                                                </div>
                                                                            ) : null}
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
                                                                                        (el) => el.value == val?.optIrt
                                                                                    ) == -1
                                                                                        ? ""
                                                                                        : optIRT[
                                                                                        optIRT.findIndex(
                                                                                            (el) =>
                                                                                                el.value == val?.optIrt
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
                                                                                            (el) => el.value == val?.role
                                                                                        ) == -1
                                                                                            ? ""
                                                                                            : irtRole[
                                                                                            irtRole?.findIndex(
                                                                                                (el) =>
                                                                                                    el.value == val?.role
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
                                                                                            (el) => el.value == val?.role
                                                                                        ) == -1
                                                                                            ? ""
                                                                                            : role[
                                                                                            role?.findIndex(
                                                                                                (el) =>
                                                                                                    el.value == val?.role
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
                                                                            )}{" "}
                                                                    </label>
                                                                    {val?.optIrt == "yes" ? (
                                                                        <>
                                                                            <Select
                                                                                options={irtCountry}
                                                                                className={
                                                                                    validationError?.index == i &&
                                                                                        validationError?.newHcpCountry
                                                                                        ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                                                                        : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                                                                }
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
                                                                                            (el) =>
                                                                                                el.value == val?.country
                                                                                        )
                                                                                        ]
                                                                                }
                                                                                placeholder="Select Country"
                                                                                filterOption={createFilter(
                                                                                    filterConfig
                                                                                )}
                                                                                isClearable
                                                                            />

                                                                            {validationError?.newHcpCountry &&
                                                                                validationError?.index == i && (
                                                                                    <div className="login-validation">
                                                                                        {validationError?.newHcpCountry}
                                                                                    </div>
                                                                                )}
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Select
                                                                                options={countryall}
                                                                                className={
                                                                                    validationError?.index == i &&
                                                                                        validationError?.newHcpCountry
                                                                                        ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                                                                        : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                                                                }
                                                                                ss
                                                                                onChange={(event) =>
                                                                                    onCountryChange(event, i)
                                                                                }
                                                                                value={
                                                                                    countryall.findIndex(
                                                                                        (el) => el.value == val?.country
                                                                                    ) == -1
                                                                                        ? ""
                                                                                        : countryall[
                                                                                        countryall.findIndex(
                                                                                            (el) =>
                                                                                                el.value == val?.country
                                                                                        )
                                                                                        ]
                                                                                }
                                                                                placeholder="Select Country"
                                                                                filterOption={createFilter(
                                                                                    filterConfig
                                                                                )}
                                                                                isClearable
                                                                            />
                                                                            {validationError?.newHcpCountry &&
                                                                                validationError?.index == i && (
                                                                                    <div className="login-validation">
                                                                                        {validationError?.newHcpCountry}
                                                                                    </div>
                                                                                )}
                                                                        </>
                                                                    )}
                                                                    {/*
                                    <DropdownButton className="dropdown-basic-button split-button-dropup country"
                                            title= {hpc[i].country != "" &&  hpc[i].country != "undefined" ? hpc[i].country == "B&H" ? "Bosnia and Herzegovina" : hpc[i].country : "Select Country" }
                                            onSelect={(event) => onCountryChange(event, i)}
                                            >
                                            <div className="scroll_div">
                                            {countryall.length === 0
                                            ? ""
                                            : Object.entries(countryall).map(
                                            ([index, item]) => {
                                            return (
                                            <>
                                            <Dropdown.Item eventKey={index} className = {hpc[i].country == index ? "active" : "" }>{item == "B&H" ? "Bosnia and Herzegovina" : item}</Dropdown.Item>
                                            </>
                                          );
                                        }
                                      )}
                                      </div>
                                      </DropdownButton>
                                    */}
                                                                </div>
                                                            </div>
                                                            {/*
                              <div className="col-12 col-md-6 btn_rmv">
                                <div className="form-group">
                                  {i !== 0 && (
                                    <button
                                      type="button"
                                      className="btn btn-filled"
                                      onClick={() => deleteRecord(i)}
                                    >
                                      Remove
                                    </button>
                                  )}
                                </div>
                              </div>
                              */}
                                                            {
                                                                localStorage.getItem("user_id") ===
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
                                                                                        siteNameAll[hpc[i].siteNameIndex]
                                                                                            ? siteNameAll[hpc[i].siteNameIndex]
                                                                                            : ""
                                                                                    }
                                                                                    placeholder={"Select Site Name"}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    ""
                                                                )
                                                            }
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
                                                                                    alt="Delete Row"
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
                                                                        href="#add_hcp_form"
                                                                    >
                                                                        {localStorage.getItem("user_id") == userId
                                                                            ? "Add User +"
                                                                            : "Add HCP +"}
                                                                    </a>
                                                                </li>
                                                                {/*
                                 <li className="nav-item add-file">
                                   <a
                                     id="add_file_btn"
                                     onClick={(e) => addFile(e)}
                                     className="nav-link btn-filled"
                                     data-bs-toggle="tab"
                                     href="#add_file"
                                   >
                                     Add File
                                   </a>
                                 </li>
                              */}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    })}
                                </form>
                                {/*
                  <form id="add_file" className={"tab-pane" + activeExcel}>
                    <div className="form-group files">
                      <input
                        type="file"
                        className="form-control"
                        multiple=""
                        onChange={onFileChange}
                      />
                    </div>
                  </form>
                */}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-primary save btn-filled"
                            onClick={saveClicked}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </Modal >
        </>
    );
};

const mapStateToProps = (state) => {
    old_object = state.getEmailData ? state.getEmailData : {};
    return state;
};

export default connect(mapStateToProps)(MedpakSelectSmartListUsers);
