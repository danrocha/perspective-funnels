import { useState, useCallback, useEffect, MutableRefObject } from "react";

export const useDragScroll = (
  nodeRef: MutableRefObject<null | HTMLElement>,
) => {
  const [node, setNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (nodeRef.current) {
      setNode(nodeRef.current);
    }
  }, [nodeRef, setNode]);

  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
      if (!node) {
        return;
      }
      const startPosition = {
        left: node.scrollLeft,
        top: node.scrollTop,
        x: event.clientX,
        y: event.clientY,
      };

      function handleMouseMove(event: MouseEvent) {
        if (!node) return;
        const dx = event.clientX - startPosition.x;
        const dy = event.clientY - startPosition.y;
        node.scrollTop = startPosition.top - dy;
        node.scrollLeft = startPosition.left - dx;
        updateCursor(node);
      }

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        resetCursor(node);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [node],
  );

  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      if (!node) {
        return;
      }
      const touch = event.touches[0];
      const startPosition = {
        left: node.scrollLeft,
        top: node.scrollTop,
        x: touch.clientX,
        y: touch.clientY,
      };

      const handleTouchMove = (event: TouchEvent) => {
        const touch = event.touches[0];
        const dx = touch.clientX - startPosition.x;
        const dy = touch.clientY - startPosition.y;
        node.scrollTop = startPosition.top - dy;
        node.scrollLeft = startPosition.left - dx;
        updateCursor(node);
      };

      const handleTouchEnd = () => {
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
        resetCursor(node);
      };

      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    },
    [node],
  );

  const updateCursor = (element: HTMLElement) => {
    element.classList.add("grabbing-cursor");
    element.style.userSelect = "none";
  };

  const resetCursor = (element: HTMLElement) => {
    element.classList.remove("grabbing-cursor");
    element.classList.add("grab-cursor");
    element.style.removeProperty("user-select");
  };

  useEffect(() => {
    if (!node) {
      return;
    }
    node.addEventListener("mousedown", handleMouseDown);
    node.addEventListener("touchstart", handleTouchStart);
    return () => {
      node.removeEventListener("mousedown", handleMouseDown);
      node.removeEventListener("touchstart", handleTouchStart);
    };
  }, [node, handleMouseDown, handleTouchStart]);
};
