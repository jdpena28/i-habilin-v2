import type { HTMLInputTypeAttribute, ReactHTMLElement } from "react";

interface InputFormProps {
  id: string;
  name: string;
  type: HTMLInputTypeAttribute;
  labelText: string;
  icon?: ReactHTMLElement;
  helperText?: string;
}

interface ApplicationHeaderProps {
  title: string;
  goBack?: boolean;
  search?: boolean;
  tabs?: boolean;
  filter?: boolean;
}
