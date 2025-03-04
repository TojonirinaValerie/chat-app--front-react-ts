import { Loader, TextInput } from "@mantine/core";
import { IUser } from "../../types/user";
import useSendMessage from "../../lib/message/sendMessage";
import { IoMdAttach } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { GrEmoji } from "react-icons/gr";
import { useAppSelector } from "../../redux/store";

interface MessageInputProps {
  indexOtherUser: number | null;
  otherUser?: IUser;
}

const MessageInput: React.FC<MessageInputProps> = ({
  indexOtherUser,
  otherUser,
}) => {
  const { id } = useParams();
  const {
    content,
    handleInputChange,
    handleSendMessage,
    handleKeyDown,
    setContent,
  } = useSendMessage(indexOtherUser, otherUser);

  const loading = useAppSelector((state) => state.loading.loadingSendMessage);

  useEffect(() => {
    setContent("");
  }, [id]);

  const handleClickAttach = () => {
    console.log("====================================");
    console.log("attach");
    console.log("====================================");
  };
  const handleClickEmoji = () => {
    console.log("====================================");
    console.log("click emoji");
    console.log("====================================");
  };

  return (
    <div className="w-full pr-6">
      <TextInput
        className="bg-blue-bg"
        classNames={{
          root: "bg-blue-bg",
          input:
            "bg-blue-bg border-none text-base text-white placeholder:text-grey",
        }}
        value={content}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Ecrire votre message ici..."
        leftSection={
          <div className="flex flex-row mr-6 relative">
            <IoMdAttach
              className="text-grey text-base  cursor-pointer hover:text-blue-ligth"
              onClick={handleClickAttach}
            />
            <GrEmoji
              className="text-grey text-base  cursor-pointer hover:text-blue-ligth ml-1"
              onClick={handleClickEmoji}
            />
            {/* <div className="absolute bottom-[30px] test">
              <EmojiPicker onEmojiClick={handleEmojiClick} height={400}/>
            </div> */}
          </div>
        }
        rightSection={
          loading ? (
            <Loader size="xs" />
          ) : (
            <IoSend
              className="text-grey text-base cursor-pointer hover:text-blue-ligth"
              onClick={handleSendMessage}
            />
          )
        }
      />
    </div>
  );
};

export default MessageInput;
