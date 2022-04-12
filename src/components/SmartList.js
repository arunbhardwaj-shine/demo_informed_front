import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import EditList from "./EditList";

import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { getListId } from "../actions";

const SmartList = (props) => {
  const [smartListData, setSmartListData] = useState([]);
 

  useEffect(() => {
    console.log(props);
    const body = {
      user_id: 18207,
    };

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const getSmartListData = async () => {
      console.log(process.env.REACT_APP_API_KEY);
      await axios
        .post(`distributes/get_smart_list`, body)
        .then((res) => {
          console.log(res);
          setSmartListData(res.data.response.data);
          console.log(res.data.response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getSmartListData();
  }, []);

  const linkClicked = (data) => {
    props.getListId(data);
  };

  return (
    <div>
      <h1>Smart List</h1>

      <div class="row">
        {smartListData.map((data) => {
          // setListId(data.id);
          return (
            <div class="col-sm-3">
              <div class="card">
                <div class="card-body">
                  <h6 class="card-title">{data.name}</h6>
                  <hr />
                  <p class="card-text">Contact Type .</p>
                  <p class="card-text">Speciality .</p>
                  <p class="card-text">Readers {data.readers_count} .</p>
                  <p class="card-text">IBU .</p>
                  <p class="card-text">Product {data.product}.</p>
                  <p class="card-text">Country {data.country} .</p>
                  <p class="card-text">Registered .</p>
                  <Link
                    to={{
                      pathname: "/EditList",
                      search: "?listId=" + data.id,
                    }}
                    onClick={() => linkClicked(data.id)}
                  >
                    Edit list
                  </Link>
                  {}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return state;
};

export default connect(mapStateToProps, { getListId: getListId })(SmartList);
