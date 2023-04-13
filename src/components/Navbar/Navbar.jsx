import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { Switch } from "@mui/material";
import { NavLink } from "react-router-dom";
import SearchPartial from "./SearchPartial";
import ROUTES from "../../routes/ROUTES";
import { darkThemeActions } from "../../store/darkTheme";
import NavLinkComponent from "./NavLinkComponent";
import { authActions } from "../../store/auth";
import logoImg from "../../newBizLogo.png";

// access to all
const pages = [
  {
    label: "HOME",
    url: ROUTES.HOME,
  },
];

//not logged in users
const notAuthPages = [
  {
    label: "REGISTER",
    url: ROUTES.REGISTER,
  },
  {
    label: "LOGIN",
    url: ROUTES.LOGIN,
  },
];

//logged in users
const authedPages = [
  {
    label: "PROFILE",
    url: ROUTES.PROFILE,
  },
  {
    label: "LOGOUT",
    url: ROUTES.LOGOUT,
  },
];

//admin/biz pages
const adminBizPages = [
  {
    label: "CREATE",
    url: ROUTES.REGISTER,
  },
];

const MuiNavbar = () => {
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const changeTheme = () => {
    dispatch(darkThemeActions.changeTheme());
  };

  const handleLogoutClick = () => {
    console.log("here");
    localStorage.clear();
    dispatch(authActions.logout());
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <NavLink to={ROUTES.HOME}>
            <img src={logoImg} alt="logo" className="logoImg" />
          </NavLink>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <NavLinkComponent key={page.url} {...page} />
            ))}
            {isLoggedIn
              ? authedPages.map((page) =>
                  page.url === ROUTES.LOGOUT ? (
                    <NavLinkComponent
                      key={page.url}
                      {...page}
                      onClick={handleLogoutClick}
                    />
                  ) : (
                    <NavLinkComponent key={page.url} {...page} />
                  )
                )
              : notAuthPages.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))}
          </Box>
          <SearchPartial />
          <Box
            sx={{
              my: 2,
              p: 1,
            }}
          >
            <IconButton>
              <DarkModeIcon
                fontSize={"large"}
                color={isDarkTheme ? "white" : "black"}
                //sx={{ display: { xs: "none", md: "inline" } }}
                onClick={changeTheme}
              />
            </IconButton>
          </Box>
          {/* hamburger with menu */}
          <Box
            sx={{
              flexGrow: 1,
              flex: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton size="large" onClick={handleOpenNavMenu}>
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
                <NavLinkComponent
                  to={page.url}
                  className={"navLink"}
                  key={"miniLinks" + page.url}
                  onClick={handleCloseNavMenu}
                  {...page}
                >
                  {/*  {({ isActive }) => (
                    <Typography
                      sx={{
                        textAlign: "center",
                        px: 5,
                      }}
                      color={
                        isActive
                          ? isDarkTheme
                            ? "warning.dark"
                            : "secondary.dark"
                          : isDarkTheme
                          ? "warning.light"
                          : "white"
                      }
                    >
                      {page.label}
                    </Typography>
                  )} */}
                </NavLinkComponent>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MuiNavbar;
