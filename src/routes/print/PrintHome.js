import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Box, Button, Paper, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";

const images = ["1.jpg", "2.jpeg", "3.jpg"];

const reviews = [
  {
    stars: (
      <>
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
      </>
    ),
    detail:
      "Great Printing. Very Smart. Great Personailty. Would highly suggest working with them.",
    name: "Travis Glanzer",
  },
];

export const materials = ["PLA", "ABS", "PETG", "TPU", "Nylon", "ASA"];

export const PrintHome = () => {
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Explain what services is provided */}

      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            color: "#090b17",
          }}
        >
          <Typography
            component="div"
            variant="h3"
            sx={{
              display: { xs: "none", md: "flex" },
              mt: 8,
              fontWeight: "700",
            }}
          >
            3D print your designs
          </Typography>

          <Typography
            component="div"
            variant="h5"
            sx={{
              display: { xs: "flex", md: "none" },
              mt: 4,
              fontWeight: "700",
            }}
          >
            3D print your designs
          </Typography>
        </Box>

        <Box sx={{ marginTop: "20px" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              color: "#676e8b",
            }}
          >
            Use cutting edge FDM printing and bring your ideas to life
          </Typography>

          <Typography
            variant="h7"
            component="div"
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
              color: "#676e8b",
              mt: 1,
            }}
          >
            Use cutting edge FDM printing
          </Typography>

          <Typography
            variant="h7"
            component="div"
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
              color: "#676e8b",
              mt: 1,
            }}
          >
            Bring your ideas to life
          </Typography>
        </Box>

        <Box sx={{ my: 4, textAlign: "center" }}>
          <Button
            onClick={() => window.open("/#/print/quote", "_self")}
            variant="contained"
            sx={{
              py: 1.5,
              px: 3,
              bgcolor: "icon.primary",
              textTransform: "none",
              textAlign: "left",
              fontWeight: "700",
            }}
          >
            <RequestQuoteIcon sx={{ mr: 2 }} />
            Get a FREE Quote Now
          </Button>
        </Box>

        <Box
          sx={{
            mb: { xs: 4, md: 8 },
            display: { xs: "block", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            component="div"
            variant="body1"
            sx={{ mr: 1, fontWeight: "700" }}
          >
            Materials we support
          </Typography>

          <Typography component="div" variant="body2" sx={{ color: "#676e8b" }}>
            {materials.join(", ")}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ pb: 4, bgcolor: "#0b076e0a" }}>
        <Box>
          <Typography
            variant="h5"
            component="div"
            sx={{
              display: { xs: "block", md: "none" },
              textAlign: "center",
              fontWeight: "700",
              my: 3,
            }}
          >
            What our customers say
          </Typography>

          <Typography
            variant="h4"
            component="div"
            sx={{
              display: { xs: "none", md: "block" },
              textAlign: "center",
              fontWeight: "700",
              my: 5,
            }}
          >
            What our customers say
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {reviews.map((review) => (
            <Paper elevation={0} sx={{ maxWidth: 300, p: 2 }}>
              <Box sx={{ color: "gold" }}>{review.stars}</Box>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ my: 1.5 }}
              >
                {review.detail}
              </Typography>

              <Typography
                gutterBottom
                variant="body2"
                component="div"
                sx={{ fontWeight: "700" }}
              >
                {review.name}
              </Typography>
            </Paper>
          ))}
        </Box>

        <Typography
          variant="body2"
          component="div"
          color="text.secondary"
          sx={{ mt: 0.5, textAlign: "center" }}
        >
          Google reviews
        </Typography>
      </Box>

      <Box>
        <Slider {...settings}>
          {images.map((image, index) => (
            <Box key={index}>
              <img width="100%" height="100%" src={`./img/${image}`} alt="" />
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};
