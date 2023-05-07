import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const LogoutRoute = ({ element }) => {
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);
  if (isLoggedIn) {
    return element;
  } else {
    return <Navigate to={ROUTES.HOME} />;
  }
};
export default LogoutRoute;
