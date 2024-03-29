import React, { useEffect, useState } from "react";
import axios from "axios";
import { loader } from "../../loader";
import { toast } from "react-toastify";
import CommonModel from "../../Model/CommonModel";
import moment from "moment";

let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const BouncedEmail = () => {
  const [bounceData, setBounceData] = useState([]);
  const [mainBounceData, setMainBounceData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortDatee, setSortDate] = useState(0);
  const [sortingCountDate, setSortingCountDate] = useState(0);
  const [sortingCount, setSortingCount] = useState(0);
  const [commanShow, setCommanShow] = useState(false);
  const [selectedReader, setSelectedReader] = useState("");
  const [changeCount, setChangeCount] = useState(0);
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [emailInput, setEmailInput] = useState([
    {
      label: "Email",
      type: "input",
      name: "user_email",
      placeholder: "Type your email",
      value: "",
    },
  ]);

  useEffect(() => {
    getBouncedData();
  }, []);

  const getBouncedData = async () => {
    loader("show");
    try {
      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      const body = {
        user_id: localStorage.getItem("user_id"),
      };

      await axios
        .post(`distributes/bounced_emails`, body)
        .then((res) => {
          if (res?.data?.status_code == 200) {
            res?.data?.response.reverse();
            setBounceData(res?.data?.response);
            setMainBounceData(res?.data?.response);
          }
          loader("hide");
        })
        .catch((err) => {
          loader("hide");
          toast.error("Something went wrong");
        });
    } catch (err) {
      loader("hide");
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    var lowSearch = search.toLowerCase();
    let keys = ["email", "emailSubject"];
    let searchRecords = bounceData.filter((item) =>
      keys.some((key) => String(item[key]).toLowerCase().includes(lowSearch))
    );
    setBounceData(searchRecords);
  };

  const searchChange = (e) => {
    setSearch(e.target.value.trim());
    if (e.target.value === "") {
      setSearch("");
      setBounceData(mainBounceData);
    }
  };

  const sortDate = () => {
    let normalArr = [];
    normalArr = bounceData;
    let sortedData;
    if (sortDatee == 0) {
      sortedData = normalArr.sort(function (a, b) {
        var aa = a.bounce_date.split("/").reverse().join(),
          bb = b.bounce_date.split("/").reverse().join();
        return aa < bb ? -1 : aa > bb ? 1 : 0;
      });
    } else {
      sortedData = normalArr.sort(function (a, b) {
        var aa = a.bounce_date.split("/").reverse().join(),
          bb = b.bounce_date.split("/").reverse().join();
        return aa > bb ? -1 : aa < bb ? 1 : 0;
      });
    }

    setSortingCount(0);
    setBounceData(sortedData);
    setSortDate(1 - sortDatee);
    setSortingCountDate(sortingCountDate + 1);
  };

  const handleModelFun = (e) => {
    if (e.target.value !== "") {
      setUpdatedEmail(e.target.value);
    }
  };

  const handleSubmitModelFun = async (e) => {
    if (updatedEmail) {
      loader("show");
      try {
        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        let bounced_data =
          mainBounceData?.[
            mainBounceData.findIndex((el) => el.user_id == selectedReader)
          ];
        let bounced_id = 0;
        if (typeof bounced_data !== "undefined" && bounced_data != null) {
          bounced_id = bounced_data.bounce_id;
        }
        const body = {
          user_id: localStorage.getItem("user_id"),
          email: updatedEmail,
          reader_id: selectedReader,
          bounce_id: bounced_id,
        };
        await axios
          .post(`distributes/update_bounce_email`, body)
          .then((res) => {
            if (res?.data?.status_code == 200) {
              getBouncedData();
            }
          })
          .catch((err) => {
            loader("hide");
            toast.error("Something went wrong");
          });
      } catch (err) {
        console.log(err);
        loader("hide");
      }
    }
  };

  const openEditEmail = (item, id) => {
    emailInput[0].value = item;
    let updateEmail = emailInput;
    setEmailInput(updateEmail);
    setSelectedReader(id);
    setTimeout(function () {
      setCommanShow(true);
      setChangeCount(parseInt(changeCount) + 1);
    }, 300);
  };

  return (
    <div className="right-sidebar custom-change">
      {/* <div className="page-top-nav smart_list_names">
        <div className="d-flex justify-content-start align-items-center">
            <div className="page-title">
            <h2>Bounced Email</h2>
            </div>
        </div>
      </div> */}
      <div className="page-top-nav smart_list_names sticky">
        <div className="d-flex justify-content-between align-items-center">
          <div className="page-title">
            <h4>
              Total Result <span>| {bounceData?.length}</span>
            </h4>
          </div>
          <div className="top-right-action">
            <div className="search-bar">
              <form className="d-flex" onSubmit={(e) => submitHandler(e)}>
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
      <section className="search-hcp smart-list-view bounced-email-page">
        <div className="result-hcp-table">
         
          {/* <div className="table-title">
            <h4>
              Total Result <span>| {bounceData?.length}</span>
            </h4>
          </div> */}
          <div
            className="search_view"
            id="analytics-hcp-table"
          >
            <div className="selected-hcp-list">
              <table className="table" id="table-to-xls">
                <thead className="sticky-header">
                  <tr>
                    <th scope="col">Sr.No</th>
                    <th scope="col">Email</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Bounce Reason</th>
                    <th scope="col" className="sort_option">
                      <span  onClick={sortDate}>
                      Date
                      <div className="hcp-sort" onClick={sortDate}>
                        {sortingCountDate == 0 ? (
                          <>
                            <button
                              className="btn btn-outline-primary"
                              onClick={sortDate}
                            >
                              <img
                                src={path_image + "sort.svg"}
                                alt="Shorting"
                              />
                            </button>
                          </>
                        ) : sortDatee == 0 ? (
                          <>
                            <button
                              className="btn btn-outline-primary desc"
                              onClick={sortDate}
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
                              onClick={sortDate}
                            >
                              <img
                                src={path_image + "sort-assending.svg"}
                                alt="Shorting"
                              />
                            </button>
                          </>
                        )}
                      </div>
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bounceData.length > 0 ? (
                    bounceData.map((item, index) => (
                      <>
                        <tr key={index}>
                          <td> {index + 1}</td>
                          <td>
                            {item?.email}

                            <svg
                              className="pencil_icon"
                              onClick={(e) =>
                                openEditEmail(item?.email, item?.user_id)
                              }
                              version="1.0"
                              xmlns="http://www.w3.org/2000/svg"
                              width="512.000000pt"
                              height="512.000000pt"
                              viewBox="0 0 512.000000 512.000000"
                              preserveAspectRatio="xMidYMid meet"
                            >
                              {" "}
                              <g
                                transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                fill="#0066BE"
                                fillOpacity="0.6"
                                stroke="none"
                              >
                                {" "}
                                <path d="M3861 5110 c-57 -12 -157 -60 -201 -96 -55 -45 -3166 -3188 -3178 -3211 -17 -30 -482 -1665 -482 -1691 0 -53 62 -112 117 -112 10 0 394 108 852 239 l834 240 136 134 c399 393 2734 2707 2897 2871 243 243 279 305 279 476 0 89 -17 155 -58 230 -37 69 -787 823 -858 864 -25 14 -68 33 -95 41 -62 19 -186 27 -243 15z m187 -245 c47 -20 784 -752 814 -810 29 -55 29 -145 0 -200 -11 -22 -139 -158 -286 -305 l-266 -265 -512 513 -513 512 265 266 c170 170 279 273 305 285 49 23 142 25 193 4z m-710 -938 l212 -212 -1119 -1119 -1119 -1119 -85 169 c-47 93 -95 178 -107 189 -19 17 -39 21 -137 23 -63 2 -113 7 -111 12 4 9 2241 2268 2248 2269 3 1 101 -95 218 -212z m800 -807 c-5 -10 -2260 -2245 -2268 -2248 -5 -2 -10 48 -12 111 -2 98 -6 118 -23 137 -11 12 -96 60 -189 107 l-169 85 1119 1119 1119 1119 212 -212 c117 -117 212 -215 211 -218z m-3053 -1708 l110 -217 217 -110 218 -110 0 -152 0 -152 -52 -16 c-29 -8 -154 -44 -278 -80 l-225 -64 -282 282 -282 282 64 225 c36 124 72 249 80 278 l16 52 152 0 152 0 110 -218z m-455 -787 c101 -101 182 -186 180 -188 -10 -8 -513 -148 -517 -144 -5 6 140 517 147 517 3 0 88 -83 190 -185z" />{" "}
                              </g>{" "}
                            </svg>
                          </td>
                          <td>
                            {" "}
                            {item?.emailSubject ? item.emailSubject : "N/A"}
                          </td>
                          <td>
                            {" "}
                            {item?.bounceReason ? item.bounceReason : "N/A"}
                          </td>
                          <td>
                            {" "}
                            {item?.bounce_date
                              ? moment(item.bounce_date).format("D/MM/YYYY")
                              : "N/A"}
                          </td>
                        </tr>
                      </>
                    ))
                  ) : (
                    <tr className="data-not-found">
                      <td colspan="12">
                        <h4>No Data Found</h4>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {changeCount > 0 ? (
        <CommonModel
          show={commanShow}
          onClose={setCommanShow}
          heading={"Update Email"}
          data={emailInput}
          footerButton={"Save"}
          handleChange={handleModelFun}
          handleSubmit={handleSubmitModelFun}
        />
      ) : null}
    </div>
  );
};

export default BouncedEmail;
