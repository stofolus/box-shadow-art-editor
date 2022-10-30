import { Card } from "../../../../components/Card/Card";
import {
  useAvailableColors,
  useColor,
} from "../../../../contexts/ColorContext";
import styles from "./AvailableColors.module.css";

export const AvailableColors = () => {
  const availableColors = useAvailableColors();
  const [, setColorState] = useColor();
  return (
    <Card>
      <h2>Colors</h2>
      <div className={styles["color-wrapper"]}>
        {availableColors.map((color) => (
          <button
            key={color.name}
            className={styles["pickable-color"]}
            type="button"
            onClick={() => {
              setColorState({ activeColor: color });
            }}
          >
            <div
              className={styles["pickable-color-pixel"]}
              style={{ backgroundColor: color.value }}
            ></div>
            <span>{color.name}</span>
          </button>
        ))}
      </div>
    </Card>
  );
};
