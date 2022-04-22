import { BaseApi } from "./BaseApi";
//Auth
const UserLogin = (email, password) =>
  BaseApi.post("login",{email:email, password:password});
const UserForgot = (email) =>
  BaseApi.post("forgot-password",{email:email});
const UserForgotResetPasswordPost = (Token,new_pass,confirm_pass) =>
  BaseApi.put("forgot-reset-password",{new_pass:new_pass,confirm_pass:confirm_pass},{ headers: {
    'reset_token':Token,
  }});
const ResetPasswordPost = (old_pass,new_pass,confirm_pass) =>
  BaseApi.post("reset-password",{old_pass:old_pass,new_pass:new_pass,confirm_pass:confirm_pass},{ headers: {
    'Authorization':localStorage.getItem("Token"),
  }});
const UserLogout = () =>
  BaseApi.post("/logout",{},{ headers: {
    'Authorization':localStorage.getItem("Token"),
  }});
        //Dropdown
  const GetBuData = () => 
  BaseApi.get("bu",{},{ headers: {
    'Authorization':localStorage.getItem("Token"),
}});
const GetTimezoneData = () => BaseApi.get("timezone",{},{ headers: {
  'Authorization':localStorage.getItem("Token"),
}});
const GetTimezoneregionData = () => BaseApi.get("timezoneregion",{},{ headers: {
  'Authorization':localStorage.getItem("Token"),
}});
const GetCountryData = () => BaseApi.get("country");
      //Event
const GetEventList = () => BaseApi.get("events",{},{ headers: {
  'Authorization':localStorage.getItem("Token"),
}});
const GetEventListData = (id) => BaseApi.get(`event/${id}`,{},{ headers: {
  'Authorization':localStorage.getItem("Token"),
}});
const GetEventListDataUpdate = (id,EventTitle,a,Description) => BaseApi.put(`event/${id}`,{event_id:id,title:EventTitle,
  speaker_data:a, description:Description },{ headers: {
  'Authorization':localStorage.getItem("Token"),
}});
const CreatEvent = (EventTitle,a,event_start_time,eventendtime,Timezone,Bu,event_date ,Description,Region) => 
BaseApi.post("event",{user_id:1,
  title:EventTitle,
  description:Description,
  event_start_time:event_start_time,
  event_end_time:eventendtime,
  location :"hisar",
  timezone:Timezone,
  code:"12",
  type:Bu ,
  country_timezone:Region,
  speaker_data:a,
  event_date:event_date });

     //Rehearsal
const CreatRehearsal = (EventTitle,Timezone,event_start_time,
  eventendtime,event_date,type,Description,a) => 
BaseApi.post("create-rehearsal",{
  code:12,
  event_id :1,
  company_id :1,
  title :EventTitle,
  description :Description,
  type :type,
  date:event_date,
  start_time :event_start_time,
  end_time :eventendtime,
  timezone :Timezone,
  pdf_link :"htttps",
  invites_data:a,
   },{ headers: {
    'Authorization':localStorage.getItem("Token"),
  }});
export default {
  UserLogin,
  UserForgot,
  UserForgotResetPasswordPost,
  ResetPasswordPost,
  UserLogout,
  GetBuData,
  GetTimezoneData,
  GetTimezoneregionData,
  GetCountryData,
  GetEventList,
  CreatEvent,
  GetEventListDataUpdate,
  GetEventListData,
  CreatRehearsal
};