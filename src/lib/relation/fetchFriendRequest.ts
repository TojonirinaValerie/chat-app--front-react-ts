import { useEffect, useState } from "react";
import { fetchFriendRequest } from "../../api/relations";
import { toast } from "react-toastify";
import NavigationRoute from "../../NavigationRoute";
import { useLocation } from "react-router-dom";
import socket from "../../context/socket";
import { useAppDispatch } from "../../redux/store";
import { setReceiverRequest } from "../../redux/slice/relation.slice";

export const useFetchFriendRequestApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const getFriendRequest = async () => {
    setIsLoading(true);
    try {
      const response = await fetchFriendRequest();
      dispatch(setReceiverRequest(response.data.data));
    } catch (e) {
      toast.error("Une erreur s'est produite");
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoadingFetchFriendRequest: isLoading, getFriendRequest };
};

const useFetchFriendRequest = () => {
  const location = useLocation();
  const { isLoadingFetchFriendRequest, getFriendRequest } =
    useFetchFriendRequestApi();

  useEffect(() => {
    if (
      location.pathname ===
      `${NavigationRoute.RELATION}${NavigationRoute.REQUEST}`
    )
      getFriendRequest();
  }, [location.pathname]);

  useEffect(() => {
    socket.on("receive-friend-request", () => {
      getFriendRequest();
    });

    return () => {
      socket.off("receive-friend-request");
    };
  }, []);

  return { isLoadingFetchFriendRequest, getFriendRequest };
};

export default useFetchFriendRequest;
