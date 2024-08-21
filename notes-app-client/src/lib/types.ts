import React from "react";

export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  width: number;
  height: number;
  layout?: "fill" | "intrinsic" | "responsive";
};

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: string;
};

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  path: string;
  children: React.ReactNode;
};

export type SignUpForm = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export type SignInForm = {
  email: string;
  password: string;
};

export type FolderProps = {
  label: string;
};

export type HeaderProps = {
  type?: string;
  showSave?: boolean;
  onBack?: () => void;
  onSave?: () => void;
};

export type NoteProps = {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export type SearchProps = {
  disabled?: boolean;
}
