import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { searchContext } from "../App";
import DataItem from "./DataItem";
import ReactPaginate from "react-paginate";

interface dataProps {
  products:any;
  setProducts:any
}

function Data(props: dataProps) {
  const [cartId, setCartId] = useState<number[]>([]);
  const [cart, setCart] = useState<any[]>([]);
   const [backToHome, setBackToHome] = useState([]);
  

  useEffect(() => {
    if(window.localStorage.getItem("cart")!)
    {
    setBackToHome(JSON.parse(window.localStorage.getItem("cart")!));
    setCartId([]);
    setCartId(
      backToHome.map((item: any) => {
        return item.productId;
      })
    );
    }
  }, [cart]);

  return (
    <>
      {
        <div className="row m-0">
          <div className="row">
            {props.products.map((product: any, index: number) => {
              // if (selectedCategories.includes(product.categoryId)) {
                // console.log("cartId", cartId.includes(product.productId));
                if (cartId.includes(product.productId)) {
                  // console.log()
                  const obj = backToHome.find(
                    (item: any) => item.productId === product.productId
                  );
                  return (
                    <DataItem
                      products={props.products}
                      setProducts={props.setProducts}
                      jsonObj={obj}
                      cart={cart}
                      setCart={setCart}
                      key={index}
                    />
                  );
                } else {
                  // console.log("product", product.productId);
                  return (
                    <DataItem
                      products={props.products}
                      setProducts={props.setProducts}
                      jsonObj={product}
                      cart={cart}
                      setCart={setCart}
                      key={index}
                    />
                  );
                }
              // } else {
              //   return null;
              // }
            })}
          </div>
        </div>
      }

    </>
  );
}

export default Data;
