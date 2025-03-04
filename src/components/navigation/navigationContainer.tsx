import { IoChatbubblesSharp, IoHelpCircleSharp, IoMenu } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import NavigationRoute from "../../NavigationRoute";
import MenuItem from "./menuItems";
import { ChatLogo } from "../../assets";
import { Avatar, Drawer, Menu } from "@mantine/core";
import { deconnexion } from "../../lib/authLib";
import { useAppSelector } from "../../redux/store";
import { toProfilUrl } from "../../utils/utils";
import { FaUsers } from "react-icons/fa";
import useMenuNotifNumbner from "../../lib/notification/useMenuNotifNumber";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const menus: {
  label: string;
  icon: JSX.Element;
  path: string;
}[] = [
  {
    label: "Chat",
    icon: <IoChatbubblesSharp />,
    path: NavigationRoute.CHAT,
  },
  {
    label: "Relation",
    icon: <FaUsers />,
    path: NavigationRoute.RELATION,
  },
  {
    label: "Paramètre",
    icon: <IoSettingsSharp />,
    path: NavigationRoute.SETTING,
  },
  {
    label: "Aide",
    icon: <IoHelpCircleSharp />,
    path: NavigationRoute.HELP,
  },
];

const NavigationContainer = () => {
  const user = useAppSelector((state) => state.user);
  const { getBadgeNotif } = useMenuNotifNumbner();
  const [opened, { open, close }] = useDisclosure(true);
  const pathname = useLocation().pathname;
  useEffect(() => {
    close();
  }, [pathname]);
  return (
    <>
      <div className="flex flex-col justify-between items-center h-full min-w-[80px] max-w-[80px] px-4 py-2 max-sm:hidden">
        <div className="w-full flex flex-col items-center">
          <div className="flex flex-col items-center p-1 mt-4 w-[40px]">
            <img src={ChatLogo} alt="" className="" />
          </div>
          <div className="flex flex-col items-center mt-12 ">
            {menus.map((menu, index) => (
              <MenuItem
                key={`${menu.label}-${menu.path}`}
                label={menu.label}
                icon={menu.icon}
                path={menu.path}
                notif={getBadgeNotif(index)}
              />
            ))}
          </div>
        </div>
        <div className="mb-4">
          <Menu>
            <Menu.Target>
              <Avatar
                className="cursor-pointer"
                src={toProfilUrl(user._id, user.profilPicture)}
                w={50}
                h={50}
              />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={deconnexion}>Deconnexion</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>

      <div className="sm:hidden">
        <div className="fixed bottom-0 left-0 bg-myBlack w-screen">
          <IoMenu
            className="m-3 mx-6 cursor-pointer hover:text-white"
            size={30}
            onClick={open}
          />
        </div>
        <Drawer
          opened={opened}
          onClose={close}
          withCloseButton={false}
          padding={0}
          size="xs"
        >
          <div className="h-screen  bg-myBlack">
            <div className="flex flex-col justify-between items-center h-full min-w-[80px] max-w-[80px] px-4 py-2">
              <div className="w-full flex flex-col items-center">
                <div className="flex flex-col items-center p-1 mt-4 w-[40px]">
                  <img src={ChatLogo} alt="" className="" />
                </div>
                <div className="flex flex-col items-center mt-12 ">
                  {menus.map((menu, index) => (
                    <MenuItem
                      key={`${menu.label}-${menu.path}`}
                      label={menu.label}
                      icon={menu.icon}
                      path={menu.path}
                      notif={getBadgeNotif(index)}
                    />
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <Menu>
                  <Menu.Target>
                    <Avatar
                      className="cursor-pointer"
                      src={toProfilUrl(user._id, user.profilPicture)}
                      w={50}
                      h={50}
                    />
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item onClick={deconnexion}>Deconnexion</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default NavigationContainer;
