import React from 'react'
import MarketingTimeLineDetail from '../Timeline/MarketingTimeLineDetail';
import TimelineDetail from '../Timeline/TimelineDetail';
export default function ReadersTimeLineLayout() {
  return (
    <>
        {localStorage.getItem('user_id') == '90VIqoM675WT4/peSRnbSQ==' ?<MarketingTimeLineDetail/>:<TimelineDetail/>}
    </>
  )
}