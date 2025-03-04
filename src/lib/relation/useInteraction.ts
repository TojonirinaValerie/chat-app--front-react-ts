import { useNavigate } from "react-router-dom";
import NavigationRoute from "../../NavigationRoute";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
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
  const [idLoading, setIdLoading] = useState<string[]>([]);
  const { getNotificationCount } = useNotificationCount();

  const { getSuggestions } = useFetchSuggestionsApi();
  const { getFriendRequest } = useFetchFriendRequestApi();
  const { getMyFriendRequest } = useFetchMyFriendRequestApi();
  const navigate = useNavigate();

  // Click message
  const handlClickMessage = (id: string) => {
    navigate(`${NavigationRoute.CHAT}/${id}`);
  };

  // click sur ajouter amie
  const handleAddUser = async (id: string) => {
    try {
      await sendFriendRequest(id);
      await getSuggestions();
    } catch (e) {
      toast.error("Une erreur s'est produite");
      console.log(e);
    }
  };

  // click sur accepter ou rejeter
  const handleReplyFriendRequest = async (
    idRelation: string,
    status: RelationStatusType
  ) => {
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
      const refresh = async () => {
        await getNotificationCount();
        await getFriendRequest();
      };
      await refresh();
    }
  };

  // click sur supprime ou cancel
  const handleDeleteRequest = async (idRelation: string) => {
    try {
      await deleteRequest(idRelation);
    } catch (e) {
      toast.error("Une erreur s'est produite");
      console.log(e);
    } finally {
      const refresh = async () => {
        await getNotificationCount();
        if (getMyFriendRequest) await getMyFriendRequest();
      };
      await refresh();
    }
  };

  // click renvoyer
  const handleResendRequest = async (idRelation: string) => {
    try {
      await resendRequest(idRelation);
    } catch (e) {
      toast.error("Une erreur s'est produite");
      console.log(e);
    } finally {
      const refresh = async () => {
        await getNotificationCount();
        if (getMyFriendRequest) await getMyFriendRequest();
      };
      await refresh();
    }
  };


  const addInLoading = (id: string) => {
    const listLoading = [...idLoading];

    if (listLoading.find((value) => value === id)) {
      return;
    }
    listLoading.push(id);

    setIdLoading(listLoading);
  };

  const removeInLoading = (id: string) => {
    let listLoading = [...idLoading];
    listLoading = listLoading.filter((value) => value !== id);

    setIdLoading(listLoading);
  };

  const handleAction = async ({ data }: ActionInteractionType) => {
    switch (data.action) {
      case "add-user":
        addInLoading(data.idUser);
        await handleAddUser(data.idUser);
        removeInLoading(data.idUser);
        break;
      case "to-message":
        addInLoading(data.idUser);
        await handlClickMessage(data.idUser);
        removeInLoading(data.idUser);
        break;
      case "reply":
        addInLoading(data.data.idRelation);
        await handleReplyFriendRequest(data.data.idRelation, data.data.status);
        removeInLoading(data.data.idRelation);
        break;
      case "delete-request":
        addInLoading(data.idRelation);
        await handleDeleteRequest(data.idRelation);
        removeInLoading(data.idRelation);
        break;
      case "resend-request":
        addInLoading(data.idRelation);
        await handleResendRequest(data.idRelation);
        removeInLoading(data.idRelation);
        break;
      default:
        break;
    }
  };

  return {
    handleAction,
    idLoading,
  };
};

export default useInteraction;
