import { useEffect, useRef } from "react";
import World from "./world";

export default function Viewport() {
  const coords = useRef({ startX: 0, startY: 0, lastX: 0, lastY: 0 });
  const mouseDown = useRef(false);

  useEffect(() => {
    const world = document.getElementById("world");
    const viewport = document.getElementById("viewport");
    if (!world || !viewport) return;

    const onMouseDown = (e: MouseEvent) => {
      mouseDown.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;

      world.style.cursor = "grabbing";
    };

    const onMouseUp = () => {
      mouseDown.current = false;
      coords.current.lastX = world.offsetLeft;
      coords.current.lastY = world.offsetTop;

      world.style.cursor = "grab";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!mouseDown.current) return;

      const viewportRect = viewport.getBoundingClientRect();
      const worldRect = world.getBoundingClientRect();

      let newX = e.clientX - coords.current.startX + coords.current.lastX;
      let newY = e.clientY - coords.current.startY + coords.current.lastY;

      const minX = viewportRect.width - worldRect.width;
      const minY = viewportRect.height - worldRect.height;

      const maxX = 0;
      const maxY = 0;

      console.log(
        `worldRect: ${worldRect.width}x${worldRect.height}, viewportRect: ${viewportRect.width}x${viewportRect.height}`
      );
      if (worldRect.width > viewportRect.width) {
        newX = Math.max(newX, minX); // Don't move too far right (left edge is too far to the left)
        newX = Math.min(newX, maxX); // Don't move too far left (left edge is past 0)
      } else {
        // If world is smaller than viewport, center it or keep it at 0, 0 (or whatever initial position you want)
        // For simplicity, we'll clip it to stay completely inside, starting at 0.
        newX = Math.max(newX, 0); // Left boundary check
        newX = Math.min(newX, viewportRect.width - worldRect.width); // Right boundary check
      }

      // Clip Y-coordinate
      if (worldRect.height > viewportRect.height) {
        newY = Math.max(newY, minY); // Don't move too far down (top edge is too far up)
        newY = Math.min(newY, maxY); // Don't move too far up (top edge is past 0)
      } else {
        // If world is smaller than viewport, clip it to stay completely inside, starting at 0.
        newY = Math.max(newY, 0); // Top boundary check
        newY = Math.min(newY, viewportRect.height - worldRect.height); // Bottom boundary check
      }

      world.style.left = `${newX}px`;
      world.style.top = `${newY}px`;
    };

    world.addEventListener("mousedown", onMouseDown);
    world.addEventListener("mouseup", onMouseUp);
    viewport.addEventListener("mousemove", onMouseMove);
    viewport.addEventListener("mouseleave", onMouseUp);

    const cleanup = () => {
      world.removeEventListener("mousedown", onMouseDown);
      world.removeEventListener("mouseup", onMouseUp);
      viewport.removeEventListener("mousemove", onMouseMove);
      viewport.removeEventListener("mouseleave", onMouseUp);
      world.style.cursor = "";
    };

    return cleanup;
  }, []);

  return (
    <div id="viewport" className="overflow-hidden h-screen w-screen relative">
      <World />
    </div>
  );
}
