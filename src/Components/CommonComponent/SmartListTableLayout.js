import axios from "axios";
import React, { useState, useEffect } from "react";
import { loader } from "../../loader";
import { toast } from "react-toastify";
import { Spinner } from "react-activity";
import { Modal } from "react-bootstrap";

const SmartListTableLayout = ({id, closeSmartListPopup}) => {
    const [getSmartListName, setSmartListName] = useState("");
    const [getReaderDetails, setReaderDetails] = useState({});
    const [showLessInfo, setShowLessInfo] = useState(true);
    const [getSmartListPopupStatus, setSmartListPopupStatus] = useState(false);
    const [getlistcount, setListCount] = useState("");
    const [isLoad, setIsLoading] = useState(0);
    const [hide, setHide] = useState(1);
    const [sortBy, setSortBy] = useState('first_name'); // Initial sort key
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        openSmartListPopup(id);
      }, [id]);

    const openSmartListPopup = async (id) => {
        setShowLessInfo(true);
        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        const body = {
          user_id: localStorage.getItem("user_id"),
          list_id: id,
          page: 1,
        };
        loader("show");
        await axios
          .post(`distributes/get_reders_list`, body)
          .then((res) => {
            if (res.data.status_code == 200) {
              setReaderDetails(res.data.response.data);
              setSmartListName(res.data.response.smart_list_name);
              setSmartListPopupStatus(true);
              setListCount(res.data.response.list_count);
              if((res.data.response.list_count < 50) || (res.data.response.list_count <=res.data.response.data.length)){
                    console.log(res.data.response.list_count <=res.data.response.data.length)                
                    setHide(0)
                }
            } else {
              toast.warning(res.data.message);
            }
            loader("hide");
          })
          .catch((err) => {
            toast.warning("Something went wrong");
            loader("hide");
          });
    };

    const handleLoadMore = async(id) =>{
        try{
          setIsLoading(1)
          const body = {
            user_id: localStorage.getItem("user_id"),
            list_id: id,
            page:2
          };
          const res = await axios.post(`distributes/get_reders_list`, body)
            if (res.data.response) {
              if (res.data.response.data.length) {
                setReaderDetails((oldArray)=>[...oldArray,...res.data.response.data]);
                let total = getReaderDetails?.length + res.data.response.data.length
                if(getlistcount <=total){
                   setHide(0)
                }
              }
            }
        }catch(err){
          console.log("er",err)
        }finally{
          setIsLoading(0)
          loader("hide");
        }
    }

    const handleSort = (key) => {
        setSortBy(key);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); 
    };
    
    const sortData = (data, key, order) => {
        return data.sort((a, b) => {
            const valueA = a[key];
            const valueB = b[key];
        
            // Handle different data types (numbers, strings)
            if (typeof valueA === 'number' && typeof valueB === 'number') {
            return order === 'asc' ? valueA - valueB : valueB - valueA;
            } else {
            return order === 'asc'
                ? valueA?.localeCompare(valueB) // Handle string sorting with locale awareness
                : valueB?.localeCompare(valueA);
            }
        });
    };


    return (
        <>
        <Modal
                show={getSmartListPopupStatus}
                className="smart_list_popup"
                id="smart_list_popup_id"
            >
                <Modal.Header>
                <h5 className="modal-title" id="staticBackdropLabel">
                    {typeof getReaderDetails !== "undefined" &&
                    getReaderDetails.length > 0 &&
                    getSmartListName}
                </h5>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    onClick={() => {
                        setSmartListPopupStatus(
                            (getSmartListPopupStatus) => !getSmartListPopupStatus
                        );
                        closeSmartListPopup();
                    }}
                ></button>
                </Modal.Header>
                <Modal.Body>
                <section className="search-hcp">
                    <div className="result-hcp-table">
                    <div className="table-title">
                        <h4>
                        HCPs{" "}
                        <span>
                            |
                            {typeof getReaderDetails !== "undefined" &&
                            getReaderDetails.length > 0 &&
                            getlistcount}
                        </span>
                        </h4>
                        <div className="selected-hcp-table-action">
                        <a
                            className="show-less-info"
                            onClick={(e) => setShowLessInfo(showLessInfo => !showLessInfo)}
                        >
                            {showLessInfo == true ? (
                            <p className="show_more">Show More information</p>
                            ) : (
                            <p className="show_less">Show less information</p>
                            )}{" "}
                        </a>
                        </div>
                    </div>
                    <div className="selected-hcp-list">
                        <table className="table">
                        <thead className="sticky-header">
                            <tr>
                            <th scope="col" className="sort_option" >
                                <span onClick={() => handleSort('first_name')} >
                                Name
                                <button
                                className={`event_sort_btn ${sortBy == "first_name" ?
                                sortOrder == "asc"
                                ? "svg_asc"
                                : "svg_active"
                                : "" 
                                }`}
                                onClick={() => handleSort('first_name')}
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                    <g clip-path="url(#clip0_3722_6611)">
                                    <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_3722_6611">
                                        <rect width="8" height="8" fill="white"/>
                                    </clipPath>
                                    </defs>
                                </svg>
                                </button>
                                </span>
                            
                            </th>
                            <th scope="col" className="sort_option" >
                            <span onClick={() => handleSort('email')}>
                            Email
                            <button
                                    className={`event_sort_btn ${sortBy == "email" ?
                                    sortOrder == "asc"
                                        ? "svg_asc"
                                        : "svg_active"
                                    : "" 
                                    }`}
                                    onClick={() => handleSort('email')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                    <g clip-path="url(#clip0_3722_6611)">
                                        <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_3722_6611">
                                        <rect width="8" height="8" fill="white"/>
                                        </clipPath>
                                    </defs>
                                    </svg>
                                </button>
                            </span>
                              
                            </th>
                            <th scope="col" className="sort_option">
                                  <span onClick={() => handleSort("bounce")}>
                                    Bounced
                                    <button
                                        className={`event_sort_btn ${
                                          sortBy == "bounce"
                                            ? sortOrder == "asc"
                                              ? "svg_asc"
                                              : "svg_active"
                                            : ""
                                        }`}
                                        onClick={() => handleSort("bounce")}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="8"
                                          height="8"
                                          viewBox="0 0 8 8"
                                          fill="none"
                                        >
                                          <g clip-path="url(#clip0_3722_6611)">
                                            <path
                                              d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                              fill="#97B6CF"
                                            />
                                          </g>
                                          <defs>
                                            <clipPath id="clip0_3722_6611">
                                              <rect
                                                width="8"
                                                height="8"
                                                fill="white"
                                              />
                                            </clipPath>
                                          </defs>
                                        </svg>
                                      </button>
                                    </span>
                                    </th>
                            <th scope="col" className="sort_option">
                            <span onClick={() => handleSort('country')}>Country
                            <button
                                    className={`event_sort_btn ${sortBy == "country" ?
                                    sortOrder == "asc"
                                        ? "svg_asc"
                                        : "svg_active"
                                    : "" 
                                    }`}
                                    onClick={() => handleSort('country')}
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                        <g clip-path="url(#clip0_3722_6611)">
                                        <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_3722_6611">
                                            <rect width="8" height="8" fill="white"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                    </button>
                            </span>
                               
                            </th>

                            {localStorage.getItem("user_id") ==
                                "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                <>
                                 <th scope="col" className="sort_option">
                                 <span onClick={() => handleSort('site_number')}>
                                    Site number
                                    <button
                                    className={`event_sort_btn ${sortBy == "site_number" ?
                                    sortOrder == "asc"
                                        ? "svg_asc"
                                        : "svg_active"
                                    : "" 
                                    }`}
                                    onClick={() => handleSort('site_number')}
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                        <g clip-path="url(#clip0_3722_6611)">
                                        <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_3722_6611">
                                            <rect width="8" height="8" fill="white"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                    </button>
                                    </span>
                                    </th>
                                <th scope="col" className="sort_option">
                                <span onClick={() => handleSort('irt')}>
                                    IRT mandatory training
                                    <button
                                    className={`event_sort_btn ${sortBy == "irt" ?
                                    sortOrder == "asc"
                                        ? "svg_asc"
                                        : "svg_active"
                                    : "" 
                                    }`}
                                    onClick={() => handleSort('irt')}
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                        <g clip-path="url(#clip0_3722_6611)">
                                        <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_3722_6611">
                                            <rect width="8" height="8" fill="white"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                    </button>
                                    </span>
                                    </th>
                                <th scope="col" className="sort_option">
                                <span onClick={() => handleSort('user_type')}>
                                    IRT role
                                    <button
                                    className={`event_sort_btn ${sortBy == "user_type" ?
                                    sortOrder == "asc"
                                        ? "svg_asc"
                                        : "svg_active"
                                    : "" 
                                    }`}
                                    onClick={() => handleSort('user_type')}
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                        <g clip-path="url(#clip0_3722_6611)">
                                        <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_3722_6611">
                                            <rect width="8" height="8" fill="white"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                    </button>
                                    </span>
                                    </th>
                                </>
                            ) : (
                                <>
                                <th scope="col" className="sort_option" >
                                    <span onClick={() => handleSort('ibu')}>
                                    Business unit
                                    <button
                                    className={`event_sort_btn ${sortBy == "ibu" ?
                                    sortOrder == "asc"
                                        ? "svg_asc"
                                        : "svg_active"
                                    : "" 
                                    }`}
                                    onClick={() => handleSort('ibu')}
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                        <g clip-path="url(#clip0_3722_6611)">
                                        <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_3722_6611">
                                            <rect width="8" height="8" fill="white"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                    </button>
                                    </span>
                                </th>
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
                        </thead>
                        <tbody>
                            {typeof getReaderDetails !== "undefined" &&
                            getReaderDetails.length > 0 &&
                            sortData(getReaderDetails, sortBy, sortOrder).map((rr, i) => {
                                return (
                                <>
                                    <tr key={i}>
                                    <td>{rr?.first_name ? rr?.first_name : "N/A"}</td>
                                    <td>{rr?.email ? rr?.email : "N/A"}</td>
                                    <td>{rr?.bounce ? rr.bounce : "N/A"}</td>
                                    <td>{rr?.country ? rr?.country : "N/A"}</td>
                                    {localStorage.getItem("user_id") ==
                                        "56Ek4feL/1A8mZgIKQWEqg=="&&(<><td>{rr.site_number?rr.site_number:"N/A"}</td></>)}
                                    <td>
                                        {localStorage.getItem("user_id") ==
                                        "56Ek4feL/1A8mZgIKQWEqg=="
                                        ? rr.irt
                                            ? "Yes"
                                            : "No"
                                        : rr.ibu
                                            ? rr.ibu
                                            : "N/A"}
                                    </td>
                                    <td>
                                        {localStorage.getItem("user_id") ==
                                        "56Ek4feL/1A8mZgIKQWEqg=="
                                        ? rr?.user_type != 0
                                            ? rr?.user_type
                                            : "N/A"
                                        : rr?.contact_type
                                            ? rr?.contact_type
                                            : "N/A"}
                                    </td>
                                    {showLessInfo == false ? (
                                        <>
                                            <td>
                                            <span>
                                                {rr?.consent ? rr?.consent : "N/A"}
                                            </span>{" "}
                                            </td>
                                            <td>
                                            <span>
                                                {rr?.email_received
                                                ? rr?.email_received
                                                : "N/A"}
                                            </span>
                                            </td>
                                            <td>
                                                <span>
                                                    {rr?.email_opening
                                                    ? rr?.email_opening
                                                    : "N/A"}
                                                </span>
                                            </td>
                                            <td>
                                                <span>
                                                    {rr?.registration
                                                    ? rr?.registration
                                                    : "N/A"}
                                                </span>
                                            </td>
                                            <td>
                                                <span>
                                                    {rr?.last_email ? rr?.last_email : "N/A"}
                                                </span>
                                            </td>
                                        </>
                                    ) : null}
                                    <td className="add-new-hcp" colspan="12"></td>
                                    </tr>
                                </>
                                );
                            })}
                        </tbody>
                        
                        </table>
                        {
                            hide?
                                !isLoad?
                                    <div className="text-center load_more">
                                        <button className="btn btn-primary" onClick={() => handleLoadMore(id)}>
                                            Load All
                                        </button>
                                    </div>
                                :"" 
                            :""
                        }
                        
                        { isLoad == true ? (
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
                    </div>
                    </div>
                </section>
                </Modal.Body>
            </Modal>
        </>
    )
};
export default SmartListTableLayout