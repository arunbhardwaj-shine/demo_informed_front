import React, { useEffect, useState } from "react";
import { Col, Row, Button, Modal } from "react-bootstrap";
import { ENDPOINT } from "../../../axios/apiConfig";
import { deleteData, getData } from "../../../axios/apiHelper";
import { useNavigate } from 'react-router-dom';
import { loader } from "../../../loader";
import { popup_alert } from "../../../popup_alert";
import CommonConfirmModel from "../../../Model/CommonConfirmModel";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const SiteListing = () => {
    const navigate = useNavigate();
    const [listingDataSite, setListingDataSite] = useState([])
    const [mainListingDataSite, setMainListingDataSite] = useState([])
    const [isLoaded, setIsLoaded] = useState(false);
    const [search, setSearch] = useState('');
    const [sortNumber, setSortNumber] = useState(0);
    const [sortingCountDate, setSortingCountDate] = useState(0);
    const [sortingCount, setSortingCount] = useState(0);

    // const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState("");
    // const handleShowDeleteModal = (item) => {
    //     setDeleteItemId(item.id);
    //     setShowDeleteModal(true);
    // };

    // const handleCloseDeleteModal = () => setShowDeleteModal(false);


    const [resetDataId, setResetDataId] = useState();
    const [confirmationpopup, setConfirmationPopup] = useState(false);
    const [commonConfirmModelFun, setCommonConfirmModelFun] = useState(() => { });


      const [popupMessage, setPopupMessage] = useState({
        message1: "",
        message2: "",
        footerButton: "",
      });

      const showConfirmationPopup = (item) => {

        // setDeleteItemId(item.id);
        // setResetDataId(item.id);
        // setCommonConfirmModelFun(() => handleDelete);
        // setCommonConfirmModelFun(true);
        // setPopupMessage({
        //   message1: "Are you sure to delete this site?",
        //   footerButton:"Delete",
        // });
        setConfirmationPopup(true);

        setResetDataId(item.id);
        setCommonConfirmModelFun(() => handleDelete);
        setPopupMessage({
            message1: " Are you sure to delete this Site?",
            footerButton: "Delete",
        });
        if (confirmationpopup) {
            setConfirmationPopup(false);
        } else {
            setConfirmationPopup(true);
        }
      };

    const getReaderDataApi = async () => {
        try {
            loader("show");
            const response = await getData(ENDPOINT.READERLISTING);
            const listingData = response.data.data;
            setListingDataSite(listingData);
            setMainListingDataSite(listingData);
            loader("hide");
        } catch (error) {
            console.log(error);
            loader("hide");
        }
    };

    useEffect(() => {
        getReaderDataApi();
    }, []);

    const hideConfirmationModal = () => {
        setConfirmationPopup(false);
      };

    const submitHandler = (event) => {
        event.preventDefault();
        var lowSearch = search.toLowerCase();
        let keys = ["site_name", "site_number"];
        let searchRecords = listingDataSite.filter(item =>
            keys.some(key =>
                String(item[key]).toLowerCase().includes(lowSearch)
            )
        );
        setListingDataSite(searchRecords);

    };

    const searchChange = (e) => {
        setSearch(e.target.value.trim());
        if (e.target.value === "") {
            setSearch("");
            setListingDataSite(mainListingDataSite);
        }
    };

    const sortSiteNumber = () => {
        let normalArr = [];
        normalArr = listingDataSite;
        let sortedData;
        if (sortNumber === 0) {
            sortedData = normalArr.sort((a, b) => {
                const [a1, a2] = a.site_number.split("-").map(Number);
                const [b1, b2] = b.site_number.split("-").map(Number);
                if (a1 < b1) return -1;
                if (a1 > b1) return 1;
                if (a2 < b2) return -1;
                if (a2 > b2) return 1;
                return 0;
            });
        } else {
            sortedData = normalArr.sort((a, b) => {
                const [a1, a2] = a.site_number.split("-").map(Number);
                const [b1, b2] = b.site_number.split("-").map(Number);
                if (a1 > b1) return -1;
                if (a1 < b1) return 1;
                if (a2 > b2) return -1;
                if (a2 < b2) return 1;
                return 0;
            });
        }

        setSortingCount(0);
        setListingDataSite(sortedData);
        setSortNumber(1 - sortNumber);
        setSortingCountDate(sortingCountDate + 1);
    };


    const handleEdit = (item) => {
        navigate("/edit-site",{state: { siteId: item?.id} });
    };

    const handleDelete = async (id) => {
        setConfirmationPopup(false);
        try {
            loader("show");
            if (id) {
                const response = await deleteData(ENDPOINT.DELETESITE, id);
                const updatedData = listingDataSite.filter((item) => item.id !== id);
                setListingDataSite(updatedData);
                setMainListingDataSite(updatedData);
            }
            loader("hide");
            popup_alert({
                visible: "show",
                message: "Site Data has been deleted successfully",
                type: "success",
                redirect: "/site-listing",
            });
        } catch (error) {
            console.log(error);
            loader("hide");
        }
    };


    return (
        <div className="right-sidebar custom-change">
            <div className="page-top-nav smart_list_names sticky">
                <div className="row justify-content-end align-items-center">
                    <div className="col-12 col-md-11"></div>
                </div>
            </div>

            <section className="search-hcp smart-list-view">
                <div className="result-hcp-table">
                    <div className="table-title">
                        <h4>
                            Total Result <span>| {listingDataSite?.length}</span>
                        </h4>
                    </div>
                    <div
                        className="selected-hcp-list search_view"
                        id="analytics-hcp-table"
                    >
                        <div className="table_xls search_view">
                            <div className="smart-list-btns">
                                <div className="top-right-action">
                                    <div className="search-bar">
                                        <form
                                            className="d-flex"
                                            onSubmit={(e) => submitHandler(e)}
                                        >
                                            <input
                                                className="form-control me-2"
                                                type="search"
                                                placeholder="Search"
                                                aria-label="Search"
                                                onChange={(e) => searchChange(e)}
                                            />
                                            {!search ? (
                                                <button
                                                    className="btn btn-outline-success"
                                                    type="submit"
                                                >
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
                                                        ></path>
                                                    </svg>
                                                </button>
                                            ) : null}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table_xls">
                            <table className="table">
                                <thead className="sticky-header">
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Site Number
                                            <div className="hcp-sort">
                                                {sortingCountDate == 0 ? (
                                                    <>
                                                        <button
                                                            className="btn btn-outline-primary"
                                                            onClick={sortSiteNumber}
                                                        >
                                                            <img
                                                                src={path_image + "sort.svg"}
                                                                alt="Shorting"
                                                            />
                                                        </button>
                                                    </>
                                                ) : sortNumber == 0 ? (
                                                    <>
                                                        <button
                                                            className="btn btn-outline-primary desc"
                                                            onClick={sortSiteNumber}
                                                        >
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
                                                            onClick={sortSiteNumber}
                                                        >
                                                            <img
                                                                src={path_image + "sort-assending.svg"}
                                                                alt="Shorting"
                                                            />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </th>
                                        <th scope="col">Site Name</th>
                                        <th scope="col">Site Address</th>
                                        <th scope="col">Site City</th>
                                        <th scope="col">Site Postal</th>
                                        <th scope="col">Site Country</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listingDataSite.length > 0 ? (
                                            listingDataSite.map((item, index) => (
                                                <>
                                                    <tr key={item.id}>
                                                        <td> {index + 1}</td>
                                                        <td>{item?.site_number} </td>
                                                        <td> {item?.site_name}</td>
                                                        <td> {item?.site_address}</td>
                                                        <td> {item?.site_city}</td>
                                                        <td> {item?.site_postal}</td>
                                                        <td> {item?.site_country}</td>
                                                        <td>
                                                            <Button onClick={() => handleEdit(item)} className="btn-bordered"> Edit </Button>
                                                            <Button onClick={() => showConfirmationPopup(item)} className="btn-bordered"> Delete </Button>
                                                        </td>
                                                    </tr>
                                                </>
                                            ))
                                        ) : isLoaded ? (

                                            <tr className="data-not-found">
                                                <td colSpan="12">
                                                    <h4>No Data Found</h4>
                                                </td>
                                            </tr>
                                        ) : null}
                                </tbody>
                                <CommonConfirmModel
                                    show={confirmationpopup}
                                    onClose={hideConfirmationModal}
                                    fun={commonConfirmModelFun}
                                    popupMessage={popupMessage}
                                    path_image={path_image}
                                    resetDataId={resetDataId}
                                />
                            </table>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
};

export default SiteListing;
