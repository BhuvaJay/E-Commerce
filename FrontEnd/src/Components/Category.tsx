import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { searchContext } from "../App";
import Data from "./Data";

export default function Category() {
  const [catArr, setCatArr] = useState<number[]>([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([
    1, 2, 3,
  ]);

  const itemsPerPage = 4;
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [skipItems, setSkipItems] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const token = localStorage.getItem("token");
  const search: any = useContext(searchContext);

  useEffect(() => {
    console.log("setsearch");
    search.setSearch("");
  }, []);

  useEffect(() => {
    console.log("search change");

    const getProducts = async (skipItems: number) => {
      await axios
        .get(
          `http://localhost:5000/Products-Categorys-Search/${JSON.stringify(
            selectedCategories
          )}?limit=${itemsPerPage}&skip=${skipItems}&sortBy=productId:asc&search=${
            search.search
          }`,
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res: any) => {
          // console.log("res", res);
          setProducts(res.data.data.result);
          setTotalPages(res.data.data.count / itemsPerPage);
        })
        .catch((error: any) => {
          console.log("error", error);
        });
    };
    const debouncing = setTimeout(() => {
      getProducts(skipItems);
    }, 500);

    setSkipItems(0);
    setPageNumber(0);
    return () => clearTimeout(debouncing);
  }, [search.search, selectedCategories]);

  useEffect(() => {
    console.log("skipItems Change");

    const getProducts = async (skipItems: number) => {
      await axios
        .get(
          `http://localhost:5000/Products-Categorys-Search/${JSON.stringify(
            selectedCategories
          )}?limit=${itemsPerPage}&skip=${skipItems}&sortBy=productId:asc&search=${
            search.search
          }`,
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res: any) => {
          // console.log("res", res);
          setProducts(res.data.data.result);
          setTotalPages(res.data.data.count / itemsPerPage);
        })
        .catch((error: any) => {
          console.log("error", error);
        });
    };
    // const debouncing = setTimeout(() => {
    getProducts(skipItems);
    // }, 500);
    // return ()=> clearTimeout(debouncing);
  }, [skipItems]);

  useEffect(() => {
    console.log("catArr", catArr);
    axios
      .get(
        "http://localhost:5000/Categorys?limit=50&skip=0&sortBy=categoryid:asc",
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        // console.log("categories", res.data.data.result);
        setCategories(res.data.data.result);
      })
      .catch((err) => {
        console.log("Error in getting categories", err);
      });
  }, []);

  useEffect(() => {
    console.log("catarr change");

    if (catArr.length !== 0) {
      setSelectedCategories(catArr);
    } else {
      setSelectedCategories([1, 2, 3]);
    }
  }, [catArr]);

  function handelChange(e: any) {
    if (e.target.checked) {
      setCatArr((old: any) => [...old, parseInt(e.target.value)]);
    } else {
      setCatArr((old: any) =>
        old.filter((ele: any) => ele !== parseInt(e.target.value))
      );
    }
  }

  function handlePageChange(data: any) {
    setSkipItems(data.selected * itemsPerPage);
    setPageNumber(data.selected);
  }

  return (
    <>
      <div className="row m-0">
        <div
          className="btn-group mt-3"
          role="group"
          aria-label="Basic checkbox toggle button group"
        >
          {categories.map((item: any) => {
            return (
              <React.Fragment key={item.categoryid}>
                <input
                  key={item.categoryid}
                  type="checkbox"
                  className="btn-check rounded"
                  id={`btncheck${item.categoryid}`}
                  name="category"
                  value={item.categoryid}
                  onChange={(e) => handelChange(e)}
                />
                <label
                  className="btn btn-outline-primary "
                  htmlFor={`btncheck${item.categoryid}`}
                >
                  {item.name}
                </label>
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <Data products={products} setProducts={setProducts} />
      <div className="mt-3 d-flex justify-content-center container-fluid">
        {products.length !== 0 && (
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageChange}
            pageRangeDisplayed={4}
            marginPagesDisplayed={1}
            pageCount={totalPages}
            previousLabel="Previous"
            activeClassName={"active"}
            containerClassName={"pagination"}
            forcePage={pageNumber}
          />
        )}
      </div>

      {products.length === 0 ? (
        <div className="w-100 container customHeight d-flex justify-content-center  ">
          <img
            src="https://cdn.dribbble.com/users/1231865/screenshots/11157048/media/bc9427646c632ded563ee076fdc5dfda.jpg"
            alt="No Item Found"
            className="w-100 h-75 customHeight image-fluid d-flex justify-content-center"
          />
          {/* <h1 className="d-flex justify-content-center">NO Items Found</h1> */}
        </div>
      ) : null}
    </>
  );
}
