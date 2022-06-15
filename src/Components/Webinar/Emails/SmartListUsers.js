import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
const SmartListUsers = () => {

  return ( 
	 
      <div className="right-sidebar">
        <div className="page-top-nav">
          <div className="row justify-content-end align-items-center">
            
            <div className="col-12 col-md-1">
              <div className="header-btn-left">
                <Link to="/webinar/email/create">
                <button class="btn btn-primary btn-filled back">
									<svg width="12" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path fill-rule="evenodd" clip-rule="evenodd" d="M8.31557 17.82C8.97165 18.476 10.0354 18.476 10.6915 17.82C11.3475 17.1639 11.3475 16.1002 10.6915 15.4441L4.7522 9.50484L10.6927 3.56431C11.3488 2.90823 11.3488 1.84451 10.6927 1.18843C10.0367 0.532347 8.97294 0.532347 8.31686 1.18843L1.2212 8.28409C1.21 8.29469 1.19891 8.30548 1.18794 8.31646C0.531858 8.97254 0.531858 10.0363 1.18794 10.6923L8.31557 17.82Z" fill="white"/>
									</svg>
								</button>
                </Link>
              </div>
            </div>
            
            <div className="col-12 col-md-9">
            <ul class="tabnav-link">
									<li class="active">
										<a href="javascript:void(0)">Prepare your email</a>
									</li>
									<li class="active">
										<a href="javascript:void(0)">Select smart list</a>
									</li>
									<li class="active active-main">
										<a href="javascript:void(0)">Approve and send</a>
									</li>
									
								</ul>
            </div>
            
            <div className="col-12 col-md-2">
              <div className="header-btn">
                <button className="btn btn-primary btn-bordered move-draft" >
                  Save As Draft
                </button>
              
                <button class="btn btn-primary btn-filled back">
                   Save
								</button>
              
              </div>
            </div>
          </div>
        </div>
        <section class="verify_email">
							<div class="row">
								<div class="col-12 verify-left">
									<div class="verify-mail-box">
									<div class="preview_mail-inside">
										<div class="row">
											<div class="col d-flex align-items-center">
											
											</div>
											<div class="col d-flex align-items-center">
												<h4>Preview Your List</h4>
											</div>
											<div class="col d-flex align-items-center justify-content-end">
												<div class="mail-preview-action">
													<div class="hcp-new-user">
														<button class="btn btn-outline-primary btn-filled" data-bs-toggle="modal" data-bs-target="#modal-add"><img src="assets/images/new-user.svg" alt="New User"/></button>
													</div>
													<div class="hcp-added">
														<button class="btn btn-outline-primary btn-filled"><img src="assets/images/edit.svg" alt="Edit"/></button>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="list-tab">
										<div class="list-tab-view">
											<div class="list-tab-box">
											 <div class="list-tab-box-inside">
											  <ul class="nav nav-tabs" role="tablist">
												<li class="nav-item">
												  <a class="nav-link" data-bs-toggle="tab" href="#personal_info1">Personal Info</a>
												</li>
												<li class="nav-item">
												  <a class="nav-link active" data-bs-toggle="tab" href="#stats1">Stats</a>
												</li>
											  </ul>
											   <div class="tab-content">
													<div id="personal_info1" class="tab1 tab-pane">
													  <h5>Person Name</h5>
													  <div class="mailbox-table">
														<table>
															<tbody>
																<tr><th>Country</th><td contenteditable="true">Name of the country</td></tr>
																<tr><th>Profession</th><td contentedtable="true">Staff</td></tr>
															</tbody>
														</table>
													 </div>
													</div>
													<div id="stats1" class="tab2 tab-pane fade active show">
														<div class="tabbing-stats">
															 <div class="mailbox-table">
																<table>
																	<tbody>
																		<tr><th>Consent</th><td>Yes</td></tr>
																		<tr><th>Bounced</th><td>Yes</td></tr>
																		<tr><th>Last Email</th><td>Nov 18 </td></tr>
																	</tbody>
																</table>
															 </div>
															 
														</div>
													
													</div>
												</div>
											</div>
										</div>
										<div class="list-tab-box">
											<div class="list-tab-box-inside">
											  <ul class="nav nav-tabs" role="tablist">
												<li class="nav-item">
												  <a class="nav-link active" data-bs-toggle="tab" href="#personal_info2">Personal Info</a>
												</li>
												<li class="nav-item">
												  <a class="nav-link" data-bs-toggle="tab" href="#stats2">Stats</a>
												</li>
											  </ul>
											   <div class="tab-content">
													<div id="personal_info2" class="tab1 tab-pane active">
													  <h5>Person Name</h5>
													  <div class="mailbox-table">
														<table>
															<tbody>
																<tr><th>Country</th><td contenteditable="true">Name of the country</td></tr>
																<tr><th>Profession</th><td contenteditable="true">Staff</td></tr>
															</tbody>
														</table>
													 </div>
													</div>
													<div id="stats2" class="tab2 tab-pane fade">
														<div class="tabbing-stats">
															 <div class="mailbox-table">
																<table>
																	<tbody>
																		<tr><th>Consent</th><td>Yes</td></tr>
																		<tr><th>Bounced</th><td>Yes</td></tr>
																		<tr><th>Last Email</th><td>Nov 18 </td></tr>
																	</tbody>
																</table>
															 </div>
			
														</div>
													
													</div>
												</div>
											</div>
										</div>
										<div class="list-tab-box">
											<div class="list-tab-box-inside">
											  <ul class="nav nav-tabs" role="tablist">
												<li class="nav-item">
												  <a class="nav-link active" data-bs-toggle="tab" href="#personal_info3">Personal Info</a>
												</li>
												<li class="nav-item">
												  <a class="nav-link" data-bs-toggle="tab" href="#stats3">Stats</a>
												</li>
											  </ul>
											   <div class="tab-content">
												 <div id="personal_info3" class="tab1 tab-pane active">
													  <h5>Person Name</h5>
													  <div class="mailbox-table">
														<table>
															<tbody>
																<tr><th>Country</th><td contenteditable="true">Name of the country</td></tr>
																<tr><th>Profession</th><td contenteditable="true">Staff</td></tr>
															</tbody>
														</table>
													 </div>
													</div>
													<div id="stats3" class="tab2 tab-pane fade">
														<div class="tabbing-stats">
															 <div class="mailbox-table">
																<table>
																	<tbody>
																		<tr><th>Consent</th><td>Yes</td></tr>
																		<tr><th>Bounced</th><td>Yes</td></tr>
																		<tr><th>Last Email</th><td>Nov 18 </td></tr>
																	</tbody>
																</table>
															 </div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									</div>
									</div>
								</div>
								<div class="col-12 verify-right">
									<div class="preview_mail">
										<div class="preview_mail-inside">
											<div class="row">
												<div class="col">
												</div>
												<div class="col col-md-6">
													<h4>Preview Your Email</h4>
												</div>
												<div class="col d-flex justify-content-end">
													<div class="collection-view">
														  <a class="change-view active" id="grid" rel="tooltip" title="Grid view">
															<div class="togglelines"><img src="assets/images/desktop-view.png" alt=""/></div>
														  </a>

														  <a class="change-view" id="list" rel="tooltip" title="List view">
															<div class="togglelines"><img src="assets/images/mobile-view.png" alt=""/></div>
														  </a>      
													</div>
												</div>
											</div>
										</div>
										<div class="preview-mail-box">
											<img src="assets/images/pdf-format.png" alt="PDF View" />
										</div>
									</div>
								</div>
							</div>
						</section>
      </div>    
	)
}
export default SmartListUsers;
