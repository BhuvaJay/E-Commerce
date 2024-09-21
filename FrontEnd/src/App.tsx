import React, { createContext, useState } from "react";
import "./App.css";
import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { Dna } from "react-loader-spinner";
const Navbar = React.lazy(() => import("./Components/Navbar"));
const Category = React.lazy(() => import("./Components/Category"));
const Cart = React.lazy(() => import("./Components/Cart"));
const SignupForm = React.lazy(() => import("./Components/SignupForm"));
const LoginForm = React.lazy(() => import("./Components/LoginForm"));
const Payment = React.lazy(() => import("./Components/Payment"));

export const searchContext: any = createContext("");

function App() {
  const [search, setSearch] = useState<string>("");

  return (
    <Router>
      <Suspense
        fallback={
          <Dna
            height={100}
            width={100}
            wrapperClass="dna"
            visible={true}
            ariaLabel="dna-loading"
          />
        }
      >
        <Navbar search={search} setSearch={setSearch} title={"E-Commerce"} />
        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/" element={<LoginForm />} />

          <Route
            path="/products"
            element={
              <searchContext.Provider value={{ search, setSearch }}>
                <Category />
              </searchContext.Provider>
            }
          />

          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
