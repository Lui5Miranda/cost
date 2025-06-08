import { useState, useEffect } from "react";

import styles from "./styles.module.css";

type MessageProps = {
  type: string;
  msg: string;
  keyTrigger?: number;
};

export function Message({ type, msg }: MessageProps) {
  
  const [visible, setVisible] = useState(false);

  useEffect(() =>{

    if(!msg){
      setVisible(false)
      return
    }

    setVisible(true)

    const timer = setTimeout(() =>{
      setVisible(false)
    }, 3000)

    return ()=> clearTimeout(timer)

  }, [msg]);
  return (
    <>
      {visible && <div className={`${styles.message} ${styles[type]}`}>{msg}</div>}
    </>
  );
}
