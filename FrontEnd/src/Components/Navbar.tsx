import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { HiOutlineHome } from "react-icons/hi";
import Swal from "sweetalert2";

interface navbarProps {
  title: string;
  search: string;
  setSearch: any;
}

export default function Navbar(props: navbarProps) {
  const navigate = useNavigate();

  const path: string | undefined = window.location.pathname
    .split("/")
    .find((item: string) => {
      return item === "products";
    });

  const authToken = localStorage.getItem("token");

  // useEffect(() => {
  //   setCount(JSON.parse(localStorage.getItem("cart")!).length);
  // }, [localStorage.getItem("cart")!.length]);

  function searchItem(e: React.ChangeEvent<HTMLInputElement>) {
    props.setSearch(e.target.value);
  }

  return (
    authToken && (
      <>
        <div>
          <nav className="navbar navbar-expand-lg bg-body-tertiary ">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/products">
                {props.title}
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <Link to="/products">
                    <li
                      className="h5 nav-item p-2 my-auto"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontFamily: "bold",
                      }}
                    >
                      <HiOutlineHome />
                    </li>
                  </Link>
                  <div onClick={() => navigate("/cart")}>
                    <li
                      className="h5 nav-item p-2 my-auto"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontFamily: "bold",
                      }}
                    >
                      <div>
                        <TiShoppingCart />
                        {/* <span className="badge bg bg-danger" id="lblCartCount" >
                        {props.count!==0?props.count:null}
                      </span> */}
                      </div>
                    </li>
                  </div>
                </ul>
                {path && (
                  <form className="d-flex" role="search">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      onChange={(e) => searchItem(e)}
                    />
                  </form>
                )}
                <div>
                  <button
                    type="button"
                    className="btn btn-outline-primary me-2 py-1"
                    onClick={() => {
                      localStorage.getItem("token")
                        ? (window.localStorage.clear(),
                          Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Log Out Successfully",
                            showConfirmButton: false,
                            timer: 1000,
                          }).then(function () {
                            window.location.href = "/";
                          }))
                        : alert("Please Log In First");
                    }}
                  >
                    LogOut
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </>
    )
  );
}
