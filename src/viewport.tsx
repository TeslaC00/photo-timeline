import React, { useRef, useState } from "react";
import World from "./world";
import Timeline from "./timeline";
import { MAX_IMAGE_HEIGHT, MAX_IMAGE_WIDTH } from "./constant";

export default function Viewport() {
  //#region Dragging Logic
  const coords = useRef({ startX: 0, startY: 0, lastX: 0, lastY: 0 });
  const mouseDown = useRef(false);
  const wordlRef = useRef<HTMLDivElement | null>(null);

  const handleMouseUp = () => {
    mouseDown.current = false;
    if (wordlRef.current) {
      coords.current.lastX = wordlRef.current.offsetLeft;
      coords.current.lastY = wordlRef.current.offsetTop;
      wordlRef.current.style.cursor = "grab";
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    mouseDown.current = true;
    coords.current.startX = e.clientX;
    coords.current.startY = e.clientY;

    wordlRef.current!.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!mouseDown.current || !wordlRef.current) return;

    const viewport = e.currentTarget as HTMLDivElement;
    const viewportRect = viewport.getBoundingClientRect();

    let newX = e.clientX - coords.current.startX + coords.current.lastX;
    let newY = e.clientY - coords.current.startY + coords.current.lastY;

    const ix = MAX_IMAGE_WIDTH * 0.5;
    const iy = MAX_IMAGE_HEIGHT * 0.5;

    const minX = viewportRect.width - wordlRef.current.scrollWidth + ix;
    const minY = viewportRect.height - wordlRef.current.scrollHeight + iy;

    newX = Math.min(Math.max(newX, minX), -ix);
    newY = Math.min(Math.max(newY, minY), -iy);

    if (minX < -ix) wordlRef.current.style.left = `${newX}px`;
    if (minY < -iy) wordlRef.current.style.top = `${newY}px`;
  };
  //#endregion

  //#region Timeline Modal
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [timelineImagePath, setTimelineImagePath] = useState("");

  //#endregion

  return (
    <div
      id="viewport"
      className="overflow-hidden h-screen w-screen relative"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <World
        ref={wordlRef}
        changeTimelineImagePath={setTimelineImagePath}
        openTimeline={() => setIsTimelineOpen(true)}
        onMouseDown={handleMouseDown}
      />
      <Timeline
        isOpen={isTimelineOpen}
        onClose={() => setIsTimelineOpen(false)}
        imagePath={timelineImagePath}
      />
    </div>
  );
}
