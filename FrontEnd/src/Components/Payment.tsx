import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, string } from "zod";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import InputMask from "react-input-mask";

const schema = z.object({
  email: string().min(1, "Email is required").email("Invalid email"),
  cardDetails: string()
    .min(1, "Card Number is required")
    .regex(/^[1-9][0-9]{3}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/, "Invalid Card Number"),
  cardExpiry: string()
    .min(1, "Card Expiry is required")
    .regex(/^(([0][1-9])|([1][0+1+2]))\/[0-9]{2}$/, "Invalid Card Expiry"),
  cvv: string()
    .min(1, "CVV is required")
    .regex(/^[0-9]{3,4}$/, "Invalid CVV"),
  cardHolderName: string()
    .min(1, "Card Holder Name is required")
    .regex(/^[a-zA-Z]+([ ][a-zA-Z]+){0,1}$/, "Invalid Card Holder Name"),
  state: string().min(1, "State is required"),
  city: string().min(1, "City is required"),
  zipCode: string()
    .min(1, "Zip Code is required")
    .regex(/^[0-9]{4,6}$/, "Invalid Zip Code"),
  address: string().min(1, "Address is required"),
});
type paymentFormData = z.infer<typeof schema>;

export default function Payment() {
  const GetInvoice = (paymentData: any, cartData: any, totalAmount: number) => {
    console.log("From get Invoice");
    const date = new Date();
    const doc = new jsPDF();
    autoTable(doc, {
      body: [
        [
          {
            content: "Synoverge Technologies PVT. LTD.",
            styles: {
              halign: "left",
              fontSize: 20,
              textColor: "#ffffff",
            },
          },
          // {
          //   content: "Invoice",
          //   styles: {
          //     halign: "right",
          //     fontSize: 20,
          //     textColor: "#ffffff",
          //   },
          // },
        ],
      ],
      theme: "plain",
      styles: {
        fillColor: "#3366ff",
      },
    });
    autoTable(doc, {
      body: [
        [
          {
            content:
              // "Reference: #INV0001" +
              `\nDate: ${date.getDate()}-${
                date.getMonth() + 1
              }-${date.getFullYear()}` +
              `\nInvoice number: ${Math.floor(Math.random() * 10000)}`,
            styles: {
              halign: "right",
            },
          },
        ],
      ],
      theme: "plain",
    });
    autoTable(doc, {
      body: [
        [
          {
            content:
              "Billed to:" +
              `\n${paymentData.cardHolderName}` +
              `\n${paymentData.email}`,
            // `\n${paymentData.address}` +
            // `\n${paymentData.zipCode}` +
            // `\n${paymentData.state}`,
            styles: {
              halign: "left",
            },
          },
          {
            content:
              "Shipping address:" +
              // `\n${paymentData.cardHolderName}` +
              `\n${paymentData.address}` +
              `\n${paymentData.state}` +
              `\n${paymentData.zipCode}`,
            styles: {
              halign: "left",
            },
          },
          {
            content:
              "From:" +
              // "\nJay" +
              "\nSynoverge Technologies PVT. LTD." +
              "\nSUNRISE PARK ROAD" +
              "\nAHMEDABAD" +
              "\nGUJARAT",
            styles: {
              halign: "right",
            },
          },
        ],
      ],
      theme: "plain",
    });

    autoTable(doc, {
      body: [
        [
          {
            content: "Total Amount ",
            styles: {
              halign: "right",
              fontSize: 14,
            },
          },
        ],
        [
          {
            content: `${totalAmount}`,
            styles: {
              halign: "right",
              fontSize: 17,
              textColor: "#3366ff",
            },
          },
        ],
        // [
        //   {
        //     content: `Due date: ${date.getDate()}-${
        //       date.getMonth() + 1
        //     }-${date.getFullYear()}`,
        //     styles: {
        //       halign: "right",
        //     },
        //   },
        // ],
      ],
      theme: "plain",
    });

    autoTable(doc, {
      body: [
        [
          {
            content: "Products & Services",
            styles: {
              halign: "left",
              fontSize: 14,
            },
          },
        ],
      ],
      theme: "plain",
    });
    autoTable(doc, {
      head: [["Items", "Quantity", "Price", "Discount", "Tax", "Amount"]],
      body: cartData.map((item: any) => {
        return [
          item.name,
          item.quantity,
          item.price,
          `${(item.price * item.discount) / 100}(${item.discount}%)`,
          "0",
          item.quantity * item.price,
        ];
      }),
      theme: "grid",
      headStyles: {
        fillColor: "#343a40",
      },
    });
    autoTable(doc, {
      body: [
        [
          {
            content: "Total amount:",
            styles: {
              halign: "right",
            },
          },
          {
            content: `${totalAmount}`,
            styles: {
              halign: "right",
            },
          },
        ],
      ],
      theme: "plain",
    });
    autoTable(doc, {
      body: [
        [
          {
            content: "Terms & notes",
            styles: {
              halign: "left",
              fontSize: 14,
            },
          },
        ],
        [
          {
            content:
              "This Application is Created by Jay Bhuva " +
              "During React Training",
            styles: {
              halign: "left",
            },
          },
        ],
      ],
      theme: "plain",
    });
    autoTable(doc, {
      body: [
        [
          {
            content: "Thank you for Shopping",
            styles: {
              halign: "center",
            },
          },
        ],
      ],
      theme: "plain",
    });
    doc.save("invoice.pdf");
  };

  const countries: any = {
    India: ["Delhi", "Mumbai"],
    Pakistan: ["Karachi", "Lahore"],
    Bangladesh: ["Dhaka", "Chittagong"],
  };

  const [country, setCountry] = useState("");
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<paymentFormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const token = localStorage.getItem("token");

  const addCartToDb = async (data: any) => {
    axios
      .post("http://localhost:5000/Carts", data, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        console.log("response from axios get", res.data.data.result);
      })
      .catch((err: any) => {
        console.log(err, "<-----errr");
      });
  };

  function handlePayment(data: any) {
    axios
      .get("http://localhost:5000/checkUser", {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        const cartData = JSON.parse(localStorage.getItem("cart")!);
        if (cartData) {
          cartData.map((item: any) => {
            addCartToDb({ ...item, userid: res.data.data.user.userId });
          });
        }
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Payment Successful",
          showCancelButton: true,
          confirmButtonText: "Download Invoice",
          // timer: 1700,
        }).then((result) => {
          if (result.isConfirmed) {
            GetInvoice(data, cartData, location.state.subTotal);
            // Swal.fire("Pdf downloaded!", "", "success");
          }
        });
      })
      .catch((err: any) => {
        console.log("error", err.message);
      });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handlePayment)}
        className="container d-lg-flex justify-content-center mt-4 bg-light rounded w-50 shadow border"
      >
        <div>
          <label className="mt-3 d-flex justify-content-center ">
            <span className="h4">Payment Details</span>
          </label>

          <div className="form-group ">
            <label htmlFor="inputEmail4" className="fw-bold">
              Email<span className="text-danger fw-bold">*</span>
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

          <div>
            <label htmlFor="paymentcard" className="fw-bold">
              Card details<span className="text-danger fw-bold">*</span>
            </label>
            <div className="d-flex align-items-center justify-content-between card-atm ">
              <div>
                <InputMask
                  {...register("cardDetails")}
                  type="text"
                  mask="9999-9999-9999-9999"
                  className="form-control"
                  id="paymentcard"
                  placeholder="1111-2222-3333-4444"
                />
                <p className="text-danger">{errors.cardDetails?.message}</p>
              </div>

              {/* <div className="d-flex w-auto"> */}
              <div className="mx-2">
                <InputMask
                  {...register("cardExpiry")}
                  type="text"
                  mask="99/99"
                  className="form-control"
                  placeholder="MM/YY"
                />
                <p className="text-danger">{errors.cardExpiry?.message}</p>
              </div>

              <div>
                <input
                  {...register("cvv")}
                  type="password"
                  className="form-control"
                  placeholder="CVV"
                />
                <p className="text-danger">{errors.cvv?.message}</p>
              </div>
              {/* </div> */}
            </div>

            <div className="form-group ">
              <label htmlFor="cardholderName" className="fw-bold">
                Cardholder Name<span className="text-danger fw-bold">*</span>
              </label>
              <input
                {...register("cardHolderName")}
                type="text"
                className="form-control"
                id="cardholderName"
                placeholder="Cardholder Name"
              />
              <p className="text-danger">{errors.cardHolderName?.message}</p>
            </div>

            <label htmlFor="cardholderName" className="fw-bold">
              Billing address<span className="text-danger fw-bold">*</span>
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              {...register("state", { required: true })}
              onChange={(e) => {
                console.log(e.target.value);
                setCountry(e.target.value);
              }}
            >
              <option value="">Please Select State</option>
              {/* <option value="Gujarat">Gujarat</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Delhi">Delhi</option> */}

              {Object.keys(countries).map((item: any) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
            <p className="text-danger">{errors.state?.message}</p>

            <select
              value={country}
              className="form-select"
              aria-label="Default select example"
              {...register("city", { required: true })}
            >
              <option value="">Please Select City</option>
              {countries[country] &&
                countries[country].map((item: string[]) => {
                  return <option value={item}>{item}</option>;
                })}
            </select>
            <p className="text-danger">{errors.city?.message}</p>

            <div className="d-flex align-items-center justify-content-between card-atm">
              <div className="w-50 me-1">
                <input
                  {...register("zipCode")}
                  type="text"
                  className="form-control"
                  placeholder="ZIP"
                />
                <p className="text-danger">{errors.zipCode?.message}</p>
              </div>

              <div className="w-50 ms-1">
                <input
                  {...register("address")}
                  type="text"
                  className="form-control"
                  placeholder="Address"
                />
                <p className="text-danger">{errors.address?.message}</p>
              </div>
            </div>
            <div className="d-flex flex-column dis mb-2">
              <button type="submit" className="btn btn-primary my-2">
                Pay ₹{location.state.subTotal}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
