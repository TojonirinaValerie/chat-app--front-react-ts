import { ScrollArea } from "@mantine/core";
import DiscussionItem from "./discussionItem";
import { RiSearchLine } from "react-icons/ri";
import { useAppSelector } from "../../redux/store";
import { useParams } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";

const ListDiscussionContainer = () => {
  const discussion = useAppSelector((state) => state.message);
  const { id } = useParams();
  return (
    <div className="flex flex-col w-full h-full">
      <div className="pr-6 pl-2 px-">
        <div className="w-full flex flex-row items-center bg-blue-dark p-2 pl-4 rounded-[8px]">
          <RiSearchLine className="text-grey" />
          <input
            type="text"
            className="bg-blue-dark text-grey outline-none ml-2"
            placeholder="Recherche"
          />
        </div>
      </div>
      <ScrollArea
        className="mt-6 min-w-0 pr-3"
        scrollbars="y"
        classNames={{
          scrollbar: "bg-blue-bg hover:bg-blue-bg text-blue-ligth",
          thumb: "hover:bg-blue-ligth",
        }}
      >
        {discussion.map((message, index) => (
          <DiscussionItem
            discussion={message}
            active={id === message.otherUser._id}
            key={`${index}-${message.otherUser._id}-${message.lastMessage._id}`}
          />
        ))}
      </ScrollArea>
    </div>
  );
};

export default ListDiscussionContainer;
