import { useEffect } from "react";
import {
  setIsDiscussionLoaded,
  setLoadingDiscussions,
} from "../../redux/slice/loading.slice";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../redux/store";
import { fetchDiscussions } from "../../api/message";
import { setListDiscussion } from "../../redux/slice/message.slice";

const useFetchDiscussion = () => {
  const appDispatch = useAppDispatch();

  const getDiscussions = async () => {
    appDispatch(setLoadingDiscussions(true));
    try {
      const response = await fetchDiscussions();
      appDispatch(setListDiscussion(response.data.data));
      appDispatch(setIsDiscussionLoaded(true));
    } catch (e) {
      toast.error("Impossible de charger votre message");
      console.log(e);
    } finally {
      appDispatch(setLoadingDiscussions(false));
    }
  };

  useEffect(() => {
    getDiscussions();
  }, []);
};

export default useFetchDiscussion;
