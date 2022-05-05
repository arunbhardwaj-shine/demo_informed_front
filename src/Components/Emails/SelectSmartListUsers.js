import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loader } from "../../loader";

import TableOnly from "./TableOnly";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const SelectSmartListUsers = (props) => {
  const navigate = useNavigate();
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const location = useLocation();
  const [readers, setReaders] = useState([]);
  const campaign_id = props.getDraftData ? props.getDraftData.campaign_id : "";
  const [campaign_id_st, setCampaign_id] = useState(campaign_id);
  const [SendListData, setSendListData] = useState([]);
  const [PdfSelected, setPdfSelected] = useState(0);
  const [TemplateId, setTemplateId] = useState(0);
  const [removedReaders, setRemovedReaders] = useState([]);
  const [readersNewlyAdded, setReadersNewlyAdded] = useState([]);
  const [reRender, setReRender] = useState(0);
  const [update, setUpdate] = useState(0);

  const smartListSelected = location.state
    ? location.state.smartListSelected
    : props.getDraftData.smart_list_data;

  //console.log(smartListSelected);

  const inputElement = useRef();
  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    const body = {
      user_id: 18207,
      list_id: props.getEmailData
        ? smartListSelected.id
        : props.getDraftData.campaign_data.smart_list_id,
    };
    loader("show");
    axios
      .post(`distributes/get_reders_list`, body)
      .then((res) => {
        //   console.log(res)
        setReaders(res.data.response.data);
        loader("hide");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const backClicked = () => {
    window.history.go(-1);

    // return true;
  };

  const saveAsDraft = async () => {
    console.log("hi");

    const body = {
      user_id: 18207,
      pdf_id: props.getEmailData
        ? props.getEmailData.pdf_id
        : props.getDraftData.pdf_id,
      description: props.getEmailData
        ? props.getEmailData.emailDescription
        : props.getDraftData.description,
      creator: props.getEmailData
        ? props.getEmailData.emailCreator
        : props.getDraftData.creator,
      campaign_name: props.getEmailData
        ? props.getEmailData.emailCampaign
        : props.getDraftData.campaign,
      subject: props.getEmailData
        ? props.getEmailData.emailSubject
        : props.getDraftData.subject,
      route_location: "SelectSmartListUsers",
      tags: props.getEmailData
        ? props.getEmailData.tags
        : props.getDraftData.tags,
      campaign_data: {
        template_id: props.getEmailData
          ? props.getEmailData.templateId
          : props.getDraftData.campaign_data.template_id,
        smart_list_id: props.getEmailData
          ? smartListSelected.id
          : props.getDraftData.campaign_data.smart_list_id,
        //smart_list_data: readers,
        // users_list : smartListSelected,
        selectedHcp: [...readers, ...readersNewlyAdded],
      },
      campaign_id: campaign_id_st,
    };

    console.log(body);
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`emailapi/save_draft`, body)
      .then((res) => {
        console.log(res);
        //console.log(selectedHcp);
        setCampaign_id(res.data.response.data.id);
        //  setSelectedHcp(selectedHcp);
        //  console.log(props.getCampaignId);
        loader("hide");

        // console.log(res);
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  const nextClicked = () => {
    navigate("/verifyMAIL", {
      // data: data,
      // smartListName: smartListName,
      state: {
        selectedHcp: [...readers, ...readersNewlyAdded],
      },
    });
  };

  const handleSelect = (e) => {
    setPdfSelected(e.target.value);
  };

  const newlyAddedRemoved = (reader, i) => {
    const readersRemoved = removedReaders;
    //console.log(i);
    //setReadersNewlyAdded((oldArray) => [reader, ...oldArray]);
    setRemovedReaders((oldArray) => [reader, ...oldArray]);
    const newlyAdded = readersNewlyAdded;
    newlyAdded.splice(i, 1);
    console.log(newlyAdded);
    setReadersNewlyAdded(newlyAdded);

    setUpdate(update + 1);
    //setReRender(reRender + 1);
  };

  const handleInputChange = (event, selected) => {
    const div = document.querySelector("div.active");

    if (div) {
      div.classNameNameList.remove("active");
    }
    event.target.classNameNameList.toggle("active");
    setTemplateId(selected);
  };

  const readersAdded = (reader, i) => {
    // const newlyAddedReaders = readersNewlyAdded;
    const readersRemoved = removedReaders;
    readersRemoved.splice(i, 1);
    setRemovedReaders(readersRemoved);
    setReadersNewlyAdded((oldArray) => [reader, ...oldArray]);
    // console.log(readersNewlyAdded);
    //setReaders((oldArray) => [reader, ...oldArray]);
    setReRender(reRender + 1);

    // console.log(readers);
  };

  const deleteReader = (i) => {
    const readersList = readers;
    const removedReader = readersList.splice(i, 1);
    setReaders(readersList);
    setRemovedReaders((oldArray) => [...oldArray, removedReader[0]]);
    //  console.log(removedReaders);
  };

  return (
    <>
      <div className="right-sidebar">
        <div className="page-top-nav">
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
                <li className="">
                  <a href="javascript:void(0)">Select Content</a>
                </li>
                <li className="">
                  <a href="javascript:void(0)">Create Your Email</a>
                </li>
                <li className="active">
                  <a href="javascript:void(0)">Select Verify Your HCPs</a>
                </li>

                <li className="">
                  <a href="javascript:void(0)">Verify your Email</a>
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
                HCPs <span>| {smartListSelected.readers_count}</span>
              </h4>
              <div className="selected-hcp-table-action">
                <a className="show-less-info" href="#">
                  Show Less information{" "}
                </a>
                <div className="hcp-new-user">
                  <button className="btn btn-outline-primary">
                    <img src={path_image + "new-user.svg"} alt="New User" />
                  </button>
                </div>
                <div className="hcp-added">
                  <button className="btn btn-outline-primary">
                    <img src={path_image + "edit.svg"} alt="Edit" />
                  </button>
                </div>
                <div className="hcp-sort">
                  <button className="btn btn-outline-primary">
                    Sort By <img src={path_image + "sort.svg"} alt="Shorting" />
                  </button>
                </div>
              </div>
            </div>
            <div className="selected-hcp-list">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Bounced</th>
                    <th scope="col">Country</th>
                    <th scope="col">Readers</th>
                    <th scope="col">Business Unit</th>
                    <th scope="col">Interest</th>
                    <th scope="col">Consent</th>
                    <th scope="col">Email Received</th>
                    <th scope="col">Openings</th>
                    <th scope="col">Registrations</th>
                    <th scope="col">Last Email</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {removedReaders.map((rr, i) => {
                    return (
                      <>
                        <tr className="hcps-deleted">
                          <td>{rr.first_name}</td>
                          <td>{rr.email}</td>
                          <td>NA</td>
                          <td>{rr.country}</td>
                          <td>NA</td>
                          <td>NA</td>
                          <td>NA</td>
                          <td>
                            <span>NA</span>
                          </td>
                          <td>
                            <span>NA</span>
                          </td>
                          <td>
                            <span>30</span>
                          </td>
                          <td>
                            <span>NA</span>
                          </td>
                          <td>
                            <span>NA</span>
                          </td>
                          <td className="add-new-hcp" colspan="12">
                            <img
                              src={path_image + "add-row.png"}
                              alt="Add Row"
                              onClick={() => readersAdded(rr, i)}
                            />
                          </td>
                        </tr>
                      </>
                    );
                  })}
                  {/* <tr className="hcps-added">
                    <td>Jacob Flindt</td>
                    <td>User@docintel.app</td>
                    <td>No</td>
                    <td>United Kingdom</td>
                    <td>CIS</td>
                    <td>Haematology</td>
                    <td>Tech</td>
                    <td>
                      <span>Yes</span>
                    </td>
                    <td>
                      <span>43</span>
                    </td>
                    <td>
                      <span>30</span>
                    </td>
                    <td>
                      <span>28</span>
                    </td>
                    <td>
                      <span>Nov 18</span>
                    </td>
                    <td className="delete_row" colspan="12">
                      <img src="assets/images/delete.svg" alt="Delete Row" />
                    </td>
                  </tr>*/}
                  <tr className="seprator-add">
                    <td colspan="13"></td>
                  </tr>
                  {readersNewlyAdded.map((readers, i) => {
                    return (
                      <>
                        <tr className="hcps-added">
                          <td>{readers.first_name}</td>
                          <td>{readers.email}</td>
                          <td>NA</td>
                          <td>{readers.country}</td>
                          <td>NA</td>
                          <td>NA</td>
                          <td>NA</td>
                          <td>
                            <span>NA</span>
                          </td>
                          <td>
                            <span>NA</span>
                          </td>
                          <td>
                            <span>NA</span>
                          </td>
                          <td>
                            <span>NA</span>
                          </td>
                          <td>
                            <span>NA 18</span>
                          </td>
                          <td className="delete_row" colspan="12">
                            <img
                              src={path_image + "delete.svg"}
                              alt="Delete Row"
                              onClick={() => newlyAddedRemoved(readers, i)}
                            />
                          </td>
                        </tr>
                      </>
                    );
                  })}
                  {readers.map((readers, i) => {
                    return (
                      <>
                        <tr>
                          <td>{readers.first_name}</td>
                          <td>{readers.email}</td>
                          <td>NA</td>
                          <td>{readers.country}</td>
                          <td>NA</td>
                          <td>NA</td>
                          <td>NA</td>
                          <td>
                            <span>NA</span>
                          </td>
                          <td>
                            <span>NA</span>
                          </td>
                          <td>
                            <span>NA</span>
                          </td>
                          <td>
                            <span>NA</span>
                          </td>
                          <td>
                            <span>NA</span>
                          </td>
                          <td className="delete_row" colspan="12">
                            <img
                              src={path_image + "delete.svg"}
                              alt="Add Row"
                              onClick={() => deleteReader(i)}
                            />
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return state;
};

export default connect(mapStateToProps)(SelectSmartListUsers);
