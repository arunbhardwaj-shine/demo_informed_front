import axios from "axios";
import React, { useEffect, useState } from "react";
import { loader } from "../../../../../loader";
import Select from "react-select";
import { Table } from "react-bootstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
exporting(Highcharts);
exportData(Highcharts);

const EmailStats = () => {
  Highcharts.setOptions({
    colors: [
      "#FFBE2C",
      "#F58289",
      "#00D4C0",
      "#D61975",
      "#0066BE",
      "#FFBE2C",
      "#F0EEE4",
      "#00003C",
    ],
  });
  const [filter, setFilter] = useState([
    {
      label:
        "On demand: Octapharma Symposium ISTH 2023 (US Non registered,  3 July)",
      value: "652",
    },

    {
      label: "On demand: Octapharma Symposium ISTH 2023 All (3 July)",
      value: "641",
    },

    {
      label:
        " LIVE SOON: Octapharma Symposium ISTH 2023 (All non registered -27 June)",
      value: "640",
    },

    {
      label:
        "LIVE NOW: Octapharma Symposium ISTH 2023 (All registered - 27 June)",
      value: "639",
    },

    {
      label: "Thank you for registering: Octapharma Symposium ISTH 2023",
      value: "632",
    },

    {
      label:
        "Online LIVE STREAM: Octapharma Symposium ISTH 2023 ALL (Internal+US LIST - 21 June)",
      value: "642",
    },

    {
      label:
        "Invitation: Octapharma Symposia ISTH 2023 (Provided ISTH LIST - 20 June, 5 July)",
      value: "643",
    },

    {
      label:
        "Invitation: Octapharma Symposium ISTH 2023 External US LIST (16 June)",
      value: "645",
    },

    {
      label: "Invitation: Octapharma Symposium ISTH 2023 Internal (12 June)",
      value: "633",
    },

    {
      label: "Invitation: Octapharma Virtual Symposium ISTH2023 (Virtual LIST)",
      value: "646",
    },
  ]);
  const [isData, setIsData] = useState({
    templateid: "652",
    sent_count: 3815,
    read_count: 2074,
    ssi_click_count: 0,
    row_data: {
      third_p_website_url_first_click_time: 367,
      thankyou_article_url_first_click_time1: 348,
      thankyou_article_url_first_click_time: 352,
    },
    row_data_emails: [
      "aantony@iupui.edu",
      "abajaj@deptofmed.arizona.edu",
      "abaker@jhu.edu",
      "abalmanoukian@theangelesclinic.org",
      "abhan@partners.org",
      "adetola.a.kassim@vanderbilt.edu",
      "aganesan@rchsd.org",
      "agill@ucdavis.edu",
      "agreensp@iuhealth.org",
      "ahassan22@wustl.edu",
      "akmuthuk@utmb.edu",
      "allison.rosenthal@mayo.edu",
      "almweber@iupui.edu",
      "aloysius.pereira@kp.org",
      "amber.iqbal@lvhn.org",
      "amega@lifespan.org",
      "amjimenez@med.miami.edu",
      "anamika.katoch@yale.edu",
      "apapa@lifespan.org",
      "apimentel@miami.edu",
      "aqureshi@uthsc.edu",
      "arthur.sunkin@sphp.com",
      "arun.shet@nih.gov",
      "arvinder.bhinder@ohiohealth.com",
      "ashaw1@partners.org",
      "ashok.raj@louisville.edu",
      "astorni1@iuhealth.org",
      "ataylor@ucdavis.edu",
      "aueg@nhlbi.nih.gov",
      "baparker@ucsd.edu",
      "barrett_rollins@dfci.harvard.edu",
      "bbierer@bwh.harvard.edu",
      "bbriggs@rchsd.org",
      "beigelman_a@kids.wustl.edu",
      "bhuvana.setty@nationwidechildrens.org",
      "biljana.horn@ufl.edu",
      "block.darci@mayo.edu",
      "bmoghimi@usc.edu",
      "bmoy@partners.org",
      "bonni.guerin@ahsys.org",
      "bpschnei@iupui.edu",
      "bradley.carthon@emoryhealthcare.org",
      "bram.richard@mayo.edu",
      "brathore@chartercare.org",
      "brian.kaihoi@mayo.edu",
      "brittany.rogers@medicine.ufl.edu",
      "cabboud@dom.wustl.edu",
      "cahanson@mayo.edu",
      "cajacobson@partners.org",
      "carlton.dampier@choa.org",
      "castanerm@msx.upmc.edu",
      "cf11@uw.edu",
      "cgauger@nemours.org",
      "chad.jacobsen@carolinashealthcare.org",
      "chan@lenscrafters.com",
      "chanan-khan.asher@mayo.edu",
      "charles.fuchs@yale.edu",
      "chen.dong@mayo.edu",
      "cherrici@upstate.edu",
      "christine.kempton@emoryhealthcare.org",
      "christopher.hourigan@nih.gov",
      "cmanner@oncologyconsultants.com",
      "cmuir@capitalcaring.org",
      "colek@email.chop.edu",
      "colgan.joseph@mayo.edu",
      "cpuronen@washington.edu",
      "cwross@med.umich.edu",
      "daniel.mulrooney@stjude.org",
      "dava.west@uky.edu",
      "david.dingli@mayo.edu",
      "david_fisher@dfci.harvard.edu",
      "david_nathan@dfci.harvard.edu",
      "dbixby@med.umich.edu",
      "dewong@mednet.ucla.edu",
      "dkarcher@mfa.gwu.edu",
      "dkatz@bhs1.org",
      "dlebl2@lsuhsc.edu",
      "dong_shin@emoryhealthcare.org",
      "dquick@covhs.org",
      "drew.dill@bmhcc.org",
      "dsamuel@childrenscentralcal.org",
      "dslamon@mednet.ucla.edu",
      "dsliwa@bhs1.org",
      "dustin.bivins@med.wmich.edu",
      "ebb.david@mgh.harvard.edu",
      "edward.snyder@yale.edu",
      "ejackson@umc.edu",
      "ellis_a@wustl.edu",
      "emueller@iuhealth.org",
      "epettijohn@chcwm.com",
      "eric.vick@uc.edu",
      "etipirneni@medicine.nevada.edu",
      "federicoa@baptisthealth.net",
      "fred.meyers@ucdmc.ucdavis.edu",
      "fred_briccetti@dfci.harvard.edu",
      "fritz.lower@uky.edu",
      "fuad.elrassi@emory.edu",
      "fworden@umich.edu",
      "gchiorea@seattlecca.org",
      "george.ansstas@bjc.org",
      "georgesp@umassmemorial.org",
      "george_canellos@dfci.harvard.edu",
      "georgtj@medicine.ufl.edu",
      "gifellowship@im.wustl.edu",
      "ginger.hampel@mayo.edu",
      "groach@ucla.edu",
      "gshepard@tnonc.com",
      "gulleyj@mail.nih.gov",
      "hadeedv@magee.edu",
      "hal-samkari@mgh.harvard.edu",
      "hao-wei.wang@nih.gov",
      "harisali@coh.org",
      "harry.yoon@mayo.edu",
      "hbillett@montefiore.org",
      "hdushkin@temple.edu",
      "hina.khan@lifespan.org",
      "hiroto.inaba@stjude.org",
      "hlindsay@bcm.edu",
      "hmlinden@u.washington.edu",
      "houghton.damon@mayo.edu",
      "houjz@upmc.edu",
      "huangt@upmc.edu",
      "hwu@ecommunity.com",
      "jackie.burns@nih.gov",
      "jacobp_laubach@dfci.harvard.edu",
      "jallen0@partners.org",
      "james.neel@hf.org",
      "james.rooney@reliantmedicalgroup.org",
      "jandrey@scrippsclinic.com",
      "janet.ruzich@providence.org",
      "jbress@upmc.com",
      "jcollins@tulane.edu",
      "jconnors@bwh.harvard.edu",
      "jcroop@iupui.edu",
      "jcunningham@rics.bwh.harvard.edu",
      "jdipersi@dom.wustl.edu",
      "jdrabick@chp.edu",
      "jeckardt@davaonc.com",
      "jeley@emory.edu",
      "jemurphy@mgh.harvard.edu",
      "jennifer.jones@wellstar.org",
      "jennifer_ligibel@dfci.harvard.edu",
      "jennifer_snaman@dfci.harvard.edu",
      "jfrankli@amgen.com",
      "jgoldberg@cmmedical.com",
      "jhalaas@cmmedical.com",
      "jharlan@uw.edu",
      "jimmy.hwang@carolinashealthcare.org",
      "jmanis@partners.org",
      "jmikhael@myeloma.org",
      "jnuckols@lifebridgehealth.org",
      "joel.kaplan@carolinashealthcare.org",
      "joseph.hofmeister@ohiohealth.com",
      "joseph.w.kim@yale.edu",
      "jpeppercorn@partners.org",
      "jpeyton@tnonc.com",
      "jrico@usf.edu",
      "jschaef@med.umich.edu",
      "jsoumerai@mgh.harvard.edu",
      "judy_garber@dfci.harvard.edu",
      "juliacruz@camc.org",
      "julie.asch@imail.org",
      "julie.stern@chp.edu",
      "juneko_grilley@med.unc.edu",
      "justin-chau@uiowa.edu",
      "jwinters@scmc.org",
      "kalmhanna@lifespan.org",
      "kanek@upmc.edu",
      "karen.rabenau@parknicollet.com",
      "karl.lewis@cuanschutz.edu",
      "karlguter@benefis.org",
      "katherinee_warren@dfci.harvard.edu",
      "kaufman@wistar.org",
      "kay.saving@osfhealthcare.org",
      "kdorritie@upmc.edu",
      "kedar.inamdar@hfhs.org",
      "keith.lerro@regionaloncology.com",
      "kelly.lastrapes@vcuhealth.org",
      "kelly.perlewitz@providence.org",
      "kennedgl@upstate.edu",
      "khagan@vacancer.com",
      "khanh.nguyen@yale.edu",
      "khege@iuhealth.org",
      "kirshma.khemani@choa.org",
      "kissj@upmc.com",
      "kjeanes@umc.edu",
      "kkaufman@mayo.edu",
      "klember1@jhmi.edu",
      "kloh@bhs1.org",
      "kmccandless@mhs.net",
      "kng4@partners.org",
      "knutsenm@slu.edu",
      "kosty.michaelp@scrippshealth.org",
      "krisstina.gowin@mayo.edu",
      "kristie.blum@emoryhealthcare.org",
      "kristine.mcdonald@wellstar.org",
      "kumarkr.shaji@mayo.edu",
      "kweilbae@im.wustl.edu",
      "kwishah@metrohealth.org",
      "lara.wahlster@childrens.harvard.edu",
      "lblaszkowsky@mgh.harvard.edu",
      "lbornikova@partners.org",
      "ldiller@partners.org",
      "lee_nadler@dfci.harvard.edu",
      "lellisen@mgh.harvard.edu",
      "leonard.bacharier@vumc.org",
      "leonardsa15@ecu.edu",
      "lesley.martin_md@johnmuirhealth.com",
      "lfarnaes@ucsd.edu",
      "lfiore@bu.edu",
      "lgoldman@newlandmedical.com",
      "lin.yi@mayo.edu",
      "linda.stout@stjude.org",
      "lwalensky@partners.org",
      "marios_giannakis@dfci.harvard.edu",
      "markovic.svetomir@mayo.edu",
      "mark_pomerantz@dfci.harvard.edu",
      "matthew_foster@med.unc.edu",
      "mbaggstr@wustl.edu",
      "mcwilliams.robert@mayo.edu",
      "meghan.higman@roswellpark.org",
      "mehtad@upmc.edu",
      "memarkel@iu.edu",
      "mhsteinb@bu.edu",
      "mhutchins@yourcancercare.com",
      "michael.bayerl@chp.edu",
      "michael@kimmdaviesmd.org",
      "michaelj_anderson@dfci.harvard.edu",
      "miriam.kim@advocatehealth.com",
      "mkeating@altoonaregional.org",
      "mmooradian@mgh.harvard.edu",
      "mohamed.el-tarabily@crmcwy.org",
      "mokam@partners.org",
      "monali.vasekar@chp.edu",
      "morenoaspitia.alvaro@mayo.edu",
      "mpatel@phoc.com",
      "mrabin@partners.org",
      "mreddy@ucdavis.edu",
      "mrettig@mednet.ucla.edu",
      "mstone@ucdavis.edu",
      "muhammad.mirza@bmhcc.org",
      "mukumar@usf.edu",
      "muzaffarm@ecu.edu",
      "mveresh@med.umich.edu",
      "mwadleigh@partners.org",
      "mwilliamson@iuhealth.org",
      "nagler.emily@scrippshealth.org",
      "neil.belman@sluhn.org",
      "neil.haycocks@quinnipiac.edu",
      "nicholas.lamparella@chp.edu",
      "nlakhani@chcwm.com",
      "norman.coleman@nih.gov",
      "nraje@mgh.harvard.edu",
      "nvidula@mgh.harvard.edu",
      "nxc691@med.miami.edu",
      "oalese@emory.edu",
      "olivert@mlhs.org",
      "orly@jhmi.edu",
      "oscarg@amgen.com",
      "paschwartz@prohealthcare.com",
      "patrick.campbell@stjude.org",
      "paul_marcoux@dfci.harvard.edu",
      "pbrastianos@partners.org",
      "peethambaram.prema@mayo.edu",
      "petrod@msx.upmc.edu",
      "pforde1@jhmi.edu",
      "pquesenberry@lifespan.org",
      "priya.vishnubhotla@ucf.edu",
      "pward@umich.edu",
      "pzerra@emory.edu",
      "qtran@ucdavis.edu",
      "rajan.singla@jeffersonhospital.org",
      "rajks@mayo.edu",
      "raj_kasthuri@med.unc.edu",
      "ramesh.karia@christushealth.org",
      "raul.oyola@wellstar.org",
      "rbrodsky@jhmi.edu",
      "rebecca.jaslow@jefferson.edu",
      "rekha.chaudhary@uc.edu",
      "rfallon@iupui.edu",
      "rgovinda@dom.wustl.edu",
      "rhurwitz@bcm.tmc.edu",
      "rizwan_romee@dfci.harvard.edu",
      "rjeselsohn@partners.org",
      "rjlee@partners.org",
      "rmanso@lsuhsc.edu",
      "rmody@med.umich.edu",
      "robert.booth@utoledo.edu",
      "robert.krance@bcm.edu",
      "robin.miller@nemours.org",
      "roboone@stcharleshealthcare.org",
      "rohithjesudas@gmail.com",
      "rothc@upmc.edu",
      "rstreeter@communityhospice.com",
      "rsuresh@dom.wustl.edu",
      "ruan.ming@mayo.edu",
      "rupa.chennamaneni@advocatehealth.com",
      "rvanderweele@upmc.edu",
      "rwjenkins@partners.org",
      "ryusuf@partners.org",
      "sabrina.browning@yale.edu",
      "sahar.nozad@uky.edu",
      "saliba@med.unc.edu",
      "samhita@virginia.edu",
      "sani.kizilbash@mayo.edu",
      "sara_tolaney@dfci.harvard.edu",
      "sattaria@montefiore.org",
      "sbachow@brrh.com",
      "sbeitana@upmc.edu",
      "scadden.david@mgh.harvard.edu",
      "schandana@chcwm.com",
      "scorso@srhs.com",
      "scott.borinstein@vanderbilt.edu",
      "scott.okuno@mayo.edu",
      "scroteau@partners.org",
      "sestant2@uw.edu",
      "shahl@msx.upmc.edu",
      "sharmaar@cinj.rutgers.edu",
      "sideras@mayoclinic.org",
      "sjmenachery@hoafredericksburg.com",
      "smast1@lsuhsc.edu",
      "snikiforow@partners.org",
      "snimer@miami.edu",
      "somal@upmc.edu",
      "sorensen.kristi@mayo.edu",
      "spacker@montefiore.org",
      "stephanie.prozora@yale.edu",
      "stephen_dyar@bshsi.org",
      "stephen_eberwine@ahni.com",
      "steven.allen@chp.edu",
      "stuart.lind@ucdenver.edu",
      "suhsien.lim@yale.edu",
      "susana_campos@dfci.harvard.edu",
      "tbayliss@bhs1.org",
      "tbradley@miami.edu",
      "tchoueiri@partners.org",
      "terry.fry@ucdenver.edu",
      "thomas.prebet@yale.edu",
      "thuy-lieu.t.vo@questdiagnostics.com",
      "tokem@ummhc.org",
      "trauscht@saintpatrick.org",
      "tspitzer@partners.org",
      "twang@wustl.edu",
      "ummdswp@med.umich.edu",
      "urpatel@pinnaclehealth.org",
      "ursula_matulonis@dfci.harvard.edu",
      "usama.gergis@jefferson.edu",
      "vgian@tnonc.com",
      "vincent.devita@yale.edu",
      "vinita.gupta@downstate.edu",
      "virginia.borges@ucdenver.edu",
      "vivek.sharma@louisville.edu",
      "walter.lundberg@yale.edu",
      "warsame.rahma@mayo.edu",
      "wayne.furman@stjude.org",
      "wendy_chen@dfci.harvard.edu",
      "william.g.blum@emory.edu",
      "witzig.thomas@mayo.edu",
      "wliggett@tnonc.com",
      "wlu@bu.edu",
      "wrightj2@childrensdayton.org",
      "wykim@med.unc.edu",
      "yacoub.faroun@sluhn.org",
      "yelsaye1@its.jnj.com",
      "yguo1@hfhs.org",
      "zdefilipp@mgh.harvard.edu",
      "zuzana_tothova@dfci.harvard.edu",
    ],
    article_registred: 0,
    invitation_registred: 2,
    labels: {
      third_p_website_url_first_click_time: "Opened the Nuwiq monograph",
      thankyou_article_url_first_click_time: "Opened the symposium link",
      thankyou_article_url_first_click_time1:
        "Opened the One Source Register link",
    },
  });
  const [barOptions, setBarOptions] = useState({
    chart: {
      type: "bar",
      height: 500,
    },
    title: {
      text: "Email Stats",
    },
    xAxis: {
      categories: [],
    },
    yAxis: {
      min: 0,
      title: {
        // text: "Email",
      },
      stackLabels: {
        enabled: false,
      },
    },

    legend: {
      enabled: false,
      align: "center",
      verticalAlign: "bottom",
      layout: "horizontal",
      x: 0,
      y: 0,
      reversed: true,
    },

    plotOptions: {
      bar: {
        // borderRadius: '50%',
        dataLabels: {
          enabled: true,
        },
        groupPadding: 0.1,
      },
    },
    colors: [
      "#FFBE2C",
      "#F58289",
      "#00D4C0",
      "#D61975",
      "#0066BE",
      "#FFBE2C",
      "#F0EEE4",
      "#00003C",
    ],

    series: [
      {
        colorByPoint: true, // Use colors from the colors array
        pointWidth: 30,
        data: [],
      },
    ],
  });

  useEffect(() => {
    // setIsData(data);
    getDataFromApi();
  }, []);
  const getDataFromApi = async () => {
    try {
      loader("show");
      //   const res = await axios.post(
      //     `https://webinar.informed.pro/Webinar/email_stat_data`
      //   );

      let newCategories = [
        "Mail Sent",
        "Mail Read",
        "Opened the Nuwiq monograph",
        "Opened the One Source Register link",
        "Opened the symposium link",
      ];

      let newdata = [
        isData?.sent_count,
        isData?.read_count,
        isData?.row_data?.third_p_website_url_first_click_time,
        isData.row_data?.thankyou_article_url_first_click_time1,
        isData?.row_data?.thankyou_article_url_first_click_time,
      ];
      let updatedSeries = [
        {
          ...barOptions.series[0],
          data: newdata,
        },
      ];
      let updatedOptions = {
        ...barOptions,
        xAxis: {
          categories: newCategories,
        },
        series: updatedSeries,
      };
      setBarOptions(updatedOptions);
    } catch (err) {
      console.log("--err", err);
    } finally {
      loader("hide");
    }
  };

  const handleFilterChange = (e) => {
    console.log("e---->", e);
  };
  return (
    <>
      <div>
        <h6>Select Template</h6>
        <Select
          options={filter}
          placeholder="select here"
          isClearable
          className=""
          onChange={(e) => handleFilterChange(e)}
        />
        <div className="high_charts">
          <div className="highcharts-data-table">
            <Table>
              <thead>
                <tr>
                  <th>Mail Sent</th>
                  <th>Mail Read</th>
                  <th>Opened the Nuwiq monograph</th>
                  <th>Opened the One Source Register link</th>
                  <th>Opened the symposium link</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{isData?.sent_count}</td>
                  <td>
                    {" "}
                    {`${isData?.read_count} ( ${(
                      (isData?.read_count / isData?.sent_count) *
                      100
                    ).toFixed(2)}%)`}
                  </td>
                  <td>
                    {`${
                      isData?.row_data?.third_p_website_url_first_click_time
                    }(${(
                      (isData?.row_data?.third_p_website_url_first_click_time /
                        isData?.read_count) *
                      100
                    ).toFixed(2)}%)`}{" "}
                  </td>
                  <td>
                    {`${
                      isData?.row_data?.thankyou_article_url_first_click_time1
                    }(${(
                      (isData?.row_data
                        ?.thankyou_article_url_first_click_time1 /
                        isData?.read_count) *
                      100
                    ).toFixed(2)}%)`}{" "}
                  </td>
                  <td>
                    {`${
                      isData?.row_data?.thankyou_article_url_first_click_time
                    }(${(
                      (isData?.row_data?.thankyou_article_url_first_click_time /
                        isData?.read_count) *
                      100
                    ).toFixed(2)}%)`}{" "}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
        <div className="high_charts">
          {barOptions?.series ? (
            <HighchartsReact highcharts={Highcharts} options={barOptions} />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
export default EmailStats;
