import { photoLocations } from "./photo";

interface TimelineSidebarProps {
  timelineLocationIndex: number;
  setTimelineLocationIndex: (index: number) => void;
}

export default function TimelineSidebar(props: TimelineSidebarProps) {
  return (
    <div
      id="timeline-sidebar"
      className="fixed right-0 z-20 select-none top-1/2 -translate-y-1/2"
    >
      <ol className="flex flex-col gap-2 p-4">
        {photoLocations.map((location, index) => {
          return (
            <li
              key={location}
              className={`cursor-pointer transition-transform duration-200 ${
                index === props.timelineLocationIndex
                  ? "scale-125 bg-black text-white"
                  : "hover:scale-110 bg-gray-800"
              }`}
              onClick={() => props.setTimelineLocationIndex(index)}
            >
              {location}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
