import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import ThreeDimLanding from "./ThreeDimLanding";

import HomePage from "./HomePage";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GlobalStyles from "./GlobalStyles";
import Cart from "./Header/Cart";
import Profile from "./Profile";
import SideMenu from "./Header/SideMenu";

import Contact from "./Footer/Contact";
import FAQ from "./Footer/FAQ";
import Careers from "./Footer/Careers";
import ItemDetails from "./ItemDetails";

import AllItems from "./AllItems";
import Category from "./Category";
import AboutUs from "./AboutUs";
import ByCompany from "./ByCompany";
import Checkout from "./Checkout";
import Confirmation from "./Confirmation";
import SignIn from "./SignIn";
import BodyLocation from "./BodyLocation";

function App() {

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Navbar />
      <Main>
        <Routes>
          <Route path="/" element={<ThreeDimLanding />}></Route>
          <Route path="/Home" element={<HomePage />}></Route>
          <Route path="/item/:itemId" element={<ItemDetails />}></Route>
          <Route path="/category" element={<Category />}></Route>
          <Route path="/about" element={<AboutUs />}></Route>
          <Route path="/company" element={<ByCompany />}></Route>
          <Route path="/bodyLocation" element={<BodyLocation />}></Route>
          <Route path="/items" element={<AllItems />} />
          <Route path="/cart" element={<Cart userId={"12346"} />}></Route>
          <Route
            path="/checkout"
            element={<Checkout userId={"12346"}/>}
          ></Route>

          <Route
            path="/confirmation"
            element={<Confirmation userId={"12346"} />}
          ></Route>

          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/FAQ" element={<FAQ />}></Route>
          <Route path="/careers" element={<Careers />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
        </Routes>
      </Main>
      <Footer />
    </BrowserRouter>
  );
}

const Main = styled.div``;
export default App;
