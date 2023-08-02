import * as React from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";
import { Logo } from "./Logo";

export const Header = ({ landingRef, pages }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const scrollToComponent = (reference) => {
    scrollToComponentWithOffset(reference, 50);
    handleCloseNavMenu();
  };

  const scrollToComponentWithOffset = (componentRef, offset = 0) => {
    if (componentRef && componentRef.current) {
      const options = {
        behavior: "smooth", // or 'auto' for instant scrolling without animation
        block: "start", // or 'end' to scroll to the bottom edge of the component
      };

      const element = componentRef.current;
      const topOffset =
        element.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: topOffset, ...options });
    }
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ borderBottom: "1px solid lightgray" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LightbulbRoundedIcon
            sx={{
              display: { xs: "none", md: "flex" },
              color: "icon.primary",
              mr: 1,
            }}
          />

          <Box
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Button
              onClick={() => scrollToComponent(landingRef)}
              sx={{ color: "inherit", textTransform: "none" }}
            >
              <Logo />
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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
                <MenuItem
                  key={page}
                  onClick={(page) => scrollToComponent(page.reference)}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <LightbulbRoundedIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />

          <Box
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Logo onClick={() => landingRef?.current?.scrollIntoView()} />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => scrollToComponent(page.ref)}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
