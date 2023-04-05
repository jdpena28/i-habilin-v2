/* eslint-disable no-unused-vars */
import type {
  HTMLInputTypeAttribute,
  ReactHTMLElement,
  ChangeEvent,
} from "react";

interface InputFormProps {
  id: string;
  name: string;
  type: HTMLInputTypeAttribute | "textarea";
  labelText: string;
  aboveLabel?: string;
  required?: boolean;
  icon?: ReactHTMLElement;
  helperText?: string;
  error: any;
  register: any;
  sideEffect?: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface SelectFormProps {
  data: any | undefined;
  filterBy: string | number;
  selectedBy: string;
  placeholder: string;
  aboveLabel?: string;
  setValue: any;
  watch: any;
  register: any;
  error: any;
  id: string;
  helperText?: string;
  isLoading?: boolean;
}

interface ApplicationHeaderProps {
  title: string;
  goBack?: boolean;
  search?: boolean;
  tabs?: boolean;
  filter?: boolean;
  buttonText?: string;
  onClickButton?: () => void;
}
