import loading from "../../../img/loading.svg";

import styles from "./styles.module.css";

export function Loading() {
  return (
    <div className={styles.loaderContainer}>
      <img className={styles.loader} src={loading} alt="Loading" />
    </div>
  );
}
