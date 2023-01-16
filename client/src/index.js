import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { CartProvider } from "./components/Header/CartContext";

// the context we created
ReactDOM.render(
  // <React.StrictMode>
  <CartProvider>
    <App />
  </CartProvider>,
  // </React.StrictMode>
  document.getElementById("root")
);
