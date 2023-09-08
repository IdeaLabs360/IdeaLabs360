import * as React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  AppBar,
  Card,
  CardContent,
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
          <Box sx={{ p: 3, display: { xs: "block", md: "none" } }}>
            {children}
          </Box>

          <Box sx={{ p: 6, display: { xs: "none", md: "block" } }}>
            {children}
          </Box>
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

export const materials = ["PLA", "ABS", "PETG", "TPU", "Nylon", "ASA"];

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

      <Box sx={{ p: 10, bgcolor: "#0b076e0a" }}>
        <Grid container spacing={4}>
          <Grid item sm={12} md={6}>
            <Paper elevation={0}>
              <AppBar
                position="static"
                elevation={0}
                sx={{
                  color: "inherit",
                  bgcolor: "#ffffff",
                  boxShadow: "0 5px 20px 0 #0b076e0a",
                }}
              >
                <Tabs
                  value={serviceTab}
                  onChange={(_, index) => setServiceTab(index)}
                  textColor="inherit"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab
                    value={0}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <PrintIcon sx={{ mr: 2 }} />
                        3D Print
                      </Box>
                    }
                    sx={{
                      py: 4,
                      fontSize: "1rem",
                      fontWeight: "600",
                      textTransform: "none",
                    }}
                  />

                  <Tab
                    value={1}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <DesignServicesIcon sx={{ mr: 2 }} />
                        Design/Modeling
                      </Box>
                    }
                    sx={{
                      py: 4,
                      fontSize: "1rem",
                      fontWeight: "600",
                      textTransform: "none",
                    }}
                  />
                </Tabs>
              </AppBar>

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
            sm={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box>Test</Box>
          </Grid>
        </Grid>
      </Box>

      {/* Images */}

      <Box sx={{ mb: 4 }}>
        <Slider {...settings}>
          {images.map((image, index) => (
            <Box key={index}>
              <img width="100%" height="100%" src={`./img/${image}`} alt="" />
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Reviews */}

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
              onClick={() => window.open("tel:6513576817", "_self")}
              variant="contained"
              sx={{
                bgcolor: "icon.primary",
                width: "280px",
                padding: "10px",
                textTransform: "none",
              }}
            >
              <PhoneIcon sx={{ mr: 2 }} />
              +1 (651) 357-6817
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
                  "mailto:idealabs360@gmail.com?subject=IdeaLabs360 - Quote Request",
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
