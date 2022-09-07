import { FC, InputHTMLAttributes } from "react";
import { Control, Controller } from "react-hook-form";

import styles from "./index.module.scss";

type Props = {
  name: string;
  label: string;
  className?: string;
  errorMessage?: string;
  control: Control<any>;
};

export const Input: FC<Props & InputHTMLAttributes<HTMLInputElement>> = ({
  className: _className,
  name,
  label,
  errorMessage,
  control,
  ...args
}) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <>
            <input
              className={_className ?? styles.input_style}
              value={value ?? ""}
              onChange={onChange}
              {...args}
            />
          </>
        )}
      />
      <p className={styles.error_message}>{errorMessage}</p>
    </div>
  );
};
