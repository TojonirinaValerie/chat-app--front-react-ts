import { Badge } from "@mantine/core";
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface MenuItemProps {
  label: string;
  icon: JSX.Element;
  path: string;
  notif?: number;
}
const MenuItem: React.FC<MenuItemProps> = ({ label, icon, path, notif }) => {
  const location = useLocation();

  return (
    <Link
      to={path}
      className={`flex flex-col items-center my-3 relative w-full ${
        location.pathname.includes(path) ? " text-white " : " text-grey "
      }`}
    >
      <p className="text-[1.5rem]">{icon}</p>
      <p className="text-xxs mt-1">{label}</p>
      {notif !== undefined && (
        <Badge
          size={"xs"}
          circle
          className="absolute top-0 right-1"
          color="red"
        >
          {notif}
        </Badge>
      )}
    </Link>
  );
};

export default MenuItem;
