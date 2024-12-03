import { Navigate, Outlet } from "react-router-dom";
import { isAuth } from "../utils/utils";
import NavigationRoute from "../NavigationRoute";

const PublicCheck = () => {
  return isAuth() ? <Navigate to={NavigationRoute.CHAT} replace /> : <Outlet />;
};

export default PublicCheck;
