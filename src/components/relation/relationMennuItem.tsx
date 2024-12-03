import { Link, useLocation } from "react-router-dom";
import NavigationRoute from "../../NavigationRoute";
import { Badge } from "@mantine/core";

export interface RelationMenuItemProps {
  label: string;
  icon: JSX.Element;
  path: string;
  notificationCount?: number;
}
const RelationMenuItem: React.FC<RelationMenuItemProps> = ({
  label,
  icon,
  path,
  notificationCount: count,
}) => {
  const location = useLocation();
  const active = location.pathname === `${NavigationRoute.RELATION}${path}`;

  return (
    <div className="my-2">
      <Link
        to={`${NavigationRoute.RELATION}${path}`}
        className={`p-2 rounded-[10px] flex flex-row items-center justify-between hover:bg-blue-dark ${
          active && " bg-blue-dark "
        }`}
      >
        <p className="flex flex-row items-center">
          <span
            className={`text-lg mr-2 p-2 rounded-full ${
              active ? " bg-blue-ligth " : " bg-[#555555] "
            }`}
          >
            {icon}
          </span>
          <span>{label}</span>
        </p>

        {count && (
          <Badge circle color="red">
            {count}
          </Badge>
        )}
      </Link>
    </div>
  );
};

export default RelationMenuItem;
