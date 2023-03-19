import { FC } from "react";
import { get } from "lodash";
import type { InputFormProps } from "@/client/types/props";

const InputForm: FC<InputFormProps> = ({
  id,
  name,
  type = "text",
  labelText,
  aboveLabel,
  icon,
  helperText,
  register,
  error,
  sideEffect,
}) => {
  const errorMessage: string = get(error, id)?.message;
  return (
    <>
      <p className="label-text mb-1">{aboveLabel}</p>
      <label
        htmlFor={id}
        className="label-text relative block overflow-hidden rounded-md border border-primary/50 px-3 pt-3 shadow-sm focus-within:border-primary/100 focus-within:ring-1 focus-within:ring-primary/100">
        <input
          type={type}
          id={id}
          name={name}
          placeholder={labelText}
          className="label-text peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          {...register(id, {
            valueAsNumber: type === "number",
            onChange: sideEffect,
          })}
        />
        <span className="label-text absolute left-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
          {labelText}
        </span>
        {icon && <span className="absolute right-3">{icon}</span>}
      </label>
      {helperText && <p className="helper-text">{helperText}</p>}
      {errorMessage && (
        <p className="helper-text mt-1 font-medium !text-red-400">
          {errorMessage}
        </p>
      )}
    </>
  );
};

export default InputForm;
