import { FC } from "react";
import { Button as BootstrapButton } from "react-bootstrap";

import styles from "./index.module.scss";

type Props = {
  text: string;
  onClick?: () => void;
  className?: string;
};

export const Button: FC<Props> = ({ text, onClick, className: _className }) => {
  return (
    <BootstrapButton
      onClick={onClick}
      className={_className ?? styles.button_style}
      type="submit"
    >
      {text}
    </BootstrapButton>
  );
};
