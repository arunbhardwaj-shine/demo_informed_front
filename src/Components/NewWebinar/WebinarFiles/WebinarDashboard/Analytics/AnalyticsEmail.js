import React from 'react'
import { Table } from 'react-bootstrap'

const AnalyticsEmail = () => {
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  return (
    <>
      <div className='rd-analytics-box'>
        <p class="rd-box-small-title">Emails</p>
        <div className='rd-analytics-box-layout'>
          <div className="rd-analytics-top align-items-center d-flex justify-content-between">
            <h6 className="mr-auto">
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
                    <th>Send</th>
                    <th>Opened</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Lorem ipsum dolor sit amet consectetr. Libero a sit lectus blandit. Orci facilisi vitae leo odio viverra quam  blandit. Orci facilisi vitae<br /><span>March 5.2023 | 05:15 pm</span></td>
                    <td>Invitation</td>
                    <td>Internal</td>
                    <td className='email-options'><img src={path_image + "mail-sent.svg"} alt="" /><br /><span>140</span></td>
                    <td className='email-options'><img src={path_image + "email-open.svg"} alt="" /><br /><span>70 (50%)</span></td>
                  </tr>
                  <tr>
                    <td>Lorem ipsum dolor sit amet consectetr. Libero a sit lectus blandit. Orci facilisi vitae leo odio viverra quam  blandit. Orci facilisi vitae<br /><span>March 5.2023 | 05:15 pm</span></td>
                    <td>Invitation</td>
                    <td>Internal</td>
                    <td className='email-options'><img src={path_image + "mail-sent.svg"} alt="" /><br /><span>140</span></td>
                    <td className='email-options'><img src={path_image + "email-open.svg"} alt="" /><br /><span>70 (50%)</span></td>
                  </tr>
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