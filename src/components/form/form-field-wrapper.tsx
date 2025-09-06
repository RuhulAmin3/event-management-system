
"use client";

import { Label } from "~/components/ui/label";

interface Props {
  label: string;
  children: React.ReactNode;
}

const FormFieldWrapper = ({ label,  children }: Props) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div>
        {children}
      </div>
    </div>
  );
};

export default FormFieldWrapper;
