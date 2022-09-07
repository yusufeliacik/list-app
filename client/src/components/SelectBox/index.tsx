import React, { FC } from "react";
import Select from "react-select";
import { Control, Controller } from "react-hook-form";

import styles from "./index.module.scss";

type Props = {
  label: string;
  name: string;
  options?: Array<{ label: string; value: string }>;
  control?: Control<any>;
  errorMessage?: string;
  onChange?: (e: string) => any;
  defaultValue?: string;
};

export const SelectBox: FC<Props> = ({
  label,
  name,
  options,
  control,
  errorMessage,
  onChange: _onChange,
  defaultValue,
}) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      {control ? (
        <Controller
          name={name}
          control={control ?? undefined}
          render={({ field: { value, onChange, onBlur } }) => {
            return (
              <Select
                options={options}
                placeholder={"Choose..."}
                onChange={(e) => onChange(e?.value)}
                onBlur={onBlur}
                value={options?.filter((item) => item.value === value)}
                className={styles.select_box}
              />
            );
          }}
        />
      ) : (
        <Select
          options={options}
          placeholder={"Choose..."}
          onChange={(e) => _onChange?.(e?.label ?? "")}
          className={styles.select_box}
          defaultValue={options?.filter((item) => item.value === defaultValue)}
        />
      )}
      <p className={styles.error_message}>{errorMessage}</p>
    </div>
  );
};
