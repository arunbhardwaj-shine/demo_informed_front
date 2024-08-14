import React, { useEffect, useState } from "react";
import axios from "axios";

const TableOnly = (props) => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [UserData, setUserData] = useState([props.all_data]);
  const [searchedUsers, setSearchedUsers] = useState([]);
 

  return (
    <>
     	{UserData.map((template) => {
                  return (
						<>
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
					</>

					);
                })}

		
    </>
  );
};

export default TableOnly;
