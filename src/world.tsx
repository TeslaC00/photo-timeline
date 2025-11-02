import React, {
  forwardRef,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import { MAX_IMAGE_HEIGHT, MAX_IMAGE_WIDTH } from "./constant";
import { photoLocations, getPhotosByLocation, type Photo } from "./photo";

function getFactors(number: number): [number, number] {
  if (number <= 0) return [0, 0];
  let factor: number = 1;
  for (let i = 1; i * i <= number; i++) {
    if (number % i === 0) factor = i;
  }
  return [factor, number / factor];
}

interface WorldProps {
  changeTimelineImagePath: (path: string) => void;
  openTimeline: () => void;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  timelineLocationIndex: number;
  isDraggingRef: React.RefObject<boolean>;
  styleClass: string;
  mousePosition: { x: number; y: number };
}

const GridCell = React.memo(
  ({ photo, onClick }: { photo?: Photo; onClick: (src: string) => void }) => {
    const commonClass = `border-4 border-[var(--grid-border)] rounded-2xl pointer-events-auto 
    select-none transition-all duration-300 ease-in-out hover:scale-105 
    hover:shadow-[var(--grid-hover-shadow)] hover:border-[var(--grid-hover-border)]`;

    if (!photo) {
      return <div className={`w-[120px] h-[84px] ${commonClass}`} />;
    }

    return (
      <img
        key={photo.id}
        src={photo.src}
        draggable={false}
        alt={photo.alt}
        className={`max-w-[120px] ${commonClass}`}
        onClick={() => onClick(photo.src)}
      />
    );
  }
);

GridCell.displayName = "GridCell";

const World = forwardRef<HTMLDivElement, WorldProps>((props, ref) => {
  const location = useMemo(
    () => photoLocations.at(props.timelineLocationIndex) || photoLocations[0],
    [props.timelineLocationIndex]
  );

  const photos = useMemo(
    () => getPhotosByLocation(String(location)),
    [location]
  );

  const [rows, cols] = useMemo(
    () => getFactors(photos.length),
    [photos.length]
  );

  if (photos.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-[var(--loading-text)] text-xl">Loading Images...</p>
      </div>
    );
  }

  const [padding, setPadding] = useState(1);

  const lightStyle = useMemo(() => {
    if (!ref || typeof ref !== "object" || !("current" in ref) || !ref.current)
      return {};

    const worldRect = ref.current.getBoundingClientRect();
    const lightX = props.mousePosition.x - worldRect.left;
    const lightY = props.mousePosition.y - worldRect.top;

    return {
      "--mouse-x": `${lightX}px`,
      "--mouse-y": `${lightY}px`,
    };
  }, [props.mousePosition, ref]);

  const handleOnClick = (imageSrc: string) => {
    // TODO: maybe add a timer for accepting click, so hold click for a while then accept it as click to change main image and
    // make dragging more smooth
    if (props.isDraggingRef.current) return;
    props.changeTimelineImagePath(imageSrc);
    props.openTimeline();
  };

  useEffect(() => {
    if (rows === 0 || cols === 0) return;

    // Dynamically calculate padding based on screen vs grid size
    const calculatePadding = () => {
      const totalWidth = cols * MAX_IMAGE_WIDTH;
      const totalHeight = rows * MAX_IMAGE_HEIGHT;
      const padX = Math.ceil(
        (window.innerWidth - totalWidth) / (2 * MAX_IMAGE_WIDTH)
      );
      const padY = Math.ceil(
        (window.innerHeight - totalHeight) / (2 * MAX_IMAGE_HEIGHT)
      );
      return Math.max(1, Math.max(padX, padY)); // always at least 1
    };

    const updatePadding = () => setPadding(calculatePadding());
    updatePadding();

    window.addEventListener("resize", updatePadding);
    return () => window.removeEventListener("resize", updatePadding);
  }, [rows, cols]);

  const grid = useMemo(() => {
    return Array.from({ length: rows + 2 * padding }).map((_, i) => {
      // ROWS
      return (
        <div
          key={i}
          className="flex flex-row gap-5"
          style={{ marginLeft: i % 2 === 0 ? MAX_IMAGE_WIDTH * 0.5 : 0 }}
        >
          {Array.from({ length: cols + 2 * padding }).map((_, j) => {
            const isBorder =
              i < padding ||
              j < padding ||
              i > rows + padding - 1 ||
              j > cols + padding - 1;

            let photo;
            if (!isBorder) {
              const photoIndex = (i - padding) * cols + (j - padding);
              photo = photos[photoIndex];
            }

            return (
              <GridCell
                key={`${i}-${j}`}
                photo={photo}
                onClick={handleOnClick}
              />
            );
          })}
        </div>
      );
    });
  }, [rows, cols, padding, photos, handleOnClick]);

  return (
    <div
      id="world-container"
      className={`flex items-center justify-center absolute inset-0 transition-all duration-500 bg-[var(--world-bg)] ${props.styleClass}`}
      style={lightStyle as CSSProperties}
    >
      <div
        id="world"
        className="w-fit h-fit absolute select-none"
        ref={ref}
        onMouseDown={props.onMouseDown}
        style={{
          maskImage: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), white var(--light-inner-radius), transparent var(--light-outer-radius))`,
          WebkitMaskImage: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), white var(--light-inner-radius), transparent var(--light-outer-radius))`,
        }}
      >
        <div
          key={props.timelineLocationIndex}
          className="flex flex-col gap-5 animate-fade-in"
          style={{ animationDuration: "0.8s" }}
        >
          {grid}
        </div>
      </div>
    </div>
  );
});

World.displayName = "World";

export default React.memo(World);
