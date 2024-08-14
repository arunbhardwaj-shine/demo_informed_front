import React from 'react'
import {  Table } from "react-bootstrap";

let data = [
    {
      name: "ISTH",
      email: "haematology.octapharma@docintel.app",
      question: "test",
    },
    {
      name: "ISTH",
      email: "haematology.octapharma@docintel.app",
      question: "message can you please make this shorter",
    },
    {
      name: "ISTH",
      email: "haematology.octapharma@docintel.app",
      question:
        "Dr. Dargaud would you expect differences in microRNA expression in haemophilia patients with different severity?",
    },
    {
      name: "ISTH",
      email: "haematology.octapharma@docintel.app",
      question: "To Dr. Young: are you tolerasing your patients and how?",
    },
    {
      name: "ISTH",
      email: "haematology.octapharma@docintel.app",
      question: "Dr. Young:  Is FVIII tolerance lifelong in patients?",
    },
    {
      name: "ISTH",
      email: "haematology.octapharma@docintel.app",
      question:
        "I recall seeing data that younger patients (1-3 years) more likely to develop an inhibitor - Is that your understanding, Dr. Young? If so, should we delay factor exposure by using emicizumab during that time?",
    },
    {
      name: "ISTH",
      email: "haematology.octapharma@docintel.app",
      question:
        "Guy Young: Is it possible to provide patients under 9 months factor VIII concomitantly with emicizumab if the family wished to establish tolerance at an earlier age?",
    },
    {
      name: "ISTH",
      email: "haematology.octapharma@docintel.app",
      question: "When a PROVE study for PUPs and vert young children ?",
    },
    {
      name: "ISTH",
      email: "haematology.octapharma@docintel.app",
      question:
        "When do you expect to have early results from PROVE? What is the sample sizes planned?",
    },
    {
      name: "ISTH",
      email: "haematology.octapharma@docintel.app",
      question:
        "How CAN intravenously administered FVIII directly influence bone metabolism if it does not crosses into the extravascular space?",
    },
    {
      name: "ISTH",
      email: "haematology.octapharma@docintel.app",
      question:
        "Regular FVIII treatment may also be associated to better physical activity that may help improvement of bone status. What is your opinion ?",
    },
    {
      name: "ISTH",
      email: "haematology.octapharma@docintel.app",
      question:
        "Prof Vogel,\r\n\r\nHave you compared Nuwiq with unchanged plasma derived FVIII concentrates?",
    },
    {
      name: "ISTH",
      email: "haematology.octapharma@docintel.app",
      question:
        "Did you performed the same comparisons against the plasma derived FVIII?",
    },
    {
      name: "ISTH",
      email: "haematology.octapharma@docintel.app",
      question:
        "There are a number of peer reviewed real world studies comparing ABRs switching from Factor 8 prophylaxis to emicizumab including multi centered in various HRSA regions. Which data is more validated, real world or MAIC",
    },
    {
      name: "ISTH",
      email: "haematology.octapharma@docintel.app",
      question: "Is there any explanation for this observed superiority of nuwiq",
    },
    {
      name: "ISTH",
      email: "haematology.octapharma@docintel.app",
      question:
        "Paul Batty: How might this analysis be practically implemented in the future?",
    },
    {
      name: "ISTH",
      email: "haematology.octapharma@docintel.app",
      question:
        "Guy Young: Does the F8 genotype of the patient influence your decision?",
    },
    {
      name: "ISTH",
      email: "haematology.octapharma@docintel.app",
      question:
        "Guy Young: Is it possible to provide patients under 9 months factor VIII concomitantly with emicizumab if the family wished to establish tolerance at an earlier age?",
    },
    {
      name: "ISTH",
      email: "haematology.octapharma@docintel.app",
      question: "Guy Young: Is FVIII tolerance lifelong in patients?",
    },
    {
      name: "ISTH",
      email: "haematology.octapharma@docintel.app",
      question:
        "Yesim Dargaud: How long does it take to process microRNAs and could they be used in daily clinical practice?",
    },
    {
      name: "ISTH",
      email: "haematology.octapharma@docintel.app",
      question:
        "Yesim Dargaud: Could microRNAs be associated with treatment efficacy?",
    },
    {
      name: "ISTH",
      email: "haematology.octapharma@docintel.app",
      question:
        "Robert Klamroth: The PROVE study is only recruiting severe haemophilia patients, could it be overlooking patients with mild and moderate haemophilia who are also at risk of joint damage and arthropathy? At what age could joint bleeds occur?",
    },
    {
      name: "ISTH",
      email: "haematology.octapharma@docintel.app",
      question:
        "Robert Klamroth: For the analysis of the PROVE study, will you be subgrouping the patients based on age?",
    },
    {
      name: "ISTH",
      email: "haematology.octapharma@docintel.app",
      question:
        "Robert Klamroth: Will the PROVE study be covering the costs of MRI?",
    },
    {
      name: "ISTH",
      email: "haematology.octapharma@docintel.app",
      question:
        "Viola Vogel: Have you looked at the impact of VWF on the FVIII binding in your model?",
    },
    {
      name: "ISTH",
      email: "haematology.octapharma@docintel.app",
      question:
        "Viola Vogel: Would you expect differences in platelet binding with recombinant FVIII products in haemophilia A patients compared with controls?",
    },
    {
      name: "ISTH",
      email: "haematology.octapharma@docintel.app",
      question:
        "Craig Kessler: Modifications in EHL FVIII have been shown cause discrepancies in the measurements from clotting assays. Could the slower activation rate of EHL FVIII,  contribute to the  efficacy?",
    },
    {
      name: "ISTH",
      email: "haematology.octapharma@docintel.app",
      question:
        "Craig Kessler: Are there any indirect comparisons in studies of prophylaxis in children?",
    },
    {
      name: "ISTH",
      email: "haematology.octapharma@docintel.app",
      question:
        "Craig Kessler: In the absence of direct comparisons, can the MAIC results be used to develop models investigating the cost-effectiveness of the different treatments?",
    },
    {
      name: "Myrna Valdez",
      email: "myrnavaldez32@yahoo.com",
      question: "What is the management of hemophilia A in pregnancy?",
    },
    {
      name: "Myrna Valdez",
      email: "myrnavaldez32@yahoo.com",
      question: "What is the danger of hemophilia A in pregnancy?",
    },
    {
      name: "Myrna Valdez",
      email: "myrnavaldez32@yahoo.com",
      question:
        "Why it is called or why it is termed as all-round bleed protection?",
    },
  ];

const WebinarQuestions = () => {
  return (
    <div className="high_charts">
    <div className="highcharts-data-table">
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Questions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((category) => (
            <tr>
              <td>{category.name}</td>
              <td>{category.email} </td>
              <td>{category.question} </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  </div>
  )
}

export default WebinarQuestions