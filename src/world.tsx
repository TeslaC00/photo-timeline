import { useEffect } from "react";

const LENGTH = 12;
const mainImagePath = "/images/main.jpg";

export default function World() {
  // TODO: Modify to work with dynamic content and viewport resizing
  useEffect(() => {
    const world = document.getElementById("world");
    const viewport = document.getElementById("viewport");

    if (!world || !viewport) return;

    const centerWorld = () => {
      const viewportRect = viewport.getBoundingClientRect();
      const x = (viewportRect.width - world.scrollWidth) / 2;
      const y = (viewportRect.height - world.scrollHeight) / 2;

      world.style.left = `${x}px`;
      world.style.top = `${y}px`;
    };

    // Observe world size changes
    const worldResizeObserver = new ResizeObserver(centerWorld);
    worldResizeObserver.observe(world);

    // Observe viewport size changes
    const viewportResizeObserver = new ResizeObserver(centerWorld);
    viewportResizeObserver.observe(viewport);

    // Initial centering
    centerWorld();

    return () => {
      worldResizeObserver.disconnect();
      viewportResizeObserver.disconnect();
    };
  }, []);

  return (
    <div id="world" className="w-fit h-fit p-10 absolute select-none">
      <div className="flex flex-col gap-5">
        {Array.from({ length: LENGTH }).map((_, i) => (
          <div key={i} className="flex flex-row gap-5">
            {Array.from({ length: LENGTH }).map((_, j) => (
              <img
                key={j}
                src={mainImagePath}
                draggable={false}
                alt="My outstanding photographs :)"
                className="max-w-[120px] border-4 border-blue-700 rounded-2xl pointer-events-none"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
