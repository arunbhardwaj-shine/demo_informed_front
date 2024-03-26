import axios from "axios";
import React, { useState } from "react";
import { Tooltip } from "react-bootstrap";
import { Tabs, Tab,ProgressBar } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Link } from "react-router-dom";


const SmartListLayout = ({data,deletestatus,callLinkClickFun,iseditshow,isviewshow,viewSmartListData}) => {
    let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    const [opening_details, setOpeningDetails] = useState([]);
    const [flag, setFlag] = useState(0);
    

    const tabClicked = async (type, id) => {
        if (type == "more-details") {
            let index = opening_details.findIndex((el) => el?.listid == id);
            if (index === -1) {
            let normal_data = opening_details;
            try {
                let body = {
                user_id: localStorage.getItem('user_id'),
                list_id: id,
                };
                const res =  await axios.post(`distributes/get_list_more_details`,body);
                if (res?.data?.response) {
                let new_data = res?.data?.response;
                normal_data.push(new_data);
                setOpeningDetails(normal_data);
                setFlag(flag + 1);
                }
            } catch (err) {
                console.log(err);
            }
            }
        }
    }

    function LinkWithTooltip({ id, children, href, tooltip }) {
        return (
          <OverlayTrigger
            overlay={<Tooltip id={id}>{tooltip}</Tooltip>}
            placement="top"
            delayShow={300}
            delayHide={150}
          >
            <a href={href}>{children}</a>
          </OverlayTrigger>
        );
    }

    const linkClicked = (data) => {
        callLinkClickFun(data);
    };

    const viewSmartList = (id) => {
        viewSmartListData(id);
    }

    return(
        <>
            <div className="tabs-data">
                <Tabs
                onSelect={(key) => tabClicked(key, data?.id)}
                defaultActiveKey="list-info"
                fill
                >
                <Tab
                    eventKey="list-info"
                    title="List info"
                    className="flex-column justify-content-between"
                >
                    <div className="d-flex justify-content-between tabs-data flex-column">
                    <div className="tab-panel d-flex flex-column justify-content-between">
                    <ul className="tab-mail-list">
                        <li>
                        <h6 className="tab-content-title">
                            IBU
                        </h6>
                        <h6>
                            {data?.ibu ? data?.ibu : "N/A"}
                        </h6>
                        </li>
                        <li>
                        <h6 className="tab-content-title">
                        Created by
                        </h6>
                        <h6 className="list_creator">
                            {data?.creator ? data?.creator : "N/A"}
                        </h6>
                        </li>
                    </ul> 

                    <div className="mail-time">
                        <span>{data?.created_at}</span>
                        <div className="smart-list-added-user">
                        <img
                            src={path_image + "smartlist-user.svg"}
                            alt="User icon"
                        />
                        {data?.readers_count}
                        </div>
                    </div>
                    
                    </div>
                    {
                        iseditshow || isviewshow ? 
                            <div className="smartlist-buttons">
                                {
                                    !deletestatus &&  (
                                <>
                                    {
                                        iseditshow ? 
                                        <>
                                            {data?.upload_by_filter == 1 ? (
                                            <Link
                                                className="btn btn-primary btn-bordered edit_list"
                                                to={{
                                                pathname: "/EditList",
                                                search: "?listId=" + data.id,
                                                }}
                                                onClick={() => linkClicked(data.id)}
                                            >
                                                Edit List
                                            </Link>
                                            ) : (
                                            <Link
                                                className="btn btn-primary btn-bordered edit_list"
                                                to={{
                                                pathname: "/ViewSmartList",
                                                search: "?listId=" + data.id,
                                                }}
                                                onClick={() => linkClicked(data.id)}
                                            >
                                                Edit List
                                            </Link>
                                            )}
                                        </>
                                        : null
                                    }
                                    {
                                        isviewshow ? 
                                        <button className="btn btn-primary btn-filled view">
                                            <a onClick={() => {
                                                viewSmartList(data.id)
                                            }}>
                                                View
                                            </a>
                                        </button>
                                        : null
                                    }
                                </>
                                    )
                                }
                            </div>
                        : null
                    }
            </div>
                </Tab>
                <Tab
                eventKey="more-details"
                title="More details"
                className="flex-column justify-content-between"
                >
                    <div className="tab-panel d-flex flex-column justify-content-between">
                    <ul className="tab-mail-list">
                        <li>
                        <h6 className="tab-content-title">
                            Last used
                        </h6>
                        <h6>
                            {
                            opening_details.findIndex(
                                (el) => el.listid == data?.id
                            ) !== -1
                                ? opening_details[
                                opening_details.findIndex(
                                    (el) => el.listid == data?.id
                                )
                                ].last_email : "N/A"
                            }
                        </h6>
                        </li>
                        <li>
                        <h6 className="tab-content-title">
                        Registered
                        </h6>
                        <h6>
                            {data?.registered}
                        </h6>
                        </li>
                        <li>
                        <h6 className="tab-content-title">
                        Country
                        </h6>
                                    <h6 title={opening_details.findIndex(
                                        (el) => el.listid == data?.id
                                    ) !== -1
                                        ? opening_details[
                                            opening_details.findIndex(
                                                (el) => el.listid == data?.id
                                            )
                                        ]?.country : "N/A"}>
                        {
                            opening_details.findIndex(
                                (el) => el.listid == data?.id
                            ) !== -1
                                ? opening_details[
                                opening_details.findIndex(
                                    (el) => el.listid == data?.id
                                )
                                ]?.country : "N/A"
                            }
                        </h6>
                        </li>
                        <li>
                        <h6 className="tab-content-title">
                        List use
                            <LinkWithTooltip tooltip="Number of times email sent to the this list.">
                            <img
                            src={
                                path_image +
                                "info_circle_icon.svg"
                            }
                            alt="refresh-btn"
                            />
                        </LinkWithTooltip>
                        </h6>
                            <div className="data-progress qr-opening">
                            <ProgressBar
                                variant="default"
                                now={5}
                                label={
                                opening_details.findIndex(
                                    (el) => el.listid == data?.id
                                ) !== -1
                                    ? opening_details[
                                    opening_details.findIndex(
                                        (el) => el.listid == data?.id
                                        )
                                    ]?.total_list_send
                                    : "Loading"
                                }
                            />
                            </div>
                        </li>
                        <li>
                        <h6 className="tab-content-title">
                        Emails sent
                        <LinkWithTooltip tooltip="Number of total email sent.">
                            <img
                            src={
                                path_image +
                                "info_circle_icon.svg"
                            }
                            alt="refresh-btn"
                            />
                        </LinkWithTooltip>
                        </h6>
                        <div className="data-progress send">
                            <ProgressBar
                                variant="default"
                                now={5}
                                label={
                                opening_details.findIndex(
                                    (el) => el.listid == data?.id
                                ) !== -1
                                    ? opening_details[
                                    opening_details.findIndex(
                                        (el) => el.listid == data?.id
                                        )
                                    ]?.total_sent
                                    : "Loading"
                                }
                            />
                            </div>
                        </li>
                        <li>
                        <h6 className="tab-content-title">
                        Avg opening rate
                        <LinkWithTooltip tooltip="Number of average opening counts.">
                            <img
                            src={
                                path_image +
                                "info_circle_icon.svg"
                            }
                            alt="refresh-btn"
                            />
                        </LinkWithTooltip>
                        </h6>
                        <div className="data-progress open">
                            <ProgressBar
                                variant="default"
                                now={5}
                                label={
                                opening_details.findIndex(
                                    (el) => el.listid == data?.id
                                ) !== -1
                                    ? opening_details[
                                    opening_details.findIndex(
                                        (el) => el.listid == data?.id
                                        )
                                    ]?.total_open
                                    : "Loading"
                                }
                            />
                            </div>
                        </li>
                        <li>
                        <h6 className="tab-content-title">
                        Avg CTR
                        <LinkWithTooltip tooltip="Number of average CTR.">
                            <img
                            src={
                                path_image +
                                "info_circle_icon.svg"
                            }
                            alt="refresh-btn"
                            />
                        </LinkWithTooltip>
                        </h6>
                        <div className="data-progress delivered">
                            <ProgressBar
                                variant="default"
                                now={5}
                                label={
                                opening_details.findIndex(
                                    (el) => el.listid == data?.id
                                ) !== -1
                                    ? opening_details[
                                    opening_details.findIndex(
                                        (el) => el.listid == data?.id
                                        )
                                    ]?.total_ctr
                                    : "Loading"
                                }
                            />
                            </div>
                        </li>
                    </ul> 
                    </div>
                </Tab>
                </Tabs>
            </div>
        </>
    )
};
export default SmartListLayout