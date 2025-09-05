"use client";

import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

interface DatePickerProps {
  value?: string; // 🔑 Compatible with RHF (string ISO format)
  onChange?: (date: string) => void;
  className?: string
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, className }) => {
  const [open, setOpen] = useState(false);

  // Convert stored string → Date
  const selectedDate = value ? new Date(value) : undefined;

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      onChange?.(date.toISOString()); // 🔑 Save ISO string to RHF
    }
    setOpen(false);
  };
  return (
    <div className="flex flex-col gap-3 w-full">
      <Label htmlFor="date-picker" className="px-1">
        Event Date
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className={className}>
          <Button
            variant="outline"
            id="date-picker"
            className={`justify-between font-normal`}
          >
            {selectedDate ? selectedDate.toLocaleDateString() : "Select date"}
            <CalendarIcon className="size-3.5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={"w-full overflow-hidden p-0"} align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            captionLayout="dropdown"
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
