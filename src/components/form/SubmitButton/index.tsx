import styles from "./styles.module.css";

type SubmitButtonProps = {
  text: string;
};

export function SubmitButton({ text }: SubmitButtonProps) {
  return (
    <div className={styles.formControle}>
      <button className={styles.button}>{text}</button>
    </div>
  );
}
