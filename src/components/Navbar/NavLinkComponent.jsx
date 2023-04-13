import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import "./navBar.css";
import { useSelector } from "react-redux";

const NavLinkComponent = ({ url, label, onClick }) => {
  const isDarkTheme = useSelector(
    (bigState) => bigState.darkThemeSlice.isDarkTheme
  );

  return (
    <NavLink to={url} onClick={onClick} className={"navLink"}>
      {({ isActive }) => (
        <Typography
          fontWeight={"bold"}
          sx={{
            p: 1,
            border: 1.3,
            borderRadius: 1,
            mx: 1,
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
          {label}
        </Typography>
      )}
    </NavLink>
  );
};

export default NavLinkComponent;
