import * as React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Box,
  Button,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

import StarIcon from "@mui/icons-material/Star";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PrintIcon from "@mui/icons-material/Print";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ElectricBoltOutlinedIcon from "@mui/icons-material/ElectricBoltOutlined";

import { DesignHome } from "../routes/design/DesignHome";
import { PrintHome } from "../routes/print/PrintHome";
import {
  DISPLAY_PHONE_NUMBER,
  EMAIL,
  IMAGES,
  PHONE_NUMBER,
} from "../constants/constants";

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

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Box sx={{ p: 4 }}>{children}</Box>
        </Box>
      )}
    </div>
  );
};

const CreateQuoteMotto = (icon, contentTitle, content) => {
  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        maxWidth: 410,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>{icon}</Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {contentTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export const Home = () => {
  const [serviceTab, setServiceTab] = React.useState(0);

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
      {/* Services we provide */}

      <Box
        sx={{
          p: { xs: 0, sm: 2, md: 4, lg: 10 },
          bgcolor: "#0b076e0a",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid container spacing={2} sx={{ maxWidth: "1300px" }}>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Paper elevation={0} sx={{ maxWidth: 638 }}>
              <Tabs
                value={serviceTab}
                onChange={(_, index) => setServiceTab(index)}
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
                sx={{ boxShadow: "0 5px 20px 0 #0b076e0a" }}
              >
                <Tab
                  value={0}
                  label={
                    <>
                      <PrintIcon sx={{ mb: 0.5, fontSize: "1.2rem" }} />
                      3D Print
                    </>
                  }
                  sx={{ p: 3, fontWeight: "600", textTransform: "none" }}
                />

                <Tab
                  value={1}
                  label={
                    <>
                      <DesignServicesIcon
                        sx={{ mb: 0.5, fontSize: "1.2rem" }}
                      />
                      Design / Modeling
                    </>
                  }
                  sx={{ py: 3, fontWeight: "600", textTransform: "inherit" }}
                />
              </Tabs>

              <TabPanel value={serviceTab} index={0} dir={"x"}>
                <PrintHome />
              </TabPanel>

              <TabPanel value={serviceTab} index={1} dir={"x"}>
                <DesignHome />
              </TabPanel>
            </Paper>
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

          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box sx={{ my: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                {reviews.map((review, index) => (
                  <Box
                    key={`review-${index}`}
                    elevation={0}
                    sx={{ maxWidth: 300, px: 2, py: 0.5 }}
                  >
                    <Box sx={{ color: "gold" }}>{review.stars}</Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ my: 0.5 }}
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
                  </Box>
                ))}
              </Box>

              <Typography
                variant="body2"
                component="div"
                color="text.secondary"
                sx={{ textAlign: "center" }}
              >
                Google reviews
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Images */}

      <Box sx={{ mb: 4 }}>
        <Slider {...settings}>
          {IMAGES.map((image, index) => (
            <Box key={`image-${index}`}>
              <img width="100%" height="100%" src={`./img/${image}`} alt="" />
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Additional contact */}

      <Box sx={{ my: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Typography component="div" variant="h5" sx={{ fontWeight: "700" }}>
            Contact us
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={6}
            justifyContent={{ xs: "center", md: "right" }}
            sx={{ display: "flex" }}
          >
            <Button
              onClick={() => window.open(`tel:${PHONE_NUMBER}`, "_self")}
              variant="contained"
              sx={{
                bgcolor: "icon.primary",
                width: "280px",
                padding: "10px",
                textTransform: "none",
              }}
            >
              <PhoneIcon sx={{ mr: 2 }} />
              {DISPLAY_PHONE_NUMBER}
            </Button>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            justifyContent={{ xs: "center", md: "left" }}
            sx={{ display: "flex" }}
          >
            <Button
              onClick={() =>
                window.open(
                  `mailto:${EMAIL}?subject=IdeaLabs360 - Quote Request`,
                  "_self"
                )
              }
              variant="contained"
              sx={{
                bgcolor: "icon.primary",
                width: "280px",
                padding: "10px",
                textTransform: "none",
              }}
            >
              <EmailIcon sx={{ mr: 2 }} />
              idealabs360@gmail.com
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Motto */}

      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <Grid container spacing={1}>
          <Grid
            item
            xs={12}
            md={6}
            justifyContent={{ xs: "center" }}
            sx={{ display: "flex" }}
          >
            {CreateQuoteMotto(
              <AttachMoneyOutlinedIcon
                sx={{
                  color: "icon.primary",
                  fontSize: "4rem",
                }}
              />,
              "Fair Price",
              `We believe everyone should have access to high-quality
               products at a fair price. Experience the perfect balance of
               affordability and excellence with us. Shop today and see the
               difference that reasonable pricing can make in elevating your
               overall buying experience.`
            )}
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            justifyContent={{ xs: "center" }}
            sx={{ display: "flex" }}
          >
            {CreateQuoteMotto(
              <ElectricBoltOutlinedIcon
                sx={{
                  color: "icon.primary",
                  fontSize: "4rem",
                }}
              />,
              "Fast & Open Communication",
              `Experience the difference of working with a company that
               values speed, efficiency, and client satisfaction above all
               else. Choose us for your 3D printing prototype design needs,
               and you'll witness the power of a "Fast Response" in action.
               Let's turn your ideas into reality quickly and effectively -
               together.`
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
