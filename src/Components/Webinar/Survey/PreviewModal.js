// import React, { useState } from 'react';

// const PreviewModal = ({ questions, onClose }) => {
//   let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

//   const [accordionOpen, setAccordionOpen] = useState(null);

//   const toggleAccordion = (index) => {
//     setAccordionOpen((prevIndex) => (prevIndex === index ? null : index));
//   };

//   return (
//     <>
//     <div>
//       {questions.map((question, index) => (
//         <div className="accordion" key={question.id}>
          
//           <div className="accordion-content">
//             <table className="table" id={`table-to-xls-${index}`}>
//               <thead className="sticky-header">
//                 <tr>
//                   <th>No.</th>
//                   <th>Question</th>
//                   <th>Type</th>
//                   <th>Change the order</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>{index + 1}</td>
//                   <td>{question?.questionData?.question}</td>
//                   <td>{question?.questionData?.answerType}</td>
//                   <td>{/* Add functionality to change order if needed */}</td>
//                 </tr>
//               </tbody>
//             </table>
//             <div className={"timeline-article-detail-full"} onClick={() => toggleAccordion(index)}>

//             <div className="timeline-article-details-heading">
//             <p>
//               Answers{' '}
//               <img src={path_image + 'down-arrow.png'} alt="" />
//             </p>
//         </div>
//           </div>
//             {accordionOpen === index && (
//               <div className="details-content">
//                 <ul>
//                 {question?.questionData?.answerOption.map((option, optionIndex) => (
//                   <li key={option?.id}>
//                     Option {optionIndex + 1}: {option?.answer}
//                   </li>
//                 ))}
//               </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       ))}
      
//       </div>
//     </>
//   );
// };

// export default PreviewModal;


import React, { useState } from 'react';

const PreviewModal = ({ questions, onClose }) => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

  const [accordionOpen, setAccordionOpen] = useState(null);

  const toggleAccordion = (index) => {
    setAccordionOpen((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <table className="table" id={`table-to-xls`}>
        <thead className="sticky-header">
          <tr>
            <th>No.</th>
            <th>Question</th>
            <th>Type</th>
            <th>Change the order</th>
          </tr>
        </thead>
      </table>

      <div>
        {questions.map((question, index) => (
          <div className="accordion" key={question.id}>
            <div className="accordion-content">
              <table className="table">
                <tbody>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{question?.questionData?.question}</td>
                    <td>{question?.questionData?.answerType}</td>
                    <td>{/* Add functionality to change order if needed */}</td>
                  </tr>
                </tbody>
              </table>
              <div
                className="timeline-article-detail-full"
                onClick={() => toggleAccordion(index)}
              >
                <div className="timeline-article-details-heading">
                  <p>
                    Answers{' '}
                    <img src={path_image + 'down-arrow.png'} alt="" />
                  </p>
                </div>
              </div>
              {accordionOpen === index && (
                <div className="details-content">
                  <ul>
                    {question?.questionData?.answerOption.map(
                      (option, optionIndex) => (
                        <li key={option?.id}>
                          Option {optionIndex + 1}: {option?.answer}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PreviewModal;

