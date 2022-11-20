import { classNames } from "classnames-generics";
import React from "react";
import { Card } from "../../../../components/Card/Card";
import { Pixels, useGif, usePixels } from "../../../../contexts/PixelContext";
import styles from "./GifControl.module.css";

export const GifControl = () => {
  const [, setPixels, frames] = usePixels();
  const [activeFrame, addFrame, removeLastFrame, setActiveFrame] = useGif();

  return (
    <Card>
      <div className={styles["header"]}>
        <h2>GIF it!</h2>
        <button className={styles["button"]} onClick={() => addFrame()}>
          + Add frame
        </button>
      </div>
      {frames.length > 1 && (
        <>
          <div className={styles["frame-buttons-wrapper"]}>
            {frames.map((pixels, index) => (
              <button
                key={index}
                onClick={() => setActiveFrame(index)}
                className={classNames({
                  [styles["frame-button--active"]]: index === activeFrame,
                })}
              >
                {index + 1}
              </button>
            ))}
          </div>
          {activeFrame > 0 && (
            <button
              className={styles["button"]}
              onClick={() => {
                const pixelsCopy: Pixels = [];
                frames[activeFrame - 1].forEach((row, index) => {
                  if (Array.isArray(row)) {
                    const tempArray = new Array(row.length);
                    row.forEach((col, index) => {
                      tempArray[index] = { ...col };
                    });
                    pixelsCopy[index] = tempArray;
                  }
                });
                setPixels(pixelsCopy);
              }}
            >
              Copy previous frame
            </button>
          )}
          {activeFrame !== frames.length - 1 && (
            <button
              onClick={() => removeLastFrame()}
              className={styles["button"]}
            >
              - Remove last frame
            </button>
          )}
        </>
      )}
    </Card>
  );
};
