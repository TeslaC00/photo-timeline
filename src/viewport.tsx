import React, { useRef, useState } from "react";
import World from "./world";
import Timeline from "./timeline";
import { photoLocations } from "./photo";
import { useDraggable } from "./useDraggable";
import TimelineSidebar from "./timelineSidebar";

export default function Viewport() {
  const wordlRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { handleMouseDown, handleMouseMove, handleMouseUp } = useDraggable(
    wordlRef,
    isDraggingRef,
    setMousePosition
  );

  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [timelineImagePath, setTimelineImagePath] = useState("");

  const [timelineLocationIndex, setTimelineLocationIndex] = useState(0);
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (isTimelineOpen) return;
    if (e.deltaY > 0) {
      // Scrolling down
      setTimelineLocationIndex((prev) =>
        Math.min(prev + 1, photoLocations.length - 1)
      );
    } else if (e.deltaY < 0) {
      // Scrolling down
      setTimelineLocationIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleViewportMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      id="viewport"
      className="overflow-hidden h-screen w-screen relative cursor-grab animate-gradient-pan"
      style={{ backgroundSize: "200% 200%" }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      // For general mouse move capture
      onMouseEnter={handleViewportMouseMove}
      onMouseMoveCapture={handleViewportMouseMove}
    >
      <World
        ref={wordlRef}
        changeTimelineImagePath={setTimelineImagePath}
        openTimeline={() => setIsTimelineOpen(true)}
        onMouseDown={handleMouseDown}
        timelineLocationIndex={timelineLocationIndex}
        isDraggingRef={isDraggingRef}
        styleClass={isTimelineOpen ? "blur-sm brightness-50" : ""}
        mousePosition={mousePosition}
      />
      <Timeline
        isOpen={isTimelineOpen}
        onClose={() => setIsTimelineOpen(false)}
        imagePath={timelineImagePath}
      />
      <TimelineSidebar
        currentIndex={timelineLocationIndex}
        setTimelineLocationIndex={setTimelineLocationIndex}
      />
    </div>
  );
}
