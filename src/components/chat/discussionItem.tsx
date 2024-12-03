import { Avatar, Badge, Loader } from "@mantine/core";
import { IDiscussions } from "../../types/message";
import { toProfilUrl } from "../../utils/utils";
import NavigationRoute from "../../NavigationRoute";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
// import { useEffect, useState } from "react";
import useTimeDifferenceRealTime from "../../lib/utils/useTimeDifferenceRealTime";

interface DiscussionItemProps {
  discussion: IDiscussions;
  active: boolean;
}
const DiscussionItem: React.FC<DiscussionItemProps> = ({
  discussion,
  active,
}) => {
  const { otherUser } = discussion;
  const userInfo = useAppSelector((state) => state.user);
  const { timeDifference } = useTimeDifferenceRealTime(
    new Date(discussion.lastMessage.date).toString()
  );


  return (
    <Link
      className={`flex flex-row items-center p-2 px-3 w-full rounded-[16px] cursor-pointer ${
        active && " bg-blue-dark "
      }`}
      to={`${NavigationRoute.CHAT}/${otherUser._id}`}
    >
      <Avatar
        src={toProfilUrl(otherUser._id, otherUser.profilPicture)}
        size={50}
        className="mr-3"
      />
      <div className="flex flex-col w-full p-1">
        <div className="flex flex-row justify-between">
          <p className="font-[600] text-white">
            {otherUser.firstName} {otherUser.lastName}
          </p>
          <p className="text-grey text-sm text-">{timeDifference}</p>
        </div>
        <div className="flex flex-row w-full items-center justify-between">
          <p
            className={` truncate max-w-[220px] flex-1 text-grey ${
              discussion.unreadMessage > 0 ? " font-[600] " : "  "
            }`}
          >
            {discussion.isOtherUserOnTyping ? (
              <span
                className={`text-blue-ligth flex flex-row items-center transition-all`}
              >
                <span className="mr-2">En train d'écrire</span>
                <Loader type="dots" color="#6b8afd" size="sm" />
              </span>
            ) : (
              `${userInfo._id === discussion.lastMessage.sender ? "Vous:" : ""}
                ${discussion.lastMessage.content}`
            )}
          </p>
          {discussion.unreadMessage > 0 && (
            <Badge size="sm" circle className="" color="red">
              {discussion.unreadMessage > 9 ? "+9" : discussion.unreadMessage}
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
};

export default DiscussionItem;
