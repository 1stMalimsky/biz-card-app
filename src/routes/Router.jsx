import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ROUTES from "./ROUTES";
import LoginPage from "../pages/LoginPage";
import EditCardPage from "../pages/EditCardPage";
import ProtectedRoute from "../components/ProtectedRoute";
import ProfilePage from "../pages/ProfilePage";
import UsrProtectedRoute from "../components/UsrProtectedRoute";
import AddNewCardPage from "../pages/AddNewCardPage";
import LogoutLink from "../components/LogoutLink";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import FavoritePage from "../pages/FavoritePage";
import MyCardPage from "../pages/MyCardsPage";
import AboutPage from "../pages/AboutPage/AboutPage";
import DetailedCardPage from "../pages/DetailedCardPage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.FAVCARDS} element={<FavoritePage />} />
      <Route
        path="/edit/:id"
        element={
          <UsrProtectedRoute
            needBiz={true}
            needAdmin={true}
            element={<EditCardPage />}
            accountType={"business/admin"}
          />
        }
      />
      <Route path="/detail/:id" element={<DetailedCardPage />} />
      <Route
        path={ROUTES.PROFILE}
        element={<ProtectedRoute element={<ProfilePage />} />}
      />
      <Route
        path="/addNew"
        element={
          <UsrProtectedRoute
            needBiz={true}
            needAdmin={false}
            element={<AddNewCardPage />}
            accountType={"business"}
          />
        }
      />
      <Route path={ROUTES.MYCARDS} element={<MyCardPage />} />
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
