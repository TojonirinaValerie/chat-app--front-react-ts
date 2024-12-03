import { Outlet } from "react-router-dom";
import NavigationContainer from "../navigation/navigationContainer";
import useReceiveMessage from "../../lib/message/receiveMessave";
import { LoadingOverlay } from "@mantine/core";
import { useAppSelector } from "../../redux/store";
import useFetchDiscussion from "../../lib/message/fetchDiscussion.";
import useReceiveNotification from "../../lib/notification/receiveNotification";
import { NotificationDataType } from "../../types/notification";
import { toast, ToastContentProps } from "react-toastify";
import FriendRequestNotification from "../toast/friendRequestNotification";
import useFetchNotificationCount from "../../lib/notification/fetchNotificationCount";
import { useRef } from "react";
import {
  MessageReceiveSound,
  NotificationSound,
  TypingSound,
} from "../../assets";
import useOnTyping from "../../lib/message/onTyping";

const RootLayout = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const notifAudioRef = useRef<HTMLAudioElement | null>(null);
  const typingAudioRef = useRef<HTMLAudioElement | null>(null);

  const showToast = (data: NotificationDataType) => {
    toast(
      (props: ToastContentProps) => (
        <FriendRequestNotification
          user={data.otherUser}
          relation={data.relation}
          notification={data.notification}
          {...props}
        />
      ),
      {
        autoClose: 5000,
        position: "bottom-right",
        draggable: true,
      }
    );
  };

  useFetchDiscussion();
  useReceiveMessage({ audioRef });
  useOnTyping(typingAudioRef);
  useReceiveNotification(showToast, notifAudioRef);
  useFetchNotificationCount();

  const loading = useAppSelector((state) => state.loading);
  return (
    <div className="w-full h-full flex flex-row">
      <LoadingOverlay
        visible={loading.loadingDataUser}
        overlayProps={{ blur: 2, color: "#111" }}
      />
      <NavigationContainer />
      <audio ref={audioRef} src={MessageReceiveSound} preload="auto" />
      <audio ref={notifAudioRef} src={NotificationSound} preload="auto" />
      <audio ref={typingAudioRef} src={TypingSound} preload="auto" />
      <Outlet />
    </div>
  );
};

export default RootLayout;
