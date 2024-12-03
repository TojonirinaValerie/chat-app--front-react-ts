import { Avatar } from "@mantine/core";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { IUser } from "../../types/user";
import useFindOtherUser from "../../lib/message/findOtherUser";
import { toProfilUrl } from "../../utils/utils";

interface ChatDetailProps {
  handleClose: () => void;
}
const ChatDetail: React.FC<ChatDetailProps> = ({ handleClose }) => {
  const [otherUser, setOtherUser] = useState<IUser>();
  const [indexOtherUser, setIndexOtherUser] = useState<number | null>(null);
  useFindOtherUser({ setOtherUser, setIndexOtherUser });

  return (
    <div className="bg-myBlack px-4 w-full flex flex-col">
      <header className="w-full flex flex-row justify-between">
        <h1>Profil</h1>
        <IoMdClose onClick={handleClose} className="cursor-pointer" />
      </header>
      <div className="flex flex-col">
        <div className="flex flex-col items-center my-2">
          <Avatar
            src={
              otherUser && toProfilUrl(otherUser?._id, otherUser?.profilPicture)
            }
            size={100}
          />
          <p className="mt-2">
            {otherUser?.firstName} {otherUser?.lastName}
          </p>
          <p className="text-grey">{otherUser?.pseudo}</p>
        </div>
        <div className="flex flex-col">
          <h2 className="flex flex-row justify-between">
            <p>
              <span> Photos et videos</span>{" "}
              <span className="text-grey text-sm">104</span>
            </p>
            <p className="text-grey text-sm">Voir tout</p>
          </h2>
          <div>{/* <img src="" alt="" /> */}</div>
        </div>
        <div className="flex flex-col">
          <h2 className="flex flex-row justify-between">
            <p>
              <span>Fichier</span>{" "}
              <span className="text-grey text-sm">1204</span>
            </p>
            <p className="text-grey text-sm">Voir tout</p>
          </h2>
          <div>{/* <img src="" alt="" /> */}</div>
        </div>
        <div className="flex flex-col">
          <h2 className="flex flex-row justify-between">
            <p>
              <span>Liens</span> <span className="text-grey text-sm">32</span>
            </p>
            <p className="text-grey text-sm">Voir tout</p>
          </h2>
          <div>{/* <img src="" alt="" /> */}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
