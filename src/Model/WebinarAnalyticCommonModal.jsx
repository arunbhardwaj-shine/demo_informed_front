import React, { useEffect,useState } from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import  exportData from"highcharts/modules/export-data";
// exporting(Highcharts);
// exportData(Highcharts);

const WebinarAnalyticCommonModal=({data,id,options})=>{
  // const colorArray = [
  //   "#0E9B8E",
  //   "#00003C",
  //   "#FFBE2C",
  //   "#FFBE2C",
  //   "#F58289",
  //   "#D61975",
  //   "#0066BE",
  // ];
  const colorArray = [
    "#349b8e",
    "#4184cc",
    "#ed8188",
    "#0E9B8E",
    "#00003C",
    "#FFBE2C",
    "#FFBE2C",
    "#F58289",
    "#D61975",
    "#0066BE",
  ];
    useEffect(()=>{
    },[])

    return(<>          
            {typeof data !== "undefined" && (
        <div className="modal-body-view" id="mail-view">
                <div className="mail-box-wrap" id="chart-description">
                <div className="mail-box-content">
                  <div className="mail-box-heading-block">
                   
                    <div className="clear-search top-right-action">
                     
                     
                    </div>
                  </div>
                  <div className="mailbox-table">
                    <table>
                      <tbody>
                        <tr>
                          <th>Campaign</th>
                          <td>{data?.campaign ? data?.campaign : data?.subject}</td>
                        </tr>
                        <tr>
                          <th>List</th>
                          <td>{data?.smart_list_name 
                                        ? data?.smart_list_name?.includes("_internal_hcps_temporary") 
                                        ?"All HCPs"
                                         :data?.smart_list_name?.includes("_no_registered_users_temporary")
                                        ?"Non registered HCPs"
                                        :data?.smart_list_name?.includes("_registered_users_temporary") 
                                        ?"Registered HCPs"
                                       
                                        :data?.smart_list_name?.includes("_uslist_temporary")
                                        ?"US list"
                                        :data?.smart_list_name
                                        : "N/A"}</td>
                        </tr>
                       
                      </tbody>
                    </table>
                  </div>
                  <div className="mail-time">
                    <span>{data?.created_at}</span>
                  </div>
                 

                </div>
                <div className="chart-description">
                  <div className="mail-stats">
                    <ul className={data?.multi_ctr?.length > 0 ? "mail-stats-ul" : ""}>
                      <li
                        // onClick={() => {
                        //   getReaderData("sent", "", "Email sent");
                        // }}
                      >
                        <div className="mail_send">
                          <h6>Emails sent</h6>
                          <div className="mail-stats-list">
                            <svg
                              width="40"
                              height="40"
                              viewBox="0 0 40 40"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="20"
                                cy="20"
                                r="18.5"
                                stroke="#986CA5"
                                stroke-width="3"
                                stroke-linejoin="round"
                              />
                              <g clipPath="url(#clip0_698_88)">
                                <path
                                  d="M21.905 10.0557C21.5703 10.1568 21.264 10.3392 21.0106 10.5926L11.933 19.6701C11.6745 19.9286 11.4958 20.2371 11.3965 20.5645L20.1535 18.8131L21.905 10.0557Z"
                                  fill="#986CA5"
                                />
                                <path
                                  d="M29.3698 15.9047L24.0578 10.5925C23.7892 10.3241 23.4613 10.136 23.1032 10.0391L21.2259 19.426C21.1795 19.6579 20.9982 19.8393 20.7663 19.8857L11.3793 21.7632C11.4745 22.1129 11.6586 22.4434 11.9328 22.7176L12.3995 23.1842L10.1715 25.4121C9.9428 25.641 9.9428 26.012 10.1717 26.2408C10.2861 26.3551 10.436 26.4124 10.586 26.4124C10.736 26.4124 10.8858 26.3551 11.0002 26.2408L13.2282 24.0129L14.1745 24.9593L10.1715 28.9623C9.9428 29.191 9.9428 29.5621 10.1717 29.7908C10.2861 29.9052 10.436 29.9625 10.586 29.9625C10.736 29.9625 10.8858 29.9052 11.0002 29.7908L15.0032 25.7878L15.9496 26.7343L13.7218 28.9623C13.4929 29.191 13.4929 29.5621 13.7218 29.7908C13.8361 29.9052 13.9861 29.9625 14.1361 29.9625C14.2861 29.9625 14.4359 29.9052 14.5503 29.7908L16.7783 27.563L17.2449 28.0296C17.6508 28.4354 18.1919 28.6589 18.7686 28.6589C19.3454 28.6589 19.8866 28.4354 20.2924 28.0296L29.3698 18.9522C30.2101 18.1119 30.2101 16.7448 29.3698 15.9047Z"
                                  fill="#986CA5"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_698_88">
                                  <rect
                                    width="20"
                                    height="20"
                                    fill="white"
                                    transform="translate(10 10)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                            <span>{data?.email_sent}</span>
                          </div>
                        </div>
                      </li>
                      <li
                        // onClick={() => {
                        //   getReaderData("open", "", "Email open");
                        // }}
                      >
                        <div className="mail_open">
                          <h6>Emails opened</h6>
                          <div className="mail-stats-list">
                            <svg
                              width="40"
                              height="40"
                              viewBox="0 0 40 40"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="20"
                                cy="20"
                                r="18.5"
                                stroke="#FAC755"
                                stroke-width="3"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M20 21.7875L11.3125 17.1063C11.4295 16.6343 11.7283 16.2277 12.1437 15.975L19.7062 11.95C19.7963 11.9008 19.8973 11.875 20 11.875C20.1027 11.875 20.2037 11.9008 20.2937 11.95L27.825 15.9563C28.0375 16.0817 28.2231 16.2478 28.3711 16.4452C28.5191 16.6425 28.6266 16.8672 28.6875 17.1063L20 21.7875Z"
                                fill="#FAC755"
                              />
                              <path
                                d="M17.25 21.7251L11.25 25.9251V18.4939L17.25 21.7251Z"
                                fill="#FAC755"
                              />
                              <path
                                d="M21.5189 22.3875L28.4626 27.25C28.2924 27.517 28.0579 27.7371 27.7805 27.89C27.5031 28.0429 27.1918 28.1237 26.8751 28.125H13.1251C12.8084 28.1237 12.4971 28.0429 12.2197 27.89C11.9423 27.7371 11.7078 27.517 11.5376 27.25L18.4814 22.3875L19.7064 23.05C19.7965 23.099 19.8975 23.1247 20.0001 23.1247C20.1027 23.1247 20.2037 23.099 20.2939 23.05L21.5189 22.3875Z"
                                fill="#FAC755"
                              />
                              <path
                                d="M28.75 18.4939V25.9251L22.75 21.7251L28.75 18.4939Z"
                                fill="#FAC755"
                              />
                            </svg>

                            <span>{(data?.read_precent && data?.read_precent != "0.00%")
                              ? data?.read_precent
                              : '0%'}
                            </span>
                          </div>
                        </div>
                      </li>

                      {Object.keys(data?.labels_value)?.length > 0 ? 
                        Object.keys(data?.labels_value)?.map((item, index) => (<>
                        <li
                          // onClick={() => {
                          //   getReaderData("ctr", item, data?.labels[item]);
                          // }}
                        >
                          <div className="mail_click">
                            <div className="mail_click_box">
                              <h6 style={{ color: colorArray[index] }}>{data?.labels[item]}</h6>
                              <div className="mail_click_box_content">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                   <circle cx="20" cy="20" r="18.5" stroke={`${colorArray[index]}`} stroke-width="3" stroke-linejoin="round" />
                                    <path d="M14.955 16.6329C14.8178 16.1684 14.6861 15.703 14.5871 15.2572C13.9363 14.8722 13.4936 14.1715 13.4936 13.3617C13.4936 12.1434 14.4842 11.1535 15.7017 11.1535C16.9192 11.1535 17.9098 12.1442 17.9098 13.3617C17.9098 13.5292 17.8872 13.6906 17.8521 13.8472C18.0633 14.3125 18.234 14.8363 18.3837 15.3687C18.8046 14.8075 19.0633 14.1177 19.0633 13.3617C19.0633 11.5043 17.5591 10 15.7017 10C13.8443 10 12.3408 11.5043 12.3408 13.3617C12.3408 14.961 13.4593 16.2931 14.955 16.6329Z" fill={`${colorArray[index]}`} />
                                     <path d="M12.6329 24.5915C13.4615 23.696 14.3913 24.0467 15.6361 24.2361C16.7054 24.4006 17.7584 24.1005 17.6883 23.5229C17.5776 22.5884 17.4217 22.1706 17.0671 20.9602C16.7842 19.9976 16.2471 18.2626 15.7584 16.604C15.1037 14.385 14.9143 13.3546 15.7857 13.0974C16.7249 12.8238 17.2635 14.1582 17.7514 16.0085C18.3071 18.1145 18.5994 19.0444 18.7631 18.9953C19.0515 18.9127 18.6571 18.0116 19.4116 17.7895C20.3547 17.5152 20.5371 18.2525 20.8013 18.1784C21.0655 18.0989 20.9759 17.3523 21.728 17.1325C22.4841 16.9142 22.8637 17.8448 23.1754 17.7521C23.4841 17.6609 23.4771 17.325 23.9432 17.1917C24.41 17.053 26.1668 17.8394 27.1723 21.2743C28.4342 25.5931 27.0125 26.3959 27.4435 27.8581L21.8107 30C21.3547 28.9033 19.9424 28.8222 18.693 28.1231C17.4342 27.4146 16.5792 26.0342 13.2986 26.1013C12.0647 26.1262 12.1232 25.1426 12.6329 24.5915Z" fill={`${colorArray[index]}`} /> 
                                     </svg>
                                <span>{((data?.labels_value[item] / data?.email_read) * 100)==100
                                ?100 + "%"
                              :((data?.labels_value[item] / data?.email_read) * 100)==0
                              ?0
                              :((data?.labels_value[item] / data?.email_read) * 100)?.toFixed(2)+"%"

                              }</span>
                              </div>
                            </div>
                          </div>
                        </li>
                      </>))
                        : 
                          <li
                          //  onClick={() => {
                          //   getReaderData("ctr", "", "default");
                          // }}
                          >
                            <div className="mail_click">
                              <div className="mail_click_box">
                                <h6>Link clicked (CTR 1)</h6>
                                <div className="mail_click_box_content">
                                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" > <circle cx="20" cy="20" r="18.5" stroke="#39CABC" stroke-width="3" stroke-linejoin="round" /> <path d="M14.955 16.6329C14.8178 16.1684 14.6861 15.703 14.5871 15.2572C13.9363 14.8722 13.4936 14.1715 13.4936 13.3617C13.4936 12.1434 14.4842 11.1535 15.7017 11.1535C16.9192 11.1535 17.9098 12.1442 17.9098 13.3617C17.9098 13.5292 17.8872 13.6906 17.8521 13.8472C18.0633 14.3125 18.234 14.8363 18.3837 15.3687C18.8046 14.8075 19.0633 14.1177 19.0633 13.3617C19.0633 11.5043 17.5591 10 15.7017 10C13.8443 10 12.3408 11.5043 12.3408 13.3617C12.3408 14.961 13.4593 16.2931 14.955 16.6329Z" fill="#39CABC" /> <path d="M12.6329 24.5915C13.4615 23.696 14.3913 24.0467 15.6361 24.2361C16.7054 24.4006 17.7584 24.1005 17.6883 23.5229C17.5776 22.5884 17.4217 22.1706 17.0671 20.9602C16.7842 19.9976 16.2471 18.2626 15.7584 16.604C15.1037 14.385 14.9143 13.3546 15.7857 13.0974C16.7249 12.8238 17.2635 14.1582 17.7514 16.0085C18.3071 18.1145 18.5994 19.0444 18.7631 18.9953C19.0515 18.9127 18.6571 18.0116 19.4116 17.7895C20.3547 17.5152 20.5371 18.2525 20.8013 18.1784C21.0655 18.0989 20.9759 17.3523 21.728 17.1325C22.4841 16.9142 22.8637 17.8448 23.1754 17.7521C23.4841 17.6609 23.4771 17.325 23.9432 17.1917C24.41 17.053 26.1668 17.8394 27.1723 21.2743C28.4342 25.5931 27.0125 26.3959 27.4435 27.8581L21.8107 30C21.3547 28.9033 19.9424 28.8222 18.693 28.1231C17.4342 27.4146 16.5792 26.0342 13.2986 26.1013C12.0647 26.1262 12.1232 25.1426 12.6329 24.5915Z" fill="#39CABC" /> </svg>
                                  <span>0%</span>
                                </div>
                              </div>
                            </div>
                          </li>
                        
                        }
                    </ul>
                  </div>
                  <div className="chart-description-view">
                    <HighchartsReact
                      // key={campaignId?.auto_id}
                      key={id}
                      highcharts={Highcharts}
                      options={options}
                    />
                  </div>
                </div>
                </div>
                
              </div>
            )}
          
    </>)

}
export default WebinarAnalyticCommonModal