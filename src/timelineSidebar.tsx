import { photoLocations } from "./photo";

interface TimelineSidebarProps {
  currentIndex: number;
  setTimelineLocationIndex: (index: number) => void;
  visible: boolean;
}

export default function TimelineSidebar(props: TimelineSidebarProps) {
  return (
    <div
      id="timeline-sidebar"
      className={`fixed right-0 z-20 select-none top-1/2 -translate-y-1/2 flex items-center pr-4 
        ${
          props.visible
            ? "animate-fade-in"
            : "animate-fade-out pointer-events-none"
        }`}
    >
      <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[var(--timeline-line-start)] to-[var(--timeline-line-end)] rounded-full">
        {/* Timeline Sidebar line */}
      </div>

      <ol className="flex flex-col gap-8 p-4 relative z-10">
        {photoLocations.map((location, index) => {
          return (
            <li
              key={location}
              className={`group cursor-pointer transition-all duration-300 ease-in-out text-center rounded-md px-4 py-2 text-sm font-semibold relative opacity-0 animate-slide-in-right ${
                index === props.currentIndex
                  ? "scale-125 bg-[var(--timeline-selected-bg)] text-[var(--timeline-selected-text)] shadow-lg"
                  : "hover:scale-110 hover:bg-[var(--timeline-hover-bg)] hover:text-[var(--timeline-hover-text)] bg-[var(--timeline-item-bg)] text-[var(--timeline-item-text)]"
              }`}
              style={{ animationDelay: `${100 + index * 75}ms` }}
              onClick={() => props.setTimelineLocationIndex(index)}
            >
              {/* Timeline Bullet */}
              <span
                className={`absolute -left-7 top-1/2 -translate-y-1/2 block w-4 h-4 rounded-full border-2 border-[var(--timeline-bullet-border)] transition-all duration-300 ${
                  index === props.currentIndex
                    ? "bg-[var(--timeline-bullet-selected-bg)] scale-125 shadow-[var(--timeline-bullet-selected-shadow)]"
                    : "bg-[var(--timeline-bullet-bg)] group-hover:bg-[var(--timeline-bullet-hover-bg)]"
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
