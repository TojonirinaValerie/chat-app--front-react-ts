import { Navigate, Outlet } from "react-router-dom";
import { isAuth } from "../utils/utils";
import NavigationRoute from "../NavigationRoute";
import { useAuth } from "./authLib";
import { useAppSelector } from "../redux/store";
import { LoadingOverlay } from "@mantine/core";

const AuthRequire = () => {
  useAuth();
  const userInfo = useAppSelector((state) => state.user);
  return isAuth() ? (
    !userInfo._id ? (
      <LoadingOverlay
        visible={true}
        overlayProps={{ color: "#111", blur: 2 }}
      />
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to={NavigationRoute.LOGIN} replace />
  );
};

export default AuthRequire;
