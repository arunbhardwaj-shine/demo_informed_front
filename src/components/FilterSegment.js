import React, { useEffect, useState } from "react";

const FilterSegment = (props) => {

  const [filters, setFilters] = useState(props.filters);
  const [selectedcountry, setSelectedCountry] = useState([]);

  const handleOnCountryChange = (country) => {
        let country_index = selectedcountry.indexOf(country) ;
        if(country_index !== -1){
          selectedcountry.splice(country_index, 1);
        }else{
          selectedcountry.push(country);
        }
  };


  return (
    <>
      <p>Please Select who to include to your smart list. You can pick one or more.</p>
      <div className="box">
          <div className="row" id="box_border">
              <p>Segmentation</p>
              {'contact_type' in filters && Object.keys(filters.contact_type).length > 0 &&
                <div className="col-sm-2">
                  <p>Contact Type</p>
                </div>
              }
              {'speciality' in filters && filters.speciality.length > 0 &&
                <div className="col-sm-2">
                  <p>Speciality</p>
                </div>
              }
              {'reader_selection' in filters && filters.reader_selection.length > 0 &&
                <div className="col-sm-2">
                  <p>Reader Selection</p>
                </div>
              }
              {'ibu' in filters && filters.ibu.length > 0 &&
                <div className="col-sm-2">
                  <p>Business Unit (IBU)</p>
                </div>
              }
              {'product' in filters && filters.product.length > 0 &&
                <div className="col-sm-2">
                  <p>Product</p>
                </div>
              }
              {'country' in filters && filters.country.length > 0 &&
                <div className="col-sm-2">
                  <p>Country</p>
                </div>
              }

              <div className="col-sm-2">
                <p>Registered</p>
              </div>

              <div className="col-sm-2">
                <p>Bounced</p>
              </div>
          </div>
      </div>
    </>
  );
};


export default FilterSegment;
