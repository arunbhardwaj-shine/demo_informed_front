import React from 'react'
import MarketingReadersList from './MarketingReadersList'
import ReadersList from './ReadersList'

export default function ReadersLayout() {
  return (
    <>
        {localStorage.getItem('user_id') == '90VIqoM675WT4/peSRnbSQ==' ?<MarketingReadersList/>:<ReadersList/>}
    </>
  )
}
