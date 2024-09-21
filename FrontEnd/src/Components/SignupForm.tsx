import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, string, literal, number } from "zod";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const schema = z.object({
  firstName: string()
    .min(1, { message: "First name is required" })
    .regex(/^[a-z ,.'-]+$/i, "Enter valid First name"),
  lastName: string()
    .min(1, { message: "Last name is required" })
    .regex(/^[a-z ,.'-]+$/i, "Enter valid Last name"),
  email: string().email("Invalid email").min(1, "Email is required"),
  password: string()
    .regex(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Password Should Contain Minimum 8 characters , with at least one symbol, upper and lower case letters and a number"
    )
    .min(1, "Password is required"),
  phoneNumber: string()
    // .min(10, { message: "Phone Number must contain at least 10 characters" })
    .regex(
      // /^[6-9][0-9]{9}$/,
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "Enter valid phone number"
    )
    .optional(),
  age: string()
    .min(1, { message: "Please enter valid Age" })
    .max(3, "Please enter valid Age")
    .regex(/^(([1-9][0-9])|([5-9][0-9]{0,1})|(100))$/, "Please enter valid Age")
    .optional(),
  gender: string(),
  terms: literal(true),
});
type FormData = z.infer<typeof schema>;

export default function SignupForm() {
  const navigate = useNavigate();
  // const signupData = localStorage.getItem("signUpData")
  //   ? JSON.parse(localStorage.getItem("signUpData")!)
  //   : [];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

  function submitSignUpForm(data: any) {
    // console.log(data);
    axios
      .post("http://localhost:5000/users", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: parseInt(data.phoneNumber),
        password: data.password,
        gender: data.gender,
        age: data.age,
      })
      .then((res:any) => {
        console.log("res.data.data.token", res.data.data.token);
        if (res.status === 201) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "User Already Exist",
            showConfirmButton: false,
            timer: 1700,
          });
        } else {
          localStorage.setItem("token", res.data.data.token);
          // localStorage.setItem("cart", JSON.stringify([]));
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Sign in Successfully",
            showConfirmButton: false,
            timer: 1700,
          }).then(function () {
            window.location.href = "/products";
          });
        }
      })
      .catch((err:any) => {
        console.log("Error in post user", err.response.data.message);
        // alert("Sign up  not Successfully");
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Sign up  not Successfull",
          showConfirmButton: false,
          timer: 1700,
        });
      });
  }

  return (
    <>
      <div className="d-flex justify-content-center container my-5  ">
        <div className="p-3 rounded bg-light mt-3 w-75 shadow border">
          <form onSubmit={handleSubmit(submitSignUpForm)}>
            <label className="mb-3 text-center w-100 ">
              <span className="h3 text-uppercase">SignUp Page</span>
            </label>
            <div className="form-group ">
              <label htmlFor="firstName" className="fw-bold">
                First Name<span className="text-danger">*</span>
              </label>
              <input
                {...register("firstName")}
                type="text"
                className="form-control"
                id="firstName"
                placeholder="First Name"
              />
              <p className="text-danger">{errors.firstName?.message}</p>
            </div>

            <div className="form-group ">
              <label htmlFor="lastName" className="fw-bold">
                Last Name<span className="text-danger">*</span>
              </label>
              <input
                {...register("lastName")}
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Last Name"
              />
              <p className="text-danger">{errors.lastName?.message}</p>
            </div>

            <div className="form-group ">
              <label htmlFor="inputEmail4" className="fw-bold">
                Email<span className="text-danger">*</span>
              </label>
              <input
                {...register("email")}
                type="email"
                className="form-control"
                id="inputEmail4"
                placeholder="Email"
              />
              <p className="text-danger">{errors.email?.message}</p>
            </div>

            <div className="form-group">
              <label htmlFor="inputPassword4" className="fw-bold">
                Password<span className="text-danger">*</span>
              </label>
              <input
                {...register("password")}
                type="password"
                className="form-control"
                id="inputPassword4"
                placeholder="Password"
              />
              <p className="text-danger">{errors.password?.message}</p>
            </div>

            <div className="form-group ">
              <label htmlFor="phonenumber" className="fw-bold">
                Phone Number
              </label>
              <input
                {...register("phoneNumber")}
                type="number"
                className="form-control"
                id="phonenumber"
                placeholder="Phone Number"
              />
              <p className="text-danger">{errors.phoneNumber?.message}</p>
            </div>

            <div className="form-group ">
              <label htmlFor="age" className="fw-bold">
                Age
              </label>
              <input
                {...register("age")}
                type="number"
                className="form-control"
                id="age"
                placeholder="Age"
              />
              <p className="text-danger">{errors.age?.message}</p>
            </div>

            <label htmlFor="btnradio  " className="fw-bold">
              Gender<span className="text-danger">*</span>
            </label>
            <br />
            <div
              className="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                {...register("gender", { required: "Gender is required" })}
                type="radio"
                className="btn-check"
                name="gender"
                id="btnradio1"
                value="Male"
              />
              <label
                className="btn btn-outline-warning text-black"
                htmlFor="btnradio1"
              >
                Male
              </label>

              <input
                {...register("gender")}
                type="radio"
                className="btn-check"
                name="gender"
                id="btnradio2"
                value="Female"
              />
              <label
                className="btn btn-outline-warning text-black"
                htmlFor="btnradio2"
              >
                Female
              </label>
            </div>
            <p className="text-danger">
              {errors.gender && "Gender is required"}
            </p>
            <div className="text-black ">
              <input type="checkbox" id="terms" {...register("terms")} />
              <label htmlFor="terms" className="mx-2"> I Agree All Terms & Conditions</label>
            </div>
            <br />
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary w-100">
                Sign up
              </button>
            </div>
            <br />
           {/* <div className="d-flex justify-content-center">
              <p>Already have an account?</p>
              <br />
              <Link to="/" style={{ textDecoration: "none" }}>
                Log In
              </Link>
            </div> */}
            <div >
              <div className="d-flex justify-content-center">Already have an account?</div>
              <div className="d-flex justify-content-center ">
              <Link to="/" style={{ textDecoration: "none" }}>
              Log In
              </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
