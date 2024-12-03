import { Avatar } from "@mantine/core";
import { useAppSelector } from "../../redux/store";
import { IUser } from "../../types/user";
import { toProfilUrl } from "../../utils/utils";
import { useEffect } from "react";
import socket from "../../context/socket";

interface MessageItemProps {
  content: string;
  sender: string;
  otherUser?: IUser;
  divRef?: React.MutableRefObject<HTMLDivElement | null>;
}
const MessageItem: React.FC<MessageItemProps> = ({
  content,
  sender,
  otherUser,
  divRef,
}) => {
  const userInfo = useAppSelector((state) => state.user);

  return (
    <div
      className={`w-full flex flex-row ${
        sender !== userInfo._id ? " flex-row " : " flex-row-reverse "
      }`}
      ref={divRef}
    >
      <div
        className={`flex flex-row items-end w-[70%] my-2 ${
          sender !== userInfo._id ? " flex-row " : " flex-row-reverse "
        }`}
      >
        <Avatar
          src={
            otherUser && sender !== userInfo._id
              ? toProfilUrl(otherUser._id, otherUser.profilPicture)
              : toProfilUrl(userInfo._id, userInfo.profilPicture)
          }
        />
        <p
          className={`p-2 rounded-[18px] px-4 mb-2 ${
            sender !== userInfo._id
              ? " bg-blue-dark ml-2 rounded-bl-[0px]"
              : " bg-blue-ligth mr-2 rounded-br-[0px] "
          }`}
        >
          {content}
        </p>
      </div>
    </div>
  );
};

export default MessageItem;
