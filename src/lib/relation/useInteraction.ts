import { useNavigate } from "react-router-dom";
import NavigationRoute from "../../NavigationRoute";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  deleteRequest,
  replyFriendRequest,
  resendRequest,
  sendFriendRequest,
} from "../../api/relations";
import { RelationStatusType } from "../../types/relation";
import { useNotificationCount } from "../notification/fetchNotificationCount";
import { useFetchSuggestionsApi } from "./fetchSuggestion";
import { useFetchFriendRequestApi } from "./fetchFriendRequest";
import { useFetchMyFriendRequestApi } from "./fetchMyFriendRequest";

export interface ActionInteractionType {
  data:
    | {
        action: "add-user" | "to-message";
        idUser: string;
      }
    | {
        action: "delete-request" | "resend-request";
        idRelation: string;
      }
    | {
        action: "reply";
        data: {
          idRelation: string;
          status: RelationStatusType;
        };
      };
}

const useInteraction = () => {
  const { getNotificationCount } = useNotificationCount();

  const { getSuggestions } = useFetchSuggestionsApi();
  const { getFriendRequest } = useFetchFriendRequestApi();
  const { getMyFriendRequest } = useFetchMyFriendRequestApi();
  const navigate = useNavigate();

  // Click message
  const handlClickMessage = (id: string) => {
    navigate(`${NavigationRoute.CHAT}/${id}`);
  };
  const [isLoading, setIsLoading] = useState(false);

  // click sur ajouter amie
  const handleAddUser = async (id: string) => {
    setIsLoading(true);
    try {
      await sendFriendRequest(id);
      getSuggestions();
    } catch (e) {
      toast.error("Une erreur s'est produite");
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  // click sur accepter ou rejeter
  const handleReplyFriendRequest = async (
    idRelation: string,
    status: RelationStatusType
  ) => {
    setIsLoading(true);
    try {
      await replyFriendRequest(idRelation, status);
    } catch (e: any) {
      if (e.response.data.message) {
        toast.error(e.response.data.message);
        return;
      }
      toast.error("Une erreur s'est produite");
      console.log(e);
    } finally {
      setIsLoading(false);
      getNotificationCount();
      getFriendRequest();
    }
  };

  // click sur supprime ou cancel
  const handleDeleteRequest = async (idRelation: string) => {
    setIsLoading(true);
    try {
      await deleteRequest(idRelation);
    } catch (e) {
      toast.error("Une erreur s'est produite");
      console.log(e);
    } finally {
      setIsLoading(false);
      getNotificationCount();
      if (getMyFriendRequest) getMyFriendRequest();
    }
  };

  // click renvoyer
  const handleResendRequest = async (idRelation: string) => {
    setIsLoading(true);
    try {
      await resendRequest(idRelation);
    } catch (e) {
      toast.error("Une erreur s'est produite");
      console.log(e);
    } finally {
      setIsLoading(false);
      getNotificationCount();
      if (getMyFriendRequest) getMyFriendRequest();
    }
  };

  const handleAction = ({ data }: ActionInteractionType) => {
    switch (data.action) {
      case "add-user":
        handleAddUser(data.idUser);
        break;
      case "to-message":
        handlClickMessage(data.idUser);
        break;
      case "reply":
        handleReplyFriendRequest(data.data.idRelation, data.data.status);
        break;
      case "delete-request":
        handleDeleteRequest(data.idRelation);
        break;
      case "resend-request":
        handleResendRequest(data.idRelation);
        break;
      default:
        break;
    }
  };
  return {
    handleAction,
    loadingSendFriendRequest: isLoading,
  };
};

export default useInteraction;
