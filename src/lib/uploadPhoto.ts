import { useRef, useState } from "react";
import { uploadImageProfil } from "../api/user";
import NavigationRoute from "../NavigationRoute";
import { toast } from "react-toastify";
import { localStorageKey } from "../utils/constant";

const useUploadPhoto = () => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click(); // Simule le clic sur l'input file
    }
  };
  // Fonction pour gérer le survol (drag) d'un fichier sur la zone
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true); // Affiche visuellement que l'on est en train de glisser un fichier
  };

  // Fonction pour gérer l'entrée dans la zone de drop
  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  // Fonction pour gérer la sortie de la zone de drop
  const handleDragLeave = () => {
    setDragging(false);
  };

  // Fonction pour gérer le dépôt (drop) d'un fichier
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);

    // Récupère les fichiers déposés
    const droppedFiles = event.dataTransfer.files;

    if (droppedFiles && droppedFiles.length > 0) {
      setFile(droppedFiles[0]); // Enregistre le fichier dans le state
      console.log("Fichier déposé:", droppedFiles[0]);
      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result as string;
        setImage(dataURL);
      };
      reader.readAsDataURL(droppedFiles[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result as string;
        setImage(dataURL);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveFile = () => {
    setImage(null);
    setFile(null);
  };

  const handleUpload = async () => {
    if (file) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await uploadImageProfil(formData);

        localStorage.setItem(
          localStorageKey.accessToken,
          response.data.data.accessToken
        );
        localStorage.setItem(
          localStorageKey.refreshToken,
          response.data.data.refreshToken
        );
        location.href = NavigationRoute.CHAT;
      } catch (error) {
        console.error("Erreur lors du téléchargement de l'image:", error);
        toast.error("Erreur lors du téléchargement de l'image.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    inputFileRef,
    isLoading,
    image,
    file,
    dragging,
    handleClick,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleRemoveFile,
    handleUpload,
    handleFileChange,
  };
};

export default useUploadPhoto;
