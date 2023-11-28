import { useState, useEffect } from "react";

export const useDebounce = <T>(val: T, delay: number) => {
  const [debounceVal, setDebounceVal] = useState(val);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceVal(val);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [val]);

  return debounceVal;
};
