import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import NumberFilter from "@inovua/reactdatagrid-community/NumberFilter";
import "@inovua/reactdatagrid-community/index.css";
import { loader } from "../../loader";

const EmailStatss = () => {
  const [totalCount, setTotalCount] = useState([]);
  const [update, setUpdate] = useState(0);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {}, []);

  const getCampaignList = async () => {
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const body = {
      user_id: "rjiGlqA9DXJVH7bDDTX0Lg==",
      page: 1,
    };
    loader("show");
    await axios
      .post(`distributes/get_send_campaign_list`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          console.log(res);
          setData(res.data.response.data);
          loader("hide");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDetails = (id) => {
    console.log(id);
    navigate("/get-details", {
      state: { distribute_id: id.data.distribute_id },
    });
  };

  const loadData = ({ skip, limit, sortInfo }) => {
    const url =
      process.env.REACT_APP_API_KEY + `distributes/get_send_campaign_list`;

    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: "rjiGlqA9DXJVH7bDDTX0Lg==",
        skip: skip,
        limit: limit,
        sortInfo: sortInfo,
      }),
    }).then((response2) => {
      const totalCount = 50;
      return response2.json().then((data2) => {
        const data = data2.response.data;
        return Promise.resolve({ data, count: parseInt(totalCount) });
      });
    });
  };

  const columns = [
    {
      name: "c_id",
      header: <b> Campaign ID</b>,

      defaultFlex: 1,
    },
    { name: "sent_data", header: "Date", defaultFlex: 1 },
    { name: "subject", header: "Subject", defaultFlex: 1 },
    { name: "pdf_title", header: "Article Title", defaultFlex: 1 },
    { name: "list", header: "Smart List", defaultFlex: 1 },
    { name: "total_sent_count", header: "Total Mail Sent", defaultFlex: 1 },
    { name: "total_read_count", header: "Email Read", defaultFlex: 1 },
    {
      name: "total_pending_count",
      header: "Pending Read Email",
      defaultFlex: 1,
    },
    { name: "total_bouns_count", header: "Bounce Count", defaultFlex: 1 },
    {
      name: "Action",
      header: "Action",
      defaultFlex: 1,
      render: function (id) {
        return (
          <>
            <button onClick={() => getDetails(id)}>get details</button>
            <button>Send pending</button>
            <button>Send to all</button>
          </>
        );
      },
    },
  ];

  const dataSources = useCallback(loadData, []);
  const gridStyle = { minHeight: 800 };
  return (
    <>
      {console.log(dataSources)}
      <div className="right-sidebar">
        <div style={{ marginLeft: "60px" }}>
          <ReactDataGrid
            idProperty="uniqueId"
            columns={columns}
            pagination
            dataSource={dataSources}
            defaultLimit={10}
            style={gridStyle}
          />
        </div>
      </div>
    </>
  );
};
export default EmailStatss;
