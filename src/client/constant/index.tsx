export const { UPLOADCARE_SECRET_KEY } = process.env;
export const INCLUDED_ADDRESS = {
  include: {
    address: {
      select: {
        addressLine: true,
        Brgy: {
          select: {
            brgy_loc: true,
            id: true,
          },
        },
        city: {
          select: {
            city_name: true,
            city_code: true,
          },
        },
        province: {
          select: {
            prov_name: true,
            prov_code: true,
          },
        },
      },
    },
  },
};
export const animateVariants = {
  mobileHidden: {
    x: "-100vw",
    opacity: 0,
  },
  mobileVisible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.8,
      ease: "easeInOut",
      bounce: 0.14,
    },
  },
  mobileExit: {
    x: "-100vw",
    opacity: 0,
  },
  cartHidden: {
    x: "200vw",
    opacity: 0,
  },
  cartVisible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.8,
      ease: "easeInOut",
      bounce: 0.14,
    },
  },
  cartExit: {
    x: "200vw",
    opacity: 0,
  },
};

export const OPERATION_TYPE = [
  {
    text: "Everyday",
  },
  {
    text: "Weekdays",
  },
  {
    text: "Weekends",
  },
  {
    text: "Custom",
  },
];

export const sizeLimit = 5 * 1024 * 1024; // 5mb
export const allowedFileTypes = "pdf";

export function maxFileSize(limitSize: number) {
  // eslint-disable-next-line func-names
  return function (fileInfo: { size: number }) {
    if (fileInfo.size > limitSize) {
      throw new Error("maxFileLimit");
    }
  };
}

export const fileTypeLimit = (fileTypes: string) => {
  const types = fileTypes.split(",");

  // eslint-disable-next-line func-names
  return function (fileInfo: { name: string | null }) {
    if (fileInfo.name === null) {
      return;
    }
    const extension = fileInfo.name.split(".").pop();

    if (extension && !types.includes(extension)) {
      throw new Error("fileType");
    }
  };
};

export const validators = [
  maxFileSize(sizeLimit),
  fileTypeLimit(allowedFileTypes),
];
export const localeError = {
  errors: {
    maxFileLimit: "File is too big. Max file size is 5mb",
    fileType: "Please upload a pdf file",
  },
  dialog: {
    tabs: {
      preview: {
        error: {
          maxFileLimit: {
            title: "Error.",
            text: "Max File is 5mb.",
            back: "Back",
          },
          fileType: {
            title: "Error",
            text: "Please upload a pdf file",
            back: "Back",
          },
        },
      },
    },
  },
};

export type ValidatorType = typeof validators;
export type LocaleErrorType = typeof localeError;
