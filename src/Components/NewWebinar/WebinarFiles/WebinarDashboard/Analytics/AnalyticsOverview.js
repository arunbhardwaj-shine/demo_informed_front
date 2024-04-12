import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap';
import { postData } from '../../../../../axios/apiHelper';
import { loader } from '../../../../../loader';
import { ENDPOINT } from '../../../../../axios/apiConfig';
import { useSidebar } from '../../../../CommonComponent/LoginLayout';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
const AnalyticsOverview = () => {
    const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    const { eventIdContext, handleEventId } = useSidebar();
      const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"));
      const [eventId, setEventId] = useState(eventIdContext?.eventId || localStorageEvent?.eventId);
      const [overviewData, setOverviewData] = useState([]);
      useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                loader("show");
                const body = { eventId };
                const response = await postData(ENDPOINT.GET_OVERVIEW_DATA, body);
                const result = response?.data?.data;
                setOverviewData(result);
  
                loader("hide");
            } catch (error) {
                loader("hide");
                console.error('Error fetching analytics data:', error);
            }
        };
  
        fetchAnalyticsData();
    }, [eventId]);
  return (
   <>
        <div className='rd-analytics-box'>
            <p class="rd-box-small-title">Overview</p>
              <div className='rd-analytics-box-layout'>
                  <div className="rd-analytics-top align-items-center d-flex">
                      <h6 className="mr-auto">
                          Overview
                      </h6>
                  </div>
                  <div className='graph-box'>
                        <div className='highchart-chart'>
                            <img src={path_image + "overview-analytics.png"} alt="" />
                        </div>
                        <div className="rd-box-export">
                            <img
                                src={path_image + "arrow-export.svg"}
                                alt=""
                                //   onClick={() => {
                                //       individualCompletionfn();
                                //   }}
                            />
                        </div>
                  </div>
              </div>
        </div>
   </>
  )
}

export default AnalyticsOverview