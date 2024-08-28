import * as React from "react";

import { Box, CardMedia, Container, Grid, Typography } from "@mui/material";

import { reviews } from "../../views/Home";
import { createHeroText } from "../../common/LandingPageUtils";

export const DesignHome = () => {
  return (
    <Box>
      {/* Homepage Hero */}
      <Box sx={{ bgcolor: "#0b076e0a" }}>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={8}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ maxWidth: 700, textAlign: "center" }}>
                  {createHeroText(<>Free CAD Design</>)}
                </Box>

                <Box sx={{ my: 4 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography component="div" variant="body" sx={{ mb: 1 }}>
                        Dear valued visitor,
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography component="div" variant="body" sx={{ mb: 1 }}>
                        My name is Nate. I am a software engineer by day and a
                        CAD designer by night. I have a proposal for you.
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography component="div" variant="body" sx={{ mb: 1 }}>
                        I can help you design your idea in two ways:
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography
                        component="div"
                        variant="body"
                        sx={{ mb: 2, fontWeight: "bold" }}
                      >
                        Option 1
                      </Typography>

                      <Typography component="div" variant="body" sx={{ mb: 2 }}>
                        I have a personal shop where I sell handmade items. If
                        the idea you have is something I can sell and you
                        authorize it, I will do the design and send you a
                        3D-printed model of the design completely free.
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography
                        component="div"
                        variant="body"
                        sx={{ mb: 2, fontWeight: "bold" }}
                      >
                        Option 2
                      </Typography>

                      <Typography component="div" variant="body" sx={{ mb: 2 }}>
                        You want the design to be confidential. I can do the
                        design for you at a very fair price; we will negotiate
                        once I understand the task.
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      Please feel free to propose other options as well if you
                      have any.
                    </Grid>

                    <Grid item xs={12}>
                      If the above terms work for you, please call or email me
                      to get the conversation started.
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "start" },
              }}
            >
              <Box sx={{ mt: { xs: 6, md: 0 }, width: 400 }}>
                <CardMedia
                  component="img"
                  image={"/img/design.png"}
                  sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Reviews */}
      <Box>
        <Container maxWidth="md" sx={{ py: { xs: 6, sm: 6, md: 8, lg: 12 } }}>
          <Grid container spacing={2}>
            {reviews.map((review, index) => (
              <Grid
                key={`review-${index}`}
                item
                xs={12}
                md={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Box
                  key={`review-${index}`}
                  sx={{
                    maxWidth: 350,
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    "{review.detail}"
                  </Typography>

                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    sx={{ fontWeight: "700", lineHeight: "0.9em" }}
                  >
                    {review.name}
                  </Typography>

                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    {review.stars}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{
              mt: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardMedia
              component="img"
              image={"/img/googleImage.png"}
              sx={{ width: "90px", objectFit: "cover" }}
            />

            <Typography
              variant="body2"
              component="div"
              color="text.secondary"
              sx={{
                ml: 1,
                textAlign: "center",
                fontSize: "1.4rem",
              }}
            >
              Reviews
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
