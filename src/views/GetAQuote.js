import * as React from "react";
import {
  Container,
  CssBaseline,
  Grid,
  Box,
  Paper,
  Typography,
} from "@mui/material";

import { Header } from "./Header";

const CreateQuoteContact = (contact) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        display: "flex",
        bgcolor: "icon.primary",
        color: "primary.main",
        justifyContent: "center",
        width: "280px",
        padding: "10px",
      }}
    >
      {contact}
    </Paper>
  );
};

export const GetAQuote = () => {
  return (
    <>
      <Header />

      <CssBaseline />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        {/* Get a quote contact */}

        <Typography
          variant="h5"
          component="div"
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            fontSize: "2.0rem",
            fontWeight: "bold",
          }}
        >
          Get A Quote Now
        </Typography>

        <Typography
          variant="h5"
          component="div"
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "center",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          Get A Quote Now
        </Typography>

        <Typography
          variant="body1"
          component="div"
          sx={{
            display: "flex",
            justifyContent: "center",
            color: "gray",
          }}
        >
          Bring Your Ideas To Life
        </Typography>

        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={6}
              justifyContent={{ xs: "center", md: "right" }}
              sx={{ display: "flex" }}
            >
              {CreateQuoteContact("Call or Text - (651) 357-6817")}
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              justifyContent={{ xs: "center", md: "left" }}
              sx={{ display: "flex" }}
            >
              {CreateQuoteContact("Email - idealabs360@gmail.com")}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
