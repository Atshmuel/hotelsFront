import { useEffect, useRef } from "react";

export default function useOutsideClick(handler, listnerCapturing = true) {
  const ref = useRef();
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }
    document.addEventListener("click", handleClick, listnerCapturing); //handling bubbeling down and not up (using listnerCapturing)
    return () =>
      document.removeEventListener("click", handleClick, listnerCapturing);
  }, [handler, listnerCapturing]);
  return ref;
}
