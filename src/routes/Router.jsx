import { Route, Routes } from "react-router-dom";
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
import DetailedCardPage from "../pages/DetailedCardPage/DetailedCardPage";
import NestedRoutePage from "../pages/NestedRoutePage/NestedRoutePage";
import NestedPage1 from "../pages/NestedRoutePage/NestedPage1";
import NestedPage2 from "../pages/NestedRoutePage/NestedPage2";
import LogoutRoute from "../components/LogoutRoute";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route
        path={ROUTES.FAVCARDS}
        element={
          <UsrProtectedRoute
            needBiz={false}
            needAdmin={false}
            needLoggedIn={true}
            element={<FavoritePage />}
            accountType={"a registered"}
          />
        }
      />
      <Route
        path="/edit/:id"
        element={
          <UsrProtectedRoute
            needLoggedIn={false}
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
            needLoggedIn={false}
            needBiz={true}
            needAdmin={false}
            element={<AddNewCardPage />}
            accountType={"a business"}
          />
        }
      />
      <Route
        path={ROUTES.MYCARDS}
        element={
          <UsrProtectedRoute
            needLoggedIn={false}
            needBiz={true}
            needAdmin={false}
            element={<MyCardPage />}
            accountType={"a business"}
          />
        }
      />

      <Route
        path={ROUTES.SANDBOX}
        element={
          <UsrProtectedRoute
            needLoggedIn={false}
            needBiz={false}
            needAdmin={true}
            element={<NestedRoutePage />}
            accountType={"an admin"}
          />
        }
      >
        <Route path="/sandbox/nestedpage1" element={<NestedPage1 />} />
        <Route path="/sandbox/nestedpage2" element={<NestedPage2 />} />
      </Route>

      <Route
        path={ROUTES.LOGOUT}
        element={<LogoutRoute element={<LogoutLink />} />}
      />

      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

export default Router;
