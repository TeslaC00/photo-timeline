import { useState, useEffect } from "react";

const themes = [
  { id: "default", name: "Original", accent: "#60a5fa" },
  { id: "warm", name: "Warm", accent: "#f59e0b" },
  { id: "sakura", name: "Sakura", accent: "#fda4af" },
  { id: "matcha", name: "Matcha", accent: "#84cc16" },
];

export default function ThemePicker({ visible }: { visible: boolean }) {
  const [currentTheme, setCurrentTheme] = useState("warm");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 rounded-lg shadow-lg hover:brightness-110 transition-all flex items-center gap-2 
            ${
              visible
                ? "animate-slide-in-top"
                : "animate-slide-out-top pointer-events-none"
            }`}
        style={{
          backgroundColor: "var(--theme-picker-bg)",
          color: "var(--theme-picker-text)",
        }}
      >
        <span className="font-semibold">Theme</span>
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 bg-[var(--theme-picker-dropdown-bg)] rounded-lg shadow-2xl p-4 min-w-[200px] animate-scale-in">
          <h3 className="text-[var(--theme-picker-text)] font-bold mb-3 text-sm uppercase tracking-wide">
            Select Theme
          </h3>
          <div className="flex flex-col gap-2">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={`px-4 py-3 rounded-lg transition-all text-left flex items-center justify-between group ${
                  currentTheme === theme.id
                    ? "bg-[var(--theme-picker-item-active-bg)] text-[var(--theme-picker-text)] shadow-lg scale-105"
                    : "bg-[var(--theme-picker-item-bg)] text-[var(--theme-picker-text)] hover:bg-[var(--theme-picker-item-hover-bg)] hover:text-[var(--theme-picker-text)] brightness-110 hover:scale-105"
                }`}
              >
                <span className="font-medium">{theme.name}</span>
                <div
                  className="w-4 h-4 rounded-full border-2 border-white/30 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: theme.accent }}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
