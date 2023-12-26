import React, { useState, useEffect } from 'react'
import { Col, Accordion } from 'react-bootstrap'
import { loader } from '../../../../../loader'
import { getData } from '../../../../../axios/apiHelper'
import { ENDPOINT } from '../../../../../axios/apiConfig'
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const ContactDM = () => {

    const [apiStatus, setApiStatus] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [userData, setUserData] = useState([])
    const [originalUserData, setOriginalUserData] = useState([])
    const [filterData, setFilterData] = useState({})
    const [otherFilter, setOtherFilter] = useState({});
    const [appliedFilter, setAppliedFilter] = useState({})
    const [search, setSearch] = useState("")
    const [refreshFlag, setRefreshFlag] = useState(false);

    useEffect(() => {
        getEventDMListing()
    }, [])

    const getEventDMListing = async () => {
        try {
            loader("show")
            const response = await getData(`${ENDPOINT.WEBINAR_EVENT_DM_LISTING}/${401}`)
            setUserData(response?.data?.data?.data)
            setOriginalUserData(response?.data?.data?.data)
            setFilterData(response?.data?.data?.filterData)
            setApiStatus(true)

        } catch (err) {
            console.log("--err", err)
        }
        finally {
            loader("hide")
        }
    }

    const handleOnFilterChange = (e, item, index, key, data = {}) => {
        const updatedFilter = { ...data };

        if (e?.target?.type === "checkbox") {
            if (updatedFilter[key]) {

                updatedFilter[key] = updatedFilter[key].includes(item)
                    ? updatedFilter[key].filter((value) => value !== item)
                    : [...updatedFilter[key], item];
            } else {

                updatedFilter[key] = [item];
            }
        }
        setOtherFilter(updatedFilter);
    };

    const searchChange = (e) => {
        setSearch(e?.target?.value?.trim())
        if (e?.target?.value == "") {
            setUserData(originalUserData)
            setOtherFilter({})
        }

    }

    const submitSearchHandler = (e) => {
        e.preventDefault()
        let searchData = userData?.filter((item) => {
            if (item?.name) {
                return item?.name?.toLowerCase() == search?.toLowerCase() || item?.email == search?.toLowerCase()
            } else if (item?.username) {
                return item?.username?.toLowerCase() == search?.toLowerCase() || item?.email == search?.toLowerCase()
            } else {
                return item?.name?.toLowerCase() == search?.toLowerCase() || item?.email == search?.toLowerCase()
            }

        })
        setUserData(searchData)

    }

    const applyFilter = () => {
        setSearch("");
        let filterData = originalUserData?.filter((item) => {
            const data = Object.entries(otherFilter)?.every(([key, values]) => {
                return !values || values?.includes(item[key?.toLowerCase()])
            })
            return data;
        })
        setAppliedFilter(otherFilter)
        setUserData(filterData)
        setShowFilter(false)

    }

    const removeindividualfilter = (key, item) => {
        let updateFilter = otherFilter
        let index = updateFilter[key]?.indexOf(item)
        if (index > -1) {
            updateFilter[key]?.splice(index, 1)
            if (updateFilter[key]?.length == 0) {
                delete updateFilter[key]
            }
        }
        setOtherFilter(updateFilter)
        applyFilter()
    }

    const clearFilter = () => {
        setUserData(originalUserData)
        setOtherFilter({})
        setAppliedFilter({})
        setShowFilter(false)
        setSearch("");
    }

    const Refresh = async () => {
        try {
            setSearch("")
            setRefreshFlag(true)
            const response = await getData(`${ENDPOINT.WEBINAR_EVENT_DM_LISTING}/${401}`)
            setUserData(response?.data?.data?.data)
            setOriginalUserData(response?.data?.data?.data)
            setFilterData(response?.data?.data?.filterData)
            setApiStatus(true)
            setRefreshFlag(false)
        } catch (err) {
            console.log("--err", err)
            setRefreshFlag(false)
        }
    }

    return (
        <>
            <Col className="right-sidebar custom-change">
                <div className="custom-container">
                    <div className="row">
                        <div className="top-header regi-web">
                            <div className="page-title">
                                <h2>Contact DM</h2>
                            </div>
                        </div>

                        <div className="page-top-nav smart_list_names sticky">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="table-title">
                                    <h4>Total | {userData?.length ? userData?.length : 0}</h4>
                                    {Object.keys(appliedFilter)?.length <= 0 ?
                                        <div className="refresh-button">
                                            <button
                                                className={refreshFlag ? "refresh-rotate" : "refresh"}
                                                onClick={() => {
                                                    Refresh();
                                                }}
                                            >
                                                <svg
                                                    fill="#fff"
                                                    height="800px"
                                                    width="800px"
                                                    version="1.1"
                                                    id="Layer_1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    // xmlns:xlink="http://www.w3.org/1999/xlink"
                                                    viewBox="0 0 383.748 383.748"
                                                // xml:space="preserve"
                                                >
                                                    <g>
                                                        <path
                                                            d="M62.772,95.042C90.904,54.899,137.496,30,187.343,30c83.743,0,151.874,68.13,151.874,151.874h30
		C369.217,81.588,287.629,0,187.343,0c-35.038,0-69.061,9.989-98.391,28.888C70.368,40.862,54.245,56.032,41.221,73.593
		L2.081,34.641v113.365h113.91L62.772,95.042z"
                                                        />
                                                        <path
                                                            d="M381.667,235.742h-113.91l53.219,52.965c-28.132,40.142-74.724,65.042-124.571,65.042
		c-83.744,0-151.874-68.13-151.874-151.874h-30c0,100.286,81.588,181.874,181.874,181.874c35.038,0,69.062-9.989,98.391-28.888
		c18.584-11.975,34.707-27.145,47.731-44.706l39.139,38.952V235.742z"
                                                        />
                                                    </g>
                                                </svg>
                                            </button>
                                        </div>
                                        : ""}
                                </div>
                                <div className="search-bar">
                                    <form
                                        className="d-flex"
                                        onSubmit={(e) => submitSearchHandler(e)}
                                    >
                                        <input
                                            className="form-control me-2"
                                            type="text"
                                            placeholder="Search by email or name"
                                            aria-label="Search"
                                            id="email_search"
                                            value={search}
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

                                <div
                                    className="filter-by nav-item dropdown"
                                >
                                    <button
                                        className="btn btn-secondary dropdown"
                                        type="button"
                                        id="dropdownMenuButton2"
                                        onClick={() => setShowFilter((showfilter) => !showfilter)}
                                    >
                                        Filter By
                                        {
                                            showFilter ? (
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
                                            )
                                        }
                                    </button>
                                    {
                                        showFilter && (
                                            <div
                                                className="dropdown-menu filter-options"
                                                aria-labelledby="dropdownMenuButton2"
                                            >
                                                <h4>Filter By</h4>
                                                <Accordion defaultActiveKey="0" flush>
                                                    {Object.keys(filterData)?.map(function (key, index) {
                                                        return (
                                                            <>
                                                                {filterData[key]?.length ? (
                                                                    <Accordion.Item
                                                                        className={
                                                                            key == "Role" ? "card upper" : "card"
                                                                        }
                                                                        eventKey={index}
                                                                    >
                                                                        <Accordion.Header className="card-header">
                                                                            {key}
                                                                        </Accordion.Header>
                                                                        <Accordion.Body className="card-body">
                                                                            {console.log("filter data--->", filterData)}
                                                                            <ul>
                                                                                {filterData[key]?.length
                                                                                    ? filterData[key]?.map(
                                                                                        (item, index) => (
                                                                                            <li>
                                                                                                {item != "" ? (
                                                                                                    <label className="select-multiple-option">
                                                                                                        <input
                                                                                                            type="checkbox"

                                                                                                            id={`custom-checkbox-tags-${index}`}
                                                                                                            value={item}
                                                                                                            name={key}
                                                                                                            checked={
                                                                                                                otherFilter[
                                                                                                                    key
                                                                                                                ]?.includes(item)
                                                                                                                    ? true
                                                                                                                    : false
                                                                                                            }
                                                                                                            onChange={(e) =>
                                                                                                                handleOnFilterChange(e, item, index, key, otherFilter)
                                                                                                            }
                                                                                                        />

                                                                                                        {key == "draft" &&
                                                                                                            item == "0"
                                                                                                            ? "live"
                                                                                                            : key == "draft" &&
                                                                                                                item == "1"
                                                                                                                ? "draft"
                                                                                                                : item}
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
                                                    <button
                                                        className="btn btn-primary btn-bordered"
                                                        onClick={clearFilter}
                                                    >
                                                        Clear
                                                    </button>
                                                    <button
                                                        className="btn btn-primary btn-filled"
                                                        onClick={applyFilter}
                                                    >
                                                        Apply
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            {Object.keys(appliedFilter)?.length ? (
                                <div className="apply-filter">
                                    <div className="filter-block">
                                        <div className="filter-block-left full">
                                            {Object.keys(appliedFilter)?.map((key, index) => {
                                                return (<>
                                                    {appliedFilter[key]?.length ? (
                                                        <div className="filter-div">
                                                            <div className="filter-div-title">
                                                                <span>{key} |</span>
                                                            </div>
                                                            <div className="filter-div-list">
                                                                {appliedFilter[key]?.map((item, index) => (
                                                                    <div className="filter-result"
                                                                        id={item}
                                                                        rt={index} >
                                                                        {item}
                                                                        <img
                                                                            src={
                                                                                path_image + "filter-close.svg"
                                                                            }
                                                                            onClick={(event) => {
                                                                                removeindividualfilter(key, item);
                                                                            }}
                                                                            alt="Close-filter"
                                                                        />
                                                                    </div>

                                                                ))}
                                                            </div>
                                                        </div>
                                                    ) : ""}
                                                </>)
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ) : ""}
                        </div>
                        {userData != "undefined" && userData?.length > 0 ?
                            (
                                <div className="invitee">
                                    <table className="table" id="table-to-xls">
                                        <thead className="sticky-header">
                                            <tr>
                                                <th scope="col">Name
                                                </th>
                                                <th scope="col">Email
                                                </th>
                                                <th scope="col">Country
                                                </th>
                                                <th scope="col">Phone Number
                                                </th>
                                                <th scope="col">Message
                                                </th>

                                            </tr>
                                        </thead>

                                        <tbody className="form-group">
                                            {userData?.map((user, index) => (
                                                <tr key={index}>
                                                    <td>{user?.name ? user?.name : user?.username ? user?.username : "N/A"}</td>
                                                    <td>{user?.email ? user?.email : "N/A"}</td>
                                                    <td>{user?.country ? user?.country : "N/A"}</td>
                                                    <td>{user?.phone ? user?.phone : "N/A"}</td>
                                                    <td>{user?.question ? user?.question : "N/A"}</td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )
                            : apiStatus ? (
                                <div class="email_box_block no_found">
                                    <p>No Data Found</p>
                                </div>
                            ) : (
                                ""
                            )
                        }



                    </div>
                </div>
            </Col>

        </>
    );

}

export default ContactDM
