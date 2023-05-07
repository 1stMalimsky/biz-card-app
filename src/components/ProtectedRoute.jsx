import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";

const ProtectedRoute = ({ element }) => {
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);
  if (isLoggedIn) {
    return element;
  } else {
    toast.error("You must be logged in to load this page");
    return <Navigate to={ROUTES.HOME} />;
  }
};
export default ProtectedRoute;
