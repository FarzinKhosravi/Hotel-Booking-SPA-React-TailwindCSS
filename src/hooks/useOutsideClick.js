import { useEffect } from "react";

export default function useOutsideClick(ref, exceptionId, callback) {
  useEffect(() => {
    function outsideClickHandler(e) {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        e.target.id !== exceptionId
      ) {
        callback();
      }
    }

    document.addEventListener("mousedown", outsideClickHandler);

    return () => {
      document.removeEventListener("mousedown", outsideClickHandler);
    };
  }, [ref, callback]);
}
