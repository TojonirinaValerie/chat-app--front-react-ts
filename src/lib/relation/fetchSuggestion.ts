import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchSuggestions } from "../../api/relations";
import NavigationRoute from "../../NavigationRoute";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { setSuggestion } from "../../redux/slice/relation.slice";

export const useFetchSuggestionsApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const getSuggestions = async () => {
    setIsLoading(true);
    try {
      const response = await fetchSuggestions();
      dispatch(setSuggestion(response.data.data));
    } catch (e) {
      toast.error("Une erreur s'est produite");
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return { getSuggestions, isLoadingSuggestion: isLoading };
};

const useFetchSuggestions = () => {
  const location = useLocation();
  const { getSuggestions, isLoadingSuggestion } = useFetchSuggestionsApi();

  useEffect(() => {
    if (
      location.pathname ===
      `${NavigationRoute.RELATION}${NavigationRoute.SUGGESTIONS}`
    )
      getSuggestions();
  }, [location.pathname]);

  return { isLoadingSuggestion, getSuggestions };
};

export default useFetchSuggestions;
