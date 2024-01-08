import React, { useEffect, useState } from 'react'
import { ENDPOINT } from '../../../../../axios/apiConfig'
import { postData } from '../../../../../axios/apiHelper'
import LivePollsQuestion from './LivePollsQuestions'
import { useSidebar } from '../../../../CommonComponent/LoginLayout'


const LivePolls = ({ location }) => {
    const {eventIdContext,handleEventId}=useSidebar()
    const localStorageEvent=JSON.parse(localStorage.getItem("EventIdContext"))
    const [eventId, setEvent] = useState({
        id: location?.state?.event_id ? location?.state?.event_id :eventIdContext?eventIdContext?.eventId:localStorageEvent?.eventId,
        companyId: location?.state?.companyId ? location?.state?.companyId :eventIdContext?eventIdContext?.companyId:localStorageEvent?.companyId,
    });
    const [data, setData] = useState()
    const [isdataLoaded,setIsDataLoaded]=useState(false)

    useEffect(() => {
        getEventQuestion()
    }, [])

    const getEventQuestion = async () => {
        try {
            setIsDataLoaded(true);
            const result = await postData(ENDPOINT.WEBINAR_All_QUESTION_LISTING, {
                companyId: eventId?.companyId,
                eventId: eventId?.id,
            });
            setData(result)
        } catch (err) {
            setIsDataLoaded(false);
            console.log("--err", err)
        } finally {
            setIsDataLoaded(false);
        }
    }

    return (<>

        <LivePollsQuestion questionData={data} eventData={eventId} isdataLoaded={isdataLoaded} getQuestions={getEventQuestion}/>

    </>)
}
export default LivePolls