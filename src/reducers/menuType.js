
import consentCountries from "../Components/surveybuilder/SurveyComponents/Modals/consentCountries";


let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;




export const menuType = {
  multiple: {
    accordionType: "questionTypes",
    questionId: 0,
    type: "multiple",
    question: "",
    questionDescriptionEnabled: false,
    questionDescription: "",
    isOptional: false,
    visible: true,
    optionalLabel:"(Optional)",
    answer: [
      { value: "", answerId: 0 },
      { value: "", answerId: 0 },
    ],
    style: {},
    questionNo: 0,
    addOtherChoice: false,
    extra: {
      otherChoiceLabel: "Other",
      otherChoicePlaceholderText: "",
      
    },
  },
  checkbox: {
    accordionType: "questionTypes",
    type: "checkbox",
    questionId: 0,
    question: "",
    questionDescriptionEnabled: false,
    questionDescription: "",
    visible: true,
    isOptional: false,
    optionalLabel: "(Optional)",
    answer: [
      { value: "", answerId: 0 },
      { value: "", answerId: 0 },
    ],
    style: {},
    questionNo: 1,
    addOtherChoice: false,
    extra: {
      otherChoiceLabel: "Other",
      otherChoicePlaceholderText: "",
      addAllOfTheAbove: false,
      allOfTheAboveLabel: "All of the above",
    },
  },
  dropdown: {
    accordionType: "questionTypes",
    type: "dropdown",
    visible: true,
    questionId: 0,
    question: "",
    questionDescriptionEnabled: false,
    questionDescription: "",
    isOptional: false,
    optionalLabel: "(Optional)",
    addOtherChoice: false,
    answer: [
      // { value: "", answerId: 0 },
      // { value: "", answerId: 0 },
      { value: ["", ""], answerId: 0 },
    ],
    style: {},
    extra: {
      placeholder: "Please Select",
    },
  },
  freeText: {
    accordionType: "questionTypes",
    type: "freeText",
    questionId: 0,
    question: "",
    answer: [],
    placeHolderText: "",
    visible: true,
    questionDescriptionEnabled: false,
    questionDescription: "",
    isOptional: false,
    optionalLabel: "(Optional)",
    style: {},
    extra: {
      Placeholder:"",
      maxTextLength: 20
    },
    
  },
  matrix: {
    accordionType: "questionTypes",
    type: "matrix",
    question: "",
    questionId: 0,
    visible: true,
    questionDescriptionEnabled: false,
    questionDescription: "",
    isOptional: false,
    optionalLabel: "(Optional)",
    answer: [
      {
        title: "Row 1",
        id: 0,
        answer: [
          {
            value: "Column 1",
            answerId: 0,
          },
          {
            value: "Column 2",
            answerId: 0,
          },
        ],
      }
    ],
    extra: {
      allowMultipleAnswer: false,
    },
    style: {},
  },
  rating: {
    accordionType: "questionTypes",
    type: "rating",
    visible: true,
    questionId: 0,
    question: "",
    questionDescriptionEnabled: false,
    questionDescription: "",
    isOptional: false,
    optionalLabel: "(Optional)",
    style: {},
    extra: {
      ratingScale: 5,
      ratingType: "stars",
      ratingColor: "#FAC755",
      leftSideLabel: "",
      rightSideLabel: "",
      maxRating: 5,
    },
    answer: []
  },
  heading: {
    accordionType: "commonElements",
    type: "heading",
    questionId: 0,
    visible: true,
    question: "<p>Lorem Ipsum<p>",
    questionDescriptionEnabled: false,
    questionDescription: "",
    style: {},
    answer: []
  },

  paragraph: {
    accordionType: "commonElements",
    type: "paragraph",
    questionId: 0,
    visible: true,
    question: "Paragraph",
    style: {
      color: "#004A89",
    },
    answer: []
  },

  divideLine: {
    accordionType: "commonElements",
    type: "divideLine",
    question: "DIVIDER",
    questionId: 0,
    visible: true,
    style: {
      lineStyle: "solid",
      lineWidth: 1,
      color: "#004A89",
      width: 100,
      height: 5,
    },
    answer: []
  },
  image: {
    accordionType: "commonElements",
    type: "image",
    visible: true,
    questionId: 0,
    question: path_image+"add-img.png",
    extra: {
      altText: "Image",
    },
    style: {
      width: "50",
      height: "auto",
    },
    answer: []
  },
  consent: {
    accordionType: "commonElements",
    type: "consent",
    style: {},
    questionId: 0,
    visible: true,
    question:
      "By registering to One Source you will gain access to the relevant content in accordance with the data privacy policy of ",

    extra: {
      selectedLanguage: "Octapharma | English",
      consentOptions: [
        {
          label: "Receive One Source updates and new materials from Octapharma",
          isChecked: false,
        },
        {
          label: "Receive invitations to future events.",
          isChecked: false,
        },
        {
          label: "Both of the options above.",
          isChecked: false,
        },
        {
          label: "None of the options above.",
          isChecked: false,
        },
      ],
      consentDetails: [
        {
          nameLabel: "Name",
          namePlaceholder: "Type your name",
        },
        {
          emailLabel: "Email",
          emailPlaceholder: "Type your email",
        },
        {
          countryLabel: "Country",
          countryPlaceholder: "Please Select Country",
          countryOptions: consentCountries["Octapharma | English"],
        },
      ],
      privacyLinks: [
        {
          octapharma: "https://onesource.octapharma.com/octapharma-privacy",
        },
        { docintel: "https://albert.docintel.app/privacy_policy/" },
        { termsOfUse: "https://onesource.octapharma.com/terms_of_use" },
      ],
      cookiePolicy:
        ' <p>We only use essential cookies and no data is shared with 3rd party. <a href="https://onesource.octapharma.com/octapharma-privacy" id=show-modal>Click here</a> to see the specifics.</p> <div class="copyright-links"> <a href="https://onesource.octapharma.com/octapharma-privacy" target="_blank">Octapharma Privacy Statement</a> <a href="https://albert.docintel.app/privacy_policy/" target="_blank">Docintel Privacy Policy</a> <a href="https://onesource.octapharma.com/terms_of_use" target="_blank">Terms of Use</a> </div>',
      operatingStatement:
        '<a href="https://onesource.octapharma.com/octapharma-privacy" target="_blank">Octapharma AG</a> and <a href="https://albert.docintel.app/privacy_policy/" target="_blank">Docintel.app</a> operating this page.',
    },
  },
};
