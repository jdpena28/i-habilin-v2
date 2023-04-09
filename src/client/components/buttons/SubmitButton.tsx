import { FC } from "react";

type SubmitButtonType = {
  isLoading: boolean;
  className?: string;
};

const SubmitButton: FC<SubmitButtonType> = ({ isLoading, className }) => {
  return (
    <button
      type={isLoading ? "button" : "submit"}
      className={`bg-primary text-white ${className}`}>
      {isLoading ? (
        <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24">
          <circle
            className="opacity-5"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        "Submit"
      )}
    </button>
  );
};

export default SubmitButton;
