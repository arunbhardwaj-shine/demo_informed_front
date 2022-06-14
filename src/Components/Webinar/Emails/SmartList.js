import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const SelectSmartList = () => {
  const [smartListData, setSmartListData] = useState([]);
  const [smartListDataId, setSmartListDataId] = useState();
  const [deletestatus, setDeleteStatus] = useState(false);
  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [search, setSearch] = useState("");
  const [prevsmartListData, setPrevSmartListData] = useState([]);
  const [deletecardid, setDeleteCardId] = useState();
  let path_image = '/' + process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

  const showConfirmationPopup = (id) => {
    console.log(id);
    if (confirmationpopup) {
      setConfirmationPopup(false);
    } else {
      setConfirmationPopup(true);
    }
    setDeleteCardId(id);
  };

  const body = {
    search: search,
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${localStorage.getItem("Token")}`,
  };

  const getSmartListData = async (flag) => {
    // console.log(localStorage.getItem("Token"));

    const body = {
      search: search,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("Token")}`,
    };

    console.log(headers);
    await axios
      .post(`http://51.89.210.56:8000/api/smart-list/lists`, body, { headers })
      .then((res) => {
        console.log("res.data.data", res.data.data);
        setSmartListData(res.data.data);
        if (flag == 0) {
          //setFilterData(res.data.response.filter);
          setPrevSmartListData(res.data.data);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getSmartListData(0);
  }, []);
  return ( 
	  <>
      <div className="right-sidebar">
        <div className="page-top-nav">
          <div className="row justify-content-end align-items-center">
            
            <div className="col-12 col-md-1">
              <div className="header-btn-left">
                <Link to="/webinar/email/create">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.15966 12.0001C5.15966 12.4302 5.3239 12.8603 5.65167 13.1882L15.9712 23.5077C16.6277 24.1641 17.692 24.1641 18.3482 23.5077C19.0044 22.8515 19.0044 21.7874 18.3482 21.1309L9.21688 12.0001L18.3479 2.86923C19.0041 2.21277 19.0041 1.14877 18.3479 0.492636C17.6917 -0.164135 16.6274 -0.164135 15.9709 0.492636L5.65135 10.8119C5.32352 11.14 5.15966 11.5701 5.15966 12.0001Z" fill="#97B6CF"/>
</svg>
                </Link>
              </div>
            </div>
            
            <div className="col-12 col-md-9">
              <ul className="tabnav-link">
                <li className="active">
                  <Link to="/EmailArticleSelect">Prepare Your Email</Link>
                </li>
                <li className="active active-main">
                  <Link to="/SelectHCP">Select Smart List</Link>
                </li>
                <li className="">
                  <a href="javascript:void(0)">Approve And Send</a>
                </li>
							</ul>
            </div>
            
            <div className="col-12 col-md-2">
              <div className="header-btn">
                <button className="btn btn-primary btn-bordered move-draft" >
                  Save As Draft
                </button>
                <Link to="/webinar/email/smart-list-users">
                  <button className="btn btn-primary btn-filled next" >
                      Next
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div class="col smartlist-result-block search-hcp">
          {typeof smartListData !== "undefined" &&
            smartListData.length > 0 ? (
              smartListData.map((data) => {
                return (
                  <div className="smartlist_box_block">
                    <div className="smartlist-view email_box">
                      <div className="mail-box-content">
                        <h5>{data.name}</h5>
                        <div className="select-mail-option">
                          <input type="radio" name="radio"onClick={()=>setSmartListDataId(data.id)} />
                          <span className="checkmark"></span>
                        </div>
                        <div className="mailbox-table">
                          <table>
                            <tbody>
                              <tr>
                                <th>Contact Type</th>
                                <td>NA</td>
                              </tr>
                              <tr>
                                <th>Speciality</th>
                                <td>NA</td>
                              </tr>
                              <tr>
                                <th>Readers</th>
                                <td>NA</td>
                              </tr>
                              <tr>
                                <th>IBU</th>
                                <td>NA</td>
                              </tr>
                              <tr>
                                <th>Product</th>
                                <td>NA</td>
                              </tr>
                              <tr>
                                <th>Country</th>
                                <td>NA</td>
                              </tr>
                              <tr>
                                <th>Registered</th>
                                <td>NA</td>
                              </tr>
                              <tr>
                                <th>Created By</th>
                                <td>
                                  <span>NA</span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="mail-time">
                          <span>{data.created_at}</span>
                        </div>
                        <div className="smart-list-added-user">
                          <img
                            src={path_image + "smartlist-user.svg"}
                            alt="User icon"
                          />
                          {data.readers_count}
                        </div>
                        <div className="smartlist-buttons">
                          <Link
                            className="btn btn-primary btn-filled view"
                            to={{
                              pathname: "/webinar/ViewSmartListWebinar",
                              search: "?listId=" + data.id,
                            }}
                          >
                            View
                          </Link>
                        </div>
                        {deletestatus && (
                          <div className="dlt_btn">
                            <button
                              onClick={(e) => showConfirmationPopup(data.id)}
                            >
                              <img
                                src={path_image + "delete.svg"}
                                alt="Delete Row"
                              />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="not_found">No Data Found</div>
            )}
          </div>

        </div>  
      </div>
    </>
	)
}
export default SelectSmartList;
