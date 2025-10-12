import { photoLocations } from "./photo";

interface TimelineSidebarProps {
  currentIndex: number;
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
              className={`cursor-pointer transition-all duration-300 ease-in-out text-center rounded-md px-4 py-2 text-sm font-semibold opacity-0 animate-slide-in-right ${
                index === props.currentIndex
                  ? "scale-125 bg-blue-600 text-white shadow-lg"
                  : "hover:scale-110 hover:bg-gray-700 hover:text-white bg-gray-800 text-gray-400"
              }`}
              style={{ animationDelay: `${100 + index * 75}ms` }}
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
