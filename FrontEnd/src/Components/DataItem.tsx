import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface dataItemProps {
  jsonObj: any;
  cart: any;
  setCart: any;
  setProducts: any;
  products: any;
}

export default function DataItem(props: dataItemProps) {
  // console.log(props, "props");

  // console.log('props.jsonObj.quantity', props.jsonObj.quantity)
  // console.log('props.jsonObj', props.jsonObj)
  const jsonQuntity: number = props.jsonObj.quantity
    ? props.jsonObj.quantity
    : 0;
  console.log("jsonQuntity", jsonQuntity);
  const [added, setAdded] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    setQuantity(jsonQuntity);
  }, [props.jsonObj.quantity]);

  //Bhakti
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("cart")!)?.length > 0) {
      props.setCart(JSON.parse(localStorage.getItem("cart")!));
    }
  }, []);

  //Set cart when data is added into cart
  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(props.cart));
  }, [props.cart]);

  // function decreaseQuantity() {
  //   if (quantity > 1) setQuantity(quantity - 1);
  // }

  // function increaseQuantity() {
  //   setQuantity(quantity + 1);
  // }

  function decreaseQuantity() {
    const index = props.cart.findIndex(
      (item: any) => item.productId === props.jsonObj.productId
    );
    if (index !== -1 && props.jsonObj.quantity > 1) {
      setQuantity(quantity - 1);
      props.jsonObj.quantity -= 1;
    } else if (props.jsonObj.quantity > 1) {
      const index = props.products.findIndex(
        (item: any) => item.productId === props.jsonObj.productId
      );
      const Quantity = props.products[index].quantity;
      const Arr = props.products.map((item: any) => {
        if (item.productId === props.jsonObj.productId) {
          return { ...props.products[index], quantity: Quantity - 1 };
        } else {
          return item;
        }
      });
      props.setProducts(Arr);
    }
  }

  function increaseQuantity() {
    const index = props.cart.findIndex(
      (item: any) => item.productId === props.jsonObj.productId
    );
    if (index !== -1) {
      setQuantity(quantity + 1);
      props.jsonObj.quantity += 1;
    } else {
      const index = props.products.findIndex(
        (item: any) => item.productId === props.jsonObj.productId
      );
      const Quantity = props.products[index].quantity;
      console.log("Quantity", Quantity);
      const Arr = props.products.map((item: any) => {
        if (item.productId === props.jsonObj.productId) {
          console.log(item);
          return { ...props.products[index], quantity: Quantity + 1 };
        } else {
          return item;
        }
      });
      props.setProducts(Arr);
    }
  }

  function AddtoCart(obj: any) {
    setAdded(true);
    const objIndex = props.cart.findIndex(
      (item: any) => item.productId === obj.productId
    );
    if (objIndex === -1) {
      props.setCart([...props.cart, { ...obj, quantity: quantity }]);
    } else {
      props.setCart(
        props.cart.map((item: any, i: number) => {
          if (i === objIndex) {
            item.quantity = quantity;
            return item;
          } else {
            return item;
          }
        })
      );
      // props.cart[objIndex].quantity = quantity;
    }
    toast.success("Product Added Succesfully!", {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <>
      <div key={props.jsonObj.productId} className="col-md-3 mt-3  ">
        <ToastContainer />
        <div className="card h-auto shadow border" id="Card">
          <div className="d-flex justify-content-center my-2">
            <img
              src={props.jsonObj.image}
              alt="..."
              style={{ height: "30vh", width: "auto" }}
            />
          </div>
          <div className="card-body bg-light">
            <h4 className="card-title">{props.jsonObj.name}</h4>
            <h6 className="card-title">Price :- ₹{props.jsonObj.price}</h6>
            {/* <p className="card-text">Rating :- {props.jsonObj.rating}</p> */}
            <div className="mb-2">
              <StarRating rating={props.jsonObj.rating} />
            </div>
            <div>
              {props.jsonObj.quantity ? (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {props.jsonObj.quantity}
                </span>
              ) : null}
            </div>
            <h6 className="card-title">
              Discount :- {props.jsonObj.discount}%
            </h6>
            <div className="input-group ">
              <div className="input-group-prepend ">
                <button
                  className="btn btn-secondary btn-sm quantityButton"
                  type="button"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
              </div>
              <h4>
                <span className="badge bg-light text-dark">
                  {props.jsonObj.quantity}
                </span>
              </h4>
              <div className="input-group-prepend quantityButton">
                <button
                  className="btn btn-secondary btn-sm"
                  type="button"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => AddtoCart(props.jsonObj)}
              disabled={quantity === 0}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

