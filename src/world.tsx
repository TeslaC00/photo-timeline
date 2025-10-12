import React, { forwardRef, useEffect, useState } from "react";
import { MAX_IMAGE_HEIGHT, MAX_IMAGE_WIDTH } from "./constant";
import { photoLocation, photosOfLocation } from "./photo";

interface WorldProps {
  changeTimelineImagePath: (path: string) => void;
  openTimeline: () => void;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  timelineLocationIndex: number;
}

function getFactors(number: number) {
  let factor: number = 1,
    i = 1;
  while (i * i <= number) {
    if (number % i === 0) factor = i;
    i++;
  }
  return [factor, number / factor];
}

const World = forwardRef<HTMLDivElement, WorldProps>(
  (
    {
      changeTimelineImagePath,
      openTimeline,
      onMouseDown,
      timelineLocationIndex,
    },
    ref
  ) => {
    const handleOnClick = (imageSrc: string) => {
      // TODO: maybe add a timer for accepting click, so hold click for a while then accept it as click to change main image and
      // make dragging more smooth
      changeTimelineImagePath(imageSrc);
      openTimeline();
    };

    let location = photoLocation.at(timelineLocationIndex);
    if (location == undefined) location = "Tokyo";
    const photos = photosOfLocation(String(location));

    const [rows, cols] = getFactors(photos.length);
    console.log(`Rows: ${rows} Cols:${cols}`);

    const [padding, setPadding] = useState(1);
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

    useEffect(() => {
      const updatePadding = () => setPadding(calculatePadding());
      updatePadding();

      window.addEventListener("resize", updatePadding);
      return () => window.removeEventListener("resize", updatePadding);
    }, [rows, cols]);

    console.log(`Padding ${padding}`);

    const renderCell = (i: number, j: number) => {
      const isBorder =
        i < padding ||
        j < padding ||
        i > rows + padding - 1 ||
        j > cols + padding - 1;

      const commonClass =
        "border-4 border-blue-700 rounded-2xl pointer-events-auto select-none";

      if (isBorder) {
        return (
          <div
            key={`${i}-${j}`}
            className={`w-[120px] h-[84px] ${commonClass}`}
          />
        );
      }

      const index = (i - padding) * (cols - padding) + (j - padding);
      let imagePath = photos.at(index)?.src;
      if (imagePath == undefined) imagePath = "";

      return (
        <img
          key={`${i}-${j}`}
          src={imagePath}
          draggable={false}
          alt="My outstanding photographs :)"
          className={`max-w-[120px] ${commonClass}`}
          onClick={() => handleOnClick(imagePath)}
        />
      );
    };

    return (
      <div
        id="world-container"
        className="flex items-center justify-center absolute inset-0"
      >
        <div
          id="world"
          className="w-fit h-fit absolute select-none"
          ref={ref}
          onMouseDown={onMouseDown}
        >
          <div className="flex flex-col gap-5">
            {Array.from({ length: rows + 2 * padding }).map((_, i) => {
              // ROWS
              const offset = i % 2 === 0 ? MAX_IMAGE_WIDTH * 0.5 : 0;
              return (
                <div
                  key={i}
                  className="flex flex-row gap-5"
                  style={{ marginLeft: offset }}
                >
                  {Array.from({ length: cols + 2 * padding }).map((_, j) =>
                    renderCell(i, j)
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

export default World;
