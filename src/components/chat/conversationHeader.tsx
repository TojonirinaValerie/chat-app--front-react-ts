import { Avatar, Menu } from "@mantine/core";
import { IoCall, IoEllipsisVertical, IoSearch } from "react-icons/io5";
import { RiArrowGoBackLine } from "react-icons/ri";
import { IUser } from "../../types/user";
import { toProfilUrl } from "../../utils/utils";
import { useAppDispatch } from "../../redux/store";
import { setShowDetailMessage } from "../../redux/slice/setting.slice";
import { Link } from "react-router-dom";
import NavigationRoute from "../../NavigationRoute";

interface ConversationHeaderProps {
  otherUser?: IUser;
}
const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  otherUser,
}) => {
  const appDispatch = useAppDispatch();
  return (
    <header className="flex flex-row items-center justify-between pr-4">
      <div className="flex flex-row items-center">
        <Link to={NavigationRoute.CHAT}>
          <RiArrowGoBackLine className="mx-3 cursor-pointer hover:text-white min-w-[25px] lg:hidden" />
        </Link>
        <div>
          <Avatar
            src={
              otherUser && toProfilUrl(otherUser?._id, otherUser?.profilPicture)
            }
            size={50}
            className="mr-3"
          />
        </div>
        <div className="flex flex-col">
          <p className="leading-5">
            {otherUser?.firstName} {otherUser?.lastName}
          </p>
          {/* <p className="text-grey leading-5">en ligne il y a 12 minutes</p> */}
        </div>
      </div>
      <div className="flex flex-row text-[1.2rem] text-grey">
        <IoSearch className="mx-3 cursor-pointer hover:text-white" />
        <IoCall className="mx-3 cursor-pointer hover:text-white" />
        <Menu position="bottom-end">
          <Menu.Target>
            <span>
              <IoEllipsisVertical className="mx-3 cursor-pointer hover:text-white" />
            </span>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => appDispatch(setShowDetailMessage(true))}>
              detail
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </header>
  );
};

export default ConversationHeader;
