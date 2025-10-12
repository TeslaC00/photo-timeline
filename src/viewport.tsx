import React, { useRef, useState } from "react";
import World from "./world";
import Timeline from "./timeline";
import { photoLocations } from "./photo";
import { useDraggable } from "./useDraggable";
import TimelineSidebar from "./timelineSidebar";

export default function Viewport() {
  const wordlRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);

  const { handleMouseDown, handleMouseMove, handleMouseUp } = useDraggable(
    wordlRef,
    isDraggingRef
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

  return (
    <div
      id="viewport"
      className="overflow-hidden h-screen w-screen relative"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <World
        ref={wordlRef}
        changeTimelineImagePath={setTimelineImagePath}
        openTimeline={() => setIsTimelineOpen(true)}
        onMouseDown={handleMouseDown}
        timelineLocationIndex={timelineLocationIndex}
        isDraggingRef={isDraggingRef}
      />
      <Timeline
        isOpen={isTimelineOpen}
        onClose={() => setIsTimelineOpen(false)}
        imagePath={timelineImagePath}
      />
      <TimelineSidebar
        timelineLocationIndex={timelineLocationIndex}
        setTimelineLocationIndex={setTimelineLocationIndex}
      />
    </div>
  );
}
