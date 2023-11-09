import * as React from "react";
import { Box, Container, Typography } from "@mui/material";
import { EMAIL } from "../constants/constants";
import { useLocation } from "react-router";

export const Success = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");

  return (
    <Container maxWidth="lg" sx={{ my: 16 }}>
      <Typography
        variant="h5"
        component="div"
        sx={{ mb: 3, fontSize: "1.5rem", fontWeight: "bold" }}
      >
        Thanks for your order!
      </Typography>

      <Box>
        <Typography variant="body1" component="div" sx={{ mb: 1 }}>
          We appreciate your business!
        </Typography>

        {sessionId && (
          <Box
            sx={{
              my: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography variant="body1" component="div" sx={{ mb: 1 }}>
              Please save your Transaction ID for later.
            </Typography>

            <Box
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                borderRadius: "5px",
                border: "1px solid lightgray",
              }}
            >
              <Typography
                variant="body2"
                component="div"
                sx={{ color: "text.secondary" }}
              >
                {sessionId}
              </Typography>
            </Box>
          </Box>
        )}

        <Typography variant="body1" component="div" sx={{ mb: 1 }}>
          If you have any questions, please feel free to email
        </Typography>

        <Typography variant="body1" component="div" sx={{ mb: 1 }}>
          {EMAIL}
        </Typography>
      </Box>
    </Container>
  );
};
