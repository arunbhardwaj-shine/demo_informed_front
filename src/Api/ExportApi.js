import { BaseApi } from "./BaseApi";
const UserLogin = (email, password) =>
  BaseApi.post("login",{email:email, password:password});
  const GetBuData = () => BaseApi.get("bu");
const GetTimezoneData = () => BaseApi.get("timezone");
const GetTimezoneregionData = () => BaseApi.get("timezoneregion");
const GetCountryData = () => BaseApi.get("country");
const CreatEvent = (EventTitle,Speakername,event_start_time,eventendtime,Timezone,Bu,event_date ,Description,Region) => 
BaseApi.post("create-event",{user_id:1,
  title:EventTitle,
  description:Description,
  event_start_time:event_start_time,
  event_end_time:eventendtime,
  location :"hisar",
  timezone:Timezone,
  code:"12",
  type:Bu ,
  country_timezone:Region,
  speaker_data:Speakername,
  event_date:event_date });
export default {
  UserLogin,
  GetBuData,
  GetTimezoneData,
  GetTimezoneregionData,
  GetCountryData,
  CreatEvent
};