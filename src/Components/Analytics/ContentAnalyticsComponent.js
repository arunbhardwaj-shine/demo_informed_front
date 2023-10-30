import React, { useEffect, useState } from "react";
import { Col, Row, Image, ProgressBar } from "react-bootstrap";
import ContentAnalyticsComponentActivityGauge from "./ContentAnalyticsComponentActivityGauge";
import Highcharts, { color } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";
highchartsMore(Highcharts);
solidGauge(Highcharts);

export default function ContentAnalyticsComponent({ data, sublinkData }) {
  const [selectedData, setSelectedData] = useState();
  useEffect(() => {
    if (sublinkData) {
      setSelectedData(sublinkData);
    } else {
      setSelectedData(data);
    }
  }, [selectedData]);

  let client = "";
  if (data.country == "" && data.company == "" && data.product == "") {
    client = "NA";
  } else {
    let count = 0;
    if (data.company != "") {
      client += data.company;
      count++;
    }
    if (data.product != "") {
      if (count > 0) {
        client += " " + data.product;
        count++;
      } else {
        client = " " + data.product;
      }
    }
    if (data.country != "") {
      if (count > 0) {
        client += " " + data.country;
      } else {
        client = " " + data.country;
      }
    }
  }
  const created = new Date(data.created).getTime();
  const expire = new Date(data.exp_datetime).getTime();
  const current = Date.now();

  let pending_days, total_pending_days, get_precentage;
  if (expire > current) {
    const datediff = expire - current;
    const totaldatediff = expire - created;
    pending_days = Math.round(datediff / 86400000);
    total_pending_days = Math.round(totaldatediff / 86400000);
    get_precentage = Math.round(
      ((total_pending_days - pending_days) * 100) / total_pending_days
    );
  } else {
    pending_days = 0;
    get_precentage = 100;
  }

  let agreed_limit =
    selectedData?.limit != "" && selectedData?.limit != 0
      ? selectedData?.limit
      : 1000;

  if (selectedData) {
    const arr = ["Openings", "Unique Readers","Article Usage"];
    const colorarray = ["#57cabd", "#f4c64b","#00003C"];
    var categories_data = Object.keys(selectedData?.graph?.openig);
    var series_data = Object.entries(selectedData?.graph)?.map(
      ([name, values], index) => ({
        name: arr[index],
        data: Object.values(values),
        color: colorarray[index],
      })
    );
  }

  // Get the categories from the first series data
  let categories = Object.keys(data[Object.keys(data)[0]]);
  return (
    <>
      <div className="content_analytics">
        <Row>
          <Col sm={7}>
            <div className="detail-box left">
              <div className="media d-flex">
                <div className="media-left media-middle">
                  <Image src={data.coverImage} alt="Image not availble" fluid />
                </div>
                <div className="media-body">
                  <p>{data.title}</p>
                  <div className="media-subtitle">{data.pdf_sub_title}</div>
                  <div className="media-author">
                    {" "}
                    <span>{data.key_author ? data.key_author : "NA"}</span>
                  </div>
                  <div className="article-link">
                    <a href={data?.docintelLink}>{data.docintelLink}</a>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col sm={5}>
            <div className="detail-box reparkive">
              <p>
                Consent type :<span>{data.linkType}</span>
              </p>
              <p>
                Client :<span>{client}</span>
              </p>
              <p>
                Agreed Limit:{" "}
                <span>{data?.limit == 0 ? "Unlimited" : data?.limit}</span>
              </p>
            </div>
            <div className="detail-box right">
              <div className="detail-box-grid">
                <div className="reparkive">
                  <div className="reparkive-box">
                    <p>
                      Upload date:{" "}
                      <span>
                        {new Date(data.created).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </p>
                  </div>
                  <div className="reparkive-box second">
                    {pending_days === 0 ? (
                      <>
                        <span> Expired</span>
                        <div>
                          <ProgressBar>
                            <ProgressBar
                              style={{ background: "#d5182a" }}
                              now={get_precentage}
                              label={`${get_precentage}% Complete`}
                            />
                          </ProgressBar>
                        </div>
                      </>
                    ) : (
                      <>
                        <span>{pending_days}</span> days Left{" "}
                        <div>
                          <ProgressBar>
                            <ProgressBar
                              now={get_precentage}
                              label={`${get_precentage}% Complete`}
                            />
                          </ProgressBar>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="reparkive-box">
                    <p>
                      Exp Date :
                      <span>
                        {new Date(data.exp_datetime).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <div className="circle_graph d-flex">
            <ContentAnalyticsComponentActivityGauge
              label="Openings(total)"
              value={selectedData?.opening}
              color="#57cabd"
              limit={agreed_limit}
              pdf_id={data?.id}
            />
            <ContentAnalyticsComponentActivityGauge
              value={selectedData?.uniqueReader}
              color="#f4c64b"
              limit={agreed_limit}
              label={`Unique Reader (total) Agreed Limit | ${
                data?.limit == 0 ? "Unlimited" : data?.limit
              }`}
              pdf_id={data?.id}
            />

            {
              data?.lastRomanNumber == 2 || data?.lastRomanNumber == 3 ? 
              <ContentAnalyticsComponentActivityGauge
                value={selectedData?.pinReaders}
                color="#00003C"
                limit={agreed_limit}
                label=" Article Usage"
                pdf_id={data?.id}
              /> : null
            }

            <ContentAnalyticsComponentActivityGauge
              value={selectedData?.registerReader}
              color="#ed9ba0"
              limit={agreed_limit}
              label=" Registered Reader (total)"
              pdf_id={data?.id}
            />
            <ContentAnalyticsComponentActivityGauge
              value={selectedData?.rtr}
              color="#956ca7"
              limit={agreed_limit}
              label="User With RTR"
              pdf_id={data?.id}
            />
            <ContentAnalyticsComponentActivityGauge
              value={selectedData?.download}
              color="#2466c0"
              limit={agreed_limit}
              label="Downloads"
              pdf_id={data?.id}
            />
          </div>
        </Row>

        <Row>
          <div>
            <Row>
              <HighchartsReact
                highcharts={Highcharts}
                options={{
                  chart: {
                    type: "line",
                  },
                  credits: {
                    enabled: false,
                  },
                  yAxis: {
                    min: 0,
                    tickInterval: 1,
                    title: {
                      text: "",
                    },
                  },
                  xAxis: {
                    categories: categories_data,
                  },
                  title: {
                    text: "",
                  },
                  legend: {
                    reversed: true,
                    align: "center",
                    verticalAlign: "bottom",
                    layout: "horizontal",
                    x: 0,
                    y: 0,
                  },
                  plotOptions: {
                    series: {
                      dataLabels: {
                        allowOverlap: true,
                        enabled: true,
                        inside: false,
                        overflow: "justify",
                        crop: true,
                        shape: "callout",
                        backgroundColor: "rgba(255,255,255)",
                        borderColor: "rgba(0,0,0,0.9)",
                        color: "rgba(0,0,0)",
                        borderWidth: 0.5,
                        borderRadius: 5,
                        style: {
                          fontFamily: "Helvetica, sans-serif",
                          fontSize: "8px",
                          fontWeight: "normal",
                          textShadow: "none",
                        },
                        formatter: function () {
                          return (
                            "<div className=" +
                            this.series.name +
                            '><span style="font-weight: bold;">' +
                            this.x +
                            "</span><br/><strong>" +
                            this.series.name +
                            "</strong> <strong>" +
                            Highcharts.numberFormat(this.y, 0) +
                            "</strong></div>"
                          );
                        },
                      },
                    },
                  },
                  tooltip: {
                    enabled: false,
                  },
                  column: {
                    colorByPoint: true,
                  },
                  exporting: {
                    enabled: true,
                  },
                  series: series_data,
                }}
              />
            </Row>
          </div>
        </Row>
      </div>
    </>
  );
}
