import axios from "axios";
import Table from "./Table";
import { Link, Navigate, useNavigate } from "react-router-dom";
import VerifySmartList from "./VerifySmartList";
import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import { loader } from "../../../loader";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { popup_alert } from "../../../popup_alert";
import { Spinner } from "react-activity";

const FilterSegment = (props) => {
  const tableCompRef = useRef();
  const Navigate = useNavigate();
  const [filters, setFilters] = useState(props.filters);
  const [listname, setListName] = useState(props.listname);
  const [selectedcountry, setSelectedCountry] = useState([]);
  const [selectedmarketingcontacttype, setSelectedMarketingContactType] =
    useState([]);
  const [selectedcompany, setSelectedCompany] = useState([]);
  const [selectedprovince, setSelectedProvince] = useState([]);
  const [selectedterritory, setSelectedTerritory] = useState([]);
  const [selectedcontacttype, setSelectedContactType] = useState([]);
  const [selectedspeciality, setSelectedSpeciality] = useState([]);
  const [selectedinvestigatorType, setSelectedinvestigatorType] = useState([]);
  const [selectedSubRole, setSelectedSubRole] = useState([]);
  const [selectedBlindType, setSelectedBlindType] = useState([]);
  const [selectedsitenumber, setSelectedsitenumber] = useState([]);
  const [siteNumber, setSiteNumber] = useState([]);
  const [selectedsitename, setSelectedsitename] = useState([]);
  const [siteName, setSiteName] = useState([]);
  const [selectedreaderselection, setSelectedReaderSelection] = useState("");
  const [selectedibu, setSelectedIbu] = useState();
  const [selectedproduct, setSelectedProduct] = useState([]);
  const [selectedarticles, setSelectedArticles] = useState([]);
  const [selectedcampaign, setSelectedCampaign] = useState([]);
  const [selectedconsent, setConsent] = useState([]);
  const [selectedregister, setSelectedRegister] = useState("no");
  const [selectedArticleCompleted, setSelectedArticleCompleted] = useState("");
  const [selectedbounce, setSelectedBounce] = useState();
  const [selectedContentRead, setSelectedContentRead] = useState();
  const [selectedIrt, setSelectedIrt] = useState("");
  const [selectedReadOpen, setSelectedReadOpen] = useState("");
  const [selectedTrialRegister, setSelectedTrialRegister] = useState("");
  const [showhidearticle, setShowHideArticle] = useState(0);
  const [getfilterdata, setFilterData] = useState();
  const [apifilterflag, setApiFilterFlag] = useState(0);
  const [getpayload, setPayload] = useState(0);
  const [updateflag, setUpdateFlag] = useState([]);
  const [getNewAddedUser, setNewAddedUser] = useState([]);
  const [confirmationPopupStatus, setConfirmationPopupStatus] = useState(false);
  const [getfilterapplied, setfilterapplied] = useState(0);
  const [getStorageState, setStorageState] = useState(false);
  const [loadMoreFlag, setLoadMoreFlag] = useState(false);
  const [loadMorePage, setloadMorePage] = useState(true);
  const [totalLostCount, setTotalLostCount] = useState(props?.listcount);
  const [dataFromComp, setDataFromComp] = useState(props?.action);
  const [userId,setUserId] = useState("56Ek4feL/1A8mZgIKQWEqg==")
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

  useEffect(() => {
    var x = localStorage.getItem("sd_i");
    if (x) {
      setStorageState(true);
    } else {
      setStorageState(false);
    }

    if (props.hasOwnProperty("selectedFilter")) {
      //Country
      if (typeof props.selectedFilter.country !== "undefined") {
        setSelectedCountry(props.selectedFilter.country);
      }

      //Marketing contact type
      if (typeof props.selectedFilter.marketing_contact_type !== "undefined") {
        setSelectedMarketingContactType(
          props.selectedFilter.marketing_contact_type
        );
      }

      //Company
      if (typeof props.selectedFilter.company !== "undefined") {
        setSelectedCompany(props.selectedFilter.company);
      }

      //provience
      if (typeof props.selectedFilter.province !== "undefined") {
        setSelectedProvince(props.selectedFilter.province);
      }

      //provience
      if (typeof props.selectedFilter.territory !== "undefined") {
        setSelectedTerritory(props.selectedFilter.territory);
      }

      //Consent
      if (typeof props.selectedFilter.Consent !== "undefined") {
        let consent = props.selectedFilter.Consent.map((item) => {
          let val = filters.consent_type[item];
          return val;
        });
        setConsent(consent);
      }

      //Contact Type
      if (typeof props.selectedFilter.contactTypeList !== "undefined") {
        let contactTypeList = props.selectedFilter.contactTypeList.map(
          (item) => {
            let val = filters.contact_type[item];
            return val;
          }
        );
        setSelectedContactType(contactTypeList);
      }

      //Reader Selection
      if (typeof props.selectedFilter.reader_selection !== "undefined") {
        setSelectedReaderSelection(props.selectedFilter.reader_selection);
      }

      //IBu
      if (typeof props.selectedFilter.ibu !== "undefined") {
        setSelectedIbu(props.selectedFilter.ibu);
      }

      //Speciality
      if (typeof props.selectedFilter.speciality !== "undefined") {
        selectedspeciality(props.selectedFilter.speciality);
      }

      //investigator_type
      if (typeof props.selectedFilter.investigator_type !== "undefined") {
        setSelectedinvestigatorType(props.selectedFilter.investigator_type);
      }

      if (typeof props?.selectedFilter?.irt !== "undefined") {
        if (props.selectedFilter.irt == 2) {
          setSelectedIrt("Training");
        } else if (props.selectedFilter.irt == 1) {
          setSelectedIrt("yes");
        } else if (props.selectedFilter.irt == 0) {
          setSelectedIrt("no");
        }
      }

      if (typeof props?.selectedFilter?.trial_register !== "undefined") {
        if (props.selectedFilter.trial_register == 1) {
          setSelectedTrialRegister("yes");
        } else if (props.selectedFilter.trial_register == 0) {
          setSelectedTrialRegister("no");
        }
      }

      if (typeof props?.selectedFilter?.sub_role !== "undefined") {
        setSelectedSubRole(props.selectedFilter.sub_role);
      }

      if (typeof props?.selectedFilter?.blind_type !== "undefined") {
        setSelectedBlindType(props.selectedFilter.blind_type);
      }

      //site_number
      if (typeof props.selectedFilter.site_number !== "undefined") {
        setSelectedsitenumber(props.selectedFilter.site_number);
      }

      //site_number
      if (typeof props.selectedFilter.site_name !== "undefined") {
        setSelectedsitename(props.selectedFilter.site_name);
      }

      //product
      if (typeof props.selectedFilter.product !== "undefined") {
        setSelectedProduct(props.selectedFilter.product);
      }

      //Register Unregister
      if (typeof props.selectedFilter.registered_users !== "undefined") {
        let register_val =
          props.selectedFilter.registered_users == 1 ? "yes" :
          props.selectedFilter.registered_users == 2 ? "all" :
           "no";
        setShowHideArticle(props.selectedFilter.registered_users);
        setSelectedRegister(register_val);
      }

      //Bounce Unbounce
      if (typeof props.selectedFilter.bounce !== "undefined") {
        let bounce = props.selectedFilter.bounce == 1 ? "yes" : "no";
        setSelectedBounce(bounce);
      }

      if (typeof props.selectedFilter.selectedContentRead !== "undefined") {
        let selectedContent =
          props.selectedFilter.selectedContentRead == 1 ? "yes" : "no";
        setSelectedContentRead(selectedContent);
      }

      // console.log(props.selectedFilter);

      //  if (typeof props.selectedFilter.irt !== "undefined") {
      //    let bounce = props.selectedFilter.bounce == 1 ? "yes" : "no";
      //    setSelectedBounce(bounce);
      //  }

      //Articles
      if (typeof props.selectedFilter.registered_on_article !== "undefined") {
        let article = props.selectedFilter.registered_on_article.map((item) => {
          let val = filters.articles[item];
          return val;
        });
        setSelectedArticles(article);
      }

      //Campaign
      if (typeof props.selectedFilter.campaign_listing !== "undefined") {
        setSelectedCampaign(props.selectedFilter.campaign_listing);
      }

      if (typeof props.selectedFilter.campaing_status !== "undefined") {
        setSelectedReadOpen(props.selectedFilter.campaing_status);
      }

      //Display table In case of update
      if (typeof props.data !== "undefined") {
        setFilterData(props.data);
        setApiFilterFlag(1);
      }

      let up = updateflag + 1;
      setUpdateFlag(up);
    }
  }, []);

  const handleOnCountryChange = (country, setcountryflag = 0) => {
    let newCountry = selectedcountry;

    if (country == "All") {
      let all_index = newCountry?.indexOf(country);

      if (all_index !== -1) {
        setSelectedCountry([]);
      } else {
        newCountry?.push(country);
        Object.keys(filters?.country)?.map((item, index) => {
          newCountry?.push(item);
        });
        setSelectedCountry(newCountry);
      }
    } else {
      let country_index = newCountry?.indexOf(country);

      if (country_index !== -1) {
        newCountry?.splice(country_index, 1);
        let all_index = newCountry?.indexOf("All");
        if (all_index !== -1) {
          newCountry?.splice(all_index, 1);
        }
        setSelectedCountry(newCountry);
      } else {
        newCountry?.push(country);
        let all_item_index = Object.keys(filters?.country)?.every((item) =>
          newCountry?.includes(item)
        );

        if (all_item_index == true) {
          newCountry?.push("All");
        }
        setSelectedCountry(newCountry);
      }
    }

    //-------Old Code------//

    // let country_index = selectedcountry?.indexOf(country);
    // if (country_index !== -1) {
    //   selectedcountry.splice(country_index, 1);
    //   setSelectedCountry(selectedcountry);
    //   let up = updateflag + 1;
    //   setUpdateFlag(up);
    // } else {
    //   selectedcountry.push(country);
    //   setSelectedCountry(selectedcountry);
    //   let up = updateflag + 1;
    //   setUpdateFlag(up);
    // }

    //---------below work to select Site Number && Site Name------//

    if (setcountryflag == 0) {
      let arr = selectedcountry.map((item, index) => {
        if (item == "B&H") {
          item = "Bosnia and Herzegovina";
        }
        return item;
      });

      if ("site_country_data" in filters) {
        let getSiteCountryData = filters?.site_country_data;
        let site_number_value = Object.keys(getSiteCountryData)?.filter((key) =>
          arr?.includes(getSiteCountryData[key])
        );
        if ("site_data" in filters) {
          let getSiteData = filters?.site_data;
          let site_name_value = site_number_value?.map(
            (item, index) => getSiteData[item]
          );
          if (country == "All") {
            site_name_value?.unshift("All");
          }
          setSiteName(site_name_value);
        }
        if (country == "All") {
          site_number_value?.unshift("All");
        }
        setSiteNumber(site_number_value);
      }
    }
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleOnMarketingContatctTypeChange = (marketing_contact_type) => {
    let marketing_index = selectedmarketingcontacttype.indexOf(
      marketing_contact_type
    );
    if (marketing_index !== -1) {
      selectedmarketingcontacttype.splice(marketing_index, 1);
      setSelectedMarketingContactType(selectedmarketingcontacttype);
      let up = updateflag + 1;
      setUpdateFlag(up);
    } else {
      selectedmarketingcontacttype.push(marketing_contact_type);
      setSelectedMarketingContactType(selectedmarketingcontacttype);
      let up = updateflag + 1;
      setUpdateFlag(up);
    }
  };

  const handleOnCompanyChange = (company) => {
    let company_index = selectedcompany.indexOf(company);
    if (company_index !== -1) {
      selectedcompany.splice(company_index, 1);
      setSelectedCompany(selectedcompany);
      let up = updateflag + 1;
      setUpdateFlag(up);
    } else {
      selectedcompany.push(company);
      setSelectedCompany(selectedcompany);
      let up = updateflag + 1;
      setUpdateFlag(up);
    }
  };

  const handleOnTerritoryChange = (territory) => {
    let territory_index = selectedterritory.indexOf(territory);
    if (territory_index !== -1) {
      selectedterritory.splice(territory_index, 1);
      setSelectedTerritory(selectedterritory);
      let up = updateflag + 1;
      setUpdateFlag(up);
    } else {
      selectedterritory.push(territory);
      setSelectedTerritory(selectedterritory);
      let up = updateflag + 1;
      setUpdateFlag(up);
    }
  };

  const handleOnProvinceChange = (province) => {
    let province_index = selectedprovince.indexOf(province);
    if (province_index !== -1) {
      selectedprovince.splice(province_index, 1);
      setSelectedProvince(selectedprovince);
      let up = updateflag + 1;
      setUpdateFlag(up);
    } else {
      selectedprovince.push(province);
      setSelectedProvince(selectedprovince);
      let up = updateflag + 1;
      setUpdateFlag(up);
    }
  };

  const closeClicked = () => {
    Navigate("/SmartList");
  };

  const handleOnContactTypeChange = (contact_type) => {
    let contact_index = selectedcontacttype.indexOf(contact_type);
    if (contact_index !== -1) {
      selectedcontacttype.splice(contact_index, 1);
    } else {
      selectedcontacttype[0] = contact_type;
      // selectedcontacttype.push(contact_type);
    }
    setSelectedContactType(selectedcontacttype);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleOnSpecialityChange = (speciality) => {
    if (speciality == "All") {
      let all_index = selectedspeciality.indexOf(speciality);

      if (all_index !== -1) {
        setSelectedSpeciality([]);
      } else {
        selectedspeciality.push(speciality);
        Object.keys(filters?.speciality)?.map((item, index) => {
          selectedspeciality.push(item);
        });
        setSelectedSpeciality(selectedspeciality);
      }
    } else {
      let speciality_index = selectedspeciality.indexOf(speciality);

      if (speciality_index !== -1) {
        selectedspeciality.splice(speciality_index, 1);
        let all_index = selectedspeciality.indexOf("All");
        if (all_index !== -1) {
          selectedspeciality.splice(all_index, 1);
        }
        setSelectedSpeciality(selectedspeciality);
      } else {
        selectedspeciality.push(speciality);
        let all_item_index = Object.keys(filters?.speciality)?.every((item) =>
          selectedspeciality?.includes(item)
        );

        if (all_item_index == true) {
          selectedspeciality.push("All");
        }
        setSelectedSpeciality(selectedspeciality);
      }
    }
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleOnInvestigatorChange = (investigator) => {
    if (investigator == "All") {
      let all_index = selectedinvestigatorType?.indexOf(investigator);

      if (all_index !== -1) {
        setSelectedinvestigatorType([]);
      } else {
        selectedinvestigatorType?.push(investigator);
        Object.keys(filters?.investigator_type)?.map((item, index) => {
          selectedinvestigatorType?.push(item);
        });
        setSelectedinvestigatorType(selectedinvestigatorType);
      }
    } else {
      let investigator_index = selectedinvestigatorType?.indexOf(investigator);

      if (investigator_index !== -1) {
        selectedinvestigatorType?.splice(investigator_index, 1);
        let all_index = selectedinvestigatorType?.indexOf("All");
        if (all_index !== -1) {
          selectedinvestigatorType?.splice(all_index, 1);
        }
        setSelectedinvestigatorType(selectedinvestigatorType);
      } else {
        selectedinvestigatorType?.push(investigator);

        let all_item_index = Object.keys(filters?.investigator_type)?.every(
          (item) => selectedinvestigatorType.includes(item)
        );

        if (all_item_index == true) {
          selectedinvestigatorType?.push("All");
        }
        setSelectedinvestigatorType(selectedinvestigatorType);
      }
    }

    //--------Old Code-----//

    // let speciality_index = selectedinvestigatorType.indexOf(investigator);
    // if (speciality_index !== -1) {
    //   selectedinvestigatorType.splice(speciality_index, 1);
    // } else {
    //   selectedinvestigatorType.push(investigator);
    // }
    // setSelectedinvestigatorType(selectedinvestigatorType);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleOnSubRoleChange = (subRole) => {
    if (subRole == "All") {
      let all_index = selectedSubRole?.indexOf(subRole);

      if (all_index !== -1) {
        setSelectedSubRole([]);
      } else {
        selectedSubRole?.push(subRole);
        Object.keys(filters?.sub_role)?.map((item, index) => {
          selectedSubRole?.push(item);
        });

        setSelectedSubRole(selectedSubRole);
      }
    } else {
      let subRoler_index = selectedSubRole?.indexOf(subRole);

      if (subRoler_index !== -1) {
        selectedSubRole?.splice(subRoler_index, 1);
        let all_index = selectedSubRole?.indexOf("All");
        if (all_index !== -1) {
          selectedSubRole?.splice(all_index, 1);
        }
        setSelectedSubRole(selectedSubRole);
      } else {
        selectedSubRole?.push(subRole);

        let all_item_index = Object.keys(filters?.sub_role)?.every((item) =>
          selectedSubRole.includes(item)
        );

        if (all_item_index == true) {
          selectedSubRole?.push("All");
        }
        setSelectedSubRole(selectedSubRole);
      }
    }

    //----------Old code----------//

    // let subrole_index = selectedSubRole.indexOf(subRole);
    // if (subrole_index !== -1) {
    //   selectedSubRole.splice(subrole_index, 1);
    // } else {
    //   selectedSubRole.push(subRole);
    // }
    // setSelectedSubRole(selectedSubRole);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleOnBlindTypeChange = (blindType) => {
    setSelectedBlindType(blindType);
    let up = updateflag + 1;
    setUpdateFlag(up);
    // let blindType_index = selectedBlindType.indexOf(blindType);
    // if (blindType_index !== -1) {
    //   selectedBlindType.splice(blindType_index, 1);
    // } else {
    //   selectedBlindType.push(blindType);
    // }
    // setSelectedBlindType(selectedBlindType);
    // let up = updateflag + 1;
    // setUpdateFlag(up);
  };

  const handleOnSiteNumberChange = (sitenumber, sitenumberflag = 0) => {
    if (sitenumber == "All") {
      let all_index = selectedsitenumber?.indexOf(sitenumber);
      if (all_index !== -1) {
        setSelectedsitenumber([]);
      } else {
        selectedsitenumber?.push(sitenumber);
        filters?.site_number?.map((item, index) => {
          selectedsitenumber?.push(item);
        });

        setSelectedsitenumber(selectedsitenumber);
      }
    } else {
      let sitenumber_index = selectedsitenumber?.indexOf(sitenumber);
      if (sitenumber_index !== -1) {
        selectedsitenumber?.splice(sitenumber_index, 1);
        let all_index = selectedsitenumber?.indexOf("All");
        if (all_index !== -1) {
          selectedsitenumber?.splice(all_index, 1);
        }
        setSelectedsitenumber(selectedsitenumber);
      } else {
        selectedsitenumber?.push(sitenumber);

        let all_item_index = filters?.site_number?.every((item) =>
          selectedsitenumber.includes(item)
        );
        if (all_item_index == true) {
          selectedsitenumber?.push("All");
        }
        setSelectedsitenumber(selectedsitenumber);
      }
    }

    //-----Old code-------//

    // let site_number_index = selectedsitenumber.indexOf(sitenumber);
    // if (site_number_index !== -1) {
    //   selectedsitenumber.splice(site_number_index, 1);
    //   setSelectedsitenumber(selectedsitenumber);
    // } else {
    //   selectedsitenumber.push(sitenumber);
    //   setSelectedsitenumber(selectedsitenumber);
    // }

    //----------old code finish--------//

    let up = updateflag + 1;
    setUpdateFlag(up);

    if (sitenumberflag == 0) {
      if ("site_data" in filters && sitenumber !== "All") {
        let getSiteData = filters.site_data;
        let site_name_value = getSiteData[sitenumber];

        handleOnSiteNameChange(site_name_value, 1);
      }
      if (sitenumber == "All") {
        handleOnSiteNameChange(sitenumber, 1);
      }
    }
  };

  const handleOnSiteNameChange = (sitename, sitenameflag = 0) => {
    if (sitename == "All") {
      let all_index = selectedsitename?.indexOf(sitename);
      if (all_index !== -1) {
        setSelectedsitename([]);
      } else {
        selectedsitename?.push(sitename);
        filters?.site_name?.map((item, index) => {
          selectedsitename?.push(item);
        });

        setSelectedsitename(selectedsitename);
      }
    } else {
      let sitename_index = selectedsitename?.indexOf(sitename);
      if (sitename_index !== -1) {
        selectedsitename?.splice(sitename_index, 1);
        let all_index = selectedsitename?.indexOf("All");
        if (all_index !== -1) {
          selectedsitename?.splice(all_index, 1);
        }
        setSelectedsitename(selectedsitename);
      } else {
        selectedsitename?.push(sitename);

        let all_item_index = filters?.site_name?.every((item) =>
          selectedsitename.includes(item)
        );

        if (all_item_index == true) {
          selectedsitename?.push("All");
        }
        setSelectedsitename(selectedsitename);
      }
    }

    //----------------old code start--------//

    // let site_name_index = selectedsitename?.indexOf(sitename);
    // if (site_name_index !== -1) {
    //   selectedsitename?.splice(site_name_index, 1);
    //   setSelectedsitename(selectedsitename);
    // } else {
    //   selectedsitename?.push(sitename);
    //   setSelectedsitename(selectedsitename);
    // }

    //-----------old code finish---------//

    let up = updateflag + 1;
    setUpdateFlag(up);

    if (sitenameflag == 0) {
      if ("site_data" in filters && sitename !== "All") {
        let getSiteData = filters.site_data;
        let site_number_value = Object.keys(getSiteData).find(
          (key) => getSiteData[key] === sitename
        );

        handleOnSiteNumberChange(site_number_value, 1);
      }
      if (sitename == "All") {
        handleOnSiteNumberChange(sitename, 1);
      }
    }
  };

  const handleOnReaderSelectionChange = (reader_selection) => {
    if (selectedreaderselection == reader_selection) {
      setSelectedReaderSelection("");
    } else {
      setSelectedReaderSelection(reader_selection);
    }
    setSelectedIbu("");
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleOnIbuChange = (ibu) => {
    if (selectedibu == ibu) {
      setSelectedIbu("");
    } else {
      setSelectedIbu(ibu);
    }
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleOnProductChange = (product) => {
    let product_index = selectedproduct.indexOf(product);
    if (product_index !== -1) {
      selectedproduct.splice(product_index, 1);
    } else {
      selectedproduct.push(product);
    }
    setSelectedProduct(selectedproduct);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleRegister = (register_val) => {
    if (register_val == "yes" || register_val == "all") {
      setShowHideArticle(1);
    } else {
      setSelectedIbu("");
      setSelectedReaderSelection("");
      setSelectedArticles([]);
      setSelectedArticleCompleted([]);
      setShowHideArticle(0);
    }
    setSelectedRegister(register_val);
  };

  const handleBounce = (bounce_val) => {
    setSelectedBounce(bounce_val);
  };

  const handleContentRead = (item) => {
    setSelectedContentRead(item);
  };

  const handleArticleCompleted = (val) => {
    setSelectedArticleCompleted(val);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleIrt = (irt_val) => {
    setSelectedIrt(irt_val);
    setSelectedinvestigatorType([]);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleReadOpen = (val) => {
    setSelectedReadOpen(val);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleTrialRegister = (val) => {
    setSelectedTrialRegister(val);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleOnArticleChange = (article) => {
    let article_index = selectedarticles.indexOf(article);
    if (article_index !== -1) {
      selectedarticles.splice(article_index, 1);
    } else {
      selectedarticles.push(article);
    }
    setSelectedArticles(selectedarticles);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleOnCampaingChange = (campaign) => {
    let campaign_index = selectedcampaign.indexOf(campaign);
    if (campaign_index !== -1) {
      selectedcampaign.splice(campaign_index, 1);
    } else {
      selectedcampaign.push(campaign);
    }
    setSelectedCampaign(selectedcampaign);
    if (selectedcampaign.length == 0) {
      setSelectedReadOpen();
    }
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const handleOnConsentChange = (consent) => {
    if (consent == "All") {
      let all_index = selectedconsent?.indexOf(consent);
      if (all_index !== -1) {
        setConsent([]);
      } else {
        selectedconsent?.splice("None", 1);
        filters?.consent_type?.filter((item, index) => {
          if (item == "None") {
            return;
          }
          selectedconsent?.push(item);
        });

        setConsent(selectedconsent);
      }
    } else if (consent == "None") {
      let none_index = selectedconsent?.indexOf(consent);
      if (none_index == -1) {
        setConsent([consent]);
      } else {
        selectedconsent?.splice(none_index, 1);
        setConsent(selectedconsent);
      }
    } else {
      let none_index = selectedconsent?.indexOf("None");

      if (none_index !== -1) {
        selectedconsent?.splice(none_index, 1);
      }
      let consent_index = selectedconsent?.indexOf(consent);

      if (consent_index !== -1) {
        selectedconsent?.splice(consent_index, 1);

        let all_index = selectedconsent?.indexOf("All");
        if (all_index !== -1) {
          selectedconsent?.splice(all_index, 1);
        }

        setConsent(selectedconsent);
      } else {
        selectedconsent?.push(consent);

        let all_item = filters?.consent_type?.filter((item) => {
          if (item == "All" || item == "None") {
            return;
          }
          return item;
        });

        let all_item_index = all_item?.every((item) =>
          selectedconsent?.includes(item)
        );

        if (all_item_index == true) {
          filters?.consent_type?.map((item) => {
            if (item == "All") {
              selectedconsent?.push(item);
            }
          });
        }

        setConsent(selectedconsent);
      }
    }

    //--------------Old code start-------------//
    // let consent_index = selectedconsent.indexOf(consent);

    //   if (consent_index !== -1) {
    //     selectedconsent.splice(consent_index, 1);
    //   } else {
    //     selectedconsent.push(consent);
    //   }
    // setConsent(selectedconsent);

    //---------Old code ends---------//

    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const clearFilter = () => {
    document.querySelectorAll("input").forEach((checkbox) => {
      checkbox.checked = false;
    });
    setSelectedCountry([]);
    setSelectedMarketingContactType([]);
    setSelectedCompany([]);
    setSelectedProvince([]);
    setSelectedTerritory([]);
    setSelectedContactType([]);
    setSelectedSpeciality([]);
    setSelectedinvestigatorType([]);
    setSelectedsitenumber([]);
    setSelectedsitename([]);
    setSelectedProduct([]);
    setSelectedArticles([]);
    setSelectedCampaign([]);
    setSelectedReadOpen();
    setConsent([]);
    setSelectedIbu();
    setSelectedReaderSelection();
    setSelectedRegister();
    setSelectedBounce();
    setSelectedContentRead();
    setFilterData([]);
    let up = updateflag + 1;
    setUpdateFlag(up);
  };

  const applyFilter = async (pageno = 1) => {
    setDataFromComp('filter');
    let flag_to_check_data = false;
    const payload = {
      user_id: localStorage.getItem("user_id"),
      page:pageno,
    };
    //For Contact Type
    if (
      typeof selectedcontacttype === "object" &&
      selectedcontacttype.length > 0
    ) {
      let contactTypeList = selectedcontacttype.map((item) => {
        let val = getKeyByValue(filters.contact_type, item);
        return val;
      });
      Object.assign(payload, { contactTypeList: contactTypeList });
      flag_to_check_data = true;
    }

    //For Registered Articles
    if (typeof selectedarticles === "object" && selectedarticles.length > 0) {
      let registered_on_article = selectedarticles.map((item) => {
        let val = getKeyByValue(filters.articles, item);
        return val;
      });
      Object.assign(payload, { registered_on_article: registered_on_article });
      flag_to_check_data = true;
    }

    //For Speciality
    if (
      typeof selectedspeciality === "object" &&
      selectedspeciality.length > 0
    ) {
      let speciality = selectedspeciality?.filter((item) => {
        return item !== "All";
      });
      Object.assign(payload, { speciality: speciality });
      flag_to_check_data = true;
    }

    //For User Type
    if (
      typeof selectedinvestigatorType === "object" &&
      selectedinvestigatorType.length > 0
    ) {
      let investigator_type = selectedinvestigatorType?.filter((item) => {
        return item !== "All";
      });
      Object.assign(payload, { investigator_type: investigator_type });
      flag_to_check_data = true;
    }

    if (typeof selectedSubRole === "object" && selectedSubRole.length > 0) {
      let sub_role = selectedSubRole?.filter((item) => {
        return item !== "All";
      });
      Object.assign(payload, { sub_role: sub_role });
      flag_to_check_data = true;
    }

    // for Campaign listing
    if (typeof selectedcampaign === "object" && selectedcampaign.length > 0) {
      let campaign = selectedcampaign.map((item) => {
        return item;
      });
      Object.assign(payload, { campaign_listing: campaign });
      flag_to_check_data = true;
    }

    // for Campaign status Read Open
    if (selectedReadOpen) {
      Object.assign(payload, { campaing_status: selectedReadOpen });
      flag_to_check_data = true;
    }

    // if (typeof selectedBlindType === "object" && selectedBlindType.length > 0) {
    //   let blind_type = selectedBlindType.map((item) => {
    //     return item;
    //   });
    //   Object.assign(payload, { blind_type: blind_type });
    //   flag_to_check_data = true;
    // }

    if (selectedBlindType) {
      if (selectedBlindType != "all") {
        Object.assign(payload, { blind_type: [selectedBlindType] });
        flag_to_check_data = true;
      }
    }

    //For User Type
    if (
      typeof selectedsitenumber === "object" &&
      selectedsitenumber.length > 0
    ) {
      let site_number = selectedsitenumber?.filter((item) => {
        return item !== "All";
      });

      Object.assign(payload, { site_number: site_number });
      flag_to_check_data = true;
    }

    //For User Type
    if (typeof selectedsitename === "object" && selectedsitename.length > 0) {
      let site_name = selectedsitename?.filter((item) => {
        return item !== "All";
      });

      Object.assign(payload, { site_name: site_name });
      flag_to_check_data = true;
    }

    //For Country
    if (typeof selectedcountry === "object" && selectedcountry.length > 0) {
      let country = selectedcountry?.filter((item) => {
        return item !== "All";
      });
      Object.assign(payload, { country: country });
      flag_to_check_data = true;
    }

    //For Marketing Contact Type
    if (
      typeof selectedmarketingcontacttype === "object" &&
      selectedmarketingcontacttype.length > 0
    ) {
      let marketing_contact_type = selectedmarketingcontacttype.map((item) => {
        return item;
      });
      Object.assign(payload, {
        marketing_contact_type: marketing_contact_type,
      });
      flag_to_check_data = true;
    }

    //For company
    if (typeof selectedcompany === "object" && selectedcompany.length > 0) {
      let company = selectedcompany.map((item) => {
        return item;
      });
      Object.assign(payload, { company: company });
      flag_to_check_data = true;
    }

    //For Province
    if (typeof selectedprovince === "object" && selectedprovince.length > 0) {
      let province = selectedprovince.map((item) => {
        return item;
      });
      Object.assign(payload, { province: province });
      flag_to_check_data = true;
    }

    //For territory
    if (typeof selectedterritory === "object" && selectedterritory.length > 0) {
      let territory = selectedterritory.map((item) => {
        return item;
      });
      Object.assign(payload, { territory: territory });
      flag_to_check_data = true;
    }

    //For Product
    if (typeof selectedproduct === "object" && selectedproduct.length > 0) {
      let product = selectedproduct.map((item) => {
        return item;
      });
      Object.assign(payload, { product: product });
      flag_to_check_data = true;
    }

    //For IBU
    if (selectedibu) {
      Object.assign(payload, { ibu: selectedibu });
      flag_to_check_data = true;
    }

    //For Register
    if (selectedregister) {
      if (selectedregister == "yes") {
        Object.assign(payload, { registered_users: 1 });
      }else if (selectedregister == "all") {
        Object.assign(payload, { registered_users: 2 });
      } else {
        Object.assign(payload, { registered_users: 0 });
      }
      flag_to_check_data = true;
    }

    if (selectedArticleCompleted) {
      if (selectedArticleCompleted == "yes") {
        Object.assign(payload, { article_completed: 1 });
      } else if (selectedArticleCompleted == "no") {
        Object.assign(payload, { article_completed: 0 });
      }
      flag_to_check_data = true;
    }

    //For Bounce
    if (typeof selectedbounce !== "undefined") {
      if (selectedbounce == "yes") {
        Object.assign(payload, { bounce: 1 });
      } else {
        Object.assign(payload, { bounce: 0 });
      }
      flag_to_check_data = true;
      // Object.assign(payload, { bounce: 1 });
    }

    if (typeof selectedContentRead !== "undefined") {
      if (selectedContentRead == "yes") {
        Object.assign(payload, { trainingcompleted: 1 });
      } else {
        Object.assign(payload, { trainingcompleted: 0 });
      }
      flag_to_check_data = true;
      // Object.assign(payload, { bounce: 1 });
    }

    if (typeof selectedIrt !== "undefined") {
      if (selectedIrt == "yes") {
        Object.assign(payload, { irt: 1 });
      } else if (selectedIrt == "Training") {
        Object.assign(payload, { irt: 2 });
      } else if (selectedIrt == "no") {
        Object.assign(payload, { irt: 0 });
      }
      flag_to_check_data = true;
      // Object.assign(payload, { bounce: 1 });
    }

    if (typeof selectedTrialRegister !== "undefined") {
      if (selectedTrialRegister == "yes") {
        Object.assign(payload, { trial_register: 1 });
      } else if (selectedTrialRegister == "no") {
        Object.assign(payload, { trial_register: 0 });
      }
      flag_to_check_data = true;
      // Object.assign(payload, { bounce: 1 });
    }

    //For Reader Selection
    if (selectedreaderselection) {
      Object.assign(payload, { reader_selection: selectedreaderselection });
      flag_to_check_data = true;
    }

    //For Consent
    if (typeof selectedconsent === "object" && selectedconsent.length > 0) {
      let consent = selectedconsent.map((item) => {
        let val = getKeyByValue(filters.consent_type, item);
        return val;
      });
      Object.assign(payload, { Consent: consent });
      flag_to_check_data = true;
    }
    // console.log(payload);
    if (flag_to_check_data) {
      setfilterapplied(1);
      setPayload(payload);
      if(pageno == 1){
        loader("show");
        setApiFilterFlag(0);
      }else{
        setloadMorePage(false);
        setLoadMoreFlag(true);
      }
      // console.log(payload);
      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      await axios
        .post(`distributes/get_smart_list_with_filter_data`, payload)
        .then((res) => {
          // console.log(res.data.status_code);
          if (res.data.status_code == 200) {
            if(pageno == 1){
              setloadMorePage(true);
              setFilterData(res?.data?.response?.data);
              // let total_count = res?.data?.response?.data?.length;
              let total_count = res?.data?.response?.list_count;
              setTotalLostCount(total_count);
              // console.log(res.data.response.data,"DATE")
              popup_alert({
                visible: "show",
                message: total_count+" Users found.<br> Use create smart list to confirm the list.",
                type: "success",
                redirect: "",
              });
            }else{
              setloadMorePage(false);
              setFilterData((oldArray)=>[...oldArray,...res?.data?.response?.data]);
              setLoadMoreFlag(false);
              // setFilterData(res.data.response.data);
            }
          } else {
            setloadMorePage(false);
            setFilterData();
            setLoadMoreFlag(false);
          }
          setApiFilterFlag(1);
          loader("hide");
        })
        .catch((err) => {
          loader("hide");
          // console.log(err);
        });
    } else {
      toast.error("Please select any filter.");
    }
  };

  const getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  const sendDataToParent = (childData, flag) => {
    if (flag == "existing") {
      setFilterData(childData);
    } else if (flag == "new") {
      setNewAddedUser(childData);
    }
    setApiFilterFlag(1);
  };

  const showConfirmation = () => {
    setConfirmationPopupStatus(true);
  };

  const hideconfirmationpopup = () => {
    setConfirmationPopupStatus(false);
  };

  const createListWithFilters = (flag) => {
    setConfirmationPopupStatus(false);
    tableCompRef.current.createSmartList(getfilterdata, getNewAddedUser, flag);
  };

  const removeindividualfilter = (src, item) => {
    if (src == "country") {
      handleOnCountryChange(item);
    } else if (src == "marketingcontacttype") {
      handleOnMarketingContatctTypeChange(item);
    } else if (src == "company") {
      handleOnCompanyChange(item);
    } else if (src == "province") {
      handleOnProvinceChange(item);
    } else if (src == "selectedArticleCompleted") {
      setSelectedArticleCompleted("");
    } else if (src == "territory") {
      handleOnTerritoryChange(item);
    } else if (src == "irt") {
      setSelectedIrt();
    } else if (src == "trialregister") {
      setSelectedTrialRegister();
    } else if (src == "contact_type") {
      handleOnContactTypeChange(item);
    } else if (src == "speciality") {
      handleOnSpecialityChange(item);
    } else if (src == "product") {
      handleOnProductChange(item);
    } else if (src == "article") {
      handleOnArticleChange(item);
    } else if (src == "consent") {
      handleOnConsentChange(item);
    } else if (src == "reader_selection") {
      handleOnReaderSelectionChange(item);
    } else if (src == "ibu") {
      handleOnIbuChange(item);
    } else if (src == "register") {
      setSelectedReaderSelection("");
      setSelectedIbu("");
      setSelectedRegister();
      setSelectedArticles([]);
      setSelectedArticleCompleted([]);
      setShowHideArticle(0);
    } else if (src == "bounce") {
      setSelectedBounce();
    } else if (src == "selectedContentRead") {
      setSelectedContentRead();
    } else if (src == "investigator_type") {
      handleOnInvestigatorChange(item);
    } else if (src == "sub_role") {
      handleOnSubRoleChange(item);
    } else if (src == "site_number") {
      handleOnSiteNumberChange(item);
    } else if (src == "site_name") {
      handleOnSiteNameChange(item);
    } else if (src == "blind_type") {
      handleOnBlindTypeChange();
    } else if (src == "campaign") {
      handleOnCampaingChange(item);
    } else if (src == "campaign_status") {
      setSelectedReadOpen();
    }
  };

  const closeCancelClicked = () => {
    var x = localStorage.getItem("sd_i");
    if (x) {
      localStorage.removeItem("sd_i");
      Navigate("/SelectSmartList");
    } else {
      Navigate("/SmartList");
    }
  };

  const handleLoadMore = async() => {
    try{
      const body = {
        user_id: localStorage.getItem("user_id"),
        list_id: props?.listId,
        page:2
      };
      setLoadMoreFlag(true);
      setloadMorePage(false);
      const res = await axios.post(`distributes/get_reders_list`, body)
        if (res.data.response) {
          if (res.data.response.data.length) {
            setFilterData((oldArray)=>[...oldArray,...res.data.response.data]);
            setLoadMoreFlag(false);
            // let total = getfilterdata?.length + res.data.response.data.length
            // if(props.listcount <=total){
            //    setHide(0)
            // }
            // setPageNo(pageNo+1)
          }
        }
    }catch(err){
      setLoadMoreFlag(false);
      console.log(err);
    }
  }

  return (
    <>
      {typeof props.action !== "undefined" && props.action == "edit" && (
        <div className="page-top-nav smart_list_names sticky">
          <div className="row justify-content-end align-items-center">
            <div className="col-12 col-md-6">
              <div className="page-title">
                <h2>{props.listname}</h2>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="header-btn d-flex justify-content-end">
                <button
                  className="btn btn-primary btn-bordered light"
                  onClick={closeClicked}
                >
                  Close
                </button>
                {/*<button className="btn btn-primary btn-bordered save-as">Save As</button>*/}
                <button
                  className="btn btn-primary btn-filled save"
                  onClick={() => showConfirmation()}
                  disabled={
                    typeof getfilterdata !== "undefined" &&
                    getfilterdata.length > 0
                      ? false
                      : typeof getNewAddedUser !== "undefined" &&
                        getNewAddedUser.length > 0
                      ? false
                      : true
                  }
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {typeof props.action !== "undefined" && props.action == "create" && (
        <div className="page-top-nav smart_list_names create_filter_list sticky">
          <div className="row justify-content-end align-items-center">
            <div className="col-12 col-md-1">
              <div className="header-btn-left">
                <button className="btn btn-primary btn-bordered back">
                  <NavLink to="/CreateSmartList" className="active">
                    Back
                  </NavLink>
                </button>
              </div>
            </div>
            <div className="col-12 col-md-8">
              <ul className="tabnav-link">
                <li className="">
                  <a href="javascript:void(0)">Create smart list</a>
                </li>
                <li className="active active-main">
                  <a href="javascript:void(0)">
                    {localStorage.getItem("user_id") == userId?"Select & Verify your Users":"Select & Verify your HCPs"}
                    </a>
                </li>
              </ul>
            </div>

            <div className="col-12 col-md-3">
              <div className="header-btn d-flex justify-content-end">
                <button
                  className="btn btn-primary btn-bordered light"
                  onClick={closeCancelClicked}
                >
                  Cancel
                  {/*
                     <NavLink to="/CreateSmartList">Cancel</NavLink>
                    */}
                </button>
                <button
                  className="btn btn-primary btn-bordered save-as"
                  onClick={() => createListWithFilters("create")}
                  disabled={
                    typeof getfilterdata !== "undefined" &&
                    getfilterdata.length > 0
                      ? false
                      : typeof getNewAddedUser !== "undefined" &&
                        getNewAddedUser.length > 0
                      ? false
                      : true
                  }
                >
                  {getStorageState ? "Create & go to email" : "Create"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <section className="search-hcp smart-list-name">
        <div className="smart-list-name-drop">
          <h5>
            Please select who to include to your smart list.You can pick one or
            more:
          </h5>
          <div className="smart-list-dropdown">
            <div className="dropdown-smart">
              <div id="accordion-smart">
                <Accordion defaultActiveKey="0" flush>
                  <Accordion.Item className="card" eventKey="0">
                    <div className="card-header">
                      <Accordion.Header className="btn">
                        Segmentation
                      </Accordion.Header>
                    </div>
                    <Accordion.Body>
                      <div className="card-body">
                        {localStorage.getItem("user_id") !=
                        "56Ek4feL/1A8mZgIKQWEqg=="
                          ? "contact_type" in filters &&
                            Object.keys(filters.contact_type).length > 0 && (
                              <>
                                <div className="col block-smart-name">
                                  <h6>Contact type</h6>
                                  <div className="smart-name-list">
                                    <ul>
                                      {Object.entries(filters.contact_type).map(
                                        ([index, item]) => (
                                          <li>
                                            <div className="select-multiple-option">
                                              <input
                                                type="checkbox"
                                                id={`custom-checkbox-contact_type-${index}`}
                                                name="contact_type[]"
                                                value={item}
                                                checked={
                                                  typeof selectedcontacttype !==
                                                    "undefined" &&
                                                  selectedcontacttype.indexOf(
                                                    item
                                                  ) !== -1
                                                }
                                                onChange={() =>
                                                  handleOnContactTypeChange(
                                                    item
                                                  )
                                                }
                                              />
                                              <span className="checkmark"></span>
                                            </div>
                                            {item}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                </div>
                              </>
                            )
                          : null}

                        {"speciality" in filters &&
                          Object.keys(filters.speciality).length > 0 && (
                            <>
                              <div className="col block-smart-name">
                                <h6>Speciality</h6>
                                <div className="smart-name-list">
                                  <ul>
                                    {(() => {
                                      let entries = Object.entries(
                                        filters.speciality
                                      );
                                      entries.unshift(["All", "All"]);
                                      return entries.map(([index, item]) => (
                                        <li key={index}>
                                          <div className="select-multiple-option">
                                            <input
                                              type="checkbox"
                                              id={`custom-checkbox-speciality-${index}`}
                                              name="speciality[]"
                                              value={item}
                                              checked={
                                                typeof selectedspeciality !==
                                                  "undefined" &&
                                                selectedspeciality.indexOf(
                                                  item
                                                ) !== -1
                                              }
                                              onChange={() =>
                                                handleOnSpecialityChange(item)
                                              }
                                            />
                                            <span className="checkmark"></span>
                                          </div>
                                          {item}
                                        </li>
                                      ));
                                    })()}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}

                        {"product" in filters &&
                          Object.keys(filters.product).length > 0 && (
                            <>
                              <div className="col block-smart-name">
                                <h6>Product</h6>
                                <div className="smart-name-list">
                                  <ul>
                                    {Object.entries(filters.product).map(
                                      ([index, item]) => (
                                        <li>
                                          <div className="select-multiple-option">
                                            <input
                                              type="checkbox"
                                              id={`custom-checkbox-product-${index}`}
                                              name="ibu[]"
                                              value={item}
                                              checked={
                                                typeof selectedproduct !==
                                                  "undefined" &&
                                                selectedproduct.indexOf(
                                                  item
                                                ) !== -1
                                              }
                                              onChange={() =>
                                                handleOnProductChange(item)
                                              }
                                            />
                                            <span className="checkmark"></span>
                                          </div>
                                          {item}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}

                        {"marketing_contact_type" in filters &&
                          Object.keys(filters.marketing_contact_type).length >
                            0 && (
                            <>
                              <div className="col block-smart-name">
                                <h6>Contact type</h6>
                                <div className="smart-name-list">
                                  <ul>
                                    {Object.entries(
                                      filters.marketing_contact_type
                                    ).map(([index, item]) => (
                                      <li>
                                        <div className="select-multiple-option">
                                          <input
                                            type="checkbox"
                                            id={`custom-checkbox-country-${index}`}
                                            name="country[]"
                                            value={item}
                                            checked={
                                              typeof selectedmarketingcontacttype !==
                                                "undefined" &&
                                              selectedmarketingcontacttype.indexOf(
                                                item
                                              ) !== -1
                                            }
                                            onChange={() =>
                                              handleOnMarketingContatctTypeChange(
                                                item
                                              )
                                            }
                                          />
                                          <span className="checkmark"></span>
                                        </div>
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}

                        {/*"blind_type" in filters &&
                          Object.keys(filters.blind_type).length > 0 && (
                            <>
                              <div className="col block-smart-name">
                                <h6>Blind Type</h6>
                                <div className="smart-name-list">
                                  {/*
                                    <ul>
                                      {Object.entries(filters.blind_type).map(
                                        ([index, item]) => (
                                          <li>
                                            <div className="select-multiple-option">
                                              <input
                                                type="checkbox"
                                                id={`custom-checkbox-blind_type-${index}`}
                                                name="blind_type[]"
                                                value={item}
                                                checked={
                                                  typeof selectedBlindType !==
                                                    "undefined" &&
                                                  selectedBlindType.indexOf(
                                                    item
                                                  ) !== -1
                                                }
                                                onChange={() =>
                                                  handleOnBlindTypeChange(item)
                                                }
                                              />
                                              <span className="checkmark"></span>
                                            </div>
                                            {item}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                    */}
                                    {/*
                                  <ul>
                                    <li>
                                      <div className="select-multiple-option">
                                        <input
                                          type="radio"
                                          id="blind_all"
                                          name="blindTye"
                                          value="all"
                                          checked={
                                            typeof selectedBlindType !==
                                              "undefined" &&
                                            selectedBlindType == "all"
                                          }
                                          onChange={() =>
                                            handleOnBlindTypeChange("all")
                                          }
                                        />
                                        <span className="checkmark"></span>
                                      </div>
                                      All
                                    </li>
                                    <li>
                                      <div className="select-multiple-option">
                                        <input
                                          type="radio"
                                          id="blind_yes"
                                          name="blindTye"
                                          value="blinded"
                                          checked={
                                            typeof selectedBlindType !==
                                              "undefined" &&
                                            selectedBlindType == "blinded"
                                          }
                                          onChange={() =>
                                            handleOnBlindTypeChange("blinded")
                                          }
                                        />
                                        <span className="checkmark"></span>
                                      </div>
                                      Blinded
                                    </li>
                                    <li>
                                      <div className="select-multiple-option">
                                        <input
                                          type="radio"
                                          id="blind_no"
                                          name="blindTye"
                                          value="unblinded"
                                          checked={
                                            typeof selectedBlindType !==
                                              "undefined" &&
                                            selectedBlindType == "unblinded"
                                          }
                                          onChange={() =>
                                            handleOnBlindTypeChange("unblinded")
                                          }
                                        />
                                        <span className="checkmark"></span>
                                      </div>
                                      Unblinded
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </>
                          )*/}

                        {localStorage.getItem("user_id") ==
                          "56Ek4feL/1A8mZgIKQWEqg==" && (
                          <>
                            <div className="col block-smart-name">
                              <h6>IRT mandatory training</h6>
                              <div className="smart-name-list">
                                <ul>
                                  {/* <li>
                                        <div className="select-multiple-option">
                                          <input
                                            type="radio"
                                            id="irt_training"
                                            name="irt"
                                            value="Training"
                                            checked={
                                              typeof selectedIrt !== "undefined" &&
                                              selectedIrt == "Training"
                                            }
                                            onChange={() => handleIrt("Training")}
                                          />
                                          <span className="checkmark"></span>
                                        </div>
                                        Training
                                      </li> */}
                                  <li>
                                    <div className="select-multiple-option">
                                      <input
                                        type="radio"
                                        id="irt_yes"
                                        name="irt"
                                        value="yes"
                                        checked={
                                          typeof selectedIrt !== "undefined" &&
                                          selectedIrt == "yes"
                                        }
                                        onChange={() => handleIrt("yes")}
                                      />
                                      <span className="checkmark"></span>
                                    </div>
                                    Yes
                                  </li>
                                  <li>
                                    <div className="select-multiple-option">
                                      <input
                                        type="radio"
                                        id="irt_no"
                                        name="irt"
                                        value="no"
                                        checked={
                                          typeof selectedIrt !== "undefined" &&
                                          selectedIrt == "no"
                                        }
                                        onChange={() => handleIrt("no")}
                                      />
                                      <span className="checkmark"></span>
                                    </div>
                                    No
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </>
                        )}

                        {"investigator_type" in filters &&
                          Object.keys(filters.investigator_type).length > 0 &&
                          (selectedIrt == "no" || selectedIrt == "") && (
                            <>
                              <div className="col block-smart-name">
                                <h6>IRT role</h6>
                                <div className="smart-name-list">
                                  <ul>
                                    {(() => {
                                      let entries = Object.entries(
                                        filters.investigator_type
                                      );
                                      entries.unshift(["All", "All"]);
                                      return entries.map(([index, item]) => (
                                        <li>
                                          <div className="select-multiple-option">
                                            <input
                                              type="checkbox"
                                              id={`custom-checkbox-investigator_type-${index}`}
                                              name="investigator_type[]"
                                              value={item}
                                              checked={
                                                typeof selectedinvestigatorType !==
                                                  "undefined" &&
                                                selectedinvestigatorType.indexOf(
                                                  item
                                                ) !== -1
                                              }
                                              onChange={() =>
                                                handleOnInvestigatorChange(item)
                                              }
                                            />
                                            <span className="checkmark"></span>
                                          </div>
                                          {item}
                                        </li>
                                      ));
                                    })()}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}

                        {"irt_inverstigator_type" in filters &&
                          Object.keys(filters.irt_inverstigator_type).length >
                            0 &&
                          selectedIrt == "yes" && (
                            <>
                              <div className="col block-smart-name">
                                <h6>IRT role</h6>
                                <div className="smart-name-list">
                                  <ul>
                                    {(() => {
                                      let entries = Object.entries(
                                        filters.irt_inverstigator_type
                                      );
                                      entries.unshift(["All", "All"]);
                                      return entries.map(([index, item]) => (
                                        <li>
                                          <div className="select-multiple-option">
                                            <input
                                              type="checkbox"
                                              id={`custom-checkbox-investigator_irt_type-${index}`}
                                              name="investigator_irt_type[]"
                                              value={item}
                                              checked={
                                                typeof selectedinvestigatorType !==
                                                  "undefined" &&
                                                selectedinvestigatorType.indexOf(
                                                  item
                                                ) !== -1
                                              }
                                              onChange={() =>
                                                handleOnInvestigatorChange(item)
                                              }
                                            />
                                            <span className="checkmark"></span>
                                          </div>
                                          {item}
                                        </li>
                                      ));
                                    })()}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}

                        {"sub_role" in filters &&
                          Object.keys(filters.sub_role).length > 0 && (
                            <>
                              <div className="col block-smart-name">
                                <h6>Study roles</h6>
                                <div className="smart-name-list">
                                  <ul>
                                    {(() => {
                                      let entries = Object.entries(
                                        filters.sub_role
                                      );
                                      entries.unshift(["All", "All"]);
                                      return entries.map(([index, item]) => (
                                        <li key={item}>
                                          <div className="select-multiple-option">
                                            <input
                                              type="checkbox"
                                              id={`custom-checkbox-investigator_type-${index}`}
                                              name="investigator_type[]"
                                              value={item}
                                              checked={
                                                typeof selectedSubRole !==
                                                  "undefined" &&
                                                selectedSubRole.indexOf(
                                                  item
                                                ) !== -1
                                              }
                                              onChange={() =>
                                                handleOnSubRoleChange(item)
                                              }
                                            />
                                            <span className="checkmark"></span>
                                          </div>
                                          {item}
                                        </li>
                                      ));
                                    })()}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}

                        {"country" in filters &&
                          Object.keys(filters.country).length > 0 && (
                            <>
                              <div className="col block-smart-name">
                                <h6>Country</h6>
                                <div className="smart-name-list">
                                  <ul>
                                    {(() => {
                                      let entries = Object.entries(
                                        filters.country
                                      );
                                      entries.unshift(["All", "All"]);
                                      return entries.map(([index, item]) => (
                                        <li key={index}>
                                          <div className="select-multiple-option">
                                            <input
                                              type="checkbox"
                                              id={`custom-checkbox-country-${index}`}
                                              name="country[]"
                                              value={item}
                                              checked={
                                                typeof selectedcountry !==
                                                  "undefined" &&
                                                selectedcountry.indexOf(
                                                  item
                                                ) !== -1
                                              }
                                              onChange={() =>
                                                handleOnCountryChange(item)
                                              }
                                            />
                                            <span className="checkmark"></span>
                                          </div>

                                          {item == "B&H"
                                            ? "Bosnia and Herzegovina"
                                            : item}
                                        </li>
                                      ));
                                    })()}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}

                        {"company" in filters &&
                          Object.keys(filters.company).length > 0 && (
                            <>
                              <div className="col block-smart-name">
                                <h6>Company</h6>
                                <div className="smart-name-list">
                                  <ul>
                                    {Object.entries(filters.company).map(
                                      ([index, item]) => (
                                        <li>
                                          <div className="select-multiple-option">
                                            <input
                                              type="checkbox"
                                              id={`custom-checkbox-company-${index}`}
                                              name="company[]"
                                              value={item}
                                              checked={
                                                typeof selectedcompany !==
                                                  "undefined" &&
                                                selectedcompany.indexOf(
                                                  item
                                                ) !== -1
                                              }
                                              onChange={() =>
                                                handleOnCompanyChange(item)
                                              }
                                            />
                                            <span className="checkmark"></span>
                                          </div>
                                          {item}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}

                        {"province" in filters &&
                          Object.keys(filters.province).length > 0 && (
                            <>
                              <div className="col block-smart-name">
                                <h6>Province</h6>
                                <div className="smart-name-list">
                                  <ul>
                                    {Object.entries(filters.province).map(
                                      ([index, item]) => (
                                        <li>
                                          <div className="select-multiple-option">
                                            <input
                                              type="checkbox"
                                              id={`custom-checkbox-province-${index}`}
                                              name="province[]"
                                              value={item}
                                              checked={
                                                typeof selectedprovince !==
                                                  "undefined" &&
                                                selectedprovince.indexOf(
                                                  item
                                                ) !== -1
                                              }
                                              onChange={() =>
                                                handleOnProvinceChange(item)
                                              }
                                            />
                                            <span className="checkmark"></span>
                                          </div>
                                          {item}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}

                        {"territory" in filters &&
                          Object.keys(filters.territory).length > 0 && (
                            <>
                              <div className="col block-smart-name">
                                <h6>Territory</h6>
                                <div className="smart-name-list">
                                  <ul>
                                    {Object.entries(filters.territory).map(
                                      ([index, item]) => (
                                        <li>
                                          <div className="select-multiple-option">
                                            <input
                                              type="checkbox"
                                              id={`custom-checkbox-territory-${index}`}
                                              name="territory[]"
                                              value={item}
                                              checked={
                                                typeof selectedterritory !==
                                                  "undefined" &&
                                                selectedterritory.indexOf(
                                                  item
                                                ) !== -1
                                              }
                                              onChange={() =>
                                                handleOnTerritoryChange(item)
                                              }
                                            />
                                            <span className="checkmark"></span>
                                          </div>
                                          {item}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}

                        {"consent_type" in filters &&
                          filters.consent_type.length > 0 && (
                            <>
                              <div className="col block-smart-name consent-type">
                                <h6>Consent type</h6>
                                <div className="smart-name-list">
                                  <ul>
                                    {filters.consent_type.map((item, index) => (
                                      <li>
                                        <div className="select-multiple-option">
                                          <input
                                            type="checkbox"
                                            id={`custom-checkbox-consent_type-${index}`}
                                            name="consent_type[]"
                                            value={index}
                                            checked={
                                              typeof selectedconsent !==
                                                "undefined" &&
                                              selectedconsent.indexOf(item) !==
                                                -1
                                            }
                                            onChange={() =>
                                              handleOnConsentChange(item)
                                            }
                                          />
                                          <span className="checkmark"></span>
                                        </div>
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}

                        {"site_number" in filters &&
                          Object.keys(filters.site_number).length > 0 && (
                            <>
                              <div className="col block-smart-name">
                                <h6>Site number</h6>
                                <div className="smart-name-list">
                                  <ul>
                                    {siteNumber?.length
                                      ? siteNumber?.map((key, index) => (
                                          <li>
                                            <div className="select-multiple-option">
                                              <input
                                                type="checkbox"
                                                id={`custom-checkbox-site_number-${index}`}
                                                name="site_number[]"
                                                value={key}
                                                checked={
                                                  typeof selectedsitenumber !==
                                                    "undefined" &&
                                                  selectedsitenumber.indexOf(
                                                    key
                                                  ) !== -1
                                                }
                                                onChange={() =>
                                                  handleOnSiteNumberChange(key)
                                                }
                                              />
                                              <span className="checkmark"></span>
                                            </div>
                                            {key}
                                          </li>
                                        ))
                                      : (() => {
                                          let entries = Object.entries(
                                            filters.site_number
                                          );
                                          entries.unshift(["All", "All"]);
                                          return entries.map(
                                            ([index, item]) => (
                                              <li>
                                                <div className="select-multiple-option">
                                                  <input
                                                    type="checkbox"
                                                    id={`custom-checkbox-site_number-${index}`}
                                                    name="site_number[]"
                                                    value={item}
                                                    checked={
                                                      typeof selectedsitenumber !==
                                                        "undefined" &&
                                                      selectedsitenumber.indexOf(
                                                        item
                                                      ) !== -1
                                                    }
                                                    onChange={() =>
                                                      handleOnSiteNumberChange(
                                                        item
                                                      )
                                                    }
                                                  />
                                                  <span className="checkmark"></span>
                                                </div>
                                                {item}
                                              </li>
                                            )
                                          );
                                        })()}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}

                        {"site_name" in filters &&
                          Object.keys(filters.site_name).length > 0 && (
                            <>
                              <div className="col block-smart-name">
                                <h6>Site name</h6>
                                <div className="smart-name-list">
                                  <ul>
                                    {siteName?.length
                                      ? siteName?.map((key, index) => (
                                          <li>
                                            <div className="select-multiple-option">
                                              <input
                                                type="checkbox"
                                                id={`custom-checkbox-site_number-${index}`}
                                                name="site_number[]"
                                                value={key}
                                                checked={
                                                  typeof selectedsitename !==
                                                    "undefined" &&
                                                  selectedsitename.indexOf(
                                                    key
                                                  ) !== -1
                                                }
                                                onChange={() =>
                                                  handleOnSiteNameChange(key)
                                                }
                                              />
                                              <span className="checkmark"></span>
                                            </div>
                                            {key}
                                          </li>
                                        ))
                                      : (() => {
                                          let entries = Object.entries(
                                            filters.site_name
                                          );
                                          entries.unshift(["All", "All"]);
                                          return entries.map(
                                            ([index, item]) => (
                                              <li>
                                                <div className="select-multiple-option">
                                                  <input
                                                    type="checkbox"
                                                    id={`custom-checkbox-site_name-${index}`}
                                                    name="site_name[]"
                                                    value={item}
                                                    checked={
                                                      typeof selectedsitename !==
                                                        "undefined" &&
                                                      selectedsitename.indexOf(
                                                        item
                                                      ) !== -1
                                                    }
                                                    onChange={() =>
                                                      handleOnSiteNameChange(
                                                        item
                                                      )
                                                    }
                                                  />
                                                  <span className="checkmark"></span>
                                                </div>
                                                {item}
                                              </li>
                                            )
                                          );
                                        })()}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}

                        {"campaign_listing" in filters &&
                          Object.keys(filters.campaign_listing).length > 0 && (
                            <>
                              <div className="col block-smart-name">
                                <h6>Campaign</h6>

                                <div className="smart-name-list">
                                  <ul>
                                    {Object.entries(
                                      filters.campaign_listing
                                    ).map(([index, item]) => (
                                      <li>
                                        <div className="select-multiple-option">
                                          <input
                                            type="checkbox"
                                            id={`custom-checkbox-campaign_listing-${index}`}
                                            name="campaign_listing[]"
                                            value={index}
                                            checked={
                                              typeof selectedcampaign !==
                                                "undefined" &&
                                              selectedcampaign.indexOf(
                                                index
                                              ) !== -1
                                            }
                                            onChange={() =>
                                              handleOnCampaingChange(index)
                                            }
                                          />
                                          <span className="checkmark"></span>
                                        </div>
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}

                        {selectedcampaign.length > 0 && (
                          <>
                            <div className="col block-smart-name registered">
                              <h6>Campaign?</h6>
                              <ul>
                                <li>
                                  <div className="select-multiple-option">
                                    <input
                                      type="radio"
                                      id="read_camp"
                                      name="read"
                                      value="Read"
                                      checked={
                                        typeof selectedReadOpen !==
                                          "undefined" &&
                                        selectedReadOpen == "Read"
                                      }
                                      onChange={() => handleReadOpen("Read")}
                                    />
                                    <span className="checkmark"></span>
                                  </div>
                                  Read
                                </li>
                                <li>
                                  <div className="select-multiple-option">
                                    <input
                                      type="radio"
                                      id="open_camp"
                                      name="open"
                                      value="Open"
                                      checked={
                                        typeof selectedReadOpen !==
                                          "undefined" &&
                                        selectedReadOpen == "Open"
                                      }
                                      onChange={() => handleReadOpen("Open")}
                                    />
                                    <span className="checkmark"></span>
                                  </div>
                                  Open
                                </li>
                              </ul>
                            </div>
                          </>
                        )}

                        <div className="col block-smart-name registered">
                          {localStorage.getItem("user_id") ==
                          "56Ek4feL/1A8mZgIKQWEqg==" ? (
                            <h6>Registered ?</h6>
                          ) : (
                            <h6>Registered</h6>
                          )}

                          <ul>
                          <li>
                            <div className="select-multiple-option">
                              <input
                                type="checkbox"
                                id="register_all"
                                name="register"
                                value="all"
                                checked={
                                  typeof selectedregister !== "undefined" &&
                                  selectedregister == "all"
                                }
                                onChange={() => handleRegister("all")}
                              />
                              <span className="checkmark"></span>
                            </div>
                            All
                          </li>
                            <li>
                              <div className="select-multiple-option">
                                <input
                                  type="checkbox"
                                  id="register_yes"
                                  name="register"
                                  value="yes"
                                  checked={
                                    typeof selectedregister !== "undefined" &&
                                    selectedregister == "yes" || selectedregister == "all"
                                  }
                                  onChange={() => handleRegister("yes")}
                                />
                                <span className="checkmark"></span>
                              </div>
                              Yes
                            </li>
                            <li>
                              <div className="select-multiple-option">
                                <input
                                  type="checkbox"
                                  id="register_no"
                                  name="register"
                                  value="no"
                                  checked={
                                    typeof selectedregister !== "undefined" &&
                                    selectedregister == "no" || selectedregister == "all"
                                  }
                                  onChange={() => handleRegister("no")}
                                />
                                <span className="checkmark"></span>
                              </div>
                              No
                            </li>
                          </ul>
                          {localStorage.getItem("user_id") !=
                            "56Ek4feL/1A8mZgIKQWEqg==" && (
                            <>
                              <h6>Bounced</h6>
                              <ul>
                                <li>
                                  <div className="select-multiple-option">
                                    <input
                                      type="radio"
                                      id="bounce_yes"
                                      name="bounce"
                                      value="yes"
                                      checked={
                                        typeof selectedbounce !== "undefined" &&
                                        selectedbounce == "yes"
                                      }
                                      onChange={() => handleBounce("yes")}
                                    />
                                    <span className="checkmark"></span>
                                  </div>
                                  Yes
                                </li>
                                <li>
                                  <div className="select-multiple-option">
                                    <input
                                      type="radio"
                                      id="bounce_no"
                                      name="bounce"
                                      value="no"
                                      checked={
                                        typeof selectedbounce !== "undefined" &&
                                        selectedbounce == "no"
                                      }
                                      onChange={() => handleBounce("no")}
                                    />
                                    <span className="checkmark"></span>
                                  </div>
                                  No
                                </li>
                              </ul>
                            </>
                          )}
                        </div>

                        {"articles" in filters &&
                          Object.keys(filters.articles).length > 0 &&
                          showhidearticle == 1 && (
                            <>
                              <div className="col block-smart-name">
                                {localStorage.getItem("user_id") ==
                                "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                  <>
                                    <h6>Library</h6>
                                  </>
                                ) : (
                                  <>
                                    <h6>Articles</h6>
                                  </>
                                )}

                                <div className="smart-name-list">
                                  <ul>
                                    {Object.entries(filters.articles).map(
                                      ([index, item]) => (
                                        <li>
                                          <div className="select-multiple-option">
                                            <input
                                              type="checkbox"
                                              id={`custom-checkbox-articles-${index}`}
                                              name="articles[]"
                                              value={index}
                                              checked={
                                                typeof selectedarticles !==
                                                  "undefined" &&
                                                selectedarticles.indexOf(
                                                  item
                                                ) !== -1
                                              }
                                              onChange={() =>
                                                handleOnArticleChange(item)
                                              }
                                            />
                                            <span className="checkmark"></span>
                                          </div>
                                          {item}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}



                            {"reader_selection" in filters &&
                              Object.keys(filters.reader_selection).length > 0 &&
                              showhidearticle == 1 && (
                                <>
                                  <div className="col block-smart-name">
                                    <h6>Reader Selection</h6>
                                    <div className="smart-name-list">
                                      <ul>
                                        {Object.entries(
                                          filters.reader_selection
                                        ).map(([index, item]) => (
                                          <li>
                                            <div className="select-multiple-option">
                                              <input
                                                type="radio"
                                                id={`custom-checkbox-reader_selection-${index}`}
                                                name="reader_selection[]"
                                                value={item}
                                                checked={
                                                  selectedreaderselection == item
                                                }
                                                onChange={() =>
                                                  handleOnReaderSelectionChange(
                                                    item
                                                  )
                                                }
                                              />
                                              <span className="checkmark"></span>
                                            </div>
                                            {item}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </>
                              )}

                              {"ibu" in filters &&
                                Object.keys(filters.ibu).length > 0 && (selectedreaderselection == "CIS Reader" || selectedreaderselection =="All User") && (
                                  <>
                                    <div className="col block-smart-name">
                                      <h6>IBU</h6>
                                      <div className="smart-name-list">
                                        <ul>
                                          {Object.entries(filters.ibu).map(
                                            ([index, item]) => (
                                              <li>
                                                <div className="select-multiple-option">
                                                  <input
                                                    type="radio"
                                                    id={`custom-checkbox-ibu-${index}`}
                                                    name="ibu[]"
                                                    value={item}
                                                    checked={selectedibu == item}
                                                    onChange={() =>
                                                      handleOnIbuChange(item)
                                                    }
                                                  />
                                                  <span className="checkmark"></span>
                                                </div>
                                                {item}
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      </div>
                                    </div>
                                  </>
                                )}

                        {showhidearticle == 1 &&
                        localStorage.getItem("user_id") ==
                          "56Ek4feL/1A8mZgIKQWEqg==" ? (
                          <div className="col block-smart-name">
                            <h6>Reading/Viewing completed</h6>
                            <div className="smart-name-list">
                              <ul>
                                <li>
                                  <div className="select-multiple-option">
                                    <input
                                      type="radio"
                                      id="bounce_yes"
                                      name="bounce"
                                      value="yes"
                                      checked={
                                        typeof selectedArticleCompleted !==
                                          "undefined" &&
                                        selectedArticleCompleted == "yes"
                                      }
                                      onChange={() =>
                                        handleArticleCompleted("yes")
                                      }
                                    />
                                    <span className="checkmark"></span>
                                  </div>
                                  Yes
                                </li>
                                <li>
                                  <div className="select-multiple-option">
                                    <input
                                      type="radio"
                                      id="bounce_no"
                                      name="bounce"
                                      value="no"
                                      checked={
                                        typeof selectedArticleCompleted !==
                                          "undefined" &&
                                        selectedArticleCompleted == "no"
                                      }
                                      onChange={() =>
                                        handleArticleCompleted("no")
                                      }
                                    />
                                    <span className="checkmark"></span>
                                  </div>
                                  No
                                </li>
                              </ul>
                            </div>
                          </div>
                        ) : null}

                        {localStorage.getItem("user_id") ==
                          "56Ek4feL/1A8mZgIKQWEqg==" && (
                          <>
                            <div className="col block-smart-name 21">
                              <h6>Trial registered ?</h6>
                              <ul>
                                <li>
                                  <div className="select-multiple-option">
                                    <input
                                      type="radio"
                                      id="trial_yes"
                                      name="trial"
                                      value="yes"
                                      checked={
                                        typeof selectedTrialRegister !==
                                          "undefined" &&
                                        selectedTrialRegister == "yes"
                                      }
                                      onChange={() =>
                                        handleTrialRegister("yes")
                                      }
                                    />
                                    <span className="checkmark"></span>
                                  </div>
                                  Yes
                                </li>
                                <li>
                                  <div className="select-multiple-option">
                                    <input
                                      type="radio"
                                      id="trial_no"
                                      name="trial"
                                      value="no"
                                      checked={
                                        typeof selectedTrialRegister !==
                                          "undefined" &&
                                        selectedTrialRegister == "no"
                                      }
                                      onChange={() => handleTrialRegister("no")}
                                    />
                                    <span className="checkmark"></span>
                                  </div>
                                  No
                                </li>
                              </ul>
                            </div>
                          </>
                        )}

                        {/*
                          <div className="col block-smart-name">
                          {localStorage.getItem("user_id") ==
                          "56Ek4feL/1A8mZgIKQWEqg==" && selectedIrt == "Training" &&(
                            <>
                              <h6>Training Completed</h6>
                              <ul>
                                <li>
                                  <div className="select-multiple-option">
                                    <input
                                      type="radio"
                                      value="yes"
                                      id="content_read"
                                      name="content_read"
                                      checked={selectedContentRead == "yes"}
                                      onChange={() => handleContentRead("yes")}
                                    />
                                    <span className="checkmark"></span>
                                  </div>
                                  Yes
                                </li>
                                <li>
                                  <div className="select-multiple-option">
                                    <input
                                      type="radio"
                                      value="no"
                                      checked={selectedContentRead == "no"}
                                      onChange={() => handleContentRead("no")}
                                    />
                                    <span className="checkmark"></span>
                                  </div>
                                  No
                                </li>
                              </ul>
                            </>
                          )}
                        </div>*/}
                        {/*Display only in case of create*/}

                        <div className="segmentation-button">
                          {/* {typeof props.action !== "undefined" &&
                            props.action !== "edit" && ( */}
                              <button
                                className="btn btn-bordered btn-primary"
                                onClick={clearFilter}
                              >
                                Clear
                              </button>
                            {/* )} */}
                          <button
                            className="btn btn-filled btn-primary"
                            onClick={(e) => applyFilter(1)}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </div>
        </div>

        <div className="apply-filter">
          <h6>
            Selected Criterias{" "}
            <span>
              |
              {/* {typeof getfilterdata !== "undefined" && getfilterdata.length > 0
                ? getfilterdata.length
                : 0} */}
            </span>
          </h6>
          <div className="filter-block">
            <div className="filter-block-left w-100">
              {updateflag > 0 ? (
                typeof selectedmarketingcontacttype === "object" &&
                selectedmarketingcontacttype.length > 0 ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>Contact type |</span>
                    </div>
                    <div className="filter-div-list">
                      {Object.entries(selectedmarketingcontacttype).map(
                        ([index, item]) => (
                          <div className="filter-result">
                            {item}
                            <img
                              onClick={() =>
                                removeindividualfilter(
                                  "marketingcontacttype",
                                  item
                                )
                              }
                              src={path_image + "filter-close.svg"}
                              alt="Close-filter"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ) : null
              ) : null}

              {updateflag > 0 ? (
                typeof selectedcountry === "object" &&
                selectedcountry.length > 0 ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>Country |</span>
                    </div>

                    <div className="filter-div-list">
                      {selectedcountry?.includes("All") ? (
                        <div className="filter-result">
                          {"All"}{" "}
                          <img
                            onClick={() =>
                              removeindividualfilter("country", "All")
                            }
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                        </div>
                      ) : (
                        Object.entries(selectedcountry).map(([index, item]) => (
                          <div className="filter-result">
                            {item == "B&H" ? "Bosnia and Herzegovina" : item}{" "}
                            <img
                              onClick={() =>
                                removeindividualfilter("country", item)
                              }
                              src={path_image + "filter-close.svg"}
                              alt="Close-filter"
                            />
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ) : null
              ) : null}

              {updateflag > 0 ? (
                typeof selectedcompany === "object" &&
                selectedcompany.length > 0 ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>Company |</span>
                    </div>
                    <div className="filter-div-list">
                      {selectedcompany?.includes("All") ? (
                        <div className="filter-result">
                          {"ALL"}
                          <img
                            onClick={() =>
                              removeindividualfilter("company", "All")
                            }
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                        </div>
                      ) : (
                        Object.entries(selectedcompany).map(([index, item]) => (
                          <div className="filter-result">
                            {item}
                            <img
                              onClick={() =>
                                removeindividualfilter("company", item)
                              }
                              src={path_image + "filter-close.svg"}
                              alt="Close-filter"
                            />
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ) : null
              ) : null}

              {updateflag > 0 ? (
                typeof selectedprovince === "object" &&
                selectedprovince.length > 0 ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>Province |</span>
                    </div>
                    <div className="filter-div-list">
                      {Object.entries(selectedprovince).map(([index, item]) => (
                        <div className="filter-result">
                          {item}
                          <img
                            onClick={() =>
                              removeindividualfilter("province", item)
                            }
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null
              ) : null}

              {updateflag > 0 ? (
                typeof selectedterritory === "object" &&
                selectedterritory.length > 0 ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>Territory |</span>
                    </div>
                    <div className="filter-div-list">
                      {Object.entries(selectedterritory).map(
                        ([index, item]) => (
                          <div className="filter-result">
                            {item}
                            <img
                              onClick={() =>
                                removeindividualfilter("territory", item)
                              }
                              src={path_image + "filter-close.svg"}
                              alt="Close-filter"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ) : null
              ) : null}

              {updateflag > 0 ? (
                typeof selectedcontacttype === "object" &&
                selectedcontacttype.length > 0 ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>Contact type |</span>
                    </div>
                    <div className="filter-div-list">
                      {Object.entries(selectedcontacttype).map(
                        ([index, item]) => (
                          <div className="filter-result">
                            {item}{" "}
                            <img
                              onClick={() =>
                                removeindividualfilter("contact_type", item)
                              }
                              src={path_image + "filter-close.svg"}
                              alt="Close-filter"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ) : null
              ) : null}

              {updateflag > 0 ? (
                typeof selectedspeciality === "object" &&
                selectedspeciality.length > 0 ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>Speciality |</span>
                    </div>
                    <div className="filter-div-list">
                      {selectedspeciality?.includes("All") ? (
                        <div className="filter-result">
                          {"All"}{" "}
                          <img
                            onClick={() =>
                              removeindividualfilter("speciality", "All")
                            }
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                        </div>
                      ) : (
                        Object.entries(selectedspeciality).map(
                          ([index, item]) => (
                            <div className="filter-result">
                              {item}{" "}
                              <img
                                onClick={() =>
                                  removeindividualfilter("speciality", item)
                                }
                                src={path_image + "filter-close.svg"}
                                alt="Close-filter"
                              />
                            </div>
                          )
                        )
                      )}
                    </div>
                  </div>
                ) : null
              ) : null}

              {updateflag > 0 ? (
                typeof selectedproduct === "object" &&
                selectedproduct.length > 0 ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>Products |</span>
                    </div>
                    <div className="filter-div-list">
                      {Object.entries(selectedproduct).map(([index, item]) => (
                        <div className="filter-result">
                          {item}{" "}
                          <img
                            onClick={() =>
                              removeindividualfilter("product", item)
                            }
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null
              ) : null}

              {updateflag > 0 ? (
                typeof selectedarticles === "object" &&
                selectedarticles.length > 0 ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      {localStorage.getItem("user_id") ==
                      "56Ek4feL/1A8mZgIKQWEqg==" ? (
                        <>
                          <span>Library |</span>
                        </>
                      ) : (
                        <>
                          <span>Articles |</span>
                        </>
                      )}
                    </div>
                    <div className="filter-div-list">
                      {Object.entries(selectedarticles).map(([index, item]) => (
                        <div className="filter-result">
                          {item}{" "}
                          <img
                            onClick={() =>
                              removeindividualfilter("article", item)
                            }
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null
              ) : null}

              {updateflag > 0 ? (
                typeof selectedconsent === "object" &&
                selectedconsent.length > 0 ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>Consent |</span>
                    </div>
                    <div className="filter-div-list">
                      {selectedconsent?.includes("All") ? (
                        <div className="filter-result">
                          {"All"}{" "}
                          <img
                            onClick={() =>
                              removeindividualfilter("consent", "All")
                            }
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                        </div>
                      ) : (
                        Object.entries(selectedconsent).map(([index, item]) => (
                          <div className="filter-result">
                            {item}{" "}
                            <img
                              onClick={() =>
                                removeindividualfilter("consent", item)
                              }
                              src={path_image + "filter-close.svg"}
                              alt="Close-filter"
                            />
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ) : null
              ) : null}

              {updateflag > 0 ? (
                selectedreaderselection ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>Reader Selection |</span>
                    </div>
                    <div className="filter-div-list">
                      <div className="filter-result">
                        {selectedreaderselection}{" "}
                        <img
                          onClick={() =>
                            removeindividualfilter(
                              "reader_selection",
                              selectedreaderselection
                            )
                          }
                          src={path_image + "filter-close.svg"}
                          alt="Close-filter"
                        />
                      </div>
                    </div>
                  </div>
                ) : null
              ) : null}

              {updateflag > 0 ? (
                typeof selectedinvestigatorType === "object" &&
                selectedinvestigatorType.length > 0 ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>IRT role |</span>
                    </div>
                    <div className="filter-div-list">
                      {selectedinvestigatorType?.includes("All") ? (
                        <div className="filter-result">
                          {"All"}{" "}
                          <img
                            onClick={() =>
                              removeindividualfilter("investigator_type", "All")
                            }
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                        </div>
                      ) : (
                        Object.entries(selectedinvestigatorType).map(
                          ([index, item]) => (
                            <div className="filter-result">
                              {item}{" "}
                              <img
                                onClick={() =>
                                  removeindividualfilter(
                                    "investigator_type",
                                    item
                                  )
                                }
                                src={path_image + "filter-close.svg"}
                                alt="Close-filter"
                              />
                            </div>
                          )
                        )
                      )}
                    </div>
                  </div>
                ) : null
              ) : null}

              {updateflag > 0 ? (
                typeof selectedSubRole === "object" &&
                selectedSubRole.length > 0 ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>Study roles |</span>
                    </div>
                    <div className="filter-div-list">
                      {selectedSubRole?.includes("All") ? (
                        <div className="filter-result">
                          {"All"}{" "}
                          <img
                            onClick={() =>
                              removeindividualfilter("sub_role", "All")
                            }
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                        </div>
                      ) : (
                        Object.entries(selectedSubRole).map(([index, item]) => (
                          <div className="filter-result">
                            {item}{" "}
                            <img
                              onClick={() =>
                                removeindividualfilter("sub_role", item)
                              }
                              src={path_image + "filter-close.svg"}
                              alt="Close-filter"
                            />
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ) : null
              ) : null}


              {/*updateflag > 0 ? (
                selectedBlindType?.length > 0 ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>Blind type |</span>
                    </div>
                    <div className="filter-div-list">
                      <div className="filter-result">
                        {selectedBlindType}
                        <img
                          onClick={() =>
                            removeindividualfilter(
                              "blind_type",
                              selectedBlindType
                            )
                          }
                          src={path_image + "filter-close.svg"}
                          alt="Close-filter"
                        />
                      </div>
                    </div>
                  </div>
                ) : null
                        ) : null*/}

              {updateflag > 0 ? (
                typeof selectedcampaign === "object" &&
                selectedcampaign.length > 0 ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>Campaign |</span>
                    </div>
                    <div className="filter-div-list">
                      {Object.entries(selectedcampaign).map(([index, item]) => (
                        <div className="filter-result">
                          {filters.campaign_listing[item]}{" "}
                          <img
                            onClick={() =>
                              removeindividualfilter("campaign", item)
                            }
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null
              ) : null}

              {updateflag > 0 ? (
                typeof selectedcampaign === "object" &&
                typeof selectedReadOpen !== "undefined" &&
                selectedcampaign.length > 0 ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>Campaign? |</span>
                    </div>
                    <div className="filter-div-list">
                      <div className="filter-result">
                        {selectedReadOpen}
                        <img
                          onClick={() =>
                            removeindividualfilter(
                              "campaign_status",
                              selectedReadOpen
                            )
                          }
                          src={path_image + "filter-close.svg"}
                          alt="Close-filter"
                        />
                      </div>
                    </div>
                  </div>
                ) : null
              ) : null}

              {updateflag > 0 ? (
                typeof selectedsitenumber === "object" &&
                selectedsitenumber.length > 0 ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>Site number |</span>
                    </div>
                    <div className="filter-div-list">
                      {selectedsitenumber?.includes("All") ? (
                        <div className="filter-result">
                          {"All"}{" "}
                          <img
                            onClick={() =>
                              removeindividualfilter("site_number", "All")
                            }
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                        </div>
                      ) : (
                        Object.entries(selectedsitenumber).map(
                          ([index, item]) => (
                            <div className="filter-result">
                              {item}{" "}
                              <img
                                onClick={() =>
                                  removeindividualfilter("site_number", item)
                                }
                                src={path_image + "filter-close.svg"}
                                alt="Close-filter"
                              />
                            </div>
                          )
                        )
                      )}
                    </div>
                  </div>
                ) : null
              ) : null}

              {localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" ? (
                updateflag > 0 ? (
                  selectedArticleCompleted != "" && showhidearticle == 1 ? (
                    <div className="filter-div">
                      <div className="filter-div-title">
                        <span>Reading/Viewing completed |</span>
                      </div>
                      <div className="filter-div-list">
                        <div className="filter-result">
                          {selectedArticleCompleted}{" "}
                          <img
                            onClick={() =>
                              removeindividualfilter(
                                "selectedArticleCompleted",
                                selectedArticleCompleted
                              )
                            }
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                        </div>
                      </div>
                    </div>
                  ) : null
                ) : null
              ) : null}

              {updateflag > 0 ? (
                typeof selectedsitename === "object" &&
                selectedsitename.length > 0 ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>Site name |</span>
                    </div>
                    <div className="filter-div-list">
                      {selectedsitename?.includes("All") ? (
                        <div className="filter-result">
                          {"All"}{" "}
                          <img
                            onClick={() =>
                              removeindividualfilter("site_name", "All")
                            }
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                        </div>
                      ) : (
                        Object.entries(selectedsitename).map(
                          ([index, item]) => (
                            <div className="filter-result">
                              {item}{" "}
                              <img
                                onClick={() =>
                                  removeindividualfilter("site_name", item)
                                }
                                src={path_image + "filter-close.svg"}
                                alt="Close-filter"
                              />
                            </div>
                          )
                        )
                      )}
                    </div>
                  </div>
                ) : null
              ) : null}
              {/* </div> */}

              {/*Right Block*/}
              {/* <div className="filter-block-right"> */}
              {updateflag > 0 ? (
                selectedibu ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>IBU |</span>
                    </div>
                    <div className="filter-div-list">
                      <div className="filter-result">
                        {selectedibu}{" "}
                        <img
                          onClick={() =>
                            removeindividualfilter("ibu", selectedibu)
                          }
                          src={path_image + "filter-close.svg"}
                          alt="Close-filter"
                        />
                      </div>
                    </div>
                  </div>
                ) : null
              ) : null}

              {updateflag > 0 ? (
                selectedregister ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>Registered |</span>
                    </div>
                    <div className="filter-div-list">
                      <div className="filter-result">
                        {selectedregister}{" "}
                        <img
                          onClick={() =>
                            removeindividualfilter("register", selectedregister)
                          }
                          src={path_image + "filter-close.svg"}
                          alt="Close-filter"
                        />
                      </div>
                    </div>
                  </div>
                ) : null
              ) : null}

              {updateflag > 0 ? (
                selectedbounce ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>Bounced |</span>
                    </div>
                    <div className="filter-div-list">
                      <div className="filter-result">
                        {selectedbounce}{" "}
                        <img
                          onClick={() =>
                            removeindividualfilter("bounce", selectedbounce)
                          }
                          src={path_image + "filter-close.svg"}
                          alt="Close-filter"
                        />
                      </div>
                    </div>
                  </div>
                ) : null
              ) : null}

              {updateflag > 0 ? (
                selectedContentRead && selectedIrt == "Training" ? (
                  <div className="filter-div">
                    <div className="filter-div-title">
                      <span>Training completed |</span>
                    </div>
                    <div className="filter-div-list">
                      <div className="filter-result">
                        {selectedContentRead}{" "}
                        <img
                          onClick={() =>
                            removeindividualfilter(
                              "selectedContentRead",
                              selectedContentRead
                            )
                          }
                          src={path_image + "filter-close.svg"}
                          alt="Close-filter"
                        />
                      </div>
                    </div>
                  </div>
                ) : null
              ) : null}

              {localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" ? (
                updateflag > 0 ? (
                  selectedIrt ? (
                    <div className="filter-div">
                      <div className="filter-div-title">
                        <span>IRT mandatory training |</span>
                      </div>
                      <div className="filter-div-list">
                        <div className="filter-result">
                          {selectedIrt}{" "}
                          <img
                            onClick={() =>
                              removeindividualfilter("irt", selectedIrt)
                            }
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                        </div>
                      </div>
                    </div>
                  ) : null
                ) : null
              ) : null}

              {localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" ? (
                updateflag > 0 ? (
                  selectedTrialRegister ? (
                    <div className="filter-div">
                      <div className="filter-div-title">
                        <span>Trial register ? |</span>
                      </div>
                      <div className="filter-div-list">
                        <div className="filter-result">
                          {selectedTrialRegister}{" "}
                          <img
                            onClick={() =>
                              removeindividualfilter(
                                "trialregister",
                                selectedTrialRegister
                              )
                            }
                            src={path_image + "filter-close.svg"}
                            alt="Close-filter"
                          />
                        </div>
                      </div>
                    </div>
                  ) : null
                ) : null
              ) : null}
            </div>
          </div>
        </div>
        {console.log(apifilterflag,loadMoreFlag)}                     
        {apifilterflag > 0 ? (
          (typeof getfilterdata === "object" && getfilterdata.length > 0) ||
          (typeof getNewAddedUser === "object" &&
            getNewAddedUser.length > 0) ? (
            <div className="box mt-2">
              <Table
                ref={tableCompRef}
                data={getfilterdata}
                newAddedUser={getNewAddedUser}
                smartListName={listname}
                upload_by_filter="1"
                filter_payload={getpayload}
                creator={props.creator}
                listcount = {totalLostCount ? totalLostCount : 0}
                ibu={props.ibu}
                sendDataToParent={sendDataToParent}
              />
              {
                loadMorePage && totalLostCount > getfilterdata?.length ?
                  dataFromComp == "edit" ?
                    <button className="btn btn-primary" onClick={handleLoadMore}>
                      Load More
                    </button>
                  : 
                    <button className="btn btn-primary" onClick={(e) => applyFilter(2)}>
                      Load More
                    </button>
                : null  
              }
              {
                loadMoreFlag ? 
                <div
                  className="load_more"
                  style={{
                    margin: "0 auto",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <Spinner color="#53aff4" size={32} speed={1} animating={true} />
                </div>
                : null
              }

            </div>
          ) : (
            <div className="box mt-2 no_found">
              <p>No Data Found</p>
            </div>
          )
        ) : null}
      </section>

      {/*Confrimation Popup start*/}
      <Modal
        show={confirmationPopupStatus}
        className="send-confirm"
        id="resend-confirm"
      >
        <Modal.Header>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={() => {
              hideconfirmationpopup();
            }}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <img src={path_image + "alert.png"} alt="" />
          <h4>Are you sure you want to save the changes?</h4>
          <div className="modal-buttons">
            <button
              type="button"
              className="btn btn-primary btn-filled"
              data-bs-dismiss="modal"
              onClick={() => {
                createListWithFilters("update");
              }}
            >
              Yes Please!
            </button>
            <button
              type="button"
              className="btn btn-primary btn-bordered light"
              data-bs-dismiss="modal"
              onClick={() => {
                hideconfirmationpopup();
              }}
            >
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>
      {/*Confrimation Popup end*/}
    </>
  );
};

export default FilterSegment;
