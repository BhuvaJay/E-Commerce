import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";

var total: number, discount: number;
export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<any[]>([]);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [totalDiscount, setTotalDiscount] = useState<number>(0);

  useEffect(() => {
    setCart(JSON.parse(window.localStorage.getItem("cart")!));
  }, [window.localStorage.getItem("cart")]);

  useEffect(() => {
    total = 0;
    discount = 0;
    cart.map((item) => {
      total +=
        item.price * item.quantity -
        (item.price * item.discount * item.quantity) / 100;
      discount += (item.price * item.discount * item.quantity) / 100;
    });
    setSubTotal(total);
    setTotalDiscount(discount);
  }, [cart]);

  function removeProduct(productId: Number) {
    let updatedVal = cart.filter((product: any) => {
      return product.productId !== productId;
    });
    setCart(updatedVal);
    window.localStorage.setItem("cart", JSON.stringify(updatedVal));
    window.location.reload();
  }

  // function addCartToDb(){
  //   console.log('cart going to DB', cart)
  //   navigate("/payment",{state:{subTotal:subTotal}})
  // }

  return (
    <>
      {cart.length === 0 ? (
        <div className="text-center">
          <h1>Your Cart Is Empty Please Add Items</h1>
          <button className="btn btn-primary m-3" onClick={() => navigate("/products")}>
            Add Item
          </button>
        </div>
      ) : (
        <div className="row m-0">
          <div id="cartItem" className="col-8 p-3">
            {cart.map((ele: any, index: any) => {
              // {console.log(ele,index);}
              return (
                <CartItem
                  cart={cart}
                  setCart={setCart}
                  key={index}
                  cartObj={ele}
                  removeProduct={removeProduct}
                />
              );
            })}
          </div>
          <div className="col-sm-3 mt-3" >
            <div id="Total" className="card m-auto bg-light" >
              <div className="card-body" id="cartDetails">
                <h5 className="card-title">Price Details</h5>

                {cart.map((item: any, i: number) => {
                  return (
                    <div key={i}>
                      <div className="row">
                        <div className="col-sm-8">
                          {`${item.name} (Qty-${item.quantity})`}
                        </div>
                        <div className="col-sm-4 d-flex justify-content-center">
                          {`₹${item.price * item.quantity}`}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-8">
                          <p>Discount</p>
                        </div>
                        <div className="col-sm-4 d-flex justify-content-center">
                          <p style={{ color: "green" }}>{`-₹${
                            (item.price / 100) * item.discount * item.quantity
                          }`}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <hr className="dashed" />
                {/* <div className="row bg bg-success text-white h-100 rounded"> */}
                <div className="row">
                  <div className="col-sm-8 ">
                    <h6 className="my-auto">Total Amount</h6>
                  </div>
                  <div className="col-sm-4 d-flex justify-content-center">
                    <h6>₹{subTotal}</h6>
                  </div>
                </div>
                <p className="text-success">
                  You will save ₹{totalDiscount} on this order
                </p>
                <div className="row bg bg-success bg-opacity-25 text-white rounded">
                  <div className="h5 col-sm-6 my-auto text-dark">
                    ₹{subTotal}
                  </div>
                  <div className="col-sm-6 my-2 d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-warning px-4 fw-bold"
                      onClick={() =>
                        navigate("/payment", { state: { subTotal: subTotal } })
                      }
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
