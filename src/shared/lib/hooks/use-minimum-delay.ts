import { useState, useEffect, useCallback } from "react";

export const useDelayedAction = (action: () => void, delayMs = 1000) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;

    const timer = setTimeout(() => {
      action();
      setActive(false);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [active, action, delayMs]);

  const start = useCallback(() => {
    setActive(true);
  }, []);

  return { 
    send: () => start(), 
    loading: active 
  };
}
