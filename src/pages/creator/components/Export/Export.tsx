import React from "react";
import { Card } from "../../../../components/Card/Card";
import { Grid, Pixels, usePixels } from "../../../../contexts/PixelContext";
import { generateBoxShadow } from "../../../../utils/BoxShadow";
import styles from "./Export.module.css";
import { Inspiration } from "./Inspiration";

interface CodepenValue {
  title: string;
  html: string;
  css: string;
}

export const Export = () => {
  const [pixels] = usePixels();

  const codepenValue: CodepenValue = {
    title: "Pixel art",
    html: getHtml(),
    css: getCss(pixels),
  };

  return (
    <Card>
      <h2>Export</h2>
      <div className={styles["button-wrapper"]}>
        <form
          action="https://codepen.io/pen/define"
          method="POST"
          target="_blank"
        >
          <input
            type="hidden"
            name="data"
            value={JSON.stringify(codepenValue)}
          />
          <button className={styles.button} type="submit">
            Open on codepen
          </button>
        </form>
      </div>
      <Inspiration />
    </Card>
  );
};

function getHtml() {
  return `<div class="pixel-art-wrapper">
  <div class="pixel-art"></div>
</div>`;
}

function getCss(pixels: Pixels) {
  const grid = getMinimumGrid(pixels);

  return `body {
  background: black;
}
      
.pixel-art-wrapper {
  --size: 16px;
  --grid-height: ${grid.height};
  --grid-width: ${grid.width};

  height: calc(var(--size) * var(--grid-height));
  width: calc(var(--size) * var(--grid-width));
  border-radius: 50px;
  padding: calc(var(--size) * 1.5);
  box-sizing: content-box;
  background-color: #FFF;
  margin: 32px auto;
}

.pixel-art {
  height: var(--size);
  width: var(--size);
  box-shadow: ${generateBoxShadow(pixels)};
}`;
}

function getMinimumGrid(pixels: Pixels): Grid {
  const minimumGrid = pixels.reduce(
    (heightAcc, heightCurr, heightIndex): Grid => {
      if (!Array.isArray(heightCurr)) {
        return heightAcc;
      }

      const width = heightCurr.reduce((widthAcc, widthCurr, widthIndex) => {
        if (typeof widthCurr !== "undefined") {
          return widthIndex;
        }
        return widthAcc;
      }, -1);

      if (width === -1) {
        return heightAcc;
      }

      return {
        height: heightIndex,
        width: Math.max(width, heightAcc.width),
      };
    },
    { height: -1, width: -1 }
  );

  /**
   * Compensate for arrays starting at 0
   */
  return {
    height: minimumGrid.height + 1,
    width: minimumGrid.width + 1,
  };
}
