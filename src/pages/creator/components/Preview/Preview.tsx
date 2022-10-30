import { useEffect, useRef } from "react";
import { Card } from "../../../../components/Card/Card";
import { useGrid, usePixels } from "../../../../contexts/PixelContext";
import { generateBoxShadow } from "../../../../utils/BoxShadow";
import styles from "./Preview.module.css";

export const Preview = () => {
  const [pixels] = usePixels();
  const [grid] = useGrid();
  const previewElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    previewElement.current?.style.setProperty(
      "box-shadow",
      generateBoxShadow(pixels)
    );
    const rootPixel = pixels[0]?.[0];
    previewElement.current?.style.setProperty(
      "background-color",
      rootPixel?.value ?? "transparent"
    );
  }, [pixels]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--grid-width",
      grid.width.toString()
    );
    document.documentElement.style.setProperty(
      "--grid-height",
      grid.height.toString()
    );
  }, [grid.height, grid.width]);

  return (
    <Card>
      <h2>Preview</h2>
      {/**
       * Remember to update the copy command when changing this code
       */}
      <div className={styles["pixel-art-wrapper"]}>
        <div className={styles["pixel-art"]} ref={previewElement}></div>
      </div>
    </Card>
  );
};
