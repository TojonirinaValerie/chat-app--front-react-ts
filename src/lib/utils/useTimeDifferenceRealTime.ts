import { useEffect, useState } from "react";
import { getTimeDifference } from "../../utils/date";

const useTimeDifferenceRealTime = (time: string) => {
  const [timeDifference, setTimeDifference] = useState(getTimeDifference(time));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDifference(getTimeDifference(time));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return { timeDifference };
};

export default useTimeDifferenceRealTime;
