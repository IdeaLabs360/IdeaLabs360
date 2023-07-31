import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import { Services } from "./Services";
import { Portfolio } from "./Portfolio";

export const Main = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ marginTop: "10px" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Services />
            </Grid>
            <Grid xs={12}>
              <Portfolio />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};
