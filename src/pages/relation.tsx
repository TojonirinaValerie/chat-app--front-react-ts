import { Helmet } from "react-helmet";
import { Outlet, useLocation } from "react-router-dom";
import RelationMenu from "../components/relation/relationMenu";

const Relation = () => {
  const location = useLocation();
  return (
    <div className="flex flex-row w-full">
      <section
        className={`w-full rounded-l-[20px] bg-blue-bg flex flex-row py-4 `}
      >
        <Helmet>
          <title>Relation</title>
        </Helmet>
        <div className={`pl-6 w-[35%] ${/^\/relation\/.+$/.test(location.pathname) ? " max-lg:hidden ": "max-lg:w-full"}`}>
          <RelationMenu />
        </div>
        <div className={`w-[65%] ${!/^\/relation\/.+$/.test(location.pathname) ? " max-lg:hidden ": "max-lg:w-full"}`}>
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default Relation;
