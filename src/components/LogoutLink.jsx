import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { CircularProgress } from "@mui/material";

const LogoutLink = () => {
  return <CircularProgress />;
};

export default LogoutLink;
