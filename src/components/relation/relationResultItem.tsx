import { Avatar, Button } from "@mantine/core";
import { IUser } from "../../types/user";
import { toProfilUrl } from "../../utils/utils";
import { RelationType } from "./relationContainer";
import NavigationRoute from "../../NavigationRoute";
import { RelationStatusType } from "../../types/relation";
import { ActionInteractionType } from "../../lib/relation/useInteraction";

interface RelationResultItemProps {
  user: IUser;
  type: RelationType;
  idRelation?: string;
  relationStatus?: RelationStatusType;
  handleAction: (data: ActionInteractionType) => void;
}
const RelationResultItem: React.FC<RelationResultItemProps> = ({
  user,
  type,
  idRelation,
  relationStatus,
  handleAction,
}) => {
  return (
    <div
      className={`flex flex-row items-center p-2 px-3 w-full rounded-[16px]`}
    >
      <Avatar
        src={toProfilUrl(user._id, user.profilPicture)}
        size={70}
        className="mr-3"
      />
      <div className="flex flex-col w-full p-1">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <p className="font-[600]">
              {user.firstName} {user.lastName}
            </p>
            {/* <p>Adresse</p> */}
          </div>
          <div className="text-grey text-sm text-">
            {(type === NavigationRoute.SUGGESTIONS ||
              type === NavigationRoute.MY_REJECTED_REQUEST) && (
              <Button
                color="blueLigth"
                variant=""
                classNames={{ label: "font-[500]" }}
                onClick={() =>
                  handleAction({
                    data: {
                      action: "add-user",
                      idUser: user._id,
                    },
                  })
                }
              >
                Ajouter ami(e)
              </Button>
            )}
            {type === NavigationRoute.FRINEDS && (
              <Button
                color="#676279"
                variant=""
                classNames={{ label: "font-[500]" }}
                onClick={() =>
                  handleAction({
                    data: {
                      action: "to-message",
                      idUser: user._id,
                    },
                  })
                }
              >
                Messages
              </Button>
            )}
            {type === NavigationRoute.REQUEST && (
              <>
                <Button
                  color="blueLigth"
                  variant=""
                  className="mr-4"
                  classNames={{ label: "font-[500]" }}
                  onClick={() =>
                    idRelation &&
                    handleAction({
                      data: {
                        action: "reply",
                        data: {
                          idRelation,
                          status: "accepted",
                        },
                      },
                    })
                  }
                >
                  Accepter
                </Button>
                <Button
                  color="red"
                  variant="outline"
                  classNames={{ label: "font-[500]" }}
                  onClick={() =>
                    idRelation &&
                    handleAction({
                      data: {
                        action: "reply",
                        data: {
                          idRelation,
                          status: "rejected",
                        },
                      },
                    })
                  }
                >
                  Rejeter
                </Button>
              </>
            )}
            {type === NavigationRoute.MY_REQUEST && (
              <>
                {relationStatus && relationStatus === "rejected" && (
                  <>
                    <Button
                      color="blueLigth"
                      variant=""
                      className="mr-4"
                      classNames={{ label: "font-[500]" }}
                      onClick={() =>idRelation && handleAction({
                        data: { action: "resend-request", idRelation },
                      })}
                    >
                      Renvoyer
                    </Button>
                    <Button
                      color="#676279"
                      variant=""
                      classNames={{ label: "font-[500]" }}
                      onClick={() =>
                        idRelation &&
                        handleAction({
                          data: { action: "delete-request", idRelation },
                        })
                      }
                    >
                      Supprimer
                    </Button>
                  </>
                )}
                {relationStatus && relationStatus === "pending" && (
                  <Button
                    color="#676279"
                    variant=""
                    classNames={{ label: "font-[500]" }}
                    onClick={() =>
                      idRelation &&
                      handleAction({
                        data: { action: "delete-request", idRelation },
                      })
                    }
                  >
                    Annuler
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelationResultItem;
