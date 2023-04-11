/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-shadow */
import { FC, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { get } from "lodash";
import { HiCheck, HiChevronDown } from "react-icons/hi";
import type { SelectFormProps } from "@/client/types/props";

const SelectForm: FC<SelectFormProps> = ({
  id,
  register,
  error,
  data,
  placeholder = "Select an option",
  aboveLabel,
  helperText,
  filterBy,
  selectedBy,
  setValue,
  watch,
  isLoading,
}) => {
  const defaultData = [
    {
      [selectedBy]: 1,
      [filterBy]: "No data available.",
    },
  ];
  const errorMessage: string = get(error, id)?.message;

  const findActiveValue = () => {
    const activeValue = data?.find((i: any) => i[selectedBy] === watch(id));
    const placeholderValue = {
      [selectedBy]: 0,
      [filterBy]: placeholder,
    };
    if (activeValue) return activeValue;
    if (!activeValue) {
      setValue(id, "");
      return placeholderValue;
    }
    return defaultData[0];
  };

  return (
    <div className="">
      <p className="label-text mb-1">{aboveLabel}</p>
      <Listbox
        {...register(id)}
        value={
          isLoading
            ? defaultData[0][selectedBy]
            : data?.length > 0
            ? placeholder
            : watch(id)
            ? findActiveValue()[filterBy]
            : defaultData[0][selectedBy]
        }
        onChange={(e: any) => {
          setValue(id, e[selectedBy]);
        }}>
        <div className="relative mt-1 rounded-md ring-1 ring-primary/80">
          <Listbox.Button className="relative w-full cursor-default rounded-lg  py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block w-full truncate !font-poppins text-sm text-black lg:text-base">
              {watch(id) ? findActiveValue()[filterBy] : placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiChevronDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Listbox.Options
              className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-tertiary py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              {...register(id)}>
              {data?.length === 0 ||
                (isLoading && (
                  <Listbox.Option
                    key={defaultData[0].id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 font-poppins ${
                        active ? "bg-secondary/80" : "text-gray-900"
                      }`
                    }
                    value={defaultData[0][selectedBy]}>
                    {({ selected }) => (
                      <span
                        className={`block truncate ${
                          selected ? "font-bold" : "font-normal"
                        }`}>
                        {defaultData[0][filterBy]}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              {data?.length > 0 &&
                data?.map((i: any) => (
                  <Listbox.Option
                    key={i.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 font-poppins ${
                        active ? "bg-secondary/80" : "text-gray-900"
                      }`
                    }
                    value={i}>
                    {() => (
                      <>
                        <span
                          className={`block truncate font-poppins ${
                            watch(id) === i[selectedBy]
                              ? "font-bold"
                              : "font-normal"
                          }`}>
                          {i[filterBy]}
                        </span>
                        {watch(id) === i[selectedBy] ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <HiCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {helperText && <p className="helper-text">{helperText}</p>}
      {errorMessage && (
        <p className="helper-text mt-1 font-medium !text-red-400">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default SelectForm;
