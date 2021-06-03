import { useState, useEffect } from "react";

const useToggle = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  useEffect(() => {
    console.log(isShowing);
  }, [isShowing]);

  return {
    isShowing,
    toggle,
  };
};

export default useToggle;
