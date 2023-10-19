import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";

//Library routes
import LibraryContent from "./Components/Library/Content/LibraryContent";
import LibraryCreate from "./Components/Library/CreateChange/LibraryCreate";
import LibraryPopupSet from "./Components/Library/CreateChange/LibraryPopupSet";
import LibrarySublink from "./Components/Library/CreateChange/LibrarySublink";
import LibraryTopics from "./Components/Library/CreateChange/LibraryTopics";
import LibraryCampaign from "./Components/Library/LibraryCampaign";
import PreviewContent from "./Components/Library/CreateChange/PreviewContent";
import Spc from "./Components/Library/Spc";
import SpcCreate from "./Components/Library/SpcCreate";
import Products from "./Components/Library/Products";
import ChangePassword from "./Auth/ChangePassword";
import WebinarQuestion from "./Components/Firbase/WebinarQuestion";

//Firbase

import Event from "./Components/Firbase/Event";

//License routes
import LicenseContent from "./Components/License/Content/LicenseContent";
import LicenseEditListing from "./Components/License/Content/LicenseEditListing";
import LicenseCreate from "./Components/License/CreateChange/LicenseCreate";
import LicenseCreateUser from "./Components/License/CreateChange/LicenseCreateUser";
import LicenseSublink from "./Components/License/CreateChange/LicenseSublink";
import LicenseSetPopup from "./Components/License/CreateChange/SetPopup";
import LicenseTopics from "./Components/License/CreateChange/LicenseTopics";
import LicensePreviewContent from "./Components/License/CreateChange/LicensePreviewContent";
import LicenseContentDetail from "./Components/License/CreateChange/LicenseContentDetail";
import EditLicense from "./Components/License/CreateChange/EditLicense";

//Analytics routes
import AnalyticsHeader from "./Components/Analytics/Layout/Header";
import Totalhcp from "./Components/Analytics/TotalHCP/Totalhcp";
import TrendingContent from "./Components/Analytics/TrendingContent";
import CanadaTrendingContent from "./Components/Analytics/CanadaTrendingContent";
import AnalyticsSidebar from "./Components/Analytics/Layout/Sidebar";
import CisStats from "./Components/Analytics/CisStats";
import CanadaDeliveryRegistration from "./Components/Analytics/CanadaDeliveryRegistration";

import CanadaDeliveryTrends from "./Components/Analytics/CanadaDeliveryTrends";
import CanadaTrendingTopic from "./Components/Analytics/CanadaTrendingTopics";
import TopClients from "./Components/Analytics/TopClients";
import TopReseller from "./Components/Analytics/TopReseller";
import TopSales from "./Components/Analytics/TopSales";
import ContentAnalytics from "./Components/Analytics/ContentAnalytics";

// import OctaCountry from "./Components/Analytics/OctaCountry";
import OctalatchTotalHCP from "./Components/Analytics/OctalatchTotalHCP";
import CountryRegistration from "./Components/Analytics/CountryRegistration";
import OctaCountry from "./Components/Analytics/OctaCountry";
import TrendingTopics from "./Components/Analytics/TrendingTopics";
import OctalatchCountryStats from "./Components/Analytics/OctalatchCountryStats";
import OctaCountryRegistration from "./Components/Analytics/OctaCountryRegistration";
//Readers routes
import NewReaders from "./Components/Readers/ReadersView/ReadersList";
import ReadersLayout from "./Components/Readers/ReadersView/ReadersLayout";
import MarketingNewReaders from "./Components/Readers/ReadersView/MarketingReadersList";
import ReaderLayout from "./Components/Readers/ReaderEdit/ReaderEdit";
import ReaderAdd from "./Components/Readers/AddReader/AddReader";
import ReadersListAdd from "./Components/Readers/ReadersList/ReadersListAdd";
import ReaderReview from "./Components/Readers/ReaderReview/ReaderReview";
import TimelineDetail from "./Components/Readers/Timeline/TimelineDetail";
import MarketingTimeLineDetail from "./Components/Readers/Timeline/MarketingTimeLineDetail";
import TrialSite from "./Components/Readers/AddSite/TrialSite";
import AddSite from "./Components/Readers/AddSite/AddSite";
import EditSite from "./Components/Readers/AddSite/EditSite";
import SiteListing from "./Components/Readers/AddSite/SiteListing";
// ----------START-------Webinar routes------------------------
import WebinarHeader from "./Components/NewWebinar/Layout/Header";
import WebinarSidebar from "./Components/NewWebinar/Layout/Sidebar";
import DefaultWebinar from "./Components/NewWebinar/WebinarFiles/Webinar";
import ContactForm from "./Components/NewWebinar/WebinarFiles/ContactForm";
import EmailStatsss from "./Components/NewWebinar/WebinarFiles/EmailStatsss";

// Dashboard

// -------END----------Webinar routes------------------------

import DefaultLayout from "./Components/CommonComponent/DefaultLayout";
import LoginLayout from "./Components/CommonComponent/LoginLayout";
import Sidebar from "./Components/CommonComponent/SidebarComponent/Sidebar";
import Table from "./Components/Distributes/SmartListComponent/Table";
import ViewTable from "./Components/Distributes/SmartListComponent/ViewTable";
import SmartList from "./Components/Distributes/SmartListComponent/SmartList";
import EditList from "./Components/Distributes/SmartListComponent/EditList";
import CreateSmartList from "./Components/Distributes/SmartListComponent/CreateSmartList";
import SmartListFilter from "./Components/Distributes/SmartListComponent/SmartListFilter";
import FilterSegment from "./Components/Distributes/SmartListComponent/FilterSegment";
import VerifySmartList from "./Components/Distributes/SmartListComponent/VerifySmartList";
import ViewList from "./Components/Distributes/SmartListComponent/ViewList";
import EmailList from "./Components/Emails/EmailListing";
import TemplateBuilder from "./Components/Emails/TemplateBuilder";
import AutoEmail from "./Components/Emails/AutoEmail";
import EmailArticleSelect from "./Components/Emails/EmailArticleSelect";
import CreateEmail from "./Components/Emails/CreateEmail";
import VerifyHCP from "./Components/Emails/VerifyHCP";
import SelectHCP from "./Components/Emails/SelectHCP";
import VerifyMAIL from "./Components/Emails/VerifyMAIL";
import VerifyHcpMAIL from "./Components/Emails/VerifyHcpMAIL";
import SelectSmartList from "./Components/Emails/SelectSmartList";
import SelectSmartListUsers from "./Components/Emails/SelectSmartListUsers";
import UploadExcel from "./Components/Distributes/SmartListComponent/UploadExcel";
import EmailStatss from "./Components/Distributes/EmailStatss";
import GetDetails from "./Components/Distributes/GetDetails";
import StatsWebinar from "./Components/NewWebinar/WebinarFiles/StatsWebinar";
import AutoMail from "./Components/NewWebinar/WebinarFiles/AutoMail";
import EventCreate from "./Components/NewWebinar/WebinarFiles/EventCreate";
import SettingWebinar from "./Components/NewWebinar/WebinarFiles/SettingWebinar";
import LibraryCreateUser from "./Components/Library/CreateChange/LibraryCreateUser";
import AddLinkToPdf from "./Components/Library/CreateChange/AddLinkToPdf";
import CreateDocintelLink from "./Components/Library/CreateChange/CreateDocintelLink";
import SpcView from "./Components/Library/SpcView";
import CanadaContentType from "./Components/Analytics/CanadaContentType";
import SpcRender from "./Components/Library/SpcRender";
import SpcEdit from "./Components/Library/SpcEdit";
import SetPopup from "./Components/Library/CreateChange/SetPopup";
import EditConsentOptions from "./Components/Library/CreateChange/EditConsentOptions";
import ContentDetail from "./Components/Library/CreateChange/ContentDetail";
import EditLibrary from "./Components/Library/CreateChange/EditLibrary";
import LibraryEditListing from "./Components/Library/Content/LibraryEditListing";
import OpeningByCountry from "./Components/Analytics/OpeningByCountry";
import SalesByCountry from "./Components/Analytics/SalesByCountry";
import CampaignStats from "./Components/Analytics/CampaignStats";
import DeliveryTrends from "./Components/Analytics/DeliveryTrends";
import RegistrationType from "./Components/Analytics/RegistrationType";
import ContentGraph from "./Components/Analytics/ContentGraph";
import TrendingContentOcta from "./Components/Analytics/TrendingContentOcta";
import Informed from "./Components/Login/Informed";
import PublisherPage from "./Components/Library/PublisherPage";
import OctalatchDeliveryRegistration from "./Components/Analytics/OctalatchDeliveryRegistration";
import Webinar from "./Components/Login/Webinar";
import BouncedEmail from "./Components/Distributes/BouncedEmail";
import RDRegister from "./Components/R&D/RDRegister";
import RDAnalytics from "./Components/R&D/RDAnalytics";
import SetLayout from "./Components/CommonComponent/SetLayout";
import PreviewArticle from "./Components/Library/PreviewArticle";
import CommanPage from "./Components/Firbase/CommanPage";
import QuestionTrigger from "./Components/Firbase/QuestionTrigger";
import PollQuestion from "./Components/Firbase/PollQuestion";
import LicenseLinkToPdf from "./Components/License/CreateChange/LicenseLinkToPdf";
import MainLanding from "./Components/Library/MainLanding";
import PharmaMarketing from "./Components/Library/PharmaMarketing";
import PharmaRnd from "./Components/Library/PharmaRnd";
import LandingPublisher from "./Components/Library/LandingPublisher";
import MarketingAddReader from "./Components/Readers/AddReader/MarketingAddReader";
import MarketingEditReader from "./Components/Readers/ReaderEdit/MarketingEditReader";
import MarketingReaderReview from "./Components/Readers/ReaderReview/MarketingReaderReview";
import PageNotFound from "./Components/CommonComponent/PageNotFound";
import Feedback from "./Components/R&D/Feedback";
let platform = 0;
let show = 0;

if (
  window.location.pathname == "/new-webinar" ||
  window.location.pathname == "/contact-form" ||
  window.location.pathname == "/email-statsss" ||
  window.location.pathname == "/stats-webinar" ||
  window.location.pathname == "/event-create" ||
  window.location.pathname == "/setting-webinar"
) {
  require("./Components/assets/css/style.css");
  require("./Components/assets/fonts/fonts.css");
  platform = 0;
  show = 0;
} else if (
  window.location.pathname == "/webinar" ||
  window.location.pathname == "/rd-register" ||
  window.location.pathname == "LEX-210-Registration"
) {
  require("./Components/assets/css/webinar.css");
  require("./Components/assets/css/webinar-responsive.css");
  require("./Components/assets/css/aos.css");
  platform = 0;
  show = 0;
} else {
  require("./Components/assets/css/style.css?v=1.0");
  require("./Components/assets/css/responsive.css?v=1.0");
  require("./Components/assets/css/custom.css?v=1.0");
  require("./Components/assets/css/library.scss?v=1.0");
  require("./Components/assets/fonts/fonts.css?v=1.0");
  require("./Components/assets/css/video.css?v=1.0");
}

const Layout = () => {
  return (
    <>
      <CommanPage />
      <Outlet />
    </>
  );
};

const Routing = () => {
  return (
    <Router>
      <Routes>
        //DefaultLayout for Login pages
        <Route path="/" element={<DefaultLayout component={MainLanding} />} />
        <Route
          path="/informed"
          element={<DefaultLayout component={MainLanding} />}
        />
        <Route
          path="/publisher-page"
          element={<DefaultLayout component={PublisherPage} />}
        />
        <Route
          path="/main-landing"
          element={<DefaultLayout component={MainLanding} />}
        />
        <Route
          path="/landing-publisher"
          element={<DefaultLayout component={LandingPublisher} />}
        />
        <Route
          path="/pharma-marketing"
          element={<DefaultLayout component={PharmaMarketing} />}
        />
        <Route
          path="/pharma-rd"
          element={<DefaultLayout component={PharmaRnd} />}
        />
        <Route
          path="/webinar"
          element={<DefaultLayout component={Webinar} />}
        />
        <Route path="rd-register" element={<RDRegister />} />
        {/* <Route path="LEX-210-Registration" element={<RDRegister />} /> */}
        <Route
          path="/LEX-210-analytics"
          element={<LoginLayout component={RDAnalytics} />}
        />
        <Route
          path="/feedback"
          element={<LoginLayout component={Feedback} />}
        />
        //LoginLayout for pages after login
        <Route path="/home" element={<SetLayout component={SetLayout} />} />
        <Route path="/users" element={<SetLayout component={SetLayout} />} />
        <Route
          path="/library-content"
          element={<LoginLayout component={LibraryContent} />}
        />
        <Route exact path="/Webinar" element={<Layout />}>
          <Route exact path="poll-question" element={<PollQuestion />} />
          <Route exact path="question-list" element={<QuestionTrigger />} />
          <Route exact path="webinar-question" element={<WebinarQuestion />} />
        </Route>
        <Route
          path="/cis_stats"
          element={<LoginLayout component={CisStats} />}
        />
        <Route
          path="/totalhcp"
          element={<LoginLayout component={Totalhcp} />}
        />
        <Route
          path="/country-registration"
          element={<LoginLayout component={CountryRegistration} />}
        />
        <Route
          path="/octalatch-deliveryregistration"
          element={<LoginLayout component={OctalatchDeliveryRegistration} />}
        />
        <Route
          path="/octa-country"
          element={<LoginLayout component={OctaCountry} />}
        />
        <Route
          path="/octalach-country-stats"
          element={<LoginLayout component={OctalatchCountryStats} />}
        />
        <Route
          path="/trending-content"
          element={<LoginLayout component={TrendingContent} />}
        />
        <Route
          path="/octa-trending-content"
          element={<LoginLayout component={TrendingContentOcta} />}
        />
        <Route
          path="/top-clients"
          element={<LoginLayout component={TopClients} />}
        />
        <Route
          path="/analytic-content-type"
          element={<LoginLayout component={CanadaContentType} />}
        />
        <Route
          path="/change-password"
          element={<LoginLayout component={ChangePassword} />}
        />
        <Route
          path="/analytic-delivery-trends"
          element={<LoginLayout component={CanadaDeliveryTrends} />}
        />
        <Route
          path="/analytic-delivery-registration"
          element={<LoginLayout component={CanadaDeliveryRegistration} />}
        />
        <Route
          path="/analytic-trending-topics"
          element={<LoginLayout component={CanadaTrendingTopic} />}
        />
        <Route
          path="/analytic-trending-content"
          element={<LoginLayout component={CanadaTrendingContent} />}
        />
        <Route
          path="/octa-country-registration"
          element={<LoginLayout component={OctaCountryRegistration} />}
        />
        <Route
          path="/top-reseller"
          element={<LoginLayout component={TopReseller} />}
        />
        <Route
          path="/top-sales"
          element={<LoginLayout component={TopSales} />}
        />
        <Route
          path="/content-analytics"
          element={<LoginLayout component={ContentAnalytics} />}
        />
        <Route
          path="/trending-topics"
          element={<LoginLayout component={TrendingTopics} />}
        />
        <Route
          path="/content-type"
          element={<LoginLayout component={ContentGraph} />}
        />
        <Route
          path="/octalatch-totalhcp"
          element={<LoginLayout component={OctalatchTotalHCP} />}
        />
        <Route
          path="/openings-by-country"
          element={<LoginLayout component={OpeningByCountry} />}
        />
        <Route
          path="/campaign-stats"
          element={<LoginLayout component={CampaignStats} />}
        />
        <Route
          path="/delivery-stats"
          element={<LoginLayout component={DeliveryTrends} />}
        />
        <Route
          path="/registration-type"
          element={<LoginLayout component={RegistrationType} />}
        />
        <Route
          path="/content-analytics"
          element={<LoginLayout component={ContentAnalytics} />}
        />
        <Route
          path="/sales-by-country"
          element={<LoginLayout component={SalesByCountry} />}
        />
        {/* <Route
            path="/readers-view"
            element={
              localStorage.getItem('user_id') == '90VIqoM675WT4/peSRnbSQ==' ? (
                <LoginLayout component={MarketingNewReaders} />
              ) : (
                <LoginLayout component={NewReaders} />
              )
            }
        /> */}

<Route
            path="/readers-view"
            element={
              <LoginLayout component={ReadersLayout} />
            }
        />
     
          <Route
            path="/reader-edit"
            element={<LoginLayout component={ReaderLayout} />}
          />
        
     
          <Route
            path="/reader-add"
            element={<LoginLayout component={ReaderAdd} />}
          />
     

          <Route
            path="/reader-review"
            element={<LoginLayout component={ReaderReview} />}
          />
        
       
        <Route
          path="/readers-list"
          element={<LoginLayout component={ReadersListAdd} />}
        />
        <Route
            path="/timeline-detail"
            element={
              localStorage.getItem('user_id') == '90VIqoM675WT4/peSRnbSQ==' ? (
                <LoginLayout component={MarketingTimeLineDetail} />
              ) : (
                <LoginLayout component={TimelineDetail} />
              )
            }
        />
        {
          /*<Route
          path="/timeline-detail"
          element={<LoginLayout component={TimelineDetail} />}
        /> */
        }
        
        <Route
          path="/library-content"
          element={<LoginLayout component={LibraryContent} />}
        />
        <Route path="/event" element={<Event />} />
        <Route
          path="/library-edit"
          element={<LoginLayout component={EditLibrary} />}
        />
        <Route
          path="/library-create"
          element={<LoginLayout component={LibraryCreate} />}
        />
        <Route
          path="/library-popup"
          element={<LoginLayout component={LibraryPopupSet} />}
        />
        <Route path="/site" element={<LoginLayout component={TrialSite} />} />
        <Route path="/add-site" element={<LoginLayout component={AddSite} />} />
        <Route
          path="/edit-site"
          element={<LoginLayout component={EditSite} />}
        />
        <Route path="/article_preview" element={<PreviewArticle />} />
        <Route
          path="/site-listing"
          element={<LoginLayout component={SiteListing} />}
        />
        <Route
          path="/library-edit-listing"
          element={<LoginLayout component={LibraryEditListing} />}
        />
        <Route
          path="/library-create-user"
          element={<LoginLayout component={LibraryCreateUser} />}
        />
        <Route
          path="/library-add-link"
          element={<LoginLayout component={AddLinkToPdf} />}
        />
        <Route
          path="/edit-Consent-Options"
          element={<LoginLayout component={EditConsentOptions} />}
        />
        <Route
          path="/set-popup"
          element={<LoginLayout component={SetPopup} />}
        />
        <Route path="/spc-view" element={<LoginLayout component={SpcView} />} />
        <Route
          path="/spc-render"
          element={<LoginLayout component={SpcRender} />}
        />
        <Route
          path="/spc-delete"
          element={<LoginLayout component={SpcView} />}
        />
        <Route path="/spc-edit" element={<LoginLayout component={SpcEdit} />} />
        <Route
          path="/library-sublink"
          element={<LoginLayout component={LibrarySublink} />}
        />
        <Route
          path="/library-topics"
          element={<LoginLayout component={LibraryTopics} />}
        />
        <Route
          path="/library-campaign"
          element={<LoginLayout component={LibraryCampaign} />}
        />
        <Route
          path="/content-detail"
          element={<LoginLayout component={ContentDetail} />}
        />
        <Route
          path="/preview-content"
          element={<LoginLayout component={PreviewContent} />}
        />
        <Route
          path="/create-docintel-link"
          element={<LoginLayout component={CreateDocintelLink} />}
        />
        <Route path="/spc" element={<LoginLayout component={Spc} />} />
        <Route
          path="/spc-create"
          element={<LoginLayout component={SpcCreate} />}
        />
        {localStorage.getItem("user_id") ==
        "56Ek4feL/1A8mZgIKQWEqg==" ? null : (
          <Route
            path="/products"
            element={<LoginLayout component={Products} />}
          />
        )}
        <Route
          path="/new-webinar"
          element={<LoginLayout component={DefaultWebinar} />}
        />
        <Route
          path="/contact-form"
          element={<LoginLayout component={ContactForm} />}
        />
        <Route
          path="/email-statsss"
          element={<LoginLayout component={EmailStatsss} />}
        />
        <Route
          path="/stats-webinar"
          element={<LoginLayout component={StatsWebinar} />}
        />
        <Route
          path="/auto-mail"
          element={<LoginLayout component={AutoMail} />}
        />
        <Route
          path="/event-create"
          element={<LoginLayout component={EventCreate} />}
        />
        <Route
          path="/setting-webinar"
          element={<LoginLayout component={SettingWebinar} />}
        />
        <Route
          path="/SmartList"
          element={<LoginLayout component={SmartList} />}
        />
        <Route
          path="/EditList"
          element={<LoginLayout component={EditList} />}
        />
        <Route
          path="/CreateSmartList"
          element={<LoginLayout component={CreateSmartList} />}
        />
        <Route
          path="/SmartListFilter"
          element={<LoginLayout component={SmartListFilter} />}
        />
        <Route
          path="/SelectSmartList"
          element={<LoginLayout component={SelectSmartList} />}
        />
        <Route
          path="/EmailList"
          element={<LoginLayout component={EmailList} />}
        />
        <Route
          path="/TemplateBuilder"
          element={<LoginLayout component={TemplateBuilder} />}
        />
        <Route
          path="/AutoEmail"
          element={<LoginLayout component={AutoEmail} />}
        />
        <Route
          path="/EmailArticleSelect"
          element={<LoginLayout component={EmailArticleSelect} />}
        />
        <Route
          path="/CreateEmail"
          element={<LoginLayout component={CreateEmail} />}
        />
        <Route
          path="/FilterSegment"
          element={<LoginLayout component={FilterSegment} />}
        />
        <Route
          path="/SelectHCP"
          element={<LoginLayout component={SelectHCP} />}
        />
        <Route
          path="/VerifyHCP"
          element={<LoginLayout component={VerifyHCP} />}
        />
        <Route
          path="/VerifyMAIL"
          element={<LoginLayout component={VerifyMAIL} />}
        />
        <Route
          path="/VerifyHcpMAIL"
          element={<LoginLayout component={VerifyHcpMAIL} />}
        />
        <Route
          path="/SelectSmartListUsers"
          element={<LoginLayout component={SelectSmartListUsers} />}
        />
        <Route
          path="/VerifySmartList"
          element={<LoginLayout component={VerifySmartList} />}
        />
        <Route
          path="/ViewSmartList"
          element={<LoginLayout component={ViewList} />}
        />
        <Route
          path="/UploadExcel"
          element={<LoginLayout component={UploadExcel} />}
        />
        <Route
          path="/UpdatedTable"
          element={<LoginLayout component={Table} />}
        />
        <Route
          path="/ViewTable"
          element={<LoginLayout component={ViewTable} />}
        />
        <Route
          path="/EmailStatss"
          element={<LoginLayout component={EmailStatss} />}
        />
        <Route
          path="/bounced-email"
          element={<LoginLayout component={BouncedEmail} />}
        />
        <Route
          path="/get-details"
          element={<LoginLayout component={GetDetails} />}
        />
        <Route
          path="/license-content"
          element={<LoginLayout component={LicenseContent} />}
        />
        <Route
          path="/license-edit-listing"
          element={<LoginLayout component={LicenseEditListing} />}
        />
        <Route
          path="/license-create"
          element={<LoginLayout component={LicenseCreate} />}
        />
        <Route
          path="/license-create-user"
          element={<LoginLayout component={LicenseCreateUser} />}
        />
        <Route
          path="/license-add-link"
          element={<LoginLayout component={LicenseLinkToPdf} />}
        />
        <Route
          path="/license-sublink"
          element={<LoginLayout component={LicenseSublink} />}
        />
        <Route
          path="/license-set-popup"
          element={<LoginLayout component={LicenseSetPopup} />}
        />
        <Route
          path="/license-topics"
          element={<LoginLayout component={LicenseTopics} />}
        />
        <Route
          path="/license-preview-content"
          element={<LoginLayout component={LicensePreviewContent} />}
        />
        <Route
          path="/license-content-detail"
          element={<LoginLayout component={LicenseContentDetail} />}
        />
        <Route
          path="/license-edit"
          element={<LoginLayout component={EditLicense} />}
        />
        <Route path="*" element={<PageNotFound />} />

        <Route path="/main-landing" element={<DefaultLayout component={MainLanding} />}/>

        <Route path="/landing-publisher" element={<DefaultLayout component={LandingPublisher} />} />

        <Route path="/pharma-marketing" element={<DefaultLayout component={PharmaMarketing} />}/>
      </Routes>
    </Router>
  );
};

export default Routing;
