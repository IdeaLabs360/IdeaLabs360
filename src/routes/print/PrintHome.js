import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import BackupIcon from "@mui/icons-material/Backup";
import SavingsIcon from "@mui/icons-material/Savings";
import SpeedIcon from "@mui/icons-material/Speed";
import BoltIcon from "@mui/icons-material/Bolt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpIcon from "@mui/icons-material/Help";

import { reviews } from "../../views/Home";

const createHeroText = (text) => {
  return (
    <>
      <Typography
        component="div"
        variant="body"
        sx={{
          fontSize: { xs: "1.5rem", sm: "2.0rem", md: "1.7rem", lg: "2.0rem" },
          fontWeight: "bold",
          lineHeight: "1.2em",
        }}
      >
        {text}
      </Typography>
    </>
  );
};

const createDescriptionText = (text) => {
  return (
    <>
      <Typography
        component="div"
        variant="body"
        sx={{
          lineHeight: "1.5em",
          fontSize: { xs: "1.1rem", sm: "1.1rem", md: "1.1rem", lg: "1.1rem" },
        }}
      >
        {text}
      </Typography>
    </>
  );
};

const createBenefit = (icon, title, text) => {
  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 350,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ p: 1, display: "flex", justifyContent: "center" }}>{icon}</Box>

      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography
          component="div"
          variant="body"
          sx={{
            mb: 3,
            fontSize: "1.3rem",
            fontWeight: "bold",
            lineHeight: "1.1em",
          }}
        >
          {title}
        </Typography>

        <Typography component="div" variant="body" sx={{}}>
          {text}
        </Typography>
      </Box>
    </Paper>
  );
};

const createFAQ = (id, question, answer) => {
  return (
    <Accordion elevation={0}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="faq-id-content"
        id={`faq-${id}`}
      >
        <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
          <HelpIcon sx={{ fontSize: "1.0rem" }} />
        </Box>

        <Typography component="div" variant="body" sx={{ fontWeight: "bold" }}>
          {question}
        </Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ ml: 3, display: "flex" }}>
        {answer}
      </AccordionDetails>
    </Accordion>
  );
};

export const PrintHome = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Homepage Hero */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, sm: 6, md: 6, lg: 8 } }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              sx={{
                // py: { xs: 4, sm: 2, md: 3, lg: 10 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box>
                {createHeroText("Get Your Product to Market")}
                {createHeroText("Faster")}
              </Box>

              <Box sx={{ mt: 3, mb: 4 }}>
                {createDescriptionText("Rapid Prototyping and On-demand")}
                {createDescriptionText("3D Printing")}
              </Box>

              {/* Quote button */}
              <Box sx={{ display: "flex" }}>
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    py: 1.5,
                    px: 3,
                    bgcolor: "icon.primary",
                    textAlign: "center",
                    fontSize: "1.0rem",
                    fontWeight: "700",
                    textTransform: "none",
                  }}
                >
                  <BackupIcon sx={{ mr: 2 }} />
                  Start Your Instant Quote
                  <input
                    type="file"
                    multiple
                    hidden
                    onClick={(e) => (e.target.value = null)}
                    onChange={(e) => {
                      navigate("/print/quote", {
                        state: { uploadedFiles: [...e.target.files] },
                      });
                    }}
                  />
                </Button>
              </Box>

              {/* Results */}
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CardMedia
                autoPlay
                muted
                loop
                component="video"
                image={"/video/vase_timelapse.mp4"}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Problem/Solution */}
      <Box sx={{ bgcolor: "#0b076e0a" }}>
        <Container maxWidth="md" sx={{ py: { xs: 6, sm: 6, md: 8, lg: 12 } }}>
          <Grid container spacing={4}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  p: 1,
                  maxWidth: "386px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography component="div" variant="h5">
                  Tired of long and expensive prototyping cycles?
                </Typography>

                <Typography component="div" variant="body1" sx={{ my: 4 }}>
                  Traditional manufacturing methods can drag your product
                  development process for months, costing you valuable time and
                  money.
                </Typography>

                <Typography component="div" variant="body1">
                  With our cutting-edge technology, you can iterate on designs
                  quickly, slash time-to-market, and reduce your development
                  costs dramatically.
                </Typography>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CardMedia
                  controls
                  component="video"
                  image={"/video/vase_timelapse.mp4"}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Benefits */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, sm: 6, md: 8, lg: 12 } }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {createBenefit(
              <SavingsIcon sx={{ fontSize: "3rem", color: "icon.primary" }} />,
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
                Get pricing with in seconds with just a few clicks, not in days.
              </>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Reviews */}
      <Box sx={{ bgcolor: "#0b076e0a" }}>
        <Container maxWidth="md" sx={{ py: { xs: 6, sm: 6, md: 8, lg: 12 } }}>
          <Grid container spacing={2}>
            {reviews.map((review, index) => (
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
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
              justifyContent: "center",
              alignItems: "center",
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

      {/* Features */}

      {/* FAQs */}
      <Container maxWidth="md" sx={{ py: { xs: 8, sm: 6, md: 8, lg: 12 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
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
                    sx={{
                      py: 1,
                      px: 2,
                      bgcolor: "icon.primary",
                      textAlign: "center",
                      fontSize: "0.9rem",
                      fontWeight: "700",
                      textTransform: "none",
                    }}
                  >
                    <BackupIcon sx={{ mr: 2 }} />
                    Get Your Instant Quote
                    <input
                      type="file"
                      multiple
                      hidden
                      onClick={(e) => (e.target.value = null)}
                      onChange={(e) => {
                        navigate("/print/quote", {
                          state: { uploadedFiles: [...e.target.files] },
                        });
                      }}
                    />
                  </Button>
                </Box>
              </Box>
            )}
            {createFAQ(
              3,
              "When will I receive my 3D printed part?",
              <Box>
                <Typography component="p" variant="body1">
                  The delivery time for your 3D printed part can vary depending
                  on several factors, including the complexity of the design,
                  the selected material, and the production volume. In general,
                  we strive to provide fast turnaround times and will work with
                  you to meet your project's specific deadlines.
                </Typography>

                <Typography component="p" variant="body1" sx={{ my: 1 }}>
                  Upon receiving your order, we will provide you with an
                  estimated delivery date based on your requirements. For urgent
                  projects, we offer expedited options to ensure you receive
                  your parts as quickly as possible.
                </Typography>

                <Typography component="p" variant="body1">
                  Our team is committed to delivering high-quality 3D printed
                  parts in a timely manner, and we will keep you informed
                  throughout the production process, so you always know the
                  status of your order. If you have specific delivery
                  requirements or questions, please feel free to contact our
                  customer support team, and they will be happy to assist you.
                </Typography>
              </Box>
            )}
            {createFAQ(
              4,
              "Can you help with design and prototyping services?",
              <Box>
                <Typography component="p" variant="body1">
                  Yes, we offer comprehensive design and prototyping services to
                  help bring your ideas to life. We can work closely with you to
                  refine your concept, optimize it for 3D printing, and create
                  detailed prototypes.
                </Typography>

                <Typography component="p" variant="body1" sx={{ my: 1 }}>
                  Whether you have a rough sketch, a 2D drawing, or just an
                  idea, we can assist in the entire design and prototyping
                  process, ensuring your project meets your specifications and
                  is ready for production. Please reach out to our us to discuss
                  your design and prototyping needs, and we'll be happy to
                  assist you.
                </Typography>
              </Box>
            )}
          </Container>
        </Box>
      </Container>

      <Box sx={{ bgcolor: "#0b076e0a" }}>
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                fontSize: "2.0rem",
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
                sx={{
                  py: 1.5,
                  px: 3,
                  bgcolor: "icon.primary",
                  textAlign: "center",
                  fontSize: "1.0rem",
                  fontWeight: "700",
                  textTransform: "none",
                }}
              >
                <BackupIcon sx={{ mr: 2 }} />
                Start Your Instant Quote
                <input
                  type="file"
                  multiple
                  hidden
                  onClick={(e) => (e.target.value = null)}
                  onChange={(e) => {
                    navigate("/print/quote", {
                      state: { uploadedFiles: [...e.target.files] },
                    });
                  }}
                />
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
