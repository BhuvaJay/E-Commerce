import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, string } from "zod";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Swal from "sweetalert2";

const schema = z.object({
  loginEmail: string().min(1, "Email is required").email("Invalid email"),
  loginPassword: string()
    .regex(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Password Should Contain Minimum 8 characters , with at least one symbol, upper and lower case letters and a number"
    )
    .min(1, "Password is required"),
});
type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

  function submitLogInForm(data: any) {
    axios
      .post("http://localhost:5000/users/login", {
        email: data.loginEmail,
        password: data.loginPassword,
      })
      .then((res: any) => {
        localStorage.setItem("token", res.data.data.token);
        // localStorage.setItem("cart", JSON.stringify([]));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Log In Successfully",
          showConfirmButton: false,
          timer: 1700,
        }).then(function () {
          window.location.href = "/products";
        });
        // navigate("/payment", { state: { subTotal: location.state.subTotal } });
      })
      .catch((err: any) => {
        console.log("error in login", err);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Please enter Valid Password or Email address",
          showConfirmButton: false,
          timer: 1700,
        });
      });
  }

  return (
    <>
      <div className="d-flex justify-content-center m-3 mt-5">
        <div className="p-3 rounded bg-light mt-5 w-25 shadow border">
          <form onSubmit={handleSubmit(submitLogInForm)}>
            <label className="mb-3 text-center w-100">
              <span className="h3 text-uppercase ">login Page</span>
            </label>

            <div className="form-group ">
              <label htmlFor="inputEmail4" className="fw-bold">
                Email<span className="text-danger fw-bold">*</span>
              </label>
              <input
                {...register("loginEmail")}
                type="text"
                className="form-control mb-3"
                id="inputEmail4"
                placeholder="Email"
              />
              <p className="text-danger">{errors.loginEmail?.message}</p>
            </div>

            <div className="form-group">
              <label htmlFor="inputPassword4" className="fw-bold">
                Password<span className="text-danger fw-bold">*</span>
              </label>
              <input
                {...register("loginPassword")}
                type="password"
                className="form-control mb-3"
                id="inputPassword4"
                placeholder="Password"
              />
              <p className="text-danger">{errors.loginPassword?.message}</p>
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary w-100">
                Log In
              </button>
            </div>
            <br />
            <div >
              <div className="d-flex justify-content-center">Don't have an account?</div>
              <div className="d-flex justify-content-center ">
              <Link to="/signup" style={{ textDecoration: "none" }}>
                Sign Up
              </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
