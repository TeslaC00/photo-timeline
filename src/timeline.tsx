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
    <div id="timeline-overlay" onClick={onClose} className="fixed inset-0">
      <div id="timeline-content" onClick={(e) => e.stopPropagation()}>
        <img src={imagePath} alt="Main Timeline Image" />
      </div>
    </div>,
    document.body
  );
}
