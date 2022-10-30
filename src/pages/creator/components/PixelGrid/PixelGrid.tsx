import { classNames } from "classnames-generics";
import { Card } from "../../../../components/Card/Card";
import { Color, useActiveColor } from "../../../../contexts/ColorContext";
import { useGrid, usePixels } from "../../../../contexts/PixelContext";
import styles from "./PixelGrid.module.css";

export const PixelGrid = () => {
  const [grid, setGrid] = useGrid();
  const [pixels, setPixels] = usePixels();
  const activeColor = useActiveColor();

  return (
    <Card>
      <h2>Pixels</h2>
      <div className={styles["vertical-wrapper"]}>
        <div className={styles["horizontal-wrapper"]}>
          <div className={styles["pixel-grid"]}>
            {[...Array(grid.height).keys()].map((heightIndex) => {
              return (
                <div key={heightIndex} className={styles["pixel-row"]}>
                  {[...Array(grid.width).keys()].map((widthIndex) => {
                    const color: Color | undefined =
                      pixels[heightIndex]?.[widthIndex];
                    return (
                      <button
                        key={`${heightIndex}-${widthIndex}`}
                        className={styles["clickable-pixel"]}
                        style={color ? { backgroundColor: color.value } : {}}
                        type="button"
                        onClick={() => {
                          const pixelCopy = [...pixels];
                          if (typeof pixelCopy[heightIndex] === "undefined") {
                            pixelCopy[heightIndex] = [];
                          }
                          const row = pixelCopy[heightIndex];
                          if (typeof row === "undefined") {
                            return;
                          }
                          if (row[widthIndex]?.name === activeColor.name) {
                            delete row[widthIndex];
                          } else {
                            row[widthIndex] = activeColor;
                          }

                          pixelCopy[heightIndex] = row;

                          setPixels(pixelCopy);
                        }}
                      ></button>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <button
            className={styles["extend-grid-button"]}
            type="button"
            onClick={() => {
              setGrid({ ...grid, width: grid.width + 1 });
            }}
          >
            +
          </button>
        </div>
        <button
          className={classNames(
            styles["extend-grid-button"],
            styles["height-button"]
          )}
          type="button"
          onClick={() => {
            setGrid({ ...grid, height: grid.height + 1 });
          }}
        >
          +
        </button>
      </div>
    </Card>
  );
};
