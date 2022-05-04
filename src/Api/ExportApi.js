import { BaseApi } from "./BaseApi";
//Auth
const UserLogin = (email, password) =>
  BaseApi.post("login",{email:email, password:password});
const UserForgot = (email) =>
  BaseApi.post("forgot-password",{email:email});
const UserForgotResetPasswordPost = (Token,new_pass,confirm_pass) =>
  BaseApi.post("forgot-reset-password",{new_pass:new_pass,confirm_pass:confirm_pass},{ headers: {
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
const GetEventListDataUpdate = (id,EventTitle,a,Description) => BaseApi.post(`event/${id}`,{event_id:id,title:EventTitle,
  speaker_data:a, description:Description },{ headers: {
  'Authorization':localStorage.getItem("Token"),
}});
const CreatEvent = (EventTitle,a,event_start_time,eventendtime,Timezone,Bu,event_date ,Description,Region) => 
BaseApi.post("event",{
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
  event_date:event_date },{ headers: {
    'Authorization':localStorage.getItem("Token"),
  }});

     //Rehearsal
const CreatRehearsal = (EventTitle,Timezone,event_start_time,
  eventendtime,event_date,type,Description,a) => 
BaseApi.post("rehearsal",{
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
  //Template
  const UserTemplateList = (id) =>
  BaseApi.get(`templates/${id}`,{},{ headers: {
    'Authorization':localStorage.getItem("Token"),
  }});
  const UserTemplate = (id) =>
  BaseApi.get(`template/${id}`,{},{ headers: {
    'Authorization':localStorage.getItem("Token"),
  }});
  const UserTemplateSandMail = (form) =>
  BaseApi.post("test",form,{ headers: {
    'Authorization':localStorage.getItem("Token"),
  }});
  const CreateTemplate = (name,id,) =>
  BaseApi.post("template",{name:name,event_id:id},{ headers: {
    'Authorization':localStorage.getItem("Token"),
  }});
  const UpdateTemplate = (subject ,id, i) =>
  BaseApi.post("update-template",{subject :subject ,description :id,template_id :i},{ headers: {
    'Authorization':localStorage.getItem("Token"),
  }});
  ////Registration
  const CreateRegistrationPage = (form) =>
  BaseApi.post("create-registration-page",form,{ headers: {
    'Authorization':localStorage.getItem("Token"),'Content-Type': 'application/json'
  }});
  const RegistrationPageList = (id) =>
  BaseApi.get(`registration-pages/${id}`,{},{ headers: {
    'Authorization':localStorage.getItem("Token"),
  }});
  const RegistrationPageData = (id) =>
  BaseApi.get(`registration-page`,{form_id:id},{ headers: {
    'Authorization':localStorage.getItem("Token"),
  }});
  const UpdateRegistrationPageData = (form) =>
  BaseApi.post(`update-registration-page`,form,{ headers: {
    'Authorization':localStorage.getItem("Token"),
  }});
//Public 
const PublicPage = (event_code,str_slug) =>BaseApi.get(`register/${event_code}/${str_slug}`);

//Readers
const ReadersData = (id,type,Country,name_email) =>
BaseApi.get(`participants`,{event_id:id,type:type,Country:Country,name_email:name_email},{ headers: {
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
  CreatRehearsal,
  UserTemplateList,
  UserTemplate,
  UserTemplateSandMail,
  CreateTemplate,
  UpdateTemplate,
  CreateRegistrationPage,
  RegistrationPageList,
  RegistrationPageData,
  UpdateRegistrationPageData,
  PublicPage,
  ReadersData,
};