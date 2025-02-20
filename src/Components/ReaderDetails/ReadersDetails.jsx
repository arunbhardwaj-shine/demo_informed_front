import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { loader } from "../../loader";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import StaticExample from "./SucessfullModal";
import { toast } from "react-toastify";

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
      getValues,  
  
  
      watch,
      formState: { errors, dirtyFields }
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
              loader("show")
              const result = await axios.post(
                  `https://webinar.docintel.app/lmn/api/Webservice/save_change_ul`,
                  { id:url_id}, 
                 
                );
            
             const values =result.data.data;
             
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
           
           loader("hide")
              
          } catch (error) {
              console.log(error);
              loader("hide")
              toast.error("Failed to fetch user data");
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
          internal_details_id:userData?.internal_details_id,
          profileid:userData?.profileid
          
      };
  
      
  
   try {
      loader("show")
      const result =await axios.post(
        `https://webinar.docintel.app/lmn/api/Webservice/save_reader_details`,
         body,
      )
  
      console.log(result)
  
      if(result.data.success == true){
          setShow(true)
          loader("hide")
      }else{
          toast.error(result.data.message)
          loader("hide")
      }
      
   } catch (error) {
      console.log(error)
      loader("hide")
   }
    
   
    };
  return (
    <>
   { userData ? (<div className="form-template-main">
    <Container>
      <Row>
        <div className="d-flex justify-content-center inform-logo">
      <img src={path_image + "inforMed_Logo_Blue_1.svg"} alt="logo" />
      </div>
    <div className="form-template-container">
      <div className="form-template-header">
      
      <h3>Contact details</h3>
      </div>
      <div className="form-template">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>First name*</Form.Label>
          <Form.Control type="text" placeholder="Enter email" {...register("firstName", {
            required: "First name is required",
            maxLength: {
              value: 255,
              message: "First name cannot exceed 255 characters",
            },
            validate: (value) => value.trim() !== "" || "First name cannot be empty or spaces only"
          })}/>
           {errors?.firstName && (
          <p className="error" style={{ color: "#db0000" }}>{errors.firstName.message}</p>
        )}
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Middle name</Form.Label>
          <Form.Control type="text" placeholder="Middle name"
          {...register("middleName", {
            maxLength: {
              value: 255,
              message: "Middle name cannot exceed 255 characters",
            },
          })}/>
           {errors?.middleName && (
          <p className="error" style={{ color: "#db0000" }}>{errors.middleName.message}</p>
        )}
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Last name*</Form.Label>
          <Form.Control type="text" placeholder="Last name*"
          {...register("lastName", {
            required: " Last name is required",
            maxLength: {
              value: 255,
              message: "Last name cannot exceed 255 characters",
            },
             validate: (value) => value.trim() !== "" || "Last name cannot be empty or spaces only"
          })}/>
           {errors?.lastName && (
          <p className="error" style={{ color: "#db0000" }}>{errors.lastName.message}</p>
        )}
        </Form.Group>


        </Row>
        <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Country*</Form.Label>
          <Form.Select defaultValue="Choose..." {...register("country", { required: "Country is required" })}>
          <option value="" disabled >
            Select
          </option>
          {userData?.country?.map((country, index) => {
            return (
              <option key={country} value={country}>
                {country}
              </option>
            );
          })}
        </Form.Select>
        {errors.country && (
          <p className="error" style={{ color: "#db0000" }}>{errors.country.message}</p>
        )}
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Hospital</Form.Label>
          <Form.Control type="text" placeholder="Hospital"
          {...register("hospital", {
            maxLength: {
              value: 255,
              message: "Hospital name cannot exceed 255 characters",
            }
          })}
        />
         {errors.hospital && (
          <p className="error" style={{ color: "#db0000" }}>{errors.hospital.message}</p>
        )}
        </Form.Group>
        

        </Row>
        <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Title"
          {...register("title", {
            maxLength: {
              value: 200,
              message: "Title name cannot exceed 255 characters",
            },
          })}
        />
        {errors.title && <p className="error" style={{ color: "#db0000" }}>{errors.title.message}</p>}
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Speciality</Form.Label>
          <Form.Select  {...register("speciality")}>
          <option value="" disabled  >
            Select speciality
          </option>
          {userData?.speciality?.map((speciality, index) => {
            return (
              <option key={speciality} value={speciality}>
                {speciality}
              </option>
            );
          })}
        </Form.Select>

        </Form.Group>


        </Row>
        <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>IBU</Form.Label>
          <Form.Select {...register("ibu")}>
          <option value="" disabled  >
            Select
          </option>
          {userData?.ibu?.map((ibu, index) => {
            return (
              <option key={ibu} value={ibu}>
                {ibu}
              </option>
            );
          })}
        </Form.Select>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Alternative e-mail</Form.Label>
          <Form.Control type="email"placeholder="Alternative e-mail"
          {...register("alternativeEmail", {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
        />
        {errors.alternativeEmail && (
          <p className="error" style={{ color: "#db0000" }}>{errors.alternativeEmail.message}</p>
        )}
        </Form.Group>

        </Row>
        <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Primary phone</Form.Label>
          <Form.Control  type="number" placeholder="Primary phone"
          {...register("primaryPhone", {
            pattern: {
              value: /^[0-9]{10,15}$/,
              message: "Enter a valid phone number (10-15 digits)",
            },
          })}
        />
        {errors.primaryPhone && (
          <p className="error" style={{ color: "#db0000" }}>{errors.primaryPhone.message}</p>
        )}
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Alternative phone</Form.Label>
          <Form.Control  type="number" placeholder="Alternative phone"
          {...register("alternativePhone", {
            pattern: {
              value: /^[0-9]{10,15}$/,
              message: "Enter a valid phone number (10-15 digits)",
            },
          })}
        />
         {errors.alternativePhone && (
          <p className="error" style={{ color: "#db0000" }}>{errors.alternativePhone.message}</p>
        )}
        </Form.Group>

        </Row>
        <Row className="mb-3">
        <Form.Group as={Col}>
        <Form.Label>Products</Form.Label>
        <div className="select-box">
        <select
          multiple
          {...register("products")}
          onChange={(e) => {
            const selectedValues = Array.from(
              e.target.selectedOptions,
              (option) => option.value
            );
            setValue("products", selectedValues);  
          }}
        >
          <option value="" disabled   >
            Select products
          </option>
          {userData?.productList?.map((product, index) => (
            <option key={index} value={product}>
              {product}
            </option>
          ))}
        </select>
        </div>
        </Form.Group>
        <Form.Group as={Col}>
        <Form.Label>Area of Interest</Form.Label>
        <div className="select-box">
        <select multiple {...register("areaOfInterest")}>
          <option value="" disabled  >
            Select Area Of The Interest
          </option>
          {userData?.speciality?.map((areaOfInterest, index) => {
            return (
              <option key={areaOfInterest} value={areaOfInterest}>
                {areaOfInterest}
              </option>
            );
          })}
        </select>
        </div>
        </Form.Group>



        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md={6} className="mb-3">
            <Form.Label>Rep contact</Form.Label>
            <Form.Control placeholder="Who is Rep contact?"
              {...register("repContact", {
                maxLength: {
                  value: 200,
                  message: "repContact cannot exceed 255 characters",
                },
              })}
            />
            {errors.repContact && (
              <p className="error" style={{ color: "#db0000" }}>{errors.repContact.message}</p>
            )}
        </Form.Group>

        
        {fields.map((field, index) => (
          <Col md={6} className="mb-1"  key={field.id}>
            <Form.Label></Form.Label>
          <div
          
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <textarea
              {...register(`Notes.${index}.value`, {
                maxLength: {
                  value: 500,
                  message: "Note cannot exceed 500 characters",
                },
                validate: (value) => {
                    if (!dirtyFields.Notes?.[index]?.value) return true;  
                     return value.trim() !== "" || "Text area cannot be empty or spaces only";
                   },
              })}
              placeholder="Meetings notes,special intersets ,etc"
            />
            {errors.Notes?.[index]?.value && (
              <p style={{ color: "#db0000" }}>
                {errors.Notes[index].value.message}
              </p>
            )}
            {index === 0 ? (
              <button
                type="button"
                onClick={addTextarea}
                style={{
                  cursor: "pointer",
                  fontSize: "14px",
                  border: "none",
                  background: "#0066be",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: "0 0 30px",
                  lineHeight: "1",
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
                  fontSize: "14px",
                  border: "none",
                  background: "#0066be",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: "0 0 30px",
                  lineHeight: "1",
                }}
              >
                ➖
              </button>
            )}
          </div>
          </Col>
        ))}
        
      </Row>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      </Form>
      </div>
      </div>
      </Row>      
    </Container>
    </div>):(null)}

    <StaticExample setShow={setShow} show={show} />

<div className="loader" id="custom_loader">
   <div className="loader_show">
   <span className="loader-view"> </span>
   </div>
</div>

    
    </>
  );
};

export default ReadersDetails;
