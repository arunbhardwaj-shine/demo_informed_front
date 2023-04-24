import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Modal, Row, Table } from "react-bootstrap";
import { popup_alert } from "../../popup_alert";
import {ENDPOINT} from "../../axios/apiConfig";
import {postData, deleteData} from "../../axios/apiHelper";
import CommonConfirmModel from "../../Model/CommonConfirmModel";
import { loader } from "../../loader";
import { Button } from "react-bootstrap";

const SpcView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [apiCallStatus, setApiCallStatus] = useState(false);
  const [spcData, setSpcData] = useState([]);
  const [superSpcData, setSuperSpcData] = useState([]);
  const [search, setSearch] = useState("");
  const [spcDeletedId, setSpcDeletedId] = useState("");
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

  useEffect(() => {
    getSpcData('');
  }, []);

  const getSpcData = async(searchVal) => {
	  loader("show");
    setApiCallStatus(false);
	  try{
		  const body = {
			user_id: localStorage.getItem("user_id"),
			search: searchVal
		  };

		  const res = await postData(ENDPOINT.LIBRARYGETSPC, body);
		  setSpcData(res?.data?.data);
		  setSuperSpcData(res?.data?.data);
		  loader("hide");
	  }catch(err){
		    loader("hide");
	  }
    setApiCallStatus(true);
  };

  const searchChange = (e) => {
    setSearch(e?.target?.value);
    if (e?.target?.value === "") {
		setSpcData([]);
		getSpcData(e?.target?.value);
    }
  };

  const submitHandler = (event) => {
    setSpcData([]);
    getSpcData(search);
    event.preventDefault();
    return false;
  };

  const deleteSpc = async() => {
	  loader('show');
	  try{
		  const res = await deleteData(ENDPOINT.LIBRARYSPCDELETE,spcDeletedId);
		  popup_alert({
			visible: "show",
			message: "The SPC file has been deleted <br />successfully !",
			type: "success",
			redirect: "",
		  });

		  setSpcData([]);
		  getSpcData(search);
	  }catch(err){
		  console.log(err);
	  }
	  setConfirmationPopup(false);
	  loader('hide');
  }

  const isJson  = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }

  return (
    <>
      <div className="col right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="top-header">
              <div className="page-title d-flex">
                <Link className="btn btn-primary btn-bordered back-btn" to="/spc">
                  <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.159662 12.0019C0.159662 11.5718 0.323895 11.1417 0.65167 10.8138L10.9712 0.494292C11.6277 -0.16216 12.692 -0.16216 13.3482 0.494292C14.0044 1.15048 14.0044 2.21459 13.3482 2.8711L4.21687 12.0019L13.3479 21.1327C14.0041 21.7892 14.0041 22.8532 13.3479 23.5093C12.6917 24.1661 11.6274 24.1661 10.9709 23.5093L0.65135 13.19C0.323523 12.8619 0.159662 12.4319 0.159662 12.0019Z" fill="#97B6CF"/>
                  </svg>
                </Link>
                <h2>
                  {location?.state?.data == "delete"
                    ? "Delete SPC"
                    : "View | Edit SPC"}
                </h2>
              </div>
              <div className="top-right-action">
                <div className="search-bar">
                  <form className="d-flex" onSubmit={(e) => submitHandler(e)}>
                    <input
                      className="form-control me-2"
                      type="text"
                      placeholder="Search"
                      aria-label="Search"
					  onChange={(e) => searchChange(e)}
                    />
                    <button className="btn btn-outline-success" type="submit">
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
                 {/* <button
                    className="btn-bordered cancel btn btn-primary"
                    type="button"
                    onClick={() => navigate("/spc")}>
                    Close
                  </button> */}
              </div>
            </div>

            <div className="smart-list-result spc-delete">
              <div className="col smartlist-result-block spc-edit">
				{
					typeof spcData !== "undefined" && spcData.length > 0
					?
					spcData.map((data) => {
						return (
							<>
							<div className="smartlist_box_block">
							  <div className="smartlist-view email_box">
								<div className="mail-box-content">
								  <div className="mailbox-table">
									<h5>
									{data?.title}
									</h5>

									<Table>
									  <tbody>
										<tr>
										  <th>Country</th>
										  <td>{data?.country}</td>
										</tr>
										<tr>
										  <th>Language</th>
										  <td>{data?.language}</td>
										</tr>
										<tr>
										  <th>IBU</th>
										  <td>{data?.IBU}</td>
										</tr>
										<tr>
										  <th>Product</th>
										  <td>
											{
                        isJson(data?.product) ?
                        JSON.parse(data.product)?.map((item, index) => {
                           return <span className="product_list">{item}
                            {
                              JSON.parse(data?.product)?.length -1 == index ? null : ','
                            }
                           </span>;
                        }) :
                        <div>{data?.product}</div>
                      }
										  </td>
										</tr>
										<tr>
										  <th>Creation date</th>
										  <td>{data?.createdDate}</td>
										</tr>
										<tr>
										  <th>Last edit</th>
										  <td>{
											  data?.last_edit ? data.last_edit : "N/A"
											  }
										  </td>
										</tr>
									  </tbody>
									</Table>
								  </div>
								  <div className="smartlist-buttons">
									{
									  <>
										{location?.state?.data != "delete" ? (
                      <Link
                        to="/spc-edit"
                        state={{ spcId: data.id }}
                        className="btn btn-primary btn-bordered edit_list"
                      >
                        Edit
                      </Link>
										) : null}

                    <Link
                      to="/spc-render"
                      state={{ file: data.file,title: data.title }}
                      className="btn btn-primary btn-filled view"
                    >
										  View
										</Link>
									  </>
									}
								  </div>
								  {location?.state?.data == "delete" ? (
									<div className="dlt_btn">
									  <button onClick={
										  (e) => {
											setConfirmationPopup(true);
											setSpcDeletedId(data?.id)
										  }}
										>
										<img
										  src={path_image + "delete.svg"}
										  alt="Delete Row"
										/>
									  </button>
									</div>
								  ) : null}
								</div>
							  </div>
							</div>
							</>
						)
					})
					:
            apiCallStatus ?
            <div className="no_found">
                   <p>No Data Found</p>
             </div>
             : null
				}

              </div>
            </div>
          </Row>
        </div>
      </div>

      <div className="delete">
      <CommonConfirmModel
        show={confirmationpopup}
        onClose={setConfirmationPopup}
        fun={deleteSpc}
        resetDataId={spcDeletedId}
        popupMessage={
         {
           "message1":"The SPC file will be deleted.",
           "message2":"Are you sure you want to delete it?",
           "footerButton":"Yes Please!"
         }
        }
        path_image={path_image}

       />
      </div>
    </>
  );
};
export default SpcView;
