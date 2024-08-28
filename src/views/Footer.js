import * as React from "react";
import {
  Box,
  CardMedia,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { Facebook, Instagram /* Twitter */ } from "@mui/icons-material";
import { DISPLAY_PHONE_NUMBER, EMAIL } from "../constants/constants";
import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ p: 6, bgcolor: "#fff", boxShadow: "0 5px 20px 0 #0b076e0a" }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CardMedia
                  component="img"
                  image={"/img/logo.png"}
                  sx={{ width: "30px", mr: 1.5 }}
                />

                <Logo variant={"h6"} fontSize={"1.5rem"} />
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {"Copyright © "}
                <Link color="inherit" href="https://idealabs3d.com">
                  IdeaLabs3D
                </Link>
                {" | "}
                {new Date().getFullYear()}
                {"."}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="text.primary" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: {EMAIL}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: {DISPLAY_PHONE_NUMBER}
            </Typography>
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography variant="body1" color="text.primary" gutterBottom>
              Follow Us
            </Typography>

            <Link
              href="https://www.facebook.com/profile.php?id=61564586653966"
              color="inherit"
            >
              <Facebook />
            </Link>

            <Link
              href="https://www.instagram.com/idealabs3d/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            {/* <Link href="https://www.twitter.com/" color="inherit">
              <Twitter />
            </Link> */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
