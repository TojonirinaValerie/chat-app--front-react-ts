import { useEffect, useState } from "react";
import { IUser } from "../../types/user";
import { useLocation } from "react-router-dom";
import { fetchMyFriendRequest } from "../../api/relations";
import { toast } from "react-toastify";
import NavigationRoute from "../../NavigationRoute";
import { useAppDispatch } from "../../redux/store";
import {
  setMyPendingRequest,
  setMyRejectedRequest,
} from "../../redux/slice/relation.slice";

export const useFetchMyFriendRequestApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const getMyFriendRequest = async () => {
    setIsLoading(true);
    try {
      const response = await fetchMyFriendRequest();
      const data: IUser[] = response.data.data;
      const usersPendingRequest: IUser[] = [];
      const usersRejectedRequest: IUser[] = [];
      data.forEach((user) => {
        const userRelation = user.relations;
        if (userRelation) {
          if (userRelation[0].status === "pending")
            usersPendingRequest.push(user);
          else if (userRelation[0].status === "rejected")
            usersRejectedRequest.push(user);
        }
      });
      dispatch(setMyPendingRequest(usersPendingRequest));
      dispatch(setMyRejectedRequest(usersRejectedRequest));
    } catch (e) {
      toast.error("Une erreur s'est produite");
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoadingMyFriendRequest: isLoading, getMyFriendRequest };
};
const useFetchMyFriendRequest = () => {
  const { getMyFriendRequest, isLoadingMyFriendRequest } =
    useFetchMyFriendRequestApi();
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname ===
      `${NavigationRoute.RELATION}${NavigationRoute.MY_REQUEST}`
    )
      getMyFriendRequest();
  }, [location.pathname]);

  return {
    isLoadingMyFriendRequest,
    getMyFriendRequest,
  };
};

export default useFetchMyFriendRequest;
