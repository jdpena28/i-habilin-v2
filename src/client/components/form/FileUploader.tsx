/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import { FC, useEffect } from "react";
import { Widget } from "@uploadcare/react-widget";
import { isEmpty, get } from "lodash";

import { deleteMedia } from "@/client/lib/UploadCare";
import { ValidatorType, LocaleErrorType } from "@/client/constant";

interface InputFormProps {
  setValue: any;
  error: any;
  label?: string;
  id: string;
  crop?: string[] | string;
  required?: boolean;
  labelClassName?: string;
  defaultValue?: {
    cdnUrl: string;
    name: string;
  };
  getValues: (value: string) => any;
  watch: (value: string) => any;
  register: any;
  validator?: ValidatorType;
  localeError?: LocaleErrorType;
}

const FileUploader: FC<InputFormProps> = ({
  error,
  id,
  crop,
  register,
  getValues,
  watch,
  setValue,
  defaultValue,
  label,
  validator,
  localeError,
}) => {
  const errorMessage: {
    uuid: {
      message: string;
    };
  } = get(error, id);

  const handleOnChange = async (e: any) => {
    if (!isEmpty(getValues(id))) {
      await deleteMedia(getValues(id).uuid);
    }
    setValue(id, {
      uuid: e.uuid,
      name: e.name,
      size: e.size,
      isImage: e.isImage,
      cdnUrl: e.cdnUrl,
      originalUrl: e.originalUrl,
    });
  };

  useEffect(() => {
    if (defaultValue) {
      setValue(id, defaultValue);
    }
  }, []);

  return (
    <div>
      {label && (
        <label className="label-text" htmlFor={id}>
          {label} :&emsp;
        </label>
      )}
      <Widget
        id={id}
        publicKey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY}
        tabs="file url"
        crop={crop}
        value={watch(id)?.cdnUrl ? watch(id)?.cdnUrl : ""}
        {...register(id)}
        onChange={(e: any) => handleOnChange(e)}
        validators={validator}
        localeTranslations={localeError}
      />
      {!isEmpty(errorMessage) && (
        <p className="helper-text mt-1 font-medium !text-red-400">
          {errorMessage?.uuid?.message}
        </p>
      )}
    </div>
  );
};

export default FileUploader;
