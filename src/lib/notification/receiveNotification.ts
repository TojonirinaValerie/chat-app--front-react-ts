import { useEffect } from "react";
import socket from "../../context/socket";
import { NotificationDataType } from "../../types/notification";
import { useNotificationCount } from "./fetchNotificationCount";
import { useFetchFriendRequestApi } from "../relation/fetchFriendRequest";
import { useFetchSuggestionsApi } from "../relation/fetchSuggestion";
import { useFetchMyFriendRequestApi } from "../relation/fetchMyFriendRequest";

const useReceiveNotification = (
  showToast: (data: NotificationDataType) => void,
  audioRef: React.MutableRefObject<HTMLAudioElement | null>
) => {
  // const dataTest: NotificationDataType = {
  //   notification: {
  //     type: "friend-request",
  //     receiver: "672d150e152917de6602eb05",
  //     relationId: "6749c21c5f007cefa7d565e8",
  //     seen: false,
  //     opened: false,
  //     _id: "6749c21c5f007cefa7d565ea",
  //     date: new Date("2024-11-29T13:31:08.936Z"),
  //     createdAt: new Date("2024-11-29T13:31:08.936Z"),
  //     updatedAt: new Date("2024-11-29T13:31:08.936Z"),
  //   },
  //   relation: {
  //     sender: {
  //       _id: "672d15e9152917de6602eb11",
  //       pseudo: "billy",
  //       firstName: "Rakoto",
  //       lastName: "Billy",
  //       role: "regular_user",
  //       status: "pending",
  //       profilPicture: "1731007983987.png",
  //     },
  //     receiver: {
  //       _id: "672d15e9152917de6602eb11",
  //       pseudo: "billy",
  //       firstName: "Rakoto",
  //       lastName: "Billy",
  //       role: "regular_user",
  //       status: "pending",
  //       profilPicture: "1731007983987.png",
  //     },
  //     status: "pending",
  //     _id: "6749c21c5f007cefa7d565e8",
  //     date: new Date("2024-11-29T13:31:08.932Z"),
  //     // createdAt: new Date("2024-11-29T13:31:08.933Z"),
  //     // updatedAt: new Date("2024-11-29T13:31:08.933Z"),
  //   },
  //   sender: {
  //     _id: "672d15e9152917de6602eb11",
  //     pseudo: "billy",
  //     firstName: "Rakoto",
  //     lastName: "Billy",
  //     role: "regular_user",
  //     status: "pending",
  //     profilPicture: "1731007983987.png",
  //   },
  // };
  // const { showToast } = data;

  // useEffect(() => {
  //   showToast(dataTest);
  // }, []);

  const { getNotificationCount } = useNotificationCount();
  const { getFriendRequest } = useFetchFriendRequestApi();
  const { getSuggestions } = useFetchSuggestionsApi();
  const { getMyFriendRequest } = useFetchMyFriendRequestApi();

  useEffect(() => {
    socket.on("receive-friend-request", (data: NotificationDataType) => {
      getFriendRequest();
      getSuggestions();
      getNotificationCount();
      showToast(data);
      if (audioRef.current) {
        audioRef.current.play();
      }
    });

    return () => {
      socket.off("receive-friend-request");
    };
  }, []);

  useEffect(() => {
    socket.on("rejected-friend-notif", (data) => {
      getNotificationCount();
      getSuggestions();
      getMyFriendRequest();
      showToast(data);
      if (audioRef.current) {
        audioRef.current.play();
      }
    });

    return () => {
      socket.off("receive-friend-request");
    };
  }, []);

  useEffect(() => {
    socket.on("accepted-friend-notif", (data) => {
      getMyFriendRequest();
      showToast(data);
      if (audioRef.current) {
        audioRef.current.play();
      }
    });

    return () => {
      socket.off("receive-friend-request");
    };
  }, []);
};

export default useReceiveNotification;
