import { FC } from "react";
import type { InputFormProps } from "@/client/types/props";

const InputForm: FC<InputFormProps> = ({
  id,
  name,
  type = "text",
  labelText,
  icon,
  helperText,
}) => {
  return (
    <>
      <label
        htmlFor={id}
        className="label-text relative block overflow-hidden rounded-md border border-primary/50 px-3 pt-3 shadow-sm focus-within:border-primary/100 focus-within:ring-1 focus-within:ring-primary/100">
        <input
          type={type}
          id={id}
          name={name}
          placeholder={labelText}
          className="label-text peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
        />
        <span className="label-text absolute left-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
          {labelText}
        </span>
        {icon && <span className="absolute right-3">{icon}</span>}
      </label>
      {helperText && (
        <p className="ml-1 text-xs text-[#636363]">{helperText}</p>
      )}
    </>
  );
};

export default InputForm;
