import { useEffect, useState } from "react";
import { fetchNotification } from "../../api/notification";
import { useAppDispatch } from "../../redux/store";
import { setNotificationCount } from "../../redux/slice/notification.slice";

export const useNotificationCount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const getNotificationCount = async () => {
    setIsLoading(true);
    try {
      const response = await fetchNotification();
      dispatch(setNotificationCount(response.data.data));
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, getNotificationCount };
};

const useFetchNotificationCount = () => {
  const { getNotificationCount } = useNotificationCount();
  useEffect(() => {
    getNotificationCount();
  }, []);
};

export default useFetchNotificationCount;
