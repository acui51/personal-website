import { useEffect } from "react";

const useBodyKeyPress = (callback, currBodyRaceChar) => {
  // Component for body key will just set the context
  useEffect(() => {
    callback && callback(currBodyRaceChar);
  }, [currBodyRaceChar]);
};

export default useBodyKeyPress;
