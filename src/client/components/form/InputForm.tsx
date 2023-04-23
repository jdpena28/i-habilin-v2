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
  step,
  defaultValue,
  parentClassName,
}) => {
  const errorMessage: string = get(error, id)?.message;
  return (
    <div className={parentClassName}>
      <p className="label-text mb-1">{aboveLabel}</p>
      <label
        htmlFor={id}
        className={`label-text relative block overflow-hidden rounded-md border border-primary/50 px-3 shadow-sm focus-within:border-primary/100 focus-within:ring-1 focus-within:ring-primary/100 ${
          !aboveLabel && "pt-3 "
        }`}>
        {type === "textarea" ? (
          <textarea
            id={id}
            name={name}
            placeholder={labelText}
            className="label-text peer h-32 w-full border-none bg-transparent p-0 py-1 !font-normal placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
            rows={3}
            cols={20}
            {...register(id, {
              onChange: sideEffect,
            })}
          />
        ) : (
          <input
            type={type}
            id={id}
            name={name}
            placeholder={labelText}
            className="label-text peer h-8 w-full border-none bg-transparent p-0 !font-normal placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
            {...register(id, {
              valueAsNumber: type === "number",
              onChange: sideEffect,
            })}
            defaultValue={defaultValue}
            min={type === "number" ? 0 : undefined}
            step={step}
          />
        )}
        {!aboveLabel && (
          <span className="label-text absolute left-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
            {labelText}
          </span>
        )}
        {icon && <span className="absolute right-3">{icon}</span>}
      </label>
      {helperText && <p className="helper-text mt-1">{helperText}</p>}
      {errorMessage && (
        <p className="helper-text mt-1 font-medium !text-red-400">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default InputForm;
