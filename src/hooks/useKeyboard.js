import { useCallback, useEffect, useState } from "react";

const controls = {
  KeyW: "forward",
  KeyD: "right",
  KeyS: "backward",
  KeyA: "left",
  ArrowUp: "forward",
  ArrowRight: "right",
  ArrowDown: "backward",
  ArrowLeft: "left",
  Space: "jump",
};

export const useKeyboard = () => {
  const [active, setActive] = useState({
    forward: false,
    right: false,
    backward: false,
    left: false,
    jump: false,
  });

  const handleKeyDown = useCallback((e) => {
    const control = controls[e.code];
    if (control) {
      setActive((prevState) => ({ ...prevState, [control]: true }));
    }
  }, []);

  const handleKeyUp = useCallback((e) => {
    const control = controls[e.code];
    if (control) {
      setActive((prevState) => ({ ...prevState, [control]: false }));
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  });

  return active;
};
