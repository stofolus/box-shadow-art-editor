import { AvailableColors } from "./components/AvailableColors/AvailableColors";
import { Export } from "./components/Export/Export";
import { GifControl } from "./components/GifControl/GifControl";
import { PixelGrid } from "./components/PixelGrid/PixelGrid";
import { Preview } from "./components/Preview/Preview";
import styles from "./Creator.module.css";

export const Creator = () => {
  return (
    <div className={styles.creator}>
      <h1 className={styles["white-header"]}>Box shadow pixel art</h1>
      <div className={styles.grid}>
        <PixelGrid />
        <Preview />
        <AvailableColors />
        <Export />
        <GifControl />
      </div>
    </div>
  );
};
