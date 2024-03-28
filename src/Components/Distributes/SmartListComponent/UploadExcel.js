import Table from "./Table";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-activity";

const UploadExcel = (props) => {
  const location = useLocation();
  const { data } = location.state;
  const { smartListName } = location.state;
  const { creator } = location.state;
  const { ibu } = location?.state ? location?.state : "";
  const [listData, setlistData] = useState([]);
  const [isLoad, setisLoad] = useState(false);
  const [listCount, setlistCount] = useState(0);

  const sendDataToParent = (childData) => {
    //console.log("function to just pass the callback");
  }

  useEffect(() => {
    setlistCount(data?.length)
    const firstFiftyUsers = data.slice(0, 50);
    setlistData(firstFiftyUsers);
  }, []);

  const load_more = () => {
    setisLoad(true);
    setlistData(data);
    setTimeout(() => {
      setisLoad(false);
    },1000)
  }

  return (
    <>
    {
      <div className="col right-sidebar">
        <div className="custom-container">
          <div className="row">
            {
              listData?.length > 0 ? 
              <>
                <Table data={listData} smartListName={smartListName} 
                    upload_by_filter="0" 
                    creator={creator} 
                    sendDataToParent={sendDataToParent} 
                    ibu={ibu} 
                    listcount = {listCount} 
                />
                {
                  data > listData ?
                  <div className="load_more">
                    <button className="btn btn-primary btn-filled" onClick={load_more}>
                      Load All
                    </button>
                  </div>
                  : null
                }
              </>

              : null
            }

            {
              isLoad ? 
                <div
                  className="load_more"
                  style={{
                    margin: "0 auto",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <Spinner color="#53aff4" size={32} speed={1} animating={true} />
                </div>
              : null
            }
              

      </div>
      </div>
       </div>
    }

    </>
  );
};
export default UploadExcel;
