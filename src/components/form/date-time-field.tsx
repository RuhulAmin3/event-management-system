"use client";

import { Controller } from "react-hook-form";
import DatePicker from "~/components/ui/date-picker";
import TimePicker from "~/components/ui/time-picker";

const DateTimeFields = ({ control, setValue }: any) => (
  <div className="grid grid-cols-2 gap-4">
    <Controller
      name="date"
      control={control}
      render={({ field }) => (
        <DatePicker
          value={field.value}
          onChange={(date) => setValue("date", date)}
        />
      )}
    />
    <Controller
      name="time"
      control={control}
      render={({ field }) => (
        <TimePicker
          value={field.value}
          onChange={(time) => setValue("time", time)}
        />
      )}
    />
  </div>
);

export default DateTimeFields;
