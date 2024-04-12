import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useSidebar } from '../../../../CommonComponent/LoginLayout';
import { loader } from '../../../../../loader';
import { postData } from '../../../../../axios/apiHelper';
import { ENDPOINT } from '../../../../../axios/apiConfig';

const AnalyticsEmail = () => {
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const { eventIdContext, handleEventId } = useSidebar();
    const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"));
    const [eventId, setEventId] = useState(eventIdContext?.eventId || localStorageEvent?.eventId);
    const [emailData, setEmailData] = useState([]);
    useEffect(() => {
      const fetchAnalyticsData = async () => {
          try {
              loader("show");
              const body = { eventId };
              const response = await postData(ENDPOINT.GET_EMAIL_DATA, body);
              const result = response?.data?.data;
              setEmailData(result);

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
        <p class="rd-box-small-title">Emails</p>
        <div className='rd-analytics-box-layout'>
          <div className="rd-analytics-top align-items-center d-flex justify-content-between">
            <h6 className="mr-auto" style={{ color:'#8A4E9C'}}>
              Emails
            </h6>
            <div className="d-flex">
              <img src={path_image + "email-analytics.svg"} alt="CRM" className="CRM" />
            </div>
          </div>
          <div className='graph-box'>
            <div className='graph-data'>
              <Table className="fold-table" id="individual_completion">
                <thead className='sticky-header'>
                  <tr>
                    <th>Subject</th>
                    <th>Type</th>
                    <th>List</th>
                    <th className='email-options'>Send</th>
                    <th className='email-options'>Opened</th>
                  </tr>
                </thead>
                <tbody>
        {emailData.map(data => (
            <tr key={data.id}>
                <td valign='middle'>{data.subject}</td>
                <td valign='middle'>Invitation</td>
                <td valign='middle'>Internal</td>
                <td valign='middle' className='email-options'>
                    <div className='td-bordered'>
                        <img src={`${path_image}mail-sent.svg`} alt="" />
                        <span>{data.email_sent}</span>
                    </div>
                </td>
                <td valign='middle' className='email-options'>
                    <div className='td-bordered'>
                        <img src={`${path_image}email-open.svg`} alt="" />
                        <span>{data.email_read} ({data.read_percentage})</span>
                    </div>
                </td>
            </tr>
        ))}
    </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default AnalyticsEmail