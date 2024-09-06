import React, { Dispatch, SetStateAction } from "react";

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
  type?: "note" | "default";
  title?: string;
  showSave?: boolean;
  showDelete?: boolean;
  onBack?: () => void;
  onSave?: () => void;
  onDelete?: () => void;
  showLoader?: boolean;
};

export type NewNoteProps = {
  value: string;
  autoFocus?: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export type SearchProps = {
  disabled?: boolean;
};

export type NoteProps = {
  title: string;
  content: string;
  id: number;
  created_at: string;
  updated_at: string;
};

export type AlertDrawerProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  description: string;
  primaryButtonText?: string;
  isDestructive?: boolean;
  onConfirmation: () => void;
  isLoading?: boolean;
};
