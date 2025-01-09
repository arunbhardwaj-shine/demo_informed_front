import React, { useState } from "react";

const TableOnly = (props) => {
  let path_image = import.meta.env.VITE_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [UserData, setUserData] = useState([props.all_data]);
  

  return (
    <>
     	{UserData.map((template,index) => {
                  return (
						<React.Fragment key={index}>
						<tr>
						<td>{template.name}</td>
						<td>{template.email}</td>
						<td>NA</td>
						<td>{template.country}</td>
						<td>NA</td>
						<td>NA</td>
						<td>NA</td>
						<td>NA</td>
						<td>NA</td>
						<td>NA</td>
						<td>NA</td>
						<td>NA </td>
						<td className="add-new-hcp">
							<img
							src={path_image + "add-row.png"}
							alt="Add More"
							
							/>
						</td>
						</tr>
					</React.Fragment>

					);
                })}

		
    </>
  );
};

export default TableOnly;
