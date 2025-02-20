import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import StaticExample from "./SucessfullModal";

const ReadersDetails = () => {
  let path_image = import.meta.env.VITE_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [show,setShow]=useState(false)
  const routeParams = useParams();
  const url_id = routeParams.id;
  const [ userData, setUserData ] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset ,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      country: "",
      hospital: "",
      title: "",
      speciality: "",
      ibu: " ",
      products: [],
      areaOfInterest: [],
      alternativeEmail: "",
      primaryPhone: "",
      alternativePhone: "",
      repContact: "",
      Notes: [],
    },
  });

  // UseFieldArray to manage extra notes dynamically
  const { fields, append, remove } = useFieldArray({
    control,
    name: "Notes",
  });

  useEffect(() => {
    if (routeParams.id) {
      getUserData();
    }
  }, [url_id]);
  

  const getUserData = async () => {
   
    if (url_id) {
        try {
            const result = await axios.post(
                `https://webinar.docintel.app/lmn/api/Webservice/save_change_ul`,
                { id:url_id}, 
               
              );
          
           const values =result.data.data;
     
        //   if (result) {
           
            setValue("firstName", values.first_name || "" );
            setValue("middleName", values.middle_name || "");
            setValue("country", values.selected_country || "");
            setValue("lastName", values.last_name || "");
            setValue("hospital", values.hospital || "");
            setValue("title", values.title || "");
            setValue("speciality", values.user_speciality || "");
            setValue("ibu", values.user_ibu || "");
            setValue("products", values.user_products || []);
            setValue("areaOfInterest", values.user_indications || []);
            setValue("alternativeEmail", values.alternative_email || "");
            setValue("primaryPhone", values.primary_phone || "");
            setValue("alternativePhone", values.alternative_phone || "");
            setValue("repContact", values.rep_contact || "");
            if (values?.notes?.length === 0) {
              append({ value: "" });
            } else {
              setValue(
                "Notes",
                values?.notes
                  ? values?.notes?.map((n) => ({ value: n }))
                  : []
              );
            }
            setUserData(result.data.data);
         // }
            
        } catch (error) {
            console.log(error);
            
        }
    
    }
  };

  const addTextarea = () => {
    append({ value: "" });
  };

  const removeTextarea = (index) => {
    remove(index);
  };

  const onSubmit = async (data) => {

    const body = {
        first_name: data.firstName,
        middle_name: data.middleName,
        last_name: data.lastName,
        country: data.country,
        hospital: data.hospital,
        title: data.title,
        speciality: data.speciality,
        ibu: data.ibu,
        alternative_email: data.alternativeEmail,
        primary_phone: data.primaryPhone,
        alternative_phone: data.alternativePhone,
        products: data.products,
        areaOfInterest: data.areaOfInterest,
        repContact: data.repContact,
        notes: data.Notes.map(note => note.value),
        id:userData?.currentid,
        internal_details_id:userData?.profileid,
        profileid:userData?.internal_details_id
    };

    console.log(body)

 

    // const result =await axios.post(
    //   `https://webinar.docintel.app/lmn/api/Webservice/save_change_ul`,
    //   body,
    // )

    // if(result.message == "true"){
    //     append({ value: "" });
    // }else{
    //     console.log("Error saving user data");
    // }
    setShow(true)


   
  };

  return (
    <>
     
     {   userData ? (  <> <img src={path_image + "/informed_logo.svg"} alt="logo" />
            <h1>Contact details</h1>
      
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <input
                placeholder="First name*"
                {...register("firstName", {
                  required: "First name is required",
                  maxLength: {
                    value: 255,
                    message: "First name cannot exceed 255 characters",
                  },
                })}
              />
              {errors?.firstName && (
                <p style={{ color: "red" }}>{errors.firstName.message}</p>
              )}
      
              <input
                placeholder="Middle name"
                {...register("middleName", {
                  maxLength: {
                    value: 255,
                    message: "Middle name cannot exceed 255 characters",
                  },
                })}
              />
              {errors?.middleName && (
                <p style={{ color: "red" }}>{errors.middleName.message}</p>
              )}
      
              <input
                placeholder="Last name*"
                {...register("lastName", {
                  required: " Last name is required",
                  maxLength: {
                    value: 255,
                    message: "Last name cannot exceed 255 characters",
                  },
                })}
              />
              {errors?.lastName && (
                <p style={{ color: "red" }}>{errors.lastName.message}</p>
              )}
      
              <select {...register("country", { required: "Country is required" })}>
                <option value="" disabled selected>
                  Select
                </option>
                {userData?.country?.map((country, index) => {
                  return (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  );
                })}
              </select>
              {errors.country && (
                <p style={{ color: "red" }}>{errors.country.message}</p>
              )}
      
              <input
                placeholder="Hospital"
                {...register("hospital", {
                  maxLength: {
                    value: 255,
                    message: "Hospital name cannot exceed 255 characters",
                  },
                })}
              />
              {errors.hospital && (
                <p style={{ color: "red" }}>{errors.hospital.message}</p>
              )}
      
              <input
                placeholder="Title"
                {...register("title", {
                  maxLength: {
                    value: 200,
                    message: "Title name cannot exceed 255 characters",
                  },
                })}
              />
              {errors.title && <p style={{ color: "red" }}>{errors.title.message}</p>}
      
              <select {...register("speciality")}>
                <option value="" disabled selected>
                  Select speciality
                </option>
                {userData?.speciality?.map((speciality, index) => {
                  return (
                    <option key={speciality} value={speciality}>
                      {speciality}
                    </option>
                  );
                })}
              </select>
      
              <select {...register("ibu")}>
                <option value="" disabled selected>
                  Select
                </option>
                {userData?.ibu?.map((ibu, index) => {
                  return (
                    <option key={ibu} value={ibu}>
                      {ibu}
                    </option>
                  );
                })}
              </select>
      
              <select
                multiple
                {...register("products")}
                onChange={(e) => {
                  const selectedValues = Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  );
                  setValue("products", [selectedValues]);
                }}
              >
                <option value="" disabled selected >
                  Select products
                </option>
                {userData?.productList?.map((product, index) => (
                  <option key={index} value={product}>
                    {product}
                  </option>
                ))}
              </select>
      
             
      
              <select multiple {...register("areaOfInterest")}>
                <option value="" disabled selected>
                  Select Area Of The Interest
                </option>
                {userData?.areaofinterest?.map((areaOfInterest, index) => {
                  return (
                    <option key={areaOfInterest} value={areaOfInterest}>
                      {areaOfInterest}
                    </option>
                  );
                })}
              </select>
      
              <input
                placeholder="Alternative e-mail"
                {...register("alternativeEmail", {
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.alternativeEmail && (
                <p style={{ color: "red" }}>{errors.alternativeEmail.message}</p>
              )}
      
              <input
                placeholder="Primary phone"
                {...register("primaryPhone", {
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Enter a valid phone number (10-15 digits)",
                  },
                })}
              />
      
              {errors.primaryPhone && (
                <p style={{ color: "red" }}>{errors.primaryPhone.message}</p>
              )}
              <input
                placeholder="Alternative phone"
                {...register("alternativePhone", {
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Enter a valid phone number (10-15 digits)",
                  },
                })}
              />
      
              {errors.alternativePhone && (
                <p style={{ color: "red" }}>{errors.alternativePhone.message}</p>
              )}
      
              <input
                placeholder="Who is Rep contact?"
                {...register("repContact", {
                  maxLength: {
                    value: 200,
                    message: "repContact cannot exceed 255 characters",
                  },
                })}
              />
              {errors.repContact && (
                <p style={{ color: "red" }}>{errors.repContact.message}</p>
              )}
      
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <textarea
                    {...register(`Notes.${index}.value`, {
                      maxLength: {
                        value: 500,
                        message: "Note cannot exceed 500 characters",
                      },
                    })}
                    placeholder="Meetings notes,special intersets ,etc"
                  />
                  {errors.Notes?.[index]?.value && (
                    <p style={{ color: "red" }}>
                      {errors.Notes[index].value.message}
                    </p>
                  )}
                  {index === 0 ? (
                    <button
                      type="button"
                      onClick={addTextarea}
                      style={{
                        cursor: "pointer",
                        fontSize: "18px",
                        border: "none",
                        background: "transparent",
                      }}
                    >
                      ➕
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => removeTextarea(index)}
                      style={{
                        cursor: "pointer",
                        fontSize: "18px",
                        border: "none",
                        background: "transparent",
                      }}
                    >
                      ➖
                    </button>
                  )}
                </div>
              ))}
      
              <input type="submit" value="Submit" />
            </form> </>):(null)
            
            }

            
                 <StaticExample setShow={setShow} show={show} />
            
       
          
     
   
    </>
  );
};

export default ReadersDetails;
