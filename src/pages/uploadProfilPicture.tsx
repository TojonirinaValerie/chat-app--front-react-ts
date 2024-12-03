import { Helmet } from "react-helmet";
import UploadPhoto from "../components/modals/uploadPhoto";

const UploadProfilPicture = () => {
  return (
    <div className="min-h-full flex flex-row items-center justify-center bg-bg-ligth">
      <Helmet>
        <title>Upload photo</title>
      </Helmet>
      <div className="bg-bg-dark rounded-[10px] w-[500px] flex flex-col relative">
        <UploadPhoto />
      </div>
    </div>
  );
};

export default UploadProfilPicture;
