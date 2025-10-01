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

      let newX = e.clientX - coords.current.startX + coords.current.lastX;
      let newY = e.clientY - coords.current.startY + coords.current.lastY;

      const minX = viewportRect.width - world.scrollWidth;
      const minY = viewportRect.height - world.scrollHeight;

      newX = Math.min(Math.max(newX, minX), 0);
      newY = Math.min(Math.max(newY, minY), 0);

      if (minX < 0) world.style.left = `${newX}px`;
      if (minY < 0) world.style.top = `${newY}px`;
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
