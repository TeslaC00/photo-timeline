import { photoLocations } from "./photo";

interface TimelineSidebarProps {
  currentIndex: number;
  setTimelineLocationIndex: (index: number) => void;
}

export default function TimelineSidebar(props: TimelineSidebarProps) {
  return (
    <div
      id="timeline-sidebar"
      className="fixed right-0 z-20 select-none top-1/2 -translate-y-1/2 flex items-center pr-4"
    >
      <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-400 to-purple-600 rounded-full">
        {/* Timeline Sidebar line */}
      </div>

      <ol className="flex flex-col gap-8 p-4 relative z-10">
        {photoLocations.map((location, index) => {
          return (
            <li
              key={location}
              className={`group cursor-pointer transition-all duration-300 ease-in-out text-center rounded-md px-4 py-2 text-sm font-semibold relative opacity-0 animate-slide-in-right ${
                index === props.currentIndex
                  ? "scale-125 bg-blue-600 text-white shadow-lg"
                  : "hover:scale-110 hover:bg-gray-700 hover:text-white bg-gray-800 text-gray-400"
              }`}
              style={{ animationDelay: `${100 + index * 75}ms` }}
              onClick={() => props.setTimelineLocationIndex(index)}
            >
              {/* Timeline Dot */}
              <span
                className={`absolute -left-7 top-1/2 -translate-y-1/2 block w-4 h-4 rounded-full border-2 border-blue-400 transition-all duration-300 ${
                  index === props.currentIndex
                    ? "bg-blue-600 scale-125 shadow-md shadow-blue-500/50"
                    : "bg-gray-700 group-hover:bg-blue-500"
                }`}
              />
              {location}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
