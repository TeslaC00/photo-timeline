import React, { forwardRef } from "react";
import { MAX_IMAGE_WIDTH } from "./constant";

const LENGTH = 60;
const PADDING = 1;
const mainImagePath = "/images/main.jpg";

interface WorldProps {
  changeTimelineImagePath: (path: string) => void;
  openTimeline: () => void;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
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
  ({ changeTimelineImagePath, openTimeline, onMouseDown }, ref) => {
    const handleOnClick = (imageSrc: string) => {
      // TODO: maybe add a timer for accepting click, so hold click for a while then accept it as click to change main image and
      // make dragging more smooth
      changeTimelineImagePath(imageSrc);
      openTimeline();
    };

    const [rows, cols] = getFactors(LENGTH);
    console.log(`Rows: ${rows} Cols:${cols}`);

    const renderCell = (i: number, j: number) => {
      const isBorder =
        i < PADDING ||
        j < PADDING ||
        i > rows + PADDING - 1 ||
        j > cols + PADDING - 1;

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

      return (
        <img
          key={`${i}-${j}`}
          src={mainImagePath}
          draggable={false}
          alt="My outstanding photographs :)"
          className={`max-w-[120px] ${commonClass}`}
          onClick={() => handleOnClick(mainImagePath)}
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
            {Array.from({ length: rows + 2 * PADDING }).map((_, i) => {
              // ROWS
              const offset = i % 2 === 0 ? MAX_IMAGE_WIDTH * 0.5 : 0;
              return (
                <div
                  key={i}
                  className="flex flex-row gap-5"
                  style={{ marginLeft: offset }}
                >
                  {Array.from({ length: cols + 2 * PADDING }).map((_, j) =>
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
