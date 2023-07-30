import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";

export const Main = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ marginTop: "5px" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid xs={12}>Greeting</Grid>
            <Grid xs={12}>Testimonials</Grid>
            <Grid xs={12}>Portfolio</Grid>
            <Grid xs={12}>Test Hello Hi</Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};
