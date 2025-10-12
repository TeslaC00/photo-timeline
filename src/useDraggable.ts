import React, { useRef } from "react";
import {
  DRAGGING_THRESHOLD,
  MAX_IMAGE_HEIGHT,
  MAX_IMAGE_WIDTH,
} from "./constant";

export const useDraggable = (
  worldRef: React.RefObject<HTMLDivElement | null>,
  isDraggingRef: React.RefObject<boolean>
) => {
  //#region Dragging Logic
  const coords = useRef({ startX: 0, startY: 0, lastX: 0, lastY: 0 });
  const mouseDown = useRef(false);

  const handleMouseUp = () => {
    mouseDown.current = false;
    if (worldRef.current) {
      coords.current.lastX = worldRef.current.offsetLeft;
      coords.current.lastY = worldRef.current.offsetTop;
      worldRef.current.style.cursor = "grab";
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!worldRef.current) return;
    e.preventDefault();

    mouseDown.current = true;
    isDraggingRef.current = false;

    coords.current.startX = e.clientX;
    coords.current.startY = e.clientY;

    worldRef.current!.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!mouseDown.current || !worldRef.current) return;

    const deltaX = e.clientX - coords.current.startX;
    const deltaY = e.clientY - coords.current.startY;

    if (
      Math.abs(deltaX) > DRAGGING_THRESHOLD ||
      Math.abs(deltaY) > DRAGGING_THRESHOLD
    ) {
      isDraggingRef.current = true;
    }

    const viewport = e.currentTarget as HTMLDivElement;
    const viewportRect = viewport.getBoundingClientRect();

    let newX = deltaX + coords.current.lastX;
    let newY = deltaY + coords.current.lastY;

    // Boundary calculations
    const ix = MAX_IMAGE_WIDTH * 0.5;
    const iy = MAX_IMAGE_HEIGHT * 0.5;
    const minX = viewportRect.width - worldRef.current.scrollWidth + ix;
    const minY = viewportRect.height - worldRef.current.scrollHeight + iy;

    newX = Math.min(Math.max(newX, minX), -ix);
    newY = Math.min(Math.max(newY, minY), -iy);

    if (minX < -ix) worldRef.current.style.left = `${newX}px`;
    if (minY < -iy) worldRef.current.style.top = `${newY}px`;
  };
  //#endregion
  return { handleMouseUp, handleMouseDown, handleMouseMove };
};
