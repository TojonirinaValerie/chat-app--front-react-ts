import { useAppSelector } from "../../redux/store";
import useGetUnreadMessageLength from "../message/getUnreadMessageLength";

const useMenuNotifNumbner = () => {
  const { unreadConversation } = useGetUnreadMessageLength();
  const notificationCount = useAppSelector(
    (state) => state.notification.notificationCounts
  );

  const getBadgeNotif = (index: number): number | undefined => {
    const count: number =
      notificationCount["friend-reject"] + notificationCount["friend-request"];

    switch (index) {
      case 0:
        if (unreadConversation > 0) return unreadConversation;
        else return undefined;
      case 1:
        if (count > 0) return count;
        else return undefined;
      default:
        return undefined;
    }
  };

  return { getBadgeNotif };
};

export default useMenuNotifNumbner;
