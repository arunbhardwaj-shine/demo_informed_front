import { BaseApi } from "./BaseApi";
//Auth
const UserLogin = (email, password) =>
  BaseApi.post("login", { email: email, password: password });
const UserForgot = (email) => BaseApi.post("forgot-password", { email: email });
const UserForgotResetPasswordPost = (Token, new_pass, confirm_pass) =>
  BaseApi.post(
    "forgot-reset-password",
    { new_pass: new_pass, confirm_pass: confirm_pass },
    {
      headers: {
        reset_token: Token,
      },
    }
  );
const ResetPasswordPost = (old_pass, new_pass, confirm_pass) =>
  BaseApi.post(
    "reset-password",
    { old_pass: old_pass, new_pass: new_pass, confirm_pass: confirm_pass },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const UserLogout = () =>
  BaseApi.post(
    "/logout",
    {},
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
//Dropdown
const GetBuData = () =>
  BaseApi.get(
    "bu",
    {},
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const GetTimezoneData = () =>
  BaseApi.get(
    "timezone",
    {},
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const GetTimezoneregionData = () =>
  BaseApi.get(
    "timezone_region",
    {},
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const GetCountryData = () =>
  BaseApi.get(
    "country",
    {},
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
///......Sample File Download
const DownloadSampleFile = () =>
  BaseApi.get(
    `sample-download`,
    {},
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
//Event
const GetEventList = () =>
  BaseApi.get(
    "events",
    {},
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const GetEventListSerch = (data) =>
  BaseApi.get(
    "events",
    { search: data },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const GetEventListData = (id) =>
  BaseApi.get(
    `event/${id}`,
    {},
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const GetEventListDataUpdate = (id, EventTitle, a, Description) =>
  BaseApi.post(
    `event/${id}`,
    {
      event_id: id,
      title: EventTitle,
      speaker_data: a,
      description: Description,
    },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const CreatEvent = (
  EventTitle,
  a,
  event_start_time,
  eventendtime,
  Timezone,
  code,
  Bu,
  event_date,
  Description,
  Region,
  Country
) =>
  BaseApi.post(
    "event",
    {
      title: EventTitle,
      description: Description,
      event_start_time: event_start_time,
      event_end_time: eventendtime,
      location: Country,
      timezone: Timezone,
      code: code,
      type: Bu,
      country_timezone: Region,
      speaker_data: a,
      event_date: event_date,
    },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
//Rehearsal
const CreatRehearsal = (
  EventTitle,
  Timezone,
  event_start_time,
  eventendtime,
  event_date,
  type,
  Description,
  a
) =>
  BaseApi.post(
    "rehearsal",
    {
      code: 12,
      event_id: 1,
      company_id: 1,
      title: EventTitle,
      description: Description,
      type: type,
      date: event_date,
      start_time: event_start_time,
      end_time: eventendtime,
      timezone: Timezone,
      pdf_link: "htttps",
      invites_data: a,
    },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
//Template
const UserTemplateList = (id) =>
  BaseApi.get(
    `templates/${id}`,
    {},
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const UserTemplate = (id) =>
  BaseApi.get(
    `template/${id}`,
    {},
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const UserTemplateSandMail = (form) =>
  BaseApi.post("test", form, {
    headers: {
      Authorization: localStorage.getItem("Token"),
    },
  });
const CreateTemplate = (name, id) =>
  BaseApi.post(
    "template",
    { name: name, event_id: id },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const UpdateTemplate = (subject, id, html, i) =>
  BaseApi.post(
    "update-template",
    {
      subject: subject,
      json_description: id,
      description: html,
      template_id: i,
    },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
////Registration
const CreateRegistrationPage = (form) =>
  BaseApi.post("create-registration-page", form, {
    headers: {
      Authorization: localStorage.getItem("Token"),
      "Content-Type": "application/json",
    },
  });
const RegistrationPageList = (id) =>
  BaseApi.get(
    `registration-pages/${id}`,
    {},
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const RegistrationPageData = (id) =>
  BaseApi.get(
    `registration-page`,
    { form_id: id },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const UpdateRegistrationPageData = (form) =>
  BaseApi.post(`update-registration-page`, form, {
    headers: {
      Authorization: localStorage.getItem("Token"),
    },
  });
//Public
const PublicPage = (event_code, str_slug) =>
  BaseApi.get(`register/${event_code}/${str_slug}`);

//Readers
const ReadersData = (id) =>
  BaseApi.get(
    `participants`,
    { event_id: id },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const ReadersPage = (id, eventId) =>
  BaseApi.get(
    `participants?page=${id}`,
    { event_id: eventId },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const ReadersDataSearch = (id, name_email, type, country) =>
  BaseApi.get(
    `participants`,
    { event_id: id, name_email: name_email, type: type, country: country },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const ReadersType = (id, type, search, countryvalue) =>
  BaseApi.get(
    `participants`,
    { event_id: id, type: type, name_email: search, country: countryvalue },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const ReadersCountry = (id, name, type, search) =>
  BaseApi.get(
    `participants`,
    { event_id: id, country_id: name, type: type, name_email: search },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const ReadersBlock = (Participant_id, is_blocked) =>
  BaseApi.post(
    `block-unblock-participant`,
    { id: Participant_id, is_blocked: is_blocked },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const ReadersBlockt = (Participant_id, type) =>
  BaseApi.post(
    `participant`,
    { id: Participant_id, type: type },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const ReadersDelete = (id, is_deleted) =>
  BaseApi.post(
    `delete-restore-participant`,
    { id: id, is_deleted: is_deleted },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
////// Email Stats
const EmailStatss = (id, template_id, search_key) =>
  BaseApi.get(
    `email-stats/${id}`,
    { template_id: template_id, search_key: search_key },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const EmailSand = (id, name, email) =>
  BaseApi.post(
    `create-unregistered-participant`,
    { event_id: id, first_name: name, email: email },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const Excelsend = (form) =>
  BaseApi.post(`upload-unregistered-participant`, form, {
    headers: {
      Authorization: localStorage.getItem("Token"),
    },
  });
const EmailSandRegistered = (type, event_id) =>
  BaseApi.get(
    `participant-list`,
    { event_id: event_id, type: type },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const EmailSandRegisteredType = (type, event_id, user_type) =>
  BaseApi.get(
    `participant-list`,
    { event_id: event_id, type: type, user_type: user_type },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const sandAllmaik = (template_id, participants, registeredNonRegistered) =>
  BaseApi.post(
    `send-mail`,
    {
      template_id: template_id,
      participants: participants,
      type: registeredNonRegistered,
    },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const CreateParticipant = (name, country, browser, email, alice, stats) =>
  BaseApi.post(
    `create-participant`,
    {
      name: name,
      email: email,
      country_id: country,
      browser: browser,
      alice: alice,
      status: stats,
    },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const ParticipantPage = (id, eventId, registeredNonRegistered) =>
  BaseApi.get(
    `participant-list?page=${id}`,
    { event_id: eventId, type: registeredNonRegistered },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const ParticipantPageSearch = (
  id,
  eventId,
  registeredNonRegistered,
  user_type,
  search
) =>
  BaseApi.get(
    `participant-list?page=${id}`,
    {
      event_id: eventId,
      type: registeredNonRegistered,
      user_type: user_type,
      search,
    },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
//......SMTP......//
const PostSMTP = (
  smtp_host,
  smtp_port,
  smtp_from_name,
  smtp_email,
  smtp_password,
  encryption_type,
  tls
) =>
  BaseApi.post(
    `smtp`,
    {
      smtp_host: smtp_host,
      smtp_port: smtp_port,
      smtp_from_name: smtp_from_name,
      smtp_email: smtp_email,
      smtp_password: smtp_password,
      encryption_type: encryption_type,
      tls: tls,
    },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const UpdateSMTP = (
  smtp_host,
  smtp_port,
  smtp_from_name,
  smtp_email,
  smtp_password,
  encryption_type,
  tls
) =>
  BaseApi.post(
    `smtp-update`,
    {
      smtp_host: smtp_host,
      smtp_port: smtp_port,
      smtp_from_name: smtp_from_name,
      smtp_email: smtp_email,
      smtp_password: smtp_password,
      encryption_type: encryption_type,
      tls: tls,
    },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const getSMTP = () =>
<<<<<<< HEAD
  BaseApi.get(
    `smtp`,
    {},
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
=======
BaseApi.get(`smtp`,{},{ headers: {
  'Authorization':localStorage.getItem("Token"),
}});
///....chart....//
const getEmailStatsChart = (eventid,templateId) =>
BaseApi.get(`email-stats`,{event_id:eventid,template_id:templateId},{ headers: {
  'Authorization':localStorage.getItem("Token"),
}});
>>>>>>> dbd62a8103daa363e978a77fb0b0347e3d54fe70
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
  DownloadSampleFile,
  GetEventListSerch,
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
  ReadersType,
  ReadersCountry,
  ReadersDataSearch,
  ReadersPage,
  ReadersBlock,
  ReadersBlockt,
  ReadersDelete,
  EmailStatss,
  EmailSand,
  EmailSandRegistered,
  EmailSandRegisteredType,
  sandAllmaik,
  Excelsend,
  CreateParticipant,
  ParticipantPage,
  ParticipantPageSearch,
  PostSMTP,
  getSMTP,
  UpdateSMTP,
<<<<<<< HEAD
};
=======
  getEmailStatsChart
};
>>>>>>> dbd62a8103daa363e978a77fb0b0347e3d54fe70
