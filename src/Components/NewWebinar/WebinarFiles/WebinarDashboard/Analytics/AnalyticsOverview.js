import React from 'react'

const AnalyticsOverview = () => {
    const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
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