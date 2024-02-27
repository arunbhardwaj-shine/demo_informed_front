import React, { useEffect, useState } from 'react'
import { ENDPOINT } from '../../../../../axios/apiConfig'
import { postData } from '../../../../../axios/apiHelper'
import LivePollsQuestion from './LivePollsQuestions'
import { useSidebar } from '../../../../CommonComponent/LoginLayout'
import { loader } from '../../../../../loader'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const LivePolls = ({ location, flag ,setSelectedTab}) => {
    const navigate = useNavigate();

    const {eventIdContext,handleEventId}=useSidebar()
    const localStorageEvent=JSON.parse(localStorage.getItem("EventIdContext"))
    const [eventId, setEvent] = useState({
        id: location?.state?.event_id ? location?.state?.event_id :eventIdContext?eventIdContext?.eventId:localStorageEvent?.eventId,
        companyId: location?.state?.companyId ? location?.state?.companyId :eventIdContext?eventIdContext?.companyId:localStorageEvent?.companyId,
    });
    const [data, setData] = useState()
    const [isdataLoaded,setIsDataLoaded]=useState(false)
    const [isFirstLoaded,setIsFirstLoaded]=useState(true)

    useEffect(() => {
        loader("show");
        getEventQuestion()
    }, [flag])

    const getEventQuestion = async () => {
        try {
            // setIsDataLoaded(true);
            const result = await postData(ENDPOINT.WEBINAR_All_QUESTION_LISTING, {
                companyId: eventId?.companyId,
                eventId: eventId?.id,
            });
            if(result?.data?.data.length === 0 ){
                if(!isFirstLoaded){
                    toast.error(`Please create the polls first`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                }else{
                    setIsFirstLoaded(false)
                }
                setSelectedTab("polls-creation")
            }
            setData(result?.data?.data)
            loader("hide");
        } catch (err) {
            loader("hide");
            // setIsDataLoaded(false);
            console.log("--err", err)
        }
    }

    return (<>
{data?
        <LivePollsQuestion questionData={data} eventData={eventId} isdataLoaded={isdataLoaded} getQuestions={getEventQuestion}/>
        :""} 
    </>)
}
export default LivePolls