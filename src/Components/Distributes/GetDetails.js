import { useEffect, useState } from "react";
import axios from "axios";
import { loader } from "../../loader";
import { useLocation } from "react-router-dom";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";

const GetDetails = () => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");
  const [distributeData, setDistributeData] = useState({});
  const location = useLocation();
  const { distribute_id } = location.state;
  console.log(distribute_id);

  const columns = [
    {
      name: "first_name",
      header: <b> First Name</b>,

      defaultFlex: 1,
    },
    { name: "last_name", header: "Last Name", defaultFlex: 1 },
    { name: "email", header: "Email", defaultFlex: 1 },
    { name: "email_read", header: "Email read", defaultFlex: 1 },
    { name: "article_open", header: "Link open", defaultFlex: 1 },
    { name: "registered", header: "Registered", defaultFlex: 1 },
  ];

  const dataSource = data;

  useEffect(() => {
    getCampaignReaderDetails();
  }, []);

  const getCampaignReaderDetails = async () => {
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const body = {
      user_id: "rjiGlqA9DXJVH7bDDTX0Lg==",
      distribute_id: distribute_id,
    };
    loader("show");
    await axios
      .post(`distributes/get_campaign_readers_details`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          console.log(res);
          setData(res.data.response.data.readers);
          setDistributeData(res.data.response.data.distribute_data);
          loader("hide");
        }

        //console.log("here");
      })
      .catch((err) => {
        console.log(err);
        //  / console.log("here");
      });
  };

  const gridStyle = { minHeight: 800 };
  return (
    <>
      {" "}
      <div className="left-sidebar">
        <div className="jumbotron">
          <h1 className="display-4"></h1>
          Details
          <p className="lead">Date:{distributeData.sent_data}</p>
          <hr className="my-4" />
          <p className="lead">Subject:{distributeData.subject}</p>
          <p className="lead">Smart List:{distributeData.list}</p>
          <p className="lead">
            Total mail sent:{distributeData.total_sent_count}
          </p>
          <p className="lead">Email read:{distributeData.total_read_count}</p>
          <p className="lead">
            Pending read email:{distributeData.total_pending_count}
          </p>
          <p className="lead">
            Bounce count:{distributeData.total_bouns_count}
          </p>
        </div>
      </div>
      <div className="right-sidebar">
        <div style={{ marginLeft: "60px" }}>
          <ReactDataGrid
            idProperty="uniqueId"
            columns={columns}
            pagination="local"
            dataSource={dataSource}
            style={gridStyle}
          />
        </div>
      </div>
    </>
  );
};
export default GetDetails;
