import React, { useEffect, useRef, useState } from "react";
import { getData, postData } from "../../axios/apiInstanceHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import { loader } from "../../loader";
import {
    OverlayTrigger,
    Tooltip,
  } from "react-bootstrap";

const PopularContent=({mostPopularContentFn,setMostPopularContentData})=>{
    const [mostPopularContentDataChild,setMostPopularContentDataChild]=useState([])
    const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

    useEffect(()=>{
        getMostPopularData()
    },[])

    const tooltip = (
        <Tooltip id="tooltip">
          This chart shows the sites that have users who viewed the 1top content
        </Tooltip>
      );
    

    const getMostPopularData = async () => {
        try {
          const result = await postData(ENDPOINT.MOST_POPULAR_CONTENT);
          const data = result?.data?.data;
          setMostPopularContentData(data.pdf_data);
          setMostPopularContentDataChild(data.pdf_data)
        } catch (err) {
          loader("hide");
          console.log("--err", err);
        }
      };

      return(<>
         <div className="rd-analytics-box rd-content">
                    <p className="rd-box-small-title">Content</p>
                    <div className="rd-analytics-box-layout">
                      <div className="rd-analytics-top d-flex justify-content-between align-items-center">
                        <h5>Most Popular content</h5>
                        <div className="d-flex">
                          <div className="count-number">
                            {mostPopularContentDataChild &&
                            mostPopularContentDataChild.length > 0
                              ? mostPopularContentDataChild
                                  .map((item) => item?.watched_count)
                                  .reduce(
                                    (total, count) => total + (count || 0),
                                    0
                                  )
                              : 0}
                          </div>
                          <img src={path_image + "content-view.svg"} alt="" />
                        </div>
                      </div>
                      <div className="graph-box">
                        <div className="graph-box-inside">
                          <p>
                            
                            Sites who Read | Watch The Top Content
                          </p>
                          <span>Click on the graph to see more details</span>
                        </div>
                        <div className="popular-tooltip">
                          <OverlayTrigger placement="left" overlay={tooltip}>
                            <img src={path_image + "tooltip-img.svg"} alt="" />
                          </OverlayTrigger>
                        </div>
                        <img
                          className="pie-chart"
                          src={path_image + "pie-chart2.png"}
                          alt=""
                        />
                        <div className="">
                          <p>The Top 3 content</p>
                        </div>
                        <div className="lex-article">
                          {mostPopularContentDataChild
                            ?.slice(0, 3)
                            ?.map((item, index) => (
                              <div
                                key={index}
                                className="d-flex lex-article-box"
                              >
                                <div className="lex-image">
                                  <div className="article-number">
                                    {index + 1}
                                  </div>
                                  <img src={item?.article_image} alt="" />
                                </div>
                                <div className="lex-detail">
                                  <p>{item.pdf.title}</p>
                                  <span>{item?.pdf?.pdf_sub_title}</span>
                                  <div className="d-flex justify-content-between">
                                    <div className="pages-number">
                                      {item?.total_pages ||
                                      item?.total_pages == 0
                                        ? "Pages:"
                                        : "Time:"}
                                      <span>
                                        {item?.total_pages ||
                                        item?.total_pages == 0
                                          ? item.total_pages
                                          : item?.max_time}
                                      </span>
                                    </div>
                                    <div className="pages-viewer">
                                      {item.watched_count}{" "}
                                      <img
                                        src={path_image + "viewer.svg"}
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                       
                      </div>
                      <div className="rd-box-export">
                        <img
                          src={path_image + "arrow-export.svg"}
                          alt=""
                          onClick={() => {
                            
                            mostPopularContentFn();
                          }}
                        />
                      </div>
                    </div>
                  </div>
      
      </>)

}
export default PopularContent