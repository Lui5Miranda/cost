import style from "./styles.module.css";

type ContainerProps = {
  children: React.ReactNode;
  customClass?: string;
};
export function Container({children, customClass}: ContainerProps){
  return(
    <div className={`${style.container} ${customClass ? style[customClass] : ""}`}>
        {children}
    </div>
  )
} 