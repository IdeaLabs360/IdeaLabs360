import * as React from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { Logo } from "./Logo";
import { EMAIL, PHONE_NUMBER } from "../constants/constants";

const pages = [
  // {
  //   name: "Shop",
  //   action: () =>
  //     window.open(
  //       "https://www.etsy.com/shop/IdeaLabs360?ref=l2-about-shopname",
  //       "_blank"
  //     ),
  // },
];

export const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        color: "inherit",
        bgcolor: "#ffffff",
        boxShadow: "0 5px 20px 0 #0b076e0a",
      }}
    >
      <Container maxWidth={false}>
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* XS */}

          <Box
            sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{
                color: "black",
                bgcolor: "white",
                "&:hover": { bgcolor: "white" },
              }}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={`link-${page.name}`} onClick={page.action}>
                  <Typography
                    textAlign="center"
                    sx={{
                      px: 2,
                      py: 1,
                      fontSize: "0.875rem",
                      fontWeight: "bold",
                    }}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link href="/" sx={{ color: "inherit", textDecoration: "none" }}>
              <Logo variant={"h6"} fontSize={"1.35rem"} />
            </Link>
          </Box>

          {/* MD */}

          <Box
            component="div"
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link
              href="/"
              sx={{ mr: 2, color: "inherit", textDecoration: "none" }}
            >
              <Logo variant={"h6"} fontSize={"1.5rem"} />
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={`link-${page.name}`}
                onClick={page.action}
                sx={{
                  color: "black",
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* End of Sizes */}

          <Box sx={{}}>
            <IconButton
              onClick={() => window.open(`tel:${PHONE_NUMBER}`, "_self")}
              variant="contained"
              sx={{
                mr: 1.5,
                color: "#FFFFFF",
                backgroundColor: "#4A91BF",
                "&:hover": {
                  backgroundColor: "#175E8C",
                },
              }}
            >
              <PhoneIcon sx={{ fontSize: "medium" }} />
            </IconButton>

            <IconButton
              onClick={() =>
                window.open(
                  `mailto:${EMAIL}?subject=IdeaLabs360 - Quote Request`,
                  "_self"
                )
              }
              variant="contained"
              sx={{
                color: "#FFFFFF",
                backgroundColor: "#4A91BF",
                "&:hover": {
                  backgroundColor: "#175E8C",
                },
              }}
            >
              <EmailIcon sx={{ fontSize: "medium" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
