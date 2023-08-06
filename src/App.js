import { Box, CssBaseline, Container } from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2";
import { Header } from "./views/Header";
import { Gallery } from "./views/Gallery";
import { GetAQuote } from "./views/GetAQuote";

function App() {
  return (
    <>
      <Header />

      <CssBaseline />

      <Container maxWidth="lg" sx={{ marginTop: "10px" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <GetAQuote />
            </Grid>

            <Grid item xs={12}>
              <Gallery />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default App;
