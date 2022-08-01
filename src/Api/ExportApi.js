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
const GetTags = () =>
  BaseApi.get(
    "tags",
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
const DeleteEvent = (id) =>
  BaseApi.post(
    `delete-event`,
    { event_id: id },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const CreatEvent = (
  EventTitle,
  a,
  Timezone,
  Bu,
  dateData,
  Description,
  Region,
  Country,
  start_hour,
  end_hour,
  start_min,
  end_min,
  start_am_pm,
  end_am_pm
) =>
  BaseApi.post(
    "event",
    {
      title: EventTitle,
      speaker_data: a,
      timezone: Timezone,
      type: Bu,
      event_date: dateData,
      description: Description,
      country_timezone: Region,
      location: Country,
      start_hour: start_hour,
      end_hour: end_hour,
      start_min: start_min,
      end_min: end_min,
      start_am_pm: start_am_pm,
      end_am_pm: end_am_pm,
    },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
//Rehearsal
const CreatRehearsal = (rehearsalSpeakername) =>
  BaseApi.post(
    "rehearsal",
    {
      rehearsalSpeaker: rehearsalSpeakername,
    },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const RehearsalListData = (eventid) =>
  BaseApi.get(
    `rehearsal-list/${eventid}`,
    {},
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const RehearsalDelete = (eventid) =>
  BaseApi.post(
    `delete-rehearsal`,
    { rehearsal_id: eventid },
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
const DeleteTemplate = (id) =>
  BaseApi.post(
    "delete-template",
    { template_id: id },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const UpdateTemplate = (
  subject,
  templateName,
  eventid,
  id,
  html,
  i,
  tagClickedFirst,
  is_approved
) =>
  BaseApi.post(
    "update-template",
    {
      is_approved: is_approved,
      name: templateName,
      event_id: eventid,
      subject: subject,
      json_description: id,
      description: html,
      template_id: i,
      tags: tagClickedFirst,
    },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
////Registration
const CreateRegistrationPage = (eventId,mode,jsonData,TemplateIdActive) =>
  BaseApi.post("create-registration-page", {
    event_id:eventId,
    mode:mode,
    // json_data :jsonData,
    // format :TemplateIdActive
  }, {
    headers: {
      Authorization: localStorage.getItem("Token"),
      "Content-Type": "application/json",
    },
  });
const RegistrationPageUplodImage = (form) =>
  BaseApi.post("upload-image", form, {
    headers: {
      Authorization: localStorage.getItem("Token"),
      "Content-Type": "application/json",
    },
  });
const RegistrationPageCopyData = (id) =>
  BaseApi.post("/registration-pages-copy", {registration_page_id :id}, {
    headers: {
      Authorization: localStorage.getItem("Token"),
      "Content-Type": "application/json",
    },
  });
const RegistrationPageSingleData = (id) =>
  BaseApi.get(`/registration-page/${id}`, {}, {
    headers: {
      Authorization: localStorage.getItem("Token"),
      "Content-Type": "application/json",
    },
  });
const RegistrationPageUpdate = (registration_page_id,eventId,mode,jsonData,TemplateIdActive) =>
BaseApi.post("/update-registration-page", {
  registration_page_id:registration_page_id,
  event_id:eventId,
  mode:mode,
  json_data :jsonData,
  format :TemplateIdActive
}, {
    headers: {
      Authorization: localStorage.getItem("Token"),
      "Content-Type": "application/json",
    },
  });
const RegistrationPageDelete = (id) =>
  BaseApi.post("/delete-registration-page", {register_page_id:id}, {
    headers: {
      Authorization: localStorage.getItem("Token"),
      "Content-Type": "application/json",
    },
  });
const CreateRegistrationPagedetail = (form) =>
  BaseApi.post("create-registration-detail", form, {
    headers: {
      Authorization: localStorage.getItem("Token"),
      "Content-Type": "application/json",
    },
  });
const RegistrationPageDetailList = (id) =>
  BaseApi.get(
    `get-registration-detail-list/${id}`,
    {},
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
        "Content-Type": "application/json",
      },
    }
  );
const RegistrationPageDetail = (id) =>
  BaseApi.get(
    `get-registration-detail/${id}`,
    {},
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
        "Content-Type": "application/json",
      },
    }
  );
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
    `registration-page/${id}`,
    {},
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
const UpdateRegistrationPageDetail = (form) =>
  BaseApi.post(`update-registration-detail`, form, {
    headers: {
      Authorization: localStorage.getItem("Token"),
    },
  });
//Public
const PublicPage = (event_code, str_slug) =>
  BaseApi.get(`register/${event_code}/${str_slug}`);

//Readers
const ReadersData = (id) =>
  BaseApi.post(
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
  BaseApi.post(
    `participants`,
    { event_id: id, name_email: name_email, type: type, country_id: country },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const ReadersType = (id, type, search, countryvalue) =>
  BaseApi.post(
    `participants`,
    { event_id: id, type: type, name_email: search, country_id: countryvalue },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const ReadersSingleData = (id) =>
  BaseApi.get(
    `get-participant/${id}`,
    {},
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const ReadersSingleDataUpdate = (id,name,country_id,hospital,profession,interest) =>
  BaseApi.post(
    `/update-participant`,
    {participant_id :id,name,name,country_id:country_id,hospital:hospital,profession:profession,interest:interest},
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const ReadersType1 = (id, search, countryvalue) =>
  BaseApi.post(
    `participants`,
    { event_id: id, name_email: search, country_id: countryvalue },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const ReadersCountry = (id, name, type, search) =>
  BaseApi.post(
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
const EmailStatsPage = (id, eventId, template_id) =>
  BaseApi.get(
    `email-stats/${eventId}?page=${id}`,
    { template_id: template_id },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const EmailSand = (id, name) =>
  BaseApi.post(
    `/create-unregistered-participant`,
    { smart_list_id: id, participants: name },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const EmailSelectVerifyHCP = (participants, unregister_participants) =>
  BaseApi.post(
    `/smart-list/create`,
    { participants: participants, unregister_participants: unregister_participants,type:false },
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
const sandAllmaik = (collection_id) =>
  BaseApi.post(
    `send-mail`,
    {
      collection_id: collection_id,
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
const ParticipantPage = (id, eventId, registeredNonRegistered, search) =>
  BaseApi.get(
    `participant-list?page=${id}`,
    { event_id: eventId, type: registeredNonRegistered, search: search },
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
      search: search,
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
  BaseApi.get(
    `smtp`,
    {},
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );

const getSmartListData = () => {
  BaseApi.get(
    `smart-lists/lists`,
    {},
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
};

///....chart....//
const getEmailStatsChart = (eventid, templateId) =>
  BaseApi.get(
    `email-stats`,
    { event_id: eventid, template_id: templateId },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
///....CreateEmail.....\\\\
const EmailSCreate = (template_id, eventid, subject, tags, smart_list_id) =>
  BaseApi.post(
    `emails/create`,
    {
      template_id: template_id,
      smart_list_id: smart_list_id,
      event_id: eventid,
      subject: subject,
      tags: tags,
    },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const UpdateEmailSCreate = (id, collection_id) =>
  BaseApi.post(
    `emails/create`,
    { template_id: id, collection_id: collection_id },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const SearchEmailParticipant = (name, email) =>
  BaseApi.post(
    `email-participant`,
    { search_name: name, search_email: email },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const EmailSCreateCollection = (
  approved_status,
  smart_list_id,
  collection_id
) =>
  BaseApi.post(
    `emails/create`,
    {
      approved_status: approved_status,
      smart_list_id: smart_list_id,
      collection_id: collection_id,
    },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const EmailSCreateCollectionnext = (
  smart_list_id,
  collection_id,
  approved_status
) =>
  BaseApi.post(
    `emails/create`,
    {
      smart_list_id: smart_list_id,
      collection_id: collection_id,
      approved_status: approved_status,
    },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const GetEmailSCollection = (id) =>
  BaseApi.post(
    `emails/collections`,
    { event_id: id },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const SearchEmailSCollection = (eventId,tags_search, search) =>
  BaseApi.post(
    `emails/collections`,
    {event_id:eventId, tags_search: tags_search, search: search },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const getCollectionData = (id) =>
  BaseApi.get(
    `emails/collection/${id}`,
    {},
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const GetSmartListSingleRecord = (id) =>
  BaseApi.post(
    `smart-list/single-record`,
    { smart_list_id: id },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const GetSmartListFilterRecord = () =>
  BaseApi.get(
    `/smart-list/filter-content`,{},
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const UpdateSmartListData = (id, participants) =>
  BaseApi.post(
    `smart-list/update-participants`,
    { smart_list_id: id, participants: participants },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
const DeleteSmartListData = (id, participants) =>
  BaseApi.post(
    `smart-list/delete-participants`,
    { smart_list_id: id, participant_id: participants },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
  // SmartList\\
  //..........\\
  const SearchSmartList = (search) =>
  BaseApi.post(
    `smart-list/lists`,
    { search: search},
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
  const SearchSmartListFilter = (name=[],creator=[],created=[]) =>
  BaseApi.post(
    `smart-list/lists`,
    {name:name,creator:creator,created:created},
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
  const SmartListDelete = (id) =>
  BaseApi.post(
    `smart-list/delete`,
    { smart_list_id : id},
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
export default {
  UserLogin,
  UserForgot,
  UserForgotResetPasswordPost,
  ResetPasswordPost,
  UserLogout,
  GetBuData,
  GetTimezoneData,
  GetTimezoneregionData,
  GetTags,
  GetCountryData,
  GetEventList,
  DownloadSampleFile,
  GetEventListSerch,
  CreatEvent,
  GetEventListDataUpdate,
  GetEventListData,
  CreatRehearsal,
  RehearsalListData,
  RehearsalDelete,
  UserTemplateList,
  UserTemplate,
  UserTemplateSandMail,
  CreateTemplate,
  DeleteTemplate,
  UpdateTemplate,
  CreateRegistrationPage,
  RegistrationPageCopyData,
  RegistrationPageSingleData,
  RegistrationPageUpdate,
  RegistrationPageDelete,
  CreateRegistrationPagedetail,
  RegistrationPageUplodImage,
  RegistrationPageDetailList,
  RegistrationPageDetail,
  RegistrationPageList,
  RegistrationPageData,
  EmailSCreateCollectionnext,
  UpdateRegistrationPageData,
  PublicPage,
  ReadersData,
  ReadersType,
  ReadersSingleData,
  ReadersType1,
  ReadersSingleDataUpdate,
  ReadersCountry,
  ReadersDataSearch,
  ReadersPage,
  ReadersBlock,
  ReadersBlockt,
  ReadersDelete,
  EmailStatss,
  EmailStatsPage,
  EmailSand,
  EmailSelectVerifyHCP,
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
  getEmailStatsChart,
  getSmartListData,
  EmailSCreate,
  EmailSCreateCollection,
  SearchEmailParticipant,
  GetSmartListSingleRecord,
  GetSmartListFilterRecord,
  UpdateSmartListData,
  DeleteSmartListData,
  GetEmailSCollection,
  SearchEmailSCollection,
  getCollectionData,
  UpdateEmailSCreate,
  UpdateRegistrationPageDetail,
  DeleteEvent,
  SearchSmartList,
  SearchSmartListFilter,
  SmartListDelete
};
