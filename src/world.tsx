import { MAX_IMAGE_WIDTH } from "./constant";

const LENGTH = 12;
const mainImagePath = "/images/main.jpg";

export default function World({
  changeTimelineImagePath,
  openTimeline,
}: {
  changeTimelineImagePath: (path: string) => void;
  openTimeline: () => void;
}) {
  const handleOnClick = (imageSrc: string) => {
    // TODO: maybe add a timer for accepting click, so hold click for a while then accept it as click to change main image and
    // make dragging more smooth
    changeTimelineImagePath(imageSrc);
    openTimeline();
  };

  const renderCell = (i: number, j: number) => {
    const isBorder = i === 0 || j === 0 || i === LENGTH + 1 || j === LENGTH + 1;
    const commonClass =
      "border-4 border-blue-700 rounded-2xl pointer-events-auto select-none";

    if (isBorder) {
      return <div key={j} className={`w-[120px] h-[84px] ${commonClass}`} />;
    }

    return (
      <img
        key={j}
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
      <div id="world" className="w-fit h-fit absolute select-none">
        <div className="flex flex-col gap-5">
          {Array.from({ length: LENGTH + 2 }).map((_, i) => {
            // ROWS
            const offset = i % 2 === 0 ? MAX_IMAGE_WIDTH * 0.5 : 0;
            return (
              <div
                key={i}
                className="flex flex-row gap-5"
                style={{ marginLeft: offset }}
              >
                {Array.from({ length: LENGTH + 2 }).map((_, j) =>
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
