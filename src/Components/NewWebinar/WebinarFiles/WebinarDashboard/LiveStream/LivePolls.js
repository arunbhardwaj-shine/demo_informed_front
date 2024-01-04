import React, { useEffect, useState } from 'react'
import { Col, Tabs, Tab } from 'react-bootstrap'
import { loader } from '../../../../../loader'
import { ENDPOINT } from '../../../../../axios/apiConfig'
import { postData } from '../../../../../axios/apiHelper'
import LivePollsQuestion from './LivePollsQuestions'

const LivePolls = ({ location ,eventIdContext}) => {
    const [eventId, setEvent] = useState({
        id: location?.state?.event_id ? location?.state?.event_id :eventIdContext?eventIdContext?.eventId:"",
        companyId: location?.state?.companyId ? location?.state?.companyId :eventIdContext?eventIdContext?.companyId:"",
    });
    const [data, setData] = useState()
    const [isdataLoaded,setIsDataLoaded]=useState(false)

    useEffect(() => {
        console.log("Live polls-->",eventIdContext)
        getEventQuestion()
    }, [])

    const getEventQuestion = async () => {
        try {
            loader("show")
            const result = await postData(ENDPOINT.WEBINAR_All_QUESTION_LISTING, {
                companyId: eventId?.companyId,
                eventId: eventId?.id,
            });
            setData(result)
        } catch (err) {
            console.log("--err", err)
        } finally {
            setIsDataLoaded(true)
            loader("hide")
        }
    }

    return (<>

        <LivePollsQuestion questionData={data} eventId={eventId?.id} isdataLoaded={isdataLoaded}/>

    </>)
}
export default LivePolls