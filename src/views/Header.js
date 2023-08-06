import * as React from "react";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";
import { Logo } from "./Logo";

const pages = ["Gallery"];

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
      sx={{ borderBottom: "1px solid lightgray", marginBottom: "30px" }}
    >
      <Container maxWidth="lg">
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
              color="inherit"
            >
              <MenuIcon sx={{ color: "icon.primary" }} />
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
                <MenuItem key={page} onClick={() => console.log("page")}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            noWrap
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <LightbulbRoundedIcon
              sx={{
                display: { xs: "flex", md: "none" },
                color: "icon.primary",
                mr: 1,
              }}
            />
            <Link href="/" sx={{ color: "inherit", textDecoration: "none" }}>
              <Logo variant={"h6"} fontSize={"1.5rem"} />
            </Link>
          </Box>

          {/* MD */}

          <Box
            noWrap
            component="div"
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <LightbulbRoundedIcon
              sx={{
                display: { xs: "none", md: "flex" },
                color: "icon.primary",
                mr: 1,
              }}
            />
            <Link href="/" sx={{ color: "inherit", textDecoration: "none" }}>
              <Logo variant={"h6"} fontSize={"1.5rem"} />
            </Link>
          </Box>

          {/* End of Sizes */}

          <Box sx={{}}>
            <Link
              href="/quote"
              sx={{ color: "inherit", textDecoration: "none" }}
            >
              Get A Quote Now
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
