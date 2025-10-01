const LENGTH = 20;
const mainImagePath = "/images/main.jpg";

// TODO: World horizontal drag not working since the width of world width is equal to viewport width

export default function World() {
  return (
    <div id="world" className="w-[200vw] h-fit p-10 absolute select-none">
      <div className="flex flex-col gap-5">
        {Array.from({ length: LENGTH }).map((_, i) => (
          <div key={i} className="flex flex-row gap-5">
            {Array.from({ length: LENGTH }).map((_, j) => (
              <img
                key={j}
                src={mainImagePath}
                draggable={false}
                alt="My outstanding photographs :)"
                className="w-[120px] border-4 border-blue-700 rounded-2xl pointer-events-none"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
