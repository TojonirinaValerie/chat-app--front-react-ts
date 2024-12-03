import { useEffect, useState } from "react";
import { fetchFriends } from "../../api/relations";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import NavigationRoute from "../../NavigationRoute";
import { useAppDispatch } from "../../redux/store";
import { setFriendsList } from "../../redux/slice/relation.slice";

export const useFetchFriendsApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const getFriends = async () => {
    setIsLoading(true);
    try {
      const response = await fetchFriends();
      dispatch(setFriendsList(response.data.data));
    } catch (e) {
      toast.error("Une erreur s'est produite");
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoadingFetchListFriend: isLoading, getFriends };
};

const useFetchFriends = () => {
  const { getFriends, isLoadingFetchListFriend } = useFetchFriendsApi();
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname ===
      `${NavigationRoute.RELATION}${NavigationRoute.FRINEDS}`
    )
      getFriends();
  }, [location.pathname]);

  return { isLoadingFetchListFriend, getFriends };
};

export default useFetchFriends;
