import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";

const UsrProtectedRoute = ({ needBiz, needAdmin, element, accountType }) => {
  const isLoggedIn = useSelector((bigPie) => bigPie.authSlice.isLoggedIn);
  const isBiz = useSelector((bigPie) => bigPie.authSlice.isBiz);
  const isAdmin = useSelector((bigPie) => bigPie.authSlice.isAdmin);
  const accountNeeded = accountType;
  if (isLoggedIn) {
    if (needBiz && isBiz) {
      return element;
    }
    if (needAdmin && isAdmin) {
      return element;
    }
    toast.error(`You must be a ${accountNeeded} user to add a new card!`);
    return <Navigate to={ROUTES.HOME} />;
  }
};

export default UsrProtectedRoute;
