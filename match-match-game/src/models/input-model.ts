export interface InputModel {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  validate: Validate;
}

export interface Validate {
  pattern: RegExp;
  maxLength: number;
}
