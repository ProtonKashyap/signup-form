import React, { useState } from "react";
import { omit } from "lodash";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const MyForm = () => {
  //Form values
  const [values, setValues] = useState({ gender: "male" });
  //Errors
  const [errors, setErrors] = useState({});

  const [gender, setGender] = useState("male");

  //to redirect
  const navigate = useNavigate();

  const validate = (name, value) => {
    //A function to validate each input values

    switch (name) {
      case "name":
        if (value.length <= 4) {
          // we will set the error state

          setErrors({
            ...errors,
            name: "Please enter your full name",
          });
        } else {
          // set the error state empty or remove the error for username input

          //omit function removes/omits the value from given object and returns a new object
          let newObj = omit(errors, "name");
          setErrors(newObj);
        }
        break;

      case "email":
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            email: "Enter a valid email address",
          });
        } else {
          let newObj = omit(errors, "email");
          setErrors(newObj);
        }
        break;

      case "password":
        if (
          !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)
        ) {
          setErrors({
            ...errors,
            password:
              "Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers",
          });
        } else {
          let newObj = omit(errors, "password");
          setErrors(newObj);
        }
        break;
      case "dob":
        if (
          !new RegExp(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).test(
            value
          )
        ) {
          setErrors({
            ...errors,
            dob: "Date of bith must be in YYYY-MM-DD format",
          });
        } else {
          let newObj = omit(errors, "dob");
          setErrors(newObj);
        }
        break;
      case "gender":
        if (!gender) {
          setErrors({
            ...errors,
            gender: "Please select gender",
          });
        } else {
          let newObj = omit(errors, "gender");
          setErrors(newObj);
        }
        break;

      default:
        break;
    }
  };

  //Method to handle form inputs
  const handleChange = (event) => {
    //To stop default events
    //event.persist();

    let name = event.target.name;
    let val = event.target.value;

    //validationg user inputs
    validate(name, val);

    //set these values in state
    setValues({
      ...values,
      [name]: val,
    });
  };

  //handles form submit
  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    console.log(errors);
    console.log(values);
    if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
      const { name, email, dob, gender, password } = values;
      Axios.post("http://localhost:3001/form-data", {
        name: name,
        email: email,
        dob: dob,
        gender: gender,
        password: password,
      }).then(() => {
        alert("This form successfully submitted");
      });
      navigate("/home",{state:values});
    } else {
      alert("There is an Error!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        minLength="5"
        required
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
      />
      {errors.name && <h3>{errors.name}</h3>}
      <input
        type="email"
        name="email"
        required
        placeholder="E-mail"
        onChange={handleChange}
      />
      {errors.email && <h3>{errors.email}</h3>}
      <input
        minLength="8"
        type="password"
        name="password"
        required
        placeholder="password"
        onChange={handleChange}
      />
      {errors.password && <h3>{errors.password}</h3>}
      <label>
        <select
          value={gender}
          onChange={(e) => {
            let val = e.target.value;
            setGender(val);
            setValues({ ...values, gender: val });
            validate("gender", val);
          }}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="others">Others</option>
        </select>
      </label>
      {errors.gender && <h3>{errors.gender}</h3>}

      <label htmlFor="date">Date Of Birth</label>
      <input
        type="text"
        minLength="10"
        required
        name="dob"
        placeholder="YYYY-MM-DD"
        onChange={handleChange}
      />
      {errors.dob && <h3>{errors.dob}</h3>}

      <input type="submit" value="Submit" className="submit" />
    </form>
  );
};
export default MyForm;
