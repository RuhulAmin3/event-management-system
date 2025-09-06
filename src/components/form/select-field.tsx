"use client";

import { Controller } from "react-hook-form";
import { Select, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Tag } from "lucide-react";
import FormFieldWrapper from "./form-field-wrapper";
import { cn } from "~/lib/utils";

interface Props {
  name: string;
  control: any;
  error?: boolean;
  children: React.ReactNode;
}

const SelectField = ({ name, control, error, children }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormFieldWrapper label="Category *" >
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className={cn(
              error && "border-red-500 focus-visible:ring-red-500"
            )}>
              <Tag className="w-4 h-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Select event category" />
            </SelectTrigger>
            {children}
          </Select>
        </FormFieldWrapper >
      )}
    />
  );
};

export default SelectField;
