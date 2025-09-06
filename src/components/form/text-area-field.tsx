"use client";

import { Textarea } from "~/components/ui/textarea";
import FormFieldWrapper from "./form-field-wrapper";
import { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "~/lib/utils";

interface Props {
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: boolean;
}

const TextAreaField = ({ label, placeholder, register, error }: Props) => {
  return (
    <FormFieldWrapper label={label}>
      <Textarea placeholder={placeholder} {...register} className={cn(
        error && "border-red-500 focus-visible:ring-red-500"
      )} />
    </FormFieldWrapper>
  );
};

export default TextAreaField;
