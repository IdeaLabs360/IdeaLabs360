import * as React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import { ReviewStar } from "../common/ReviewStar";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../constants/constants";

export const reviews = [
  {
    stars: (
      <>
        <ReviewStar />
        <ReviewStar />
        <ReviewStar />
        <ReviewStar />
        <ReviewStar />
      </>
    ),
    detail:
      "Great Printing. Very Smart. Great Personailty. Would highly suggest working with them.",
    name: "Travis Glanzer",
  },
  {
    stars: (
      <>
        <ReviewStar />
        <ReviewStar />
        <ReviewStar />
        <ReviewStar />
        <ReviewStar />
      </>
    ),
    detail: `To everyone in the twin series area there is a guy out here to do a damn good job in 
      prototype he's very reasonable nite y'all need to get with him he's excellent I don't 
      have nothing that's bad to say about him he's a good person please look out get with 
      him he's very reasonable thank you`,
    name: "Thomas Smith",
  },
  {
    stars: (
      <>
        <ReviewStar />
        <ReviewStar />
        <ReviewStar />
        <ReviewStar />
        <ReviewStar />
      </>
    ),
    detail: `The statuettes I order were very good and I am very pleased with the results 
    which came fast by mail and I will even give them away as Christmas gifts !!`,
    name: "Mario Fontenla",
  },
];

export const Home = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Box>
      {/* Homepage Hero */}
      <Box sx={{ bgcolor: "#dcdcdc" }}>
        <Container maxWidth="lg" sx={{ pt: 12, pb: 4 }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "end" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ maxWidth: 700 }}>
                  <Typography
                    component="div"
                    variant="h4"
                    sx={{
                      fontSize: {
                        xs: "35px",
                        sm: "35px",
                        md: "40px",
                        lg: "45px",
                      },
                      // fontWeight: "700",
                      lineHeight: "1em",
                    }}
                  >
                    Leading Innovation in Manufacturing Solutions
                  </Typography>
                </Box>

                <Box sx={{ mt: 2, mb: 4 }}>
                  <Typography component="div" variant="body2" sx={{}}>
                    Upload your design, get an estimate, enter shipping
                    information, and get your part in a few days
                  </Typography>
                </Box>

                {/* Quote button */}
                <Box sx={{ display: "flex" }}>
                  <Button
                    variant="contained"
                    component="label"
                    onClick={() => navigate("/print/quote")}
                    sx={{
                      py: 2,
                      px: 10,
                      bgcolor: "black",
                      borderRadius: 8,
                      // textAlign: "center",
                      // fontSize: { xs: "0.9rem", md: "1.0rem" },
                      // letterSpacing: "0.1em",
                    }}
                  >
                    Get Started
                  </Button>
                </Box>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "start" },
              }}
            >
              <CardMedia
                component="img"
                image={"/img/test.png"}
                sx={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Services */}
      <Container maxWidth="lg">
        <Typography
          component="div"
          variant="h1"
          sx={{
            mt: 10,
            mb: 3,
            fontFamily: "sans-serif",
            fontSize: { xs: "35px", sm: "35px", md: "40px", lg: "40px" },
            lineHeight: "1.4em",
          }}
        >
          Our Services
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
            <Card elevation={0}>
              <CardMedia
                title="3d print"
                image="/img/print.jpg"
                sx={{ height: 350 }}
              />

              <Typography
                variant="h6"
                component="div"
                sx={{
                  mt: 3,
                  mb: 1,
                  textDecoration: "underline",
                  textDecorationColor: "lightgray",
                }}
              >
                3D Print Your Designs
              </Typography>

              <Typography variant="body2" component="div" sx={{ my: 1 }}>
                $100
              </Typography>

              <Typography variant="body2">
                3D print your models, get instant cost estimates, and hassel
                free checkout process
              </Typography>
            </Card>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card elevation={0}>
              <CardMedia
                title="design"
                image="/img/design.png"
                sx={{ height: 350 }}
              />

              <Typography
                variant="h6"
                component="div"
                sx={{
                  mt: 3,
                  mb: 1,
                  textDecoration: "underline",
                  textDecorationColor: "lightgray",
                }}
              >
                Free CAD Design
              </Typography>

              <Typography variant="body2" component="div" sx={{ my: 1 }}>
                $100
              </Typography>

              <Typography variant="body2">
                Whether you have a rough sketch, a 2D drawing, or just an idea,
                we can assist in the CAD design process.
              </Typography>
            </Card>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card elevation={0}>
              <CardMedia
                title="design"
                image="/img/design.png"
                sx={{ height: 350 }}
              />

              <Typography
                variant="h6"
                component="div"
                sx={{
                  mt: 3,
                  mb: 1,
                  textDecoration: "underline",
                  textDecorationColor: "lightgray",
                }}
              >
                Free CAD Design
              </Typography>

              <Typography variant="body2" component="div" sx={{ my: 1 }}>
                $100
              </Typography>

              <Typography variant="body2">
                Whether you have a rough sketch, a 2D drawing, or just an idea,
                we can assist in the CAD design process.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Images */}
      <Box sx={{ mt: 10 }}>
        <Slider {...settings}>
          {IMAGES.map((image, index) => (
            <Box key={`image-${index}`}>
              <img width="100%" height="100%" src={`./img/${image}`} alt="" />
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Reviews */}
      <Box>
        <Container maxWidth="md" sx={{ py: { xs: 6, sm: 6, md: 8, lg: 12 } }}>
          <Box
            sx={{
              my: 2,
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
        </Container>
      </Box>
    </Box>
  );
};
