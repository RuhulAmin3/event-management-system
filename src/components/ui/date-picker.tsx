"use client"

import { CalendarIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "~/components/ui/button"
import { Calendar } from "~/components/ui/calendar"
import { Label } from "~/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover"

const DatePicker = () => {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(undefined)

    return (
        <div className="flex gap-4">
            <div className="flex flex-col gap-3 w-full">
                <Label htmlFor="date-picker" className="px-1">
                   Event Date
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date-picker"
                            className="justify-between font-normal"
                        >
                            {date ? date.toLocaleDateString() : "Select date"}
                            <CalendarIcon className="size-3.5" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                                setDate(date)
                                setOpen(false)
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

export default DatePicker
