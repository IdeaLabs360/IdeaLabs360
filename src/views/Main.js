import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Landing } from "./Landing";
import { Portfolio } from "./Portfolio";

export const Main = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ marginTop: "10px" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={6}>
            <Grid xs={12}>
              <Landing />
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
