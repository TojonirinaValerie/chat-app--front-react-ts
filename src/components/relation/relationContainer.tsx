import { Loader, ScrollArea } from "@mantine/core";
import NavigationRoute from "../../NavigationRoute";
import useRelationTitle from "../../lib/relation/getRelationTitle";
import RelationResultItem from "./relationResultItem";
import useFetchFriendRequest from "../../lib/relation/fetchFriendRequest";
import useFetchFriends from "../../lib/relation/fetchFriends";
import useInteraction from "../../lib/relation/useInteraction";
import useFetchMyFriendRequest from "../../lib/relation/fetchMyFriendRequest";
import { useAppSelector } from "../../redux/store";
import useFetchSuggestions from "../../lib/relation/fetchSuggestion";
import { Link } from "react-router-dom";
import { RiArrowGoBackLine } from "react-icons/ri";

export type RelationType =
  | NavigationRoute.FRINEDS
  | NavigationRoute.SUGGESTIONS
  | NavigationRoute.REQUEST
  | NavigationRoute.MY_REQUEST
  | NavigationRoute.MY_REJECTED_REQUEST;
interface RelationContainerProps {
  type: RelationType;
}
const RelationContainer: React.FC<RelationContainerProps> = ({ type }) => {
  const { title } = useRelationTitle(type);
  const {
    receiveRequest,
    suggestions,
    myPendingRequest,
    myRejectedRequest,
    friends,
  } = useAppSelector((state) => state.relation);

  // --------------------Fetch les données---------------------------------------
  const { isLoadingSuggestion } = useFetchSuggestions();
  const { isLoadingFetchFriendRequest } = useFetchFriendRequest();
  const { isLoadingMyFriendRequest } = useFetchMyFriendRequest();
  const { isLoadingFetchListFriend } = useFetchFriends();
  // ----------------------------------------------------------------------------

  // ---------Pour l'interaction avec les bouton---------
  const { handleAction, idLoading } = useInteraction();
  // ----------------------------------------------------

  return (
    <div className="flex flex-col justify-between w-full h-full pl-4">
      <div className="flex flex-row items-center">
        <Link to={NavigationRoute.RELATION} className="lg:hidden">
          <RiArrowGoBackLine className="mx-3 cursor-pointer hover:text-white min-w-[25px]" />
        </Link>
        <h1 className="text-[1.4rem]">{title}</h1>
      </div>
      <ScrollArea
        scrollbars="y"
        className="w-full h-full mt-4 pr-6"
        classNames={{
          scrollbar: "bg-blue-bg hover:bg-blue-bg text-blue-ligth",
        }}
      >
        {type === NavigationRoute.FRINEDS && (
          <>
            {isLoadingFetchListFriend ? (
              <div className="flex flex-col items-center justify-center w-full h-full mt-[30vh]">
                <Loader size="lg" />
              </div>
            ) : friends.length === 0 ? (
              <div className="flex flex-col items-center justify-center w-full h-full mt-[30vh] text-lg">
                Vous n'avez aucun ami(e) pour l'instant☹️
              </div>
            ) : (
              friends.map((friend, index) => (
                <RelationResultItem
                  user={friend}
                  type={type}
                  key={`relation-${friend._id}-${index}`}
                  handleAction={handleAction}
                  loading={idLoading.includes(friend._id)}
                />
              ))
            )}
          </>
        )}
        {type === NavigationRoute.SUGGESTIONS && (
          <>
            {isLoadingSuggestion ? (
              <div className="flex flex-col items-center justify-center w-full h-full mt-[30vh]">
                <Loader size="lg" />
              </div>
            ) : suggestions.length === 0 ? (
              <div className="flex flex-col items-center justify-center w-full h-full mt-[30vh] text-lg">
                Aucun suggestion trouver☹️
              </div>
            ) : (
              suggestions.map((suggestion, index) => (
                <RelationResultItem
                  type={type}
                  user={suggestion}
                  key={`relation-${suggestion._id}-${index}`}
                  handleAction={handleAction}
                  loading={idLoading.includes(suggestion._id)}
                />
              ))
            )}
          </>
        )}

        {type === NavigationRoute.REQUEST && (
          <>
            {isLoadingFetchFriendRequest ? (
              <div className="flex flex-col items-center justify-center w-full h-full mt-[30vh]">
                <Loader size="lg" />
              </div>
            ) : receiveRequest.length === 0 ? (
              <div className="flex flex-col items-center justify-center w-full h-full mt-[30vh] text-lg">
                Vous n'avez reçu aucune demande d'ami(e)☹️
              </div>
            ) : (
              receiveRequest.map((request, index) => {
                const relation = request.relations;
                return (
                  <RelationResultItem
                    idRelation={relation && relation[0]._id}
                    type={type}
                    user={request}
                    key={`relation-${request}-${index}`}
                    handleAction={handleAction}
                    loading={
                      relation ? idLoading.includes(relation[0]._id) : false
                    }
                  />
                );
              })
            )}
          </>
        )}
        {type === NavigationRoute.MY_REQUEST && (
          <div>
            <h2>Liste de votre demande</h2>
            <div>
              {isLoadingMyFriendRequest ? (
                <div className="flex flex-col items-center justify-center w-full h-full mt-[30vh]">
                  <Loader size="lg" />
                </div>
              ) : myPendingRequest.length === 0 ? (
                <div className="flex flex-col items-center justify-center w-full h-full my-[20px] text-lg">
                  Les demandes que vous avez envoyer se trouvent içi.
                </div>
              ) : (
                myPendingRequest.map((request, index) => {
                  const relation = request.relations;
                  return (
                    <RelationResultItem
                      idRelation={relation && relation[0]._id}
                      type={type}
                      user={request}
                      key={`relation-${request}-${index}`}
                      handleAction={handleAction}
                      relationStatus={relation && relation[0].status}
                      loading={
                        relation ? idLoading.includes(relation[0]._id) : false
                      }
                    />
                  );
                })
              )}
            </div>
            <h2>Les demandes rejetés</h2>
            <div>
              {isLoadingMyFriendRequest ? (
                <div className="flex flex-col items-center justify-center w-full h-full mt-[30vh]">
                  <Loader size="lg" />
                </div>
              ) : myRejectedRequest.length === 0 ? (
                <div className="flex flex-col items-center justify-center w-full h-full my-[20px] text-lg">
                  Les demandes rejetés se trouvent içi.
                </div>
              ) : (
                myRejectedRequest.map((request, index) => {
                  const relation = request.relations;
                  return (
                    <RelationResultItem
                      idRelation={relation && relation[0]._id}
                      type={type}
                      user={request}
                      key={`relation-${request}-${index}`}
                      handleAction={handleAction}
                      relationStatus={relation && relation[0].status}
                      loading={
                        relation ? idLoading.includes(relation[0]._id) : false
                      }
                    />
                  );
                })
              )}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default RelationContainer;
