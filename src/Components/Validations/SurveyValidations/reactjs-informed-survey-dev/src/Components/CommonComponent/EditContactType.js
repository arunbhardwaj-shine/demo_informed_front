import React, { useEffect, useState, useRef } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const EditContactType = (props) => {
  const [getSelectedIbu, setSelectedIbu] = useState(props.selected_ibu);
  const [getProfileUserId, setProfileUserId] = useState(props.profile_user);

  const onIbuChange = (e,profile_user_id) => {
    setSelectedIbu(e);
  };

  return(
    <>
    <DropdownButton className="dropdown-basic-button split-button-dropup edit-country-dropdown"
    title= { getSelectedIbu != "" &&  getSelectedIbu != "undefined" ? getSelectedIbu : "Select Ibu" }
    onSelect={(event) => onIbuChange(event,getProfileUserId)}
    >
      <div className="scroll_div">
        <Dropdown.Item eventKey="HCP">HCP</Dropdown.Item>
        <Dropdown.Item eventKey="Staff">Staff</Dropdown.Item>
        <Dropdown.Item eventKey="Test Users">Test Users</Dropdown.Item>
      </div>
    </DropdownButton>

    <input type="hidden" id={`field_contact_type` + getProfileUserId} value={getSelectedIbu} />
    </>
  )
}

export default EditContactType;
