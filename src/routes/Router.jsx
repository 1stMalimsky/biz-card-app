import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import ROUTES from "./ROUTES";
import LoginPage from "../pages/LoginPage";
import EditCardPage from "../pages/EditCardPage";
import ProtectedRoute from "../components/ProtectedRoute";
import ProfilePage from "../pages/ProfilePage";
import TkProtectedRoutes from "../components/TkProtectedRoutes";
import AddNewCardPage from "../pages/AddNewCardPage";
import LogoutLink from "../components/LogoutLink";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.ABOUT} element={<h1>About Us</h1>} />
      <Route path={ROUTES.FAVCARDS} element={<h1>FavCards</h1>} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route
        path="/edit/:id"
        element={
          <TkProtectedRoutes
            needBiz={true}
            needAdmin={true}
            element={<EditCardPage />}
          />
        }
      />
      <Route
        path={ROUTES.PROFILE}
        element={<ProtectedRoute element={<ProfilePage />} />}
      />
      <Route
        path="/addNew"
        element={
          <TkProtectedRoutes
            needBiz={true}
            needAdmin={false}
            element={<AddNewCardPage />}
          />
        }
      />
      <Route path={ROUTES.MYCARDS} element={<h1>My Cards</h1>} />
      <Route path={ROUTES.SANDBOX} element={<h1>Sandbox</h1>} />
      <Route
        path={ROUTES.LOGOUT}
        element={<ProtectedRoute element={<LogoutLink />} />}
      />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

export default Router;
