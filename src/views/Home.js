import * as React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Divider,
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
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box
        sx={{
          pb: 6,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          component="div"
          variant="h1"
          sx={{
            color: "primary.main",
            fontFamily: "sans-serif",
            fontSize: { xs: "25px", sm: "35px", md: "40px", lg: "50px" },
            fontWeight: "700",
          }}
        >
          Welcome to IdeaLabs360
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Card sx={{ maxWidth: 400, height: "100%" }}>
            <CardActionArea onClick={() => navigate("/print")}>
              <CardMedia
                title="3d print"
                image="/img/print.jpg"
                sx={{ height: 260, borderBottom: "1px solid lightgray" }}
              />

              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: "700" }}
                >
                  3D Print Your Designs
                </Typography>

                <Divider sx={{ my: 1 }} />

                <Typography variant="body1" color="text.secondary">
                  3D print your models, get instant cost estimates, and hassel
                  free checkout process
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Card sx={{ maxWidth: 400, height: "100%" }}>
            <CardActionArea onClick={() => navigate("/design")}>
              <CardMedia
                title="design"
                image="/img/design.png"
                sx={{ height: 260, borderBottom: "1px solid lightgray" }}
              />

              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: "700" }}
                >
                  Free CAD Design
                </Typography>

                <Divider sx={{ my: 1 }} />

                <Typography variant="body1" color="text.secondary">
                  Whether you have a rough sketch, a 2D drawing, or just an
                  idea, we can assist in the CAD design process.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>

      {/* Images */}
      <Box sx={{ my: 4 }}>
        <Slider {...settings}>
          {IMAGES.map((image, index) => (
            <Box key={`image-${index}`}>
              <img width="100%" height="100%" src={`./img/${image}`} alt="" />
            </Box>
          ))}
        </Slider>
      </Box>

      <Box sx={{ bgcolor: "#0b076e0a" }}>
        <Container maxWidth="md" sx={{ py: 6 }}>
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
    </Container>
  );
};
