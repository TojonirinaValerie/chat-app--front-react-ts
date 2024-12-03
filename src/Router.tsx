import { Routes, Route, Navigate } from "react-router-dom";
import NavigationRoute from "./NavigationRoute";
import Login from "./pages/login";
import Register from "./pages/register";
import Chat from "./pages/chat";
import RootLayout from "./components/layout/rootLayout";
import NotFound from "./pages/notFound";
import AuthRequire from "./lib/authRequire";
import UploadProfilPicture from "./pages/uploadProfilPicture";
import ConversationContainer from "./components/chat/conversationContainer";
import Relation from "./pages/relation";
import Setting from "./pages/setting";
import Help from "./pages/help";
import RelationContainer from "./components/relation/relationContainer";
import PublicCheck from "./lib/publicCheck";

const Router = () => {
  return (
    <Routes>
      {/* Route public */}
      <Route element={<PublicCheck />}>
        <Route
          path="/"
          element={<Navigate to={NavigationRoute.LOGIN} replace />}
        />
        <Route path={NavigationRoute.LOGIN} element={<Login />} />
        <Route path={NavigationRoute.REGISTER} element={<Register />} />
      </Route>

      {/* Route private */}
      <Route element={<AuthRequire />}>
        <Route element={<RootLayout />}>
          <Route path={NavigationRoute.CHAT} element={<Chat />}>
            <Route
              path={`${NavigationRoute.CHAT}/:id`}
              element={<ConversationContainer />}
            />
          </Route>
          <Route path={NavigationRoute.RELATION} element={<Relation />}>
            <Route
              path={`${NavigationRoute.RELATION}${NavigationRoute.FRINEDS}`}
              element={<RelationContainer type={NavigationRoute.FRINEDS} />}
            />
            <Route
              path={`${NavigationRoute.RELATION}${NavigationRoute.SUGGESTIONS}`}
              element={<RelationContainer type={NavigationRoute.SUGGESTIONS} />}
            />
            <Route
              path={`${NavigationRoute.RELATION}${NavigationRoute.REQUEST}`}
              element={<RelationContainer type={NavigationRoute.REQUEST} />}
            />
            <Route
              path={`${NavigationRoute.RELATION}${NavigationRoute.MY_REQUEST}`}
              element={<RelationContainer type={NavigationRoute.MY_REQUEST} />}
            />
          </Route>
          <Route path={NavigationRoute.SETTING} element={<Setting />} />
          <Route path={NavigationRoute.HELP} element={<Help />} />
        </Route>
        <Route
          path={NavigationRoute.UPLOAD_PROFIL}
          element={<UploadProfilPicture />}
        />
      </Route>
      {/* -------------- */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
