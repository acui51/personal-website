import { useEffect } from "react";

const useBodyKeyPress = (callback, currBodyRaceChar) => {
  // Component for body key will just set the context
  useEffect(() => {
    if (!currBodyRaceChar) return;
    callback && callback(currBodyRaceChar);
  }, [currBodyRaceChar]);
};

export default useBodyKeyPress;
