import { useEffect } from "react";
import { createPortal } from "react-dom";

interface TimelineProps {
  isOpen: boolean;
  onClose: () => void;
  imagePath: string;
}

export default function Timeline({
  isOpen,
  onClose,
  imagePath,
}: TimelineProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key == "Escape" && isOpen) onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      id="timeline-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 flex justify-center items-center bg-black/80 p-4 animate-fade-in"
    >
      <img
        src={imagePath}
        alt="Main Timeline Image"
        onClick={(e) => e.stopPropagation()}
        className="block max-w-1/2 h-auto rounded-lg shadow-2xl animate-scale-in"
      />
    </div>,
    document.body
  );
}
