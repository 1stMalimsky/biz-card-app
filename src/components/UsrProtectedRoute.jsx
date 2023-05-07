import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";

const UsrProtectedRoute = ({
  needBiz,
  needAdmin,
  needLoggedIn,
  element,
  accountType,
}) => {
  const isLoggedIn = useSelector((bigPie) => bigPie.authSlice.isLoggedIn);
  const isBiz = useSelector((bigPie) => bigPie.authSlice.isBiz);
  const isAdmin = useSelector((bigPie) => bigPie.authSlice.isAdmin);
  console.log("isLoggedIn", isLoggedIn);

  if (isLoggedIn) {
    console.log("I'm IN");
    if (needBiz && isBiz) {
      console.log("need Biz");
      return element;
    }
    if (needAdmin && isAdmin) {
      console.log("need admin");
      return element;
    }
    if (needLoggedIn) {
      console.log("need loggedin");
      return element;
    }
    toast.error(`You must be ${accountType} user to take this action`);
    return <Navigate to={ROUTES.HOME} />;
  }
};

export default UsrProtectedRoute;
