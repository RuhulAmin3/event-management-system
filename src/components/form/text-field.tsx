"use client";

import { Input } from "~/components/ui/input";
import FormFieldWrapper from "./form-field-wrapper";
import { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "~/lib/utils";

interface Props {
    label: string;
    placeholder: string;
    register: UseFormRegisterReturn;
    error?: boolean;
    icon?: React.ReactNode;
}

const TextField = ({ label, placeholder, register, error, icon }: Props) => {
    return (
        <FormFieldWrapper label={label}>
            <div className="relative">
                {icon && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {icon}
                    </span>
                )}
                <Input
                    placeholder={placeholder}
                    {...register}
                    className={cn(
                        icon && "pl-10",
                        error && "border-red-500 focus-visible:ring-red-500"
                    )} />
            </div>
        </FormFieldWrapper>
    );
};

export default TextField;
