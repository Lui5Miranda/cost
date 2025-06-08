import styles from "./styles.module.css";

type InputProps = {
  type?: "text" | "number";
  text: string;
  name: string;
  placeholder?: string;
  value?: string | number;
  handleOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Input({
  type,
  text,
  name,
  placeholder,
  value,
  handleOnChange,
}: InputProps) {
  return (
    <div className={styles.formControle}>
      <label htmlFor={name}>{text}</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
      />
    </div>
  );
}
