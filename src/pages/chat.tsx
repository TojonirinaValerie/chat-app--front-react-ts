import { Helmet } from "react-helmet";
import ListDiscussionContainer from "../components/chat/listDiscussionContainer";
import { Outlet } from "react-router-dom";
import ChatDetail from "../components/chat/chatDetail";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setShowDetailMessage } from "../redux/slice/setting.slice";

const Chat = () => {
  const settingState = useAppSelector((state) => state.setting);
  const appDispatch = useAppDispatch();

  const handleClose = () => {
    appDispatch(setShowDetailMessage(false));
  };

  return (
    <div className="flex flex-row w-full">
      <section
        className={`${
          settingState.showDetailMessage
            ? " w-[75%] rounded-[20px] "
            : " w-full rounded-l-[20px]"
        } bg-blue-bg flex flex-row py-4 `}
      >
        <Helmet>
          <title>Chat</title>
        </Helmet>
        <div
          className={`pl-6  ${
            settingState.showDetailMessage ? " w-[40%] " : " w-1/3 }"
          }`}
        >
          <ListDiscussionContainer />
        </div>
        <div
          className={`${
            settingState.showDetailMessage ? " w-[60%] " : " w-2/3 }"
          }`}
        >
          <Outlet />
          {/* <ConversationContainer /> */}
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
