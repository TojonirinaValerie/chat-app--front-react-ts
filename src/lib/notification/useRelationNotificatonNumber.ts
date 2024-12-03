import { useAppSelector } from "../../redux/store";

const useRelationNotificationNumber = () => {
  // const { unreadConversation } = useGetUnreadMessageLength();
  // const notificationCount = useAppSelector(
  //   (state) => state.notification.notificationCounts
  // );
  const notificationCount = useAppSelector(
    (state) => state.notification.notificationCounts
  );

  const getBadgeNotif = (index: number): number | undefined => {
    switch (index) {
      case 1:
        if (notificationCount["friend-request"] > 0)
          return notificationCount["friend-request"];
        else return undefined;
      case 2:
        if (notificationCount["friend-reject"] > 0)
          return notificationCount["friend-reject"];
        else return undefined;
      default:
        return undefined;
    }
  };

  return { getBadgeNotif };
};

export default useRelationNotificationNumber;
