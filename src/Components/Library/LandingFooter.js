import React,{useState} from 'react'
import { Container, Row,Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LandingFooter = () => {
    const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    const [privacyshow, setPrivacyshow] = useState(false);

    const handleClose = () => {
          setPrivacyshow(false);
      };
      const handleShow = () => {
          setPrivacyshow(true);
      };
  return (
    <>
     <div className='footer'>
        <Container>
            <Row>
                <div className='footer-inset'>
                    <div className='footer-logo'>
                        <img src={path_image +"footer-logo.svg"} alt="" />
                    </div>
                    <div className='copyright'>
                        <p>Copyright MedArkive Ltd 2023. Read our <Link onClick={(e) => handleShow("privacy")}>Privacy Policy</Link> and <Link target="_blank "to="https://albert.docintel.app/terms_of_use/">Terms of Use</Link></p>
                    </div>
                    <Modal show={privacyshow} onHide={(e) => handleClose("privacy")}>
                    <Modal.Header closeButton>
                    <Modal.Title>Privacy Policy</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div className="privacy_policy_modal">
                        <p>
                        MedArkive is committed to protecting your personal information.
                        </p>
                        <p>
                        This Policy explains what personal information MedArkive Ltd
                        ("MedArkive", "we", "us", "our") collects from you through our
                        platform, how we use the information and how we keep it secure.
                        </p>
                        <p>This statement applies to our website and apps.</p>
                        <p>
                        This policy applies as between you, the user of this website, and
                        MedArkive the owner and provider of this website. Our Privacy
                        Policy does not extend to any websites that can be accessed from
                        our website including, but not limited to, any links we may
                        provide on social media websites.
                        </p>
                        <ol start="1">
                        <li dir="ltr">Data Protection Law</li>
                        </ol>
                        <p>
                        MedArkive is committed to complying with the data protection law.
                        We adhere to the law by ensuring that the data you provide us will
                        be:
                        </p>
                        <ul>
                        <li>Processed lawfully, fairly and in a transparent manner;</li>
                        <li>
                            Collected for specific, explicit and legitimate purposes and not
                            further processed in a manner that is incompatible with those
                            purposes;
                        </li>
                        <li>
                            Adequate, relevant and limited to what is necessary for those
                            purposes;
                        </li>
                        <li>Accurate and, where necessary, kept up to date;</li>
                        <li>
                            Kept in a form which permits identification of data subject for
                            no longer than is necessary for the purposes for which the
                            personal data is processed;
                        </li>
                        <li>
                            Processed in a manner that ensures appropriate security of the
                            personal data.
                        </li>
                        </ul>
                        <ol start="2">
                        <li dir="ltr">Collecting Personal Information</li>
                        </ol>
                        <p>
                        MedArkive acts as the processor of the information you provide.
                        </p>
                        <p>
                        We process the information for legitimate business purposes and to
                        help our clients provide our users with tailored content aimed at
                        improving their professional development and knowledge.
                        <br />
                        If you decide not to provide us with your personal data you may
                        not be able to use some of our platform and/or services.
                        </p>
                        <ol start="3">
                        <li dir="ltr">Data Collected</li>
                        </ol>
                        <p>The following data may be collected by MedArkive:</p>
                        <ol start="a" className="list-ol">
                        <li>name;</li>
                        <li>date of birth;</li>
                        <li>gender;</li>
                        <li>job title;</li>
                        <li>profession;</li>
                        <li>
                            contact information such as email addresses and/or telephone
                            numbers;
                        </li>
                        <li>
                            demographic information such as post code, preferences and
                            interests;
                        </li>
                        <li>IP address (automatically collected);</li>
                        <li>web browser type and version (automatically collected);</li>
                        <li>operating system (automatically collected);</li>
                        <li>
                            {" "}
                            a list of URLs starting with a referring site, your activity on
                            this Website, and the site you exit to (automatically
                            collected).
                        </li>
                        </ol>
                        <br />
                        <ol start="4">
                        <li dir="ltr">How We Use Data</li>
                        </ol>
                        <p>
                        MedArkive uses your personal information for the following
                        reasons:
                        </p>

                        <ul>
                        <li>
                            To operate effectively as a business and to perform essential
                            business operations, including providing products optimised for
                            medical professionals
                        </li>
                        </ul>

                        <p dir="ltr">
                        We are motivated to provide products which offer outstanding
                        resources for medical professionals, including sponsored content.
                        To enhance your enjoyment and productivity on our platform, we
                        endeavour to identify and improve our services. To ensure your
                        experience with our products is seamless, we continuously
                        re-examine and iteratively optimise user journeys on our platform.
                        We infer your location from your device IP address in order to geo
                        restrict certain content on our platform and ensure smooth access
                        for you without the need to re-login when avoidable, and aid
                        content selection for sponsors of content. Product issues,
                        identified by users and communicated through customer support, are
                        effectively diagnosed and resolved using data collected from
                        interactions on the platform. Decisions on product development and
                        evaluations of product performance are based on aggregate analysis
                        and business intelligence based on non-personal data.
                        <br />
                        All our clients and partners are required to take appropriate
                        security measures to protect your personal data in line with
                        national legislation and policies of the countries they reside in.
                        No matter which country our clients reside in MedArkive will
                        always treat personal data as a minimum with a level corresponding
                        to the General Data Protection Regulation. This means that you
                        will have the rights as set out in clause 5 (below) and have the
                        right to disclosure, erasure etc. from MedArkive's database.
                        <br />
                        Should you wish to exercise your right to be forgotten we will
                        erase all data about you in both platforms and request the data
                        controller to do the same. However, where consent was given we
                        keep a record of this for disclosures under legal requirements,
                        but we will delete all other data collected.
                        <br />
                        In addition to the specific disclosure of personal data set out in
                        this section, we may disclose your personal data where such
                        disclosure is necessary for compliance with a legal obligation to
                        which we are subject, or in order to protect your vital interests
                        or the vital interests of another natural person. We may also
                        disclose your personal data where such disclosure is necessary for
                        the establishment, exercise or defence of legal claims, whether in
                        court proceedings or in an administrative or out-of-court
                        procedure.
                        </p>
                        <ul>
                        <li className="change_li">
                            To deliver communications of personal interest including product
                            and content releases, motivational prompts and in response to
                            product queries or support requests.
                        </li>
                        </ul>

                        <p dir="ltr">
                        Direct communications
                        <br />
                        Communications sent by MedArkive come in the form of emails to the
                        email address provided by you during the registration process and
                        through notifications delivered to your device. MedArkive may send
                        you communications relating to new and existing product and
                        content releases and updates. We send such communications so that
                        you are aware of changes we are making to the content or features
                        of our products, or new releases, which could affect the
                        usefulness of our core services to you. You, of course, have the
                        right to opt out of such email communication at any time by using
                        the unsubscribe link, found at the bottom of every email.
                        <br />
                        Third party communications.
                        <br />
                        Our clients contact you in various ways and deliver content hosted
                        by MedArkive. They will do this under their own set of regulations
                        depending on your relationship with them, which will be
                        independent from MedArkive. We may also from time to time push
                        free sponsored content from our clients into your account. You can
                        always delete content received in your account.
                        </p>
                        <ul>
                        <li className="change_li">
                            To inform commercial partners and clients of engagement and
                            interactions on sponsored content hosted on our platform
                        </li>
                        </ul>
                        <p dir="ltr">
                        When you receive content hosted by MedArkive and sponsored by our
                        clients, such as medical device companies and pharmaceutical
                        companies, they are the data controllers. As data controllers they
                        will have control over your private data which we will host in our
                        inforMed.pro platform and what is done with the data is their
                        decision.
                        <br />
                        The data controllers will have access to see your name, email, IP
                        address, what you read and when, but they will never see your
                        password. Each data controller will only see the data that is in
                        relation to what each of them have sponsored. Only MedArkive and
                        you can see all the content you have engaged with. You can find it
                        in the reading list under your CPD Log in the apps. Should you
                        contact us about your right to disclosure, erasure etc. we will
                        delete what we can from our database and inform each data
                        controller about your desire to be forgotten. We will inform you
                        who has received any personal data about you so that you may
                        contact them for further erasure.
                        <br />
                        <br />
                        Our aim with processing your private data is to help our clients
                        to identify better content that is more suited to help you in your
                        professional capacity.
                        <br />
                        <br />
                        To the extent that the legal basis for our processing of your
                        personal information is consent, you have the right to withdraw
                        that consent at any time by emailing dpo@medarkive.com. Withdrawal
                        will not affect the lawfulness of processing before the
                        withdrawal.
                        </p>
                        <ol start="5">
                        <li dir="ltr">Accessing your personal data</li>
                        </ol>

                        <p>Under the data protection legislation you have:</p>
                        <ul>
                        <li>the right to be informed;</li>
                        <li>the right to access;</li>
                        <li>the right to rectification;</li>
                        <li>the right to erasure;</li>
                        <li>the right to restrict processing;</li>
                        <li>the right to object; and</li>
                        <li>
                            rights in relation to automated decision making and profiling.
                        </li>
                        </ul>

                        <p dir="ltr">
                        <span>
                            To learn more about your rights you should consult the data
                            protection legislation and the country guidance from the
                            relevant supervisory authority.
                            <br />
                            <br />
                            Upon written request to our data protection officer we will
                            provide you with information about what personal data we hold
                            about you. To be able to process your request we may ask you to
                            verify your identity or ask more information about your request.
                            Where we are legally permitted to do so, we may decline your
                            request but we will explain why if we do so. <br />
                            <br /> You have the right to lodge a complaint with a
                            supervisory authority if you think that our processing of your
                            personal data infringes data protection laws.
                        </span>
                        </p>
                        <ol start="6">
                        <li dir="ltr">Data Retention</li>
                        </ol>
                        <p dir="ltr">
                        <span>
                            MedArkive will retain personal data for as long as necessary to
                            fulfil our aim of improving content provided to you.
                        </span>
                        </p>
                        <ol start="7">
                        <li dir="ltr">Securing Your Information</li>
                        </ol>

                        <p dir="ltr">
                        Data security is of great importance to MedArkive and to protect
                        your data we have put in place suitable physical, electronic and
                        managerial procedures to safeguard and secure data collected via
                        our website and our apps.
                        <br />
                        Our main office is located in England, UK. We also have affiliate
                        offices situated in the EU and in India. We are hosting all
                        content and personal data on servers within the EU. Our clients
                        are based all over the world. As such we may transfer data across
                        the globe, but will always abide by English data protection
                        legislation and as a minimum The General Data Protection
                        Regulation.
                        </p>
                        <ol start="8">
                        <li dir="ltr">Third Party Websites and Services</li>
                        </ol>

                        <p dir="ltr">
                        MedArkive may, from time to time, employ the services of other
                        parties for dealing with matters that may include, but are not
                        limited to, delivery of sponsored items, search engine facilities,
                        advertising and marketing. The providers of such services may have
                        access to certain personal data provided by users of this website.
                        <br />
                        Any data used by such parties is used only to the extent required
                        by them to perform the services that MedArkive requests. Any use
                        for other purposes is strictly prohibited. Furthermore, any data
                        that is processed by third parties shall be processed within the
                        terms of this Policy and in accordance with the data protection
                        legislation.
                        </p>

                        <ol start="9">
                        <li dir="ltr">Links to Other Websites</li>
                        </ol>
                        <p dir="ltr">
                        This website may, from time to time, provide links to other
                        websites. MedArkive has no control over such websites and is in no
                        way responsible for the content thereof. This Policy does not
                        extend to your use of such websites. Users are advised to read the
                        privacy policy or statement of other websites prior to using them.
                        </p>

                        <ol start="10">
                        <li dir="ltr">Changes of Business Ownership and Control</li>
                        </ol>
                        <p dir="ltr">
                        MedArkive may, from time to time, expand or reduce our business
                        and this may involve the sale and/or the transfer of control of
                        all or part of MedArkive. Data provided by users will, where it is
                        relevant to any part of our business so transferred, be
                        transferred along with that part and the new owner or newly
                        controlling party will, under the terms of this Policy, be
                        permitted to use the data for the purposes for which it was
                        originally supplied to us.
                        <br />
                        <br />
                        In the event that any data submitted by users is to be transferred
                        in such a manner, you will not be contacted in advance and
                        informed of the changes.
                        </p>
                        <ol start="11">
                        <li dir="ltr">Cookies</li>
                        </ol>
                        <p>
                        This website may place and access certain cookies on your
                        computer. MedArkive uses cookies to improve your experience of
                        using the website and to improve our range of products and
                        services. MedArkive has carefully chosen these cookies and has
                        taken steps to ensure that your privacy is protected and respected
                        at all times.
                        <br />
                        <br />
                        All cookies used by this website are used in accordance with
                        current English and EU cookie law.
                        <br />
                        <br />
                        Before the website places any cookies on your computer, you will
                        be presented with a message bar requesting your consent to set
                        those cookies. By giving your consent to the placing of cookies
                        you are enabling MedArkive to provide the best possible experience
                        and service to you. You may, if you wish, deny consent to the
                        placing of cookies; however certain features of the website may
                        not function fully or as intended.
                        <br />
                        <br />
                        This website uses analytics services provided by MedArkive.
                        Website analytics refers to a set of tools used to collect and
                        analyse usage statistics, enabling us to better understand how
                        users use the website. This, in turn, enables us to improve the
                        website and the products and services offered through it. You do
                        not have to allow us to use these cookies, as detailed below,
                        however, whilst our use of them does not pose any risk to your
                        privacy or your safe use of the Website it does enable us to
                        continually improve our business. Some services are only available
                        via registration and if you choose not to register we may not be
                        able to let you access some content. The reason for this can both
                        be commercial interests from sponsors of content or in order to
                        comply with local regulations such as The Physician Payments
                        Sunshine Act in the USA.
                        <br />
                        <br />
                        You can choose to enable or disable cookies in your internet
                        browser. Most internet browsers also enable you to choose whether
                        you wish to disable all cookies or only third party cookies. By
                        default, most internet browsers accept cookies but this can be
                        changed. For further details, please consult the help menu in your
                        internet browser.
                        <br />
                        <br />
                        You can choose to delete cookies at any time however you may lose
                        any information that enables you to access the website more
                        quickly and efficiently including, but not limited to,
                        personalisation settings.
                        <br />
                        <br />
                        It is recommended that you ensure that your internet browser is
                        up-to-date and that you consult the help and guidance provided by
                        the developer of your internet browser if you are unsure about
                        adjusting your privacy settings.
                        </p>
                        <ol start="12">
                        <li dir="ltr">Changes to this Policy</li>
                        </ol>
                        <p dir="ltr">
                        MedArkive reserves the right to revise this Policy as we may deem
                        necessary from time to time or as may be required by law. Any
                        changes will be immediately posted on the website and you are
                        deemed to have accepted the terms of the Policy on your first use
                        of the website following the alterations.
                        </p>
                    </div>
                    </Modal.Body>
                </Modal>
                </div>
            </Row>
        </Container>
    </div>
    </>
  )
}

export default LandingFooter