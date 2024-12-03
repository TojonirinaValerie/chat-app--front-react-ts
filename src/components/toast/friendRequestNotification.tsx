import { Avatar, Button, LoadingOverlay } from "@mantine/core";
import { INotification } from "../../types/notification";
import { toProfilUrl } from "../../utils/utils";
import { IUser } from "../../types/user";
import { IRelation, RelationStatusType } from "../../types/relation";
import useTimeDifferenceRealTime from "../../lib/utils/useTimeDifferenceRealTime";
import { useFetchFriendRequestApi } from "../../lib/relation/fetchFriendRequest";
import useInteraction from "../../lib/relation/useInteraction";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationRoute from "../../NavigationRoute";

interface FriendRequestNotificationProps {
  user: IUser;
  relation: IRelation;
  notification: INotification;
  closeToast: () => void;
}
const FriendRequestNotification: React.FC<FriendRequestNotificationProps> = ({
  user,
  relation,
  notification,
  closeToast,
}) => {
  const { timeDifference } = useTimeDifferenceRealTime(
    new Date(notification.createdAt).toString()
  );
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { getFriendRequest } = useFetchFriendRequestApi();
  const { handleAction } = useInteraction({ getFriendRequest });

  const handleReply = async (
    idRelation: string,
    status: RelationStatusType
  ) => {
    setLoading(true);
    await handleAction({
      data: { action: "reply", data: { idRelation, status } },
    });
    setLoading(false);
    closeToast();
  };

  const handleSeeRejectedRequest = () => {
    navigate(`${NavigationRoute.RELATION}${NavigationRoute.MY_REQUEST}`);
    closeToast();
  };

  return (
    <div className="flex flex-col">
      <LoadingOverlay visible={loading} />
      {notification.type === "friend-request" && (
        <>
          <div className="flex flex-row items-start">
            <div>
              <Avatar
                src={toProfilUrl(user._id, user.profilPicture)}
                size={60}
              />
            </div>
            <div className="flex flex-col ml-2">
              <p className="text-md">
                <span className="font-bold">
                  {user.firstName} {user.lastName}
                </span>{" "}
                vous a envoyé une demande
              </p>
              <p className="text-sm">{timeDifference}</p>
            </div>
          </div>
          <div className="flex flex-row items-end justify-end mt-2">
            <Button
              classNames={{ label: "text-xs p-0 m-0" }}
              className="mr-2"
              radius={100}
              onClick={() => handleReply(relation._id, "accepted")}
            >
              Accepter
            </Button>
            <Button
              classNames={{ label: "text-xs p-0 m-0" }}
              variant="outline"
              color="red"
              radius={100}
              onClick={() => handleReply(relation._id, "rejected")}
            >
              Rejeter
            </Button>
          </div>
        </>
      )}
      {notification.type === "friend-reject" && (
        <>
          <div className="flex flex-row items-start">
            <div>
              <Avatar
                src={toProfilUrl(user._id, user.profilPicture)}
                size={60}
              />
            </div>
            <div className="flex flex-col ml-2">
              <p className="text-md">
                <span className="font-bold">
                  {user.firstName} {user.lastName}
                </span>{" "}
                a rejeté(e) votre demande
              </p>
              <p className="text-sm">{timeDifference}</p>
            </div>
          </div>
          <div className="flex flex-row items-end justify-end mt-2">
            <Button
              classNames={{ label: "text-xs p-0 m-0" }}
              className="mr-2"
              radius={100}
              onClick={handleSeeRejectedRequest}
            >
              Voir les demandes rejetés
            </Button>
          </div>
        </>
      )}
      {notification.type === "friend-accept" && (
        <>
          <div className="flex flex-row items-start">
            <div>
              <Avatar
                src={toProfilUrl(user._id, user.profilPicture)}
                size={60}
              />
            </div>
            <div className="flex flex-col ml-2">
              <p className="text-md">
                <span className="font-bold">
                  {user.firstName} {user.lastName}
                </span>{" "}
                a accepté votre demande
              </p>
              <p className="text-sm">{timeDifference}</p>
            </div>
          </div>
          <div className="flex flex-row items-end justify-end mt-2">
            <Button
              classNames={{ label: "text-xs p-0 m-0" }}
              className="mr-2"
              radius={100}
              onClick={() => {
                handleAction({
                  data: { action: "to-message", idUser: user._id },
                });
                closeToast();
              }}
            >
              Envoyer un message
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default FriendRequestNotification;
