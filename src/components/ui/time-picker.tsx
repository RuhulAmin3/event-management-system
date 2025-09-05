"use client";

import React from "react";
import { Label } from "./label";
import { Input } from "./input";

interface TimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="time-picker" className="px-1">
        Time
      </Label>
      <Input
        type="time"
        id="time-picker"
        step="1"
        value={value || "10:30:00"}
        onChange={(e) => onChange?.(e.target.value)}
        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
      />
    </div>
  );
};

export default TimePicker;
