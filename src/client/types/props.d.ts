import type { HTMLInputTypeAttribute, ReactHTMLElement } from "react";

interface InputFormProps {
  id: string;
  name: string;
  type: HTMLInputTypeAttribute;
  labelText: string;
  required?: boolean;
  icon?: ReactHTMLElement;
  helperText?: string;

  error: any;
  register: any;
  sideEffect?: () => void;
}

interface SelectFormProps {
  data: any | undefined;
  filterBy: string | number;
  selectedBy: string;
  placeholder: string;
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
}
