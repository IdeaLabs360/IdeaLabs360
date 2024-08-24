import * as React from "react";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;
const pages = [
  {
    name: "Services",
    action: () => (window.location.href = "/#/print"),
  },
  {
    name: "About",
    action: () => (window.location.href = "/#/print"),
  },
  {
    name: "Contact",
    action: () => (window.location.href = "/#/design"),
  },
];

export const Header = (props) => {
  const { window } = props;
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>

      <Divider />

      <List>
        {pages.map((page) => (
          <ListItem key={page.name} disablePadding>
            <ListItemButton onClick={page.action} sx={{ textAlign: "center" }}>
              <ListItemText primary={page.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="div"
        sx={{
          position: "absolute",
          color: "black",
          bgcolor: "#dcdcdc",
          boxShadow: "0 5px 20px 0 #0b076e0a",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Idea Labs 3D
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={page.action}
                sx={{ color: "#000" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};
