import { useEffect } from "react";
import socket from "../../context/socket";
import { useAppDispatch } from "../../redux/store";
import { setOnTyping } from "../../redux/slice/message.slice";
import { useLocation } from "react-router-dom";

const useOnTyping = (
  audioRef: React.MutableRefObject<HTMLAudioElement | null>
) => {
  const appDispatch = useAppDispatch();
  const location = useLocation();
  useEffect(() => {
    socket.on("on-typing", (data: { otherUser: string; isTyping: boolean }) => {
      const { otherUser, isTyping } = data;
      appDispatch(setOnTyping({ idUser: otherUser, value: isTyping }));
      // if (audioRef.current && location.pathname.includes(data.otherUser)) {
      //   if (isTyping) {
      //     audioRef.current.play();
      //   } else {
      //     audioRef.current.pause();
      //     audioRef.current.currentTime = 0;
      //   }
      // }
    });

    return () => {
      socket.off("on-typing");
    };
  }, []);
};

export default useOnTyping;
