import React, { useEffect, useState } from 'react'
import { Col, Tabs, Tab } from 'react-bootstrap'
import { loader } from '../../../../../loader'
import { ENDPOINT } from '../../../../../axios/apiConfig'
import { postData } from '../../../../../axios/apiHelper'
import LivePollsQuestion from './LivePollsQuestions'

const LivePolls = ({ location }) => {
    const [eventId, setEvent] = useState({
        id: location?.state?.event_id ? location?.state?.event_id : "",
        companyId: location?.state?.companyId ? location?.state?.companyId : "",
    });
    const [data, setData] = useState()

    useEffect(() => {
        getEventQuestion()
    }, [])

    const getEventQuestion = async () => {
        try {
            loader("show")
            const result = await postData(ENDPOINT.WEBINAR_QUESTION_LISTING, {
                companyId: eventId?.companyId,
                eventId: eventId?.id,
            });
            setData(result)
        } catch (err) {
            console.log("--err", err)
        } finally {
            loader("hide")
        }
    }

    return (<>

        <LivePollsQuestion questionData={data} eventId={eventId?.id} />

    </>)
}
export default LivePolls