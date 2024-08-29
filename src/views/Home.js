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
  Link,
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
        <Container
          maxWidth="lg"
          sx={{ pt: { xs: 18, md: 12 }, pb: { xs: 10, md: 4 } }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "start" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ maxWidth: 400 }}>
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
                      lineHeight: "1.1em",
                    }}
                  >
                    Welcome to Idea Labs 3D
                  </Typography>
                </Box>

                <Box sx={{ mt: 2, mb: 5, maxWidth: 350 }}>
                  <Typography
                    component="div"
                    variant="body2"
                    sx={{ lineHeight: "1.3em" }}
                  >
                    We bring your ideas to life with precision and care. Whether
                    you need custom 3D prints or expertly crafted CAD designs,
                    we work closely with you from concept to completion,
                    delivering top-quality results every time. Your satisfaction
                    is our priority.
                  </Typography>
                </Box>

                <Box sx={{ display: "flex" }}>
                  <Button
                    variant="contained"
                    component="label"
                    onClick={() => navigate("/contact")}
                    sx={{
                      py: 1.5,
                      px: 8,
                      bgcolor: "black",
                      borderRadius: 8,
                      textTransform: "none",
                    }}
                  >
                    Contact Us
                  </Button>
                </Box>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardMedia
                  component="img"
                  image={"/img/front-page.jpg"}
                  sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
                <Link
                  rel="noopener"
                  target="_blank"
                  href="https://www.freepik.com/free-photo/designer-using-3d-printer_78922815.htm#fromView=search&page=1&position=28&uuid=3ed48ee5-6f98-4c90-a78e-f848672d02fb"
                  sx={{
                    color: "gray",
                    fontSize: "0.6rem",
                    textAlign: "right",
                    textDecoration: "none",
                  }}
                >
                  Image by freepik
                </Link>
              </Box>
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
          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={{ borderRadius: "0" }}>
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
                3D Printing Services
              </Typography>

              <Typography variant="body2" sx={{ mt: 2, maxWidth: 400 }}>
                we love helping you bring your ideas to life. Whether it's a
                small part or a big project, our 3D printing service is all
                about making sure you get exactly what you need. We focus on
                quality and detail, treating every print like it's our own
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={{ borderRadius: "0" }}>
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
                CAD Design Services
              </Typography>

              <Typography variant="body2" sx={{ mt: 2, maxWidth: 400 }}>
                When it comes to creating custom designs, we're here to make the
                process easy and personal. Our CAD design service is all about
                working together to shape your ideas into something real. No
                matter what you're imagining, we'll help create the perfect
                design, just for you.
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
