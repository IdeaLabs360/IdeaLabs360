import * as React from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import CheckIcon from "@mui/icons-material/Check";
import SavingsIcon from "@mui/icons-material/Savings";
import SpeedIcon from "@mui/icons-material/Speed";

import { reviews } from "../../views/Home";
import {
  createBenefit,
  createDescriptionText,
  createFAQ,
  createHeroText,
} from "../../common/LandingPageUtils";

const data = ["3D Modeling", "Product Design", "Replacement Parts"];

export const DesignHome = () => {
  const navigate = useNavigate();

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
                justifyContent: { xs: "center", md: "end" },
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
                  {createHeroText(<>Transform Your Vision Into Reality</>)}
                </Box>

                <Box sx={{ my: 4, textAlign: "center" }}>
                  {createDescriptionText(
                    "Product Design, CAD Modeling, and Rapid Prototyping Service"
                  )}
                </Box>

                {/* Quote button */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <Button
                    variant="contained"
                    component="label"
                    onClick={() => navigate("/design/quote")}
                    sx={{
                      py: 2,
                      px: 4,
                      bgcolor: "icon.primary",
                      textAlign: "center",
                      fontSize: { xs: "0.9rem", md: "1.0rem" },
                      letterSpacing: "0.1em",
                    }}
                  >
                    Contact Us
                  </Button>
                </Box>

                {/* Results */}
                <Box sx={{ mt: 3 }}>
                  <List dense>
                    <ListItem disablePadding>
                      <CheckIcon sx={{ mr: 0.5, color: "green" }} />
                      <ListItemText primary="FREE Design Consultation" />
                    </ListItem>

                    <ListItem disablePadding>
                      <CheckIcon sx={{ mr: 0.5, color: "green" }} />
                      <ListItemText primary="Hassel FREE Checkout Process" />
                    </ListItem>

                    <ListItem disablePadding>
                      <CheckIcon sx={{ mr: 0.5, color: "green" }} />
                      <ListItemText primary="Free Scanned Model Cleanup" />
                    </ListItem>
                  </List>
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

      {/* Benefits */}
      <Box>
        <Container maxWidth="lg" sx={{ py: { xs: 6, sm: 6, md: 8, lg: 12 } }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {createBenefit(
                <SavingsIcon
                  sx={{ fontSize: "3rem", color: "icon.primary" }}
                />,
                "Save Money",
                <>Get high quality parts 3D printed at an affordable price.</>
              )}
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {createBenefit(
                <SpeedIcon sx={{ fontSize: "3rem", color: "icon.primary" }} />,
                "Accelerate Your Design Iteration",
                <>Fast lead times and turnarounds.</>
              )}
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {createBenefit(
                <BoltIcon sx={{ fontSize: "3rem", color: "icon.primary" }} />,
                "Instant Quoting",
                <>
                  Get pricing with in seconds with just a few clicks, not in
                  days.
                </>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Reviews */}
      <Box sx={{ bgcolor: "#0b076e0a" }}>
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

      {/* Problem/Solution */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, sm: 6, md: 8, lg: 12 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: `column`, md: `row-reverse` },
          }}
        >
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                p: 1,
                maxWidth: "386px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                component="div"
                variant="h5"
                sx={{ fontWeight: "600" }}
              >
                Small-Batch Manufacturing
              </Typography>

              <Typography component="div" variant="body1" sx={{ my: 2 }}>
                We offer comprehensive design and prototyping services to help
                bring your ideas to life. We can work closely with you to refine
                your concept, optimize it for 3D printing, and create detailed
                prototypes.
              </Typography>

              <Typography component="div" variant="body1">
                Whether you have a rough sketch, a 2D drawing, or just an idea,
                we can assist in the entire design and prototyping process,
                ensuring your project meets your specifications and is ready for
                production.
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              mr: { xs: 0, md: 4 },
              flex: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box sx={{ maxWidth: 400 }}>
              <CardMedia
                component="img"
                image={"/img/design-process.jpg"}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Features */}

      {/* FAQs */}
      <Box>
        <Container maxWidth="md" sx={{ py: { xs: 8, sm: 6, md: 8, lg: 12 } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ fontWeight: "700", lineHeight: "0.9em" }}
            >
              FAQs
            </Typography>

            <Container maxWidth="md" sx={{ mt: 2 }}>
              {createFAQ(
                1,
                "What is 3D printing, and how does it work?",
                <Box>
                  <Typography component="p" variant="body1">
                    3D printing, also known as additive manufacturing, is a
                    technology that creates three-dimensional objects layer by
                    layer from a digital model.
                  </Typography>

                  <Typography component="p" variant="body1" sx={{ my: 1 }}>
                    It works by depositing material, such as plastic, metal, or
                    resin, one layer at a time, fusing or solidifying each layer
                    to build the final product. This process allows for the
                    creation of complex geometries and customized designs.
                  </Typography>
                </Box>
              )}
              {createFAQ(
                2,
                "How do I place an order for 3D printing services?",
                <Box>
                  <Typography component="p" variant="body1">
                    Simply upload your design files, configure them as needed,
                    enter your shipping address, and proceed to checkout.
                  </Typography>

                  <Typography component="p" variant="body1" sx={{ my: 1 }}>
                    If your model happens to be too big or the file type is not
                    supported, please reachout to us.
                  </Typography>

                  <Typography component="p" variant="body1" sx={{ my: 1 }}>
                    Place your order by clicking the button below.
                  </Typography>

                  <Box sx={{ mt: 2, display: "flex" }}>
                    <Button
                      variant="contained"
                      component="label"
                      onClick={() => navigate("/print/quote")}
                      sx={{
                        py: 2,
                        px: 4,
                        bgcolor: "icon.primary",
                        textAlign: "center",
                        fontSize: { xs: "0.9rem", md: "1.0rem" },
                        letterSpacing: "0.1em",
                      }}
                    >
                      Get Started
                    </Button>
                  </Box>
                </Box>
              )}
              {createFAQ(
                3,
                "When will I receive my 3D printed part?",
                <Box>
                  <Typography component="p" variant="body1">
                    The delivery time for your 3D printed part can vary
                    depending on several factors, complexity of the design,
                    selected material, and production volume.
                  </Typography>

                  <Typography component="p" variant="body1" sx={{ my: 1 }}>
                    In general, we strive to provide fast turnaround times and
                    will work with you to meet your project's specific
                    deadlines.
                  </Typography>

                  <Typography component="p" variant="body1">
                    Our team is committed to delivering high-quality 3D printed
                    parts in a timely manner. If you have specific delivery
                    requirements or questions, please feel free to reachout to,
                    and we will be happy to assist you.
                  </Typography>
                </Box>
              )}
              {createFAQ(
                4,
                "Can you help with design and prototyping services?",
                <Box>
                  <Typography component="p" variant="body1">
                    Yes, we offer comprehensive design and prototyping services
                    to help bring your ideas to life. We can work closely with
                    you to refine your concept, optimize it for 3D printing, and
                    create detailed prototypes.
                  </Typography>

                  <Typography component="p" variant="body1" sx={{ my: 1 }}>
                    Whether you have a rough sketch, a 2D drawing, or just an
                    idea, we can assist in the entire design and prototyping
                    process, ensuring your project meets your specifications and
                    is ready for production. Please reach out to us to discuss
                    your design and prototyping needs, and we'll be happy to
                    assist you.
                  </Typography>
                </Box>
              )}
            </Container>
          </Box>
        </Container>
      </Box>

      {/* Call to action again */}
      <Box sx={{ bgcolor: "#0b076e0a" }}>
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                fontSize: "1.6rem",
                fontWeight: "700",
                lineHeight: "0.9em",
              }}
            >
              Ready to Get Started?
            </Typography>

            <Typography
              gutterBottom
              variant="body"
              component="div"
              sx={{ mt: 0.5, textAlign: "center" }}
            >
              Utilize our advanced technology to save both time and money
            </Typography>

            <Box sx={{ display: "flex", mt: 4 }}>
              <Button
                variant="contained"
                component="label"
                onClick={() => navigate("/print/quote")}
                sx={{
                  py: 2,
                  px: 4,
                  bgcolor: "icon.primary",
                  textAlign: "center",
                  fontSize: { xs: "0.9rem", md: "1.0rem" },
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Get Started
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
