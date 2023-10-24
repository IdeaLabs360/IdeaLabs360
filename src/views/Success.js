import * as React from "react";
import { Box, Container, Typography } from "@mui/material";
import { EMAIL } from "../constants/constants";

export const Success = () => {
  return (
    <Container maxWidth="lg" sx={{ my: 5 }}>
      <Typography
        variant="h5"
        component="div"
        sx={{ mb: 3, fontSize: "1.5rem", fontWeight: "bold" }}
      >
        Thanks for your order!
      </Typography>

      <Box>
        <Box sx={{ mb: 1 }}>We appreciate your business!</Box>

        <Box>
          If you have any questions, please email
          <a href={EMAIL}>orders@example.com</a>.
        </Box>
      </Box>
    </Container>
  );
};
