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
      main: "#E33E7F",
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
