import React, { useEffect, useState } from "react";
import pencil from "../assests/pencil.jpeg";
import StarRating from "./StarRating";
interface cartItemProps {
  cartObj: any;
  removeProduct: any;
  cart: any;
  setCart: any;
}
export default function CartItem(props: cartItemProps) {
  const [cartQuantity, setCartQuantity] = useState(props.cartObj.quantity);
  //   useEffect(() => {
  //       setCartQuantity(props.cartObj.quantity)
  //   }, [])

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(props.cart));
  }, [props.cart]);

  function decreaseQuantity(productId: number) {
    const objIndex = props.cart.findIndex((item: any) => item.productId === productId);
    props.setCart(
      props.cart.map((item: any, i: number) => {
        if (i === objIndex && cartQuantity > 1) {
          item.quantity = cartQuantity - 1;
          return item;
        } else {
          return item;
        }
      })
    );
    if (cartQuantity > 1) setCartQuantity(cartQuantity - 1);
  }

  function increaseQuantity(productId: number) {
    const objIndex = props.cart.findIndex((item: any) => item.productId === productId);
    props.setCart(
      props.cart.map((item: any, i: number) => {
        if (i === objIndex) {
          item.quantity = cartQuantity + 1;
          return item;
        } else {
          return item;
        }
      })
    );
    setCartQuantity(cartQuantity + 1);
  }

  return (
    <div key={props.cartObj.productId} id="Card" className="card mb-3 shadow border">
      <div className="row g-0">
        <div className="col-md-4 d-flex justify-content-center mt-1">
          <img
            id="CartImg"
            src={props.cartObj.image}
            className="img-fluid rounded-start"
            alt="..."
            style={{ maxHeight: "15rem", maxWidth: "13rem" }}
          />
        </div>
        <div className="col-md-8 bg-light">
          <div className="card-body">
            <h4 className="card-title">{props.cartObj.name}</h4>
            <div>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartQuantity}
              </span>
            </div>
            <h6 className="card-title">Price :- ₹{props.cartObj.price}</h6>
            {/* <p className="card-text">Rating :- {props.cartObj.rating}</p> */}
            <div className="mb-2">
            <StarRating rating={props.cartObj.rating} />
          </div>
            <h6 className="card-text">Discount :- {props.cartObj.discount}%</h6>
            <div className="input-group ">
              <div className="input-group-prepend ">
                <button
                  className="btn btn-secondary btn-sm cartQuantityButton"
                  type="button"
                  onClick={() => decreaseQuantity(props.cartObj.productId)}
                >
                  -
                </button>
              </div>
              <h4>
                <span className="badge bg-light text-dark">{cartQuantity}</span>
              </h4>
              <div className="input-group-prepend cartQuantityButton">
                <button
                  className="btn btn-secondary btn-sm"
                  type="button"
                  onClick={() => increaseQuantity(props.cartObj.productId)}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="btn btn-outline-primary"
              onClick={() => props.removeProduct(props.cartObj.productId)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
