import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Home } from "./views/Home";
import { Header } from "./views/Header";
import { Footer } from "./views/Footer";
import { PrintQuote } from "./routes/print/PrintQuote";
import { DesignQuote } from "./routes/design/DesignQuote";
import { Success } from "./views/Success";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4A91BF",
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
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

const router = createHashRouter([
  {
    path: "*",
    element: <Home />,
  },
  {
    path: "/design/quote",
    element: <DesignQuote />,
  },
  {
    path: "/print/quote",
    element: <PrintQuote />,
  },
  {
    path: "/return",
    element: <Success />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
