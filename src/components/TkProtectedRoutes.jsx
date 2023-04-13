import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const TkProtectedRoutes = ({ needBiz, needAdmin, element }) => {
  const isLoggedIn = useSelector((bigPie) => bigPie.authSlice.isLoggedIn);

  const isBiz = useSelector((bigPie) => bigPie.authSlice.payload.biz);

  const isAdmin = useSelector((bigPie) => bigPie.authSlice.payload.isAdmin);

  console.log("logged In", isLoggedIn, "isBiz", isBiz, "isAdmin", isAdmin);

  if (isLoggedIn) {
    if (needBiz && isBiz) {
      return element;
    }

    if (needAdmin && isAdmin) {
      return element;
    }
  }
  return <Navigate to={ROUTES.LOGIN} />;
};

export default TkProtectedRoutes;
