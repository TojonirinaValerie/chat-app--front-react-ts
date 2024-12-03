import { ScrollArea } from "@mantine/core";
import RelationMenuItem, { RelationMenuItemProps } from "./relationMennuItem";
import NavigationRoute from "../../NavigationRoute";
import { RiUserReceivedFill } from "react-icons/ri";
import { RiUserFollowFill } from "react-icons/ri";
import { RiUserAddFill } from "react-icons/ri";
import { RiUserSharedFill } from "react-icons/ri";
import useRelationNotificationNumber from "../../lib/notification/useRelationNotificatonNumber";

const relationMenusList: RelationMenuItemProps[] = [
  {
    label: "Ami(e)s",
    path: NavigationRoute.FRINEDS,
    icon: <RiUserFollowFill />,
  },
  {
    label: "Invitations",
    path: NavigationRoute.REQUEST,
    icon: <RiUserReceivedFill />,
  },
  {
    label: "Votre demande",
    path: NavigationRoute.MY_REQUEST,
    icon: <RiUserSharedFill />,
  },
  {
    label: "Suggestions",
    path: NavigationRoute.SUGGESTIONS,
    icon: <RiUserAddFill />,
  },
];

const RelationMenu = () => {
  const { getBadgeNotif } = useRelationNotificationNumber();

  return (
    <div className="flex flex-col w-full h-full">
      <div className="pr-6 pl-2 px-">
        <h1 className="text-[1.4rem]">Relation</h1>
      </div>
      <ScrollArea
        className="mt-6 min-w-0 pr-3"
        scrollbars="y"
        classNames={{
          scrollbar: "bg-blue-bg hover:bg-blue-bg text-blue-ligth",
          thumb: "hover:bg-blue-ligth",
        }}
      >
        {relationMenusList.map((menu, index) => (
          <RelationMenuItem
            {...menu}
            key={menu.label}
            notificationCount={getBadgeNotif(index)}
          />
        ))}
      </ScrollArea>
    </div>
  );
};

export default RelationMenu;
