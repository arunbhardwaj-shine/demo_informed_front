import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  Modal,
  DropdownButton,
  Form,
  Row,
  ProgressBar,
  Tab,
  Tabs,
} from "react-bootstrap";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { ENDPOINT } from "../../../axios/apiConfig";
import {postData, getData} from "../../../axios/apiHelper";
import { toast } from "react-toastify";
import QRCode from "qrcode.react";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const RenderPdf = () => {
    return (
      <div class="sublink_right_block">
      </div>
    )
}

export default RenderPdf;
