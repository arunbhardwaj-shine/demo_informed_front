let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const templates = [
  {
    template_fileName: "survey-template.jpg",
    id: 1,
    template_html: `
                  <div class="informed-survey" id="templatecapture" >
                    <div class="informed-survey-header" id ="surveyBackgroundImage" style="{#dynamic_header_background#};">
                        {#logo#}
                      <h2 style="color: {#title_color#} ;">{#main_heading#}</h2>
                    </div>
                    <div class="informed-survey-body" style="background-color:#ffffff;">
                      <div class="informed-survey-text" style="color: {#bodyTextColor#};">
                        <p style="color: {#bodyTextColor#};">{#bodyText#}</p>
                      </div>
                      <div class="informed-survey-question">
                        <form>
                          <p style="color: {#question_answer_color#}">
                            How is the weather today?
                          </p>
                          <label class="check" style="color: {#bodyTextColor#}">Sunny
                                  <input type="radio" disabled name="radio"/>
                              <span class="checkmark" style="border-color:{#question_answer_color#}">
                                     <span  style="background-color:{#question_answer_color#}">  </span>
                              </span>
                          </label>
 
                          <label class="check" style="color: {#bodyTextColor#}">Rainy
                                  <input type="radio" disabled name="radio"/>
                              <span class="checkmark" ></span>
                          </label>
 
                          <label class="check" style="color: {#bodyTextColor#}">Snowy
                                  <input type="radio" disabled name="radio"/>
                              <span class="checkmark" ></span>
                          </label>
 
                          <label class="check" style="color: {#bodyTextColor#}">Cloudy
                                  <input type="radio" disabled name="radio"/>
                              <span class="checkmark" ></span>
                          </label>
                          <div class="form-footer">
                            <button type="button" style="background: {#button_color#};">{#button_text#}</button>
                            <span style="color: {#bodyTextColor#};">{#main_footer#}</span>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
      `,
    default_values: {
      footer_color: "70899E",
      header_background_type: "color",
      template_name: "Template 1",
      header_background_color: "#004A89",
      header_background_image: "",
      main_heading: "Headline Lorem ipsum dolorsit amet consectetur Orci",
      title_color: "#ffffff",
      main_footer: "Lorem ipsum dolor sit amet consectetur 2024",
      logo: path_image + "Informed-logo-image.png",
      button_text: "Submit",
      button_color: "#004A89",
      question_answer_color: "#004A89",
      bodyTextColor: "#70899E",
      page_background_color: "#ffffff",
      logoWidth: "20",
      bodyText:
        "Welcome to our survey! Your opinions matter. Help us improve by sharing your thoughts on [topic]. Your honest responses are invaluable. Thank you for your time!",
    },
  },
  {
    template_fileName: "survey-template2.jpg",
    id: 2,
    template_html: `
      <div class="informed-survey " id="templatecapture" >
                    <div class="informed-survey-header" id ="surveyBackgroundImage" style="{#dynamic_header_background#};">
                        {#logo#}
                      <h2 style="color: {#title_color#} ;">{#main_heading#}</h2>
                    </div>
                    <div class="informed-survey-body" style="background-color: #ffffff;">
                      <div class="informed-survey-text" style="color: {#bodyTextColor#};">
                        <p style="color: {#bodyTextColor#};">{#bodyText#}</p>
                      </div>
                      <div class="informed-survey-question">
                        <form>
                          <p style="color: {#question_answer_color#}">
                            How is the weather today?
                          </p>
                          <label class="check" style="color: {#bodyTextColor#}">Sunny
                                  <input type="radio" disabled name="radio"/>
                                <span class="checkmark" style="border-color:{#question_answer_color#}">
                                     <span  style="background-color:{#question_answer_color#}">  </span>
                              </span>
                          </label>
 
                          <label class="check" style="color: {#bodyTextColor#}">Rainy
                                  <input type="radio" disabled name="radio"/>
                              <span class="checkmark"  ></span>
                          </label>
 
                          <label class="check" style="color:{#bodyTextColor#}">Snowy
                                  <input type="radio" disabled name="radio"/>
                              <span class="checkmark"  ></span>
                          </label>
 
                          <label class="check" style="color: {#bodyTextColor#}">Cloudy
                                  <input type="radio" disabled name="radio"/>
                              <span class="checkmark"  ></span>
                          </label>
                          <div class="form-footer">
                            <button type="button" style="background: {#button_color#};">{#button_text#}</button>
                            <span style="color: {#bodyTextColor#};">{#main_footer#}</span>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
`,
    default_values: {
      // // selectedTemplateClass:"informed-survey",
      footer_color: "70899E",
      header_background_type: "image",
      template_name: "Template 2",
      header_background_color: "#004A89",
      header_background_image: path_image + "header-choicec2.png",
      main_heading: "Headline Lorem ipsum dolorsit amet consectetur Orci",
      title_color: "#ffffff",
      main_footer: "Lorem ipsum dolor sit amet consectetur 2024",
      logo: path_image + "Informed-logo-image.png",
      button_text: "Submit",
      button_color: "#004A8",
      question_answer_color: "#004A89",
      bodyTextColor: "#70899E",
      page_background_color: "#ffffff",
      logoWidth: "20",
      bodyText:
        "Welcome to our survey! Your opinions matter. Help us improve by sharing your thoughts on [topic]. Your honest responses are invaluable. Thank you for your time!",
    },
  },
  {
    template_fileName: "survey-template3.jpg",
    id: 3,
    template_html: `
      <div class="informed-survey"  id="templatecapture">
                    <div class="informed-survey-header" id ="surveyBackgroundImage" style="{#dynamic_header_background#};">
                        {#logo#}
                      <h2 style="color: {#title_color#};">{#main_heading#}</h2>
                    </div>
                    <div class="informed-survey-body" style="background-color: #ffffff;">
                      <div class="informed-survey-text" style="color: {#bodyTextColor#};">
                        <p style="color: {#bodyTextColor#};">{#bodyText#}</p>
                      </div>
                      <div class="informed-survey-question">
                        <form>
                          <p style="color: {#question_answer_color#}">
                            How is the weather today?
                          </p>
                          <label class="check" style="color: {#bodyTextColor#}">Sunny
                                  <input type="radio" disabled name="radio"/>
                               <span class="checkmark" style="border-color:{#question_answer_color#}">
                                     <span  style="background-color:{#question_answer_color#}">  </span>
                              </span>
                          </label>
 
                          <label class="check" style="color: {#bodyTextColor#}">Rainy
                                  <input type="radio" disabled name="radio"/>
                              <span class="checkmark"  ></span>
                          </label>
 
                          <label class="check" style="color: {#bodyTextColor#}">Snowy
                            <input type="radio" disabled name="radio"/>
                              <span class="checkmark" ></span>
                          </label>
 
                          <label class="check" style="color: {#bodyTextColor#}">Cloudy
                            <input type="radio" disabled name="radio"/>
                              <span class="checkmark" ></span>
                          </label>
                          <div class="form-footer">
                            <button type="button" style="background: {#button_color#};">{#button_text#}</button>
                            <span style="color: {#bodyTextColor#};">{#main_footer#}</span>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
`,
    default_values: {
      // selectedTemplateClass:"informed-survey",
      footer_color: "70899E",
      header_background_type: "image",
      template_name: "Template 3",
      header_background_color: "#004A89",
      header_background_image: path_image + "template-header3.png",
      main_heading: "Headline Lorem ipsum dolorsit amet consectetur Orci",
      title_color: "#ffffff",
      main_footer: "Lorem ipsum dolor sit amet consectetur 2024",
      logo: path_image + "Informed-logo-image.png",
      button_text: "Submit",
      button_color: "#004A89",
      question_answer_color: "#004A89",
      bodyTextColor: "#70899E",
      page_background_color: "#ffffff",
      logoWidth: "20",
      bodyText:
        "Welcome to our survey! Your opinions matter. Help us improve by sharing your thoughts on [topic]. Your honest responses are invaluable. Thank you for your time!",
    },
  },
];

export default templates;
