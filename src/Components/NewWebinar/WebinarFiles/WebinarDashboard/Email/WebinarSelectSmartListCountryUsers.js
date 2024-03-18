import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loader } from "../../../../../loader";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { popup_alert } from "../../../../../popup_alert";
import { Modal, Dropdown, Table } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import EditCountry from "../../../../CommonComponent/EditCountry";
import EditContactType from "../../../../CommonComponent/EditContactType";
import Select, { createFilter } from "react-select";
import Accordion from "react-bootstrap/Accordion";
import AddNewContactModal from "../../../../../Model/AddNewContactModal";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
var old_object = {};

const WebinarSelectSmartListCountryUsers = (props) => {

    const [totalData, setTotalData] = useState({});
    const navigate = useNavigate();
    const { eventIdContext, handleEventId } = useSidebar()
    const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"))
    const [eventId, setEventId] = useState(
        eventIdContext?.eventId
            ? eventIdContext?.eventId
            : localStorageEvent?.eventId
    );
    let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    const location = useLocation();
    const [selectedHcp, setSelectedHcp] = useState(location.state?.selectedHcp
        ? location.state?.selectedHcp : location.state?.flag != 1 ?
            props.getWebinarDraftData?.campaign_data?.selectedHcp
                ? props.getWebinarDraftData?.campaign_data?.selectedHcp :
                [] : []);
    const [removedHcp, setRemovedHcp] = useState(location.state?.removedHcp
        ? location.state?.removedHcp : location.state?.flag != 1 ?
            props.getWebinarDraftData?.campaign_data?.removedHcp
                ? props.getWebinarDraftData?.campaign_data?.removedHcp :
                [] : []);

    const [readers, setReaders] = useState([]);
    const [campaign_id_st, setCampaign_id] = useState();
    const [showLessInfo, setShowLessInfo] = useState(true);
    const [removedReaders, setRemovedReaders] = useState([]);
    const [readersNewlyAdded, setReadersNewlyAdded] = useState([]);
    const [reRender, setReRender] = useState(0);
    const [userId, setUserId] = useState("56Ek4feL/1A8mZgIKQWEqg==");
    const [update, setUpdate] = useState(0);
    const [activeManual, setActiveManual] = useState("active");
    const [activeExcel, setActiveExcel] = useState("");
    const [sortOrder, setSortOrder] = useState(true);
    const [editableData, setEditableData] = useState([]);
    const [sorting, setSorting] = useState(0);
    const [countryall, setCountryall] = useState([]);
    const [saveOpen, setSaveOpen] = useState(false);
    const [editable, setEditable] = useState(0);
    const [updateCounter, setUpdateCounter] = useState(0);
    const [sortingCount, setSortingCount] = useState(0);
    const [sortingUsers, setSortingUsers] = useState(0);
    const [sortingCountUsers, setSortingCountUsers] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [countryWiseData, setCountryWiseData] = useState({
        discardCountryData: "",
        allCountryData: ""
    });
    const [newlyAddedCountryWiseData, setNewlyAddedCountryWiseData] = useState({})
    const buttonRef = useRef(null);
    const [counterFlag, setCounterFlag] = useState(0);
    const [hpc, setHpc] = useState([
        {
            firstname: "",
            lastname: "",
            email: "",
            contact_type: "",
            country: "",
            countryIndex: "",
        },
    ]);
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [validationError, setValidationError] = useState({});

    // const smartListSelected = location.state
    //   ? location.state.smartListSelected
    //   : props.getDraftData.smart_list_data;

    useEffect(() => {
        let campaign_id =
            typeof old_object === "object" &&
                old_object !== null &&
                old_object?.campaign_id
                ? old_object?.campaign_id
                : props.getWebinarDraftData?.campaign_id
                    ? props.getWebinarDraftData?.campaign_id
                    : "";
        setCampaign_id(campaign_id);

        // removedHcp
        if (old_object?.removedHcp) {
            if (old_object?.removedHcp?.length > 0) {
                setRemovedReaders(old_object?.removedHcp);
            }
        } else {
            if (location?.state?.flag != 1 && props?.getWebinarDraftData && props.getWebinarDraftData?.campaign_data?.removedHcp) {
                if (
                    typeof props.getWebinarDraftData?.campaign_data?.removedHcp != "undefined" &&
                    props.getWebinarDraftData?.campaign_data?.removedHcp != ""
                ) {
                    setRemovedReaders(props.getWebinarDraftData?.campaign_data?.removedHcp);
                }
            }
        }
    }, []);

    useEffect(() => {
        getDataByCountryWise();
        getalCountry();
    }, []);

    const inputElement = useRef();
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;

    const getDataByCountryWise = () => {
        const body = {
            user_id: localStorage.getItem("user_id"),
            list_id: props.getWebinarSelectedSmartListData?.id
                ? props.getWebinarSelectedSmartListData?.id
                : props.getWebinarDraftData?.campaign_data?.smart_list_id,
            show_specific: 1,
        };

        if (!selectedHcp?.length && !selectedHcp?.length) {
            loader("show");
            axios
                .post(`distributes/get_reders_list`, body)
                .then((res) => {
                    setReaders(res?.data?.response?.data);
                    let otherCountry = []
                    const processedData = res?.data?.response?.data?.reduce((acc, person) => {
                        const country = person?.country?.toUpperCase();
                        if (!otherCountry?.includes(country)) {
                            otherCountry?.push(country);
                        }

                        if (!acc[country]) {
                            acc[country] = [];
                        }

                        acc[country].push(person);
                        return acc;
                    }, {});
                    setCountryWiseData({ ...countryWiseData, allCountryData: processedData });
                    loader("hide");
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setReaders(selectedHcp);

            const processedData = {};
            const otherCountry = [];
            const removedUsers = [];

            selectedHcp?.forEach(person => {
                const country = (person && person?.country && person?.country.toUpperCase()) || null;
                if (country) {
                    if (!processedData[country]) {
                        processedData[country] = [];
                    }
                    processedData[country]?.push(person);

                    if (!otherCountry?.includes(country)) {
                        otherCountry?.push(country);
                    }
                }
            });

            if (removedHcp) {
                removedHcp?.forEach(element => {
                    const country = (element && element?.country && element?.country?.toUpperCase()) || null;
                    if (country && processedData[country]) {
                        removedUsers?.push(element);
                    }
                });
            }

            const removedHcpData = removedHcp?.reduce((acc, person) => {
                const country = (person && person?.country && person?.country?.toUpperCase()) || null;
                if (!(country && processedData[country])) {
                    if (country) {
                        if (!otherCountry?.includes(country)) {
                            otherCountry?.push(country);
                        }
                        if (!acc[country]) {
                            acc[country] = [];
                        }
                        acc[country]?.push(person);
                    }
                }
                return acc;
            }, {});

            setRemovedReaders(removedUsers);
            setCountryWiseData({
                ...countryWiseData,
                allCountryData: processedData,
                discardCountryData: removedHcpData
            });
            loader("hide");

        }
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
                    setTotalData(res?.data?.response?.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const setHpcList = (list) => {
        setHpc(list)
    }

    const backClicked = () => {
        setSelectedHcp([]);
        setRemovedHcp([]);
        navigate("/webinar/email/selectSmartList");
    };

    const saveAsDraft = async () => {
        let allCountryData = []
        let discardCountryData = []
        for (const key in countryWiseData) {
            let data = countryWiseData[key]
            if (key == "allCountryData") {
                for (const key2 in data) {
                    data[key2].map((data) => {
                        allCountryData.push(data)
                    })

                }
            }
            else {
                for (const key2 in data) {
                    data[key2].map((data) => {
                        discardCountryData.push(data)
                    })

                }
            }
        }
        const body = {
            user_id: localStorage.getItem("user_id"),
            // pdf_id: old_object?.PdfSelected
            //     ? old_object.PdfSelected
            //     : props.getDraftData.pdf_id,
            eventId: eventId,
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
            campaign_name: old_object?.emailCampaign
                ? old_object?.emailCampaign
                : props.getWebinarDraftData?.campaign,
            subject: old_object?.emailSubject
                ? old_object?.emailSubject
                : props.getWebinarDraftData.subject,
            route_location: "webinar/email/selectSmartListUsers",
            tags: old_object?.tags ? old_object?.tags : props.getWebinarDraftData?.tags,
            campaign_data: {
                template_id: old_object?.templateId
                    ? old_object?.templateId
                    : props.getWebinarDraftData?.campaign_data?.template_id,
                smart_list_id: props.getWebinarSelectedSmartListData?.id
                    ? props.getWebinarSelectedSmartListData?.id
                    : props.getWebinarDraftData?.campaign_data?.smart_list_id,
                //smart_list_data: readers,
                // users_list : smartListSelected,
                selectedHcp: allCountryData,
                list_selection: old_object?.selected
                    ? old_object?.selected
                    : props.getWebinarDraftData?.campaign_data?.list_selection
                        ? props.getWebinarDraftData?.campaign_data?.list_selection
                        : 0,
                removedHcp: [...removedReaders, ...discardCountryData],
            },

            campaign_id: campaign_id_st,
            source_code: old_object?.template
                ? old_object?.template
                : props.getWebinarDraftData?.source_code,
            status: 2,
        };

        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        loader("show");
        await axios
            .post(`emailapi/save_draft`, body)
            .then((res) => {
                if (res?.data?.status_code == 200) {
                    setCampaign_id(res?.data?.response?.data?.id);
                    popup_alert({
                        visible: "show",
                        message: "Your changes has been saved <br />successfully !",
                        type: "success",
                        redirect: "/webinar/email",
                    });
                    loader("hide");
                } else {
                    toast.warning(res?.data?.message);
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

        let allCountryData = []
        let discardCountryData = []
        for (const key in countryWiseData) {
            let data = countryWiseData[key]
            if (key == "allCountryData") {
                for (const key2 in data) {
                    data[key2].map((data) => {
                        allCountryData.push(data)
                    })

                }
            }
            else {
                for (const key2 in data) {
                    data[key2].map((data) => {
                        discardCountryData.push(data)
                    })

                }
            }
        }

        navigate("/webinar/email/verifyMAIL", {
            // data: data,
            // smartListName: smartListName,
            state: {
                selectedHcp: allCountryData,
                removedHcp: [...removedReaders, ...discardCountryData]
            },
        });
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
            },
        ]);
        setActiveManual("active");
        setActiveExcel("");
    };

    const editButtonClicked = () => {
        setSaveOpen(true);

        let temp_val = 1 - editable;
        setEditable(temp_val);
        setUpdate(update + 1);
    };
    function sortObj(obj) {
        const sortedKeys = Object.keys(obj)?.sort();

        if (!sortOrder) {
            sortedKeys.reverse();
        }
        setSortOrder(!sortOrder)
        return sortedKeys?.reduce(function (result, key) {
            result[key] = obj[key];
            return result;
        }, {});
    }

    const sortSelectedCountry = () => {
        let normalArr = JSON.parse(JSON.stringify(countryWiseData))
        let getSortObj = {}

        for (const key in normalArr) {
            let data = normalArr[key];
            data = sortObj(data)
            getSortObj[key] = data
        }
        setCountryWiseData(getSortObj)

    };

    const closeModalClicked = () => {
        setIsOpenAdd(false);
        // setIsOpensend(true);
        setHpc([
          {
            firstname: "",
            lastname: "",
            email: "",
            contact_type: "",
            country: "",
           
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
      }

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

    const sortSelectedUsers = (e, country) => {
        const normalArr = countryWiseData[country];

        if (sortingUsers == 0) {
            normalArr.sort((a, b) =>
                a?.first_name?.toLowerCase() > b?.first_name?.toLowerCase()
                    ? 1
                    : b?.first_name?.toLowerCase() > a?.first_name?.toLowerCase()
                        ? -1
                        : 0
            );
        } else {
            normalArr?.sort((a, b) =>
                a?.first_name?.toLowerCase() < b?.first_name?.toLowerCase()
                    ? 1
                    : b?.first_name?.toLowerCase() < a?.first_name?.toLowerCase()
                        ? -1
                        : 0
            );
        }
        setCountryWiseData(prevData => ({
            ...prevData,
            [country]: normalArr,
        }));

        setSortingUsers(1 - sortingUsers);
        setSortingCountUsers(sortingCountUsers + 1);
    };

    const addRemovedReader = (user, i) => {
        const readersRemoved = removedReaders;
        readersRemoved.splice(i, 1);
        setRemovedReaders(readersRemoved);
        const { country, ...userData } = user;
        const uppercaseCountry = country?.toUpperCase();
        const combinedUserData = { ...userData, country: country };
        if (countryWiseData?.discardCountryData[uppercaseCountry]) {
            // Add user object to discardCountryData for the specific country
            setCountryWiseData((prevData) => ({
                discardCountryData: {
                    ...prevData.discardCountryData,
                    [uppercaseCountry]: [...prevData.discardCountryData[uppercaseCountry], combinedUserData],
                },
                allCountryData: { ...prevData.allCountryData },
            }));
        }
        else if (countryWiseData?.allCountryData[uppercaseCountry]) {
            setCountryWiseData((prevData) => ({
                discardCountryData: { ...prevData.discardCountryData },
                allCountryData: {
                    ...prevData.allCountryData,
                    [uppercaseCountry]: [...prevData.allCountryData[uppercaseCountry], combinedUserData],
                },
            }));
        }



        setReRender(reRender + 1);

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

            let prev_obj = editableData?.find(
                (x) => x?.profile_user_id === profile_user_id
            );
            if (typeof prev_obj != "undefined") {
                //update existing
                editableData?.map(
                    (obj) => arr?.find((o) => o?.profile_user_id === profile_user_id) || obj
                );
            } else {
                //create new
                setEditableData((oldArray) => [...oldArray, ...arr]);
            }

        }
    };


    const deleteReader = (country, index, i) => {
        const previous_removed_users = removedReaders;
        const readersList = JSON.parse(JSON.stringify(countryWiseData["allCountryData"]))
        if (Object.keys(readersList[country])?.length > 1 && readersList[country]?.length > 1) {
            const removedReader = readersList[country]?.splice(i, 1);
            setCountryWiseData({ ...countryWiseData, allCountryData: readersList })
            setRemovedReaders((oldArray) => [...oldArray, removedReader[0]]);
        } else {
            // toast.warning("There must be at least one user present.");
            popup_alert({
                visible: "show",
                message: "There must be at least one user in list.",
                type: "error",
                redirect: "",
            });
        }
    };

    const deleteCountryData = (selectedCountry) => {
        if (countryWiseData?.allCountryData[selectedCountry]) {
            // Remove selected country data from allCountryData
            const updatedAllCountryData = { ...countryWiseData.allCountryData };
            if (Object.keys(updatedAllCountryData)?.length > 1) {
                const discardedData = updatedAllCountryData[selectedCountry];
                delete updatedAllCountryData[selectedCountry];

                // Update state with the modified data
                setCountryWiseData((prevData) => ({
                    discardCountryData: {
                        ...prevData.discardCountryData,
                        [selectedCountry]: discardedData,
                    },
                    allCountryData: updatedAllCountryData,
                }));
            } else {
                // toast.warning("There must be at least one country present.");
                popup_alert({
                    visible: "show",
                    message: "There must be at least one country or delete the smart list",
                    type: "error",
                    redirect: "",
                });
            }

        } else {
            console.error(`${selectedCountry} not found in allCountryData.`);
        }
    }

    const addCountryData = (selectedCountry) => {
        // Check if the selected country exists in discardCountryData
        if (countryWiseData.discardCountryData[selectedCountry]) {
            // Remove selected country data from discardCountryData
            const { [selectedCountry]: removedData, ...updatedDiscardCountryData } =
                countryWiseData?.discardCountryData;

            // Update allCountryData with the removed data
            setCountryWiseData((prevData) => ({
                discardCountryData: updatedDiscardCountryData,
                allCountryData: {
                    [selectedCountry]: removedData,
                    ...prevData.allCountryData,
                },
            }));
        } else {
            console.error(`${selectedCountry} not found in discardCountryData.`);
        }
    }

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
        // setEmailData(e.target.value);
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
            const value = e?.value;
            const list = [...hpc];
            const name = hpc[i]?.country;
            list[i].country = value;
            setHpc(list);
        }
    };

    const deleteRecord = (i) => {
        const list = hpc;
        list?.splice(i, 1);
        setHpc(list);
        setCounterFlag(counterFlag + 1);
    };

    const addMoreHcp = () => {
        const status = hpc?.map((data) => {
            if (data?.email == "" || data?.country == "") {
                return "false";
            } else {
                return "true";
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
                },
            ]);
        } else {
            toast.warning("Please input the required fields.");
        }
    };

    const saveClicked = async () => {
        //   setIsOpenAdd(false);

        if (activeManual == "active") {
            const body_data = hpc?.map((data) => {
                return {
                    first_name: data?.firstname,
                    last_name: data?.lastname,
                    email: data?.email,
                    country: data?.country,
                    contact_type: data?.contact_type,
                };
            });

            const body = {
                data: body_data,
                user_id: localStorage.getItem("user_id"),
                smart_list_id: "",
            };

            const status = body?.data?.map((data, index) => {
                if (
                    data?.email == "" ||
                    data?.country == ""
                ) {
                    if (data?.email == "") {
                        setValidationError({
                            newHcpEmail: "Please enter the email atleast",
                            index: index,
                        });

                        return;
                    }
                    if (
                        data?.country == ""
                    ) {
                        setValidationError({
                            newHcpCountry: "Please select the country",
                            index: index,
                        });
                        return;
                    }
                    return "true";
                } else if (data?.email != "") {

                    let email = data?.email;
                    let useremail = email?.trim();
                    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    if (regex.test(String(useremail).toLowerCase())) {
                        let prev_obj = isEmailInBothArrays(useremail);
                        // let prev_obj = readers.find((x) => x.email === useremail);
                        // let prev_obj_new = readersNewlyAdded.find(
                        //   (x) => x.email === useremail
                        // );

                        if (prev_obj) {
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
                        if (res?.data?.status_code === 200) {
                            toast.success("User added successfuly");
                            let addUsers = addUserToCountry(res?.data?.response.data);
                            //   res.data.response.data.map((data) => {
                            //     setReadersNewlyAdded((oldArray) => [data, ...oldArray]);
                            //   });
                            setIsOpen(false);
                            setIsOpenAdd(false);
                        } else {
                            toast.warning(res?.data?.message);
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
                const filteredArray = status?.filter((value) => value !== "true");
                toast.warning(filteredArray?.[0]);
            }
        }
    };

    const saveEditClicked = async () => {
        setEditable(0);
        if (editableData?.length > 0) {
            editableData?.map((data) => {
                const name_edit = document.getElementById(
                    "field_name" + data?.profile_user_id
                ).innerText;
                const country_edit = document.getElementById(
                    "field_country" + data?.profile_user_id
                ).value;
                const edit_index = document.getElementById(
                    "field_index" + data?.profile_user_id
                ).value;
                const contact_type_edit =
                    localStorage.getItem("user_id") !== "56Ek4feL/1A8mZgIKQWEqg=="
                        ? document.getElementById(
                            "field_contact_type" + data?.profile_user_id
                        ).value
                        : "";

                // let prev_obj = readers.find(
                //   (x) => x.profile_user_id === data.profile_user_id
                // );
                // if (typeof prev_obj != "undefined") {
                //   if (typeof readers[edit_index] != "undefined") {
                //     readers[edit_index].country = country_edit;
                //   }
                //   if (typeof readers[edit_index] != "undefined") {
                //     readers[edit_index].contact_type = contact_type_edit;
                //   }
                // } else {
                //   if (typeof readersNewlyAdded[edit_index] != "undefined") {
                //     readersNewlyAdded[edit_index].country = country_edit;
                //   }
                //   if (typeof readersNewlyAdded[edit_index] != "undefined") {
                //     readersNewlyAdded[edit_index].contact_type = contact_type_edit;
                //   }
                // }
                let name = name_edit.split(' ');
                data.country = country_edit;
                data.username = name_edit;
                data.first_name = name?.[0];
                data.last_name = name?.length > 1 ? name.slice(1).join(' ') : '';
                data.bounce = "No";
                data.contact_type = contact_type_edit;
            });

            const userIdsToUpdate = editableData?.map((userData) => userData?.profile_user_id);

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
                        const updateUserDetails = updateUserByIds(userIdsToUpdate, editableData);
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

    const isEmailInBothArrays = (email) => {
        // Check in discardCountryData
        for (const countryData of Object.values(countryWiseData.discardCountryData)) {
            if (countryData.some((user) => user?.email?.toLowerCase() === email)) {

                return true;
            }
        }

        // Check in allCountryData
        for (const countryData of Object.values(countryWiseData?.allCountryData)) {
            if (countryData.some((user) => user?.email?.toLowerCase() === email)) {
                return true;
            }
        }
        if (removedReaders?.some((user) => user?.email?.toLowerCase() === email)) {
            return true;
        }
        return false;
    };

    const addUserToCountry = (users) => {

        users.forEach((user) => {
            const { country, ...userData } = user;
            const uppercaseCountry = country?.toUpperCase();

            const combinedUserData = { ...userData, country: country };

            if (countryWiseData.discardCountryData[uppercaseCountry]) {
                // Add user object to discardCountryData for the specific country
                setCountryWiseData((prevData) => ({
                    discardCountryData: {
                        ...prevData.discardCountryData,
                        [uppercaseCountry]: [...prevData.discardCountryData[uppercaseCountry], combinedUserData],
                    },
                    allCountryData: { ...prevData.allCountryData },
                }));
            } else if (countryWiseData.allCountryData[uppercaseCountry]) {
                // Add user object to allCountryData for the specific country
                setCountryWiseData((prevData) => ({
                    discardCountryData: { ...prevData.discardCountryData },
                    allCountryData: {
                        ...prevData.allCountryData,
                        [uppercaseCountry]: [...prevData.allCountryData[uppercaseCountry], combinedUserData],
                    },
                }));
            } else {
                // Add country and user object to allCountryData
                setCountryWiseData((prevData) => ({
                    discardCountryData: { ...prevData.discardCountryData },
                    allCountryData: {
                        ...prevData.allCountryData,
                        [uppercaseCountry]: [combinedUserData],
                    },
                }));
            }
        });
    };


    const updateUserByIds = (userIds, updatedDataArray) => {
        const updatedDiscardCountryData = { ...countryWiseData.discardCountryData };
        const updatedAllCountryData = { ...countryWiseData.allCountryData };

        userIds.forEach((userId) => {
            const updatedUserData = updatedDataArray?.find((data) => data.profile_user_id === userId);

            // Remove user from their current country in discardCountryData
            Object.entries(updatedDiscardCountryData).forEach(([country, users]) => {
                updatedDiscardCountryData[country] = users?.filter((user) => user.profile_user_id !== userId);
                if (updatedAllCountryData[country] == 0) {
                    delete updatedAllCountryData[country]
                }

            });

            // Remove user from their current country in allCountryData
            Object.entries(updatedAllCountryData).forEach(([country, users]) => {
                updatedAllCountryData[country] = users?.filter((user) => user.profile_user_id !== userId);
                if (updatedAllCountryData[country] == 0) {
                    delete updatedAllCountryData[country]
                }

            });

            // Add user to the specified country in discardCountryData, if present
            const targetCountryDiscard = updatedUserData?.country?.toUpperCase();
            if (updatedDiscardCountryData[targetCountryDiscard]) {
                updatedDiscardCountryData[targetCountryDiscard].push({ ...updatedUserData, country: updatedUserData.country });
            } else {
                // Add user to allCountryData if the target country is not in discardCountryData
                const targetCountryAll = updatedUserData?.country?.toUpperCase();
                if (!updatedAllCountryData[targetCountryAll]) {
                    updatedAllCountryData[targetCountryAll] = [];
                }
                updatedAllCountryData[targetCountryAll].push({ ...updatedUserData, country: updatedUserData.country });
            }
        });

        setCountryWiseData({
            discardCountryData: updatedDiscardCountryData,
            allCountryData: updatedAllCountryData,
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
                                        <li className="active">
                                            <Link to="/webinar/email/selectSmartList">
                                                {localStorage.getItem("user_id") == userId
                                                    ? "Select Users"
                                                    : "Select HCPs"}
                                            </Link>
                                        </li>

                                        <li className="active active-main">
                                            <Link to="/webinar/email/selectSmartListCountryUsers">Verify Your List</Link>
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
                                <div className="table-title">
                                    <h4>
                                        {/* HCPs <span>| {smartListSelected.readers_count}</span> */}
                                    </h4>
                                    <div className="selected-hcp-table-action">
                                        {editable == false ? (
                                            <>
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
                                                                onClick={sortSelectedCountry}
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
                                                                onClick={sortSelectedCountry}
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
                                                                onClick={sortSelectedCountry}
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
                                {
                                    Object.keys(countryWiseData?.discardCountryData)?.length ?
                                        <Accordion className="deleted">
                                            {Object.keys(countryWiseData?.discardCountryData)?.length ? Object.keys(countryWiseData?.discardCountryData)?.map((country, index) => {
                                                return (
                                                    <>
                                                        <Accordion.Item eventKey={index}>
                                                            <Accordion.Header>
                                                                {`${country} (${countryWiseData?.discardCountryData?.[country]?.length + (newlyAddedCountryWiseData?.[country]?.length ? newlyAddedCountryWiseData?.[country]?.length : 0)})`}

                                                            </Accordion.Header>

                                                            <button className="delete-country-button">
                                                                <img
                                                                    src={path_image + "add-row.png"}
                                                                    alt="Add Row"
                                                                    onClick={() => addCountryData(country)}
                                                                />
                                                            </button>

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
                                                                        </thead>
                                                                        <tbody>
                                                                            {
                                                                                countryWiseData?.discardCountryData?.[country]?.map((readers, i) => {
                                                                                    return (
                                                                                        <tr id={`row-selected` + i}>
                                                                                            <td id={`field_name` + readers?.profile_user_id}>
                                                                                                <span>
                                                                                                    {readers?.first_name
                                                                                                        ? readers?.first_name +
                                                                                                        " " +
                                                                                                        readers?.last_name
                                                                                                        : "N/A"}
                                                                                                </span>
                                                                                            </td>

                                                                                            <td id={`field_email` + readers.profile_user_id}>
                                                                                                {readers?.email ? readers?.email : "N/A"}
                                                                                            </td>
                                                                                            <input
                                                                                                type="hidden"
                                                                                                id={`field_index` + readers.profile_user_id}
                                                                                                value={i}
                                                                                            />
                                                                                            <td
                                                                                                id={`field_bounced` + readers.profile_user_id}
                                                                                            >
                                                                                                {readers?.bounce ? readers?.bounce : "N/A"}
                                                                                            </td>
                                                                                            <td>
                                                                                                <span>
                                                                                                    {readers?.country ? readers?.country : "N/A"}
                                                                                                </span>
                                                                                            </td>
                                                                                            <td>

                                                                                                {readers?.ibu && readers?.ibu != 0
                                                                                                    ? readers?.ibu
                                                                                                    : "N/A"
                                                                                                }
                                                                                            </td>
                                                                                            <td>
                                                                                                <span>
                                                                                                    {readers?.contact_type
                                                                                                        ? readers?.contact_type
                                                                                                        : "N/A"}
                                                                                                </span>
                                                                                            </td>
                                                                                        </tr>)
                                                                                })
                                                                            }
                                                                        </tbody>

                                                                    </table>
                                                                </div>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    </>
                                                )
                                            }) : ""}
                                        </Accordion>
                                        : null
                                }
                                {removedReaders?.length ?
                                    <table className="table ">
                                        <thead>
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Bounced</th>
                                                <th scope="col">Country</th>
                                                <th scope="col">Business unit</th>
                                                <th scope="col">Contact type</th>
                                                {showLessInfo == false ? (
                                                    <>
                                                        <th scope="col">Consent</th>
                                                        <th scope="col">Email received</th>
                                                        <th scope="col">Openings</th>
                                                        <th scope="col">Registrations</th>
                                                        <th scope="col">Last email</th>
                                                    </>
                                                ) : null}
                                                {/* <th>
                                                                        <div className="hcp-sort">
                                                                            {
                                                                                sortingCountUsers == 0 ? (
                                                                                    <>
                                                                                        <button
                                                                                            className="btn btn-outline-primary"
                                                                                            onClick={(e) => sortSelectedUsers(e, country)}
                                                                                        >
                                                                                            Sort By{" "}
                                                                                            <img
                                                                                                src={path_image + "sort.svg"}
                                                                                                alt="Shorting"
                                                                                            />
                                                                                        </button>
                                                                                    </>
                                                                                ) :
                                                                                    sortingUsers == 0 ? (
                                                                                        <>
                                                                                            <button
                                                                                                className="btn btn-outline-primary desc"
                                                                                                onClick={(e) => sortSelectedUsers(e, country)}
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
                                                                                                onClick={(e) => sortSelectedUsers(e, country)}
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
                                                                    </th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {removedReaders?.map((rr, i) => {
                                                return (
                                                    <>

                                                        {/* {rr["country"]?.toUpperCase() == country ? */}
                                                        <tr className="hcps-deleted">
                                                            <td>
                                                                <span>
                                                                    {rr?.first_name
                                                                        ? rr?.first_name + " " + rr?.last_name
                                                                        : "N/A"}
                                                                </span>
                                                            </td>
                                                            <td>{rr?.email ? rr?.email : "N/A"}</td>
                                                            <td>{rr?.bounce ? rr?.bounce : "N/A"}</td>
                                                            <td>
                                                                <span>{rr?.country ? rr?.country : "N/A"}</span>
                                                            </td>
                                                            <td>
                                                                {/*rr?.ibu ? rr?.ibu : "N/A"*/}
                                                                {localStorage.getItem("user_id") ==
                                                                    "56Ek4feL/1A8mZgIKQWEqg=="
                                                                    ? rr?.irt
                                                                        ? "Yes"
                                                                        : "No"
                                                                    : rr?.ibu && rr?.ibu != 0
                                                                        ? rr?.ibu
                                                                        : "N/A"}
                                                            </td>
                                                            {localStorage.getItem("user_id") ==
                                                                "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                                                <td>
                                                                    {rr?.user_type != 0 ? rr?.user_type : "N/A"}
                                                                </td>
                                                            ) : (
                                                                <td>
                                                                    {rr?.contact_type ? rr?.contact_type : "N/A"}
                                                                </td>
                                                            )}

                                                            {showLessInfo == false ? (
                                                                <td>
                                                                    <span>{rr?.consent ? rr?.consent : "N/A"}</span>{" "}
                                                                </td>
                                                            ) : null}
                                                            {showLessInfo == false ? (
                                                                <td>
                                                                    <span>
                                                                        {rr?.email_received
                                                                            ? rr?.email_received
                                                                            : "N/A"}
                                                                    </span>
                                                                </td>
                                                            ) : null}
                                                            {showLessInfo == false ? (
                                                                <td>
                                                                    <span>
                                                                        {rr?.email_opening
                                                                            ? rr?.email_opening
                                                                            : "N/A"}
                                                                    </span>
                                                                </td>
                                                            ) : null}
                                                            {showLessInfo == false ? (
                                                                <td>
                                                                    <span>
                                                                        {rr?.registration ? rr?.registration : "N/A"}
                                                                    </span>
                                                                </td>
                                                            ) : null}
                                                            {showLessInfo == false ? (
                                                                <td>
                                                                    <span>
                                                                        {rr?.last_email ? rr?.last_email : "N/A"}
                                                                    </span>
                                                                </td>
                                                            ) : null}

                                                            <td className="add-new-hcp" colSpan="12">
                                                                <img
                                                                    src={path_image + "add-row.png"}
                                                                    alt="Add Row"
                                                                    onClick={() => addRemovedReader(rr, i)}
                                                                />
                                                            </td>
                                                        </tr>
                                                        {/* : ""} */}
                                                    </>
                                                );
                                            })}
                                            <tr className="seprator-add">
                                                <td colSpan="13"></td>
                                            </tr>
                                        </tbody>

                                    </table>
                                    : ""}
                                <Accordion>
                                    {Object.keys(countryWiseData?.allCountryData)?.length ? Object.keys(countryWiseData?.allCountryData)?.filter(country => countryWiseData?.allCountryData[country].length > 0)?.map((country, index) => {
                                        return (
                                            <>
                                                <Accordion.Item eventKey={index}>
                                                    <Accordion.Header>
                                                        {`${country} (${countryWiseData?.allCountryData?.[country]?.length})`}

                                                    </Accordion.Header>

                                                    <button className="delete-country-button">
                                                        <img
                                                            src={path_image + "delete.svg"}
                                                            alt="Add Row"
                                                            onClick={() => deleteCountryData(country)}
                                                        />
                                                    </button>

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
                                                                        {showLessInfo == false ? (
                                                                            <>
                                                                                <th scope="col">Consent</th>
                                                                                <th scope="col">Email received</th>
                                                                                <th scope="col">Openings</th>
                                                                                <th scope="col">Registrations</th>
                                                                                <th scope="col">Last email</th>
                                                                            </>
                                                                        ) : null}
                                                                        {/* <th>
                                                                        <div className="hcp-sort">
                                                                            {
                                                                                sortingCountUsers == 0 ? (
                                                                                    <>
                                                                                        <button
                                                                                            className="btn btn-outline-primary"
                                                                                            onClick={(e) => sortSelectedUsers(e, country)}
                                                                                        >
                                                                                            Sort By{" "}
                                                                                            <img
                                                                                                src={path_image + "sort.svg"}
                                                                                                alt="Shorting"
                                                                                            />
                                                                                        </button>
                                                                                    </>
                                                                                ) :
                                                                                    sortingUsers == 0 ? (
                                                                                        <>
                                                                                            <button
                                                                                                className="btn btn-outline-primary desc"
                                                                                                onClick={(e) => sortSelectedUsers(e, country)}
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
                                                                                                onClick={(e) => sortSelectedUsers(e, country)}
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
                                                                    </th> */}
                                                                    </tr>
                                                                </thead>
                                                                <tbody>




                                                                    {countryWiseData?.allCountryData?.[country]?.map((readers, i) => {
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
                                                                                        {readers?.first_name
                                                                                            ? readers?.first_name +
                                                                                            " " +
                                                                                            readers?.last_name
                                                                                            : "N/A"}{" "}
                                                                                    </span>
                                                                                </td>

                                                                                <td id={`field_email` + readers.profile_user_id}>
                                                                                    {readers?.email ? readers?.email : "N/A"}
                                                                                </td>
                                                                                <input
                                                                                    type="hidden"
                                                                                    id={`field_index` + readers.profile_user_id}
                                                                                    value={i}
                                                                                />
                                                                                <td
                                                                                    id={`field_bounced` + readers.profile_user_id}
                                                                                >
                                                                                    {readers?.bounce ? readers?.bounce : "N/A"}
                                                                                </td>
                                                                                <td>
                                                                                    {editable ? (
                                                                                        <EditCountry
                                                                                            selected_country={readers?.country}
                                                                                            profile_user={readers?.profile_user_id}
                                                                                        ></EditCountry>
                                                                                    ) : (
                                                                                        <span>
                                                                                            {readers?.country ? readers?.country : "N/A"}
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
                                                                                            {readers?.user_type != 0
                                                                                                ? readers?.user_type
                                                                                                : "N/A"}
                                                                                        </span>
                                                                                    ) : editable ? (
                                                                                        <EditContactType
                                                                                            selected_ibu={readers?.contact_type}
                                                                                            profile_user={readers?.profile_user_id}
                                                                                        ></EditContactType>
                                                                                    ) : (
                                                                                        <span>
                                                                                            {readers?.contact_type
                                                                                                ? readers?.contact_type
                                                                                                : "N/A"}
                                                                                        </span>
                                                                                    )}
                                                                                </td>
                                                                                <td className="delete_row" colSpan="12">
                                                                                    <img
                                                                                        src={path_image + "delete.svg"}
                                                                                        alt="Add Row"
                                                                                        onClick={() => deleteReader(country, index, i)}
                                                                                    />
                                                                                </td>
                                                                            </tr>)
                                                                    })
                                                                    }
                                                                </tbody>

                                                            </table>
                                                        </div>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </>
                                        )
                                    }) : ""}
                                </Accordion>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* <Modal
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


                                                            <div className="col-12 col-md-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="">
                                                                        Country <span>*</span>
                                                                    </label>
                                                                    <Select
                                                                        options={countryall}
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
                                                                        isClearable
                                                                    />
                                                                    {validationError?.newHcpCountry &&
                                                                        validationError?.index == i && (
                                                                            <div className="login-validation">
                                                                                {validationError?.newHcpCountry}
                                                                            </div>
                                                                        )}

                                                                </div>
                                                            </div>
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
                                                                        href="#"
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
            </Modal > */}
            <AddNewContactModal
                show={isOpenAdd}
                closeClicked={closeModalClicked}
                activeManual={activeManual}
                hpc={hpc}
                setHpc={setHpcList}
                totalData={totalData}
                countryall={countryall}
                // irtCountry={irtCountry}
                // irtRole={irtRole}
                // role={role}
                // institutionType={institutionType}
                saveClicked={saveClicked}
            />
        </>
    );
};

const mapStateToProps = (state) => {
    old_object = state.getWebinarEmailData ? state.getWebinarEmailData : {};
    return state;
};

export default connect(mapStateToProps)(WebinarSelectSmartListCountryUsers);