import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import RelationMenu from "../components/relation/relationMenu";

const Relation = () => {
  return (
    <div className="flex flex-row w-full">
      <section
        className={`w-full rounded-l-[20px] bg-blue-bg flex flex-row py-4 `}
      >
        <Helmet>
          <title>Relation</title>
        </Helmet>
        <div className={`pl-6 w-1/4`}>
          <RelationMenu />
        </div>
        <div className={`w-3/4`}>
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default Relation;
