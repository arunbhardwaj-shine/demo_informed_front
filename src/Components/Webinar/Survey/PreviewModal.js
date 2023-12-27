// import React, { useState } from 'react';

// const PreviewModal = ({ questions, onClose }) => {
//   let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
//   const [detailsVisible, setDetailsVisible] = useState(false);

//   const toggleDetails = () => {
//     setDetailsVisible(!detailsVisible);
//   };

//   console.log(questions,'===>questions')

//   return (
//     <>
//       <table className="table" id="table-to-xls">
//         <thead className="sticky-header">
//           <tr>
//             <th>No.</th>
//             <th>Question</th>
//             <th>Type</th>
//             <th>Change the order</th>
//           </tr>
//         </thead>
//         <tbody>
//           {questions.map((question, index) => (
//             <tr key={question.id}>
//               <td>{index + 1}</td>
//               <td>{question?.questionData?.question}</td>
//               <td>{question?.questionData?.answerType}</td>
//               <td>{/* Add functionality to change order if needed */}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className={"timeline-article-detail-full"} onClick={toggleDetails}>
//         <div className="timeline-article-details-heading">
//           <p>
//             Answers{' '}
//             <img src={path_image + 'down-arrow.png'} alt="" />
//           </p>
//         </div>
//         {detailsVisible && (
//           <div className="details-content">
//             {questions.map((question) => (
//               <div key={question?.id}>
//                 <p>{question?.question}</p>
//                 <ul>
//                   {question?.questionData?.answerOption.map((option) => (
//                     <li key={option?.id}>
//                       {option?.answer}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         )}
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
      {questions.map((question, index) => (
        <div className="accordion" key={question.id}>
          
          <div className="accordion-content">
            <table className="table" id={`table-to-xls-${index}`}>
              <thead className="sticky-header">
                <tr>
                  <th>No.</th>
                  <th>Question</th>
                  <th>Type</th>
                  <th>Change the order</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{index + 1}</td>
                  <td>{question?.questionData?.question}</td>
                  <td>{question?.questionData?.answerType}</td>
                  <td>{/* Add functionality to change order if needed */}</td>
                </tr>
              </tbody>
            </table>
            <div className={"timeline-article-detail-full"} onClick={() => toggleAccordion(index)}>
            {/* <p>
              Question {index + 1}{' '}
              <img src={path_image + 'down-arrow.png'} alt="" />
            </p> */}

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
                  {question?.questionData?.answerOption.map((option) => (
                    <li key={option?.id}>{option?.answer}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default PreviewModal;
