import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Home } from "./views/Home";
import { GetAQuote } from "./views/GetAQuote";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#FFFF00",
    },
    button: {
      primary: "#800000",
    },
    icon: {
      primary: "#4A91BF",
    },
  },
  typography: {
    h4: {
      lineHeight: "inhert",
    },
  },
});

const router = createBrowserRouter([
  {
    path: "*",
    element: <Home />,
  },
  {
    path: "/quote",
    element: <GetAQuote />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
