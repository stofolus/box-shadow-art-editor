import { FunctionComponent, ReactNode } from "react";
import styles from "./Card.module.css";

interface Props {
  children: ReactNode;
}

export const Card: FunctionComponent<Props> = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};
