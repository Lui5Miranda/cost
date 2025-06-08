import styles from "./styles.module.css";

type SelectProps = {
  text: string;
  name: string;
  options: { id: number; name: string }[];
  handleOnChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string| number;
};

export function Select({
  text,
  name,
  options,
  handleOnChange,
  value,
}: SelectProps) {
  return (
    <div className={styles.formControle}>
      <label htmlFor={name}>{text}</label>
      <select
        name={name}
        id={name}
        onChange={handleOnChange}
        value={value || ""}
      >
        <option value="">Selecione uma opção</option>
        {options.map(option => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
