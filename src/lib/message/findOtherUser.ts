import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { IUser } from "../../types/user";
import { setLoadingOtherUserInMessage } from "../../redux/slice/loading.slice";
import { getUserById } from "../../api/user";
import { toast } from "react-toastify";
import NavigationRoute from "../../NavigationRoute";
import { useEffect } from "react";

interface useFindOtherUserParams {
  setOtherUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  setIndexOtherUser: React.Dispatch<React.SetStateAction<number | null>>;
}
const useFindOtherUser = ({
  setOtherUser,
  setIndexOtherUser: setIndexOtheruser,
}: useFindOtherUserParams) => {
  const { id } = useParams();
  const appDispatch = useAppDispatch();
  const discussions = useAppSelector((state) => state.message);
  const loading = useAppSelector((state) => state.loading);
  const navigate = useNavigate();

  const findUser = async () => {
    if (id) {
      const index = discussions.findIndex(
        (discussion) => id === discussion.otherUser._id
      );
      if (index !== -1) {
        setOtherUser(discussions[index].otherUser);
        setIndexOtheruser(index);
      } else {
        await fetchOtherUser(id);
        setIndexOtheruser(null);
      }
    }
  };

  const fetchOtherUser = async (idUser: string) => {
    appDispatch(setLoadingOtherUserInMessage(true));
    try {
      const response = await getUserById(idUser);
      setOtherUser(response.data.data);
    } catch (e) {
      toast.error("Utilisateur non trouvé");
      navigate(NavigationRoute.CHAT);
      console.log(e);
    } finally {
      appDispatch(setLoadingOtherUserInMessage(false));
    }
  };

  useEffect(() => {
    if (loading.isDiscussionLoaded) findUser();
  }, [id, discussions, loading.isDiscussionLoaded]);
};

export default useFindOtherUser;
