import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { login, register } from "../api/authentification";
import { toast } from "react-toastify";
import NavigationRoute from "../NavigationRoute";
import { localStorageKey } from "../utils/constant";
import { registerValidationSchema } from "../validations";
import socket from "../context/socket";
import { setLoadingDataUser } from "../redux/slice/loading.slice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserInfo } from "../api/user";
import { setUser } from "../redux/slice/user.slice";

export const useLoginAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formikLogin = useFormik({
    initialValues: { pseudo: "", password: "" },
    onSubmit: async (value) => {
      setIsLoading(true);

      try {
        const response = await login(value);
        localStorage.setItem(
          localStorageKey.accessToken,
          response.data.data.accessToken
        );
        localStorage.setItem(
          localStorageKey.refreshToken,
          response.data.data.refreshToken
        );
        location.href = NavigationRoute.CHAT;
      } catch (e: any) {
        if (e.response.data.message) {
          toast.error(e.response.data.message);
          console.log(e.response.data.message);
          setError(e.response.data.message);
        } else {
          toast.error("Une erreur s'est produite");
          console.log("erreur", e);
          setError(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  return { formikLogin, isLoading, error };
};

export const useRegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      pseudo: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
    onSubmit: async (value) => {
      try {
        const response = await register(value);
        localStorage.setItem(
          localStorageKey.accessToken,
          response.data.data.accessToken
        );
        localStorage.setItem(
          localStorageKey.refreshToken,
          response.data.data.refreshToken
        );
        location.href = NavigationRoute.UPLOAD_PROFIL;
      } catch (e: any) {
        if (e.response.data.message) {
          toast.error(e.response.data.message);
          console.log(e.response.data.message);
          setError(e.response.data.message);
        } else {
          toast.error("Une erreur s'est produite");
          console.log("erreur", e);
          setError(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema: registerValidationSchema,
  });

  return { formik, isLoading, error };
};

export const useAuth = ()=>{
  const userState = useAppSelector((state) => state.user);
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserInfo = async () => {
    appDispatch(setLoadingDataUser(true));
    try {
      const response = await getUserInfo();
      if (
        !response.data.data.profilPicture &&
        location.pathname !== NavigationRoute.UPLOAD_PROFIL
      ) {
        appDispatch(setLoadingDataUser(false));
        return navigate(NavigationRoute.UPLOAD_PROFIL);
      }
      appDispatch(setUser(response.data.data));
      appDispatch(setLoadingDataUser(false));
      socket.emit("user-connected", response.data.data._id);
    } catch (e) {
      toast.error("Accès non autorisé.", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log(e);
      localStorage.removeItem(localStorageKey.accessToken);
      localStorage.removeItem(localStorageKey.refreshToken);
      navigate(NavigationRoute.LOGIN);
    }
  };

  useEffect(() => {
    if (!userState._id) fetchUserInfo();
  }, [userState]);

}

export const deconnexion = () => {
  localStorage.removeItem(localStorageKey.accessToken);
  localStorage.removeItem(localStorageKey.refreshToken);
  location.href = NavigationRoute.LOGIN;
};
