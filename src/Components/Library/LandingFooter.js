import React,{useEffect, useState} from 'react'
import { Container, Row,Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LandingFooter = () => {
    const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    const [privacyshow, setPrivacyshow] = useState(false);
    const [termshow, setTermshow] = useState(false);
    const [cookieshow, setCookieshow] = useState(false);
    const [cookieSection, setCookieSection] = useState(true)
    const [acceptedCookies, setAcceptedCookies] = useState(localStorage.getItem('acceptedCookies'));
    const [addClass,setAddClass] = useState(true)

    const handleClose = () => {
          setPrivacyshow(false);
      };
       const handleCookieClose = () => {
           setCookieshow(false);
      };
      const handleShow = () => {
          setPrivacyshow(true);
      };
      const handleTermShow = () => {
        setTermshow(true);
      }
      const handleTermClose = () => {
        setTermshow(false);
    };
      const handleCookieShow = () => {
          setCookieshow(true); 
      };
      const handleCookieSection = () => {
        setCookieSection(false)
        setAddClass(false)
      }

      const handleCookieAccept = () => {
        localStorage.setItem('acceptedCookies', 'true');
        setAcceptedCookies(true);
        setAddClass(false);
      };


      useEffect(() => {
        if(localStorage.getItem('acceptedCookies') === 'true'){
            setAddClass(false);
          } else {
            setAddClass(true);
          }
      }, []);

  return (
    <>
     <div className='footer'>
        <Container>
            <Row>
                <div className='footer-inset'>
                    <div className='footer-logo'>
                        <Link to="/">
                        <img src={path_image +"footer-logo.svg"} alt="" /></Link>
                    </div>
                    <div className='copyright'>
                        <p>Copyright MedArkive Ltd 2023. Read our <Link onClick={(e) => handleShow("privacy")}> Privacy Policy</Link> and <Link onClick={(e) => handleTermShow("term")}> Terms of Use</Link>
                        </p>
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

                    <Modal show={termshow} onHide={(e) => handleTermClose("term")}>
                    <Modal.Header closeButton>
                    <Modal.Title>Terms of Use</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div className="privacy_policy_modal">
                        <p>
                        This agreement applies as between you, the user of this website and/or the apps, 
                        and Docintel.app, the owner(s) of this website and the apps (“Service”). Your agreement to comply 
                        with and be bound by these terms is deemed to occur upon your use of the Service.
                        If you do not agree to be bound by these terms, you should stop using the Service immediately.
                        </p>
                        <ol start="1">
                        <li dir="ltr">Intellectual Property</li>
                        </ol>
                        <p>
                        Subject to the exceptions in clause 2 of these Terms of Service, all content included through the Service including,
                        but not limited to, text, graphics, logos, icons, images, sound clips, video clips, data compilations, page layout,
                        underlying code and software is the property of Docintel.app, our affiliates, or our clients. By continuing
                        to use the Service you acknowledge that such material is protected by the laws of England and Wales, international
                        intellectual property laws and other applicable laws.
                        </p>
                        <ol start="2">
                        <li dir="ltr">Intellectual Property</li>
                        </ol>
                        <p>
                        Unless otherwise indicated in the Service, the Service and all content and other materials within the Service,
                        including, but not limited to, our logo and all designs, text, graphics, logos, icons, images, photographs,
                        audio clips, content, digital downloads, data compilations, software and the selection and arrangement thereof
                        (collectively the "Content") are our property or that of our clients, licensors or are protected by English and/or international
                        copyright laws. You may not remove any notices or credits posted within the Service, or any additional information
                        contained along with any such notices and credits.
                        </p>
                        <p>
                        We grant you a limited, non-sublicensable and non-exclusive license to access and make use of the Service
                        and print to hard copy, where expressly permitted, portions of the Service for your informational, non-commercial
                        and personal use only, solely in accordance with, and subject to, these Terms and any other agreement you may enter
                        into with us or any of our clients. Such license does not include, except as and to the extent otherwise expressly
                        permitted by these Terms: (a) the collection, use, copying or distribution of any portion of the Service or the
                        Content; (b) any resale, commercial use, commercial exploitation, distribution, public performance or public
                        display of the Service or any of the Content; (c) modifying or otherwise making any derivative uses of the
                        Service or the Content, or any portion thereof; (d) use of data mining, robots or similar data gathering 
                        or extraction methods; (e) downloading (other than page caching) of any portion of the Service, the Content
                        or any information contained therein, except as expressly permitted on the Service; or (f) any use of the
                        Service or the Content other than for their intended purposes.
                        </p>
                        <p>
                        Any use of the Service or of any Content not owned by you, other than as specifically authorized herein,
                        without our prior written consent, is strictly prohibited and will terminate this license grant and constitute
                        a breach of this license grant. Such unauthorized use may also violate applicable laws, including, but not limited
                        to, copyright and trademark laws and applicable communications regulations and statutes. Unless otherwise expressly
                        stated, nothing in these Terms will be construed as conferring any license to intellectual property rights, whether
                        by estoppel, implication or otherwise. In the event any license (which is not expressly granted under these Terms)
                        is otherwise deemed to be granted to you by operation of law or otherwise, you hereby irrevocably assign to us
                        forever all right, title and interest therein, without any fee. In addition, such license will be revocable by
                        us at any time without any penalty.
                        </p>
                        <p>
                        Without our express consent, you agree that: (i) you will not use any robot, spider, other automatic device,
                        or manual process to monitor or copy the Service, or any pages or content available on the Service, for any 
                        other purpose; (ii) you will not use any device, software or routine to interfere or attempt to interfere with
                        the proper working of the Service; (iii) you will not take any action that imposes an unreasonable or disproportionately
                        large load on our infrastructure; and (iv) you will not copy, reproduce, alter, modify, create derivative works, 
                        or publicly display any content (except for your own personal, non-commercial use) from the Service.
                        </p>
                        <ol start="3">
                        <li dir="ltr">Links to Other Websites</li>
                        </ol>
                        <p>This website may contain links to other websites. Unless expressly stated, these sites are not under the
                        control of Docintel.app or that of our clients. We assume no responsibility for the content of such Websites
                        and disclaim liability for any and all forms of loss or damage arising out of the use of them. The inclusion
                        of a link to another site on this website does not imply any endorsement of the sites themselves or of those
                        in control of them.
                        </p>
                        <ol start="4">
                        <li dir="ltr">Links to this Website</li>
                        </ol>
                        <p>
                        Those wishing to place a link to this website on other sites may do so only to the home page of the
                        site www.Docintel.app.com without prior permission. Deep linking (i.e. links to specific pages within the site)
                        requires the express permission of Docintel.app. To find out more please contact us by email at support@Docintel.app.
                        </p>
                        <ol start="5">
                        <li dir="ltr">Advertising</li>
                        </ol>
                        <p>Certain pages on this Service display third party advertising. Docintel.app has neither control over,
                        nor involvement in, any third party advertising or the products and/or services featured therein.
                        </p>
                        <p>
                        Unless it is expressly stated (for reasons including, but not limited to, sponsorship), no advertising
                        shall be taken as an endorsement by Docintel.app of the products, services or any party associated therewith featured in advertising.
                        </p>
                        <p>
                        Where any advertising utilises cookies or similar technological means to gather data, it shall be governed by our Privacy Policy.
                        </p>
                        <ol start="6">
                        <li dir="ltr">Privacy Policy</li>
                        </ol>
                        <p>
                        The use of the Service is also governed by our Privacy Policy. Docintel.app’s Privacy Policy explains how we collect,
                        use, and secure personal information. By using the Service you acknowledge, and agree to, Docintel.app’s Privacy Policy.
                        </p>
                        <ol start="7">
                        <li dir="ltr">Data Retention</li>
                        </ol>

                        <p dir="ltr">
                        Docintel.app makes no warranty or representation that the Service or the Content therein will meet your requirements,
                        that they will be of satisfactory quality, that they will be fit for a particular purpose, that they will not infringe
                        the rights of third parties, that they will be compatible with all systems, or that they will be secure.
                        </p>
                        <p>
                        The opinions expressed in Content are those of their authors and do not represent the opinions of Docintel.app.
                        </p>
                        <p>
                        Whilst every reasonable endeavour has been made to ensure that all information provided in this Service will be accurate
                        and up to date, Docintel.app makes no warranty or representation that this is the case. We make no guarantee of any specific results from the use of our Service.
                        </p>
                        <p>
                        No part of this Service is intended to constitute advice and the Content of this Service should not be relied upon when making any decisions or taking any action of any kind.
                        </p>
                        <p>
                        Docintel.app makes no representation or warranty that any part of this Service is suitable for use in commercial situations or that it constitutes
                        accurate data and / or advice on which medical decisions can be based.
                        </p>
                        <p>
                        Whilst every effort has been made to ensure that all descriptions of services available from Docintel.app correspond to the actual services available,
                        Docintel.app is not responsible for any variations from these descriptions.
                        </p>
                        <p>
                        Whilst Docintel.app uses reasonable endeavours to ensure that the Service is secure and free of errors, viruses and other malware,
                        all users are advised to take responsibility for their own security, that of their personal details and their computers.
                        </p>
                        <ol start="8">
                        <li dir="ltr">Availability of the Service and Modifications</li>
                        </ol>

                        <p dir="ltr">
                        The Service is provided “as is” and on an “as available” basis. We give no warranty that the Service will be free
                        of defects and / or faults. To the maximum extent permitted by the law we provide no warranties (express or implied)
                        of fitness for a particular purpose, accuracy of information, compatibility and satisfactory quality.
                        </p>
                        <p>
                        Docintel.app accepts no liability for any disruption or non-availability of the Service resulting from external
                        causes including, but not limited to, ISP equipment failure, host equipment failure, communications network failure,
                        power failure, natural events, acts of war or legal restrictions and censorship.
                        </p>
                        <p>
                        Docintel.app reserves the right to alter, suspend or discontinue any part (or the whole of) the Service
                        including, but not limited to, the Content and/or Service available. These Terms of Service shall continue
                        to apply to any modified version of the Service unless it is expressly stated otherwise.
                        </p>

                        <ol start="9">
                        <li dir="ltr">Limitation of Liability</li>
                        </ol>
                        <p dir="ltr">
                        To the maximum extent permitted by law, Docintel.app accepts no liability for any direct or indirect loss
                        or damage, foreseeable or otherwise, including any indirect, consequential, special or exemplary damages
                        arising from the use of the Service or any information contained therein. Users should be aware that they
                        use the Service and its Content at their own risk.
                        </p>

                        <p>
                        Nothing in these terms and conditions excludes or restricts Docintel.app’s liability for death or personal
                        injury resulting from any negligence or fraud on the part of Docintel.app.
                        </p>

                        <p>
                        Whilst every effort has been made to ensure that these terms and conditions adhere strictly with the relevant
                        provisions of the Unfair Contract Terms Act 1977, in the event that any of these terms are found to be unlawful,
                        invalid or otherwise unenforceable, that term is to be deemed severed from these terms and conditions and
                        shall not affect the validity and enforceability of the remaining terms and conditions. This term
                        shall apply only within jurisdictions where a particular term is illegal.
                        </p>

                        <ol start="10">
                        <li dir="ltr">No Waiver</li>
                        </ol>
                        <p dir="ltr">
                        In the event that any party to these Terms of Service fails to exercise any right or remedy contained herein,
                        this shall not be construed as a waiver of that right or remedy.
                        </p>
                       
                        <ol start="11">
                        <li dir="ltr">Previous Terms and Conditions</li>
                        </ol>
                        <p>
                        In the event of any conflict between these Terms of Service and any prior versions thereof,
                        the provisions of these Terms of Service shall prevail unless it is expressly stated otherwise.
                        </p>
                        <ol start="12">
                        <li dir="ltr">Third Party Rights</li>
                        </ol>
                        <p dir="ltr">
                        Nothing in these Terms of Service shall confer any rights upon any third party. The agreement created by these terms is between you and Docintel.app.
                        </p>
                        <ol start="13">
                        <li dir="ltr">Communications</li>
                        </ol>
                        <p dir="ltr">
                        We will communicate with you by: (1) emailing you to the email address you registered with; 
                        (2) posting communications on our website; or (3) posting messages that will be displayed when you access the Service.
                        </p>
                        <p>
                        All communications should be provided to us by email to support@Docintel.app. Your communication
                        will be deemed received on the day of sending if the email is received in full on a business day
                        and on the next business day if the email is sent on a weekend or public holiday.
                        </p>
                        <p>
                        Docintel.app may from time to time send you information about our products and/or services.
                        If you do not wish to receive such information, please notify us via support@Docintel.app or
                        click on the “Unsubscribe” link in any email you receive from us.
                        </p>
                        <ol start="14">
                        <li dir="ltr">Termination</li>
                        </ol>
                        <p dir="ltr">
                        We reserve the right, without notice and in our sole discretion, to terminate your access to the Service,
                        and to block or prevent your future access to and use of the Service.
                        </p>
                        <ol start="15">
                        <li dir="ltr">Update to Terms of Service</li>
                        </ol>
                        <p dir="ltr">
                        Docintel.app reserves the right to change and modify any of the Terms of Service contained in these terms
                        or any policy at any time and in our sole discretion. Any changes to our terms will be effective immediately
                        upon posting in our Service. Your continued use of the Service following posting of amended terms will constitute
                        your acceptance thereof. If you do not agree with changes or modifications to our terms or policy you should stop using the Service immediately.
                        </p>
                        <ol start="16">
                        <li dir="ltr">Law and Jurisdiction</li>
                        </ol>
                        <p dir="ltr">
                        These terms and the relationship between you and Docintel.app shall be governed by and construed
                        in accordance with the Law of England and Wales and Docintel.app and you agree to submit to the
                        exclusive jurisdiction of the Courts of England and Wales.
                        </p>
                        <p>
                        These terms and conditions and the relationship between you and Docintel.app shall be governed
                        by and construed in accordance with the Law of England and Wales and Docintel.app and you agree
                        to submit to the exclusive jurisdiction of the Courts of England and Wales.
                        </p>
                    </div>
                    </Modal.Body>
                    </Modal>
                    
                </div>
            </Row>
        </Container>
        { !acceptedCookies && cookieSection && (
            <div className='cookie-popup'>
            <Container>
                <Row>
                    <div className='cookie-popup-inset d-flex justify-content-between align-items-center'>
                        <div className='cookie-popup-text'>
                            <h5>Cookies</h5>
                            <p>We use our own cookies to make re-login easier and to learn what matters to visitors. We do not share any data outside our company. To see the short list of essential cookies please <Link onClick={(e) => handleCookieShow("cookie")}>Click Here</Link>.</p>
                        </div>
                        <div className='cookie-popup-btns'>
                            <Button className="btn-filled" onClick={handleCookieAccept}>Accept</Button>
                            <Button className="btn-bordered" onClick={handleCookieSection}>Close</Button>
                        </div>
                    </div>
                </Row>     
            </Container>
        </div>
        )}
        <div className={`overlay ${addClass ? "show" : ""}`}></div>
        
        <Modal className="cookies-popup" show={cookieshow} onHide={(e) => handleCookieClose("cookie")}>
            <div className='cookies-popup-inset'>
                <Modal.Header closeButton>
                <Modal.Title>Cookies</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div class="used-cookies-table"><table><thead><tr><th>Name</th><th>Purpose</th></tr></thead><tbody><tr><td>userlang</td><td>For storing language preferance of user</td></tr><tr><td>LANGUAGE_COOKIE_NAME</td><td>For storing language preferance of user </td></tr><tr><td>csrftoken</td><td>This cookie helps to authenticated calls to webservices.</td></tr></tbody></table></div>
                </Modal.Body>
            </div>
        </Modal>
    </div>
    </>
  )
}

export default LandingFooter