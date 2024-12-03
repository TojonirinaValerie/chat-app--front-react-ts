import { useEffect, useState } from "react";
import { RelationType } from "../../components/relation/relationContainer";
import NavigationRoute from "../../NavigationRoute";

const useRelationTitle = (type: RelationType) => {
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    switch (type) {
      case NavigationRoute.FRINEDS:
        setTitle("Liste d' ami(e)s");
        break;
      case NavigationRoute.SUGGESTIONS:
        setTitle("Suggestions");
        break;
      case NavigationRoute.MY_REQUEST:
        setTitle("Votre demande");
        break;
      case NavigationRoute.REQUEST:
        setTitle("Invitations");
        break;
    }
  }, [type]);

  return { title };
};

export default useRelationTitle;
