// export const Sublink  = ({
//    sublinkoptions,
//     survey_id,
//   }) => {
//     const [selectedSublinkId, setSelectedSublinkId] = useState();
  
//     const onSublinkChange = (selectedOption) => {
//       setSelectedSublinkId(selectedOption ? selectedOption.value : null);
//     };
  
//     return (
//       <>
//         <div className="data-main-box change-tab-main-box tab-panel">
//           <ul className="tab-mail-list data change">
//             <li>
//               <h6 className="tab-content-title">SubLinks</h6>
//               <div className="select-dropdown-wrapper">
//                 <div className="select">
//                   <Select
//                     aria-label="SSelect Sublink"
//                     className="dropdown-basic-button split-button-dropup"
//                     name="surveyCreator"
//                     placeholder="Select Sublink"
//                     onChange={onSublinkChange}
//                     options={sublinkoptions}
//                     value={sublinkoptions.find(
//                       (option) => option.value === selectedSublinkId
//                     )}
//                   />
//                   <Button
//                     onClick={() => handleCopy(survey_id, selectedSublinkId)}
//                   >
//                     Copy
//                   </Button>
//                 </div>
//               </div>
//             </li>
//             <li>
//               <h6 className="tab-content-title">QR Codes</h6>
//               <div className="select-dropdown-wrapper">
//                 <div className="select">
//                   <Select
//                     aria-label="Select Sublink"
//                     className="dropdown-basic-button split-button-dropup"
//                     name="surveyCreator"
//                     placeholder="Select Sublink"
//                     onChange={onSublinkChange}
//                     options={sublinkoptions}
//                     value={sublinkoptions.find(
//                       (option) => option.value === selectedSublinkId
//                     )}
//                   />
//                   <Button
//                     onClick={(e) => setDownloadLink(survey_id, selectedSublinkId)}
//                   >
//                     download
//                   </Button>
//                 </div>
//               </div>
//             </li>
//           </ul>
//         </div>
//       </>
//     );
//   };
  