import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Header } from "./views/Header";
import { Main } from "./views/Main";

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
      primary: "#800000",
    },
  },
  typography: {
    h4: {
      lineHeight: "inhert",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Main />
    </ThemeProvider>
  );
}

export default App;
