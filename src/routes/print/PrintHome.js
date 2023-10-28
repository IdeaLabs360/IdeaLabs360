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
import LoopIcon from "@mui/icons-material/Loop";
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
          fontSize: { xs: "1.8rem", sm: "2.0rem", md: "2.0rem", lg: "2.3rem" },
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
          fontSize: { xs: "1.0rem", sm: "1.1rem", md: "1.1rem", lg: "1.2rem" },
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
        <Box sx={{ mr: 1 }}>
          <HelpIcon />
        </Box>
        <Typography component="div" variant="body" sx={{ fontWeight: "bold" }}>
          {question}
        </Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ display: "flex" }}>{answer}</AccordionDetails>
    </Accordion>
  );
};

export const PrintHome = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 6, md: 8, lg: 10 } }}>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              sx={{
                py: { xs: 4, sm: 2, md: 3, lg: 10 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box>
                {createHeroText("Explore new possibilities")}
                {createHeroText("Develop new products")}
                {createHeroText("Grow your business")}
              </Box>

              <Box sx={{ mt: 3, mb: 4 }}>
                {createDescriptionText("On-demand 3D printing and")}
                {createDescriptionText("rapid prototyping")}
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
                    fontSize: "1.1rem",
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
                  Traditional prototyping is a slow and costly process, often
                  delaying product development cycles.
                </Typography>

                <Typography component="div" variant="body1" sx={{ my: 4 }}>
                  Tired of long and expensive prototyping cycles? Traditional
                  manufacturing methods can drag your product development
                  process for months, costing you valuable time and money.
                </Typography>

                <Typography component="div" variant="body1">
                  Embrace 3D printing, your ticket to rapid prototyping. With
                  our cutting-edge technology, you can iterate on designs
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
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center" }}>
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
      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 6, md: 8, lg: 12 } }}>
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
              `High Quality at an Affordable Price`
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
              `Fast Lead times`
            )}
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {createBenefit(
              <LoopIcon sx={{ fontSize: "3rem", color: "icon.primary" }} />,
              "Accelerate Your Design Iteration",
              `Traditional prototyping is a slow and costly process, often delaying product development cycles.`
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Reviews */}
      <Box sx={{ bgcolor: "#0b076e0a" }}>
        <Container maxWidth="sm" sx={{ py: { xs: 3, sm: 6, md: 8, lg: 12 } }}>
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
                    sx={{ mb: 2, textAlign: "center" }}
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
      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 6, md: 8, lg: 12 } }}>
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

          <Container maxWidth="md" sx={{ mt: 1 }}>
            {createFAQ(
              1,
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
            {createFAQ(2, "Question", "Answer")}
            {createFAQ(2, "Question", "Answer")}
          </Container>
        </Box>
      </Container>
    </Box>
  );
};
