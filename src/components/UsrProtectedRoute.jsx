import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const UsrProtectedRoute = ({
  needBiz,
  needAdmin,
  needLoggedIn,
  element,
  accountType,
}) => {
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  const isLoggedIn = useSelector((bigPie) => bigPie.authSlice.isLoggedIn);
  const isBiz = useSelector((bigPie) => bigPie.authSlice.isBiz);
  const isAdmin = useSelector((bigPie) => bigPie.authSlice.isAdmin);
  const token = localStorage.getItem("token");

  if (isLoggedIn) {
    if (needBiz && isBiz) {
      return element;
    }
    if (needAdmin && isAdmin) {
      return element;
    }
    if (needLoggedIn) {
      return element;
    }
    toast.error(`You must be ${accountType} user to take this action`);
    return <Navigate to={ROUTES.HOME} />;
  } else if (!token && !isLoggedIn) {
    toast.error(`You must be ${accountType} user to take this action`);
    return <Navigate to={ROUTES.HOME} />;
  }
};

export default UsrProtectedRoute;
