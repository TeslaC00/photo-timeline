import { useEffect, useRef, useState } from "react";
import { MAIN_IMAGE_PATH } from "./constant";

export default function Timeline({ imageSrc = MAIN_IMAGE_PATH }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageStyle, setImageStyle] = useState({ left: 0, top: 0, scale: 1 });

  useEffect(() => {
    const viewport = document.getElementById("viewport");
    const img = imgRef.current;
    if (!viewport || !img) return;

    const centerMainImage = () => {
      const { width: vw, height: vh } = viewport.getBoundingClientRect();

      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;

      // Scale the image to fit within the viewport while maintaining aspect ratio
      const scale = Math.min(vw / naturalWidth, vh / naturalHeight, 1);
      const scaledWidth = naturalWidth * scale;
      const scaledHeight = naturalHeight * scale;

      // Center the image
      const left = (vw - scaledWidth) / 2;
      const top = (vh - scaledHeight) / 2;

      setImageStyle({ left, top, scale });
    };

    // Observe viewport size changes
    const viewportResizeObserver = new ResizeObserver(centerMainImage);
    viewportResizeObserver.observe(viewport);

    // If image is already loaded center the image
    if (img.complete) centerMainImage();

    // Re-run on each load (for new images)
    img.onload = centerMainImage;

    return () => viewportResizeObserver.disconnect();
  }, [imageSrc]);

  return (
    // Add full screen in and out button on the main image
    <div id="timeline" className="absolute z-20 inset-0">
      <img
        ref={imgRef}
        src={imageSrc}
        alt="Main Timeline Image"
        draggable={false}
        // max-h-[360px]
        className="absolute transition-transform duration-500 ease-out"
        style={{
          left: imageStyle.left,
          top: imageStyle.top,
          transform: `scale(${imageStyle.scale})`,
          transformOrigin: "top left",
        }}
      />
    </div>
  );
}
