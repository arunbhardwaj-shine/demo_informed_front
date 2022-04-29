import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { loader } from "../../loader";
import { Link, NavigationType,useNavigate } from "react-router-dom";

const EmailArticleSelect = () => {

  let path_image= process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [SendListData, setSendListData] = useState([]);
  const [PdfSelected, setPdfSelected] = useState(0);
  const inputElement = useRef();


   axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
   useEffect(() => {

        const body = {
          user_id: 18207,
        };
        loader("show");
        axios
          .post(`emailapi/get_content_list`, body)
          .then((res) => {
            setSendListData(res.data.response.data);
            loader("hide");
          })
          .catch((err) => {
            console.log(err);
          });


   }, []);

	useEffect(() => {
		if(PdfSelected!==0){
			inputElement.current.classList.remove("disabled");
		}

	}, [PdfSelected]);

	 const handleSelect = (e)=>{
			setPdfSelected(e.target.value);
	}

    return (
      <>
     			<div className="right-sidebar">
					<div className="page-top-nav">
						<div className="row justify-content-end align-items-center">
							<div className="col-12 col-md-1">
								<div className="header-btn-left">

								</div>
							</div>
							<div className="col-12 col-md-9">
								<ul className="tabnav-link">
									<li className="active">
										<a href="">Select Content</a>
									</li>
									<li className="">
										<a href="">Create Your Email</a>
									</li>
									<li className="">
										<a href="">Select HCPs</a>
									</li>
									<li className="">
										<a href="">Verify your list</a>
									</li>
									<li className="">
										<a href="">Verify your Email</a>
									</li>
								</ul>
							</div>
							<div className="col-12 col-md-2">
							  <div className="header-btn">
								<button className="btn btn-primary btn-bordered cancel">Cancel</button>
								{

										PdfSelected === 0 ? <button ref={inputElement} className="btn btn-primary btn-filled next disabled">Next</button> : <Link to="/CreateEmail" state={{ PdfSelected: PdfSelected }}>
										<button ref={inputElement} className="btn btn-primary btn-filled next disabled">Next</button>
									</Link>

								}

							  </div>
							</div>
						 </div>
					</div>

					<div className="top-header">
						<div className="page-title">
							<h4>Select your content</h4>
						</div>
						{/* <div className="top-right-action">
							<div className="search-bar">
								<form className="d-flex">
								  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
								  <button className="btn btn-outline-success" type="submit"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M15.8045 14.862L11.2545 10.312C12.1359 9.22334 12.6665 7.84 12.6665 6.33334C12.6665 2.84134 9.82522 0 6.33325 0C2.84128 0 0 2.84131 0 6.33331C0 9.82531 2.84132 12.6667 6.33328 12.6667C7.83992 12.6667 9.22325 12.136 10.3119 11.2547L14.8619 15.8047C14.9919 15.9347 15.1625 16 15.3332 16C15.5039 16 15.6745 15.9347 15.8045 15.8047C16.0652 15.544 16.0652 15.1227 15.8045 14.862ZM6.33328 11.3333C3.57597 11.3333 1.33333 9.09066 1.33333 6.33331C1.33333 3.57597 3.57597 1.33331 6.33328 1.33331C9.0906 1.33331 11.3332 3.57597 11.3332 6.33331C11.3332 9.09066 9.09057 11.3333 6.33328 11.3333Z" fill="#97B6CF"/>
									</svg>
									</button>
								</form>
							</div>
							<div className="filter-by">
								<button className="btn btn-outline-primary" type="submit">
								Filter By <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M0.615385 2.46154H3.07692C3.07692 3.14031 3.62892 3.69231 4.30769 3.69231H5.53846C6.21723 3.69231 6.76923 3.14031 6.76923 2.46154H15.3846C15.7243 2.46154 16 2.18646 16 1.84615C16 1.50585 15.7243 1.23077 15.3846 1.23077H6.76923C6.76923 0.552 6.21723 0 5.53846 0H4.30769C3.62892 0 3.07692 0.552 3.07692 1.23077H0.615385C0.275692 1.23077 0 1.50585 0 1.84615C0 2.18646 0.275692 2.46154 0.615385 2.46154Z" fill="#97B6CF"/>
									<path d="M15.3846 6.15362H11.6923C11.6923 5.47485 11.1403 4.92285 10.4615 4.92285H9.23077C8.552 4.92285 8 5.47485 8 6.15362H0.615385C0.275692 6.15362 0 6.4287 0 6.76901C0 7.10931 0.275692 7.38439 0.615385 7.38439H8C8 8.06316 8.552 8.61516 9.23077 8.61516H10.4615C11.1403 8.61516 11.6923 8.06316 11.6923 7.38439H15.3846C15.7243 7.38439 16 7.10931 16 6.76901C16 6.4287 15.7243 6.15362 15.3846 6.15362Z" fill="#97B6CF"/>
									<path d="M15.3846 11.077H6.76923C6.76923 10.3982 6.21723 9.84619 5.53846 9.84619H4.30769C3.62892 9.84619 3.07692 10.3982 3.07692 11.077H0.615385C0.275692 11.077 0 11.352 0 11.6923C0 12.0327 0.275692 12.3077 0.615385 12.3077H3.07692C3.07692 12.9865 3.62892 13.5385 4.30769 13.5385H5.53846C6.21723 13.5385 6.76923 12.9865 6.76923 12.3077H15.3846C15.7243 12.3077 16 12.0327 16 11.6923C16 11.352 15.7243 11.077 15.3846 11.077Z" fill="#97B6CF"/>
									</svg>
								</button>
							</div>

						</div> */}
					</div>

					<div className="mail-content-select">
						<div className="row">

						{SendListData.map((data) => {
                 		return (
							<div className="col-12 col-md-4">
									<div className="mail-content-select-box">
										<div className="mail-content-select-top">
											<div className="mail-preview-img">
												<img src={data.cover_img} alt="Preview " />
											</div>
											<div className="mail-box-content">
												<h5>{data.title}</h5>
												<p>{data.pdf_sub_title}</p>
												<div className="mailbox-tags">
													<ul>
													{
														data.tags.map((data_tags) => {
        											return (
														<li className="list1">{data_tags}</li>

														);
													})}
													</ul>
												</div>
											</div>
											<div className="select-mail-option" onClick={handleSelect}>
												<input type="radio" name="radio"  value={data.id} />
												<span className="checkmark"></span>
											</div>
										</div>
										<div className="mail-content-table">
											<table>
												<tbody>
													<tr>
														<th>Upload Date</th>
														<td>{data.created}</td>
													</tr>
													<tr>
														<th>Language</th>
														<td>{data.language}</td>
													</tr>
													<tr>
														<th>SPC</th>
														<td>{data.spc_included === 0 ? 'No' : 'Yes' }</td>
													</tr>
													<tr>
														<th>Last Email</th>
														<td>{data.last_sent=='' ? 'N/A' : data.last_sent }</td>
													</tr>
												</tbody>
											</table>
										</div>
										<div className="mail-content-footer">
											<button className="btn btn-primary btn-filled">Preview</button>
										</div>
									</div>
								</div>

							);
							})}


							</div>
						</div>


				</div>


      </>
    );
};


export default EmailArticleSelect;
