import "./App.css";
import { useRef } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, CssBaseline, Container } from "@mui/material";
import { Header } from "./views/Header";

import Grid from "@mui/material/Unstable_Grid2";
import { Gallery } from "./views/Gallery";
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

function App() {
  const contactUsRef = useRef(null);

  const galleryRef = useRef(null);

  const pages = [{ name: "Gallery", ref: galleryRef }];

  return (
    <ThemeProvider theme={theme}>
      <Header contactUsRef={contactUsRef} pages={pages} />

      <CssBaseline />

      <Container maxWidth="lg" sx={{ marginTop: "10px" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={6}>
            <Grid item xs={12} ref={contactUsRef}>
              <GetAQuote />
            </Grid>

            <Grid item xs={12} ref={galleryRef}>
              <Gallery />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
