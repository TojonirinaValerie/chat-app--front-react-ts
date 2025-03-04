import { Helmet } from "react-helmet";
import ListDiscussionContainer from "../components/chat/listDiscussionContainer";
import { Outlet, useParams } from "react-router-dom";
import ChatDetail from "../components/chat/chatDetail";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setShowDetailMessage } from "../redux/slice/setting.slice";

const Chat = () => {
  const settingState = useAppSelector((state) => state.setting);
  const appDispatch = useAppDispatch();
  const { id } = useParams();

  const handleClose = () => {
    appDispatch(setShowDetailMessage(false));
  };

  return (
    <div className="flex flex-row w-full">
      <section
        className={` ${
          settingState.showDetailMessage
            ? " w-[75%] rounded-[20px] "
            : " w-full sm:rounded-l-[20px] "
        } bg-blue-bg flex flex-row py-4 `}
      >
        <Helmet>
          <title>Chat</title>
        </Helmet>
        <div
          className={`pl-6 max-md:pl-2 ${id ? "max-lg:hidden" : "max-lg:w-full"} ${
            settingState.showDetailMessage ? " w-[40%] " : " w-1/3 }"
          }`}
        >
          <ListDiscussionContainer />
        </div>
        <div
          className={`${!id ? "max-lg:hidden" : "max-lg:w-full"}  ${
            settingState.showDetailMessage ? " w-[60%] " : " w-2/3 }"
          }`}
        >
          <Outlet />
        </div>
      </section>
      {settingState.showDetailMessage && (
        <div className={`w-[25%] py-4`}>
          <ChatDetail handleClose={handleClose} />
        </div>
      )}
    </div>
  );
};

export default Chat;
