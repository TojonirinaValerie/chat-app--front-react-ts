import { Button, LoadingOverlay } from "@mantine/core";
import { IoCloseSharp, IoCloudUpload } from "react-icons/io5";
// import { RiCloseLine } from "react-icons/ri";
import useUploadPhoto from "../../lib/uploadPhoto";
import React from "react";

const UploadPhoto: React.FC = () => {
  const {
    handleClick,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileChange,
    handleRemoveFile,
    handleUpload,
    isLoading,
    file,
    image,
    dragging,
    inputFileRef,
  } = useUploadPhoto();
  return (
    <>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2, color: "#111" }}
      />
      <div className="h-full m-6 my-10">
        <header
          className={`flex flex-row justify-between items-center w-full `}
        >
          <h1 className="w-full text-white text-[2.2rem] text-center font-[600]">
            Upload photo de profil
          </h1>
        </header>
        <div>
          <section>
            <div className="flex flex-col items-center justify-center mt-4">
              <input
                id="file-input"
                type="file"
                ref={inputFileRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <h1 className="font-[600] w-[80%] text-center">
                Complétez votre profil en ajoutant une photo de profil
              </h1>
              {!file && (
                <div
                  className={`flex flex-col w-full mt-4 items-center justify-center py-8 px-4
                    border-[1px] border-dashed rounded-[10px] cursor-pointer
                    ${
                      dragging
                        ? "shadow-[#6b8afd] shadow-[0_0_5px_0px] border-[#6b8afd] text-[#6b8afd]"
                        : " border-grey "
                    }`}
                  onClick={handleClick}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <IoCloudUpload className="text-[6rem] text-greyDark" />
                  <p className="text-md font-[700] my-2">
                    Glissez-déposez le fichier image pour le télécharger
                  </p>
                  <Button
                    className="w-1/2 ml-2"
                    variant="outline"
                    color={`${!dragging ? "#a9aeba" : "#6b8afd"}`}
                  >
                    {/* <img src={FacebookIcon} className="w-[20px] mr-2" /> */}
                    <span
                      className={`font-[500] ${
                        dragging ? " text-[#6b8afd] " : "text-white"
                      } `}
                    >
                      Sélectionnez un fichier
                    </span>
                  </Button>
                </div>
              )}
            </div>
          </section>
          {image && (
            <section className="w-full flex flex-col items-center justify-center mt-4 rounded-sm overflow-hidden relative">
              <div
                className="bg-[#FFFFFF88] rounded-full absolute top-[6px] right-[6px] cursor-pointer text-black"
                onClick={handleRemoveFile}
              >
                <IoCloseSharp className="text-base m-2" />
              </div>
              <img
                src={image}
                className="object-cover w-full rounded-sm aspect-[4/3]"
              />
            </section>
          )}
          <div className="w-full flex flex-row justify-center items-center my-6">
            <Button
              className="w-full"
              color="#6b8afd"
              classNames={{ label: "font-[500] text-base py-8", root: "py-5" }}
              onClick={handleUpload}
              disabled={file === null}
            >
              Ajouter
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadPhoto;
