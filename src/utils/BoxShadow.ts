import { Pixels } from "../contexts/PixelContext";

export function generateBoxShadow(pixels: Pixels) {
  return pixels
    .flatMap((colors, row) => {
      return colors?.map((color, column) => {
        return `calc(var(--size) * ${column}) calc(var(--size) * ${row}) ${color.value}`;
      });
    })
    .filter((row) => typeof row !== "undefined")
    .join(", ");
}
