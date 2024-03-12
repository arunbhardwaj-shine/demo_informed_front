import React, { useState } from 'react'
import { Modal, DropdownButton, Dropdown } from 'react-bootstrap'
import Select, { createFilter } from 'react-select';
import { toast } from "react-toastify";

const AddNewContactModal = ({ show, closeClicked, activeManual, hpc, setHpc, 
    totalData, countryall,irtCountry,irtRole,role,institutionType }) => {
    let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    
    const [siteNameAll, setSiteNameAll] = useState([]);
    const [siteNumberAll, setSiteNumberAll] = useState([]);
    const [counterFlag, setCounterFlag] = useState(0);
    const [optIRT, setoptIRT] = useState([
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
    ]);

   
   
    const filterConfig = {
        matchFrom: "start",
    };
    const [userId, setUserId] = useState("56Ek4feL/1A8mZgIKQWEqg==");

    const onFirstNameChange = (e, i) => {
        const { value } = e.target;
        const list = [...hpc];
        const name = hpc[i].firstname;
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
        const { value } = e.target;
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

    const onInstitionTypeChange = (e, i) => {
        if (e == "") {

            const list = [...hpc];
            list[i].institutionType = "";
            list[i].optIrt = "";
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
                console.log("list", list[i]?.optIrt);
            }
        }
    }

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
            const value = e.value;
            const list = [...hpc];
            const name = hpc[i]?.country;
            list[i].country = value;

            let index = countryall.findIndex((x) => x?.value === value);
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
            (x) => x?.value === site_number_value
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

      const addMoreHcp = () => {
        const regemail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const status = hpc?.map((data) => {
          if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
            if (data?.email == "" || data?.institutionType == "" || data?.first_name == "" || data?.last_name == "" || data?.country == "") {
              return "false";
            }else if(data?.email!=""){
                if(regemail?.test(data?.email) === false){
                    return "false";
                }
                else {
                    return "true";
                }

            }
             else {
              return "true";
            }
          } else if (localStorage.getItem("user_id") == "m5JI5zEDY3xHFTZBnSGQZg==") {
            if (data?.email == "" || data?.country == ""||regemail?.test(data?.email) === false) {
              return "false"
            } else {
              return "true"
            }
          }
          else {
            if (data?.email == ""||regemail?.test(data?.email) === false) {
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
          if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "m5JI5zEDY3xHFTZBnSGQZg==") {
            toast.warning("Please input the required fields.");
          } else {
            toast.warning("Please input the valid email");
          }
        }
      };

    return (<>
        <Modal
            id="add_hcp"
            show={show}
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
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">
                        Add New Contact
                    </h5>
                    <button
                        onClick={closeClicked}
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="modal-body">
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
                                                                    First name {localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" ? <span>*</span> : null}

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
                                                                <label htmlFor="">Last name
                                                                    {localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" ? <span>*</span> : null}
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
                                                                    value={val.email}
                                                                />
                                                            </div>
                                                        </div>

                                                        {localStorage.getItem("user_id") ===
                                                            "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                                            <>
                                                                {" "}
                                                                <div className="col-12 col-md-6">
                                                                    <div className="form-group bottom">
                                                                        <label for="">Institution <span>*</span>
                                                                        </label>
                                                                        <Select
                                                                            options={institutionType}
                                                                            className="dropdown-basic-button split-button-dropup edit-country-dropdown"

                                                                            onChange={(event) =>
                                                                                onInstitionTypeChange(event, i)
                                                                            }
                                                                            defaultValue={
                                                                                val?.institutionType
                                                                                    ? {
                                                                                        label: val?.institutionType,
                                                                                        value: val?.institutionType,
                                                                                    }
                                                                                    : ""
                                                                            }
                                                                            placeholder="Select Institution"
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
                                                                    Country
                                                                    {(localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" ||
                                                                        localStorage.getItem("user_id") == "m5JI5zEDY3xHFTZBnSGQZg==") ? <span>*</span> : null}
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
                                                                                (el) => el.value == val?.country
                                                                            ) == -1
                                                                                ? ""
                                                                                : countryall[
                                                                                countryall.findIndex(
                                                                                    (el) => el.value == val?.country
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

                                                        {localStorage.getItem("user_id") ==
                                                            "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                                            <>
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
                                                                                siteNumberAll[hpc[i].siteNumberIndex]
                                                                                    ? siteNumberAll[
                                                                                    hpc[i].siteNumberIndex
                                                                                    ]
                                                                                    : ""
                                                                            }
                                                                            placeholder={
                                                                                typeof siteNumberAll[
                                                                                    hpc[i].siteNumberIndex
                                                                                ] === "undefined"
                                                                                    ? "Select Site Number"
                                                                                    : siteNumberAll[
                                                                                    hpc[i].siteNumberIndex
                                                                                    ]
                                                                            }
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
                                                                            placeholder={
                                                                                typeof siteNameAll[
                                                                                    hpc[i].siteNameIndex
                                                                                ] === "undefined"
                                                                                    ? "Select Site Name"
                                                                                    : siteNameAll[hpc[i].siteNameIndex]
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ) : null}
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
                                                                    className="nav-link btn-bordered"
                                                                    data-bs-toggle="tab"
                                                                    href="javascipt:;"
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
                    //   onClick={saveClicked}
                    >
                        Save
                    </button>
                </div>
            </div>
        </Modal>
    </>)

}
export default AddNewContactModal